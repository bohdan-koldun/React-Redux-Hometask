import React from 'react';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import { Button, Container} from 'semantic-ui-react';
import RatingFilter from '../Filters/RatingFilter';

export default ({ onSearch, onChooseFilter, onCreate, onViewAll, listLength }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <RatingFilter onChooseFilter={onChooseFilter} />
        <RecipeSearch onSearch={onSearch}/>
        <Button
            content='Show All Recipes'
            icon='eye'
            color='blue'
            label={{ basic: true, color: 'black', pointing: 'left', content: listLength }}
            onClick={() => onViewAll && onViewAll(true)}
        />
        <Button
            color='orange'
            content='Add new recipe'
            icon='plus'
            label={{ basic: true, color: 'black', pointing: 'left', content: listLength }}
            onClick={() => onCreate && onCreate()}
        />
    </Container>
)