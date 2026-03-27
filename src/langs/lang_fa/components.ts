export const components = {

    messages: {
        ////-------------------
        prop_type: {
            title:             "نوع پیام" ,
            description:       "چه نوع پیامی نمایش دهد: success / error /..." ,
        } ,
        prop_messages: {
            title:             "لیست متن پیام ها" ,
            description:       "یک لیست برای دریافت پیام ها" ,
        } ,
        prop_colorIcon: {
            title:             "رنگ ایکون بستن پیام" ,
            description:       "به صورت پیش فرض هم رنگ نوع پیام می باشد." ,
        } ,
        prop_colorBorder: {
            title:             "رنگ بردر پیام" ,
            description:       "رنگ بدر پیام رو مشخص می کنید." ,
        } ,
        prop_msgBackgroundColor: {
            title:             "رنگ بدنه پیام" ,
            description:       "رنگ بدنه پیام رو مشخص می کنید." ,
        } ,
        prop_msgColor: {
            title:             "رنگ متن پیام" ,
            description:       "رنگ متن پیام رو مشخص می کنید." ,
        } ,
        ////-------------------
        fn_onCloseMessage: {
            title:             "متد بسته شدن پیام" ,
            description:       "متد برای زمانی که پیامی بسته می شود." ,
            componentArgs: {} ,
            dataArgs:{}
        } ,
        ////-------------------
        template_body: {
            title:             "تمپلیت لیست پیام ها" ,
            description:       "با این تمپلیت لیست پیام ها را وارد می کنید." ,
        } ,
    } ,

    button: {
        ////-------------------
        prop_title: {
            title:             "متن دکمه" ,
            description:       "متن دکمه را مشخص مینمایید" ,
        } ,
        prop_type: {
            title:             "نوع دکمه" ,
            description:       "چه نوع دکمه ای نمایش دهد: cancel / submit /..." ,
        } ,
        prop_btnType: {
            title:             "نوع اکشن دکمه" ,
            description:       "دکمه چه نوع اکشنی  داشته باشد: button / submit /..." ,
        } ,
        prop_btnClass: {
            title:             "لیست کلاس های دکمه" ,
            description:       "لیست کلاس های دکمه را مشخص می نمایید" ,
        } ,
        prop_btnStyles: {
            title:             "ابجکت استایل های دکمه" ,
            description:       "ابجکت استایل های دکمه را مشخص می نمایید" ,
        } ,
        prop_btnBackgroundColor: {
            title:             "رنگ دکمه دکمه" ,
            description:       "رنگ دکمه در صورتی که prop_type=custom باشد" ,
        } ,
        prop_btnBackgroundColor_hover: {
            title:             "رنگ هاور دکمه دکمه" ,
            description:       "رنگ هاور دکمه در صورتی که prop_type=custom باشد" ,
        } ,
        prop_btnColor: {
            title:             "رنگ متن دکمه دکمه" ,
            description:       "رنگ متن دکمه در صورتی که prop_type=custom باشد" ,
        } ,
        ////-------------------
        fn_onClickButton: {
            title:             "متد کلیک دکمه" ,
            description:       "زمانی که روی دکمه کلیک می شود" ,
            componentArgs: {} ,
            dataArgs:{}
        } ,
        ////-------------------
        template_body: {
            title:             "تمپلیت متن دکمه" ,
            description:       "با این تمپلیت متن دکمه را وارد می کنید." ,
        } ,

    } ,

    recyclerView: {
        ////-------------------
        prop_formClass: {
            title:             "لیست کلاس های recyclerView" ,
            description:       "لیست کلاس های recyclerView را مشخص می نمایید" ,
        } ,
        prop_formStyles: {
            title:             "ابجکت استایل های recyclerView" ,
            description:       "ابجکت استایل های recyclerView را مشخص می نمایید" ,
        } ,
        prop_formComponents: {
            title:             "لیست کامپوننت ها" ,
            description:       "لیست کامپوننت های خود را وارد نمایید" ,
        } ,
        prop_formDirection: {
            title:             "جهت رندر کامپوننت ها" ,
            description:       "کامپوننت ها در چه جهتری رندر شوند: vertical_reverse / vertical /..." ,
        } ,
    } ,

    icon: {
        ////-------------------
        prop_icon: {
            title:                      "سورس ایکون" ,
            description:                "چه ایکونی نمایش داده شود." ,
        }  ,
        prop_title: {
            title:                      "عنوان ایکون" ,
            description:                "عنوان ایکون، زمانی که هاور می شود، را مشخص نمایید." ,
        }  ,
        prop_iconClass: {
            title:                      "لیست کلاس های ایکون" ,
            description:                "لیست کلاس های ایکون را مشخص می نمایید" ,
        }  ,
        prop_iconStyle: {
            title:                      "ابجکت استایل های ایکون" ,
            description:                "ابجکت استایل های ایکون را مشخص می نمایید" ,
        }  ,
        ////-------------------
        fn_onClickIcon: {
            title:                      "متد کلیک" ,
            description:                "متد، زمانی که به روی ایکون کلیک می کنید" ,
            componentArgs: {
                icon: {
                    title:             "سورس ایکون فعلی" ,
                    description:       "سورس ایکون فعلی برگردانده می شود" ,
                }
            } ,
            dataArgs:{}
        }  ,
        fn_onHover: {
            title:             "متد هاور" ,
            description:       "متد، زمانی که موس به روی ایکون قرار می گیرد" ,
            componentArgs: {} ,
            dataArgs:{}
        }  ,
        fn_onBlur: {
            title:             "متد بلور" ,
            description:       "متد، زمانی که موس از روی ایکون خارج می شود" ,
            componentArgs: {} ,
            dataArgs:{}
        }  ,

        ////-------------------
        template_body: {
            title:             "تمپلیت سورس ایکون" ,
            description:       "سورس تمپلیت، برای سورس ایکون" ,
        }  ,
    },

    border: {
        ////-------------------
        prop_content: {
            title:             "محتوا" ,
            description:       "چه محتوایی نمایش داده شود." ,
        }  ,
        prop_contentColor: {
            title:             "رنگ  متن محتوا" ,
            description:       " محتوا با چه رنگ متن نمایش داده شود." ,
        }  ,
        prop_contentBackgroundColor: {
            title:             "رنگ  بک گراند محتوا" ,
            description:       " محتوا با چه رنگ بک گراند نمایش داده شود." ,
        }  ,
        prop_borderRadius: {
            title:             "انحنای گوشه ها" ,
            description:       "انحنای گوشه ها را مشخص می نمایید" ,
        }  ,
        prop_borderWidth: {
            title:             "عرض برد" ,
            description:       "عرض برد را مشخص می نمایید" ,
        }  ,
        prop_borderClass: {
            title:             "لیست کلاس های بردر" ,
            description:       "لیست کلاس های بردر را مشخص می نمایید" ,
        }  ,
        prop_borderStyles: {
            title:             "ابجکت استایل های بردر" ,
            description:       "ابجکت استایل های بردر را مشخص می نمایید" ,
        }  ,
        prop_borderColor: {
            title:             "رنگ بردر" ,
            description:       "بردر حاشیه چه رنگی داشته باشد" ,
        }  ,
        prop_borderArrowType: {
            title:             "جهت فلش" ,
            description:       "فلش در چه جهتی باشد: top / right / ..." ,
        }  ,
        prop_borderArrowWidth: {
            title:             "سایز فلش" ,
            description:       "فلش دارای چه سایزی باشد" ,
        }  ,
        prop_borderArrowPosition: {
            title:             "موقعیت فلش" ,
            description:       "موقعیت فلش (درصد) مشخص نمایید" ,
        }  ,
        prop_minWidth: {
            title:             "حداقل سایز بردر" ,
            description:       "حداقل سایز بردر را مشخص نمایید" ,
        }  ,
        prop_optionHas: {
            title:             "وضعیت اپشن ها" ,
            description:       "آیا دارای اپشن هست؟" ,
        }  ,
        ////-------------------
        fn_onClickBorder: {
            title:             "متد کلیک" ,
            description:       "متد زمانی که روی بردر کلیک شود فراخوانی میشود" ,
            componentArgs: {} ,
            dataArgs:{}
        }  ,
        fn_onClickIconMore: {
            title:             "متد اپشن ها" ,
            description:       "متد زمانی که روی اپشن کلیک شود فراخوانی میشود" ,
            componentArgs: {} ,
            dataArgs:{}
        }  ,
        ////-------------------
        template_body: {
            title:             "تمپلیت محتوا" ,
            description:       "سورس تمپلیت، برای محتوا" ,
        }  ,
    } ,

    float_menu: {
        ////-------------------
        prop_contentSelector: {
            title:             "محتوای انتخاب گر" ,
            description:       " متوای انتخاب گر خود را وارد نمایید" ,
        }  ,
        prop_selectorClass: {
            title:             "لیست کلاس های انتخاب گر" ,
            description:       "لیست کلاس های انتخاب گر را مشخص می نمایید" ,
        }  ,
        prop_selectorStyles: {
            title:             "ابجکت استایل های نتخاب گر" ,
            description:       "ابجکت استایل های نتخاب گر را مشخص می نمایید" ,
        }  ,
        prop_selectorTypeShow: {
            title:             "متد نمایش منو شناور " ,
            description:       " با چه متدی منو شناور نمایش داده شود: hove / click / ... " ,
        }  ,
        prop_floatContent: {
            title:             "محتوای منو شناور" ,
            description:       " متوای منو شناور  خود را وارد نمایید" ,
        }  ,
        prop_floatDirection: {
            title:             " جهت نمایش منو شناور" ,
            description:       " انتخاب جهت نمایش منوی شناور: top / bottom / ..." ,
        }  ,
        prop_floatArrowWidth: {
            title:             " عرض فلش منو شناور " ,
            description:       " عرض منوی شناور را وارد نمایید " ,
        }  ,
        prop_floatBorderWidth: {
            title:             " عرض بردر منو شناور " ,
            description:       "عرض بردر منو شناور را وارد نمایید " ,
        }  ,
        prop_floatBorderRadius: {
            title:             "انحنای گوشه های منو شناور " ,
            description:       " مقدار انحنای گوشه های منو شناور را وارد نمایید " ,
        }  ,

        ////-------------------

        ////-------------------
        template_selector: {
            title:             " تمپلیت متن انتخاب گر " ,
            description:       "با این تمپلیت متن انتخاب گر را وارد می کنید." ,
        }  ,
        template_body: {
            title:             " تمپلیت متن  منو شناور " ,
            description:       "با این تمپلیت متن  منو شناور  را وارد می کنید." ,
        }  ,

    }

}