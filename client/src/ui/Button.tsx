import { css, styled } from 'styled-components';

const variations = {
  icon: css`
    background: none;
    padding: 0;
  `,
  primary: css`
    background-color: var(--color-brand-500);
    --hover-color: hsl(241, 47%, 62%);
  `,
  secondary: css`
    background-color: var(--color-grey-100);
    color: var(--color-brand-500);
    --hover-color: hsl(220, 14%, 100%);
  `,
};

const StyledButton = styled.button`
  text-transform: capitalize;
  padding: 1rem 3rem;
  border: none;
  border-radius: var(--border-radius-pill);

  ${(props) => variations[props.variation]};

  transition: transform 250ms var(--easing-in), background-color 150ms linear;

  & svg {
    height: 2.2rem;
    width: 2.2rem;
  }

  &:hover {
    transform: translateY(-2px);
    background-color: var(--hover-color);
    stroke: var(--hover-color);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Button({
  children,
  onClick,
  variation = 'primary',
}: {
  children: string;
  onClick: React.MouseEventHandler;
  variation?: 'primary' | 'secondary' | 'icon';
}) {
  return (
    <StyledButton variation={variation} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
