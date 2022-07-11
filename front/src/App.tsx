import React, { useEffect, useState } from 'react';
import { Global, LoadingOverlay, MantineProvider, MantineTheme, MantineThemeOverride } from '@mantine/core';
import { Location, NavigateFunction, Route, Routes as Router, useLocation, useNavigate } from 'react-router-dom';
import Auth from './Api/Auth';
import ThemeHelper from './Utils/ThemeHelper';
import LoginView from './Views/LoginView';
import Routes from './Views/routes';
import DashboardView from './Views/DashboardView';
import RegisterView from './Views/RegisterView';
import RequireSession from './Views/Middleware/RequireSession';
import CollectCodeView from './Views/CollectCodeView/CollectCodeView';

function App () {
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();

    const [sessionActive, setSessionActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        Auth.restoreSession()
            .then((isSessionRestored: boolean) => {
                setSessionActive(isSessionRestored);
                setLoading(false);

                const onLoginOrRegisterView: boolean =
                    location.pathname === Routes.login || location.pathname === Routes.register;

                if (isSessionRestored) {
                    if (onLoginOrRegisterView) {
                        navigate(Routes.dashboard);
                    }
                } else if (!onLoginOrRegisterView) {
                    navigate(Routes.login);
                }
            });
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
                        color: ThemeHelper.getTextColor(theme),
                        backgroundColor: ThemeHelper.getBackgroundColor(
                            theme,
                            theme.colors.dark[9],
                            theme.colors.gray[2]
                        )
                    }
                })}
            />
            <LoadingOverlay
                style={{
                    minHeight: window.innerHeight,
                    position: 'fixed'
                }}
                visible={loading}
                transitionDuration={500}
                loaderProps={{
                    size: 'xl',
                    variant: 'dots'
                }}
            />

            <Router>
                <Route path={Routes.dashboard} element={<RequireSession><DashboardView/></RequireSession>}/>
                <Route path={Routes.code} element={<RequireSession><CollectCodeView/></RequireSession>}/>
                <Route path={Routes.login} element={<LoginView/>}/>
                <Route path={Routes.register} element={<RegisterView/>}/>
                <Route path="*" element={<p>404</p>}/>
            </Router>
        </MantineProvider>
    );
}

export default App;
