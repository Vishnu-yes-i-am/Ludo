import React from 'react';
import { useState,useEffect } from 'react';
import PlayerPiece from './PlayerPiece';
import Cell from './Cell';
function WinHouse({players}) {
  const [pieces,setPieces]=useState({
      '#ff0000':[],
     '#006fdf':[] ,
     '#009b1a':[],
     '#f9d330':[]
  })
    
  useEffect(()=>{
      let temp_pieces={
        '#ff0000':[],
       '#006fdf':[] ,
       '#009b1a':[],
       '#f9d330':[]
    }
      players?.map((player)=>{
          for(var i=0;i<player?.positions?.length;i++){
              if(player?.positions[i].split('-')[0]=='win'){
                  temp_pieces[player?.positions[i].split('-')[1]].push(0)
              }
  }
      })
      setPieces(temp_pieces)
  },[players])

    return (
        <div className="image-container" style={{width:'125px',height:'130px',backgroundSize:'125px 130px',position:'absolute',left:'240px',top:'235px',backgroundImage:'url("../assets/images/win.png")'}}>
          
          {/* red won area */}
          <div className="triangle triangle-1">
            { pieces['#ff0000'].map((el,index)=>{
              return <PlayerPiece key={`sa1-${index}`} hasWon={true} size={0.7}  color={"red.png"}/>
            })}
          </div>

          {/* blue won area*/}
          <div className="triangle triangle-2">
            { pieces["#006fdf"].map((el,index)=>{
              return <PlayerPiece key={`sa2-${index}`} hasWon={true} size={0.7}  color={"blue.png"}/>
            })}
          </div>

          {/* yellow won area*/}
          <div className="triangle triangle-3">
            { pieces["#009b1a"].map((el,index)=>{
              return <PlayerPiece key={`sa3-${index}`} hasWon={true} size={0.7}  color={"green.png"}/>
            })}
          </div>

          {/* green won area*/}
          <div className="triangle triangle-4">
            { pieces["#f9d330"].map((el,index)=>{
              return <PlayerPiece key={`sa4-${index}`} hasWon={true} size={0.7}  color={"yellow.png"}/>
            })}
          </div>

        </div>
      );
}

export default WinHouse;