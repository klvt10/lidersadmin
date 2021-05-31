import { Container } from "@/styles/pages/component/FinanceCard";

interface FinanceCardProps {
  value: string;
  text: string;
  color?: string;
}

const FinanceCard = ({value, text, color='#8B008A'}: FinanceCardProps) => {
  return (
    <Container color={color}>
      <h2>R$</h2>
      <div>            
        <span className='value'>{value}</span>
        <span>{text}</span>
      </div>
    </Container>
  )
}

export default FinanceCard;