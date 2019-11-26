import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

export default class Sidebar extends React.Component {
    // static defaultProps = {
    //     match: {
    //         params: {}
    //     }
    // }
    
    static contextType = NotefulContext;

    render() {
    const { folders=[] } = this.context
    // const { folderId } = this.props.match.params
    // const findFolder = (folders=[], folderId) =>
    //     folders.find(folder => folder.id == folderId)

    // const folderDisplay = findFolder(folders, folderId);
    // console.log(folderDisplay);
    return(
        <nav className="nav">
            <div className="folderList">
                {folders.map(folder =>
                // {folderDisplay.map(folder =>
                    <li key={folder.id} /*className={folder.id == folderId ? ' active' : null}*/>
                        <NavLink to={`/folder/${folder.id}`}>
                            {folder.folder_name}
                            
                        </NavLink>
                    </li>)}
                </div>
                    <Link to='/add-folder'>
                        Add Folder
                    </Link>
        </nav>
    )}
}

Sidebar.defaultProps = {
    folders: [],
}

Sidebar.propTypes = {
    folders: PropTypes.array,
    id: PropTypes.string,
    name: PropTypes.string
}