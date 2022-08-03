import * as React from 'react';
import './PostSide.scss'
import {PostShare} from "../PostShare/PostShare";
import {Posts} from "../Posts/Posts";

type Props = {};
export const PostSide = (props: Props) => {
    return (
        <div className={'PostSide'}>
            <PostShare/>
            <Posts/>
        </div>
    );
};