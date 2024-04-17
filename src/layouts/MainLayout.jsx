
import logoImage from '../assets/guardstar_logo.jpg'


const MainLayout = (props) => {
    const { children, layout } = props;

    return (
        <div className="container mx-auto h-[100vh] flex ">
            <div className="w-[300px] relative bg-navbar p-5 flex justify-center items-center">
                <ul className="uppercase text-white text-[20px] text-center">
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
                    <li className={`py-4 cursor-pointer ${layout == 'information' ? 'text-yellowFont' : ''} `}>
                        <a href="/information"> Information </a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'incidents' ? 'text-yellowFont' : ''} `}>
                        <a href="/incidents"> Incidents </a> </li>
                    <li className={`py-4 cursor-pointer ${layout == 'reports' ? 'text-yellowFont' : ''} `}>
                        <a href="/reports"> Reports </a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'allergy' ? 'text-yellowFont' : ''} `}>
                        <a href="/allergy"> Allergy Check </a>
                    </li>
                    <li className={`py-4 cursor-pointer ${layout == 'settings' ? 'text-yellowFont' : ''} `}>
                        <a href="/settings"> Settings </a>
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