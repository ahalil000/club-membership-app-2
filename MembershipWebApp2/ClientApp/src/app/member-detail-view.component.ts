import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Member} from "./member";
import {AuthService} from "./auth.service";
import {MemberService} from "./member.service";

@Component({
    selector: "member-detail-view",
    template: `
<div *ngIf="item">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">&laquo; Back to Home</a>
    </h2>
    <h3>
        View Member Details
    </h3>
    <div class="item-container">
        <ul class="nav nav-tabs">
            <li role="presentation">
                <a href="javascript:void(0)" (click)="onItemDetailEdit(item)">Edit</a>
            </li>
            <li role="presentation" class="active">
                <a href="javascript:void(0)">View</a>
            </li>
        </ul>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="item-image-panel">
                    <img src="/img/item-image-sample.png" alt="{{item.Title}}" />
                    <div class="caption">Sample image with caption.</div>
                </div>

                <form class="item-detail-edit" #thisForm="ngForm">
                    <div class="form-group">
                        <label for="input-description">First Name</label>
                        {{item.FirstName}}
                    </div>
                    <div class="form-group">
                        <label for="input-description">Last Name</label>
                        {{item.LastName}}
                    </div>
                    <div class="form-group">
                        <label for="input-description">Email Address</label>
                        {{item.EmailAddress}}
                    </div>
                    <div class="form-group">
                        <label for="input-description">Contact Number</label>
                        {{item.ContactNumber}}
                    </div>
                    <div class="form-group">
                        <label for="input-description">Date of Birth</label>
                        {{item.DateOfBirth}}
                    </div>
                    <div class="form-group">
                        <label for="input-description">Account Status</label>
                        {{item.AccountStatus}}
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    `,
    styles: []
})

export class MemberDetailViewComponent {
    item: Member;

    constructor(
        private authService: AuthService,
        private memberService: MemberService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }
        //private columns: string[];

    ngOnInit()
    {
        var id = +this.activatedRoute.snapshot.params["id"];
        console.log("MemberDetailViewComponent instantiated with the following id : " + id);
        if (id) {
            this.memberService.get(id).subscribe(
                item => this.item = item
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
        this.router.navigate(["member-detail-edit", member.ID]);
        return false;
    }

    onBack() {
        this.router.navigate(['']);
    }
}
