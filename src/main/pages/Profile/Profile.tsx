import s from './Profile.module.css'
import avatar from './Sample_User_Icon.png'
import SuperButton from '../../common/SuperComponents/c2-SuperButton/SuperButton';
import {ProfileType} from "./profileReducer";
import React from "react";


type ProfilePropsType = {
    profile:ProfileType
    logOutHandler:()=>void
}

const Profile: React.FC<ProfilePropsType> = ({profile, logOutHandler}) => {

let CardsMessage = profile.publicCardPacksCount === 0
    ? `You don't have any cards yet`
    : `Count cards you have is ${profile.publicCardPacksCount}`


    return (
        <div className={s.profileBox}>
            <SuperButton onClick={logOutHandler}>Log Out</SuperButton>
            <div>
                <div className={s.avatarBox}>
                    <img className={s.avatar} src={avatar}/>
                </div>
            </div>
            <div className={s.wrap}>
                <p className={s.name}>Hello, <span className={s.userName}>{profile.name}</span></p>
                <p className={s.packs}>{CardsMessage}</p>
            </div>
        </div>
    )
};

export default Profile