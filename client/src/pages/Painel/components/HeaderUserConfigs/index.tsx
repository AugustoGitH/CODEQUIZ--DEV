import { useEffect, useState } from "react"
import ProfilePictureSelection from "../../../../components/ProfilePictureSelection"
import * as S from "./styles"


interface IPropsHeaderUserConfigs{
  imgProfile: string
}

const HeaderUserConfigs = ({ imgProfile }: IPropsHeaderUserConfigs)=>{
  const [showSelectImage, setShowSelectImage] = useState(false)
  const [imageProfile, setImageProfile] = useState(imgProfile)

  useEffect(()=>{
    setImageProfile(imgProfile)
  }, [imgProfile])

  return (
    <S.HeaderUserConfigs>
      <ProfilePictureSelection 
        show={showSelectImage}
        onClose={()=> setShowSelectImage(false)}
        onReplaceProfile={(img)=> setImageProfile(img)}
      />
      <div className="image-profile-user" onClick={()=> setShowSelectImage(true)}>
        <img src={imageProfile} alt="image-user"/>
      </div>
      <div className="nav-buttons">
        <button className="button-trophy"><i className='bx bxs-trophy'></i></button>
        <button className="button-stats"><i className='bx bx-stats'></i></button>
        <button className="button-config"><i className='bx bxs-cog'></i></button>
      </div>
    </S.HeaderUserConfigs>
  )
}


export default HeaderUserConfigs