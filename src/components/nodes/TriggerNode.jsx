import React from 'react';
import { Handle } from 'reactflow';

function TriggerNode({ data }) {
  return (
    <div className="trigger-node">
      <div className="content">
        <h3>Trigger</h3>
        <select 
          defaultValue={data.triggerType || 'message'}
          onChange={(e) => data.onChange?.({ triggerType: e.target.value })}
          className="trigger-type-select"
        >
          <option value="message">Message Received</option>
          <option value="keyword">Keyword Match</option>
          <option value="button">Button Click</option>
          <option value="scheduled">Scheduled Time</option>
          <option value="api">API Call</option>
          <option value="event">Custom Event</option>
        </select>

        {data.triggerType === 'keyword' && (
          <input
            type="text"
            placeholder="Enter keyword..."
            defaultValue={data.keyword}
            onChange={(e) => data.onChange?.({ keyword: e.target.value })}
            className="trigger-input"
          />
        )}

        {data.triggerType === 'scheduled' && (
          <div className="schedule-inputs">
            <input
              type="time"
              defaultValue={data.time}
              onChange={(e) => data.onChange?.({ time: e.target.value })}
              className="trigger-input"
            />
            <select
              defaultValue={data.frequency || 'once'}
              onChange={(e) => data.onChange?.({ frequency: e.target.value })}
              className="trigger-input"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {data.triggerType === 'event' && (
          <input
            type="text"
            placeholder="Event name..."
            defaultValue={data.eventName}
            onChange={(e) => data.onChange?.({ eventName: e.target.value })}
            className="trigger-input"
          />
        )}
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default TriggerNode; 