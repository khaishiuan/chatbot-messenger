import React from 'react';
import styled from 'styled-components';

const ConfigWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
`;

const Field = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray700};
  }

  textarea, input, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xs};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

function SendMessageConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Message Type</label>
        <select 
          value={config.type || 'text'}
          onChange={(e) => onChange({ ...config, type: e.target.value })}
        >
          <option value="text">Text Message</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="buttons">Buttons</option>
        </select>
      </Field>

      {config.type === 'text' && (
        <Field>
          <label>Message Text</label>
          <textarea
            value={config.text || ''}
            onChange={(e) => onChange({ ...config, text: e.target.value })}
            placeholder="Enter your message..."
          />
        </Field>
      )}

      {(config.type === 'image' || config.type === 'video') && (
        <Field>
          <label>Media URL</label>
          <input
            type="url"
            value={config.mediaUrl || ''}
            onChange={(e) => onChange({ ...config, mediaUrl: e.target.value })}
            placeholder="Enter media URL"
          />
        </Field>
      )}

      {config.type === 'buttons' && (
        <Field>
          <label>Button Text</label>
          <input
            type="text"
            value={config.buttonText || ''}
            onChange={(e) => onChange({ ...config, buttonText: e.target.value })}
            placeholder="Enter button text"
          />
        </Field>
      )}
    </ConfigWrapper>
  );
}

export default SendMessageConfig; 