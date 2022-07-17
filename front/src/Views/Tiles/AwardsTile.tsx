import React, { useEffect, useState } from 'react';
import { createStyles, MantineTheme } from '@mantine/core';
import ThemeHelper from '../../Utils/ThemeHelper';
import InlineLoader from '../../Components/InlineLoader';
import { TileClass } from '../Style';
import Model from '../../Model/Model';
import SettingsModel, { SettingName } from '../../Model/SettingsModel';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        ...TileClass(theme)
    })) as Function;

export default function AwardsTile () {
    const { classes } = useStyles();

    const [awardsInfo, setAwardsInfo] = useState<SettingsModel | null>(null);

    useEffect(() => {
        SettingsModel.get(SettingName.awardsInfo)
            .then((models: Model) => models as SettingsModel)
            .then((tempAwardsInfo: SettingsModel) => setAwardsInfo(tempAwardsInfo));
    }, []);

    const awardsJSX: JSX.Element = awardsInfo !== null
        // eslint-disable-next-line react/no-danger
        ? <div dangerouslySetInnerHTML={{ __html: awardsInfo.value }}/>
        : <InlineLoader/>;

    return (
        <div className={ThemeHelper.classes(classes.tile)}>
            <h1>Nagrody</h1>
            {awardsJSX}
        </div>
    );
}
