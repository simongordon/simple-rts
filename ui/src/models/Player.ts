interface PlayerProps {
  coords: Coords;
}

class Player implements PlayerProps {
  coords: Coords;

  constructor(props: PlayerProps) {
    this.coords = props.coords;
  }
}

export default Player;
