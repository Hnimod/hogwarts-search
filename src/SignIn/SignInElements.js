import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f6f8f9;
`;

export const Container = styled.div`
  background: white;
  border-radius: 10px;
  padding: 4rem;
  box-shadow: 0 5px 20px 0 rgba(21, 27, 38, 0.08);
  max-width: 440px;
  width: 100%;
`;

export const Logo = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #474747;
`;

export const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: #ffedef;
  color: #ff5263;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

export const Seperator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  font-size: 1.6rem;
  color: #cbd4db;

  & span:first-child,
  & span:last-child {
    width: 100%;
    height: 1px;
    background: #cbd4db;
  }

  & span:nth-child(2) {
    margin: 0 1rem;
  }
`;

export const EmailInput = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const PasswordInput = styled.div`
  width: 100%;
  margin-bottom: 0.8rem;
`;

export const ForgotLink = styled(Link)`
  color: #6f7782;
  font-size: 1.2rem;
`;

export const LoginBtn = styled.button`
  font: inherit;
  width: 100%;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: #ff742b;
  border: 1px solid #ff742b;
  color: white;
  border-radius: 5px;
  margin: 4rem 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ff742b;
  }
`;

export const SignUp = styled.div`
  font-size: 1.4rem;
  color: #6f7782;
  display: flex;
  justify-content: center;

  & > a:link,
  a:visited {
    text-decoration: none;
    margin-left: 1rem;
    color: #14aaf5;
  }

  & > a:hover,
  a:active {
    text-decoration: underline;
  }
`;
