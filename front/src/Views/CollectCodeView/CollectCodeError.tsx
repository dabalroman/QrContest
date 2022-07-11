import { CircleX } from 'tabler-icons-react';
import React from 'react';
import { createStyles, MantineTheme } from '@mantine/core';
import { ColorfulIconClass } from '../Style';

export type CollectCodeErrorProps = { code: string | null, codeCollectRequestState: number | null };

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeError (props: CollectCodeErrorProps) {
    const { classes } = useStyles();

    const getErrorDescription = (errorCode: number | null): string => {
        switch (errorCode) {
            case 400:
                return 'Code is already collected.';
            case 404:
                return 'Code not found';
            default:
                return 'Unexpected error';
        }
    };

    return (
        <>
            <h2>ERROR!</h2>
            <CircleX className={classes.iconRed} size={100}/>
            <code>{props.code}</code>
            <span>{getErrorDescription(props.codeCollectRequestState)}</span>
        </>
    );
}
