// src/components/NoteItem.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const ItemContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const NoteItem = ({ note, index, setSelectedNoteId }) => {
    return (
      <Draggable draggableId={note.id} index={index}>
        {(provided, snapshot) => (
          <ItemContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            onClick={() => setSelectedNoteId(note.id)}
          >
            {note.title || 'Untitled Note'} 
          </ItemContainer>
        )}
      </Draggable>
    );
  };

export default NoteItem;
