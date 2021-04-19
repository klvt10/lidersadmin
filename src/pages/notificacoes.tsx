import Header from '@/components/Header';
import { Container, Search, Notifications } from '@/styles/pages/Notifications';
import { useMemo, useState } from 'react';

// Novas denúncias
// Novas assinaturas
// Novas solicitações de resgate

export default function Home() {
  const [search, setSearch] = useState('');

  const notifications = [
    {
      Text: 'Uma nova assinatura foi realizada pelo usuario João das Neves',
      Date: '01/02/2021',
      Read: true,
    },
    {
      Text: 'O usuário Malcon Xis teve uma postagem reportada pelo usuário Chris',
      Date: '01/02/2021',
      Read: false,
    },
    {
      Text: 'O usuário Jullius está solicitando um novo resgate no valor de R$500,00',
      Date: '01/02/2021',
      Read: false,
    },
  ];

  const filteredNotifications = useMemo(
    () => notifications.filter(u => 
      search.length === 0
      || u.Text.toLowerCase().includes(search.toLowerCase())
      || u.Date.toLowerCase().includes(search.toLowerCase())
    ),
    [notifications],
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
        <Notifications>
          {filteredNotifications.map((notification, idx) => (
            <li key={idx.toString()}>
              <section>
                <span className="date">{notification.Date}</span>
                <span className="read">{
                  notification.Read ? 'lida' : (
                    <button type="button">
                      marcar como lida
                    </button>
                  )
                }</span>
              </section>
              <span className="content">{notification.Text}</span>
            </li>
          ))}
        </Notifications>
      </Container>
    </>
  )
}
