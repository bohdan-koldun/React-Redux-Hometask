import React from 'react';
import { Image, Button, Modal } from 'semantic-ui-react';
import dish from '../../images/dish.png';

export default ({ recipe, onClose }) => (
    recipe ? <Modal open={!!recipe} onClose={() => onClose && onClose()}>
        <Modal.Header>{recipe.title}</Modal.Header>
        <Modal.Content scrolling>
            <Image centered src={dish} size="medium" />
            <Modal.Description>{recipe.description}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color="green" content="close" onClick={() => onClose && onClose()}/>
        </Modal.Actions>
    </Modal> : null
);