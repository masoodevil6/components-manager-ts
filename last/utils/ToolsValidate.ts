import {ToolsTemplate} from "./ToolsTemplate";
import {ToolsIcons} from "../tools/icons";
import {Color, COLORS_GRAD, COLORS_MAIN, SIZES, SizesType} from "./ToolsConsts";
import {ToolsCss} from "./ToolsCss";

export type ValidatorRuleName =
    | "_is_email"
    | "_not_empty"
    | "_char_length"
    | "_num_length"
    | "_text_length"
    | "_text_forbidden"
    | "_text_char_upper";

export interface ValidatorParams {
    min?: number;
    chars?: string[];
    [key: string]: unknown;
}

export interface ValidatorRule {
    rule: ValidatorRuleName;
    description: string;
    params?: ValidatorParams;
}

export type ValidatorResult = [boolean, string];

export type ValidatorCheckListResult = [
    string[],
    string[],
    string,
    boolean
];

export class ToolsValidator {

    static checkList(
        input: string,
        listRules: ValidatorRule[],
        prop_msgRules: string | null = null,
        directionRtl = true,
        prop_size: SizesType = SIZES.M
    ): ValidatorCheckListResult {

        const messages: string[] = [];
        const messagesForm: string[] = [];

        let rulesHtml = "";
        let isInputCurrect = true;

        const elIconHeight = ToolsCss.getIconSize(prop_size);
        const elFontSize = ToolsCss.getFontSize(prop_size);

        for (let i = 0; i < listRules.length; i++) {

            const itemRule = listRules[i];

            let description = itemRule.description;
            const params = itemRule.params;

            let result: ValidatorResult = [false, description];

            switch (itemRule.rule) {

                case "_is_email":
                    result = this.validator_checkIsEmail(input, params, description);
                    break;

                case "_not_empty":
                    result = this.validator_checkNotEmpty(input, params, description);
                    break;

                case "_char_length":
                    result = this.validator_checkInputChar(input, params, description);
                    break;

                case "_num_length":
                    result = this.validator_checkInputNum(input, params, description);
                    break;

                case "_text_length":
                    result = this.validator_checkInputText(input, params, description);
                    break;

                case "_text_forbidden":
                    result = this.validator_checkInputForbidden(input, params, description);
                    break;

                case "_text_char_upper":
                    result = this.validator_checkExistChartUpper(input, params, description);
                    break;
            }

            const [isTrue, message] = result;

            description = message;

            if (!isTrue) {

                isInputCurrect = false;

                messages.push(description);

                if (prop_msgRules != null && messagesForm.length !== 0)
                    messagesForm.push(prop_msgRules);
                else if (prop_msgRules == null)
                    messagesForm.push(description);
            }

            const txtColor = isTrue
                ? Color(COLORS_MAIN.SUCCESS , COLORS_GRAD.GRADE_1 )
                : Color(COLORS_MAIN.ERROR , COLORS_GRAD.GRADE_1 );

            const icon = isTrue
                ? ToolsIcons.icon_is_true({size: elIconHeight , primaryColor: txtColor})
                : ToolsIcons.icon_is_false({size: elIconHeight , primaryColor: txtColor});

            rulesHtml += `
                <div
                    style="
                        display:flow-root;
                        font-size:${elFontSize}px;
                        color:${txtColor};
                        direction:${directionRtl ? "rtl" : "ltr"};
                    "
                    class="item_country_code pt-1 ${i < listRules.length - 1 ? "border-bottom" : ""} mx-1 line-height-30px">

                    <span class="icon-rule ms-1">${icon}</span>
                    <span class="ms-3">- ${description}</span>

                </div>
            `;
        }

        return [
            messages,
            messagesForm,
            rulesHtml,
            isInputCurrect
        ];
    }

    static validator_checkIsEmail(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return [
            emailRegex.test(input.trim()),
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }

    static validator_checkNotEmpty(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        return [
            input.trim().length > 0,
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }

    static validator_checkInputChar(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        const min = params.min ?? 4;

        const count =
            input.split("").filter(c => !/\d/.test(c)).length;

        return [
            count >= min,
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }

    static validator_checkInputNum(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        const min = params.min ?? 1;

        const count =
            input.split("").filter(c => /\d/.test(c)).length;

        return [
            count >= min,
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }

    static validator_checkInputText(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        const min = params.min ?? 8;

        return [
            input.length >= min,
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }

    static validator_checkInputForbidden(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        let regex = /^[a-zA-Z0-9]*$/;

        if (params.chars) {

            const escaped = params.chars
                .map(c => "\\" + c)
                .join("");

            regex = new RegExp(
                `^[a-zA-Z0-9${escaped}]*$`
            );
        }

        return [
            regex.test(input),
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }

    static validator_checkExistChartUpper(
        input: string,
        params: ValidatorParams = {},
        description: string
    ): ValidatorResult {

        const min = params.min ?? 1;

        const regex = new RegExp(`(?:.*[A-Z]){${min},}`);

        return [
            regex.test(input),
            ToolsTemplate.replaceInTextWithPatternParams(description, params)
        ];
    }
}