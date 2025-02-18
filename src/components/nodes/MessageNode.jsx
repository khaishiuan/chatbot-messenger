import React, { useState } from 'react';
import { Handle } from 'reactflow';

function MessageNode({ data }) {
  const [messageType, setMessageType] = useState(data.messageType || 'text');

  const handleTypeChange = (e) => {
    setMessageType(e.target.value);
    data.onChange?.({ messageType: e.target.value });
  };

  return (
    <div className="message-node">
      <Handle type="target" position="top" />
      <div className="content">
        <h3>Message</h3>
        <select 
          value={messageType}
          onChange={handleTypeChange}
          className="message-type-select"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="carousel">Carousel</option>
        </select>

        {messageType === 'text' && (
          <textarea
            placeholder="Enter message..."
            defaultValue={data.message}
            onChange={(e) => data.onChange?.({ message: e.target.value })}
          />
        )}

        {messageType === 'image' && (
          <input
            type="url"
            placeholder="Image URL"
            defaultValue={data.imageUrl}
            onChange={(e) => data.onChange?.({ imageUrl: e.target.value })}
          />
        )}

        {messageType === 'video' && (
          <input
            type="url"
            placeholder="Video URL"
            defaultValue={data.videoUrl}
            onChange={(e) => data.onChange?.({ videoUrl: e.target.value })}
          />
        )}

        {messageType === 'carousel' && (
          <div className="carousel-items">
            {/* Add carousel items management */}
          </div>
        )}
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default MessageNode; 