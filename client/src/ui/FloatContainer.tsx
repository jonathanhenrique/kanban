import { styled } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

type Props = { $pos: [number, number] };

const Mask = styled.div<Props>`
  z-index: 10000;
  position: absolute;
  left: ${(props) => `${props.$pos[0]}px`};
  top: ${(props) => `${props.$pos[1]}px`};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;

  transform-origin: top right;
  animation: modalScale 250ms var(--bezier-overshoot);
  animation-fill-mode: both;

  & > div {
    opacity: 1;
    animation: contentAnimation 100ms var(--bezier-overshoot) backwards;
    transition: opacity 100ms var(--bezier-ease-out);
  }

  transition: transform 250ms var(--bezier-ease-out);

  &.toClose {
    transform: scale(0);

    & > div {
      opacity: 0;
    }
  }

  & > .alert {
    animation: alert 250ms var(--bezier-ease-out);
  }
`;

export default function FloatContainer({
  closeFn,
  children,
  animation,
  pixels,
}: {
  closeFn: () => void;
  children: React.ReactNode;
  animation?: boolean;
  pixels: [number, number];
}) {
  const { ref } = useOutsideClick(closeFn);

  return (
    <Mask
      ref={ref as React.LegacyRef<HTMLDivElement>}
      $pos={[pixels[0], pixels[1]]}
    >
      <Container
        onClick={(e) => e.stopPropagation()}
        className={animation ? 'toClose' : ''}
      >
        {children}
      </Container>
    </Mask>
  );
}
