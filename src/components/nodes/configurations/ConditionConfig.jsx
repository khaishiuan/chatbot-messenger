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

  select, input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xs};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const ConditionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: end;
`;

function ConditionConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Variable</label>
        <select
          value={config.variable || 'message'}
          onChange={(e) => onChange({ ...config, variable: e.target.value })}
        >
          <option value="message">Message</option>
          <option value="user">User</option>
          <option value="custom">Custom Variable</option>
        </select>
      </Field>

      <ConditionRow>
        <Field>
          <label>Condition</label>
          <select
            value={config.condition || 'equals'}
            onChange={(e) => onChange({ ...config, condition: e.target.value })}
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="starts_with">Starts With</option>
            <option value="ends_with">Ends With</option>
          </select>
        </Field>

        <Field>
          <label>Value</label>
          <input
            type="text"
            value={config.value || ''}
            onChange={(e) => onChange({ ...config, value: e.target.value })}
            placeholder="Compare value"
          />
        </Field>
      </ConditionRow>
    </ConfigWrapper>
  );
}

export default ConditionConfig; 