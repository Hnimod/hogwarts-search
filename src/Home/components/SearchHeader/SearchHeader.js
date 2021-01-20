import React from 'react';

import { FaAlgolia, FaHeading } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
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
      <Setting onClick={props.onLogOut}>
        <FiLogOut />
      </Setting>
    </SearchContainer>
  );
};

export default SearchHeader;
