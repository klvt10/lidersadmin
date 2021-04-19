import Header from '@/components/Header';
import { Container, Search, Reports } from '@/styles/pages/Reports';
import { useMemo, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  const reports = [
    {
      PictureUrl: 'https://lidershomolog.blob.core.windows.net/images/939f355d-175c-4b29-9a6e-4e2d6dce8f6d.jpg',
      user: 'Jonatas Souza',
      Reason: 'Porque sim',
      CreatedAt: '01/02/2021',
      Resolved: 'Não',
      Type: 'post'
    },
    {
      PictureUrl: 'https://lidershomolog.blob.core.windows.net/images/939f355d-175c-4b29-9a6e-4e2d6dce8f6d.jpg',
      user: 'Jonatas Souza',
      Reason: 'Fala coisa sem sentido',
      CreatedAt: '23/01/2021',
      Resolved: 'Não',
      Type: 'post'
    },
    {
      user: 'Jonatas Souza',
      Reason: 'É fake do fake, muita falsidade',
      CreatedAt: '01/02/2021',
      Resolved: 'Não',
      Type: 'user'
    },
  ];

  const filteredReports = useMemo(
    () => reports.filter(u => 
      search.length === 0
      || u.Reason.toLowerCase().includes(search.toLowerCase())
      || u.Type.toLowerCase().includes(search.toLowerCase())
      || u.CreatedAt.toLowerCase().includes(search.toLowerCase())
      || u.Resolved.toLowerCase().includes(search.toLowerCase())
      || u.user.toLowerCase().includes(search.toLowerCase())
    ),
    [reports],
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
        <Reports>
          <li>
            <span className="thumb">Thumb</span>
            <span className="type">Tipo</span>
            <span className="reason">Motivo</span>
            <span className="user">Usuário</span>
            <span className="date">Cadastro</span>
            <span className="resolved">Resolvido</span>
            <span className="edit">Editar</span>
          </li>
          {filteredReports.map((report, idx) => (
            <li key={idx.toString()}>
              <span className="thumb">
                {report.PictureUrl && (
                  <img src={report.PictureUrl} alt="photo" />
                )}
              </span>
              <span className="type">{report.Type}</span>
              <span className="reason">{report.Reason}</span>
              <span className="user">{report.user}</span>
              <span className="date">{report.CreatedAt}</span>
              <span className="resolved">{report.Resolved}</span>
              <span className="edit">
                <button type="button">
                  <img src="/edit.svg" alt="editar" />
                </button>
              </span>
            </li>
          ))}
        </Reports>
      </Container>
    </>
  )
}
