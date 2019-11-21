
import React from 'react'
import { NavLink } from 'react-router-dom'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext';
import { findNote } from '../notesFunctions';
import config from '../config'
// import './NotePage.css'

// export default function NotePage(props) {
export default class NotePage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }

    console.log(notes)
    // console.log(noteId)

    return (
    // (
    //   <NotefulContext.Consumer>
    //     {({ notes }) => {
    //       return notes
    //         .filter(p => p.id === parseInt(this.props.match.params.note_id))
    //         .map(note =>
    //         return (
    //           <section className="notes-display" key={note.id}>
    //             <h3>{note.title}</h3>
    //             {note.content
    //               .split("/\n \r|\n/")
    //               .map((text, i) =>
    //                 <p key={i}>{text}</p>
    //               )}
    //           </section>
    //         ))
    //     }}
    //   </NotefulContext.Consumer>
    // )
      < div className = "notePage" >
        {/* {notes.id} */ }
        < h1 > { note.note_name }</h1 >
          <h3>{notes.date_published}</h3>
    { this.handleDeleteNote }
    <Note

    // {note.id}
    // {note.note_name}
    // {notes.date_published}
    // {this.handleDeleteNote}
    />


      <div className="notePage__content">
        {/* {note.content
            .split("/\n \r|\n/")
            .map((text, i) =>
              <p key={i}>{text}</p>
            )} */}
      </div>
      </div >

    )
  }
}

// NotePage.defaultProps = {
//   note: {
//     content: "",
//   }
// }