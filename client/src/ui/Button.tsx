import { css, styled } from 'styled-components';

type Props = { type: 'primary' | 'secondary' | 'mini' };

const types = {
  mini: css`
    border-radius: var(--border-radius-lg);
    padding: 0.5rem 1rem;
    background-color: var(--color-grey-500);
    color: var(--color-grey-300);
    --hover-color: var(--color-border);
  `,

  primary: css`
    background: linear-gradient(90deg, #d73b54, #cd3262);
    background-color: var(--color-brand-500);
    --hover-color: hsl(241, 47%, 62%);
  `,

  secondary: css`
    background-color: var(--color-grey-500);
    border: 1px solid hsl(240, 12%, 23%);
    color: var(--color-brand-500);
    --hover-color: hsl(220, 14%, 100%);
  `,
};

const StyledButton = styled.button<Props>`
  display: flex;
  align-items: center;
  line-height: 0;
  gap: 0.4rem;
  text-transform: capitalize;
  padding: 0.8rem 2.4rem;
  border: none;
  border-radius: var(--border-radius-pill);

  ${(props) => types[props.type]};

  transition: transform 250ms var(--easing-in), background-color 150ms linear;

  & svg {
    height: ${(props) => (props.type === 'mini' ? '1.7rem' : '2.2rem')};
    width: ${(props) => (props.type === 'mini' ? '1.7rem' : '2.2rem')};
  }

  &:hover {
    transform: ${(props) =>
      props.type === 'mini' ? 'translateX(3px)' : 'translateY(-3px)'};
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
  type = 'primary',
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  type?: 'primary' | 'secondary' | 'mini';
}) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
