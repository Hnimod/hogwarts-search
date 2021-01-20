import styled from 'styled-components';

export const Main = styled.main`
  overflow: hidden;
`;

export const Header = styled.header`
  width: 100%;
  height: 8rem;
  background: #ff742b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterContainer = styled.div`
  background: white;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

export const ResultsContainer = styled.div`
  background: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const ResultItems = styled.div`
  max-width: 120rem;
  width: 100%;
  padding: 1rem;

  & > *:not(:last-child) {
    border-bottom: 1px solid lightgray;
    padding-bottom: 2rem;
  }

  & > *:not(:first-child) {
    padding-top: 1rem;
  }
`;
