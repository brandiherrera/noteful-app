import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';
import ValidationError from '../ValidationError';

export default class AddNote extends Component {
    static contextType = NotefulContext;

    state = {
        appError: null,
        formValid: false,
        errorCount: null,
        name: '',
        folderId: '',
        content: '',
        errors: {
            folderId:
                'You must select a folder',
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
        this.setState({ errorCount: count });
        let valid = count === 0 ? true : false;
        this.setState({ formValid: valid });
    };

    updateFolderId(folderId) {
        this.setState({ folderId: { value: folderId, touched: true } });
    }

    validateEntry = (name, value) => {
        let err = '';
        if (name === 'name') {
            if (value.length === 0) {
                return 'Name is required.'
            }
            else if (name.length < 3) {
                return "Name must be at least 3 characters long";
            }
        }
        const { errors } = { ...this.state };
        errors[name] = err;
        this.setState({ errors });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(
            { [name]: value.trim() },
        );
        this.validateEntry(name, value.trim());
        this.updateErrorCount();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.errorCount > 0) return;

        const { name, folderId, content } = e.target;
        const note = {
            note_name: name.value,
            folder_id: folderId.value,
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
                this.context.addNote(data);
                this.setState({ data });
                this.props.history.push('/', data);
            })
            .catch(error => {
                this.setState({ appError: error });
            });
    };

    render() {
        const { errors } = this.state;
        const folders = this.context.folders;
        if (this.state.appError) {
            return <p className="error">{this.state.appError}</p>;
        }

        return (
            <form className="add-note" onSubmit={this.handleSubmit}>
                <legend>
                    <h3>Add Note</h3>
                </legend>
                <label htmlFor="name"><h4>Note Name</h4></label>
                <input
                    type="text"
                    className="add-note__name"
                    name="name"
                    id="name"
                    defaultValue=""
                    onChange={this.handleChange}
                />

                {errors.name.length > 0 && (
                    <ValidationError message={errors.name} />)}
                <label htmlFor="content"><h4>Note Content</h4></label>
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
                    {folders.map(folder => (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>))}
                </select>
                <button
                    type="submit"
                    id="submit-btn"
                    disabled={
                        this.state.formValid === false
                    }
                >Submit
                    </button>

                {this.state.errorCount !== null ? (
                    <p className="form-status">
                        Form is {this.state.formValid ? 'complete' : 'incomplete'}
                    </p>
                ) : null}

            </form>
        );
    }
}