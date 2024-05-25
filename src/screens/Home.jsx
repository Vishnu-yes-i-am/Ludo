import { Button, Icon, IconButton, List, ListItem } from '@mui/material';
import React from 'react';
import Ludo from './Ludo';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useNavigate, useLoaderData, useLocation } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    const Games = [{ name: "Ludo", game: <Ludo /> }]
    return (<>
        <List style={{ backgroundColor: 'white', height: '300px', width: '100vw' }}>
            {Games.map((game, index) => {
                console.log(game)
                return <ListItem key={index} style={{ height: '260px', margin: "20px", backgroundColor: "cadetblue", width: 'fit-content', borderRadius: '10px', boxShadow: '0 0 10px black' }}>
                    <Button size='large' onClick={() => { navigate("/game", { state: { "game": 1 } }) }}   >
                        {"Play " + game.name}
                        <PlayCircleIcon />
                    </Button>
                </ListItem>
            })}
        </List>
    </>);
}

export default Home;
