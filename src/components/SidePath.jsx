import React from 'react';
import { useEffect } from 'react';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Cell from './Cell';
function SidePath({orientataion,color,players,activated,setActivated}) {

    useEffect(()=>{},[players])
    return ( 
        <div style={{width:'240px',display:'grid',gridTemplateColumns:'repeat(6,1fr)',borderLeft:'solid black 1px'}}>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-8`} />        
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-9`} color={color} />
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-10`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-11`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-12`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-13`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-7`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-14`} color={color}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-15`} color={color}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-16`} color={color}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-17`} color={color}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-18`} color={color}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-6`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-5`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-4`} safe={true}></Cell>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-3`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-2`}/>
            <Cell  setActivated={setActivated} activated={activated} players={players} pos={`${color}-1`}/>
        </div>
     );
}

export default SidePath;