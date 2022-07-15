import React, { useEffect, useState } from 'react';
import { createStyles, MantineTheme, Table } from '@mantine/core';
import { CircleCheck, CircleMinus, CircleX } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import ThemeHelper from '../../Utils/ThemeHelper';
import InlineLoader from '../../Components/InlineLoader';
import { CleanLinkClass, ColorfulIconClass, TextAlignClass, TileClass } from '../Style';
import CollectedCodeModel from '../../Model/CollectedCodeModel';
import Model from '../../Model/Model';
import filterTimeHoursMinutes from '../../Utils/Filters/TimeFilter';
import CodeModel from '../../Model/CodeModel';
import Routes from '../routes';

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
            },

            overflow: 'scroll'
        },

        allowOverflow: {
            overflow: 'scroll'
        },

        booleanRow: {
            width: 24
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
        ...ColorfulIconClass(theme),
        ...CleanLinkClass(theme)
    })) as Function;

export default function AllCodesTile () {
    const { classes } = useStyles();

    const [codeModel, setCodeModel] = useState<CodeModel[] | null>(null);

    useEffect(() => {
        CodeModel.getAll()
            .then((models: Model[]) => models as CodeModel[])
            .then((codes: CodeModel[]) => setCodeModel(codes));
    }, []);

    const displayBoolean = (value: number): JSX.Element | null => {
        if (value === 0) {
            return <CircleX className={ThemeHelper.classes(classes.icon, classes.iconRed)}/>;
        }

        return <CircleCheck className={ThemeHelper.classes(classes.icon, classes.iconGreen)}/>;
    };

    const tableContents: JSX.Element[] | null =
        codeModel?.map((code: CodeModel) => (
            <tr key={code.id}>
                <td className={classes.iconContainer as string}>{displayBoolean(code.isActive)}</td>
                <td className={classes.iconContainer as string}>{displayBoolean(code.withQuestion)}</td>
                <td><Link to={`/code/${code.data}`} className={classes.cleanLink}>{code.data}</Link></td>
                <td>{code.points} pkt</td>
                <td>{code.name}</td>
                <td>{code.description}</td>
            </tr>
        )) ?? null;

    const collectedCodesJSX: JSX.Element = codeModel !== null
        ? (
            <div className={classes.allowOverflow as string}>
                <Table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.booleanRow as string}>A</th>
                            <th className={classes.booleanRow as string}>Q</th>
                            <th>Kod</th>
                            <th>Punkty</th>
                            <th>Nazwa</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>{tableContents}</tbody>
                </Table>
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
