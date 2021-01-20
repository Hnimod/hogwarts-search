import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../shared/context/authContext';
import {
  Wrapper,
  Container,
  Logo,
  Warning,
  Seperator,
  EmailInput,
  PasswordInput,
  ForgotLink,
  LoginBtn,
  SignUp,
} from './SignInElements';
import Input from './components/Input';
import { FaHeading } from 'react-icons/fa';
import Spinner from '../shared/components/Spinner/Spinner';

const SignIn = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const userNameHandler = (val) => {
    setuserName(val);
  };

  const passwordHandler = (val) => {
    setPassword(val);
  };

  const loginSubmitHander = (e) => {
    e.preventDefault();
    const correctPassword = '123456';
    if (!!userName && !!password) {
      setIsLoading(true);
      axios
        .get(`http://hn.algolia.com/api/v1/users/${userName}`)
        .then((res) => {
          setIsLoading(false);
          if (!!res.data.id && password === correctPassword) {
            setError(false);
            auth.login(res.data.id);
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          setError(true);
        });
    }
  };

  return (
    <Wrapper>
      <Container>
        <Logo>Hogwarts Search</Logo>
        {isLoading && <Spinner />}
        {error && <Warning>The username or password is not correct.</Warning>}
        <Seperator>
          <span></span>
          <span>
            <FaHeading />
          </span>
          <span></span>
        </Seperator>
        <EmailInput>
          <Input
            title="User name"
            type="text"
            onInputChange={(e) => userNameHandler(e.target.value)}
          />
        </EmailInput>
        <PasswordInput>
          <Input
            title="Password"
            type="password"
            onInputChange={(e) => passwordHandler(e.target.value)}
          />
        </PasswordInput>
        <ForgotLink to="/" onClick={(e) => e.preventDefault()}>
          Forgort your password?
        </ForgotLink>
        <LoginBtn onClick={(e) => loginSubmitHander(e)}>Log in</LoginBtn>
        <SignUp>
          Don't have an account?{' '}
          <Link to="/" onClick={(e) => e.preventDefault()}>
            Sign up
          </Link>
        </SignUp>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
