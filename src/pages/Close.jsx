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
        if(getClosingCheck){
            setClosingList(getClosingCheck);
            const initialCheckedList = getClosingCheck.filter(item => item.status).map(item => item._id);
            setCheckedList(initialCheckedList);
        }
    },[getClosingCheck])

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
        const textboxData = handleAddUserTextChange(Index);
        const data = {
            "id" : id,
            "status" : status,
            "textBox" : textboxData
        }
        dispatch(updateChecklistStatus(data))
    };

    const handleAddUserTextChange = (index, key, value) => {
        // Make a deep copy of the current openingList
        const updatedClosingList = closingList.map(item => ({ ...item }));
    
        // Get the item at the specified index
        const item = updatedClosingList[index];
    
        // Find the textbox entry with the specified key
        const textBoxEntryIndex = item.textBox.findIndex(entry => Object.keys(entry)[0] === key);
    
        // If textBoxEntry exists, update its value
        if (textBoxEntryIndex !== -1) {
            // Make a deep copy of the textBox entry
            const updatedTextBoxEntry = { ...item.textBox[textBoxEntryIndex] };
    
            // Update the value of the textBox entry
            updatedTextBoxEntry[Object.keys(updatedTextBoxEntry)[0]] = value;
    
            // Update the textBox entry in the item
            item.textBox = item.textBox.map((entry, idx) => idx === textBoxEntryIndex ? updatedTextBoxEntry : entry);
    
            // Update the openingList with the modified item
            updatedClosingList[index] = { ...item };
    
            // Assuming you're using React hooks to manage state, update the state with the modified openingList
            setClosingList(updatedClosingList);
        }
    
        // Return the updated textbox data
        return item.textBox;
    };

    const handleEditChange =async (id) => {
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
                    closingList && closingList.length > 0 && closingList.map((item, index) => (
                        <div key={index} className={`${index !== closingList.length - 1 ? 'border-b-2 border-grey' : ''}`}>
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
                                                    <span className="text-[14px] w-[450px]">{Object.keys(textItem)[0]}</span>
                                                    <input
                                                        id={`addUserText-${index}-${textIndex}`}
                                                        name={`addUserText-${index}-${textIndex}`}
                                                        type="text"
                                                        value={Object.values(textItem)[0]}
                                                        className="block sm  rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        onChange={(e) => handleAddUserTextChange(index, Object.keys(textItem)[0], e.target.value)}
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
                    ))
                }
            </div>
        </>

    )
}

export default Close;