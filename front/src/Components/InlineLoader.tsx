import { createStyles, Loader, MantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import randomInt from '../Utils/randomInt';
import ThemeHelper from '../Utils/ThemeHelper';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        loader: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 40,
            textAlign: 'center',
            fontStyle: 'italic',
            color: ThemeHelper.getTextColor(theme, theme.colors.gray[5], theme.colors.dark[5])
        }
    })) as Function;

const loaderTextArray: string[] = [
    'Beep, boop, biip, boop...',
    'Please wait while the minions do their work.',
    'Feeding unicorns.',
    'Up, Up, Down, Down, Left, Right, Left, Right, B, A',
    'Ensuring Gnomes are still short.',
    'Reversing the shield polarity, please wait...',
    'Bending the spoon...',
    'Don\'t think of purple hippos!',
    '...and enjoy the elevator music...',
    'We\'re testing your patience.',
    'The bits are flowing slowly today.',
    'Are we there yet?',
    'Don\'t panic...',
    'I\'m sorry Dave, I\'m afraid I can\'t do that.',
    'I swear it\'s almost done.',
    'Dividing by zero...',
    'Proving P=NP...',
    'Winter is coming...',
    'What the what?',
    'Downloading more RAM.',
    'You may call me Steve.',
    'Patience! This is difficult, you know...',
    'Still faster than Windows update'
];

export default function InlineLoader () {
    const { classes } = useStyles();
    const { t } = useTranslation('Loader');

    const [loaderText, setLoaderText] = useState<string>(loaderTextArray[0]);

    useEffect(() => {
        setLoaderText(loaderTextArray[randomInt(loaderTextArray.length)]);
    }, []);

    return (
        <div className={classes.loader}>
            <Loader variant="dots" size="xl"/><br/>
            <span>{t(loaderText)}</span>
        </div>
    );
}
