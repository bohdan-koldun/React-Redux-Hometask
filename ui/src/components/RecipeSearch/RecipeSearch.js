import React from 'react';
import { Input } from 'semantic-ui-react';

export default ({ onSearch }) => (
    <Input
        icon='search' 
        iconPosition='left'
        placeholder='Search...'
        label={{ tag: true, color: 'blue', content: 'Search recipes' }}
        labelPosition='right'
        onChange={(e) => onSearch && onSearch(e.target.value)}
    />
);