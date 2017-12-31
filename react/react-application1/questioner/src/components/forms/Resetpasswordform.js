import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Inlineerror from '../messages/Inlineerror';

class Resetpasswordform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                token: this.props.token,
                password: '',
                passwordConfirmation: ''
            },
            loading: false,
            errors: {}
        }
    }

    onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));

        }
    }
    validate = (data) => {
        const errors = {};
        if (!data.password) errors.password = "Can't be blank.";
        if(!data.passwordConfirmation) errors.passwordConfirmation = "This can't be blank too";
        if (data.password !== data.passwordConfirmation) errors.password = 'Password must match!';
        return errors;
    }
    render() {
        const { errors, data, loading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">New Password</label>
                    <input type="password"
                        id="password" name="password"
                        placeholder="Enter a new password"
                        value={data.password}
                        onChange={this.onChange} />
                    {errors.password && <Inlineerror text={errors.password} />}
                </Form.Field>
                <Form.Field error={!!errors.passwordConfirmation}>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password"
                        id="passwordConfirmation" name="passwordConfirmation"
                        placeholder="Please retype the password"
                        value={data.passwordConfirmation}
                        onChange={this.onChange} />
                    {errors.passwordConfirmation && <Inlineerror text={errors.passwordConfirmation} />}
                </Form.Field>
                <Button primary>Reset</Button>
            </Form>
        );
    }
}

Resetpasswordform.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
}

export default Resetpasswordform;