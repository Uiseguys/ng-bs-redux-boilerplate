/*! Built with http://stenciljs.com */
const{h,Context}=window.index;class ScbNavbar{constructor(){this.size="",this.navbarcolor="light",this.bgcolor="light",this.placement=""}render(){return h("nav",{class:"navbar "+this.placement+(this.size?" navbar-expand-"+this.size:" navbar-expand")+" navbar-"+this.navbarcolor+" bg-"+this.bgcolor},h("slot",{name:"slot-navbar-brand-left"}),h("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#"+this.id,"aria-controls":this.id,"aria-expanded":"false","aria-label":"Toggle navigation"},h("span",{class:"navbar-toggler-icon"})),h("slot",{name:"slot-navbar-brand-right"}),h("slot",{name:"slot-navbar-content"}))}static get is(){return"scb-navbar"}static get properties(){return{bgcolor:{type:String,attr:"bgcolor"},el:{elementRef:!0},id:{type:String,attr:"id"},navbarcolor:{type:String,attr:"navbarcolor"},placement:{type:String,attr:"placement"},size:{type:String,attr:"size"}}}}export{ScbNavbar};