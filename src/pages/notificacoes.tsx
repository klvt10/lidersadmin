import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";

import { Api } from "@/services/Api";
import Header from "@/components/Header";

import {
  Container,
  Search,
  Notifications,
  NotificationsMobile,
  TextNotification,
} from "@/styles/pages/Notifications";

interface Notification {
  text: string;
  read: boolean;
  id: string;
  createdAt: string;
  createdAtFormatted: string;
}

interface NotificationResponse {
  data: Notification[];
  count: number;
  totalPages: number;
  perPage: number;
  page: number;
  total: number;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function load() {
    try {
      const { data } = await Api.get<NotificationResponse>(
        "AdminNotification",
        {
          params: {
            perPage: 50,
            page: 1,
          },
        }
      );

      setNotifications(
        data.data.map((item) => ({
          ...item,
          createdAtFormatted: item.createdAt
            ? format(parseISO(item.createdAt), "dd/MM/yyyy")
            : "",
        }))
      );
    } catch (e) {
      //
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filteredNotifications = useMemo(
    () =>
      notifications.filter(
        (u) =>
          search.length === 0 ||
          u.text.toLowerCase().includes(search.toLowerCase()) ||
          u.createdAtFormatted.toLowerCase().includes(search.toLowerCase())
      ),
    [notifications]
  );

  async function handleToggleReadNotification(id: string, index: number) {
    try {
      await Api.get(`AdminNotification/${id}/Read`);

      load();
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
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="buttonMobile" type="button">
            <img src="/search.svg" alt="Botão de pesquisar" />
          </button>
        </Search>
        <Notifications>
          {filteredNotifications.map((notification, idx) => (
            <li key={notification.id.toString()}>
              <section>
                <span className="date">{notification.createdAtFormatted}</span>
                <TextNotification isActive={!notification.read}>
                  {notification.read ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleReadNotification(notification.id, idx)
                      }
                    >
                      marcar como não lida
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleReadNotification(notification.id, idx)
                      }
                    >
                      marcar como lida
                    </button>
                  )}
                </TextNotification>
              </section>
              <TextNotification
                isActive={!notification.read}
                className="content"
              >
                {notification.text}
              </TextNotification>
            </li>
          ))}
        </Notifications>
        <NotificationsMobile>
          {filteredNotifications.map((notification, idx) => (
            <div key={notification.id}>
              <span className="date">{notification.createdAtFormatted}</span>
              <TextNotification isActive={!notification.read}>
                {notification.text}
              </TextNotification>
              <TextNotification isActive={!notification.read}>
                {notification.read ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleReadNotification(notification.id, idx)
                    }
                  >
                    marcar como não lida
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleReadNotification(notification.id, idx)
                    }
                  >
                    marcar como lida
                  </button>
                )}
              </TextNotification>
            </div>
          ))}
        </NotificationsMobile>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["lidersclubadmin.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
