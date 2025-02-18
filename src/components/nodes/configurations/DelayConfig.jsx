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
`;

const TimeInput = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};

  input {
    width: 80px;
    padding: ${({ theme }) => theme.spacing.xs};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  select {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.xs};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

function DelayConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Delay Duration</label>
        <TimeInput>
          <input
            type="number"
            min="1"
            value={config.duration || 1}
            onChange={(e) => onChange({ ...config, duration: parseInt(e.target.value) })}
          />
          <select
            value={config.unit || 'minutes'}
            onChange={(e) => onChange({ ...config, unit: e.target.value })}
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </TimeInput>
      </Field>
    </ConfigWrapper>
  );
}

export default DelayConfig; 