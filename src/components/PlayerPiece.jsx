import React, { useEffect, useState } from 'react';
import { getPlayerPiece } from '../screens/Ludo';


export function canMove(position,steps){

  if(position?.split('-')[0]=="win"){
    return false
  }
  let curr=parseInt(position.split('-')[1])
  //check if move can be made from this piece
  
  // not valid if in home 
  if(curr===0&&steps<6){
    return false
  }
  // no more moves left to reach win house
  if(curr>13 && 19-curr<steps){
    return false 
  }
  return true

}

function PlayerPiece({color,size,position,hasWon,activated,setActivated}) {

    const [active,setActive]=useState(activated?activated?.status:false)
    useEffect(()=>{
        if(activated&&activated?.status){

        if(!canMove(position,activated?.steps)){
          setActive(false);
          return 
        }
        setActive(activated?.status&&getPlayerPiece(activated.id)==color)
    }
    else{
      setActive(false);
    }
    },[activated])
    const colors=['#ff0000','#006fdf','#f9d330','#009b1a']
    
    const choosePiece=()=>{
      if(active){
        setActivated({...activated,position:position,status:false})
      }
      }
    
    const getNextCell=(pos)=>{
        let curr=pos.split("-")[1];
        let spCaseColor=pos.split("-")[0];
        if(curr===18){
            return 'win-'+color;
        }
        else if(curr===13){
            let nextColor=colors.findIndex((el)=>el==color);
            return nextColor+'-'+1;
        }
        else if(curr===7 && spCaseColor==color){
            return color+'-'+14;
        }
        else{
            return color+'-'+curr+1;
        }
    }

    return ( 
        <img id={active?'shake':''} width={30} height={40} src={`../assets/images/${color}`} style={{position:hasWon?'relative':'absolute',left:'5px',top:'-10px',transform:`scale(${active?1.25:(size?size:1)})`,cursor:active?'pointer':'',zIndex:"200"}} onClick={()=>{
         choosePiece()   
        }}></img>
     );
}

export default PlayerPiece;