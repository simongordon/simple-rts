interface PlayerProps {
  coords: Coords;
}

class Player {
  coords: Coords;
  selected: boolean;

  constructor(props: PlayerProps) {
    this.coords = props.coords;
    this.selected = false;
  }
}

export default Player;
