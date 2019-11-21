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
        // console.log({notes})
        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
              ? notes
              : notes.filter(note => note.folderId === folderId)
          )
        const notesForFolder = getNotesForFolder(notes, folderId)
        console.log(notesForFolder)
        return (
            <div className="mainpage__main">
                <ul className="noteList">
                    
                    {/* {this.props.notes.map(note => */}
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.note_name}
                                modified={note.date_published}
                            />
                            {/* <Route path={`note/${note.id}`} component={Note}
                                {...note.id}
                                {...note.name}
                                {...note.date_published}
                                >
                            </Route> */}
                            {note.name}
                            {/* <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <p>{note.modified}</p> */}
                            
                        </li>
                        )}
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