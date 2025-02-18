import React from 'react';
import { Handle } from 'reactflow';

function ActionNode({ data }) {
  return (
    <div className="action-node">
      <Handle type="target" position="top" />
      <div className="content">
        <h3>Action</h3>
        <select defaultValue={data.actionType || 'delay'}>
          <option value="delay">Delay</option>
          <option value="webhook">Webhook</option>
          <option value="email">Send Email</option>
        </select>
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default ActionNode; 