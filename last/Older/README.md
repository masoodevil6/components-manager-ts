***created components with js pure:***


**List Of Components:**
```
 var listComponent = {

        // [01] text
        ComponentMessages:                   "component-messages" ,                       //01-01
        ComponentIsEmpty:                    "component-is-empty" ,                       //01-02
        ComponentHeader:                     "component-header" ,                         //01-03
        ComponentLabel:                      "component-label" ,                          //01-04
        ComponentDescription:                "component-description" ,                    //01-05
        ComponentLink:                       "component-link" ,                           //01-06
        ComponentInfo:                       "component-info" ,                           //01-07
        ComponentCard:                       "component-card" ,                           //01-08

        // [02] Fetch
        ComponentLoading:                    "component-loading" ,                        //02-01
        Component404:                        "component-404" ,                            //02-02
        ComponentForm:                       "component-form" ,                           //02-03
        ComponentWidget:                     "component-widget" ,                         //02-04
        ComponentIframe:                     "component-iframe" ,                         //02-05


        // [03] Button and Inputs
        ComponentButton:                     "component-button" ,                         //03-01
        ComponentOtp:                        "component-otp" ,                            //03-02
        ComponentInput:                      "component-input" ,                          //03-03
        ComponentInputPrice:                 "component-input-price" ,                    //03-04
        ComponentInputPassword:              "component-input-password" ,                 //03-05
        ComponentInputEmail:                 "component-input-email" ,                    //03-06
        ComponentInputFile:                  "component-input-file" ,                     //03-07
        ComponentDate:                       "component-date" ,                           //03-08
        ComponentSelectOption:               "component-select-option" ,                  //03-09
        ComponentCheckBox:                   "component-check-box" ,                      //03-010
        ComponentValidate:                   "component-validate" ,                       //03-011
        

        // [04] tooltips
        ComponentTooltipDescription:         "component-tooltip-description" ,            //04-01


        // [10] Tables
        ComponentTable:                      "component-table" ,                          //10-01

        // [11] Tabs
        ComponentTabs:                       "component-tabs" ,                           //11-01
        ComponentTree:                       "component-tree" ,                           //11-02

        // [12] Collapse
        ComponentCollapse:                   "component-collapse" ,                       //12-01

        // [13] Window
        ComponentWindow:                     "component-window" ,                         //13-01
        ComponentWindowConfirm:              "component-window-confirm" ,                 //13-02

        // [14] Slider Shows
        ComponentSliderShowOverlapping:      "component-slider-show-overlapping" ,        //14-01

        // [15] Breadcrumb
        ComponentBreadcrumb :                "component-breadcrumb" ,                     //15-01




        // [20] Charts
        ComponentChart:                      "component-chart" ,                          //20-01
        ComponentChartTreeY:                 "component-chart-tree-y" ,                   //20-02

        // [21] QR CODE
        ComponentQrCode:                     "component-qr-code" ,                        //21-01
        ComponentCameraQrCodeReader:         "component-camera-qr-code-reader" ,          //21-02
        ComponentUploadQrCodeReader:         "component-upload-qr-code-reader" ,          //21-03
        ComponentQrCodeReader:               "component-qr-code-reader" ,                 //21-04



        // [99] Others
        ComponentIcon:                       "component-icon" ,                           //99-01
        ComponentPositionElement:            "component-position-element" ,               //99-02
        ComponentBorder:                     "component-border" ,                         //99-03
        ComponentImage:                      "component-image" ,                          //99-04
        ComponentLayout:                     "component-layout" ,                         //99-05
        ComponentMouseScroller:              "component-mouse-scroller" ,                 //99-06

    }
```




/* ====================
[01] TEXT
============================================= */

**01-01) Component Message:**
```
/*-------------------------------------
 01-01) Component Messages
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_type                            // success[default] | error | warning | null
@prop_background
@prop_color
@prop_messages
-------------------------------------*/
    new window.ComponentMessages(
        "element_id" ,
        {

        }
    )
```


**01-02) Component Is Empty:**
```
/*-------------------------------------
 01-02) Component Is Empty
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_icon
@prop_iconClass
@prop_iconStyles

@prop_title

@prop_btnAddStatus
@prop_btnAddIcon
@prop_btnAddTitle
@prop_btnAddClass

@fn_callback
-------------------------------------*/
    new window.ComponentIsEmpty(
        "element_id" ,
        {

        }
    )
```


