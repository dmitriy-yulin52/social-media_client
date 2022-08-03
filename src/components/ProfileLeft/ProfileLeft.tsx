import * as React from 'react';
import {LogoSearch} from "../logoSearch/LogoSearch";
import {FollowersCard} from "../FollowersCard/FollowersCard";
import {InfoCard} from "../InfoCard/InfoCard";
import '../profileSide/ProfileSide.scss'

type ProfileLeftProps = {

};
export const ProfileLeft = (props: ProfileLeftProps) => {
    return (
        <div className={'ProfileSide'}>
            <LogoSearch/>
            <InfoCard/>
            <FollowersCard/>
        </div>
    );
};