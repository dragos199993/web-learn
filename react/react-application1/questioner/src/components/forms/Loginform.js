import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Inlineerror from '../messages/Inlineerror';

class Loginform extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            data: {
                email: '',
                password: ''
            },
            loading: false,
            errors: {}
        }
    }

    onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }}, this.props.onUpdate(e.target.value));
    onChangePassword = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }});
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true});
            this.props.submit(this.state.data)
            .catch(err => this.setState({ errors: err.response.data.errors, loading: false}));
            
        }
    }
    validate = (data) => {
        const errors = {};
        if(!data.email) errors.email = "Invalid email!";
        if(!data.password) errors.password = "Can't be blank.";
        return errors;
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} loading={this.state.loading}>
                { this.state.errors.global && 
                <Message negative>
                    <Message.Header>Oops! Something went wrong...</Message.Header>
                    <p>{this.state.errors.global}</p>
                </Message>}
                <Form.Field error={!!this.state.errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        id="email" name="email"
                        placeholder="example@example.com"
                        value={this.state.data.email}
                        onChange={this.onChange} />
                    {this.state.errors.email && <Inlineerror text={this.state.errors.email} />}
                </Form.Field>
                <Form.Field error={!!this.state.errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password" name="password"
                        placeholder="Enter a password"
                        value={this.state.data.password}
                        onChange={this.onChangePassword} />
                    {this.state.errors.password && <Inlineerror text={this.state.errors.password} />}
                </Form.Field>
                <Button primary>Log in</Button>
            </Form>
        );
    }
}

Loginform.propTypes = {
    submit: PropTypes.func.isRequired
}

export default Loginform;