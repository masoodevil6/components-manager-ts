import * as CoreConfig from "@/core_configs";

export class ClConfigApp {

    private static _states = new Map<
        string,
        CoreConfig.Interface.IConfigState<any>
    >();

    public static state<T>(
        definition: CoreConfig.Type.TConfigStateDefinition<T>
    ): CoreConfig.Interface.IConfigState<T> {

        let state = this._states.get(definition.name);

        if (!state) {
            state = new CoreConfig.Class.ConfigState<T>(
                definition.default
            );

            this._states.set(
                definition.name,
                state
            );
        }

        return state as CoreConfig.Interface.IConfigState<T>;
    }
}