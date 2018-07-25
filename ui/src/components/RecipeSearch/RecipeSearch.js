import React from 'react';
import { Input } from 'semantic-ui-react';

export default ({ onSearch }) => (
    <Input
        action={{ color: 'blue', labelPosition: 'right', icon: 'search', content: 'Search' }}
        placeholder='Search...'
        onChange={(e) => onSearch && onSearch(e.target.value)}
    />
);