import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #E5E7EB;
`;

const Logo = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${props => props.active ? '#0066FF' : '#4B5563'};
  font-weight: 500;
`;

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Navigation() {
  return (
    <Nav>
      <Logo>Chatbot</Logo>
      <NavLinks>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#" active>Automation</NavLink>
        <NavLink href="#">Pricing</NavLink>
        <NavLink href="#">Contact</NavLink>
      </NavLinks>
      <UserControls>
        <button className="user-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#4B5563"/>
          </svg>
        </button>
        <button className="menu-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#4B5563"/>
          </svg>
        </button>
      </UserControls>
    </Nav>
  );
}

export default Navigation; 