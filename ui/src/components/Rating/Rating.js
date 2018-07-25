import React from 'react';
import {Rating} from 'semantic-ui-react';

export default ({rating, onRate}) => (
    <Rating icon='star' defaultRating={rating} maxRating={5} onRate ={onRate} />
);