
import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Switch } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { getEditChecklist, getOpeninglist, updateChecklistStatus } from "../action/checklist";
import { getOpeningChecklist } from "../reducer/ChecklistSlice";

const Open = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getOpeningCheck = useSelector(getOpeningChecklist);
  const [checkedList, setCheckedList] = useState([]);
  const [openingList, setOpeningList] = useState([]);
  const [visibleItemIndex, setVisibleItemIndex] = useState(null);
  const [userId, setUserId] = useState('');
  const [pdata, dataset]=useState([])

   useEffect(()  =>   { 
    if (getOpeningCheck) {
      setOpeningList(getOpeningCheck);
      const initialCheckedList = getOpeningCheck.filter(item => item.status).map(item => item._id);
      setCheckedList(initialCheckedList);
    }
  }, [getOpeningCheck])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id)
    dispatch(getOpeninglist(userData._id));
  }, [])


  const handleCheckboxChange = (id, Index) => {
    const newCheckedList = [...checkedList];
    const index = newCheckedList.indexOf(id);
    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      newCheckedList.push(id);
    }
    setCheckedList(newCheckedList);
    let status = index > -1 ? false : true;


    const data = {
      "id": id,
      "status": status,
      "checkSection": openingList[Index].checkSection,
      "taskChecklist": openingList[Index].taskChecklist,
      
    }
    dispatch(updateChecklistStatus(data))
  };

  const handleAdd = () => {
    navigate('/addchecklist?checkType=open')
  }
  const handleUserTextChange = (index, text, value, parentIndex, textIndex) => {
    // Make a deep copy of the current openingList
    const updatedOpeningList = openingList.map(item => ({ ...item }));

    // Get the item at the specified index
    const item = updatedOpeningList[index];

    const sectionToUpdate = item.checkSection[parentIndex];

    // Create a new array for the data with the updated textbox
    const newDataArray = sectionToUpdate.data.map((dataItem, dataIndex) => {
      if (dataIndex === textIndex) {
        // Return a new object with the updated text and value
        return {
          ...dataItem,
          text: text,
          value: value
        };
      }
      // Return the original dataItem for all other indices
      return dataItem;
    });

    // Create a copy of sectionToUpdate and update its data property
    const sectionToUpdateCopy = { ...sectionToUpdate };
    sectionToUpdateCopy.data = newDataArray;

    // Update the section in the item's checkSection array
    const updatedCheckSection = [...item.checkSection];
    updatedCheckSection[parentIndex] = sectionToUpdateCopy;

    // Update the item with the modified checkSection
    const updatedItem = { ...item, checkSection: updatedCheckSection };

    // Update the openingList with the modified item
    updatedOpeningList[index] = updatedItem;

    // Update the state with the modified openingList
    setOpeningList(updatedOpeningList);
  };

  const handleChecklistChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.taskChecklist.map((textItem, i) => {
      if (textIndex == i) {
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.taskChecklist = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    
  };

  const handleTemperatureChange = (id, index, subIndex, checkStatus) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedChecklist = item.checklist.map((checkItem, i) => {
      if (subIndex === i) {
        return { ...checkItem, status: checkStatus };
      }
      return checkItem;
    });
    item.checklist = updatedChecklist;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    const data = {
      "id": id,
      "checklist": item.checklist,
    }
    dispatch(updateChecklistStatus(data))
  }

  const handleTextBoxChange = (id, index, subIndex, setContent, checkStatus) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedChecklist = item.checklist.map((checkItem, i) => {
      if (subIndex === i) {
        return { ...checkItem, status: checkStatus, content: setContent };
      }
      return checkItem;
    });
    item.checklist = updatedChecklist;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    const data = {
      "id": id,
      "checklist": item.checklist,
    }
    dispatch(updateChecklistStatus(data))
  }

  const handleOptionChange = (id, index, subIndex, checkStatus) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedChecklist = item.checklist.map((checkItem, i) => {
      if (subIndex === i) {
        return { ...checkItem, status: checkStatus };
      }
      return checkItem;
    });
    item.checklist = updatedChecklist;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    const data = {
      "id": id,
      "checklist": item.checklist,
    }
    dispatch(updateChecklistStatus(data))
  }
  const handleTimeChange = (id, index, subIndex, checkStatus) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedChecklist = item.checklist.map((checkItem, i) => {
      if (subIndex === i) {
        return { ...checkItem, status: checkStatus };
      }
      return checkItem;
    });
    item.checklist = updatedChecklist;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    const data = {
      "id": id,
      "checklist": item.checklist,
    }
    dispatch(updateChecklistStatus(data))
  }

  




  const handleEditChange = async (id) => {
    navigate(`/editchecklist/open/${id}`)
  }
  console.log(openingList,'openingList');

  return (
    <>
      <h1 className="text-[28px] uppercase">Opening Checks</h1>
      <div className="mt-[70px] flex justify-between pb-5 items-center border-b-2 border-grey">
        <div >
          <h2 className="font-bold text-[25px]">Opening Checklist</h2>
        </div>
        <div>
          {/* <ButtonCheck color="secondary" variant="secondary" label="Cancel" /> */}
          <ButtonCheck handleClick={() => handleAdd()} color="secondary" variant="secondary" label="Add" />
          {/* <ButtonCheck color="primary" variant="primary" label="Save" /> */}
        </div>
      </div>
      <div className="border-t-2 border-l-2 border-grey py-5 px-8">
        {
          ( openingList && openingList.length>0 ? ( openingList.map((item, index) => (
            <div key={index} className={`${index !== openingList.length - 1 ? 'border-b-2 border-grey' : ''}`}>
              <div className={`flex justify-between items-center py-5 `}>
                <span className="text-[18px] w-[400px]"> {item.checklist[0].title} </span>
                <div className="flex justify-between items-center">
                  <div className="text-right">
                      <p>{ index == 0 ? moment(item.date).format('DD.MM.YYYY HH:mm') : ''}</p>
                  </div>
                  <FaEdit className="cursor-pointer ml-5" onClick={() => handleEditChange(item._id)} />
                  {
                  visibleItemIndex === index ? (
                    <IoIosArrowUp className="text-[20px] cursor-pointer mx-2" onClick={() => setVisibleItemIndex(null)} />
                  ) : (
                    <IoIosArrowDown className="text-[20px] cursor-pointer mx-2" onClick={() => setVisibleItemIndex(index)} />
                  )}
                </div>
              </div>

              <div className="p-3">
                {
                  visibleItemIndex === index ? (
                    <>
                      {
                      item.checklist && item.checklist.length > 0 && item.checklist.map((checkItem, subIndex) => {
                        if (checkItem.type == 'option'){
                          return (
                            <div key={subIndex} className={`flex justify-between mt-1 items-center py-3 rounded bg-[#E3E3E3]`}>
                              <div className="px-3">
                                <span className="text-[18px] w-[400px]"> {checkItem.title} </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                     <Checkbox id={`option${index}-${subIndex}`} label="" checked={checkItem.status} onChange={(e) => handleOptionChange(item._id, index, subIndex, e.target.checked)} />
                                </div>
                              </div>
                            </div>
                          )
                        }
                        if(checkItem.type == "section"){
                          return (
                            <div key={subIndex} className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                              <div className="w-9/10 p-2 px-3 text-justify">
                                <span className="text-[14px]"> {checkItem.content} </span>
                              </div>
                            </div>
                          )
                        }
                        if(checkItem.type == "textbox"){
                          return (
                            <div key={subIndex} className={`flex justify-between mt-1 items-center py-3 rounded bg-[#E3E3E3]`}>
                              <div className="px-3">
                                <span className="text-[18px] w-[400px]"> {checkItem.title} </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <input
                                      id={`textbox-${subIndex}`}
                                      name={`textbox-${subIndex}`}
                                      type="text"
                                      value={checkItem.content}
                                      className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      onChange={(e) => handleTextBoxChange(item._id, index, subIndex, e.target.value, checkItem.status)}
                                    />
                                </div>
                                <div>
                                     <Checkbox id={`option${index}-${subIndex}`} label="" checked={checkItem.status} onChange={(e) => handleTextBoxChange(item._id, index, subIndex, checkItem.content, e.target.checked)} />
                                </div>
                              </div>
                            </div>
                          )
                        }
                        if(checkItem.type == "re_temp"){
                          return (
                            <div key={subIndex} className={`mt-1 py-3 rounded bg-[#E3E3E3]`}>
                              <div className="px-3">
                                <span className="text-[18px] w-[400px]"> {checkItem.title} </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="px-3">
                                  <span className="text-[18px] w-[400px]"> {checkItem.content} </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>
                                      <Checkbox id={`option${index}-${subIndex}`} label="" checked={checkItem.status} onChange={(e) => handleTemperatureChange(item._id, index, subIndex, e.target.checked)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        if(checkItem.type == "re_time"){
                          return (
                            <div key={subIndex} className={`mt-1 py-3 rounded bg-[#E3E3E3]`}>
                              <div className="px-3">
                                <span className="text-[18px] w-[400px]"> {checkItem.title} </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="px-3">
                                  <span className="text-[18px] w-[400px]"> {checkItem.content} </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>
                                      <Checkbox id={`option${index}-${subIndex}`} label="" checked={checkItem.status} onChange={(e) => handleTimeChange(item._id, index, subIndex, e.target.checked)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                          
                      })}
                      

                    </>
                  ) : ''
                }

              </div>
            </div>
          ))):
          (
            <h2 className="font-bold text-center text-[18px]">There is no data.</h2>
          ))
        }
      </div>
    </>
  )
}

export default Open;