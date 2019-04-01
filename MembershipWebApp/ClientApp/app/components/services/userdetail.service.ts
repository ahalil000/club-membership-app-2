import { Injectable } from "@angular/core";
import { ConfigSettings } from "./configsettings";
import { Http, Response } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { UserDetails } from "../../interfaces/userdetails";
import { AuthHttp } from "../auth/auth.http";

@Injectable()
export class UserDetailService {
    constructor(private http: AuthHttp) { }

    getUserDetails(): Observable<UserDetails> { //Observable<Config> {
        //console.log("getSettings() running..");

        return this.http.get("api/UserData/")
            //.map(this.extractData, 0)
            .catch(this.handleErrors);
    }

    private handleErrors(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}
