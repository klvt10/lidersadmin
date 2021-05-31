import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { List } from 'react-content-loader'

import { Api } from '@/services/Api';
import Header from '@/components/Header';

import { Container, Search, Posts } from '@/styles/pages/Posts';

interface Post {
  id: string;
  thumbnail: string;
  descricao: string;
  createdAt: string;
  ativo: boolean;
  usuario: string;
  createdAtFormatted: string;
}

interface PostsResponse {
  data: Post[];
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const filteredPosts = useMemo(
    () => posts.filter(u =>
      search.length === 0
      || u.descricao.toLowerCase().includes(search.toLowerCase())
      || u.createdAtFormatted.toLowerCase().includes(search.toLowerCase())
      || u.usuario.toLowerCase().includes(search.toLowerCase())
    ),
    [posts, search],
  );

  const handlePageChange = useCallback(async ({ selected }) => {
    setLoading(true);
    const response = await Api.get<PostsResponse>('Posts', {
      params: {
        perPage,
        page: selected + 1,
      },
    });

    setCount(response.data.count);
    setPage(selected + 1);
    setTotal(response.data.total);
    setPosts(response.data.data.map(post => ({
      ...post,
      createdAtFormatted: format(parseISO(post.createdAt), 'dd/MM/yyyy'),
    })));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    Api.get<PostsResponse>('Posts', {
      params: {
        perPage,
        page,
      },
    }).then(response => {
      setCount(response.data.count);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
      setPosts(response.data.data.map(user => ({
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
        {/* <Search>
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </Search> */}
          <Posts>
            <li>
              <span className="thumb">Thumb</span>
              <span className="description">Descrição</span>
              <span className="date">Cadastro</span>
              <span className="active">Ativo</span>
              <span className="user">Usuário</span>
              <span className="edit">Visualizar</span>
            </li>
            {loading ? <List /> : filteredPosts.map((post, idx) => (
              <li key={idx.toString()}>
                <span className="thumb">
                  <img src={post.thumbnail} alt="photo" />
                </span>
                <span className="description">{post.descricao}</span>
                <span className="date">{post.createdAtFormatted}</span>
                <span className="active">{post.ativo ? 'Sim' : 'Não'}</span>
                <span className="user">{post.usuario}</span>
                <span className="edit">
                  <a href={`/post/${post.id}`}>
                    <img src="/visibility-user.svg" alt="editar" />
                  </a>
                </span>
              </li>
            ))}
          </Posts>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          disableInitialCallback
          breakClassName="break-me"
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={8}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="pagination-active"
        />
      </Container>
    </>
  )
}
