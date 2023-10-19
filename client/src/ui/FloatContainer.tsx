import { styled } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

type Props = { $pos: [number, number] };

const Mask = styled.div<Props>`
  z-index: 10000;
  position: absolute;
  left: ${(props) => `${props.$pos[0]}px`};
  top: ${(props) => `${props.$pos[1]}px`};
`;

type PropsContainer = { $origin: string };

const Container = styled.div<PropsContainer>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.6rem;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  min-width: 170px;

  transform-origin: ${(props) => props.$origin};
  animation: modalScale 250ms var(--bezier-overshoot);
  animation-fill-mode: both;

  & > * {
    animation: contentAnimation 100ms linear;
    transition: opacity 100ms linear;
  }

  transition: transform 250ms var(--bezier-ease-out);

  &.toClose {
    transform: scale(0);

    & > * {
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
  origin = 'top right',
}: {
  closeFn: () => void;
  children: React.ReactNode;
  animation?: boolean;
  pixels: [number, number];
  origin?: string;
}) {
  const { ref } = useOutsideClick(closeFn);

  return (
    <Mask
      ref={ref as React.LegacyRef<HTMLDivElement>}
      $pos={[pixels[0], pixels[1]]}
    >
      <Container
        $origin={origin}
        onClick={(e) => e.stopPropagation()}
        className={animation ? 'toClose' : ''}
      >
        {children}
      </Container>
    </Mask>
  );
}
