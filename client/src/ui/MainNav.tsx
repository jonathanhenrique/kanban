import { styled } from 'styled-components';
import NavItem from './NavItem';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  color: var(--color-grey-300);
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export default function MainNav() {
  return (
    <nav>
      <Subtitle>all boards (8)</Subtitle>
      <NavList>
        <NavItem>Platform Launch</NavItem>
        <NavItem>Marketing Plan</NavItem>
        <NavItem>Roadmap</NavItem>
        <NavItem>Create New Board</NavItem>
      </NavList>
    </nav>
  );
}
