import { CSSObject, MantineTheme } from '@mantine/core';
import ThemeHelper from '../Utils/ThemeHelper';

// eslint-disable-next-line import/prefer-default-export
export const ClassButtonIcon: { buttonIcon: CSSObject } = {
    buttonIcon: { paddingRight: 5 }
};

export const TextAlignClass: { alignCenter: CSSObject, alignRight: CSSObject } = {
    alignRight: { textAlign: 'right' },
    alignCenter: { textAlign: 'center' }
};

export function TileClass (theme: MantineTheme): { tile: CSSObject } {
    return ({
        tile: {
            backgroundColor: ThemeHelper.getBackgroundColor(theme),
            margin: 15,
            padding: 20,
            borderRadius: 10,
            boxShadow: `3px 3px 4px ${ThemeHelper.getBackgroundColor(theme, '#000', '#FFF')}`,
            overflow: 'hidden',

            '::before': {
                content: '\'\'',
                display: 'block',
                backgroundColor: theme.colors[theme.primaryColor][8],
                height: 4,
                margin: -20,
                marginBottom: 15
            },

            '> h1': {
                fontSize: '1.5em',
                margin: 0,
                marginBottom: 5
            }
        }
    });
}