**01-03) Component Header:**
```
/*-------------------------------------
 01-03) Component Header
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_classList

@prop_icon

@prop_size
@prop_title
-------------------------------------*/
    new window.ComponentHeader(
        "element_id" ,
        {

        }
    )
```


**01-04) Component Label:**
```
/*-------------------------------------
 01-04) Component label
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_labelClass
@prop_labelStyles
@prop_labelBackgroundColor

@prop_title
@prop_for
@prop_labelColor

@prop_tooltipIcon
@prop_tooltipDescription

@fn_callback
-------------------------------------*/
    new window.ComponentLabel(
        "element_id" ,
        {
            
        }
    )
```


**01-05) Component Link:**
```
/*-------------------------------------
 01-05) Component link
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_borderClass
@prop_borderStyles
@prop_borderHoverStyles

@prop_linkHref

@prop_imageSource
@prop_imageTitle
@prop_imageAlt
@prop_imageClass
@prop_imageStyles

@prop_iconSource
@prop_iconIsItalik
@prop_iconClass
@prop_iconStyles

@prop_title
@prop_titleClass
@prop_titleStyles
-------------------------------------*/
    new window.ComponentLink(
        "element_id" ,
        {
            
        }
    )
```


**01-06) Component Description:**
```
/*-------------------------------------
 01-06) Component Description
-------------------------------------
@prop_icon
@prop_title
@prop_description
@prop_height
@prop_button   title_more|title_less|prop_show
-------------------------------------*/
    new window.ComponentDescription(
        "element_id" ,
        {
            
        }
    )
```

**01-07) Component Info:**
```
/*-------------------------------------
 01-07) Component Info
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_icon
@prop_iconClass
@prop_iconStyles

@prop_info
@prop_infoClass
@prop_infoStyles
-------------------------------------*/
    new window.ComponentInfo(
        "element_id" ,
        {
            
        }
    )
```


**01-08) Component Card:**
```
/*-------------------------------------
 01-08) Component Card
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_cardClass
@prop_cardStyles

@prop_header
@prop_cardHeaderClassBackground
@prop_cardHeaderClassColor

@prop_body
@prop_cardBodyClassBackground
@prop_cardBodyClassColor
-------------------------------------*/
    new window.ComponentCard(
        "element_id" ,
        {
            
        }
    )
```




/* ====================
[02] FETCH
============================================ */

**02-01) Component Loading:**
```
/*-------------------------------------
 02-01) Component Loading
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_type                       // circle[default] | null
@prop_background_loading
@prop_background_shadow
-------------------------------------*/
    new window.ComponentLoading(
        "element_id" ,
        {

        }
    )
```


**02-02) Component 404:**
```
/*-------------------------------------
 02-02) Component 404
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_type            'simple_animation'
@prop_width
@prop_height

@prop_btnRetry        {prop_type: "submit"  , prop_title: "Retry" , prop_btnClass: ["w-100"]}

@fn_callback
-------------------------------------*/
    new window.Component404(
        "element_id" ,
        {

        }
    )
```


**02-03) Component Form:**
```
/*-------------------------------------
 02-03) Component Form
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_formClass
@prop_formStyles

@prop_btnSubmit    {prop_type , prop_title , prop_btnClass}

@prop_forms
@prop_url
@prop_data
-------------------------------------*/
    new window.ComponentForm(
        "element_id" ,
        {

        }
    )
```


**02-04) Component Widget:**
```
/*-------------------------------------
 13) Component Widget
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_widgetClass
@prop_widgetStyles
@prop_widgetMinHeight

@prop_btnMore_icon
@prop_btnMore_show
@prop_btnMore_link

@prop_error404   type   width   height
@prop_fetch      url    data
-------------------------------------*/
    new window.ComponentWidget(
        "element_id" ,
        {
            
        }
    )
```







/* ====================
[03] BUTTONs And INPUTs
================================ */

