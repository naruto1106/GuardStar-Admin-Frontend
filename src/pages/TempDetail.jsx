import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Icon } from '@iconify-icon/react';
import { Switch } from '@headlessui/react'
import { getSensorDetail, updateSensor } from "../action/checklist";
import { useNavigate, useParams } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import ButtonCheck from '../components/ButtonCheck';

const TempDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, temp } = useParams();

    const [enabled, setEnabled] = useState(true);
    const [beep, setBeep] = useState(false);
    const [sensorData, setSensorData] = useState([]);
    const [range, setRange] = useState([10, 20]);

    //  get the sensor data by cron
    useEffect(() => {
        const fetchSensorData = async () => {
            const data = await dispatch(getSensorDetail(id));
            if (data) {
                setSensorData(data);
                setEnabled(data[0].openAlarmTemperature);
                const rangeVal = [data[0].lowTemperature1, data[0].lowTemperature2];
                setRange(rangeVal);
            }

        }
        fetchSensorData();

    }, [])

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }
    const handleSave =async (id) => {
        const data = {
            openAlarmTemperature: enabled,
            lowTemperature1: range[0],
            lowTemperature2: range[1],
            id : id
        }
        const response =await dispatch(updateSensor(data))
        if(response){
            navigate("/temperatures");
        }

    }

    return (
        <>
            {/* <h1 className="text-[28px] uppercase">Temperature Detail</h1> */}
            {
                sensorData && sensorData.length > 0 && (
                    <>
                        <div className="mt-[70px] flex justify-between pb-5 items-center border-b-2 border-grey">
                            <div >
                                <h2 className="font-bold text-[25px]">Temperature Detail</h2>
                            </div>
                            <div>
                                <ButtonCheck handleClick={() => handleSave(sensorData[0]._id)} color="secondary" variant="secondary" label="Save" />
                            </div>
                        </div>

                        <div className="container mt-10">
                            <div className="w-[500px] mx-auto bg-[#F9F8B5] p-3 rounded-lg ">
                                <div className="flex justify-between">
                                    <div className='flex items-center text-[25px]'>
                                        <span className='text-[#1C1D72]' > {sensorData[0].name} </span> &nbsp;
                                        <Icon icon="ri:question-line" className=" text-[#13ae77] " />
                                    </div>
                                    <div className='flex items-center text-[30px]'>
                                        <Icon icon="tabler:battery-4" className='text-black' /> &nbsp;
                                        <Icon icon="ic:round-menu" className='text-[#13ae77]' />
                                    </div>

                                </div>
                                <div className='flex items-baseline mt-5 '>
                                    <Icon icon="uil:temperature-quarter" className='text-[#13ae77] text-[25px]' />
                                    <span className='text-[#1C1D72] text-[40px]'> {temp}</span>
                                    <span className='text-[25px] text-[#1C1D72]'> °C </span>
                                </div>
                                <div className='flex justify-end mt-10'>
                                    <span className='text-[#1C1D72] text-[20px]'>Last updated {formatDate(sensorData[0].updatedAt)}</span>
                                </div>

                            </div>
                            <div className='w-[470px] mx-auto mt-5'>
                                <div className='w-full flex justify-between my-5'>
                                    <span className='text-[23px] font-semibold '>Temp Alerting</span>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={`${enabled ? 'bg-[#0D9D89]' : 'bg-[#E6E6E6]'}
                                            relative inline-flex h-[38px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
                                                pointer-events-none inline-block h-[34px] w-[36px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                </div>
                                <hr />
                                <div className='w-full flex justify-between my-8 items-center gap-3'>
                                    <label htmlFor="large-range" className="block text-[18px]  font-medium text-gray-900 dark:text-white">Min</label>
                                    <RangeSlider value={range} onInput={setRange} min={-50} max={50} step={1} className="temperature-slider" />
                                    <label htmlFor="large-range" className="block text-[18px]  font-medium text-gray-900 dark:text-white">Max</label>
                                </div>

                                <div className='w-full flex justify-between my-8 items-center'>
                                    <span className='text-[20px]'> <span className='text-[20px] text-grey-400 underline underline-offset-4  text-center'> &nbsp; {range[0]} &nbsp; </span> °C </span>
                                    <span className='text-[20px]'> <span className='text-[20px] text-grey-400 underline underline-offset-4  text-center'> &nbsp; {range[1]} &nbsp; </span> °C </span>
                                </div>
                                {/* <div className='w-full flex justify-between my-8 items-center'>
                                    <span className='text-[20px] text-grey-400 '>Delay before alert</span>
                                    <span className='text-[20px]'> <span className='underline-offset-4 underline text-center text-[20px]'>0</span> minutes</span>
                                </div>
                                <hr />
                                <div className='w-full flex justify-between my-3'>
                                    <span className='text-[23px] font-semibold '>Beeping on Hub</span>
                                    <Switch
                                        checked={beep}
                                        onChange={setBeep}
                                        className={`${beep ? 'bg-[#0D9D89]' : 'bg-[#E6E6E6]'}
                                            relative inline-flex h-[38px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${beep ? 'translate-x-6' : 'translate-x-0'}
                                                pointer-events-none inline-block h-[34px] w-[36px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                </div>
                                <hr />
                                <div className='w-full flex justify-between my-3 items-center'>
                                    <span className='text-[23px] font-semibold '>Temp & RH Compensation</span>
                                    <Icon icon="ep:arrow-right" className='text-[25px]' />
                                </div> */}
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default TempDetail;