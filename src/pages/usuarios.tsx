import Header from '@/components/Header';
import { Container, Users, Search } from '@/styles/pages/Users';
import { useMemo, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  const users = [
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Pedro Cunha',
      login: 'phlcunha',
      email: 'phlcunha@gmail.com',
      date: '20/10/2019',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Jonatas Souza',
      login: 'joonatassouza',
      email: 'jonatasfelipe2@hotmail.com',
      date: '01/02/2021',
      active: 'Sim',
      type: 'A',
    },
    {
      name: 'Alcides',
      login: 'alcides',
      email: 'alcides@gmail.com',
      date: '02/05/2019',
      active: 'Não',
      type: 'P',
    },
  ];

  const filteredUsers = useMemo(
    () => users.filter(u => 
      search.length === 0
      || u.name.toLowerCase().includes(search.toLowerCase())
      || u.login.toLowerCase().includes(search.toLowerCase())
      || u.email.toLowerCase().includes(search.toLowerCase())
      || u.date.toLowerCase().includes(search.toLowerCase())
      || u.active.toLowerCase().includes(search.toLowerCase())
      || u.type.toLowerCase().includes(search.toLowerCase())
    ),
    [users],
  );

  return (
    <>
      <Header />
      <Container>
        <Search>
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </Search>
        <Users>
          <li>
            <span className="name">Nome</span>
            <span className="login">Login</span>
            <span className="email">E-mail</span>
            <span className="date">Cadastro</span>
            <span className="active">Ativo</span>
            <span className="type">Tipo</span>
            <span className="type">Editar</span>
          </li>
          {filteredUsers.map((user, idx) => (
            <li key={idx.toString()}>
              <span className="name">{user.name}</span>
              <span className="login">{user.login}</span>
              <span className="email">{user.email}</span>
              <span className="date">{user.date}</span>
              <span className="active">{user.active}</span>
              <span className="type">{user.type}</span>
              <span className="edit">
                <button type="button">
                  <img src="/edit.svg" alt="editar" />
                </button>
              </span>
            </li>
          ))}
        </Users>
      </Container>
    </>
  )
}
