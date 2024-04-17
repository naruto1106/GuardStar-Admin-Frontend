
import React, { useEffect, useState } from "react"
import Checkbox from "../components/Checkbox";
import ButtonCheck from "../components/ButtonCheck";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";



const Open = () => {
    const [checkedList, setCheckedList] = useState([]);
    const [openingList, setOpeningList] = useState([]);

    useEffect(() => {
        let data = [
            {
                "_id": 1,
                "content": "Set tables with place settings",
                "status": false
            },
            {
                "_id": 2,
                "content": "Clean and sanitize the windows, tables and all surfaces.",
                "status": false
            },
            {
                "_id": 3,
                "content": "Assure that trash bins are empty.",
                "status": false
            },
            {
                "_id": 4,
                "content": "Clean the bathroom thoroughly.",
                "status": false
            },
            {
                "_id": 5,
                "content": "Fold napkins and place table settings.",
                "status": false
            },
            {
                "_id": 6,
                "content": "Restock tabletop necessities (sugar packets, jam and butter, ketchup, etc).",
                "status": false
            }

        ]
        setOpeningList(data);
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
            <h1 className="text-[28px] uppercase">Opening Checks</h1>
            <div className="mt-[70px] flex justify-between pb-5 items-center border-b-2 border-grey">
                <div >
                    <h2 className="font-bold text-[25px]">Opening Checklist</h2>

                </div>
                <div>
                    <ButtonCheck color="secondary" variant="secondary" label="Cancel" />
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
                            <span className="text-[18px] w-[280px]"> {item.content} </span>
                            <div className="flex justify-between items-center">
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