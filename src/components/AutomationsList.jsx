import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 300px;
  margin: 0 2rem;
`;

const NewButton = styled.button`
  background: #0066FF;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #0052CC;
  }
`;

const AutomationCard = styled.div`
  background: #F9FAFB;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

function AutomationsList() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title>My Automations</Title>
        <SearchBar>
          <input type="text" placeholder="Search" />
        </SearchBar>
        <NewButton onClick={() => navigate('/automation/new')}>
          <span>+</span>
          New Automation
        </NewButton>
      </Header>

      <AutomationCard onClick={() => navigate('/automation/1')}>
        <div className="automation-header">
          <h3>Automation 1</h3>
          <ToggleSwitch 
            checked={true}
            onChange={(e) => e.stopPropagation()}
          />
        </div>
        <p>Description</p>
        <div className="automation-footer">
          Last modified 17/2/2025 16:18
        </div>
      </AutomationCard>

      <AutomationCard onClick={() => navigate('/automation/2')}>
        <div className="automation-header">
          <h3>Automation 2</h3>
          <ToggleSwitch 
            checked={false}
            onChange={(e) => e.stopPropagation()}
          />
        </div>
        <p>Description</p>
        <div className="automation-footer">
          Last modified 16/2/2025 17:18
        </div>
      </AutomationCard>
    </Container>
  );
}

export default AutomationsList; 