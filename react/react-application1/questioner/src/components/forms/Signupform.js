import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Inlineerror from '../messages/Inlineerror';

class Signupform extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
                passwordConfirm: ''
            },
            loading: false,
            errors: {}
        }
    }
    
    onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });  
            this.props.submit(this.state.data)
            .catch(err => this.setState({ errors: err.response.data.errors, loading: false}));
        }
    }

    validate = data => {
        const errors = {};
        if(!data.email) errors.email = 'Email address can\'t be blank :(';
        if(!data.password) errors.password = 'Can\'t be blank :(';
        if(!data.passwordConfirm) errors.passwordConfirm = 'This field can\'t be blank, also';  
        if(data.password !== data.passwordConfirm){
            errors.password = ' ';
            errors.passwordConfirm = 'Password doesn\'t match...';
        }
        return errors;
    }


    render(){
        return(
            <Form onSubmit={this.onSubmit} loading={this.state.loading} >
                <Form.Field error={!!this.state.errors.email}> 
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        value={this.state.data.email}
                        onChange={this.onChange}
                    />
                    {this.state.errors.email && <Inlineerror text={this.state.errors.email} />}
                </Form.Field>
                <Form.Field error={!!this.state.errors.password}> 
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Stay safe..."
                        value={this.state.data.password}
                        onChange={this.onChange}
                    />
                    {this.state.errors.password && <Inlineerror text={this.state.errors.password} />}
                </Form.Field>
                <Form.Field error={!!this.state.errors.passwordConfirm}> 
                    <label htmlFor="passwordConfirm">Confirm your password</label>
                    <input 
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="Type your password again..."
                        value={this.state.data.passwordConfirm}
                        onChange={this.onChange}
                    />
                    {this.state.errors.passwordConfirm && <Inlineerror text={this.state.errors.passwordConfirm} />}
                </Form.Field>
                <Button primary>Sign up</Button>
            </Form>
        );
    }
}


Signupform.propTypes = {
    submit: PropTypes.func.isRequired,

}

export default Signupform;