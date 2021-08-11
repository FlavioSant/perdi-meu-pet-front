import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 50px;
  height: 100%;
`;

export const BackgroundContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('/sign-in-background.jpg') no-repeat center;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--gray-transparent);
  border: 1px solid var(--text-primary);
  border-radius: 10px;
  padding: 1.5rem 1rem;
  width: 25rem;

  h1 {
    color: var(--text-primary);
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-primary);
  font-weight: 500;
  margin: 1rem 0;

  &::before {
    content: '';
    flex: 1;
    background: var(--text-primary);
    height: 1px;
    margin-right: 1rem;
  }

  &::after {
    content: '';
    flex: 1;
    background: var(--text-primary);
    height: 1px;
    margin-left: 1rem;
  }
`;
