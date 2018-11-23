import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AboutComponent} from "./about.component";
import {HomeComponent} from "./home.component";
import {MemberDetailViewComponent} from "./member-detail-view.component";
import {MemberDetailEditComponent} from "./member-detail-edit.component";
import {LoginComponent} from "./login.component";
import {PageNotFoundComponent} from "./page-not-found.component";

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "member-detail-edit/:id",
        component: MemberDetailEditComponent
    },
    {
        path: "member-detail-view/:id",
        component: MemberDetailViewComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
