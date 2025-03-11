

export const colorVec2Hex = (color: number[]): string => {
    return `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`;
};


export const colorHex2Vec = (color: string): number[] => {
    return color.match(/.{2}/g)!.map(c => parseInt(c, 16));
};


export enum ThemeColors {
    white = '#f0f0f0',
    black = '#333333',
    purple = '#646CFF',

    // https://tailwindcss.com/docs/colors#working-with-colors
    green400 = '#05df72',
    green500 = '#00c951',
    green600 = '#00a63e',
    green700 = '#008236',
    green800 = '#016630',
    green900 = '#0d542b',

    red400 = '#ff6467',
    red500 = '#fb2c36',
    red600 = '#e7000b',
    red700 = '#c10007',
    red800 = '#9f0712',

    blue500 = '#2b7fff',
    blue600 = '#155dfc',
    blue700 = '#1447e6',
    blue800 = '#193cb8',
    blue900 = '#1c398e',

    indigo500 = '#615fff',

    purple500 = '#ad46ff'
}