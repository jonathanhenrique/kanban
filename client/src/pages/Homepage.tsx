import { styled } from 'styled-components';
import { useState } from 'react';
import LogoHome from '../ui/LogoHome';
import LoginForm from '../features/user/LoginForm';
import RegisterForm from '../features/user/RegisterForm';

const Main = styled.main`
  height: 100dvh;
  width: 80%;
  max-width: 1020px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 40rem;
  grid-template-rows: 12dvh 15dvh 73dvh;
  column-gap: 6dvw;

  @media (max-width: 1024px) {
    column-gap: 2dvw;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 5dvh auto 75dvw 1fr 5dvh;
  }
`;

const Forms = styled.div`
  grid-row: 2 / -1;
  grid-column: 2 / -1;
  margin-top: 8rem;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 4;
    margin-top: 0;
  }
`;

const Header = styled.header`
  grid-row: 2;
  grid-column: 1;

  & h2 {
    font-weight: 400;
    font-size: 1.8rem;
    margin-top: 1.4rem;
    line-height: 1.3;
    padding: 0 2rem;
  }

  & b {
    color: var(--color-2);
    text-transform: capitalize;
  }

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
  }

  @media (max-width: 640px) {
    text-align: center;
    grid-column: 1;
    grid-row: 2;
  }
`;

const Image = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;
  margin-top: 4rem;
  margin-left: 3rem;
  z-index: -1;

  background-image: url('/scrum.svg');
  background-size: 65%;
  background-repeat: no-repeat;

  @media (max-width: 1024px) {
    margin-left: 0;
    margin-top: calc(13rem - 9dvw);
  }

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 3 / -1;
    background-size: 95%;
    margin-top: 2rem;
  }
`;

export default function HomePage() {
  const [register, setRegister] = useState(false);

  function toggleForm() {
    setRegister((s) => !s);
  }

  return (
    <Main>
      <Container>
        <Header>
          <LogoHome />
          <h2>
            Keep your projects organized and up to date with a fast and friendly
            drag and drop <b>task manager</b>.
          </h2>
        </Header>
        <Image />
        <Forms>
          {register ? (
            <RegisterForm toggleForm={toggleForm} />
          ) : (
            <LoginForm toggleForm={toggleForm} />
          )}
        </Forms>
      </Container>
    </Main>
  );
}
