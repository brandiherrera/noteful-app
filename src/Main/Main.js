import React from 'react';
// import './Main.css';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import Note from '../Note/Note'

// function deleteNoteRequest()

// export default function Main(props) {
export default class Main extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext

    render() {
        // console.log(props.notes)
        const { folderId } = this.props.match.params
        const { notes =[] } = this.context
        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
              ? notes
              : notes.filter(note => note.folderId === folderId)
          )
        const notesForFolder = getNotesForFolder(notes, folderId)
        // console.log(notes)
        return (
            <div className="mainpage__main">
              {/* <h2>Main</h2>   */}
                <ul className="noteList">
                    
                    {/* {this.props.notes.map(note => */}
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                            {/* <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <p>{note.modified}</p> */}
                            

                        </li>)}
                </ul>
                <Link
                    to='/add-note'
                    >
                        Add note
                </Link>
            </div>
// this.props.updateNoteList(note)}

        );
    }
}
// Main.defaultProps = {
//     notes: [],
//   }
// export default Main