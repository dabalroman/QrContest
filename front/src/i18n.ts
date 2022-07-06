/* eslint-disable quote-props */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: 'pl',
        interpolation: {
            escapeValue: false
        },
        resources: {
            pl: {
                LoginView: {
                    'Email address': 'Adres email',
                    'Invalid email': 'Błędny adres email',
                    'Login': 'Zaloguj',
                    'Password is too short': 'Hasło jest za krótkie',
                    'Password': 'Hasło'
                }
            }
        }
    })
    .then();

export default i18n;
