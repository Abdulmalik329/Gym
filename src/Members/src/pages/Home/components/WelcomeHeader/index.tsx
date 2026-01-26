import {
  Header,
  WelcomeSection,
  Title,
  Subtitle,
} from "./WelcomeHeader.styled";

interface Props {
  name: string;
  bio: string;
}

const WelcomeHeader = ({ name, bio }: Props) => {
  return (
    <Header>
      <WelcomeSection>
        <Title>Salom, {name}</Title>
        <Subtitle>{bio}</Subtitle>
      </WelcomeSection>
    </Header>
  );
};

export default WelcomeHeader;
