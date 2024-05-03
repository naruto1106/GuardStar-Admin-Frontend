
import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

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
        if(getOpeningCheck) {
            setOpeningList(getOpeningCheck);
            const initialCheckedList = getOpeningCheck.filter(item => item.status).map(item => item._id);
            setCheckedList(initialCheckedList);
        }
    },[getOpeningCheck])
    
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

        const textboxData = handleAddUserTextChange(Index);

        const data = {
            "id" : id,
            "status" : status,
            "textBox" : textboxData
        }
        console.log(data,'data');
        dispatch(updateChecklistStatus(data))
    };

    const handleAdd = () => {
        navigate('/addchecklist?checkType=open')
    }
     
    const handleAddUserTextChange = (index, text, value) => {
        // Make a deep copy of the current openingList
        const updatedOpeningList = openingList.map(item => ({ ...item }));
    
        // Get the item at the specified index
        const item = updatedOpeningList[index];
    
        // Find the textBox entry with the specified text
        const updatedTextBox = item.textBox.map(textItem => {
            if (textItem.text === text) {
                // Return a new object with updated value
                return { ...textItem, value: value };
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
    
        
    
    
    const handleEditChange =async (id) => {
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
                {/* <div className="flex justify-between items-center">
                    <span className="font-bold text-[20px]">09:00</span>
                    <IoIosArrowUp className="text-[20px]" />
                </div> */}
                {
                    openingList && openingList.length > 0 ? ( openingList.map((item, index) => (
                        <div key={index} className={`${index !== openingList.length - 1 ? 'border-b-2 border-grey' : ''}`}>
                            <div  className={`flex justify-between items-center py-5 `}>
                                <span className="text-[18px] w-[400px]"> {item.title} </span>
                                <div className="flex justify-between items-center">
                                    <div className="text-right">
                                        {item.enableDate && (
                                            <p>{moment(item.date).format('DD.MM.YYYY HH:mm')}</p>
                                        )}
                                        {item.enableName && (
                                            <p> { item.name } </p>
                                        )}
                                    </div>
                                    <Checkbox id={item._id} label="" checked={checkedList.includes(item._id)} onChange={() => handleCheckboxChange(item._id, index)} />
                                    {/* <HiOutlineDotsVertical  /> */}
                                    <FaEdit className="cursor-pointer" onClick={()=>handleEditChange(item.checklistId)} />

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
                                            item.enableTextBox && item.textBox && item.textBox.length > 0 && item.textBox.map((textItem, textIndex) => (
                                                <div className="flex justify-between items-center my-1" key={`${index}-${textIndex}`}>
                                                    <span className="text-[14px] w-[450px]">{textItem.text}</span>
                                                    <input
                                                        id={`addUserText-${index}-${textIndex}`}
                                                        name={`addUserText-${index}-${textIndex}`}
                                                        type="text"
                                                        value={textItem.value}
                                                        className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        onChange={(e) => handleAddUserTextChange(index, textItem.text, e.target.value)}
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
                        <h2 className="font-bold text-center text-[18px]">Today is not opening.</h2>
                    )
                }
            </div>





        </>

    )
}

export default Open;