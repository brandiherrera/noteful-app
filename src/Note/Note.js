import React from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import PropTypes from 'prop-types';
import config from '../config';
// import './Note.css';


export default class Note extends React.Component {
    static defaultProps = {
        handleDeleteNote: () => {},
        onDeleteNote: () => { },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;

    
    handleDeleteNote = (event) => {
        // event.preventDefault()
        const noteId = this.props.id
        console.log(noteId);
        // this.props.history.push(`/`)
        console.log(this.props.handleDeleteNote);

        fetch(`${config.API_NOTES}/${noteId}`, {
            method: 'DELETE',
            // headers: {
            //     'content-type': 'application/json'
            // },
        })
        // console.log(noteId)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                    // return res.json().then(event => Promise.reject(event))
                }
            })
            .then(() => {
                // this.props.handleDeleteNote(noteId)
                console.log(noteId)
                this.context.deleteNote(noteId)
                // this.props.history.push(`/notes`)
                // this.handleDelete(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    // handleDelete = () => {
    //     this.props.history.push(`/`)
    // }
    

    render() {
        // const history = this.props.history
        // const { notes } = this.props

        // console.log(this.props.history)

        // const noteId = this.props.id;
        // const { notes = [] } = this.context

        // console.log(notes)

        // const findNote = (notes = [], noteId) =>
        //     notes.find(note => note.id === noteId)
        // console.log(this.context)
        // class Note extends Component {
        //     render() {
        return (
            <div className="note">
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
                            // onClick={() => this.handleDeleteNote(this.props.id)}>
                            onClick={this.handleDeleteNote}>
                            Delete Note
                            </button>
                        <p>{this.props.content}</p>
                        <p>NOTE.JS</p>
                    </div>
                    </div>
                )}
    }

Note.defaultProps = {
    notes: [],
    content: "",
    name: "",
    // onClickDelete: () => {},
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