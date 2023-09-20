import { styled } from 'styled-components';

const StyledBackdrop = styled.div`
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Backdrop({ children }: { children: React.ReactNode }) {
  return <StyledBackdrop>{children}</StyledBackdrop>;
}
