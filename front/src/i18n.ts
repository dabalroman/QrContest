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
                    'Password should be at least 8 characters long.': 'Hasło musi mieć co najmniej 8 znaków.',
                    'I don\'t have an account!': 'Nie mam jeszcze konta!'
                },
                RegisterView: {
                    'Register': 'Zarejestruj się',
                    'Nickname': 'Pseudonim',
                    'Your nickname, other users will see this': 'Twój pseudonim - widoczny dla innych graczy',
                    'Nickname should be at least 3 characters long.': 'Pseudonim musi mieć co najmniej 3 znaki.',
                    'Id of your bracelet. May be handy in case of password loss.':
                        'Kod z opaski. Przyda się przy odbiorze nagród.',
                    'See that code on your bracelet? Enter it here': 'Widzisz ten kod na twojej opasce?',
                    'Bracelet id should be at least 3 characters long.': 'Kod opaski musi mieć co najmniej 3 znaki.',
                    'Password': 'Hasło',
                    'Your secret password': 'Twoje tajne hasło',
                    'Password confirmation': 'Potwierdzenie hasła',
                    'Enter your secret password once again': 'Wpisz hasło jeszcze raz.',
                    'Password should be at least 8 characters long.': 'Hasło musi mieć co najmniej 8 znaków.',
                    'I want to log in!': 'Chcę się zalogować!',
                    'Success! Please log in to start!': 'Sukces! Zaloguj się by rozpocząć rozgrywkę!',
                    'Something went wrong, try again.': 'Coś poszło nie tak, spróbuj ponownie.'
                },
                Loader: {
                    'Beep, boop, biip, boop...': 'Beep, boop, biip, boop...',
                    'Please wait while the minions do their work.': 'Proszę czekać, Minionki pracują.',
                    'Feeding unicorns.': 'Karmienie jednorożców',
                    'Up, Up, Down, Down, Left, Right, Left, Right, B, A':
                        'Góra, Góra, Dół, Dół, Lewo, Prawo, Lewo, Prawo, A, B',
                    'Ensuring Gnomes are still short.': 'Sprawdzanie, czy gnomy nadal są niskie.',
                    'Reversing the shield polarity, please wait...': 'Odwracanie polaryzacji tarcz, proszę czekać...',
                    'Bending the spoon...': 'Wykrzywianie łyżki...',
                    'Don\'t think of purple hippos!': 'Nie myśl o fioletowych hipopotamach!',
                    '...and enjoy the elevator music...': '...baw się dobrze słuchając muzyki z naszej windy...',
                    'We\'re testing your patience.': 'Testujemy twoją cierpliwość.',
                    'The bits are flowing slowly today.': 'Bajty płyną dziś wolno.',
                    'Are we there yet?': 'Długo jeszcze?',
                    'Don\'t panic...': 'Nie panikuj...',
                    'I\'m sorry Dave, I\'m still working on it.': 'Wybacz Dave, jeszcze nad tym pracuję.',
                    'I swear it\'s almost done.': 'Przysięgam, już prawie gotowe.',
                    'Dividing by zero...': 'Dzielenie przez zero...',
                    'Proving P=NP...': 'Udowadnianie, że P=NP...',
                    'Winter is coming...': 'Zima się zbliża...',
                    'What the what?': 'Co, że co?',
                    'Downloading more RAM.': 'Pobieranie większej ilości RAMu.',
                    'You may call me Steve.': 'Możesz mówić mi Steve',
                    'Patience! This is difficult, you know...': 'Chwila! To dość skomplikowane...',
                    'Still faster than Windows update': 'Nadal szybszy, niż Windows update.'
                },
                CollectCodeTile: {
                    'Collect code': 'Dodaj kod',
                    'Can\'t scan a code?': 'Nie możesz zeskanować kodu?',
                    'No problem, enter the code below.': 'Nie ma problemu, wpisz go poniżej.',
                    'Secret code': 'Tajny kod',
                    'Enter your secret code': 'Wpisz swój sekretny kod',
                    'Code can contain only letters and digits. At least 3 letters.':
                        'Kod może składać się tylko z liter i cyfr. Conajmniej 3 znaki.',
                    'Confirm': 'Potwierdź'
                },
                CollectCodeView: {
                    'Go to question!': 'Pytanie proszę!',
                    'Back to dashboard': 'Powrót do ekranu głównego'
                },
                CollectCodeSuccess: {
                    'Success!': 'Sukces!',
                    'Code was added to your account': 'Kod został dodany do twojego konta'
                },
                CollectCodeError: {
                    'Error!': 'Błąd!',
                    'Code is already collected': 'Kod został już zebrany',
                    'Code does not exist': 'Taki kod nie istnieje',
                    'Unexpected error. Try again.': 'Nieznany błąd. Spróbuj ponownie.'
                },
                CollectCodeQuestion: {
                    'Question time!': 'Czas na pytanie!'
                }
            }
        }
    })
    .then();

export default i18n;
