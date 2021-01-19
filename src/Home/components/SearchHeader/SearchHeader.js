import React from 'react';

import { FaAlgolia, FaHeading } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';
import {
  SearchContainer,
  Logo,
  SearchField,
  SearchInput,
  SearchIcon,
  PowerBy,
  Setting,
} from './SearchHeaderElements';

const SearchHeader = (props) => {
  return (
    <SearchContainer>
      <Logo to="/">
        <FaHeading />
      </Logo>
      <SearchField>
        <SearchInput
          placeholder="Search stories by title, url or author"
          onChange={(e) => props.onInputChanged(e.target.value)}
        />
        <SearchIcon />
      </SearchField>
      <PowerBy>
        <span>by</span>
        <FaAlgolia />
        <span>algolia</span>
      </PowerBy>
      <Setting to="/">
        <VscSettings />
      </Setting>
    </SearchContainer>
  );
};

export default SearchHeader;
