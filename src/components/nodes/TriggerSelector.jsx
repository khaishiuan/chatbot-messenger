import React from 'react';
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const TriggerType = styled.div`
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
    border-color: ${({ theme }) => theme.colors.orange};
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

const TriggerContent = styled.div`
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

  .details {
    margin-top: 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray500};
    display: flex;
    gap: 8px;
  }

  .tag {
    background: ${({ theme }) => theme.colors.gray100};
    padding: 2px 8px;
    border-radius: 12px;
  }
`;

const triggerTypes = [
  {
    id: 'message',
    label: 'Message Received',
    description: 'Trigger when a user sends any type of message',
    icon: '📨',
    color: '#F97316',
    tags: ['Instant', 'User Initiated']
  },
  {
    id: 'keyword',
    label: 'Keyword Match',
    description: 'Trigger when a specific word or phrase is detected',
    icon: '🔍',
    color: '#8B5CF6',
    tags: ['Text Based', 'Customizable']
  },
  {
    id: 'button',
    label: 'Button Click',
    description: 'Trigger when a user clicks a button in a previous message',
    icon: '🔘',
    color: '#10B981',
    tags: ['Interactive', 'User Initiated']
  },
  {
    id: 'scheduled',
    label: 'Scheduled Time',
    description: 'Trigger at specific times or intervals',
    icon: '⏰',
    color: '#0EA5E9',
    tags: ['Automated', 'Time Based']
  }
];

function TriggerSelector({ onSelect }) {
  return (
    <SelectorWrapper>
      {triggerTypes.map(trigger => (
        <TriggerType 
          key={trigger.id} 
          onClick={() => onSelect(trigger.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelect(trigger.id);
            }
          }}
        >
          <IconWrapper color={trigger.color}>
            {trigger.icon}
          </IconWrapper>
          <TriggerContent>
            <h4>{trigger.label}</h4>
            <p>{trigger.description}</p>
            <div className="details">
              {trigger.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </TriggerContent>
        </TriggerType>
      ))}
    </SelectorWrapper>
  );
}

export default TriggerSelector; 