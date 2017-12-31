import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Signupform from '../forms/Signupform';
import { signup } from '../../actions/users';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Signuppage extends Component {

    submit = data => this.props.signup(data).then(() => this.props.history.push('/dashboard'));

    render() {
        return (
            <Card centered color="blue" style={{ marginTop: '100px', minHeight: '400px', width: '400px' }}>
                <Button as={Link} to="/"><Icon name="arrow left" />Go back</Button>
                <Card.Content >
                    <Icon style={{ margin: '20px auto', display: 'block' }} name='beer' size="huge" />
                    <h1 style={{ textAlign: 'center' }}>Sign up</h1>
                    <p id="welcomeBack" >It's easy to create an account.</p>
                    <Signupform submit={this.submit} />
                </Card.Content>
            </Card>
        );
    }
}


Signuppage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}

export default connect(null, { signup })(Signuppage);