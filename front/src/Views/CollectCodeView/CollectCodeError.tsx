import { CircleX } from 'tabler-icons-react';
import React from 'react';
import { createStyles, MantineTheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ColorfulIconClass } from '../Style';

export type CollectCodeErrorProps = { code: string | null, codeCollectRequestState: number | null };

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeError (props: CollectCodeErrorProps) {
    const { t } = useTranslation('CollectCodeError');
    const { classes } = useStyles();

    const getErrorDescription = (errorCode: number | null): string => {
        switch (errorCode) {
            case 400:
                return t('Code is already collected');
            case 404:
                return t('Code does not exist');
            default:
                return t('Unexpected error. Try again.');
        }
    };

    return (
        <>
            <h1>{t('Error!')}</h1>
            <CircleX className={classes.iconRed} size={150}/>
            <code>{props.code}</code>
            <span>{getErrorDescription(props.codeCollectRequestState)}</span>
        </>
    );
}
