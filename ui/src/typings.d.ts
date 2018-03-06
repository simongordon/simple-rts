interface Coords {
  x: number;
  y: number;
}

type TeamID = number;
type Team = {
  id: TeamID;
  colour: 'red' | 'blue' | 'green';
};
