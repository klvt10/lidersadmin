import Header from '@/components/Header';
import Link from 'next/link';
import { Container, Title, BoxInfo } from '@/styles/pages/Home';

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Title>Atividades nos últimos 30 dias</Title>
        <BoxInfo>
          <Link href="/usuarios">
            <a>
              <strong>55</strong>
              <span>Novos usuários</span>
            </a>
          </Link>
          <Link href="/posts">
            <a>
              <strong>72</strong>
              <span>Novos posts</span>
            </a>
          </Link>
          <Link href="/resgates">
            <a>
              <strong>5</strong>
              <span>Novos pedidos de resgate</span>
            </a>
          </Link>
          <Link href="/denuncias">
            <a>
              <strong>2</strong>
              <span>Novas Denúncias</span>
            </a>
          </Link>
        </BoxInfo>
      </Container>
    </>
  )
}
