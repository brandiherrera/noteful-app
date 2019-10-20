import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
// import AddFolder from '../AddFolder/AddFolder';
import PropTypes from 'prop-types';
// import './Sidebar.css';
// import { countNotesForFolder } from '../notesFunctions';

// export default function Sidebar(props) {
export default class Sidebar extends React.Component {
    // static defaultProps = {
    //     match: {
    //         params: {}
    //     }
    // }
    
    static contextType = NotefulContext;

    render() {
    const { folders=[], /*notes=[]*/ } = this.context
    // const { folderId } = this.props.match.params
    // console.log(this.props.match.params);
    // const { folders=[] } = this.context
    // const findFolder = (folders=[], folderId) =>
    //     folders.find(folder => folder.id === folderId)
    
    // console.log({folders})
    // const folderDisplay = findFolder(folders, folderId)
    // console.log(folderDisplay);
    return(
        <nav className="nav">
            <div className="folderList">
                {folders.map(folder =>
                // {folderDisplay.map(folder =>
                    <div key={folder.id}>
                        <NavLink to={`/folder/${folder.id}`}>
                        {/* {countNotesForFolder(notes, folder.id)} */}
                            {folder.name}
                        </NavLink>
                    </div>)}
                </div>
                
                    <Link to='/add-folder'>
                        {/* <AddFolder /> */}
                        Add Folder
                    </Link>
                
                {/* <button 
                    type="button">
                    <NavLink to='/add-folder'>
                    <AddFolder />
                        Add folder
                        </NavLink>
                    </button> */}
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

// export default Sidebar

// class Sidebar extends Component {
//     render() {
//         // const { folders, notes } = this.props;
//         // const folder = this.props.folders
//         return (
//             <div className="mainpage__sidebar">
//                 {/* <h2>Sidebar</h2> */}
//                 <ul className="folderList">
//                     {this.props.folders.map(folder =>
//                         <li key={folder.id}>
//                             <a href={`/dummystore/${folder.id}`}>
//                                 {folder.name}
//                             </a>
//                         </li>)}
//                 </ul>
//                 <button>Add folder</button>
//             </div>
//         );
//     }
// }

// Sidebar.defaultProps = {
//     folders: []
// };

// export default Sidebar