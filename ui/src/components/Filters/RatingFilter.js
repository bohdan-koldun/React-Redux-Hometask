import React from 'react'
import { Dropdown, Icon, Header} from 'semantic-ui-react'


const options = [
  {
    key: 'none',
    text: 'none',
    value: 'none',
    content: 'none',
  },
  {
    key: 'increasing',
    text: 'increasing',
    value: 'increasing',
    content: 'increasing',
  },
  {
    key: 'descending',
    text: 'descending',
    value: 'descending',
    content: 'descending',
  },
]


export default ({onChooseFilter}) => (
  <Header as='h4'>
    <Icon name='chart line' />
    <Header.Content>
      Sort rating{' '}
      <Dropdown
        inline
        header='Sort in order of'
        options={options}
        defaultValue={options[0].value}
        onChange={(e,  { value }) => onChooseFilter && onChooseFilter(value)}
      />
    </Header.Content>
  </Header>
);

