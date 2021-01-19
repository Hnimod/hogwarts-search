import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ImNext2, ImPrevious2 } from 'react-icons/im';

const Container = styled.ul`
  list-style: none;
  display: flex;
  font-size: 1.4rem;
  margin: 2rem 0;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }

  & > * {
    padding: 0.5rem 1rem;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const PageNum = styled.li`
  border: 1px solid ${({ disabled }) => (disabled ? '#ff742b' : 'grey')};
`;

const PagePrev = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageNext = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pagination = (props) => {
  const [pagination, setPagination] = useState([]);
  const { curPage, nbPages, onPageClick } = props;

  useEffect(() => {
    const temp = [];
    for (
      let i = Math.max(1, curPage - 1);
      i <= Math.min(curPage + 3, nbPages);
      ++i
    ) {
      temp.push(
        <PageNum
          key={i}
          id={i}
          onClick={() => onPageClick(i - 1)}
          disabled={i === curPage + 1}
        >
          {i}
        </PageNum>
      );
    }
    setPagination(temp);
  }, [curPage, nbPages, onPageClick]);

  return (
    <Container>
      {props.curPage - 2 > 0 && (
        <PagePrev onClick={() => onPageClick(0)}>
          <ImPrevious2 />
        </PagePrev>
      )}
      {pagination}
      {props.curPage + 2 < props.nbPages && (
        <PageNext onClick={() => onPageClick(nbPages - 1)}>
          <ImNext2 />
        </PageNext>
      )}
    </Container>
  );
};

export default Pagination;
