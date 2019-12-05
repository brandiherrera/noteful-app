
import React from 'react'
// import { NavLink } from 'react-router-dom'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext';
import config from '../config'
// import { findNote } from '../notesFunctions';


export default class NotePage extends React.Component {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  static contextType = NotefulContext;

  // handleDeleteNote = () => {
  //   this.props.history.push(`/`)
  // }

  handleDeleteNote = (event) => {
    // event.preventDefault()
    const noteNum = this.props.match.params
    this.props.history.push(`/`)
    const noteId = Object.values(noteNum).toString()
    console.log(noteId)

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(res => {
            if (!res.ok)
                return res.json().then(event => Promise.reject(event))
            return res.json()
        })
        .then(() => {
        //   refreshPage() { 
        //     window.location.reload(); 
        // }
            // this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
}

// handleDeleteNote = (noteId, cb) => {
//   const noteNum = this.props.match.params
//   this.props.history.push(`/`)
//   const numId = Object.values(noteNum).toString()
//   console.log(numId)

//   fetch(config.API_NOTES + `/${numId}`, {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json',
//     }
//   })
//   .then(res => {
//     if (!res.ok) {
//       return res.json().then(error => Promise.reject(error))
//     }
//     return res.json()
//   })
//   .then(data => {
//     cb(numId)
//   })
//   .catch(error => {
//     console.error(error)
//   })
// }

  render() {
    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    console.log(this.props.history)
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
              NOTEPAGE.JS
          </section>
        )
      }
      )

      // console.log(props.id)

    return (
      <div>
        {getNotes}
        {/* <Note notes={notes} noteId={noteId} history={this.props.history} onDelete={this.handleDeleteNote}/> */}
        <button
          type="button"
          // onClick={this.handleDeleteNote}>
          onClick={() => this.handleDeleteNote(this.props.id, this.context.deleteNote)}>
          Delete Note
                            </button>
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