import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Member} from "./member";
import {MemberService} from "./member.service";

@Component({
    selector: "item-list",
  template: `
    <div class="item-container">
        <div class="panel panel-default">
          <table class="table table-hover">
          <tr>
          <th class="item-list-header" *ngFor="let col of columns" >
          {{ col }}
          </th>
          </tr>
          <tr *ngFor="let item of items" (click)="onSelect(item)" >
          <td class="item-list-cell" *ngFor="let col of columns" >
          {{ item[col] }}
          </td>
          </tr>
          </table>
      </div>
  </div>`,
    styles: [`
        ul.items li { 
            cursor: pointer;
        }
        ul.items li.selected { 
            background-color: #dddddd; 
        }
    `]
})

export class MemberListComponent implements OnInit {
    @Input() class: string;
    title: string;
    selectedItem: Member;
    items: Member[];
    errorMessage: string;
    columns: string[];

    constructor(private memberService: MemberService, private router: Router) { }

    ngOnInit() {
        console.log("MemberListComponent instantiated with the following type: " + this.class);
        var s = null;
        switch (this.class) {
            case "current":
            default:
                this.title = "Member List";
                s = this.memberService.getList();
                break;
        }
        s.subscribe(
            items => this.items = items,
            error => this.errorMessage = <any>error
        );
        this.columns = this.memberService.getColumns();
    }

    onSelect(item: Member) {
        this.selectedItem = item;
        console.log("Member " + this.selectedItem.ID + " has been clicked: loading item viewer...");
        this.router.navigate(["member-detail-view", this.selectedItem.ID]);
    }
}
