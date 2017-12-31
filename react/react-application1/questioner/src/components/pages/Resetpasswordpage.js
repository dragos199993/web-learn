import React, { Component } from 'react';
import { Message, Icon, Card, Button, } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateToken, resetPassword } from '../../actions/auth';
import Resetpasswordform from '../forms/Resetpasswordform';
import { Link } from 'react-router-dom';



class Resetpasswordpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            success: false
        }
    }

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true })
                .catch(() => this.setState({ loading: false, success: false })));
    }

    submit = data => this.props.resetPassword(data).then(() => this.props.history.push('/login'));

    render() {
        const { loading, success } = this.state;
        const token = this.props.match.params.token;
        return (
            <div>
                {loading && <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Header>Reseting your password...</Message.Header>
                </Message>}

                {!loading && success &&
                    <Card centered color="blue" style={{ marginTop: '100px', minHeight: '340px', width: '400px' }}>
                        <Button as={Link} to="/"><Icon name="arrow left" />Go back</Button>
                        <Card.Content >
                            <Icon style={{ margin: '20px auto', display: 'block' }} name='smile' size="huge" />
                            <h1 style={{ textAlign: 'center' }}>Almost done.</h1>
                            <Resetpasswordform submit={this.submit} token={token} />
                        </Card.Content>
                    </Card>}

                {!loading && !success && <Message warning icon>
                    <Icon name="warning" />
                    <Message.Content>
                        <Message.Header>Oops! Something went wrong. (Invalid Token)</Message.Header>
                    </Message.Content>
                </Message>}
            </div>
        );
    }
}

Resetpasswordpage.propTypes = {
    validateToken: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}


export default connect(null, { validateToken, resetPassword })(Resetpasswordpage);