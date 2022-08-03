import * as React from 'react';
import './TrendCard.scss'
import {TrendData} from "../../data/TrendData";

type TrendCardProps = {

};
export const TrendCard = (props: TrendCardProps) => {
    return (
        <div className={'TrendCard'}>
            <h3>Тренды для вас </h3>

            {TrendData.map((trend,index)=>{
                return <div className={'trend'} key={index}>
                    <span>#{trend.name}</span>
                    <span>{trend.shares}K shares</span>
                </div>
            })}
        </div>
    );
};