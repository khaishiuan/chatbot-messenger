import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import MessageTriggerConfig from './configurations/MessageTriggerConfig';
import SendMessageConfig from './configurations/SendMessageConfig';
import DelayConfig from './configurations/DelayConfig';
import ConditionConfig from './configurations/ConditionConfig';
import KeywordTriggerConfig from './configurations/KeywordTriggerConfig';
import ButtonTriggerConfig from './configurations/ButtonTriggerConfig';
import ScheduledTriggerConfig from './configurations/ScheduledTriggerConfig';

const NodeWrapper = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 200px;  // Minimum width
  min-height: 100px; // Minimum height
  max-width: 400px;  // Maximum width
  max-height: 400px;  // Maximum height
  position: relative;
  display: flex;
  flex-direction: column; // Allow stacking of content
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const NodeType = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: uppercase;
`;

const NodeContent = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  flex-grow: 1; // Allow content to grow
  overflow: auto;
`;

const AddTriggerButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.orange};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.orangeDark};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray500};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

function FlowNode({ type, data, isConnectable }) {
  const { config = {}, onConfigChange, onDelete } = data;

  const renderConfig = () => {
    if (type === 'trigger') {
      const triggerTypes = config.triggerTypes || [];
      return triggerTypes.map((triggerType) => {
        switch (triggerType) {
          case 'message':
            return <MessageTriggerConfig key={triggerType} config={config} onChange={onConfigChange} />;
          case 'keyword':
            return <KeywordTriggerConfig key={triggerType} config={config} onChange={onConfigChange} />;
          case 'button':
            return <ButtonTriggerConfig key={triggerType} config={config} onChange={onConfigChange} />;
          case 'scheduled':
            return <ScheduledTriggerConfig key={triggerType} config={config} onChange={onConfigChange} />;
          default:
            return null;
        }
      });
    } else if (type === 'action') {
      switch (config?.actionType) {
        case 'send_message':
          return <SendMessageConfig config={config} onChange={onConfigChange} />;
        case 'delay':
          return <DelayConfig config={config} onChange={onConfigChange} />;
        case 'condition':
          return <ConditionConfig config={config} onChange={onConfigChange} />;
        default:
          return null;
      }
    }
    return null;
  };

  const handleAddTrigger = () => {
    const newTriggerType = prompt("Enter new trigger type (message, keyword, button, scheduled):");
    if (newTriggerType) {
      const updatedTriggerTypes = [...(config.triggerTypes || []), newTriggerType];
      onConfigChange({ ...config, triggerTypes: updatedTriggerTypes });
    }
  };

  return (
    <div>
      <NodeWrapper>
        {type === 'trigger' ? (
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            style={{ background: '#555', width: 12, height: 12 }}
          />
        ) : (
          <>
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
              style={{ background: '#555', width: 12, height: 12 }}
            />
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              style={{ background: '#555', width: 12, height: 12 }}
            />
          </>
        )}
        <NodeHeader>
          <NodeType>{type}</NodeType>
          {onDelete && <DeleteButton onClick={onDelete}>×</DeleteButton>}
        </NodeHeader>
        <NodeContent>
          {renderConfig()}
          <AddTriggerButton onClick={handleAddTrigger}>Add Trigger</AddTriggerButton>
        </NodeContent>
      </NodeWrapper>
    </div>
  );
}

export default memo(FlowNode); 