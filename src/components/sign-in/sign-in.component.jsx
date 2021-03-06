import React from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import { connect } from 'react-redux';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

// handleSubmit method
handleSubmit = async event => {
    //prevent default submitting of form data
    event.preventDefault();

    // destructures values from the state
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);
    
};

handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
};

    render() {
        const { googleSignInStart } = this.props;
        return(
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} handleChange={this.handleChange} label="email" required />
                    <FormInput name="password" type="password" value={this.state.password} handleChange={this.handleChange} label="password" required />
                   <div className='buttons'>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type="button" type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                   </div>
                </form>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);