import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {MemberDetails} from "../../interfaces/memberdetails";
import {MemberDetailsService} from "../services/memberdetails.service";
import {NgbModule, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig, NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateCustomParserFormatter} from "../../custom/customdateformat";
import {MEMBERLEVELS} from "../../custom/memberlevels";
import {KeyValue} from "../../custom/keyvalue";

@Component({
    selector: "member-detail-edit",
    templateUrl: "./member-detail-edit.component.html",
    styles: [],
    providers: [
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
    ]
})

export class MemberDetailEditComponent {
    item: MemberDetails;
    memberlevels: KeyValue[] = MEMBERLEVELS;

    constructor(private memberDetailsService: MemberDetailsService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      var id = +this.activatedRoute.snapshot.params["id"];
      console.log("MemberDetailEditComponent instantiated with the following id : " + id);
        if (id) {
            this.memberDetailsService.get(id).subscribe(
                (item: any) => this.item = item
            );
        }
        else if (id === 0) {
            console.log("id is 0: adding a new item...");
            this.item = new MemberDetails(0, 0, false, "New Value", new Date(), "New Value", 0, new Date(), false, null);
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    onInsert(item: MemberDetails) {
        this.memberDetailsService.add(item).subscribe(
            (data: any) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been added.");
                this.router.navigate([""]);
            },
            (error: any) => console.log(error)
        );
    }

    onUpdate(item: MemberDetails) {
        // convert DateOfBirth field to dd/mm/YYYY format
        var dt: Date;
        var year: number;
        var month: number;
        var day: number;
        var dtStr: string = "";
        // if not a date, then it is a ngbdate structure.
        if (item.DateJoined.toString().search("-") == -1) {
            dtStr = JSON.stringify(item.DateJoined);
            var obj = JSON.parse(dtStr);           
            year = obj.year;
            month = obj.month-1;
            day = obj.day;
            item.DateJoined = new Date(year,month,day);
        }

        dtStr = "";
        // if not a date, then it is a ngbdate structure.
        if (item.RenewalReminderDate.toString().search("-") == -1) {
            dtStr = JSON.stringify(item.RenewalReminderDate);
            var obj = JSON.parse(dtStr);
            year = obj.year;
            month = obj.month - 1;
            day = obj.day;
            item.RenewalReminderDate = new Date(year, month, day);
        }

        this.memberDetailsService.update(item).subscribe(
            (data: any) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been updated.");
                this.router.navigate(["member-view", this.item.MemberID]);
            },
            (error: any) => console.log(error)
        );
    }

    onDelete(item: MemberDetails) {
        var id = item.ID;
        this.memberDetailsService.delete(id).subscribe(
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

    onItemMemberDetailView(item: MemberDetails) {
        this.router.navigate(["member-detail-view", item.MemberID]);
    }
}
