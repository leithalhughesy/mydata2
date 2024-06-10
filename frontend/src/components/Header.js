import React, { useState } from 'react';
import logo from '../assets/MyDataLogo60px.png';
import { Navbar, NavList, NavItem, Title, Dropdown, DropdownContent, ProfileImage, HeaderLH, Button, NavListSub } from './StyledComponents';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout, onSettings }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const isFinancesPage = location.pathname.startsWith("/accounts") || location.pathname.startsWith("/transactions") || location.pathname.startsWith("/overview");

  return (
    <HeaderLH className="App-header">
      <table>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <img src={logo} alt="My Data Logo" className="App-logo" />
            </td>
            <td rowSpan={2}>
              <Title>My Data</Title>
            </td>
            <td>
              <Navbar>
                <NavList>
                  <NavItem><Link to="/">Home</Link></NavItem>
                  <NavItem><Link to="/overview">Finances</Link></NavItem>
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
                              e.preventDefault();
                              onLogout();
                            }}>Logout</Button>
                          </DropdownContent>
                        )}
                      </Dropdown>
                    </NavItem>
                  )}
                </NavList>
              </Navbar>
            </td>
          </tr>
          {isFinancesPage && (
            <tr>
              <td>
                <NavListSub>
                  <NavItem><Link to="/overview">Overview</Link></NavItem>
                  <NavItem><Link to="/accounts">Accounts</Link></NavItem>
                  <NavItem><Link to="/transactions">Transactions</Link></NavItem>
                </NavListSub>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </HeaderLH>
  );
};

export default Header;
