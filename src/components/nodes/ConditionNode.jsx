import React from 'react';
import { Handle } from 'reactflow';

function ConditionNode({ data }) {
  return (
    <div className="condition-node">
      <Handle type="target" position="top" />
      <div className="content">
        <h3>Condition</h3>
        <select defaultValue={data.condition || 'equals'}>
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="greater">Greater Than</option>
          <option value="less">Less Than</option>
        </select>
      </div>
      <Handle type="source" position="bottom" id="true" />
      <Handle type="source" position="right" id="false" />
    </div>
  );
}

export default ConditionNode; 