import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToasterModule, ToasterService } from 'angular5-toaster';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { NgbdCarouselNavigation } from './components/carousel/carousel-navigation';
import { NgbdCarouselBasic } from './components/carousel/carousel-basic';
import { ImageTransitionComponent } from './components/transition/image-transition';
import { HeaderComponent } from './components/header/header.component';
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
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { AuthHttp } from "./components/auth/auth.http";
import { NgbModule, NgbDateAdapter, NgbButtonsModule, NgbCarouselModule, NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { AppConfigurationService } from "./components/services/app.configuration.service";
import { UserDetailService } from "./components/services/userdetail.service";

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        NavMenuComponent,
        NgbdCarouselNavigation,
        NgbdCarouselBasic,
        ImageTransitionComponent,
        HeaderComponent,
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
        ReactiveFormsModule,
        AppRouting,
        NgbModule.forRoot(),
        NgbButtonsModule.forRoot(),
        NgbCarouselModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
        MemberService,
        MemberDetailsService,
        MemberAddressService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthHttp,
        AppConfigurationService,
        UserDetailService,
        NgbCarouselConfig
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModuleShared {
}
