import { Component, Inject, Injectable} from "@angular/core";
import { Router} from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { AppModule } from "../../app.browser.module";
import { AppConfigurationService } from "../services/app.configuration.service";
import { UserDetailService } from "../services/userdetail.service";
import { Config } from "../../interfaces/config";
import { UserDetails } from "../../interfaces/userdetails";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
@Component({
    providers: [AppConfigurationService]
})

export class AppComponent { 

    title = "Club Membership Home";
    configs: Config;
    userdetails: UserDetails;
    iisfolder: string;
    environment: string;
    isadminuser: boolean;
    isguestuser: boolean;
    //result: any;

    constructor(public router: Router,
        public authService: AuthService,
        public configSettingsService: AppConfigurationService,
        public userDetailsService: UserDetailService) {

        this.configSettingsService.getSettings()
            .subscribe(
                configs => {
                    this.configs = configs;
                    this.iisfolder = this.configs.IISFolder;
                    this.environment = this.configs.Environment;
                    //console.log("getAppBase() - configs: " + JSON.stringify(this.configs));
                    //console.log("getAppBase() - IISFolder: " + this.configs.IISFolder);
                    //console.log("getAppBase() - IISFolder2: " + this.configs['IISFolder']);
                    console.log("getAppBase() - environment: " + this.environment);
                    console.log("getAppBase() - iisfolder: " + this.iisfolder);
                }
        );

        this.refreshUserDetails();

    }

    refreshUserDetails() {
        this.userDetailsService.getUserDetails()
            .subscribe(
                userdetails => {
                    this.userdetails = userdetails;
                    this.isadminuser = this.userdetails.InAdminRole;
                    this.isguestuser = this.userdetails.InGuestRole;
                    //console.log("getAppBase() - configs: " + JSON.stringify(this.configs));
                    //console.log("getAppBase() - IISFolder: " + this.configs.IISFolder);
                    //console.log("getAppBase() - IISFolder2: " + this.configs['IISFolder']);
                    console.log("getUserDetails() - isadminuser: " + this.isadminuser);
                    console.log("getUserDetails() - isguestuser: " + this.isguestuser);
                }
            );
    }

    logout(): boolean {
        //var result: any;
        // logs out the user, then redirects him to Welcome View.
        this.authService.logout().
            subscribe((result:any) => {
                console.log("app.logout() - result: " + JSON.stringify(result));

                    console.log("app.logout(): successfully called HTTP POST..");
                    this.authService.setAuth(null);

                if (result == true) {
                    this.router.navigate([""]);
                }
            },
            (error: any) => console.log(error)
        );
        return false;
    }

    getAppBase() {
        if (this.environment == "DEV") {
            return "";
        }
        return this.iisfolder;
    }

    //isUserInAdminRole(): any {
    //    console.log("isUserInAdminRole(): starting checking Admin role ");
    //    return this.isadminuser;
    //}

    //isUserInGuestRole(): any {
    //    console.log("isUserInGuestRole(): checking Guest role ");
    //    return this.isguestuser;
    //}

    isActive(data: any[]): boolean {
        return this.router.isActive(
            this.router.createUrlTree(data),
            true);
    }
}
