import Auth from '../../Api/Auth';

export type RequireSessionProps = {
    children: JSX.Element
};

export default function RequireAdmin (props: RequireSessionProps): JSX.Element | null {
    if (!Auth.isLoggedIn() || !Auth.getCurrentUser().isAdmin) {
        return null;
    }

    return props.children;
}
