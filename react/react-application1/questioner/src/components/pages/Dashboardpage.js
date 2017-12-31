import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allQuestionsSelector } from '../../reducers/questions';
import AddQuestionCTA from '../cta/AddQuestionCTA';
import { Link } from 'react-router-dom';
const Dashboard = ({ isConfirmed, questions }) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {!questions.length && 
        <Link to="/questions/new"><AddQuestionCTA/></Link>
        }
    </div>
)

Dashboard.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired)
}

function mapStateToProps(state){
    return {
        isConfirmed: !!state.user.confirmed,
        questions: allQuestionsSelector(state)

    }
}

export default connect(mapStateToProps)(Dashboard);