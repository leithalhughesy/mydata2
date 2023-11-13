// src/components/NoteTree.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import NoteItem from './NoteItem';

const Container = styled.div`
  padding: 8px;
  width: 250px;
  background-color: #f4f5f7;
`;

const Title = styled.h3`
  padding: 8px;
`;

const NoteList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

const NoteTree = ({ notes, setNotes, setSelectedNoteId }) => {
  return (
    <Container>
      <Title>Note Categories</Title>
      <Droppable droppableId="noteTree">
        {(provided, snapshot) => (
          <NoteList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {notes.map((note, index) => (
              <NoteItem key={note.id} note={note} index={index} setSelectedNoteId={setSelectedNoteId} />
            ))}
            {provided.placeholder}
          </NoteList>
        )}
      </Droppable>
    </Container>
  );
};

export default NoteTree;
