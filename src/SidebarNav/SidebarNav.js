import React from 'react';
// import './SidebarNav.css';
import { Route } from 'react-router-dom';
import AddFolder from '../AddFolder/AddFolder';
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';
import { findNote, findFolder } from '../notesFunctions';

// export default function SidebarNav(props) {
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
        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        console.log(this.context)
        return (
            <div className="SidebarNav">
                    <div className="sidebarRoute"><Route
                        // className="sidebarRoute"
                        exact
                        path={`/add-folder`}
                        component={AddFolder}
                    >Add Folder</Route>
                    </div>
                <button
                    type="button"
                    onClick={() => this.props.history.goBack()}>
                    Go back
                </button>
                {folder && (
                    <h3>{folder.name}</h3>
                )}
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
}
// SidebarNav.defaultProps = {
//     history: {
//         goBack: () => {}
//     }
// }