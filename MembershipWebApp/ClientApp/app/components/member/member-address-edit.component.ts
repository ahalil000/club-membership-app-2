import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {MemberAddress} from "../../interfaces/memberaddress";
import {MemberAddressService} from "../services/memberaddress.service";
import {NgbModule, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig, NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateCustomParserFormatter} from "../../custom/customdateformat";
import {MEMBERLEVELS} from "../../custom/memberlevels";
import {KeyValue} from "../../custom/keyvalue";

@Component({
    selector: "member-address-edit",
    templateUrl: "./member-address-edit.component.html",
    styles: [],
    providers: [
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
    ]
})

export class MemberAddressEditComponent {
    item: MemberAddress;
    memberlevels: KeyValue[] = MEMBERLEVELS;

    constructor(private memberAddressService: MemberAddressService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      var id = +this.activatedRoute.snapshot.params["id"];
      console.log("MemberAddressEditComponent instantiated with the following id : " + id);
        if (id) {
            this.memberAddressService.get(id).subscribe(
                (item: any) => this.item = item
            );
        }
        else if (id === 0) {
            console.log("id is 0: adding a new item...");
            this.item = new MemberAddress(0, 0, "New Value", "New Value", "New Value", "New Value", "New Value");
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    onInsert(item: MemberAddress) {
        this.memberAddressService.add(item).subscribe(
            (data: any) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been added.");
                this.router.navigate([""]);
            },
            (error: any) => console.log(error)
        );
    }

    onUpdate(item: MemberAddress) {
        this.memberAddressService.update(item).subscribe(
            (data: any) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been updated.");
                this.router.navigate(["member-address-view", this.item.MemberID]);
            },
            (error: any) => console.log(error)
        );
    }

    onDelete(item: MemberAddress) {
        var id = item.ID;
        this.memberAddressService.delete(id).subscribe(
            (data: any) => {
                console.log("Item " + id + " has been deleted.");
                this.router.navigate([""]);
            },
            (error: any) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }

    onItemMemberAddressView(item: MemberAddress) {
        this.router.navigate(["member-address-view", item.MemberID]);
    }
}
