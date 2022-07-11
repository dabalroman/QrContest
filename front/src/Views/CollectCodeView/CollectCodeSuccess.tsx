import { CircleCheck } from 'tabler-icons-react';
import React from 'react';
import { createStyles, MantineTheme } from '@mantine/core';
import { ColorfulIconClass } from '../Style';
import CollectedCodeModel from '../../Model/CollectedCodeModel';

export type CollectCodeSuccessProps = { code: string | null, collectedCodeModel: CollectedCodeModel | null };

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeSuccess (props: CollectCodeSuccessProps) {
    const { classes } = useStyles();

    return (
        <>
            <h2>Success!</h2>
            <CircleCheck className={classes.iconGreen} size={100}/>
            <code>{props.code}</code>
            <span>{props.collectedCodeModel?.codeName}</span>
            <h2>+{props.collectedCodeModel?.score} pkt.</h2>
            <span>Code was added to your account.</span>
        </>
    );
}
