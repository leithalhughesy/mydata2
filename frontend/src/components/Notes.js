// src/components/Notes.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../firebase/firebaseConfig';
import { addNote, updateNote, deleteNote } from '../firebase/firebaseUtils';
import NoteTree from './NoteTree';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  NotesContainer,
  SidebarContainer,
  NoteEditorContainer,
  NoteTitleInput,
  EditorStyles,
  NoteCard,
  Button,
} from './StyledComponents';
import 'react-quill/dist/quill.snow.css'; // Import styles

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  
  useEffect(() => {
    if (!auth.currentUser) return;
    
    const notesRef = ref(database, `users/${auth.currentUser.uid}/notes`);
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedNotes = data ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          })) : [];
      setNotes(loadedNotes);
    });

    return () => unsubscribe();
  }, []);

  const onDragEnd = (result) => {
    // Handle reordering logic
  };

  const handleNoteUpdate = async () => {
    if (selectedNoteId) {
      await updateNote(auth.currentUser.uid, selectedNoteId, { title: noteTitle, content: editorContent });
    } else {
      await addNote(auth.currentUser.uid, { title: noteTitle, content: editorContent });
      setNoteTitle('Unsaved Note');
      setEditorContent('Unsaved Content');
    }
  };

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
    const note = notes.find((note) => note.id === noteId);
    setEditorContent(note.content || '');
    setNoteTitle(note.title || '');
  };

  const handleNoteDelete = async (noteId) => {
    await deleteNote(auth.currentUser.uid, noteId);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
      setEditorContent('');
      setNoteTitle('');
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <NotesContainer>
        <SidebarContainer>
          <NoteTitleInput
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note Title"
            autoFocus
          />
          <Button onClick={() => handleNoteUpdate(null)}>Add Note</Button>
          <NoteTree notes={notes} setSelectedNoteId={handleNoteSelect} />
        </SidebarContainer>
        <NoteEditorContainer>
          {selectedNote && (
            <NoteCard>
              <EditorStyles
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
              />
              <div>
                <Button onClick={handleNoteUpdate}>Save</Button>
                <Button onClick={() => handleNoteDelete(selectedNote.id)}>Delete</Button>
              </div>
            </NoteCard>
          )}
        </NoteEditorContainer>
      </NotesContainer>
    </DragDropContext>
  );
};

export default Notes;