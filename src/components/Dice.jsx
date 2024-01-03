import React from 'react';
import { useState,useEffect } from 'react';

import { canMove } from './PlayerPiece';
const rollSound = () => {
    const audioElement = new Audio('../assets/sounds/roll.mp3');
    audioElement.play().catch((err)=>{console.log(err)});
  };

function Dot({blank}){
    return (
        <div  style={{width:"15px",height:'15px',borderRadius:'50%',backgroundColor:blank?'transparent':'black',margin:'auto'}}></div>
    )
}
function DiceSide({value,t}){
    const confs={
        1:[0,0,0,0,1,0,0,0,0],
        2:[0,1,0,0,0,0,0,1,0],
        3:[0,1,0,0,1,0,0,1,0],
        4:[1,0,1,0,0,0,1,0,1],
        5:[1,0,1,0,1,0,1,0,1],
        6:[1,0,1,1,0,1,1,0,1]
    }
    return (
        <div className="diceroll" style={{width:'80px',height:'80px',padding:'10px',position:'absolute',backgroundColor:"antiquewhite",border:'solid black 1px',borderRadius:'5px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',justifyContent:'center',alignItems:'center',transform:t,boxShadow:'0 0 10px inset'}}>
                {confs[value]?.map((el,index)=>{
                    return <Dot key={`dot-${index}`} blank={el===0}/>
                })}

            </div>
    )
}


function Dice({move,players,turn,activated,setActivated,v,setV}) {
    
    const availableMoves=(id,steps)=>{
        let positions=players[turn-1]?.positions
        
        let avail=[]
        positions?.map((position)=>{
            if(canMove(position,steps)){
                avail.push(position)
            }
        })
        return avail;
    }
    const [rolling,setRolling]=useState(false);
    const [makeMove,setMakeMove]=useState(false);

    //if player has won already just move ahead
    useEffect(()=>{
        var flag=false
        for(var step=0;step<=6;step++){
            let pp=availableMoves(turn,step);
            if(pp?.length>0){
                flag=true;
                break;
            }
        }
        if (!flag){
            // move ahead
            move(turn,'pos-?',0);
            setActivated({position:null,status:false,id:turn,steps:0});

        }

    },[turn])

    useEffect(()=>{
        if(makeMove){

            const pieceToMove=availableMoves(turn,v);
            // no valid moves available
            if(pieceToMove?.length===0){
                move(turn,'pos-?',0);
                setActivated({position:null,status:false,id:turn,steps:0});
            }
            
            //automatically make move - only one valid move
            
            else if(pieceToMove?.length===1){
                setActivated({position:pieceToMove[0],status:false,id:turn,steps:v});
                return ;
            }

            else{
            //ask user to make move
            setActivated({...activated,status:true,steps:v,id:turn});
            }
        }
    },[makeMove])
    useEffect(()=>{},[v,activated])
    
    const roll=async(val)=>{
        setMakeMove(false);
        setRolling(true);
        rollSound();
        var z;
        for(var i=0;i<12;i++){
            z=1+parseInt(Math.random()*5.99)
            setV(z)
            await (new Promise((resolve,reject)=>{
                setTimeout(()=>{resolve()},100);
            }))
        }
        if(val){
            z=6
            setV(6)
        }
        localStorage.setItem('roll', JSON.stringify(z));
        setRolling(false);
        setMakeMove(true);
        
    }
    
    return ( <>
        <div   style={{width:'300px',height:'200px',backgroundColor:'pink',display:'flex',justifyContent:'space-around',alignItems:'center',margin:'auto'}}>
            <div style={{height:'150px',width:'100px',position:'relative'}}>
            <DiceSide value={v} t={'rotateY(0deg)'}  />
            <button  className={`button green ${activated?.status?'disabled':''}`}  onClick={()=>{if(!activated?.status){roll();}}} style={{position:'absolute',bottom:'0',left:'20px'}}>Roll</button>

            </div>
        </div>
        {/* <div>
            {rolling?'rolling...':`it's ${v}`}
        </div> */}
    </>
     );
}

export default Dice;