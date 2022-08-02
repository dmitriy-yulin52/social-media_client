import * as React from 'react';
import './Home.scss'
import {ProfileSide} from "../../components/profileSide/ProfileSide";

type Props = {};


export const Home = (props: Props) => {
    return (
        <div className={'Home'}>
            <ProfileSide/>
            <div className={'postSide'}>Posts</div>
            <div className={'rightSide'}>RightSide</div>
        </div>
    );
};