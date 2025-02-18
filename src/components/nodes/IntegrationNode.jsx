import React from 'react';
import { Handle } from 'reactflow';

function IntegrationNode({ data }) {
  return (
    <div className="integration-node">
      <Handle type="target" position="top" />
      <div className="content">
        <h3>Integration</h3>
        <select
          defaultValue={data.integrationType || 'webhook'}
          onChange={(e) => data.onChange?.({ integrationType: e.target.value })}
          className="integration-type-select"
        >
          <option value="webhook">Webhook</option>
          <option value="zapier">Zapier</option>
          <option value="api">Custom API</option>
        </select>
        
        {data.integrationType === 'webhook' && (
          <input
            type="url"
            placeholder="Webhook URL"
            defaultValue={data.webhookUrl}
            onChange={(e) => data.onChange?.({ webhookUrl: e.target.value })}
          />
        )}
        
        {data.integrationType === 'api' && (
          <>
            <input
              type="url"
              placeholder="API Endpoint"
              defaultValue={data.apiUrl}
              onChange={(e) => data.onChange?.({ apiUrl: e.target.value })}
            />
            <select
              defaultValue={data.method || 'POST'}
              onChange={(e) => data.onChange?.({ method: e.target.value })}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </>
        )}
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default IntegrationNode; 