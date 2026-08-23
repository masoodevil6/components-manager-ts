
// --------------------------------
import {ClConfigState          as ConfigState}                  from "../class/ClConfigState";
import {TConfigStateDefinition as ConfigStateDefinition}        from "../type/TConfigStateDefinition";

export class ClConfigApp {

    private static _states = new Map<
        string,
        ConfigState<any>
    >();

    public static state<T>(
        definition: ConfigStateDefinition<T>
    ): ConfigState<T> {

        let state = this._states.get(definition.name);

        if (!state) {
            state = new ConfigState<T>(
                definition.default
            );

            this._states.set(
                definition.name,
                state
            );
        }

        return state as ConfigState<T>;
    }
}