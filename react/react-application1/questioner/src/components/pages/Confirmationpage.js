import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class Confirmationpage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            success: false
        }
    }

    componentDidMount(){
        this.props.confirm(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true}))
            .catch(() => this.setState({ loading: false, success: false}));
    }

    render(){
        const { loading, success } = this.state;
        return(
            <div>
                {loading && <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Header>Validating your email...</Message.Header>
                </Message>}

                {!loading && success && <Message success icon>
                    <Icon name="checkmark" />
                    <Message.Content>
                        <Message.Header>Thank you. Your account has been verified.</Message.Header>
                        <Link to="/dashboard">Go to your dashboard</Link>
                    </Message.Content>
                </Message>}

                {!loading && !success && <Message warning icon>
                    <Icon name="warning" />
                    <Message.Content>
                        <Message.Header>Oops! Something went wrong.</Message.Header>
                    </Message.Content>
                </Message>}
            </div>
        );
    }
}

Confirmationpage.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}


export default connect(null, { confirm })(Confirmationpage);