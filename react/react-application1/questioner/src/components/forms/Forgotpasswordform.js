import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Inlineerror from '../messages/Inlineerror';

class Forgotpasswordform extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                email: ''
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
            this.setState({ loading: true});
            this.props.submit(this.state.data)
            .catch(err => this.setState({ errors: err.response.data.errors, loading: false}));
            
        }
    }
    validate = (data) => {
        const errors = {};
        if(!data.email) errors.email = "Invalid email!";
        return errors;
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit} loading={this.state.loading}>
                {!!this.state.errors.global && <Message neagative>{this.state.errors.global}</Message>}
                <Form.Field error={!!this.state.errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        id="email" name="email"
                        placeholder="example@example.com"
                        value={this.state.data.email}
                        onChange={this.onChange} />
                    {this.state.errors.email && <Inlineerror text={this.state.errors.email} />}
                </Form.Field>
                <Button primary>Log in</Button>
            </Form>
        );
    }
}

Forgotpasswordform.propTypes = {
    submit: PropTypes.func.isRequired
}

export default Forgotpasswordform;