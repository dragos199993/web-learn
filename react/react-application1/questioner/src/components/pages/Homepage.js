import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import { Segment, Button, Divider, Grid } from 'semantic-ui-react';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import monitor from '../../others/monitor.svg';
const Homepage = ({ isAuthenticated, logout }) => (
    <div>
        {isAuthenticated ?
            <button onClick={() => logout()}>Log out</button>
            :
            <Grid stackable divided="vertically">
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <img style={{paddingTop:"100px"}} src={monitor} alt="Monitor" />
                    </Grid.Column>
                    <Grid.Column style={{marginTop: '100px'}}>
                        <Card fluid raised color='orange'>
                            <Card.Content style={{ padding:'5em 1em'}}>
                                <Card.Header>
                                    Welcome to this application
                                </Card.Header>
                                <Card.Description>
                                    If you don't have an account you can create one in few easy stepts.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Segment padded>
                            <Button as={Link} to="/login" primary fluid>Login</Button>
                            <Divider horizontal>Or</Divider>
                            <Button as={Link} to="/signup" secondary fluid>Sign Up Now</Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        }
    </div>
)

Homepage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, { logout: actions.logout })(Homepage);