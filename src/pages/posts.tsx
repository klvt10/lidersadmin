import Header from '@/components/Header';
import { Container, Search, Posts } from '@/styles/pages/Posts';
import { useMemo, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  const posts = [
    {
      PictureUrl: 'https://lidershomolog.blob.core.windows.net/images/939f355d-175c-4b29-9a6e-4e2d6dce8f6d.jpg',
      Description: 'Teste xxxx',
      CreatedAt: '01/02/2021',
      Active: 'Sim',
      user: 'Jonatas Souza',
    },
    {
      PictureUrl: 'https://lidershomolog.blob.core.windows.net/images/939f355d-175c-4b29-9a6e-4e2d6dce8f6d.jpg',
      Description: 'Algo',
      CreatedAt: '01/06/2020',
      Active: 'Sim',
      user: 'Alceu Dispor',
    },
    {
      PictureUrl: 'https://lidershomolog.blob.core.windows.net/images/939f355d-175c-4b29-9a6e-4e2d6dce8f6d.jpg',
      Description: 'Nada',
      CreatedAt: '20/01/2021',
      Active: 'Sim',
      user: 'Saulo Sim',
    },
    {
      PictureUrl: 'https://lidershomolog.blob.core.windows.net/images/939f355d-175c-4b29-9a6e-4e2d6dce8f6d.jpg',
      Description: 'Outra coisa',
      CreatedAt: '30/12/2019',
      Active: 'Não',
      user: 'Marcelo Coisa',
    },
  ];

  const filteredPosts = useMemo(
    () => posts.filter(u => 
      search.length === 0
      || u.Description.toLowerCase().includes(search.toLowerCase())
      || u.CreatedAt.toLowerCase().includes(search.toLowerCase())
      || u.Active.toLowerCase().includes(search.toLowerCase())
      || u.user.toLowerCase().includes(search.toLowerCase())
    ),
    [posts],
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
        <Posts>
          <li>
            <span className="thumb">Thumb</span>
            <span className="description">Descrição</span>
            <span className="date">Cadastro</span>
            <span className="active">Ativo</span>
            <span className="user">Usuário</span>
            <span className="edit">Editar</span>
          </li>
          {filteredPosts.map((post, idx) => (
            <li key={idx.toString()}>
              <span className="thumb">
                <img src={post.PictureUrl} alt="photo" />
              </span>
              <span className="description">{post.Description}</span>
              <span className="date">{post.CreatedAt}</span>
              <span className="active">{post.Active}</span>
              <span className="user">{post.user}</span>
              <span className="edit">
                <button type="button">
                  <img src="/edit.svg" alt="editar" />
                </button>
              </span>
            </li>
          ))}
        </Posts>
      </Container>
    </>
  )
}
