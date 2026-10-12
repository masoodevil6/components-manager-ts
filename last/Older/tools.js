/*
Name: Tools
Developer: Mehdi Maarefian
Version: 0.1
*/



if (typeof component_props === 'undefined') {
    component_props = {
        directionRtl: true,
        elementSizes: "m",


        // -----------------------
        primaryColor1: "#15244b",
        primaryColor2: "#334783",
        primaryColor3: "#7887b2",
        primaryColor4: "#e4e9ed",
        primaryColor5: "#ededef",

        secondaryColor1: "#fab01b",
        secondaryColor2: "#f5bf53",
        secondaryColor3: "#f6d086",
        secondaryColor4: "#efdcb3",

        errorColor1: "#691d21",
        errorColor2: "#ab5258",
        errorColor3: "#f6b1b7",
        errorColor4: "#f8d7da",

        warningColor1: "#b4500c",
        warningColor2: "#f47920",
        warningColor3: "#eca574",
        warningColor4: "#ffe4d0",

        infoColor1: "#077af1",
        infoColor2: "#1988fd",
        infoColor3: "#4ba2fd",
        infoColor4: "#74b8ff",

        successColor1: "#06502d",
        successColor2: "#2e9f6b",
        successColor3: "#64c598",
        successColor4: "#ceefe0",

        shadowColor1: "rgba(98,98,98,0.50)",
        shadowColor2: "rgba(98,98,98,0.40)",
        shadowColor3: "rgba(98,98,98,0.30)",
        shadowColor4: "rgba(98,98,98,0.20)",
        shadowColor5: "rgba(98,98,98,0.10)",

        darkColor1: "rgb(30,30,30)",
        darkColor2: "rgb(157,157,157)",

        shanColor1: "#ffffff",
        shanColor2: "#f4f4f4",
        shanColor3: "#f1f1f1",
        shanColor4: "#e8e8e8",
        // -----------------------

    }
}

if (typeof tools_const === 'undefined') {
    tools_const = {
        botResPath: "bot/run/435/res_v2" ,

        contentTypes : {
            html: "text/html" , json: "application/json" ,
        },
    };
}





tools_init = {
    renderComponentProps : function(config){

        if (config != null && typeof config == "object"){
            Object.keys(config).forEach( (keyConfig) => {
                Object.keys(component_props).forEach( (keyProp) => {
                    if (keyConfig == keyProp){
                        component_props[keyConfig] = config[keyConfig];
                        return;
                    }
                })
            })
        }
        tools_init.renderToolsConst()
    } ,

    renderToolsConst : function(){


        tools_const.styles =  {
            message: {
                success: {
                    backgroundColor:                   component_props.successColor4 ,
                    color:                             component_props.successColor1 ,
                    icon:                              component_props.successColor1 ,
                    border:                            component_props.successColor1 ,
                } ,
                error: {
                    backgroundColor:                   component_props.errorColor4 ,
                    color:                             component_props.errorColor1 ,
                    icon:                              component_props.errorColor1 ,
                    border:                            component_props.errorColor1 ,
                } ,
                warning: {
                    backgroundColor:                   component_props.warningColor4 ,
                    color:                             component_props.warningColor1 ,
                    icon:                              component_props.warningColor1 ,
                    border:                            component_props.warningColor1 ,
                }
            },

            isEmpty: {
                borderColor_border:                    component_props.primaryColor1 ,
                color_icon:                            component_props.primaryColor1 ,
                btnColor_icon:                         component_props.shanColor1 ,
            },

            notify: {
                borderColor_border:                    component_props.primaryColor1 ,
                background_border:                     component_props.primaryColor4 ,
                color_icon:                            component_props.primaryColor1 ,
                color_title:                           component_props.primaryColor1 ,
            },

            loading: {
                backgroundColor_loading:               component_props.primaryColor1 ,
                backgroundColor_shadow:                component_props.shadowColor2
            },

            state404: {
                backgroundColor_shadow:                component_props.shadowColor2 ,
            },

            form: {
                backgroundColor_btnSubmit:             component_props.primaryColor1 ,
                backgroundColor_btnSubmit_hover:       component_props.primaryColor2 ,
                color_btnSubmit:                       component_props.shanColor1 ,
            },

            title: {
                backgroundColor:                       component_props.shanColor1
            },

            listSelectedScroller: {
                borderdColor_form:                     component_props.shadowColor3 ,
                borderdColor_formSelector_item:        component_props.shanColor1 ,
                backgroundColor_formSelector_item:     component_props.primaryColor1 ,
                color_formSelector_item:               component_props.shanColor1 ,
                colorIcon_formSelector_item:           component_props.shanColor1 ,
            },

            pageHeader: {
                backgroundColor_form:                             component_props.primaryColor1 ,
                backgroundColor_nav:                              component_props.shanColor1 ,
                colorPrimary_icon:                                component_props.shanColor1 ,
                colorSecondary_icon:                              component_props.primaryColor3 ,
                color_icon:                                       component_props.secondaryColor1 ,
                color_header:                                     component_props.shanColor1 ,
                color_nav:                                        component_props.primaryColor1 ,
            },

            collapse: {
                backgroundColor_title:                 component_props.primaryColor1 ,
                color_title:                           component_props.shanColor1 ,
                color_icon:                            component_props.shanColor1 ,
                backgroundColor_body:                  component_props.shanColor1 ,

            },

            button: {
                submit:{
                    backgroundColor:                              component_props.secondaryColor1,
                    backgroundColorHover:                         component_props.secondaryColor2,
                    color:                                        component_props.shanColor1,
                } ,
                cancel:{
                    backgroundColor:                              component_props.primaryColor1,
                    backgroundColorHover:                         component_props.primaryColor2,
                    color:                                        component_props.shanColor1,
                } ,
                back:{
                    backgroundColor:                              component_props.primaryColor1,
                    backgroundColorHover:                         component_props.primaryColor2,
                    color:                                        component_props.shanColor1,
                }
            },

            input: {
                backgroundColor_form:                             component_props.secondaryColor1 ,
                color_icon:                                       component_props.darkColor1 ,
            },

            inputOtp: {

            },

            inputPassword: {
                backgroundColor_form:                             component_props.secondaryColor1 ,
                color_icon:                                       component_props.darkColor1 ,
            },

            inputEmail: {
                backgroundColor_form:                             component_props.secondaryColor1 ,
                color_icon:                                       component_props.darkColor1 ,
            },

            inputPrice: {
                backgroundColor_form:                             component_props.secondaryColor1 ,
                color_icon:                                       component_props.darkColor1 ,
                color_calculator:                                 component_props.primaryColor1 ,
            },

            inputSize: {
                backgroundColor_form:                             component_props.secondaryColor1 ,
                color_icon:                                       component_props.darkColor1 ,
            },

            inputAcl: {
                backgroundColor_headerList:                      component_props.secondaryColor1 ,
                color_icon:                                      component_props.darkColor1 ,
                color_btn:                                       component_props.shanColor1 ,
                borderColor_selector:                            component_props.primaryColor1 ,
                backgroundColor_bodyHeader:                      component_props.primaryColor1 ,
                backgroundColor_bodyFootrer:                     component_props.primaryColor2 ,

                backgroundColor_itemAcl_unSelected:              component_props.secondaryColor3 ,
                color_itemAcl_unSelected:                        component_props.darkColor1 ,
                iconColor_itemAcl_unSelected:                    component_props.darkColor1 ,
                borderColor_itemAcl_unSelected:                  component_props.shadowColor2 ,
                color_itemAcl_unSelected_hover:                  component_props.darkColor1 ,
                backgroundColor_itemAcl_unSelected_hover:        component_props.secondaryColor2 ,

                backgroundColor_itemAcl_selected:                component_props.primaryColor3 ,
                color_itemAcl_selected:                          component_props.shanColor1 ,
                iconColor_itemAcl_selected:                      component_props.shanColor1 ,
                borderColor_itemAcl_Selected:                    component_props.darkColor1 ,
                color_itemAcl_selected_hover:                    component_props.shanColor1 ,
                backgroundColor_itemAcl_selected_hover:          component_props.primaryColor2 ,


            },

            inputColor: {
                boderColor :                           component_props.shanColor1 ,
                backgroundColor_body :                 component_props.darkColor1 ,
                color_body :                           component_props.shanColor1 ,
                color_iconClear :                      component_props.darkColor1 ,
                color_iconEmpty :                      component_props.errorColor1 ,
            } ,

            inputCheckBox: {
                color_icon:                            component_props.darkColor1 ,
                boderColor :                           component_props.darkColor2 ,
                backgroundColor_unSelected :           component_props.shadowColor2 ,
                backgroundColor_selected :             component_props.secondaryColor1 ,
                backgroundColor_disable :              component_props.darkColor2 ,
                color_unSelected :                     component_props.shadowColor2 ,
                color_selected :                       component_props.primaryColor1 ,
                color_disable :                        component_props.darkColor2 ,
            } ,

            inputDate: {
                backgroundColor_header :               component_props.secondaryColor1 ,
                color_icon:                            component_props.primaryColor1 ,

                backgroundColor_main :                 component_props.primaryColor1 ,
                color_iconArrow:                       component_props.shanColor1 ,

                backgroundColor_rowSelected  :         component_props.primaryColor4 ,
                backgroundColor_colSelected :          component_props.secondaryColor2 ,
                color_columnSelected  :                component_props.darkColor1 ,
            } ,

            inputFile: {
                backgroundColor_itemFile :             component_props.infoColor3 ,
                backgroundColor_itemFile_invalid :     component_props.errorColor1 ,
                color_itemFile :                       component_props.shanColor1 ,
                color_itemFile_icons :                 component_props.primaryColor1 ,
                boderColor :                           component_props.primaryColor1 ,
                boderColorHover :                      component_props.secondaryColor1 ,
                textColor :                            component_props.primaryColor1 ,
            } ,

            timerDown: {
                backgroundColor_body :                component_props.primaryColor1 ,
                backgroundColor_timer :               component_props.errorColor1 ,
                backgroundColor_timerEffect :         component_props.errorColor4 ,
                color_timer :                         component_props.shanColor1 ,
                color_description :                   component_props.shanColor1 ,
            } ,



            table: {
                backgroundColor:                       component_props.primaryColor1 ,
                backgroundColor_headerIcon:            component_props.secondaryColor1 ,
                borderColor_headerIcon:                component_props.primaryColor1 ,
                color_headerIcon:                      component_props.primaryColor1 ,
                backgroundColor_rowSelected:           component_props.primaryColor1 ,
                backgroundColor_columnSelected:        component_props.secondaryColor1 ,
                backgroundColor_textSelected:          component_props.shanColor1 ,

                bacKgroundColor_rowOptions:            component_props.secondaryColor1 ,
                color_rowOptions:                      component_props.darkColor1 ,
                bacKgroundColor_rowOptionsItem:        component_props.secondaryColor3 ,
                color_rowOptionsItem:                  component_props.darkColor1 ,
                bacKgroundColor_rowOptionsItemHover:   component_props.secondaryColor2 ,
                color_rowOptionsItemHover:             component_props.darkColor1 ,

                backgroundColor_iconColumnSelector:    component_props.secondaryColor1 ,
                color_iconColumnSelector:               component_props.primaryColor1,
            },


            tabs: {
                backgroundColor_unselected:            component_props.shadowColor2 ,
                backgroundColor_itemBefore:            component_props.shadowColor3 ,
                backgroundColor_itemAfter:             component_props.primaryColor1 ,
                color_itemAfter:                       component_props.shanColor4 ,
            },

            tableResposible: {
                backgroundColor_header:                component_props.primaryColor1 ,
                color_header:                          component_props.shanColor4 ,
                backgroundColor_body:                  component_props.shanColor2 ,
                color_body:                            component_props.darkColor1 ,
                backgroundColor_bodyHover:             component_props.shanColor4 ,
                color_bodyHover:                       component_props.primaryColor1 ,

                backgroundColor_iconColumnSelector:    component_props.secondaryColor1,
                color_iconColumnSelector:              component_props.primaryColor1,

                backgroundColor_iconCardView:          component_props.secondaryColor1,
                color_iconCardView:                    component_props.primaryColor1,
                borderColor_iconCardView:              component_props.primaryColor1,
            },

            pageNumber: {
                backgroundColor_form:                  component_props.primaryColor1 ,

                backgroundColor_unselected:            component_props.primaryColor1 ,
                backgroundColor_unselected2:           component_props.primaryColor2 ,
                color_unselected:                      component_props.shanColor1 ,

                backgroundColor_selected:              component_props.secondaryColor1 ,
                backgroundColor_selected2:             component_props.secondaryColor3 ,
                color_selected:                        component_props.darkColor1 ,

                backgroundColor_icon:                  component_props.primaryColor1 ,
                backgroundColor_icon2:                 component_props.darkColor1 ,
                color_icon:                            component_props.shanColor1 ,
            },


            pageData: {
                color_description:                     component_props.primaryColor1 ,
                color_data:                            component_props.secondaryColor1 ,
            },


            stepper: {
                color_selected:                        component_props.successColor1 ,
                color_unSelected:                      component_props.errorColor1 ,
            },

            progressStepper: {
                color_init:                            component_props.shadowColor1 ,
                color_progress:                        component_props.primaryColor1 ,
                color_faield:                          component_props.errorColor1 ,
                color_success:                         component_props.successColor1 ,
            },

            cardInfo: {
                backgroundColor_options:               component_props.secondaryColor3 ,

                backgroundColor_optionItem:            component_props.secondaryColor3 ,
                color_optionItem:                      component_props.darkColor1 ,

                backgroundColor_optionHover:           component_props.secondaryColor2 ,
                color_optionHover:                     component_props.shanColor2 ,
            } ,

            selectOption: {
                backgroundColor_form:                   component_props.secondaryColor1 ,
                color_icon:                             component_props.darkColor1 ,
                backgroundColor_itemNotSelected:        component_props.shanColor1 ,
                backgroundColor_itemHover:              component_props.primaryColor2 ,
                backgroundColor_itemSelected:           component_props.primaryColor2 ,
                color_itemSelected:                     component_props.shanColor1
            },

            draggableOrder: {
                color_border:                          component_props.primaryColor1 ,
                color_borderHover:                     component_props.secondaryColor1 ,
                color_icon:                            component_props.primaryColor1 ,
            } ,

            selectColumn: {
                backgroundColor_icon:                 component_props.secondaryColor1 ,
                color_icon:                           component_props.darkColor1,
            } ,



            elementLink: {
                normal:{
                    backgroundColor:                  component_props.shanColor1 ,
                },
                hover:{
                    backgroundColor:                  component_props.shanColor1 ,
                }
            } ,

            elementBorder: {
                btnMore_backgroundColor :             component_props.primaryColor1 ,
                btnMore_color :                       component_props.shanColor1 ,
            } ,

            label: {
                backgroundColor_label :                     component_props.primaryColor1 ,
                color_label :                               component_props.shanColor1 ,
                color_icon :                          component_props.shanColor1 ,
            } ,

            window: {
                backgroundColor_blur :                component_props.shadowColor2 ,
                backgroundColor_window :              component_props.shanColor1 ,
            } ,

            tooltipDescription: {
                backgroundColor_description :          component_props.secondaryColor1 ,
                color_description :                    component_props.darkColor1 ,
                color_icon :                           component_props.shanColor1 ,
            } ,


            breadcrumb: {
                backgroundColor_unactive :             component_props.primaryColor1 ,
                color_unactive :                       component_props.shanColor1 ,
                backgroundColor_active :               component_props.secondaryColor1 ,
                color_active :                         component_props.darkColor1 ,
            } ,

            breadcrumbWithArrow: {
                backgroundColor_unactive :             component_props.primaryColor1 ,
                color_unactive :                       component_props.darkColor1 ,
                backgroundColor_active :               component_props.secondaryColor1 ,
                color_active :                         component_props.shanColor1 ,
                color_shadow :                         component_props.shadowColor2 ,
            } ,


            tree: {
                backgroundColor_unSelected :           component_props.shadowColor2 ,
                backgroundColor_selected :             component_props.secondaryColor1 ,
            } ,

            mosuseScroller: {
                backgroundColor_dark :                 component_props.darkColor2 ,
                backgroundColor_light:                 component_props.shanColor1 ,
                backgroundColor_tools:                 component_props.darkColor1 ,
            } ,


            backShadow: {
                backgroundColor:                       component_props.shadowColor2
            },
            buttonError: {
                backgroundColor:                       component_props.errorColor1 ,
                color:                                 component_props.shanColor1,
            } ,

            border: {
                color_border:                          component_props.primaryColor2 ,
            } ,


            report: {
                backgroundColor_page:                  component_props.primaryColor5 ,
                color_iconPage:                        component_props.primaryColor1 ,
                color_iconBtnNewPage:                  component_props.shanColor1 ,
            } ,


            changePage: {
                backgroundColor_shadow:                component_props.shadowColor2 ,
                backgroundColor_page:                  component_props.primaryColor5 ,
            } ,
            pageCardInfo: {
                color_iconPage:                        component_props.infoColor1 ,
                color_iconBtn:                         component_props.shanColor1 ,
            } ,

        };
    }
}


tools_css = {

    standardSizes: {
        xs: {
            name: "x-s",
            fontSize: 8,
            height: 22,
            icon: 12
        } ,
        s: {
            name: "s" ,
            fontSize: 10 ,
            height: 24,
            icon: 14
        } ,
        m: {
            name: "m" ,
            fontSize: 12,
            height: 26,
            icon: 16
        } ,
        l: {
            name:  "l"  ,
            fontSize: 13,
            height: 28,
            icon: 18
        } ,
        xl: {
            name:  "x-l" ,
            fontSize: 14,
            height: 30,
            icon: 20
        } ,
        xxl: {
            name: "xx-l",
            fontSize: 15 ,
            height: 32,
            icon: 22
        }
    } ,

    standardScreanWidth : {
        xs   : {name:"x-s" ,max:576             } ,
        s    : {name:"s"  ,min:576   , max:768 } ,  /// is for mobile
        m    : {name:"m"  ,min:768   , max:992 } ,  /// is for tablet
        l    : {name:"l"  ,min:992   , max:1200} ,
        xl   : {name:"x-l" ,min:1200  , max:1450} ,  /// is for pc
        xxl  : {name:"xx-l" ,min:1450           } ,
    } ,

    standardZIndex:{
        basic:            {name:"basic"            ,val:1             } ,
        menu_main:        {name:"menu_main"        ,val:2             } ,
        icon_attach:      {name:"icon_attach"      ,val:3             } ,
        tools:            {name:"tools"            ,val:4             } ,
        tools_btn:        {name:"tools_btn"        ,val:5             } ,
        tools_position:   {name:"tools_position"   ,val:6             } ,


        new_page:         {name:"new_page"         ,val:10             } ,
        blur_popup:       {name:"blur_popup"       ,val:19             } ,
        popup:            {name:"popup"            ,val:20             } ,
    } ,

    //---------------------------------------------------------------------------

    getHeightSize(sizeName){
        let val = 20;
        Object.keys(tools_css.standardSizes).forEach(key=>{
            itemHeight = tools_css.standardSizes[key];
            if(itemHeight.name == sizeName){
                val = itemHeight.height;
                return;
            }
        });
        return val;
    },


    getFontSize(sizeName){
        let val = 10;
        Object.keys(tools_css.standardSizes).forEach(key=>{
            itemFont = tools_css.standardSizes[key];
            if(itemFont.name == sizeName){
                val = itemFont.fontSize;
                return;
            }
        });
        return val;
    },


    getIconSize(sizeName , defaultSize = 16){
        let val = defaultSize;

        Object.keys(tools_css.standardSizes).forEach(key=>{
            itemIcon = tools_css.standardSizes[key];
            if(itemIcon.name == sizeName){
                val = itemIcon.icon;
                return;
            }
        });
        return val;
    } ,


    //---------------------------------------------------------------------------


    getScreenWidth(element=null){
        if (element == null){
            element = window;
        }
        let screanWidth = element.innerWidth;
        let screanWidthType = "";

        Object.keys(tools_css.standardScreanWidth).forEach(key => {
            const sizeType = tools_css.standardScreanWidth[key];
            if (sizeType.hasOwnProperty("name")){
                const sizeName = sizeType.name;

                const checkIsMoreThenMin = sizeType.hasOwnProperty("min") ? screanWidth >= sizeType.min : true;
                const checkIsLessThenMax = sizeType.hasOwnProperty("max") ? screanWidth <= sizeType.max : true;

                if (checkIsMoreThenMin && checkIsLessThenMax){
                    screanWidthType = sizeName;
                    return;
                }
            }
        })

        return screanWidthType;
    } ,


    checkMoreThanScreanWidth(sizeName , element=null){
        if (element == null){
            element = window;
        }
        let screanWidth = element.innerWidth;
        let screanWidthStatus = false;

        Object.keys(tools_css.standardScreanWidth).forEach(key => {
            const sizeType = tools_css.standardScreanWidth[key];
            if (sizeType.hasOwnProperty("name") && sizeType.name == sizeName){
                const point = sizeType.hasOwnProperty("max") ? sizeType.max : (sizeType.hasOwnProperty("min") ? sizeType.min : null);
                screanWidthStatus = point!=null && screanWidth >= point
                return;
            }
        })

        return screanWidthStatus;
    } ,


    //---------------------------------------------------------------------------


    getZIndex(zIndexName , zIndexDefault=1){
        let value = null
        Object.keys(tools_css.standardZIndex).forEach(key=>{
            itemZIndex = tools_css.standardZIndex[key];
            if(itemZIndex.name == zIndexName){
                value = itemZIndex.val;
                return;
            }
        });
        return value != null ? value : zIndexDefault ;
    }
}




tools_component = {


    setup: function (container , tree , withPrefix=null){

        tree.forEach(node => {

            const component = node.hasOwnProperty("component") ? (withPrefix || '') +  node.component : "div";
            const props = node.hasOwnProperty("props") ? node.props : {};
            const children = node.hasOwnProperty("children") ? node.children : null;

            if (component.startsWith('Component')){
                const compClass = window[component];
                if (compClass) {

                    const customEl = document.createElement(listComponent[component]);
                    customEl.id = props.id;
                    container.appendChild(customEl);

                    if (children && Array.isArray(children)) {
                        tools_component.setup(customEl , children , "component-");
                    }

                    const compInstance = new compClass(props.id, props);
                    compInstance.render();
                }
            }
            else {
                // المان ساده HTML
                const el = document.createElement(component || 'div');
                if (props.id) el.id = props.id;
                if (props.text) el.textContent = props.text;
                if (props.classList) el.classList = props.classList;

                if (props.attrs) {
                    for (const [key, value] of Object.entries(props.attrs)) {
                        el.setAttribute(key, value);
                    }
                }

                if (props.events) {
                    for (const [event, handler] of Object.entries(props.events)) {
                        el.addEventListener(event, handler);
                    }
                }
                container.appendChild(el);

                if (children && Array.isArray(children)) {
                    tools_component.setup(el , children);
                }
            }

        });

    } ,

    control: function  (componentName , props , prop_show=true){

        if (componentName.startsWith('Component')) {
            const compClass = window[componentName];

            if (compClass) {
                if (props != null && props.hasOwnProperty("elId")){
                    props.prop_show =  props.hasOwnProperty(prop_show) ? props.prop_show : prop_show;
                    const compInstance = new compClass(props.elId, props);
                }
            }
        }

    } ,


    widgetRender: function(element , fetchData=[] , insert=true){
        const closestComponent = element.closest("component-widget");
        console.log(closestComponent)

        if (closestComponent != null){
            const componentRandomId = closestComponent.getAttribute("data-component-id");
            if (componentRandomId != null && components.hasOwnProperty(componentRandomId) ){

                const prop_fetch = components[componentRandomId].get("prop_fetch" , {});
                if (!prop_fetch.hasOwnProperty("data") || Array.isArray(prop_fetch.data)){
                    prop_fetch.data = {};
                }
                if (!prop_fetch.data.hasOwnProperty("data")){
                    prop_fetch.data.data = {};
                }


                if (insert){

                    for (let x = 0; x < fetchData.length ; x++) {
                        const itemApi = fetchData[x];

                        let exist = false;
                        if (itemApi.hasOwnProperty("name") && itemApi.hasOwnProperty("value") ){
                            for (let i = 0; i < prop_fetch.data.data.length ; i++) {
                                const item = prop_fetch.data.data[i];
                                if (item.hasOwnProperty("name") && item.name == itemApi.name){
                                    prop_fetch.data.data[i] = itemApi;
                                    exist = true;
                                    break;
                                }
                            }
                        }

                        if (!exist){
                            prop_fetch.data.data.push(itemApi);
                        }
                    }
                }

                if ( typeof components[componentRandomId].call_fetchWidget !== "undefined"){
                    components[componentRandomId].call_fetchWidget();
                }
            }

        }

    } ,


    getComponentHtml: function (containerId , ComponentName , ComponentId , ComponentProps){
        const container = document.getElementById(containerId);
        const elForm = document.createElement(tools_converter.toKebabCase(ComponentName));
        elForm.id = ComponentId
        container.appendChild(elForm);

        console.log(containerId , ComponentName , ComponentId , ComponentProps)

        new window[ComponentName](
            ComponentId ,
            ComponentProps
        );

        return elForm.outerHTML;
    }

};



