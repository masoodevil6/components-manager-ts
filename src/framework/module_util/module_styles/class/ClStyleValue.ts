export class ClStyleValue {

    constructor(
        public value: any,
        public important = false
    ) {}

    static important(value: any) {
        return new  ClStyleValue(value, true);
    }

}