import Link from 'next/link';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'
import Router from 'next/router';
import { parseCookies } from 'nookies';

import { Api } from '@/services/Api';
import Header from '@/components/Header';

import { Container, Title, BoxInfo, BoxLoading } from '@/styles/pages/Home';
import { useAuth } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';

interface DataProps {
  denuncias: number;
  dias: number;
  posts: number;
  resgates: number;
  usuarios: 11;
}

export default function Home() {
  const [data, setData] = useState<DataProps>();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // pode ser undefined ou null
    if (isAuthenticated === false) {
      Router.push('/login');
    }
  }, [isAuthenticated])

  useEffect(() => {
    async function load() {
      try {
        const response = await Api.get<DataProps>('HomeAdmin', {
          params: {
            dias: 90,
          },
        });

        setData(response.data);  
      } catch (e) {
        //
      }
    }

    load();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Title>
          <span className="hidden">Bem vindo {user?.appUser}.</span><br />
          Atividades nos últimos {data?.dias || 30} dias
        </Title>
        {data ? (
          <BoxInfo>
            <Link href="/usuarios">
              <a>
                <strong>{data.usuarios}</strong>
                <span>Novos usuários</span>
              </a>
            </Link>
            <Link href="/posts">
              <a>
                <strong>{data.posts}</strong>
                <span>Novos posts</span>
              </a>
            </Link>
            <Link href="/resgates">
              <a>
                <strong>{data.resgates}</strong>
                <span>Novos pedidos de resgate</span>
              </a>
            </Link>
            <Link href="/denuncias">
              <a>
                <strong>{data.denuncias}</strong>
                <span>Novas Denúncias</span>
              </a>
            </Link>
          </BoxInfo>
        ) : (
          <BoxLoading>
          <ContentLoader uniqueKey="box" width="394" height="394">
            <rect x="0" y="0" width="192" height="192" />
            <rect x="202" y="0" width="192" height="192" />
            <rect x="0" y="202" width="192" height="192" />
            <rect x="202" y="202" width="192" height="192" />
          </ContentLoader>
          </BoxLoading>
        )}
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
