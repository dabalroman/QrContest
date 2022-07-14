import React, { useEffect } from 'react';
import { Button, createStyles, MantineTheme, PasswordInput, TextInput } from '@mantine/core';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/hooks';
import ThemeHelper from '../Utils/ThemeHelper';
import Routes from './routes';
import Auth from '../Api/Auth';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        view: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            minHeight: '100vh',
            color: ThemeHelper.getTextColor(theme, theme.colors.gray[3], theme.colors.dark[7]),
            background: ThemeHelper.getBackgroundImage(theme),
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundColor: ThemeHelper.getBackgroundColor(theme, theme.colors.dark[9], theme.colors.gray[4]),
            padding: 20
        },

        form: {
            marginBottom: '20%',
            width: '100%',
            display: 'grid',
            gridGap: 20,
            backgroundColor: ThemeHelper.getBackgroundColor(theme),
            padding: 16,
            borderRadius: 20
        }
    })) as Function;

export default function LoginView (): JSX.Element {
    const { t } = useTranslation('LoginView');
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
            name: t('Nickname should be at least 3 characters long.'),
            password: t('Password should be at least 8 characters long.')
        }
    });

    const login = () => {
        Auth.login(values.name, values.password)
            .then(() => navigate(Routes.dashboard))
            .catch(() => alert('Something went wrong'));
    };

    /* eslint-disable react/jsx-props-no-spreading */
    // noinspection TypeScriptValidateTypes
    return (
        <div className={classes.view}>
            <h1>{t('Log in')}</h1>
            <form className={classes.form} onSubmit={onSubmit(login)}>
                <TextInput
                    required
                    label={t('Nickname')}
                    placeholder={t('Your nickname')}
                    {...(getInputProps('name'))}
                />

                <PasswordInput
                    required
                    label={t('Password')}
                    placeholder={t('Your secret password')}
                    {...getInputProps('password')}
                />

                <Button type="submit">{t('Login')}</Button>

                <Button variant="subtle" onClick={() => navigate(Routes.register)}>{t('I don\'t have an account!')}</Button>
            </form>
        </div>
    );
}
