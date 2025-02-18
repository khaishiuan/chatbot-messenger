import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import FlowNode from './nodes/FlowNode';
import TriggerSelector from './nodes/TriggerSelector';
import ActionSelector from './nodes/ActionSelector';
import Modal from './Modal';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const EditIcon = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray500};
`;

const BuilderContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  min-height: 0;
`;

const Sidebar = styled.div`
  width: 200px;
`;

const Canvas = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 100%;
`;

const AddButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${props => props.primary ? props.theme.colors.orange : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.gray700};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.gray200}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.orange : props.theme.colors.gray50};
  }
`;

// Define node types outside component to prevent rerenders
const nodeTypes = {
  trigger: FlowNode,
  action: FlowNode
};

// Define default edge options
const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
  style: {
    stroke: '#555',
    strokeWidth: 2,
    cursor: 'pointer'
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#555',
  },
};

// Add connection validation
const isValidConnection = (connection) => {
  // Only allow connections from trigger to action or action to action
  return connection.source !== connection.target;
};

function AutomationBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [automationName, setAutomationName] = useState('New Automation');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const onConnect = useCallback((params) => {
    // Add the new connection only if it's valid
    if (isValidConnection(params)) {
      setEdges((eds) => addEdge(params, eds));
    }
  }, [setEdges]);

  const handleSelectTrigger = (triggerType) => {
    const newNode = {
      id: 'trigger-1',
      type: 'trigger',
      position: { x: 100, y: 200 },
      draggable: true,
      data: {
        type: 'trigger',
        config: { 
          triggerTypes: [triggerType],
        },
        onConfigChange: (newConfig) => {
          setNodes((nds) =>
            nds.map((node) =>
              node.id === 'trigger-1'
                ? { ...node, data: { ...node.data, config: newConfig } }
                : node
            )
          );
        },
        onDelete: () => {
          setNodes((nds) => nds.filter((node) => node.id !== 'trigger-1'));
          setEdges((eds) => eds.filter((edge) => 
            edge.source !== 'trigger-1' && edge.target !== 'trigger-1'
          ));
        }
      }
    };
    setNodes([newNode]);
    setShowModal(false);
  };

  const handleSelectAction = (actionType) => {
    if (nodes.length > 0) {
      const newNodeId = `action-${nodes.length + 1}`;
      const lastNode = nodes[nodes.length - 1];
      const newNode = {
        id: newNodeId,
        type: 'action',
        position: { 
          x: lastNode.position.x + 350,
          y: 200
        },
        draggable: true,
        data: {
          type: 'action',
          config: { 
            actionType,
            ...(actionType === 'send_message' && { 
              type: 'text',
              text: ''
            }),
            ...(actionType === 'delay' && { 
              duration: 1,
              unit: 'minutes'
            }),
            ...(actionType === 'condition' && {
              variable: 'message',
              condition: 'equals',
              value: ''
            })
          },
          onConfigChange: (newConfig) => {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === newNodeId
                  ? { ...node, data: { ...node.data, config: newConfig } }
                  : node
              )
            );
          },
          onDelete: () => {
            setNodes((nds) => nds.filter((node) => node.id !== newNodeId));
            setEdges((eds) => eds.filter((edge) => 
              edge.source !== newNodeId && edge.target !== newNodeId
            ));
          }
        }
      };
      setNodes((nds) => [...nds, newNode]);
    }
    setShowModal(false);
  };

  return (
    <Container>
      <Header>
        <Title>
          {automationName}
          <EditIcon>✎</EditIcon>
        </Title>
      </Header>

      <BuilderContainer>
        <Sidebar>
          <AddButton 
            primary 
            onClick={() => {
              setModalType('trigger');
              setShowModal(true);
            }}
            disabled={nodes.some(node => node.type === 'trigger')}
          >
            <span>+</span>
            Triggers
          </AddButton>
          <AddButton 
            onClick={() => {
              setModalType('action');
              setShowModal(true);
            }}
            disabled={!nodes.some(node => node.type === 'trigger')}
          >
            <span>+</span>
            Actions
          </AddButton>
        </Sidebar>

        <Canvas>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            style={{ background: 'transparent' }}
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            connectionMode="loose"
            isValidConnection={isValidConnection}
            deleteKeyCode="Delete"
            connectionRadius={20}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Canvas>
      </BuilderContainer>

      {showModal && (
        <Modal 
          title={modalType === 'trigger' ? 'Select Trigger' : 'Select Action'}
          onClose={() => setShowModal(false)}
        >
          {modalType === 'trigger' ? (
            <TriggerSelector onSelect={handleSelectTrigger} />
          ) : (
            <ActionSelector onSelect={handleSelectAction} />
          )}
        </Modal>
      )}
    </Container>
  );
}

export default AutomationBuilder; 