import React from 'react';
import config from '../config';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

export default class AddFolder extends React.Component {
    static contextType = NotefulContext;

    state = {
        appError: null,
        formValid: false,
        errorCount: null,
        name: '',
        errors: {
			name: 'You must enter a note title'
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
    
    validateEntry = (name, value) => {
        let err = '';

        if (name === 'name') {
            if (value.trim().length === 0) {
                return 'Folder name is required.'
            } else if (name.length < 3) {
                return "Name must be at least 3 characters long";
            }
        }
        const { errors } = { ...this.state };
        errors[name] = err;
        this.setState({ errors });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value.trim() });
        this.validateEntry(name, value);
        this.updateErrorCount();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.errorCount > 0) return;
        const { name } = e.target;
        const folder = {
            folder_name: name.value
        };

        fetch(config.API_FOLDERS, {
            method: 'POST',
            body: JSON.stringify(folder),
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
                this.context.addFolder(data);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ appError: error });
            });

    };

    render() {
        const { errors } = this.state;

        return (
            <form className="addFolderForm" onSubmit={e => this.handleSubmit(e)}>
                    <legend><h3>Add Folder</h3></legend>
                    <label htmlFor="name"><h4>Folder Name</h4></label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.handleChange}
                    />
                    {errors.name.length > 0 && (
                        <ValidationError message={errors.name} />)}
                    <button
                        type="submit"
                        id="submit-btn"
                        disabled={this.state.formValid === false}
                    >
                        Submit
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

AddFolder.defaultProps = {
    folders: [],
    content: "",
    name: "",
    error: null
}

AddFolder.propTypes = {
    folders: PropTypes.array,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    content: PropTypes.string,
    modified: PropTypes.string,
}