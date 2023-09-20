import { styled, css } from 'styled-components';

const StyledLocker = styled.div`
  transition: 100ms linear;

  ${(props) =>
    props.isLocked
      ? css`
          opacity: 0.8;
          pointer-events: none;
          filter: blur(4px);
        `
      : ''};
`;

export default function BoardLock({ children, isLocked }) {
  return <StyledLocker isLocked={isLocked}>{children}</StyledLocker>;
}
