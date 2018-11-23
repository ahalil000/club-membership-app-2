import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Member} from "./member";
import {MemberService} from "./member.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: "member-detail-edit",
    template: `
<div *ngIf="item">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Home
        </a>
    </h2>
    <div class="item-container">
        <ul class="nav nav-tabs">
            <li role="presentation" class="active">
                <a href="javascript:void(0)">Edit</a>
            </li>
            <li role="presentation" *ngIf="item.Id != 0">
                <a href="javascript:void(0)" (click)="onItemDetailView(item)">View</a>
            </li>
        </ul>
        <div class="panel panel-default">
            <div class="panel-body">
                <form class="item-detail-edit" #thisForm="ngForm">
                    <h3>
                        Edit Member Details
                    </h3>
                    <div class="form-group">
                        <label for="input-firstname">First Name</label>
                        <input id="input-firstname" name="input-firstname" type="text" class="form-control" [(ngModel)]="item.FirstName" placeholder="Insert the first name..." required />
                    </div>
                    <div class="form-group">
                        <label for="input-lastname">Last Name</label>
                        <input id="input-lastname" name="input-lastname" type="text" class="form-control" [(ngModel)]="item.LastName" placeholder="Insert the last name..." required />
                    </div>
                    <div class="form-group">
                        <label for="input-emailaddress">Email Address</label>
                        <input id="input-emailaddress" name="input-emailaddress" type="text" class="form-control" [(ngModel)]="item.EmailAddress" placeholder="Insert the email address..." required />
                    </div>
                    <div class="form-group">
                        <label for="input-contactnumber">Contact Number</label>
                        <input id="input-contactnumber" name="input-contactnumber" type="text" class="form-control" [(ngModel)]="item.ContactNumber" placeholder="Insert the contact number..." required />
                    </div>
                    <div class="form-group">
                        <label for="input-dateofbirth">Date of Birth</label>
                        <input id="input-dateofbirth" name="input-dateofbirth" type="text" ngbInputDatepicker class="form-control" [(ngModel)]="item.DateOfBirth" placeholder="Insert the date of birth..." required />
                    </div>
                    <div class="form-group">
                       <label for="input-testdate">Test Date</label>
                       <ngb-datepicker (select)="onDateSelect($event)"></ngb-datepicker>
                    </div>
                    <div class="form-group">
                        <label for="input-accountstatus">Account Status</label>
                        <input id="input-accountstatus" name="input-accountstatus" type="text" class="form-control" [(ngModel)]="item.AccountStatus" placeholder="Insert the account status..." required />
                    </div>

                    <div *ngIf="item.ID == 0" class="commands insert">
                        <input type="button" class="btn btn-primary" value="Save" (click)="onInsert(item)" />
                        <input type="button" class="btn btn-default" value="Cancel" (click)="onBack()" />
                    </div>
                    <div *ngIf="item.ID != 0" class="commands update">
                        <input type="button" class="btn btn-primary" value="Update" (click)="onUpdate(item)" />
                        <input type="button" class="btn btn-danger" value="Delete" (click)="onDelete(item)" />
                        <input type="button" class="btn btn-default" value="Cancel" (click)="onItemDetailView(item)" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    `,
    styles: []
})

export class MemberDetailEditComponent {
    item: Member;

    constructor(private memberService: MemberService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
      var id = +this.activatedRoute.snapshot.params["id"];
      console.log("MemberDetailEditComponent instantiated with the following id : " + id);
        if (id) {
            this.memberService.get(id).subscribe(
                item => this.item = item
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
        this.memberService.add(item).subscribe(
            (data) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been added.");
                this.router.navigate([""]);
            },
            (error) => console.log(error)
        );
    }

    onUpdate(item: Member) {
        this.memberService.update(item).subscribe(
            (data) => {
                this.item = data;
                console.log("Item " + this.item.ID + " has been updated.");
                this.router.navigate(["member-detail-view", this.item.ID]);
            },
            (error) => console.log(error)
        );
    }

    onDelete(item: Member) {
        var id = item.ID;
        this.memberService.delete(id).subscribe(
            (data) => {
                console.log("Item " + id + " has been deleted.");
                this.router.navigate([""]);
            },
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }

    onItemDetailView(item: Member) {
        this.router.navigate(["member-detail-view", item.ID]);
    }
}
