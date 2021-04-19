import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { Container, Li } from '@/styles/pages/component/Header';

const Header: React.FC = () => {
  const { route } = useRouter();

  return (
    <Container>
      <nav>
        <Link href="/">
          <a>
            <img src="/logo.png" alt="logo"/>
          </a>
        </Link>
        <ul>
          <Li isActive={route.includes('usuarios')}>
            <Link href="/usuarios"><a>Usuários</a></Link>
          </Li>
          <Li isActive={route.includes('posts')}>
            <Link href="/posts"><a>Posts</a></Link>
          </Li>
          <Li isActive={route.includes('denuncias')}>
            <Link href="/denuncias"><a>Denúncias</a></Link>
          </Li>
          <Li isActive={route.includes('resgates')}>
            <Link href="/resgates"><a>Resgates</a></Link>
          </Li>
        </ul>
        <Link href="/notificacoes">
          <a className="bell">
            <img
              src={route.includes('notificacoes') ? '/notification-solid.svg' : '/notification.svg'}
              alt="notificações"
            />
          </a>
        </Link>
      </nav>
    </Container>
  );
}

export default Header;