
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonCheck from "../components/ButtonCheck";
import { Switch } from '@headlessui/react';
import { Icon } from '@iconify-icon/react';
import { createChecklist } from "../action/checklist";
import { toast } from 'react-toastify';
import Checkbox from "../components/Checkbox";
import moment from 'moment';

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
  const [name, setName] = useState("");
  const [enableDate, setEnabledDate] = useState(false);
  const [checkSection, setCheckSection] = useState([]);
  const [taskChecklist, setTaskChecklist] = useState([]);
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

  const handleSave = async () => {
    
    const isEmptyTaskChecklist = taskChecklist.some((item) => item.text === '');
    // Check if all titles are empty
    const allTitlesEmpty = checkSection.some(section => section.title.trim() === '');

    // Check if any textarea value in checkTaskChecklist is empty
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
    const data = {
      'title': title,
      'enableName': enableName,
      'name': name,
      'enableDate': enableDate,
      'taskChecklist': taskChecklist,
      'checkSection' : checkSection,
      'Type': checkType,
      'userId': userId,
    }
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
        <div className="shadow-xl p-5 w-[600px] mx-auto my-3">
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
          {
            enableName && (
              <div className="">
                <label htmlFor="name" className="block uppercase leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
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
          <div className="mt-2">
            <div className="my-5">
              <ButtonCheck handleClick={() => addTaskChecklist()} color="secondary" variant="secondary" label="Add task to checklist" />
              <ButtonCheck handleClick={() => addSection()} color="secondary" variant="secondary" label="Add Section" />
            </div>
            <div className="my-5 ">
              {taskChecklist.map((value, index) => (
                <div className="mt-2 flex justify-between items-center" key={index}>
                  <textarea
                    id={`taskChecklist${index}`}
                    name={`taskChecklist${index}`}
                    rows={1}
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value.text}
                    onChange={(e) => handleTaskChecklist(index, e.target.value)}
                  />
                  <Icon
                    icon="mi:delete"
                    className="ml-5 text-[#13ae77] text-[20px]"
                    onClick={() => removeTaskChecklist(index)} 
                  />
                </div>
                
              ))}
            </div>
            <hr />
            <div className="my-5">
              <h1 className="">Section</h1>
              {checkSection.map((sectionItem, index) => (
                <div key={index}>
                  <div className="mt-2 flex justify-between items-center" >
                    <input
                      type="text"
                      id={`addSection${index}`}
                      name={`addSection${index}`}
                      className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={sectionItem.title}
                      onChange={(e) => handleSection(index, e.target.value)}
                    />
                    <Icon
                      icon="mi:delete"
                      className="ml-5 text-[#13ae77] text-[20px]"
                      onClick={() => removeSection(index)} 
                    />
                  </div>
                  <div className="mt-2">
                    {
                      sectionItem.data && sectionItem.data.length > 0 && sectionItem.data.map((sectionData, subIndex) => (
                        <div className="mt-2 flex justify-between items-center" key={subIndex}>
                          <input
                            type="text"
                            id={`addSectionText${subIndex}`}
                            name={`addSectionText${subIndex}`}
                            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={sectionData.text}
                            onChange={(e) => handleUserTextBox(subIndex, e.target.value, index)}
                          />
                          <Icon
                            icon="mi:delete"
                            className="ml-5 text-[#13ae77] text-[20px]"
                            onClick={() => removeUserTextBox(subIndex, index)} 
                          />
                        </div>
                      ))
                    }
                  </div>
                  <div className="my-2">
                    <ButtonCheck handleClick={() => addUserTextBox(index)} color="secondary" variant="secondary" label="Add User TextBox" />
                    <ButtonCheck handleClick={() => addUserOptions(index)} color="secondary" variant="secondary" label="Add User Options" />
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>
        <div className="p-5 w-[450px] mx-auto my-3">
            <div className="shadow-xl p-5 w-[450px] mx-auto my-3"> 
              <h1 className="font-bold text-center break-words"> { title } </h1>
              <div className="my-5">
                {taskChecklist.map((checkItem, index) => {
                  if(checkItem.text != '')
                  return (
                    <div className={`flex justify-between items-center py-5 `} key={index}>
                      <span className="text-[18px] w-[200px] truncate"> {checkItem.text} </span>
                      <div className="flex justify-between items-center ">
                        <div className="text-right">
                          {enableDate && (
                            <p className="w-[150px]">{moment(new Date()).format('DD.MM.YYYY HH:mm')}</p>
                          )}
                          {enableName && (
                            <p> {name} </p>
                          )}
                        </div>
                        <Checkbox  />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="my-2">
              {checkSection.map((sectionItem, index) => {
                if(sectionItem.title){
                  return (
                    <div key={index}>
                      <div className="my-2" >
                        <h1 className="truncate">{sectionItem.title}</h1>
                        <div className="w-full mt-2 h-[2px] bg-[#E5E7EB]"></div>                    
                      </div>
                      <div className="mt-2">
                      {
                        sectionItem.data && sectionItem.data.length > 0 && sectionItem.data.map((sectionData, subIndex) => {
                          // Check if sectionData.text is not empty
                          if (sectionData.text.trim()!== '') {
                            if(sectionData.type == 'text'){
                              return (
                                <div className="mt-2 " key={subIndex}>
                                  <p className="truncate"> {sectionData.text} </p>
                                  <button className="block w-full mt-2 rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    &nbsp;
                                  </button>
                                </div>
                              )
                            } else {
                              return (
                                <div className="mt-2 " key={subIndex}>
                                  <p className="truncate"> {sectionData.text} </p>
                                  <button className="block w-full mt-2 rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    Yes
                                  </button>
                                  <button className="block w-full mt-2 rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    No
                                  </button>
                                </div>
                              )
                            }
                          }
                        })
                      }
                      </div>
                    </div>
                  )
                }
                
              })}
              </div>
            </div>
        </div>
          
      </div>
        

    </>
  )
}

export default AddChecklist;