
import React from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';


export default class NotePage extends React.Component {

  static contextType = NotefulContext;

  handleDeleteNote = (event) => {
    const noteNum = this.props.match.params
    this.props.history.push(`/`)
    const noteStr = Object.values(noteNum).toString()
    const noteId = Number(noteStr);

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
      })
      .then(() => {
        this.context.deleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {

    const { notes = [] } = this.context
    const { noteId } = this.props.match.params

    const getNotes = notes
      .filter(note => note.id == noteId)
      .map(note => {
        return (
          <section className="notes-display" key={note.id}>
            <h3>{note.note_name}</h3>
            {/* {note.date_published} */}
            Modified on {(note.date_published).slice(0, 10)}
            {note.content
              .split("/\n \r|\n/")
              .map((text, i) =>
                <p key={i}>{text}</p>
              )}
          </section>
        )
      }
      )

    return (
      <div className="whole-notes-display">
        {getNotes}
        <button
          type="button"
          id='delete-note-link-little'
          onClick={() => this.handleDeleteNote(this.props.id, this.context.deleteNote)}>
          Delete Note
        </button>
      </div>
    )
  }
}