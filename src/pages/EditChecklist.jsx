
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEditChecklist } from "../action/checklist";
import ButtonCheck from "../components/ButtonCheck";
import { Switch } from '@headlessui/react';
import { Icon } from '@iconify-icon/react';
import { updateChecklist } from "../action/checklist";
import { toast } from 'react-toastify';
import Checkbox from "../components/Checkbox";
import moment from 'moment';


const EditChecklist = () => {
  const { id, checkType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enableName, setEnabledName] = useState(false);
  const [name, setName] = useState("");
  const [enableDate, setEnabledDate] = useState(false);
  const [title, setTitle] = useState("");
  const [checkSection, setCheckSection] = useState([]);
  const [taskChecklist, setTaskChecklist] = useState([]);

  const [checklist, setChecklist] = useState([]);
  const [content, createContent] = useState("");
  const [switch1, setSwitch1]=useState(false);
  const [switch2, setSwitch2]=useState(false);
  const [switch3, setSwitch3]=useState(false);

  useEffect(()=> {
    const fetchData = async() => {
      const response = await dispatch(getEditChecklist(id));
      console.log(response, 'response');
      if(response) {
        setEnabledName(response[0].enableName);
        setName(response[0].name);
        setEnabledDate(response[0].enableDate);
        setTitle(response[0].title);
        setCheckSection(response[0].checkSection);
        setTaskChecklist(response[0].taskChecklist)
      }
    }
    fetchData()
  }, [])

  const addChecklist=()=>{
    if(title=="") {
      toast.error("Fill in the Title")
    }else{
    const data={
      'title'   : title,
      'content' : content,
      'status'  : true
    }
    setChecklist([...checklist, data])
    setTitle("");
    createContent("");
    setSwitch1("");
    setSwitch2("");
    setSwitch3("");
  }
  }

  const removechecklist = (index) => {
    const updatedchecklist = [...checklist];
    updatedchecklist.splice(index, 1); // Remove the element at the specified index
    setChecklist(updatedchecklist);
  };

  const addTaskChecklist = () => {
    let data = {
      "text" : '',
      "value" : false
    }
    setTaskChecklist([...taskChecklist, data]);
  };
  const handleTaskChecklist = (index, value) => {
    const updatedTaskChecklist = [...taskChecklist];
    updatedTaskChecklist[index] = { text: value, value: false };
    setTaskChecklist(updatedTaskChecklist);
  };
  const removeTaskChecklist = (index) => {
    const updatedTaskChecklist = [...taskChecklist];
    updatedTaskChecklist.splice(index, 1); // Remove the element at the specified index
    setTaskChecklist(updatedTaskChecklist);
  };

  const addSection = () => {
    let data = {
      'title' : '',
      'data' : []
    }
    setCheckSection([...checkSection, data]);
  };

  
  const switchText=()=>{
    if(switch2!=switch3) {
      toast.error("You can select one at once.");
    }else {
    if(switch1) {
      setSwitch1(false);
    }
    else {
      setSwitch1(true);
      createContent("textbox");
    }
  }
  }
  
  const switchTemp=()=>{
    if(switch1!=switch3) {
      toast.error("You can select one at once.");
    }else {
    if(switch2) {
      setSwitch2(false);
    }
    else {
      setSwitch2(true);
      createContent("*Record Fridge Temperatures Automatically*");
    }
  }
  }

  const switchTime=()=>{
    if(switch2!=switch1) {
      toast.error("You can select one at once.");
    }else {
    if(switch3) {
      setSwitch3(false);
    }
    else {
      setSwitch3(true);
      createContent("*Record Time & Date Automatically*");
    }
  }
  }

  const handleSection = (index, value) => {
    const updatedSections = [...checkSection];
    updatedSections[index].title = value;
    setCheckSection(updatedSections);
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

  const handleCancel = () => {
    if (checkType == 'open') {
      navigate("/open");
    } else {
      navigate("/close")
    }
  }

  const handleSave = async () => {
    const isEmptyTaskChecklist = taskChecklist.some((item) => item.text === '');
    // Check if all titles are empty
    const allTitlesEmpty = checkSection.some(section => section.title.trim() === '');

    // Check if any textarea value in checkTaskChecklist is empty
    // const isEmptyTaskChecklist = taskChecklist.some((value) => value.trim() === '');
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
    if (isEmptyTaskChecklist) {
      toast.error('Please fill in checklist before saving.');
      return;
    }


    return 
    
    const data = {
      'title': title,
      'enableName': enableName,
      'name': name,
      'enableDate': enableDate,
      'taskChecklist': taskChecklist,
      'checkSection' : checkSection,
      'id': id,
    }
    console.log(data, 'data');
    const response = await dispatch(updateChecklist(data));
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
        <div>
          <h2 className="font-bold text-[25px] uppercase"> {checkType == 'open' ? 'Opening' : 'Closing'} checklist</h2>
        </div>
        <div>
          <ButtonCheck handleClick={() => handleCancel()} color="secondary" variant="secondary" label="Cancel" />
          <ButtonCheck handleClick={() => handleSave()} color="primary" variant="primary" label="Save" />
        </div>
      </div>
      
      <div className="flex w-full border-t-2">
        <div className="shadow-xl p-5 w-[500px] ml-10 my-3">
          <div>
            <label htmlFor="title" className="block mt-10 uppercase font-medium leading-6 text-gray-900">
              checklist task title
            </label>
            <div className="mt-2">
              <input id="title" name="title" type="text"
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
          </div>
          
          <div className="flex justify-between my-5">
            <p className="uppercase text-[18px] bold">Add Textbox</p>
            <Switch checked={switch1} onChange={switchText} className={`${switch1 ? 'bg-greenSwitch' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className={`${switch1 ? 'translate-x-6' : 'translate-x-1' } inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
          <div className="flex justify-between my-5">
            <p className="uppercase text-[18px] bold">Record temperatures</p>
            <Switch checked={switch2} onChange={switchTemp} className={`${switch2 ? 'bg-greenSwitch' : 'bg-gray-200' } relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className={`${switch2 ? 'translate-x-6' : 'translate-x-1' } inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
            </Switch>
          </div>
          <div className="flex justify-between my-5">
            <p className="uppercase text-[18px] bold">Record Time & Date</p>
            <Switch checked={switch3} onChange={switchTime} className={`${switch3 ? 'bg-greenSwitch' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className={`${switch3 ? 'translate-x-6' : 'translate-x-1' } inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>

          <div className="mt-2">
            <div className="my-5">
              <ButtonCheck handleClick={()=>addChecklist()} size="primary" color="secondary" variant="secondary" label="Add task" />
              <ButtonCheck handleClick={() => addSection()} size="primary" color="secondary" variant="secondary" label="Add Section" />
            </div>
            <hr />
          </div>
        </div>

{/* *********************************************************************************************************************************** */}
        <div className="px-5 w-[500px] mx-auto">
          <div className="shadow-xl p-3 mx-auto mt-3">
            {
              checklist.map((value, index) => {
                if(value.content=="textbox") {
                  return(
                    <div className="bg-[#e3e3e3] px-3 my-3" key={`1${index}`}>
                      <div className="grid grid-cols-10 items-end flex justify-between" key={`2${index}`}>
                        <div className="col-span-9" key={`3${index}`}>
                          <h1 key={`h1${index}`} className="text-xl uppercase break-words m-1">{value.title}</h1>
                          <textarea disabled key={`textarea${index}`} id={`textarea${index}`} name={`checklist${index}`} rows={1}
                            className="bg-[#e3e3e3] block w-full rounded-md border-1 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>  
                        <div key={`4${index}`}>
                          <Icon key={`icon${index}`} icon="mi:delete" className="mx-3 text-[#13ae77] text-[22px]" onClick={() => removechecklist(index)} />
                        </div>
                      </div>
                      <div className="flex justify-center py-3" key={`5${index}`}>
                        <Checkbox key={`checkbox${index}`} onChange={(e)=>e.preventDefault()} checked={true}/>
                      </div>
                    </div>
                  )
                }
                if(value.content=="*Record Fridge Temperatures Automatically*") {
                  return(
                    <div className="bg-[#e3e3e3] px-3 my-3" key={`1${index}`}>
                      <div className="grid grid-cols-10 items-end flex justify-between" key={`2${index}`}>
                        <div className="col-span-9" key={`3${index}`}>
                          <h1 key={`h1${index}`} className="text-xl uppercase break-words m-1">{value.title}</h1>
                          <textarea disabled key={`textarea${index}`} id={`textarea${index}`} name={`checklist${index}`} rows={2}
                            className="bg-[#e3e3e3] w-full text-xl text-center border-hidden p-3" value={value.content} />
                          </div>  
                        <div key={`4${index}`}>
                          <Icon key={`icon${index}`} icon="mi:delete" className="mx-3 text-[#13ae77] text-[22px]" onClick={() => removechecklist(index)} />
                        </div>
                      </div>
                      <div className="flex justify-center py-3" key={`5${index}`}>
                        <Checkbox key={`checkbox${index}`} onChange={(e)=>e.preventDefault()} checked={true}/>
                      </div>
                    </div>
                  )
                }
                if(value.content=="*Record Time & Date Automatically*") {
                  return(
                    <div className="bg-[#e3e3e3] px-3 my-3" key={`1${index}`}>
                      <div className="grid grid-cols-10 items-end flex justify-between" key={`2${index}`}>
                        <div className="col-span-9" key={`3${index}`}>
                          <h1 key={`h1${index}`} className="text-xl uppercase break-words m-1">{value.title}</h1>
                          <textarea disabled key={`textarea${index}`} id={`textarea${index}`} name={`checklist${index}`} rows={2}
                            className="bg-[#e3e3e3] w-full text-xl text-center border-hidden p-3" value={value.content} />
                          </div>  
                        <div key={`4${index}`}>
                          <Icon key={`icon${index}`} icon="mi:delete" className="mx-3 text-[#13ae77] text-[22px]" onClick={() => removechecklist(index)} />
                        </div>
                      </div>
                      <div className="flex justify-center py-3" key={`5${index}`}>
                        <Checkbox key={`checkbox${index}`} onChange={(e)=>e.preventDefault()} checked={true}/>
                      </div>
                    </div>
                  )
                }
                if(value.title=="") {
                  return(
                    <div className="bg-[#e9f5f5] grid grid-cols-10 items-center flex justify-between px-3 my-3" key={`1${index}`}>
                        <div className="col-span-9" key={`3${index}`}>
                          <h1 key={`h1${index}`} className="text-xl uppercase break-words m-1"></h1>
                          <textarea disabled key={`textarea${index}`} id={`textarea${index}`} name={`checklist${index}`} rows={2}
                            className="bg-[#e9f5f5] w-full text-xl text-center border-hidden p-3" value={value.content} />
                          </div>  
                        <div key={`4${index}`}>
                          <Icon key={`icon${index}`} icon="mi:delete" className="mx-3 text-[#13ae77] text-[22px]" onClick={() => removechecklist(index)} />
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

export default EditChecklist