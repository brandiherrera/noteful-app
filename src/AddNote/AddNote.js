import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';
import ValidationError from '../ValidationError';
// import PropTypes from 'prop-types';

export default class AddNote extends Component {
    static contextType = NotefulContext;

    state = {
        appError: null,
        formValid: false,
        errorCount: null,
        name: '',
        folderId: '',
        // || this.props.location.state.folderId,
        content: '',
        errors: {
			folderId:
				/*!this.props.location.state.folderId &&*/ 'You must select a folder',
			name: 'You must enter a note title',
			content: 'You must enter a description'
        }
    }

    updateErrorCount = () => {
		let errors = this.state.errors;
		let count = 0;

		Object.values(errors).forEach(val => {
			if (val.length > 0) {
				count++;
			}
		});
        console.log(errors)
		this.setState({ errorCount: count });
		let valid = count === 0 ? true : false;
		this.setState({ formValid: valid });
	};

    // updateName(name) {
    //     this.setState({ name: { value: name, touched: true } });
    // }

    // updateFolderId(folderId) {
    //     this.setState({ folderId: { value: folderId, touched: true } });
    // }

    // updateContent(content) {
    //     this.setState({ content: { value: content, touched: true } });
    // }



    validateEntry = (name, value) => {
        let err = '';
        // const name = this.state.name.value.trim();
        if (name === 'name') {
            console.log(value)
            if (value.length === 0) {
                return 'Name is required.'
            } 
            else if (name.length < 3) {
                return "Name must be at least 3 characters long";
            }
        }
        // if (name === 'folderId') {
        //     if (value.length === 0) {
        //         return "Folder is required";
        //     }
        // }
        // if (name === 'content') {
        //     if (value.length === 0) {
        //         return "Content is required";
        //     }
        // }
        const { errors } = { ...this.state };
        errors[name] = err;
        this.setState({ errors });
    }

    handleChange = e => {
        const { name, /*folderId, content, */value } = e.target;
        this.setState(
            { [name]: value.trim() },
            // { [folderId]: value.trim() },
            // { [content]: value.trim() }
        );
        this.validateEntry( name, /*folderId, content, */value.trim() );
        this.updateErrorCount();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.errorCount > 0) return;

        const { name, folderId, content } = e.target;
        const note = {
            name: name.value,
            folderId: folderId.value,
            // folder: folder.value,
            content: content.value,
            modified: new Date()
        };
        this.setState({ appError: null });

        fetch(config.API_NOTES, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(data => {
                name.value = '';
                content.value = '';
                folderId.value = '';
                // console.log(this.props)
                this.context.addNote(data);
                // this.props.history.pushState('/', this.props);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ appError: error });
            });
    };

    // validateName() {
    //     console.log(this.context)
    //     const name = this.state.name;
    //     if (name.length === 0) {
    //         return 'Name is required.'
    //     } else if (name.length < 3) {
    //         return "Name must be at least 3 characters long";
    //     }
    // }


    

    render() {
        const { errors } = this.state;
        const folders = this.context.folders;
        // const nameError = this.validateEntry()
        if (this.state.appError) {
            return <p className="error">{this.state.appError}</p>;
        }
        // const notes = this.context.notes;
        // const content = this.context.content;

        // const folderId = this.context.folderId
        // console.log(folders)

        return (
            <form className="add-note" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Add Note</legend>
                    <label htmlFor="name">Note Name</label>
                    <input
                        type="text"
                        className="add-note__name"
                        name="name"
                        id="name"
                        defaultValue=""
                        // onChange={e => this.updateName(e.target.value)}
                        onChange={this.handleChange}
                        // required 
                        />
                        {/* {this.state.name.touched &&
                            <ValidationError message={nameError} />} */}
                        {errors.name.length > 0 && (
						<ValidationError /*id={'noteTitleError'}*/ message={errors.name} />)}
                    <label htmlFor="content">Note Content</label>
                    <input
                        type="text"
                        className="add-note__content"
                        name="content"
                        id="content"
                        defaultValue=""
                        onChange={this.handleChange}
                    />
                    <select
                        id="folderId"
                        name="folderId"
                        value={this.state.folderId}
                        onChange={this.handleChange}
                    >
                        <option value="">Select a folder</option>
                        {folders.map(folder => (<option key={folder.id} value={folder.id}>{folder.name}</option>))}
                        {/* {this.getFolders(folders)} */}
                    </select>
                    <button
                        type="submit"
                        disabled={
                            // this.validateName() === false
                            this.state.formValid === false
                          }
                    >Submit
                    </button>
                </fieldset>

                {this.state.errorCount !== null ? (
					<p className="form-status">
						Form is {this.state.formValid ? 'complete' : 'incomplete'}
					</p>
                ) : null}
                
            </form>
        );
    }
}

// AddNote.defaultProps = {
//     notes: [],
//     folders: [],
//     content: "",
//     name: "",
//     error: null
// }

// AddNote.propTypes = {
//     notes: PropTypes.array,
//     folder: PropTypes.array,
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string,
//     content: PropTypes.string,
//     modified: PropTypes.string,
    // error: PropTypes.error
// }