**03-01) Component Button:**
```
/*-------------------------------------
 03-01) Component Button
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_type   // cancel  //submit //null
@prop_title

@prop_btnClass
@prop_btnStyles
@prop_btnHoverStyles

@prop_btnBackgroundColor
@prop_btnBackgroundColor_hover
@prop_btnColor

@fn_callback
-------------------------------------*/
    new window.ComponentButton(
        "element_id" ,
        {

        }
    )
```

**03-03) Component OTP:**
```
/*-------------------------------------
 03-03) Component OTP
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_name
@prop_length
@prop_input
@prop_langs

@fn_onGetNewToken

//call_startCountdown
//call_getValue
-------------------------------------*/
    new window.ComponentOtp(
        "element_id" ,
        {
            
        }
    )
```



**03-03) Component Input:**
```
/*-------------------------------------
 03-03) Component Input
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_show_label
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles
@prop_title

@prop_inputClass
@prop_inputStyles
@prop_type
@prop_name
@prop_value
@prop_placeholder

@prop_icon

@fn_oninput
@fn_onfocus
@fn_onblur

@fn_clickBtnTools
-------------------------------------*/
    new window.ComponentInput(
        "element_id" ,
        {

        }
    )
```


**03-04) Component Input Price:**
```
/*-------------------------------------
 03-04) Component Input
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_show_label
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles
@prop_title

@prop_inputClass
@prop_inputStyles
@prop_type
@prop_name
@prop_value
@prop_placeholder
@prop_isDisable

@prop_icon

@fn_oninput
@fn_onfocus
@fn_onblur

@fn_clickBtnTools
//call_setValue
-------------------------------------*/
    new window.ComponentInputPrice(
        "element_id" ,
        {

        }
    )
```   



**03-05) Component Input Color:**
```
/*-------------------------------------
 03-05) Component Input Color
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_name
@prop_colorSelected

@prop_labelShow
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles
@prop_title

@prop_colorSelected
@prop_isDisable
@prop_borderColor
@prop_formClass
@prop_formStyles

@prop_optionHeight
@prop_optionWidth
@prop_optionStyles
@prop_positionTop
@prop_backgroundColorBody

@prop_colorBody
-------------------------------------*/
    new window.ComponentInputColor(
        "element_id" ,
        {

        }
    )
```   



**03-06) Component Input size:**
```
/*-------------------------------------
 03-06) Component Input size
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_icon

@prop_inputClass
@prop_inputStyles
@prop_name
@prop_value
@prop_value
@prop_placeholder
@prop_icon
@prop_isDisable
@prop_min
@prop_max

@prop_iconPositive
@prop_iconNegetive

@prop_isAbsoluteRule
@prop_listRules
-------------------------------------*/
    new window.ComponentInputSize(
        "element_id" ,
        {

        }
    )
```   




**03-07) Component Input Password:**
```
/*-------------------------------------
 03-07) Component Input Password
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_show_label
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles
@prop_title

@prop_inputClass
@prop_inputStyles
@prop_name
@prop_value
@prop_placeholder
@prop_isDisable

@prop_icon

@prop_hasRules
@prop_listRules
@prop_isAbsoluteRule
-------------------------------------*/
    new window.ComponentInputPassword(
        "element_id" ,
        {

        }
    )
```   



**03-08) Component Input Email:**
```
/*-------------------------------------
 03-08) Component Input email
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_show_label
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles
@prop_title

@prop_inputClass
@prop_inputStyles
@prop_name
@prop_value
@prop_placeholder
@prop_isDisable

@prop_icon

@prop_listRules
@prop_isAbsoluteRule
-------------------------------------*/
    new window.ComponentInputEmail(
        "element_id" ,
        {

        }
    )
```   



**03-09) Component Input File:**
```
/*-------------------------------------
 03-09) Component Input File
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_name
@prop_accept
@prop_maxCount
@prop_maxSize
@prop_textValidateSize
@prop_textValidateAccept
@prop_labelTooltipDescription

@prop_title
@prop_labelShow
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_borderColor
@prop_borderColorHover
@prop_borderHeight

@prop_textColor
@prop_text

@prop_showListFiles

@prop_deleteBody
@prop_deleteBtnCancel
@prop_deleteBtnAccept

-------------------------------------*/
new window.ComponentInputFile(
        "element_id" ,
        {
            
        }
    )
```



