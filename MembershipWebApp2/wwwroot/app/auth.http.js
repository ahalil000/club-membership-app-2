"use strict";var __decorate=this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)},core_1=require("@angular/core"),http_1=require("@angular/http"),AuthHttp=function(){function AuthHttp(http){this.http=null,this.authKey="auth",this.http=http}return AuthHttp.prototype.get=function(url,opts){return void 0===opts&&(opts={}),this.configureAuth(opts),this.http.get(url,opts)},AuthHttp.prototype.post=function(url,data,opts){return void 0===opts&&(opts={}),this.configureAuth(opts),this.http.post(url,data,opts)},AuthHttp.prototype.put=function(url,data,opts){return void 0===opts&&(opts={}),this.configureAuth(opts),this.http.put(url,data,opts)},AuthHttp.prototype.delete=function(url,opts){return void 0===opts&&(opts={}),this.configureAuth(opts),this.http.delete(url,opts)},AuthHttp.prototype.configureAuth=function(opts){var i=localStorage.getItem(this.authKey);if(null!=i){var auth=JSON.parse(i);console.log(auth),null!=auth.access_token&&(null==opts.headers&&(opts.headers=new http_1.Headers),opts.headers.set("Authorization","Bearer "+auth.access_token))}},AuthHttp=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http])],AuthHttp)}();exports.AuthHttp=AuthHttp;
//# sourceMappingURL=auth.http.js.map
