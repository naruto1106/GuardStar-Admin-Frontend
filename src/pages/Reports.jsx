import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDownload } from "../action/checklist";


const Reports = () => {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    
    const download =async () => {
        if (startDate > endDate) {
            toast.error("End Date must be greater than Start Date");
            return;
        }
        const data = {
            "startDate" : startDate,
            "endDate" : endDate
        }
        const response = await dispatch(getDownload(data));
        const { Checklists, incidentlists } = response;

    // Combine checklists and incidents into a single array
    const combinedData = [...Checklists, ...incidentlists];

    // Group data by date
    const groupedByDate = combinedData.reduce((result, item) => {
        const itemDate = item.date.slice(0, 10); // Extract YYYY-MM-DD from date string

        if (!result[itemDate]) {
            result[itemDate] = { date: itemDate, checklists: [], incidents: [] };
        }

        if ('checkType' in item && item.checkType === 'open' || item.checkType === 'close') {
            result[itemDate].checklists.push(item);
        } else {
            result[itemDate].incidents.push(item);
        }

        return result;
    }, {});

    // Convert groupedByDate object into an array of date groups
    const downloadData = Object.values(groupedByDate);

    console.log(response,'kkk');
    console.log(downloadData, 'rearrangedData');
    }
   
   
    return (
        <>
            <h1 className="text-[28px] uppercase">Reports</h1>
            <div className="mt-[100px]">
                <h2 className="text-[24px]  font-bold">Select your report frequency</h2>
                <p className="mt-5">Please choose the report range below</p>
                {/* <div className="w-full mt-5">
                    <label htmlFor="timePeriod" className="block font-bold text-sm  leading-6 text-gray-900">
                        Time period
                    </label>
                    <div className="mt-2">
                        <select
                            id="timePeriod"
                            name="timePeriod"
                            autoComplete="timePeriod-name"
                            className="block w-[800px] rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option>Custom</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                </div> */}
                <div className="flex w-[600px] gap-2 justify-between mt-5">
                    <div className="w-1/2">
                        <label htmlFor="timePeriod" className="block text-sm font-bold leading-6 text-gray-900">
                            Start Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="startDate"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="timePeriod" className="block text-sm font-bold leading-6 text-gray-900">
                            End Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5 w-[600px]">
                    <h3 className="text-[20px] font-bold">What the report will contain:</h3>
                    <hr className="mt-3" />
                    <p className="mt-3">Opening Checks</p>
                    <p>Closing Checks</p>
                    <p>Temperature readings</p>
                    <p>Incidents Logged</p>
                </div>
                <div className="mt-5">
                    <button onClick={download} className={`py-2 text-yellowFont w-[200px] bg-navbar `}>
                        Download
                    </button>

                </div>

            </div>
        </>
    )
}

export default Reports;