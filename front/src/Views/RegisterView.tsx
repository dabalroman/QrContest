import React, { useEffect } from 'react';
import { Button, createStyles, MantineTheme, PasswordInput, TextInput } from '@mantine/core';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/hooks';
import ThemeHelper from '../Utils/ThemeHelper';
import Auth from '../Api/Auth';
import Routes from './routes';
import { CleanLinkClass } from './Style';

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
        braceletId: string;
        password: string;
        passwordConfirm: string;
    }

    const {
        onSubmit,
        values,
        getInputProps
    } = useForm<FormValues>({
        initialValues: {
            name: '',
            braceletId: '',
            password: '',
            passwordConfirm: ''
        },

        validationRules: {
            name: (value: string) => value.trim().length >= 3,
            braceletId: (value: string) => value.trim().length >= 3,
            password: (value: string) => value.trim().length >= 8,
            passwordConfirm: (value: string) => value.trim().length >= 8
        },

        errorMessages: {
            name: t('Nickname should be at least 3 characters long.'),
            braceletId: t('Bracelet id should be at least 3 characters long.'),
            password: t('Password should be at least 8 characters long.'),
            passwordConfirm: t('Password should be at least 8 characters long.')
        }
    });

    const register = () => {
        Auth.register(values.name, values.password, values.passwordConfirm, values.braceletId)
            .then(() => {
                alert(t('Success! Please log in to start!'));
                navigate(Routes.login);
            })
            // eslint-disable-next-line no-alert
            .catch(() => alert(t('Something went wrong, try again.')));
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

                <TextInput
                    required
                    label={t('Id of your bracelet. May be handy in case of password loss.')}
                    placeholder={t('See that code on your bracelet? Enter it here')}
                    {...(getInputProps('braceletId'))}
                />

                <PasswordInput
                    required
                    label={t('Password')}
                    placeholder={t('Your secret password')}
                    {...getInputProps('password')}
                />

                <PasswordInput
                    required
                    label={t('Password confirmation')}
                    placeholder={t('Enter your secret password once again')}
                    {...getInputProps('passwordConfirm')}
                />

                <Button type="submit">{t('Register')}</Button>

                <Button variant="subtle" onClick={() => navigate(Routes.login)}>{t('I want to log in!')}</Button>
            </form>
        </div>
    );
}
