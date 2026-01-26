import {
  HeroImage,
  WorkoutBadge,
  BadgeNumber,
  BadgeText,
} from "./HeroSection.styled";

interface Props {
  streak: number;
}

const HeroSection = ({ streak }: Props) => {
  return (
    <HeroImage backgroundImage="https://images.unsplash.com/photo-1599058917212-d750089bc07e">
      <WorkoutBadge>
        <BadgeNumber>{streak}</BadgeNumber>
        <BadgeText>KUN STREAK</BadgeText>
      </WorkoutBadge>
    </HeroImage>
  );
};

export default HeroSection;
