export function classnames(cln: string[], isBool?: boolean, ...rest: string[]): string {
    const array: string[] = [...cln]
    if (isBool) {
        return [...array, ...rest].join(' ')
    }
    return array.join(' ')
}