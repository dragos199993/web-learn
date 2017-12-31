import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const AddQuestionCTA = () => (
    <Card centered>
        <Card.Content textAlign="center">
            <Card.Header>Add new question</Card.Header>
            <Icon name="plus circle" size="massive" />
        </Card.Content>
    </Card>
);

export default AddQuestionCTA;