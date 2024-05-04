
import logoImage from '../assets/guardstar_logo.jpg'


const MainLayout = (props) => {
    const { children, layout } = props;

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <div className="container lg:mx-auto flex min-h-screen">
            <div className="w-[300px] min-w-[250px] relative bg-navbar p-5 flex justify-center ">
                <ul className="mt-[100px] uppercase text-white text-[20px] text-center">
                    <li className={`py-4 cursor-pointer ${layout == 'home' ? 'text-yellowFont' : ''} `}>
                        <a href="/home"> Home</a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'open' ? 'text-yellowFont' : ''} `}>
                        <a href="/open"> Opening Checks </a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'close' ? 'text-yellowFont' : ''} `}>
                        <a href="/close"> Closing Checks </a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'temperatures' ? 'text-yellowFont' : ''} `}>
                        <a href="/temperatures"> Temperatures </a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'team' ? 'text-yellowFont' : ''} `}>
                        <a href="/team">  Team </a>
                    </li>
                    {/* <li className={`py-4 cursor-pointer ${layout == 'information' ? 'text-yellowFont' : ''} `}>
                        <a href="/information"> Information </a>
                    </li> */}
                    <li className={`py-4 cursor-pointer ${layout == 'incidents' ? 'text-yellowFont' : ''} `}>
                        <a href="/incidents"> Incidents </a> </li>
                    <li className={`py-4 cursor-pointer ${layout == 'reports' ? 'text-yellowFont' : ''} `}>
                        <a href="/reports"> Reports </a>
                    </li>
                    {/* <li className={`py-4 cursor-pointer ${layout == 'allergy' ? 'text-yellowFont' : ''} `}>
                        <a href="/allergy"> Allergy Check </a>
                    </li> */}
                    <li className={`py-4 cursor-pointer ${layout == 'settings' ? 'text-yellowFont' : ''} `}>
                        <a href="/settings"> Settings </a>
                    </li>
                    <li className={`py-4 cursor-pointer`} onClick={()=>logout()}>
                        <a href="/settings"> Logout </a>
                    </li>
                </ul>
                <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2">
                    <img src={logoImage} alt="logoImage" />
                </div>
            </div>
            <div className="flex-1 p-[70px]">
                {children}
            </div>

        </div>
    )
}

export default MainLayout