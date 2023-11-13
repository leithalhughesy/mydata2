// src/components/NoteViewer.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 260px;
  padding: 8px;
`;

const NoteViewer = ({ selectedNote }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: selectedNote.content }} />
    </Container>
  );
};

export default NoteViewer;
