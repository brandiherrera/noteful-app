import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import dummystore from './dummy-store';
// import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import SidebarNav from './SidebarNav/SidebarNav';
import Main from './Main/Main';
import NotePage from './NotePage/NotePage'
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';
import './App.css';



class App extends Component {
  // constructor (props) {
  //   super(props);
    /*this.*/state = {
      notes: [],
      folders: [],
      // error: null,
    };
  // }
  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ],
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
});
};

  addErrorNotes = error => {
    this.setState(error);
  };


  componentDidMount() {
    // let foldersAPICall = fetch(config.API_ENDPOINT  `/folders`);
    // let notesAPICall = fetch(config.API_ENDPOINT  `/notes`);
  
    // Promise.all([foldersAPICall, notesAPICall])
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if  (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
      
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
        .then(([notes, folders]) => {
          this.setState({notes, folders});
          // console.log(this.state)
        })
        .catch(error => {
          console.error({error})
        });
      }
  
  renderMain() {
    // const {notes} = this.state;
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={Main}
                    // render={routeProps => {
                    //     const {folderId} = routeProps.match.params;
                    //     const notesForFolder = getNotesForFolder(
                    //         notes,
                    //         folderId
                    //     );
                    //     return (
                    //         <Main
                    //             {...routeProps}
                    //             notes={notesForFolder}
                    //         />
                    //     );
                    // }}
                />
            ))}
            <Route
                path="/note/:noteId"
                component={NotePage}
                // render={routeProps => {
                //     const {noteId} = routeProps.match.params;
                //     const note = findNote(notes, noteId);
                //     return <NotePage {...routeProps} note={note} />;
                // }}
            />
            <Route path="/add-note" component={AddNote} />
        </>
    );
}

  renderSidebar() {
    // const {notes, folders} = this.state;


    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component= {Sidebar}
                    // render={routeProps => (
                    //     <Sidebar
                    //         folders={folders}
                    //         notes={notes}
                    //         {...routeProps}
                    //     />
                    // )}
                />
            ))}
            <Route
                    path="/note/:noteId"
                    component = {SidebarNav}
                    // render={routeProps => {
                    //     const {noteId} = routeProps.match.params;
                    //     const note = findNote(notes, noteId) || {};
                    //     const folder = findFolder(folders, note.folderId);
                    //     return <SidebarNav {...routeProps} folder={folder} />;
                    // }}
                />
                <Route path="/add-folder" component={AddFolder} />
            </>
    )
  }



  render() {
    // console.log(dummystore)
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      addErrorNotes: this.addErrorNotes,
      notesError: this.notesError
    }
console.log(contextValue)
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <header>
            <Link to='/'><h1>Noteful</h1></Link>
          </header>
          <main className="mainpage">
            <div className="sidebar">
              {this.renderSidebar()}
            </div>
            <div className="main">

              {this.renderMain()}
            </div>
            </main>
        </div>
      </ NotefulContext.Provider>
    );
  }
}
          
export default App