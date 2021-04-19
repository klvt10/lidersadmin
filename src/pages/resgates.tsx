import Header from '@/components/Header';
import { Container, Search, Rescues } from '@/styles/pages/Rescues';
import { useMemo, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  const rescues = [
    {
      User: 'Jonatas Souza',
      RequestDate: '01/02/2021',
      Value: 25.89,
      Status: 'Transferido',
      TransferDate: '01/02/2021',
      Notes: 'Teste Solicitado ok',
    },
  ];

  const filteredRescues = useMemo(
    () => rescues.filter(u => 
      search.length === 0
      || u.Value.toString().toLowerCase().includes(search.toLowerCase())
      || u.RequestDate.toLowerCase().includes(search.toLowerCase())
      || u.Status.toLowerCase().includes(search.toLowerCase())
      || u.TransferDate.toLowerCase().includes(search.toLowerCase())
      || u.Notes.toLowerCase().includes(search.toLowerCase())
      || u.User.toLowerCase().includes(search.toLowerCase())
    ),
    [rescues],
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
        <Rescues>
          <li>
            <span className="user">Usuário</span>
            <span className="request">Data da requisição</span>
            <span className="value">Valor</span>
            <span className="status">Status</span>
            <span className="transfer">Data da transferência</span>
            <span className="notes">Notas</span>
            <span className="edit">Editar</span>
          </li>
          {filteredRescues.map((rescue, idx) => (
            <li key={idx.toString()}>
              <span className="user">{rescue.User}</span>
              <span className="request">{rescue.RequestDate}</span>
              <span className="value">{rescue.Value}</span>
              <span className="status">{rescue.Status}</span>
              <span className="transfer">{rescue.TransferDate}</span>
              <span className="notes">{rescue.Notes}</span>
              <span className="edit">
                <button type="button">
                  <img src="/edit.svg" alt="editar" />
                </button>
              </span>
            </li>
          ))}
        </Rescues>
      </Container>
    </>
  )
}
