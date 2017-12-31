import React, { Component } from 'react';
import Loginform from '../forms/Loginform';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';


class Loginpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'stranger'
        }
    }

    submit = data => this.props.login(data).then(() => this.props.history.push("/dashboard"));

    onUpdate = (val) => {
        if (val) this.setState({ name: val })
        else this.setState({ name: 'stranger' })
    }

    render() {
        return (
            <Card  centered color="blue" style={{ marginTop: '100px', minHeight: '400px', width: '400px' }}>
                <Button as={Link} to="/"><Icon name="arrow left"/>Go back</Button>
                <Card.Content >
                    <Icon style={{ margin: '0 auto', display: 'block' }} name='users' circular size="big" />
                    <h1 style={{ textAlign: 'center' }}>Login page</h1>
                    <p id="welcomeBack" >Welcome back, <span id="capitalize">{this.state.name}</span> !</p>
                    <Loginform submit={this.submit} name={this.state.name} onUpdate={this.onUpdate} />
                    <Link to="/forgot_password">Forgot password</Link>
                </Card.Content>
            </Card>
        );
    }
}

Loginpage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}


export default connect(null, { login })(Loginpage);