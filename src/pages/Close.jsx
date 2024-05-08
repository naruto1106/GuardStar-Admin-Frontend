import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { getClosinglist, updateChecklistStatus } from "../action/checklist";
import { getClosingChecklist } from "../reducer/ChecklistSlice";
import { FaEdit } from "react-icons/fa";
import { Switch } from '@headlessui/react';

const Close = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getClosingCheck = useSelector(getClosingChecklist);
  const [checkedList, setCheckedList] = useState([]);
  const [closingList, setClosingList] = useState([]);
  const [visibleItemIndex, setVisibleItemIndex] = useState(null);
  const [userId, setUserId] = useState('');

  const handleAdd = () => {
    navigate('/addchecklist?checkType=close')
  }
  useEffect(() => {
    if (getClosingCheck) {
      setClosingList(getClosingCheck);
      const initialCheckedList = getClosingCheck.filter(item => item.status).map(item => item._id);
      setCheckedList(initialCheckedList);
    }
  }, [getClosingCheck])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id)
    dispatch(getClosinglist(userData._id));
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
      "checkSection": closingList[Index].checkSection,
      "taskChecklist": closingList[Index].taskChecklist,

    }
    console.log(data, 'data');
    dispatch(updateChecklistStatus(data))
  };

  const handleUserTextChange = (index, text, value, parentIndex, textIndex) => {
    // Make a deep copy of the current openingList
    const updatedClosingList = closingList.map(item => ({ ...item }));

    // Get the item at the specified index
    const item = updatedClosingList[index];

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
    updatedClosingList[index] = updatedItem;

    // Update the state with the modified openingList
    setClosingList(updatedClosingList);
  };

  const handleChecklistChange = (index, text, value, textIndex) => {
    const updatedClosingList = closingList.map(item => ({ ...item }));
    const item = updatedClosingList[index];
    const updatedTextBox = item.taskChecklist.map((textItem, i) => {
      if (textIndex == i) {
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.taskChecklist = updatedTextBox;
    updatedClosingList[index] = item;
    setClosingList(updatedClosingList);

  };

  const handleEditChange = async (id) => {
    navigate(`/editchecklist/close/${id}`)
  }

  return (
    <>
      <h1 className="text-[28px] uppercase">Closing Checks</h1>
      <div className="mt-[50px] flex justify-between pb-5 items-center border-b-2 border-grey">
        <div >
          <h2 className="font-bold text-[25px]">Closing Checklist</h2>

        </div>
        <div>
          {/* <ButtonCheck color="secondary" variant="secondary" label="Cancel" /> */}
          <ButtonCheck handleClick={() => handleAdd()} color="secondary" variant="secondary" label="Add" />
          {/* <ButtonCheck color="primary" variant="primary" label="Save" /> */}
        </div>
      </div>
      <div className="py-5 px-8">
        {
          closingList && closingList.length > 0 ? (closingList.map((item, index) => (
            <div key={index} className={`${index !== closingList.length - 1 ? 'border-b-2 border-grey' : ''}`}>
              <div className={`flex justify-between items-center py-5 `}>
                <span className="text-[18px] w-[400px]"> {item.title} </span>
                <div className="flex justify-between items-center">
                  <div className="text-right">
                    {item.enableDate && (
                      <p>{moment(item.date).format('DD.MM.YYYY HH:mm')}</p>
                    )}
                    {item.enableName && (
                      <p> {item.name} </p>
                    )}
                  </div>
                  <Checkbox id={item._id} label="" checked={checkedList.includes(item._id)} onChange={() => handleCheckboxChange(item._id, index)} />
                  <FaEdit className="cursor-pointer" onClick={() => handleEditChange(item._id)} />
                  {visibleItemIndex === index ? (
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
                      {item.taskChecklist && item.taskChecklist.length > 0 && item.taskChecklist.map((checkItem, subIndex) => {
                        if (checkItem.text != '')
                          return (
                            <div key={subIndex} className={`flex justify-between items-center py-5 `}>
                              <span className="text-[18px] w-[400px]"> {checkItem.text} </span>
                              <div className="flex justify-between items-center">
                                <div className="text-right">
                                  {item.enableDate && (
                                    <p>{moment(item.date).format('DD.MM.YYYY HH:mm')}</p>
                                  )}
                                  {item.enableName && (
                                    <p> {item.name} </p>
                                  )}
                                </div>
                                <Switch
                                  checked={checkItem.value}
                                  onChange={(e) => handleChecklistChange(index, checkItem.text, e, subIndex)}
                                  className={`${checkItem.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                  <span
                                    className={`${checkItem.value ? 'translate-x-6' : 'translate-x-1'
                                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                  />
                                </Switch>
                                
                              </div>
                            </div>
                          )
                      })}
                      {item.checkSection && item.checkSection.length > 0 && item.checkSection.map((sectionItem, parentIndex) => (
                        <div key={parentIndex}>
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {sectionItem.title} </span>
                            </div>
                          </div>

                          <div className="mt-2">
                            {
                              sectionItem.data && sectionItem.data.length > 0 && sectionItem.data.map((sectionData, subIndex) => {
                                // Check if sectionData.text is not empty
                                if (sectionData.text.trim() !== '') {
                                  if (sectionData.type == 'text') {
                                    return (
                                      <div className="flex justify-between items-center my-1" key={subIndex}>
                                        <span className="text-[14px] w-[450px]">{sectionData.text}</span>
                                        <input
                                          id={`editUserText-${subIndex}`}
                                          name={`editUserText-${subIndex}`}
                                          type="text"
                                          value={sectionData.value}
                                          className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          onChange={(e) => handleUserTextChange(index, sectionData.text, e.target.value, parentIndex, subIndex)}
                                        />
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div className="flex justify-between items-center my-1" key={subIndex}>
                                        <span className="text-[14px] w-[450px]">{sectionData.text}</span>
                                        <Switch
                                          checked={sectionData.value}
                                          onChange={(e) => handleUserTextChange(index, sectionData.text, e, parentIndex, subIndex)}
                                          className={`${sectionData.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                                        >
                                          <span
                                            className={`${sectionData.value ? 'translate-x-6' : 'translate-x-1'
                                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                          />
                                        </Switch>
                                      </div>
                                    )
                                  }
                                }
                              })
                            }
                          </div>

                        </div>
                      ))}

                    </>
                  ) : ''
                }

              </div>
            </div>
          ))) : (
            <h2 className="font-bold text-center text-[18px]">The is no data.</h2>
          )
        }
      </div>
    </>

  )
}

export default Close;