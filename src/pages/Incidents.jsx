import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncident, getIncident } from "../action/team";
import { getIncidentList } from "../reducer/TeamSlice";


const Incidents = () => {
    const dispatch = useDispatch();
    const incidentLists = useSelector(getIncidentList);
    const [incident, setIncident] = useState("");
    const [resolution, setResolution] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [flag, setFlag] = useState(false);
    // const [incidentsData, setIncidentsData] = useState([]);
    const [userId, setUserId] = useState('');
    const [open, setOpen] = useState(false);

    const changeIncident = (e) => {
        setIncident(e.target.value);
    }
    const changeResolution = (e) => {
        setResolution(e.target.value);
    }

    useEffect(() =>{
        const fetchData =async () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            setUserId(userData._id)
            const response =await dispatch(getIncident(userData._id));
            if(response.message){
                setOpen(true);
                console.log("response message", response.message);
            } else {

            }
        }
        fetchData();
    },[flag])
    const handleSubmit =async () => {
        const data = {
            "incident": incident,
            "resolution": resolution,
            "name": employeeName,
            "userId": userId
        }
        const response = await dispatch(addIncident(data));
        if(response) {
            setFlag(!flag);
        } 
    }

    return (
        <>
            <h1 className="text-[28px] uppercase">Incidents</h1>
            {
                open ? (
                    <h2 className="font-bold text-center text-[18px]">Today is not opening.</h2>
                ) : (
                    incidentLists.length > 0 ? (
                        <table className="table-auto mt-[150px]">
                            <thead>
                                <tr>
                                    {/* <th className="py-3 uppercase w-1/8 text-left">No</th> */}
                                    <th className="py-3 uppercase w-1/8 ">Name</th>
                                    <th className="py-3 uppercase w-3/8 text-center">Incident</th>
                                    <th className="py-3 uppercase w-3/8 ">Resolution</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    incidentLists.length > 0 && incidentLists.map((item, index) => (
                                        <tr key={index}>
                                            {/* <td className="p-4 pl-[0px] text-left"> {index + 1 } </td> */}
                                            <td className="p-4  text-center"> {item.name} </td>
                                            <td className="p-4  text-justify"> {item.incident} </td>
                                            <td className="p-4  text-justify"> {item.resolution} </td>
                                        </tr>
                                    ))
                                }
    
                            </tbody>
                        </table>
                    ) : (
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
                    )
                )
            }
            
            
        </>
    )
}

export default Incidents;