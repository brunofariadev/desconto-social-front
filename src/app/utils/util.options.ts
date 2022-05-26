export class UtilOptions {

    static getOptions(options): Array<{ value, text }> {
        return Object.entries(options).map(
            ([value, text]) => {
                return {
                    value: parseInt(value),
                    text: text
                }
            }
        )
    }
}