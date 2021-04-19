import { Container } from '@/styles/pages/SignIn';
import { FormEvent, useCallback, useState } from 'react';

export default function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Fazer login: ', { login, password });
  }, [login, password]);

  return (
    <Container>
      <h3>LidersClub</h3>
      <p>Faça seu login para gerenciar usuários e suas requisições no LidersClub</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite seu login"
          value={login}
          onChange={event => setLogin(event.target.value)}
        /> 
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </Container>
  )
}
