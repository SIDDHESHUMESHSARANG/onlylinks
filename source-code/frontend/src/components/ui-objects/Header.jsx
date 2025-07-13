import { FiGithub } from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";
import ThemeSwitch from "./ThemeSwitch";
export default function Header() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
            <h1 className="title scroll-m-20 text-left text-3xl font-bold tracking-normal text-balance m-[20px]">
            Only<span style={{color: "#c0c0c0"}}>Links</span>
            </h1>
            <ThemeSwitch />
            <a href="https://github.com/SIDDHESHUMESHSARANG/onlylinks" target="blank">
                <FiGithub 
                    className="github mt-[20px] hover:text-[#ccc] transition cursor-pointer" 
                    size={35}
                    title="Source code of this project" 
                    style={{
                        marginLeft: "960px"
                    }}/>
            </a>

            <a href="https://github.com/SIDDHESHUMESHSARANG/onlylinks/blob/main/documentation/support.md" target="blank">
            <BiDonateHeart
                className="donate mt-[20px] ml-[20px] cursor-pointer hover:text-[#ccc] transition"
                size={35}
                title="Support the project"
            />
            </a>
            <a 
                className="docs hover:underline active:text-[#c0c0c0]" 
                target="blank"
                href="https://github.com/SIDDHESHUMESHSARANG/onlylinks/blob/main/README.md" 
                style={{
                    margin: "25px",
                    marginLeft: "20px"
                }}>
                Documentation
            </a>
        </div>
    )
}