import React from 'react';
import { Image, Header, Button, Container } from 'semantic-ui-react';
import chef from '../../images/chef.jpg';

export default ({onCreate}) => (
    <Container>
        <Image centered rounded src={chef} size="medium"/>
        <Header textAlign="center" as="h3">You haven't added recipes yet?</Header>
        <Button size="big" icon="plus" content="Add one!" color="orange" onClick={() => onCreate && onCreate()} /> 
    </Container>
)
