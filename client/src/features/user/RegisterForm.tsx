import { styled } from 'styled-components';
import StyledInput from '../../ui/formUI/Input';
import { useState } from 'react';
import { register } from '../../services/apiCalls';
import toast from 'react-hot-toast';
import Button from '../../ui/formUI/Button';
import { SpinnerMiniR } from '../../ui/SpinnerMini';
import { HiOutlineUserPlus } from 'react-icons/hi2';
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

function RegisterForm({ toggleForm }: { toggleForm: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(name, email, password);
      setIsLoading(false);
      toggleForm();
      toast.success(`Your account was created, ${name}!`);
    } catch (error) {
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  }

  return (
    <StyledForm onSubmit={handleRegister}>
      <FormBlock>
        <label htmlFor="name">Name</label>
        <StyledInput
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
          minLength={3}
          maxLength={30}
        />
      </FormBlock>
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
          minLength={8}
          maxLength={16}
        />
      </FormBlock>
      <Button variation="form" disabled={isLoading}>
        {isLoading ? <SpinnerMiniR /> : <HiOutlineUserPlus />}
        <span>{isLoading ? 'registering' : 'register now'}</span>
      </Button>
      <Button
        variation="formLink"
        onClick={(e) => {
          e.preventDefault();
          toggleForm();
        }}
      >
        <span>Already have an account?</span>
      </Button>
    </StyledForm>
  );
}

export default RegisterForm;
