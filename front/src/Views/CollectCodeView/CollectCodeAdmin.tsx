import React, { useEffect, useState } from 'react';
import { Button, createStyles, MantineTheme, NumberInput, SegmentedControl, Switch, TextInput } from '@mantine/core';
import { useForceUpdate, useForm } from '@mantine/hooks';
import { ColorfulIconClass } from '../Style';
import CodeModel from '../../Model/CodeModel';
import Model from '../../Model/Model';
import ThemeHelper from '../../Utils/ThemeHelper';

export type CollectCodeAdminProps = { code: string | null };

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

        ...ColorfulIconClass(theme)
    })) as Function;

export default function CollectCodeAdmin (props: CollectCodeAdminProps) {
    const { classes } = useStyles();
    const forceUpdate: Function = useForceUpdate();

    const [codeModel, setCodeModel] = useState<CodeModel | null>(null);

    interface FormValues {
        name: string;
        description: string;
        is_active: number;
        with_question: number;
        points: number;
    }

    const {
        onSubmit,
        values,
        getInputProps
    } = useForm<FormValues>({
        initialValues: {
            name: '',
            description: '',
            is_active: 1,
            with_question: 0,
            points: 0
        }
    });

    const save = () => {
        if (codeModel === null) {
            return;
        }

        codeModel.name = values.name;
        codeModel.description = values.description;
        codeModel.isActive = values.is_active;
        codeModel.points = values.points;
        codeModel.withQuestion = values.with_question;

        codeModel.put()
            .then(() => alert('Ok'))
            .catch(() => alert('Error'));
    };

    useEffect(() => {
        if (!props.code) {
            return;
        }

        CodeModel.get(props.code)
            .then((model: Model) => model as CodeModel)
            .then((tempCodeModel: CodeModel) => {
                setCodeModel(tempCodeModel);
                values.name = tempCodeModel.name;
                values.description = tempCodeModel.description;
                values.is_active = tempCodeModel.isActive;
                values.points = tempCodeModel.points;
                values.with_question = tempCodeModel.withQuestion;
            });
    }, []);

    /* eslint-disable react/jsx-props-no-spreading */
    // noinspection TypeScriptValidateTypes
    return (
        <div>
            <form className={classes.form} onSubmit={onSubmit(save)}>
                <h2>{codeModel?.data}</h2>
                <TextInput
                    required
                    label="Nazwa (Widoczna dla wszystkich)"
                    placeholder="Nazwa kodu"
                    {...(getInputProps('name'))}
                />

                <TextInput
                    required
                    label="Opis (Admin only)"
                    placeholder="Opis"
                    {...(getInputProps('description'))}
                />

                <NumberInput
                    required
                    label="Punkty"
                    placeholder="Punkty"
                    {...(getInputProps('points'))}
                />

                <small>Pytanie?</small>
                <SegmentedControl
                    value={`${values.with_question}`}
                    onChange={(value: string) => { values.with_question = parseInt(value, 10); forceUpdate(); }}
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

                <small>Aktywny?</small>
                <SegmentedControl
                    value={`${values.is_active}`}
                    onChange={(value: string) => { values.is_active = parseInt(value, 10); forceUpdate(); }}
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
        </div>
    );
}
