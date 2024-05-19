import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    // You can add other global styles here
  }
  table {
    width: 100%;
  }
  td {
    width: 25%;
  }
`;

export const Container = styled.div`
  color: ${props => props.theme.text}; // Dynamic text color from theme
  margin: 0 auto;
  padding: 0 50px;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
`;
export const NavListSub = styled.ul`
  list-style: none;
  display: flex;
  font-size: .8em;
`;

export const NavItem = styled.li`
  margin-left: 20px;
  a {
    color: ${props => props.theme.primary}; // Dynamic color from theme
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.hover}; // Dynamic hover color from theme
    }
  }
`;

export const Button = styled.button`
  background-color: ${props => props.theme.primary}; // Dynamic background color from theme
  color: ${props => props.theme.body}; // Dynamic text color from theme
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.hover}; // Dynamic hover background color from theme
  }
`;

export const Title = styled.h3`
  color: ${props => props.theme.text}; // Dynamic text color from theme
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.borderColor}; // Dynamic border color from theme
  background-color: ${props => props.theme.background}; // Dynamic background color from theme
  color: ${props => props.theme.text}; // Dynamic text color from theme

  &::placeholder {
    color: ${props => props.theme.secondary}; // Dynamic placeholder color from theme
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.toggleBorder}; // Dynamic focus border color from theme
  }
`;

export const Select = styled.select`
  background-color: ${props => props.theme.background}; // Dynamic background color from theme
  color: ${props => props.theme.text}; // Dynamic text color from theme
  border: 1px solid ${props => props.theme.borderColor}; // Dynamic border color from theme
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-right: 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  position: relative;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.toggleBorder}; // Dynamic focus border color from theme
  }
`;

export const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: '⌵';
    color: ${props => props.theme.primary}; // Dynamic color from theme
    right: 15px;
    top: calc(50% - 0.5em);
    position: absolute;
    pointer-events: none;
  }
`;

export const Option = styled.option`
  background: ${props => props.theme.body}; // Dynamic option background color from theme
  color: ${props => props.theme.text}; // Dynamic text color from theme

  &:hover,
  &:focus {
    background: ${props => props.theme.background}; // Dynamic hover background color from theme
  }
`;

export const Card = styled.div`
  color: ${props => props.theme.text}; // Dynamic text color from theme
  background-color: ${props => props.theme.card}; // Dynamic card background color from theme
  border-radius: 10px;
  height: 100%;
  width: 100%;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AccountsContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(728px, 1fr));
  justify-content: center;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  max-width: 1920px;
  margin: 0 auto;
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
  background-color: ${props => props.theme.primary}; // Dynamic header background color from theme
  color: ${props => props.theme.header}; // Dynamic text color from theme
  text-align: left;
  font-weight: bold;
`;

export const Tbody = styled.tbody`
  background-color: ${props => props.theme.background}; // Dynamic body background color from theme
  color: ${props => props.theme.secondary}; // Dynamic secondary text color from theme
  border-bottom: 1px solid ${props => props.theme.borderColor}; // Dynamic border color from theme
`;

export const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: ${props => props.theme.header}; // Dynamic even row background color from theme
  }

  &:last-of-type {
    border-bottom: 2px solid ${props => props.theme.primary}; // Dynamic last row border color from theme
  }

  &:hover {
    background-color: ${props => props.theme.hover}; // Dynamic row hover background color from theme
    cursor: pointer;
  }
`;

export const TrH = styled(Tr)``; // You can extend Tr if you want to change something for header rows

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
  background-color: ${props => props.theme.body}; // Dynamic body background color from theme
  padding: 40px;
  padding-top: 150px;
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
  background-color: ${props => props.theme.card}; // Dynamic dropdown background color from theme
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
  border-radius: 4px;
  padding: 10px;

  ${Dropdown}:hover & {
    display: block;
  }

  a, button {
    padding: 10px 20px;
    display: block;
    color: ${props => props.theme.primary}; // Dynamic link/button color from theme
    text-decoration: none;
    font-size: 0.6em;
    background: none;
    border: none;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: ${props => props.theme.header}; // Dynamic link/button hover background color from theme
    }
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.primary}; // Dynamic border color from theme
`;

export const HeaderLH = styled.header`
  background-color: ${props => props.theme.header}; // Dynamic header background color from theme
  color: ${props => props.theme.primary}; // Dynamic text color from theme
  padding: 10px 20px;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 3px solid ${props => props.theme.primary}; // Dynamic border color from theme
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const DivCenter = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const NotesLayout = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  background-color: ${props => props.theme.body}; // Dynamic layout background color from theme
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: ${props => props.theme.sidebar}; // Dynamic sidebar background color from theme
  padding: 20px;
  overflow-y: auto;
`;

export const MainPane = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const NoteCard = styled.div`
  background-color: ${props => props.theme.card}; // Dynamic note card background color from theme
  color: ${props => props.theme.text}; // Dynamic text color from theme
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const NotesContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 2fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 20px;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${props => props.theme.sidebar}; // Dynamic sidebar container background color from theme
  padding: 20px;
  overflow-y: auto;
`;

export const NoteEditorContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const NoteTitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.primary}; // Dynamic border color from theme
  background-color: ${props => props.theme.background}; // Dynamic input background color from theme
  color: ${props => props.theme.text}; // Dynamic text color from theme
  font-size: 1.2em;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.hover}; // Dynamic focus border color from theme
  }
`;

export const NoteActionButton = styled.button`
  background-color: ${props => props.theme.primary}; // Dynamic button background color from theme
  color: ${props => props.theme.text}; // Dynamic text color from theme
  border: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.hover}; // Dynamic hover background color from theme
  }
`;

export const EditorStyles = styled(ReactQuill)`
  .ql-container {
    height: 100%;
    border: none;
  }

  .ql-editor {
    padding: 20px;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text}; // Dynamic text color from theme
    border-radius: 4px;
    height: 100%;
    overflow-y: auto;
  }
`;

export const NoteItemContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.isSelected ? props.theme.accent : props.theme.card}; // Dynamic item background color based on selection
  color: ${props => props.theme.text}; // Dynamic text color from theme
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.hover}; // Dynamic hover background color from theme
  }
`;

export const NoteList = styled.div`
  padding: 8px;
  background-color: ${props => props.isSelected ? props.theme.accent : props.theme.background}; // Dynamic list background color based on selection
  color: ${props => props.theme.text}; // Dynamic text color from theme
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: ${props => props.theme.modalBackground}; // Dynamic modal background from theme
`;

export const ModalContent = styled.div`
  position: fixed;
  background: ${props => props.theme.card}; // Dynamic modal content background from theme
  width: 300px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 20px;
  border-radius: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: ${props => props.theme.text}; // Dynamic text color from theme
  margin-bottom: 5px;
`;
