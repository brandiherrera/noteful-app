import React from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import PropTypes from 'prop-types';
import config from '../config';
// import './Note.css';


export default class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => { },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;
    
    handleDeleteNote = (event) => {
        event.preventDefault()
        const noteId = this.props.id
        // this.props.history.push(`/`)
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
        // const { notes } = this.props
        // const { notes = [] } = this.context
        console.log(this.props)
        // const findNote = (notes = [], noteId) =>
        //     notes.find(note => note.id === noteId)
        // console.log(this.props)
        // class Note extends Component {
        //     render() {
        return (
            <div className="note">
                {/* {notes.map(note => */}

                    <div key={this.props.id}>
                        <h2>
                            <Link to={`/note/${this.props.id}`}>
                                {this.props.name}
                            </Link>
                        </h2>
                        <p>
                            {this.props.modified}
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
                )}
    }

Note.defaultProps = {
    notes: [],
    content: "",
    name: ""
}

// Note.propTypes = {
//     notes: PropTypes.array,
//     // onDeleteNote: () => {},
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string,
//     content: PropTypes.string,
//     modified: PropTypes.string,
// }
// export default Note