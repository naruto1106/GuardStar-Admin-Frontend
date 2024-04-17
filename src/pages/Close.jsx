

import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";

const Close = () => {
    const [checkedList, setCheckedList] = useState([]);
    const [closingList, setClosingList] = useState([]);

    useEffect(() => {
        let data = [
            {
                "_id": 1,
                "content": "Clean and wipe off",
                "status": false,
                "label": "Utensils"
            },
            {
                "_id": 2,
                "content": "Clean and wipe off.",
                "status": true,
                "label": "Cutlery containers"
            },
            {
                "_id": 3,
                "content": "Remove items and clean the surfaces.",
                "status": false,
                "label": "Dry Goods Storage"
            },
            {
                "_id": 4,
                "content": "Remove products, clean surfaces, wipe off and disinfect.",
                "status": true,
                "label": "Chilled Storage"
            }

        ]
        setClosingList(data);
        const initialCheckedList = data.filter(item => item.status).map(item => item._id);
        setCheckedList(initialCheckedList);
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
                    <ButtonCheck color="primary" variant="primary" label="Save" />
                </div>
            </div>
            <div className="py-5 px-8">

                {
                    closingList && closingList.length > 0 && closingList.map((item, index) => (
                        <div key={index} className="border-2 border-grey rounded my-3 py-3 px-5">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-[20px]"> {item.label} </span>
                                <IoIosArrowUp className="text-[20px]" />
                            </div>
                            <div  className={`flex justify-between items-center py-5 `}>
                                <span className="text-[18px] w-[280px]"> {item.content} </span>
                                <div className="flex justify-between items-center">
                                    <div className="text-right">
                                        <p>12.07.2023  19:50</p>
                                        <p >Adam</p>
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