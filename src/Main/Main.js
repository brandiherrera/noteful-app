import React from 'react';
// import './Main.css';
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
        // console.log(this.context.folders)
        const folders = this.context.folders;
        console.log(folders)
        console.log({folders})

        const myFolder = folders.filter(folder => (
            folder.id
            // ,
            // console.log(folder.id)
        ))
            
        
        // console.log(obj())
        const { folderId } = this.props.match.params
        // console.log(folderId)
        const { notes } = this.context
        console.log(notes)
        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
              ? notes
              : notes.filter(note => note.folder_id == folderId)
          )
          
        const notesForFolder = getNotesForFolder(notes, folderId)
        // console.log(notesForFolder)
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
                    to='/add-note'
                    >
                        Add note
                </Link>
            </div>
        );
    }
}
// Main.defaultProps = {
//     notes: [],
//   }
// export default Main