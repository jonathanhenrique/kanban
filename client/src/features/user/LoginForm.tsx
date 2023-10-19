import { styled } from 'styled-components';
import StyledInput from '../../ui/formUI/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/apiCalls';
import toast from 'react-hot-toast';
import Button from '../../ui/formUI/Button';
import { SpinnerMiniR } from '../../ui/SpinnerMini';
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2';
import FormBlock from '../../ui/formUI/FormBlock';

const StyledForm = styled.form`
  position: relative;
  width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-700);
  padding: 2.4rem 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  @media (max-width: 420px) {
    width: 100%;
  }
`;

function LoginForm({ toggleForm }: { toggleForm: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(email, password);
      navigate('/app');
      setIsLoading(false);
      toast.success(`Welcome, ${data.userName}!`);
    } catch (error) {
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  }

  return (
    <StyledForm onSubmit={handleLogin}>
      <FormBlock>
        <label htmlFor="email">Email</label>
        <StyledInput
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
      </FormBlock>
      <FormBlock>
        <label htmlFor="password">Password</label>
        <StyledInput
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
      </FormBlock>
      <Button variation="form" disabled={isLoading}>
        {isLoading ? <SpinnerMiniR /> : <HiMiniArrowRightOnRectangle />}
        <span>Log In</span>
      </Button>
      <Button
        variation="formLink"
        onClick={(e) => {
          e.preventDefault();
          toggleForm();
        }}
      >
        <span>Create an account</span>
      </Button>
    </StyledForm>
  );
}

export default LoginForm;
