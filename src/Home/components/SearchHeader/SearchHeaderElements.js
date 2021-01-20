import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';
import { breakpoint } from '../../../app-config';

export const SearchContainer = styled.div`
  max-width: 120rem;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoint.desktop}) {
    padding: 0 1rem;
  }
`;

export const Logo = styled(Link)`
  font-size: 3.5rem;
  margin: 0 1rem;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakpoint.tablet}) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin: 0;
  }
`;

export const SearchField = styled.div`
  position: relative;
  flex: 1;
  margin: 0 2rem;
`;

export const SearchInput = styled.input`
  height: 5rem;
  border: none;
  width: 100%;
  font: inherit;
  font-size: 1.8rem;
  padding-left: 8rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #c9c9c9;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    padding-left: 2rem;
    font-size: 1.6rem;
  }
`;

export const SearchIcon = styled(BsSearch)`
  position: absolute;
  left: 3rem;
  color: #ff742b;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

export const PowerBy = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;

  & > span:first-child {
    color: black;
    margin-right: 1rem;
  }

  & > svg {
    font-size: 2.5rem;
  }

  & > span:last-child {
    color: white;
    font-weight: 700;
    margin-left: 0.5rem;
  }

  @media screen and (max-width: ${breakpoint.tablet}) {
    display: none;
  }
`;

export const Setting = styled.button`
  color: white;
  font-size: 2.5rem;
  margin-left: 4rem;
  margin-right: 1rem;
  display: flex;
  justify-items: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: yellow;
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: ${breakpoint.tablet}) {
    margin-left: 0;
  }
`;
