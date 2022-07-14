import { CircleCheck } from 'tabler-icons-react';
import React from 'react';
import { createStyles, MantineTheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ColorfulIconClass } from '../Style';
import CollectedCodeModel from '../../Model/CollectedCodeModel';

export type CollectCodeSuccessProps = { code: string | null, collectedCodeModel: CollectedCodeModel | null };

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeSuccess (props: CollectCodeSuccessProps) {
    const { t } = useTranslation('CollectCodeSuccess');
    const { classes } = useStyles();

    return (
        <>
            <h1>{t('Success!')}</h1>
            <span>{props.collectedCodeModel?.codeName}</span>
            <CircleCheck className={classes.iconGreen} size={150}/>
            <code>{props.code}</code>
            <h1>+{props.collectedCodeModel?.score} pkt</h1>
            <span>{t('Code was added to your account')}</span>
        </>
    );
}
