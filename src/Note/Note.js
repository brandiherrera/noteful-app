import React from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
import PropTypes from 'prop-types';
import config from '../config';
// import './Note.css';


export default class Note extends React.Component {
    static defaultProps ={
        onDeleteNote: () => {},
      }

    static contextType = NotefulContext;

    handleDeleteNote = (event) => {
        event.preventDefault()
        const noteId = this.props.id
        // this.props.history.push(`/`)
      
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
            this.context.deleteNote(noteId)
            // this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
}

handleDelete = () => {
    this.props.history.push(`/`)
  }

    render() {
    const { name, id, modified } = this.props
// console.log(props)
// class Note extends Component {
//     render() {
        return (
            <div className="note">
                    {/* {props.notes.map(note => */}
                        <div key={id}>
                            <h2>
                            <Link to={`/note/${id}`}>
                                {name}
                            </Link>
                            </h2>
                            <p>
                                {modified}
                                {/* Date modified on {(this.modified).slice( 0, 10 )} */}
                                {/* Date modified on {format(new Date(modified), 'yyyy-MM-dd')} */}
                            </p>
                            <button
                                type="button"
                                // onDeleteNote={this.handleDeleteNote}
                                onClick={this.handleDeleteNote}>
                                    Delete Note
                            </button>
                            <p>{this.props.content}</p>
                        </div>
                </div>
        );
    }
}

Note.defaultProps = {
    notes: [],
    content: "",
    name: ""
}

Note.propTypes = {
    notes: PropTypes.array,
    // onDeleteNote: () => {},
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    content: PropTypes.string,
    modified: PropTypes.string,
}
// export default Note