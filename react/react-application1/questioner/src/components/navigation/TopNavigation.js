import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';

const TopNavigation = ({ logout,user }) => (
    <Menu secondary pointing>
        <Menu.Item as={Link} to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/dashboard" >Dashboard</Menu.Item>
        <Menu.Menu position="right">
            <Dropdown trigger={<Image circular size="mini" src={gravatarUrl(user.email)} />}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logout()}>>Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

function mapStateToProps(state){
    return{
        user: state.user
    }
}

TopNavigation.propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired

}

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);
