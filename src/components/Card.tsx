import { ReactNode } from 'react';
import { Container, Title } from "@/styles/pages/component/Card"

interface CardProps {
  title?: string;
  children: ReactNode;
}

const Card = ({ title, children }: CardProps) => {

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};

export default Card;
