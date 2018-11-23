import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {MemberAddress} from "../../interfaces/memberaddress";
import {AuthHttp} from "../auth/auth.http";

@Injectable()
export class MemberAddressService {
    constructor(private http: AuthHttp) { }

    private baseUrl = "api/MemberAddressData/";  // web api URL

    // calls the [GET] /api/MemberAddressData/List/{n} Web API method to retrieve member records.
    getList(num?: number) {
        var url = this.baseUrl + "List/";
        if (num != null) { url += num; }
        return this.http.get(url)
            //.map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: number) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + id;
        return this.http.get(url)
            //.map(res => <Member>res.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(memberaddress: MemberAddress) {
        var url = this.baseUrl;
        return this.http.post(url, JSON.stringify(memberaddress)) // this.getRequestOptions())
            //.map(response => <Member>response.json())
            .catch(this.handleError);
    }

    // calls the [PUT] /api/items/{id} Web API method to update an existing item.
    update(memberaddress: MemberAddress) {
        var url = this.baseUrl + memberaddress.ID;
        return this.http.put(url, memberaddress) //, this.getRequestOptions())
            .catch(this.handleError);
            //.subscribe(
            //    (data: any) => {}
            //)
            //.map(response => <Member>response.json())
            //.catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: number) {
        var url = this.baseUrl + id;
        return this.http.delete(url) //, new RequestOptions())
            .catch(this.handleError);
    }

    // returns a viable RequestOptions object to handle Json requests
    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error || "Server error");
    }
}