**03-010) Component Date:**
```
/*-------------------------------------
 03-010) Component Date
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_backgroundMain

@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles
@prop_title

@prop_name
@prop_value

@prop_prevYears
@prop_nextYears

@prop_backgroundRowSelected
@prop_backgroundColumnSelected
@prop_colorColumnSelected

@prop_titleBtnAccept
@prop_backgroundBtnAccept
@prop_backgroundBtnHoverAccept
@prop_colorBtnAccept

@prop_titleBtnNow
@prop_backgroundBtnNow
@prop_backgroundBtnHoverNow
@prop_colorBtnNow

@prop_titleMonth0
@prop_titleMonth1
@prop_titleMonth2
@prop_titleMonth3
@prop_titleMonth4
@prop_titleMonth5
@prop_titleMonth6
@prop_titleMonth7
@prop_titleMonth8
@prop_titleMonth9
@prop_titleMonth10
@prop_titleMonth11

@prop_titleDay0
@prop_titleDay1
@prop_titleDay2
@prop_titleDay3
@prop_titleDay4
@prop_titleDay5
@prop_titleDay6
-------------------------------------*/
    new window.ComponentDate(
        "element_id" ,
        {
            
        }
    )
```



**03-011 Component Select Option:**
```
/*-------------------------------------
 03-011) Component Select Option
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_name
@prop_itemSelected

@prop_title
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_titleClass
@prop_titleStyles

@prop_icon

@prop_options
@prop_placeholder

@prop_btnAddStatus
@prop_btnAddIcon
@prop_btnAddClass
@prop_btnAddTitle

@prop_optionHeight
@prop_optionWidth
@prop_optionStyles
@prop_positionTop
@prop_positionLeft
@prop_positionBottom
@prop_positionRight

@prop_options
@prop_optionStyles
@prop_optionWidth
@prop_optionItemNotSelectedBackground
@prop_optionItemHoverBackground
@prop_optionItemSelectedBackground

@fn_callback
@fn_clickBtnTools
-------------------------------------*/
    new window.ComponentSelectOption(
        "element_id" ,
        {
            
        }
    )
```



**03-012 Component check box:**
```
/*-------------------------------------
 03-012) Component check box
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_name
@prop_isSelected

@prop_title
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_borderColor
@prop_backgroundColor_unSelected
@prop_backgroundColor_selected
@prop_backgroundColor_disable
@prop_formClass
@prop_formStyles
@prop_isDisable

@prop_icon

@prop_isAbsoluteRule
@prop_listRules

-------------------------------------*/
    new window.ComponentCheckBox(
        "element_id" ,
        {
            
        }
    )
```



**03-013 Component Validate:**
```
/*-------------------------------------
 03-013) Component Validate
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_isAbsolute
@prop_reference
@prop_listRules
@prop_title

-------------------------------------*/
    new window.ComponentValidate(
        "element_id" ,
        {
            
        }
    )
```








/* ====================
[04] tooltips
============================================= */

**04-01) Component Tooltips Description:**
```
/*-------------------------------------
 04-01) Component tooltips description
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_icon
@prop_iconClass
@prop_iconStyles

@prop_descriptionBackground
@prop_descriptionColor
@prop_description
@prop_descriptionWidth
-------------------------------------*/
new window.ComponentTooltipDescription(
        "element_id" ,
        {
            
        }
    )
```






/* ====================
[10] Tables
============================================= */

**10-01) Component Table:**
```
/*-------------------------------------
 04-02) Component Table
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_tableClass
@prop_tableStyles
@prop_tableType                      // 1) table-dark  |  2) table-primary  | 3) table-secondary  | 4) table-success  | 5) table-danger  | 6) table-warning  | 7) table-info  | 8) table-light  | 0(default)
@prop_tableBordered                  // 1) border-dark |  2) border-primary | 3) border-secondary | 4) border-success | 5) border-danger | 6) border-warning | 7) border-info | 8) border-light | 0(default)
@prop_tableStriped
@prop_tableHover
@prop_tableBorderless

@prop_tableHeadClass
@prop_tableHeadStyles
@prop_tableItemHeadClass
@prop_tableItemHeadStyles

@prop_order
@prop_data
@prop_header

@prop_tableBodyClass
@prop_tableBodyStyles
@prop_tableItemBodyClass
@prop_tableItemBodyStyles
@prop_tableItemBodyHoverStyles

@prop_valueType
@prop_valueRow_backgroundColor
@prop_valueCol_backgroundColor
@prop_valueCol_textColor

@prop_valueRow
@prop_valueCol
-------------------------------------*/
    new window.ComponentTable(
        "element_id" ,
        {

        }
    )
```



