"use strict";var router_1=require("@angular/router"),about_component_1=require("./about.component"),home_component_1=require("./home.component"),member_detail_view_component_1=require("./member-detail-view.component"),member_detail_edit_component_1=require("./member-detail-edit.component"),login_component_1=require("./login.component"),page_not_found_component_1=require("./page-not-found.component"),appRoutes=[{path:"",component:home_component_1.HomeComponent},{path:"home",redirectTo:""},{path:"about",component:about_component_1.AboutComponent},{path:"login",component:login_component_1.LoginComponent},{path:"member-detail-edit/:id",component:member_detail_edit_component_1.MemberDetailEditComponent},{path:"member-detail-view/:id",component:member_detail_view_component_1.MemberDetailViewComponent},{path:"**",component:page_not_found_component_1.PageNotFoundComponent}];exports.AppRoutingProviders=[],exports.AppRouting=router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map