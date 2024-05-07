
import { useEffect, useState } from "react";
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
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id)
  }, [])

  const [enableName, setEnabledName] = useState(false);
  const [name, setName] = useState("");
  const [enableDate, setEnabledDate] = useState(false);
  const [enableFridge, setEnabledFridge] = useState(false);
  const [fridgeSection, setFridgeSection] = useState("");
  const [enableTextBox, setEnabledTextBox] = useState(false);
  const [title, setTitle] = useState("");
  const [addUserText, setAddUserText] = useState([]);
  const [addKitchenList, setAddkitchenList] = useState([]);
  const [checkSection, setCheckSection] = useState([]);

  const [fridge_freezer, setFridge_Freezer] = useState('');
  const [fridge_operating, setFridge_Operating] = useState('');
  const [fridge_operating_check, setFridge_Operating_check] = useState(false);

  const [theIce,  setTheIce ] = useState("");
  const [theTemp, setTheTemp] = useState("");
  const [theProbe, setTheProbe] = useState("");
  const [theProbeCheck, setTheProbeCheck] = useState(false);

  const [food_deliver, setFood_Deliver] = useState([]);
  const [chilled_frozen, setChilled_Frozon] = useState('');
  const [chilled_fronzen_check, setChilled_Frozon_Check] = useState(false);
  const foodDeliverSection = () => {
    let data = {
      "text" : '',
      "value" : ''
    }
    setFood_Deliver([...food_deliver, data]);
  };
  const handleFoodDeliver = (index, value) => {
    const updatedFoodDeliver = [...food_deliver];
    updatedFoodDeliver[index] = { text: value, value: '' };
    setFood_Deliver(updatedFoodDeliver);
  };
  const removeFoodDeliver = (index) => {
    const updatedFoodDeliver = [...food_deliver];
    updatedFoodDeliver.splice(index, 1); // Remove the element at the specified index
    setFood_Deliver(updatedFoodDeliver);
  };

  const [batch_core, setBatch_Core] = useState([]);
  const batchCoreSection = () => {
    let data = {
      "text" : '',
      "value" : ''
    }
    setBatch_Core([...batch_core, data]);
  };
  const handleBatchCore = (index, value) => {
    const updatedBatchCore = [...batch_core];
    updatedBatchCore[index] = { text: value, value: '' };
    setBatch_Core(updatedBatchCore);
  };
  const removeBatchCore = (index) => {
    const updatedBatchCore = [...batch_core];
    updatedBatchCore.splice(index, 1); // Remove the element at the specified index
    setBatch_Core(updatedBatchCore);
  };

  const [cook_order, setCook_Order] = useState([]);
  const cookOrderSection = () => {
    let data = {
      "text" : '',
      "value" : ''
    }
    setCook_Order([...cook_order, data]);
  };
  const handleCookOrder = (index, value) => {
    const updatedCookOrder = [...cook_order];
    updatedCookOrder[index] = { text: value, value: '' };
    setCook_Order(updatedCookOrder);
  };
  const removeCookOrder = (index) => {
    const updatedCookOrder = [...cook_order];
    updatedCookOrder.splice(index, 1); // Remove the element at the specified index
    setCook_Order(updatedCookOrder);
  };
  

  const handleSave = async () => {

    const hasEmptyKey = addUserText.some((item) => item.text === '');

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
      'title': title,
      'enableName': enableName,
      'name': name,
      'enableDate': enableDate,
      'fridge_freezer': [{text : fridge_freezer, value : ''}],
      'fridge_operating_sec': [{text: fridge_operating, value :fridge_operating_check }],
      'theIce': [{text: theIce, value : ''}],
      'theTemp': [{text: theTemp, value: ''}],
      'theProbe_sec': [{text: theProbe, value: theProbeCheck}],
      'food_deliver': food_deliver,
      'chilled_frozen_sec': [{text: chilled_frozen, value : chilled_fronzen_check}],
      'batch_core': batch_core,
      'cook_order': cook_order,
      'cleaningCheck': addUserText,
      'kitchenCheck': addKitchenList,
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
  // const addSection = () => {
  //   setCheckSection([...checkSection, '']);
  // };

  // const handleTextareaChange = (index, value) => {
  //   const updatedSections = [...checkSection];
  //   updatedSections[index] = value;
  //   setCheckSection(updatedSections);
  // };

  // const removeSection = (index) => {
  //   const updatedSections = [...checkSection];
  //   updatedSections.splice(index, 1); // Remove the element at the specified index
  //   setCheckSection(updatedSections);
  // };

  const addUserTextBox = () => {
    let data = {
      "text" : '',
      "value" : false
    }
    setAddUserText([...addUserText, data]);
  };
  const addKitchen = () => {
    let data = {
      "text" : '',
      "value" : false
    }
    setAddkitchenList([...addKitchenList, data]);
  };

  // const handleAddUserTextChange = (index, key) => {
  //   const updatedAddUserText = [...addUserText];
  //   let data = {
  //     "text" : key,
  //     "value" : ''
  //   }
  //   updatedAddUserText[index] = data
  //   setAddUserText(updatedAddUserText);
  // };

  const handleAddUserTextChange = (index, key, newValue) => {
    const updatedAddUserText = [...addUserText];
    updatedAddUserText[index] = { text: key, value: newValue };
    setAddUserText(updatedAddUserText);
  };
  
  const handleSwitchChange = (index, key, newValue) => {
    const updatedAddUserText = [...addUserText];
    updatedAddUserText[index] = { text: key, value: newValue };
    setAddUserText(updatedAddUserText);
  };

  const removeAddUserText = (index) => {
    const updatedAddUserText = [...addUserText];
    updatedAddUserText.splice(index, 1); // Remove the element at the specified index
    setAddUserText(updatedAddUserText);
  };

  const handleAddKitchenChange = (index, key, newValue) => {
    const setAddkitchenData = [...addKitchenList];
    setAddkitchenData[index] = { text: key, value: newValue };
    setAddkitchenList(setAddkitchenData);
  };
  const handleSwitchKitchenChange = (index, key, newValue) => {
    const setAddkitchenData = [...addKitchenList];
    setAddkitchenData[index] = { text: key, value: newValue };
    setAddkitchenList(setAddkitchenData);
  };
  const removeKitchenData = (index) => {
    const setAddkitchenData = [...addKitchenList];
    setAddkitchenData.splice(index, 1); // Remove the element at the specified index
    setAddkitchenList(setAddkitchenData);
  };




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
        <hr />
        <div className="my-3">
          <label htmlFor="title" className="block mt-2 uppercase font-medium leading-6 text-gray-900">
            Fridge and Freezer Opening temperatures
          </label>
          <div className="mt-2">
            <input
                id='fridge_freezer'
                name='fridge_freezer'
                type="text"
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={fridge_freezer}
                onChange={(e) => setFridge_Freezer(e.target.value)}
              />
          </div>
          <div className="flex justify-between items-center my-2">
            <input
                id='fridge_operating'
                name='fridge_operating'
                type="text"
                className="block w-[350px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={fridge_operating}
                onChange={(e) => setFridge_Operating(e.target.value)}
              />
            <Switch
              checked={fridge_operating_check}
              onChange={setFridge_Operating_check}
              className={`${fridge_operating_check ? 'bg-greenSwitch' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >

              <span
                className={`${fridge_operating_check ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <label htmlFor="theIce" className="block mt-2 uppercase font-medium leading-6 text-gray-900">
            Probe & Infrared Scanner calibration 
          </label>
          <div className="mt-2">
            <input
                id='theIce'
                name='theIce'
                type="text"
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={theIce}
                onChange={(e) => setTheIce(e.target.value)}
              />
              <input
                id='theTemp'
                name='theTemp'
                type="text"
                className="block w-full my-2 rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={theTemp}
                onChange={(e) => setTheTemp(e.target.value)}
              />
          </div>
          <div className="flex justify-between items-center my-2">
            <input
                id='fridge_operating'
                name='fridge_operating'
                type="text"
                className="block w-[350px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={theProbe}
                onChange={(e) => setTheProbe(e.target.value)}
              />
            <Switch
              checked={theProbeCheck}
              onChange={setTheProbeCheck}
              className={`${theProbeCheck ? 'bg-greenSwitch' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >

              <span
                className={`${theProbeCheck ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <label htmlFor="title" className="block mt-2 uppercase font-medium leading-6 text-gray-900">
            KITCHEN CHECKS 
          </label>
          <div className="my-5">
            <ButtonCheck handleClick={() => addKitchen()} color="secondary" variant="secondary" label="Add Kitchen checks" />
          </div>
          <div className="my-5 ">
            {addKitchenList.map((item, index) => {
              const key = item.text || ''; // Get the key dynamically
              const value = item.value; // Initialize value with an empty string if undefined
              return (
                <div className="mt-2 flex justify-between items-center" key={index}>
                  <div className="flex justify-between items-center">
                    <input
                      id={`addKitchenList${index}`}
                      name={`addKitchenList${index}`}
                      type="text"
                      className="block w-[400px] mr-[50px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={key}
                      onChange={(e) => handleAddKitchenChange(index, e.target.value, value)}
                    />
                    <Switch
                      checked={value}
                      onChange={(e) => handleSwitchKitchenChange(index, key, e)}
                      className={`${item.value ? 'bg-greenSwitch' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${item.value ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>

                  </div>
                  <Icon
                    icon="mi:delete"
                    className="ml-5 text-[#13ae77] text-[20px]"
                    onClick={() => removeKitchenData(index)} // Call removeSection with the current index
                  />
                </div>
              )
            })}
          </div>
        </div>
        <hr />
        <div className="my-3">
          <label htmlFor="title" className="block mt-2 uppercase font-medium leading-6 text-gray-900">
            FOOD DELIVERIES
          </label>
          <div className="mt-2">
            <div className="my-5">
              <ButtonCheck handleClick={() => foodDeliverSection()} color="secondary" variant="secondary" label="Add Food Deliver Answer" />
            </div>
            <div className="my-5 ">
              {food_deliver.map((value, index) => (
                <div className="mt-2 flex justify-between items-center" key={index}>
                  <textarea
                    id={`foodDeliver${index}`}
                    name={`foodDeliver${index}`}
                    rows={1}
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value.text}
                    onChange={(e) => handleFoodDeliver(index, e.target.value)}
                  />
                  <Icon
                    icon="mi:delete"
                    className="ml-5 text-[#13ae77] text-[20px]"
                    onClick={() => removeFoodDeliver(index)} // Call removeSection with the current index
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <input
                id='fridge_operating'
                name='fridge_operating'
                type="text"
                className="block w-[350px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={chilled_frozen}
                onChange={(e) => setChilled_Frozon(e.target.value)}
              />
            <Switch
              checked={chilled_fronzen_check}
              onChange={setChilled_Frozon_Check}
              className={`${chilled_fronzen_check ? 'bg-greenSwitch' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >

              <span
                className={`${chilled_fronzen_check ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <label htmlFor="title" className="block mt-2 uppercase font-medium leading-6 text-gray-900">
            Batch Core Cooking and Cooling Temperatures
          </label>
          <div className="mt-2">
            <div className="my-5">
              <ButtonCheck handleClick={() => batchCoreSection()} color="secondary" variant="secondary" label="Add Batch Core Answer" />
            </div>
            <div className="my-5 ">
              {batch_core.map((value, index) => (
                <div className="mt-2 flex justify-between items-center" key={index}>
                  <textarea
                    id={`batch_core${index}`}
                    name={`batch_core${index}`}
                    rows={1}
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value.text}
                    onChange={(e) => handleBatchCore(index, e.target.value)}
                  />
                  <Icon
                    icon="mi:delete"
                    className="ml-5 text-[#13ae77] text-[20px]"
                    onClick={() => removeBatchCore(index)} // Call removeSection with the current index
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <label htmlFor="title" className="block mt-2 uppercase font-medium leading-6 text-gray-900">
            Cook to order/Reheating
          </label>
          <div className="mt-2">
            <div className="my-5">
              <ButtonCheck handleClick={() => cookOrderSection()} color="secondary" variant="secondary" label="Add Cook to order Answer" />
            </div>
            <div className="my-5 ">
              {cook_order.map((value, index) => (
                <div className="mt-2 flex justify-between items-center" key={index}>
                  <textarea
                    id={`cook_order${index}`}
                    name={`cook_order${index}`}
                    rows={1}
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value.text}
                    onChange={(e) => handleCookOrder(index, e.target.value)}
                  />
                  <Icon
                    icon="mi:delete"
                    className="ml-5 text-[#13ae77] text-[20px]"
                    onClick={() => removeCookOrder(index)} // Call removeSection with the current index
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        
        <div className="flex justify-between my-5">
          <p className="uppercase text-[18px] bold">Add CLEANING CHECKS</p>
          {/* <Switch
            checked={enableTextBox}
            onChange={setEnabledTextBox}
            className={`${enableTextBox ? 'bg-greenSwitch' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${enableTextBox ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch> */}
        </div>
        
        <div className="my-5">
          <ButtonCheck handleClick={() => addUserTextBox()} color="secondary" variant="secondary" label="Add Cleaning checks" />
        </div>
        <div className="my-5 ">
          {addUserText.map((item, index) => {
            const key = item.text || ''; // Get the key dynamically
             const value = item.value; // Initialize value with an empty string if undefined
            return (
              <div className="mt-2 flex justify-between items-center" key={index}>
                <div className="flex justify-between items-center">
                  <input
                    id={`addUserText${index}`}
                    name={`addUserText${index}`}
                    type="text"
                    className="block w-[400px] mr-[50px] rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={key}
                    onChange={(e) => handleAddUserTextChange(index, e.target.value, value)}
                  />
                  <Switch
                    checked={value}
                    onChange={(e) => handleSwitchChange(index, key, e)}
                    className={`${item.value ? 'bg-greenSwitch' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${item.value ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                </div>
                <Icon
                  icon="mi:delete"
                  className="ml-5 text-[#13ae77] text-[20px]"
                  onClick={() => removeAddUserText(index)} // Call removeSection with the current index
                />
              </div>
          )
        })}
        </div>
         

        {/* <div className="my-5">
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
        </div> */}


      </div>

    </>
  )
}

export default AddChecklist;