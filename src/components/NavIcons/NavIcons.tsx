import * as React from 'react';
import {FC, ReactElement} from "react";
import {Link} from "react-router-dom";
import Home from "../../assets/img/home.png";
import {UilSetting} from "@iconscout/react-unicons";
import Noti from "../../assets/img/noti.png";
import Comment from "../../assets/img/comment.png";
import './NavIcons.scss'

type NavIconsProps = {};
export const NavIcons: FC = (props: NavIconsProps): ReactElement => {
    return (
        <div className="navIcons">
            <Link to={'../home'}>
                <img src={Home} alt="Home"/>
            </Link>
            <UilSetting/>
            <img src={Noti} alt="Notifications"/>
            <Link to={'/chat'}>
                <img src={Comment} alt="Comment"/>
            </Link>
        </div>
    );
};