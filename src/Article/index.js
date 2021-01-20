import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaHeading } from 'react-icons/fa';
import {
  Main,
  Header,
  Container,
  ArticleItem,
  Comments,
  Logo,
  HeaderContainer,
  Dashboard,
} from './ArticleElements';
import ResultItem from '../shared/components/ResultItem/ResultItem';
import Comment from './components/Comment';
import Spinner from '../shared/components/Spinner/Spinner';

const Article = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://hn.algolia.com/api/v1/items/${id}`)
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [id]);

  const nestedComments = (child) => {
    if (child.children.length === 0) {
      return (
        child.author && (
          <Comment
            key={child.id}
            author={child.author}
            timeStamp={child.created_at_i * 1000}
            commentText={child.text}
          ></Comment>
        )
      );
    }
    return (
      <Comment
        key={child.id}
        author={child.author}
        timeStamp={child.created_at_i * 1000}
        commentText={child.text}
      >
        {child.children.map((el) => nestedComments(el))}
      </Comment>
    );
  };

  return (
    <Main>
      <HeaderContainer>
        <Header>
          <Logo to="/">
            <FaHeading />
          </Logo>
          <Dashboard>Hogwarts News</Dashboard>
        </Header>
      </HeaderContainer>
      <Container>
        {isLoading && <Spinner />}
        {!!data && (
          <>
            <ArticleItem>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                {' '}
              </a>

              <ResultItem
                key={data.objectID}
                id={data.objectID}
                searchKey={''}
                type={data.type}
                title={data.title}
                commentText={data.comment_text}
                timeStamp={data.created_at_i}
                points={data.points}
                nbComments={
                  !!state.nbComments ? state.nbComments : data.children.length
                }
                url={data.url ? data.url : data.story_url}
                author={data.author}
                to="/"
                disable={true}
              />
            </ArticleItem>
            <Comments>
              {data.children.length === 0 && (
                <h4 style={{ fontSize: '2rem' }}>No comments yet</h4>
              )}
              {data.children.map((child) => nestedComments(child))}
            </Comments>
          </>
        )}
      </Container>
    </Main>
  );
};

export default Article;
