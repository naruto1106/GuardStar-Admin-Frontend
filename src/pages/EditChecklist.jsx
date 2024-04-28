
import React, { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getEditChecklist } from "../action/checklist";

import { getCheckType } from "../reducer/ChecklistSlice";
import ButtonCheck from "../components/ButtonCheck";
import { Switch } from '@headlessui/react';
import { Icon } from '@iconify-icon/react';
import { updateChecklist } from "../action/checklist";
import { toast } from 'react-toastify';




const EditChecklist = () => {
  const { id, checkType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // const [editList, setEditList] = useState([]);
  const [enableName, setEnabledName] = useState(false);
  const [name, setName] = useState("");
  const [enableDate, setEnabledDate] = useState(false);
  const [enableFridge, setEnabledFridge] = useState(false);
  const [fridgeSection, setFridgeSection] = useState("");
  const [enableTextBox, setEnabledTextBox] = useState(false);
  const [title, setTitle] = useState("");
  const [addUserText, setAddUserText] = useState([]);
  const [checkSection, setCheckSection] = useState([]);
  
  useEffect(()=> {
    const fetchData = async() => {
      const response = await dispatch(getEditChecklist(id));
      console.log(response, 'response');
      if(response) {
        setEnabledName(response[0].enableName);
        setName(response[0].name);
        setEnabledDate(response[0].enableDate);
        setEnabledFridge(response[0].enableFridge);
        setFridgeSection(response[0].fridge);
        setEnabledTextBox(response[0].enableTextBox);
        setTitle(response[0].title);
        setAddUserText(response[0].textBox);
        setCheckSection(response[0].checkSection);
      }
      // setEditList(response);
    }
    fetchData()
        
  }, [])

  const addSection = () => {
    setCheckSection([...checkSection, '']);
  };

  const handleTextareaChange = (index, value) => {
    const updatedSections = [...checkSection];
    updatedSections[index] = value;
    setCheckSection(updatedSections);
  };

  const removeSection = (index) => {
    const updatedSections = [...checkSection];
    updatedSections.splice(index, 1); // Remove the element at the specified index
    setCheckSection(updatedSections);
  };

  const addUserTextBox = () => {
    setAddUserText([...addUserText, '']);
  };

  const handleAddUserTextChange = (index, key, newValue) => {
    const updatedAddUserText = [...addUserText];
    let data = {
      [key]: newValue
    }
    updatedAddUserText[index] = data
    setAddUserText(updatedAddUserText);
  };


  const removeAddUserText = (index) => {
    const updatedAddUserText = [...addUserText];
    updatedAddUserText.splice(index, 1); // Remove the element at the specified index
    setAddUserText(updatedAddUserText);
  };

  const handleCancel = () => {
    if (checkType == 'open') {
      navigate("/open");
    } else {
      navigate("/close")
    }
  }

  const handleSave = async () => {

    const hasEmptyKey = addUserText.some(item => {
      if (typeof item === 'object' && item !== null) {
        // If the item is an object, check if any key is empty
        return Object.keys(item).some(key => key === '');
      } else {
        // If the item is not an object, check if it's an empty string
        return item === '';
      }
    });
    // Check if any textarea value in checkSection is empty
    const isEmptySection = checkSection.some((value) => value.trim() === '');
    if (enableName && name === ''){
      toast.error('Please fill in name before saving.');
      return;
    }
    if (title === '') {
      toast.error('Please fill in title before saving.');
      return;
    }
    if (hasEmptyKey) {
      // If any textarea is empty, show an alert or perform necessary action
      toast.error('Please fill in textbox before saving.');
      return; // Prevent further execution
    }
    if (isEmptySection) {
      toast.error('Please fill in sections before saving.');
      return;
    }
    
    const data = {
      'enableName': enableName,
      'enableDate': enableDate,
      'enableFridge': enableFridge,
      'enableTextBox': enableTextBox,
      'title': title,
      'checkSection': checkSection,
      'name': name,
      'id': id,
      'addUserText': addUserText,
      'fridgeSection':fridgeSection
    }
    console.log(data, 'data');
    const response = await dispatch(updateChecklist(data));

    setEnabledName(false);
    setEnabledDate(false);
    setEnabledFridge(false);
    setEnabledTextBox(false);
    setTitle("");
    setCheckSection([]);
    if (response) {
      if (checkType == 'open') {
        navigate("/open");
      } else {
        navigate("/close")
      }
    }
  }


  return (
    <>
       <div className="mt-[20px] flex justify-between pb-5 items-center border-b-2 border-grey">
        <div >
          <h2 className="font-bold text-[25px] uppercase"> Edit Checklist</h2>
        </div>
        <div>
          <ButtonCheck handleClick={() => handleCancel()} color="secondary" variant="secondary" label="Cancel" />
          <ButtonCheck handleClick={() => handleSave()} color="primary" variant="primary" label="Save" />
        </div>
      </div>
      <div className="shadow-xl p-5 w-[500px] mx-auto my-3">
        <div className="flex justify-between my-5">
          <p className="uppercase text-[18px] bold">Name of User</p>
          <Switch
            checked={enableName}
            onChange={setEnabledName}
            className={`${enableName ? 'bg-greenSwitch' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
          >

            <span
              className={`${enableName ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        {
          enableName && (
            <div className="">
              <label htmlFor="title" className="block uppercase leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )
        }
        <div className="flex justify-between my-5">
          <p className="uppercase text-[18px] bold">Record Time & Date</p>
          <Switch
            checked={enableDate}
            onChange={setEnabledDate}
            className={`${enableDate ? 'bg-greenSwitch' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
          >

            <span
              className={`${enableDate ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <div className="flex justify-between my-5">
          <p className="uppercase text-[18px] bold">Record Fridge & Freezer Temperatures</p>
          <Switch
            checked={enableFridge}
            onChange={setEnabledFridge}
            className={`${enableFridge ? 'bg-greenSwitch' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
          >

            <span
              className={`${enableFridge ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        {
          enableFridge && (
            <div className="">
              <div className="mt-2">
                <textarea
                  id="fridge_section"
                  name="fridge_section"
                  row = {2}
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={fridgeSection}
                  onChange={(e) => setFridgeSection(e.target.value)}
                />
              </div>
            </div>
          )
        }
        <div className="my-5">
          <label htmlFor="title" className="block mt-10 uppercase font-medium leading-6 text-gray-900">
            Checklist task title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between my-5">
          <p className="uppercase text-[18px] bold">Add User TextBox</p>
          <Switch
            checked={enableTextBox}
            onChange={setEnabledTextBox}
            className={`${enableTextBox ? 'bg-greenSwitch' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
          >

            <span
              className={`${enableTextBox ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        {
          enableTextBox && (
            <>
              <div className="my-5">
                <ButtonCheck handleClick={() => addUserTextBox()} color="secondary" variant="secondary" label="Add User Textbox" />
              </div>
              <div className="my-5 ">
                { addUserText && addUserText.map((item, index) => {
                  const key = Object.keys(item)[0] || ''; // Get the key dynamically
                  const value = item[key] || ''; // Initialize value with an empty string if undefined
                  return (
                    <div className="mt-2 flex justify-between items-center" key={index}>
                      <input
                        id={`addUserText${index}`}
                        name={`addUserText${index}`}
                        type="text"
                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={key}
                        onChange={(e) => handleAddUserTextChange(index, e.target.value, value)}
                      />
                      <Icon
                        icon="mi:delete"
                        className="ml-5 text-[#13ae77] text-[20px]"
                        onClick={() => removeAddUserText(index)} // Call removeSection with the current index
                      />
                    </div>
                  )
                })}
              </div>
            </>
          )
        }

        <div className="my-5">
          <ButtonCheck handleClick={() => addSection()} color="secondary" variant="secondary" label="Add Section to checklist" />
        </div>
        <div className="my-5 ">
          {checkSection && checkSection.map((value, index) => (
            <div className="mt-2 flex justify-between items-center" key={index}>
              <textarea
                id={`incident${index}`}
                name={`incident${index}`}
                rows={1}
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={value}
                onChange={(e) => handleTextareaChange(index, e.target.value)}
              />
              <Icon
                icon="mi:delete"
                className="ml-5 text-[#13ae77] text-[20px]"
                onClick={() => removeSection(index)} // Call removeSection with the current index
              />
            </div>
          ))}
        </div>


      </div>
    </>
  )
}

export default EditChecklist