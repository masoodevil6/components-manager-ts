class ComponentValidateBase extends ComponentBase{

    /* ---------------------------------------------
      PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = {
        prop_size: {
            prop: "prop_size",
            default: tools_css.standardSizes.m.name,
        },
        prop_listRules: {
            prop: "prop_listRules",
            default: []
        },
        prop_msgRules: {
            prop: "prop_msgRules",
            default: null
        },
        prop_isAbsolute: {
            prop: "prop_isAbsolute",
            default: false
        },
        prop_reference: {
            prop: "prop_reference",
            default: ""
        },
        prop_referenceComponent: {
            prop: "prop_referenceComponent",
            default: null
        },
        var_htmlRules: {
            prop: "var_htmlRules",
            default: ""
        },
        prop_title: {
            prop: "prop_title",
            default: "---"
        },
        var_validation_msg: {
            prop: "var_validation_msg",
            default: {}
        },
    };

    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = {
        part_structure: [
            this._COMPONENT_PATTERN.prop_listRules
        ],

        part_form: [
            this._COMPONENT_PATTERN.prop_isAbsolute
        ],

        part_form_html: [
            this._COMPONENT_PATTERN.prop_reference,
            this._COMPONENT_PATTERN.prop_listRules,
            this._COMPONENT_PATTERN.prop_msgRules,
            this._COMPONENT_PATTERN.var_htmlRules,
            this._COMPONENT_PATTERN.prop_size
        ],

        part_form_validates: [
            this._COMPONENT_PATTERN.prop_title,
            this._COMPONENT_PATTERN.prop_reference,
            this._COMPONENT_PATTERN.prop_referenceComponent,
            this._COMPONENT_PATTERN.var_validation_msg ,

        ]
    };



    /* ---------------------------------------------
   PROPERTYs Schema
   --------------------------------------------- */
    _COMPONENT_SCHEMA = {
        part_structure: {
            part_form:{
                part_form_html:{} ,
                part_form_validates:{}
            }
        } ,
    }

}
window.ComponentValidate = class ComponentValidate extends ComponentValidateBase {

    var_showFormSelectOption = false;

    /* ---------------------------------------------
       SETUP
   --------------------------------------------- */
    constructor(elId , config) {
        super(
            listComponent[ComponentValidate.name] ,
            elId
        );
        super.renderComponent(config);
    }



    /* ---------------------------------------------
      TEMPLATEs
    --------------------------------------------- */
    componentFn(screanWidthType){
        this.templateFn("part_form");


        this.onRegisterFinish().then(el => {
            this.fn_connectToInputReference();
        })
    }


    templateFn(partName = null){

        switch (partName){
            case "part_structure":
                return this.template_render_structure(partName);
            case "part_form_html":
                return this.template_render_formHtml(partName);
            case "part_form_validates":
                return this.template_render_formValidates(partName);
            case "part_form":
                return this.componentFn_render_from(partName);
            default:
                return this.templateBasic_render();
        }
    }


    template_render_structure(partName ) {
        const data = this.getPartProps(partName)
        const prop_listRules      =  data != null && data.hasOwnProperty("prop_listRules")       ?  data.prop_listRules      :  [];

        const content = `
<div id="component-input-validate-position-form-rules-${this._COMPONENT_RANDOM_ID}" class="position-relative">
            <component-position-element id="component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}">
               <component-body>
                    ${this.templateFn("part_form_html") ?? ""}
                    ${this.templateFn("part_form_validates") ?? ""}
               </component-body>
            </component-position-element>
</div>
                `;

        if (prop_listRules != null && Array.isArray(prop_listRules) && prop_listRules.length > 0){
            return this.templateBasic_render_structure(content , ["position-relative"]);
        }
        else{
            return "";
        }
    }


    template_render_formHtml(partName ) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_listRules      =   data.hasOwnProperty("prop_listRules")       ?  data.prop_listRules      :  [];
            const var_htmlRules       =   data.hasOwnProperty("var_htmlRules")        ?  data.var_htmlRules       :  "";

            return `
<section data-part-name="${partName}" 
         id="component-validate-list-${ this._COMPONENT_RANDOM_ID}" 
         class="" >
         
     <style>
         #${this._COMPONENT_ID} #component-validate-list-${ this._COMPONENT_RANDOM_ID}{
             
         }
     </style>
     
     ${var_htmlRules}
</section>
        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    template_render_formValidates(partName ) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_title               =   data.hasOwnProperty("prop_title")                ?  data.prop_title               :  "";
            const var_validation_msg       =   data.hasOwnProperty("var_validation_msg")        ?  data.var_validation_msg       : [];

            const componentValidate = {
                title: prop_title ,
                validates: var_validation_msg
            };

            return `
<section data-part-name="${partName}" >
      <script type="application/json" class="component-validate">
           ${JSON.stringify(componentValidate)}
      </script>
</section>

        `;
        }

        return `
<section data-part-name="${partName}"></section>
        `;
    }

    componentFn_render_from(partName) {

        const data = this.getPartProps(partName)

        if (data != null){
            const prop_isAbsolute      =   data.hasOwnProperty("prop_isAbsolute")       ?  data.prop_isAbsolute      :  false;

            if (prop_isAbsolute){
                new window.ComponentPositionElement(
                    `component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}` ,
                    {
                        classList : ["d-none"] ,
                        prop_positionTop : "0" ,
                        prop_width : "100%" ,
                        prop_height : "200px" ,
                    }
                )
            }
        }
    }


    /* ---------------------------------------------
      FUNCTIONs
     --------------------------------------------- */

    fn_getFormRulesElement(){
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_isAbsolute") && data.prop_isAbsolute ) {
            return document.querySelector(`#component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}`);
        }
        return null;
    }
    fn_setStatusVisibleFormRulesElement(status=true){
        const el = this.fn_getFormRulesElement();

        if (el != null){
            if (status){
                this.fn_getFormRulesElement().classList.remove("d-none");
            }
            else{
                this.fn_getFormRulesElement().classList.add("d-none");
            }
        }
    }


    fn_getInputElementReferenceId(){
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_reference") ) {
            return data.prop_reference
        }
        return null;
    }

    fn_getInputAndValueReference(){
          const data = this._COMPONENT_CONFIG;
        if(data.hasOwnProperty("prop_referenceComponent") && data.prop_referenceComponent != null){
            const compoonent = data.prop_referenceComponent;
            const value = compoonent?.get("prop_value" , null)
            return [compoonent , value]
        }
        else if (data.hasOwnProperty("prop_reference") ) {
            const inputEl = document.querySelector("#" +this.fn_getInputElementReferenceId());
            let value = null;
            if (inputEl != null ) {
                value = inputEl.value;
            }
            return [inputEl , value];
        }
        return [null , null];
    }


    fn_connectToInputReference_handle(refId){
        const inputId = this.fn_getInputElementReferenceId();

        if (refId === inputId) {
            const [inputEl , value] = this.fn_getInputAndValueReference();
            if (inputEl != null){
                inputEl.removeEventListener("input", this.fn_connectToInputReference_onHandleInput.bind(this));
                inputEl.removeEventListener("blur", this.fn_connectToInputReference_onFormatValue.bind(this));
                inputEl.removeEventListener("focus", this.fn_connectToInputReference_onUnFormatValue.bind(this));

                inputEl.addEventListener("input", this.fn_connectToInputReference_onHandleInput.bind(this));
                inputEl.addEventListener("blur", this.fn_connectToInputReference_onFormatValue.bind(this));
                inputEl.addEventListener("focus", this.fn_connectToInputReference_onUnFormatValue.bind(this));
            }
        }
    }


    fn_connectToInputReference(){

        const inputId = this.fn_getInputElementReferenceId();
        document.addEventListener("input" , this.fn_connectToInputReference_handle.bind(this, inputId));
        document.addEventListener("blur"  , this.fn_connectToInputReference_handle.bind(this, inputId));
        document.addEventListener("focus" , this.fn_connectToInputReference_handle.bind(this, inputId));

        this.fn_connectToInputReference_handle(inputId);

        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_listRules") && typeof data.prop_listRules != null){
            this.fn_readyListRules(data.prop_listRules)
        }
    }


    fn_connectToInputReference_onHandleInput(event){
        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_listRules") && typeof data.prop_listRules != null){
            this.fn_readyListRules(data.prop_listRules)
        }
    }


    fn_connectToInputReference_onFormatValue(event){
        this.fn_setStatusVisibleFormRulesElement(false);

        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_listRules") && typeof data.prop_listRules != null){
            this.fn_readyListRules(data.prop_listRules)
        }
    }


    fn_connectToInputReference_onUnFormatValue(event){
        this.fn_setStatusVisibleFormRulesElement(true);

        const data = this._COMPONENT_CONFIG;
        if (data.hasOwnProperty("prop_listRules") && typeof data.prop_listRules != null){
            this.fn_readyListRules(data.prop_listRules)
        }
    }


    fn_readyListRules(prop_listRules) {
        const data = this._COMPONENT_CONFIG;
        const prop_size           =   data.hasOwnProperty("prop_size")            ?  data.prop_size           :  null;
        const prop_msgRules       =   data.hasOwnProperty("prop_msgRules")        ?  data.prop_msgRules       :  null;
        const directionRtl        =   data.hasOwnProperty("directionRtl")         ? data.directionRtl         : (component_props != null && component_props.hasOwnProperty("directionRtl") ? component_props.directionRtl : false)

        const [inputEl , value] = this.fn_getInputAndValueReference();

        let [messages=[] , messagesForm=[] , rulesHtml="" , isInputCurrect=true] = tools_validtor.validtor_checkList(value , prop_listRules , prop_msgRules , directionRtl , prop_size);

        this.set("var_htmlRules", rulesHtml);
        this.set("var_validation_msg", messagesForm);

        inputEl?.classList.remove("border-danger", "border-success");
        inputEl?.classList.add(isInputCurrect ? "border-success" : "border-danger");
    }


}


