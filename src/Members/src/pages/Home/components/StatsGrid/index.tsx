import { Grid, StatCard, StatNumber, StatLabel } from "./StatsGrid.styled";

interface Props {
  stats: {
    workouts: number;
    calories: number;
    hours: number;
  };
}

const StatsGrid = ({ stats }: Props) => {
  return (
    <Grid>
      <StatCard>
        <StatNumber>{stats.workouts}</StatNumber>
        <StatLabel>Workouts</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{stats.calories}</StatNumber>
        <StatLabel>Kcal</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{stats.hours}</StatNumber>
        <StatLabel>Soat</StatLabel>
      </StatCard>
    </Grid>
  );
};

export default StatsGrid;
