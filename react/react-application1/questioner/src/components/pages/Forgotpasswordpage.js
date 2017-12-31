import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Forgotpasswordform from '../forms/Forgotpasswordform';
import { resetPasswordRequest } from '../../actions/auth';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
class Forgotpasswordpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false
        }
    }

    submit = data => this.props.resetPasswordRequest(data)
        .then(() => this.setState({ success: true }));

    render() {
        return (
            <div>
                {this.state.success ?
                    <Message success size="big" style={{marginTop:'150px',textAlign:'center'}}>
                        <Icon name="checkmark" />
                        Email has been sent. You will recieve a link that will allow you to reset your password.
                    </Message>
                    :
                    <Card centered color="blue" style={{ marginTop: '100px', minHeight: '340px', width: '400px' }}>
                        <Button as={Link} to="/"><Icon name="arrow left" />Go back</Button>
                        <Card.Content >
                            <Icon style={{ margin: '20px auto', display: 'block' }} name='save' size="big" />
                            <h1 style={{ textAlign: 'center' }}>It happens...</h1>
                            <Forgotpasswordform submit={this.submit} />
                        </Card.Content>
                    </Card>
                }
            </div>
        );
    }
}

Forgotpasswordpage.propTypes = {
    resetPasswordRequest: PropTypes.func,
}

export default connect(null, { resetPasswordRequest })(Forgotpasswordpage);