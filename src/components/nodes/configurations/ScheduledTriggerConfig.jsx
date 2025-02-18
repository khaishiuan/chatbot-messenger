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

const TimeInputs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

function ScheduledTriggerConfig({ config, onChange }) {
  return (
    <ConfigWrapper>
      <Field>
        <label>Frequency</label>
        <select
          value={config.frequency || 'once'}
          onChange={(e) => onChange({ ...config, frequency: e.target.value })}
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </Field>

      <TimeInputs>
        <Field>
          <label>Time</label>
          <input
            type="time"
            value={config.time || ''}
            onChange={(e) => onChange({ ...config, time: e.target.value })}
          />
        </Field>
        {config.frequency === 'weekly' && (
          <Field>
            <label>Day</label>
            <select
              value={config.day || 'monday'}
              onChange={(e) => onChange({ ...config, day: e.target.value })}
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </Field>
        )}
      </TimeInputs>
    </ConfigWrapper>
  );
}

export default ScheduledTriggerConfig; 