import { useState } from "react";
import TimezoneSelect from 'react-timezone-select'
import Button from "../components/Button";


const Settings = () => {

    // const [timezone, setTimeZone] = useState("");
    const [metric, setMetric] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPhone, setAdminPhone] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [openingDay, setOpeningDay] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [closingDay, setClosingDay] = useState("");
    const [incidentTime, setIncidentTime] = useState("");
    const [incidentDay, setIncidentDay] = useState("");
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const logoAndBranding = () => {

    }

    return (
        <>
            <h1 className="text-[28px] uppercase">Settings</h1>
            <div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="timezone" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Timezone
                    </label>
                    <div className="mt-2">
                        <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                            className="w-[450px]"
                        />

                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="metric" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Metric
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="metric"
                            id="metric"
                            value={metric}
                            onChange={(e) => setMetric(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="email" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Admin Alerts
                    </label>
                    <label htmlFor="email" className="w-[100px] uppercase  font-medium leading-6 text-gray-900">Email</label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="w-[350px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="adminPhone" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">

                    </label>
                    <label htmlFor="adminPhone" className="w-[100px] uppercase  font-medium leading-6 text-gray-900">SMS</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="adminPhone"
                            id="adminPhone"
                            value={adminPhone}
                            onChange={(e) => setAdminPhone(e.target.value)}
                            className="w-[350px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center px-3">
                    <label htmlFor="openCheck" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Opening Checks
                    </label>
                </div>
                <div className="w-full flex items-center px-3">
                    <label htmlFor="openTime" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Times
                    </label>
                    <label htmlFor="openingTime" className="w-[150px] uppercase  font-medium leading-6 text-gray-900">
                        Completed By
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="openingTime"
                            id="openingTime"
                            value={openingTime}
                            onChange={(e) => setOpeningTime(e.target.value)}
                            className="w-[300px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center px-3 py-1">
                    <label htmlFor="openingDay" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Day
                    </label>
                    <div className="flex justify-between w-[450px]">
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Mon
                        </label>
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Tue
                        </label>
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Wed
                        </label>
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Thurs
                        </label>
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Fri
                        </label>
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Sat
                        </label>
                        <label htmlFor="openingDay" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Sun
                        </label>
                    </div>
                </div>
                <div className="w-full flex items-center px-3 mt-8">
                    <label htmlFor="closeCheck" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Closing Checks
                    </label>
                </div>
                <div className="w-full flex items-center px-3">
                    <label htmlFor="closeTime" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Times
                    </label>
                    <label htmlFor="closingTime" className="w-[150px] uppercase  font-medium leading-6 text-gray-900">
                        Completed By
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="closingTime"
                            id="closingTime"
                            value={closingTime}
                            onChange={(e) => setClosingTime(e.target.value)}
                            className="w-[300px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center px-3 py-1">
                    <label htmlFor="openTime" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Day
                    </label>
                    <div className="flex justify-between w-[450px]">
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Mon
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Tue
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Wed
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Thurs
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Fri
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Sat
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Sun
                        </label>
                    </div>
                </div>
                <div className="w-full flex items-center px-3 mt-8">
                    <label htmlFor="openCheck" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Incidents
                    </label>
                </div>
                <div className="w-full flex items-center px-3">
                    <label htmlFor="incidents" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Times
                    </label>
                    <label htmlFor="openingTime" className="w-[150px] uppercase  font-medium leading-6 text-gray-900">
                        Completed By
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="openingTime"
                            id="openingTime"
                            value={openingTime}
                            onChange={(e) => setOpeningTime(e.target.value)}
                            className="w-[300px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center px-3 py-1">
                    <label htmlFor="openTime" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Day
                    </label>
                    <div className="flex justify-between w-[450px]">
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Mon
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Tue
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Wed
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Thurs
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Fri
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Sat
                        </label>
                        <label htmlFor="openingTime" className="w-[50px] uppercase  font-medium leading-6 text-gray-900">
                            Sun
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-[650px] mt-[30px]">
                <Button handleChange={logoAndBranding} size="normal" name="Logo and Branding" variant="bg-yellowFont" />
            </div>


        </>
    )
}

export default Settings;