import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { Subject } from "rxjs";

export class AuthService {

    authChange = new Subject<boolean>();

    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        console.log('Register Success');
        console.log(this.user);
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        // set auth state subject
        this.authChange.next(true);
         // checks auth state by subscribing to the subject
        this.authChange.subscribe((data) => {
            console.log(`User is authenticated: ${data}`)
        });
    }

    logout() {
        this.user = null;
        console.log(this.user);
        this.authChange.next(false);
        // checks auth state by subscribing to the subject
        this.authChange.subscribe((data) => {
            console.log(`User is authenticated: ${data}`)
        });
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }
}
