webpackJsonp([2],{DB1k:function(n,t,e){"use strict";var i=e("rVsN"),r=e.n(i),o=e("OMN4"),a=e.n(o).a.create({});a.interceptors.response.use(function(n){return n.data},function(n){return n&&n.response&&console.log(n.response.status),r.a.reject(n)}),t.a=a},NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("lRwf"),r=e.n(i),o={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=e("C7Lr")({name:"App"},o,!1,function(n){e("ipMX")},null,null).exports,s=e("SJI6"),c=e.n(s),h=(e("DB1k"),{state:{},getters:{},actions:{},mutations:{}});r.a.use(c.a);var l=new c.a.Store({modules:{timesheet:h}}),u=e("zO6J");Vue.use(u.a);var p=new u.a({routes:[{path:"/index",name:"Timesheet",component:function(n){return e.e(0).then(function(){var t=[e("9Byg")];n.apply(null,t)}.bind(this)).catch(e.oe)},meta:{title:"timesheet"}}],scrollBehavior:function(n,t,e){return{x:0,y:0}}});p.beforeEach(function(n,t,e){e()});var f=p,d=(e("PVDk"),e("Pszq"),e("p3Lv"),e("vO6H"),e("eWFe"),e("QYvA"),e("qfdn"),e("3M6H"),e("Z9s5"),e("ya5W"),e("58SP"),e("WTmC"),e("VEFW"),e("Ld0v"),e("LLnh"),e("d9nI"),e("W47b"));r.a.config.productionTip=!1,r.a.component("icon",d.a),new r.a({el:"#app",router:f,store:l,components:{App:a},template:"<App/>"})},OMN4:function(n,t){n.exports=axios},SJI6:function(n,t){n.exports=Vuex},W47b:function(n,t,e){"use strict";var i=e("a3Yh"),r=e.n(i),o={},a={name:"fa-icon",props:{name:{type:String,validator:function(n){return!n||n in o||(console.warn('Invalid prop: prop "name" is referring to an unregistered icon "'+n+'".\nPlease make sure you have imported this icon before using it.'),!1)}},scale:[Number,String],spin:Boolean,inverse:Boolean,pulse:Boolean,flip:{validator:function(n){return"horizontal"===n||"vertical"===n}},label:String},data:function(){return{x:!1,y:!1,childrenWidth:0,childrenHeight:0,outerScale:1}},computed:{normalizedScale:function(){var n=this.scale;return n=void 0===n?1:Number(n),isNaN(n)||n<=0?(console.warn('Invalid prop: prop "scale" should be a number over 0.',this),this.outerScale):n*this.outerScale},klass:function(){return r()({"fa-icon":!0,"fa-spin":this.spin,"fa-flip-horizontal":"horizontal"===this.flip,"fa-flip-vertical":"vertical"===this.flip,"fa-inverse":this.inverse,"fa-pulse":this.pulse},this.$options.name,!0)},icon:function(){return this.name?o[this.name]:null},box:function(){return this.icon?"0 0 "+this.icon.width+" "+this.icon.height:"0 0 "+this.width+" "+this.height},ratio:function(){if(!this.icon)return 1;var n=this.icon,t=n.width,e=n.height;return Math.max(t,e)/16},width:function(){return this.childrenWidth||this.icon&&this.icon.width/this.ratio*this.normalizedScale||0},height:function(){return this.childrenHeight||this.icon&&this.icon.height/this.ratio*this.normalizedScale||0},style:function(){return 1!==this.normalizedScale&&{fontSize:this.normalizedScale+"em"}},raw:function(){if(!this.icon||!this.icon.raw)return null;var n=this.icon.raw,t={};return n=n.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,function(n,e,i){var r="fa-"+(s++).toString(16);return t[i]=r,' id="'+r+'"'}),n=n.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,function(n,e,i,r){var o=e||r;return o&&t[o]?"#"+t[o]:n}),n}},mounted:function(){var n=this;if(this.name||0!==this.$children.length){if(!this.icon){var t=0,e=0;this.$children.forEach(function(i){i.outerScale=n.normalizedScale,t=Math.max(t,i.width),e=Math.max(e,i.height)}),this.childrenWidth=t,this.childrenHeight=e,this.$children.forEach(function(n){n.x=(t-n.width)/2,n.y=(e-n.height)/2})}}else console.warn('Invalid prop: prop "name" is required.')},register:function(n){for(var t in n){var e=n[t];e.paths||(e.paths=[]),e.d&&e.paths.push({d:e.d}),e.polygons||(e.polygons=[]),e.points&&e.polygons.push({points:e.points}),o[t]=e}},icons:o},s=870711;var c={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("svg",{class:n.klass,style:n.style,attrs:{version:"1.1",role:n.label?"img":"presentation","aria-label":n.label,x:n.x,y:n.y,width:n.width,height:n.height,viewBox:n.box}},[n._t("default",[n.icon&&n.icon.paths?n._l(n.icon.paths,function(t,i){return e("path",n._b({key:"path-"+i},"path",t,!1))}):n._e(),n._v(" "),n.icon&&n.icon.polygons?n._l(n.icon.polygons,function(t,i){return e("polygon",n._b({key:"polygon-"+i},"polygon",t,!1))}):n._e(),n._v(" "),n.icon&&n.icon.raw?[e("g",{domProps:{innerHTML:n._s(n.raw)}})]:n._e()])],2)},staticRenderFns:[]};var h=e("C7Lr")(a,c,!1,function(n){e("jhA7")},null,null);t.a=h.exports},ipMX:function(n,t){},jhA7:function(n,t){},lRwf:function(n,t){n.exports=Vue}},["NHnr"]);
//# sourceMappingURL=app.8f912ca8ca9a0a66bb28.js.map