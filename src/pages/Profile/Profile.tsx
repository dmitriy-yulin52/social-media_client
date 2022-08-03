import * as React from 'react';
import './Profile.scss'
import {ProfileLeft} from "../../components/ProfileLeft/ProfileLeft";
import {ProfileCard} from "../../components/ProfileCard/ProfileCard";
import {PostSide} from "../../components/PostSide/PostSide";
import {RightSide} from "../../components/RightSide/RightSide";

type ProfileProps = {

};
export const Profile = (props: ProfileProps) => {
    return (
        <div className={'Profile'}>
            <ProfileLeft/>
            <div className="Profile-center">
                <ProfileCard/>
                <PostSide/>
            </div>
            <RightSide/>
        </div>
    );
};