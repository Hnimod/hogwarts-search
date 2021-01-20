import React from 'react';
import styled from 'styled-components';
import { breakpoint } from '../../../app-config';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.6rem;

  @media screen and (max-width: ${breakpoint.tablet}) {
    font-size: 1.4rem;
  }
`;

const Title = styled.span`
  margin-right: 1rem;

  @media screen and (max-width: ${breakpoint.tablet}) {
    display: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font: inherit;
  color: grey;
  border: solid 1px grey;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  padding: 1rem;
`;

const Selection = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Select
        onChange={(e) => props.onSelectChange(props.title, e.target.value)}
      >
        {props.options.map((el) => (
          <Option key={el}>{el}</Option>
        ))}
      </Select>
    </Container>
  );
};

export default Selection;
