import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

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
      color: #81d1f0; // A lighter shade for hover state
    }
  }
`;

export const Button = styled.button`
  background-color: #57c2ec;
  color: #0A192F;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #81d1f0;
  }
`;

export const Title = styled.h3`
  color: #CCD6F6;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%; /* Full width */
  padding: 10px 15px;
  margin-bottom: 10px; /* Space below the input field */
  border-radius: 4px;
  border: 1px solid #57c2ec;
  background-color: #020c1b; /* A darker background for the input */
  color: #fff; /* White text */
  
  &::placeholder {
    color: #8892B0;
  }

  &:focus {
    outline: none;
    border-color: #81d1f0;
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
    border-color: #81d1f0; /* A lighter border color for focus state */
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
  height: 100%;
  padding: 20px;
  margin: 0; // Remove the margin to allow grid-gap to handle spacing
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
  // Remove flex property to allow grid to handle the size
  // Remove max-width property to allow grid to handle the size
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
  padding: 40px; /* Keep existing padding */
  padding-top: 150px; /* Add padding-top to account for the fixed header */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  border: 2px solid #57c2ec;
`;

export const HeaderLH = styled.header`
  background-color: #0A192F;
  color: #57c2ec;
  padding: 10px 20px;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 3px solid #57c2ec;
  position: fixed; /* Add this line to make the header fixed */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  right: 0; /* Align to the right */
  z-index: 10; /* Ensure it's above other elements */
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


export const NotesContainer = styled.div`
  display: flex;
  height: 100%;
  background-color: #0A192F; // This should match the main theme of your app
  // Add more styling as needed
`;

export const SidebarContainer = styled.div`
  width: 250px; // Or whatever width you prefer
  background-color: #112240; // This should match the sidebar's theme
  padding: 20px;
  overflow-y: auto; // If you have more notes, it will be scrollable
  // Add more styling as needed
`;

export const NoteEditorContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  // Add more styling as needed
`;

export const NoteTitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px; // Space below the input field
  border-radius: 4px;
  border: 1px solid #57c2ec; // Border color should match your theme
  background-color: #020c1b; // A darker background for the input
  color: #fff; // White text color for better readability
  font-size: 1.2em; // Larger font size for the note title

  &:focus {
    outline: none;
    border-color: #81d1f0; // Highlight color when focused
  }
  // Add more styling as needed
`;

export const NoteActionButton = styled.button`
  background-color: #57c2ec; // Button color should match your theme
  color: #0A192F; // Text color that contrasts with the button color
  border: none;
  padding: 10px 15px;
  margin-right: 10px; // Space between buttons
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #81d1f0; // Color change on hover
  }
  // Add more styling as needed
`;

export const EditorStyles = styled(ReactQuill)`
  .ql-container {
    height: 100%;
    border: none; // No border for the editor
  }

  .ql-editor {
    padding: 20px;
    background-color: #020c1b; // Matching the theme's background color
    color: #CCD6F6; // Text color for readability
    border-radius: 4px;
    height: 100%;
    overflow-y: auto; // Make the editor scrollable
  }
  // Add more styling as needed
`;

// Update your NoteItem component to use this styled component for better appearance
export const NoteItemContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.isSelected ? '#57c2ec' : '#112240')};
  color: #CCD6F6;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #81d1f0;
  }
`;

export const NoteList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isSelected ? '#57c2ec' : '#112240')};
  color: #CCD6F6;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const ModalContent = styled.div`
  position: fixed;
  background: #112240;
  width: 300px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 20px;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const ModalInput = styled.input`
  margin-bottom: 10px;
`;

export const ModalSelect = styled.select`
  margin-bottom: 10px;
`;

export const ModalButton = styled.button`
  background-color: #57c2ec;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export const AccountsContainer = styled.div`
  display: grid;
  grid-gap: 20px; // Adjust this value as needed
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); // Adjust minmax as needed, smaller value will allow more items in a row
  justify-content: center; // This centers the grid items in the container when there's extra space
  padding: 0 20px; // Add padding to the left and right

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // On smaller screens, use a single column layout
  }

  // Adjust max-width to allow the grid to stretch more, but not too wide
  max-width: 1920px; // Allow the grid container to take up to 90% of the screen width
  margin: 0 auto; // Center the container
`;