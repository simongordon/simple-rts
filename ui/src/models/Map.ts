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

  moveSelectedTo(newPos: Coords) {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.selected) {
        player.moveTo(newPos);
      }
    }
  }

  processFrame() {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.movingTo != null) {
        const { x: toX, y: toY } = player.movingTo;
        if (player.coords.x > toX) {
          player.coords.x--;
        } else if (player.coords.x < toX) {
          player.coords.x++;
        }

        if (player.coords.y > toY) {
          player.coords.y--;
        } else if (player.coords.y < toY) {
          player.coords.y++;
        }

        if (player.atDestination()) {
          player.stopMoving();
          if (this.playersAt({ x: toX, y: toY }).length > 1) {
            const shuffleAmount = 10;
            const randX = toX + shuffleAmount * (Math.random() > 0.5 ? 1 : -1);
            const randY = toY + shuffleAmount * (Math.random() > 0.5 ? 1 : -1);
            player.moveTo({ x: randX, y: randY });
          }
        }
      }
    }
  }

  playersAt(coords: Coords) {
    return this.players.filter(player => player.at(coords));
  }
}

export default Map;
