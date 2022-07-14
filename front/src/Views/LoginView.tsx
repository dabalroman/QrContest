import React, { useEffect } from 'react';
import { ActionIcon, Button, createStyles, MantineTheme, PasswordInput, TextInput } from '@mantine/core';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/hooks';
import { QuestionMark } from 'tabler-icons-react';
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
            background: 'url(bg.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            padding: 20
        },

        logo: {
            width: '70vw',
            maxWidth: 500,
            marginBottom: 50
        },

        form: {
            marginBottom: '20%',
            width: '100%',
            display: 'grid',
            gridGap: 20,
            backgroundColor: ThemeHelper.getBackgroundColor(theme),
            padding: 16,
            borderRadius: 20,

            '> h2': {
                margin: 0,
                textAlign: 'center'
            }
        },

        helpIcon: {
            position: 'fixed',
            top: 20,
            right: 20,
            color: ThemeHelper.getTextColor(theme),
            backgroundColor: theme.colors[theme.primaryColor][8],
            height: '3em',
            width: '3em',
            borderRadius: 10
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
            name: (value: string) => value.trim().length >= 3 && value.trim().length <= 16,
            password: (value: string) => value.trim().length >= 8
        },

        errorMessages: {
            name: t('Nickname should have at least 3 characters, at most 16.'),
            password: t('Password should be at least 8 characters long.')
        }
    });

    const login = () => {
        Auth.login(values.name, values.password)
            .then(() => navigate(Routes.dashboard))
            // eslint-disable-next-line no-alert
            .catch(() => alert('Something went wrong, try again.'));
    };

    /* eslint-disable react/jsx-props-no-spreading */
    // noinspection TypeScriptValidateTypes
    return (
        <div className={classes.view}>
            <img src="logo.png" alt="QrContest" className={classes.logo}/>
            <form className={classes.form} onSubmit={onSubmit(login)}>
                <h2>{t('Log in')}</h2>
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

                <Button
                    variant="subtle"
                    onClick={() => navigate(Routes.register)}
                >
                    {t('I don\'t have an account!')}
                </Button>
            </form>
            <ActionIcon
                className={classes.helpIcon as string}
                variant="default"
                onClick={() => navigate(Routes.help)}
            >
                <QuestionMark/>
            </ActionIcon>
        </div>
    );
}
