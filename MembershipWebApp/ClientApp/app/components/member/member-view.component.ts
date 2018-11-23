import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { Member } from "../../interfaces/member";
import { MemberService } from "../services/member.service";
import { NgbModule, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { AuthService} from "../auth/auth.service";

@Component({
    selector: "member-view",
    templateUrl: "./member-view.component.html",
    styles: []
})

export class MemberViewComponent {
    item: Member;

    constructor(
        private authService: AuthService,
        private memberService: MemberService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

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
      //this.columns = this.memberService.getColumns();
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
