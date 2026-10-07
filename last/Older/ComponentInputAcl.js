class ComponentInputAclBase extends ComponentBase{

    /* ---------------------------------------------
         PROPERTYs Pattern
  --------------------------------------------- */
    _COMPONENT_PATTERN = {
        prop_size: {
            prop: "prop_size",
            default: tools_css.standardSizes.m.name
        },


        prop_name: {
            prop: "prop_name",
            default: ""
        },
        prop_value: {
            prop: "prop_value",
            default: []
        },

        prop_title: {
            prop: "prop_title",
            default: "title"
        },

        prop_inputClass: {
            prop: "prop_inputClass",
            default: ["form-control" ,"border" , "border-1", "w-100"]
        },
        prop_inputStyles: {
            prop: "prop_inputStyles",
            default: {}
        },

        prop_colorIcon: {
            prop: "prop_colorIcon",
            default: tools_const?.styles?.inputAcl?.color_icon ?? ""
        },


        prop_isDisable: {
            prop: "prop_isDisable",
            default: false
        },

        prop_bodyHeight: {
            prop: "prop_bodyHeight",
            default: 300
        },

        prop_bodyTop: {
            prop: "prop_bodyTop",
            default: 5
        },

        prop_backgroundColorHeaderList: {
            prop: "prop_backgroundColorHeaderList",
            default: tools_const?.styles?.inputAcl?.backgroundColor_headerList ?? ""
        },
        prop_backgroundColorBodyHeader: {
            prop: "prop_backgroundColorBodyHeader",
            default: tools_const?.styles?.inputAcl?.backgroundColor_bodyHeader ?? ""
        },
        prop_backgroundColorBodyFoter: {
            prop: "prop_backgroundColorBodyFoter",
            default: tools_const?.styles?.inputAcl?.backgroundColor_bodyFootrer ?? ""
        },
        prop_borderColorSelector: {
            prop: "prop_borderColorSelector",
            default: tools_const?.styles?.inputAcl?.borderColor_selector ?? ""
        },
        prop_btnColor: {
            prop: "prop_btnColor",
            default: tools_const?.styles?.inputAcl?.color_btn ?? ""
        },


        prop_itemAclColorUnSelected: {
            prop: "prop_itemAclColorUnSelected",
            default: tools_const?.styles?.inputAcl?.color_itemAcl_unSelected ?? ""
        },
        prop_itemAclIconColorUnSelected: {
            prop: "prop_itemAclIconColorUnSelected",
            default: tools_const?.styles?.inputAcl?.iconColor_itemAcl_unSelected ?? ""
        },
        prop_itemAclBorderColorUnSelected: {
            prop: "prop_itemAclBorderColorUnSelected",
            default: tools_const?.styles?.inputAcl?.borderColor_itemAcl_unSelected ?? ""
        },
        prop_itemAclBackgroundColorUnSelected: {
            prop: "prop_itemAclBackgroundColorUnSelected",
            default: tools_const?.styles?.inputAcl?.backgroundColor_itemAcl_unSelected ?? ""
        },
        prop_itemAclColorUnSelectedHover: {
            prop: "prop_itemAclColorUnSelectedHover",
            default: tools_const?.styles?.inputAcl?.color_itemAcl_unSelected_hover ?? ""
        },
        prop_itemAclBackgroundColorUnSelectedHover: {
            prop: "prop_itemAclBackgroundColorUnSelectedHover",
            default: tools_const?.styles?.inputAcl?.backgroundColor_itemAcl_unSelected_hover  ?? ""
        },


        prop_itemAclColorSelected: {
            prop: "prop_itemAclColorSelected",
            default: tools_const?.styles?.inputAcl?.color_itemAcl_selected ?? ""
        },
        prop_itemAclIconColorSelected: {
            prop: "prop_itemAclIconColorSelected",
            default: tools_const?.styles?.inputAcl?.iconColor_itemAcl_selected ?? ""
        },
        prop_itemAclBorderColorSelected: {
            prop: "prop_itemAclBorderColorSelected",
            default: tools_const?.styles?.inputAcl?.borderColor_itemAcl_selected ?? ""
        },
        prop_itemAclBackgroundColorSelected: {
            prop: "prop_itemAclBackgroundColorSelected",
            default: tools_const?.styles?.inputAcl?.backgroundColor_itemAcl_selected ?? ""
        },
        prop_itemAclColorSelectedHover: {
            prop: "prop_itemAclColorSelectedHover",
            default: tools_const?.styles?.inputAcl?.color_itemAcl_selected_hover ?? ""
        },
        prop_itemAclBackgroundColorSelectedHover: {
            prop: "prop_itemAclBackgroundColorSelectedHover",
            default: tools_const?.styles?.inputAcl?.backgroundColor_itemAcl_selected_hover  ?? ""
        },


        prop_langSelected: {
            prop: "prop_langSelected",
            default: component_props.directionRtl ? "fa" : "en"
        } ,
        prop_langs: {
            prop: "prop_langs",
            default: {
                fa: {
                    btn_accept : "تایید" ,
                    btn_cancel : "لغو" ,

                } ,
                en: {
                    btn_accept : "Accept" ,
                    btn_cancel : "Cancel" ,
                }
            }
        },

        prop_requestTimout: {
            prop: "prop_requestTimout",
            default: 400
        } ,

        prop_requestCount: {
            prop: "prop_requestCount",
            default: 100
        } ,

        prop_requestUrl: {
            prop: "prop_requestUrl",
            default: ""
        } ,

        var_itemsSelected: {
            prop: "var_itemsSelected",
            default: []
        } ,
    };

    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = {
        part_structure: [],

        part_label: [

        ],

        part_value: [
            this._COMPONENT_PATTERN.prop_name,
            this._COMPONENT_PATTERN.prop_value,
        ],

        part_header: [
            this._COMPONENT_PATTERN.prop_backgroundColorHeaderList ,
            this._COMPONENT_PATTERN.prop_inputClass ,
            this._COMPONENT_PATTERN.prop_inputStyles ,
            this._COMPONENT_PATTERN.prop_size ,

        ],

        part_header_list: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_value,
        ],

        part_header_icon: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_colorIcon ,
        ],

        part_header_icon_clear: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_colorIcon ,
            this._COMPONENT_PATTERN.prop_isDisable ,
        ],

        part_body: [
            this._COMPONENT_PATTERN.prop_bodyHeight ,
            this._COMPONENT_PATTERN.prop_bodyTop ,
            this._COMPONENT_PATTERN.prop_isDisable ,
        ],

        part_body_form: [
            this._COMPONENT_PATTERN.prop_backgroundColorBodyHeader ,
            this._COMPONENT_PATTERN.prop_backgroundColorBodyFoter ,
            this._COMPONENT_PATTERN.prop_borderColorSelector ,
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_bodyHeight ,
        ],

        part_body_form_searcher: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_colorIcon ,
            this._COMPONENT_PATTERN.prop_requestTimout ,
        ],

        part_body_form_list_acl:[
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_requestCount ,
            this._COMPONENT_PATTERN.prop_requestUrl ,
            this._COMPONENT_PATTERN.prop_itemAclColorUnSelected ,
            this._COMPONENT_PATTERN.prop_itemAclBackgroundColorUnSelected ,
            this._COMPONENT_PATTERN.prop_itemAclIconColorUnSelected ,
            this._COMPONENT_PATTERN.prop_itemAclBorderColorUnSelected ,
            this._COMPONENT_PATTERN.prop_itemAclColorUnSelectedHover ,
            this._COMPONENT_PATTERN.prop_itemAclBackgroundColorUnSelectedHover ,
        ] ,

        part_body_form_list_selected:[
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_itemAclColorSelected ,
            this._COMPONENT_PATTERN.prop_itemAclBackgroundColorSelected ,
            this._COMPONENT_PATTERN.prop_itemAclIconColorSelected ,
            this._COMPONENT_PATTERN.prop_itemAclBorderColorSelected ,
            this._COMPONENT_PATTERN.prop_itemAclColorSelectedHover ,
            this._COMPONENT_PATTERN.prop_itemAclBackgroundColorSelectedHover ,
            this._COMPONENT_PATTERN.prop_value,
        ] ,


        part_body_form_icon_select_all: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_btnColor ,
        ],

        part_body_form_icon_clear_all: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_btnColor ,
        ],

        part_body_form_btn_accept: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_langSelected ,
            this._COMPONENT_PATTERN.prop_langs ,
        ],

        part_body_form_btn_cancel: [
            this._COMPONENT_PATTERN.prop_size ,
            this._COMPONENT_PATTERN.prop_langSelected ,
            this._COMPONENT_PATTERN.prop_langs ,
        ],

    };


    /* ---------------------------------------------
   PROPERTYs Schema
   --------------------------------------------- */
    _COMPONENT_SCHEMA = {
        part_structure: {
            part_value: {} ,
            part_label: {} ,
            part_header: {
                part_header_icon: {} ,
                part_header_icon_clear: {} ,
                part_header_list: {} ,
            } ,
            part_body: {
                part_body_form:{
                    part_body_form_searcher:{} ,
                    part_body_form_list_acl:{} ,
                    part_body_form_list_selected:{} ,
                    part_body_form_icon_select_all:{} ,
                    part_body_form_icon_clear_all:{} ,
                    part_body_form_btn_accept:{} ,
                    part_body_form_btn_cancel:{} ,
                }
            } ,
        } ,
    }

}
window.ComponentInputAcl = class ComponentInputAcl extends ComponentInputAclBase {

    _SHOW_BODY = false;
    _LIST_ACL = [];
    _LIST_VALUE_TEMPLATE = [];
    _REQUEST_ACL_PAGE = 1;
    _REQUEST_ACL_SEARCH = "";
    _REQUEST_TIMEOUT = null;
    _REQUEST_LOADING = false;
    _REQUEST_FINISH = false;

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(elId , config) {
        super(
            listComponent[ComponentInputAcl.name] ,
            elId
        );
        super.renderComponent(config);
    }


    /* ---------------------------------------------
      TEMPLATEs
    --------------------------------------------- */
    componentFn(screanWidthType){
        this.templateFn("part_label");
        this.templateFn("part_header_icon");
        this.templateFn("part_header_icon_clear");
        this.templateFn("part_body");
        this.templateFn("part_body_form_searcher");
        this.templateFn("part_body_form_icon_select_all");
        this.templateFn("part_body_form_icon_clear_all");
        this.templateFn("part_body_form_btn_accept");
        this.templateFn("part_body_form_btn_cancel");
    }
    templateFn(partName = null){
        switch (partName){
            case "part_structure":
                return this.template_render_structure(partName);
            case "part_value":
                return this.template_render_value(partName);
            case "part_header":
                return this.template_render_header(partName);
            case "part_header_list":
                return this.template_render_headerList(partName);
            case "part_body_form":
                return this.template_render_bodyForm(partName);
            case "part_body_form_list_acl":
                return this.template_render_bodyFormListAcl(partName);
            case "part_body_form_list_selected":
                return this.template_render_bodyFormListSelected(partName);
            case "part_label":
                return this.componentFn_render_label(partName);
            case "part_header_icon":
                return this.componentFn_render_headerIcon(partName);
            case "part_header_icon_clear":
                return this.componentFn_render_headerIconClear(partName);
            case "part_body":
                return this.componentFn_render_body(partName);
            case "part_body_form_searcher":
                return this.componentFn_render_bodyFormSearcher(partName);
            case "part_body_form_icon_select_all":
                return this.componentFn_render_bodyFormIconSelectAll(partName);
            case "part_body_form_icon_clear_all":
                return this.componentFn_render_bodyFormIconClearAll(partName);
            case "part_body_form_btn_accept":
                return this.componentFn_render_bodyFormBtnAccept(partName);
            case "part_body_form_btn_cancel":
                return this.componentFn_render_bodyFormBtnCancel(partName);
            default:
                return this.templateBasic_render();
        }
    }

    template_render_structure(partName ) {
        const content = `
        <component-label id="component-input-acl-label-${ this._COMPONENT_RANDOM_ID}"></component-label>
     
        ${this.templateFn("part_value")}
        
        ${this.templateFn("part_header")}
        
        <section class="position-relative">
           <component-position-element id="component-input-acl-body-${ this._COMPONENT_RANDOM_ID}">
               <component-body>
                   ${this.templateFn("part_body_form")}
               </component-body>
           </component-position-element>
        </section>
      
        <component-validate id="component-input-acl-validate-${this._COMPONENT_RANDOM_ID}"></component-validate>
      
                `;
        return this.templateBasic_render_structure(content);
    }

    template_render_value(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_name  =   data.hasOwnProperty("prop_name")       ?  data.prop_name     :  "";
            const prop_value =   data.hasOwnProperty("prop_value")      ?  data.prop_value    :  [];

            return `
<section  data-part-name="${partName}"
          id="component-input-acl-value-${this._COMPONENT_RANDOM_ID}"  
          class="" >
          
     <style>
         #${this._COMPONENT_ID} #component-input-acl-value-${this._COMPONENT_RANDOM_ID}{
         
         }
     </style>
     
     <input id="component-input-color-value-${ this._COMPONENT_RANDOM_ID}-input-value" name="${prop_name}"  value='${prop_value != null ? JSON.stringify(prop_value) : '[]'}' type="hidden"/>

</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_header(partName ) {
        const data = this.getPartProps(partName)

        if (data != null){
            const screanWidthType = tools_css.getScreenWidth();

            const directionRtl                           =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")                     ? this._COMPONENT_CONFIG.directionRtl       : false;
            const prop_inputClass                        =   data.hasOwnProperty("prop_inputClass")                                   ?  data.prop_inputClass                     :  [];
            const prop_inputStyles                       =   data.hasOwnProperty("prop_inputStyles")                                  ?  data.prop_inputStyles                    :  {};
            const prop_size                              =   data.hasOwnProperty("prop_size")                                         ?  data.prop_size                           : null;
            const prop_backgroundColorHeaderList         =   data.hasOwnProperty("prop_backgroundColorHeaderList")                    ?  data.prop_backgroundColorHeaderList      : "";

            let elHeight = tools_css.getHeightSize(prop_size);
            let elFontSize = tools_css.getFontSize(prop_size);

            return `
<section  data-part-name="${partName}"
          id="component-input-acl-header-${this._COMPONENT_RANDOM_ID}"  
          class="${tools_public.renderListClass(prop_inputClass)} position-relative p-0"  >
          
     <style>
         #${this._COMPONENT_ID} #component-input-acl-header-${this._COMPONENT_RANDOM_ID}{
              cursor:                                                pointer;
              height:                                                ${elHeight}px;
              border-radius:                                         0 !important;
              background-color:                                      ${prop_backgroundColorHeaderList};
              ${tools_public.renderListStyle(prop_inputStyles)};
         }
     </style>
     
     ${this.templateFn("part_header_list")}
       
     <component-icon id="component-input-acl-icon-${this._COMPONENT_RANDOM_ID}" ></component-icon>
     <component-icon id="component-input-acl-icon-clear-${this._COMPONENT_RANDOM_ID}" ></component-icon>
   
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_headerList(partName ) {
        const data = this.getPartProps(partName)

        if (data != null){
            const screanWidthType = tools_css.getScreenWidth();

            const directionRtl                           =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")                     ? this._COMPONENT_CONFIG.directionRtl       : false;
            const prop_size                              =   data.hasOwnProperty("prop_size")                                         ?  data.prop_size                           : null;
            const prop_value                             =   data.hasOwnProperty("prop_value")                                        ?  data.prop_value                          : [];

            let elHeight = tools_css.getHeightSize(prop_size);
            let elFontSize = tools_css.getFontSize(prop_size);
            const valStr = this.fn_readyListStrAcls(prop_value);

            return `
<section  data-part-name="${partName}"
          id="component-input-acl-header-list-${this._COMPONENT_RANDOM_ID}"  
          class="bg-white" 
          onclick="${this.getFn("fn_setStatusShowBody" , "event")}" >
          
     <style>
         #${this._COMPONENT_ID} #component-input-acl-header-list-${this._COMPONENT_RANDOM_ID}{
              ${directionRtl ? "margin-right" : "margin-left"} :     30px;
              ${directionRtl ? "padding-right" : "padding-left"} :   10px;
              ${directionRtl ? "padding-left" : "padding-right"} :   40px;
              height:                                                100%;
              font-size:                                             ${elFontSize}px;
              white-space:                                           nowrap;        
              overflow:                                              hidden;      
              text-overflow:                                         ellipsis;   
         }
     </style>
     
     <b>${valStr}</b>
  
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_bodyForm(partName ) {
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_backgroundColorBodyHeader          =   data.hasOwnProperty("prop_backgroundColorBodyHeader")            ?  data.prop_backgroundColorBodyHeader         : "";
            const prop_backgroundColorBodyFoter           =   data.hasOwnProperty("prop_backgroundColorBodyFoter")             ?  data.prop_backgroundColorBodyFoter          : "";
            const prop_borderColorSelector                =   data.hasOwnProperty("prop_borderColorSelector")                  ?  data.prop_borderColorSelector               : "";
            const prop_size                               =   data.hasOwnProperty("prop_size")                                 ?  data.prop_size                              : null;
            const prop_bodyHeight                         =   data.hasOwnProperty("prop_bodyHeight")                           ?  data.prop_bodyHeight                        : 200;

            const elHeight = tools_css.getHeightSize(prop_size);

            return `
<section  data-part-name="${partName}"
          id="component-input-acl-header-body-form-${this._COMPONENT_RANDOM_ID}"  
          class="" >
          
     <style>
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-${this._COMPONENT_RANDOM_ID}{
              height:           ${prop_bodyHeight}px;
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-header-${this._COMPONENT_RANDOM_ID}{
              height:           ${elHeight+15}px;
              background-color: ${prop_backgroundColorBodyHeader};
              padding:          5px 10px;
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-body-${this._COMPONENT_RANDOM_ID}{
              height:           calc(100% - ${elHeight+15}px - ${elHeight+15}px);
              padding:          5px 5px;
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-body-acl-${this._COMPONENT_RANDOM_ID}{
              height:           100%;
              border:           solid 1px ${prop_borderColorSelector};
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-body-controler-${this._COMPONENT_RANDOM_ID}{
              height:           100%;
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-body-selector-${this._COMPONENT_RANDOM_ID}{
              height:           100%;
              border:           solid 1px ${prop_borderColorSelector};
         }
        
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-footer-${this._COMPONENT_RANDOM_ID}{
              height:           ${elHeight+15}px;
              background-color: ${prop_backgroundColorBodyFoter};
              padding:          5px 10px;
         }
     </style>
     
     <div id="component-input-acl-header-body-form-header-${this._COMPONENT_RANDOM_ID}" class="">
         <component-input id="component-input-acl-header-body-form-header-searcher-${this._COMPONENT_RANDOM_ID}"></component-input>
     </div>
     
     <div id="component-input-acl-header-body-form-body-${this._COMPONENT_RANDOM_ID}" class="row px-0 py-2 my-0 mx-2">
         <div id="component-input-acl-header-body-form-body-acl-${this._COMPONENT_RANDOM_ID}" class="col-5 p-0"  >
                 ${this.templateFn("part_body_form_list_acl")}
         </div>
         <div id="component-input-acl-header-body-form-body-controler-${this._COMPONENT_RANDOM_ID}" class="col-2 position-relative">
               <component-button id="component-input-acl-header-body-form-body-select-all-${this._COMPONENT_RANDOM_ID}" ></component-button>
               <component-button id="component-input-acl-header-body-form-body-clear-all-${this._COMPONENT_RANDOM_ID}" ></component-button>
         </div>
         <div id="component-input-acl-header-body-form-body-selector-${this._COMPONENT_RANDOM_ID}" class="col-5 p-0">
                 ${this.templateFn("part_body_form_list_selected")}
         </div>
     </div>
  
     <div id="component-input-acl-header-body-form-footer-${this._COMPONENT_RANDOM_ID}" class="row px-0 px-0 py-2 m-0 ">
         <div class="col-6">
             <component-button id="component-input-acl-header-body-form-footer-btn-cancel-${this._COMPONENT_RANDOM_ID}"></component-button>
         </div>
         <div class="col-6">
             <component-button id="component-input-acl-header-body-form-footer-btn-accept-${this._COMPONENT_RANDOM_ID}"></component-button>
         </div>
        
     </div>
  
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_bodyFormListAcl(partName ) {
        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl                                      =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")                ? this._COMPONENT_CONFIG.directionRtl                    : false;
            const prop_size                                         =   data.hasOwnProperty("prop_size")                                    ?  data.prop_size                                        : null;
            const prop_itemAclColorUnSelected                       =   data.hasOwnProperty("prop_itemAclColorUnSelected")                  ?  data.prop_itemAclColorUnSelected                      : "";
            const prop_itemAclBackgroundColorUnSelected             =   data.hasOwnProperty("prop_itemAclBackgroundColorUnSelected")        ?  data.prop_itemAclBackgroundColorUnSelected            : "";
            const prop_itemAclBorderColorUnSelected                 =   data.hasOwnProperty("prop_itemAclBorderColorUnSelected")            ?  data.prop_itemAclBorderColorUnSelected                : "";
            const prop_itemAclColorUnSelectedHover                  =   data.hasOwnProperty("prop_itemAclColorUnSelectedHover")             ?  data.prop_itemAclColorUnSelectedHover                 : "";
            const prop_itemAclBackgroundColorUnSelectedHover        =   data.hasOwnProperty("prop_itemAclBackgroundColorUnSelectedHover")   ?  data.prop_itemAclBackgroundColorUnSelectedHover       : "";

            const elHeight = tools_css.getHeightSize(prop_size);
            const elFontSize = tools_css.getFontSize(prop_size);

            return `
<section  data-part-name="${partName}"
          id="component-input-acl-header-body-form-list-acl-${this._COMPONENT_RANDOM_ID}"  
          class="p-1 position-relative w-100 h-100 " >
          
     <style>
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-acl-${this._COMPONENT_RANDOM_ID}{
              
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-acl-scroller-${this._COMPONENT_RANDOM_ID}{
              overflow:           auto;
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-acl-inside-${this._COMPONENT_RANDOM_ID}{
            
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-acl-inside-${this._COMPONENT_RANDOM_ID} .item-acl{
              border:              1px  solid ${prop_itemAclBorderColorUnSelected};
              background-color:    ${prop_itemAclBackgroundColorUnSelected};
              color:               ${prop_itemAclColorUnSelected};
              height:              ${elHeight}px;
              line-height:         ${elHeight}px;
              font-size:           ${elFontSize};
              padding:             0   5px;
              margin:              5px 0px;
              cursor:              pointer
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-acl-inside-${this._COMPONENT_RANDOM_ID} .item-acl:hover{
              background-color:    ${prop_itemAclBackgroundColorUnSelectedHover};
              color:               ${prop_itemAclColorUnSelectedHover};
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-acl-inside-${this._COMPONENT_RANDOM_ID} .item-acl i{
              top:                                         50%;
              ${directionRtl ? "left" : "right"} :         0;
              transform:                                   translate(${directionRtl ? "15px" : "-15px"} , -50%);
         }
     </style>
     
     <component-loading id="component-input-acl-header-body-list-acl-loading-${this._COMPONENT_RANDOM_ID}"></component-loading>
     
     <div id="component-input-acl-header-body-form-list-acl-scroller-${this._COMPONENT_RANDOM_ID}" class="w-100 h-100"  onscroll="${this.getFn("fn_scrollListAcl" , "event")}">
         <div id="component-input-acl-header-body-form-list-acl-inside-${this._COMPONENT_RANDOM_ID}" class="w-100" ></div>
     </div>
     
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_bodyFormListSelected(partName ) {
        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl                                    =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")              ? this._COMPONENT_CONFIG.directionRtl                  : false;
            const prop_size                                       =   data.hasOwnProperty("prop_size")                                  ?  data.prop_size                                      : null;
            const prop_itemAclColorSelected                       =   data.hasOwnProperty("prop_itemAclColorSelected")                  ?  data.prop_itemAclColorSelected                      : "";
            const prop_itemAclBackgroundColorSelected             =   data.hasOwnProperty("prop_itemAclBackgroundColorSelected")        ?  data.prop_itemAclBackgroundColorSelected            : "";
            const prop_itemAclBorderColorSelected                 =   data.hasOwnProperty("prop_itemAclBorderColorSelected")            ?  data.prop_itemAclBorderColorSelected                : "";
            const prop_itemAclColorSelectedHover                  =   data.hasOwnProperty("prop_itemAclColorSelectedHover")             ?  data.prop_itemAclColorSelectedHover                 : "";
            const prop_itemAclBackgroundColorSelectedHover        =   data.hasOwnProperty("prop_itemAclBackgroundColorSelectedHover")   ?  data.prop_itemAclBackgroundColorSelectedHover       : "";

            const elHeight = tools_css.getHeightSize(prop_size);
            const elFontSize = tools_css.getFontSize(prop_size);

            return `
<section  data-part-name="${partName}"
          id="component-input-acl-header-body-form-list-selected-${this._COMPONENT_RANDOM_ID}"  
          class="px-1 py-0" >
          
     <style>
          #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-selected-${this._COMPONENT_RANDOM_ID}{
              
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-selected-scroller-${this._COMPONENT_RANDOM_ID}{
              overflow:           auto;
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-selected-inside-${this._COMPONENT_RANDOM_ID}{
            
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-selected-inside-${this._COMPONENT_RANDOM_ID} .item-selected{
              border:              1px  solid ${prop_itemAclBorderColorSelected};
              background-color:    ${prop_itemAclBackgroundColorSelected};
              color:               ${prop_itemAclColorSelected};
              height:              ${elHeight}px;
              line-height:         ${elHeight}px;
              font-size:           ${elFontSize};
              padding:             0   5px;
              margin:              5px 0px;
              cursor:              pointer
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-selected-inside-${this._COMPONENT_RANDOM_ID} .item-selected:hover{
              background-color:    ${prop_itemAclBackgroundColorSelectedHover};
              color:               ${prop_itemAclColorSelectedHover};
         }
         #${this._COMPONENT_ID} #component-input-acl-header-body-form-list-selected-inside-${this._COMPONENT_RANDOM_ID} .item-selected i{
              top:                                         50%;
              ${directionRtl ? "left" : "right"} :         0;
              transform:                                   translate(${directionRtl ? "15px" : "-15px"} , -50%);
         }
     </style>
     
   
     <div id="component-input-acl-header-body-form-list-selected-scroller-${this._COMPONENT_RANDOM_ID}" class="w-100 h-100" >
         <div id="component-input-acl-header-body-form-list-selected-inside-${this._COMPONENT_RANDOM_ID}" class="w-100" ></div>
     </div>
     
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    componentFn_render_label(partName ) {
        this.componentFneBasic_render_structure(
            `component-input-acl-label-${ this._COMPONENT_RANDOM_ID}` ,
            {
                fn_callback: (event)=>{
                    this.fn_setStatusShowBody(event)
                }
            }
        );
    }

    componentFn_render_headerIcon(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl       =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl") ? this._COMPONENT_CONFIG.directionRtl      : false;
            const prop_icon          =   data.hasOwnProperty("prop_icon")                     ?  data.prop_icon                          : null;
            const prop_size          =   data.hasOwnProperty("prop_size")                     ?  data.prop_size                          : null;
            const prop_colorIcon     =   data.hasOwnProperty("prop_colorIcon")                ?  data.prop_colorIcon                     : null;

            let styles = {
                "z-index": `${ tools_css.getZIndex(tools_css.standardZIndex.icon_attach.name , 5) }`,
                "cursor" : "pointer",
                "top" : "50%" ,
            }
            if (directionRtl){
                styles["right"]= "0"
                styles["transform"]= "translate(-5px, -50%)";
            }
            else {
                styles["left"]= "0";
                styles["transform"]= "translate(5px, -50%)";
            }

            new window.ComponentIcon(
                `component-input-acl-icon-${this._COMPONENT_RANDOM_ID}` ,
                {
                    prop_icon: tools_icons.icon_input_acl({size : prop_size /*, colors: {primary:prop_colorIcon}*/} )  ,

                    prop_iconClass : ["position-absolute"] ,
                    prop_iconStyles : styles ,

                    fn_callback: (event)=>{
                        this.fn_setStatusShowBody(event)
                    }
                }
            )

        }
    }

    componentFn_render_headerIconClear(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_isDisable     =  data.hasOwnProperty("prop_isDisable")                 ?  data.prop_isDisable                     : false;

            if (!prop_isDisable){
                const prop_size          =   data.hasOwnProperty("prop_size")                     ?  data.prop_size                                         : null;
                const directionRtl       =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl") ? this._COMPONENT_CONFIG.directionRtl                     : false;
                const prop_colorIcon     =   data.hasOwnProperty("prop_colorIcon")                ?  data.prop_colorIcon                     : null;

                let styles = {
                    "z-index": `${ tools_css.getZIndex(tools_css.standardZIndex.icon_attach.name , 5) }`,
                    "width" :   "35px",
                    "cursor" : "pointer",
                    "top" : "50%" ,
                    "transform" : "translate(0 , -50%)" ,
                };

                if (directionRtl){
                    styles["left"]= "0";
                }
                else {
                    styles["right"]= "0";
                }


                new window.ComponentIcon(
                    `component-input-acl-icon-clear-${this._COMPONENT_RANDOM_ID}` ,
                    {
                        styles: {}  ,

                        prop_iconClass : ["position-absolute"] ,
                        prop_iconStyles : styles ,
                        prop_icon : tools_icons.icon_clear({size : prop_size /*, colors: {primary:prop_colorIcon}*/}  ),

                        fn_callback: (event)=>{
                            this.fn_clearAcl(event)
                        }
                    }
                )
            }


        }
    }

    componentFn_render_body(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_isDisable     =  data.hasOwnProperty("prop_isDisable")                 ?  data.prop_isDisable                     : false;

            if (!prop_isDisable){
                const prop_bodyHeight  =   data.hasOwnProperty("prop_bodyHeight")             ?  data.prop_bodyHeight               : 200;
                const prop_bodyTop     =   data.hasOwnProperty("prop_bodyTop")                ?  data.prop_bodyTop                  : 0;

                new window.ComponentPositionElement(
                    `component-input-acl-body-${ this._COMPONENT_RANDOM_ID}` ,
                    {
                        classList: this.var_showFormSelectOption ? "" : "d-none" ,

                        prop_elementClass: ["border", "shadow-sm", "bg-white", "p-0", "rounded-0"] ,
                        prop_height: prop_bodyHeight+"px",
                        prop_minWidth: 350,
                        prop_positionTop: prop_bodyTop,
                    }
                )
            }


        }
    }

    componentFn_render_bodyFormSearcher(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_isDisable     =  data.hasOwnProperty("prop_isDisable")                 ?  data.prop_isDisable                     : false;

            if (!prop_isDisable){
                const prop_size              =   data.hasOwnProperty("prop_size")             ?  data.prop_size               : null;
                const prop_colorIcon         =   data.hasOwnProperty("prop_colorIcon")        ?  data.prop_colorIcon          : 0;
                const prop_requestTimout     =   data.hasOwnProperty("prop_requestTimout")    ?  data.prop_requestTimout      : 500;

                new window.ComponentInput(
                    `component-input-acl-header-body-form-header-searcher-${ this._COMPONENT_RANDOM_ID}` ,
                    {

                        prop_show_label: false ,
                        prop_icon: tools_icons.icon_search({size : prop_size /*, colors: {primary:prop_colorIcon}*/}  ) ,

                        fn_oninput: (event , value) => {
                            this._REQUEST_ACL_SEARCH = value;
                            this._REQUEST_ACL_PAGE = 1;
                            this._REQUEST_FINISH = false;
                            if ( this._REQUEST_TIMEOUT != null) clearTimeout( this._REQUEST_TIMEOUT)
                            this._REQUEST_TIMEOUT = setTimeout(()=>{
                                this.fn_clearListAcl()
                                this.fn_sendRequestAcl(event);
                            } , prop_requestTimout)
                        } ,
                    }
                )
            }


        }
    }

    componentFn_render_bodyFormIconSelectAll(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const directionRtl       =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl") ? this._COMPONENT_CONFIG.directionRtl       : false;

            const prop_icon          =   data.hasOwnProperty("prop_icon")                     ?  data.prop_icon                          : null;
            const prop_size          =   data.hasOwnProperty("prop_size")                     ?  data.prop_size                          : null;
            const prop_btnColor      =   data.hasOwnProperty("prop_btnColor")                 ?  data.prop_btnColor                      : null;

            let styles = {
                "z-index":    `${ tools_css.getZIndex(tools_css.standardZIndex.icon_attach.name , 5) }`,
                "cursor" :    "pointer",
                "top" :       "45%" ,
                "left" :      "50%" ,
                "transform" : "translate(-50%, -50%)" ,
            }

            new window.ComponentButton(
                `component-input-acl-header-body-form-body-select-all-${this._COMPONENT_RANDOM_ID}` ,
                {
                    prop_title: directionRtl ? tools_icons.icon_selectAllLeft({size : prop_size /*, colors: {primary:prop_btnColor}*/} ) : tools_icons.icon_selectAllRight({size : prop_size /*, colors: {primary:prop_btnColor}*/})   ,

                    prop_btnClass : ["position-absolute"] ,
                    prop_btnStyles : styles ,

                    fn_callback: (event)=>{
                        this.fn_selectAllAcl();
                    }
                }
            )

        }
    }

    componentFn_render_bodyFormIconClearAll(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_icon          =   data.hasOwnProperty("prop_icon")                     ?  data.prop_icon                          : null;
            const prop_size          =   data.hasOwnProperty("prop_size")                     ?  data.prop_size                          : null;
            const prop_btnColor      =   data.hasOwnProperty("prop_btnColor")                 ?  data.prop_btnColor                      : null;

            let styles = {
                "z-index":    `${ tools_css.getZIndex(tools_css.standardZIndex.icon_attach.name , 5) }`,
                "cursor" :    "pointer",
                "top" :       "65%" ,
                "left" :      "50%" ,
                "transform" : "translate(-50%, -50%)" ,
            }

            new window.ComponentButton(
                `component-input-acl-header-body-form-body-clear-all-${this._COMPONENT_RANDOM_ID}` ,
                {
                    prop_title: tools_icons.icon_clear_broom({size : prop_size /*, colors: {primary:prop_btnColor}*/}  )  ,

                    prop_btnClass : ["position-absolute"] ,
                    prop_btnStyles : styles ,

                    fn_callback: (event)=>{
                        this.fn_clearAllAcl()
                    }
                }
            )

        }
    }

    componentFn_render_bodyFormBtnAccept(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_size              =     data.hasOwnProperty("prop_size")          ?  data.prop_size               :  null;
            const prop_langs             =     data.hasOwnProperty("prop_langs")         ?  data.prop_langs              :  null;
            const prop_langSelected      =     data.hasOwnProperty("prop_langSelected")  ?  data.prop_langSelected       :  null;

            let titleBtnAccept  = [];
            if (prop_langs != null && prop_langSelected != null && prop_langs.hasOwnProperty(prop_langSelected)){
                const langs = prop_langs[prop_langSelected];
                titleBtnAccept = langs?.btn_accept ?? ""
            }

            new window.ComponentButton(
                `component-input-acl-header-body-form-footer-btn-accept-${this._COMPONENT_RANDOM_ID}` ,
                {
                    classList: "" ,

                    prop_title : titleBtnAccept ,
                    prop_btnStyles : {

                    } ,
                    prop_btnType: "button" ,

                    fn_callback: (event)=>{
                        this.fn_acceptAclSelected(event);
                    }
                }
            )
        }
    }

    componentFn_render_bodyFormBtnCancel(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_size              =     data.hasOwnProperty("prop_size")          ?  data.prop_size               :  null;
            const prop_langs             =     data.hasOwnProperty("prop_langs")         ?  data.prop_langs              :  null;
            const prop_langSelected      =     data.hasOwnProperty("prop_langSelected")  ?  data.prop_langSelected       :  null;

            let titleBtnCancel  = [];
            if (prop_langs != null && prop_langSelected != null && prop_langs.hasOwnProperty(prop_langSelected)){
                const langs = prop_langs[prop_langSelected];
                titleBtnCancel = langs?.btn_cancel ?? ""
            }

            new window.ComponentButton(
                `component-input-acl-header-body-form-footer-btn-cancel-${this._COMPONENT_RANDOM_ID}` ,
                {
                    classList: "" ,

                    prop_title : titleBtnCancel ,
                    prop_btnStyles : {

                    } ,
                    prop_type: "back" ,
                    prop_btnType: "button" ,

                    fn_callback: (event)=>{
                        this.fn_cancelAclSelected(event);

                    }
                }
            )
        }
    }




    /* ---------------------------------------------
      FUNCTIONs
     --------------------------------------------- */

    fn_getElBody(){
        return document.querySelector(`#component-input-acl-body-${ this._COMPONENT_RANDOM_ID}`)
    }

    fn_getElListAcl(){
        return document.querySelector(`#component-input-acl-header-body-form-list-acl-inside-${ this._COMPONENT_RANDOM_ID}`)
    }

    fn_getElListSelected(){
        return document.querySelector(`#component-input-acl-header-body-form-list-selected-inside-${ this._COMPONENT_RANDOM_ID}`)
    }

    fn_readyListStrAcls(prop_value){
        let resultExp = "";
        if (prop_value == null){
            prop_value = [];
        }

        if (prop_value != null && Array.isArray(prop_value)){
            for (let i = 0; i < prop_value.length; i++) {
                const itemValue = prop_value[i];
                if (itemValue != null && itemValue.hasOwnProperty("name")){
                    resultExp += itemValue["name"] + ", "
                }
            }
        }

        return resultExp;
    }

    fn_clearAcl(event){
        this.set("prop_value" , []);
        this.fn_callback();
    }

    fn_acceptAclSelected(event){
        this.fn_setStatusShowBody(event , false);
        this.fn_callback();

        this.set("prop_value" , this.fn_getListTempItemsSelected());
    }
    fn_cancelAclSelected(event){
        this.fn_setStatusShowBody(event);
        this.fn_clearListSelected();
    }

    fn_setStatusShowBody(event , status=null){
        const elBody = this.fn_getElBody();
        if (status != null ){
            if ( status){
                elBody.classList.remove("d-none");
            }
            else{
                elBody.classList.add("d-none");
            }
        }
        else{
            if ( this._SHOW_BODY){
                elBody.classList.add("d-none");
            }
            else{
                elBody.classList.remove("d-none");
            }
        }

        this._SHOW_BODY =  status == null ? !this._SHOW_BODY : status;
        if(this._SHOW_BODY){
            this.fn_startFormAcl();
        }
    }

    fn_startFormAcl(){
        this._LIST_ACL = [];
        this._REQUEST_ACL_PAGE = 1;
        this._REQUEST_FINISH = false;
        this.fn_clearListAcl();
        this.fn_sendRequestAcl(event);
        this.fn_readyFirstTimeOpenSelected();
    }

    fn_readyFirstTimeOpenSelected(){
        const data = this._COMPONENT_CONFIG;
        const prop_value  =   data.hasOwnProperty("prop_value")         ?  data.prop_value      : [];
        const listSelected = this.fn_getElListSelected();
        if (prop_value != null){
            for (let i = 0; i < prop_value.length; i++) {
                const itemValue = prop_value[i];
                if (itemValue != null && itemValue.hasOwnProperty("id") && itemValue.hasOwnProperty("name")){
                    const elNew =  this.fn_createElSelected(itemValue);
                    if(elNew != null) listSelected.innerHTML += elNew;
                }
            }
        }
    }

    fn_scrollListAcl(event){
        const container = event.target;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        if (scrollTop + clientHeight + 50 >= scrollHeight && !this._REQUEST_LOADING) {
            this.fn_sendRequestAcl(event);
        }
    }

    fn_sendRequestAcl(event){
        const data = this._COMPONENT_CONFIG;
        const prop_requestCount  =   data.hasOwnProperty("prop_requestCount")  ?  data.prop_requestCount    : 100;
        const prop_requestUrl    =   data.hasOwnProperty("prop_requestUrl")    ?  data.prop_requestUrl      : "";

        if (!this._REQUEST_FINISH){
            this._REQUEST_LOADING = true;
            tools_submit.fetcth(
                prop_requestUrl,
                {

                    //prop_size ,
                    data: {
                        contentType: tools_const.contentTypes.json ,
                        data: [
                            {"name" : "count"   , "value" : prop_requestCount} ,
                            {"name" : "search"  , "value" : this._REQUEST_ACL_SEARCH} ,
                            {"name" : "page"    , "value" : this._REQUEST_ACL_PAGE} ,
                        ]
                    },
                    componentLoadingData:  {elId: `component-input-acl-header-body-list-acl-loading-${this._COMPONENT_RANDOM_ID}`},
                    callback:(response , request)=>{
                        this._REQUEST_LOADING = false;
                        if (response == null || response.length == 0){
                            this._REQUEST_FINISH = true;
                        }
                        else{
                            this._REQUEST_ACL_PAGE += 1;
                            this._LIST_ACL.push(...response);
                            this.fn_addToListAcl(response);
                        }

                    }
                });
        }

    }

    fn_clearListAcl(){
        const elList = this.fn_getElListAcl();
        elList.innerHTML = "";
    }

    fn_addToListAcl(newList){
        const data = this._COMPONENT_CONFIG;
        const directionRtl                            =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")              ? this._COMPONENT_CONFIG.directionRtl       : false;
        const prop_size                               =   data.hasOwnProperty("prop_size")                                  ?  data.prop_size                           : null;
        const prop_itemAclIconColorUnSelected         =   data.hasOwnProperty("prop_itemAclIconColorUnSelected")            ?  data.prop_itemAclIconColorUnSelected     : "";

        const list = this.fn_getListTempItemsSelected();

        const elList = this.fn_getElListAcl();
        if (newList != null && Array.isArray(newList)){
            for (let i = 0; i < newList.length; i++) {
                const item = newList[i];
                if (item != null && item.hasOwnProperty("id") && item.hasOwnProperty("name")){

                    let isSelected = false;
                    if ( list != null && Array.isArray( list )){
                        for (let j = 0; j <  list.length; j++) {
                            const itemSelected =  list[j]
                            if (itemSelected != null && itemSelected.hasOwnProperty("id") && itemSelected.id == item.id){
                                isSelected = true;
                                break;
                            }
                        }
                    }

                    if (!isSelected){
                        const elNew =  this.fn_createElAcl(item);
                        if(elNew != null) elList.innerHTML += elNew;
                    }

                }

            }
        }
    }

    fn_onClickItemAcl(event , itemId){
        const itemSelected = event.target.closest('.item-acl');

        if (this._LIST_ACL != null && Array.isArray(this._LIST_ACL)){
            for (let i = 0; i < this._LIST_ACL.length; i++) {
                const item = this._LIST_ACL[i];

                if (item != null && item.hasOwnProperty("id") && item.hasOwnProperty("name") && item.id == itemId){
                    itemSelected.remove();
                    const listSelected = this.fn_getElListSelected();
                    const elNew =  this.fn_createElSelected(item);
                    if(elNew != null) listSelected.innerHTML += elNew;
                    break;
                }
            }
        }
    }

    fn_clearListSelected(){
        const elList = this.fn_getElListSelected();
        elList.innerHTML = "";
    }

    fn_createElSelected(item){
        const data = this._COMPONENT_CONFIG;
        const prop_size                             =   data.hasOwnProperty("prop_size")                                ?  data.prop_size                         : null;
        const prop_itemAclIconColorSelected         =   data.hasOwnProperty("prop_itemAclIconColorSelected")            ?  data.prop_itemAclIconColorSelected     : "";

        if (item != null && item.hasOwnProperty("id") && item.hasOwnProperty("name")){
            return `
                <div class="item-selected position-relative" data-item-id="${item.id}"  data-item-name="${item.name}"  onClick="${this.getFn("fn_onClickRemoveAcl" , "event" , item.id)}">
                      ${item.name}
                      <i class="position-absolute">
                           ${tools_icons.icon_clear({size : prop_size /*, colors: {primary:prop_itemAclIconColorSelected}*/} ) }
                      </i>
                </div>
            `
        }
        return null;
    }

    fn_onClickRemoveAcl(event){
        const itemSelected = event.target.closest('.item-selected');
        let itemId = itemSelected.getAttribute("data-item-id");

        if (itemId != null){
            itemId = parseInt(itemId);

            const list = this.fn_getListTempItemsSelected();
            if (list != null && Array.isArray(list)){
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];

                    if (item != null && item.hasOwnProperty("id") && item.hasOwnProperty("name") && item.id == itemId){
                        itemSelected.remove();
                        const listAcl = this.fn_getElListAcl();
                        const elNew =  this.fn_createElAcl(item);
                        if(elNew != null) listAcl.innerHTML += elNew;
                        break;
                    }
                }
            }
        }

    }

    fn_createElAcl(item){
        const data = this._COMPONENT_CONFIG;
        const prop_size                               =   data.hasOwnProperty("prop_size")                                  ?  data.prop_size                           : null;
        const prop_itemAclIconColorUnSelected         =   data.hasOwnProperty("prop_itemAclIconColorUnSelected")            ?  data.prop_itemAclIconColorUnSelected     : "";
        const directionRtl                            =  this._COMPONENT_CONFIG.hasOwnProperty("directionRtl")              ? this._COMPONENT_CONFIG.directionRtl       : false;

        if (item != null && item.hasOwnProperty("id") && item.hasOwnProperty("name")){
            return `
                <div class="item-acl position-relative" onClick="${this.getFn("fn_onClickItemAcl" , "event" , item.id)}">
                        ${item.name}
                        <i class="position-absolute">
                                 ${directionRtl ? tools_icons.icon_arrow_left({size : prop_size /*, colors: {primary:prop_itemAclIconColorUnSelected}*/}  ) : tools_icons.icon_arrow_right({size : prop_size/* , colors: {primary:prop_itemAclIconColorUnSelected}*/}  ) }
                        </i>
                </div>
            `
        }
        return null;
    }

    fn_getListTempItemsSelected(){
        let resultExp = [];
        const list = this.fn_getElListSelected().querySelectorAll(".item-selected");

        if (list != null){
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                const itemId = item.getAttribute("data-item-id");
                const itemName = item.getAttribute("data-item-name");
                if (itemId != null && itemName != null){
                    resultExp.push({
                        id : parseInt(itemId),
                        name : itemName,
                    })
                }
            }
        }
        return resultExp;
    }

    fn_selectAllAcl(){
        const data = this._COMPONENT_CONFIG;
        const prop_value  =   data.hasOwnProperty("prop_value")         ?  data.prop_value      : [];
        const listSelected = this.fn_getElListSelected();

        const list = this.fn_getListTempItemsSelected();

        if (this._LIST_ACL != null && Array.isArray(this._LIST_ACL)){
            for (let i = 0; i < this._LIST_ACL.length; i++) {
                const item = this._LIST_ACL[i];

                let isSelected = false;
                if (list != null && Array.isArray(list) && item.hasOwnProperty("id")) {
                    for (let j = 0; j < list.length; j++) {
                        const itemSelected = list[i];

                        if (itemSelected != null && itemSelected.hasOwnProperty("id")  && itemSelected.id == item.id) {
                            isSelected = true;
                            break;
                        }
                    }
                }

                if (!isSelected){
                    const elNew =  this.fn_createElSelected(item);
                    if(elNew != null) listSelected.innerHTML += elNew;
                }
            }
        }

        this.fn_clearListAcl();
        this.fn_sendRequestAcl();
    }

    fn_clearAllAcl(){
        const list = this.fn_getListTempItemsSelected();
        this.fn_clearListSelected();
        this.fn_addToListAcl(list);
        this.fn_sendRequestAcl();
    }

    fn_callback(event){
        const data = this._COMPONENT_CONFIG;
        const prop_value  =   data.hasOwnProperty("prop_value")         ?  data.prop_value      : [];

        if (data.hasOwnProperty("fn_callback") && typeof data.fn_callback != null){
            data.fn_callback(event , prop_value );
        }
    }
}
