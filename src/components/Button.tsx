import { Container } from "@/styles/pages/component/Button"

interface UserButtonProps {
  urlImg: string;
  title: string;
  color?: string;
  onClick?: () => void; 
}

const Button = ({
  urlImg,
  title,
  color='#8B008A',
  onClick,
}: UserButtonProps) => {

  return (
    <Container color={color}>
      <button type="button" onClick={onClick}>
        <img src={urlImg} alt={title} />
        {title}
      </button>
    </Container>
  )}

  export default Button;