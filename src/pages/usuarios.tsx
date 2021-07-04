
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { List } from 'react-content-loader'
import ReactPaginate from 'react-paginate';
import { format, parseISO } from 'date-fns';
import { Api } from '@/services/Api';
import { useIsMobile } from '@/utils/IsMobile';

import Header from '@/components/Header';
import { Container, Users, Search, UsersMobile } from '@/styles/pages/Users';

interface User {
  id: string;
  name: string;
  login: string;
  email: string;
  createdAt: string;
  deleted: boolean;
  userType: string;
  createdAtFormatted: string;
}

interface UsersResponse {
  data: User[];
  count: number;
  totalPages: number;
  perPage: number;
  page: number;
  total: number;
}

export default function Home() {
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const isMobile = useIsMobile();

  const filteredUsers = useMemo(
    () => users.filter(u =>
      search.length === 0
      || u.name.toLowerCase().includes(search.toLowerCase())
      || u.login.toLowerCase().includes(search.toLowerCase())
      || u.email.toLowerCase().includes(search.toLowerCase())
      || u.createdAtFormatted.toLowerCase().includes(search.toLowerCase())
      || u.userType.toLowerCase().includes(search.toLowerCase())
    ),
    [users],
  );

  const handlePageChange = useCallback(async ({ selected }) => {
    setLoading(true);
    const response = await Api.get<UsersResponse>('Users', {
      params: {
        perPage,
        page: selected + 1,
      },
    });

    setCount(response.data.count);
    setPage(selected + 1);
    setTotal(response.data.total);
    setUsers(response.data.data.map(user => ({
      ...user,
      createdAtFormatted: format(parseISO(user.createdAt), 'dd/MM/yyyy'),
    })));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    Api.get<UsersResponse>('Users', {
      params: {
        perPage,
        page,
      },
    }).then(response => {
      setCount(response.data.count);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
      setUsers(response.data.data.map(user => ({
        ...user,
        createdAtFormatted: format(parseISO(user.createdAt), 'dd/MM/yyyy'),
      })));
      setLoading(false);
    });
  }, []);

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
          <button className="buttonMobile" type="button">
            <img src="/search.svg" alt="Botão de pesquisar" />
          </button>
        </Search>
        <Users>
          <li>
            <span className="name">Nome</span>
            <span className="login">Login</span>
            <span className="email">E-mail</span>
            <span className="date">Cadastro</span>
            <span className="active">Ativo</span>
            <span className="type">Tipo</span>
            <span className="type">Visualizar</span>
          </li>
          {loading ? <List uniqueKey="load-list" /> : filteredUsers.map((user, idx) => (
            <li key={idx.toString()}>
              <span className="name">{user.name}</span>
              <span className="login">{user.login}</span>
              <span className="email">{user.email}</span>
              <span className="date">{user.createdAtFormatted}</span>
              <span className="active">{user.deleted ? 'Não' : 'Sim'}</span>
              <span className="type">{user.userType}</span>
              <span className="edit">
                <a href={`/usuario/${user.id}`}>
                  <img src="/visibility-user.svg" alt="editar" />
                </a>
              </span>
            </li>
          ))}
        </Users>
        <UsersMobile>
          {loading ? <List /> : filteredUsers.map((user, idx) => (
            <div key={user.id}>
              <ul>
                <li><strong>Nome:</strong> {user.name}</li>
                <li><strong>Login:</strong> {user.login}</li>
                <li><strong>E-mail:</strong> {user.email}</li>
                <li><strong>Tipo:</strong> {user.userType}</li>
              </ul>
              <ul className="right-ul">
                <li>{user.createdAtFormatted}</li>
                <li><strong>Ativo:</strong> {user.deleted ? 'Não' : 'Sim'}</li>
                <li>
                  <a href={`/usuario/${user.id}`}>
                    <img src="/visibility-user.svg" alt="visualizar usuário" />
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </UsersMobile>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          disableInitialCallback
          breakClassName="break-me"
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={isMobile ? 3 : 8}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="pagination-active"
        />

      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['lidersclubadmin.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
