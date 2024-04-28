
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClosingCheckStatus, getOpeningCheckStatus } from "../action/checklist";
import { getIncident } from "../action/team";
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [checkOpening, setCheckOpening] = useState(false);
    const [checkClosing, setCheckClosing] = useState(false);
    const [checkIncident, setCheckIncident] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
        
                // Dispatch the first async action and wait for it to complete
                const OpeningStatus = await dispatch(getOpeningCheckStatus(userData._id));

                // Dispatch the second async action and wait for it to complete
                const ClosingStatus = await dispatch(getClosingCheckStatus(userData._id));

                const IncidentStatus = await dispatch(getIncident(userData._id));

                // Any code you want to run after both actions have completed
                setCheckOpening(OpeningStatus);
                setCheckClosing(ClosingStatus);
                if(IncidentStatus.length > 0) {
                    setCheckIncident(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the async function defined inside useEffect
        fetchData();
    },[])

    const gotoOpen = () => {
        navigate('/open')
    }
    const gotoClose = () => {
        navigate('/close')
    }
    const gotoIncident = () => {
        navigate('/incidents')
    }
    return (
        <>
             <div className="flex justify-center">
                <div className="w-[550px] flex justify-between">
                    <Button 
                        size="normal" 
                        name="Opening Checks" 
                        variant={`${checkOpening? 'secondary-normal' : 'primary-normal'}`} />
                    <Button 
                        size="small" 
                        name={`${checkOpening? 'Complete' : 'Click To Fill'}`} 
                        variant={`${checkOpening? 'secondary-small' : 'primary-small'}`}
                        handleChange={ checkOpening? undefined : gotoOpen }
                    />
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <div className="w-[550px] flex justify-between">
                    <Button 
                        size="normal" 
                        name="Closing Checks" 
                        variant={`${checkClosing? 'secondary-normal' : 'primary-normal'}`} /> 
                    <Button 
                        size="small" 
                        name={`${checkClosing? 'Complete' : 'Click To Fill'}`} 
                        variant={`${checkClosing? 'secondary-small' : 'primary-small'}`} 
                        handleChange={ checkClosing? undefined : gotoClose }
                    />
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <div className="w-[550px] flex justify-between">
                    <Button 
                        size="normal" 
                        name="Incidents - Add" 
                        variant={`${checkIncident? 'secondary-normal' : 'primary-normal'}`}
                    />
                    <Button 
                        size="small" 
                        name={`${checkIncident? 'Complete' : 'Click To Fill'}`}
                        variant={`${checkIncident? 'secondary-small' : 'primary-small'}`}
                        handleChange={ checkIncident? undefined : gotoIncident }
                    />
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-[600px] flex justify-between flex-wrap">
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>

                </div>
            </div>
        </>

    )
}

export default Home;