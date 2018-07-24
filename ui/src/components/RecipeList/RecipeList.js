import React from 'react';
import { Image, Button, Card, Rating } from 'semantic-ui-react';
import dish from '../../images/dish.png';

export default ({ recipes, onEdit, onDelete, onView }) => (
    <Card.Group>
        {recipes && recipes.map((recipe, index) => (
            <Card key={index}>
                <Card.Content style={{textAlign: 'left'}}>
                    <Image size="tiny" floated="right" src={dish} />
                    <Card.Header>
                        {recipe.title}  
                    </Card.Header>
                    <Card.Meta style={{marginTop: '7px'}}><Rating icon='star' defaultRating={3} maxRating={5} /></Card.Meta>
                    <Card.Description>
                        {recipe.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui tree buttons'>
                        <Button basic color="blue" icon="eye" content="Show" onClick={() => onView && onView(recipe._id)} />
                        <Button basic color="teal" icon="pencil" content="Edit" onClick={() => onEdit && onEdit(recipe._id)} />
                        <Button basic color="red" icon="trash" onClick={() => onDelete && onDelete(recipe._id)} />
                    </div>
                </Card.Content>
            </Card>
        ))}
    </Card.Group>

)