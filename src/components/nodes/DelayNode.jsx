import React from 'react';
import { Handle } from 'reactflow';

function DelayNode({ data }) {
  return (
    <div className="delay-node">
      <Handle type="target" position="top" />
      <div className="content">
        <h3>Delay</h3>
        <div className="delay-inputs">
          <input
            type="number"
            min="1"
            placeholder="Duration"
            defaultValue={data.duration || 1}
            onChange={(e) => data.onChange?.({ duration: e.target.value })}
          />
          <select
            defaultValue={data.unit || 'minutes'}
            onChange={(e) => data.onChange?.({ unit: e.target.value })}
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default DelayNode; 