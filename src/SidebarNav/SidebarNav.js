import React from 'react';
// import './SidebarNav.css';
import { Route, NavLink } from 'react-router-dom';
import AddFolder from '../AddFolder/AddFolder';
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';
import {  findFolder } from '../notesFunctions';

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
        // const { folderId } = this.props.match.params
        // console.log(folderId)
        // const { notes =[], folders } = this.context
        // // console.log({notes})
        // const getNotesForFolder = (notes=[], folderId) => (
        //     (!folderId)
        //       ? notes
        //       : notes.filter(note => note.folderId === folderId)
        //   )
        // const notesForFolder = getNotesForFolder(notes, folderId)
        // console.log(notesForFolder)

        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        // const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, 2)
        // let folderId;


        // const folderId = folders => folder.
        // console.log(this.context)
        console.log(notes)
        // console.log(this.context.folders)
        console.log(folders)
        console.log(folder)
        console.log(noteId)
        // console.log(findFolder(folders, noteId))
        // console.log(findFolder(folders, this.props.match.params))
        // console.log(displayFolder(folderId, noteId))
// console.log(                folders.map(folder => folder.id === noteId)
//     && <NavLink >{folder.folder_name}</NavLink >)
        return (
            <div className="SidebarNav">
                <div className="sidebarRoute">
                    <Route
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
                {folders.map(folder => (
                    <li key={folder.id}>
                        <NavLink to={`/folders/${folder.id}`}>
                            {folder.folder_name}
                            {/* {notes.filter(note => note.folder_id === folder.id)} */}
                        </NavLink >
                    </li>)
                )}


                {/* <ul>
				{folders.map(folder => (
					<li
						key={folder.id}
						className={folder.id === folderId ? ' active' : null}
					>
				
							<NavLink to={`/folders/${folder.id}`}>
								<span role="img" aria-label="Folder">
									&#x1F4C2;
								</span>
								&nbsp;{folder.name}&nbsp;(
								{notes.filter(note => note.id_folder === folder.id)})
							</NavLink>
						
					</li>
				))}
            </ul> */}
            

                {/* // folder.id === noteId)
                //         && <NavLink >{folder.folder_name}</NavLink >}
                // {/* {folder && (
                //     <NavLink >{folder.folder_name}</NavLink >
                // )} */} 
                {noteId}
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