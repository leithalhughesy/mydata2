import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
`;

export const NavItem = styled.li`
  margin-left: 20px;
  a {
    color: #57c2ec; // A bright color to contrast against the dark background
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #52EAC9; // A lighter shade for hover state
    }
  }
`;

export const Button = styled.button`
  background-color: #57c2ec;
  color: #0A192F;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #52EAC9;
  }
`;

export const Title = styled.h1`
  color: #CCD6F6;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  background-color: #112240; /* Darker background for the input */
  color: #57c2ec; /* Bright color for the text */
  border: 1px solid #57c2ec; /* Lighter border color */
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-right: 10px;
  
  &::placeholder {
    color: #8892B0;
  }

  &:focus {
    outline: none;
    border-color: #52EAC9; /* A lighter border color for focus state */
  }
`;

export const Select = styled.select`
  background-color: #112240; /* Darker background for the dropdown */
  color: #57c2ec; /* Bright color for the dropdown text */
  border: 1px solid #57c2ec; /* Lighter border color */
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-right: 10px;
  -moz-appearance: none; /* Remove default arrow in Firefox */
  -webkit-appearance: none; /* Remove default arrow in WebKit browsers */
  appearance: none; /* Remove default arrow from select */
  position: relative;

  &:focus {
    outline: none;
    border-color: #52EAC9; /* A lighter border color for focus state */
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
 
  &::after {
    content: '⌵';
    color: #57c2ec;
    right: 15px;
    top: calc(50% - 0.5em);
    position: absolute;
    pointer-events: none;
  }
`;

export const Option = styled.option`
  background: #0a192f; /* Same as the page background for consistency */
  color: #57c2ec; /* Color to match your theme */

  &:hover,
  &:focus {
    background: #112240; /* Slightly lighter background for visibility */
  }
`;

export const Card = styled.div`
  background-color: #112240; /* Dark blue card background */
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

export const Thead = styled.thead`
  background-color: #57c2ec;
  color: #0A192F;
  text-align: left;
  font-weight: bold;
`;

export const Tbody = styled.tbody`
  background-color: #112240;
  color: #8892B0;
  border-bottom: 1px solid #57c2ec;
`;

export const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #0A192F;
  }

  &:last-of-type {
    border-bottom: 2px solid #57c2ec;
  }

  &:hover {
    background-color: #112240;
    cursor: pointer;
  }
`;

export const Th = styled.th`
  padding: 12px 15px;
`;

export const Td = styled.td`
  padding: 12px 15px;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const MainContent = styled.main`
  padding: 40px; /* Or whatever padding you prefer */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  gap: 20px; /* Spacing between child components */
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #112240;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0; // Align to the right edge of the profile picture
  border-radius: 4px;
  padding: 10px; 

  ${Dropdown}:hover & {
    display: block;
  }

  a, button {
    padding: 10px 20px;
    display: block;
    color: #57c2ec;
    text-decoration: none;
    font-size: 0.6em;
    background: none;
    border: none;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: #0A192F;
    }
  }
 
`;


export const ProfileImage = styled.img`
  width: 50px; // You can adjust the size as needed
  height: 50px;
  border-radius: 50%;
  border: 2px solid #64FFDA;
`;

export const HeaderLH = styled.header`
background-color: #0A192F;
color: #64FFDA;
padding: 10px 20px;
text-align: center;
font-size: 1.5rem;
border-bottom: 3px solid #64FFDA;
`;

export const DivCenter = styled.div`
  padding: 40px; /* Or whatever padding you prefer */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  gap: 20px; /* Spacing between child components */
`;

export const NotesLayout = styled.div`
  display: flex;
  height: calc(100vh - 50px); /* Adjust the height based on your header's height */
  background-color: #0A192F; /* Background color of the notes layout */
`;

export const Sidebar = styled.div`
  width: 250px; /* Width of the sidebar */
  background-color: #020c1b; /* Slightly darker background for the sidebar */
  padding: 20px;
  overflow-y: auto; /* Add scroll if content is too long */
`;

export const MainPane = styled.div`
  flex: 1; /* Take up the remaining width */
  padding: 20px;
  overflow-y: auto; /* Add scroll if content is too long */
`;

export const NoteCard = styled.div`
  background-color: #112240; /* Dark blue card background */
  color: #fff; /* White text color */
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px; /* Spacing between cards */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

// Optionally, if you have a button that you use frequently, you can create a styled button component as well
export const NoteButton = styled.button`
  background-color: #57c2ec; /* Bright color for the button */
  color: #0A192F;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #52EAC9; /* A slightly lighter color for hover state */
  }
`;