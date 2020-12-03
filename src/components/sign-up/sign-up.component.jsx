import React from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    // handleSubmit method
    handleSubmit = async event => {
        //prevent default submitting of form data
        event.preventDefault();

        // destructures values from the state
        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword) {
            alert("Password don't match");
            return;
        }

        try {
            // used new auth method to create email address and password
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            
            // run createUserProfileDocument method with values user and display name
            await createUserProfileDocument(user, { displayName });
            
            // set state to intial state which is empty
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error) {
            console.error(error);

        }
    };

    // handleChange method
    handleChange = event => {
        // destructure the event from the target
        const { name, value } = event.target;

        // dynamically set the name and value in setState
        this.setState({ [name]: value });
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label= 'Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label= 'Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label= 'Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label= 'Confirm Password'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </div>
        )
    }
}

export default SignUp;