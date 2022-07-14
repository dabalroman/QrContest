import React from 'react';
import { Button, createStyles, MantineTheme } from '@mantine/core';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ArrowBack } from 'tabler-icons-react';
import { TextAlignClass, TileClass } from './Style';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
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

        rules: {
            textAlign: 'justify',
            fontSize: '0.9em',
            paddingLeft: 15
        },

        ...TileClass(theme),
        ...TextAlignClass
    })) as Function;

export default function RulebookView () {
    const { classes } = useStyles();
    const navigate: NavigateFunction = useNavigate();

    return (
        <div>
            <h1 className={classes.alignCenter}>Regulamin konkursu QrContest</h1>
            <div className={classes.tile}>
                <p>Biorąc udział w konkursie zgadzasz się na poniższe warunki:</p>
                <ol className={classes.rules}>
                    <li>Organizatorem konkursu jest Roman Dąbal, dalej określany jako „organizator”.</li>
                    <li>Warunkiem udziału w konkursie jest zarejestrowanie się w aplikacji konkursowej, dostępnej pod
                        adresem https://www.qrcontest.gniezno.pl.
                    </li>
                    <li>W konkursie może wziąć udział każdy uczestnik konwentu.</li>
                    <li>Zwycięzca to osoba, która uzyskała odpowiednią ilość punktów do momentu rozstrzygnięcia danej
                        tury konkursu. W każdej turze troje uczestników z największą ilością punktów uzyska tytuł
                        zwycięzcy oraz nagrody o wartości zależnej od uzyskanego miejsca.
                    </li>
                    <li>W konkursie nagrodzonych zostanie sumarycznie 6 osób.</li>
                    <li>W razie uzyskania przez dwoje uczestników tej samej ilości punktów, osoba która pierwsza zdobyła
                        decydujące punkty jest uznawana za mającą przewagę. Kto pierwszy, ten lepszy.
                    </li>
                    <li>Nagrody to waluta konwentowa, uczestnicy mogą wymienić ją na dowolny przedmiot w sklepiku
                        konwentowym.
                    </li>
                    <li>Nagrody będzie można odebrać w punkcie informacyjnym konwentu po zakończeniu każdej z tur
                        konkursu.
                    </li>
                    <li>By odebrać nagrodę należy potwierdzić, że jest się właścicielem konta, które znalazło się w
                        gronie zwycięzców. Można to osiągnąć przez pokazanie aplikacji zalogowanej na konto uczestnika,
                        na ekranie musi być widoczne imię/pseudonim uczestnika oraz ilość uzyskanych punktów. Nagrodę
                        można odebrać również pokazując opaskę uczestnika konwentu (pod warunkiem, że kod z opaski
                        został wpisany do aplikacji podczas rejestracji).
                    </li>
                    <li>Konkurs podzielony jest na dwie tury. Pierwsza tura trwa od 17:00 15/07/2022 do 14:00
                        16/07/2022, druga od 14:00 16/07/2022 do 12:00 17/07/2022.
                    </li>
                    <li>Uczestnicy nagrodzeni w turze pierwszej nie będą brani pod uwagę przy wyłanianiu zwycięzców w
                        turze drugiej.
                    </li>
                    <li>Konto użytkownika może zostać zablokowane, gdy uczestnik korzysta z pseudonimu, który może
                        zostać uznany za niecenzuralny lub nieodpowiedni.
                    </li>
                    <li>Konto użytkownika może zostać zablokowane, gdy uczestnik jest podejrzany o podejmowanie działań
                        niezgodnych z regulaminem.
                    </li>
                    <li>Niszczenie kodów QR, ich przenoszenie lub przywłaszczanie jest zabronione i grozi
                        dyskwalifikacją.
                    </li>
                    <li>W przypadku zauważenia, że któryś z konkursowych kodów został uszkodzony uprasza się o kontakt z
                        organizatorem. Sposoby kontaktu opisane są w sekcji pomocy aplikacji konkursowej.
                    </li>
                    <li>Aplikacja do celów realizacji konkursu zbiera dane takie jak: Imię/Pseudonim uczestnika, kod
                        opaski akredytacyjnej, informacje o zgromadzonych kodach, informacje o odpowiedziach na pytania.
                    </li>
                    <li>Aplikacja korzysta z plików cookie.</li>
                    <li>Organizator zobowiązuje się do przyłożenia wszelkich możliwych starań do zapewnienia
                        bezpieczeństwa i stabilności działania aplikacji konkursowej. Ewentualne błędy w jej działaniu,
                        czasowa niedostępność lub długie czasy ładowania nie są podstawą do roszczeń. W razie wykrycia
                        nieprawidłowości uprasza się o kontakt z organizatorem.
                    </li>
                    <li>Organizator zastrzega sobie prawo do rozstrzygnięcia spraw, które nie mogą zostać rozstrzygnięte
                        poprzez regulamin w sposób jednoznaczny.
                    </li>
                </ol>
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
