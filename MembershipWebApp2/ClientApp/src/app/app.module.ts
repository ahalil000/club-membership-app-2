///<reference path="../../typings/index.d.ts"/>
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule, NgbDatepicker} from "@ng-bootstrap/ng-bootstrap";
import "rxjs/Rx";

import {AboutComponent} from "./about.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home.component";
import {MemberDetailEditComponent} from "./member-detail-edit.component";
import {MemberDetailViewComponent} from "./member-detail-view.component";
import {MemberListComponent} from "./member-list.component";
import {LoginComponent} from "./login.component";
import {PageNotFoundComponent} from "./page-not-found.component";

import {AppRouting} from "./app.routing";
import {AuthHttp} from "./auth.http";
import {AuthService} from "./auth.service";
import {MemberService} from "./member.service";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AboutComponent,
        AppComponent,
        HomeComponent,
        MemberListComponent,
        MemberDetailEditComponent,
        MemberDetailViewComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule.forRoot(),
        AppRouting
    ],
    // providers
    providers: [
        AuthHttp,
        AuthService,
        MemberService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
