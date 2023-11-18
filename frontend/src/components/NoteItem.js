// src/components/NoteItem.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { NoteItemContainer } from './StyledComponents';

const NoteItem = ({ note, index, setSelectedNoteId }) => {
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <NoteItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          onClick={() => setSelectedNoteId(note.id)}
        >
          {note.title || 'Untitled Note'}
        </NoteItemContainer>
      )}
    </Draggable>
  );
};

export default NoteItem;
