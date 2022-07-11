import React, { useEffect, useState } from 'react';
import { Button, createStyles, MantineTheme } from '@mantine/core';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { ColorfulIconClass, TileClass } from '../Style';
import Navbar from '../../Components/Navbar';
import CollectedCodeModel from '../../Model/CollectedCodeModel';
import Model from '../../Model/Model';
import ApiResponseError from '../../Api/ApiResponseError';
import InlineLoader from '../../Components/InlineLoader';
import Routes from '../routes';
import CodeModel from '../../Model/CodeModel';
import Auth from '../../Api/Auth';
import CollectCodeSuccess from './CollectCodeSuccess';
import CollectCodeError from './CollectCodeError';
import ThemeHelper from '../../Utils/ThemeHelper';

enum CodeCollectState {
    pending = 0,
    success = 1,
    error = 2
}

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        summary: {
            display: 'grid',
            justifyItems: 'center',
            gridGap: 20,
            marginBottom: 20,

            '> h2': {
                marginBottom: 0
            },

            '> code': {
                backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[9], theme.colors.gray[0]),
                padding: '10px 20px',
                borderRadius: 10,
                fontSize: '1.2em'
            }
        },

        ...TileClass(theme),
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeView (): JSX.Element {
    const navigate: NavigateFunction = useNavigate();

    const { classes } = useStyles();
    const { code } = useParams();

    // React strict mode hack - prevent sending double request to server
    let wasCodeHasBeenSentToServerAlready: boolean = false;

    const [codeCollectState, setCodeCollectState] = useState<CodeCollectState>(CodeCollectState.pending);
    const [codeCollectRequestState, setCodeCollectRequestState] = useState<number | null>(null);
    const [collectedCodeModel, setCollectedCodeModel] = useState<CollectedCodeModel | null>(null);

    const collectCode = (data: string) => {
        if (wasCodeHasBeenSentToServerAlready) {
            return;
        }

        const collectedCode: CollectedCodeModel = new CollectedCodeModel();
        collectedCode.data = data;

        collectedCode.post()
            .then((model: Model) => model as CollectedCodeModel)
            .then((collectedCodeModelTemp: CollectedCodeModel) => {
                setCollectedCodeModel(collectedCodeModelTemp);
                setCodeCollectState(CodeCollectState.success);

                Auth.getCurrentUser().score += collectedCodeModelTemp.codePoints;

                Auth.getCurrentUser()
                    .refresh();
            })
            .catch((error: ApiResponseError) => {
                setCodeCollectRequestState(error.response.status);
                setCodeCollectState(CodeCollectState.error);
            });

        wasCodeHasBeenSentToServerAlready = true;
    };

    useEffect(() => {
        if (code === undefined || !CodeModel.dataRegex.test(code)) {
            navigate(Routes.dashboard, { replace: true });
            return;
        }

        collectCode(code);
    }, []);

    const codeCollectSummary: JSX.Element =
        codeCollectState === CodeCollectState.success
            ? <CollectCodeSuccess code={code ?? null} collectedCodeModel={collectedCodeModel}/>
            : <CollectCodeError code={code ?? null} codeCollectRequestState={codeCollectRequestState}/>;

    return (
        <div className="App">
            <Navbar/>
            <div className={classes.tile}>
                <div className={classes.summary}>
                    {
                        codeCollectState !== CodeCollectState.pending
                            ? codeCollectSummary
                            : <InlineLoader/>
                    }
                </div>
                <Button
                    fullWidth
                    onClick={() => navigate(Routes.dashboard, { replace: true })}
                >
                    Back to dashboard
                </Button>
            </div>
        </div>
    );
}