/* ====================
[11] Tabs
============================================== */

**11-01) Component Tab:**
```
/*-------------------------------------
 11-01) Component Tabs
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_type           0 | 1
@prop_tabs           {id  name  icon}
@prop_tabSelected

@prop_firstCallBack

@fn_callback
-------------------------------------*/
    new window.ComponentTabs(
        "element_id" ,
        {

        }
    )
```

**11-02) Component tree:**
```
/*-------------------------------------
 11-02) Component Tabs
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_backgroundColor_unSelected
@prop_backgroundColor_selected
@prop_list
@prop_itemSelected

-------------------------------------*/
    new window.ComponentTree(
        "element_id" ,
        {

        }
    )
```



/* ====================
[12] Collapse
========================================== */

**12-01) Component Collapse:**
```
/*-------------------------------------
 04-01) Component Collapse
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title

@prop_bodyBackgroundColor
@prop_body
@prop_bodyShow
-------------------------------------*/
    new window.ComponentCollapse(
        "element_id" ,
        {

        }
    )
```



/* ====================
[13] Window
==================================== */

**13-01) Component Window:**
```
/*-------------------------------------
 13-01) Component Window
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_blurBackgroundColor

@prop_windowBackgroundColor
@prop_windowWidth
@prop_windowHeight
@prop_windowRound

@prop_header   [or component-header]

@prop_body     [or component-body]

@prop_footer   [or component-footer]

// call_close
// call_open
// call_resize
// call_minimize
-------------------------------------*/
    new window.ComponentWindow(
        "element_id" ,
        {

        }
    )
```



**13-02) Component Window Confirm:**
```
/*-------------------------------------
 13-02) Component Window Confirm
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_header   [or component-header]

@prop_body     [or component-body]

@prop_titleBtnCancel
@prop_titleBtnAccept

@fn_callback
// call_close
// call_open
// call_resize
// call_minimize
-------------------------------------*/
    new window.ComponentWindow(
        "element_id" ,
        {

        }
    )
```




/* ====================
[14] Slider Shows
==================================== */

**14-01) Component Window Confirm:**
```
/*-------------------------------------
 14-01) Slider Show Overlapping
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title
@prop_labelShow
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_borderClass
@prop_borderStyles

@prop_imageDuration
@prop_imageSelected
@prop_images
-------------------------------------*/
    new window.ComponentSliderShowOverlapping(
        "element_id" ,
        {

        }
    )
```






/* ====================
[20] Charts
==================================== */

**20-01) Component Chart:**
```
/*-------------------------------------
 20-01) Component Chart
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_type
@prop_TypeDirection

@prop_title_text
@prop_title_align

@prop_description_text
@prop_description_align

@prop_y_title_text
@prop_y_title_align

@prop_x_title_text
@prop_x_title_align

@prop_categories
@prop_series

@prop_tooltip_header
@prop_tooltip_format
-------------------------------------*/
    new window.ComponentChart(
        "element_id" ,
        {
            
        }
    )
```



**20-02) Component Chart Tree Y:**
```
/*-------------------------------------
 20-02) Component Chart Tree Y
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_formScrollerHeight

@prop_svgWGap
@prop_svgHGap

@prop_objects
@prop_objectsLevelClose

@prop_template
@prop_templateWidth
@prop_templateHeight
@prop_templateHeightPoint
@prop_templateHeightGap

@prop_lineHeightMin
@prop_lineWidth
@prop_lineDurationAnim
@prop_lineColor
@prop_lineMarkerStart
@prop_lineMarkerEnd
-------------------------------------*/
    new window.ComponentChartTreeY(
        "element_id" ,
        {
            
        }
    )
```





/* ====================
[21] QR CODE
==================================== */

