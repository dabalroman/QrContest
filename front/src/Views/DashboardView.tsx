import React, { useEffect } from 'react';
import { Button, createStyles, MantineTheme } from '@mantine/core';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Auth from '../Api/Auth';
import Routes from './routes';
import UserModel from '../Model/UserModel';
import ThemeHelper from '../Utils/ThemeHelper';
import { TileClass } from './Style';
import CollectedCodesTile from './Tiles/CollectedCodesTile';
import Navbar from '../Components/Navbar';
import CollectCodeTile from './Tiles/CollectCodeTile';
import StandingsTile from './Tiles/StandingsTile';
import AllCodesTile from './Tiles/AllCodesTile';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        score: {
            textAlign: 'center',

            '> h1': {
                fontSize: '3em !important'
            }
        },

        loader: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 40
        },

        braceletId: {
            backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[9], theme.colors.gray[0]),
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: '0.8em',
            margin: '20px 0',
            textAlign: 'center'
        },

        ...TileClass(theme)
    })) as Function;

export default function DashboardView (): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { classes } = useStyles();

    useEffect(() => {
        if (!Auth.isLoggedIn()) {
            navigate(Routes.login);
        }
    }, []);

    const user: UserModel = Auth.getCurrentUser();

    return (
        <div className="App">
            <Navbar/>
            <div className={ThemeHelper.classes(classes.tile, classes.score)}>
                <h1>{user.score} pkt</h1>
                {user.score !== 0 ? 'Ilość zgromadzonych punktów' : 'Znajdź i zeskanuj swój pierwszy kod!'}
            </div>
            <CollectCodeTile/>
            <StandingsTile/>
            <CollectedCodesTile/>
            {user.isAdmin && <AllCodesTile/>}
            <div className={ThemeHelper.classes(classes.tile)}>
                <h1>Nagrody</h1>
                <b>W puli nagród jest ponad 200 fantów!</b>
                <p>To tutaj pojawi się informacja o zwycięzcach.</p>
                <p>Tura pierwsza trwa do godziny 14:00 w sobotę.<br/>Tura druga trwa do godziny 12:00 w niedzielę.</p>
            </div>
            <div className={ThemeHelper.classes(classes.tile)}>
                <div className={classes.braceletId}>{user.name}#{user.braceletId}</div>
                <Button
                    fullWidth
                    onClick={() => {
                        Auth.logout()
                            .then(() => navigate(Routes.login));
                    }}
                >
                    Wyloguj
                </Button>
            </div>
        </div>
    );
}
