import React, { Component } from 'react';
import { Form, Button, Segment, Dropdown, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Inlineerror from '../messages/Inlineerror';
import { Link } from 'react-router-dom';


class Questionform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                questionId: this.props.question.questionId,
                title: this.props.question.title,
                author: this.props.question.author,
                dificulty: this.props.question.dificulty
            },
            loading: false,
            errors: {},
            opt: [
                { key: 'easy', text: 'Easy', value: 'easy' },
                { key: 'medium', text: 'Medium', value: 'medium' },
                { key: 'hard', text: 'Hard', value: 'hard' }
            ]
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            data: {
                questionId: props.question.questionId,
                title: props.question.title,
                author: props.question.author,
                dificulty: props.question.dificulty
            }
        })
    }

    onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));

        }
    }
    validate = (data) => {
        const errors = {};
        if (!data.title) errors.title = 'Can\'t be blank';
        if (!data.author) errors.title = 'Can\'t be blank';
        if (!data.dificulty) errors.title = 'Can\'t be blank';
        return errors;
    }


    render() {
        const { loading, errors, data } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field error={!!errors.email}>
                                    <label htmlFor="title">Question title</label>
                                    <input type="text"
                                        id="title" name="title"
                                        placeholder="Title"
                                        value={data.title}
                                        onChange={this.onChange} />
                                    {errors.title && <Inlineerror text={errors.title} />}
                                </Form.Field>
                                <Form.Field error={!!errors.author}>
                                    <label htmlFor="author">Author name</label>
                                    <input type="text"
                                        id="author" name="author"
                                        placeholder="author"
                                        value={data.author}
                                        onChange={this.onChange} /> 
                                    {errors.author && <Inlineerror text={errors.author} />}
                                </Form.Field>
                                <Form.Field>
                                    <label >Dificulty</label>
                                    <Dropdown placeholder='Dificulty' fluid multiple selection options={this.state.opt} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button.Group style={{ width: '100px' }}>
                                <Button as={Link} to="/dashboard">Cancel</Button>
                                <Button.Or />
                                <Button positive>Save</Button>
                            </Button.Group>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        );
    }
}

Questionform.propTypes = {
    submit: PropTypes.func.isRequired,
    question: PropTypes.shape({
        questionId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        dificulty: PropTypes.string.isRequired
    }).isRequired
}

export default Questionform;