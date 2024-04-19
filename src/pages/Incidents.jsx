import { useState } from "react";


const Incidents = () => {

    const [incident, setIncident] = useState("");
    const [resolution, setResolution] = useState("");
    const [employeeName, setEmployeeName] = useState("");

    const changeIncident = (e) => {
        setIncident(e.target.value);
    }
    const changeResolution = (e) => {
        setResolution(e.target.value);
    }


    const handleSubmit = () => {
        const data = {
            "incident": incident,
            "resolution": resolution,
            "employeeName": employeeName
        }
    }

    return (
        <>
            <h1 className="text-[28px] uppercase">Incidents</h1>
            <div className="col-span-full mt-[100px]">
                <label htmlFor="incident" className="block uppercase font-medium leading-6 text-gray-900">
                    Incident
                </label>
                <div className="mt-2">
                    <textarea
                        id="incident"
                        name="incident"
                        rows={4}
                        className="block w-[500px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={incident}
                        onChange={(e) => changeIncident(e)}
                    />
                </div>
                <label htmlFor="resolution" className="block mt-10 uppercase font-medium leading-6 text-gray-900">
                    Resolution
                </label>
                <div className="mt-2">
                    <textarea
                        id="resolution"
                        name="resolution"
                        rows={4}
                        className="block w-[500px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={resolution}
                        onChange={(e) => changeResolution(e)}
                    />
                </div>
                <label htmlFor="employeeName" className="block mt-10 uppercase font-medium leading-6 text-gray-900">
                    Name of Employee
                </label>
                <div className="mt-2">
                    <input
                        id="employeeName"
                        name="employeeName"
                        type = "text"
                        className="block w-[500px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
                </div>
                <div className="mt-8 text-center w-[500px]">
                    <label htmlFor="employeeName" className="block uppercase font-medium leading-6 text-gray-900">
                        Date and Time will be automatically recorded
                    </label>
                    <button onClick={handleSubmit} className={`py-2 mt-5 uppercase bg-yellowFont w-[200px]  `}>
                        Submit
                    </button>
                </div>



            </div>
        </>
    )
}

export default Incidents;