import React, { useEffect } from 'react';
import { Button } from '@mantine/core';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Auth from '../Api/Auth';
import Routes from './routes';

export default function DashboardView (): JSX.Element {
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!Auth.isLoggedIn()) {
            navigate(Routes.login);
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hello!
                </p>
                <p>
                    {`What's up, ${Auth.getCurrentUser().name}`}
                </p>
            </header>
            <Button onClick={() => {
                Auth.logout()
                    .then(() => navigate(Routes.login));
            }}
            >
                Logout
            </Button>
        </div>
    );
}
