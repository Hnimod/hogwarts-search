import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../shared/context/authContext';
import SearchHeader from './components/SearchHeader/SearchHeader';
import ResultItem from '../shared/components/ResultItem/ResultItem';
import Filter from './components/Filter/Filter';
import Pagination from './components/Pagination/Pagination';
import Spinner from '../shared/components/Spinner/Spinner';
import {
  Header,
  Main,
  FilterContainer,
  ResultsContainer,
  ResultItems,
} from './HomeElements';

const initialState = {
  data: [],
  curPage: 0,
  nbPages: 0,
  curQuery: '',
  tag: 'stories',
  sortBy: 'popularity',
  dateRange: 'all-time',
  searchKey: '',
  nbHits: 0,
  processTime: 0,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DEFAULT':
      return {
        ...state,
        data: [...action.data],
        curPage: action.curPage,
        nbPages: action.nbPages,
        curQuery: action.curQuery,
        nbHits: action.nbHits,
        processTime: action.processTime,
      };
    case 'PAGE_CHANGED':
      return {
        ...state,
        data: [...action.data],
        curPage: action.curPage,
        nbPages: action.nbPages,
        curQuery: action.curQuery,
      };
    case 'TAG_CHANGED':
      return {
        ...state,
        tag: action.tag,
      };
    case 'SORT_BY_CHANGED':
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case 'DATE_RANGE_CHANGED':
      return {
        ...state,
        dateRange: action.dateRange,
      };
    case 'SEARCH_KEY_CHANGED':
      return {
        ...state,
        searchKey: action.searchKey,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'LOADED':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error('Unhandled action');
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useContext(AuthContext);

  const constructQuery = useCallback(
    (searchTag, sortBy, dateRange, searchKey) => {
      const tags = {
        all: '(story,comment)',
        stories: 'story',
        comments: 'comment',
      };

      const dateRanges = {
        'all-time': '',
        'last-24h': Math.round(Date.now() / 1000 - 24 * 60 * 60),
        'past-week': Math.round(
          Date.now() / 1000 - (new Date(Date.now()).getDay() + 7) * 24 * 60 * 60
        ),
        'past-month': Math.round(
          Date.now() / 1000 -
            (new Date(Date.now()).getDate() + 30) * 24 * 60 * 60
        ),
        'past-year': Math.round(
          Date.now() / 1000 -
            (new Date(Date.now()).getMonth() + 13) * 30 * 24 * 60 * 60
        ),
      };
      const sort = sortBy === 'popularity' ? 'search' : 'search_by_date';
      const date =
        dateRanges[dateRange] === ''
          ? ''
          : `created_at_i>${dateRanges[dateRange]}`;

      const query = `http://hn.algolia.com/api/v1/${sort}?query=${encodeURIComponent(
        searchKey
      )}&tags=${tags[searchTag]}&numericFilters=${date}&page=${state.curPage}`;

      return query;
    },
    [state.curPage]
  );

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    const initialQuery = constructQuery(
      state.tag,
      state.sortBy,
      state.dateRange,
      state.searchKey
    );

    axios
      .get(initialQuery)
      .then((res) => {
        dispatch({ type: 'LOADED' });
        dispatch({
          type: 'DEFAULT',
          data: res.data.hits,
          curPage: res.data.page,
          nbPages: res.data.nbPages,
          curQuery: initialQuery,
          nbHits: res.data.nbHits,
          processTime: res.data.processingTimeMS,
        });
      })
      .catch((err) => {
        dispatch({ type: 'LOADED' });
        console.log(err);
      });
  }, [
    state.tag,
    state.sortBy,
    state.dateRange,
    state.searchKey,
    constructQuery,
  ]);

  const onPageClick = (page) => {
    dispatch({ type: 'LOADING' });
    const newQuery = state.curQuery.replace(/page=\d+$/, `page=${page}`);
    axios
      .get(newQuery)
      .then((res) => {
        dispatch({ type: 'LOADED' });
        dispatch({
          type: 'PAGE_CHANGED',
          data: res.data.hits,
          curPage: res.data.page,
          nbPages: res.data.nbPages,
          curQuery: newQuery,
        });
      })
      .catch((err) => {
        dispatch({ type: 'LOADED' });
        console.log(err);
      });
  };

  const onFilterChanged = (field, value) => {
    switch (field) {
      case 'Search':
        return dispatch({ type: 'TAG_CHANGED', tag: value.toLowerCase() });
      case 'by':
        return dispatch({
          type: 'SORT_BY_CHANGED',
          sortBy: value.toLowerCase(),
        });
      case 'for':
        return dispatch({
          type: 'DATE_RANGE_CHANGED',
          dateRange: value.toLowerCase().replace(' ', '-'),
        });
      default:
        return;
    }
  };

  const onSearchKeyChanged = (value) => {
    dispatch({ type: 'SEARCH_KEY_CHANGED', searchKey: value });
  };

  const logOutHandler = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <Main>
      <Header>
        <SearchHeader
          onInputChanged={onSearchKeyChanged}
          onLogOut={logOutHandler}
        />
      </Header>
      <FilterContainer>
        <Filter
          onSelectChange={onFilterChanged}
          totalResults={state.nbHits}
          after={state.processTime}
        />
      </FilterContainer>
      <ResultsContainer>
        {state.loading && <Spinner />}
        <ResultItems>
          {!!state.data ? (
            state.data.map((data) => (
              <ResultItem
                key={data.objectID}
                searchKey={state.searchKey}
                type={data._tags[0]}
                title={data.title}
                commentText={data.comment_text}
                timeStamp={data.created_at_i}
                id={data.objectID}
                points={data.points}
                nbComments={data.num_comments}
                url={data.url ? data.url : data.story_url}
                author={data.author}
                to={{
                  pathname: `/article/${data.objectID}`,
                  state: { nbComments: data.num_comments },
                }}
              />
            ))
          ) : (
            <Spinner />
          )}
        </ResultItems>
        <Pagination
          curPage={state.curPage}
          nbPages={state.nbPages}
          onPageClick={onPageClick}
        />
      </ResultsContainer>
    </Main>
  );
};

export default Home;
