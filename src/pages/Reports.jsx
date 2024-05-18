import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDownload, getReportHistories } from "../action/checklist";
import { Icon } from '@iconify-icon/react';

const Reports = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id);
    const fetchData = async () => {
      const response = await dispatch(getReportHistories(userData._id));
      if (response) {
        setHistoryData(response);
      }
    }
    fetchData();
  }, [loading])


  const download = async () => {
    setLoading(true);
    if (startDate > endDate) {
      toast.error("End Date must be greater than Start Date");
      return;
    }
    const data = {
      "startDate": startDate,
      "endDate": endDate,
      "userId": userId,
      "type": "new"
    }

    const response = await dispatch(getDownload(data));
    setLoading(false);
    // Create a Blob from the base64 string
    const filename = 'Report.pdf';
    const blob = new Blob([response], { type: 'application/pdf' });
    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download = filename;
    // link.click();
    // link.remove();
         // Create an object URL from the Blob
         const url = window.URL.createObjectURL(blob);

         // Open the PDF in a new tab
         window.open(url, '_blank');
 
         // Revoke the object URL after a delay to release memory
        //  setTimeout(() => {
        //      window.URL.revokeObjectURL(url);
        //  }, 1000 * 60); // 1 minute delay

    console.log(response, 'kkk');

  }

  const downloadHistory = async (start, end, user, id) => {
    setLoadingStates(prevState => ({
      ...prevState,
      [`${start}-${end}-${id}`]: true
    }));

    const data = {
      startDate: start,
      endDate: end,
      userId: user,
      type: 'history'
    };

    try {
      const response = await dispatch(getDownload(data));
      // Create a Blob from the base64 string
      const filename = 'Report.pdf';
      const blob = new Blob([response], { type: 'application/pdf' });
      // const link = document.createElement('a');
      // link.href = window.URL.createObjectURL(blob);
      // link.download = filename;
      // link.click();
      // link.remove();
       // Create an object URL from the Blob
       const url = window.URL.createObjectURL(blob);

       // Open the PDF in a new tab
       window.open(url, '_blank');

       // Revoke the object URL after a delay to release memory
      //  setTimeout(() => {
      //      window.URL.revokeObjectURL(url);
      //  }, 1000 * 60); // 1 minute delay
    } finally {
      setLoadingStates(prevState => ({
        ...prevState,
        [`${start}-${end}-${id}`]: false
      }));
    }
  };




  return (
    <>
      <h1 className="text-[28px] uppercase">Reports</h1>
      <div className="mt-[50px]">
        {/* <h2 className="text-[24px]  font-bold">Select your report frequency</h2> */}
        {/* <p className="mt-5">Please choose the report range below</p> */}
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
        <div className="mt-2">
          <button onClick={download} className={`py-2 text-yellowFont w-[200px] bg-navbar flex justify-center items-center `}>
            {
                loading ? (
                  <Icon icon="eos-icons:loading" className="text-[24px]" />
                ) : (
                  <div className="cursor-pointer flex items-center text-[18px]">
                    <Icon icon="ic:sharp-download" />
                    <span>Create Report</span>
                  </div>
                )
              }
          </button>
        </div>
        {/* <div className="mt-5 w-[600px]">
          <h3 className="text-[20px] font-bold">What the report will contain:</h3>
          <hr className="mt-3" />
          <p className="mt-3">Opening Checks</p>
          <p>Closing Checks</p>
          <p>Temperature readings</p>
          <p>Incidents Logged</p>
        </div> */}
        
        <div className="mt-5">
          <div className="row w-[700px] flex flex-row items-center font-bold border-b-2 border-t-2 py-2">
            <div className="w-3/4 flex justify-center items-center text-center ">
              Date Range
            </div>
            <div className="w-1/4 flex justify-center items-center text-center">
              <span>Status</span>
            </div>
          </div>
          {/* <div className="row w-[700px] flex flex-row items-center border-b-2 py-2">
            <div className="w-3/4 flex justify-between items-center">
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[250px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              ~
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[250px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-1/4 flex justify-center items-center text-[#299D8D]  text-center">
              {
                loading ? (
                  <Icon icon="eos-icons:loading" className="text-[24px]" />
                ) : (
                  <div className="cursor-pointer flex items-center text-[18px]" onClick={download}>
                    <Icon icon="ic:sharp-download" />
                    <span>Download</span>
                  </div>
                )
              }
            </div>
          </div> */}
            {   
              historyData && historyData.length > 0 ? ( historyData.map((historyItem, index) => {
                const isLoading = loadingStates[`${historyItem.startDate}-${historyItem.endDate}-${historyItem._id}`];
                return (
                  <div key={index} className="row w-[700px] flex flex-row items-center border-b-2 py-2">
                    <div className="w-3/4 flex justify-center items-center">
                      {historyItem.startDate} ~ {historyItem.endDate}
                    </div>
                    <div className="w-1/4 flex justify-center items-center text-[#299D8D] text-center">
                      {
                        isLoading ? (
                          <Icon icon="eos-icons:loading" className="text-[24px]" />
                        ) : (
                          <div className="cursor-pointer flex items-center text-[18px]" onClick={() => downloadHistory(historyItem.startDate, historyItem.endDate, historyItem.userId, historyItem._id)}>
                            <Icon icon="ic:sharp-download" />
                            <span>Download</span>
                          </div>
                        )
                      }
                    </div>
                  </div>
                );
            })) : (
              <h2 className="font-bold text-center text-[18px] mt-5">There is no data.</h2>
            )}
        </div>
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
     



      </div>

    </>
  )
}

export default Reports;


