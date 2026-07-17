
/*-------------------------------------
 99-04) Component Mouse Scroller
-------------------------------------*/
class ComponentMouseScrollerBase extends ComponentBase{

    /* ---------------------------------------------
        PROPERTYs Pattern
 --------------------------------------------- */
    _COMPONENT_PATTERN = {
        prop_structureClass: {
            prop: "prop_structureClass",
            default: []
        },
        prop_structureStyles: {
            prop: "prop_structureStyles",
            default: {}
        },
        prop_borderClass: {
            prop: "prop_borderClass",
            default: ["border", "border-secondry"]
        },
        prop_borderStyles: {
            prop: "prop_borderStyles",
            default: {}
        },
        prop_backgroundColor_type: {
            prop: "prop_backgroundColor_type",
            default: null
        },
        prop_backgroundColor_dark: {
            prop: "prop_backgroundColor_dark",
            default: tools_const?.styles?.mosuseScroller?.backgroundColor_dark ?? ""
        },
        prop_backgroundColor_light: {
            prop: "prop_backgroundColor_light",
            default: tools_const?.styles?.mosuseScroller?.backgroundColor_light ?? ""
        },
        prop_scollerClass: {
            prop: "prop_scollerClass",
            default: []
        },
        prop_scrollerStyles: {
            prop: "prop_scrollerStyles",
            default: {}
        },
        prop_scrollerWidth: {
            prop: "prop_scrollerWidth",
            default: "100%"
        },
        prop_scrollerHeight: {
            prop: "prop_scrollerHeight",
            default: "250px"
        },
        prop_backgroundColor_tools: {
            prop: "prop_backgroundColor_tools",
            default: tools_const?.styles?.mosuseScroller?.backgroundColor_tools ?? ""
        },
        prop_moreIcons: {
            prop: "prop_moreIcons",
            default: ""
        },
        prop_iconRefresh: {
            prop: "prop_iconRefresh",
            default: "&#x21bb;"
        },
        prop_iconZoomIn: {
            prop: "prop_iconZoomIn",
            default: "&#x2795;"
        },
        prop_iconZoomOut: {
            prop: "prop_iconZoomOut",
            default: "&#x2796;"
        },
        prop_iconZoomStandard: {
            prop: "prop_iconZoomStandard",
            default: "&#x1F50D;"
        },
        prop_iconBgDark: {
            prop: "prop_iconBgDark",
            default: "&#9790"
        },
        prop_iconBgLight: {
            prop: "prop_iconBgLight",
            default: "&#9728;"
        },
        prop_layoutContent: {
            prop: "prop_layoutContent",
            default: null
        },
        var_scrollerScaleText: {
            prop: "var_scrollerScaleText",
            default: this._SCALE * 100
        }
    };

    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = {
        part_structure: [
            this._COMPONENT_PATTERN.prop_structureClass,
            this._COMPONENT_PATTERN.prop_structureStyles
        ],
        part_layout_border: [
            this._COMPONENT_PATTERN.prop_borderClass,
            this._COMPONENT_PATTERN.prop_borderStyles
        ],
        part_layout_scroll: [
            this._COMPONENT_PATTERN.prop_backgroundColor_type,
            this._COMPONENT_PATTERN.prop_backgroundColor_dark,
            this._COMPONENT_PATTERN.prop_backgroundColor_light,
            this._COMPONENT_PATTERN.prop_scollerClass,
            this._COMPONENT_PATTERN.prop_scrollerStyles,
            this._COMPONENT_PATTERN.prop_scrollerWidth,
            this._COMPONENT_PATTERN.prop_scrollerHeight
        ],
        part_layout_tools: [
            this._COMPONENT_PATTERN.prop_backgroundColor_tools,
            this._COMPONENT_PATTERN.prop_moreIcons
        ],
        part_layout_tools_btn_refresh: [
            this._COMPONENT_PATTERN.prop_iconRefresh
        ],
        part_layout_tools_btn_zoom_in: [
            this._COMPONENT_PATTERN.prop_iconZoomIn
        ],
        part_layout_tools_btn_zoom_out: [
            this._COMPONENT_PATTERN.prop_iconZoomOut
        ],
        part_layout_tools_btn_zoom_standard: [
            this._COMPONENT_PATTERN.prop_iconZoomStandard
        ],
        part_layout_tools_btn_bg_dark: [
            this._COMPONENT_PATTERN.prop_iconBgDark
        ],
        part_layout_tools_btn_bg_light: [
            this._COMPONENT_PATTERN.prop_iconBgLight
        ],
        part_layout_content: [
            this._COMPONENT_PATTERN.prop_layoutContent
        ],
        part_layout_zoom_text: [
            this._COMPONENT_PATTERN.prop_backgroundColor_tools,
            this._COMPONENT_PATTERN.var_scrollerScaleText
        ]
    };

