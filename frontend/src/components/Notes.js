// src/components/Notes.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../firebase/firebaseConfig';
import { addNote, updateNote, deleteNote } from '../firebase/firebaseUtils';
import NoteTree from './NoteTree';
import { DragDropContext } from 'react-beautiful-dnd';
import { NotesLayout, Sidebar, MainPane, NoteButton, Input, Title } from './StyledComponents';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const notesRef = ref(database, `users/${currentUser.uid}/notes`);
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedNotes = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setNotes(loadedNotes);
    });

    return () => unsubscribe();
  }, []);

  const onDragEnd = (result) => {
    // TODO: Handle reordering logic
  };

  const handleNoteUpdate = async () => {
    if (selectedNoteId) {
      await updateNote(auth.currentUser.uid, selectedNoteId, { title: noteTitle, content: editorContent });
    } else {
      await addNote(auth.currentUser.uid, { title: noteTitle, content: editorContent });
      setNoteTitle('');
      setEditorContent('');
    }
  };

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
    const note = notes.find((note) => note.id === noteId);
    setEditorContent(note.content);
    setNoteTitle(note.title);
  };

  const handleNoteDelete = async (noteId) => {
    await deleteNote(auth.currentUser.uid, noteId);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
      setEditorContent('');
      setNoteTitle('');
    }
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <NotesLayout>
        <Sidebar>
          <Title>Notes</Title>
          <NoteButton onClick={handleNoteUpdate}>Add Note</NoteButton>
          <NoteTree notes={notes} setSelectedNoteId={handleNoteSelect} />
        </Sidebar>
        <MainPane>
          {selectedNote && (
            <>
              <Input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note Title"
              />
              <ReactQuill value={editorContent} onChange={setEditorContent} />
              <NoteButton onClick={handleNoteUpdate}>Save</NoteButton>
              <NoteButton onClick={() => handleNoteDelete(selectedNote.id)}>Delete</NoteButton>
            </>
          )}
        </MainPane>
      </NotesLayout>
    </DragDropContext>
  );
};

export default Notes;
