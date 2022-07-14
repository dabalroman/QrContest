import React from 'react';
import { ActionIcon, createStyles, MantineTheme } from '@mantine/core';
import { QuestionMark } from 'tabler-icons-react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { CleanLinkClass, TextAlignClass } from '../Views/Style';
import Auth from '../Api/Auth';
import UserModel from '../Model/User/UserModel';
import ThemeHelper from '../Utils/ThemeHelper';
import Routes from '../Views/routes';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        navbar: {
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,

            background: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[4], theme.colors.gray[1]),
            borderBottom: `2px solid ${theme.colors[theme.primaryColor][8]}`,
            boxShadow: `0 3px 4px ${ThemeHelper.getBackgroundColor(theme, '#000', '#FFF')}`,
            padding: '10px 15px',
            height: 50,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'center'
        },

        placeholder: {
            height: 50
        },

        helpIcon: {
            display: 'inline-block',
            color: ThemeHelper.getTextColor(theme),
            backgroundColor: theme.colors[theme.primaryColor][8]
        },

        ...TextAlignClass,
        ...CleanLinkClass(theme)
    })) as Function;

export default function Navbar () {
    const { classes } = useStyles();
    const navigate: NavigateFunction = useNavigate();

    const user: UserModel = Auth.getCurrentUser();

    return (
        <div>
            <div className={classes.navbar}>
                <div>{user.score} pkt</div>
                <div className={classes.alignCenter}>
                    <Link className={classes.cleanLink} to={Routes.dashboard}><b>{user.name}</b></Link>
                </div>
                <div className={classes.alignRight}>
                    <ActionIcon
                        className={classes.helpIcon as string}
                        variant="default"
                        onClick={() => navigate(Routes.help)}
                    >
                        <QuestionMark/>
                    </ActionIcon>
                </div>
            </div>
            <div className={classes.placeholder}/>
        </div>
    );
}
