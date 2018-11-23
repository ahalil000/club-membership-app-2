import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Member} from "../../interfaces/member";
import {MemberService} from "../services/member.service";
import {NgbModule, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateCustomParserFormatter} from "../../custom/customdateformat";
import { DropdownActiveStatus } from "../../custom/dropdown-select.component";
//import { NgbDateStructAdapter } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-adapter";
import {ACTIVESTATUS} from '../../custom/statuslist';
import {KeyValue} from "../../custom/keyvalue";

@Component({
    selector: "member-edit",
    templateUrl: "./member-edit.component.html",
    styles: [],
    providers: [
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
    ]
})

export class MemberEditComponent {
    item: Member;
    statuses: KeyValue[] = ACTIVESTATUS;

    constructor(private memberService: MemberService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      var id = +this.activatedRoute.snapshot.params["id"];
      console.log("MemberEditComponent instantiated with the following id : " + id);
        if (id) {
            this.memberService.get(id).subscribe(
                (item: any) => this.item = item
            );
        }
        else if (id === 0) {
            console.log("id is 0: adding a new item...");
          this.item = new Member(0, "New Value", "New Value", "New Value", "New Value", new Date(), "New Value");
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    onInsert(item: Member) {
        // convert DateOfBirth field to dd/mm/YYYY format
        var dt: Date;
        var year: number;
        var month: number;
        var day: number;
        var dtStr: string = "";
        // if not a date, then it is a ngbdate structure.
        if (item.DateOfBirth.toString().search("-") == -1) {
            dtStr = JSON.stringify(item.DateOfBirth);
            var obj = JSON.parse(dtStr);
            year = obj.year;
            month = obj.month - 1;
            day = obj.day;
            item.DateOfBirth = new Date(year, month, day);
        }

        this.memberService.add(item).subscribe(
            (data: any) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been added.");
                this.router.navigate([""]);
            },
            (error: any) => console.log(error)
        );
    }

    onUpdate(item: Member) {
        // convert DateOfBirth field to dd/mm/YYYY format
        var dt: Date;
        var year: number;
        var month: number;
        var day: number;
        var dtStr: string = "";
        // if not a date, then it is a ngbdate structure.
        if (item.DateOfBirth.toString().search("-") == -1) {
            dtStr = JSON.stringify(item.DateOfBirth);
            var obj = JSON.parse(dtStr);           
            year = obj.year;
            month = obj.month-1;
            day = obj.day;
            item.DateOfBirth = new Date(year,month,day);
        }

        this.memberService.update(item).subscribe(
            (data: any) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been updated.");
                this.router.navigate(["member-view", this.item.ID]);
            },
            (error: any) => console.log(error)
        );
    }

    onDelete(item: Member) {
        var id = item.ID;
        this.memberService.delete(id).subscribe(
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

    onItemDetailView(item: Member) {
        this.router.navigate(["member-view", item.ID]);
    }
}
