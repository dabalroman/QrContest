import React, { useEffect, useState } from 'react';
import { Button, createStyles, MantineTheme, SegmentedControl, TextInput } from '@mantine/core';
import { useForceUpdate, useForm } from '@mantine/hooks';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { ColorfulIconClass, TileClass } from './Style';
import UserModel from '../Model/UserModel';
import Model from '../Model/Model';
import ThemeHelper from '../Utils/ThemeHelper';
import Navbar from '../Components/Navbar';
import Routes from './routes';

// eslint-disable-next-line @typescript-eslint/typedef
const useStyles =
    createStyles((theme: MantineTheme) => ({
        form: {
            marginBottom: 20,
            width: '100%',
            display: 'grid',
            gridGap: 10,
            backgroundColor: ThemeHelper.getBackgroundColor(theme),
            padding: 16,
            borderRadius: 20,

            '> h2': {
                margin: 0,
                textAlign: 'center'
            }
        },

        ...TileClass(theme),
        ...ColorfulIconClass(theme)
    })) as Function;

export default function UserView () {
    const { classes } = useStyles();
    const forceUpdate: Function = useForceUpdate();
    const navigate: NavigateFunction = useNavigate();

    const { userId } = useParams();

    const [userModel, setUserModel] = useState<UserModel | null>(null);

    interface FormValues {
        name: string;
        braceletId: string;
        isPublic: number;
        isSuspended: number;
    }

    const {
        onSubmit,
        values,
        getInputProps
    } = useForm<FormValues>({
        initialValues: {
            name: '',
            braceletId: '',
            isPublic: 0,
            isSuspended: 0
        }
    });

    const save = () => {
        if (userModel === null) {
            return;
        }

        userModel.name = values.name;
        userModel.braceletId = values.braceletId;
        userModel.isPublic = values.isPublic;
        userModel.isSuspended = values.isSuspended;

        userModel.put()
            .then(() => alert('Ok'))
            .catch(() => alert('Error'));
    };

    useEffect(() => {
        if (!userId || userId === '') {
            return;
        }

        UserModel.get(userId)
            .then((model: Model) => model as UserModel)
            .then((tempUserModel: UserModel) => {
                setUserModel(tempUserModel);
                values.name = tempUserModel.name;
                values.braceletId = tempUserModel.braceletId;
                values.isPublic = tempUserModel.isPublic;
                values.isSuspended = tempUserModel.isSuspended;
            });
    }, []);

    /* eslint-disable react/jsx-props-no-spreading */
    // noinspection TypeScriptValidateTypes
    return (
        <div>
            <Navbar/>
            <div className={classes.tile}>
                <form className={classes.form} onSubmit={onSubmit(save)}>
                    <h2>{userModel?.name}#{userModel?.braceletId}</h2>
                    <h2>{userModel?.score} pkt</h2>

                    <TextInput
                        required
                        label="Nazwa użytkownika"
                        placeholder="Nazwa użytkownika"
                        {...(getInputProps('name'))}
                    />

                    <TextInput
                        required
                        label="Id opaski"
                        placeholder="Id opaski"
                        {...(getInputProps('braceletId'))}
                    />

                    <small>Konto zawieszone?</small>
                    <SegmentedControl
                        value={`${values.isSuspended}`}
                        onChange={(value: string) => {
                            values.isSuspended = parseInt(value, 10);
                            forceUpdate();
                        }}
                        data={[
                            {
                                label: 'Tak',
                                value: '1'
                            },
                            {
                                label: 'Nie',
                                value: '0'
                            }
                        ]}
                    />

                    <small>Konto publiczne?</small>
                    <SegmentedControl
                        value={`${values.isPublic}`}
                        onChange={(value: string) => {
                            values.isPublic = parseInt(value, 10);
                            forceUpdate();
                        }}
                        data={[
                            {
                                label: 'Tak',
                                value: '1'
                            },
                            {
                                label: 'Nie',
                                value: '0'
                            }
                        ]}
                    />

                    <Button type="submit" color="yellow">Zapisz</Button>
                </form>

                <Button
                    fullWidth
                    onClick={() => navigate(Routes.dashboard, { replace: true })}
                >
                    Powrót
                </Button>
            </div>
        </div>
    );
}
