import Bridge from './Bridge';
import { ApiEndpoint } from './ApiUrls';
import UserModel from '../Model/UserModel';

class Auth {
    private ready: boolean = false;
    private user: UserModel | null = null;

    public restoreSession (): Promise<boolean> {
        return new Promise((resolve: Function) => {
            UserModel.getCurrent()
                .then((user: UserModel) => {
                    this.user = user;
                    this.ready = true;
                    resolve(true);
                })
                .catch(() => {
                    this.ready = true;
                    resolve(false);
                });
        });
    }

    public register (
        name: string,
        password: string,
        passwordConfirm: string,
        braceletId: string
    ): Promise<Object | null> {
        const requestData: Object = {
            name,
            password,
            password_confirm: passwordConfirm,
            bracelet_id: braceletId
        };

        return Bridge.postData(ApiEndpoint.register, requestData)
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`[Auth] Register failed with message ${response.message}`);
                }

                return response;
            });
    }

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
                this.ready = true;

                // eslint-disable-next-line no-console
                console.log(`[Auth] Logged in as ${this.user.id}`);

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
                this.ready = true;

                // eslint-disable-next-line no-console
                console.log('[Auth/Shallow] Logged out');

                return response;
            })
            .catch(() => {
                this.user = null;
                this.ready = true;

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

    isReady (): boolean {
        return this.ready;
    }

    isLoggedIn (): boolean {
        return this.user !== null;
    }
}

const auth: Auth = new Auth();
export default auth as Auth;
