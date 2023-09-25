import { styled } from 'styled-components';
import FloatMenu from './FloatMenu';
import { HiChevronDown } from 'react-icons/hi2';
type Props = { $on: boolean };

const ToggleStyled = styled.div<Props>``;

export default function Dropdown({
  on,
  toggle,
}: {
  on: boolean;
  toggle: () => void;
}) {
  return (
    <FloatMenu identifier="dropdown" icon={<HiChevronDown />}>
      <p>This is #01</p>
      <p>This is #02</p>
      <p>This is #03</p>
      <p>This is #04</p>
    </FloatMenu>
  );
}
