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
}

export default Player;
