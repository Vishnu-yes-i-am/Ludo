import React from 'react';
import { useState, useEffect } from 'react';
import Board from '../components/Board';
import Dice from '../components/Dice';
const colors = ['#ff0000', '#006fdf', '#009b1a', '#f9d330']



//sounds 
const moveSound = () => {
  const audioElement = new Audio('../assets/sounds/move.wav');
  audioElement.play();
};
const houseEntrySound = () => {
  const audioElement = new Audio('../assets/sounds/house_entry.mp3');
  audioElement.play();
};

const killSound = () => {
  const audioElement = new Audio('../assets/sounds/kill.mp3');
  audioElement.play();
};

export function getHouseColor(playerId) {
  switch (playerId) {
    case 1:
      return '#ff0000'; // Red
    case 2:
      return '#006fdf'; // Blue
    case 3:
      return '#009b1a'; // Green
    case 4:
      return '#f9d330'; // Yellow
  }
}

export function getPlayerPiece(playerId) {
  switch (playerId) {
    case 1:
      return 'red.png'; // Red
    case 2:
      return 'blue.png'; // Blue
    case 3:
      return 'green.png'; // Green
    case 4:
      return 'yellow.png'; // Yellow
  }
}

const getNextCell = (pos, spCaseColor) => {
  let curr = parseInt(pos.split("-")[1]);
  let color = pos.split("-")[0];
  let nextPos;

  if (curr === 0) {
    nextPos = color + '-' + 9
  }
  else if (curr === 18) {
    nextPos = 'win-' + color;
  }
  else if (curr === 13) {
    let nextColor = colors[(colors.findIndex((el) => el == color) + 1) % 4];
    nextPos = nextColor + '-' + 1;
  }
  else if (curr === 7 && spCaseColor == color) {
    nextPos = color + '-' + 14;
  }
  else {
    nextPos = color + '-' + parseInt(curr + 1);
  }
  return nextPos;
}

const getPreviousCell = (pos, spCaseColor) => {
  let curr = parseInt(pos.split("-")[1]);
  let color = pos.split("-")[0];
  let prevPos;

  if (curr === 9 && spCaseColor == color) {
    prevPos = color + '-' + 0;
  }
  else if (curr === 1) {
    let prevColor = colors[(colors.findIndex((el) => el === color) - 1 + 4) % 4];
    prevPos = prevColor + '-' + 13;
  }
  else {
    prevPos = color + '-' + (curr - 1);
  }

  return prevPos;
};

const isSafeZone = (pos) => {
  let curr = parseInt(pos?.split("-")[1]);
  if (curr === 4 || curr == 9) {
    return true
  }
  return false;
}
const initialPositions = [
  {
    id: 1,
    name: 'player1',
    positions: ['#ff0000-0', '#ff0000-0', '#ff0000-0', '#ff0000-0']
  },
  {
    id: 2,
    name: 'player2',
    positions: ['#006fdf-0', '#006fdf-0', '#006fdf-0', '#006fdf-0']
  },
  {
    id: 3,
    name: 'player3',
    positions: ['#009b1a-0', '#009b1a-0', '#009b1a-0', '#009b1a-0']
  },
  {
    id: 4,
    name: 'player4',
    positions: ['#f9d330-0', '#f9d330-0', '#f9d330-0', '#f9d330-0']
  }]
