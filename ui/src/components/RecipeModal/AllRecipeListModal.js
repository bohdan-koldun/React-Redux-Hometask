import React from 'react';
import { Image, Button, Modal, Rating, Container, Header, Divider, Statistic } from 'semantic-ui-react';
import dish from '../../images/dish.png';

export default ({ recipes, onClose }) => (
    recipes ? <Modal open={!!recipes} onClose={() => onClose && onClose()}>
        <Modal.Header>
            All Recipe List
        </Modal.Header>
        <Modal.Content scrolling>{
            recipes.map((recipe, index) => (
                <Container key={index}>
                    <Statistic floated='left' size='tiny'>
                        <Statistic.Value>{index + 1}</Statistic.Value>
                        <Statistic.Label>recipy</Statistic.Label>
                    </Statistic>
                    <Image centered src={dish} size="medium" />
                    <Header as='h2' icon textAlign='center'>
                        <Header.Content>{recipe.title}</Header.Content>
                    </Header>
                    <Container textAlign='center' style={{ marginBottom: '25px' }}>
                        <Rating
                            maxRating={5}
                            defaultRating={recipe.rating}
                            disabled
                            icon='star'
                            size='massive'
                        />
                    </Container>
                    <Container textAlign='center'> {recipe.description}  </Container>
                    <Divider />
                </Container>

            ))
        }
        </Modal.Content>
        <Modal.Actions>
            <Button icon="close" color="red" content="close" onClick={() => onClose && onClose()} />
        </Modal.Actions>
    </Modal> : null
);

