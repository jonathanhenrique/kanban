import { styled } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

type Props = { $pos: [number, number] };

const Mask = styled.div<Props>`
  z-index: 10000;
  position: absolute;
  left: ${(props) => `${props.$pos[0]}px`};
  top: ${(props) => `${props.$pos[1]}px`};
  /* clip-path: polygon(-25% 0, 500% 0, 500% 500%, -25% 500%); */

  /* animation: maskReveal 200ms both; */
`;

const Container = styled.div`
  padding: 1.5rem 1rem;
  width: 260px;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  transform-origin: top right;

  /* animation: floatFormBoard 350ms var(--bezier-ease-out);
  transition: transform 300ms var(--bezier-ease-out);

  &.toClose {
    transform: translateY(-200px);
  } */

  /* transform-origin: top right; */

  animation: modalPosition 300ms var(--bezier-overshoot),
    modalScale 300ms var(--bezier-overshoot);

  animation-fill-mode: both;

  & > nav {
    opacity: 1;
    animation: contentAnimation 100ms ease-out backwards;
    transition: opacity 50ms ease-out;
  }

  transition: transform 300ms var(--bezier-ease-out);

  &.toClose {
    transform: translateY(var(--origin-y, 0)) translateX(var(--origin-x, 0))
      scale(0);

    & > nav {
      opacity: 0;
    }
  }
`;

export default function FloatContainer({
  fn,
  children,
  animation,
  pos,
  pixels,
}: {
  fn: () => void;
  children: React.ReactNode;
  animation?: boolean;
  pos: [number, number];
  pixels: [number, number];
}) {
  const { ref } = useOutsideClick(fn);

  return (
    <Mask ref={ref} $pos={[pos[0] + pixels[0], pos[1] + pixels[1]]}>
      <Container className={animation ? 'toClose' : ''}>{children}</Container>
    </Mask>
  );
}
