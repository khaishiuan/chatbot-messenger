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

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xs};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

function KeywordTriggerConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Keywords (comma separated)</label>
        <input
          type="text"
          value={config.keywords || ''}
          onChange={(e) => onChange({ ...config, keywords: e.target.value })}
          placeholder="Enter keywords..."
        />
      </Field>
    </ConfigWrapper>
  );
}

export default KeywordTriggerConfig; 