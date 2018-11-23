import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { MemberDetails } from "../../interfaces/memberdetails";
import { MemberDetailsService } from "../services/memberdetails.service";
import { NgbModule, NgbTabset, NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService} from "../auth/auth.service";

@Component({
    selector: "member-detail-view",
    templateUrl: "./member-detail-view.component.html",
    styles: []
})

export class MemberDetailViewComponent {
    item: MemberDetails;

    constructor(
        private authService: AuthService,
        private memberDetailService: MemberDetailsService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

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
