import { styled } from 'styled-components';
import Button from '../ui/formUI/Button';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

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
`;

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 30rem 10rem 1fr;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 25rem 15rem 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 50dvw 1fr;
    grid-template-rows: 1fr 25dvh 40dvh;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 25dvh 40dvh;
  }
`;

const Header = styled.header`
  grid-row: 1;
  grid-column: 1 / 3;
  margin-top: -20rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  line-height: 1;

  & h2 {
    font-weight: 700;
    font-size: 7rem;
  }

  & p {
    line-height: 1.2;
    font-weight: 400;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    align-self: end;
    margin-bottom: 10rem;
    grid-row: 1 / 3;
    grid-column: 1;
  }

  @media (max-width: 640px) {
    text-align: center;
    grid-row: 1;
    margin-bottom: 0;
  }
`;

const Image = styled.div`
  grid-row: 1;
  grid-column: 2 / 4;
  margin-top: 12rem;
  width: 100%;
  height: 80%;
  z-index: -1;

  background-image: url('error.svg');
  background-size: 100%;
  background-repeat: no-repeat;

  @media (max-width: 1024px) {
    margin-top: 10rem;
  }

  @media (max-width: 768px) {
    align-self: end;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    background-size: 90dvw;
    margin-top: 0;
  }

  @media (max-width: 640px) {
    align-self: center;
    grid-row: 2 / -1;
    margin-bottom: 0;
  }
`;

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Main>
      <Container>
        <Header>
          <h2>404</h2>
          <p>I'm sorry, but we couldn't find what you were looking for.</p>
          <Button variation="form" onClick={() => navigate('/')}>
            <HiArrowSmallLeft />
            <span>Back to Home page</span>
          </Button>
        </Header>
        <Image />
      </Container>
    </Main>
  );
}

export default NotFoundPage;
