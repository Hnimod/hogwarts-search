import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Main = styled.main`
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  background: #ff742b;
  display: flex;
  justify-content: center;
  height: 4rem;
`;

export const Header = styled.header`
  max-width: 120rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  background: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const Comments = styled.div`
  max-width: 120rem;
  width: 100%;
  padding: 2rem 1rem;
`;

export const ArticleItem = styled.div`
  max-width: 120rem;
  width: 100%;
  padding: 2rem 1rem;
`;

export const Logo = styled(Link)`
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  margin: 0 1rem;
`;

export const Dashboard = styled.h1`
  font-size: 2rem;
`;
