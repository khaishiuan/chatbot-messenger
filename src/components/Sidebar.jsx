import React from 'react';

function Sidebar({ onAddNode }) {
  return (
    <div className="sidebar">
      <div className="node-category">
        <h3>Triggers</h3>
        <button
          className="node-button trigger-item"
          onClick={() => onAddNode('triggerNode')}
        >
          Add Trigger
        </button>
      </div>

      <div className="node-category">
        <h3>Actions</h3>
        <button
          className="node-button message-item"
          onClick={() => onAddNode('messageNode')}
        >
          Add Message
        </button>
        <button
          className="node-button question-item"
          onClick={() => onAddNode('questionNode')}
        >
          Add Question
        </button>
      </div>

      <div className="node-category">
        <h3>Logic</h3>
        <button
          className="node-button condition-item"
          onClick={() => onAddNode('conditionNode')}
        >
          Add Condition
        </button>
        <button
          className="node-button delay-item"
          onClick={() => onAddNode('delayNode')}
        >
          Add Delay
        </button>
      </div>

      <div className="node-category">
        <h3>Actions</h3>
        <button
          className="node-button action-item"
          onClick={() => onAddNode('actionNode')}
        >
          Add Action
        </button>
        <button
          className="node-button integration-item"
          onClick={() => onAddNode('integrationNode')}
        >
          Add Integration
        </button>
      </div>
    </div>
  );
}

export default Sidebar; 