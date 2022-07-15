import Auth from '../../Api/Auth';

export type RequireSessionProps = {
    children: JSX.Element
};

export default function RequireSession (props: RequireSessionProps): JSX.Element | null {
    if (!Auth.isLoggedIn()) {
        return null;
    }

    return props.children;
}