export default function Ludo({ customGame = false, noOfPlayers = 4, playerNames }) {

  const [turn, setTurn] = useState(1);
  const [update, setUpdate] = useState({ moved: false, killed: { status: false, id: null, pos: 'null' }, wasMax: false, winHouseEntry: false })
  const [players, setPlayers] = useState(null);
  const [v, setV] = useState(parseInt(0.99 + Math.random() * 6))
  const [activated, setActivated] = useState({ status: false, steps: null, position: null, id: null })


  const startNewGame = () => {
    localStorage.setItem('roll', JSON.stringify(0))
    localStorage.setItem('turn', JSON.stringify(1))
    localStorage.setItem('new', JSON.stringify(true));
    localStorage.setItem('players', JSON.stringify(initialPositions));
    setPlayers(initialPositions)
    window.location.reload();
  }

  //take necessary action after player moved
  useEffect(() => {
    const takeAction = async () => {

      if (players !== null) {
        localStorage.removeItem('players')
        localStorage.setItem('players', JSON.stringify(players));
      }
      //player have moves
      if (update?.moved) {

        //played may have  killed an opponent
        if (update?.killed?.status) {
          let pos = update?.killed?.pos;

          // opponent was not in a safe zone i.e. kill confirmed
          if (!isSafeZone(pos)) {

            let playerId = update?.killed?.id;
            const player = players[playerId - 1]
            let positions = player?.positions

            killSound()

            // move killed piece to home 
            while (true) {
              let newPositions = []
              let flag = false;

              for (var i = 0; i < positions?.length; i++) {
                if (!flag && positions[i] == pos) {
                  flag = true;
                  continue;
                }
                else {
                  newPositions.push(positions[i]);
                }
              }
              // if a player is not present at specified position 
              if (!flag) {
                // 'no ghoti at that pos'
                break
              }
              //...
              let new_pos = getPreviousCell(pos, getHouseColor(playerId))
              newPositions.push(new_pos);

              setPlayers((prevState) => {
                const newPlayers = [...prevState];
                newPlayers[playerId - 1] = { ...player, positions: newPositions };
                return newPlayers;
              });

              await (new Promise((resolve, reject) => {
                setTimeout(() => { resolve(); }, 50)
              }))

              pos = new_pos;
              if (pos.split('-')[1] == '0') {
                break;
              }
              positions = newPositions
            }

            if (players !== null)
              localStorage.setItem('players', JSON.stringify(players))
          }

        }
        if (update?.killed?.status || update.wasMax || update.winHouseEntry) {

          //possibly won the game  ** not working though :-) 
          if (update.winHouseEntry) {
            let varb = turn;
            setTurn(varb);
          }
          // do not change turn

        }
        else {
          let temp_turn = (turn + 1) % 5
          if (temp_turn == 0)
            temp_turn += 1;
          setTurn(temp_turn)
          localStorage.setItem('turn', JSON.stringify(temp_turn));

        }
        localStorage.setItem('roll', JSON.stringify(0));
      }
    }
    takeAction();
  }
    , [update])

  // user have selected which piece to move or rolled a dice , take necessary action
  useEffect(() => {
    const action = async () => {
      let p = activated;
      if (p.steps != null && p.position && p.id && !p.status) {
        await move(p.id, p.position, p.steps);
        localStorage.setItem('roll', JSON.stringify(0));
      }
    }
    action();
  }, [activated])

  //restore previous state 
  useEffect(() => {

    const storedPositions = JSON.parse(localStorage.getItem('players'));
    const playerTurn = JSON.parse(localStorage.getItem('turn'));
    const diceRoll = JSON.parse(localStorage.getItem('roll'));
    var newGame = JSON.parse(localStorage.getItem('new'));


    if (newGame == null || newGame === 'true') {
      newGame = true;
      localStorage.setItem('new', JSON.stringify(false))
    }
    else {
      newGame = false;
    }

    if (!newGame) {
      //load previous saved game
      setPlayers(storedPositions);
      setTurn(parseInt(playerTurn));

      if (diceRoll != '0') {
        setV(diceRoll);
        // "already rolled dice just need to move a piece now";
        setActivated({ status: true, steps: diceRoll, position: null, id: parseInt(playerTurn) })
      }

    }
    else {
      setPlayers(initialPositions)
      localStorage.setItem('players', JSON.stringify(initialPositions));
    }

  }, [])


  useEffect(() => { }, [players])


  //get all pieces present in a cell
  const getPiecesInCell = (pos, skip) => {

    if (!skip) {
      skip = []
    }
    const temp_pieces = []
    players?.map((player) => {
      for (var i = 0; i < player?.positions.length; i++) {
        if (player.positions[i] == pos && !skip.includes(player.id)) {
          temp_pieces.push(player?.id)
        }
      }
    })
    return temp_pieces;


  }


  //make move function
  const move = async (playerId, pos, steps) => {

    let curr = parseInt(pos.split("-")[1]);
    // check moves
    //open from home
    if (curr === 0) {
      steps = 1;
    }

    const player = players[playerId - 1]
    let positions = player?.positions
    let lastRoll = activated.steps;
    while (steps > 0) {
      let newPositions = []
      let flag = false;

      for (var i = 0; i < positions?.length; i++) {
        if (!flag && positions[i] == pos) {
          flag = true;
          continue;
        }
        else {
          newPositions.push(positions[i]);
        }
      }
      // if a player is not present at specified position 
      if (!flag) {
        //'no ghoti at that pos'
        break
      }
      //...
      let new_pos = getNextCell(pos, getHouseColor(playerId))
      newPositions.push(new_pos);

      setPlayers((prevState) => {
        const newPlayers = [...prevState];
        newPlayers[playerId - 1] = { ...player, positions: newPositions };
        return newPlayers;
      });
      moveSound()
      await (new Promise((resolve, reject) => {
        setTimeout(() => { resolve(); }, 300)
      }))

      pos = new_pos;
      steps -= 1;
      positions = newPositions
    }
    let tempUpdate = { moved: false, killed: { status: false, id: null, pos: 'null' }, wasMax: false, winHouseEntry: false }
    setUpdate(tempUpdate);
    // if last was 6
    if (lastRoll === 6) {
      tempUpdate["wasMax"] = true
    }
    //if entered winhouse
    if (pos?.split('-')[0] == "win") {
      tempUpdate["winHouseEntry"] = true;
      houseEntrySound();
    }

    // tempUpdate['winHouseEntry']=true

    //if killed an opponent 
    if (!isSafeZone(pos)) {
      let opnts = getPiecesInCell(pos, [playerId]);
      opnts.map((id) => { console.log("killed", id); })
      if (opnts?.length > 0)
        tempUpdate['killed'] = { status: true, id: opnts[0], pos: pos }
    }
    tempUpdate['moved'] = true;
    setUpdate(tempUpdate);
  }

  if (!players) {
    return <>Loading ... </>
  }

  return (
    <div className="game-container" id='game'>
      <Board turn={turn} players={players} setActivated={setActivated} activated={activated} />
      <div style={{ margin: '20px' }}>{`Player ${turn} Turn`}</div>
      <Dice move={move} players={players} turn={turn} setActivated={setActivated} activated={activated} v={v} setV={setV} ></Dice>
      <button className="button red" onClick={() => { startNewGame() }} style={{ marginTop: '100px' }}>New Ludo</button>
    </div>
  );
}