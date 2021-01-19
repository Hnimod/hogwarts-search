import React from 'react';

import Selection from '../Selection/Selection';
import { RiShareLine } from 'react-icons/ri';
import {
  Container,
  FilterSelections,
  TotalResults,
  Text,
} from './FilterElements';

const Filter = (props) => {
  return (
    <Container>
      <FilterSelections>
        <Selection
          title="Search"
          options={['Stories', 'Comments', 'All']}
          onSelectChange={props.onSelectChange}
        />
        <Selection
          title="by"
          options={['Popularity', 'Date']}
          onSelectChange={props.onSelectChange}
        />
        <Selection
          title="for"
          options={[
            'All time',
            'Last 24h',
            'Past Week',
            'Past Month',
            'Past Year',
          ]}
          onSelectChange={props.onSelectChange}
        />
      </FilterSelections>
      <TotalResults>
        <Text>{`${new Intl.NumberFormat('en-US').format(
          props.totalResults
        )} results (${Number(props.after) / 1000} seconds)`}</Text>
        <RiShareLine />
      </TotalResults>
    </Container>
  );
};

export default Filter;
