import { Button, createStyles, MantineTheme, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import React from 'react';
import ThemeHelper from '../../Utils/ThemeHelper';
import { TileClass } from '../Style';
import Routes from '../routes';
import CodeModel from '../../Model/CodeModel';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        codeInput: {
            display: 'grid',
            gridGap: 20
        },

        ...TileClass(theme)
    })) as Function;

export default function CollectCodeTile () {
    const { t } = useTranslation('CollectCodeTile');
    const navigate: NavigateFunction = useNavigate();
    const { classes } = useStyles();

    interface FormValues {
        data: string;
    }

    const {
        onSubmit,
        values,
        getInputProps
    } = useForm<FormValues>({
        initialValues: {
            data: ''
        },

        validationRules: {
            data: (value: string) => CodeModel.dataRegex.test(value)
        },

        errorMessages: {
            data: t('Code can contain only letters and digits. At least 3 letters.')
        }
    });

    const collectCode = () => {
        navigate((Routes.code as string).replace(':code', values.data));
    };

    /* eslint-disable react/jsx-props-no-spreading */
    // noinspection TypeScriptValidateTypes
    return (
        <div className={ThemeHelper.classes(classes.tile)}>
            <h1>{t('Collect code')}</h1>
            <p>{t('Can\'t scan a code?')}<br/>{t('No problem, enter the code below.')}</p>
            <form className={classes.codeInput as string} onSubmit={onSubmit(collectCode)}>
                <TextInput
                    required
                    label={t('Secret code')}
                    placeholder={t('Enter your secret code')}
                    {...(getInputProps('data'))}
                />

                <Button type="submit">{t('Confirm')}</Button>
            </form>
        </div>
    );
}
