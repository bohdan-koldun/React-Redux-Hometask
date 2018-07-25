import React from 'react';
import { Image, Button, Modal, Rating, Container} from 'semantic-ui-react';
import dish from '../../images/dish.png';

export default ({ recipe, onClose }) => (
    recipe ? <Modal open={!!recipe} onClose={() => onClose && onClose()}>
        <Modal.Header>{recipe.title}</Modal.Header>
        <Modal.Content scrolling>
            <Image centered src={dish} size="medium" />
            <Container textAlign='center' style={{marginBottom: '25px'}}>
                <Rating
                    maxRating={5}
                    defaultRating={recipe.rating}
                    disabled
                    icon='star'
                    size='massive'
                />
            </Container>
            <Modal.Description>{recipe.description}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button icon="close" color="red" content="close" onClick={() => onClose && onClose()} />
        </Modal.Actions>
    </Modal> : null
);