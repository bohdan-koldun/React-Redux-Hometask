import React from 'react';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import { Button, Container} from 'semantic-ui-react';
import RatingFilter from '../Filters/RatingFilter';

export default ({ onSearch, onChooseFilter, onCreate, onViewAll, listLength }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <RecipeSearch onSearch={onSearch}/>
        <RatingFilter onChooseFilter={onChooseFilter} />
        <Button
            content='Show All Recipes'
            icon='eye'
            color='blue'
            onClick={() => onViewAll && onViewAll(true)}
        />
        <Button
            color='orange'
            content='Add new recipe'
            icon='plus'
            label={{ basic: true, color: 'blue', pointing: 'left', content: listLength }}
            onClick={() => onCreate && onCreate()}
        />
    </Container>
)