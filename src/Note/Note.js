import React from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
import config from '../config';


export default class Note extends React.Component {
    static defaultProps = {
        handleDeleteNote: () => { },
        onDeleteNote: () => { },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;


    handleDeleteNote = (event) => {
        const noteId = this.props.id

        fetch(`${config.API_NOTES}/${noteId}`, {
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

        return (
            <div className="note">
                <div key={this.props.id}>
                    {/* <h3> */}
                        <Link to={`/note/${this.props.id}`}>
                            <h3>{this.props.name}</h3>
                        <p>Modified on {(this.props.modified).slice(0, 10)}</p>
                        {/* <button
                            type="button"
                            id="delete-note-link-little"
                            onClick={this.handleDeleteNote}>
                            Delete Note
                            </button> */}
                        <p>{this.props.content}</p>
                        </Link>
                    {/* </h3> */}
                {/* <p>
                    {this.props.modified}
                    Modified on {(this.props.modified).slice(0, 10)}
                </p> */}
                <button
                    type="button"
                    id="delete-note-link-little"
                    onClick={this.handleDeleteNote}>
                    Delete Note
                            </button>
                {/* <p>{this.props.content}</p> */}
            </div>
            </div >
        )
    }
}

Note.defaultProps = {
    notes: [],
    content: "",
    name: "",
}
