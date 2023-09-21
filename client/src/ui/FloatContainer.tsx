import { styled } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Mask = styled.div`
  z-index: 10000;
  position: absolute;
  top: 64px;
  left: 264px;
  clip-path: polygon(-25% 0, 125% 0, 125% 125%, -25% 125%);
`;

const Container = styled.div`
  padding: 1.5rem 1rem;
  width: 260px;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  animation: floatFormBoard 350ms var(--bezier-ease-out);
  transition: transform 300ms var(--bezier-ease-out);

  &.toClose {
    transform: translateY(-400px);
  }
`;

export default function FloatContainer({
  fn,
  children,
  animation,
}: {
  fn: () => void;
  children: React.ReactNode;
  animation?: boolean;
}) {
  const { ref } = useOutsideClick(fn);

  return (
    <Mask ref={ref}>
      <Container className={animation ? 'toClose' : ''}>{children}</Container>
    </Mask>
  );
}
