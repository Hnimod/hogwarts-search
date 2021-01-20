import React from 'react';
import styled from 'styled-components';

const Title = styled.span`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #6f7782;
`;

const InputField = styled.input`
  display: block;
  font: inherit;
  font-size: 1.4rem;
  border: 1px solid #cbd4db;
  border-radius: 5px;
  padding: 0.8rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #9ca6af;
    box-shadow: inset 0 1px #e8ecee;
  }
`;

const Input = (props) => {
  return (
    <>
      <Title>{props.title}</Title>
      <InputField type={props.type} onChange={props.onInputChange} />
    </>
  );
};

export default Input;
