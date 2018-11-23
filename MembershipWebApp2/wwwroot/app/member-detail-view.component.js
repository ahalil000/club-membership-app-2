"use strict";var __decorate=this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)},core_1=require("@angular/core"),router_1=require("@angular/router"),auth_service_1=require("./auth.service"),member_service_1=require("./member.service"),MemberDetailViewComponent=function(){function MemberDetailViewComponent(authService,memberService,router,activatedRoute){this.authService=authService,this.memberService=memberService,this.router=router,this.activatedRoute=activatedRoute}return MemberDetailViewComponent.prototype.ngOnInit=function(){var _this=this,id=+this.activatedRoute.snapshot.params.id;console.log("MemberDetailViewComponent instantiated with the following id : "+id),id?this.memberService.get(id).subscribe(function(item){return _this.item=item}):0===id?(console.log("id is 0: switching to edit mode..."),this.router.navigate(["member-detail-edit",0])):(console.log("Invalid id: routing back to home..."),this.router.navigate([""]))},MemberDetailViewComponent.prototype.onItemDetailEdit=function(member){return console.log("Editing Member "+member.FirstName+" "+member.LastName+"..."),this.router.navigate(["member-detail-edit",member.ID]),!1},MemberDetailViewComponent.prototype.onBack=function(){this.router.navigate([""])},MemberDetailViewComponent=__decorate([core_1.Component({selector:"member-detail-view",template:'\n<div *ngIf="item">\n    <h2>\n        <a href="javascript:void(0)" (click)="onBack()">&laquo; Back to Home</a>\n    </h2>\n    <h3>\n        View Member Details\n    </h3>\n    <div class="item-container">\n        <ul class="nav nav-tabs">\n            <li role="presentation">\n                <a href="javascript:void(0)" (click)="onItemDetailEdit(item)">Edit</a>\n            </li>\n            <li role="presentation" class="active">\n                <a href="javascript:void(0)">View</a>\n            </li>\n        </ul>\n        <div class="panel panel-default">\n            <div class="panel-body">\n                <div class="item-image-panel">\n                    <img src="/img/item-image-sample.png" alt="{{item.Title}}" />\n                    <div class="caption">Sample image with caption.</div>\n                </div>\n\n                <form class="item-detail-edit" #thisForm="ngForm">\n                    <div class="form-group">\n                        <label for="input-description">First Name</label>\n                        {{item.FirstName}}\n                    </div>\n                    <div class="form-group">\n                        <label for="input-description">Last Name</label>\n                        {{item.LastName}}\n                    </div>\n                    <div class="form-group">\n                        <label for="input-description">Email Address</label>\n                        {{item.EmailAddress}}\n                    </div>\n                    <div class="form-group">\n                        <label for="input-description">Contact Number</label>\n                        {{item.ContactNumber}}\n                    </div>\n                    <div class="form-group">\n                        <label for="input-description">Date of Birth</label>\n                        {{item.DateOfBirth}}\n                    </div>\n                    <div class="form-group">\n                        <label for="input-description">Account Status</label>\n                        {{item.AccountStatus}}\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n    ',styles:[]}),__metadata("design:paramtypes",[auth_service_1.AuthService,member_service_1.MemberService,router_1.Router,router_1.ActivatedRoute])],MemberDetailViewComponent)}();exports.MemberDetailViewComponent=MemberDetailViewComponent;
//# sourceMappingURL=member-detail-view.component.js.map
