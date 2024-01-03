import React from 'react';
import { useState,useEffect } from 'react';
import PlayerPiece from './PlayerPiece';
import { getPlayerPiece } from '../screens/Ludo';
function Cell({color,players,pos,activated,setActivated,safe}) {

    const [pieces,setPieces]=useState([])
    
    useEffect(()=>{
        let temp_pieces=[]
        players?.map((player)=>{
            for(var i=0;i<player?.positions?.length;i++){
                if(player.positions[i]==pos){
                    temp_pieces.push({playerId:player?.id})
                }
    }
        })
        setPieces(temp_pieces)
    },[players])

    
    const gap={
        1:30,
        2:20,
        3:12,
        4:10,
        5:8,
        6:6,
        7:5,
        8:4,
        9:4
    } 
    
    let safeHouseLogo=safe?{
        backgroundImage:"url('../assets/images/safe.png')",
        backgroundSize:" 38px 40px"
    }:{};

    return (
        // <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
        <div style={{width:"38px",height:'40px',backgroundColor:color?color:'white',border:'solid black 1px',position:'relative',display:'grid',gridTemplateColumns:'repeat(1,5px)',gridTemplateRows:`repeat(${pieces?.length},${gap[pieces?.length]}px)`,alignItems:(pieces?.length)>1?'center':'',...safeHouseLogo}}>
        {pieces?.map((piece,index)=>{
            return <PlayerPiece key={"piece-"+index} hasWon={true} size={(pieces?.length)>1?0.8:1} position={pos} color={getPlayerPiece(piece.playerId)} setActivated={setActivated} activated={activated} />
        })}
        
        </div>
     );
}

export default Cell;