import React from 'react';
import styled from 'styled-components';
import { breakpoint } from '../../app-config';

const Container = styled.div`
  margin: 1.6rem 0;

  & > *:not(:first-child) {
    margin-left: 3rem;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    & > *:not(:first-child) {
      margin-left: 1.2rem;
    }
  }
`;

const MainComment = styled.div``;
const Meta = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  color: grey;
`;

const Text = styled.div`
  font-size: 1.4rem;
  line-height: 24px;
`;

const Comment = (props) => {
  const { author, timeStamp, commentText } = props;

  const createComment = () => {
    return { __html: commentText };
  };

  return (
    <Container>
      <MainComment>
        <Meta>
          {author} on{' '}
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date(timeStamp))}
        </Meta>
        <Text dangerouslySetInnerHTML={createComment()}></Text>
      </MainComment>
      {props.children}
    </Container>
  );
};

export default Comment;
