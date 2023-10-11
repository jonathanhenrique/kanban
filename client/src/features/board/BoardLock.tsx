import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { styled, css } from 'styled-components';

type Props = { $isLocked: boolean };

const StyledLocker = styled.div<Props>`
  transition: 100ms linear;
  height: 100%;
  background-color: transparent;
  pointer-events: ${(props) => (props.$isLocked ? 'none' : 'auto')};

  ${(props) => {
    return props.$isLocked
      ? css`
          opacity: 0.5;
          filter: blur(1px);
        `
      : '';
  }};
`;

export default function BoardLock({ children }: { children: React.ReactNode }) {
  const { boardId } = useParams();
  const fetch = useIsFetching({ queryKey: ['userBoard', boardId] });
  const mutation = useIsMutating();

  return (
    <StyledLocker $isLocked={fetch + mutation > 0}>{children}</StyledLocker>
  );
}
