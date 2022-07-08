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
                    'Log in': 'Zaloguj się',
                    'Login': 'Zaloguj',
                    'Nickname': 'Pseudonim',
                    'Your nickname': 'Twój pseudonim',
                    'Nickname should be at least 3 characters long.': 'Pseudonim musi mieć co najmniej 3 znaki.',
                    'Password': 'Hasło',
                    'Your secret password': 'Twoje tajne hasło',
                    'Password should be at least 8 characters long.': 'Hasło musi mieć co najmniej 8 znaków.'
                },
                RegisterView: {
                    'Register': 'Zarejestruj się',
                    'Nickname': 'Pseudonim',
                    'Your nickname, other users will see this': 'Twój pseudonim - widoczny dla innych graczy',
                    'Nickname should be at least 3 characters long.': 'Pseudonim musi mieć co najmniej 3 znaki.',
                    'Password': 'Hasło',
                    'Your secret password': 'Twoje tajne hasło',
                    'Password should be at least 8 characters long.': 'Hasło musi mieć co najmniej 8 znaków.'
                }
            }
        }
    })
    .then();

export default i18n;
