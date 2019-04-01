import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import { Member } from "../../interfaces/member";
import { MemberService } from "../services/member.service";
import { NgbModule, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { AuthService} from "../auth/auth.service";
import { AppConfigurationService } from "../services/app.configuration.service";
import { Config } from "../../interfaces/config";

@Component({
    selector: "member-view",
    templateUrl: "./member-view.component.html",
    styles: []
})

@Injectable()
@Component({
    providers: [AppConfigurationService]
})

export class MemberViewComponent {
    item: Member;
    configs: Config;
    iisfolder: string;
    environment: string;

    constructor(
        private authService: AuthService,
        private configSettingsService: AppConfigurationService,
        private memberService: MemberService,
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
        console.log("MemberViewComponent instantiated with the following id : " + id);
        if (id) {
            this.memberService.get(id).subscribe(
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

    onItemDetailEdit(member: Member) {
    console.log("Editing Member " + member.FirstName + " " + member.LastName + "...");
        this.router.navigate(["member-edit", member.ID]);
        return false;
    }

    onItemMemberDetailView(member: Member) {
        console.log("Viewing Member Details" + member.FirstName + " " + member.LastName + "...");
        this.router.navigate(["member-detail-view", member.ID]);
        return false;
    }

    onItemMemberAddressView(member: Member) {
        console.log("Viewing Member Address" + member.FirstName + " " + member.LastName + "...");
        this.router.navigate(["member-address-view", member.ID]);
        return false;
    }

    onBack() {
        this.router.navigate(['']);
    }
}
