import { css, styled } from 'styled-components';

type Props = { type: 'primary' | 'secondary' | 'mini' | 'link' };

const types = {
  mini: css`
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-lg);
    background-color: var(--color-grey-500);
    --hover-color: var(--color-border);
  `,

  primary: css`
    color: #f8fafc;
    padding: 0.8rem 2.4rem;
    border-radius: var(--border-radius-pill);
    background: linear-gradient(90deg, var(--color-1), var(--color-2));
    --hover-color: linear-gradient(90deg, var(--color-1), var(--color-2));
  `,

  secondary: css`
    padding: 0.8rem 2.4rem;
    border-radius: var(--border-radius-pill);
    background-color: var(--color-grey-500);
    --hover-color: var(--color-grey-400);
  `,

  link: css`
    margin-top: 1rem;
    padding: 1rem 1.4rem;
    gap: 1.2rem;
    background: transparent;
    border-radius: var(--border-radius-lg);
    --hover-color: var(--color-grey-500);
  `,
};

const StyledButton = styled.button<Props>`
  display: flex;
  align-items: center;
  line-height: 0;
  gap: 0.4rem;
  text-transform: capitalize;
  border: none;

  ${(props) => types[props.type]};

  transition: background-color 100ms linear;

  & svg {
    transition: transform 200ms var(--bezier-ease-out);
    height: ${(props) => (props.type === 'mini' ? '1.6rem' : '2rem')};
    width: ${(props) => (props.type === 'mini' ? '1.6rem' : '2rem')};
  }

  &:hover {
    background: var(--hover-color);
  }

  &:hover svg {
    transform: translateX(-4px);
  }
`;

export default function Button({
  children,
  onClick,
  type = 'primary',
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  type?: 'primary' | 'secondary' | 'mini' | 'link';
}) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
