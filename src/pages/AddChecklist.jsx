
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getCheckType } from "../reducer/ChecklistSlice";
import ButtonCheck from "../components/ButtonCheck";
import { Switch } from '@headlessui/react';
import { Icon } from '@iconify-icon/react';
import { createChecklist } from "../action/checklist";
import { toast } from 'react-toastify';

const AddChecklist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const checkType = queryParams.get('checkType');
    
    const [enableName, setEnabledName] = useState(false);
    const [enableDate, setEnabledDate] = useState(false);
    const [enableFridge, setEnabledFridge] = useState(false);
    const [enableTextBox, setEnabledTextBox] = useState(false);
    const [title, setTitle] = useState("");
    const [checkSection, setCheckSection] = useState([]);

    const handleSave = () => {
      // Check if any textarea value in checkSection is empty
      const isEmptySection = checkSection.some((value) => value.trim() === '');
      if (isEmptySection || title === '') {
          // If any textarea is empty, show an alert or perform necessary action
          toast.error('Please fill in all items before saving.');
          return; // Prevent further execution
      }
      const data = {
        'enableName' : enableName,
        'enableDate' : enableDate,
        'enableFridge' : enableFridge,
        'enableTextBox' : enableTextBox,
        'title' : title,
        'checkSection' : checkSection,
        'name' : 'Adam',
        'Type' : checkType
      }
       
        dispatch(createChecklist(data));
       
      setEnabledName(false);
      setEnabledDate(false);
      setEnabledFridge(false);
      setEnabledTextBox(false);
      setTitle("");
      setCheckSection([]);
    }
    const handleCancel = () => {
      if(checkType == 'open') {
        navigate("/open");
      }
    }
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
 

    return(
        <>
            <h1 className="text-[28px] uppercase">Add Checklists</h1>
            <div className="mt-[20px] flex justify-between pb-5 items-center border-b-2 border-grey">
                <div >
                    <h2 className="font-bold text-[25px] uppercase"> {checkType == 'open' ? 'Opening' : 'Closing'} Checklist</h2>

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
                  className={`${
                    enableName ? 'bg-greenSwitch' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  
                  <span
                    className={`${
                      enableName ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between my-5">
                <p className="uppercase text-[18px] bold">Record Time & Date</p>
                <Switch
                  checked={enableDate}
                  onChange={setEnabledDate}
                  className={`${
                    enableDate ? 'bg-greenSwitch' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  
                  <span
                    className={`${
                      enableDate ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between my-5">
                <p className="uppercase text-[18px] bold">Record Fridge & Freezer Temperatures</p>
                <Switch
                  checked={enableFridge}
                  onChange={setEnabledFridge}
                  className={`${
                    enableFridge ? 'bg-greenSwitch' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  
                  <span
                    className={`${
                      enableFridge ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
              <div className="my-5">
                <label htmlFor="title" className="block mt-10 uppercase font-medium leading-6 text-gray-900">
                    Checklist task title
                </label>
                <div className="mt-2">
                    <input
                        id="title"
                        name="title"
                        type = "text"
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
                  className={`${
                    enableTextBox ? 'bg-greenSwitch' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  
                  <span
                    className={`${
                      enableTextBox ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
              <div className="my-5">
                <ButtonCheck handleClick={() => addSection()} color="secondary" variant="secondary" label="Add Section to checklist" />
              </div>
              <div className="my-5 ">
                {checkSection.map((value, index) => (
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

export default AddChecklist;