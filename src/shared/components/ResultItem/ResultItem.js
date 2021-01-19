import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.article`
  font-size: 1.6rem;
`;

const Title = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: black;
  font-size: 1.8rem;
`;

const Meta = styled.div`
  display: flex;
  font-size: 1.4rem;
  color: grey;
  margin-top: 1rem;

  & > *:not(:last-child) {
    border-right: 1px solid grey;
    padding-right: 1rem;
    min-width: max-content;
  }

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Point = styled.div``;
const Author = styled.div``;
const Time = styled.div``;
const Comments = styled.div``;

const Url = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const CommentText = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
`;
// eslint-disable-next-line
const Mark = styled.span`
  background: yellow;
`;

const ResultItem = (props) => {
  const [highlight, setHighlight] = useState();
  const {
    searchKey,
    type,
    title,
    commentText,
    timeStamp,
    id,
    points,
    nbComments,
    url,
    author,
  } = props;

  const createTitleMarkup = (highlight) => {
    let newTitle = title;
    if (highlight) {
      const re = new RegExp(highlight, 'i');
      newTitle = newTitle.replace(re, `<Mark>${highlight}</Mark>`);
    }
    return { __html: newTitle };
  };

  const commentMarkup = (highlight) => {
    let newComment = commentText;
    if (highlight) {
      const re = new RegExp(highlight, 'i');
      newComment = newComment.replace(re, `<Mark>${highlight}</Mark>`);
    }
    return { __html: newComment };
  };

  useEffect(() => {
    setHighlight(searchKey);
  }, [searchKey]);

  const dateDiff = new Date(Date.now() - timeStamp * 1000);
  const day = 1000 * 60 * 60 * 24;
  let time;
  const days = Math.floor(dateDiff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);
  if (years > 0) {
    time = years === 1 ? `${years} year ago` : `${years} years ago`;
  } else if (months > 0) {
    time = months === 1 ? `${months} month ago` : `${months} months ago`;
  } else if (days > 0) {
    time = days === 1 ? `${days} day ago` : `${days} days ago`;
  } else {
    time =
      dateDiff % day <= 1
        ? `${Math.round((dateDiff % day) / (1000 * 60 * 60))} hour ago`
        : `${Math.round((dateDiff % day) / (1000 * 60 * 60))} hours ago`;
  }

  return (
    <Container>
      {type === 'story' && (
        <Title
          to={{ pathname: `/article/${id}`, state: { nbComments } }}
          dangerouslySetInnerHTML={createTitleMarkup(highlight)}
        ></Title>
      )}
      <Meta>
        <Point>
          {points ? points : 0} {points > 1 ? 'points' : 'point'}
        </Point>
        <Author>{author}</Author>
        <Time>{time}</Time>
        {type === 'story' && (
          <Comments>
            {nbComments ? nbComments : 0}{' '}
            {nbComments > 1 ? 'comments' : 'comment'}
          </Comments>
        )}
        {type === 'comment' && <Comments>on {title}</Comments>}
        <Url>{url}</Url>
      </Meta>
      {type === 'comment' && (
        <CommentText
          dangerouslySetInnerHTML={commentMarkup(highlight)}
        ></CommentText>
      )}
    </Container>
  );
};

export default ResultItem;
