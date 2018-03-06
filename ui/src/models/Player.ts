interface PlayerProps {
  coords: Coords;
}

class Player {
  coords: Coords;
  selected: boolean;
  movingTo: Coords | null;

  constructor(props: PlayerProps) {
    this.coords = props.coords;
    this.selected = false;
    this.movingTo = null;
  }

  at(otherCoords: Coords) {
    return this.coords.x == otherCoords.x && this.coords.y == otherCoords.y;
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
}

export default Player;
