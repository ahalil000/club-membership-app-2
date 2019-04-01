import { Injectable } from "@angular/core";
import { ConfigSettings } from "./configsettings";
import { Http, Response } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { Config } from "../../interfaces/config";
import { AuthHttp } from "../auth/auth.http";

@Injectable()
export class AppConfigurationService {
    constructor(private http: AuthHttp) { }

    //getSettings(): Observable<ConfigSettings> {
    //    return this.http.get("api/ConfigurationData/")
    //        .map(this.extractData)
    //        .catch(this.handleErrors);
    //}

    getSettings(): Observable<Config> { //Observable<Config> {
        //console.log("getSettings() running..");

        return this.http.get("api/ConfigurationData/")
            //.map(this.extractData, 0)
            .catch(this.handleErrors);
    }

    //private extractData(res: Response, index: number) {
    //private extractData(res: Object, index: number) {
    //    let body = JSON.stringify(res);
    //    //console.log("config response: " + body);
    //    return body || {};  
    //}

    private handleErrors(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}
