import styled from 'styled-components';
import { breakpoint } from '../../../app-config';

export const Container = styled.div`
  max-width: 120rem;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

export const FilterSelections = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 2rem;
  }

  @media screen and (max-width: ${breakpoint.tablet}) {
    & > *:not(:last-child) {
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: ${breakpoint.mobileSmall}) {
    flex-direction: column;

    & > * {
      width: 10rem;
      margin: 0.5rem 0;
    }
  }
`;

export const TotalResults = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: grey;

  @media screen and (max-width: ${breakpoint.laptop}) {
    display: none;
  }
`;

export const Text = styled.span`
  margin-right: 1rem;
`;
