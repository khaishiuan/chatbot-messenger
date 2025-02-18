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

  input, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xs};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

function MessageTriggerConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Message Type</label>
        <select 
          value={config.messageType || 'any'}
          onChange={(e) => onChange({ ...config, messageType: e.target.value })}
        >
          <option value="any">Any Message</option>
          <option value="text">Text Only</option>
          <option value="media">Media Only</option>
        </select>
      </Field>
      
      {config.messageType === 'text' && (
        <Field>
          <label>Contains Text</label>
          <input
            type="text"
            value={config.containsText || ''}
            onChange={(e) => onChange({ ...config, containsText: e.target.value })}
            placeholder="Optional text filter"
          />
        </Field>
      )}
    </ConfigWrapper>
  );
}

export default MessageTriggerConfig; 