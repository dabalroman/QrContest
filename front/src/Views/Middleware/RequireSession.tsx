import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Auth from '../../Api/Auth';
import Routes from '../routes';

export type RequireSessionProps = {
    children: JSX.Element
};

export default function RequireSession (props: RequireSessionProps): JSX.Element | null {
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!Auth.isLoggedIn()) {
            navigate(Routes.login);
        }
    }, []);

    if (!Auth.isLoggedIn()) {
        navigate(Routes.login);
        return null;
    }

    return props.children;
}
