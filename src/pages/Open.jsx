
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

  useEffect(() => {
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

  // console.log(openingList,'openingList');

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

    // const textboxData = handleAddUserTextChange(Index);
    const fridgeFreezerData = handleFridgeFreezerChange(Index);
    const fridge_operating_secData = handleFridgeOperatingChange(Index);
    const theIceData = handleTheIceChange(Index);
    const theTempData = handleTheTempChange(Index);
    const theProbe_secData = handleTheProbe_SecChange(Index);
    const food_deliverData = handleFoodDeliverChange(Index);
    const batch_coreData = handleBatchCoreChange(Index);
    const cook_orderData = handleCookOrderChange(Index);
    const cleaning_check = handleCleaningCheckChange(Index)
    const kitchen_check = handleKitchenCheckChange(Index)
    const chilled_frozen_secData = handleChilledFrozenSecChange(Index);

    const data = {
      "id": id,
      "status": status,
      "fridgeFreezerData": fridgeFreezerData,
      "fridge_operating_secData": fridge_operating_secData,
      "theIceData": theIceData,
      "theTempData": theTempData,
      "theProbe_secData": theProbe_secData,
      "food_deliverData": food_deliverData,
      "batch_coreData": batch_coreData,
      "cook_orderData": cook_orderData,
      "cleaning_check": cleaning_check,
      "kitchen_check": kitchen_check,
      "chilled_frozen_secData" : chilled_frozen_secData
    }
    console.log(data, 'data');
    dispatch(updateChecklistStatus(data))
  };

  const handleAdd = () => {
    navigate('/addchecklist?checkType=open')
  }

  const handleAddUserTextChange = (index, text, value, textIndex) => {
    // Make a deep copy of the current openingList
    const updatedOpeningList = openingList.map(item => ({ ...item }));

    // Get the item at the specified index
    const item = updatedOpeningList[index];

    // Find the textBox entry with the specified text
    const updatedTextBox = item.textBox.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          // Return a new object with updated value
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });

    // Update the textBox array in the item
    item.textBox = updatedTextBox;

    // Update the openingList with the modified item
    updatedOpeningList[index] = item;

    // Assuming you're using React hooks to manage state, update the state with the modified openingList
    setOpeningList(updatedOpeningList);

    // Return the updated textbox data
    return updatedTextBox;
  };

  const handleFridgeFreezerChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.fridge_freezer.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.fridge_freezer = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleFridgeOperatingChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.fridge_operating_sec.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.fridge_operating_sec = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleTheIceChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.theIce.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.theIce = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleTheTempChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.theTemp.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.theTemp = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleTheProbe_SecChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.theProbe_sec.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.theProbe_sec = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleFoodDeliverChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.food_deliver.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.food_deliver = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleBatchCoreChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.batch_core.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.batch_core = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleCookOrderChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.cook_order.map((textItem,i) => {
        if(textIndex == i){
          if (textItem.text === text) {
            return { ...textItem, value: value };
          }
        }
        return textItem;
    });
    item.cook_order = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleCleaningCheckChange = (index, text, value,textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.cleaningCheck.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.cleaningCheck = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };

  const handleKitchenCheckChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.KitchenCheck.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.KitchenCheck = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };
  const handleChilledFrozenSecChange = (index, text, value, textIndex) => {
    const updatedOpeningList = openingList.map(item => ({ ...item }));
    const item = updatedOpeningList[index];
    const updatedTextBox = item.chilled_frozen_sec.map((textItem, i) => {
      if(textIndex == i){
        if (textItem.text === text) {
          return { ...textItem, value: value };
        }
      }
      return textItem;
    });
    item.chilled_frozen_sec = updatedTextBox;
    updatedOpeningList[index] = item;
    setOpeningList(updatedOpeningList);
    return updatedTextBox;
  };




  const handleEditChange = async (id) => {
    navigate(`/editchecklist/open/${id}`)
  }


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
          openingList && openingList.length > 0 ? (openingList.map((item, index) => (
            <div key={index} className={`${index !== openingList.length - 1 ? 'border-b-2 border-grey' : ''}`}>
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
                  {/* <HiOutlineDotsVertical  /> */}
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
                      {
                        item.section1 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section1} </span>
                            </div>
                          </div>
                        )
                      }
                      {
                        item.fridge_freezer && item.fridge_freezer.length > 0 && item.fridge_freezer.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`fridgeFreezerText-${index}-${textIndex}`}
                              name={`fridgeFreezerText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleFridgeFreezerChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))
                      }
                      {
                        item.fridge_operating_sec && item.fridge_operating_sec.length > 0 && item.fridge_operating_sec.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <Switch
                              checked={textItem.value}
                              onChange={(e) => handleFridgeOperatingChange(index, textItem.text, e, textIndex)}
                              className={`${textItem.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span
                                className={`${textItem.value ? 'translate-x-6' : 'translate-x-1'
                                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                        ))
                      }
                      {
                        item.section2 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section2} </span>
                            </div>
                          </div>
                        )
                      }
                      {
                        item.theIce && item.theIce.length > 0 && item.theIce.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`fridgeFreezerText-${index}-${textIndex}`}
                              name={`fridgeFreezerText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleTheIceChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))
                      }
                       {
                        item.theTemp && item.theTemp.length > 0 && item.theTemp.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`fridgeFreezerText-${index}-${textIndex}`}
                              name={`fridgeFreezerText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleTheTempChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))
                      } 
                      {
                        item.theProbe_sec && item.theProbe_sec.length > 0 && item.theProbe_sec.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <Switch
                              checked={textItem.value}
                              onChange={(e) => handleTheProbe_SecChange(index, textItem.text, e, textIndex)}
                              className={`${textItem.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span
                                className={`${textItem.value ? 'translate-x-6' : 'translate-x-1'
                                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                        ))
                      }
                      
                      {
                        item.section3 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section3} </span>
                            </div>
                          </div>
                        )
                      }
                       {
                        item.KitchenCheck && item.KitchenCheck.length > 0 && item.KitchenCheck.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <Switch
                              checked={textItem.value}
                              onChange={(e) => handleKitchenCheckChange(index, textItem.text, e, textIndex)}
                              className={`${textItem.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span
                                className={`${textItem.value ? 'translate-x-6' : 'translate-x-1'
                                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                        ))
                      }


                      {
                        item.section4 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section4} </span>
                            </div>
                          </div>
                        )
                      }
                      {
                        item.food_deliver && item.food_deliver.length > 0 && item.food_deliver.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`fridgeFreezerText-${index}-${textIndex}`}
                              name={`fridgeFreezerText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleFoodDeliverChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))
                      } 
                      {
                        item.chilled_frozen_sec && item.chilled_frozen_sec.length > 0 && item.chilled_frozen_sec.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <Switch
                              checked={textItem.value}
                              onChange={(e) => handleChilledFrozenSecChange(index, textItem.text, e, textIndex)}
                              className={`${textItem.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span
                                className={`${textItem.value ? 'translate-x-6' : 'translate-x-1'
                                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                        ))
                      }
                      {
                        item.section5 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section5} </span>
                            </div>
                          </div>
                        )
                      }
                       {
                        item.batch_core && item.batch_core.length > 0 && item.batch_core.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`fridgeFreezerText-${index}-${textIndex}`}
                              name={`fridgeFreezerText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleBatchCoreChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))
                      } 
                      {
                        item.section6 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section6} </span>
                            </div>
                          </div>
                        )
                      }
                        {
                        item.cook_order && item.cook_order.length > 0 && item.cook_order.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`fridgeFreezerText-${index}-${textIndex}`}
                              name={`fridgeFreezerText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleCookOrderChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))
                      } 
                      {
                        item.section7 && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {item.section7} </span>
                            </div>
                          </div>
                        )
                      }
                       {
                        item.cleaningCheck && item.cleaningCheck.length > 0 && item.cleaningCheck.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <Switch
                              checked={textItem.value}
                              onChange={(e) => handleCleaningCheckChange(index, textItem.text, e, textIndex)}
                              className={`${textItem.value ? 'bg-greenSwitch' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span
                                className={`${textItem.value ? 'translate-x-6' : 'translate-x-1'
                                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                        ))
                      }

                      {
                        item.enableTextBox && item.textBox && item.textBox.length > 0 && item.textBox.map((textItem, textIndex) => (
                          <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                            <span className="text-[14px] w-[450px]">{textItem.text}</span>
                            <input
                              id={`addUserText-${index}-${textIndex}`}
                              name={`addUserText-${index}-${textIndex}`}
                              type="text"
                              value={textItem.value}
                              className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => handleAddUserTextChange(index, textItem.text, e.target.value, textIndex)}
                            />
                          </div>
                        ))

                      }
                      {
                        item.checkSection && item.checkSection.length > 0 && item.checkSection.map((checkItem, checkIndex) => (
                          <div key={checkIndex} className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="text-[14px]"> {checkItem} </span>
                            </div>
                          </div>
                        ))
                      }
                      {
                        item.enableFridge && item.fridge && (
                          <div className="flex mt-1 rounded border-b-2 border-pdfGray bg-pdfGray">
                            <div className="w-9/10 p-2 px-3 text-justify">
                              <span className="font-bold text-[14px] block">FRIDGE & FREEZER TEMPERATURES</span>
                              <span className="text-[14px]"> {item.fridge} </span>
                            </div>
                          </div>
                        )
                      }

                    </>
                  ) : ''
                }

              </div>
            </div>
          ))) : (
            <h2 className="font-bold text-center text-[18px]">There is no data.</h2>
          )
        }
      </div>

    </>

  )
}

export default Open;