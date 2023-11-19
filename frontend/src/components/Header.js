import React, { useState } from 'react';
import logo from '../assets/MyDataLogo60px.png';
import { Navbar, NavList, NavItem, Title, Dropdown, DropdownContent, ProfileImage, HeaderLH, Button } from './StyledComponents';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout, onSettings }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <HeaderLH className="App-header">
      <Navbar>
        <img src={logo} alt="My Data Logo" className="App-logo" />
        <Title>My Data</Title>
        <NavList>
          <NavItem><Link to="/">Home</Link></NavItem>
          <NavItem><Link to="/finances">Finances</Link></NavItem>
          <NavItem><Link to="/todo">To Do</Link></NavItem>
          <NavItem><Link to="/notes">Notes</Link></NavItem>
          {user && (
            <NavItem>
              <Dropdown onClick={toggleDropdown}>
                <ProfileImage src={user.photoURL} alt="Profile" />
                {isDropdownOpen && (
                  <DropdownContent>
                    <a href="#settings" onClick={onSettings}>Settings</a>
                    <Button onClick={(e) => {
                    e.preventDefault(); // Prevent default button click behavior
                    onLogout(); // Call the logout function
                  }}>Logout</Button>
                  </DropdownContent>
                )}
              </Dropdown>
            </NavItem>
          )}
        </NavList>
      </Navbar>
    </HeaderLH>
  );
};

export default Header;
