import { styled } from 'styled-components';
import { HiMiniXCircle } from 'react-icons/hi2';

const ErrorMessage = styled.div`
  background-color: var(--alert);
  border-radius: var(--border-radius-lg);
  padding: 1rem 2rem;
  color: #f1f5f9;
  position: absolute;
  /* width: 264px; */
  height: 90px;

  & svg {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    height: 2.6rem;
    width: 2.6rem;
    transition: transform 200ms var(--bezier-ease-out);

    &:hover {
      /* transform: scale(1.1); */
    }
  }
`;

const ErrorHeading = styled.p`
  color: #f8fafc;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
`;

export default function FormErrorMessage({
  error,
  reset,
}: {
  error: null | string;
  reset: () => void;
}) {
  return (
    <ErrorMessage>
      <ErrorHeading>An Error occurred!</ErrorHeading>
      <p>{error}</p>
      <HiMiniXCircle onClick={() => reset()} />
    </ErrorMessage>
  );
}
