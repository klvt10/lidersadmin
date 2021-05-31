import { Container } from "@/styles/pages/component/ActionContainer";

interface ActionContainerProps {
  urlImg: string;
  text: string;
  color?: string;
}

const ActionContainer = ({urlImg, text, color='#8B008A'}: ActionContainerProps) => {
  return (
    <Container color={color}>
      <img src={urlImg} alt="" />
      <span>{text}</span>
    </Container>
  )
}

export default ActionContainer;