
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { Icon } from '@iconify-icon/react';
import { getClosingCheckStatus, getOpeningCheckStatus, getSensorData } from "../action/checklist";
import { getIncident } from "../action/team";
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [checkOpening, setCheckOpening] = useState(false);
    const [checkClosing, setCheckClosing] = useState(false);
    const [checkIncident, setCheckIncident] = useState(false);
    const [sensorData, setSensorData] = useState([]);

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

    //get the sensor data by cron
    useEffect(() => {
      const fetchSensorData =async () => {
          const userData = JSON.parse(localStorage.getItem('user'));
          const data =await dispatch(getSensorData(userData._id));
          setSensorData(data);
          console.log(sensorData, 'sensorData')
      }
      fetchSensorData();
      // Fetch sensor data every 15 seconds
      const interval = setInterval(fetchSensorData, 30000);
;      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
  }, [])

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
                <div className="w-[700px] flex flex-wrap">
                    {
                        sensorData && sensorData.length >0 && sensorData.map((item, index) => (
                            <div key={index} className="m-2 text-[20px] text-center py-3 px-2 border-4 border-green inline-block">
                                <span className="uppercase text-[25px]"> {item.name} </span>
                                <div className="flex justify-between text-[#A1A1A1] mt-2">
                                    <div className="flex w-[85px] justify-center items-center mx-1" >
                                        <Icon icon="uil:temperature-quarter" className='text-[16px]' />
                                        <span className="text-[14px]">Temp</span>
                                    </div> 
                                    <div className="w-[2px] bg-[#299D8D]"></div>
                                    <div className="flex w-[85px] justify-center items-center mx-1" >
                                        <Icon icon="material-symbols:humidity-mid" className='text-[16px]' />
                                        <span className="text-[14px]">Humidity</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[#A1A1A1] mt-2">
                                    <div className="flex w-[85px] justify-center items-center mx-1" >
                                        <span className="text-[20px] text-[#299D8D] font-bold"> {item.temp} °C</span>
                                    </div> 
                                    <div className="flex w-[85px] justify-center items-center mx-1" >
                                        <span className="text-[20px] text-[#299D8D] font-bold"> {item.humidity}%</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>

    )
}

export default Home;