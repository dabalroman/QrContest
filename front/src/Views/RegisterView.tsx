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
        ...CleanLinkClass(theme)
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
            name: (value: string) => value.trim().length >= 3 && value.trim().length <= 16,
            braceletId: (value: string) => value.trim().length >= 3,
            password: (value: string) => value.trim().length >= 8,
            passwordConfirm: (value: string) => value.trim().length >= 8
        },

        errorMessages: {
            name: t('Nickname should have at least 3 characters, at most 16.'),
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
            <img src="logo.png" alt="QrContest" className={classes.logo}/>
            <form className={classes.form} onSubmit={onSubmit(register)}>
                <h2>{t('Register')}</h2>

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

                <small>Biorąc udział w konkursie akceptujesz warunki&nbsp;
                    <Link className={classes.cleanLink} to={Routes.rulebook}>regulaminu</Link>.
                </small>
                <Button type="submit">{t('Register')}</Button>

                <Button variant="subtle" onClick={() => navigate(Routes.login)}>{t('I want to log in!')}</Button>
            </form>
        </div>
    );
}
