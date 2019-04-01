import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
//import "rxjs";
//import "rxjs-compat";
import { NgbModule, NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared,
        NgbModule.forRoot()
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: APP_BASE_HREF, useValue: '/' + (window.location.pathname.split('/')[1] || '') }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    console.log("AppModule.getBaseUrl:" + document.getElementsByTagName('base')[0].href);
    return document.getElementsByTagName('base')[0].href;
}

export function getAppBaseHref() {
    console.log("AppModule.getAppBaseHref:" + '/' + (window.location.pathname.split('/')[1] || ''));
    return '/' + (window.location.pathname.split('/')[1] || '');
}

