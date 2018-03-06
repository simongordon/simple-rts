import { withinBounds } from '../helpers';
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
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const { coords: { x, y } } = player;
      player.selected = false;
      if (withinBounds(player.coords, selectStart, selectEnd)) {
        player.selected = true;
      }
    }
  }

  selectPlayerAt(coords: Coords) {
    const playersAtPos = this.players.filter(player =>
      player.pointInRange(coords)
    );
    if (playersAtPos.length > 0) {
      const player = playersAtPos[0];
      player.selected = true;
    }
  }

  clearSelected() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].selected = false;
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

        if (this.playersAt({ x: newX, y: newY }).length === 0) {
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
