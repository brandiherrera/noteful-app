import React from 'react';
import config from '../config';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types';

export default class AddFolder extends React.Component {
    static contextType = NotefulContext;

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         add_folder: {
    //             value: '',
    //             touched: false
    //     }
    //     };
    // }
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
        console.log(errors)
		this.setState({ errorCount: count });
        let valid = count === 0 ? true : false;
		this.setState({ formValid: valid });
    };
    
    validateEntry = (name, value) => {
        let err = '';

        if (name === 'name') {
            console.log(value.trim())
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
            name: name.value
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
                console.log(this.props)
                this.context.addFolder(data);
                // this.props.history.pushState('/', this.props);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ appError: error });
            });

        // console.log(folder)

        // const { add_folder } = this.state;
        // console.log("New Folder", add_folder.value);

    };

    render() {
        const { errors } = this.state;
        // const folders = this.context.folders;

        return (
            <form className="addFolderForm" onSubmit={e => this.handleSubmit(e)}>
                <fieldset>
                    <legend>Add Folder</legend>
                    <label htmlFor="name">Folder Name</label>
                    <input
                        type="text"
                        // className="add-folder__input"
                        name="name"
                        id="name"
                        // onChange={e => this.handleChange(e.target.value)}
                        onChange={this.handleChange}
                        // required
                    />
                    {errors.name.length > 0 && (
						<ValidationError /*id={'folderFolderError'}*/ message={errors.name} />)}
                    <button
                        type="submit"
                        disabled={this.state.formValid === false}
                    >
                        Submit
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
    // error: PropTypes.error
}