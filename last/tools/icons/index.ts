
import { IconSelectOption } from './IconSelectOption'

import { IconInputText } from './IconInputText'
import { IconInputColor } from './IconInputColor'
import { IconInputAcl } from './IconInputAcl'
import { IconSelectColumn } from './IconSelectColumn'

import { IconPinClose } from './IconPinClose'
import { IconPinOpen } from './IconPinOpen'
import { IconPinOpen2 } from './IconPinOpen2'

import { IconExclamationSquare } from './IconExclamationSquare'
import { IconMath } from './IconMath'

import { IconEmail } from './IconEmail'
import { IconEmail2 } from './IconEmail2'
import { IconPhone } from './IconPhone'

import { IconLeverage } from './IconLeverage'
import { IconLeverage2 } from './IconLeverage2'

import { IconSelectAllRight } from './IconSelectAllRight'
import { IconSelectAllLeft } from './IconSelectAllLeft'
import { IconBackRight } from './IconBackRight'
import { IconBackLeft } from './IconBackLeft'
import { IconArrowRight } from './IconArrowRight'
import { IconArrowLeft } from './IconArrowLeft'
import { IconArrowUp } from './IconArrowUp'
import { IconArrowDown } from './IconArrowDown'

import { IconPrint } from './IconPrint'
import { IconExcel } from './IconExcel'

import { IconFilter } from './IconFilter'
import { IconSearch } from './IconSearch'
import { IconClear } from './IconClear'
import { IconEdit } from './IconEdit'
import { IconDelete } from './IconDelete'
import { IconEmpty } from './IconEmpty'
import { IconClearBroom } from './IconClearBroom'

import { IconLock } from './IconLock'
import { IconPassword } from './IconPassword'
import { IconVisit } from './IconVisit'
import { IconUnVisit } from './IconUnVisit'
import { IconChangePassword } from './IconChangePassword'

import { IconNote } from './IconNote'
import { IconTag } from './IconTag'
import { IconTime } from './IconTime'
import { IconAmount } from './IconAmount'

import { IconNumber } from './IconNumber'
import { IconTitle } from './IconTitle'

import { IconType } from './IconType'
import { IconCategory } from './IconCategory'
import { IconClip } from './IconClip'
import { IconStatus } from './IconStatus'

import { IconClose } from './IconClose'
import { IconMenu } from './IconMenu'
import { IconResize } from './IconResize'
import { IconTik } from './IconTik'

import { IconIsFalse } from './IconIsFalse'
import { IconIsTrue } from './IconIsTrue'

import { IconMinusBadge } from './IconMinusBadge'
import { IconPlusBadge } from './IconPlusBadge'

import { IconCalender } from './IconCalender'

import { IconWallet } from './IconWallet'
import { IconWallet2 } from './IconWallet2'
import { IconCardNumber } from './IconCardNumber'
import { IconCurrency } from './IconCurrency'
import { IconCurrency2 } from './IconCurrency2'

import { IconWarning } from './IconWarning'

import { IconRate } from './IconRate'
import { IconReload } from './IconReload'

import { IconWalletAdd } from './IconWalletAdd'
import { IconWithdrawal } from './IconWithdrawal'
import { IconDeposit } from './IconDeposit'
import { IconTransition } from './IconTransition'

import { IconTypeCash } from './IconTypeCash'
import { IconTypeCash2 } from './IconTypeCash2'
import { IconTypeTether } from './IconTypeTether'
import { IconDirham } from './IconDirham'
import { IconTypeRial } from './IconTypeRial'

import { IconQrCode } from './IconQrCode'
import { IconApplication } from './IconApplication'

import { IconAccount } from './IconAccount'
import { IconAccountAdd } from './IconAccountAdd'
import { IconAccountReference } from './IconAccountReference'
import { IconDestination } from './IconDestination'
import { IconAccountGroupAdd } from './IconAccountGroupAdd'

import { IconMoon } from './IconMoon'
import { IconSun } from './IconSun'
import { IconZoomIn } from './IconZoomIn'
import { IconZoomOut } from './IconZoomOut'
import { IconZoomRefresh } from './IconZoomRefresh'

