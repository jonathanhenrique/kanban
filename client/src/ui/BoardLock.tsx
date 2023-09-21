import { styled, css } from 'styled-components';

type Props = { $isLocked: boolean };

const StyledLocker = styled.div<Props>`
  transition: 100ms linear;

  ${(props) =>
    props.$isLocked
      ? css`
          opacity: 0.8;
          pointer-events: none;
          filter: blur(2px);
        `
      : ''};
`;

export default function BoardLock({
  children,
  isLocked,
}: {
  children: React.ReactNode;
  isLocked: boolean;
}) {
  return <StyledLocker $isLocked={isLocked}>{children}</StyledLocker>;
}
