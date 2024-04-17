import React, { useState } from 'react'
import { Icon } from '@iconify-icon/react';
import { Switch } from '@headlessui/react'

const Temperatures = () => {
    const [enabled, setEnabled] = useState(true);
    const [beep, setBeep] = useState(false);

    return (
        <>
            <h1 className="text-[28px] uppercase">Temperatures</h1>
            <div className="container ">
                <div className="w-[500px] mx-auto bg-[#F9F8B5] p-3 rounded-lg ">
                    <div className="flex justify-between">
                        <div className='flex items-center text-[25px]'>
                            <span className='text-[#1C1D72]' >D61D73</span> &nbsp;
                            <Icon icon="ri:question-line" className=" text-[#13ae77] " />
                        </div>
                        <div className='flex items-center text-[30px]'>
                            <Icon icon="tabler:battery-4" className='text-black' /> &nbsp;
                            <Icon icon="ic:round-menu" className='text-[#13ae77]' />
                        </div>

                    </div>
                    <div className='flex items-baseline mt-5 '>
                        <Icon icon="uil:temperature-quarter" className='text-[#13ae77] text-[25px]' />
                        <span className='text-[#1C1D72] text-[40px]'>21.5</span>
                        {/* <Icon icon="tabler:temperature-celsius" className='text-[#1C1D72] text-[30px]'/> */}
                        <span className='text-[25px]'> °C </span>
                    </div>
                    <div className='flex justify-end mt-10'>
                        <span className='text-[#1C1D72] text-[20px]'>Last updated Dec 7, 2023 12:15 PM</span>
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
                        <input id="large-range" type="range" defaultValue="50" min="0" max="100" className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700" />
                        <label htmlFor="large-range" className="block text-[18px]  font-medium text-gray-900 dark:text-white">Max</label>
                    </div>

                    <div className='w-full flex justify-between my-8 items-center'>
                        <span className='text-[20px]'> <span className='text-[20px] text-grey-400 underline underline-offset-4  text-center'> &nbsp; 0 &nbsp; </span> °C </span>
                        <span className='text-[20px]'> <span className='text-[20px] text-grey-400 underline underline-offset-4  text-center'> &nbsp; 0 &nbsp; </span> °C </span>
                    </div>
                    <div className='w-full flex justify-between my-8 items-center'>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Temperatures;