import React from 'react';
import PlayerPiece from './PlayerPiece';
import { getHouseColor } from '../screens/Ludo';

function HPP({icon,playerId,activated,setActivated}) {
    return ( 
        <div style={{width:'40px',height:'40px',borderRadius:'50%',backgroundColor:'darkgrey',position:'relative'}}>
            {icon?<PlayerPiece color={icon} position={`${getHouseColor(playerId)}-${0}`} setActivated={setActivated} activated={activated}/>:''}
        </div>
     );
}

export default HPP;

