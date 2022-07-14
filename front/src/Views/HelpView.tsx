import React from 'react';
import { Button, createStyles, MantineTheme } from '@mantine/core';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { ArrowBack } from 'tabler-icons-react';
import { CleanLinkClass, TextAlignClass, TileClass } from './Style';
import Routes from './routes';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        description: {
            textAlign: 'justify'
        },

        button: {
            position: 'fixed',
            bottom: 15,
            right: 15,
            fontSize: '1em',
            height: 50,
            borderRadius: 10,
            boxShadow: '4px 4px 3px 2px #00000099'
        },

        buttonPlaceholder: {
            height: 70
        },

        ...TileClass(theme),
        ...TextAlignClass,
        ...CleanLinkClass(theme)
    })) as Function;

export default function HelpView () {
    const { classes } = useStyles();
    const navigate: NavigateFunction = useNavigate();

    return (
        <div>
            <h1 className={classes.alignCenter}>Pomoc</h1>
            <div className={classes.tile}>
                <h1>QrContest, czyli co tak właściwie?</h1>
                <p className={classes.description}>
                    QrContest to konkurs polegający na szukaniu i zbieraniu kodów QR – zbierz je wszystkie! <br/><br/>
                    Za każdy kod otrzymasz pewną ilość punktów, ta jest zależna jest od jego trudności kodu. Ukryte kody
                    będą lepiej punktowane. W niektórych kodach możesz natknąć się na losowe pytanie konkursowe.
                    Dobra odpowiedź zapewni ci dodatkowe punkty i większą szansę na wygraną!<br/><br/>
                    Trzy osoby z największą ilością zgromadzonych punktów wygrywają nagrody – odpowiednio
                    <b> 50, 35 i 20 fantów za pierwsze, drugie i trzecie miejsce</b>.
                    Fanty, czyli walutę konwentową, możesz wymienić w sklepiku konwentowym na cokolwiek
                    zechcesz! <br/><br/>
                    Konkurs będzie miał dwie tury – podwójne szanse na wygraną!
                    Pierwsza tura potrwa do godziny <b>14:00 w sobotę</b>, druga do <b>12:00 w niedzielę</b>.
                    Nie udało się w pierwszej turze? Twoje punkty nie przepadają, grasz dalej!<br/><br/>
                    Biorąc udział w konkursie akceptujesz warunki&nbsp;
                    <Link className={classes.cleanLink} to={Routes.rulebook}>regulaminu</Link>.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Jakie są nagrody?</h1>
                <p className={classes.description}>
                    <ol start={1}>
                        <li>Miejsce – <b>50 fantów</b> – to ekwiwalent gry planszowej lub wielu gadżetów</li>
                        <li>Miejsce – <b>35 fantów</b> – to dobra książka lub najlepsze gadżety</li>
                        <li>Miejsce – <b>20 fantów</b> – możesz liczyć na książkę, mangę lub gadżety konwentowe</li>
                    </ol>
                    Wpadnij do sklepiku i sprawdź sam, co możesz uzyskać!<br/><br/>
                    Pamiętaj, że nawet jeśli za wygrane fanty nie jesteś w stanie kupić swojego wymarzonego gadżetu, to
                    możesz potraktować je jako rabat – na przykład 90% zniżki na grę planszową brzmi kusząco!
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Jak wziąć udział w konkursie?</h1>
                <p className={classes.description}>
                    Będzie potrzebne Ci jakieś urządzenie z dostępem do Internetu. Telefon na przykład.
                    Zeskanuj dowolny kod lub wejdź bezpośrednio na https://www.qrcontest.gniezno.pl i zarejestruj się.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Moje urządzenie nie skanuje kodów QR, co teraz?</h1>
                <p className={classes.description}>
                    Są dwa wyjścia z tej sytuacji:
                    <ul>
                        <li> Możesz pobrać dowolną aplikację pozwalającą na skanowanie kodów ze sklepu z aplikacjami
                            twojego urządzenia. Zanim to zrobisz, sprawdź czy twój aparat nie potrafi tego robić!
                            Dedykowane aplikacje z reguły radzą sobie z tym lepiej – na przykład na telefonie Xiaomi Mi
                            9 aparat potrafi zeskanować kod z odległości około 0.5 metra, a dedykowana aplikacja
                            „Scanner” (wbudowana w system) czyta kody z odległości większej niż 2 metry!
                        </li>
                        <li> Możesz wejść na stronę konkursu wpisując adres do przeglądarki i ręczenie przepisywać kody
                            do
                            aplikacji.
                        </li>
                    </ul>
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Kiedy i gdzie rozdawane będą nagrody?</h1>
                <p className={classes.description}>
                    Nagrody możesz odebrać po zakończeniu każdej z tur konkursu w punkcie informacyjnym.
                    Pierwsza tura potrwa do godziny <b>14:00 w sobotę</b>, druga do <b>12:00 w niedzielę</b>.<br/><br/>
                    Nie udało się w pierwszej turze? Twoje punkty nie przepadają, grasz dalej!
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Czego potrzebuję do odebrania nagrody?</h1>
                <p className={classes.description}>
                    By odebrać nagrodę musisz udowodnić, że dane konto należy do ciebie.<br/>
                    Możesz to zrobić pokazując aplikację z zalogowanym twoim kontem lub podając kod z opaski
                    akredytacyjnej.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Które miejsce w konkursie zajmuję?</h1>
                <p className={classes.description}>
                    Sprawdź ranking uczestników.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Skąd mam wiedzieć, czy wygrałem/am?</h1>
                <p className={classes.description}>
                    W aplikacji pojawi się informacja o zwycięzcach po zakończeniu każdej z tur. Możesz sprawdzić też
                    ranking.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Zapomniałem hasła, pomocy!</h1>
                <p className={classes.description}>
                    Skontaktuj się z organizatorem konkursu. Informacje kontaktowe znajdziesz na dole tej strony.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Czy mogę zbierać kody razem z przyjacielem?</h1>
                <p className={classes.description}>
                    Tak, możecie zbierać kody na jedno konto, lub każdy na swoje osobne. Pamiętaj, że podczas zbierania
                    kodów
                    trafisz na pytania konkursowe. Może okazać się, że pomimo wspólnych poszukiwań wasze wyniki będą się
                    różnić.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Czy mogę założyć więcej niż jedno konto?</h1>
                <p className={classes.description}>
                    Nie, jeden uczestnik konwentu to jedno konto w konkursie.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Mam inne pytanie...</h1>
                <p className={classes.description}>
                    Skontaktuj się z organizatorem konkursu, informacje kontaktowe znajdziesz na dole tej strony.
                </p>
            </div>
            <div className={classes.tile}>
                <h1>Kontakt</h1>
                <p className={classes.description}>
                    Masz jakieś pytania lub problem? Pisz śmiało:
                    <ul>
                        <li>Messenger:&nbsp;
                            <a href="https://m.me/roman.dabal" className={classes.cleanLink}>
                                https://m.me/roman.dabal
                            </a>
                        </li>
                        <li>Email:&nbsp;
                            <a href="mailto:dabalroman@gmail.com" className={classes.cleanLink}>
                                dabalroman@gmail.com
                            </a>
                        </li>
                        <li>Możesz też mnie poszukać, na pewno kręcę się gdzieś w okolicy 😊</li>
                    </ul>
                </p>
            </div>
            <div className={classes.buttonPlaceholder as string}/>
            <Button
                className={classes.button}
                onClick={() => navigate(-1)}
                leftIcon={<ArrowBack/>}
                variant="filled"
            >
                Powrót
            </Button>
        </div>
    );
}
