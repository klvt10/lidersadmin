import { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import { Api } from '@/services/Api';
import Header from '@/components/Header';

import { Container, Search, Notifications } from '@/styles/pages/Notifications';

interface Notification {
  text: string;
  read: boolean;
  id: string;
  createdAt: string;
  createdAtFormatted: string;
}

interface NotificationResponse {
  data: Notification[],
  count: number;
  totalPages: number;
  perPage: number;
  page: number;
  total: number;
}

export default function Home() {
  const [search, setSearch] = useState('');

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await Api.get<NotificationResponse>('AdminNotification', {
          params: {
            perPage: 50,
            page: 1,
          },
        });

        setNotifications(data.data.map(item => ({
          ...item,
          createdAtFormatted: item.createdAt ? format(parseISO(item.createdAt), 'dd/MM/y', { locale: ptBR }) : ''
        })));
      } catch (e) {
        //
      }
    }

    load();
  })

  const filteredNotifications = useMemo(
    () => notifications.filter(u => 
      search.length === 0
      || u.text.toLowerCase().includes(search.toLowerCase())
      || u.createdAtFormatted.toLowerCase().includes(search.toLowerCase())
    ),
    [notifications],
  );

  async function handleReadNotification (id: string, index: number) {
    try {
      await Api.get(`AdminNotification/${id}/Read`);

      const newList = [...notifications];

      newList[index].read = true;

      setNotifications(newList);
    } catch (e) {
      //
    }
  }

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
            <li key={notification.id.toString()}>
              <section>
                <span className="date">{notification.createdAtFormatted}</span>
                <span className="read">{
                  notification.read ? 'lida' : (
                    <button
                      type="button"
                      onClick={() => handleReadNotification(notification.id, idx)}
                    >
                      marcar como lida
                    </button>
                  )
                }</span>
              </section>
              <span className="content">{notification.text}</span>
            </li>
          ))}
        </Notifications>
      </Container>
    </>
  )
}
