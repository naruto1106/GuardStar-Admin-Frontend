
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getClosingChecklist, getOpeningChecklist } from "../reducer/ChecklistSlice";
import { getClosinglist, getOpeninglist } from "../action/checklist";
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getOpeningCheck = useSelector(getOpeningChecklist);
    const getClosingCheck = useSelector(getClosingChecklist);
    const [checkOpening, setCheckOpening] = useState(false);
    const [checkClosing, setCheckClosing] = useState(false);
    useEffect(()=>{
        // Check if getOpeningCheck is an array before using every()
        if (Array.isArray(getOpeningCheck)) {
            const allStatusTrue = getOpeningCheck.every(item => item.status === true);
            setCheckOpening(allStatusTrue);
        }  
        if (Array.isArray(getClosingCheck)) {
            const allStatusTrue1 = getClosingCheck.every(item => item.status === true);
            setCheckClosing(allStatusTrue1);
        }  
    },[getOpeningCheck,getClosingCheck])
   
    useEffect(()=>{
        dispatch(getOpeninglist())
        dispatch(getClosinglist())
    },[])

    const gotoOpen = () => {
        navigate('/open')
    }
    const gotoClose = () => {
        navigate('/close')
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
                    <Button size="normal" name="Incidents - Add" variant="primary-normal" />
                    <Button size="small" name="Click To Fill" variant="primary-small" />
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