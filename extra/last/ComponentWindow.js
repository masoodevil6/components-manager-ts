class ComponentWindowBase extends ComponentBase{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = {
        prop_blurBackgroundColor: {
            prop: "prop_blurBackgroundColor",
            default: tools_const.hasOwnProperty("styles") && tools_const.styles.hasOwnProperty("window") && tools_const.styles.window.hasOwnProperty("backgroundColor_blur")
                ? tools_const.styles.window.backgroundColor_blur
                : ""
        },
        prop_windowBackgroundColor: {
            prop: "prop_windowBackgroundColor",
            default: tools_const.hasOwnProperty("styles") && tools_const.styles.hasOwnProperty("window") && tools_const.styles.window.hasOwnProperty("backgroundColor_window")
                ? tools_const.styles.window.backgroundColor_window
                : ""
        },
        prop_windowWidth: {
            prop: "prop_windowWidth",
            default: 700
        },
        prop_windowHeight: {
            prop: "prop_windowHeight",
            default: 400
        },
        prop_windowRound: {
            prop: "prop_windowRound",
            default: "0"
        },
        prop_header: {
            prop: "prop_header",
            default: null
        },
        prop_showBtnResize: {
            prop: "prop_showBtnResize",
            default: true
        },
        prop_body: {
            prop: "prop_body",
            default: null
        },
        prop_footer: {
            prop: "prop_footer",
            default: null
        }
    };

    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = {
        part_structure: [],

        part_blur: [
            this._COMPONENT_PATTERN.prop_blurBackgroundColor
        ],

        part_window: [
            this._COMPONENT_PATTERN.prop_windowBackgroundColor,
            this._COMPONENT_PATTERN.prop_windowWidth,
            this._COMPONENT_PATTERN.prop_windowHeight,
            this._COMPONENT_PATTERN.prop_windowRound
        ],

        part_window_header: [],

        part_window_header_title: [
            this._COMPONENT_PATTERN.prop_header
        ],

        part_window_header_icons: [],

        part_window_header_icons_icon_close: [],

        part_window_header_icons_icon_resize: [
            this._COMPONENT_PATTERN.prop_showBtnResize
        ],

        part_window_body: [
            this._COMPONENT_PATTERN.prop_body
        ],

        part_window_footer: [
            this._COMPONENT_PATTERN.prop_footer
        ]
    };


    /* ---------------------------------------------
   PROPERTYs Schema
   --------------------------------------------- */
    _COMPONENT_SCHEMA = {
        part_structure: {
            part_blur:{
                part_window:{
                    part_window_header:{
                        part_window_header_title: {},
                        part_window_header_icons: {
                            part_window_header_icons_icon_close:{},
                            part_window_header_icons_icon_resize:{},
                        },
                    },
                    part_window_body:{},
                    part_window_footer:{}
                }
            }
        }
    }

}
window.ComponentWindow = class ComponentWindow extends ComponentWindowBase {

    _IS_FULL_SIZE = false;

    /* ---------------------------------------------
       SETUP
   --------------------------------------------- */
    constructor(elId, config) {
        super(
            listComponent[ComponentWindow.name] ,
            elId
        );
        super.renderComponent(config);
    }

    /* ---------------------------------------------
   TEMPLATEs
   --------------------------------------------- */
    componentFn(){
        this.templateFn("part_window_header_icons_icon_close");
        this.templateFn("part_window_header_icons_icon_resize");
        this.fn_setUnvisableWindow();
    }
    templateFn(partName = null){
        switch (partName){
            case "part_structure":
                return this.template_render_structure(partName);
            case "part_blur":
                return this.template_render_blur(partName);
            case "part_window":
                return this.template_render_window(partName);

            case "part_window_header":
                return this.template_render_windowHeader(partName);

            case "part_window_header_title":
                return this.template_render_windowHeaderTitle(partName);

            case "part_window_header_icons":
                return this.template_render_windowHeaderIcons(partName);
            case "part_window_header_icons_icon_close":
                return this.componentFn_render_windowHeaderIconClose(partName);
            case "part_window_header_icons_icon_resize":
                return this.componentFn_render_windowHeaderIconResize(partName);

            case "part_window_body":
                return this.template_render_windowBody(partName);
            case "part_window_footer":
                return this.template_render_windowFooter(partName);
            default:
                return this.templateBasic_render();
        }
    }

    template_render_structure(partName) {
        const content = `
         ${this.templateFn("part_blur") ?? ""}
                `;
        return this.templateBasic_render_structure(content);
    }

    template_render_blur(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_blurBackgroundColor       = data.hasOwnProperty("prop_blurBackgroundColor")          ?  data.prop_blurBackgroundColor     : "";

            return `
<section data-part-name="${partName}" 
         id="component-windwow-blur-${this._COMPONENT_RANDOM_ID}" 
         onclick="${this.getFn("fn_onCLicCloseWindow" , "event")}"
         class="position-fixed w-100 h-100" >
         
    <style>
        #${this._COMPONENT_ID} #component-windwow-blur-${this._COMPONENT_RANDOM_ID}{
            background-color: ${prop_blurBackgroundColor};
            top: 0;
            left: 0;
            z-index : ${tools_css.getZIndex(tools_css.standardZIndex.blur_popup.name, 11)};
       }
    </style>
    
     ${this.templateFn("part_window") ?? ""}
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_window(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_windowBackgroundColor       = data.hasOwnProperty("prop_windowBackgroundColor")          ?  data.prop_windowBackgroundColor     : "";
            const prop_windowWidth                 = data.hasOwnProperty("prop_windowWidth")                    ?  data.prop_windowWidth               : "";
            const prop_windowHeight                = data.hasOwnProperty("prop_windowHeight")                   ?  data.prop_windowHeight              : "";
            const prop_windowRound                 = data.hasOwnProperty("prop_windowRound")                    ?  data.prop_windowRound               : "";




            return `
<section data-part-name="${partName}" 
         id="component-windwow-window-${this._COMPONENT_RANDOM_ID}" 
         onclick="${this.getFn("fn_onclickWindow" , "event")}"
         class="position-absolute shadow" >
         
    <style>
    
        #${this._COMPONENT_ID} #component-windwow-window-${this._COMPONENT_RANDOM_ID}{
            transition: width 250ms ease, height 250ms ease;
            background-color: ${prop_windowBackgroundColor};
            top: 50%;
            left: 50%;
            transform: translate(-50% , -50%);
            width: ${prop_windowWidth}px;
            height: ${prop_windowHeight}px;
            border-radius: ${prop_windowRound};
            max-height: calc(100vh - 30%) !important;
       }
       
       @media (max-width: ${prop_windowWidth}px) {
           #${this._COMPONENT_ID} #component-windwow-window-${this._COMPONENT_RANDOM_ID} {
              width: calc(90%) !important;
          }
       }
     
       @media (min-width: ${prop_windowWidth}px) {
            @keyframes window-visable-${this._COMPONENT_RANDOM_ID}{
                0% {
                   width: ${prop_windowWidth * 2 / 3}px;
                   height: ${prop_windowHeight * 2 / 3 }px;
                }
                50% {
                   width: ${prop_windowWidth * 4 / 3}px;
                   height: ${prop_windowHeight * 4 / 3 }px;
                }
                100% {
                   width: ${prop_windowWidth}px;
                   height: ${prop_windowHeight}px;
                }
            }

            @keyframes window-unvisable-${this._COMPONENT_RANDOM_ID} {
                 0% {
                    width: ${prop_windowWidth}px;
                    height: ${prop_windowHeight}px;
                 }
                 50% {
                    width: ${prop_windowWidth * 4 / 3}px;
                    height: ${prop_windowHeight * 4 / 3 }px;
                 }
                 100% {
                    width: ${prop_windowWidth * 2 / 3}px;
                    height: ${prop_windowHeight * 2 / 3 }px;
                 }
             }

             .window-visable-animation-${this._COMPONENT_RANDOM_ID} {
                animation: window-visable-${this._COMPONENT_RANDOM_ID} 0.15s forwards ease-in-out;
             }

             .window-unvisable-animation-${this._COMPONENT_RANDOM_ID} {
                animation: window-unvisable-${this._COMPONENT_RANDOM_ID} 0.15s forwards ease-in-out;
             }


             @keyframes window-full-size-${this._COMPONENT_RANDOM_ID}{
                0% {
                   width: ${prop_windowWidth}px;
                   height: ${prop_windowHeight}px;
                }
                100% {
                   width: calc(100% - 40px);
                   height: calc(100% - 40px);
                }
             }

            @keyframes window-real-size-${this._COMPONENT_RANDOM_ID} {
                0% {
                   width: calc(100% - 40px);
                   height: calc(100% - 40px);
                }
                100% {
                   width: ${prop_windowWidth}px;
                   height: ${prop_windowHeight}px;
                }
            }

            .window-full-size-animation-${this._COMPONENT_RANDOM_ID} {
                animation: window--full-size-${this._COMPONENT_RANDOM_ID} 0.15s forwards ease-in-out;
            }

           .window-real-size-animation-${this._COMPONENT_RANDOM_ID} {
                animation: window-real-size-${this._COMPONENT_RANDOM_ID} 0.15s forwards ease-in-out;
            }

            .window-full-size-${this._COMPONENT_RANDOM_ID} {
               width: calc(100% - 40px) !important;
               height: calc(100% - 40px) !important;
            }

            window-full-size-${this._COMPONENT_RANDOM_ID} {
               width: ${prop_windowWidth}px !important;
               height: ${prop_windowHeight}px !important;
            }
       }

    </style>
    
    ${this.templateFn("part_window_header") ?? ""}
    ${this.templateFn("part_window_body") ?? ""}
    ${this.templateFn("part_window_footer") ?? ""}
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_windowHeader(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            return `
<section data-part-name="${partName}" 
         id="component-windwow-window-header-${this._COMPONENT_RANDOM_ID}" 
         class=" border-bottom row p-0 m-0" >
         
    <style>
        #${this._COMPONENT_ID} #component-windwow-window-header-${this._COMPONENT_RANDOM_ID}{
            height: 35px;
       }
    </style>
    
    ${this.templateFn("part_window_header_title") ?? ""}
    
    ${this.templateFn("part_window_header_icons") ?? ""}
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_windowHeaderTitle(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_header        =   data.hasOwnProperty("prop_header") && data.prop_header !=null       ?  data.prop_header       : this._COMPONENT_SLOTS?.header?.[0]?.html ?? "";

            return `
<section data-part-name="${partName}" 
         id="component-windwow-window-header-title-${this._COMPONENT_RANDOM_ID}" 
         class=" col-8" >
         
    <style>
        #${this._COMPONENT_ID} #component-windwow-window-header-title-${this._COMPONENT_RANDOM_ID}{
            line-height: 35px;
       }
    </style>
   
    <b>${prop_header}</b>
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_windowHeaderIcons(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            return `
<section data-part-name="${partName}" 
         id="component-windwow-window-header-title-${this._COMPONENT_RANDOM_ID}" 
         class="col-4 position-relative" >
         
    <style>
        #${this._COMPONENT_ID} #component-windwow-window-header-title-${this._COMPONENT_RANDOM_ID}{
            height: 35px;
       }
    </style>
   
    <component-button id="component-windwow-window-header-icon-close-${this._COMPONENT_RANDOM_ID}"></component-button>
    
    <component-button id="component-windwow-window-header-icon-resize-${this._COMPONENT_RANDOM_ID}"></component-button>
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_windowBody(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_body        =   data.hasOwnProperty("prop_body") && data.prop_body !=null       ?  data.prop_body        : this._COMPONENT_SLOTS?.body?.[0]?.html ?? "";


            return `
<section data-part-name="${partName}" 
         id="component-windwow-window-body-${this._COMPONENT_RANDOM_ID}" 
         class="overflow-auto px-2" >
         
    <style>
        #${this._COMPONENT_ID} #component-windwow-window-body-${this._COMPONENT_RANDOM_ID}{
            height: calc(100% - 90px);
       }
    </style>
    
    ${prop_body}
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_windowFooter(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_footer        =   data.hasOwnProperty("prop_footer") && data.prop_footer !=null       ?  data.prop_footer        :  this._COMPONENT_SLOTS?.footer?.[0]?.html ?? "";

            return `
<section data-part-name="${partName}" 
         id="component-windwow-window-footer-${this._COMPONENT_RANDOM_ID}" 
         class=" border-top" >
         
    <style>
        #${this._COMPONENT_ID} #component-windwow-window-footer-${this._COMPONENT_RANDOM_ID}{
            height: 55px;
       }
    </style>
    
    ${prop_footer}
    
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    componentFn_render_windowHeaderIconClose(partName) {
        const data = this.getPartProps(partName)

        if (data != null){

            const directionRtl  =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")  ? this._COMPONENT_CONFIG.directionRtl      : false;

            const styles = {
                "top" : "50%" ,
                "transform" : "translate(0, -50%)" ,
            }
            styles[directionRtl ? "left" : "right"] =  "10px";

            new window.ComponentButton(
                `component-windwow-window-header-icon-close-${this._COMPONENT_RANDOM_ID}` ,
                {
                    prop_structureClass:  ["position-absolute"] ,
                    prop_structureStyles: styles ,

                    prop_btnClass: [

                    ],
                    prop_btnStyles: {
                        "width" : "22px" ,
                        "height" : "22px" ,
                        "line-height" : "18px" ,
                        "padding" : "0 !important" ,
                    },

                    prop_title: `&#x00D7;` ,

                    fn_callback: (event) => {
                        this.fn_onCLicCloseWindow(event)
                    }
                }
            )

        }

    }

    componentFn_render_windowHeaderIconResize(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl  =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")  ? this._COMPONENT_CONFIG.directionRtl      : false;

            const prop_showBtnResize  =   data.hasOwnProperty("prop_showBtnResize")       ? data.prop_showBtnResize                  : true;

            if (prop_showBtnResize){
                const styles = {
                    "top" : "50%" ,
                    "transform" : "translate(0, -50%)" ,
                }
                styles[directionRtl ? "left" : "right"] =  "40px";

                new window.ComponentButton(
                    `component-windwow-window-header-icon-resize-${this._COMPONENT_RANDOM_ID}` ,
                    {
                        prop_structureClass:  ["position-absolute"] ,
                        prop_structureStyles: styles ,

                        prop_btnClass: [

                        ],
                        prop_btnStyles: {
                            "width" : "22px" ,
                            "height" : "22px" ,
                            "line-height" : "18px" ,
                            "padding" : "0 !important" ,
                        },

                        prop_title: `🗗` ,

                        fn_callback: (event) => {
                            this.fn_onCLicResizeWindow(event)
                        }
                    }
                )
            }

        }

    }


    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */
    fn_onGetStuctureElement(){
        return document.querySelector(`section#component-${this._COMPONENT_NAME}-structure-${this._COMPONENT_RANDOM_ID}`);
    }
    fn_onGetWindowElement(){
        return document.querySelector(`section#component-windwow-window-${this._COMPONENT_RANDOM_ID}`);
    }

    fn_setUnvisableWindow(){
        const el = this.fn_onGetStuctureElement();
        el.classList.add("d-none");
    }

    fn_onclickWindow(event){
        event.stopImmediatePropagation();
    }


    fn_onRemoveClass(event){
        const elWindow = this.fn_onGetWindowElement();

        elWindow.classList.remove(`window-full-size-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-real-size-${this._COMPONENT_RANDOM_ID}`);

        elWindow.classList.remove(`window-full-size-animation-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-real-size-animation-${this._COMPONENT_RANDOM_ID}`);

        elWindow.classList.remove(`window-visable-animation-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-unvisable-animation-${this._COMPONENT_RANDOM_ID}`);
    }


    fn_onCLicOpenWindow(event){
        this.fn_onRemoveClass();

        const el = this.fn_onGetStuctureElement();
        el.classList.remove("d-none");

        const elWindow = this.fn_onGetWindowElement();
        elWindow.classList.add(`window-visable-animation-${this._COMPONENT_RANDOM_ID}`);

        this._IS_FULL_SIZE = false;
    }

    fn_onCLicCloseWindow(event){
        this.fn_onRemoveClass();

        const elWindow = this.fn_onGetWindowElement();
        elWindow.classList.add(`window-unvisable-animation-${this._COMPONENT_RANDOM_ID}`);

        const el = this.fn_onGetStuctureElement();
        setTimeout(() => {
            el.classList.add("d-none");
        } , 150)

        this._IS_FULL_SIZE = false;
    }

    fn_onCLicResizeWindow(event){
        this.fn_onRemoveClass();

        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_windowWidth")   && data.hasOwnProperty("prop_windowHeight")  ){
            const prop_windowWidth   =  data.prop_windowWidth ;
            const prop_windowHeight  = data.prop_windowHeight ;

            const elWindow = this.fn_onGetWindowElement();
            if (this._IS_FULL_SIZE){
                elWindow.classList.add(`window-real-size-animation-${this._COMPONENT_RANDOM_ID}`);
                elWindow.classList.add(`window-real-size-${this._COMPONENT_RANDOM_ID}`);
                this._IS_FULL_SIZE = false;
            }
            else {
                elWindow.classList.add(`window-full-size-animation-${this._COMPONENT_RANDOM_ID}`);
                elWindow.classList.add(`window-full-size-${this._COMPONENT_RANDOM_ID}`);
                this._IS_FULL_SIZE = true;
            }
        }

    }

    fn_onCLicMinimizeWindow(event){

    }



    call_close(event){
        this.fn_onCLicCloseWindow(event);
    }
    call_open(event){
        this.fn_onCLicOpenWindow(event);
    }
    call_resize(event){
        this.fn_onCLicResizeWindow(event);
    }
    call_minimize(event){
        this.fn_onCLicMinimizeWindow(event);
    }


}