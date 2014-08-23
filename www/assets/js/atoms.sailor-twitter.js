/**
 * sailor-twitter - Twitter clon based on Sailor
 * @version v1.0.0
 * @link    http://tapquo.com
 * @author   ()
 * @license MIT
 */
(function(){"use strict";var __hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},__slice=[].slice,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};window.Atoms.Twitter=function(){return{Entity:{},Organism:{},Molecule:{},Dialog:{}}}(),window.debug=function(message){return"development"===Sailor.environment()?console.log("DEBUG :: "+message):void 0},Atoms.$(function(){return console.log("------------------------------------------------------------"),console.log("Atoms v"+Atoms.version+" (Sailor v"+Sailor.version+")         "),console.log("------------------------------------------------------------"),new Atoms.Twitter.Organism.Main({},"assets/scaffold/article.main.json"),new Atoms.Twitter.Organism.Home({},"assets/scaffold/article.home.json"),new Atoms.Twitter.Organism.Menu({},"assets/scaffold/aside.menu.json"),new Atoms.Twitter.Dialog.Tweet({},"assets/scaffold/dialog.tweet.json"),new Atoms.Twitter.Dialog.Info({},"assets/scaffold/dialog.info.json"),null==Sailor.store("user")?Atoms.Url.path("main/login"):(Sailor.start(),Atoms.Url.path(Atoms.Url.path().substr(1)||"home/main"))}),window.Sailor.registerEndpoint("login","user/login"),window.Sailor.registerEndpoint("signup","user"),window.Sailor.registerEndpoint("user","user"),window.Sailor.registerEndpoint("tweet","tweet","sort","id asc"),window.Sailor.start=function(){return Sailor.socket("GET",Sailor.user).then(function(error,users){var user,_i,_len,_results;if(!error){for(_results=[],_i=0,_len=users.length;_len>_i;_i++)user=users[_i],_results.push(__.Entity.User.create(user));return _results}}),Sailor.socket("GET",Sailor.tweet).then(function(error,tweets){var tweet,_i,_len,_results;if(!error){for(_results=[],_i=0,_len=tweets.length;_len>_i;_i++)tweet=tweets[_i],_results.push(__.Entity.Tweet.create(tweet));return _results}}),Sailor.on(Sailor.tweet,function(tweet){return"created"===tweet.verb?__.Entity.Tweet.create(tweet.data):void 0}),Sailor.on(Sailor.user,function(user){return"created"===user.verb?__.Entity.User.create(user.data):void 0})},__.Entity.Notification=function(_super){function Notification(){return Notification.__super__.constructor.apply(this,arguments)}return __extends(Notification,_super),Notification}(Atoms.Class.Entity),__.Entity.Tweet=function(_super){function Tweet(){return Tweet.__super__.constructor.apply(this,arguments)}return __extends(Tweet,_super),Tweet.fields("id","body","user","createdAt","updatedAt"),Tweet.prototype.parse=function(){return{text:this.user.email,info:this.timeFormat,description:this.body}},Tweet.prototype.timeFormat=function(){return window.moment(this.createdAt).fromNow(!0)},Tweet}(Atoms.Class.Entity),__.Entity.User=function(_super){function User(){return User.__super__.constructor.apply(this,arguments)}return __extends(User,_super),User.fields("email","username","admin","online","label","picture","phone","website","summary","tweets","updatedAt","createdAt","id"),User}(Atoms.Class.Entity),Atoms.Atom.Tweet=function(_super){function Tweet(){return Tweet.__super__.constructor.apply(this,arguments)}return __extends(Tweet,_super),Tweet["default"]={method:"prepend"},Tweet.template='<li {{#if.style}}class="{{style}}"{{/if.style}}>\n  {{#if.image}}<figure><span class="icon loading-d"></span></figure>{{/if.image}}\n  <div>\n    {{#if.info}}<span>{{info}}</span>{{/if.info}}\n    {{#if.text}}<strong>{{text}}</strong>{{/if.text}}\n    {{#if.description}}<small>{{description}}</small>{{/if.description}}\n  </div>\n</li>',Tweet}(Atoms.Atom.Li),Atoms.Twitter.Organism.Home=function(_super){function Home(){return Home.__super__.constructor.apply(this,arguments)}return __extends(Home,_super),Home.prototype.render=function(){return Home.__super__.render.apply(this,arguments)},Home.prototype.onTweetButton=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],__.Dialog.Tweet.show()},Home}(Atoms.Organism.Article),Atoms.Twitter.Organism.Main=function(_super){function Main(){return Main.__super__.constructor.apply(this,arguments)}return __extends(Main,_super),Main.prototype.onSailorSessionLogin=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],this._handler()},Main.prototype.onSailorSessionSignup=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],this._handler()},Main.prototype.onSailorSessionError=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],__.Dialog.Info.view(event.message)},Main.prototype._handler=function(){return Sailor.start(),Atoms.Url.path("home/main")},Main}(Atoms.Organism.Article),Atoms.Twitter.Organism.Menu=function(_super){function Menu(){return Menu.__super__.constructor.apply(this,arguments)}return __extends(Menu,_super),Menu.prototype.onHome=function(){return console.log("Home button ::")},Menu.prototype.onConfiguration=function(){return console.log("Home button ::")},Menu.prototype.onLogout=function(){return localStorage.removeItem("user"),Atoms.Url.path("main/login")},Menu}(Atoms.Organism.Aside),Atoms.Twitter.Dialog.Info=function(_super){function Info(){return Info.__super__.constructor.apply(this,arguments)}return __extends(Info,_super),Info.prototype.view=function(message){return this.section.text.el.html(message),this.show()},Info.prototype.onClose=function(){return this.hide(),!1},Info}(Atoms.Organism.Dialog),Atoms.Twitter.Dialog.Tweet=function(_super){function Tweet(){return this.onFormChange=__bind(this.onFormChange,this),Tweet.__super__.constructor.apply(this,arguments)}return __extends(Tweet,_super),Tweet.prototype.show=function(){return Tweet.__super__.show.apply(this,arguments),this.onFormChange()},Tweet.prototype.onClose=function(){return this.hide()},Tweet.prototype.onCancel=function(){return this.hide()},Tweet.prototype.onSend=function(){var form,tweet;return form=this.section.form,tweet={body:form.value().tweet,user:Sailor.store("user").id},Sailor.proxy("POST",Sailor.tweet,tweet).then(function(_this){return function(error,tweet){return error?_this.bubble("error",error):(_this.bubble("tweet",tweet),form.clean(),_this.hide())}}(this))},Tweet.prototype.onFormChange=function(){var form,method,sendButton;return form=this.section.form.value(),sendButton=this.section.form.children[1],method=form.tweet.length===this._MIN_LENGHT?"attr":"removeAttr",sendButton.el[method]("disabled",!0)},Tweet.prototype.onWrite=function(){return this.onFormChange()},Tweet.prototype._MIN_LENGHT=0,Tweet}(Atoms.Organism.Dialog),Atoms.Organism.SailorProfile=function(_super){function SailorProfile(){return this.onFormChange=__bind(this.onFormChange,this),SailorProfile.__super__.constructor.apply(this,arguments)}return __extends(SailorProfile,_super),SailorProfile["extends"]=!0,SailorProfile.events=["error","change","logout"],SailorProfile["default"]={children:[{"Atom.Figure":{id:"avatar",style:"big",events:["touch"]}},{"Atom.Heading":{id:"mail"}},{"Molecule.Form":{id:"form",style:"margin-all",events:["change","error","submit"],children:[{"Atom.Input":{id:"username",type:"text",name:"username",placeholder:"Username..."}},{"Atom.Label":{text:"Other Information"}},{"Atom.Input":{id:"name",type:"text",name:"name",placeholder:"Name..."}},{"Atom.Input":{id:"phone",type:"tel",name:"phone",placeholder:"Phone..."}},{"Atom.Input":{id:"site",type:"text",name:"site",placeholder:"Site..."}},{"Atom.Button":{text:"Update profile",style:"margin-top fluid theme"}},{"Atom.Button":{text:"Logout",style:"fluid",callbacks:["onLogout"]}},{"Atom.Input":{id:"file",type:"file",events:["change"],callbacks:["onAvatarChange"]}}]}}]},SailorProfile.prototype.file=void 0,SailorProfile.prototype.render=function(){return SailorProfile.__super__.render.apply(this,arguments),null==window.Appnima?alert("ERROR: App/nima library not exists."):void 0},SailorProfile.prototype.show=function(){var field,session,value,_ref;if(SailorProfile.__super__.show.apply(this,arguments),session=Appnima.User.session()){this.avatar.refresh({url:session.avatar}),this.mail.refresh({text:session.mail});for(field in session)value=session[field],value&&null!=(_ref=this.form[field])&&_ref.value(value);return this.onFormChange()}},SailorProfile.prototype.onFigureTouch=function(){return this.form.file.el.trigger("click"),!1},SailorProfile.prototype.onAvatarChange=function(){var file_url,reader,_ref;return event.stopPropagation(),event.preventDefault(),file_url=event.target.files[0],(null!=file_url&&null!=(_ref=file_url.type)?_ref.match(/image.*/):void 0)&&(reader=new FileReader,reader.onerror=function(event){return alert("Error code: "+event.target.error)},reader.onload=function(_this){return function(event){return _this.file=event.target.result,_this.avatar.refresh({url:_this.file}),_this.onFormSubmit()}}(this),reader.readAsDataURL(file_url)),!1},SailorProfile.prototype.onFormChange=function(){var child,form,method,_i,_len,_ref;for(form=this.form.value(),method=""===form.mail?"attr":"removeAttr",_ref=this.form.children,_i=0,_len=_ref.length;_len>_i;_i++)child=_ref[_i],child.value||child.el[method]("disabled",!0);return!1},SailorProfile.prototype.onFormError=function(){return this.bubble("error",form),!1},SailorProfile.prototype.onFormSubmit=function(event,form){var parameters,_ref;return null!=(null!=(_ref=window.Appnima)?_ref.key:void 0)&&(parameters=(null!=form?form.value():void 0)||{},null!=this.file&&(parameters.avatar=this.file),__.Dialog.Loading.show(),window.Appnima.User.update(parameters).then(function(_this){return function(error,result){return error?_this.bubble("error",error):_this.bubble("change",result),__.Dialog.Loading.hide()}}(this))),!1},SailorProfile.prototype.onLogout=function(){return Appnima.User.logout().then(function(_this){return function(error,result){return _this.bubble("logout",result)}}(this))},SailorProfile}(Atoms.Organism.Section),Atoms.Organism.SailorSession=function(_super){function SailorSession(){return this.onFormChange=__bind(this.onFormChange,this),SailorSession.__super__.constructor.apply(this,arguments)}return __extends(SailorSession,_super),SailorSession["extends"]=!0,SailorSession.events=["login","signup","error"],SailorSession["default"]={style:"centered",children:[{"Atom.Image":{url:"assets/images/logo.png"}},{"Molecule.Form":{id:"form",events:["change"],children:[{"Atom.Input":{id:"mail",type:"email",name:"mail",placeholder:"Email...",events:["keyup"],required:!0}},{"Atom.Input":{id:"password",type:"password",name:"password",placeholder:"Password...",events:["keyup"],required:!0}},{"Atom.Button":{text:"Login",path:"tweet/main",action:"login",style:"fluid theme",callbacks:["onSubmit"]}},{"Atom.Button":{text:"Signup",action:"signup",style:"fluid",callbacks:["onSubmit"]}}]}},{"Atom.Text":{value:"© All Rights Reserved"}}]},SailorSession.prototype.render=function(){return SailorSession.__super__.render.apply(this,arguments),this.onFormChange()},SailorSession.prototype.onFormChange=function(){var child,form,method,_i,_len,_ref;for(form=this.form.value(),method=form.mail.length===this._MIN_LENGHT||form.password.length===this._MIN_LENGHT?"attr":"removeAttr",_ref=this.form.children,_i=0,_len=_ref.length;_len>_i;_i++)child=_ref[_i],child.value||child.el[method]("disabled",!0);return!1},SailorSession.prototype.onSubmit=function(event,button){var action,user,values;return action=button.attributes.action,values=this.form.value(),user="signup"===action?{email:values.mail,password:values.password}:{identifier:values.mail,password:values.password},Sailor.proxy("POST",Sailor[action],user).then(function(_this){return function(error,user){return error?_this.bubble("error",error):(delete user.tweets,Sailor.store("user",user),_this.bubble(action,user))}}(this))},SailorSession.prototype._MIN_LENGHT=0,SailorSession}(Atoms.Organism.Section)}).call(this);