import { styled } from 'styled-components';

const StyledBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  opacity: 1;
  backdrop-filter: blur(2px);

  animation: blur 200ms ease-in;

  transition: all 200ms 100ms ease-in;

  &.toClose {
    opacity: 0;
    backdrop-filter: blur(0);
  }
`;

export default function Backdrop({
  children,
  animationClass = '',
}: {
  children: React.ReactNode;
  animationClass: string;
}) {
  return <StyledBackdrop className={animationClass}>{children}</StyledBackdrop>;
}
