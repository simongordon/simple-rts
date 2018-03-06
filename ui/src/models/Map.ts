import { withinBounds } from '../helpers';
import Player from './Player';

interface MapProps {
  width: number;
  height: number;
}

class Map {
  players: Player[];
  teams: Team[];
  width: number;
  height: number;

  constructor(props: MapProps) {
    this.players = [];
    this.teams = [];
    this.width = props.width;
    this.height = props.height;
  }

  getTeam(teamID: TeamID) {
    const matches = this.teams.filter(team => team.id === teamID);
    if (matches.length > 0) {
      return matches[0];
    }
    return null;
  }

  addTeam(newTeam: Team) {
    if (this.getTeam(newTeam.id) != null) {
      throw new Error(`A team with the number ${newTeam.id} already exists!`);
    }
    this.teams.push(newTeam);
  }

  addPlayer(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  addPlayerAt(coords: Coords, team: TeamID) {
    this.addPlayer(new Player({ coords, team }));
  }

  addRandomPlayerFor(team: TeamID) {
    const coords: Coords = {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height)
    };
    this.addPlayer(new Player({ coords, team }));
  }

  teamFor(player: Player) {
    const team = this.getTeam(player.team);
    if (team == null) {
      throw new Error(`No match for player team ${player.team}`);
    }
    return team;
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
