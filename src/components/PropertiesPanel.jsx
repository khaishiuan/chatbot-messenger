import React from 'react';

function PropertiesPanel({ selectedNode, updateNode }) {
  if (!selectedNode) return <div>Select a node to edit properties</div>;

  return (
    <div className="properties-panel">
      <h3>Node Properties</h3>
      <div className="property">
        <label>Label</label>
        <input 
          type="text"
          value={selectedNode.data.label}
          onChange={(e) => updateNode({
            ...selectedNode,
            data: { ...selectedNode.data, label: e.target.value }
          })}
        />
      </div>
      {/* Add more properties based on node type */}
    </div>
  );
}

export default PropertiesPanel; 