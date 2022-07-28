import s from './Profile.module.css'
import avatar from './Sample_User_Icon.png'
import SuperButton from '../../common/SuperComponents/c2-SuperButton/SuperButton';
import {ProfileType} from "./profileReducer";
import {useDispatch} from "react-redux";


type ProfilePropsType = {
    profile:ProfileType
    logOut:()=>void
}

const Profile: React.FC<ProfilePropsType> = ({profile, logOut}) => {
    const dispatch = useDispatch()



    return (
        <div className={s.profileBox}>
            <SuperButton onClick={logOut}>Log Out</SuperButton>
            <div>
                <div className={s.avatarBox}>
                    <img className={s.avatar} src={avatar}/>
                </div>
            </div>
            <div className={s.wrap}>
                <p className={s.name}>Hello, <span className={s.userName}>{profile.name}</span></p>
                <p className={s.packs}>You have {profile.publicCardPacksCount}</p>
            </div>
        </div>
    )
}

export default Profile