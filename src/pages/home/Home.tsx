import * as React from 'react';
import './Home.scss'
import {ProfileSide} from "../../components/profileSide/ProfileSide";
import {PostSide} from "../../components/PostSide/PostSide";

type Props = {};


export const Home = (props: Props) => {
    return (
        <div className={'Home'}>
            <ProfileSide/>
            <PostSide/>
            <div className={'rightSide'}>RightSide</div>
        </div>
    );
};