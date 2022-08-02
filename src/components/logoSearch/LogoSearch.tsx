import * as React from 'react';
import './LogoSearch.scss'
import logo from '../../assets/img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'





type Props = {};
export const LogoSearch = (props: Props) => {
    return (
        <div className={'LogoSearch'}>
            <img src={logo} alt={'logo'}/>
            <div className="Search">
                <input type="text" placeholder={'Поиск'}/>
                <div className="s-icon">
                    <UilSearch/>
                </div>
            </div>
        </div>
    );
};