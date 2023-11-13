// src/components/NoteTree.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import NoteItem from './NoteItem';
import { Sidebar, Title, NoteList } from './StyledComponents';

const NoteTree = ({ notes, setNotes, setSelectedNoteId }) => {
  return (
    <Sidebar>
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
    </Sidebar>
  );
};

export default NoteTree;