tools_validtor = {

    validtor_checkList(input , listRules , prop_msgRules=null , directionRtl=true , prop_size=tools_css.standardSizes.m.name) {
        let messages = [];
        let messagesForm = [];
        let rulesHtml = "";
        let isInputCurrect = true;

        console.log(input)

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
                    case "_is_number" :
                        [isTrue , description] = tools_validtor.validtor_checkInputIsNumber(input, params , description)
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
                    case "_is_fa" :
                        [isTrue , description] = tools_validtor.validtor_checkInputFa(input, params , description)
                        break;
                    case "_is_en" :
                        [isTrue , description] = tools_validtor.validtor_checkInputEn(input, params , description)
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
                    <div style="display: block;font-size: ${elfontSize}; color: ${isTrue ? iconColorSuccess : iconColorError} ;direction: ${directionRtl ? "rtl" : "ltr"}" 
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

    validtor_checkInputIsNumber(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        const isValid = /^\d+$/.test(String(input).trim());
        return [isValid , tools_public.replaceInTextWithPatternParams(description , params)];
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
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        let min = 4;
        let max = null;
        if (params != null && params.hasOwnProperty("min")) min = params.min;
        if (params != null && params.hasOwnProperty("max")) max = params.max;
        const len = String(input).trim().length;
        const isValid = len >= min && (max == null || len <= max);
        return [isValid , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputNum(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        let min = 1;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        const str = String(input);
        const digitChars = str.split('').filter(char => /\d/.test(char));
        return [digitChars.length >= min , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputText(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        let min = 8;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        return [String(input).length >= min , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputForbidden(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        let validPattern = /^[a-zA-Z0-9]*$/;
        if (params != null && params.hasOwnProperty("chars")){
            const escapedParams = params.chars.map(c => '\\' + c).join('');
            validPattern = new RegExp(`^[a-zA-Z0-9${escapedParams}]*$`);
        }
        return [validPattern.test(String(input)) , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkExistChartUpper(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        let min = 1;
        if (params != null && params.hasOwnProperty("min")){
            min = params.min
        }
        const regex = new RegExp(`(?:.*[A-Z]){${min},}`);
        return [regex.test(String(input)) , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputFa(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        const str = String(input).trim();
        const isValid = /^[\u0600-\u06FF\s]+$/.test(str);
        return [isValid , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

    validtor_checkInputEn(input , params , description) {
        if (input == null || input === '') return [false , tools_public.replaceInTextWithPatternParams(description , params)];
        const str = String(input).trim();
        const isValid = /^[a-zA-Z\s]+$/.test(str);
        return [isValid , tools_public.replaceInTextWithPatternParams(description , params)];
    } ,

}