tools_submit = {

    fetcth: async function(url='' , args={}){
        let data                  = args.hasOwnProperty("data")                    ? args.data                     : {} ;
        let callback              = args.hasOwnProperty("callback")                ? args.callback                 : null ;
        let errorBack             = args.hasOwnProperty("errorBack")               ? args.errorBack                : null ;
        let componentMessagesData = args.hasOwnProperty("componentMessagesData")   ? args.componentMessagesData    : null ;
        let componentLoadingData  = args.hasOwnProperty("componentLoadingData")    ? args.componentLoadingData     : null ;
        let component404Data      = args.hasOwnProperty("component404Data")        ? args.component404Data         : null ;
        let prop_size             = args.hasOwnProperty("prop_size")               ? args.prop_size                : tools_css.standardSizes.m.name ;
        if (component404Data != null){
            component404Data["prop_structureClass"] = ["position-absolute"];
            component404Data["prop_structureStyles"] = {
                "width" : "100%" ,
                "height" : "100%" ,
                "left" : "0" ,
                "top" : "0" ,
            };
        }



        const formData = new FormData();

        if (data.hasOwnProperty("type") && data.type != null){
            formData.append("type", data.type);
        }

        let body = data.hasOwnProperty("data") ? data.data : [];
        if ( data.hasOwnProperty("formData") ){
            //body.push(...tools_converter.serializeArray(data.formData) )
            body = tools_public.mergeFormArray(body , tools_converter.serializeArray(data.formData))
        }

        if (body != null && Array.isArray(body)){
            for (const itemData of body) {
                if (itemData.hasOwnProperty("name") && itemData.hasOwnProperty("value") && itemData.value != null){
                    const type = itemData.hasOwnProperty("type") ? itemData.type : "text";
                    const name = itemData.name;
                    switch (type){
                        case "file":
                            let files =  itemData?.value ?? [];

                            for (let i = 0; i < files.length; i++) {
                                const itemFile = files[i];
                                formData.append(name, itemFile , itemFile.name);
                            }
                            break;
                        default:
                            formData.append(name, itemData.hasOwnProperty("value") ? itemData.value : null);
                            break;
                    }
                }
            }
        }


        if (componentLoadingData != null) {
            tools_component.control("ComponentLoading" , componentLoadingData , true);
        }



        return await fetch(
            url ,
            {
                body:  formData ,
                method: data.hasOwnProperty("method") ? data.method : "post" ,
                headers : {
                    //   'Content-Type': contentType
                }
            })
            .then(
                response => {
                    switch (response.status){

                        case 404:

                            if (componentLoadingData != null) {
                                tools_component.control("Component404" , component404Data);

                            }
                            if (componentLoadingData != null) {
                                tools_component.control("ComponentLoading" , componentLoadingData , false);
                            }

                            break;
                        case 200:
                            const contentType = data.hasOwnProperty("contentType") ? data.contentType : tools_const.contentTypes.json
                            switch (contentType){
                                case tools_const.contentTypes.json:
                                    return response.json();
                                case tools_const.contentTypes.html:
                                    return response.text();
                            }

                            break;
                        default:
                            throw new Error({status: response.status , message: "status back "+response.status , url , body});

                            break;
                    }
                    return false;
                }
            )
            .then(
                response => {

                    /// hide loading
                    if (componentLoadingData != null) {
                        tools_component.control("ComponentLoading" , componentLoadingData , false);
                    }

                    /// set messages
                    if (componentMessagesData != null) {
                        componentMessagesData.prop_messages = response.hasOwnProperty("messages") ? response.messages : [];
                        componentMessagesData.prop_size = prop_size;

                        let messageType = "warning";
                        if (response.hasOwnProperty("status")){
                            messageType = response.status ? "success" : "error";
                        }
                        componentMessagesData.prop_type = messageType;

                        tools_component.control("ComponentMessages" , componentMessagesData);
                    }

                    /// result callback
                    const resultExp = response.hasOwnProperty("resultExp") ? response.resultExp : response;

                    if (callback != null){
                        callback(resultExp , data);
                    }

                    return {resultExp, data};
                    // return resultExp ,data;
                }
            ).catch(
                e=>{
                    if (componentLoadingData != null) {
                        tools_component.control("Component404" , component404Data);
                    }
                    if (componentLoadingData != null) {
                        tools_component.control("ComponentLoading" , componentLoadingData , false);
                    }

                    /// log error
                    console.error("[FETCH]" , url , data , e);

                    if (errorBack != null){
                        errorBack(e);
                    }

                    return false;
                }
            )
    } ,

}



tools_vue = {

    renderDynamicComponent: function(view, createViewComponent = true) {
        let {template, script} = this.extractComponentParts(view);
        script = this.getComponentOptions(script);
        if (createViewComponent){
            return this.buildDynamicComponent(template, script);
        }
        return {template, script};
    },

    buildDynamicComponent: function (template, script) {
        const compiled = Vue.compile(template);

        // تولید یک نام یکتا برای کامپوننت
        const componentName = "dynamic-component-" + Math.random().toString(36).substr(2, 9);

        // تعریف کامپوننت با نام خاص
        Vue.component(componentName, {
            ...script,
            render: compiled.render,
            staticRenderFns: compiled.staticRenderFns
        });

        return componentName; // فقط نام کامپوننت برگشت داده میشه
    },

    extractComponentParts: function (htmlString) {
        let templateMatch;
        let scriptMatch;
        if (htmlString != null) {
            templateMatch = htmlString.match(/<component>([\s\S]*?)<\/component>/i);
            scriptMatch = htmlString.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

            if (!templateMatch || !scriptMatch) {
                console.warn("template یا script پیدا نشد", {templateMatch, scriptMatch});
            }

        }

        return {
            template: templateMatch ? templateMatch[1].trim() : '<div></div>',
            script: scriptMatch ? scriptMatch[1].trim() : 'module.exports = {};'
        };

    },

    getComponentOptions: function (scriptCode) {
        let componentOptions = {};
        try {
            if (!scriptCode.includes('export default')) {
                console.warn("کد export default ندارد:", scriptCode);
            }

            const exports = {};
            const module = {exports};
            const normalizedCode = scriptCode.replace(/export\s+default/, 'module.exports =');
            const wrappedCode = `(function(exports, module){ ${normalizedCode} })(exports, module);`;

            eval(wrappedCode);
            componentOptions = module.exports;
        } catch (e) {
            console.error("خطا در اجرای script:", e);
        }
        return componentOptions;
    },

};



tools_converter = {

    serializeArray: function (formElement){
        if (formElement == null) return [];

        const result = [];
        const elements = formElement.elements;

        for (let i = 0; i < elements.length; i++) {
            const field = elements[i];

            if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].includes(field.type)) {
                continue;
            }

            if (field.type === 'select-multiple') {
                for (let j = 0; j < field.options.length; j++) {
                    const option = field.options[j];

                    if (option.selected) {
                        result.push({ name: field.name, value: option.value });
                    }
                }
            } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {

                result.push({ name: field.name, value: field.value , type: field.type });
            }
        }

        return result;
    } ,

    convertPriceToString: function(value) {
        if (typeof value !== 'string' && typeof value !== 'number') return null;

        if (typeof value === 'number'){
            value = value.toString()
        }

        let val =value
            .replace(/,/g, '')        // حذف کاماها
            .replace(/[^\d.]/g, '')   // فقط عدد و نقطه مجازن
            .replace(/(\..*)\./g, '$1'); // فقط اولین نقطه باقی بمونه

        let [intPart, decimalPart] = val.split('.');
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return  decimalPart !== undefined
            ? `${intPart}.${decimalPart}`
            : intPart;

        return  value;
    },
    convertStringToPrice: function(input) {
        if (typeof input !== 'string' && typeof input !== 'number') return null;

        const cleaned = String(input).replace(/,/g, '');

        if (!/^\d+(\.\d+)?$/.test(cleaned)) return null;

        return Number(cleaned);
    },



    customSerialize: function (obj){
        return Object.entries(obj)
            .map(([key, value]) => `${key}=${value}`)
            .join(";");
    },


    customUnSerialize: function (input ){
        const str = String(input);
        const obj = {};
        str.split(";").forEach(pair => {
            if (pair.includes("=")) {
                const [key, value] = pair.split("=");
                if (key) obj[key] = value || "";
            }
        });

        return obj;
    },



    numPersianToEnglish: function (str, isInt=false){
        if (typeof str == "string"){
            const val = str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

            if (isInt){
                return parseInt(val);
            }
            return val;
        }
        return str;
    } ,


    numEnglishToPersian: function (str, isInt=false){
        if (typeof str !== 'string') str = String(str);

        const persianNums = '۰۱۲۳۴۵۶۷۸۹';
        const arabicNums  = '٠١٢٣٤٥٦٧٨٩';

        const val = str.replace(/[۰-۹٠-٩]/g, d => {
            const index = persianNums.indexOf(d);
            if (index > -1) return index;
            return arabicNums.indexOf(d);
        });

        return isInt ? parseFloat(val) : val;
    } ,


    toKebabCase: function (str){
        return str
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // تبدیل camelCase به kebab-case
            .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // برای Capital پشت سر هم
            .toLowerCase();
    } ,


    convertStrToNum: function(str){

        const pattern = /^-?\d*(\.\d*)?$/;

        if (!pattern.test(str)) {
            str = str.replace(/[^0-9.-]/g, "");

            str = str.replace(/(?!^)-/g, "");

            const parts = str.split(".");
            if (parts.length > 2) {
                str = parts[0] + "." + parts.slice(1).join("");
            }
        }

        return str;
    }

};



tools_validate = {

    isEmpty: function (value){
        return (
            value == null || // null یا undefined
            (Array.isArray(value) && value.length === 0) || // آرایه خالی
            (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) // آبجکت خالی
        );
    }

}



tools_public = {

    getTineUnixThisYear: function(isSamci=true){

        if (isSamci){
            const now = new Date();
            const j = jalaali.toJalaali(now);
            const jy = j.jy;

            const g = jalaali.toGregorian(jy, 1, 1);

            const date = new Date(g.gy, g.gm - 1, g.gd, 0, 0, 0);

            return  Math.floor(date.getTime() / 1000);
        }
        else{
            const year = new Date().getFullYear();

            const date = new Date(year, 0, 1, 0, 0, 0);

            return  Math.floor(date.getTime() / 1000);
        }
    } ,


    getTineUnixThisTime: function(withTomorrow = true) {
        return Math.floor(Date.now() / 1000) + (withTomorrow ? 86400 : 0);
    },



    mergeFormArray: function(base, incoming) {
        const map = new Map(base.map(item => [item.name, item.value]));

        for (const { name, value } of incoming) {
            map.set(name, value); // اگر وجود داره → آپدیت میشه
        }

        return Array.from(map, ([name, value]) => ({ name, value }));
    } ,


    renderListClass: function (data){
        let classes = "";
        if (data != null){
            if (Array.isArray(data)){
                classes = data.join(" ");
            }
            if (typeof data == "string"){
                classes = data;
            }
        }
        return classes;
    } ,

    renderListStyle: function (data){
        let styles = "";
        if (data != null){
            if (typeof data == "object"){
                Object.keys(data).forEach((key)=> {
                    styles += key + ":" + data[key] + ";";
                })
            }
            if (typeof data == "string"){
                styles = data;
            }
        }

        return styles;
    } ,

    getScriptJson(scriptJsonId){
        const dataScript = document.getElementById(scriptJsonId);
        if (dataScript) {
            try {
                return JSON.parse(dataScript.textContent);
            } catch (e) {
                console.error("json.encode for" ,jsonId ,  e)
            }
        }

        return  null;
    } ,

    parseJson(jsonStr){
        try {
            return JSON.parse(jsonStr);
        }
        catch (e){
            console.error("json pareser error" , jsonStr  , e)
        }
        return  null;
    } ,

    getCopyText(txt){
        navigator.clipboard.writeText(txt).then(() => {
            console.log('متن کپی شد: ' , txt);
        }).catch(err => {
            console.error('خطا در کپی کردن متن: ', err);
        });
    } ,

    replaceInTextWithPatternParams(template, params) {
        return template.replace(/{{(.*?)}}/g, (match, key) => {
            return params[key.trim()] ?? match;
        });
    } ,

    addExcelKeys(list, keyName = 'excelKey') {
        if (!Array.isArray(list)) return [];

        // تابع تبدیل عدد به نام ستون اکسل (A, B, ..., Z, AA, AB, ...)
        const getExcelColumnName = (index) => {
            let name = '';
            while (index >= 0) {
                name = String.fromCharCode((index % 26) + 65) + name;
                index = Math.floor(index / 26) - 1;
            }
            return name;
        };

        return list.map((item, i) => ({
            ...item,
            [keyName]: getExcelColumnName(i)
        }));
    } ,


    getExtensionFileSelected(filename){
        const lastDotIndex = filename.lastIndexOf('.');

        // اگر نقطه وجود نداشت یا فایل با نقطه شروع شده
        if (lastDotIndex <= 0) {
            return '';
        }

        return filename.substring(lastDotIndex + 1);
    } ,

    getMainDataFile(fileData , newFileName=null){
        return {
            file : fileData ,
            size : fileData.size ,
            type : fileData.type ,
            name : newFileName != null ? newFileName + tools_public.getExtensionFileSelected(fileData.name) : fileData.name  ,
        };
    } ,

}



tools_stepper = {

    createStepper(elementId , manifest , botUrl , stepActive=null){
        steps = [];
        workFlow = {};
        if (manifest != null){
            if (manifest.hasOwnProperty("steps")){
                steps = tools_stepper.readyListSteps(manifest.steps , botUrl)
            }
            if (manifest.hasOwnProperty("workflow")){
                workFlow = tools_stepper.readyListStepperWorkflow(manifest.workflow , steps);
            }
        }

        return new NavStepper(elementId , workFlow , stepActive);
    } ,


    readyListSteps(steps , botUrl) {
        let resultExp = [];
        Object.keys(steps).forEach(key => {
            const itemStep = steps[key];

            if (itemStep.hasOwnProperty("name")){
                const name = itemStep.name;
                const type = itemStep.hasOwnProperty("type") ? itemStep.type : null;
                const params = itemStep.hasOwnProperty("params") ? itemStep.params : null;
                const tagId = itemStep.hasOwnProperty("tagId") ? itemStep.tagId : null;
                const reload = itemStep.hasOwnProperty("reload") ? itemStep.reload : false;
                const componentProp = itemStep.hasOwnProperty("componentProp") ? itemStep.componentProp : {};

                resultExp.push(
                    new window.NavStep(
                        name , botUrl  , params , type , tagId , reload, componentProp
                    )
                )
            }
        })
        return resultExp;
    } ,

    readyListStepperWorkflow(node, steps) {
        if (node.step) {
            const found = steps.find(s => s.getName() === node.step);
            if (found) {
                node.step = found;
            }
        }
        if (Array.isArray(node.workflow)) {
            for (let child of node.workflow) {
                tools_stepper.readyListStepperWorkflow(child, steps);
            }
        }
        return node;
    }
}



tools_svg = {

    addDefsForMarker(svg){
        let svgDefs = svg.getElementsByTagName("defs");
        if (svgDefs.length == 0){
            svg.innerHTML = svg.innerHTML + "<defs></defs>";
        }
        return svg.getElementsByTagName("defs")[0];
    } ,

    addMarker(svg , markerName, bgColor){
        let svgDefs = tools_svg.addDefsForMarker(svg);
        let markerHtml = null;
        let markerId = `${markerName}_${Math.random()*1000}`;
        switch (markerName){
            case "arrow":
                markerHtml = `
        <marker id="${markerId}" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto">
          <path d="M0,0 L3,3 L0,6 L9,3 z" fill="${bgColor}" />
        </marker>
        `;
                break;

            case "circle":
                markerHtml = `
        <marker id="${markerId}" markerWidth="20" markerHeight="20" refX="10" refY="10" orient="auto" markerUnits="strokeWidth" >
          <circle cx="10" cy="10" r="3" fill="white" stroke="${bgColor}" stroke-width="1"  style="pointer-events:none; cursor:pointer;" />
        </marker>
        `;
                break;

            case "shadow":
                markerHtml = `
        <filter id="${markerId}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="${bgColor}" />
        </filter>
        `;
                break;
        }

        if (markerHtml != null){
            svgDefs.innerHTML = svgDefs.innerHTML + markerHtml;
            return markerId;
        }

        return null;
    } ,





    toPointsString(shape){
        return shape.map(p => `${p.x},${p.y}`).join(" ");
    } ,

    getPointsPolygonElement(shape){
        let rawPoints = shape.getAttribute("points");
        return rawPoints
            .trim()
            .split(" ")
            .map(p => {
                let [x, y] = p.split(",").map(Number);
                return {x, y};
            });
    } ,

    getCenterPolygonElement(shape){
        const shapePoints = tools_svg.getPointsPolygonElement(shape);
        let sumX = 0, sumY = 0;
        shapePoints.forEach(p => { sumX += p.x; sumY += p.y; });
        return {x: sumX/shapePoints.length, y: sumY/shapePoints.length};
    } ,

    getCenterCircleElement(shape){
        return {x: parseInt(shape.getAttribute("cx")), y: parseInt(shape.getAttribute("cy"))};
    } ,








    getPointInLinWithPercent(pointA , pointB , isStart=true , percent=0.1){
        return {
            x: (isStart ? percent : (1-percent)) * (pointB.x - pointA.x) + pointA.x ,
            y: (isStart ? percent : (1-percent)) * (pointB.y - pointA.y) + pointA.y ,
        }
    } ,

    getPointInLinWithLength(pointA , pointB , isStart=true , length=10){
        const d = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
        const p = length/d;
        return tools_svg.getPointInLinWithPercent(pointA , pointB , isStart , p);
    } ,









    connectDirectionPoint(svg , points , lineWidth=2 , animDuration=250 , bgColor="#9b9b9b"){
        const pointsProgressed = [];
        if (points != null && Array.isArray(points)){
            for (let i = 0; i < points.length ; i++) {
                const pointSelected = points[i];

                let isJoin = true;
                if (i == 0 || i == points.length -1){
                    isJoin = false;
                }

                if (isJoin){
                    const pointAB = tools_svg.getPointInLinWithLength(points[i-1] , points[i]  , false);
                    pointSelected.isJoin = true;
                    const pointBC = tools_svg.getPointInLinWithLength(points[i]  , points[i+1] , true);
                    pointsProgressed.push(...[pointAB , pointSelected , pointBC])
                }
                else {
                    pointsProgressed.push(pointSelected)
                }
            }
        }

        let animTimer = 0;
        for (let i = 0; i < pointsProgressed.length-1 ; i++) {
            const pointPrevious = pointsProgressed[i-1];
            const pointSelected = pointsProgressed[i];
            const pointNext = pointsProgressed[i+1];

            if (!pointNext.hasOwnProperty("isJoin") || !pointNext.isJoin){
                if (pointSelected.hasOwnProperty("isJoin") && pointSelected.isJoin){
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    const d = `
             M ${pointPrevious.x},${pointPrevious.y}
             Q ${pointSelected.x},${pointSelected.y}
               ${pointNext.x},${pointNext.y}`;
                    path.setAttribute("d", d);
                    path.setAttribute("stroke", bgColor);
                    path.setAttribute("stroke-width", lineWidth);
                    path.setAttribute("fill", "none");
                    svg.appendChild(path);

                    const length = path.getTotalLength();
                    path.setAttribute("stroke-dasharray", length);
                    path.setAttribute("stroke-dashoffset", length);

                    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                    animate.setAttribute("attributeName", "stroke-dashoffset");
                    animate.setAttribute("from", length);
                    animate.setAttribute("to", 0);
                    animate.setAttribute("dur", animDuration/2+"ms");
                    animate.setAttribute("fill", "freeze");
                    animate.setAttribute("begin", "indefinite"); // ❌
                    // animate.setAttribute("begin", animTimer+"ms");
                    requestAnimationFrame(() => {
                        path.getBoundingClientRect(); // force reflow
                        path.style.transition = `stroke-dashoffset ${animDuration}ms linear`;
                        path.style.strokeDashoffset = '0';
                    });
                    path.appendChild(animate);

                    animTimer +=animDuration/2
                }
                else {
                    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    polyline.setAttribute("points", `${pointSelected.x},${pointSelected.y}  ${pointNext.x},${pointNext.y}`);
                    polyline.setAttribute("stroke", bgColor);
                    polyline.setAttribute("stroke-width", lineWidth);
                    polyline.setAttribute("fill", "none");

                    svg.appendChild(polyline);

                    const length = polyline.getTotalLength();
                    polyline.setAttribute("stroke-dasharray", length);
                    polyline.setAttribute("stroke-dashoffset", length);

                    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                    animate.setAttribute("attributeName", "stroke-dashoffset");
                    animate.setAttribute("from", length);
                    animate.setAttribute("to", 0);
                    animate.setAttribute("dur", animDuration+"ms");
                    animate.setAttribute("fill", "freeze");
                    animate.setAttribute("begin", animTimer+"ms");
                    animate.setAttribute("begin", "indefinite"); // ❌
                    //polyline.appendChild(animate);

                    requestAnimationFrame(() => {
                        polyline.getBoundingClientRect(); // force reflow
                        polyline.style.transition = `stroke-dashoffset ${animDuration}ms linear`;
                        polyline.style.strokeDashoffset = '0';
                    });

                    animTimer +=animDuration;
                    if (pointSelected.hasOwnProperty("markerStart") && pointSelected.markerStart != null){
                        const markerId = tools_svg.addMarker(svg , pointSelected.markerStart , bgColor)
                        if (markerId != null ){
                            polyline.setAttribute("marker-start", `url(#${markerId})`);
                        }
                    }
                    if (pointNext.hasOwnProperty("markerEnd") && pointNext.markerEnd != null){

                        setTimeout(()=>{
                            const markerId = tools_svg.addMarker(svg , pointNext.markerEnd , bgColor)

                            if (markerId != null ){
                                polyline.setAttribute("marker-end", `url(#${markerId})`);
                            }
                        } , animTimer-animDuration*3)
                    }
                }
            }
        }
    } ,

    createHtmlOnPoint(svg , html , point , animDuration=100 ){
        const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreign.setAttribute("x", point.x);   // مختصات X
        foreign.setAttribute("y", point.y);   // مختصات Y
        foreign.setAttribute("width", point.width);
        foreign.setAttribute("height", point.height);
        foreign.style.position = "relative";
        foreign.style.zIndex = 2;

        foreign.insertAdjacentHTML('beforeend', html);
        if (svg != null){
            svg.appendChild(foreign);
        }

        const animY = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animY.setAttribute("attributeName", "y");
        animY.setAttribute("from", point.y - 60);
        animY.setAttribute("to", point.y);
        animY.setAttribute("dur", animDuration + "ms");
        animY.setAttribute("fill", "freeze");

        if (svg != null){
            svg.appendChild(animY);
        }
    } ,

    craeteSvgPolygon(svg , points=[] , attrs={}  , eventListiners={}  , styles={} ){
        let poly = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        poly.setAttribute("points", tools_svg.toPointsString(points));
        Object.keys(attrs).forEach(key => {
            poly.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            poly.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            poly.style[key] = styles[key];
        });
        if (svg != null){
            svg.appendChild(poly);
        }

        return poly;
    } ,

    craeteSvgCircle(svg  , centerX=0 , centerY=0 ,  radius= 10 , attrs={} , eventListiners={} , styles={} ){
        let circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        circle.setAttribute("cx", centerX)
        circle.setAttribute("cy", centerY);
        circle.setAttribute("r", radius);
        Object.keys(attrs).forEach(key => {
            circle.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            circle.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            circle.style[key] = styles[key];
        });
        if (svg != null){
            svg.appendChild(circle);
        }

        return circle;
    } ,






    craeteSvgPathToCenterCircleElement(svg , shapRelatedElement , shapRelatedDefX=0 , shapRelatedDefY=0, draw= "" , attrs={}, eventListiners={} , styles={} ){
        let center = tools_svg.getCenterCircleElement(shapRelatedElement);

        let path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("d", draw);
        path.setAttribute("transform", `translate(${center.x + shapRelatedDefX}, ${center.y + shapRelatedDefY})`);
        Object.keys(attrs).forEach(key => {
            path.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            path.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            path.style[key] = styles[key];
        });
        if (svg != null){
            svg.appendChild(path);
        }

        return path;
    } ,

    craeteSvgTextToCenterCircleElement(svg , shapRelatedElement , shapRelatedDefX=0 , shapRelatedDefY=0 , content , attrs={}, eventListiners={} , styles={} ){
        let center = tools_svg.getCenterCircleElement(shapRelatedElement);

        let text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x", center.x + shapRelatedDefX);
        text.setAttribute("y", center.y + shapRelatedDefY);
        Object.keys(attrs).forEach(key => {
            text.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            text.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            text.style[key] = styles[key];
        });
        text.textContent = content;

        if (svg != null){
            svg.appendChild(text);
        }

        return text;
    } ,







    craeteSvgPathToCenterPolygonElement(svg , shapRelatedElement , shapRelatedDefX=0 , shapRelatedDefY=0, draw= "" , attrs={} , eventListiners={} , styles={} ){
        let center = tools_svg.getCenterPolygonElement(shapRelatedElement);

        let path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("d", draw);
        path.setAttribute("transform", `translate(${center.x + shapRelatedDefX}, ${center.y + shapRelatedDefY})`);
        Object.keys(attrs).forEach(key => {
            path.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            path.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            path.style[key] = styles[key];
        });
        svg.appendChild(path);

        return path;
    } ,

    craeteSvgCircleToCenterPolygonElement(svg  , shapRelatedElement , shapRelatedDefX=0 , shapRelatedDefY=0, radius= 10 , attrs={}, eventListiners={} , styles={} ){
        let center = tools_svg.getCenterPolygonElement(shapRelatedElement);

        let circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        circle.setAttribute("cx", center.x + shapRelatedDefX)
        circle.setAttribute("cy", center.y + shapRelatedDefY);
        circle.setAttribute("r", radius);
        Object.keys(attrs).forEach(key => {
            circle.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            circle.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            circle.style[key] = styles[key];
        });
        svg.appendChild(circle);

        return circle;
    } ,

    craeteSvgTextToCenterPolygonElement(svg , shapRelatedElement , shapRelatedDefX=0 , shapRelatedDefY=0 , content , attrs={}, eventListiners={} , styles={} ){
        let center = tools_svg.getCenterPolygonElement(shapRelatedElement);

        let text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x", center.x + shapRelatedDefX);
        text.setAttribute("y", center.y + shapRelatedDefY);
        Object.keys(attrs).forEach(key => {
            text.setAttribute(key, attrs[key]);
        });
        Object.keys(eventListiners).forEach(key => {
            text.addEventListener(key, eventListiners[key]);
        });
        Object.keys(styles).forEach(key => {
            text.style[key] = styles[key];
        });
        text.textContent = content;
        svg.appendChild(text);

        return text;
    } ,

    createShadowInsidePolygonElement(svg , el , pointStart , pointsLentgh ,  attrs={}, eventListiners={} , styles={} ){
        const points = tools_svg.getPointsPolygonElement(el);
        if (points != null && points.length > 0){
            let shadowPoints = [];
            for (let i = pointStart; i < pointStart + pointsLentgh ; i++) {
                shadowPoints.push(points[i]);
            }
            shadowPoints.push(points[pointStart]);

            let polyShadow = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            polyShadow.setAttribute("points", tools_svg.toPointsString(shadowPoints));
            Object.keys(attrs).forEach(key => {
                polyShadow.setAttribute(key, attrs[key]);
            });
            Object.keys(eventListiners).forEach(key => {
                polyShadow.addEventListener(key, eventListiners[key]);
            });
            Object.keys(styles).forEach(key => {
                polyShadow.style[key] = styles[key];
            });
            svg.appendChild(polyShadow);

            return polyShadow;
        }

        return null;
    } ,

}





