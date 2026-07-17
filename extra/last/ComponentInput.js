class ComponentInputBase extends ComponentBase{

    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_PATTERN = {
        prop_title: {
            prop: "prop_title",
            default: null
        },
        prop_backgroundColorForm: {
            prop: "prop_backgroundColorForm",
            default: tools_const?.styles?.input?.backgroundColor_form ?? ""
        },
        prop_colorIcon: {
            prop: "prop_colorIcon",
            default: tools_const?.styles?.input?.color_icon ?? ""
        },
        prop_size : {
            prop: "prop_size" ,
            default: tools_css.standardSizes.m.name
        } ,
        prop_inputClass: {
            prop: "prop_inputClass",
            default: ["form-control"]
        },
        prop_inputStyles: {
            prop: "prop_inputStyles",
            default: {}
        },
        prop_type: {
            prop: "prop_type",
            default: "string"
        },
        prop_name: {
            prop: "prop_name",
            default: null
        },
        prop_value: {
            prop: "prop_value",
            default: null
        },
        prop_placeholder: {
            prop: "prop_placeholder",
            default: null
        },
        prop_icon: {
            prop: "prop_icon",
            default: null
        },
        prop_btnAddStatus: {
            prop: "prop_btnAddStatus",
            default: false
        },
        prop_isDisable: {
            prop: "prop_isDisable",
            default: false
        },
        prop_btnAddIcon: {
            prop: "prop_btnAddIcon",
            default: "&plus;"
        },
        prop_btnAddTitle: {
            prop: "prop_btnAddTitle",
            default: "add item"
        },
        prop_btnAddClass: {
            prop: "prop_btnAddClass",
            default: []
        },
        prop_isAbsoluteRule: {
            prop: "prop_isAbsoluteRule",
            default: true
        },
        prop_listRules: {
            prop: "prop_listRules",
            default: []
        },
        prop_msgRules: {
            prop: "prop_msgRules",
            default: null
        }
    };

    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = {
        part_structure: [],

        part_label: [

        ],

        part_form: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_backgroundColorForm ,
        ],
        part_input: [
            this._COMPONENT_PATTERN.prop_inputClass,
            this._COMPONENT_PATTERN.prop_inputStyles,
            this._COMPONENT_PATTERN.prop_type,
            this._COMPONENT_PATTERN.prop_name,
            this._COMPONENT_PATTERN.prop_value,
            this._COMPONENT_PATTERN.prop_placeholder,
            this._COMPONENT_PATTERN.prop_icon,
            this._COMPONENT_PATTERN.prop_btnAddStatus,
            this._COMPONENT_PATTERN.prop_isDisable,
            this._COMPONENT_PATTERN.prop_size
        ],

        part_icon_clear: [
            this._COMPONENT_PATTERN.prop_isDisable,
            this._COMPONENT_PATTERN.prop_btnAddStatus,
            this._COMPONENT_PATTERN.prop_size
        ],

        part_icon: [
            this._COMPONENT_PATTERN.prop_icon,
            this._COMPONENT_PATTERN.prop_size,
            this._COMPONENT_PATTERN.prop_colorIcon
        ],

        part_button: [
            this._COMPONENT_PATTERN.prop_btnAddStatus,
            this._COMPONENT_PATTERN.prop_btnAddIcon,
            this._COMPONENT_PATTERN.prop_btnAddTitle,
            this._COMPONENT_PATTERN.prop_btnAddClass,
            this._COMPONENT_PATTERN.prop_size
        ],

        part_validate: [
            this._COMPONENT_PATTERN.prop_isAbsoluteRule,
            this._COMPONENT_PATTERN.prop_listRules,
            this._COMPONENT_PATTERN.prop_msgRules,
            this._COMPONENT_PATTERN.prop_isDisable,
            this._COMPONENT_PATTERN.prop_title
        ]
    };



    /* ---------------------------------------------
   PROPERTYs Schema
   --------------------------------------------- */
    _COMPONENT_SCHEMA = {
        part_structure: {
            part_label: {} ,
            part_form: {
                part_input: {} ,
                part_icon_clear: {} ,
                part_icon: {} ,
                part_button: {} ,
            } ,
            part_validate: {} ,
        } ,
    }

}
window.ComponentInput = class ComponentInput extends ComponentInputBase{

    /* ---------------------------------------------
       SETUP
   --------------------------------------------- */
    constructor(elId , config) {
        super(
            listComponent[ComponentInput.name] ,
            elId
        );
        super.renderComponent(config);
    }


    /* ---------------------------------------------
      TEMPLATEs
    --------------------------------------------- */
    componentFn(){
        this.templateFn("part_label");
        this.templateFn("part_icon_clear");
        this.templateFn("part_icon");
        this.templateFn("part_button");
        this.templateFn("part_validate");
    }

    templateFn(partName = null){
        switch (partName){
            case "part_structure":
                return this.template_render_structure(partName);
            case "part_label":
                return this.componentFn_render_label(partName)
            case "part_form":
                return this.template_render_form(partName);
            case "part_input":
                return this.template_render_input(partName);
            case "part_icon_clear":
                return this.componentFn_render_iconClear(partName);
            case "part_icon":
                return this.componentFn_render_icon(partName);
            case "part_button":
                return this.componentFn_render_button(partName);
            case "part_validate":
                return this.componentFn_render_validate(partName);
            default:
                return this.templateBasic_render(partName);
        }
    }

    template_render_structure() {
        const content = `
         <style>
            @media (max-width: 768px) {
               #${this._COMPONENT_ID} #component-input-button-text-${ this._COMPONENT_RANDOM_ID}{
                    display: none;
               }
               #${this._COMPONENT_ID} #component-input-button-icon-${ this._COMPONENT_RANDOM_ID}{
                 
               }
           }
        </style>

         <component-label id="component-input-label-${this._COMPONENT_RANDOM_ID}"></component-label>

         ${this.templateFn("part_form") ?? ""}

         <component-validate id="component-input-validate-${this._COMPONENT_RANDOM_ID}"></component-validate>
         
                `;
        return this.templateBasic_render_structure(content);
    }

    template_render_form(partName ) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_size                    =  data.hasOwnProperty("prop_size")                      ?  data.prop_size                          :  null;
            const prop_backgroundColorForm     =  data.hasOwnProperty("prop_backgroundColorForm")       ?  data.prop_backgroundColorForm           :  null;

            const elHeight = tools_css.getHeightSize(prop_size);

            return `
<section data-part-name="${partName}" 
         id="component-input-form-${ this._COMPONENT_RANDOM_ID}" 
         class=" position-relative p-0" >
     <style>
         #${this._COMPONENT_ID} #component-input-form-${ this._COMPONENT_RANDOM_ID}{
               height: ${elHeight}px;
               background-color: ${prop_backgroundColorForm};
         }
         
         @media (max-width: 768px) {
               #${this._COMPONENT_ID} #component-input-form-button-text-${ this._COMPONENT_RANDOM_ID}{
                    display: none;
               }
               #${this._COMPONENT_ID} #component-input-form-button-icon-${ this._COMPONENT_RANDOM_ID}{
                 
               }
         }
     </style>
     
          ${this.templateFn("part_input") ?? ""}
     
           <component-icon id="component-input-icon-clear-${this._COMPONENT_RANDOM_ID}" ></component-icon>
     
           <component-icon id="component-input-icon-${this._COMPONENT_RANDOM_ID}" ></component-icon>
           
           <component-button id="component-input-button-${this._COMPONENT_RANDOM_ID}" ></component-button>
           
</section>
            `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_input(partName) {
        const data = this.getPartProps(partName)

        if (data != null){
            const screanWidthType = tools_css.getScreenWidth();

            const prop_inputClass    =   data.hasOwnProperty("prop_inputClass")               ?  data.prop_inputClass                    :  [];
            const prop_inputStyles   =   data.hasOwnProperty("prop_inputStyles")              ?  data.prop_inputStyles                   :  {};
            const prop_type          =   data.hasOwnProperty("prop_type")                     ?  data.prop_type                          :  "string";
            const prop_name          =   data.hasOwnProperty("prop_name")                     ?  data.prop_name                          :  null;
            const prop_value         =   data.hasOwnProperty("prop_value")                    ?  data.prop_value                         :  null;
            const prop_placeholder   =   data.hasOwnProperty("prop_placeholder")              ?  data.prop_placeholder                   :  null;
            const prop_icon          =   data.hasOwnProperty("prop_icon")                     ?  data.prop_icon                          :  "";
            const prop_btnAddStatus  =  data.hasOwnProperty("prop_btnAddStatus")              ?  data.prop_btnAddStatus                  : false;
            const prop_isDisable     =  data.hasOwnProperty("prop_isDisable")                 ?  data.prop_isDisable                     : false;

            const directionRtl       =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl") ? this._COMPONENT_CONFIG.directionRtl      : false;
            const prop_size          =  data.hasOwnProperty("prop_size")                      ?  data.prop_size                          :  0;

            const elfontSize = tools_css.getFontSize(prop_size);
            const elHeight = tools_css.getHeightSize(prop_size);

            let padding = "180px"
            if (screanWidthType == tools_css?.standardScreanWidth?.xs?.name){
                padding = "35px";
            }

            return `
<section  data-part-name="${partName}"
          id="component-input-input-element-${this._COMPONENT_RANDOM_ID}"  
        class="  " >
          
     <style>
         #${this._COMPONENT_ID} #component-input-input-element-${this._COMPONENT_RANDOM_ID}{
          
         }
         #${this._COMPONENT_ID} #component-input-input-${this._COMPONENT_RANDOM_ID}{
            ${directionRtl ? "margin-right" : "margin-left"} : ${prop_icon != null ? "30px" : "0"} ;
            ${directionRtl ? "padding-left" : "padding-right"} : 25px ;
            ${directionRtl ? `right : 0` :`left : 0` };
            width: calc(100% - ${prop_btnAddStatus ? (screanWidthType == tools_css?.standardScreanWidth?.xs?.name ? "30px" : "160px") : "0px"} - ${prop_icon != null ? "30px" : "0px"});
            
            ${prop_icon != null ? (directionRtl ? "border-top-right-radius: 0 !important" : "border-top-left-radius: 0 !important") : ""};
            ${prop_icon != null ? (directionRtl ? "border-bottom-right-radius: 0 !important" : "border-bottom-left-radius: 0 !important") : ""};
           
            ${prop_btnAddStatus  ? (directionRtl ? "border-top-left-radius: 0 !important" : "border-top-right-radius: 0 !important") : ""};
            ${prop_btnAddStatus  ? (directionRtl ? "border-bottom-left-radius: 0 !important" : "border-bottom-right-radius: 0 !important") : ""};
            
            direction: ${directionRtl ? "rtl" : "ltr"} ;
            height: ${elHeight}px;
            line-height: ${elHeight}px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: ${elfontSize}px;
            position: absolute;
            top: 0;
            ${tools_public.renderListStyle(prop_inputStyles)};
         }
     </style>
     
     <input id="component-input-input-${this._COMPONENT_RANDOM_ID}"   
            class=" ${tools_public.renderListClass(prop_inputClass)} d-block ${prop_icon != null ? "border": ""} ${prop_btnAddStatus ? "" : "rounded-0"}"
            name="${prop_name || "" }"  
            type="${prop_type || "" }"  
            value="${prop_value || ""}"
            placeholder="${prop_placeholder || ""}"
            ${prop_isDisable ? 'disabled' : ''}
            onInput="${this.getFn("fn_onInputCallBack" , "event")}"
            onblur="${this.getFn("fn_onBlurCallBack" , "event")}"
            onfocus="${this.getFn("fn_onFocusCallBack" , "event")}"
            />
       
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    componentFn_render_label(partName) {

        this.componentFneBasic_render_structure(
            `component-input-label-${ this._COMPONENT_RANDOM_ID}` ,
            {
                prop_for:  `component-input-input-${this._COMPONENT_RANDOM_ID}` ,
            }
        );
    }

    componentFn_render_iconClear(partName) {

        const data = this.getPartProps(partName)

        if (data != null){

            const prop_isDisable     =  data.hasOwnProperty("prop_isDisable")                 ?  data.prop_isDisable                     : false;
            if (!prop_isDisable){
                const screanWidthType = tools_css.getScreenWidth();

                const directionRtl              =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")  ? this._COMPONENT_CONFIG.directionRtl      : false;
                const prop_btnAddStatus         =  data.hasOwnProperty("prop_btnAddStatus")               ?  data.prop_btnAddStatus                  : false;
                const prop_size                 =  data.hasOwnProperty("prop_size")                      ?  data.prop_size                          :  0;

                let styles = {
                    "font-size" : "20pt",
                    "margin" : "0 10px",
                    "top" : "50%",
                }
                if (directionRtl){
                    if (screanWidthType == tools_css?.standardScreanWidth?.xs?.name){
                        styles["left"]= "0px";
                        styles["transform"]= prop_btnAddStatus ? "translate(30px , -50%)" : "translate(0 , -50%)";
                    }
                    else{
                        styles["left"]=  "0px";
                        styles["transform"]= prop_btnAddStatus ? "translate(160px , -50%)" : "translate(0 , -50%)";
                    }
                }
                else {
                    if (screanWidthType == tools_css?.standardScreanWidth?.xs?.name){
                        styles["right"]=  "0px";
                        styles["transform"]= prop_btnAddStatus ? "translate(-30px , -50%)" : "translate(0 , -50%)";
                    }
                    else{
                        styles["right"]=  "0px";
                        styles["transform"]= prop_btnAddStatus ? "translate(-160px , -50%)" : "translate(0 , -50%)";
                    }
                }


                new window.ComponentIcon(
                    `component-input-icon-clear-${this._COMPONENT_RANDOM_ID}` ,
                    {
                        prop_icon : tools_icons.icon_clear({size : prop_size }),

                        prop_iconClass : ["position-absolute"] ,
                        prop_iconStyles : styles ,

                        fn_callback: (event)=>{
                            this.fn_onClearInput(event);
                        }
                    }
                )


            }

        }
    }

    componentFn_render_icon(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl       =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl") ? this._COMPONENT_CONFIG.directionRtl      : false;
            const prop_icon          =   data.hasOwnProperty("prop_icon")                     ?  data.prop_icon                          :  null;
            const prop_size          =  data.hasOwnProperty("prop_size")                      ?  data.prop_size                          :  null;
            const prop_colorIcon     =  data.hasOwnProperty("prop_colorIcon")                 ?  data.prop_colorIcon                     :  null;

            const elIconHeight = tools_css.getIconSize(prop_size);

            let styles = {
                "z-index": `${ tools_css.getZIndex(tools_css.standardZIndex.tools_btn.name , 10) }`,
                "margin" : "auto",
                "cursor" : "pointer",
                "top" : "50%" ,
                "color" : prop_colorIcon ,
            }
            if (directionRtl){
                styles["right"]= "0";
                styles["transform"]= "translate(-5px , -50%)" ;
            }
            else {
                styles["left"]= "0";
                styles["transform"]= "translate(5px , -50%)" ;
            }


            new window.ComponentIcon(
                `component-input-icon-${this._COMPONENT_RANDOM_ID}` ,
                {
                    prop_icon: prop_icon != null ? (typeof prop_icon == "function" ? pprop_icon(elIconHeight , prop_colorIcon) : prop_icon) : "" ,

                    prop_iconClass : ["position-absolute"] ,
                    prop_iconStyles : styles ,

                    fn_callback: ()=>{
                        this.runFn("fn_onFocusInput" , "event")
                    }
                }
            )

        }
    }

    componentFn_render_button(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const screanWidthType = tools_css.getScreenWidth();

            const prop_btnAddStatus         =  data.hasOwnProperty("prop_btnAddStatus")               ?  data.prop_btnAddStatus                  : false;

            if (prop_btnAddStatus){
                const directionRtl              =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")  ? this._COMPONENT_CONFIG.directionRtl      : false;
                const prop_btnAddIcon           =  data.hasOwnProperty("prop_btnAddIcon")                 ?  data.prop_btnAddIcon                    : "&plus;";
                const prop_btnAddTitle          =  data.hasOwnProperty("prop_btnAddTitle")                ?  data.prop_btnAddTitle                   : "add item";
                const prop_btnAddClass          =  data.hasOwnProperty("prop_btnAddClass")                ?  data.prop_btnAddClass                   : [];
                const prop_size                 =  data.hasOwnProperty("prop_size")                       ?  data.prop_size                          : null;

                let styles =  {
                    "z-index": `${ tools_css.getZIndex(tools_css.standardZIndex.tools_btn.name , 10) }`,
                    "top" : "0" ,
                    "cursor" : "pointer" ,
                };


                if (directionRtl){
                    styles["left"] = "0";

                    styles["border-bottom-right-radius"] = "0 !important";
                    styles["border-top-right-radius"] = "0 !important";
                }
                else {
                    styles["right"] = "0";

                    styles["border-bottom-left-radius"] = "0 !important";
                    styles["border-top-left-radius"] = "0 !important";
                }

                if (screanWidthType == tools_css?.standardScreanWidth?.xs?.name){
                    styles["width"] = "30px";
                }
                else{
                    styles["width"] = "160px";
                }



                new window.ComponentButton(
                    `component-input-button-${this._COMPONENT_RANDOM_ID}` ,
                    {
                        prop_btnClass: "border shadow-sm position-absolute px-3   " + prop_btnAddClass.join(" ") ,
                        prop_btnStyles: styles ,
                        prop_size: prop_size ,
                        prop_title: `
<span id="component-input-button-icon-${ this._COMPONENT_RANDOM_ID}" class="">
    ${prop_btnAddIcon}
</span>
<span  id="component-input-button-text-${ this._COMPONENT_RANDOM_ID}" class=" d-md-inline">
    ${prop_btnAddTitle}
</span>
                    `,

                        fn_callback: (event)=>{
                            this.runFn("fn_clickBtnTools" , "event")
                        }
                    }
                )
            }

        }
    }


    /* ---------------------------------------------
      FUNCTIONs
     --------------------------------------------- */
    fn_getValueInput(){
        return  document.querySelector(`input#component-input-input-${this._COMPONENT_RANDOM_ID}`).value;
    }

    fn_onClearInput(event){
        document.querySelector(`input#component-input-input-${this._COMPONENT_RANDOM_ID}`).value = ""
        this.runFn("fn_onInputCallBack" , "event");
        this.runFn("fn_onFocusInput" , "event");
    }

    fn_onFocusInput(event){
        document.querySelector(`input#component-input-input-${this._COMPONENT_RANDOM_ID}`).focus();
        this.runFn("fn_onFocusCallBack" , "event");
    }

    fn_onInputCallBack(event){
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("fn_oninput") && typeof data.fn_oninput != null){
            data.fn_oninput(event , this.fn_getValueInput());
        }
    }
    fn_onFocusCallBack(event){
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("fn_onfocus") && typeof data.fn_onfocus != null){
            data.fn_onfocus(event , this.fn_getValueInput());
        }
    }
    fn_onBlurCallBack(event){
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("fn_onblur") && typeof data.fn_onblur != null){
            data.fn_onblur(event , this.fn_getValueInput());
        }
    }

    fn_clickBtnTools(event){
        event.stopPropagation();
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("fn_clickBtnTools") && typeof data.fn_clickBtnTools != null){
            data.fn_clickBtnTools(event , this.fn_getValueInput());
        }
    }

    componentFn_render_validate(partName) {
        const data = this.getPartProps(partName);
        if (data != null) {
            const prop_isDisable      = data.hasOwnProperty("prop_isDisable")      ? data.prop_isDisable      : false;
            if (!prop_isDisable) {
                const prop_isAbsoluteRule = data.hasOwnProperty("prop_isAbsoluteRule") ? data.prop_isAbsoluteRule : true;
                const prop_listRules      = data.hasOwnProperty("prop_listRules")      ? data.prop_listRules      : [];
                const prop_msgRules       = data.hasOwnProperty("prop_msgRules")       ? data.prop_msgRules       : null;
                const prop_title          = data.hasOwnProperty("prop_title")          ? data.prop_title          : "";
                if (prop_listRules != null && Array.isArray(prop_listRules) && prop_listRules.length > 0) {
                    new window.ComponentValidate(
                        `component-input-validate-${this._COMPONENT_RANDOM_ID}` ,
                        {
                            prop_reference:  `component-input-input-${this._COMPONENT_RANDOM_ID}` ,
                            prop_isAbsolute: prop_isAbsoluteRule ,
                            prop_listRules ,
                            prop_msgRules ,
                            prop_title
                        }
                    );
                }
            }
        }
    }

}