import React from 'react';
import { Handle } from 'reactflow';

function QuestionNode({ data }) {
  const options = data.options || [];

  const addOption = () => {
    const newOptions = [...options, { text: '', value: '' }];
    data.onChange?.({ options: newOptions });
  };

  return (
    <div className="question-node">
      <Handle type="target" position="top" />
      <div className="content">
        <h3>Question</h3>
        <textarea
          placeholder="Enter question..."
          defaultValue={data.question}
          onChange={(e) => data.onChange?.({ question: e.target.value })}
        />
        
        <div className="options-container">
          {options.map((option, index) => (
            <div key={index} className="option-item">
              <input
                type="text"
                placeholder="Option text"
                value={option.text}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].text = e.target.value;
                  data.onChange?.({ options: newOptions });
                }}
              />
            </div>
          ))}
          <button onClick={addOption} className="add-option-btn">
            Add Option
          </button>
        </div>
      </div>
      {options.map((_, index) => (
        <Handle
          key={index}
          type="source"
          position="bottom"
          id={`option-${index}`}
          style={{ left: `${((index + 1) * 100) / (options.length + 1)}%` }}
        />
      ))}
    </div>
  );
}

export default QuestionNode; 