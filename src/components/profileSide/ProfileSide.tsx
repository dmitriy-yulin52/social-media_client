import * as React from 'react';
import './ProfileSide.scss'
import {LogoSearch} from "../logoSearch/LogoSearch";
import {ProfileCard} from "../ProfileCard/ProfileCard";

type Props = {};
export const ProfileSide = (props: Props) => {
    return (
        <div className={'ProfileSide'}>
            <LogoSearch/>
            <ProfileCard/>
        </div>
    );
};