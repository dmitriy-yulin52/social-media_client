import * as React from 'react';
import {ChangeEvent, FormEvent, memo, MouseEvent, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import './Auth.scss'
import Logo from '../../assets/img/logo.png'
import {classnames} from "../../utils/classnames";
import {authActions} from "../../store/reducers/auth/auth-actions";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";

type Props = {};


const data = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
}

export type FormDataType = {
    [Property in keyof typeof data]: string
}

export const Auth = (props: Props): ReactElement => {

    const {isLoading} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()


    const [isSignUp, setIsSignUp] = useState<boolean>(true)
    const [confirmPass, setConfirmPass] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormDataType>(data)


    const memomizeArrError: boolean[] = useMemo(() => {
        const arr: boolean[] = []
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                arr.push(!value)
            }
        })
        return arr
    }, [formData])



    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        if (confirmPass) {
            setConfirmPass(false)
        }
        if (error) {
            setError(false)
        }

    }, [setFormData, confirmPass, setConfirmPass, error, setError])

    const onClickSetIsSignUp = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsSignUp(!isSignUp)
    }, [setIsSignUp, isSignUp])

    const resetFormDataHandler = useCallback(() => {
        setConfirmPass(false)
        setFormData({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmPassword: '',
        })
    }, [setFormData])


    const onRegister = useCallback(() => {
        dispatch(authActions.register(formData))
        // resetFormDataHandler()
    }, [dispatch])

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setConfirmPass(false)
        const someError = Object.entries(formData).some(([key, value]) => !value)
        if (isSignUp) {
            formData.password === formData.confirmPassword ? dispatch(authActions.register(formData)) : setConfirmPass(true)
            if (someError) {
                setError(true)
            }
        } else {
            if (!formData.username || !formData.password) {
                setError(true)
            } else {
                dispatch(authActions.login({
                    password: formData.password,
                    username: formData.username
                }))
                // resetFormDataHandler()
            }
        }
    }, [setConfirmPass, isSignUp, formData, dispatch, setError])


    useEffect(() => {
        setConfirmPass(false)
        setFormData({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmPassword: '',
        })
        setError(false)
    }, [isSignUp])



    return (
        <div className={'Auth'}>
            <div className="a-left">
                <img src={Logo} alt="Logo"/>
                <div className="Webname">
                    <h1>Gorky 52</h1>
                    <h6>Исследуйте идеи по всему миру</h6>
                </div>
            </div>
            <FormComponent
                error={error}
                handleSubmit={handleSubmit}
                confirmPass={confirmPass}
                onChangeHandler={onChangeHandler}
                isSignUp={isSignUp}
                onSetIsSignUp={onClickSetIsSignUp}
                formData={formData}
                dataErr={memomizeArrError}
                isLoading={isLoading}
            />
        </div>
    );
};

type RegisterComponentImplProps = {
    isSignUp: boolean
    confirmPass: boolean
    error: boolean
    isLoading: boolean
    onSetIsSignUp: (e: MouseEvent<HTMLAnchorElement>) => void
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    formData: FormDataType
    dataErr: boolean[]
}

function FormComponentImpl(props: RegisterComponentImplProps): ReactElement {

    const {
        isSignUp,
        onSetIsSignUp,
        onChangeHandler,
        confirmPass,
        handleSubmit,
        error,
        formData,
        dataErr,
        isLoading
    } = props



    return <form className={'infoForm authForm'} onSubmit={handleSubmit}>
        <h3>{isSignUp ? 'Регистрация' : 'Войти'}</h3>
        {isSignUp && <div>
            <input
                onChange={onChangeHandler}
                type="text"
                placeholder={'Имя'}
                className={classnames(['infoInput'], error && !formData.firstname, 'infoInputError')}
                name={'firstname'}
                value={formData.firstname}

            />
            <input
                onChange={onChangeHandler}
                type="text"
                placeholder={'Фамилия'}
                className={classnames(['infoInput'], error && !formData.lastname, 'infoInputError')}
                name={'lastname'}
                value={formData.lastname}
            />
        </div>}
        <div>
            <input
                onChange={onChangeHandler}
                type="text"
                className={classnames(['infoInput'], error && !formData.username, 'infoInputError')}
                placeholder={'Никнейм'}
                name={'username'}
                value={formData.username}
            />
        </div>
        <div>
            <input
                onChange={onChangeHandler}
                type="password"
                className={classnames(['infoInput'], error && !formData.password, 'infoInputError')}
                name={'password'}
                placeholder={'Пароль'}
                value={formData.password}
            />
            {isSignUp &&
                <input
                    onChange={onChangeHandler}
                    type="password"
                    className={classnames(['infoInput'], error && !formData.confirmPassword, 'infoInputError')}
                    name={'confirmPassword'}
                    placeholder={'Подтвердить пароль'}
                    value={formData.confirmPassword}
                />}
        </div>
        {isSignUp && confirmPass && <span className={confirmPass ? 'confirmSpan' : ''}>
            Подтвердите пароль
        </span>}
        {error && <span
            className={error ? 'confirmSpan' : ''}>{dataErr.length > 1 ? 'Заполните поля!' : 'Заполните поле!'}</span>}
        <div className={'infoText'}>
            <a href={'/'}
               onClick={onSetIsSignUp}><span>{isSignUp ? 'У вас уже есть учетная запись!' : 'У вас нет учетной записи?'}</span></a>
        </div>
        <button disabled={isLoading} className={'button infoButton'}
                type={'submit'}>{isLoading ? 'Загрузка...' :isSignUp ? 'Регистрация' : 'Войти'}</button>

    </form>
}

const FormComponent = memo(FormComponentImpl);


