import React from 'react';
import HPP from './HousePlayerPos';
import { useEffect ,useState} from 'react';
import SidePath from './SidePath';
import { getHouseColor } from '../screens/Ludo';
import { getPlayerPiece } from '../screens/Ludo';
// House.js
function House({ turn,playerId,players,activated,setActivated}) {
  
    const [inHome,setInHome]=useState(0);
    useEffect(()=>{
      const player=players[playerId-1]
      let pos=player.positions;
      let c=0;
      for(var i=0;i<pos?.length;i++){
        if(pos[i].split('-')[1]==0)
        c+=1;
      }
      setInHome(c);
    },[players])
    const houseColor = getHouseColor(playerId); // Define function to map player ID to house color
    let x=Array(inHome).fill(0)
    let y=Array(4-inHome).fill(0)
    const orts={
        1:{
            top:'-4px',
            left:'-2px'
        },
        2:{
            transform:'rotate(90deg)',
            right:'60px',
            top:'-64px'
            },
        3:{
          transform:'rotate(180deg)',
            right:'-4px',
            bottom:'0px'
        },
        4:{
          
            transform:'rotate(-90deg)',
            bottom:'-64px',
            left:'60px'
            
        }

    }
    return (
    <div style={{display:'flex',flexDirection:'column',...orts[playerId],position:'absolute'}}>
      <div className="playerName">{"Player - "+playerId}</div>
      <div className="house" style={{ background: houseColor,width:"160px",height:"160px",padding:"40px" }}>
            <div className='housesquare' id={`${(turn==playerId)?'active':''}`} style={{width:'80%',height:'80%',padding:'10%',display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:"30px"}}>
                {x.map((el,index)=><HPP setActivated={setActivated} activated={activated} playerId={playerId} key={`ss-${index}`} icon={getPlayerPiece(playerId)} />)}
                {y.map((el,index)=><HPP setActivated={setActivated} activated={activated} playerId={playerId} key={`sp-${index}`}/>)}
                
            </div>
      </div>
      <SidePath color={getHouseColor(playerId)} players={players} setActivated={setActivated} activated={activated}/>
      </div>
    );
  }
  
  
  
  
  
  
  

export default House;