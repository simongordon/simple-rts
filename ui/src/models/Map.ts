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
        const { x: playerX, y: playerY } = player.coords;
        const { x: toX, y: toY } = player.movingTo;
        let newX;
        if (player.coords.x > toX) {
          newX = playerX - 1;
        } else if (playerX < toX) {
          newX = playerX + 1;
        } else {
          newX = playerX;
        }

        let newY;
        if (playerY > toY) {
          newY = playerY - 1;
        } else if (playerY < toY) {
          newY = playerY + 1;
        } else {
          newY = playerY;
        }

        if (this.playersAt({ x: newX, y: newY }).length == 0) {
          player.coords = { x: newX, y: newY };
        }

        if (player.atDestination()) {
          player.stopMoving();
        }
      }
    }
  }

  playersAt(coords: Coords) {
    return this.players.filter(player => player.at(coords));
  }
}

export default Map;