**21-01) Component Qr Code:**
```
/*-------------------------------------
 21-01) Component Qr Code
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_formClass
@prop_formStyles

@prop_value
@prop_size
@prop_version
-------------------------------------*/
    new window.ComponentQrCode(
        "element_id" ,
        {
            
        }
    )
**21-01) Component Qr Code:**
```


**21-02) Component Camera Qr Code Reader:**
```
/*-------------------------------------
 21-02) Component Camera Qr Code Reader
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title
@prop_labelShow
@prop_labelTooltipDescription
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_formMinHight

@prop_fps
@prop_qrbox

@prop_titleErrorExistCamera

@prop_titleErrorPermisionCamera
@prop_titleBtnRetry

@prop_name
@prop_showInput

@fn_callback
-------------------------------------*/
    new window.ComponentCameraQrCodeReader(
        "element_id" ,
        {
            
        }
    )
```


**21-03) Component Upload Qr Code Reader:**
```
/*-------------------------------------
 21-03)  Component Upload Qr Code Reader
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title
@prop_labelShow
@prop_labelTooltipDescription
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_formHight

@prop_name
@prop_showInput

@fn_callback
-------------------------------------*/
    new window.ComponentUploadQrCodeReader(
        "element_id" ,
        {
            
        }
    )
```

**21-04) Component Qr Code Reader:**
```
/*-------------------------------------
 21-04)  Component Qr Code Reader
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_title
@prop_labelShow
@prop_labelTooltipDescription
@prop_labelClass
@prop_labelStyles
@prop_labelHoverStyles

@prop_placeholder

@prop_formHight

@prop_name
@prop_showInput

@fn_callback
-------------------------------------*/
    new window.ComponentQrCodeReader(
        "element_id" ,
        {
            
        }
    )
```







/* ====================
[99] OTHERs
=========================================== */

**99-01) Component Icon:**
```
/*-------------------------------------
 99-01) Component Icon
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_icon
@prop_isItalik

@prop_iconClass
@prop_iconStyles

@fn_callback
@fn_onHoverIcon
@fn_onBlurIcon
-------------------------------------*/
    new window.ComponentIcon(
        "element_id" ,
        {
            
        }
    )
```


**99-02) Component Position Element:**
```
/*-------------------------------------
 99-02) Component Position Element
-------------------------------------
@prop_elementClass
@prop_elementStyles
@prop_content || component-body

@prop_positionTop
@prop_positionLeft
@prop_positionBottom
@prop_positionRight

@prop_width
@prop_height
-------------------------------------*/
    new window.ComponentPositionElement(
        "element_id" ,
        {
            
        }
    )
```


**99-03) Component Border:**
```
/*-------------------------------------
 99-03) Component border
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_borderClass
@prop_borderStyles
@prop_content

@prop_btnMore_icon
@prop_btnMore_show
@prop_btnMore_link

@fn_callback
-------------------------------------*/
    new window.ComponentBorder(
        "element_id" ,
        {
            
        }
    )
```


**99-04) Component Image:**
```
/*-------------------------------------
 99-04) Component image
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_imageSource
@prop_imageTitle
@prop_imageAlt
@prop_imageClass
@prop_imageStyles

@fn_callback
-------------------------------------*/
    new window.ComponentImage(
        "element_id" ,
        {
            
        }
    )
```

**99-05) Component Mouse Scroller:**
```
/*-------------------------------------
 99-04) Component Mouse Scroller
-------------------------------------
@prop_show
@prop_structureClass
@prop_structureStyles

@prop_borderClass
@prop_borderStyles

@prop_backgroundColor_type
@prop_backgroundColor_dark
@prop_backgroundColor_light
@prop_scollerClass
@prop_scrollerStyles
@prop_scrollerWidth
@prop_scrollerHeight
@prop_positionXDefault
@prop_positionYDefault

@prop_backgroundColor_tools
@prop_moreIcons
@prop_iconRefresh
@prop_iconZoomIn
@prop_iconZoomOut
@prop_iconBgDark
@prop_iconBgLight
@prop_layoutContent
-------------------------------------*/
    new window.ComponentMouseScroller(
        "element_id" ,
        {
            
        }
    )
```






