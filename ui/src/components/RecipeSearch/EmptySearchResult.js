import React from 'react';
import { Image, Header, Container } from 'semantic-ui-react';
import chef from '../../images/chef-search.png';

export default () => (
    <Container>
        <Image centered rounded src={chef} size="medium"/>
        <Header textAlign="center" as="h3">No recipes found! Improvise and cook yourself!</Header>
    </Container>
)
