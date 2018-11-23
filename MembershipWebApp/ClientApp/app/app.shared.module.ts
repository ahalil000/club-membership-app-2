import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToasterModule, ToasterService } from 'angular5-toaster';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { MemberAddressViewComponent } from "./components/member/member-address-view.component";
import { MemberAddressEditComponent } from "./components/member/member-address-edit.component";
import { MemberDetailEditComponent } from "./components/member/member-detail-edit.component";
import { MemberDetailViewComponent } from "./components/member/member-detail-view.component";
import { MemberEditComponent } from "./components/member/member-edit.component";
import { MemberViewComponent } from "./components/member/member-view.component";
import { MemberListComponent } from "./components/member/member-list.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page/page-not-found.component";
import { AboutComponent } from "./components/about/about.component";
import { DropdownActiveStatus } from "./custom/dropdown-select.component";
import { AppRouting } from './app.routing';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MemberService } from "./components/services/member.service";
import { MemberDetailsService } from "./components/services/memberdetails.service";
import { MemberAddressService } from "./components/services/memberaddress.service";
import { AuthService } from "./components/auth/auth.service";
import { AuthHttp } from "./components/auth/auth.http";

import { NgbModule, NgbDateAdapter, NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        MemberDetailViewComponent,
        MemberDetailEditComponent,
        MemberAddressViewComponent,
        MemberAddressEditComponent,
        MemberViewComponent,
        MemberEditComponent,
        MemberListComponent,
        LoginComponent,
        PageNotFoundComponent,
        DropdownActiveStatus
    ],
    imports: [
        HttpModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        AppRouting,
        NgbModule.forRoot(),
        NgbButtonsModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
        MemberService,
        MemberDetailsService,
        MemberAddressService,
        AuthService,
        AuthHttp
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModuleShared {
}
