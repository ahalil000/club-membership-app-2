import { Component, OnInit, Inject, Injectable} from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import { MemberDetails } from "../../interfaces/memberdetails";
import { MemberDetailsService } from "../services/memberdetails.service";
import { NgbModule, NgbTabset, NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService} from "../auth/auth.service";
import { AppConfigurationService } from "../services/app.configuration.service";
import { Config } from "../../interfaces/config";

@Component({
    selector: "member-detail-view",
    templateUrl: "./member-detail-view.component.html",
    styles: []
})

@Injectable()
@Component({
    providers: [AppConfigurationService]
})

export class MemberDetailViewComponent {
    item: MemberDetails;
    configs: Config;
    iisfolder: string;
    environment: string;

    constructor(
        private authService: AuthService,
        private configSettingsService: AppConfigurationService,
        private memberDetailService: MemberDetailsService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.configSettingsService.getSettings()
            .subscribe(
                configs => {
                    this.configs = configs;
                    this.iisfolder = this.configs.IISFolder;
                    this.environment = this.configs.Environment;
                    console.log("getAppBase() - environment: " + this.environment);
                    console.log("getAppBase() - iisfolder: " + this.iisfolder);
                }
            );
    }

    ngOnInit()
    {
        var id = +this.activatedRoute.snapshot.params["id"];
        console.log("MemberDetailViewComponent instantiated with the following id : " + id);
        if (id) {
            this.memberDetailService.get(id).subscribe(
                (item: any) => this.item = item
            );
        }
        else if (id === 0) {
            console.log("id is 0: switching to edit mode...");
            this.router.navigate(["member-detail-edit", 0]);
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    getAppBase() {
        if (this.environment == "DEV") {
            return "";
        }
        return this.iisfolder;
    }

    onItemMemberDetailEdit(memberdetail: MemberDetails) {
        console.log("Editing Member Details " + memberdetail.ID + " " + memberdetail.MemberID + "...");
        console.log("MemberDetailViewComponent Selected Days : " + JSON.stringify(memberdetail.DaysOfWeekAttendSelected));
        this.router.navigate(["member-detail-edit", memberdetail.MemberID]);
        return false;
    }

    onItemMemberView(item: MemberDetails) {
        this.router.navigate(["member-view", item.MemberID]);
    }

    onBack() {
        this.router.navigate(['']);
    }
}
