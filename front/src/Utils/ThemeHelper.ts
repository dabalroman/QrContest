import { MantineTheme } from '@mantine/core';

abstract class ThemeHelper {
    public static getTextColor (
        theme: MantineTheme,
        darkColor: string = theme.colors.gray[0],
        brightColor: string = theme.colors.dark[7]
    ) {
        return theme.colorScheme === 'dark' ? darkColor : brightColor;
    }

    public static getBackgroundColor (
        theme: MantineTheme,
        darkTheme: string = theme.colors.dark[6],
        brightTheme: string = theme.colors.gray[0]
    ) {
        return theme.colorScheme === 'dark' ? darkTheme : brightTheme;
    }

    public static getBackgroundImage (
        theme: MantineTheme,
        style: number = -1
    ) {
        if (style === -1) {
            // eslint-disable-next-line no-param-reassign
            style = ((new Date()).getUTCDate() % 4) + 1;
        }

        return `url(bg_${theme.colorScheme}_${style}.png)`;
    }

    public static classes (...classnames: (string | undefined | null)[]): string {
        return classnames.join(' ');
    }
}

export default ThemeHelper;
