
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"

const AddTeam = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [DOB, setDOB] = useState(new Date().toISOString().slice(0, 10));
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userLevel, setUserLevel] = useState("");
    const [trainingLevel, setTrainingLevel] = useState("");
    const [hygiene, setHygiene] = useState("No");
    const [allergy, setAllergy] = useState("No");

    const handleHygieneChange = (e) => {
        setHygiene(e.target.value);
    };
    const handleAllergyChange = (e) => {
        setAllergy(e.target.value);
    };
    const AddNewMember = () => {
        const data = {
            "name" : name,
            "DOB" : DOB,
            "email" : email,
            "phoneNumber" : phoneNumber,
            "userLevel" : userLevel,
            "trainingLevel" : trainingLevel,
            "hygiene" : hygiene,
            "allergy" : allergy,
        }
        console.log(data, 'data');
        navigate("/team")

    }

    return (
        <>
            <h1 className="text-[28px] uppercase">Add Team Member</h1>
            <div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="name" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="DOB" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Date of Birth
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="DOB"
                            id="DOB"
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="email" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Email Address
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="phoneNumber" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Mobile Number
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="userLevel" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        User Level
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="userLevel"
                            id="userLevel"
                            value={userLevel}
                            onChange={(e) => setUserLevel(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="trainingLevel" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Traning Level
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="trainingLevel"
                            id="trainingLevel"
                            value={trainingLevel}
                            onChange={(e) => setTrainingLevel(e.target.value)}
                            className="w-[450px] block rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="hygiene" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Hygiene Training
                    </label>
                    <div className="mt-2 flex items-center uppercase">
                        <input
                            id="hygieneYes"
                            name="hygiene"
                            type="radio"
                            value="Yes" // Value for the "Yes" option
                            checked={hygiene === "Yes"} // Check if this option is selected
                            onChange={handleHygieneChange} // Call the event handler when the value changes
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="hygieneYes" className="w-[50px] text-center block text-sm font-medium leading-6 text-gray-900">
                            Yes
                        </label>
                        <input
                            id="hygieneNo"
                            name="hygiene"
                            type="radio"
                            value="No" // Value for the "No Send Forms" option
                            checked={hygiene === "No"} // Check if this option is selected
                            onChange={handleHygieneChange} // Call the event handler when the value changes
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="hygieneNo" className="pl-[15px] text-center block text-sm font-medium leading-6 text-gray-900">
                            No Send Forms
                        </label>
                    </div>
                </div>
                <div className="w-full flex items-center p-3">
                    <label htmlFor="allergy" className="w-[200px] uppercase  font-medium leading-6 text-gray-900">
                        Allergen Training
                    </label>
                    <div className="mt-2 flex items-center uppercase">
                        <input
                            id="allergyYes"
                            name="allergy"
                            type="radio"
                            value="Yes"
                            checked={allergy === "Yes"}
                            onChange={handleAllergyChange}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="allergyYes" className="w-[50px] text-center block text-sm font-medium leading-6 text-gray-900">
                            Yes
                        </label>
                        <input
                            id="allergyNo"
                            name="allergy"
                            type="radio"
                            value="No"
                            checked={allergy === "No"}
                            onChange={handleAllergyChange}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="allergyNo" className="pl-[15px] text-center block text-sm font-medium leading-6 text-gray-900">
                            No Send Forms
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-[150px]">
                <Button handleChange={AddNewMember} size="normal" name="Add New Member Team" variant="primary-normal" />
            </div>

        </>
    )
}

export default AddTeam