    /* ---------------------------------------------
   PROPERTYs Schema
   --------------------------------------------- */
    _COMPONENT_SCHEMA = {
        part_structure: {
            part_layout_border: {
                part_layout_scroll: {
                    part_layout_tools: {
                        part_layout_tools_btn_refresh: {} ,
                        part_layout_tools_btn_zoom_in: {} ,
                        part_layout_tools_btn_zoom_standard: {} ,
                        part_layout_tools_btn_zoom_out: {} ,
                        part_layout_tools_btn_bg_dark: {} ,
                        part_layout_tools_btn_bg_light: {} ,
                    } ,
                    part_layout_content: {}
                } ,
            },
            part_layout_zoom_text: {}
        } ,
    }

}
window.ComponentMouseScroller = class ComponentMouseScroller extends ComponentMouseScrollerBase{

    _SCROLL_CENTER_X = 0 ;
    _SCROLL_CENTER_Y = 0;

    _BACKGROUND_TYPE_DARK = "dark";
    _BACKGROUND_TYPE_LIGHT = "light";

    _IS_DOWN=false;
    _START_X=null;
    _START_Y=null;
    _SCROLL_TOP=null;
    _SCROLL_LEFT=null;
    _SCALE=1;
    _STEP_SCALE = 0.5;
    _MIN_SCALE = 0.4;
    _MAX_SCALE = 3;




    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(elId , config) {
        super(
            listComponent[ComponentMouseScroller.name] ,
            elId
        );
        super.renderComponent(config);
    }


    /* ---------------------------------------------
     TEMPLATEs
    --------------------------------------------- */
    componentFn(){
        this.templateFn("part_layout_border");
        this.templateFn("part_layout_tools_btn_refresh");
        this.templateFn("part_layout_tools_btn_zoom_in");
        this.templateFn("part_layout_tools_btn_zoom_standard");
        this.templateFn("part_layout_tools_btn_zoom_out");
        this.templateFn("part_layout_tools_btn_bg_dark");
        this.templateFn("part_layout_tools_btn_bg_light");

        this.fn_applyTheme()
    }
    templateFn(partName = null){
        switch (partName){
            case "part_structure":
                return this.template_render_structure(partName);
            case "part_layout_zoom_text":
                return this.template_render_structure_zoomText(partName);
            case "part_layout_scroll":
                return this.template_render_layoutScroll(partName);
            case "part_layout_tools":
                return this.template_render_layoutTools(partName);
            case "part_layout_content":
                return this.template_render_layoutContent(partName);
            case "part_layout_border":
                return this.componentFn_render_layoutBorder(partName);
            case "part_layout_tools_btn_refresh":
                return this.componentFn_render_layoutTools_btnRefresh(partName);
            case "part_layout_tools_btn_zoom_in":
                return this.componentFn_render_layoutTools_btnZoomIn(partName);
            case "part_layout_tools_btn_zoom_standard":
                return this.componentFn_render_layoutTools_btnZoomStandard(partName);
            case "part_layout_tools_btn_zoom_out":
                return this.componentFn_render_layoutTools_btnZoomOut(partName);
            case "part_layout_tools_btn_bg_dark":
                return this.componentFn_render_layoutTools_btnBgDark(partName);
            case "part_layout_tools_btn_bg_light":
                return this.componentFn_render_layoutTools_btnBgLight(partName);
            default:
                return this.templateBasic_render();
        }
    }

    template_render_structure() {
        const content = `
        
          <component-border id="component-layout-scroll-border-${this._COMPONENT_RANDOM_ID}">
              <component-body>
                 ${this.templateFn("part_layout_tools") ?? ""}
          
                 ${this.templateFn("part_layout_scroll") ?? ""} 

                 ${this.templateFn("part_layout_zoom_text") ?? ""}
              </component-body>
          </component-border>
          
                `;
        return this.templateBasic_render_structure(content , "position-relative p-0");
    }

    template_render_structure_zoomText(partName){
        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl = data.hasOwnProperty("directionRtl") ? data.directionRtl : (component_props != null && component_props.hasOwnProperty("directionRtl") ? component_props.directionRtl : false)

            const prop_backgroundColor_tools  =  data.hasOwnProperty("prop_backgroundColor_tools")    ?  data.prop_backgroundColor_tools     : "";
            const var_scrollerScaleText  =    data.hasOwnProperty("var_scrollerScaleText")           ?  data.var_scrollerScaleText       : [];

            return `
<section data-part-name="${partName}" 
         id="component-layout-zoom-text-${this._COMPONENT_RANDOM_ID}"
         class="position-absolute rounded shadow text-white text-center border-white border" 
         >
         
     <style>
         #${this._COMPONENT_ID} #component-layout-zoom-text-${this._COMPONENT_RANDOM_ID}{
            opacity: 0.25;
            top: 10px;
            ${directionRtl ? "left" : "right"}: 45px; 
            width: 60px;
            background-color: ${prop_backgroundColor_tools};
         }
         
         
         #${this._COMPONENT_ID}:hover  #component-layout-zoom-text-${this._COMPONENT_RANDOM_ID}{
               opacity: 0.75;
               transition: opacity 500ms ease;
         }
     </style>
     
     ${var_scrollerScaleText} %
     
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_layoutScroll(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_scollerClass  =    data.hasOwnProperty("prop_scollerClass")           ?  data.prop_scollerClass       : [];
            const prop_scrollerStyles  =  data.hasOwnProperty("prop_scrollerStyles")         ?  data.prop_scrollerStyles     : {};
            const prop_scrollerWidth  =   data.hasOwnProperty("prop_scrollerWidth")          ?  data.prop_scrollerWidth      : "";
            const prop_scrollerHeight  =  data.hasOwnProperty("prop_scrollerHeight")         ?  data.prop_scrollerHeight     : "";

            return `
<section data-part-name="${partName}" 
         id="component-layout-scroll-${this._COMPONENT_RANDOM_ID}"
         class="${tools_public.renderListClass(prop_scollerClass)}"
         onmousedown="${this.getFn("fn_scrollerModusDown" , "event")}"
         onmousemove="${this.getFn("fn_scrollerModusMove" , "event")}"
         onwheel="${this.getFn("fn_scrollerWheel" , "event")}"
         onmouseleave="${this.getFn("fn_scrollerMouseLeave" , "event")}"
         onmouseup="${this.getFn("fn_scrollerMouseUp" , "event")}"
         >
         
     <style>
         #${this._COMPONENT_ID} #component-layout-scroll-${this._COMPONENT_RANDOM_ID}{
         float:left;
         direction: ltr;
              overflow: auto;
              cursor: all-scroll;
              user-select: none;    
              width: ${prop_scrollerWidth}; 
              height: ${prop_scrollerHeight}; 
              ${tools_public.renderListStyle(prop_scrollerStyles)}
              -webkit-user-select: none;
              -moz-user-select: none;  
              -ms-user-select: none; 
              -ms-overflow-style: none;
              scrollbar-width: none;
         }
         #${this._COMPONENT_ID} #component-layout-scroll-${this._COMPONENT_RANDOM_ID}::-webkit-scrollbar {
               display: none;
         }

     </style>
   
   ${this.templateFn("part_layout_content") ?? ""}
    
