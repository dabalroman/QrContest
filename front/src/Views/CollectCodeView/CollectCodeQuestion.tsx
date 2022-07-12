import React from 'react';
import { Button, createStyles, MantineColor, MantineTheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ColorfulIconClass } from '../Style';
import CollectedCodeModel from '../../Model/CollectedCodeModel';
import ThemeHelper from '../../Utils/ThemeHelper';

export type CollectCodeQuestionProps = {
    collectedCodeModel: CollectedCodeModel | null,
    confirmQuestionAnswered: () => void
};

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        view: {
            zIndex: 10,
            textAlign: 'center',
            position: 'relative'
        },

        question: {
            display: 'block',
            backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[4], theme.colors.gray[2]),
            padding: 30,
            margin: '20px -20px',
            textAlign: 'center',
            fontSize: '1.1em'
        },

        answers: {
            display: 'grid',
            gridAutoFlow: 'row',
            gridGap: 20
        },

        answer: {
            fontSize: '1.2em',
            padding: 10,
            height: 'fit-content'
        },

        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeQuestion (props: CollectCodeQuestionProps) {
    const { t } = useTranslation('CollectCodeQuestion');
    const { classes } = useStyles();

    const answer = (answerId: string) => {
        if (props.collectedCodeModel) {
            // eslint-disable-next-line no-param-reassign
            props.collectedCodeModel.questionAnswer = answerId;
            props.collectedCodeModel.put()
                .then(() => {
                    alert('Correct!');
                    props.confirmQuestionAnswered();
                })
                .catch(() => alert('Error!'));
        }
    };

    const questionAsButton = (question: string, answerId: string, color: string) => (
        <Button
            fullWidth
            onClick={() => answer(answerId)}
            className={classes.answer as string}
            color={color as MantineColor}
        >
            {question}
        </Button>
    );

    return (
        <div className={classes.view}>
            <h1>{t('Question time!')}</h1>
            <div className={classes.question}>
                {props.collectedCodeModel?.questionCurrent?.question} <br/>
                ( {props.collectedCodeModel?.questionCurrent?.points} pkt. )
            </div>
            <div className={classes.answers as string}>
                {questionAsButton(props.collectedCodeModel?.questionCurrent?.answer_a ?? '?', 'a', 'red')}
                {questionAsButton(props.collectedCodeModel?.questionCurrent?.answer_b ?? '?', 'b', 'teal')}
                {questionAsButton(props.collectedCodeModel?.questionCurrent?.answer_c ?? '?', 'c', 'yellow')}
                {questionAsButton(props.collectedCodeModel?.questionCurrent?.answer_d ?? '?', 'd', 'indigo')}
            </div>
        </div>
    );
}
