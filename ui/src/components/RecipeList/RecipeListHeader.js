import React from 'react';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import { Button, Container} from 'semantic-ui-react';

export default ({ onSearch, onCreate, listLength }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <RecipeSearch onSearch={onSearch}/>
        <Button
            color='orange'
            content='Add new recipe'
            icon='plus'
            label={{ basic: true, color: 'blue', pointing: 'left', content: listLength }}
            onClick={() => onCreate && onCreate()}
        />
    </Container>
)