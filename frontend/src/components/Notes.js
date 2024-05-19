// src/components/Notes.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../firebase/firebaseConfig';
import { addNote, deleteNote, updateNote, updateNoteOrderInFirebase } from '../firebase/firebaseUtils';
import NoteTree from './NoteTree';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  NotesContainer,
  NoteTitleInput,
  EditorStyles,
  Button,
  Card,
} from './StyledComponents';
import 'react-quill/dist/quill.snow.css'; // Import styles
import { ThemeContext } from 'styled-components';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const initialSelectionMade = useRef(false);
  const theme = useContext(ThemeContext);

  // Ref for the note title input element
  const noteTitleInputRef = useRef(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const notesRef = ref(database, `users/${auth.currentUser.uid}/notes`);
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      let loadedNotes = [];

      if (data) {
        loadedNotes = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Sort the notes by the 'order' field
        loadedNotes.sort((a, b) => a.order - b.order);
      }

      setNotes(loadedNotes);
      // Check if there are no notes and create one if necessary
      if (loadedNotes.length === 0) {
        const newNote = { title: 'New Note', content: 'Start writing here...' };
        addNote(auth.currentUser.uid, newNote).then((newNoteRef) => {
          // Update the local state with the new note
          loadedNotes = [{ id: newNoteRef.key, ...newNote }];
          setSelectedNoteId(newNoteRef.key);
          setEditorContent('Start writing here...');
          setNoteTitle('New Note');
          initialSelectionMade.current = true;
        });
      } else {
        // Handle selection of an existing note
        if (selectedNoteId === null && loadedNotes.length > 0) {
          setSelectedNoteId(loadedNotes[0].id);
          setEditorContent(loadedNotes[0].content || '');
          setNoteTitle(loadedNotes[0].title || '');
          initialSelectionMade.current = true;
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]); // Only re-run the effect if auth.currentUser changes

  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }

    const reorderedNotes = Array.from(notes);
    const [removed] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, removed);

    setNotes(reorderedNotes); // Update the state
    updateNoteOrderInFirebase(auth.currentUser.uid, reorderedNotes); // Update Firebase
  };

  const handleNoteUpdate = async () => {
    if (selectedNoteId) {
      // If there's a selected note, update it
      await updateNote(auth.currentUser.uid, selectedNoteId, {
        title: noteTitle,
        content: editorContent,
      });

      // Focus the note title input after update
      if (noteTitleInputRef.current) {
        noteTitleInputRef.current.focus();
      }
    } else {
      // If there's no selected note, create a new one
      handleAddNewNote();
    }
  };

  const handleAddNewNote = async () => {
    // Create a new note object with an order value
    const newNote = {
      title: 'New Note Title', // Default title for new note
      content: 'Notes go here', // Default content for new note
      order: notes.length, // Set the order to be the last in the list
    };

    // Push the new note to Firebase
    const newNoteRef = await addNote(auth.currentUser.uid, newNote);

    // Use the key from the new note reference to set the selected note ID
    if (newNoteRef.key) {
      setSelectedNoteId(newNoteRef.key);
      setEditorContent(newNote.content);
      setNoteTitle(newNote.title);

      // Update the notes array with the new note
      setNotes([...notes, { id: newNoteRef.key, ...newNote }]);
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
      const noteIndex = notes.findIndex((note) => note.id === noteId);
      let nextNote = null;

      // Check if there is a note after the deleted note
      if (noteIndex < notes.length - 1) {
        nextNote = notes[noteIndex + 1];
      }
      // If the deleted note was the last one, select the previous note
      else if (noteIndex > 0) {
        nextNote = notes[noteIndex - 1];
      }

      // Update the state to reflect the new selection
      if (nextNote) {
        setSelectedNoteId(nextNote.id);
        setEditorContent(nextNote.content || '');
        setNoteTitle(nextNote.title || '');
      } else {
        // No notes left, reset the editor
        setSelectedNoteId(null);
        setEditorContent('');
        setNoteTitle('');
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <NotesContainer>
        <Card>
          <Button onClick={() => handleAddNewNote(null)}>Add Note</Button>
          <NoteTree notes={notes} setSelectedNoteId={handleNoteSelect} />
        </Card>
        <Card>
          {selectedNote && (
            <>
              <NoteTitleInput
                ref={noteTitleInputRef} // Add the ref here
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note Title"
                autoFocus
              />
              <EditorStyles
                theme={theme}
                value={editorContent}
                onChange={setEditorContent}
              />
              <div>
                <Button onClick={handleNoteUpdate}>Save</Button>
                <Button onClick={() => handleNoteDelete(selectedNote.id)}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </Card>
      </NotesContainer>
    </DragDropContext>
  );
};

export default Notes;