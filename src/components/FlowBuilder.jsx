import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes/NodeTypes';
import Sidebar from './Sidebar';
import PropertiesPanel from './PropertiesPanel';
import './FlowBuilder.css';

const initialNodes = [
  {
    id: '1',
    type: 'triggerNode',
    data: { 
      label: 'Start Trigger',
      triggerType: 'message',
      onChange: (newData) => {
        // This will be defined in the component
      }
    },
    position: { x: 250, y: 25 },
  }
];

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const onAddNode = useCallback(
    (type) => {
      const position = {
        x: 250,
        y: (nodes.length * 100) + 25, // Stack nodes vertically
      };

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { 
          label: `${type} node`,
          onChange: (newData) => onNodeChange(`${type}-${nodes.length + 1}`, newData),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeChange = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData,
              onChange: (triggerData) => onNodeChange(nodeId, triggerData),
            },
          };
        }
        return node;
      })
    );
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 25,
      };

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { 
          label: `${type} node`,
          onChange: (newData) => onNodeChange(`${type}-${nodes.length + 1}`, newData),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length, setNodes, onNodeChange]
  );

  const updateNode = (updatedNode) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
    setSelectedNode(updatedNode);
  };

  return (
    <div className="flow-builder">
      <Sidebar onAddNode={onAddNode} />
      <div className="flow-container" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <PropertiesPanel selectedNode={selectedNode} updateNode={updateNode} />
    </div>
  );
}

export default FlowBuilder; 