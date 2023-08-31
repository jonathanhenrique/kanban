import { css, styled } from 'styled-components';

const variations = {
  task: css`
    line-height: 0;
    border-radius: var(--border-radius-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 1.2rem;
    background-color: var(--color-grey-500);
    color: var(--color-grey-300);
    --hover-color: var(--color-border);
  `,
  icon: css`
    background: none;
    padding: 0;
  `,
  primary: css`
    background: linear-gradient(90deg, #d73b54, #cd3262);
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
    height: ${(props) => (props.variation === 'task' ? '1.7rem' : '2.2rem')};
    width: ${(props) => (props.variation === 'task' ? '1.7rem' : '2.2rem')};
  }

  &:hover {
    transform: ${(props) =>
      props.variation === 'task' ? 'translateX(3px)' : 'translateY(-3px)'};
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
  icon,
}: {
  children: string;
  onClick: React.MouseEventHandler;
  variation?: 'primary' | 'secondary' | 'icon' | 'task';
  icon?: React.ReactNode;
}) {
  if (variation === 'task') {
    return (
      <StyledButton variation={variation} onClick={onClick}>
        <span>{children}</span> <span>{icon}</span>
      </StyledButton>
    );
  }

  return (
    <StyledButton variation={variation} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
