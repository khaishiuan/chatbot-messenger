import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
// ... other imports

const NodeWrapper = styled.div`
  // ... existing styles
`;

// ... other styled components

function FlowNode({ type, data, isConnectable }) {
  const { config = {}, onConfigChange, onDelete } = data;

  const renderConfig = () => {
    // ... existing renderConfig logic
  };

  return (
    <div>
      <NodeWrapper>
        {type === 'trigger' ? (
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            style={{ background: '#555' }}
          />
        ) : (
          <>
            <Handle
              type="target"
              position={Position.Top}
              isConnectable={isConnectable}
              style={{ background: '#555' }}
            />
            <Handle
              type="source"
              position={Position.Bottom}
              isConnectable={isConnectable}
              style={{ background: '#555' }}
            />
          </>
        )}
        <NodeHeader>
          <NodeType>{type}</NodeType>
          {onDelete && <DeleteButton onClick={onDelete}>×</DeleteButton>}
        </NodeHeader>
        <NodeContent>
          {renderConfig()}
        </NodeContent>
      </NodeWrapper>
    </div>
  );
}

export default memo(FlowNode); 