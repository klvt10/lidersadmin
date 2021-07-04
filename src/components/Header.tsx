import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { Container, Li, Menu, Pages, LiMobile } from '@/styles/pages/component/Header';

const Header: React.FC = () => {
  const { route } = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>();

  function handleOpenMenu() {
    setOpenMenu(!openMenu)
  }

  const pageSelected = useMemo(() => {
    const [, selected ] = route.split('/')

    return selected
  }, [route])

  return (
    <Container>
      {openMenu ? <p>Liders Club Admin</p> : (
        <nav>
          <Link href="/">
            <a>
              <img src="/logo.png" alt="logo"/>
            </a>
          </Link>
          <ul>
            <Li isActive={pageSelected === 'usuarios'}>
              <Link href="/usuarios"><a>Usuários</a></Link>
            </Li>
            <Li isActive={pageSelected === 'posts'}>
              <Link href="/posts"><a>Posts</a></Link>
            </Li>
            <Li isActive={pageSelected === 'denuncias'}>
              <Link href="/denuncias"><a>Denúncias</a></Link>
            </Li>
            <Li isActive={pageSelected === 'resgates'}>
              <Link href="/resgates"><a>Resgates</a></Link>
            </Li>
            <Li isActive={pageSelected === 'notificacoes'}>
              <div className="notification">
                <Link href="/notificacoes"><a>Notificações</a></Link>
              </div>
            </Li>
            {pageSelected === '' && (
              <Li isActive className="hiddenPage">
                <span>Home</span>
              </Li>
            )}
            {pageSelected === 'usuario' && (
              <Li isActive className="hiddenPage">
                <span>Usuário</span>
              </Li>
            )}
            {pageSelected === 'post' && (
              <Li isActive className="hiddenPage">
                <span>Post</span>
              </Li>
            )}
            {pageSelected === 'resgate' && (
              <Li isActive className="hiddenPage">
                <span>Resgate</span>
              </Li>
            )}
            {pageSelected === 'denunciaUsuario' && (
              <Li isActive className="hiddenPage">
                <span>Denúncia Usuário</span>
              </Li>
            )}
            {pageSelected === 'denunciaPost' && (
              <Li isActive className="hiddenPage">
                <span>Denúncia Post</span>
              </Li>
            )}
            
          </ul>
          <Link href="/notificacoes">
            <a className="bell">
              <img
                src={route.includes('notificacoes') ? '/notification-solid.svg' : '/notification.svg'}
                alt="notificações"
              />
            </a>
          </Link>
          <Menu>
            <button
              type="button"
              onClick={handleOpenMenu}
            >
              <img src="/menu.svg" alt="" />
            </button>
          </Menu>
        </nav>
      )}
      <Pages openedMenu={openMenu}>
        <LiMobile>
          <img src="/arrow.svg" alt="" />
          <Link href="/"><a>Home</a></Link>
        </LiMobile>
        <LiMobile>
          <img src="/arrow.svg" alt="" />
          <Link href="/usuarios"><a>Usuários</a></Link>
        </LiMobile>
        <LiMobile>
          <img src="/arrow.svg" alt="" />
          <Link href="/posts"><a>Posts</a></Link>
        </LiMobile>
        <LiMobile>
          <img src="/arrow.svg" alt="" />
          <Link href="/denuncias"><a>Denúncias</a></Link>
        </LiMobile>
        <LiMobile>
          <img src="/arrow.svg" alt="" />
          <Link href="/resgates"><a>Resgates</a></Link>
        </LiMobile>
        <LiMobile>
          <img src="/arrow.svg" alt="" />
          <Link href="/notificacoes"><a>Notificações</a></Link>
        </LiMobile>
        <button 
          className="chevron"
          type="button"
          onClick={handleOpenMenu}
        >
          <img src="/chevron.svg" alt="" />
        </button>
      </Pages>        
    </Container>
  );
}

export default Header;