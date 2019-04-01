import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
//import {Observable} from "rxjs/Observable";
import {Observable} from "rxjs";
import { AuthHttp } from "./auth.http";
import {User} from "./user";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { forEach } from "@angular/router/src/utils/collection";
import { empty } from "rxjs/observable/empty";

@Injectable()
export class AuthService {
    authKey = "auth";
    isadminuser: boolean;
    isguestuser: boolean;
    username: string;

    constructor(private http: AuthHttp) {
    }

    //constructor(private http: HttpClient) {
    //}

    // performs the login
    login(username: string, password: string): Observable<boolean> {
        var url = "api/Token/Auth/";
        //var url = "api/connect/token"; // works

        //const data = new FormData();

        //data.append("username", username);
        //data.append("password", password);
        //data.append("client_id", "MembershipList");
        //data.append("grant_type", "password"); // required when signing up with username/password
        //data.append("scope", "offline_access profile email"); // space-separated list of scopes for which the token is issued


        //var data2 = JSON.stringify({
        //    username: username,
        //    password: password,
        //    client_id: "MembershipList",
        //    // required when signing up with username/password
        //    grant_type: "password",
        //    // space-separated list of scopes for which the token is issued
        //    scope: "offline_access profile email"
        //});

        var data3 = {
            username: username,
            password: password,
            client_id: "MembershipList",
            // required when signing up with username/password
            grant_type: "password",
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };


        console.log("Calling auth()..");

        return this.http.post(url, data3)
            .map((res: any) => {
                console.log("Called auth(). Getting token..");
                if (res) {
                    console.log("(map)Valid response found!..");
                    if (res.token) {
                        console.log("(map)Access token found!..");
                    }
                }

                let token = res && res.token;
                // if the token is there, login has been successful
                if (token) {
                    // store username and jwt token
                    console.log("The following auth JSON object has been received:");
                    console.log(res);
                    this.setAuth(res);
                    // successful login
                    return true;
                }
                // failed login
                return Observable.throw('Unauthorized');
            })
            .catch(error => {
                return new Observable<any>(error);
            });
    }

    logout(): any {

        console.log("logout(): logging out current user..");

        return this.http.post(
            "api/AccountData/Logout",
            null)
            .catch((err:HttpErrorResponse) => {
                console.log("logout(): error calling HTTP POST..");
                console.log("logout(): err= " + JSON.stringify(err));
                return Observable.throw(err);
            });
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error || "Server error");
    }

    // Converts a Json object to urlencoded format
    toUrlEncodedString(data: any) {
        var body = "";
        for (var key in data) {
            if (body.length) {
                body += "&";
            }
            body += key + "=";
            body += encodeURIComponent(data[key]);
        }
        return body;
    }

    // Persist auth into localStorage or removes it if a NULL argument is given
    setAuth(auth: any): boolean {
        if (auth) {
            console.log("setAuth(): setting auth local storage..");
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        }
        else {
            console.log("setAuth(): removing auth local storage..");
            localStorage.removeItem(this.authKey);
        }
        return true;
    }

    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): any {
        var i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        }
        else {
            return null;
        }
    }

    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn(): boolean {
        return localStorage.getItem(this.authKey) != null;
    }

    get() {
        return this.http.get("api/AccountData")
            .map(response => <User>response); // .json());
    }

    setUserRoles(): any {

        console.log("getUserRoles(): getting user roles..");

        var url = "api/Token/GetRoles/";

        console.log("getUserRoles(): calling " + url + "..");

        this.http.get(url)
            .catch(error => {
                console.log("getUserRoles(): error calling " + url + "." + error);
                return new Observable<any>(error);
            })
            .subscribe((data: any) => {
                console.log("getUserRoles(): called " + url + ". Now sort roles..");
                if (data) {
                    console.log("getUserRoles(): roles=" + JSON.stringify(data));
                    console.log("getUserRoles(): role=" + data.roles);

                    var roleString: string = data.roles;
                    this.isadminuser = roleString.includes("Administrators");
                    this.isguestuser = roleString.includes("Guest");
                    this.username = data.userName;
                    console.log("getUserRoles(): username=" + this.username);
                    console.log("getUserRoles(): isadmin=" + this.isadminuser);
                    console.log("getUserRoles(): isguest=" + this.isguestuser);
                }
                else {
                    console.log("getUserRoles(): roles=EMPTY");
                }
            });
        return Observable.empty<Response>();
    }


    isAdminUser(): boolean {
        if (this.isadminuser == undefined) {
            this.setUserRoles();
        }
        return this.isadminuser;
    }

    isGuestUser(): boolean {
        if (this.isguestuser == undefined) {
            this.setUserRoles();
        }
        return this.isguestuser;
    }

    userName(): string {
        if (this.username == undefined) {
            this.setUserRoles();
        }
        return this.username;
    }

    add(user: User) {
        return this.http.post(
            "api/AccountData",
            JSON.stringify(user)
            //new RequestOptions({
            //    headers: new Headers({
            //        "Content-Type": "application/json"
            //    })
            //}))
            )
            .map(response => response); //.json());
    }

    update(user: User) {
        return this.http.put(
            "api/AccountData",
            JSON.stringify(user)
            //new RequestOptions({
            //    headers: new Headers({
            //        "Content-Type": "application/json"
            //    })
            //}))
            )
            .map(response => response); // .json());
    }
}
