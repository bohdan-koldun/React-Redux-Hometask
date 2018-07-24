import React from 'react';
import { Button, Container, Input } from 'semantic-ui-react';

export default ({ onCreate, listLength }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Input
            action={{ color: 'blue', labelPosition: 'right', icon: 'search', content: 'Search' }}
            placeholder='Search...'
        />
        <Button
            color='green'
            content='Add recipe'
            icon='plus'
            label={{ basic: true, color: 'blue', pointing: 'left', content: listLength }}
            onClick={() => onCreate && onCreate()}
        />
    </Container>
)