/* eslint-disable max-len */
import { useEffect, useState } from "react"
import * as S from "./styles"
import useFetchGetProfilePictureOptions from "../../queries/user/user/getProfilePictureOptions"
import LoaderSpinner from "../LoaderSpinner"
import changeProfilePictureService from "../../services/user/user/ChangeProfilePicture"

interface IPropsProfilePictureSelection {
  show: boolean,
  onClose: ()=> void,
  onReplaceProfile: (swappedImage: string)=> void
}

const ProfilePictureSelection = ({ show, onClose, onReplaceProfile }: IPropsProfilePictureSelection)=>{
  const [imagesOptions, setImagesOptions] = useState<string[] | null>(null)
  const [imageSelected, setImageSelected] = useState("")
  const [loading, setLoading] = useState(false)
  const { data: optionsData, isFetching } = useFetchGetProfilePictureOptions()

  useEffect(()=>{
    if(optionsData){
      setImagesOptions(optionsData)
    }
  }, [optionsData])

  useEffect(()=>{
    document.body.classList[show ? "add" : "remove"]("overflowY-none")
  }, [show])

  const handleSelectImageProfile = ()=>{
    if(!imageSelected) return
    setLoading(true)
    changeProfilePictureService(imageSelected).then(({ message, status })=>{
      setImageSelected("")
      setLoading(false)
      if(!status){
        alert(message)
      }else{
        onReplaceProfile(imageSelected)
        onClose()
      }
    })
  }

  return show ? (
    <S.ProfilePictureSelection>
      <div className="selection-card">
        {
          !imageSelected ? (
            <>
              <h3>Selecione a imagem para o seu perfil</h3>
              <ul className="images-options">
              {
                imagesOptions?.map((image, index)=>(
                  <li 
                    onClick={()=> setImageSelected(image) } 
                    key={index}
                  >
                      <img alt={index + ""} src={image}/>
                  </li>
                ))
              }
              {
                isFetching && (
                  <LoaderSpinner/>
                )
              }
              </ul>
              <button className="button-close" onClick={onClose}>Sair</button>
            </>
          ) : (
            <>
              <img className="image-selected" src={imageSelected}/>
              <button 
                onClick={handleSelectImageProfile} 
                className="button-select-image"
                style={{pointerEvents: loading? "none" : "auto"}}
              > Mudar imagem de perfil </button>
              <button 
                className="button-close-focus"
                style={{pointerEvents: loading? "none" : "auto"}}
                onClick={()=> setImageSelected("") }
                >{loading ? "Alterando imagem..." : "Voltar"}</button>
            </>
          )
        }
      </div>
    </S.ProfilePictureSelection>
  ) : <></>
}

export default ProfilePictureSelection