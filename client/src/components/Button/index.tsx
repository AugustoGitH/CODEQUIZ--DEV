
import { useNavigate } from "react-router-dom"
import * as B from "./styles"

interface IPropsButton{
    size?: "small" | "medium" | "large",
    href?: string,
    children: string,
    color: "info" | "dark" | "danger" | "success",
    hoverEffect?: "bkg-bd" | "bd-bkg",
}





export default function Button({
    size = "small", 
    href, children, color = "info", hoverEffect = "bkg-bd",
    ...rest
}: IPropsButton){
    const navigate = useNavigate()
    return (
        <B.Button
            size={size}
            color={color}
            hoverEffect={hoverEffect}
            { ...( href ? {onClick: ()=> navigate(href)} : {})   }
            {...rest}
        >
            {children} 
        </B.Button>
    )

}