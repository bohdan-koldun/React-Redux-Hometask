import React from 'react';
import { Image, Button, Card} from 'semantic-ui-react';
import RecipeRating from '../Rating/RecipeRating';
import dish from '../../images/dish.png';

export default ({ recipes, onEdit, onDelete, onView, onRate }) => (
    <Card.Group centered>
        {recipes && recipes.map((recipe, index) => (
            <Card key={index}>
                <Card.Content style={{textAlign: 'left'}}>
                    <Image sizзаe="tiny" floated="right" src={dish} />
                    <Card.Header>
                        {recipe.title}  
                    </Card.Header>
                    <Card.Meta style={{marginTop: '7px'}}><RecipeRating key={recipe.title} rating = {recipe.rating} onRate={(e, {rating}) => onRate && onRate(recipe._id, rating)} /></Card.Meta>
                    <Card.Description>
                        {recipe.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui tree buttons'>
                        <Button basic color="blue" icon="eye" content="Show" onClick={() => onView && onView(recipe._id)} />
                        <Button basic color="teal" icon="pencil" content="Edit" onClick={() => onEdit && onEdit(recipe._id)} />
                        <Button basic color="red" icon="trash"  onClick={() => onDelete && onDelete(recipe._id)} />
                    </div>
                </Card.Content>
            </Card>
        ))}
    </Card.Group>

)