import * as React from 'react';
import './Auth.scss'
import Logo from '../../assets/img/logo.png'
import {memo} from "react";

type Props = {};
export const Auth = (props: Props) => {
    return (
        <div className={'Auth'}>
            <div className="a-left">
                <img src={Logo} alt="Logo"/>
                <div className="Webname">
                    <h1>Gorky 52</h1>
                    <h6>Исследуйте идеи по всему миру</h6>
                </div>
            </div>
            {/*<SignUp/>*/}
            <SignIn/>
        </div>
    );
};


function SignUpImpl() {
    return <div className={'a-right'}>
        <form className={'infoForm authForm'}>
            <h3>Регистрация</h3>
            <div>
                <input type="text" placeholder={'Имя'} className={'infoInput'} name={'firstname'}/>
                <input type="text" placeholder={'Фамилия'} className={'infoInput'} name={'lastname'}/>
            </div>
            <div>
                <input type="text" className="infoInput" placeholder={'Никнейм'} name={'username'}/>
            </div>
            <div>
                <input type="text" className="infoInput" name={'password'} placeholder={'Пароль'}/>
                <input type="text" className="infoInput" name={'confirmPassword'} placeholder={'Подтвердить пароль'}/>
            </div>
            <div className={'infoText'}>
                <span>У вас уже есть учетная запись</span>
            </div>
            <button className={'button infoButton'} type={'submit'}>Регистрация</button>

        </form>
    </div>
}

const SignUp = memo(SignUpImpl);


function SignInImpl() {
    return <div className={'a-right'}>
        <form className={'infoForm authForm'}>
            <h3>Войти</h3>

            <div>
                <input
                    type="text"
                    placeholder={'Имя или email'}
                    className={'infoInput'}
                    name={'username'}
                />
            </div>
            <div>
                <input
                    type={'password'}
                    className={'infoInput'}
                    placeholder={'Пароль'}
                    name={'password'}
                />
            </div>
            <div className={'infoText'}>
                <span>У вас нет учетной записи для регистрации</span>
            </div>
            <button className={'button infoButton'} type={'submit'}>Войти</button>
        </form>
    </div>
}

const SignIn = memo(SignInImpl);