
import { IconSelectOption } from './IconSelectOption'

import { IconInputText } from './IconInputText'
import { IconInputColor } from './IconInputColor'
import { IconInputAcl } from './IconInputAcl'
import { IconSelectColumn } from './IconSelectColumn'

import { IconMath } from './IconMath'

import { IconFilter } from './IconFilter'
import { IconSearch } from './IconSearch'
import { IconClear } from './IconClear'
import { IconEmpty } from './IconEmpty'
import { IconClearBroom } from './IconClearBroom'

import { IconNote } from './IconNote'
import { IconTag } from './IconTag'

import { IconNumber } from './IconNumber'
import { IconTitle } from './IconTitle'

import { IconType } from './IconType'
import { IconCategory } from './IconCategory'
import { IconClip } from './IconClip'
import { IconStatus } from './IconStatus'



import { IconRate } from './IconRate'
import { IconReload } from './IconReload'



import { IconQrCode } from './IconQrCode'
import { IconApplication } from './IconApplication'



import {Observable} from "../../core/Observable";
import {Brand} from "../../utils/ToolsConsts";



export type IconVariant = 'default' | 'small'
export type IconOptions = {
    size?:            any
    strokeWidth?:     number
    variant?:         IconVariant
    primaryColor?:    string | Observable<string>
    secondaryColor?:  string | Observable<string>
}

export type IconString = Brand<string , "icon">

export default {

     icon_selectOption :               IconSelectOption ,

     icon_inputText :                  IconInputText ,
     icon_inputColor :                 IconInputColor ,
     icon_input_acl :                  IconInputAcl ,
     icon_select_columns :             IconSelectColumn ,


     icon_math :                       IconMath ,





     icon_filter :                     IconFilter ,
     icon_search :                     IconSearch ,
     icon_clear :                      IconClear ,
     icon_empty :                      IconEmpty ,
     icon_clear_broom :                IconClearBroom ,


     icon_note :                       IconNote ,
     icon_tag :                        IconTag ,

     icon_number :                     IconNumber ,
     icon_title :                      IconTitle ,

     icon_type :                       IconType ,
     icon_category :                   IconCategory ,

     icon_clip :                       IconClip ,
     icon_status :                     IconStatus ,






     icon_rate :                       IconRate ,
     icon_reload :                     IconReload ,


     icon_qrcode :                     IconQrCode ,
     icon_application :                IconApplication ,





     // icon_account :                    IconAccount ,
     // icon_account_add :                IconAccountAdd ,
     // icon_account_reference :          IconAccountReference ,
     // icon_account_destination :        IconDestination ,
     // icon_account_group_add :          IconAccountGroupAdd ,

     // icon_email :                      IconEmail ,
     // icon_email2 :                     IconEmail2 ,

     // icon_phone :                      IconPhone ,



     // icon_loading_dots :               IconLoadingDots ,
     // icon_loading_bars :               IconLoadingBars ,



     // icon_loading :                    IconLoading ,
     // icon_loading_pulse :              IconLoadingPulse ,
     // icon_loading_orbit :              IconLoadingOrbit ,





     icon_typeCash :                   IconTypeCash ,
     // icon_typeCash2 :                  IconTypeCash2 ,
     // icon_typeTether :                 IconTypeTether ,
     // icon_typeDirham :                 IconDirham ,
     // icon_typeRial :                   IconTypeRial ,

     // icon_wallet_add :                 IconWalletAdd ,
     // icon_withdrawal :                 IconWithdrawal ,
     // icon_deposit :                    IconDeposit ,
     // icon_transition :                 IconTransition ,

     // icon_leverage :                   IconLeverage ,
     // icon_leverage2 :                  IconLeverage2 ,

     // icon_wallet :                     IconWallet ,
     // icon_wallet2 :                    IconWallet2 ,
     // icon_cardNumber :                 IconCardNumber ,



     // icon_amount :                     IconAmount ,
     // icon_currency :                   IconCurrency ,
     // icon_currency2 :                  IconCurrency2 ,


     // icon_web_code_401 :               IconWebCode401 ,
     // icon_web_code_404 :               IconWebCode404 ,
     // icon_web_code_500 :               IconWebCode500 ,
     // icon_web_code_504 :               IconWebCode504 ,


     // icon_selectAllRight :             IconSelectAllRight ,
     // icon_selectAllLeft :              IconSelectAllLeft ,
     // icon_back_right :                 IconBackRight ,
     // icon_back_left :                  IconBackLeft ,
     // icon_arrow_right :                IconArrowRight ,
     // icon_arrow_left :                 IconArrowLeft ,
     // icon_arrow_up :                   IconArrowUp ,
     // icon_arrow_down :                 IconArrowDown ,

     // icon_warning :                    IconWarning ,
     // icon_exclamation_square :         IconExclamationSquare ,


     // icon_time :                       IconTime ,
     // icon_calendar :                   IconCalender ,


     // icon_plus_badge :                 IconPlusBadge ,
     // icon_minus_badge :                IconMinusBadge ,







     // icon_zoom_in :                    IconZoomIn ,
     // icon_zoom_out :                   IconZoomOut ,
     // icon_zoom_refresh :               IconZoomRefresh ,

     // icon_print :                      IconPrint ,
     // icon_excel :                      IconExcel ,

     // icon_edit :                       IconEdit ,
     // icon_delete :                     IconDelete ,

     // icon_close :                      IconClose ,
     // icon_resize :                     IconResize ,

     // icon_menu :                       IconMenu ,


     // icon_is_false :                   IconIsFalse ,
     // icon_is_true :                    IconIsTrue ,

     // icon_visit :                      IconVisit ,
     // icon_un_visit :                   IconUnVisit ,

     // icon_moon :                       IconMoon ,
     // icon_sun :                        IconSun ,

     //icon_lock :                       IconLock ,

     // icon_pin_close :                  IconPinClose ,
     // icon_pin_open :                   IconPinOpen ,
     // icon_pin_open2 :                  IconPinOpen2 ,

}
