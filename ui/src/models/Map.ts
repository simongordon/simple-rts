import Player from './Player';

class Map {
  players: Player[];

  constructor() {
    this.players = [];
  }

  addPlayer(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  addPlayerAt(coords: Coords) {
    this.addPlayer(new Player({ coords }));
  }

  selectPlayers(selectStart: Coords, selectEnd: Coords) {
    const { x: startX, y: startY } = selectStart;
    const { x: endX, y: endY } = selectEnd;

    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const { coords: { x, y } } = player;
      player.selected = false;
      const inXRange = (x >= startX && x <= endX) || (x >= endX && x <= startX);
      const inYRange = (y >= startY && y <= endY) || (y >= endY && y <= startY);
      if (inXRange && inYRange) {
        player.selected = true;
      }
    }
  }
}

export default Map;
