import { styled } from 'styled-components';
type Props = { $on: boolean };

const ToggleStyled = styled.div<Props>`
  width: 50px;
  height: 24px;
  border-radius: 200px;
  background-color: var(--color-grey-400);
  box-shadow: inset 1px 1px 8px var(--color-grey-500),
    inset -1px -1px 8px var(--color-grey-500);

  position: relative;
  cursor: pointer;

  & > input {
    display: none;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 2px;
    top: 1.5px;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: var(--color-1);
    transition: transform 300ms var(--bezier-overshoot);

    transform: ${(props) => (props.$on ? 'translateX(calc(46px - 100%))' : '')};
  }
`;

export default function Toggle({
  on,
  toggle,
}: {
  on: boolean;
  toggle: () => void;
}) {
  return (
    <ToggleStyled onClick={() => toggle()} $on={!on}>
      <input type="checkbox" readOnly={true} checked={!on}></input>
    </ToggleStyled>
  );
}
