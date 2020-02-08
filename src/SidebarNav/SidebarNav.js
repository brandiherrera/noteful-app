import React from 'react';
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';

export default class SidebarNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;

    render() {
        const { notes = [], folders = [] } = this.context

        const { noteId } = this.props.match.params;

        const noteFolderId = notes.filter(note => note.id == noteId)

        const idForFolder = folders.filter(folder => folder.id == 2)

        const getFolderName = (noteId, folders = []) => (
            (noteFolderId.folder_id === idForFolder.id)
                ? idForFolder.map(folder => folder.folder_name)
                : folders.filter(folder => folder.id)
        )
        const nameYet = getFolderName(noteId, folders)

        return (
            <div className="SidebarNav">
                {/* {nameYet} */}
                <li id="go-back">
                <button
                    type="button"
                    id="go-back-link"
                    onClick={() => this.props.history.goBack()}>
                    Go back
                </button>
                </li>
            </div>
        )
    }
}
SidebarNav.defaultProps = {
    notes: [],
    folders: [],
    name: ""
}

SidebarNav.propTypes = {
    notes: PropTypes.array,
    folders: PropTypes.array,
    name: PropTypes.string,
    noteId: PropTypes.number
}