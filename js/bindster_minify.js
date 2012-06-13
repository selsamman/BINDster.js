function Bindster(a,b,c,d,e){document.body.style.visibility="visible";if(typeof window["bindster_instance_count"]=="undefined"){window["bindster_instance_count"]=0;window["bindster_instances"]=[]}window["bindster_instances"][window["bindster_instance_count"]]=this;this.instance="window['bindster_instances']["+window["bindster_instance_count"]+"]";window["bindster_instance_count"]++;this.data=a;this.data.controller=c;this.controller=c;this.data.c=c;if(c){c.model=a;c.m=a;c.bindster=this;c.clearErrors=function(a){this.bindster.clearErrors=true;this.bindster.render();this.bindster.clearErrors=true};c.isError=function(a){return this.bindster.isError(a)};c.hasErrors=function(a){return this.bindster.hasErrors};c.validate=function(a){this.bindster.validate=true;this.bindster.render()};c.setError=function(a,b,c){if(!c){c=b;b=a;a=this.model}this.bindster.setError(a,b,c)};c.clearError=function(a,b){this.bindster.clearError(a,b)};c.refresh=function(a){this.bindster.scheduleRender(a)};c.alert=function(a){var b=document.activeElement;alert(a);b.focus()};c.attr=function(a,b,c){this.bindster.setAttr(a,b,c)};c.rule=function(a,b){this.bindster.rules[a]=b}}this.data.none=null;this.next_id=1;this.iterate_id=1;this.wrappers={};this.mappers={};this.wraps={};this.cuts={};this.rules={};this.attr=[];this.functions=[];this.messages={};this.hasErrors=false;this.clearErrors=false;this.bindster_error_prefix="_field_error_";this.bindster_temp_prefix="_field_temp_";this.tagDelimiter=" %% ";this.node_id=1;this.cuts_id=1;this.set_focus=true;this.alertCount=0;this.attrToProp={"class":"className",maxlength:"maxLength","for":"htmlFor"};if(c&&typeof c.preRenderInitialize=="function")c.preRenderInitialize();if(!e)this.start(b,d);if(c&&typeof c.initialize=="function"){c.initialize();c.refresh()}}function BindsterControllerInterface(a,b,c){this.bindster=a;this.parameterString=c?c:null;this.node=b;this.evaluateParameters()}Bindster.prototype.alert=function(a){alert(a)};Bindster.prototype.start=function(a,b){this.renderNode=a;if(typeof this.renderNode=="string"){this.renderNode=document.getElementById(a);if(!this.renderNode)this.alert("cannot find view: "+a)}this.namespace_prefix=b?b:"b";this.add_events_mode=true;this.render();this.add_events_mode=false;if(this.bookmarks){this.current_location=document.location.href;if(document.location.hash)this.checkLocation(true);this.bookmark_interval=setInterval(this.instance+".checkLocation()",100);for(var c=0;c<this.bookmarks.length;++c)document.body.insertBefore(this.bookmarks[c].node,document.body.firstChild)}};Bindster.prototype.render=function(node,context,parent_fingerprint,wrapped_entity,mapAttrs,cloned,iterating_entity){var topLevel=typeof context=="undefined"?true:false;if(topLevel){this.errorCount=0;this.last_focus_priority=1}node=node?node:this.renderNode?this.renderNode:document.body.firstChild;context=context?context:"";parent_fingerprint=parent_fingerprint?parent_fingerprint:"";tag_string="";while(node){var do_render=true;var do_kill=false;var finger_print=parent_fingerprint;if(node.nodeType==8&&node.data.match(/#include.*virtual="(.*)"/))this.includeComment(RegExp.$1,node);if(node.nodeType==1&&(node==this.renderNode||typeof node.className!="string"||!node.className.match(/__bindster_view__/))){this.initNode(node);finger_print+="/";if(node.id)finger_print+="#"+node.id+";";var classes=node.className.split?node.className.split(" "):[];for(var ix=0;ix<classes.length;++ix)if(classes[ix])finger_print+="."+classes[ix]+";";finger_print+=" "+node.tagName+";";var tags=this.getTags(node,mapAttrs,finger_print);if(node.tagName.match(/:iterate/i)&&!this.getFirstChild(node)&&node.nextSibling&&(node.nextSibling.tagName=="TABLE"||node.nextSibling.tagName=="TR")){var nextSibling=node.nextSibling;node.parentNode.removeChild(node);node=nextSibling;var rowNode=nextSibling.tagName=="TR"?nextSibling:nextSibling.getElementsByTagName("TBODY")[0].getElementsByTagName("TR")[0];this.initNode(rowNode);this.initNode(node);rowNode.bindster.pushed_tags=tags}var wrap=node.getAttribute("bindster_wrap")?null:this.getWrap(finger_print);if(wrap){var nextSibling=node.nextSibling;var parentNode=node.parentNode;var wrapNode=wrap.outer.cloneNode(true);var insertNode=wrapNode.getElementsByTagName("INSERT")[0]||wrapNode.getElementsByTagName(this.namespace_prefix.toUpperCase()+":INSERT")[0]||wrapNode.getElementsByTagName("INS")[0];var className=node.className;node.setAttribute("bindster_wrap","wrapped");insertNode.parentNode.insertBefore(node,insertNode);insertNode.parentNode.removeChild(insertNode);node=parentNode.insertBefore(wrapNode,nextSibling);this.initNode(node);node.setAttribute("bindster_wrap","wrapper");if(className.length>0)node.className=node.className+(node.className.length>0?" ":"")+className+"_outer";this.restoreElement(node)}var tags=this.getTags(node,mapAttrs);if(tags.map&&!node.getAttribute("bindster_map")){var child=node.firstChild;var originalChild=child;if(child){var cut=document.createElement("DIV");while(child){var nextChild=child.nextSibling;cut.appendChild(child.parentNode.removeChild(child));child=nextChild}}this.insertElements(node,this.mappers[tags.map.name].cloneNode(true).firstChild);if(originalChild){var insertNode=node.getElementsByTagName("INSERT")[0]||node.getElementsByTagName(this.namespace_prefix.toUpperCase()+":INSERT")[0]||node.getElementsByTagName("INS")[0];if(insertNode){this.insertElementsBefore(insertNode.parentNode,cut.firstChild,insertNode);insertNode.parentNode.removeChild(insertNode)}else this.throwError(node,tags.map.name,"Must close explicitly with </"+node.tagName.toLowerCase()+">")}node.setAttribute("bindster_map","mapped")}if(tags.includeurl&&(!node.getAttribute("bindster_includeurl")||node.getAttribute("bindster_includeurl")!=tags.includeurl)){if(node.firstChild)this.throwError(node,tags.map.name,"Must close explicitly with </"+node.tagName.toLowerCase()+">");this.includeNode(tags.includeurl,node,tags.includeasync?true:false);node.setAttribute("bindster_includeurl",tags.includeurl)}if(tags.mappertag&&!this.mappers[tags.mappertag]){this.mappers[tags.mappertag]=node.cloneNode(true);tags={};do_render=false;do_kill=true}if(tags.wrappername&&!this.wrappers[tags.wrappername]){this.hideElement(node);this.wrappers[tags.wrappername]=node;tags={};do_render=false}var hide_show_node=node;if(node.getAttribute("bindster_wrap")=="wrapped")while(hide_show_node&&hide_show_node.getAttribute("bindster_wrap")!="wrapper")hide_show_node=hide_show_node.parentNode;if(tags.controller&&!node.bindster.controller){var controller_interface=new BindsterControllerInterface(this,node,tags.controllerdata);node.bindster.controller=eval("new "+tags.controller+"(controller_interface)");this.restoreElement(node)}if(tags.bind)var bind_data=this.get(tags.bind);var hidden=false;if(tags.test){if(!tags.hide||tags.hide=="remove"){if(this.eval(tags.test,null,null,node))this.insertElement(hide_show_node);else this.removeElement(hide_show_node)}else{if(this.eval(tags.test,null,null,node))this.restoreElement(hide_show_node);else{this.hideElement(hide_show_node,tags.hide);hidden=tags.hide=="display"}}}if(tags.onarrival){if(!this.bookmarks){this.bookmarks=[]}if(node.tagName=="A")this.bookmarks.push({node:node,hash:node.name&&node.name.length>0?node.name:node.id?node.id:"__domstr_start__",action:tags.onarrival})}var skip=false;if(hidden){if(cloned)node.bindster.cloned="yes"}else{if(tags.fill){var fill_data=this.eval(tags.fill,null,"using",node);var fill_using=this.eval(tags.using,null,"using",node);if(!fill_data)this.throwError(node,"fill","cannot get data to fill"+tags.fill);else{var do_sort=false;if(!(fill_data instanceof Array)){var fill_using=fill_data;fill_data=[];for(key in fill_using)fill_data.push(key);do_sort=true}var keys=[];var values={};for(var ix=0;ix<fill_data.length;++ix){var key=tags.fillkey?this.eval(tags.fillkey,{index:ix,value:fill_data[ix]},"fillkey",node):fill_data[ix];if(key!=null){var value=fill_using?fill_using[key]:fill_data[ix];value=tags.fillvalue?this.eval(tags.fillvalue,{key:key,value:value,index:ix},"fillvalue",node):value;if(value!=null){keys.push(key);values[key]=value}}}if(do_sort)keys.sort(function(a,b){return values[a]>values[b]});if(node.tagName=="SELECT"){do_render=false;var child=node.firstChild;var selected=0;var lastValue=null;for(var ix=0;ix<keys.length;++ix){var key=keys[ix];var value=values[key];if(value!=lastValue){var child=child?child:node.appendChild(document.createElement("OPTION"));child.value=key;child.text=value;child=child.nextSibling;lastValue=value}}if(child&&child==node.firstChild)this.hideElement(node);else while(child){var next_node=child.nextSibling;node.removeChild(child);child=next_node}}}processed_tags=true}var bypass=false;if(tags.iterateon&&!iterating_entity&&!skip){do_render=false;var fill_data=this.get(tags.iterateon);var nothing_rendered=true;var previousNode;if(fill_data){var iterate_id=tags.iterateid;node.setAttribute("bindster_iterateid",iterate_id);var counter=0;for(var ix=0;fill_data&&ix<fill_data.length;++ix){counter++;var new_context=tags.iterateindex||tags.iteratewith?context+((tags.iteratewith?this.instance+".set('"+tags.iteratewith+"', \""+this.instance+".data."+tags.iterateon+"["+ix+']");':"")+(tags.iterateindex?this.instance+".set('"+tags.iterateindex+"', "+ix+");":"")+(tags.iteratecounter?this.instance+".set('"+tags.iteratecounter+"', "+counter+");":"")):context;this.eval(new_context,null,"with, index or counter attributes of iterate",node);if(!tags.iteratefilter||this.eval(tags.iteratefilter,null,"filter attribute of iterate",node)){if(!nothing_rendered){if(!node.nextSibling||!node.nextSibling.getAttribute||!node.nextSibling.getAttribute("bindster_iterateid")||node.nextSibling.getAttribute("bindster_iterateid")!=iterate_id){var new_node=node.parentNode.insertBefore(node.cloneNode(true),node.nextSibling);this.cleanNode(new_node.firstChild);this.initNode(new_node,true);new_node.bindster.cloned="yes"}node=node.nextSibling;this.initNode(node)}nothing_rendered=false;this.restoreElement(node);node.bindster.inwaiting="no";this.render(node,new_context,finger_print,this.wrapStatus(node,wrapped_entity),tags.map?tags.map.attrs:mapAttrs,cloned||node.bindster.cloned=="yes"||node.bindster.inwaiting=="yes",true);bypass=true}}}else if(typeof fill_data=="undefined")this.throwError(node,"iterate","iterate-on value is undefined");if(nothing_rendered){this.hideElement(node,"display");node.bindster.inwaiting="yes";skip=true}var kill_node=node.nextSibling;while(kill_node&&kill_node.getAttribute&&kill_node.getAttribute("bindster_iterateid")&&kill_node.getAttribute("bindster_iterateid")==iterate_id){var next=kill_node.nextSibling;kill_node.parentNode.removeChild(kill_node);kill_node=next}tags.events={}}if(!bypass){if(tags.binderror&&!skip){if(this.clearErrors)this.clearBindError(tags.binderror,node);var bind_error=this.getBindErrorReference(tags.binderror);var bind_data=this.eval(bind_error,null,"binderror",node);if(typeof bind_data=="object"){bind_data=this.getBindErrorData(node,bind_data,tags.binderrordata);this.errorCount++}bind_data=bind_data?bind_data:"";var last_value=node.bindster.bind;if(last_value!=bind_data){node.innerHTML=bind_data;node.bindster.bind=bind_data}do_render=false}else if(tags.bind&&!skip){var bind_error=this.getBindErrorReference(tags.bind);var bind_error=bind_error?this.get(bind_error)?true:false:false;if(!bind_error){var bind_data=this.eval(tags.bind,null,"bind",node);if(typeof bind_data=="undefined")this.throwError(node,"bind",tags.bind+" returned undefined",node);if(tags.format)bind_data=this.evalWithValue(tags.format,bind_data,"format",node)}else this.errorCount++;var last_value=this.clearErrors?null:node.bindster.bind;if(node.bindster.controller){if(!bind_error&&(node.bindster.controller.needsRender&&node.bindster.controller.needsRender()||last_value!=bind_data)){node.bindster.controller.set(bind_data);node.bindster.bind=bind_data}}else if(node.tagName=="INPUT"&&(node.type.toLowerCase()=="text"||node.type.toLowerCase()=="number"||node.type.toLowerCase()=="input")){if(tags.onenter)this.addEvent(tags,"onenter",this.getBindAction(tags,"target.value")+tags.onenter);if(tags.when)this.addEvent(tags,"onkeyup",this.getBindAction(tags,"target.value"),true);this.addEvent(tags,node.type.toLowerCase()=="number"?"oninput":"onchange",this.getBindAction(tags,"target.value"));this.validateValue(tags,node.value,node);this.setFocus(tags,node);if(!bind_error&&last_value!=bind_data){node.value=bind_data;node.bindster.bind=bind_data}}else if(node.tagName=="TEXTAREA"){this.addEvent(tags,"onchange",this.getBindAction(tags,"target.value"));if(tags.when)this.addEvent(tags,"onkeyup",this.getBindAction(tags,"target.value"),true);this.validateValue(tags,node.value,node);this.setFocus(tags,node);if(!bind_error&&last_value!=bind_data){node.value=bind_data;node.bindster.bind=bind_data}}else if(node.tagName=="INPUT"&&node.type.toLowerCase()=="checkbox"){this.addEvent(tags,"onclick",tags.bind+"= (target.checked ? "+tags.truevalue+" : "+tags.falsevalue+")");this.validateValue(tags,node.checked);if(!bind_error&&last_value!=bind_data){node.bindster.bind=bind_data;if(node.checked&&bind_data==eval(tags.falsevalue))node.checked=false;if(!node.checked&&bind_data==eval(tags.truevalue))node.checked=true}}else if(node.tagName=="INPUT"&&node.type.toLowerCase()=="radio"){this.addEvent(tags,"onclick","if (target.checked) { "+tags.bind+" = "+tags.truevalue+"}");this.validateValue(tags,node.checked);if(!bind_error&&last_value!=bind_data){node.bindster.bind=bind_data;if(node.checked&&bind_data!=eval(tags.truevalue))node.checked=false;if(!node.checked&&bind_data==eval(tags.truevalue))node.checked=true}}else if(node.tagName=="SELECT"){this.addEvent(tags,"onchange",this.getBindAction(tags,"target.value"));do_render=false;this.validateValue(tags,node.value,node);var selected=false;if(!bind_error&&last_value!==bind_data){child=node.firstChild;while(child){if(child.value==bind_data){child.selected=true;selected=true}child=child.nextSibling}if(!selected){var child=node.appendChild(document.createElement("OPTION"));child.value=bind_data;child.text="Select ...";child.selected=true}else{child=node.firstChild;while(child){if(!child.selected&&child.text=="Select ...")node.removeChild(child);child=child.nextSibling}}}}else{if(!bind_error&&last_value!=bind_data){if(typeof node.value!="undefined")node.value=bind_data;else if(typeof node.textContent!="undefined")node.textContent=bind_data;else if(typeof node.innerText!="undefined")node.innerText=bind_data;node.bindster.bind=bind_data}do_render=false}}if(tags.widget&&!skip){if(typeof node.widget_initialized=="undefined"){tags.widget.obj.call(this,node,"initialize",tags.widget.parameters);node.widget_initialized=true}tags.widget.obj.call(this,node,"render",tags.widget.parameters)}if(tags.onpaint&&!skip){for(var ix=0;ix<tags.onpaint.length;++ix){var onpaint=tags.onpaint[ix];var changed=false;if(onpaint.depends.length>0)for(var jx=0;jx<onpaint.depends.length;++jx){var onpaint_data=this.get(onpaint.depends[jx].value);if(onpaint_data!=node.bindster["onpaint_"+onpaint.depends[jx].name]){changed=true;node.bindster["onpaint_"+onpaint.depends[jx].name]=String(onpaint_data)}}else changed=true;if(changed)this.eval(onpaint.action,{prop:this.getPropAttrs(node,tags.bind)},onpaint.tag?onpaint.tag:"onpaint",node)}}this.processEvents(node,tags,context,cloned||node.bindster.cloned=="yes");if(do_render&&node.firstChild&&!skip){this.render(node.firstChild,context,finger_print,this.wrapStatus(node,wrapped_entity),tags.map?tags.map.attrs:mapAttrs,cloned||node.bindster.cloned=="yes");node.bindster.cloned="no"}}}}var nextSibling=node.nextSibling;if(do_kill)node.parentNode.removeChild(node);node=nextSibling;if(iterating_entity)break}if(topLevel){this.hasErrors=this.errorCount>0;this.clearErrors=false;this.validate=false;this.set_focus=false;if(this.controller&&typeof this.controller.onrender=="function")this.controller.onrender.call(this.controller)}};Bindster.prototype.setAttr=function(a,b,c){var d="";if(typeof b=="object"&&!(b instanceof Array)){for(var e in b)b[e]=this.convertValue(b[e]);c=b}else c=this.convertValue(c);this.attr.push({name:b,value:c,regexp:this.createSelectorRegExp(a)})};Bindster.prototype.convertValue=function(a){if(a instanceof Array){var b="";for(var c=0;c<a.length;++c)b+=this.convertValue(a[c]);return b}else if(typeof a=="function"){this.functions.push(a);var d=this.controller?this.instance+".controller":"";return this.instance+".functions["+(this.functions.length-1)+"].call("+d+");"}else return a};Bindster.prototype.setFocus=function(a,b){if(!this.set_focus)return;var c=a.focus;if(c)this.last_focus_priority=c;if(a.bind&&this.get(this.getBindErrorReference(a.bind)))c=c?c+.1:this.last_focus_priority+.1;if(c){if(!document.activeElement)return;if(!b.getAttribute("bindster_focus")||b.getAttribute("bindster_focus")!=c)b.setAttribute("bindster_focus",c);var d=document.activeElement.getAttribute("bindster_focus");if(document.activeElement.tagName=="BODY"||c>d)b.focus()}};Bindster.prototype.isError=function(a){var a=this.getBindErrorReference(a);return typeof this.eval(a,null,"isError")!="undefined"};Bindster.prototype.validateValue=function(a,b,c){if(this.validate&&a.validate){this.validate_value=b;this.eval(this.getBindAction(a,"bindster.validate_value"),null,"validate",c)}};Bindster.prototype.setError=function(a,b,c){if(c instanceof Error){this.displayError(null,c);return}a[this.bindster_error_prefix+b]=c;this.hasErrors=true};Bindster.prototype.clearError=function(a,b){if(typeof a[this.bindster_error_prefix+b]!="undefined")delete a[this.bindster_error_prefix+b]};Bindster.prototype.getBindErrorData=function(a,b,c){var d={};for(var e in b){d[e]=b[e]}if(c){c=typeof c=="object"?c:this.eval("bindster_temp="+c,null,"binderrordata",a);for(var e in c){d[e]=c[e]}}if(d.message){if(this.messages[b.message]){expression=this.messages[b.message].replace(/{(.*?)}/g,function(a,b){b="("+b+")";return'" + '+b+' + "'});b=this.eval('"'+expression+'"',d,"binderror",a)}else b=b.message}else throw this.throwError(a,"binderror",b);return b};Bindster.prototype.getBindErrorReference=function(a){if(a.match(/[^0-9a-zA-Z_$.]/))return null;if(a.match(/(.*?)\.([^.]+)$/))return RegExp.$1+"."+this.bindster_error_prefix+RegExp.$2;else return"this.data."+this.bindster_error_prefix+a};Bindster.prototype.getBindTempReference=function(a){if(a.match(/(.*?)\.([^.]+)$/))return RegExp.$1+"."+this.bindster_error_prefix+RegExp.$2;else if(a.match(/\"\'/))return null;else return"this.data."+this.bindster_error_prefix+a};Bindster.prototype.clearBindError=function(a,b){var c=this.getBindErrorReference(a);if(c)this.eval("delete "+c,null,"clearing error",b);var c=this.getBindTempReference(a);if(c)this.eval("delete "+c,null,"clearing error",b)};Bindster.prototype.getBindAction=function(a,b){var c=this.getBindErrorReference(a.bind);var d=this.controller?"this.controller.value":"this.value";var e="try { "+d+" = "+b+";"+(a.parse?d+" = "+a.parse+"; ":"")+(a.validate?a.validate+"; ":"")+a.bind+" = "+d+";"+"if ("+c+") {delete "+c+"} "+(this.controller&&typeof this.controller.onchange=="function"?"this.controller.onchange();":"")+" } catch (e) {if(!e.constructor.toString().match(/Error/)){c.bindster.hasErrors = true;"+c+" = e} else {c.bindster.displayError(null, e, 'validation, parse or format', node)}; "+"}";return e};Bindster.prototype.getFirstChild=function(a){var b=a.firstChild;while(b&&b.nodeName=="#text")b=b.nextSibling;return b};Bindster.prototype.cleanNode=function(a){while(a){if(a.bindster)a.bindster=null;if(a.firstChild)this.cleanNode(a.firstChild);a=a.nextSibling}};Bindster.prototype.initNode=function(a,b){if(!a.bindster||b)a.bindster={id:this.next_id++}};Bindster.prototype.getWrap=function(a){for(var b in this.wraps){if(a.match(this.wraps[b].regexp))return this.wraps[b]}return null};Bindster.prototype.wrapStatus=function(a,b){if(a.getAttribute("bindster_wrap")=="wrapper")return true;if(a.getAttribute("bindster_wrap")=="wrapped")return false;return b};Bindster.prototype.addEvent=function(a,b,c,d){if(!a.events[b])a.events[b]=new Array;a.events[b].push({action:c,defer:d?true:false})};Bindster.prototype.processEvents=function(a,b,c,d){if(d){a.bindster.events="no"}a.bindster.context=c;c="eval(node.bindster.context);";if(a.bindster.events=="yes")return;var e=a.bindster.id;var f=0;for(event_name in b.events){++f;var g="";var h=false;var i=false;for(var j=b.events[event_name].length-1;j>=0;--j){var k=b.events[event_name][j].action.replace(/\'/g,"\\'");g+=this.instance+".eval('"+k+"',null,'"+event_name+"',node,ev);";if(b.events[event_name][j].defer)h=1e3;if(!k.match(/^addClass\(".*?"\)$/)&&!k.match(/^removeClass\(".*?"\)$/))i=true}var l=event_name=="onmouseover"||event_name=="onmouseout"?"var node = "+this.instance+".processMouse(ev,'"+e+"');":"var node = ev.target ? ev.target : ev.srcElement; ";var m=event_name=="onclick"||event_name=="onenter"?this.instance+".set_focus = true;":"";var n=i?this.instance+".scheduleRender("+h+");":"";var o=event_name=="onclick"&&a.tagName=="A"&&a.href&&a.href.match(/#/)>1?"true":"false";var o="return (ev && ev.srcElement && ev.srcElement.tagName && ev.srcElement.tagName == 'INPUT' ? true : "+o+");";var p=c+g+m+n;if(event_name=="onenter"){event_name="onkeydown";p="if (ev.keyCode == 13) {"+p+"}";o="return true"}var q=l+"if (node && node.bindster) { "+p+" }"+o;q="try{"+q+"}catch(e){"+this.instance+'.throwError(node, "'+event_name+'",e.message)}';a[event_name]=new Function("ev","ev = ev ? ev : event;"+q);a.bindster.mouse_state="unknown";a.bindster.events="yes"}a.bindster.event_count=f};Bindster.prototype.processMouse=function(a,b){var c=a.target?a.target:a.srcElement;if(!c.bindster)return false;var d=c.bindster.id;var e=c;while(e&&e.bindster&&e.bindster.id!=b)e=e.parentNode;if(a.type!="mouseover"&&a.type!="mouseout")return e;var f=a.relatedTarget?a.relatedTarget:a.type=="mouseover"?a.fromElement:a.toElement;var g=f;while(f&&f.nodeType==1)if(f.bindster&&f.bindster.id==b){return false}else{f=f.parentNode}var h=e.bindster.mouse_state;var i=a.type=="mouseover"?"over":"out";if(h==i)return false;e.bindster.mouse_state=i;return e};Bindster.prototype.scheduleRender=function(a,b,c,d){if(b){this.prerender_node=d;b=this.instance+".eval('"+b+"', null, '"+c+"', "+this.instance+".prerender_node);"+this.instance+".prerender_node = null;"}else b="";clearTimeout(this.timeout_token);a=a?a<100?100:a:0;var e="";for(var f=0;f<window["bindster_instance_count"];++f)e+="window['bindster_instances']["+f+"].render();";this.timeout_token=setTimeout(b+e,a)};Bindster.prototype.processRender=function(){this.pendingRender=false;this.timeout_token=null};Bindster.prototype.checkLocation=function(a){if(a||document.location.href!=this.current_location){this.current_location=document.location.href;var b=document.location.hash.replace(/#/,"");var b=b?b:"__domstr_start__";for(var c=0;c<this.bookmarks.length;++c)if(b==this.bookmarks[c].hash){this.eval(this.bookmarks[c].action,null,"onarrival for <a name='"+this.bookmarks[c].hash+"'>");this.scheduleRender()}}};Bindster.prototype.getPropAttrs=function(a,b){if(!b||b.match(/[^0-9a-zA-Z_$.]/))return{};if(b.match(/(.*?)\.([^.]+)$/)){var c=RegExp.$1;var d=RegExp.$2}else{var c="this.data";var d=b}var e=this.eval(c+"['__props__']",null,"bind",a);if(typeof e=="function")return this.eval(c+"['__props__']("+c+")",null,"bind",a)[d];else return{}};Bindster.prototype.processRules=function(a,b,c){if(b instanceof Array)for(var d=0;d<b.length;++d)this.processRules(a,b[d],c);else if(this.rules[b])for(attr in this.rules[b])if(!c[attr])c[attr]=this.convertValue(this.rules[b][attr])};Bindster.prototype.isOurNode=function(a){if(a.scopeName&&a.scopeName==this.namespace_prefix)return true;var b=a.tagName.toLowerCase();return b.substr(0,this.namespace_prefix.length+1).toLowerCase()==this.namespace_prefix+":"};Bindster.prototype.isOurAttr=function(a){return a.substr(0,this.namespace_prefix.length+1)==this.namespace_prefix+":"||a.substr(0,5)=="data-"};Bindster.prototype.getTags=function(node,mapAttrs,finger_print){if(node.bindster&&node.bindster.tags)return node.bindster.tags;var tags=node.bindster.pushed_tags?node.bindster.pushed_tags:{events:[]};var our_tag=this.isOurNode(node)?node.tagName.toLowerCase().replace(/^.*:/,""):"";var mapper=this.mappers[our_tag];var attrs={};for(var ix=0;ix<node.attributes.length;++ix){attrName=node.attributes[ix].name.toLowerCase();var attrValue=node.attributes[ix].value;if(mapAttrs){var newAttrValue=attrValue.replace(/__[^_]+__/g,function(a){var b=a.replace(/^__/,"").replace(/__$/,"");return mapAttrs[b]?mapAttrs[b]:a});if(newAttrValue!=attrValue){attrValue=newAttrValue;node.setAttribute(attrName,attrValue)}}if((our_tag.length>0||this.isOurAttr(attrName))&&!attrValue.match(/__[^_]+__/)){var attrName=attrName.replace(/^data-/,"").replace(/^.*:/,"").replace(/-/,"");if(our_tag.length==0&&attrName=="tag"){our_tag=attrValue;mapper=this.mappers[attrValue]}attrs[(mapper?"":our_tag)+attrName]=attrValue.replace(/^ +/,"").replace(/ +$/,"");if(attrName=="bind"){var pattrs=this.getPropAttrs(node,attrValue);for(attr in pattrs)if(attr.match(/validate|format|parse|rule/))attrs[attr]=attr=="rule"?pattrs[attr]:this.convertValue(pattrs[attr]);finger_print+="="+(attrValue.match(/(.*?)\.([^.]+)$/)?RegExp.$2:attrValue)+";"}}}for(var ix=0;ix<this.attr.length;++ix){var attr=this.attr[ix];if(finger_print.match(attr.regexp))if(typeof attr.name=="object")for(var key in attr.name)attrs[key]=attr.name[key];else attrs[attr.name]=attr.value}if(our_tag.length>0&&mapper){node.bindster.tags={map:{name:our_tag,attrs:attrs}};return node.bindster.tags}if(our_tag=="rule"){if(!attr["name"])this.throwError(node,attr,"missing name attribute on rule");else{rule=this.rules[attr]||{};for(attr in attrs)if(attr!="name")rule[attr]=this.convertValue(attrs[attr]);this.rules[attr]=rule}}if(attrs["rule"]){var name=attrs["rule"];this.processRules(node,name,attrs)}for(attr in attrs){var value=attrs[attr];switch(attr.toLowerCase().replace(/-/g,"")){case"rule":break;case"iterateon":tags.iterateid=node.getAttribute&&node.getAttribute("bindster_iterateid")?node.getAttribute("bindster_iterateid"):this.iterate_id++;case"iteratewith":case"iterateindex":case"iteratecounter":case"iteratefilter":case"fill":case"fillkey":case"fillvalue":case"using":case"bind":case"parse":case"format":case"truevalue":case"falsevalue":case"when":case"focus":case"binderror":case"binderrordata":case"validate":case"rule":case"mappertag":case"wrappername":case"controller":case"controllerdata":case"onarrival":case"onenter":case"includeurl":tags[attr]=value;break;case"hide":case"ifhide":if(value.match(/visibility|display|offscreen|remove/))tags["hide"]=value;else this.throwError(node,attr,"hide must be visibility, display, offscreen or remove");break;case"includeasync":if(value.match(/^yes|no$/i))tags["includeaysync"]=value=="yes";else this.throwError(node,attr,"include-async must be yes or no");break;case"showif":tags["test"]=value;tags["hide"]=tags["hide"]?tags["hide"]:"display";break;case"visibleif":tags["test"]=value;tags["hide"]="visibility";break;case"iftest":case"test":tags["test"]=value;break;case"messagevalue":if(attrs["messagename"])this.messages[attrs["messagename"]]=value;else this.throwError(node,attr,"missing name attribute");break;case"errortext":if(attrs["errorname"])this.error[attrs["errorname"]]=value;else this.throwError(node,attr,"missing name attribute");break;case"onpaint":if(value.match(/^(.*?) *{(.*)}$/)){var depends=[];var depends_raw=RegExp.$1.split(",");var action=RegExp.$2;for(var ix=0;ix<depends_raw.length;++ix)depends.push({name:depends_raw[ix].replace(/[^\w]/g,"_").replace(/ /g,""),value:depends_raw[ix].replace(/ /g,"")});if(!tags.onpaint)tags.onpaint=[];tags.onpaint.push({depends:depends,action:action})}else this.throwError(node,attr);break;tags[attr]=value;break;case"widget":if(value.match(/^(\S*) (.*)$/)){var function_obj=window["widget_"+RegExp.$1];if(!function_obj)this.alert(name+" widget not found - did you include widget_"+RegExp.$1+".js?");else tags["widget"]={parameters:RegExp.$2?eval("p = "+RegExp.$2):null,obj:function_obj}}else this.throwError(node,attr);break;case"wrapwith":var wrapper=value;var trigger=attrs["wrapselector"];var expression=this.createSelectorRegExp(trigger);this.wraps[trigger]={trigger:trigger,outer:this.wrappers[wrapper],regexp:expression};break;default:if(attr.match(/^(on\S*)$/))this.addEvent(tags,RegExp.$1,"{"+value+"}");else if(our_tag.length==0){if(!tags.onpaint)tags.onpaint=[];if(attr=="style"){var styles=value.split(";");for(var jx=0;jx<styles.length;++jx){if(styles[jx].length>0){var style_details=styles[jx].replace(/:/,"_::_").split("_::_");if(style_details.length!=2)this.throwError(node,"style","style attribute missing a colon in "+styles[jx]);var style_tag=style_details[0].replace(/ $/g,"").replace(/^ /g,"").replace(/(-[a-z])/g,function(a){return a.substr(1).toUpperCase()});tags.onpaint.push(this.getOnPaint("style."+style_tag,style_details[1].replace(/ $/g,"").replace(/^ /g,"")))}}}else tags.onpaint.push(this.getOnPaint(this.attrToProp[attr]||attr,value))}}}tags.canPrune=our_tag.length>0;node.bindster.tags=tags;return tags};Bindster.prototype.createSelectorRegExp=function(a){var b="";var c=a.split(",");for(var d=0;d<c.length;++d){var e=c[d];var f=e.replace(/^ */,"").split(" ");for(var g=0;g<f.length;++g){var a=f[g];if(a.substr(0,1)=="#"||a.substr(0,1)=="=")b+=a;else if(a.substr(0,1)==".")b+=a.replace(/\./,"\\.");else b+=" "+a.toUpperCase();if(g==f.length-1)b+=";[^/]*$";else b+=";.*?"}if(d<c.length-1)b+="|"}return b};Bindster.prototype.getOnPaint=function(a,b){var c=[];b=(b+"").replace(/{([^}]*)}/g,function(a,b){b="("+b+")";c.push({name:escape(b).replace(/[\%\*\@\-\+\.]/g,function(a){return a=="%"?"_pct_":a=="+"?"_plus_":a=="*"?"_star_":a=="@"?"_at_":a=="-"?"_minus":a=="."?"_dot_":a}),value:b});return'" + '+b+' + "'});return{depends:c,action:"target."+a+' = "'+b+'";',tag:a}};Bindster.prototype.getText=function(a){try{return a.innerText?a.innerText:a.textContent}catch(b){return false}};Bindster.prototype.evalWithValue=function(a,b,c,d,e){if(this.controller)this.controller.value=b;else window["bindster_value"]=b;return this.eval(a,{value:b},c,d,e)};Bindster.prototype.eval=function(js,data,error_message,node,ev){var srcElement=node;var target=node;try{if(this.controller&&data)with(this.data){with(this.controller){with(data){return eval(js)}}}else if(this.controller&&!data)with(this.data){with(this.controller){return eval(js)}}else if(!this.controller&&data)with(this.data){with(data){return eval(js)}}else with(this.data){return eval(js)}}catch(e){this.displayError(js,e,error_message,node);return""}};Bindster.prototype.displayError=function(a,b,c,d){message=b.message;if(b.lineNumber)message+="\n\n\rline: "+b.lineNumber;if(a)message+="\n\n\rscript: "+a;if(c)message+="\n\n\rprocessing: "+c;if(d&&d.outerHTML)message+="\n\n\rnear: "+d.outerHTML.substr(0,250);if(b.stack&&typeof b.stack=="string"){message+="\n\n";var e=b.stack.split("\n");for(var f=0;f<e.length;++f)if(!e[f].match(/bindster.*js/))message+=e[f]+"\n"}if(this.alertCount++<2)this.alert(message)};Bindster.prototype.throwError=function(a,b,c){var d=a&&a.outerHTML?a.outerHTML:"";c=c?" ("+c+")":"";if(this.alertCount++<2)this.alert("Error processing "+b+c+"\n\nin ...\n\n"+d.substr(0,200));throw"BINDSter Processing Error"};Bindster.prototype.get=function(element,withdata){try{if(this.controller)with(this.controller){with(withdata?withdata:this.data){return eval(element)}}else with(withdata?withdata:this.data){return eval(element)}}catch(e){return false}};Bindster.prototype.set=function(element,value){try{with(this.data){eval(this.instance+".data."+element+"="+value)}}catch(e){}};Bindster.prototype.removeElement=function(a){var b=a.firstChild;var c=a.getAttribute("bindster_cut_id");if(b){if(!c){var d=this.cuts_id++;this.cuts[d]=document.createElement("DIV");a.setAttribute("bindster_cut_id",d)}while(b){var e=b.nextSibling;if(!c)this.cuts[d].appendChild(a.removeChild(b));else a.removeChild(b);b=e}a.bindster.cloned="yes"}};Bindster.prototype.insertElement=function(a){if(!a.firstChild){var b=a.getAttribute("bindster_cut_id");if(!b)this.alert("internal errror on if statement");var c=this.cuts[b].firstChild;while(c){var d=c.nextSibling;a.appendChild(c.cloneNode(true));c=d}}};Bindster.prototype.insertElements=function(a,b){while(b){var c=b.nextSibling;a.insertBefore(b,null);b=c}};Bindster.prototype.insertElementsBefore=function(a,b,c){while(b){var d=b;b=b.nextSibling}var b=d;while(b){var e=b.previousSibling;c=a.insertBefore(b,c);b=e}};Bindster.prototype.hideElement=function(a,b){switch(b||"display"){case"visibility":a.style.visibility="hidden";break;case"display":if(!a.style.display||a.style.display!="none")a.setAttribute("style_display",a.style.display);a.style.display="none";break;case"offscreen":if(a.style.top!="-32767px")a.setAttribute("style_offscreen",a.style.position+","+a.style.top);a.style.position="absolute";a.style.top="-32767px";break}};Bindster.prototype.restoreElement=function(a){if(a.nodeType==1){if(a.style.visibility=="hidden"){a.style.visibility="visible"}if(a.style.display=="none"){var b=a.getAttribute("style_display");if(b!=null)a.style.display=b}if(a.style.top=="-32767px"){var b=a.getAttribute("style_offscreen");if(b!=null){var c=b.split(",");a.style.position=c[0].length>0?c[0]:"static";a.style.top=c[1].length>0?c[1]:"0px"}}}};Bindster.prototype.attachEvent=function(a,b,c){if(a.attachEvent)a.attachEvent("on"+b,c);else if(a.addEventListener)a.addEventListener(b,c,false);else a["on"+b]=c};Bindster.prototype.detachEvent=function(a,b,c){if(a.detachEvent)a.detachEvent("on"+b,c);else if(a.removeEventListener)a.removeEventListener(b,c,false);else a["on"+b]=null};Bindster.prototype.createDelegate=function(a,b){var c=arguments;return function(){var d=[];for(var e=0;e<arguments.length;++e)d.push(arguments[e]);for(var e=2;e<c.length;++e)d.push(c[e]);return b.apply(a,d)}};Bindster.prototype.includeComment=function(a,b){this.fetchFile(a,b,false,this.includeCommentSuccess,this.includeCommentFailure)};Bindster.prototype.includeNode=function(a,b,c){this.fetchFile(a,b,c,this.includeNodeSuccess,this.includeNodeFailure)};Bindster.prototype.fetchFile=function(a,b,c,d,e){var f=this.getXHR();f.open("GET","file:"+a,c?true:false);f.onreadystatechange=this.createDelegate(this,this.processFetchResponse,f,this.createDelegate(this,d,b,c),this.createDelegate(this,e,a,b));try{f.send(null)}catch(g){if(g.code&&g.code==101)this.throwError(b,"requesting "+a,g.message+" (same origin policy violated.  If running locally with Chrome start it with  --allow-file-access-from-files)");else this.throwError(b,"requesting "+a,g.message)}};Bindster.prototype.processFetchResponse=function(a,b,c,d){if(b.readyState!=4)return;try{var e=b.status;var f=b.statusText}catch(g){var e=666;var f="unknown"}if(e==200||e==0)c.call(this,b);else d.call(this,f)};Bindster.prototype.includeCommentSuccess=function(a,b,c){b.data="";var d=document.createElement("DIV");d.innerHTML=a.responseText;this.insertElementsBefore(b.parentNode,d.firstChild,b.nextSibling);if(c)this.scheduleRender()};Bindster.prototype.includeCommentFailure=function(a,b,c){c.data="";this.throwError(c,"include of "+b,a)};Bindster.prototype.includeNodeSuccess=function(a,b,c){b.innerHTML=a.responseText;if(c)this.scheduleRender()};Bindster.prototype.includeNodeFailure=function(a,b,c){this.throwError(c,"include of "+b,a)};Bindster.prototype.getXHR=function(){try{return new XMLHttpRequest}catch(a){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(c){this.controller.alertEvent("No support for XMLHTTP")}}}};Bindster.fromPOJO=function(json,type){var props=type.__props__?type.__types__():null;type.toString().match(/function (.*)\(/);type=RegExp.$1;if(type.match(/String|Number|Boolean/))return json;if(type=="Date")return Date.fromJSON?(new Date).fromJSON(json):new Date(json);var obj=eval("new "+type+"()");for(prop in json)if(!props||!props[prop])obj[prop]=json[prop];var props=obj.__props__?obj.__props__():null;if(props)for(var prop in props){var type=props[prop].type;if(type)if(type==Array){obj[prop]=[];if(json[prop])for(var ix=0;ix<json[prop].length;++ix)obj[prop].push(fromJSON(json[prop][ix],props[prop].of))}else obj[prop]=Bindster.fromPOJO(json[prop]||props[prop].value||null,type)}return obj};Bindster.bind=function(a,b,c){return new Bindster(a,b,c)};BindsterControllerInterface.prototype.evaluateParameters=function(){if(this.parameterString)this.parameters=this.bindster.eval("bindster_temp="+this.parameterString,null,"b:controller attribute",this.node);else this.parameters={}};BindsterControllerInterface.prototype.set=function(value,defer,onchange){eval(this.node.bindster.context);var tags=this.bindster.getTags(this.node);this.bindster.eval(tags.bind+" = this_value",{this_value:value},"bind",this.node);this.bindster.scheduleRender(50,onchange,"onchange",this.node)};BindsterControllerInterface.prototype.parameter=function(a,b){var c=this.node.getAttribute("Bindster_parameter_"+a);return c!=null?c:b};BindsterControllerInterface.prototype.attachEvent=function(a,b,c,d,e){var f=this.createEvent(a,b,c,d,e);this.bindster.attachEvent(a,b,f);return f};BindsterControllerInterface.prototype.detachEvent=function(a,b,c){this.bindster.detachEvent(a,b,c)};BindsterControllerInterface.prototype.registerEvent=function(a,b,c,d,e){a["on"+b]=this.createEvent(a,b,c,d,e)};BindsterControllerInterface.prototype.createEvent=function(a,b,c,d,e){this.bindster.initNode(a);a.bindster.controller=c;var f="node.bindster.controller['"+d+"'].call(node.bindster.controller, ev)";var g=a.bindster.id;var h=true||b=="mouseover"||b=="mouseout"?"var node = "+this.bindster.instance+".processMouse(ev,'"+g+"');":"var node = ev.target ? ev.target : ev.srcElement; ";var i=e?this.bindster.instance+".scheduleRender("+e+");":"";var j=b=="onclick"&&a.tagName=="A"&&a.href&&a.href.match(/#/)>1?"true":"false";var j="return (ev && ev.srcElement && ev.srcElement.tagName && ev.srcElement.tagName == 'INPUT' ? true : "+j+");";var k=h+"if (node) { "+f+i+" }"+j;k="try{"+k+"}catch(e){"+this.bindster.instance+'.throwError(node, "'+b+'",e.message)}';a.bindster.mouse_state="unknown";return new Function("ev","ev = ev ? ev : event;"+k)}