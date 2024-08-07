import React, { useEffect, useState } from 'react';
import { createStyles, MantineTheme, Table } from '@mantine/core';
import { CircleCheck, CircleMinus, CircleX } from 'tabler-icons-react';
import ThemeHelper from '../../Utils/ThemeHelper';
import InlineLoader from '../../Components/InlineLoader';
import { ColorfulIconClass, TextAlignClass, TileClass } from '../Style';
import CollectedCodeModel from '../../Model/CollectedCodeModel';
import Model from '../../Model/Model';
import filterTimeHoursMinutes from '../../Utils/Filters/TimeFilter';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        table: {
            'tr>td, th>td': {
                lineHeight: '24px'
            },

            'th:first-of-type, td:first-of-type': {
                paddingLeft: 0
            },

            'th:first-of-type, td:last-of-type': {
                paddingRight: 0
            }
        },

        questionRow: {
            width: 24,
            color: 'transparent !important'
        },

        iconContainer: {
            padding: '0 !important'
        },

        icon: {
            position: 'relative',
            top: 4
        },

        legend: {
            marginTop: 20,

            '&>h3': {
                margin: 0
            },

            '&>div': {
                paddingTop: 2,
                lineHeight: '24px',

                '&>span': {
                    marginLeft: 5,
                    position: 'relative',
                    bottom: 3
                }
            }
        },

        ...TextAlignClass,
        ...TileClass(theme),
        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectedCodesTile () {
    const { classes } = useStyles();

    const [collectedCodes, setCollectedCodes] = useState<CollectedCodeModel[] | null>(null);

    useEffect(() => {
        CollectedCodeModel.getAll()
            .then((models: Model[]) => models as CollectedCodeModel[])
            .then((codes: CollectedCodeModel[]) => setCollectedCodes(codes));
    }, []);

    const decorateQuestionPoints = (points: number | null): JSX.Element | null => {
        if (points === null) {
            return <CircleMinus className={ThemeHelper.classes(classes.icon, classes.iconBlue)}/>;
        }

        if (points === 0) {
            return <CircleX className={ThemeHelper.classes(classes.icon, classes.iconRed)}/>;
        }

        return <CircleCheck className={ThemeHelper.classes(classes.icon, classes.iconGreen)}/>;
    };

    const tableContents: JSX.Element[] | null =
        collectedCodes?.map((code: CollectedCodeModel) => (
            <tr key={code.id}>
                <td className={classes.iconContainer as string}>{decorateQuestionPoints(code.questionPoints)}</td>
                <td>{code.codeName}</td>
                <td>+{code.score} pkt</td>
                <td>{filterTimeHoursMinutes(code.collectedAt)}</td>
            </tr>
        )) ?? null;

    const collectedCodesJSX: JSX.Element = collectedCodes !== null
        ? (
            <div>
                <Table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.questionRow as string}>#</th>
                            <th>Nazwa</th>
                            <th>Punkty</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>{tableContents}</tbody>
                </Table>
                <div className={classes.legend}>
                    <h3>Legenda symboli pytań:</h3>
                    <div>
                        <CircleCheck className={ThemeHelper.classes(classes.icon, classes.iconGreen)}/>
                        <span>Poprawna odpowiedź</span>
                    </div>
                    <div>
                        <CircleX className={ThemeHelper.classes(classes.icon, classes.iconRed)}/>
                        <span>Błędna odpowiedź</span>
                    </div>
                    <div>
                        <CircleMinus className={ThemeHelper.classes(classes.icon, classes.iconBlue)}/>
                        <span>Brak pytania</span>
                    </div>
                </div>
            </div>
        )
        : <InlineLoader/>;

    return (
        <div className={ThemeHelper.classes(classes.tile)}>
            <h1>Zebrane kody</h1>
            {collectedCodesJSX}
        </div>
    );
}
