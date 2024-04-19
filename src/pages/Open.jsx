
import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { getOpeninglist, updateChecklistStatus } from "../action/checklist";
import { getOpeningChecklist } from "../reducer/ChecklistSlice";

const Open = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getOpeningCheck = useSelector(getOpeningChecklist);
    const [checkedList, setCheckedList] = useState([]);
    const [openingList, setOpeningList] = useState([]);

    useEffect(() => {
        if(getOpeningCheck) {
            setOpeningList(getOpeningCheck);
            const initialCheckedList = getOpeningCheck.filter(item => item.status).map(item => item._id);
            setCheckedList(initialCheckedList);
        }
    },[getOpeningCheck])
    
    useEffect(() => {
        dispatch(getOpeninglist());
    }, [])

    const handleCheckboxChange = (id) => {
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
            "id" : id,
            "status" : status,
            "textBox" : ""
        }
        dispatch(updateChecklistStatus(data))
    };

    const handleAdd = () => {
        navigate('/addchecklist?checkType=open')
    }


    return (
        <>
            <h1 className="text-[28px] uppercase">Opening Checks</h1>
            <div className="mt-[70px] flex justify-between pb-5 items-center border-b-2 border-grey">
                <div >
                    <h2 className="font-bold text-[25px]">Opening Checklist</h2>

                </div>
                <div>
                    <ButtonCheck color="secondary" variant="secondary" label="Cancel" />
                    <ButtonCheck handleClick={() => handleAdd()} color="secondary" variant="secondary" label="Add" />
                    <ButtonCheck color="primary" variant="primary" label="Save" />
                </div>
            </div>
            <div className="border-t-2 border-l-2 border-grey py-5 px-8">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-[20px]">09:00</span>
                    <IoIosArrowUp className="text-[20px]" />
                </div>
                {
                    openingList && openingList.length > 0 && openingList.map((item, index) => (
                        <div key={index} className={`flex justify-between items-center py-5 ${index !== openingList.length - 1 ? 'border-b-2 border-grey' : ''}`}>
                            <span className="text-[18px] w-[280px]"> {item.title} </span>
                            <div className="flex justify-between items-center">
                                <div className="text-right">
                                    {item.enableDate && (
                                        <p>{moment(item.date).format('DD.MM.YYYY HH:mm')}</p>
                                    )}
                                    {item.enableName && (
                                        <p> { item.name } </p>
                                    )}
                                </div>
                                <Checkbox id={item._id} label="" checked={checkedList.includes(item._id)} onChange={() => handleCheckboxChange(item._id)} />
                                <HiOutlineDotsVertical />
                            </div>
                        </div>
                    ))
                }
            </div>





        </>

    )
}

export default Open;