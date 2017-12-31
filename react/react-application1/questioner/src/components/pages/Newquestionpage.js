import React, { Component } from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Searchquestionform from '../forms/Searchquestionform';
import QuestionForm from '../forms/Questionform';

class Newquestionpage extends Component{
    constructor(props){
        super(props);
        this.state = {
            question: null
        }
    }

    addQuestion = () => console.log('works, yay');
    onQuestionSelect = question => this.setState({ question });

    render(){
        console.log(this.state.question);
        return(
            <Segment textAlign='center'>
                <h1>Search for already created questions</h1>
                <Searchquestionform onQuestionSelect={this.onQuestionSelect}/>
                {this.state.question && <QuestionForm submit={this.addQuestion} question={this.state.question}/>}
            </Segment>
        );
    }
}

export default Newquestionpage;