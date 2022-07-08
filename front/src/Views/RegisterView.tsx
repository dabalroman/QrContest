import React, { useEffect } from 'react';
import { Button, createStyles, MantineTheme, PasswordInput, TextInput } from '@mantine/core';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/hooks';
import ThemeHelper from '../Utils/ThemeHelper';
import Auth from '../Api/Auth';
import Routes from './routes';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        view: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            color: ThemeHelper.getTextColor(theme, theme.colors.gray[3], theme.colors.dark[7]),
            background: ThemeHelper.getBackgroundImage(theme),
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[9], theme.colors.gray[4]),
            padding: 20
        },

        form: {
            width: '100%',
            display: 'grid',
            gridGap: 20,
            backgroundColor: ThemeHelper.getBackgroundColor(theme),
            padding: 16,
            borderRadius: 20
        }
    })) as Function;

export default function RegisterView (): JSX.Element {
    const { t } = useTranslation('RegisterView');
    const navigate: NavigateFunction = useNavigate();
    const { classes } = useStyles();

    useEffect(() => {
        if (Auth.isLoggedIn()) {
            navigate(Routes.dashboard);
        }
    }, []);

    interface FormValues {
        name: string;
        password: string;
    }

    const {
        onSubmit,
        values,
        getInputProps
    } = useForm<FormValues>({
        initialValues: {
            name: '',
            password: ''
        },

        validationRules: {
            name: (value: string) => value.trim().length >= 3,
            password: (value: string) => value.trim().length >= 8
        },

        errorMessages: {
            name: t('Name should be at least 3 characters long.'),
            password: t('Password should be at least 8 characters long.')
        }
    });

    const register = () => {
        Auth.register(values.name, values.password)
            .then(() => navigate(Routes.dashboard))
            .catch(() => alert('Something went wrong'));
    };

    /* eslint-disable react/jsx-props-no-spreading */
    // noinspection TypeScriptValidateTypes
    return (
        <div className={classes.view}>
            <h1>{t('Register')}</h1>
            <form className={classes.form} onSubmit={onSubmit(register)}>
                <TextInput
                    required
                    label={t('Nickname')}
                    placeholder={t('Your nickname, other users will see this')}
                    {...(getInputProps('name'))}
                />

                <PasswordInput
                    required
                    label={t('Password')}
                    placeholder={t('Your secret password')}
                    {...getInputProps('password')}
                />

                <Button type="submit">{t('Register')}</Button>

                <Link to={Routes.login}>{t('I want to log in!')}</Link>
            </form>
        </div>
    );
}