tools_validtor = {

    validtor_checkList(input , listRules , prop_msgRules=null , directionRtl=true , prop_size=tools_css.standardSizes.m.name) {
        let messages = [];
        let messagesForm = [];
        let rulesHtml = "";
        let isInputCurrect = true;

        const elIconHeight = tools_css.getIconSize(prop_size);
        const elfontSize = tools_css.getFontSize(prop_size);

        for (let i = 0; i < listRules.length; i++) {
            const itemRule = listRules[i];
            if (itemRule.hasOwnProperty("description") && itemRule.hasOwnProperty("params") && itemRule.hasOwnProperty("rule")) {
                let description = itemRule.description;
                const rule = itemRule.rule;
                const params = itemRule.params;

                let isTrue = false;
                switch (rule) {
                    case "_is_email" :
                        [isTrue , description] = tools_validtor.validtor_checkIsEmail(input, params , description)
                        break;
                    case "_not_empty" :
                        [isTrue , description] = tools_validtor.validtor_checkNotEmpty(input, params , description)
                        break;
                    case "_char_length" :
                        [isTrue , description] = tools_validtor.validtor_checkInputChar(input, params , description)
                        break;
                    case "_num_length" :
                        [isTrue , description] = tools_validtor.validtor_checkInputNum(input, params , description)
                        break;
                    case "_text_length" :
                        [isTrue , description] = tools_validtor.validtor_checkInputText(input, params , description)
                        break;
                    case "_text_forbidden" :
                        [isTrue , description] = tools_validtor.validtor_checkInputForbidden(input, params , description)
                        break;
                    case "_text_char_upper" :
                        [isTrue , description] = tools_validtor.validtor_checkExistChartUpper(input, params , description)
                        break;
                }

                if (!isTrue) {
                    isInputCurrect = false;
                    messages.push(description);

                    if (prop_msgRules != null && messagesForm.length != 0 ){
                        messagesForm.push(prop_msgRules)
                    }
                    else if (prop_msgRules == null){
                        messagesForm.push(description)
                    }
                }

                const iconColorError = component_props.errorColor1;
                const iconColorSuccess = component_props.successColor1;
                const icon = isTrue ? tools_icons.icon_is_true(elIconHeight , iconColorSuccess) : tools_icons.icon_is_false(elIconHeight , iconColorError);

                rulesHtml +=
                    `
                    <div style="display: flow-root;font-size: ${elfontSize}; color: ${isTrue ? iconColorSuccess : iconColorError} ;direction: ${directionRtl ? "rtl" : "ltr"}" 
                         class="item_country_code pt-1 ${i < listRules.length-1 ? "border-bottom ": ""}  mx-1 line-height-30px " >
                        <span class="icon-rule "  ms-1">${icon}</span>
                        <span class="ms-3 " > - ${description}</span>
                    </div>
                    `;

            }
        }

        return [messages , messagesForm , rulesHtml , isInputCurrect]
    } ,

    validtor_checkIsEmail(input , params , description) {
        let isValid = true;

        if (!input) {
            isValid = false;
        } else {
            const value = input.trim();

            // regex ساده برای فرمت ایمیل
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            isValid = emailRegex.test(value);
        }

        return [isValid, tools_public.replaceInTextWithPatternParams(description, params)];
    } ,

    validtor_checkNotEmpty(input , params , description) {
        let isNotEmpty = true;
        if (!input) isNotEmpty = false;
        else{
            const value = input.trim(); // حذف فاصله‌های ابتدا/انتها
            isNotEmpty = value.length > 0;
        }
        return [isNotEmpty , tools_public.replaceInTextWithPatternParams(description , params) ];
    } ,

    validtor_checkInputChar(input , params , description) {
        let min = 4;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        const nonDigitChars = input.split('').filter(char => !/\d/.test(char));
        return [nonDigitChars.length >= min , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputNum(input , params , description) {
        let min = 1;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        const digitChars = input.split('').filter(char => /\d/.test(char));
        return [digitChars.length >= min , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputText(input , params , description) {
        let min = 8;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        return [input.length >= min , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputForbidden(input , params , description) {
        let validPattern = /^[a-zA-Z0-9]*$/;
        if (params != null && params.hasOwnProperty("chars")){
            const escapedParams = params.chars.map(c => '\\' + c).join('');
            validPattern = new RegExp(`^[a-zA-Z0-9${escapedParams}]*$`);
        }
        return [validPattern.test(input) , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkExistChartUpper(input , params , description) {
        let min = 1;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        const regex = new RegExp(`(?:.*[A-Z]){${min},}`);
        return [regex.test(input) , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

}








tools_icons = {



    icon_visit(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" 
     viewBox="0 0 24 24" aria-label="visit"  width="${size}" height="${size}">
  <title>visit</title>
  <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"  stroke-linejoin="round"  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.041-3.362M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8M17.94 17.94A9.969 9.969 0 0021.542 12a9.97 9.97 0 00-4.133-5.868" />
</svg>
`;
    } ,




    icon_un_visit(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" 
     fill="none" 
     viewBox="0 0 24 24" 
     aria-label="un visit" 
 
     width="${size}" height="${size}">
  <title>un visit</title>
  <path stroke="${colorPrimary}" stroke-width="${colorSecondary}" stroke-linecap="round"  stroke-linejoin="round"    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke="${colorPrimary}" stroke-width="${colorSecondary}" stroke-linecap="round" stroke-linejoin="round"  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>
`;
    } ,





    icon_is_true(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg"   fill="none"   viewBox="0 0 24 24"  aria-label="is true"    width="${size}" height="${size}">
  <title>is true</title>
  <path stroke-linecap="round"   stroke-linejoin="round"   stroke-width="${strokeWidth}"  stroke="${colorPrimary}"    d="M5 13l4 4L19 7" />
</svg>
`;
    } ,






    icon_is_false(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg"   fill="none"  
     viewBox="0 0 24 24"   aria-label="is false"     width="${size}" height="${size}">
  <title>is false</title>
  <path stroke-linecap="round"  stroke-linejoin="round"  stroke-width="${strokeWidth}" stroke="${colorPrimary}" d="M6 18L18 6M6 6l12 12" />
</svg>
`;
    } ,




    icon_email(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg class="icon-email outline" width="${size}" height="${size}" 
      viewBox="0 0 24 24" fill="none" aria-label="email" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
  <title>Email</title>
  <rect x="2" y="5" width="20" height="14" rx="2" fop stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <path d="M3 7.5L12 13L21 7.5"  stroke="${colorPrimary}"  stroke-width="${strokeWidth}"  stroke-linecap="round"  stroke-linejoin="round"/>
</svg>
`;
    } ,




    icon_email2(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="email"
    width="${size}" height="${size}" viewBox="0 0 235 140" fill="none">
    <title>Email</title>
	<path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M229.65,127.15c0.31-1.21,0.5-2.47,0.5-3.78v-105c0-2.1-0.43-4.09-1.21-5.9L151.36,62L229.65,127.15z"/>
	<path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M117.15,67.37L223.93,6.23c-2.47-1.79-5.5-2.86-8.78-2.86h-196c-3.28,0-6.31,1.07-8.78,2.86L117.15,67.37z"/>
	<path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M5.62,11.92c-0.93,1.96-1.47,4.14-1.47,6.45v105c0,2.39,0.58,4.65,1.57,6.66l73.32-69.47L5.62,11.92z"/>
	<path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M137.81,69.84l-20.66,12.52L94.58,68.32l-83.61,67.61c2.35,1.54,5.16,2.44,8.18,2.44h196 c4.25,0,8.08-1.77,10.8-4.61L137.81,69.84z"/>
</svg>`;
    },




    icon_phone(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Phone"
    width="${size}" height="${size}" viewBox="0 0 155 187" fill="none">
    <title>Phone</title>
<g>
	<path fill="${colorPrimary}"  d="M54.12,46.33c2.57-3.51,2.49-8.44-0.47-11.87L29.18,6.17c-3.45-3.98-9.47-4.42-13.45-0.98l-2.85,2.47 L54.12,46.33z"/>
	<path fill="${colorPrimary}" d="M91.07,126.29l-0.93,0.32l16.06,54.21l3.37-1.17c4.98-1.73,7.61-7.16,5.89-12.13l-12.25-35.34 C101.48,127.2,96.04,124.56,91.07,126.29z"/>
	<path fill="${colorPrimary}" d="M85.56,128.11c-12.29,2.02-28.23-9.24-37.88-27.72c-10.41-19.93-9.75-41.06,1.08-48.83 c-0.04-0.06-0.08-0.11-0.12-0.17l1.94-1.68L8.31,11.61l-1.55,1.34c-2.27,1.96-3.38,4.76-3.29,7.54 c-1.54,15.22,9.77,49.98,29.43,87.62c23.68,45.34,50.84,78.34,62.11,75.94c1.11,0.03,2.25-0.13,3.36-0.51l2.21-0.77L85.56,128.11z" />
</g>
<path fill="none" stroke-width="${strokeWidth}" stroke="${colorPrimary}" d="M108.34,121.82c6.92-8.64,11.01-19.31,11.01-30.85c0-28.84-25.54-52.22-57.04-52.22"/>
<path fill="none" stroke-width="${strokeWidth}" stroke="${colorPrimary}" d="M120.56,130.06c8.76-10.97,13.94-24.52,13.94-39.17c0-36.62-32.32-66.31-72.2-66.31"/>
<path fill="none" stroke-width="${strokeWidth}" stroke="${colorPrimary}" d="M133.1,137.17c10.65-13.26,16.93-29.61,16.93-47.31c0-44.23-39.28-80.09-87.73-80.09"/>
</svg>`;
    },



    icon_leverage(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Leverage"
    width="${size}" height="${size}" viewBox="0 0 236 164" fill="none">
    <title>Leverage</title>
<path fill="${colorPrimary}"  d="M55.53,160.73h136.02c2.2,0,3.99-1.79,3.99-3.99v-0.36c0-2.2-1.79-3.99-3.99-3.99H55.53 c-2.2,0-3.99,1.79-3.99,3.99v0.36C51.54,158.94,53.32,160.73,55.53,160.73z"/>
<path fill="${colorPrimary}"  d="M233.1,44.19c-1.43-4.38-6.14-6.76-10.52-5.33l-90.64,29.68c-1.74-1.86-4.23-2.8-6.72-2.61 c-3.09-0.23-6.2,1.27-7.85,4.14l-2.31,4.01l-91.11,29.84c-4.38,1.43-6.76,6.14-5.33,10.52s6.14,6.76,10.52,5.33l73.43-24.05 l-29.91,51.81c-2.3,3.99-0.94,9.09,3.05,11.39v0c3.99,2.3,9.09,0.94,11.39-3.05l38.13-66.04l38.13,66.04 c2.3,3.99,7.4,5.35,11.39,3.05v0c3.99-2.3,5.35-7.4,3.05-11.39l-37.12-64.29l87.09-28.52C232.15,53.27,234.53,48.56,233.1,44.19z  M125.51,86.55c-4.73,0-8.57-4.14-8.57-9.24c0-5.11,3.84-9.24,8.57-9.24c4.73,0,8.57,4.14,8.57,9.24 C134.08,82.41,130.24,86.55,125.51,86.55z"/>
<circle fill="${colorPrimary}"  cx="27.57" cy="74.6" r="23.97"/>
<circle fill="${colorPrimary}"  cx="213.3" cy="20.79" r="17.76"/>
<path fill="${colorSecondary}" opacity="0.5"  d="M195.54,20.79c0,9.81,7.95,17.76,17.76,17.76s17.76-7.95,17.76-17.76S195.54,10.98,195.54,20.79z"/>
<path fill="${colorSecondary}" opacity="0.5"  d="M3.6,74.6c0,13.24,10.73,23.97,23.97,23.97S51.54,87.84,51.54,74.6S3.6,61.36,3.6,74.6z"/>
</svg>`;
    },




    icon_leverage2(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Leverage"
    width="${size}" height="${size}" viewBox="0 0 340 260" fill="none">
    <title>Leverage</title>
	<path fill="${colorPrimary}" d="M148.86,61.23c-0.75-2.67-0.92-5.37-0.6-7.96L26.86,87.22c-2.66,0.74-4.21,3.5-3.47,6.16l1.53,5.45 c0.74,2.66,3.5,4.21,6.16,3.47l121.4-33.95C150.86,66.3,149.61,63.9,148.86,61.23z"/>
	<path fill="${colorPrimary}" d="M305.78,9.21l-121.4,33.95c1.62,2.05,2.87,4.45,3.62,7.12c0.75,2.67,0.92,5.37,0.6,7.96L310,24.3 c2.66-0.74,4.21-3.5,3.47-6.16l-1.53-5.45C311.2,10.02,308.44,8.47,305.78,9.21z"/>
	<path fill="${colorPrimary}" d="M176.83,193.83V74.94c-2.36,0.89-4.91,1.4-7.58,1.4s-5.22-0.51-7.58-1.4v118.89c0,16.57-13.43,30-30,30h-10.62 c-11.05,0-20,8.95-20,20v0.72h137.94v-0.72c0-11.05-8.95-20-20-20h-12.16C190.26,223.83,176.83,210.4,176.83,193.83z"/>
	<path fill="${colorPrimary}" d="M243.87,253.95H90.99c-1.1,0-2-0.9-2-2v-2.39c0-1.1,0.9-2,2-2h152.88c1.1,0,2,0.9,2,2v2.39 C245.87,253.05,244.98,253.95,243.87,253.95z"/>
	<path fill="${colorPrimary}" d="M188.73,4.81h-40.61c-2.76,0-5,2.24-5,5v3.43h7.95c5.52,0,10,4.48,10,10v14.04c2.45-0.92,5.1-1.43,7.88-1.43 c2.38,0,4.68,0.38,6.83,1.06V23.24c0-5.52,4.48-10,10-10h7.95V9.81C193.73,7.05,191.5,4.81,188.73,4.81z"/>
	<rect fill="${colorSecondary}" x="18.2" y="90.62" transform="matrix(0.8577 0.5141 -0.5141 0.8577 63.6904 7.2347)" width="1.14" height="56.16"/>
	<rect fill="${colorSecondary}" x="47.89" y="89.88" transform="matrix(0.835 -0.5502 0.5502 0.835 -57.1768 46.2013)" width="1.14" height="57.14"/>
	<path fill="${colorPrimary}" d="M4.07,143.72c0,16.8,13.62,30.41,30.41,30.41s30.41-13.62,30.41-30.41c0-0.65-0.04-2.09-0.04-2.09L3.85,142.1 C3.85,142.1,4.07,143.07,4.07,143.72z"/>
	<rect fill="${colorSecondary}" x="290.02" y="12.17" transform="matrix(0.8577 0.5141 -0.5141 0.8577 62.0311 -143.6599)" width="1.14" height="56.16"/>
	<rect fill="${colorSecondary}" x="319.71" y="11.44" transform="matrix(0.835 -0.5502 0.5502 0.835 30.8218 182.8121)" width="1.14" height="57.14"/>
	<path fill="${colorPrimary}" d="M275.89,65.27c0,16.8,13.62,30.41,30.41,30.41c16.8,0,30.41-13.62,30.41-30.41c0-0.65-0.04-2.09-0.04-2.09 l-61.01,0.47C275.67,63.65,275.89,64.62,275.89,65.27z"/>
	<circle fill="${colorSecondary}" cx="32.66" cy="93.91" r="3.98"/>
	<circle fill="${colorSecondary}" cx="304.81" cy="16.53" r="3.98"/>
	<path fill="${colorPrimary}" d="M168.43,40.76c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15s15-6.72,15-15 C183.43,47.47,176.72,40.76,168.43,40.76z M168.43,60.92c-2.85,0-5.16-2.31-5.16-5.16c0-2.85,2.31-5.16,5.16-5.16 s5.16,2.31,5.16,5.16C173.59,58.61,171.28,60.92,168.43,60.92z"/>
</svg>`;
    },









    icon_lock(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg class="icon-password lock" width="${size}" height="${size}" viewBox="0 0 24 24" 
     fill="none"aria-label="lock"xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <title>lock</title>
  <rect x="5" y="10" width="14" height="10" rx="2" stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>
`;
    } ,





    icon_tik(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg class="icon-selected-check" width="${size}" height="${size}"
     viewBox="0 0 24 24" fill="none" aria-label="tik" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false" style="padding:2px;">
  <title>tik</title> 
  <path d="M20 6L9 17l-5-5" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    } ,





    icon_plus_badge(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="plus badge"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>plus badge</title>
    <path d="M12 8v8M8 12h8" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    } ,




    icon_minus_badge(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="minus badge"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>minus badge</title>
    <path d="M8 12h8" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    } ,





    icon_arrow_down(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="arrow down"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>arrow down</title>
    <path d="M6 9l6 6 6-6" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }  ,








    icon_arrow_up(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="arrow up"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>arrow up</title>
    <path d="M18 15l-6-6-6 6" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    },








    icon_arrow_right(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="arrow right"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>arrow right</title>
    <path d="M9 6l6 6-6 6" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    },



    icon_arrow_left(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="arrow left"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>arrow left</title>
    <path d="M15 6l-6 6 6 6" stroke="${colorPrimary}"  stroke-width="${strokeWidth}"  stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    },




    icon_clear(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="clear"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>clear</title>
    <path d="M6 6l12 12M6 18L18 6" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    },




    icon_close(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="close"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
      <title>close</title>
    <path d="M6 6l12 12M6 18L18 6"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    },





    icon_exclamation_square(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="exclamation square"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <title>exclamation square</title>
  <rect x="3" y="3" width="18" height="18" rx="3" ry="3"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <path d="M12 7v6M12 17h0"  stroke="${colorPrimary}" stroke-width="${strokeWidth}"/>
</svg>`;
    },






    icon_password(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img"  aria-label="password" 
      width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
      <title>password</title>
  <rect x="5" y="10" width="14" height="10" rx="2" fill="${colorSecondary}"  stroke="${colorPrimary}" stroke-width="${strokeWidth}"/>
  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>
`;
    } ,




    icon_search(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="search"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>search</title>
    <circle cx="11" cy="11" r="7" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  fill="${colorSecondary}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    } ,







    icon_pin_close(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" aria-label="pin closed"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <title>pin closed</title>
  <path d="M16 3v4l2 2-4 4 2 2v4H8v-4l2-2-4-4 2-2V3h8z" stroke="${colorPrimary}" fill="${colorSecondary}"/>
</svg>`;
    } ,






    icon_pin_open(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" aria-label="pin open"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <title>pin open</title>
  <path d="M16 3v4l2 2-4 4 2 2v4H8v-4l2-2-4-4 2-2V3h8z" stroke="${colorPrimary}" fill="${colorSecondary}"/>
  <line x1="4" y1="20" x2="20" y2="4"  stroke="${colorPrimary}"/>
</svg>`;
    } ,







    icon_pin_open2(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Note"
    width="${size}" height="${size}" viewBox="0 0 201 239" fill="none">
    <title>pin open</title>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" class="st0" d="M94.26,23.64l58.45,36.66c2.34,1.47,5.43,0.76,6.89-1.58l3.72-5.93c1.47-2.34,0.76-5.43-1.58-6.89L103.3,9.24c-2.34-1.47-5.43-0.76-6.89,1.58l-3.72,5.93C91.22,19.09,91.92,22.17,94.26,23.64z"/>
    <rect fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x="82.98" y="42.85" transform="matrix(0.8471 0.5314 -0.5314 0.8471 50.5191 -47.9085)"  width="51.1" height="42"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M45.9,105.35l51.33,32.2c7.02,4.4,16.28,2.28,20.68-4.74l6.38-10.17c4.4-7.02,2.28-16.28-4.74-20.68 l-51.33-32.2c-7.02-4.4-16.28-2.28-20.68,4.74l-6.38,10.17C36.76,91.69,38.88,100.95,45.9,105.35z"/>
    <polyline fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="4" points="33.6,162.7 18.83,185.43 13.43,215.82 38.68,197.88 79.85,132.65 60,120.2 41.66,149.04 "/>
    <path fill="${colorPrimary}" d="M136.08,47.57l17.74,11.12c1.87,1.17,4.34,0.61,5.51-1.26l2.76-4.4c1.17-1.87,0.61-4.34-1.26-5.51l-17.74-11.12 L136.08,47.57z"/>
    <path fill=${colorPrimary} d="M100.19,81.29l17.54,11c0.94,0.59,2.17,0.3,2.76-0.63l18.36-29.27c0.59-0.94,0.3-2.17-0.63-2.76l-17.54-11L100.19,81.29z"/>
    <path fill="${colorPrimary}" d="M83.19,126.75l17.57,11.02c4.68,2.93,10.85,1.52,13.79-3.16l9.4-14.99c3.23-5.15,1.67-11.94-3.47-15.16l-16.73-10.49L83.19,126.75z"/>
    <polygon fill="${colorPrimary}" points="21.91,205.13 68.29,131.28 73.99,134.49 35.68,195.88 "/>
</svg>`;
    } ,






    icon_select_columns(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="select column"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <title>select columns</title>
  <rect x="3"  y="4" width="4" height="16" rx="0.8" fill="${colorPrimary}" opacity="0.25" />
  <rect x="3"  y="4" width="4" height="16" rx="0.8" stroke-width="${strokeWidth}" stroke="${colorPrimary}" fill="none"/>
  
  <rect x="10" y="3" width="4" height="18" rx="0.8" fill="${colorPrimary}" opacity="0.75"/>
  <rect x="10" y="3" width="4" height="18" rx="0.8" stroke-width="${strokeWidth}" stroke="${colorPrimary}" fill="none"/>
  
  <rect x="17" y="4" width="4" height="16" rx="0.8" fill="${colorPrimary}" opacity="0.25" />
  <rect x="17" y="4" width="4" height="16" rx="0.8" stroke-width="${strokeWidth}" stroke="${colorPrimary}" fill="none"/>
</svg>`;


    } ,







    icon_calendar(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="calendar"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>calendar</title>
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="${colorSecondary}"/>
  <line x1="16" y1="2" x2="16" y2="6"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
  <line x1="8" y1="2" x2="8" y2="6"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
  <line x1="3" y1="10" x2="21" y2="10"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    },







    icon_back_left(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="arrow left"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>arrow left</title>
  <path d="M14 6 L8 12 L14 18 Z" fill="${colorPrimary}"/>
  <line x1="16" y1="12" x2="22" y2="12" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    },




    icon_back_right(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="arrow right"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>arrow right</title>
  <path d="M10 6 L16 12 L10 18 Z" fill="${colorPrimary}"/>
  <line x1="2" y1="12" x2="8" y2="12" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    },






    icon_excel(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="excel"
    width="${size}" height="${size}" viewBox="0 0 340 380" fill="none">
  <title>excel</title>
  <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M234.65,349.08h64.75c15.05,0,27.25-12.2,27.25-27.25v-266c0-15.05-12.2-27.25-27.25-27.25h-64.75V349.08z"/>
  <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  d="M197.4,6.58l-174.75,22c-5.52,0-10,4.48-10,10v300.5c0,5.52,4.48,10,10,10l174.75,21 c15.05,0,27.25-12.2,27.25-27.25v-309C224.65,18.78,212.45,6.58,197.4,6.58z M162.52,146.8h-11.22l-29.45,61.75l30.75,65.64h9.92 v12.55H123.9V274.2h9.84l-21.41-45.69L90.55,274.2h6.85v12.55H58.79V274.2h12.84l31.33-65.71l-28.9-61.69H59.98v-12.55h38.61v12.55 h-5.68l19.55,41.74l19.91-41.74h-8.47v-12.55h38.61V146.8z"/>
</svg>`;
    } ,






    icon_print(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
        const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="print"
    width="${size}" height="${size}" viewBox="0 0 350 205" fill="none">
  <title>print</title>
  <path fill="${colorPrimary}" d="M327.75,80.75h-77c-5.52,0-10,4.48-10,10v5.21c0,5.41-4.39,9.79-9.79,9.79H118.62c-5.45,0-9.87-4.42-9.87-9.87v-5.13 c0-5.52-4.48-10-10-10h-77c-5.52,0-10,4.48-10,10v135c0,5.52,4.48,10,10,10h77c5.52,0,10-4.48,10-10l7-20.03 c0-8.27-0.3-14.97,7.97-14.97h100.87c8.92,0,7.16,7.23,7.16,16.16l9,18.84c0,5.52,4.48,10,10,10h77c5.52,0,10-4.48,10-10v-135 C337.75,85.22,333.27,80.75,327.75,80.75z M315.03,105.83c3.28,0,5.94,2.66,5.94,5.94s-2.66,5.94-5.94,5.94 c-3.28,0-5.94-2.66-5.94-5.94S311.75,105.83,315.03,105.83z M315.03,139.96c-3.94,0-7.14-3.2-7.14-7.14s3.2-7.14,7.14-7.14 c3.94,0,7.14,3.2,7.14,7.14S318.97,139.96,315.03,139.96z"/>
  <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M125.73,101.29h99.16c6.24,0,11.3-3,11.3-6.69V16.54c0-3.7-5.06-6.69-11.3-6.69h-84.14 c-3.14,0-6.13,0.77-8.27,2.13l-15.02,16.54c-1.95,1.24-3.03,10.87-3.03,12.56V94.6C114.42,98.3,119.48,101.29,125.73,101.29z"/>
  <path fill="${colorPrimary}" d="M130.22,11.98L115.2,28.53c-1.39,0.88-2.34,6.04-2.77,9.54h21.22c5.85,0,10.57-4.76,10.53-10.61l-0.14-17.6h-5.55 C135.35,9.85,132.36,10.62,130.22,11.98z"/>
  <path fill="${colorSecondary}" stroke="${colorPrimary}"  stroke-width="${strokeWidth}"  d="M129.94,197.43h85.72c2.74,0,5.25,1.63,6.48,4.2l28.84,60.58c2.41,5.06-1.09,11-6.48,11H108.93 c-5.03,0-8.52-5.25-6.8-10.21l21.01-60.58C124.18,199.43,126.89,197.43,129.94,197.43z"/>
  <line fill="${colorSecondary}" stroke="${colorPrimary}"  stroke-width="${strokeWidth}"  x1="236.19" y1="258.44" x2="116.97" y2="258.44"/>
  <line fill="${colorSecondary}" stroke="${colorPrimary}"  stroke-width="${strokeWidth}"  x1="223.59" y1="240.75" x2="127.31" y2="240.75"/>
  <line fill="${colorSecondary}" stroke="${colorPrimary}"  stroke-width="${strokeWidth}"  x1="212.98" y1="225.47" x2="136.18" y2="225.47"/>
</svg>`;
    },






    icon_filter(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="filter"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>filter</title>
  <path d="M4 4h16l-6 7v6l-4 3v-9L4 4z" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="${colorSecondary}"/>
</svg>`;
    },





    icon_clear_broom(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="clear broom"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>clear broom</title>
  
    <path d="M15 2L9 14" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <path d="M8 14c-1 2-2 4-2 6h12c0-2-1-4-2-6H8z" stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}" stroke-linejoin="round"/>
    <path d="M7 20h10" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    },





    icon_empty(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="empty"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>empty</title>

  <circle cx="12" cy="12" r="9" stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <path d="M8 16L16 8" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    },







    icon_inputText(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none">
  <title>input text</title>
  <rect x="3" y="7" width="18" height="10" rx="2" stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <text x="7" y="14" font-size="8" fill="${colorPrimary}" font-family="Arial" font-weight="bold">A</text>
</svg>`;
    },






    icon_selectOption(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none">
  <title>select option</title>
  <rect x="3" y="7" width="18" height="10" rx="2" fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"/>
  <path d="M9 11l3 3 3-3" stroke="${colorPrimary}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    },








    icon_inputColor(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none">
  <title>input color</title>
  <rect x="3" y="7" width="18" height="10" rx="2" stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <circle cx="12" cy="12" r="3" fill="${colorPrimary}"/>
</svg>`;
    },









    icon_math(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none">
  <title>math</title>
  <rect x="3" y="3" width="18" height="18" rx="3" stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}"/>
  <path d="M8 8l8 8M16 8l-8 8M12 6v4M12 14v4" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    },






    icon_input_acl(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="input acl"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>input acl</title>
 
  <rect x="3" y="5" width="18" height="14" rx="3" ry="3" fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="1.5"/>
  <path d="M9 10l3 3 3-3" stroke="${colorPrimary}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="17" cy="15" r="2" stroke="${colorPrimary}" stroke-width="1.3"/>
  <line x1="18.5" y1="16.5" x2="20" y2="18" stroke="${colorPrimary}" stroke-width="1.3" stroke-linecap="round"/>
</svg>`;
    } ,







    icon_selectAllRight(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="select all right"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>select all right</title>
 
  <path d="M4 8l6 4-6 4"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 8l6 4-6 4" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    } ,







    icon_selectAllLeft(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="select all left"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>select all left</title>
  <path d="M20 8l-6 4 6 4" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 8l-6 4 6 4" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    } ,






    icon_edit(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="edit"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>edit</title>
  <path d="M3 17.25V21h3.75L17.81 9.94a1 1 0 0 0 0-1.41L15.47 6.19a1 1 0 0 0-1.41 0L3 17.25z" fill="${colorSecondary}"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linejoin="round" />
  <path d="M14.06 7.02l2.92 2.92"   stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
    } ,





    icon_delete(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {

        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="delete"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>delete</title>
  <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linejoin="round"  d="M9 3h6l1 2h4v2H4V5h4l1-2z" />
  <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linejoin="round"  d="M6 7h12l-1 13H7L6 7z"/>
  <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" stroke-linecap="round" d="M10 10v8M14 10v8"/>
</svg>`;
    } ,





    icon_wallet(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet"
    width="${size}" height="${size}" viewBox="0 0 346 244"  fill="none">
  <title>wallet</title>
    <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M229.73,181.71c-15.74,0-28.5-12.76-28.5-28.5v-4c0-15.74,12.76-28.5,28.5-28.5h41.5V82.65 c0-13.25-10.75-24-24-24h-207c-13.25,0-24,10.75-24,24v132c0,13.25,10.75,24,24,24h207c13.25,0,24-10.75,24-24v-32.94H229.73z"/>
    <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M225.21,54.36l-21.09-37.72c-5.1-9.8-17.17-13.61-26.97-8.52l-88.9,46.22L225.21,54.36z"/>
    <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M295.98,125.21h-67.8c-11.05,0-20,8.95-20,20v10.88c0,11.05,8.95,20,20,20h67.8c5.52,0,10-4.48,10-10v-30.88 C305.98,129.69,301.5,125.21,295.98,125.21z M234.65,169.23c-10.26,0-18.58-8.32-18.58-18.58s8.32-18.58,18.58-18.58 s18.58,8.32,18.58,18.58S244.91,169.23,234.65,169.23z"/>
</svg>`;
    } ,








    icon_wallet2(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {

        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet"
    width="${size}" height="${size}" viewBox="0 0 197.43 203.49"  fill="none">
  <title>wallet</title>
    <path fill="none" opacity="0.4" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M142.99,159.38c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L142.99,159.38z"/>
    <path fill="${colorPrimary}" opacity="0.2" d="M152.66,81.2c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L119.6,13.62 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,80.95,152.66,81.2,152.66,81.2z"/>
    <path fill="${colorPrimary}" opacity="0.2" d="M14.78,144v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
    <path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M14.78,144v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
    <line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="105.35" x2="184.14" y2="105.35"/>
    <line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="170.91" x2="184.14" y2="170.91"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M142.99,154.52c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L142.99,154.52z"/>
    <circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  cx="149.91" cy="138.64" r="7.77"/>
    <path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M152.66,83.25c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L119.6,15.67 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,83,152.66,83.25,152.66,83.25z"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M133.5,83.26l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C90.9,81.95,133.5,83.26,133.5,83.26z"/>
    <path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M92.71,78.8c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75s-5.26-11.75-11.75-11.75 S92.71,72.31,92.71,78.8z"/>
</svg>`;
    } ,











    icon_wallet_add(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        if (variant == "small"){
            return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet_add"
    width="${size}" height="${size}" viewBox="0 0 216 200"  fill="none">
  <title>Wallet Add</title>
<g id="Layer_1">
	<path opacity="0.4" fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M161.56,83.22c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L161.56,83.22z"/>
	<path opacity="0.2" fill="${colorPrimary}"  d="M33.35,67.84v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20V27.21c0-11.05-8.95-20-20-20H53.35 c-11.05,0-20,8.95-20,20v24.72"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M33.35,67.84v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20V27.21c0-11.05-8.95-20-20-20H53.35c-11.05,0-20,8.95-20,20v24.72"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="36.35" y1="29.19" x2="202.71" y2="29.19"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="36.35" y1="94.75" x2="202.71" y2="94.75"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M161.56,78.36c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L161.56,78.36z"/>
	<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="168.47" cy="62.48" r="7.77"/>
</g>
<g id="Layer_2">
	<path fill="${colorSecondary}" d="M5.74,71.38c1.65,4.59,11.06,18.67,26.83,18.59C47.19,89.9,61.22,77.7,61.22,61.33 c0-15.82-12.83-28.65-28.65-28.65c-12.93,0-23.43,9.34-27.1,19.33"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth/2}"  d="M5.73,71.39C9.8,82.26,20.28,90,32.57,90c15.82,0,28.65-12.83,28.65-28.65S48.39,32.71,32.57,32.71 c-12.55,0-23.21,8.07-27.09,19.3"/>
	<path fill="${colorPrimary}" d="M18.87,67.42h27.89c2.76,0,5-2.24,5-5v-2.18c0-2.76-2.24-5-5-5H18.87c-2.76,0-5,2.24-5,5v2.18 C13.87,65.18,16.11,67.42,18.87,67.42z"/>
	<path fill="${colorPrimary}" d="M26.73,47.97v27.89c0,2.76,2.24,5,5,5h2.18c2.76,0,5-2.24,5-5V47.97c0-2.76-2.24-5-5-5h-2.18 C28.96,42.97,26.73,45.21,26.73,47.97z"/>
</g>
</svg>`;

        }
        else {
            return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet_add"
    width="${size}" height="${size}" viewBox="0 0 216 200"  fill="none">
  <title>Wallet Add</title>
<g id="Layer_1">
	<path opacity="0.4" fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M164.39,156.99c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L164.39,156.99z"/>
	<path opacity="0.2" fill="${colorPrimary}"  d="M36.18,141.61v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H56.18 c-11.05,0-20,8.95-20,20v24.72"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M36.18,141.61v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H56.18 c-11.05,0-20,8.95-20,20v24.72"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="39.18" y1="102.96" x2="205.54" y2="102.96"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="39.18" y1="168.51" x2="205.54" y2="168.51"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M164.39,152.12c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L164.39,152.12z"/>
	<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth/2}" cx="171.31" cy="136.25" r="7.77"/>
</g>
<g id="Layer_2">
	<path fill="${colorSecondary}" class="st5" d="M8.57,145.15c1.65,4.59,11.06,18.67,26.83,18.59c14.61-0.08,28.65-12.28,28.65-28.65 c0-15.82-12.83-28.65-28.65-28.65c-12.93,0-23.43,9.34-27.1,19.33"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth/2}" d="M8.56,145.15c4.07,10.87,14.55,18.61,26.84,18.61c15.82,0,28.65-12.83,28.65-28.65s-12.83-28.65-28.65-28.65 c-12.55,0-23.21,8.07-27.09,19.3"/>
	<path fill="${colorPrimary}" d="M21.7,141.18H49.6c2.76,0,5-2.24,5-5V134c0-2.76-2.24-5-5-5H21.7c-2.76,0-5,2.24-5,5v2.18 C16.7,138.94,18.94,141.18,21.7,141.18z"/>
	<path fill="${colorPrimary}" d="M29.56,121.74v27.89c0,2.76,2.24,5,5,5h2.18c2.76,0,5-2.24,5-5v-27.89c0-2.76-2.24-5-5-5h-2.18 C31.8,116.74,29.56,118.98,29.56,121.74z"/>
</g>
<g id="Layer_3">
	<path opacity="0.2" fill="${colorPrimary}" d="M170.55,77.01c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L137.49,9.42 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C102.83,76.75,170.55,77.01,170.55,77.01z"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M170.55,79.06c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C102.83,78.8,170.55,79.06,170.55,79.06z"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M151.39,79.07L162,66.69c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C108.79,77.76,151.39,79.07,151.39,79.07z" />
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth/2}"  d="M110.6,74.61c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75s-5.26-11.75-11.75-11.75 S110.6,68.12,110.6,74.61z"/>
</g>
</svg>`;
        }
    } ,












    icon_cardNumber(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 4;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="card_number"
    width="${size}" height="${size}" viewBox="0 0 316 221" fill="none">
  <title>Card Number</title>
    <g>
     	<path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}"   d="M271.25,138.17c-22.09,0-40,17.91-40,40c0,22.09,17.91,40,40,40s40-17.91,40-40 C311.25,156.08,293.34,138.17,271.25,138.17z M289.73,174.17h-6.51l-2.36,8.06h6.87c2.22,0,4.03,1.8,4.03,4.03v0 c0,2.22-1.8,4.03-4.03,4.03h-9.22l-1.69,5.78c-0.62,2.14-2.86,3.36-5,2.74h0c-2.14-0.62-3.36-2.86-2.74-5l1.03-3.52h-5.73 l-1.69,5.78c-0.62,2.14-2.86,3.36-5,2.74h0c-2.14-0.62-3.36-2.86-2.74-5l1.03-3.52h-3.21c-2.22,0-4.03-1.8-4.03-4.03v0 c0-2.22,1.8-4.03,4.03-4.03h5.56l2.36-8.06h-5.92c-2.22,0-4.03-1.8-4.03-4.03s1.8-4.03,4.03-4.03h8.27l1.71-5.85 c0.62-2.14,2.86-3.36,5-2.74c2.14,0.62,3.36,2.86,2.74,5l-1.05,3.59h5.73l1.71-5.85c0.62-2.14,2.86-3.36,5-2.74 c2.14,0.62,3.36,2.86,2.74,5l-1.05,3.59h4.16c2.22,0,4.03,1.8,4.03,4.03S291.95,174.17,289.73,174.17z"/>
        <polygon fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  points="266.73,182.23 272.47,182.23 274.82,174.17 269.09,174.17"/>
    </g>
    <g>
	    <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M260.25,6.17h-234c-11.05,0-20,8.95-20,20v140c0,11.05,8.95,20,20,20h194c0-33.14,26.86-60,60-60v-100 C280.25,15.12,271.3,6.17,260.25,6.17z M63.04,15.21c19.33,0,35,15.67,35,35c0,19.33-15.67,35-35,35s-35-15.67-35-35 C28.04,30.88,43.71,15.21,63.04,15.21z M232.67,111.41c0,5.44-4.41,9.85-9.85,9.85H37.89c-5.44,0-9.85-4.41-9.85-9.85v0 c0-5.44,4.41-9.85,9.85-9.85h184.93C228.26,101.56,232.67,105.97,232.67,111.41L232.67,111.41z"/>
        <polygon fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}" points="56.6,68.24 68.73,68.24 68.73,42.17 83.34,42.17 83.34,31.56 42.41,31.56 42.41,42.17 56.6,42.17 "/>
    </g>
</svg>`;
    },



    icon_note(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Note"
    width="${size}" height="${size}" viewBox="0 0 201 239" fill="none">
  <title>Note</title>
    <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}" d="M171.38,228.02h-141c-11.05,0-20-8.95-20-20v-147c0-11.05,8.95-20,20-20h141c11.05,0,20,8.95,20,20v147 C191.38,219.07,182.42,228.02,171.38,228.02z"/>
    <circle fill="${colorPrimary}" cx="48.59" cy="102.88" r="10"/>
    <path fill="${colorPrimary}" d="M155.95,108.63H77.76c-3.31,0-6-2.69-6-6v0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6v0 C161.95,105.95,159.26,108.63,155.95,108.63z"/>
    <circle fill="${colorPrimary}" cx="49.12" cy="135.28" r="10"/>
    <path fill="${colorPrimary}" d="M156.48,141.03H78.29c-3.31,0-6-2.69-6-6v0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6v0 C162.48,138.35,159.79,141.03,156.48,141.03z"/>
    <circle fill="${colorPrimary}" cx="47.7" cy="167.68" r="10"/>
    <path fill="${colorPrimary}" d="M155.06,173.43H76.87c-3.31,0-6-2.69-6-6l0,0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6l0,0 C161.06,170.75,158.37,173.43,155.06,173.43z"/>
    <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M55.33,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30s20,13.43,20,30"/>
    <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M103.83,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30s20,13.43,20,30"/>
    <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M143.83,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30c11.05,0,20,13.43,20,30"/>
</svg>`;
    } ,





    icon_tag(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Title"
    width="${size}" height="${size}" viewBox="0 0 277 300" fill="none">
    <title>Title</title>
    <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" fill="${colorSecondary}" d="M94.38,279.52l111.46-121.67l25.83-101.33c0,0-102.08,29.43-103.26,30.41L16.95,208.59 c-7.46,8.14-6.91,20.8,1.24,28.26l47.93,43.91C74.27,288.22,86.92,287.67,94.38,279.52z"/>
    <path fill="${colorPrimary}" d="M66.13,199.07l41.81-45.64c1.7-1.85,1.57-4.73-0.28-6.42h0c-1.85-1.7-4.73-1.57-6.42,0.28l-41.81,45.64 c-1.7,1.85-1.57,4.73,0.28,6.42l0,0C61.56,201.05,64.44,200.92,66.13,199.07z"/>
    <path fill="${colorPrimary}" d="M134.07,213.17l-45.64-41.81c-1.85-1.7-4.73-1.57-6.42,0.28h0c-1.7,1.85-1.57,4.73,0.28,6.42l45.64,41.81 c1.85,1.7,4.73,1.57,6.42-0.28h0C136.05,217.75,135.93,214.87,134.07,213.17z"/>
    <circle fill="${colorPrimary}" cx="188.52" cy="99.03" r="12.5"/>
    <path stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M179.21,67.43c-12.1-45.11-0.09-44.43,30.26-53.62c42.13-12.77,46.69-7.12,54.32,38.78 c4.3,25.88-16.7,34.71-62.57,45.91"/>
</svg>`;
    },



    icon_title(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Title"
    width="${size}" height="${size}" viewBox="0 0 230 280" fill="none">
    <title>Title</title>
      <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M83,37.5H50V24c0-8.28-6.72-15-15-15h-7c-8.28,0-15,6.72-15,15v64c0,8.28,6.72,15,15,15h7c8.28,0,15-6.72,15-15 V74.5h33c8.28,0,15-6.72,15-15v-7C98,44.22,91.28,37.5,83,37.5z"/>
      <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M164.21,74.99l33-0.31l0.13,13.5c0.08,8.28,6.86,14.94,15.14,14.86l7-0.07c8.28-0.08,14.94-6.86,14.86-15.14 l-0.61-64c-0.08-8.28-6.86-14.94-15.14-14.86l-7,0.07c-8.28,0.08-14.94,6.86-14.86,15.14l0.13,13.5l-33,0.31 c-8.28,0.08-14.94,6.86-14.86,15.14l0.07,7C149.15,68.41,155.92,75.07,164.21,74.99z"/>
      <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M178.32,225H143V29.97c0-8.28-6.72-15-15-15h-10c-8.28,0-15,6.72-15,15V225H67.68c-8.28,0-15,6.72-15,15v10 c0,8.28,6.72,15,15,15H118h10h50.32c8.28,0,15-6.72,15-15v-10C193.32,231.72,186.61,225,178.32,225z"/>
</svg>`;
    },




    icon_type(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Type"
    width="${size}" height="${size}" viewBox="0 0 150 160" fill="none">
    <title>Type</title>
   <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  d="M133.93,54.3c-1.32-2.25-3.23-3.76-6.21-5.04c-0.07,1.99-0.45,3.8-0.74,5.14c-5.07,22.91-14.5,54.28-16.08,59.54 c-2.85,7.94-9.7,23.63-22.35,26.11c-2.44,0.48-3.95,0.24-10.83-1.02c-31.01-5.66-38.01-7.64-45.98-10.86 c-4.26-1.73-7.32-3.21-9.54-4.49c0.04,2.76,0.65,4.87,1.71,6.79c1,1.8,3.16,4.79,15.66,9.85c7.97,3.23,14.97,5.21,45.98,10.86 c6.89,1.26,8.39,1.5,10.83,1.02c12.65-2.48,19.5-18.17,22.35-26.11c1.59-5.26,11.01-36.63,16.08-59.54 C135.45,63.67,136.48,58.66,133.93,54.3z"/>
   <path fill="${colorPrimary}" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  d="M124.97,37.87c-1.32-2.25-3.23-3.76-6.21-5.04c-0.07,1.99-0.45,3.8-0.74,5.14c-5.07,22.91-14.5,54.28-16.08,59.54 c-2.85,7.94-9.7,23.63-22.35,26.11c-2.44,0.48-3.95,0.24-10.83-1.02c-31.01-5.66-38.01-7.64-45.98-10.86 c-4.26-1.73-7.32-3.21-9.54-4.49c0.04,2.76,0.65,4.87,1.71,6.79c1,1.8,3.16,4.79,15.66,9.85c7.97,3.23,14.97,5.21,45.98,10.86 c6.89,1.26,8.39,1.5,10.83,1.02c12.65-2.48,19.5-18.17,22.35-26.11c1.59-5.26,11.01-36.63,16.08-59.54 C126.49,47.24,127.53,42.23,124.97,37.87z"/>
   <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M115.58,21.58c-2.8-4.77-8.21-6.24-21.1-9.22C83.94,9.92,74.99,7.98,68.21,6.55C64.06,5.2,57.57,3.86,50.78,6.06 c-6.74,2.19-10.71,6.87-19.96,21.71C15.04,53.07,10.18,65.85,7.33,74.51C3.03,87.55,3.02,93.19,5.56,97.75 c1,1.8,3.16,4.79,15.66,9.85c7.97,3.23,14.97,5.21,45.98,10.86c6.89,1.26,8.39,1.5,10.83,1.02c12.65-2.48,19.5-18.17,22.35-26.11 c1.59-5.26,11.01-36.63,16.08-59.54C117.1,30.95,118.14,25.94,115.58,21.58z M78.66,95.23c-1.55,0.8-3.45,0.19-4.25-1.36 L59.18,64.25c-1.74,0.67-3.62,1.05-5.59,1.05c-8.62,0-15.61-6.99-15.61-15.61c0-8.62,6.99-15.61,15.61-15.61S69.2,41.06,69.2,49.69 c0,4.37-1.8,8.31-4.68,11.14l15.51,30.15C80.82,92.53,80.21,94.43,78.66,95.23z"/>
</svg>`;
    },



    icon_number(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Type"
    width="${size}" height="${size}" viewBox="0 0 73.77 69.22" fill="none">
    <title>number</title>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M13.29,28.04h54.42c2.76,0,5-2.24,5-5v-1.37c0-2.76-2.24-5-5-5H13.29c-2.76,0-5,2.24-5,5v1.37 C8.29,25.8,10.53,28.04,13.29,28.04z"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M8.29,53.56h54.42c2.76,0,5-2.24,5-5v-1.37c0-2.76-2.24-5-5-5H8.29c-2.76,0-5,2.24-5,5v1.37 C3.29,51.32,5.53,53.56,8.29,53.56z"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M50.36,61.26L63.19,8.37c0.65-2.68-1-5.39-3.68-6.04l-1.33-0.32c-2.68-0.65-5.39,1-6.04,3.68L39.32,58.58 c-0.65,2.68,1,5.39,3.68,6.04l1.33,0.32C47.01,65.59,49.71,63.94,50.36,61.26z"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M23.85,64.26l12.83-52.89c0.65-2.68-1-5.39-3.68-6.04l-1.33-0.32c-2.68-0.65-5.39,1-6.04,3.68L12.8,61.58 c-0.65,2.68,1,5.39,3.68,6.04l1.33,0.32C20.49,68.59,23.2,66.94,23.85,64.26z"/>
</svg>`;
    },




    icon_category(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Category"
    width="${size}" height="${size}" viewBox="0 0 379 344" fill="none">
    <title>category</title>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M280.32,131.68c8.11-8.11,8.05-21.32-0.14-29.51l-75.85-74.85c-8.19-8.19-21.4-8.25-29.51-0.14l-75.13,75.13 c-8.11,8.11-8.05,21.32,0.14,29.51L280.32,131.68z"/>
    <circle fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="286.36" cy="246.5" r="75"/>
    <path fill="${colorSecondary}"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M38.64,321.5h110c11.05,0,20-8.95,20-20v-110c0-11.05-8.95-20-20-20h-110c-11.05,0-20,8.95-20,20v110 C18.64,312.55,27.6,321.5,38.64,321.5z"/>
</svg>`;
    },





    icon_clip(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 20;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clip"
    width="${size}" height="${size}" viewBox="0 0 490 420" fill="none">
    <title>clip</title>
     <path fill="${colorPrimary}" d="M65.41,248.8L344.66,48.46c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3L48.51,225.23 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C54.67,250.99,60.92,252.02,65.41,248.8z"/>
     <path fill="none" stroke="${colorPrimary}" stroke-width="30"  d="M191.18,420.73c-40.97,29.39-103.8,11.92-140.35-39.02s-32.96-116.06,8.01-145.45"/>
     <path fill="${colorPrimary}" d="M198.03,433.66l131.5-94.34c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3l-131.5,94.34 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C187.3,435.85,193.54,436.88,198.03,433.66z"/>
     <path fill="${colorPrimary}" d="M420.27,142.52L150.11,336.33c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31c3.22,4.49,9.47,5.52,13.95,2.3l270.16-193.81 c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31C431.01,140.33,424.76,139.3,420.27,142.52z"/>
     <path fill="none" stroke="${colorPrimary}" stroke-width="30"  d="M336.87,36.51c36.51-26.19,85.59-20.28,109.61,13.21s13.9,81.87-22.61,108.07"/>
     <path fill="none" stroke="${colorPrimary}" stroke-width="30"  d="M155.22,350.51c-12.87,9.23-32.62,3.73-44.11-12.28c-11.49-16.02-10.37-36.48,2.5-45.72"/>
     <path fill="${colorPrimary}" d="M125.41,301.9l216.85-155.57c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3L108.51,278.33 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C114.68,304.09,120.93,305.12,125.41,301.9z"/>
</svg>`;
    },



    icon_withdrawal(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Withdrawal"
    width="${size}" height="${size}" viewBox="0 0 350.91 358.26" fill="none">
    <title>Withdrawal</title>
<g id="Layer_4">
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M321.66,349.33c7.96,0.01,15.33,0.02,15.33,0.02l0,0c3.46,0,6.91,0.01,10.37,0.01"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M34.84,348.92c1.74,0,279.26,0.39,279.3,0.39"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M3.55,348.87c4.67,0.01,9.35,0.01,14.02,0.02"/>
</g>
<g id="Layer_1">
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" d="M142.99,316.64c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L142.99,316.64z"/>
	<path fill="${colorPrimary}" opacity="0.2" d="M152.66,238.47c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,238.21,152.66,238.47,152.66,238.47z"/>
	<path fill="${colorPrimary}" opacity="0.2" d="M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="262.61" x2="184.14" y2="262.61"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="328.17" x2="184.14" y2="328.17"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M142.99,311.78c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L142.99,311.78z"/>
	<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="149.91" cy="295.91" r="7.77"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M152.66,240.51c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,240.26,152.66,240.51,152.66,240.51z"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M133.5,240.53l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C90.9,239.21,133.5,240.53,133.5,240.53z"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M92.71,236.06c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75c0-6.49-5.26-11.75-11.75-11.75 S92.71,229.58,92.71,236.06z"/>
</g>
<g id="Layer_2">
	<path fill="${colorPrimary}" opacity="0.2" d="M131.44,70.38l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05 L179.58,9.9c-4.32-3.44-10.61-2.73-14.05,1.6l-35.69,44.83C126.4,60.65,127.12,66.94,131.44,70.38z"/>
	<path fill="${colorPrimary}" opacity="0.2" d="M327.18,118.34l-25.09,34.76c-1.62,2.24-1.11,5.36,1.13,6.98l5.94,4.29c2.24,1.62,5.36,1.11,6.98-1.13 l25.09-34.76c1.62-2.24,1.11-5.36-1.13-6.98l-5.94-4.29C331.92,115.6,328.79,116.1,327.18,118.34z"/>
	<path fill="${colorPrimary}" opacity="0.2" d="M274.47,103.99c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1 c-5.06-4.03-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83 C279.5,113.72,278.79,107.42,274.47,103.99"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M131.44,70.38l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05 L179.58,9.9c-4.32-3.44-10.61-2.73-14.05,1.6l-35.69,44.83C126.4,60.65,127.12,66.94,131.44,70.38z"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M148.29,73.25l74.18,58.62c2.24,1.78,4.88-2.55,9.31-2.92c4.13-0.34,8.08,4.41,9.74,2.33l20.58-25.4 c1.72-2.16-5.1-6.81-5.89-11.36c-0.79-4.54,4.45-8.98,2.29-10.7l-71.18-55.62c-2.23-1.78-5.87,3.82-10.29,4.45 c-4.14,0.58-9.1-3.94-10.76-1.85l-19.58,23.4c-1.72,2.16,3.6,6.06,3.89,9.86C150.87,67.85,146.13,71.53,148.29,73.25z"/>
	<circle fill="${colorPrimary}" cx="172.01" cy="55.74" r="6.35"/>
	<circle fill="${colorPrimary}" cx="235.58" cy="105.92" r="6.35"/>
	<ellipse fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="203.49" cy="81.47" rx="22.23" ry="22.74"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M208.72,81.71c0,0,7.92-2.25,4-8.2c-1.67-2.54-5.56-3.27-7.91-0.88c-2.29,2.33-3.46,4.56-1.2,8.08 c1.98,3.09,2.14,2.91,2.28,5.44c0.25,4.42-3.65,6.57-6.81,5.31c-3.16-1.26-4.66-3.3-4.81-6.95c-0.18-4.42,4.02-5.04,4.02-5.04"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="213.8" y1="68.72" x2="211.24" y2="72.05"/>
	<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="196.29" y1="90.14" x2="193.73" y2="93.48"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M275.87,103.99c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1 c-5.06-4.03-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83 C280.9,113.72,280.19,107.42,275.87,103.99"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M323.6,121.25c0,0-10.59-17.67-18.42-27.02s-30.29-27.54-34.59-28.55s-16.44,2.02-16.44,2.02l22.48,18.44 c0,0,1.77,0.51,5.05,2.02c3.28,1.52,26.02,24.51,26.02,24.51S286.12,86,277.13,86.66c-13.63,1-19.46-1.94-26.02-1.16 c-4.54,0.54-6.33,7.46-0.52,9.23c5.81,1.77,16.44,1.52,21.49,4.8c5.05,3.28,1.75,7.32,5.05,13.64c3.3,6.32,13.64,16.68,13.64,16.68 l-11.35-11.36l-11.39,14.89c0,0,9.85,10.36,14.65,11.62c4.8,1.26,22.99,2.53,22.99,2.53L323.6,121.25z"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M327.18,118.34l-25.09,34.76c-1.62,2.24-1.11,5.36,1.13,6.98l5.94,4.29c2.24,1.62,5.36,1.11,6.98-1.13 l25.09-34.76c1.62-2.24,1.11-5.36-1.13-6.98l-5.94-4.29C331.92,115.6,328.79,116.1,327.18,118.34z"/>
</g>
<g id="Layer_3">
	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M118.2,46.96l-39.24,5.29l12.54,4.15c0,0-44.13,14.12-59.45,66.77c-7.22,24.81-7.12,53.12-7.04,58.14 c-4.24,1.8-7.22,6-7.22,10.89c0,6.53,5.29,11.83,11.83,11.83s11.83-5.29,11.83-11.83c0-5.6-3.89-10.27-9.11-11.5 c-0.01-7.72,0.56-26.88,5.53-50.12c11.28-52.75,58.74-68.04,58.74-68.04l-0.35,12.38L118.2,46.96z"/>
</g>
</svg>`;
    },



    icon_deposit(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Deposit"
    width="${size}" height="${size}" viewBox="0 0 350.91 358.26" fill="none">
    <title>Deposit</title>
<g id="Layer_4">
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M321.66,349.33c7.96,0.01,15.33,0.02,15.33,0.02l0,0c3.46,0,6.91,0.01,10.37,0.01"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M34.84,348.92c1.74,0,279.26,0.39,279.3,0.39"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M3.55,348.87c4.67,0.01,9.35,0.01,14.02,0.02"/>
</g>
<g id="Layer_1">
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" d="M142.99,316.64c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L142.99,316.64z"/>
	<path  fill="${colorPrimary}" opacity="0.2" d="M152.66,238.47c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,238.21,152.66,238.47,152.66,238.47z"/>
	<path  fill="${colorPrimary}" opacity="0.2" d="M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
	<line  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="262.61" x2="184.14" y2="262.61"/>
	<line  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="328.17" x2="184.14" y2="328.17"/>
	<path  fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M142.99,311.78c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L142.99,311.78z"/>
	<circle  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="149.91" cy="295.91" r="7.77"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M152.66,240.51c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,240.26,152.66,240.51,152.66,240.51z"/>
	<path  fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M133.5,240.53l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C90.9,239.21,133.5,240.53,133.5,240.53z"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M92.71,236.06c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75c0-6.49-5.26-11.75-11.75-11.75 S92.71,229.58,92.71,236.06z"/>
</g>
<g id="Layer_2">
	<path  fill="${colorPrimary}" opacity="0.2" d="M131.44,70.38l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05 L179.58,9.9c-4.32-3.44-10.61-2.73-14.05,1.6l-35.69,44.83C126.4,60.65,127.12,66.94,131.44,70.38z"/>
	<path  fill="${colorPrimary}" opacity="0.2"  d="M327.18,118.34l-25.09,34.76c-1.62,2.24-1.11,5.36,1.13,6.98l5.94,4.29c2.24,1.62,5.36,1.11,6.98-1.13 l25.09-34.76c1.62-2.24,1.11-5.36-1.13-6.98l-5.94-4.29C331.92,115.6,328.79,116.1,327.18,118.34z"/>
	<path  fill="${colorPrimary}" opacity="0.2" d="M274.47,103.99c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1 c-5.06-4.03-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83 C279.5,113.72,278.79,107.42,274.47,103.99"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M131.44,70.38l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05 L179.58,9.9c-4.32-3.44-10.61-2.73-14.05,1.6l-35.69,44.83C126.4,60.65,127.12,66.94,131.44,70.38z"/>
	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M148.29,73.25l74.18,58.62c2.24,1.78,4.88-2.55,9.31-2.92c4.13-0.34,8.08,4.41,9.74,2.33l20.58-25.4 c1.72-2.16-5.1-6.81-5.89-11.36c-0.79-4.54,4.45-8.98,2.29-10.7l-71.18-55.62c-2.23-1.78-5.87,3.82-10.29,4.45 c-4.14,0.58-9.1-3.94-10.76-1.85l-19.58,23.4c-1.72,2.16,3.6,6.06,3.89,9.86C150.87,67.85,146.13,71.53,148.29,73.25z"/>
	<circle fill="${colorPrimary}" cx="172.01" cy="55.74" r="6.35"/>
	<circle fill="${colorPrimary}" cx="235.58" cy="105.92" r="6.35"/>
	<ellipse  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="203.49" cy="81.47" rx="22.23" ry="22.74"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M208.72,81.71c0,0,7.92-2.25,4-8.2c-1.67-2.54-5.56-3.27-7.91-0.88c-2.29,2.33-3.46,4.56-1.2,8.08 c1.98,3.09,2.14,2.91,2.28,5.44c0.25,4.42-3.65,6.57-6.81,5.31c-3.16-1.26-4.66-3.3-4.81-6.95c-0.18-4.42,4.02-5.04,4.02-5.04"/>
	<line  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="213.8" y1="68.72" x2="211.24" y2="72.05"/>
	<line  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="196.29" y1="90.14" x2="193.73" y2="93.48"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M275.87,103.99c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1 c-5.06-4.03-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83 C280.9,113.72,280.19,107.42,275.87,103.99"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M323.6,121.25c0,0-10.59-17.67-18.42-27.02s-30.29-27.54-34.59-28.55s-16.44,2.02-16.44,2.02l22.48,18.44 c0,0,1.77,0.51,5.05,2.02c3.28,1.52,26.02,24.51,26.02,24.51S286.12,86,277.13,86.66c-13.63,1-19.46-1.94-26.02-1.16 c-4.54,0.54-6.33,7.46-0.52,9.23c5.81,1.77,16.44,1.52,21.49,4.8c5.05,3.28,1.75,7.32,5.05,13.64c3.3,6.32,13.64,16.68,13.64,16.68 l-11.35-11.36l-11.39,14.89c0,0,9.85,10.36,14.65,11.62c4.8,1.26,22.99,2.53,22.99,2.53L323.6,121.25z"/>
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M327.18,118.34l-25.09,34.76c-1.62,2.24-1.11,5.36,1.13,6.98l5.94,4.29c2.24,1.62,5.36,1.11,6.98-1.13 l25.09-34.76c1.62-2.24,1.11-5.36-1.13-6.98l-5.94-4.29C331.92,115.6,328.79,116.1,327.18,118.34z"/>
</g>
<g id="Layer_3">
	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M202.57,315.81l39.42,3.73l-11.27-6.88c0,0,46.18-3.76,73.03-51.57c12.66-22.53,18.97-50.12,20.03-55.03 c4.54-0.79,8.39-4.21,9.5-8.98c1.48-6.36-2.48-12.72-8.84-14.2s-12.72,2.48-14.2,8.84c-1.27,5.45,1.46,10.89,6.27,13.27 c-1.74,7.52-6.64,26.05-16.74,47.56c-22.94,48.82-72.63,52.96-72.63,52.96l3.15-11.98L202.57,315.81z"/>
</g>
</svg>`;
    },




    icon_transition(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Transition"
    width="${size}" height="${size}" viewBox="0 0 350.91 358.26" fill="none">
    <title>Transition</title>
    <g id="Layer_4">
		<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M321.66,349.33c7.96,0.01,15.33,0.02,15.33,0.02l0,0c3.46,0,6.91,0.01,10.37,0.01"/>
		<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M34.84,348.92c1.74,0,279.26,0.39,279.3,0.39"/>
		<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M3.55,348.87c4.67,0.01,9.35,0.01,14.02,0.02"/>
	</g>
	<g id="Layer_1">
		<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" d="M142.99,316.64c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L142.99,316.64z"/>
		<path fill="${colorPrimary}" opacity="0.2" d="M152.66,238.47c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,238.21,152.66,238.47,152.66,238.47z"/>
		<path fill="${colorPrimary}" opacity="0.2" d="M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
		<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
		<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="262.61" x2="184.14" y2="262.61"/>
		<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="17.78" y1="328.17" x2="184.14" y2="328.17"/>
		<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M142.99,311.78c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L142.99,311.78z"/>
		<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="149.91" cy="295.91" r="7.77"/>
		<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M152.66,240.51c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,240.26,152.66,240.51,152.66,240.51z"/>
		<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M133.5,240.53l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C90.9,239.21,133.5,240.53,133.5,240.53z"/>
		<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M92.71,236.06c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75c0-6.49-5.26-11.75-11.75-11.75 S92.71,229.58,92.71,236.06z"/>
	</g>
    <g id="Layer_5">
    	<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4"  d="M267.98,156.03c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L267.98,156.03z"/>
	    <path fill="${colorPrimary}" opacity="0.2" d="M277.65,77.85c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C209.93,77.6,277.65,77.85,277.65,77.85z"/>
    	<path fill="${colorPrimary}" opacity="0.2" d="M139.77,140.65v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20 H159.77c-11.05,0-20,8.95-20,20v24.72"/>
    	<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M139.77,140.65v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20 H159.77c-11.05,0-20,8.95-20,20v24.72"/>
	    <line  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="142.77" y1="102" x2="309.13" y2="102"/>
	    <line  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="142.77" y1="167.56" x2="309.13" y2="167.56"/>
	    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M267.98,151.17c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L267.98,151.17z"/>
	    <circle  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="274.89" cy="135.29" r="7.77"/>
	    <path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M277.65,79.9c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C209.93,79.65,277.65,79.9,277.65,79.9z"/>
    	<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M258.49,79.91l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C215.89,78.6,258.49,79.91,258.49,79.91z"/>
	    <path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M217.69,75.45c0,6.49,5.26,4.75,11.75,4.75c6.49,0,11.75,1.74,11.75-4.75s-5.26-11.75-11.75-11.75	C222.95,63.7,217.69,68.96,217.69,75.45z"/>
    </g>
	<g id="Layer_3">
		<path  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M202.57,315.81l39.42,3.73l-11.27-6.88c0,0,46.18-3.76,73.03-51.57c12.66-22.53,18.97-50.12,20.03-55.03 c4.54-0.79,8.39-4.21,9.5-8.98c1.48-6.36-2.48-12.72-8.84-14.2s-12.72,2.48-14.2,8.84c-1.27,5.45,1.46,10.89,6.27,13.27 c-1.74,7.52-6.64,26.05-16.74,47.56c-22.94,48.82-72.63,52.96-72.63,52.96l3.15-11.98L202.57,315.81z"/>
		<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M118.2,46.96l-39.24,5.29l12.54,4.15c0,0-44.13,14.12-59.45,66.77c-7.22,24.81-7.12,53.12-7.04,58.14 c-4.24,1.8-7.22,6-7.22,10.89c0,6.53,5.29,11.83,11.83,11.83s11.83-5.29,11.83-11.83c0-5.6-3.89-10.27-9.11-11.5 c-0.01-7.72,0.56-26.88,5.53-50.12c11.28-52.75,58.74-68.04,58.74-68.04l-0.35,12.38L118.2,46.96z"/>
	</g>
</svg>`;
    },





    icon_changePassword(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ChangePassword"
    width="${size}" height="${size}" viewBox="0 0 356.97 361.52" fill="none">
    <title>Change Password</title>
<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4"  d="M329.07,150.86l-27,5l36,16l3-33l-8.42,8.93c0,0-5.38-10.99-26.15-40.44c-38.44-54.5-93.44-65.14-124.94-64.72 c-58.81,0.79-150,54.37-150,150c0,82.84,67.16,150,150,150c20.91,0,38.67-4.84,44.6-6.74c55.49-17.77,82.96-64.15,90.77-78.56"/>
<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" d="M172.12,189l18.17-17.51c12.93-12.46,13.31-33.04,0.85-45.96l0,0c-12.46-12.93-33.04-13.31-45.96-0.85 l-18.17,17.51c-12.93,12.46-13.31,33.04-0.85,45.96l0,0C138.61,201.07,159.19,201.45,172.12,189z"/>
<line fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" x1="188.52" y1="184.92" x2="251.18" y2="246.57"/>
<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" x1="207.72" y1="211.45" x2="189.71" y2="229.39"/>
<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.4" x1="233.64" y1="234.42" x2="215.63" y2="252.36"/>
<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M324.32,134.43l-27,5l36,16l3-33l-8.42,8.93c0,0-5.38-10.99-26.15-40.44c-38.44-54.5-93.44-65.14-124.94-64.72 c-58.81,0.79-150,54.37-150,150c0,82.84,67.16,150,150,150c20.91,0,38.67-4.84,44.6-6.74c55.49-17.77,82.96-64.15,90.77-78.56"/>
<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M175.72,177.88l18.17-17.51c12.93-12.46,13.31-33.04,0.85-45.96l0,0c-12.46-12.93-33.04-13.31-45.96-0.85 l-18.17,17.51c-12.93,12.46-13.31,33.04-0.85,45.96l0,0C142.22,189.96,162.8,190.34,175.72,177.88z"/>
<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="192.13" y1="173.8" x2="254.78" y2="235.45"/>
<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="211.33" y1="200.34" x2="193.32" y2="218.27"/>
<line fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x1="237.25" y1="223.31" x2="219.24" y2="241.24"/>
</svg>`;
    },




    icon_account(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Account"
    width="${size}" height="${size}" viewBox="0 0 300 300" fill="none">
    <title>Account </title>
<circle fill="${colorSecondary}" opacity="0.6" cx="151.75" cy="150.25" r="140"/>
<circle fill="none" stroke-width="${strokeWidth}" stroke="${colorPrimary}"  cx="151.75" cy="150.25" r="140"/>
<path fill="${colorPrimary}" d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${colorPrimary}" cx="152.2" cy="109.52" rx="60" ry="55"/>
</svg>`;
    },




    icon_account_add(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AccountAdd"
    width="${size}" height="${size}" viewBox="0 0 300 300" fill="none">
    <title>Account Add</title>
<circle  fill="${colorSecondary}" opacity="0.6"  cx="151.75" cy="150.25" r="140"/>
<circle  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  cx="151.75" cy="150.25" r="140"/>
<path    fill="${colorPrimary}" d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${colorPrimary}" cx="152.2" cy="109.52" rx="60" ry="55"/>
<circle  fill="${colorSecondary}" opacity="0.6" cx="234.26" cy="226.26" r="61.74"/>
<circle  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="234.26" cy="226.26" r="61.74"/>
<path    fill="${colorPrimary}" d="M200.48,235h65c5.52,0,10-4.48,10-10v0c0-5.52-4.48-10-10-10h-65c-5.52,0-10,4.48-10,10v0 C190.48,230.52,194.96,235,200.48,235z"/>
<path    fill="${colorPrimary}" d="M224.26,193.76v65c0,5.52,4.48,10,10,10h0c5.52,0,10-4.48,10-10v-65c0-5.52-4.48-10-10-10h0 C228.74,183.76,224.26,188.24,224.26,193.76z"/>
</svg>`;
    },



    icon_account_reference(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Account Refrence"
    width="${size}" height="${size}" viewBox="0 0 305 300" fill="none">
    <title>Account Refrence</title>
<circle  fill="${colorSecondary}" opacity="0.6" cx="151.75" cy="150.25" r="140"/>
<circle  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  cx="151.75" cy="150.25" r="140"/>
<path    fill="${colorPrimary}"  d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${colorPrimary}"  cx="152.2" cy="109.52" rx="60" ry="55"/>
<ellipse fill="${colorSecondary}" opacity="0.6" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<ellipse fill="none" stroke="#000" stroke-width="${strokeWidth}" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<path    fill="#000" d="M182.08,250.08l-7.55-14.41h2.63c1.26,0,1.9-1.42,1.01-2.25l-4.45-4.22c-0.27-0.25-0.63-0.4-1.01-0.4l-1.77,0l-19.35-36.93 c-0.48-0.91-1.84-0.88-2.27,0.06l-16.75,36.93l-1.61,0c-0.41,0-0.81,0.17-1.07,0.46l-3.83,4.16c-0.79,0.86-0.14,2.19,1.08,2.19h2.34 l-6.56,14.47c-0.36,0.8,0.24,1.7,1.15,1.7h9.21c0.5,0,0.96-0.29,1.15-0.73l6.87-15.44h21.82l8.24,15.51 c0.21,0.4,0.65,0.66,1.12,0.66h8.52C181.89,251.84,182.5,250.89,182.08,250.08z M144.31,228.85l4.35-9.78 c1.02-2.29,4.33-2.4,5.51-0.18l5.28,9.94L144.31,228.85z"/>
</svg>`;
    },



    icon_account_destination(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Account Destination"
    width="${size}" height="${size}" viewBox="0 0 305 300" fill="none">
    <title>Account Destination</title>
<circle  fill="${colorSecondary}" opacity="0.6" cx="151.75" cy="150.25" r="140"/>
<circle  fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="151.75" cy="150.25" r="140"/>
<path    fill="${colorPrimary}" d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${colorPrimary}" cx="152.2" cy="109.52" rx="60" ry="55"/>
<ellipse fill="${colorSecondary}" opacity="0.6" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<ellipse fill="none" stroke="#000" stroke-width="${strokeWidth}" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<path    fill="#000" d="M144.98,196.56L144.98,196.56c2.04,0,3.7,1.65,3.7,3.7v54.83c0,2.04-1.65,3.7-3.7,3.7l0,0c-2.04,0-3.7-1.65-3.7-3.7v-54.83 C141.28,198.21,142.94,196.56,144.98,196.56z"/>
<path    fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M144.08,213.47c0.02,5.73-2.96,12.33,1.66,13.72c6.08,1.83,21.06-5.1,21.06-13.83 c0-12.19-17.63-14.86-21.06-13.83C141.03,200.95,144.06,207.76,144.08,213.47z"/>
<path    fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M144.08,242.41c0.02,5.49-2.96,11.83,1.66,13.16c6.08,1.76,21.06-4.9,21.06-13.27 c0-8.37-14.97-15.03-21.06-13.27C141.03,230.39,144.06,236.93,144.08,242.41z"/>
</svg>`;
    },




    icon_account_group_add(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="aaaaccountGroupAdd"
    width="${size}" height="${size}" viewBox="0 0 410 412" fill="none">
    <title>Account Group Add</title>
<path fill="${colorPrimary}" d="M205.09,6.5C95.33,6.5,6.34,95.48,6.34,205.25S95.33,404,205.09,404s198.75-88.98,198.75-198.75 S314.86,6.5,205.09,6.5z M48.73,169.79c2.81-14.58,8.08-28.94,16-42.48c34.61-59.18,107.46-82.12,168.89-55.82 c-49.66-3.75-99.48,20.34-126.32,66.23c-0.73,1.24-1.42,2.49-2.1,3.74c-2.1,0.49-4.18,1.04-6.26,1.63 c-17.8-3.84-36.8,3.9-46.49,20.47c-1.02,1.74-1.89,3.53-2.64,5.35C49.45,169.21,49.09,169.49,48.73,169.79z M180.35,199.95 c-4.36,0-7.89-3.45-7.89-7.71s3.53-7.71,7.89-7.71h16.86v-16.48c0-4.26,3.53-7.71,7.89-7.71s7.89,3.45,7.89,7.71v16.48h16.86 c4.36,0,7.89,3.45,7.89,7.71s-3.53,7.71-7.89,7.71h-16.86v16.48c0,4.26-3.53,7.71-7.89,7.71s-7.89-3.45-7.89-7.71v-16.48H180.35z M56.16,170.37c12.07-20.64,38.6-27.59,59.24-15.52c20.64,12.07,27.59,38.6,15.52,59.24c-12.07,20.64-38.6,27.59-59.24,15.52 S44.08,191.02,56.16,170.37z M203.5,363c-68.56,0-125.14-51.3-133.45-117.6C91.89,290.16,137.84,321,191,321 c1.44,0,2.87-0.03,4.29-0.08c1.48,1.57,3.01,3.09,4.56,4.58c5.68,17.3,21.94,29.8,41.14,29.8c2.02,0,4-0.15,5.95-0.42 c0.43,0.16,0.86,0.33,1.3,0.48C234.25,360.3,219.19,363,203.5,363z M245.4,349.5c-23.91,0-43.3-19.39-43.3-43.3 s19.39-43.3,43.3-43.3s43.3,19.39,43.3,43.3S269.31,349.5,245.4,349.5z M231.55,129.48c-11.41-21.02-3.63-47.3,17.39-58.72 s47.3-3.63,58.72,17.39c11.41,21.02,3.63,47.3-17.39,58.72S242.96,150.5,231.55,129.48z M299.42,293 c28.92-40.55,34.09-95.65,8.72-142.36c-0.69-1.26-1.39-2.5-2.11-3.74c0.67-2.05,1.28-4.12,1.85-6.2 c12.5-13.24,15.71-33.5,6.55-50.38c-0.96-1.78-2.04-3.45-3.21-5.03c-0.07-0.46-0.12-0.91-0.2-1.37 c11.02,9.95,20.58,21.89,28.06,35.68C371.8,179.86,353.72,254.05,299.42,293z"/>
<path fill="#fff" opacity="0.4" d="M205.09,6.5C95.33,6.5,6.34,95.48,6.34,205.25s88.98-13.01,198.75-13.01s198.75,122.78,198.75,13.01 S314.86,6.5,205.09,6.5z"/>
</svg>`;
    },





    icon_time(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Time"
    width="${size}" height="${size}" viewBox="0 0 313.01 346.36" fill="none">
    <title>Time </title>
<circle fill="${colorSecondary}" opacity="0.6" cx="158.07" cy="172.22" r="140"/>
<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="158.07" cy="172.22" r="140"/>
<path fill="${colorPrimary}"  d="M156.57,172.22h3c2.76,0,5-2.24,5-5V51.72c0-2.76-2.24-5-5-5h-3c-2.76,0-5,2.24-5,5v115.5 C151.57,169.98,153.81,172.22,156.57,172.22z"/>
<path fill="${colorPrimary}"  d="M217.64,251.33l2.4-1.8c2.21-1.65,2.66-4.79,1.01-7l-58.07-77.65c-1.65-2.21-4.79-2.66-7-1.01l-2.4,1.8 c-2.21,1.65-2.66,4.79-1.01,7l58.07,77.65C212.29,252.53,215.43,252.98,217.64,251.33z"/>
<path fill="${colorPrimary}"  d="M127.07,35.45C119.06,18.52,101.83,6.8,81.85,6.8c-27.61,0-50,22.39-50,50c0,12.53,4.62,23.97,12.23,32.75 C63.91,62.51,93.19,42.85,127.07,35.45z"/>
<path fill="${colorPrimary}"  d="M272.49,92.96c9.54-9.11,15.49-21.94,15.49-36.16c0-27.61-22.39-50-50-50c-20.45,0-38.02,12.28-45.77,29.86 C225.3,45.22,253.64,65.57,272.49,92.96z"/>
<path fill="${colorPrimary}"  d="M218.87,296.44c-17.72,6.99-37.88,10.95-59.26,10.95s-41.54-3.96-59.26-10.95c-39.08,3.8-65.63,11.25-65.63,19.82 c0,12.43,55.91,22.51,124.89,22.51s124.89-10.08,124.89-22.51C284.49,307.7,257.94,300.25,218.87,296.44z"/>
</svg>`;
    },




    icon_status(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Status"
    width="${size}" height="${size}" viewBox="0 0 270 250" fill="none">
    <title>Status</title>
<path fill="${colorPrimary}" d="M244.4,58.43L140.73,180.41l-5.21,6.13c-3.58,4.21-9.89,4.72-14.1,1.14l-10.17-8.64L74.3,147.63 c-4.21-3.58-4.72-9.89-1.14-14.1l5.21-6.13c3.58-4.21,9.89-4.72,14.1-1.14l29.34,24.94L222.67,32.5C200.47,12.31,170.97,0,138.59,0 c-69.04,0-125,55.96-125,125s55.96,125,125,125s125-55.96,125-125C263.59,100.53,256.55,77.71,244.4,58.43z"/>
<path fill="${colorSecondary}" opacity="0.6" d="M256.72,28.29l-10.17-8.64c-4.21-3.58-10.52-3.06-14.1,1.14L121.62,151.2l-29.34-24.94 c-4.21-3.58-10.52-3.06-14.1,1.14l-5.21,6.13c-3.58,4.21-3.06,10.52,1.14,14.1l36.96,31.41l10.17,8.64 c4.21,3.58,10.52,3.06,14.1-1.14l5.21-6.13l117.3-138.02C261.44,38.18,260.92,31.87,256.72,28.29z"/>
<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M256.72,28.29l-10.17-8.64c-4.21-3.58-10.52-3.06-14.1,1.14L121.62,151.2l-29.34-24.94 c-4.21-3.58-10.52-3.06-14.1,1.14l-5.21,6.13c-3.58,4.21-3.06,10.52,1.14,14.1l36.96,31.41l10.17,8.64 c4.21,3.58,10.52,3.06,14.1-1.14l5.21-6.13l117.3-138.02C261.44,38.18,260.92,31.87,256.72,28.29z"/>
</svg>`;
    },



    icon_amount(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Amount"
    width="${size}" height="${size}" viewBox="0 0 250 270" fill="none">
    <title>Amount</title>
<path fill="${colorPrimary}" d="M230.92,139.53c0-0.11,0-0.22,0-0.34c0-0.8-0.01-1.61-0.03-2.41c-0.01-0.25-0.02-0.5-0.03-0.74 c-0.02-0.7-0.05-1.39-0.08-2.08c-0.01-0.14-0.02-0.28-0.02-0.43c-2.77-52.57-41.54-95.46-91.8-103.86V9.29c0-2.76-2.24-5-5-5h-22.08 c-2.76,0-5,2.24-5,5v19.8C54.62,35.83,13.83,79.67,11.07,133.7c0,0.06-0.01,0.13-0.01,0.19c-0.04,0.72-0.06,1.45-0.08,2.17 c-0.01,0.23-0.02,0.45-0.02,0.68c-0.02,0.76-0.03,1.53-0.03,2.29c0,0.16-0.01,0.32-0.01,0.49c0,0.01,0,0.01,0,0.02 c0,0.01,0,0.01,0,0.02c0,55.45,40.02,101.43,92.41,109.96v19.35c0,3.31,2.69,6,6,6h19.98c3.31,0,6-2.69,6-6v-18.88 c53.95-7.14,95.61-53.85,95.61-110.42c0-0.01,0-0.01,0-0.02C230.92,139.54,230.92,139.53,230.92,139.53z M128.84,217.63v44.71 c0,2.72-2.24,4.92-5,4.92h-9.71c-2.76,0-5-2.2-5-4.92v-43.32c-13.3-0.74-25.43-4.65-34.12-10.37l6.26-21.33 c7.4,5.41,20.5,11.14,33.03,11.14c18.22,0,26.76-10.19,26.76-22.92c0-13.37-7.12-20.7-25.62-28.34 c-24.77-9.87-36.44-25.15-36.44-43.62c0-20.79,12.58-38.46,34.06-43.65V18.34c0-2.72,2.24-4.92,5-4.92h9.71c2.76,0,5,2.2,5,4.92 v40.34c11.34,1.07,21.14,4.92,27.66,9.25l-6.26,20.38c-5.41-3.82-15.37-8.92-28.19-8.92c-14.8,0-23.06,9.55-23.06,21.01c0,12.74,8.26,18.47,26.19,26.11c23.92,10.19,36.16,23.56,36.16,46.49C165.27,195.57,152.19,212.6,128.84,217.63z"/>
</svg>`;
    },





    icon_currency(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Currency"
    width="${size}" height="${size}" viewBox="0 0 145 57" fill="none">
    <title>Currency</title>
<path fill="${colorPrimary}"  d="M140.96,43.23c0,2.01-3.81,5.38-10.87,5.38c-4.75,0-6.65,0-114.63,0c0,0-6.32-2.08-6.32-4.73v4.2 c0,2.66,7.32,4.73,7.32,4.73c107.98,0,108.87,0,113.63,0c7.06,0,10.87-2.52,10.87-4.53V43.23z"/>
<path fill="${colorPrimary}"  d="M140.72,35.89c0,2.01-3.81,5.38-10.87,5.38c-4.75,0-6.65,0-114.63,0c0,0-6.32-2.08-6.32-4.73v4.2 c0,2.66,7.32,4.73,7.32,4.73c107.98,0,108.87,0,113.63,0c7.06,0,10.87-2.52,10.87-4.53V35.89z"/>
<path fill="${colorPrimary}" stroke="${colorPrimary}" stroke-width="2"  d="M125.16,5.95c4.12,0.01,6.07,0.01,8.24,2.61c2.17,2.6,5.19,19.52,5.85,21.84c0.84,2.95-4.17,6.91-9.16,6.91 c-4.98,0-108.52,0.02-112.86,0.02c-7.57,0-8.07-6.32-7.39-8.1c1.94-5.05,5.71-17.17,6.94-19.27c1.15-1.96,1.95-4.24,6.46-4.28 C48.87,5.43,121.69,5.94,125.16,5.95z"/>
<path opacity="0.2" fill="${colorPrimary}" d="M125.16,5.77c4.12,0.01,6.07,0.01,8.24,2.61c2.17,2.6,5.19,19.52,5.85,21.84c0.84,2.95-4.17,6.91-9.16,6.91 c-4.98,0-108.52,0.02-112.86,0.02c-7.57,0-8.07-6.32-7.39-8.1c1.94-5.05,5.71-17.17,6.94-19.27c1.15-1.96,1.95-4.24,6.46-4.28 C48.87,5.25,121.69,5.77,125.16,5.77z"/>
<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="2" d="M119.34,9.61c1.82,0,1.16,3,2.29,3.25c1.13,0.25,5.04-0.27,6,0.71c1.92,1.96,3.6,12.69,4.18,14.44 c0.4,1.2-3.7-0.39-5.49,0.66c-1.53,0.9,0.42,4.54-1.61,4.54c-4.41,0-96.04,0.01-99.88,0.01c-3.17,0,1.07-4.06,0.14-5.32 c-1.03-1.41-7-0.07-6.68-0.78c1.71-3.8,4.05-11.92,5.14-13.51c0.7-1.02,4.26-0.15,5.85-0.77c0.71-0.27,1.63-3.45,2.86-3.46 C54.82,9.22,116.26,9.6,119.34,9.61z"/>
<path opacity="0.75" fill="${colorSecondary}"  d="M66.22,4.63L47.87,35.25c-0.17,0.33-0.27,0.7-0.27,1.08l5.39,15.35c0,1.18,0.87,2.13,1.94,2.13l37.75,0.01 c1.07,0,1.94-0.95,1.94-2.13l3.59-15.44c0-0.19-0.02-0.38-0.07-0.56L83,5.15c-0.23-0.92-0.98-1.56-1.84-1.57l-13.24,0 C67.21,3.57,66.57,3.97,66.22,4.63z"/>
<ellipse fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="2" cx="73.77" cy="22.86" rx="14.38" ry="9.64"/>
<path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="2"  d="M76.85,21.36c0,0,3.31-2.87-1.11-3.63c-1.89-0.32-4.24,0.52-4.54,1.9c-0.3,1.35-0.04,2.36,2.55,2.82 c2.27,0.41,2.28,0.31,3.36,1.05c1.88,1.29,0.65,3.03-1.52,3.51c-2.17,0.48-3.78,0.27-5.29-0.82c-1.84-1.31,0.14-2.66,0.14-2.66"/>
<line fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="2" x1="74.83" y1="15.43" x2="74.79" y2="17.16"/>
<line fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="2"  x1="73.35" y1="27.76" x2="73.31" y2="29.49"/>
<ellipse fill="${colorPrimary}"  cx="37.21" cy="20.15" rx="6" ry="3.48"/>
<ellipse fill="${colorPrimary}"  cx="114.19" cy="20.15" rx="6" ry="3.48"/>
</svg>`;
    },




    icon_currency2(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Currency"
    width="${size}" height="${size}" viewBox="0 0 208 240" fill="none">
    <title>Currency</title>
<ellipse fill="${colorPrimary}" cx="103.22" cy="140.06" rx="91.05" ry="94.89"/>
<circle fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="103.66" cy="132.09" r="91.05"/>
<ellipse fill="${colorPrimary}"  cx="103.65" cy="112.68" rx="91.05" ry="98.01"/>
<circle fill="${colorSecondary}"  stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="104.09" cy="101.59" r="91.05"/>
<circle fill="${colorPrimary}"  cx="103.5" cy="101.59" r="74.88"/>
<path fill="none" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  d="M119.1,90.85c0,0,17.1-25.38-7.27-30.78c-10.39-2.3-22.95,5.47-24.14,17.38c-1.17,11.62,0.57,20.18,14.85,23.53 c12.52,2.93,12.54,2.08,18.66,8.17c10.67,10.61,4.57,25.77-7.13,30.39s-20.51,3.18-29.13-5.72c-10.46-10.8-0.09-22.8-0.09-22.8"/>
<line fill="none" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  x1="106.09" y1="45.2" x2="106.44" y2="60.04"/>
<line fill="none" stroke="${colorSecondary}" stroke-width="${strokeWidth}"  x1="103.3" y1="143.15" x2="103.65" y2="157.99"/>

</svg>`;
    },




    icon_rate(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rate"
    width="${size}" height="${size}" viewBox="0 0 290 270" fill="none">
    <title>Rate</title>
<path fill="${colorSecondary}" opacity="0.6"  d="M260.03,136.86c0-69.04-55.96-125-125-125s-125,55.96-125,125s55.96,125,125,125c45.02,0,84.48-23.8,106.49-59.5"/>
<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M260.03,136.86c0-69.04-55.96-125-125-125s-125,55.96-125,125s55.96,125,125,125c45.02,0,84.48-23.8,106.49-59.5"/>
<polygon fill="${colorPrimary}" points="223.52,114.32 258.34,176.86 288.94,114.32 "/>
<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  cx="107.39" cy="100.2" r="25"/>
<path fill="${colorPrimary}" d="M87.68,209.33l6.11,3.77c2.35,1.45,5.43,0.72,6.88-1.63l84.79-137.48c1.45-2.35,0.72-5.43-1.63-6.88l-6.11-3.77c-2.35-1.45-5.43-0.72-6.88,1.63L86.05,202.45C84.6,204.8,85.33,207.88,87.68,209.33z"/>
<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  cx="164.87" cy="174.98" r="25"/>
</svg>`;
    },



    icon_warning(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Warning"
    width="${size}" height="${size}" viewBox="0 0 300 290" fill="none">
    <title>Warning</title>
<g id="Layer_2"  opacity="0.2">
	<path    fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M132.22,32.75L25.01,234.67c-8.54,16.08,0.67,37.59,16.09,37.59h211.93c14.81,0,23.73-20.54,15.68-36.1 L163.6,32.99C156.26,18.79,139.7,18.66,132.22,32.75z"/>
	<circle  fill="${colorPrimary}" cx="146.74" cy="233.83" r="15"/>
	<path    fill="${colorPrimary}" d="M239.6,30.67l5.81,8.74c1.24,1.86,0.97,4.14-0.57,4.93l-38.37,19.53c-1.36,0.69-3.24-0.03-4.33-1.67l0,0 c-1.08-1.63-1.03-3.62,0.11-4.62l32.56-28.27C236.13,28.16,238.36,28.79,239.6,30.67z"/>
	<path    fill="${colorPrimary}" d="M275.91,45.98l6.54,9.85c1.39,2.1,0.66,4.95-1.58,6.17l-55.62,30.23c-1.97,1.07-4.42,0.48-5.65-1.37v0 c-1.22-1.83-0.83-4.3,0.9-5.71l49.08-40.08C271.57,43.45,274.51,43.87,275.91,45.98z"/>
	<path    fill="${colorPrimary}" d="M266.21,98.05l3.85,5.25c0.82,1.12,0.54,2.67-0.6,3.36l-28.39,17c-1.01,0.6-2.33,0.31-3.05-0.67l0,0 c-0.72-0.98-0.61-2.32,0.26-3.1l24.53-22.25C263.8,96.73,265.38,96.93,266.21,98.05z"/>
	<path    fill="${colorPrimary}" d="M50.63,30.67l-5.81,8.74c-1.24,1.86-0.97,4.14,0.57,4.93l38.37,19.53c1.36,0.69,3.24-0.03,4.33-1.67v0 c1.08-1.63,1.03-3.62-0.11-4.62L55.42,29.31C54.1,28.16,51.88,28.79,50.63,30.67z"/>
	<path    fill="${colorPrimary}" d="M14.32,45.98l-6.54,9.85c-1.39,2.1-0.66,4.95,1.58,6.17l55.62,30.23c1.97,1.07,4.42,0.48,5.65-1.37l0,0 c1.22-1.83,0.83-4.3-0.9-5.71L20.65,45.07C18.66,43.45,15.72,43.87,14.32,45.98z"/>
	<path    fill="${colorPrimary}" d="M24.02,98.05l-3.85,5.25c-0.82,1.12-0.54,2.67,0.6,3.36l28.39,17c1.01,0.6,2.33,0.31,3.05-0.67h0 c0.72-0.98,0.61-2.32-0.26-3.1L27.42,97.63C26.43,96.73,24.85,96.93,24.02,98.05z"/>
	<path    fill="${colorPrimary}" d="M136.76,106.51h16.7c3.55,0,6.34,3.05,6.02,6.59L151.58,201c-0.28,3.12-2.89,5.51-6.02,5.51l0,0 c-3.11,0-5.71-2.35-6.02-5.45l-8.79-87.91C130.39,109.59,133.19,106.51,136.76,106.51z"/>
</g>
<g id="Layer_1">
	<path   fill="${colorSecondary}" opacity="0.6"   d="M135.97,24.45L28.76,226.37c-8.54,16.08,0.67,37.59,16.09,37.59h211.93c14.81,0,23.73-20.54,15.68-36.1 L167.36,24.68C160.01,10.48,143.45,10.36,135.97,24.45z"/>
	<path   fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"   d="M135.97,24.45L28.76,226.37c-8.54,16.08,0.67,37.59,16.09,37.59h211.93c14.81,0,23.73-20.54,15.68-36.1 L167.36,24.68C160.01,10.48,143.45,10.36,135.97,24.45z"/>
	<circle fill="${colorPrimary}" cx="150.49" cy="225.52" r="15"/>
	<path   fill="${colorPrimary}" d="M142.14,101.01h16.7c3.55,0,6.34,3.05,6.02,6.59l-7.91,87.91c-0.28,3.12-2.89,5.51-6.02,5.51h0 c-3.11,0-5.71-2.35-6.02-5.45l-8.79-87.91C135.77,104.1,138.57,101.01,142.14,101.01z"/>
	<path   fill="${colorPrimary}" d="M243.35,22.37l5.81,8.74c1.24,1.86,0.97,4.14-0.57,4.93l-38.37,19.53c-1.36,0.69-3.24-0.03-4.33-1.67v0 c-1.08-1.63-1.03-3.62,0.11-4.62L238.57,21C239.88,19.86,242.11,20.49,243.35,22.37z"/>
	<path   fill="${colorPrimary}" d="M279.66,37.68l6.54,9.85c1.39,2.1,0.66,4.95-1.58,6.17l-55.62,30.23c-1.97,1.07-4.42,0.48-5.65-1.37v0 c-1.22-1.83-0.83-4.3,0.9-5.71l49.08-40.08C275.32,35.15,278.26,35.57,279.66,37.68z"/>
	<path   fill="${colorPrimary}" d="M269.96,89.75l3.85,5.25c0.82,1.12,0.54,2.67-0.6,3.36l-28.39,17c-1.01,0.6-2.33,0.31-3.05-0.67l0,0 c-0.72-0.98-0.61-2.32,0.26-3.1l24.53-22.25C267.56,88.43,269.13,88.62,269.96,89.75z"/>
	<path   fill="${colorPrimary}" d="M54.38,22.37l-5.81,8.74c-1.24,1.86-0.97,4.14,0.57,4.93l38.37,19.53c1.36,0.69,3.24-0.03,4.33-1.67l0,0 c1.08-1.63,1.03-3.62-0.11-4.62L59.17,21C57.85,19.86,55.63,20.49,54.38,22.37z"/>
	<path   fill="${colorPrimary}" d="M18.07,37.68l-6.54,9.85c-1.39,2.1-0.66,4.95,1.58,6.17l55.62,30.23c1.97,1.07,4.42,0.48,5.65-1.37v0 c1.22-1.83,0.83-4.3-0.9-5.71L24.4,36.77C22.42,35.15,19.48,35.57,18.07,37.68z"/>
	<path   fill="${colorPrimary}" d="M27.78,89.75L23.92,95c-0.82,1.12-0.54,2.67,0.6,3.36l28.39,17c1.01,0.6,2.33,0.31,3.05-0.67l0,0 c0.72-0.98,0.61-2.32-0.26-3.1L31.17,89.33C30.18,88.43,28.6,88.62,27.78,89.75z"/>
</g>
</svg>`;
    },



    icon_reload(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 10;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reload"
    width="${size}" height="${size}" viewBox="0 0 320 325" fill="none">
    <title>Reload</title>
<path fill="${colorSecondary}" opacity="0.6" d="M70.6,258.28C94.44,280.44,126.39,294,161.5,294c73.73,0,133.5-59.77,133.5-133.5S235.23,27,161.5,27 S28,86.77,28,160.5c0,16.4,2.96,32.11,8.37,46.62"/>
<path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M70.6,258.28C94.44,280.44,126.39,294,161.5,294c73.73,0,133.5-59.77,133.5-133.5S235.23,27,161.5,27 S28,86.77,28,160.5c0,16.4,2.96,32.11,8.37,46.62"/>
<polygon fill="${colorPrimary}" points="42,217 49,302 122,234 "/>
</svg>`;
    },




    icon_typeCash(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeCash"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Cash</title>
    
	<circle fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}" cx="137.33" cy="135.94" r="126.5"/>
	<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.6"  cx="136.45" cy="136.07" r="99.62"/>
	<path fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}"  d="M168.44,145.92c-32.63-15.01-22.17-34.46-29.18-38.58c2.53-4.85,6.57-14.45,12.67-20.88 c33.86-35.77-11.51,1.49-23.21-14.06c-19.48-25.88-49.79-3.53-31.06,1.57c23.77,6.46,28.83,21.14,26.38,31.61	c-10.85,0.65-8.37,16.95-25.8,37.34c-38.41,44.92,7.43,68.67,29.86,68.92C185.43,212.46,214.23,166.99,168.44,145.92z"/>
	<line fill="none" stroke="#000" stroke-width="${strokeWidth}" x1="122.04" y1="105.22" x2="141.34" y2="106.22"/>

	<circle opacity="0.25" fill="#000" cx="135" cy="180" r="17.5"/>
	<circle opacity="0.25" fill="#000" cx="150" cy="155" r="10"/>
	<circle opacity="0.25" fill="#000" cx="120" cy="150" r="12.5"/>

	<path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>

</svg>`;
    },


    icon_typeCash2(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeCash"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Cash</title>
    
	<circle fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}" class="st0" cx="137.33" cy="135.94" r="126.5"/>
	<circle opacity="0.6" fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" cx="136.45" cy="136.07" r="99.62"/>
	<path fill="${colorPrimary}" opacity="0.6"  d="M64.99,120.71l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05l-96.6-76.89c-4.32-3.44-10.61-2.73-14.05,1.6L63.4,106.66C59.96,110.98,60.67,117.27,64.99,120.71z"/>
	<path fill="${colorPrimary}" opacity="0.6" d="M208.02,154.32c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1s-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83C213.06,164.05,212.34,157.76,208.02,154.32"/>
	<path fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M64.99,120.71l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05l-96.6-76.89c-4.32-3.44-10.61-2.73-14.05,1.6L63.4,106.66C59.96,110.98,60.67,117.27,64.99,120.71z"/>
	<path fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}"  d="M81.84,123.59l74.18,58.62c2.24,1.78,4.88-2.55,9.31-2.92c4.13-0.34,8.08,4.41,9.74,2.33l20.58-25.4c1.72-2.16-5.1-6.81-5.89-11.36s4.45-8.98,2.29-10.7l-71.18-55.62c-2.23-1.78-5.87,3.82-10.29,4.45c-4.14,0.58-9.1-3.94-10.76-1.85l-19.58,23.4c-1.72,2.16,3.6,6.06,3.89,9.86C84.42,118.18,79.68,121.87,81.84,123.59z"/>
	<circle fill="#000"  cx="105.57" cy="106.07" r="6.35"/>
    <circle fill="#000"  cx="169.13" cy="156.25" r="6.35"/>
	<ellipse fill="none" stroke="#000" stroke-width="${strokeWidth}"  cx="137.05" cy="131.81" rx="22.23" ry="22.74"/>
	<path fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M142.27,132.04c0,0,7.92-2.25,4-8.2c-1.67-2.54-5.56-3.27-7.91-0.88c-2.29,2.33-3.46,4.56-1.2,8.08c1.98,3.09,2.14,2.91,2.28,5.44c0.25,4.42-3.65,6.57-6.81,5.31s-4.66-3.3-4.81-6.95c-0.18-4.42,4.02-5.04,4.02-5.04"/>
	<line fill="none" stroke="#000" stroke-width="${strokeWidth}"  x1="147.36" y1="119.05" x2="144.8" y2="122.39"/>
	<line fill="none" stroke="#000" stroke-width="${strokeWidth}" x1="129.85" y1="140.48" x2="127.29" y2="143.81"/>
	<path fill="none" stroke="#000" stroke-width="${strokeWidth}" d="M209.42,154.32c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1s-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83C214.46,164.05,213.74,157.76,209.42,154.32"/>
	<path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>

</svg>`;
    },



    icon_typeTether(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
        const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeTether"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Tether</title>
    
	<circle fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}"  cx="140.3" cy="137.75" r="126.5"/>
    <circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.6"  cx="139.42" cy="137.88" r="99.62"/>
    <path fill="#000" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M130.33,92.81h-19.28v-6.1c0-3.74-3.92-6.78-8.77-6.78h-4.09c-4.84,0-8.77,3.03-8.77,6.78v28.92 c0,3.74,3.92,6.78,8.77,6.78h4.09c4.84,0,8.77-3.03,8.77-6.78v-6.1h19.28c4.84,0,8.77-3.03,8.77-6.78v-3.16 C139.09,95.84,135.17,92.81,130.33,92.81z"/>
    <path fill="#000" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M148.04,109.83l19.48-0.18l0.06,6.1c0.04,3.74,4.03,6.74,8.92,6.69l4.13-0.04c4.89-0.05,8.83-3.12,8.79-6.86 l-0.27-28.91c-0.04-3.74-4.03-6.74-8.92-6.69l-4.13,0.04c-4.89,0.05-8.83,3.12-8.79,6.86l0.06,6.1l-19.48,0.18 c-4.89,0.05-8.83,3.12-8.79,6.86l0.03,3.16C139.16,106.88,143.15,109.88,148.04,109.83z"/>
    <path fill="#000" stroke="${colorSecondary}" stroke-width="${strokeWidth}" d="M164.11,177.52h-15.96V89.4c0-3.74-3.03-6.78-6.78-6.78h-4.52c-3.74,0-6.78,3.03-6.78,6.78v88.12h-15.96 c-3.74,0-6.78,3.03-6.78,6.78v4.52c0,3.74,3.03,6.78,6.78,6.78h22.74h4.52h22.74c3.74,0,6.78-3.03,6.78-6.78v-4.52 C170.89,180.55,167.85,177.52,164.11,177.52z"/>
    <path fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M162.54,136.44c24.26,1.79,41.49,6.3,41.49,11.59c0,6.85-28.93,12.41-64.61,12.41s-64.61-5.56-64.61-12.41 c0-5.51,18.7-10.18,44.57-11.8"/>

    <path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>
	
</svg>`;
    },




    icon_typeDerham(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeDerham"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Derham</title>
    
	<circle fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}"  cx="142.16" cy="137.34" r="126.5"/>
	<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.6"  cx="139.42" cy="137.88" r="99.62"/>
    <path fill="${colorPrimary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M162.12,79.76c-27.16-14.73-80.23-4.1-54.14,6.48c0,0,8.58,102.02,1.37,106.93c-7.21,4.91,22.47,7.56,42.91,1.4 C205.82,178.44,208.8,105.08,162.12,79.76z M154.14,179.21c-12.37,5.12-30.56,3.6-26.26-0.32c4.31-3.92-2.96-82.47-2.96-82.47 c-16.16-7.7,16.06-16.84,32.96-5.96C186.92,109.16,186.55,165.81,154.14,179.21z"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M92.99,135.26l13.3-1.7h90.95l11.77-1.7c3.32,0,6.02-1.9,6.02-4.25v-0.09c0-2.35-2.7-4.25-6.02-4.25l-11.77,1.7 h-92.47l-11.77,1.7c-3.32,0-6.02,1.9-6.02,4.25v0.09C86.97,133.35,89.67,135.26,92.99,135.26z"/>
    <path fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}"  d="M100.04,154.27l13.02-1.71h76.96l11.95-1.71c2.92,0,5.29-1.91,5.29-4.27v-0.09c0-2.36-2.37-4.27-5.29-4.27 l-9.27,1.71h-79.63l-13.02,1.71c-2.92,0-5.29,1.91-5.29,4.27V150C94.75,152.36,97.12,154.27,100.04,154.27z"/>

    <path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>
	
</svg>`;
    },




    icon_typeRial(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeRial"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Rial</title>
    
<circle fill="${colorSecondary}" stroke="#000" stroke-width="${strokeWidth}" cx="137.33" cy="135.94" r="126.5"/>
	<circle fill="none" stroke="${colorPrimary}" stroke-width="${strokeWidth}" opacity="0.6"  cx="136.45" cy="136.07" r="99.62"/>
<g>
	<path fill="${colorPrimary}" d="M73.68,168.05v-67.27h25.14c5.05,0,8.89,0.6,11.52,1.81c2.63,1.21,4.73,3.34,6.3,6.4c1.57,3.06,2.36,6.44,2.36,10.1 	c0,4.77-1.3,8.79-3.91,12.07c-2.6,3.27-6.63,5.35-12.06,6.24c1.98,1.13,3.49,2.25,4.52,3.35c2.19,2.39,4.27,5.37,6.23,8.9 	l9.86,18.31h-9.44l-7.5-14c-2.19-4.04-4-7.13-5.41-9.27c-1.42-2.14-2.69-3.64-3.81-4.5c-1.12-0.86-2.26-1.45-3.42-1.7 	c-0.85-0.21-2.24-0.32-4.18-0.32h-8.7v29.87H73.68z M81.18,130.47h16.12c3.43,0,6.11-0.42,8.04-1.26c1.93-0.84,3.4-2.19,4.41-4.04 c1.01-1.85,1.51-3.86,1.51-6.03c0-3.18-0.97-5.8-2.92-7.85c-1.95-2.05-5.02-3.07-9.22-3.07H81.18V130.47z"/>
	<path fill="${colorPrimary}" d="M129.9,110.28v-9.5h6.96v9.5H129.9z M129.9,168.05v-48.73h6.96v48.73H129.9z"/>
	<path fill="${colorPrimary}" d="M174.26,162.04c-2.58,2.6-5.06,4.44-7.44,5.51c-2.38,1.07-4.94,1.61-7.68,1.61c-4.51,0-7.98-1.31-10.4-3.92 c-2.42-2.62-3.64-5.96-3.64-10.03c0-2.39,0.46-4.57,1.37-6.54c0.91-1.97,2.11-3.56,3.6-4.75c1.48-1.19,3.15-2.09,5.01-2.71 c1.37-0.43,3.43-0.84,6.19-1.24c5.62-0.79,9.76-1.74,12.41-2.84c0.03-1.13,0.04-1.85,0.04-2.16c0-3.37-0.66-5.74-1.97-7.11 c-1.78-1.87-4.42-2.8-7.93-2.8c-3.27,0-5.69,0.68-7.25,2.04c-1.56,1.36-2.71,3.77-3.46,7.23l-6.81-1.1 c0.62-3.46,1.64-6.25,3.06-8.37c1.42-2.13,3.47-3.76,6.15-4.91c2.68-1.15,5.79-1.72,9.32-1.72c3.5,0,6.35,0.49,8.55,1.47 c2.19,0.98,3.8,2.21,4.83,3.69s1.75,3.36,2.17,5.62c0.23,1.41,0.35,3.95,0.35,7.62v11.01c0,7.68,0.15,12.53,0.45,14.57 c0.3,2.04,0.88,3.99,1.76,5.85h-7.27C174.93,166.34,174.46,164.34,174.26,162.04z M173.68,143.6c-2.53,1.22-6.32,2.26-11.37,3.12 c-2.86,0.49-4.89,1.04-6.07,1.65c-1.19,0.61-2.1,1.51-2.75,2.68c-0.65,1.18-0.97,2.49-0.97,3.92c0,2.2,0.7,4.04,2.11,5.51 c1.4,1.47,3.46,2.2,6.17,2.2c2.68,0,5.07-0.7,7.15-2.09s3.62-3.3,4.6-5.71c0.75-1.87,1.12-4.62,1.12-8.26V143.6z"/>
	<path fill="${colorPrimary}" d="M191.35,168.05v-67.27h6.96v67.27H191.35z"/>
</g>
<g>
	<path fill="${colorPrimary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M71.02,172.35v-67.27h25.14c5.05,0,8.89,0.6,11.52,1.81c2.63,1.21,4.73,3.34,6.3,6.4 c1.57,3.06,2.36,6.44,2.36,10.14c0,4.77-1.3,8.79-3.91,12.07c-2.6,3.27-6.63,5.35-12.06,6.24c1.98,1.13,3.49,2.25,4.52,3.35 c2.19,2.39,4.27,5.37,6.23,8.95l9.86,18.31h-9.44l-7.5-14c-2.19-4.04-4-7.13-5.41-9.27c-1.42-2.14-2.69-3.64-3.81-4.5 c-1.12-0.86-2.26-1.45-3.42-1.79c-0.85-0.21-2.24-0.32-4.18-0.32h-8.7v29.87H71.02z M78.52,134.77h16.12 c3.43,0,6.11-0.42,8.04-1.26c1.93-0.84,3.4-2.19,4.41-4.04c1.01-1.85,1.51-3.86,1.51-6.03c0-3.18-0.97-5.8-2.92-7.85 c-1.95-2.05-5.02-3.07-9.22-3.07H78.52V134.77z"/>
	<path fill="${colorPrimary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M127.24,114.58v-9.5h6.96v9.5H127.24z M127.24,172.35v-48.73h6.96v48.73H127.24z"/>
	<path fill="${colorPrimary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M171.6,166.34c-2.58,2.6-5.06,4.44-7.44,5.51c-2.38,1.07-4.94,1.61-7.68,1.61c-4.51,0-7.98-1.31-10.4-3.92 c-2.42-2.62-3.64-5.96-3.64-10.03c0-2.39,0.46-4.57,1.37-6.54c0.91-1.97,2.11-3.56,3.6-4.75c1.48-1.19,3.15-2.09,5.01-2.71 c1.37-0.43,3.43-0.84,6.19-1.24c5.62-0.79,9.76-1.74,12.41-2.84c0.03-1.13,0.04-1.85,0.04-2.16c0-3.37-0.66-5.74-1.97-7.11 c-1.78-1.87-4.42-2.8-7.93-2.8c-3.27,0-5.69,0.68-7.25,2.04c-1.56,1.36-2.71,3.77-3.46,7.23l-6.81-1.1 c0.62-3.46,1.64-6.25,3.06-8.37c1.42-2.13,3.47-3.76,6.15-4.91c2.68-1.15,5.79-1.72,9.32-1.72c3.5,0,6.35,0.49,8.55,1.47 c2.19,0.98,3.8,2.21,4.83,3.69c1.03,1.48,1.75,3.36,2.17,5.62c0.23,1.41,0.35,3.95,0.35,7.62v11.01c0,7.68,0.15,12.53,0.45,14.57 c0.3,2.04,0.88,3.99,1.76,5.85h-7.27C172.27,170.64,171.8,168.63,171.6,166.34z M171.02,147.89c-2.53,1.22-6.32,2.26-11.37,3.12 c-2.86,0.49-4.89,1.04-6.07,1.65c-1.19,0.61-2.1,1.51-2.75,2.68c-0.65,1.18-0.97,2.49-0.97,3.92c0,2.2,0.7,4.04,2.11,5.51 c1.4,1.47,3.46,2.2,6.17,2.2c2.68,0,5.07-0.7,7.15-2.09s3.62-3.3,4.6-5.71c0.75-1.87,1.12-4.62,1.12-8.26V147.89z"/>
	<path fill="${colorPrimary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" d="M188.69,172.35v-67.27h6.96v67.27H188.69z"/>
</g>

    <path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>

</svg>`;
    },






    icon_exchangeToIRR(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
        const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ExvhangeToIrr"
    width="${size}" height="${size}" viewBox="0 0 177 177" fill="none">
    <title>Exchange To IRR</title>
    
<g id="Layer_1">
	<path opacity="0.6" fill="${colorSecondary}" d="M129.35,19.53c-12.14-7.37-26.4-11.61-41.64-11.61c-44.4,0-80.39,35.99-80.39,80.39 c0,25.78,12.14,48.73,31.01,63.44"/>
	<path opacity="0.6" fill="${colorSecondary}" d="M59.95,163.77c8.65,3.18,18.01,4.92,27.77,4.92c44.4,0,80.39-35.99,80.39-80.39 c0-19.43-6.89-37.24-18.36-51.14"/>
	<g>
		<path fill="${colorPrimary}" d="M130.68,19.09c-8.74-5.07-18.4-8.46-28.32-9.96c-4.96-0.74-9.99-1.04-14.99-0.81c-5,0.19-9.97,0.84-14.83,1.96 c-9.73,2.19-19.01,6.27-27.17,11.91C37.19,27.83,30.11,35,24.61,43.21c-5.5,8.21-9.39,17.46-11.38,27.07 c-1.02,4.8-1.6,9.69-1.77,14.59c-0.01,1.23-0.12,2.45-0.05,3.68l0.09,3.68c0.19,2.44,0.33,4.9,0.72,7.32 c1.27,9.74,4.47,19.22,9.17,27.94c4.7,8.74,11.09,16.59,18.56,23.41l-0.31,0.39c-8.41-5.73-15.77-13.25-21.28-22.02 c-2.79-4.37-5.09-9.05-7-13.89c-1.88-4.86-3.18-9.94-4.09-15.08c-0.47-2.57-0.68-5.18-0.93-7.78c-0.1-2.61-0.21-5.22-0.09-7.84 c0.19-5.22,0.92-10.43,2.14-15.5c2.49-10.14,6.9-19.78,12.91-28.24C27.3,32.46,34.9,25.15,43.55,19.5 c8.65-5.67,18.37-9.65,28.46-11.66c5.05-0.99,10.18-1.5,15.31-1.53c5.13-0.07,10.25,0.4,15.28,1.31 c10.07,1.83,19.74,5.61,28.33,11.05L130.68,19.09z"/>
		<path fill="${colorPrimary}" d="M133.15,15.02c2.13,1.29,2.81,4.07,1.52,6.2s-4.07,2.81-6.2,1.52c-2.13-1.29-2.81-4.07-1.52-6.2 C128.24,14.41,131.02,13.73,133.15,15.02z"/>
		<polygon fill="${colorPrimary}" points="32.21,156.56 49.98,159.04 43.24,142.4"/>
	</g>
	<g>
		<path fill="${colorPrimary}" d="M61.49,162.88c8.26,2.83,16.94,4.29,25.61,4.36c8.68,0.07,17.32-1.32,25.51-3.98c16.39-5.35,30.85-16.16,40.48-30.27 c2.4-3.52,4.56-7.22,6.35-11.08c1.78-3.87,3.24-7.87,4.38-11.95c1.18-4.08,1.96-8.25,2.49-12.45c0.52-4.2,0.79-8.44,0.68-12.68 c-0.14-8.48-1.61-16.96-4.31-25.09C159.97,51.61,156,43.86,151,36.67l0.39-0.32c12.32,12.65,19.7,30.28,20.6,48.29 c0.24,4.5,0.06,9.03-0.52,13.51c-0.57,4.48-1.52,8.92-2.91,13.21c-2.77,8.59-6.88,16.72-12.21,23.93 c-10.54,14.53-25.95,25.31-43.01,30.34c-8.55,2.43-17.46,3.52-26.29,3.13c-8.83-0.37-17.57-2.22-25.74-5.43L61.49,162.88z"/>
		<path fill="${colorPrimary}" d="M59.84,167.35c-2.34-0.86-3.54-3.45-2.68-5.79s3.45-3.54,5.79-2.68c2.34,0.86,3.54,3.45,2.68,5.79 C64.78,167.01,62.18,168.21,59.84,167.35z"/>
		<polygon fill="${colorPrimary}" points="159.79,32.82 142.97,26.55 145.94,44.25 "/>
	</g>
</g>
<g id="Layer_2">
	<path fill="${colorPrimary}" d="M35.27,60.97c2.67,0,5.19,0.23,7.56,0.7c3.19,0.63,4.78,1.98,4.78,4.04c0,0.68-0.16,1.19-0.47,1.53 c-0.32,0.34-1.12,0.84-2.41,1.49c-1.08,0.54-1.79,1.72-2.13,3.55c-0.34,1.83-0.51,5.39-0.51,10.69c0,8.95,0.22,14.5,0.67,16.63 c0.16,0.68,0.42,1.2,0.76,1.56c0.34,0.36,0.93,0.76,1.78,1.18c1.55,0.7,2.32,1.72,2.32,3.06c0,1.88-1.43,3.16-4.29,3.87 c-3.09,0.75-6.88,1.12-11.36,1.12c-7.64,0-11.46-1.45-11.46-4.36c0-1.05,0.75-2.04,2.25-2.95c1.15-0.7,1.83-1.66,2.04-2.88 c0.44-2.67,0.67-8.34,0.67-17.02c0-6-0.3-9.84-0.91-11.53c-0.33-0.96-1.11-1.83-2.36-2.6c-0.96-0.63-1.61-1.16-1.93-1.58 c-0.33-0.42-0.49-0.96-0.49-1.62c0-1.01,0.49-1.81,1.46-2.41c0.97-0.6,2.69-1.13,5.15-1.6C29.31,61.27,32.27,60.97,35.27,60.97z"/>
	<path fill="${colorPrimary}" d="M73,89.52c-0.89,0-1.46,0.27-1.71,0.81c-0.25,0.54-0.37,1.79-0.37,3.76c0,2.98,0.19,5.3,0.56,6.96 c0.12,0.47,0.29,0.83,0.53,1.09c0.23,0.26,0.68,0.57,1.34,0.95c1.41,0.77,2.11,1.79,2.11,3.06c0,1.55-0.98,2.64-2.94,3.29 c-1.96,0.64-5.27,0.97-9.93,0.97c-8.67,0-13.01-1.64-13.01-4.92c0-0.56,0.13-1.01,0.39-1.35c0.26-0.34,0.84-0.81,1.76-1.42 c1.03-0.68,1.73-1.48,2.09-2.41c0.36-0.93,0.62-2.53,0.76-4.8c0.12-1.66,0.18-7.63,0.18-17.89c0-3.26-0.16-5.47-0.49-6.64 c-0.33-1.17-1.03-2.03-2.11-2.57c-1.03-0.49-1.72-0.94-2.07-1.35c-0.35-0.41-0.53-0.94-0.53-1.6c0-0.87,0.33-1.62,1-2.27 c0.67-0.64,1.6-1.12,2.79-1.42c1.01-0.26,2.39-0.39,4.15-0.39c0.77,0,2.71,0.12,5.8,0.35c0.59,0.05,1.51,0.07,2.78,0.07 c2.11,0,4.92-0.14,8.44-0.42c2.23-0.16,3.78-0.25,4.68-0.25c5.02,0,9.16,1.21,12.45,3.62c2.95,2.18,4.43,5.2,4.43,9.07 c0,2.16-0.52,4.12-1.55,5.89c-1.03,1.77-2.45,3.1-4.25,3.99c-0.75,0.38-1.12,0.82-1.12,1.34c0,0.68,0.57,1.23,1.72,1.65 c2.46,0.89,4.27,2.24,5.41,4.04c1.15,1.81,1.97,4.57,2.46,8.3c0.21,1.55,0.52,2.55,0.91,3.01c0.4,0.46,1.32,0.9,2.78,1.32 c0.44,0.14,0.82,0.44,1.12,0.9c0.3,0.46,0.46,0.97,0.46,1.53c0,0.73-0.28,1.46-0.84,2.2s-1.29,1.32-2.18,1.74 c-1.97,0.91-4.66,1.37-8.09,1.37c-4.57,0-7.84-1.21-9.81-3.62c-0.89-1.08-1.65-2.44-2.27-4.08c-0.62-1.64-1.35-4.2-2.2-7.66 c-0.54-2.23-1.23-3.8-2.06-4.71C75.73,90.08,74.54,89.59,73,89.52z M70.96,71.59l-0.39,8.19c0,0.07,0,0.18,0,0.32 c0,0.84,0.12,1.41,0.37,1.69s0.74,0.42,1.49,0.42c2.06,0,3.56-0.53,4.5-1.6c0.94-1.07,1.41-2.77,1.41-5.12 c0-4.52-1.61-6.79-4.82-6.79c-0.91,0-1.56,0.21-1.93,0.63C71.22,69.76,71,70.51,70.96,71.59z"/>
	<path fill="${colorPrimary}" d="M128.9,89.52c-0.89,0-1.46,0.27-1.71,0.81c-0.25,0.54-0.37,1.79-0.37,3.76c0,2.98,0.19,5.3,0.56,6.96 c0.12,0.47,0.29,0.83,0.53,1.09c0.23,0.26,0.68,0.57,1.34,0.95c1.41,0.77,2.11,1.79,2.11,3.06c0,1.55-0.98,2.64-2.94,3.29 c-1.96,0.64-5.27,0.97-9.93,0.97c-8.67,0-13.01-1.64-13.01-4.92c0-0.56,0.13-1.01,0.39-1.35c0.26-0.34,0.84-0.81,1.76-1.42 c1.03-0.68,1.73-1.48,2.09-2.41c0.36-0.93,0.62-2.53,0.76-4.8c0.12-1.66,0.18-7.63,0.18-17.89c0-3.26-0.16-5.47-0.49-6.64 c-0.33-1.17-1.03-2.03-2.11-2.57c-1.03-0.49-1.72-0.94-2.07-1.35c-0.35-0.41-0.53-0.94-0.53-1.6c0-0.87,0.33-1.62,1-2.27 c0.67-0.64,1.6-1.12,2.79-1.42c1.01-0.26,2.39-0.39,4.15-0.39c0.77,0,2.71,0.12,5.8,0.35c0.59,0.05,1.51,0.07,2.78,0.07 c2.11,0,4.92-0.14,8.44-0.42c2.23-0.16,3.79-0.25,4.68-0.25c5.02,0,9.16,1.21,12.45,3.62c2.95,2.18,4.43,5.2,4.43,9.07 c0,2.16-0.52,4.12-1.55,5.89c-1.03,1.77-2.45,3.1-4.25,3.99c-0.75,0.38-1.12,0.82-1.12,1.34c0,0.68,0.57,1.23,1.72,1.65 c2.46,0.89,4.27,2.24,5.41,4.04c1.15,1.81,1.97,4.57,2.46,8.3c0.21,1.55,0.52,2.55,0.91,3.01s1.32,0.9,2.78,1.32 c0.45,0.14,0.82,0.44,1.12,0.9s0.46,0.97,0.46,1.53c0,0.73-0.28,1.46-0.84,2.2s-1.29,1.32-2.18,1.74 c-1.97,0.91-4.66,1.37-8.09,1.37c-4.57,0-7.84-1.21-9.81-3.62c-0.89-1.08-1.65-2.44-2.27-4.08c-0.62-1.64-1.35-4.2-2.2-7.66 c-0.54-2.23-1.22-3.8-2.06-4.71S130.44,89.59,128.9,89.52z M126.86,71.59l-0.39,8.19c0,0.07,0,0.18,0,0.32 c0,0.84,0.12,1.41,0.37,1.69s0.74,0.42,1.49,0.42c2.06,0,3.56-0.53,4.5-1.6c0.94-1.07,1.41-2.77,1.41-5.12 c0-4.52-1.61-6.79-4.82-6.79c-0.91,0-1.56,0.21-1.93,0.63S126.9,70.51,126.86,71.59z"/>
</g>

</svg>`;
    },



    icon_exchangeToTether(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 5;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
        const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ExvhangeToTether"
    width="${size}" height="${size}" viewBox="0 0 177 177" fill="none">
    <title>Exchange To Tether</title>
    
<g id="Layer_1">
	<path opacity="0.6" fill="${colorSecondary}"  d="M130.09,17.43c-12.14-7.37-26.4-11.61-41.64-11.61c-44.4,0-80.39,35.99-80.39,80.39 c0,25.78,12.14,48.73,31.01,63.44"/>
	<path opacity="0.6" fill="${colorSecondary}"  d="M60.69,161.67c8.65,3.18,18.01,4.92,27.77,4.92c44.4,0,80.39-35.99,80.39-80.39 c0-19.43-6.89-37.24-18.36-51.14"/>
	<g>
		<path fill="${colorPrimary}"  d="M131.41,16.98c-8.74-5.07-18.4-8.46-28.32-9.96C98.13,6.29,93.1,5.99,88.1,6.22c-5,0.19-9.97,0.84-14.83,1.96 c-9.73,2.19-19.01,6.27-27.17,11.91c-8.18,5.63-15.26,12.81-20.76,21.02c-5.5,8.21-9.39,17.46-11.38,27.07 c-1.02,4.8-1.6,9.69-1.77,14.59c-0.01,1.23-0.12,2.45-0.05,3.68l0.09,3.68c0.19,2.44,0.33,4.9,0.72,7.32 c1.27,9.74,4.47,19.22,9.17,27.94c4.7,8.74,11.09,16.59,18.56,23.41l-0.31,0.39c-8.41-5.73-15.77-13.25-21.28-22.02 c-2.79-4.37-5.09-9.05-7-13.89c-1.88-4.86-3.18-9.94-4.09-15.08c-0.47-2.57-0.68-5.18-0.93-7.78c-0.1-2.61-0.21-5.22-0.09-7.84 c0.19-5.22,0.92-10.43,2.14-15.5c2.49-10.14,6.9-19.78,12.91-28.24c5.99-8.48,13.58-15.79,22.24-21.45 c8.65-5.67,18.37-9.65,28.46-11.66c5.05-0.99,10.18-1.5,15.31-1.53c5.13-0.07,10.25,0.4,15.28,1.31 c10.07,1.83,19.74,5.61,28.33,11.05L131.41,16.98z"/>
		<path fill="${colorPrimary}"  d="M133.88,12.91c2.13,1.29,2.81,4.07,1.52,6.2s-4.07,2.81-6.2,1.52c-2.13-1.29-2.81-4.07-1.52-6.2 S131.75,11.62,133.88,12.91z"/>
		<polygon fill="${colorPrimary}"  points="32.94,154.46 50.72,156.93 43.98,140.3"/>
	</g>
	<g>
		<path fill="${colorPrimary}"  d="M62.23,160.78c8.26,2.83,16.94,4.29,25.61,4.36c8.68,0.07,17.32-1.32,25.51-3.98c16.39-5.35,30.85-16.16,40.48-30.27 c2.4-3.52,4.56-7.22,6.35-11.08c1.78-3.87,3.24-7.87,4.38-11.95c1.18-4.08,1.96-8.25,2.49-12.45c0.52-4.2,0.79-8.44,0.68-12.68 c-0.14-8.48-1.61-16.96-4.31-25.09c-2.71-8.13-6.69-15.88-11.68-23.07l0.39-0.32c12.32,12.65,19.7,30.28,20.6,48.29 c0.24,4.5,0.06,9.03-0.52,13.51c-0.57,4.48-1.52,8.92-2.91,13.21c-2.77,8.59-6.88,16.72-12.21,23.93 c-10.54,14.53-25.95,25.31-43.01,30.34c-8.55,2.43-17.46,3.52-26.29,3.13c-8.83-0.37-17.57-2.22-25.74-5.43L62.23,160.78z"/>
		<path fill="${colorPrimary}"  d="M60.58,165.24c-2.34-0.86-3.54-3.45-2.68-5.79s3.45-3.54,5.79-2.68c2.34,0.86,3.54,3.45,2.68,5.79 C65.51,164.91,62.92,166.11,60.58,165.24z"/>
		<polygon fill="${colorPrimary}"  points="160.52,30.72 143.71,24.44 146.68,42.15"/>
	</g>
</g>
<g id="Layer_2">
	<path fill="${colorPrimary}" stroke="#fff" stroke-width="4" d="M81.32,45.53H62.03v-6.1c0-3.74-3.92-6.78-8.77-6.78h-4.09c-4.84,0-8.77,3.03-8.77,6.78v28.92 c0,3.74,3.92,6.78,8.77,6.78h4.09c4.84,0,8.77-3.03,8.77-6.78v-6.1h19.28c4.84,0,8.77-3.03,8.77-6.78V52.3 C90.08,48.56,86.16,45.53,81.32,45.53z"/>
	<path fill="${colorPrimary}" stroke="#fff" stroke-width="4" d="M99.03,62.56l19.48-0.18l0.06,6.1c0.04,3.74,4.03,6.74,8.92,6.69l4.13-0.04c4.89-0.05,8.83-3.12,8.79-6.86 l-0.27-28.91c-0.04-3.74-4.03-6.74-8.92-6.69l-4.13,0.04c-4.89,0.05-8.83,3.12-8.79,6.86l0.06,6.1l-19.48,0.18 c-4.89,0.05-8.83,3.12-8.79,6.86l0.03,3.16C90.15,59.61,94.14,62.6,99.03,62.56z"/>
	<path fill="${colorPrimary}" stroke="#fff" stroke-width="4" d="M115.1,130.24H99.15V42.12c0-3.74-3.03-6.78-6.78-6.78h-4.52c-3.74,0-6.78,3.03-6.78,6.78v88.12H65.11 c-3.74,0-6.78,3.03-6.78,6.78v4.52c0,3.74,3.03,6.78,6.78,6.78h22.74h4.52h22.74c3.74,0,6.78-3.03,6.78-6.78v-4.52 C121.88,133.28,118.85,130.24,115.1,130.24z"/>
	<path fill="none" stroke="${colorPrimary}" stroke-width="10" d="M113.53,89.17c24.26,1.79,41.49,6.3,41.49,11.59c0,6.85-28.93,12.41-64.61,12.41s-64.61-5.56-64.61-12.41 c0-5.51,18.7-10.18,44.57-11.8"/>
</g>

</svg>`;
    },





    icon_crcode(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 20;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CrCode"
    width="${size}" height="${size}" viewBox="0 0 300 300" fill="none">
    <title>Cr Code</title>
<rect fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x="27.31" y="26.78"  width="100" height="100"/>
<rect fill="${colorPrimary}" x="58.5" y="57.97" width="37.62" height="37.62"/>
<rect fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x="171.06" y="26.78" width="100" height="100"/>
<rect fill="${colorPrimary}" x="202.25" y="57.97" width="37.62" height="37.62"/>
<rect fill="${colorSecondary}" stroke="${colorPrimary}" stroke-width="${strokeWidth}" x="27.31" y="168.53" width="100" height="100"/>
<rect fill="${colorPrimary}" x="165.5" y="240.47" width="37.62" height="37.62"/>
<rect fill="${colorPrimary}" x="184.31" y="158.03" width="94.75" height="25"/>
<rect fill="${colorPrimary}" x="203.25" y="166.03" width="37.62" height="56.03"/>
<rect fill="${colorPrimary}" x="239.88" y="203.25" width="37.62" height="37.62"/>
<rect fill="${colorPrimary}" x="221.06" y="259.28" width="56.44" height="18.81"/>
<rect fill="${colorPrimary}" x="165.5" y="203.25" width="18.81" height="37.62"/>
<rect fill="${colorPrimary}" x="58.5" y="200.4" width="37.62" height="37.62"/>
</svg>`;
    },




    icon_application(
        options = {
            size : component_props.elementSizes ,
            colors : {
                primary :   component_props?.primaryColor1 ?? "#00AEEF" ,
                secondary : component_props?.secondaryColor1 ?? "#fff"
            } ,
            strokeWidth: 5 ,
            variant : "default"
        }
    ) {
        const size = tools_css.getIconSize(options?.size, options?.size);
        const strokeWidth = options?.colors?.strokeWidth ?? 2;
        const colorPrimary = options?.colors?.primary ?? (component_props?.primaryColor1 ?? "#00AEEF");
         const colorSecondary = options?.colors?.secondary ?? (component_props?.secondaryColor1 ?? "#fff");
        const variant = options?.variant ?? "default";

        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Application"
    width="${size}" height="${size}" viewBox="0 0 206 206" fill="none">
    <title>Application</title>
	<path fill="${colorPrimary}" d="M120.65,78.48c-1.12,0-1.68,0.39-1.68,1.18v10.25c0,0.78,0.13,1.26,0.39,1.42c0.44,0.28,0.99,0.42,1.66,0.42 c1,0,1.84-0.37,2.52-1.12c0.98-1.06,1.48-2.85,1.48-5.37c0-2.61-0.58-4.5-1.73-5.67C122.56,78.85,121.68,78.48,120.65,78.48z"/>
	<path fill="${colorPrimary}" d="M82.8,88.52c-0.27-0.4-0.56-0.6-0.86-0.6c-0.54,0-1,0.67-1.36,2.02c-0.06,0.18-0.28,0.89-0.66,2.14 c-0.64,2.05-0.95,3.28-0.95,3.68c0,0.5,0.35,0.75,1.04,0.75h4.45c0.82,0,1.23-0.24,1.23-0.72c0-0.66-0.57-2.29-1.7-4.88 C83.47,89.72,83.08,88.92,82.8,88.52z"/>
	<path fill="${colorPrimary}" d="M180.42,83.63h-3.09c-2.76,0-5-2.24-5-5v-23.5c0-11.87-9.63-21.5-21.5-21.5h-23.5c-2.76,0-5-2.24-5-5v-2.89 c0-10.84-8.43-20.08-19.27-20.47c-11.38-0.4-20.73,8.7-20.73,19.99v3.37c0,2.76-2.24,5-5,5h-23.5c-11.87,0-21.5,9.63-21.5,21.5 v17.97c0,2.76,2.24,5,5,5h5.3c8.28,0,15,6.72,15,15v11.18c0,8.28-6.72,15-15,15H36.4c-5.52,0-10-4.48-10-10V85.63c0-1.1-0.9-2-2-2 h-0.01c-11.05,0-20,8.95-20,20v0c0,11.05,8.95,20,20,20h2.94c2.76,0,5,2.24,5,5v23.5c0,11.87,9.63,21.5,21.5,21.5h16.84 c2.76,0,5-2.24,5-5v-5.69c0-8.28,6.72-15,15-15h11.18c8.28,0,15,6.72,15,15v6.23c0,5.52-4.48,10-10,10H84.33c-1.1,0-2,0.9-2,2v0.29 c0,10.84,8.43,20.08,19.27,20.47c11.38,0.4,20.73-8.7,20.73-19.99v-3.32c0-2.76,2.24-5,5-5h23.5c11.87,0,21.5-9.63,21.5-21.5v-23.5 c0-2.76,2.24-5,5-5h3.09c11.05,0,20-8.95,20-20v0C200.42,92.58,191.47,83.63,180.42,83.63z M102.02,113.21 c-1.33,0.64-3.51,0.96-6.54,0.96c-3.42,0-5.96-0.19-7.61-0.57c-0.76-0.18-1.36-0.55-1.81-1.1c-0.45-0.55-0.67-1.22-0.67-2 c0-0.6,0.12-1.07,0.35-1.4c0.23-0.33,0.67-0.64,1.31-0.92c0.71-0.32,1.07-0.86,1.07-1.63c0-1.35-0.61-2.14-1.84-2.38 c-1.32-0.24-3.17-0.36-5.57-0.36c-2.01,0-3.22,0.16-3.61,0.48c-0.24,0.2-0.46,0.56-0.64,1.08c-0.18,0.52-0.27,1.03-0.27,1.51 c0,0.44,0.06,0.73,0.19,0.86c0.13,0.13,0.55,0.35,1.26,0.65c0.92,0.36,1.39,1.08,1.39,2.17c0,2.39-2.16,3.59-6.47,3.59 c-2.45,0-4.26-0.22-5.41-0.66c-1.06-0.42-1.59-1.35-1.59-2.77c0-0.62,0.12-1.11,0.35-1.45c0.23-0.34,0.65-0.65,1.26-0.93 c0.98-0.46,1.73-1.11,2.24-1.94c0.51-0.83,1.23-2.62,2.17-5.35l3.2-9.31c1.18-3.42,1.97-5.97,2.37-7.67 c0.4-1.7,0.61-3.36,0.62-4.99c0.01-1.73,0.09-2.93,0.24-3.6c0.14-0.67,0.47-1.33,0.97-1.97c1.04-1.41,2.38-2.11,4-2.11 c1.53,0,2.99,0.79,4.38,2.38c1.94,2.17,4.76,8.49,8.45,18.96l4.29,12.21c0.41,1.13,0.75,1.86,1.02,2.22s0.69,0.59,1.25,0.71 c1.09,0.22,1.64,0.96,1.64,2.2C104.02,111.51,103.36,112.56,102.02,113.21z M131.67,95c-2.23,2.31-4.92,3.47-8.09,3.47 c-0.8,0-1.79-0.07-2.95-0.21c-0.62-0.06-1.01-0.09-1.16-0.09c-0.44,0-0.66,0.33-0.66,1v0.18l0.16,4.94 c0.03,0.96,0.16,1.68,0.4,2.16c0.24,0.47,0.72,0.96,1.44,1.46c0.98,0.7,1.48,1.47,1.48,2.29c0,1.27-0.73,2.24-2.18,2.92 c-1.45,0.68-3.51,1.02-6.18,1.02c-5.6,0-8.41-1.28-8.41-3.83c0-0.6,0.12-1.06,0.36-1.39c0.24-0.32,0.81-0.78,1.7-1.39 c0.54-0.38,0.86-0.92,0.95-1.6c0.09-0.68,0.15-2.88,0.18-6.6V83.49c0-2.05-0.11-3.35-0.32-3.9s-0.79-1-1.73-1.34 c-1.36-0.52-2.04-1.43-2.04-2.71c0-0.9,0.29-1.6,0.86-2.08s1.41-0.72,2.5-0.72c0.36,0,1.26,0.03,2.7,0.09h1.36 c2.51-0.02,3.99-0.05,4.42-0.08c0.43-0.03,1.97-0.21,4.62-0.53c0.88-0.12,1.68-0.18,2.41-0.18c2.48,0,4.7,0.67,6.63,2.02 c3.38,2.33,5.07,6.03,5.07,11.09C135.22,89.24,134.04,92.53,131.67,95z M163.5,95c-2.23,2.31-4.92,3.47-8.09,3.47 c-0.8,0-1.79-0.07-2.95-0.21c-0.62-0.06-1.01-0.09-1.16-0.09c-0.44,0-0.66,0.33-0.66,1v0.18l0.16,4.94 c0.03,0.96,0.16,1.68,0.4,2.16c0.24,0.47,0.72,0.96,1.44,1.46c0.98,0.7,1.48,1.47,1.48,2.29c0,1.27-0.73,2.24-2.18,2.92 c-1.45,0.68-3.51,1.02-6.18,1.02c-5.6,0-8.41-1.28-8.41-3.83c0-0.6,0.12-1.06,0.36-1.39c0.24-0.32,0.81-0.78,1.7-1.39 c0.54-0.38,0.86-0.92,0.95-1.6c0.09-0.68,0.15-2.88,0.18-6.6V83.49c0-2.05-0.11-3.35-0.32-3.9s-0.79-1-1.73-1.34 c-1.36-0.52-2.04-1.43-2.04-2.71c0-0.9,0.29-1.6,0.86-2.08s1.41-0.72,2.5-0.72c0.36,0,1.26,0.03,2.7,0.09h1.36 c2.51-0.02,3.99-0.05,4.42-0.08c0.43-0.03,1.97-0.21,4.62-0.53c0.88-0.12,1.68-0.18,2.41-0.18c2.48,0,4.7,0.67,6.63,2.0  c3.38,2.33,5.07,6.03,5.07,11.09C167.05,89.24,165.87,92.53,163.5,95z"/>
	<path fill="${colorPrimary}" d="M152.49,78.48c-1.12,0-1.68,0.39-1.68,1.18v10.25c0,0.78,0.13,1.26,0.39,1.42c0.44,0.28,0.99,0.42,1.66,0.42 c1,0,1.84-0.37,2.52-1.12c0.98-1.06,1.48-2.85,1.48-5.37c0-2.61-0.58-4.5-1.73-5.67C154.39,78.85,153.51,78.48,152.49,78.48z"/>
</svg>`;
    },







}

