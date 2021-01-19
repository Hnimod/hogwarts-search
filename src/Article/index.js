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

const Article = (props) => {
  const [data, setData] = useState();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    axios
      .get(`http://hn.algolia.com/api/v1/items/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
        {!!data && (
          <>
            <ArticleItem>
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
                  state.nbComments ? state.nbComments : data.children.length
                }
                url={data.url ? data.url : data.story_url}
                author={data.author}
              />
            </ArticleItem>
            <Comments>
              {data.children.map((child) => nestedComments(child))}
            </Comments>
          </>
        )}
      </Container>
    </Main>
  );
};

export default Article;
