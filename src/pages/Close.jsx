

import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { getClosinglist, updateChecklistStatus } from "../action/checklist";
import { getClosingChecklist } from "../reducer/ChecklistSlice";

const Close = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getClosingCheck = useSelector(getClosingChecklist);
    const [checkedList, setCheckedList] = useState([]);
    const [closingList, setClosingList] = useState([]);
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
        // let data = [
        //     {
        //         "_id": 1,
        //         "content": "Clean and wipe off",
        //         "status": false,
        //         "label": "Utensils"
        //     },
        //     {
        //         "_id": 2,
        //         "content": "Clean and wipe off.",
        //         "status": true,
        //         "label": "Cutlery containers"
        //     },
        // ]
        // setClosingList(data);
        // const initialCheckedList = data.filter(item => item.status).map(item => item._id);
        // setCheckedList(initialCheckedList);
        dispatch(getClosinglist());
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

    return (
        <>
            <h1 className="text-[28px] uppercase">Closing Checks</h1>
            <div className="mt-[50px] flex justify-between pb-5 items-center border-b-2 border-grey">
                <div >
                    <h2 className="font-bold text-[25px]">&nbsp;</h2>
                </div>
                <div>
                    <ButtonCheck color="secondary" variant="secondary" label="Cancel" />
                    <ButtonCheck handleClick={() => handleAdd()} color="secondary" variant="secondary" label="Add" />
                    <ButtonCheck color="primary" variant="primary" label="Save" />
                </div>
            </div>
            <div className="py-5 px-8">

                {
                    closingList && closingList.length > 0 && closingList.map((item, index) => (
                        <div key={index} className="border-2 border-grey rounded my-3 py-3 px-5">
                            {/* <div className="flex justify-between items-center">
                                <span className="font-bold text-[20px]"> {item.label} </span>
                                <IoIosArrowUp className="text-[20px]" />
                            </div> */}
                            <div  className={`flex justify-between items-center py-5 `}>
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
                        </div>


                    ))
                }
            </div>
        </>

    )
}

export default Close;