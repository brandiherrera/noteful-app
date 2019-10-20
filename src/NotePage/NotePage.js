
import React from 'react'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext';
import { findNote } from '../notesFunctions';
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
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
  return (
    <section className="notePage">
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        onDeleteNote={this.handleDeleteNote}
      />
      <div className="notePage__content">
        {note.content
            .split("/\n \r|\n/")
            .map((text, i) =>
                <p key={i}>{text}</p>
        )}
      </div>
    </section>
  )
}
}

// NotePage.defaultProps = {
//   note: {
//     content: "",
//   }
// }