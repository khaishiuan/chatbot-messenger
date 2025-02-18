import React from 'react';
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ActionType = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActionContent = styled.div`
  flex: 1;

  h4 {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray900};
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray500};
    margin: 0;
    line-height: 1.4;
  }
`;

const actionTypes = [
  {
    id: 'send_message',
    label: 'Send Message',
    description: 'Send a message, image, or button to the user',
    icon: '💬',
    color: '#0066FF'
  },
  {
    id: 'delay',
    label: 'Add Delay',
    description: 'Wait for a specified duration before continuing',
    icon: '⏱️',
    color: '#F97316'
  },
  {
    id: 'condition',
    label: 'Add Condition',
    description: 'Create different paths based on conditions',
    icon: '🔀',
    color: '#10B981'
  }
];

function ActionSelector({ onSelect }) {
  return (
    <SelectorWrapper>
      {actionTypes.map(action => (
        <ActionType 
          key={action.id} 
          onClick={() => onSelect(action.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelect(action.id);
            }
          }}
        >
          <IconWrapper color={action.color}>
            {action.icon}
          </IconWrapper>
          <ActionContent>
            <h4>{action.label}</h4>
            <p>{action.description}</p>
          </ActionContent>
        </ActionType>
      ))}
    </SelectorWrapper>
  );
}

export default ActionSelector; 