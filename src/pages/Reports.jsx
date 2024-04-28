import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDownload } from "../action/checklist";
import generatePDF from "react-to-pdf";
import logoImage from '../assets/guardstar_logo.jpg'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const Reports = () => {
  const dispatch = useDispatch();
  const pdfRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [userId, setUserId] = useState("");
  useEffect(()=> {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id)
  },[])

  const download = async () => {
    if (startDate > endDate) {
      toast.error("End Date must be greater than Start Date");
      return;
    }

    const data = {
      "startDate": startDate,
      "endDate": endDate,
      "userId": userId
    }

    const response = await dispatch(getDownload(data));

    // Create a Blob from the base64 string
    

    const filename = 'Report.pdf';
    const blob = new Blob([response], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();




    console.log(response, 'kkk');

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


