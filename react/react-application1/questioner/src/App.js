import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Loginpage from './components/pages/Loginpage';
import Forgotpasswordpage from './components/pages/Forgotpasswordpage';
import Signuppage from './components/pages/Signuppage';
import Dashboardpage from './components/pages/Dashboardpage';
import Newquestionpage from './components/pages/Newquestionpage';
import Confirmationpage from './components/pages/Confirmationpage';
import Resetpasswordpage from './components/pages/Resetpasswordpage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopNavigation from './components/navigation/TopNavigation';

const App = ({ location, isAuthenticated }) => <div className="ui container">
    {isAuthenticated && <TopNavigation />} {/* Display the navigation only if the user is authenticated */}
    <Route location={ location } exact path="/" component={Homepage} />
    <Route location={ location } exact path="/confirmation/:token" component={Confirmationpage} />
    <Route location={ location } exact path="/reset_password/:token" component={Resetpasswordpage} />
    <GuestRoute location={ location } exact path="/login" component={Loginpage} />
    <GuestRoute location={ location } exact path="/forgot_password" component={Forgotpasswordpage} />
    <GuestRoute location={ location } exact path="/signup" component={Signuppage} />
    <UserRoute location={ location } exact path="/dashboard" component={Dashboardpage} />
    <UserRoute location={ location } exact path="/questions/new" component={Newquestionpage} />
  </div>

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.user.email
  }
}

export default connect(mapStateToProps)(App);
