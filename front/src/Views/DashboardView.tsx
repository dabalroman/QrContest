import React, { useEffect } from 'react';
import { Button, createStyles, MantineTheme } from '@mantine/core';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Auth from '../Api/Auth';
import Routes from './routes';
import UserModel from '../Model/User/UserModel';
import ThemeHelper from '../Utils/ThemeHelper';
import { TileClass } from './Style';
import CollectedCodesTile from './Tiles/CollectedCodesTile';
import Navbar from '../Components/Navbar';
import CollectCodeTile from './Tiles/CollectCodeTile';

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
                <h1>{user.score} pkt.</h1>
                Ilość zgromadzonych punktów
            </div>
            <CollectCodeTile/>
            <div className={ThemeHelper.classes(classes.tile)}>
                <h1>Ranking</h1>
            </div>
            <CollectedCodesTile/>
            <div className={ThemeHelper.classes(classes.tile)}>
                <h1>Inne</h1>
                <Button onClick={() => {
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
