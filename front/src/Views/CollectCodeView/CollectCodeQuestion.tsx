import React, { useEffect, useState } from 'react';
import { Button, createStyles, MantineColor, MantineTheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useInterval } from '@mantine/hooks';
import { ColorfulIconClass } from '../Style';
import CollectedCodeModel from '../../Model/CollectedCodeModel';
import ThemeHelper from '../../Utils/ThemeHelper';

export type CollectCodeQuestionProps = {
    collectedCodeModel: CollectedCodeModel | null,
    // eslint-disable-next-line
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
            backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[4], theme.colors.gray[2]),
            padding: 30,
            margin: '20px -20px',
            textAlign: 'center',
            fontSize: '1.25em',
            fontWeight: 'bold'
        },

        timeLeft: {
            fontSize: '0.8em',
            display: 'block',
            fontWeight: 'normal',
            color: ThemeHelper.getTextColor(theme, theme.colors.gray[5], theme.colors.dark[3])
        },

        answers: {
            display: 'grid',
            gridAutoFlow: 'row',
            gridGap: 20,
            marginBottom: 20,

            '>button span': {
                whiteSpace: 'normal',
                overflow: 'visible'
            }
        },

        answer: {
            fontSize: '1.2em',
            padding: 10,
            minHeight: 50,
            height: 'fit-content'
        },

        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeQuestion (props: CollectCodeQuestionProps) {
    const { t } = useTranslation('CollectCodeQuestion');
    const { classes } = useStyles();

    const [secondsLeft, setSecondsLeft] = useState(20);
    const timer: {
        start: () => void,
        stop: () => void,
        toggle: () => void,
        active: boolean
    } = useInterval(() => setSecondsLeft((s: number) => (s > 0 ? s - 1 : 0)), 1000);

    useEffect(() => {
        timer.start();

        return timer.stop;
    }, []);

    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [question] = useState<string>(props.collectedCodeModel?.questionCurrent?.question ?? '???');
    const [answers] = useState<string[]>([
        props.collectedCodeModel?.questionCurrent?.answer_a ?? '?',
        props.collectedCodeModel?.questionCurrent?.answer_b ?? '?',
        props.collectedCodeModel?.questionCurrent?.answer_c ?? '?',
        props.collectedCodeModel?.questionCurrent?.answer_d ?? '?'
    ]);
    const [points] = useState<number>(props.collectedCodeModel?.questionCurrent?.points ?? 0);

    const commitAnswer = (answerCharId: string, force: boolean = false) => {
        if (props.collectedCodeModel && (timer.active || force)) {
            // eslint-disable-next-line no-param-reassign
            props.collectedCodeModel.questionAnswer = answerCharId;
            props.collectedCodeModel.put()
                .then(() => {
                    setCorrectAnswer(props.collectedCodeModel?.questionCorrectAnswer ?? 'x');
                    props.confirmQuestionAnswered();
                })
                .catch(() => console.log('Error!'));

            timer.stop();
        }
    };

    const answerAsButton = (answer: string, answerCharId: string, color: string) => (
        <Button
            fullWidth
            onClick={() => commitAnswer(answerCharId)}
            className={classes.answer as string}
            color={
                (correctAnswer === null || correctAnswer === answerCharId)
                    ? (color as MantineColor)
                    : ('gray' as MantineColor)
            }
        >
            {answer}
        </Button>
    );

    useEffect(() => {
        if (timer.active && secondsLeft <= 0) {
            commitAnswer('x', true);
        }
    }, [secondsLeft]);

    return (
        <div className={classes.view}>
            <h1>Grasz o {points} pkt.</h1>
            <div className={classes.question}>
                {question}
                <span className={classes.timeLeft as string}>
                    {(timer.active && secondsLeft > 0)
                        ? (`${secondsLeft} s`)
                        : 'Koniec czasu.'}
                </span>
            </div>
            <div className={classes.answers as string}>
                {answerAsButton(answers[0], 'a', 'red')}
                {answerAsButton(answers[1], 'b', 'teal')}
                {answerAsButton(answers[2], 'c', 'indygo')}
                {answerAsButton(answers[3], 'd', 'yellow')}
            </div>
        </div>
    );
}
