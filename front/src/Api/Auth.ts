import Bridge from './Bridge';
import { ApiEndpoint } from './ApiUrls';
import UserModel from '../Model/User/UserModel';

class Auth {
    private user: UserModel | null = null;

    public login (name: string, password: string): Promise<Object | null> {
        const requestData: Object = {
            name,
            password
        };

        return Bridge.postData(ApiEndpoint.login, requestData)
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`[Auth] Login failed with message ${response.message}`);
                }

                this.user = UserModel.fromData(response.data) as UserModel;

                // eslint-disable-next-line no-console
                console.log(`[Auth/Shallow] Logged in as ${this.user.id}`);

                return response;
            });
    }

    public logout (): Promise<Object | null> {
        return Bridge.postData(ApiEndpoint.logout, [])
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`[Auth] Logout failed with message ${response.message}`);
                }

                this.user = null;

                // eslint-disable-next-line no-console
                console.log('[Auth/Shallow] Logged out');

                return response;
            })
            .catch(() => {
                this.user = null;

                // eslint-disable-next-line no-console
                console.log('[Auth] Cleared local auth data');
            });
    }

    getCurrentUser (): UserModel {
        if (this.user === null) {
            throw new Error('[Auth] Can\'t access user data while not logged in.');
        }

        return this.user;
    }

    isLoggedIn (): boolean {
        return this.user !== null;
    }
}

const auth: Auth = new Auth();
export default auth as Auth;
