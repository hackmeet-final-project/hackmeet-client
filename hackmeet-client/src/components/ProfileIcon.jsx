import { Menu, MenuItem, MenuButton, Button , MenuList, Image} from "@chakra-ui/react"
import { useContext } from "react"
import ShakeContext from "../context/ShakeContext"

const ProfileIcon = () => {
    const { profileImage, setProfileImage } = useContext(ShakeContext)
    const handleChangeProfile = (event) => {
        setProfileImage(event.target.src)
    }
 
    return (
    <Menu >
        <MenuButton className="border border-white border-2 rounded-circle bg-white shadow-secondary" style={{height:"auto"}}>
            <Image
                boxSize='5rem'
                borderRadius='full'
                src={profileImage}
            />
        </MenuButton>
        <MenuList className="d-flex justify-content-center"  style={{width: "auto"}}>
            <MenuItem style={{width: "auto"}}>
                <Image
                    onClick={handleChangeProfile}
                    boxSize='5rem'
                    borderRadius='full'
                    src='https://cdn.discordapp.com/attachments/1131882116976742410/1136135589851316275/Icon4.png'
                />
            </MenuItem>
            <MenuItem style={{width: "auto"}}> 
                <Image
                    onClick={handleChangeProfile}
                    boxSize='5rem'
                    borderRadius='full'
                    src='https://cdn.discordapp.com/attachments/1131882116976742410/1136134878287626250/Icon2.png'
                />
            </MenuItem>
            <MenuItem style={{width: "auto"}}> 
                <Image
                    onClick={handleChangeProfile}
                    boxSize='5rem'
                    borderRadius='full'
                    src='https://cdn.discordapp.com/attachments/1131882116976742410/1136135228352634962/Icon3.png'
                />
            </MenuItem>
            <MenuItem style={{width: "auto"}}> 
                <Image
                    onClick={handleChangeProfile}
                    boxSize='5rem'
                    borderRadius='full'
                    src='https://cdn.discordapp.com/attachments/1131882116976742410/1136145104336339046/IconTai.png'
                />
            </MenuItem>
        </MenuList>
    </Menu>
    )
}

export default ProfileIcon