import { useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

const Heading = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  min-width: 50rem;
`;

export default function TaskDetails({ task }) {
  return (
    <StyledForm>
      <Heading>{task.title}</Heading>
    </StyledForm>
  );
}
