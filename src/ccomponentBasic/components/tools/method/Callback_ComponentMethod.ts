

export type Callback_ComponentMethod<TComponentArgs , TDataArgs> = (
    event:            Event ,
    dataArgs:         TDataArgs | null  ,
    componentArgs:    TComponentArgs| null ,
) => void;