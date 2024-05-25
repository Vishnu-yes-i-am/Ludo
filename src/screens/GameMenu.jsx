import React from 'react';
import Ludo from './Ludo';
import { useLocation } from 'react-router-dom';

function GameMenu(props) {
    console.log(console.log(useLocation()))
    return (<>
        <Ludo />
    </>);
}

export default GameMenu;