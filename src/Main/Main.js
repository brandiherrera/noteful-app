import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import Note from '../Note/Note'

export default class Main extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext

    render() {
        const { folderId } = this.props.match.params
        const { notes } = this.context
        const getNotesForFolder = (notes = [], folderId) => (
            (!folderId)
                ? notes
                : notes.filter(note => note.folder_id == folderId)
        )

        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <div className="mainpage__main">
                <ul className="noteList">
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.note_name}
                                modified={note.date_published}
                            />
                        </li>
                    )}
                </ul>
                <Link
                    id='add-note-link'
                    to='/add-note'
                >
                    Add note
                </Link>
            </div>
        );
    }
}