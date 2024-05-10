
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
  
  console.log('response', checklist);
  useEffect(()=> {
    const fetchData = async() => {
      const response = await dispatch(getEditChecklist(id));
      const data=response[0].checklist;
      if(response) {
        setChecklist(data);
      }
    }
    fetchData()
  }, [])

  const addChecklist=()=>{
    if(title=="") {
      toast.error("Fill in the Title")
    }else{
      let type = "option"; 
      if(switch1) {
        type = "textbox";
      } 
      if(switch2) {
        type = "re_temp";
      } 
      if(switch3) {
        type = "re_time";
      } 
      const data={
        'type'    : type,
        'title'   : title,
        'content' : content,
        'status'  : false
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

  const addSection = () => {
    if(title=="") {
      toast.error("Fill in the Title")
    }else{
    addChecklist('hidden');
    const data={
      'type'    : 'section',
      'title'   : "",
      'content' : title,
      'status'  : false
    }
    setChecklist([...checklist, data]);
  }
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
  

  const handleCancel = () => {
    if (checkType == 'open') {
      navigate("/open");
    } else {
      navigate("/close")
    }
  }

  const handleSave = async () => {
    // const isEmptyTaskChecklist = taskChecklist.some((item) => item.text === '');
    // // Check if all titles are empty
    // const allTitlesEmpty = checkSection.some(section => section.title.trim() === '');

    // // Check if any textarea value in checkTaskChecklist is empty
    // // const isEmptyTaskChecklist = taskChecklist.some((value) => value.trim() === '');
    // if (enableName && name === ''){
    //   toast.error('Please fill in name before saving.');
    //   return;
    // }
    // if (title === '') {
    //   toast.error('Please fill in title before saving.');
    //   return;
    // }
    // if (allTitlesEmpty) {
    //   // If any textarea is empty, show an alert or perform necessary action
    //   toast.error('Please fill in section before saving.');
    //   return; // Prevent further execution
    // }
    // if (isEmptyTaskChecklist) {
    //   toast.error('Please fill in checklist before saving.');
    //   return;
    // }


    // return 
    
    const data = {
      'checklist': checklist,
      'id': id,
    }
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
          <h2 className="font-bold text-[25px] uppercase">Edit {checkType == 'open' ? 'Opening' : 'Closing'} checklist</h2>
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
                if(value.content=="") {
                  return(
                    <div className="bg-[#e3e3e3] px-3 my-3" key={`1${index}`}>
                      <div className="bg-[#e3e3e3] grid grid-cols-10 items-center flex justify-between px-3 my-3" key={`1${index}`}>
                          <div className="col-span-9" key={`3${index}`}>
                            <h1 key={`h1${index}`} className="text-xl uppercase break-words m-1"></h1>
                            <textarea disabled key={`textarea${index}`} id={`textarea${index}`} name={`checklist${index}`} rows={1}
                              className="bg-[#e3e3e3] w-full text-xl text-center border-hidden" value={value.title} />
                            </div>  
                          <div className="pt-8 mt-5" key={`4${index}`}>
                            <Icon key={`icon${index}`} icon="mi:delete" className="mx-3  text-[#13ae77] text-[22px]" onClick={() => removechecklist(index)} />
                          </div>
                      </div>
                      <div className="flex justify-center pb-3" key={`5${index}`}>
                        <Checkbox key={`checkbox${index}`} onChange={(e)=>e.preventDefault()} checked={true}/>
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