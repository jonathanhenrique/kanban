import { css, styled } from 'styled-components';

type Props = {
  $variation: 'primary' | 'secondary' | 'mini' | 'link' | 'linkCentered';
  type?: 'text' | 'submit' | 'reset';
};

const variations = {
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

  linkCentered: css`
    justify-content: center;
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
  justify-content: center;
  line-height: 0;
  gap: 0.4rem;
  text-transform: capitalize;
  border: none;

  ${(props) => variations[props.$variation]};

  transition: background-color 100ms linear;

  & svg {
    transition: transform 200ms var(--bezier-ease-out);
    height: ${(props) => (props.$variation === 'mini' ? '1.6rem' : '2rem')};
    width: ${(props) => (props.$variation === 'mini' ? '1.6rem' : '2rem')};
  }

  &:hover:not(:disabled) {
    background: var(--hover-color);
  }

  &:hover:not(:disabled) svg {
    transform: translateX(-4px);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

export default function Button({
  children,
  onClick,
  variation = 'primary',
  type = 'submit',
  disabled,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  variation?: 'primary' | 'secondary' | 'mini' | 'link' | 'linkCentered';
  type?: 'text' | 'submit' | 'reset';
  disabled?: boolean;
}) {
  return (
    <StyledButton
      $variation={variation}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}
