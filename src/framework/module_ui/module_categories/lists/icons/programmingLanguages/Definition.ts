import * as UiIcons from "@/ui_icons";
import {TCategoryIconDefinition} from "../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality} from "../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon} from "../../../basic/methods";
import {Keys} from "../../../languages";

export const JavaScript: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingJavaScript);
export const TypeScript: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingTypeScript);
export const Python: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingPython);
export const Java: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingJava);
export const CSharp: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingCSharp);
export const Php: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingPhp);
export const Go: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingGo);
export const Rust: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingRust);
export const Cpp: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingCpp);
export const Ruby: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ProgrammingRuby);

export const Definition: TCategoryIconDefinition = {
    id: "ProgrammingLanguages",
    name: Keys.category.icons.programmingLanguages.name,
    description: Keys.category.icons.programmingLanguages.description,
    icons: [JavaScript, TypeScript, Python, Java, CSharp, Php, Go, Rust, Cpp, Ruby],
};
