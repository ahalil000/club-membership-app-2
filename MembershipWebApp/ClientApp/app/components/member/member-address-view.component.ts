import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MemberAddress } from "../../interfaces/memberaddress";
import { MemberAddressService } from "../services/memberaddress.service";
import { NgbModule, NgbTabset, NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "member-address-view",
    templateUrl: "./member-address-view.component.html",
    styles: []
})

export class MemberAddressViewComponent {
    item: MemberAddress;

    constructor(
        private authService: AuthService,
        private memberAddressService: MemberAddressService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        console.log("MemberAddressViewComponent instantiated with the following id : " + id);
        if (id) {
            this.memberAddressService.get(id).subscribe(
                (item: any) => this.item = item
            );
        }
        else if (id === 0) {
            console.log("id is 0: switching to edit mode...");
            this.router.navigate(["member-address-edit", 0]);
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    onItemMemberAddressEdit(memberaddress: MemberAddress) {
        console.log("Editing Member Address " + memberaddress.ID + " " + memberaddress.MemberID + "...");
        this.router.navigate(["member-address-edit", memberaddress.MemberID]);
        return false;
    }

    onItemMemberView(item: MemberAddress) {
        this.router.navigate(["member-view", item.MemberID]);
    }

    onBack() {
        this.router.navigate(['']);
    }
}
