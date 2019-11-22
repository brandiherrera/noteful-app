
import React from 'react'
// import { NavLink } from 'react-router-dom'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext';
// import { findNote } from '../notesFunctions';

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
    // const note = findNote(notes, noteId) || { content: '' }

    const getNotes = notes
      .filter(note => note.id == noteId)
      .map(note => {
        return (
          <section className="notes-display" key={note.id}>
            <h3>{note.note_name}</h3>
            {note.date_published}
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
      <div>
        {getNotes}
        <Note />
        {/* <button
          type="button"
          onClick={this.handleDeleteNote}>
          Delete Note
                            </button> */}
      </div>
    )





    //   <NotefulContext.Consumer>
    //     {({ notes }) => {
    //       return notes
    //         .filter(p => p.id === parseInt(this.props.match.params.note_id))
    //         .map(note => {
    //         return (
    //           <section className="notes-display" key={note.id}>
    //             <h3>{note.title}</h3>
    //             {note.content
    //               .split("/\n \r|\n/")
    //               .map((text, i) =>
    //                 <p key={i}>{text}</p>
    //               )}
    //           </section>
    //         )}
    //         )
    //     }}
    //   </NotefulContext.Consumer>
    // )





    //   < div className="notePage" >
    //     {/* {notes.id} */}
    //     < h1 > {note.note_name}</h1 >
    //     <h3>{notes.date_published}</h3>
    //     {/* {this.handleDeleteNote} */}
    //     <Note
    //       {...note.id}
    //       {...note.note_name}
    //       {...note.date_published}
    //       {...this.handleDeleteNote}
    //     />
    //     <div className="notePage__content">
    //       {note.content
    //         .split("/\n \r|\n/")
    //         .map((text, i) =>
    //           <p key={i}>{text}</p>
    //         )}
    //     </div>
    //   </div >
    // )


    // NotePage.defaultProps = {
    //   note: {
    //     content: "",
  }
}