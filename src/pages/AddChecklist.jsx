import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonCheck from "../components/ButtonCheck";
import { Switch } from '@headlessui/react';
import { Icon } from '@iconify-icon/react';
import { createChecklist } from "../action/checklist";
import { toast } from 'react-toastify';
import moment from 'moment';
import Checkbox from '../components/Checkbox';


const AddChecklist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkType = queryParams.get('checkType');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id)
  }, [])

  const [title, setTitle] = useState("New Task");
  const [enableName, setEnabledName] = useState(false);
  const [enableTemper, setEnabledTemper] = useState(false);
  const [enableButtons, setEnableButtons] = useState("hidden");
  const [name, setName] = useState("");
  const [enableDate, setEnabledDate] = useState(false);
  const [checkSection, setCheckSection] = useState([]);
  const [optionCheck, setOption] = useState([]);
  //////////////////////////////////////////
  const [op, opset] = useState("");
  const [te, teset] = useState("");
  const [se, seset] = useState("");
  

  
  const setUserName = (val) => {
    setName(val);
    const data = {
      "type"  : "username",
      "value" : name,
      "status": "false"
    }
  }

  const recordTemp = () => {
    if(enableTemper) {
      setEnabledTemper(false);
    }else{
      setEnabledTemper(true);
    }
    const data = {
      "type"  : "rocordTemp",
      "value" : [],
      "status": "false"
    }
  }

  const addOption = () => {
    setEnableButtons("hidden");
    let data = {
      "type" : 'option',
      "title" : "option",
      "status": false
    }
    setOption([...optionCheck, data]);
  };

  const addTextbox = () => {
    setEnableButtons('hidden');
    let data = {
      "type" : 'text',
      "title" : "",
      "status": false
    }
    setOption([...optionCheck, data]);
  };

  const handleOptionCheck = (index, value) => {
    opset(value);
    // const updatedOptionCheck = [...optionCheck];
    // updatedOptionCheck[index] = { title: value, value: false };
    // setOption(updatedOptionCheck);
  };
  const handleOptionCheck2 = (index, value) => {
    teset(value);

  }



  const removeOptionCheck = (index) => {
    const updatedOptionCheck = [...optionCheck];
    updatedOptionCheck.splice(index, 1); // Remove the element at the specified index
    setOption(updatedOptionCheck);
  };

  const addSection = () => {
    setEnableButtons('hidden');
    let data = {
      "type" : 'sectionTitle',
      "title" : "This is a Section",
    }
    setOption([...optionCheck, data]);
  };

  const handleSection = (index, value) => {
    seset(value);
    // const updatedSections = [...checkSection];
    // updatedSections[index].title = value;
    // setCheckSection(updatedSections);
  };

  const removeSection = (index) => {
    const updatedSections = [...checkSection];
    updatedSections.splice(index, 1); // Remove the element at the specified index
    setCheckSection(updatedSections);
  };

  const addUserTextBox = (parentIndex) => {
    // Find the parent section by its index
    const updatedSections = checkSection.map((section, index) => {
      if (index === parentIndex) {
        // Create a new item for the data array
        const newItem = {
          type: 'text',
          text: '', // You might want to initialize this with some default value or leave it empty
          value: '',
        };
        // Add the new item to the data array
        return {...section, data: [...section.data, newItem] };
      }
      // Return the section unchanged if it's not the parent section
      return section;
    });
  
    // Update the state with the new sections
    setCheckSection(updatedSections);
  };
  
  const handleUserTextBox = (subIndex, newValue, sectionIndex) => {
    // Create a copy of the current checkSection state
    const updatedSections = [...checkSection];
  
    // Find the section that contains the textbox to update
    const sectionToUpdate = updatedSections[sectionIndex];
  
    // Find the textbox within the section to update
    const textboxToUpdate = sectionToUpdate.data[subIndex];
  
    // Update the textbox text value
    textboxToUpdate.text = newValue;
  
    // Update the state with the new sections
    setCheckSection(updatedSections);
  };
  
  const removeUserTextBox = (subIndex, sectionIndex) => {
    // Create a copy of the current checkSection state
    const updatedSections = [...checkSection];
  
    // Find the section that contains the textbox to remove
    const sectionToUpdate = updatedSections[sectionIndex];
  
    // Filter out the textbox from the section's data array
    const newDataArray = sectionToUpdate.data.filter((_, i) => i!== subIndex);
  
    // Update the section's data array with the filtered array
    const updatedSection = {
     ...sectionToUpdate,
      data: newDataArray,
    };
  
    // Replace the original section with the updated section in the updatedSections array
    updatedSections[sectionIndex] = updatedSection;
  
    // Update the state with the new sections
    setCheckSection(updatedSections);
  };

  const addUserOptions = (parentIndex) => {
    // Find the parent section by its index
    const updatedSections = checkSection.map((section, index) => {
      if (index === parentIndex) {
        // Create a new item for the data array
        const newItem = {
          type: 'option',
          text: '', // You might want to initialize this with some default value or leave it empty
          value: false,
        };
        // Add the new item to the data array
        return {...section, data: [...section.data, newItem] };
      }
      // Return the section unchanged if it's not the parent section
      return section;
    });
  
    // Update the state with the new sections
    setCheckSection(updatedSections);
  };

  const handleSave = async () => {
    
    const isEmptyOptionCheck = optionCheck.some((item) => item.text === '');
    // Check if all titles are empty
    const allTitlesEmpty = checkSection.some(section => section.title.trim() === '');

    // Check if any textarea value in checkOptionCheck is empty
    if (enableName && name === ''){
      toast.error('Please fill in name before saving.');
      return;
    }
    if (title === '') {
      toast.error('Please fill in title before saving.');
      return;
    }
    if (allTitlesEmpty) {
      // If any textarea is empty, show an alert or perform necessary action
      toast.error('Please fill in section before saving.');
      return; // Prevent further execution
    }
    if (isEmptyOptionCheck) {
      toast.error('Please fill in checklist before saving.');
      return;
    }
    const data = {
      'title': title,
      'enableName': enableName,
      'name': name,
      'enableDate': enableDate,
      'optionCheck': optionCheck,
      'checkSection' : checkSection,
      'Type': checkType,
      'userId': userId,
    }

    return ;
    const response = await dispatch(createChecklist(data));
    if (response) {
      if (checkType == 'open') {
        navigate("/open");
      } else {
        navigate("/close")
      }
    }
  }
  const handleCancel = () => {
    if (checkType == 'open') {
      navigate("/open");
    } else {
      navigate("/close")
    }
  }


  return (
    <>
      <div className="mt-[20px] flex justify-between pb-5 items-center border-b-2 border-grey">
        <div >
          <h2 className="font-bold text-[25px] uppercase"> {checkType == 'open' ? 'Opening' : 'Closing'} Checklist</h2>

        </div>
        <div>
          <ButtonCheck handleClick={() => handleCancel()} color="secondary" variant="secondary" label="Cancel" />
          <ButtonCheck handleClick={() => handleSave()} color="primary" variant="primary" label="Save" />
        </div>
      </div>
      
      <div className="flex">
        <div className="shadow-xl p-5 w-[450px] mx-auto my-3">
          <div>
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
          <div className="flex justify-between my-5">
            <p className="uppercase text-[18px] bold">Record temperatures</p>
            <Switch
              checked={enableTemper}
              onChange={recordTemp}
              className={`${enableTemper ? 'bg-greenSwitch' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${enableTemper ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
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

          <div className="mt-2">
            <div className="my-5">
              <ButtonCheck handleClick={()=>setEnableButtons("")} size="normal" color="secondary" variant="secondary" label="Add Field" />
              {
                // if(enableButtons) {}
                  <div className={`${enableButtons} mt-3 absolute`}>
                  <ButtonCheck handleClick={() => addOption()} size="normal" color="secondary" variant="secondary" label="Add Option" /><br />
                  <ButtonCheck handleClick={() => addTextbox()} size="normal" color="secondary" variant="secondary" label="Add User Textbox" /><br />
                  <ButtonCheck handleClick={() => addSection()} size="normal" color="secondary" variant="secondary" label="Add Section" />
                  </div>
              }
            </div>
            <hr />
          </div>
        </div>

        {/* *********************************************************************************************************************************** */}
        <div className="p-5 w-[600px] mx-auto my-3">
            <div className="shadow-xl w-[450px] p-3 mx-auto mt-3"> 
              <h1 className="text-2xl uppercase text-center break-words"> { title } </h1>
              {
                enableName && (
                  <div className="shadow-xl bg-[#c3c3c3] my-3 p-5 w-full">
                    <label htmlFor="name" className="block uppercase leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="my-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={name}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center mt-3">
                      <Checkbox onChange={(e)=>e.preventDefault()} checked={true}></Checkbox>
                    </div>
                  </div>
                )
              }
              {
                enableTemper && (
                  <div className="shadow-xl bg-[#c3c3c3] my-3 p-5 w-full">
                    <label htmlFor="name" className="block uppercase leading-6 text-gray-900">
                      Fridge and Freezer Temperatures
                    </label>
                    <div className="mt-2">
                    <p className="text-center uppercase font-bold">Record the temperatures automatically.</p>
                    </div>
                    <div className="flex justify-center mt-3">
                      <Checkbox checked={true}/>
                    </div>
                  </div>
                )
              }
              {
                enableDate && (
                  <div className="shadow-xl bg-[#c3c3c3] my-3 p-5 w-full">
                    <label htmlFor="name" className="block uppercase leading-6 text-gray-900">
                      Time & Date
                    </label>
                    <div className="mt-2">
                    <p className="text-center uppercase font-bold">Record Date & Time automatically.</p>
                    </div>
                    <div className="flex justify-center mt-3">
                      <Checkbox onChange={(e)=>e.preventDefault()} checked={true}/>
                    </div>
                  </div>
                )
              }

              {
              optionCheck.map((value, index) => {
                if(value.type=="option") {
                return(
                <div className="shadow-xl bg-[#c3c3c3] my-3 py-3 pl-3">
                  <div className="items-end flex justify-between" key={index}>
                    <textarea id={`optionCheck${index}`} name={`optionCheck${index}`} rows={2}
                      className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={op} onChange={(e) => handleOptionCheck(index, e.target.value)} />
                    <div>
                      <Icon icon="mi:delete" className="mx-3 text-[#13ae77] text-[22px]" onClick={() => removeOptionCheck(index)} />
                    </div>
                  </div>
                  <div className="flex justify-center my-3">
                    <Checkbox onChange={(e)=>e.preventDefault()} checked={true}/>
                  </div>
                </div>
              )}
              if(value.type=="text") {
                return(
                  <div className="shadow-xl bg-[#c3c3c3] py-3 pl-3">
                  <div className="items-center flex justify-between" key={index}>
                    <div className="w-[450px]">
                      <div className="flex justify-between">
                        <textarea id={`optionCheck${index}`} name={`optionCheck${index}`} rows={2}
                          className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={te} onChange={(e) => handleOptionCheck2(index, e.target.value)} />
                      </div>
                      <div className="flex my-3">
                        <textarea disabled id={`optionCheck${index}`} name={`optionCheck${index}`} rows={1}
                          className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={value.title} onChange={(e) => handleOptionCheck2(index, e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Icon icon="mi:delete" className="mx-3 text-[#13ae77] text-[22px]" onClick={() => removeOptionCheck(index)} />
                    </div>
                  </div>
                  <div className="flex justify-center my-3">
                    <Checkbox onChange={(e)=>e.preventDefault()} checked={true}/>
                  </div>
                </div>
                )
              }
              if(value.type=="sectionTitle") {
                return(
                  <div className="shadow-xl my-3 bg-[#cce6ea] p-3">
                  <div className="mt-2 flex justify-between items-center" >
                    <textarea id={`addSection${index}`} name={`addSection${index}`} rows={2}
                      className="block w-full roundfd-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={se} onChange={(e) => handleSection(index, e.target.value)}
                    />
                    <Icon icon="mi:delete" className="ml-5 text-[#13ae77] text-[22px]" onClick={() => removeSection(index)} />
                  </div>
                </div>
                )
              }
              })}
            </div>
          </div>
        </div>
      </>
  )
}

export default AddChecklist;