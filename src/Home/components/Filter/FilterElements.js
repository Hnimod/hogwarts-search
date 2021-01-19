import styled from 'styled-components';

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
`;

export const TotalResults = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: grey;
`;

export const Text = styled.span`
  margin-right: 1rem;
`;
