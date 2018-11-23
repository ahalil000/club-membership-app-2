import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import { AboutComponent} from "../app/components/about/about.component";
import { HomeComponent } from "../app/components/home/home.component";
import { MemberDetailViewComponent } from "../app/components/member/member-detail-view.component";
import { MemberDetailEditComponent } from "../app/components/member/member-detail-edit.component";
import { MemberAddressViewComponent } from "../app/components/member/member-address-view.component";
import { MemberAddressEditComponent } from "../app/components/member/member-address-edit.component";
import { MemberViewComponent } from "../app/components/member/member-view.component";
import { MemberEditComponent } from "../app/components/member/member-edit.component";
import { LoginComponent } from "../app/components/login/login.component";
import { PageNotFoundComponent } from "../app/components/page/page-not-found.component";

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
        path: "member-edit/:id",
        component: MemberEditComponent
    },
    {
        path: "member-view/:id",
        component: MemberViewComponent
    },
    {
        path: "member-address-view/:id",
        component: MemberAddressViewComponent
    },
    {
        path: "member-address-edit/:id",
        component: MemberAddressEditComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
