import React from 'react';
import House from './House';
import SidePath from './SidePath';
import { useEffect } from 'react';
import WinHouse from './WinHouse';


function Board({players,activated,setActivated,turn}) {
    useEffect(()=>{},[players])

    return ( 
        <>
        <div style={{width:'600px',height:'600px',border:'solid black 1px',display:"grid",gridTemplateColumns:'repeat(3,1fr)',gridTemplateRows:'repeat(1fr,3)',position:'relative'}}>
            <House turn={turn} playerId={1} players={players} setActivated={setActivated} activated={activated} />
            <House turn={turn} playerId={2} players={players} setActivated={setActivated} activated={activated}/>
            <WinHouse players={players}></WinHouse>
            <House turn={turn} playerId={3} players={players} setActivated={setActivated} activated={activated}/>
            <House turn={turn} playerId={4} players={players} setActivated={setActivated} activated={activated}/>
        </div>
        </>
     );
}

export default Board;