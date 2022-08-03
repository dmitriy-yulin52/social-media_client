import * as React from 'react';
import './Posts.scss'
import {PostsData} from '../../data/PostsData'
import {Post} from "../Post/Post";

type Props = {};
export const Posts = (props: Props) => {
    return (
        <div className={'Posts'}>
            {PostsData.map((post, index) => {
                return <Post key={index} data={post} id={index}/>
            })}
        </div>
    );
};