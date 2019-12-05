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
                // (2 === 2)
                ? idForFolder.map(folder => folder.folder_name)
                // ? "hello"
                : folders.filter(folder => folder.id)
        )
        console.log(noteId)
        const nameYet = getFolderName(noteId, folders)
        console.log(nameYet);

        return (
            <div className="SidebarNav">
                {nameYet}
                <button
                    type="button"
                    onClick={() => this.props.history.goBack()}>
                    Go back
                </button>
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
// SidebarNav.defaultProps = {
//     history: {
//         goBack: () => {}
//     }
// }