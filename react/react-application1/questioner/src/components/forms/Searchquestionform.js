import React, { Component } from 'react';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Searchquestionform extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            loading: false,
            options: [],
            questions: {}
        }
    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({ query: data });
        this.timer = setTimeout(this.fetchOptions, 1000);
    }

    onChange = (e, data) => {
        this.setState({ query: data.value});
        this.props.onQuestionSelect(this.state.questions[data.value]);
    }

    fetchOptions = () => {
        if(!this.state.query) return;
        this.setState({ loading:true });
        axios.get(`/api/questions/search?q=${this.state.query}`) //search with the name of query
            .then( res => res.data.questions)
            .then( questions => {
                const options = [];
                const questionsHash = {};
                questions.forEach(question => {
                    questionsHash[question.questionId] = question;
                    options.push({
                        key: question.questionId,
                        value: question.questionId,
                        text: question.title
                    });
                });
                this.setState({
                    loading: false,
                    options,
                    questions: questionsHash
                })
                
            })
    }

    render(){
        return(
            <Form>
                <Dropdown 
                search 
                selection
                fluid 
                placeholder="Search question by keyword"
                value={ this.state.query.searchQuery }
                onSearchChange={this.onSearchChange}
                options={ this.state.options }
                loading={ this.state.loading }
                onChange={this.onChange} />
            </Form>
        );
    }
}

Searchquestionform.propTypes = {
    onQuestionSelect: PropTypes.func.isRequired,
    value: PropTypes.string
}


export default Searchquestionform;