</section>
        `;
        }
        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_layoutTools(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_scrollerHeight         =  data.hasOwnProperty("prop_scrollerHeight")           ?  data.prop_scrollerHeight            : "";
            const prop_backgroundColor_tools  =  data.hasOwnProperty("prop_backgroundColor_tools")    ?  data.prop_backgroundColor_tools     : "";
            const prop_moreIcons              =  data.hasOwnProperty("prop_moreIcons")                ?  data.prop_moreIcons                 : "";
            const directionRtl = data.hasOwnProperty("directionRtl") ? data.directionRtl : (component_props != null && component_props.hasOwnProperty("directionRtl") ? component_props.directionRtl : false)

            return `
<section data-part-name="${partName}" 
         id="component-layout-scroll-tools-${this._COMPONENT_RANDOM_ID}"
         class=" position-absolute  border rounded"
         >
         
     <style>
         #${this._COMPONENT_ID}:hover  #component-layout-scroll-tools-${this._COMPONENT_RANDOM_ID}{
               opacity: 0.75;
                 transition: opacity 500ms ease;
         }
         
         #${this._COMPONENT_ID} #component-layout-scroll-tools-${this._COMPONENT_RANDOM_ID}{
            opacity: 0.25;
            width: 35px;
           
            top:5px;
            overflow:auto;
            user-select: none;       /* متن قابل انتخاب نباشد */
            -webkit-user-select: none; /* Chrome/Safari */
            -moz-user-select: none;    /* Firefox */
            -ms-user-select: none;     /* IE/Edge */
            ${directionRtl ? "left" : "right"} : 5px;
            background-color: ${prop_backgroundColor_tools};
            z-index: ${tools_css.getZIndex(tools_css.standardZIndex.tools.name, 1)} ;
         }
         
         #${this._COMPONENT_ID} #component-layout-scroll-tools-${this._COMPONENT_RANDOM_ID}::-webkit-scrollbar{
             display: none;        /* Chrome, Safari, Edge */
         }

         @media (max-width: 768px) {
            #${this._COMPONENT_ID} #component-layout-scroll-tools-${this._COMPONENT_RANDOM_ID}{
               opacity: 0.75;
            }
         }
         
     </style>
     
     <div id="component-layout-scroll-tools-icons-${this._COMPONENT_RANDOM_ID}">
        <component-icon id="component-layout-scroll-tools-icon-refresh-${this._COMPONENT_RANDOM_ID}"></component-icon>
        <component-icon id="component-layout-scroll-tools-icon-zoom-in-${this._COMPONENT_RANDOM_ID}"></component-icon>
        <component-icon id="component-layout-scroll-tools-icon-zoom-standard-${this._COMPONENT_RANDOM_ID}"></component-icon>
        <component-icon id="component-layout-scroll-tools-icon-zoom-out-${this._COMPONENT_RANDOM_ID}"></component-icon>
        <component-icon id="component-layout-scroll-tools-icon-bg-dark-${this._COMPONENT_RANDOM_ID}"></component-icon>
        <component-icon id="component-layout-scroll-tools-icon-bg-light-${this._COMPONENT_RANDOM_ID}"></component-icon>
     
        ${prop_moreIcons}
     </div>
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_layoutContent(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_layoutContent   =  data.hasOwnProperty("prop_layoutContent")  && data.prop_layoutContent != null  ?  data.prop_layoutContent   : this._COMPONENT_SLOTS?.body?.[0]?.html ?? "";

            return `
<section data-part-name="${partName}" 
         id="component-layout-content-${this._COMPONENT_RANDOM_ID}"
         class="w-100 h-100 d-table" 
         >
         
     <style>
         #${this._COMPONENT_ID} #component-layout-content-${this._COMPONENT_RANDOM_ID}{
             
         }
     </style>
     
     ${prop_layoutContent}
     
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    componentFn_render_layoutTools_btnRefresh(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_iconRefresh  =  data.hasOwnProperty("prop_iconRefresh")    ?  data.prop_iconRefresh  : null;
            if (prop_iconRefresh != null){
                new window.ComponentIcon(
                    `component-layout-scroll-tools-icon-refresh-${this._COMPONENT_RANDOM_ID}`  ,
                    {
                        classList: [ ] ,
                        prop_icon: prop_iconRefresh  ,
                        prop_title: "refresh"  ,

                        prop_iconClass : [  ] ,
                        prop_iconStyles : {
                            "text-align": "center",
                            "cursor": "pointer",
                            "width": "30px",
                            "height": "30px",
                            "color": "white",
                            "display": "block",
                            "font-size": "14pt",
                        } ,

                        fn_callback: () =>{
                            this.runFn('fn_onCLickRefresh' , "event");
                        }
                    }
                )
            }
        }
    }

    componentFn_render_layoutBorder(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_borderClass    =  data.hasOwnProperty("prop_borderClass")    ?  data.prop_borderClass     : [];
            const prop_borderStyles   =  data.hasOwnProperty("prop_borderStyles")   ?  data.prop_borderStyles    : {};

            new window.ComponentBorder(
                `component-layout-scroll-border-${this._COMPONENT_RANDOM_ID}` ,
                {
                    prop_structureClass:  prop_borderClass ,
                    prop_structureStyles: prop_borderStyles ,
                }
            )
        }
    }

    componentFn_render_layoutTools_btnZoomIn(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_iconZoomIn  =  data.hasOwnProperty("prop_iconZoomIn")    ?  data.prop_iconZoomIn     : null;
            if (prop_iconZoomIn != null){
                new window.ComponentIcon(
                    `component-layout-scroll-tools-icon-zoom-in-${this._COMPONENT_RANDOM_ID}`  ,
                    {
                        classList: [ ] ,
                        prop_icon: prop_iconZoomIn  ,
                        prop_title: "zoom-in"  ,

                        prop_iconClass : [  ] ,
                        prop_iconStyles : {
                            "text-align": "center",
                            "cursor": "pointer",
                            "width": "30px",
                            "height": "30px",
                            "color": "white",
                            "display": "block",
                            "font-size": "14pt",
                        } ,

                        fn_callback: () =>{
                            this.runFn('fn_onCLickZoomIn' , "event");
                        }
                    }
                )
            }
        }
    }

    componentFn_render_layoutTools_btnZoomStandard(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_iconZoomStandard  =  data.hasOwnProperty("prop_iconZoomStandard")    ?  data.prop_iconZoomStandard     : null;
            if (prop_iconZoomStandard != null){
                new window.ComponentIcon(
                    `component-layout-scroll-tools-icon-zoom-standard-${this._COMPONENT_RANDOM_ID}`  ,
                    {
                        classList: [ ] ,
                        prop_icon: prop_iconZoomStandard  ,
                        prop_title: "zoom-standard"  ,

                        prop_iconClass : [  ] ,
                        prop_iconStyles : {
                            "text-align": "center",
                            "cursor": "pointer",
                            "width": "30px",
                            "height": "30px",
                            "color": "white",
                            "display": "block",
                            "font-size": "14pt",
                        } ,

                        fn_callback: () =>{
                            this.runFn('fn_onCLickZoomStandard' , "event");
                        }
                    }
                )
            }
        }
    }

    componentFn_render_layoutTools_btnZoomOut(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_iconZoomOut  =  data.hasOwnProperty("prop_iconZoomOut")    ?  data.prop_iconZoomOut   : null;
            if (prop_iconZoomOut != null){
                new window.ComponentIcon(
                    `component-layout-scroll-tools-icon-zoom-out-${this._COMPONENT_RANDOM_ID}`  ,
                    {
                        classList: [ ] ,
                        prop_icon: prop_iconZoomOut  ,
                        prop_title: "zoom-out"  ,

                        prop_iconClass : [  ] ,
                        prop_iconStyles : {
                            "text-align": "center",
                            "cursor": "pointer",
                            "width": "30px",
                            "height": "30px",
                            "color": "white",
                            "display": "block",
                            "font-size": "14pt",
                        } ,

                        fn_callback: () =>{
                            this.runFn('fn_onCLickZoomOut' , "event");
                        }
                    }
                )
            }
        }
    }

    componentFn_render_layoutTools_btnBgDark(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_iconBgDark  =  data.hasOwnProperty("prop_iconBgDark")    ?  data.prop_iconBgDark   : null;
            if (prop_iconBgDark != null){
                new window.ComponentIcon(
                    `component-layout-scroll-tools-icon-bg-dark-${this._COMPONENT_RANDOM_ID}`  ,
                    {
                        classList: [ ] ,
                        prop_icon: prop_iconBgDark  ,
                        prop_title: "Dark"  ,

                        prop_iconClass : [  ] ,
                        prop_iconStyles : {
                            "text-align": "center",
                            "cursor": "pointer",
                            "width": "30px",
                            "height": "30px",
                            "color": "white",
                            "display": "block",
                            "font-size": "14pt",
                        } ,

                        fn_callback: () =>{
                            this.runFn('fn_onSetBgDark' , "event");
                        }
                    }
                )
            }
        }
    }

    componentFn_render_layoutTools_btnBgLight(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_iconBgLight  =  data.hasOwnProperty("prop_iconBgLight")    ?  data.prop_iconBgLight   : null;
            if (prop_iconBgLight != null){
                new window.ComponentIcon(
                    `component-layout-scroll-tools-icon-bg-light-${this._COMPONENT_RANDOM_ID}`  ,
                    {
                        classList: [ ] ,
                        prop_icon: prop_iconBgLight  ,
                        prop_title: "Light"  ,

                        prop_iconClass : [  ] ,
                        prop_iconStyles : {
                            "text-align": "center",
                            "cursor": "pointer",
                            "width": "30px",
                            "height": "30px",
                            "color": "white",
                            "display": "block",
                            "font-size": "14pt",
                        } ,

                        fn_callback: () =>{
                            this.runFn('fn_onSetBgLight' , "event");
                        }
                    }
                )
            }
        }
    }




    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */
    fn_getElementScroller(){
        return document.querySelector(`#${this._COMPONENT_ID} #component-layout-scroll-${this._COMPONENT_RANDOM_ID}`);
    }

    fn_getElementContent(){
        return document.querySelector(`#${this._COMPONENT_ID} #component-layout-content-${this._COMPONENT_RANDOM_ID}`);
    }

    fn_scrollerModusDown(event){
        const scroller = this.fn_getElementScroller();
        this._IS_DOWN = true;

        // مختصات شروع client
        this._START_CLIENT_X = event.clientX;
        this._START_CLIENT_Y = event.clientY;

        this._SCROLL_LEFT = scroller.scrollLeft;
        this._SCROLL_TOP  = scroller.scrollTop;

        // pointer capture (برای درگ حتی خارج از المنت)
        if (typeof scroller.setPointerCapture === 'function' && event.pointerId != null) {
            try { scroller.setPointerCapture(event.pointerId); } catch(e){/* ignore */ }
        }

        // listener های document برای move و up
        this._bound_scrollerMove = this.fn_scrollerModusMove.bind(this);
        this._bound_scrollerUp   = this.fn_scrollerModusUp.bind(this);

        document.addEventListener('pointermove', this._bound_scrollerMove, {passive:false});
        document.addEventListener('pointerup', this._bound_scrollerUp);

        document.body.style.cursor = 'grabbing';

        event.preventDefault();
    }

    fn_scrollerModusMove(event){
        if (!this._IS_DOWN) return;
        event.preventDefault();

        const scroller = this.fn_getElementScroller();
        const content  = this.fn_getElementContent();

        // فاصله موس از شروع
        const dx = event.clientX - this._START_CLIENT_X;
        const dy = event.clientY - this._START_CLIENT_Y;

        let newLeft = this._SCROLL_LEFT - dx;
        let newTop  = this._SCROLL_TOP  - dy;

        // محاسبه max scroll با در نظر گرفتن scale
        const scale = this._SCALE;
        const contentWidth  = content.offsetWidth * scale;
        const contentHeight = content.offsetHeight * scale;

        const maxLeft = Math.max(0, contentWidth - scroller.clientWidth);
        const maxTop  = Math.max(0, contentHeight - scroller.clientHeight);

        // clamp
        newLeft = Math.max(0, Math.min(maxLeft, newLeft));
        newTop  = Math.max(0, Math.min(maxTop,  newTop));

        scroller.scrollLeft = newLeft ;
        scroller.scrollTop  = newTop  ;
    }

    fn_scrollerModusUp(event){
        if (!this._IS_DOWN) return;
        this._IS_DOWN = false;

        const scroller = this.fn_getElementScroller();

        if (typeof scroller.releasePointerCapture === 'function' && event.pointerId != null) {
            try { scroller.releasePointerCapture(event.pointerId); } catch(e){/* ignore */ }
        }

        if (this._bound_scrollerMove) {
            document.removeEventListener('pointermove', this._bound_scrollerMove, {passive:false});
            this._bound_scrollerMove = null;
        }
        if (this._bound_scrollerUp) {
            document.removeEventListener('pointerup', this._bound_scrollerUp);
            this._bound_scrollerUp = null;
        }

        document.body.style.cursor = '';
    }


    fn_scrollerWheel(event){
        event.preventDefault();
        event.stopPropagation();
        this.fn_scrollerScaleProgress(event.clientX , event.clientY , event.deltaY);
    }
    fn_scrollerScaleProgress(x , y , zoomStep=null){
        const scroller = this.fn_getElementScroller();

        const rect = scroller.getBoundingClientRect();
        const mouseX = x - rect.left;
        const mouseY = y - rect.top;

        const zoomSpeed = 0.001;
        let newScale = 1;
        if (zoomStep != null){
            newScale = Math.min(Math.max(this._SCALE - zoomStep * zoomSpeed, this._MIN_SCALE), this._MAX_SCALE);
            newScale = newScale > this._MIN_SCALE ? newScale : this._MIN_SCALE;
        }
        const scaleRatio = newScale / this._SCALE;

        this._SCALE = newScale;
        this.fn_applyZoom();

        this.call_applyScroll(
            (scroller.scrollLeft + mouseX) * scaleRatio - mouseX ,
            (scroller.scrollTop + mouseY)  * scaleRatio - mouseY
        );
    }


    fn_scrollerMouseLeave(event){
        this._IS_DOWN = false
    }

    fn_scrollerMouseUp(event){
        this._IS_DOWN = false
    }


    fn_onCLickRefresh(event){
        this._SCALE = 1;
        this.fn_applyZoom()
        this.call_applyScroll();
    }





    fn_onCLickZoomIn(event){
        const scroller = this.fn_getElementScroller();
        const rect = scroller.getBoundingClientRect();
        this.fn_scrollerScaleProgress(rect.left , rect.top , -this._STEP_SCALE*100)
    }
    fn_onCLickZoomStandard(event){
        const scroller = this.fn_getElementScroller();
        const rect = scroller.getBoundingClientRect();
        this.fn_scrollerScaleProgress(rect.left , rect.top)
    }
    fn_onCLickZoomOut(event){
        const scroller = this.fn_getElementScroller();
        const rect = scroller.getBoundingClientRect();
        this.fn_scrollerScaleProgress(rect.left , rect.top , this._STEP_SCALE*100)
    }

    fn_onSetBgDark(event){
        this.fn_applyTheme( this._BACKGROUND_TYPE_DARK);
    }
    fn_onSetBgLight(event){
        this.fn_applyTheme( this._BACKGROUND_TYPE_LIGHT);
    }



    fn_applyZoom(){
        const contentRect = this.fn_getElementContent();
        this._SCALE  = this._MIN_SCALE < this._SCALE ? this._SCALE : this._MIN_SCALE;
        contentRect.style.transformOrigin = "0 0";
        contentRect.style.transform = `scale(${ this._SCALE })`;
        this.set("var_scrollerScaleText" , Math.floor(this._SCALE*100))
    }


    fn_applyTheme(prop_backgroundColor_type = null){
        const data = this._COMPONENT_CONFIG;
        const prop_backgroundColor_light  = data.hasOwnProperty("prop_backgroundColor_light")   ?  data.prop_backgroundColor_light    : "";
        const prop_backgroundColor_dark  =  data.hasOwnProperty("prop_backgroundColor_dark")    ?  data.prop_backgroundColor_dark     : "";

        if (prop_backgroundColor_type == null){
            prop_backgroundColor_type  =  data.hasOwnProperty("prop_backgroundColor_type")    ?  data.prop_backgroundColor_type     : null;
        }

        let backgroundSelected=null;
        switch (prop_backgroundColor_type){
            case this._BACKGROUND_TYPE_LIGHT:
                backgroundSelected = prop_backgroundColor_light;
                break;
            case this._BACKGROUND_TYPE_DARK:
                backgroundSelected = prop_backgroundColor_dark;
                break;
            default:
                backgroundSelected = prop_backgroundColor_light;
                break;
        }

        if (backgroundSelected != null){
            const el = this.fn_getElementContent();
            if(el != null) el.style.backgroundColor = backgroundSelected;
        }
    }



    call_applyScroll(positionX=null , positionY=null){
        const scroller = this.fn_getElementScroller();
        scroller.scrollLeft = positionX != null ? positionX : this._SCROLL_CENTER_X;
        scroller.scrollTop  = positionY != null ? positionY : this._SCROLL_CENTER_Y;
    }

}
