import { useState } from "react";
import Button from "../components/Button";


const Allergy = () => {

    const [search, setSearch] = useState("")

    const handleSearch = () => {

    }

    return (
        <>
            <h1 className="text-[28px] uppercase">Allergy Check</h1>
            <div className="mt-[80px]">
                <div className="w-full flex items-center p-3">
                    <label htmlFor="search" className="uppercase mr-[20px] font-medium leading-6 text-gray-900">
                        Customer Allergy
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[400px] block rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="w-[200px] flex justify-center">
                        <Button handleChange={handleSearch} size="small" name="Search" variant="primary-normal" />
                    </div>
                </div>
            </div>
            <div className="uppercase mt-[60px] font-medium leading-6 text-gray-900">
                <label htmlFor="" className="bg-green">Results not including allergy ingredient</label>
                <div className="mt-5">
                    <label className="block mt-3" >Salt and pepper squid</label>
                    <label className="block mt-3" >Chicken chow mein</label>
                    <label className="block mt-3" >Sweet and sour chicken</label>
                    <label className="block mt-3" >Duck spring rolls</label>
                </div>
            </div>
            <div className="uppercase mt-[80px] font-medium leading-6 text-gray-900">
                <label htmlFor="" className="bg-[red]">Dishes containing allergy</label>
                <div className="mt-5">
                    <label className="block mt-3" >Smoked shredded chicken</label>
                    <label className="block mt-3" >Chicken teriyaki</label>
                </div>
            </div>
        </>
    )
}

export default Allergy;