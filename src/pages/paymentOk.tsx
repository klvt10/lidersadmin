import { Container, Header, Logo } from "@/styles/pages/PaymentOk";

export default function PaymentOk() {
  return (
    <Container>
      <Header>
        <span>Inscrição Liders Club</span>
      </Header>
      <Logo>
        <img src="/logoSite.png" alt="" />
        <span>Aguarde o recebimento da confirmação bancária para que seja possível acessar o APP.</span>
      </Logo>
    </Container>
  )
}