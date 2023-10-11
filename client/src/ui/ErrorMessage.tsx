import { styled, css } from 'styled-components';
import Button from './formUI/Button';
import {
  HiOutlineArrowPath,
  HiOutlineExclamationCircle,
} from 'react-icons/hi2';

type Props = { $center: boolean };

const StyledErrorMessage = styled.div<Props>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  ${(props) =>
    props.$center
      ? css`
          height: 70%;
          justify-content: center;
        `
      : null}

  & > p {
    color: var(--alert);
    text-align: center;
  }

  & > svg {
    color: var(--alert);
    font-size: 3rem;
  }
`;

export default function ErrorMessage({
  message,
  refresh,
  center = false,
}: {
  message: string;
  refresh: () => void;
  center?: boolean;
}) {
  return (
    <StyledErrorMessage $center={center}>
      <HiOutlineExclamationCircle />
      <p>{message}</p>
      <Button variation="link" onClick={refresh}>
        <HiOutlineArrowPath />
        Reload
      </Button>
    </StyledErrorMessage>
  );
}
