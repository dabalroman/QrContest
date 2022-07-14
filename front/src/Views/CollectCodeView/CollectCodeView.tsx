import React, { useEffect, useState } from 'react';
import { Button, createStyles, MantineTheme } from '@mantine/core';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import CollectCodeQuestion from './CollectCodeQuestion';

enum CodeCollectState {
    pending = 0,
    success = 1,
    question = 2,
    answered = 3,
    error = 4
}

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        summary: {
            display: 'grid',
            justifyItems: 'center',
            gridGap: 10,
            marginBottom: 20,

            '> *': {
                zIndex: 100
            },

            '> h1': {
                margin: 0
            },

            '> svg': {
                marginTop: 15
            },

            '> code': {
                backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[9], theme.colors.gray[0]),
                padding: '10px 20px',
                borderRadius: 10,
                fontSize: '1.2em',
                marginBottom: 20
            },

            '> span:last-of-type': {
                display: 'block',
                backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[4], theme.colors.gray[2]),
                padding: 10,
                width: '120%',
                textAlign: 'center',
                marginTop: 10
            }
        },

        questionBackground: {
            backgroundImage: 'url(/questionBg.png)'
        },

        ...TileClass(theme),
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeView (): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { t } = useTranslation('CollectCodeView');
    const { classes } = useStyles();
    const { code } = useParams();

    // React strict mode hack - prevent sending double request to server
    let hasCodeBeenSentToServerAlready: boolean = false;

    const [codeCollectState, setCodeCollectState] = useState<CodeCollectState>(CodeCollectState.pending);
    const [codeCollectRequestState, setCodeCollectRequestState] = useState<number | null>(null);
    const [collectedCodeModel, setCollectedCodeModel] = useState<CollectedCodeModel | null>(null);
    const [questionMode, setQuestionMode] = useState<boolean>(false);

    const collectCode = (data: string) => {
        if (hasCodeBeenSentToServerAlready) {
            return;
        }

        const collectedCode: CollectedCodeModel = new CollectedCodeModel();
        collectedCode.data = data;

        collectedCode.post()
            .then((model: Model) => model as CollectedCodeModel)
            .then((collectedCodeModelTemp: CollectedCodeModel) => {
                setCollectedCodeModel(collectedCodeModelTemp);
                setCodeCollectState(CodeCollectState.success);
                setQuestionMode(collectedCodeModelTemp.questionCurrent !== null);

                Auth.getCurrentUser().score += collectedCodeModelTemp.codePoints;
                Auth.getCurrentUser()
                    .refresh();
            })
            .catch((error: ApiResponseError) => {
                setCodeCollectRequestState(error.response.status);
                setCodeCollectState(CodeCollectState.error);
            });

        hasCodeBeenSentToServerAlready = true;
    };

    useEffect(() => {
        if (code === undefined || !CodeModel.dataRegex.test(code)) {
            navigate(Routes.dashboard, { replace: true });
            return;
        }

        collectCode(code);
    }, []);

    const confirmQuestionAnswered = () => setCodeCollectState(CodeCollectState.answered);

    const returnButton: JSX.Element =
        (
            (questionMode && codeCollectState === CodeCollectState.success)
                ? (
                    <Button
                        fullWidth
                        onClick={() => setCodeCollectState(CodeCollectState.question)}
                    >
                        {t('Go to question!')}
                    </Button>
                )
                : (
                    <Button
                        fullWidth
                        onClick={() => navigate(Routes.dashboard, { replace: true })}
                    >
                        {t('Back to dashboard')}
                    </Button>
                )
        );

    return (
        <div className="App">
            <Navbar/>
            <div className={ThemeHelper.classes(classes.tile, questionMode && classes.questionBackground)}>
                {codeCollectState === CodeCollectState.pending
                    && <InlineLoader/>}

                {(codeCollectState === CodeCollectState.success)
                    && (
                        <div className={classes.summary}>
                            <CollectCodeSuccess code={code ?? null} collectedCodeModel={collectedCodeModel}/>
                        </div>
                    )}

                {(codeCollectState === CodeCollectState.error)
                    && (
                        <div className={classes.summary}>
                            <CollectCodeError code={code ?? null} codeCollectRequestState={codeCollectRequestState}/>
                        </div>
                    )}

                {(codeCollectState === CodeCollectState.question || codeCollectState === CodeCollectState.answered)
                    && (
                        <CollectCodeQuestion
                            collectedCodeModel={collectedCodeModel}
                            confirmQuestionAnswered={confirmQuestionAnswered}
                        />
                    )}

                {(codeCollectState !== CodeCollectState.question && codeCollectState !== CodeCollectState.pending)
                    && returnButton}
            </div>
        </div>
    );
}
