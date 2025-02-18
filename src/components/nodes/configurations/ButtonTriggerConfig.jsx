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

function ButtonTriggerConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Button ID</label>
        <input
          type="text"
          value={config.buttonId || ''}
          onChange={(e) => onChange({ ...config, buttonId: e.target.value })}
          placeholder="Enter button identifier..."
        />
      </Field>
    </ConfigWrapper>
  );
}

export default ButtonTriggerConfig; 