import { styled } from 'styled-components';

const LogoStyled = styled.div`
  font-size: 3rem;
  font-weight: 700;
  line-height: 0;
`;

export default function Logo() {
  return <LogoStyled>Kanban</LogoStyled>;
}