import { IconLoading } from './IconLoading'
import { IconLoadingDots } from './IconLoadingDots'
import { IconLoadingPulse } from './IconLoadingPulse'
import { IconLoadingBars } from './IconLoadingBars'
import { IconLoadingOrbit } from './IconLoadingOrbit'
import { IconWebCode404 } from './IconWebCode404'
import { IconWebCode500 } from './IconWebCode500'
import { IconWebCode504 } from './IconWebCode504'
import { IconWebCode401 } from './IconWebCode401'

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

     icon_pin_close :                  IconPinClose ,
     icon_pin_open :                   IconPinOpen ,
     icon_pin_open2 :                  IconPinOpen2 ,

     icon_math :                       IconMath ,
     icon_exclamation_square :         IconExclamationSquare ,

     icon_email :                      IconEmail ,
     icon_email2 :                     IconEmail2 ,
     icon_phone :                      IconPhone ,

     icon_leverage :                   IconLeverage ,
     icon_leverage2 :                  IconLeverage2 ,

     icon_selectAllRight :             IconSelectAllRight ,
     icon_selectAllLeft :              IconSelectAllLeft ,
     icon_back_right :                 IconBackRight ,
     icon_back_left :                  IconBackLeft ,
     icon_arrow_right :                IconArrowRight ,
     icon_arrow_left :                 IconArrowLeft ,
     icon_arrow_up :                   IconArrowUp ,
     icon_arrow_down :                 IconArrowDown ,

     icon_print :                      IconPrint ,
     icon_excel :                      IconExcel ,

     icon_filter :                     IconFilter ,
     icon_search :                     IconSearch ,
     icon_clear :                      IconClear ,
     icon_edit :                       IconEdit ,
     icon_delete :                     IconDelete ,
     icon_empty :                      IconEmpty ,
     icon_clear_broom :                IconClearBroom ,

     icon_lock :                       IconLock ,
     icon_password :                   IconPassword ,
     icon_visit :                      IconVisit ,
     icon_un_visit :                   IconUnVisit ,
     icon_changePassword :             IconChangePassword ,

     icon_note :                       IconNote ,
     icon_tag :                        IconTag ,
     icon_amount :                     IconAmount ,

     icon_number :                     IconNumber ,
     icon_title :                      IconTitle ,

     icon_type :                       IconType ,
     icon_category :                   IconCategory ,
     icon_clip :                       IconClip ,
     icon_status :                     IconStatus ,

     icon_close :                      IconClose ,
     icon_menu :                       IconMenu ,
     icon_resize :                     IconResize ,
     icon_tik :                        IconTik ,




     icon_wallet :                     IconWallet ,
     icon_wallet2 :                    IconWallet2 ,
     icon_cardNumber :                 IconCardNumber ,
     icon_currency :                   IconCurrency ,
     icon_currency2 :                  IconCurrency2 ,

     icon_warning :                    IconWarning ,

     icon_rate :                       IconRate ,
     icon_reload :                     IconReload ,

     icon_wallet_add :                 IconWalletAdd ,
     icon_withdrawal :                 IconWithdrawal ,
     icon_deposit :                    IconDeposit ,
     icon_transition :                 IconTransition ,

     icon_typeCash :                   IconTypeCash ,
     icon_typeCash2 :                  IconTypeCash2 ,
     icon_typeTether :                 IconTypeTether ,
     icon_typeDirham :                 IconDirham ,
     icon_typeRial :                   IconTypeRial ,

     icon_qrcode :                     IconQrCode ,
     icon_application :                IconApplication ,

     icon_account :                    IconAccount ,
     icon_account_add :                IconAccountAdd ,
     icon_account_reference :          IconAccountReference ,
     icon_account_destination :        IconDestination ,
     icon_account_group_add :          IconAccountGroupAdd ,



     icon_loading :                    IconLoading ,
     icon_loading_dots :               IconLoadingDots ,
     icon_loading_pulse :              IconLoadingPulse ,
     icon_loading_bars :               IconLoadingBars ,
     icon_loading_orbit :              IconLoadingOrbit ,

     icon_web_code_404 :               IconWebCode404 ,
     icon_web_code_500 :               IconWebCode500 ,
     icon_web_code_504 :               IconWebCode504 ,
     icon_web_code_401 :               IconWebCode401 ,


     // icon_time :                       IconTime ,
     // icon_calendar :                   IconCalender ,


     // icon_plus_badge :                 IconPlusBadge ,
     // icon_minus_badge :                IconMinusBadge ,


     // icon_moon :                       IconMoon ,
     // icon_sun :                        IconSun ,

     // icon_zoom_in :                    IconZoomIn ,
     // icon_zoom_out :                   IconZoomOut ,
     // icon_zoom_refresh :               IconZoomRefresh ,

     // icon_is_false :                   IconIsFalse ,
     // icon_is_true :                    IconIsTrue ,

}
