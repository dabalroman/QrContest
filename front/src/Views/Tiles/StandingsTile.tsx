import React, { useEffect, useState } from 'react';
import { createStyles, MantineTheme, Table } from '@mantine/core';
import { Link } from 'react-router-dom';
import ThemeHelper from '../../Utils/ThemeHelper';
import InlineLoader from '../../Components/InlineLoader';
import { CleanLinkClass, TileClass } from '../Style';
import Model from '../../Model/Model';
import UserStandingsModel from '../../Model/UserStandingModel';
import Auth from '../../Api/Auth';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        table: {
            'tr>td, th>td': {
                lineHeight: '24px'
            },

            'th:first-of-type, td:first-of-type': {
                paddingLeft: 0
            },

            'th:first-of-type, td:last-of-type': {
                paddingRight: 0
            },

            'tr:nth-of-type(1)>td': {
                fontSize: '1.3em',
                fontWeight: 'bold'
            },

            'tr:nth-of-type(2)>td': {
                fontSize: '1.15em',
                fontWeight: 'bold'
            },

            'tr:nth-of-type(3)>td': {
                fontSize: '1.0em',
                fontWeight: 'bold'
            }
        },

        rowMe: {
            color: theme.colors[theme.primaryColor][5]
        },

        standing: {
            backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[4], theme.colors.gray[2]),
            padding: 30,
            margin: '20px -20px',
            textAlign: 'center',
            fontSize: '1.25em',
            fontWeight: 'bold'
        },

        ...TileClass(theme),
        ...CleanLinkClass(theme)
    })) as Function;

export default function StandingsTile () {
    const { classes } = useStyles();

    const [userStandings, setUserStandings] = useState<UserStandingsModel[] | null>(null);

    useEffect(() => {
        UserStandingsModel.getAll()
            .then((models: Model[]) => models as UserStandingsModel[])
            .then((codes: UserStandingsModel[]) => setUserStandings(codes));
    }, []);

    const myId: number = Auth.getCurrentUser().id;
    const myStanding: number =
        userStandings?.findIndex((userStanding: UserStandingsModel) => userStanding.id === myId) ?? -1;

    const tableContents: JSX.Element[] | null =
        userStandings?.map((userStanding: UserStandingsModel, index: number) => (
            <tr key={userStanding.id} className={(userStanding.id === myId ? classes.rowMe as string : '')}>
                <td>{index + 1}.</td>
                <td>
                    {Auth.getCurrentUser().isAdmin
                        ? <Link className={classes.cleanLink} to={`/user/${userStanding.id}`}>{userStanding.name}</Link>
                        : userStanding.name}
                </td>
                <td>{userStanding.score} pkt</td>
            </tr>
        )) ?? null;

    const collectedCodesJSX: JSX.Element = userStandings !== null
        ? (
            <div>
                <Table className={classes.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nickname</th>
                            <th>Wynik</th>
                        </tr>
                    </thead>
                    <tbody>{tableContents}</tbody>
                </Table>
            </div>
        )
        : <InlineLoader/>;

    return (
        <div className={ThemeHelper.classes(classes.tile)}>
            <h1>Ranking</h1>
            {myStanding !== -1 && <div className={classes.standing as string}>Jesteś na {myStanding + 1}. pozycji</div>}
            {collectedCodesJSX}
        </div>
    );
}
