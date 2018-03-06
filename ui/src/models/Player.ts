import { withinBounds } from '../helpers';

interface PlayerProps {
  coords: Coords;
  team: TeamID;
}

class Player {
  coords: Coords;
  selected: boolean;
  movingTo: Coords | null;
  width: number;
  team: TeamID;

  constructor(props: PlayerProps) {
    this.coords = props.coords;
    this.team = props.team;
    this.selected = false;
    this.movingTo = null;
    this.width = 20;
  }

  at(otherCoords: Coords) {
    return this.coords.x === otherCoords.x && this.coords.y === otherCoords.y;
  }

  atDestination() {
    return this.movingTo && this.at(this.movingTo);
  }

  moveTo(newCoords: Coords) {
    this.movingTo = newCoords;
  }

  stopMoving() {
    this.movingTo = null;
  }

  pointInRange(coords: Coords) {
    const boxRadius = this.width / 2;
    const p1: Coords = {
      x: this.coords.x - boxRadius,
      y: this.coords.y - boxRadius
    };
    const p2: Coords = {
      x: this.coords.x + boxRadius,
      y: this.coords.y + boxRadius
    };
    return withinBounds(coords, p1, p2);
  }
}

export default Player;
