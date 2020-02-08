import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error })
      });
  }

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
    })
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    })
  }

  handleDeleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => {
      return note.id !== noteId;
    });

    this.setState({
      notes: newNotes
    })
  }

  addErrorNotes = error => {
    this.setState(error);
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    });
  };

  setNotes = notes => {
    this.setState({
      notes,
      error: null
    });
  };

  getFolders = () => {
    fetch(config.API_FOLDERS, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch(error => this.setState({ foldersError: error }));
  };

  renderMain() {
    return (
      <>
      <h2>Notes</h2>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={Main}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => <NotePage {...routeProps} onDelete={this.handleDeleteNote} />}
        />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  renderSidebar() {
    return (
      <>
      <h2>Folders</h2>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={Sidebar}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={SidebarNav}
        />
        <Route path="/add-folder" component={AddFolder} />
      </>
    )
  }



  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      addErrorNotes: this.addErrorNotes,
      notesError: this.notesError
    }

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