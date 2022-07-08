import React, { useEffect, useState } from 'react';
import { Global, MantineProvider, MantineTheme, MantineThemeOverride } from '@mantine/core';
import { Route, Routes as Router } from 'react-router-dom';
import Auth from './Api/Auth';
import ThemeHelper from './Utils/ThemeHelper';
import LoginView from './Views/LoginView';
import Routes from './Views/routes';
import DashboardView from './Views/DashboardView';
import RegisterView from './Views/RegisterView';

function App () {
    const [sessionActive, setSessionActive] = useState<boolean>(false);

    useEffect(() => {
        Auth.restoreSession()
            .then((isSessionRestored: boolean) => setSessionActive(isSessionRestored));
    }, []);

    // noinspection TypeScriptValidateTypes
    const mantineTheme: MantineThemeOverride = {
        colorScheme: 'dark',
        primaryColor: 'blue',
        white: '#DDD',
        black: '#222'
    };

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={mantineTheme}
        >
            <Global
                styles={(theme: MantineTheme) => ({
                    body: {
                        ...theme.fn.fontStyles(),
                        color: ThemeHelper.getTextColor(theme)
                    }
                })}
            />
            <Router>
                <Route path={Routes.dashboard} element={<DashboardView/>}/>
                <Route path={Routes.login} element={<LoginView/>}/>
                <Route path={Routes.register} element={<RegisterView/>}/>
            </Router>
        </MantineProvider>
    );
}

export default App;
