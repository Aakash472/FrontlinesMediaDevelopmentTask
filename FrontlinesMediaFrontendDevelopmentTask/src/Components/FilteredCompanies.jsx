import { useState } from "react";
import { randomIndustries, randomLocation } from "./CompaniesData/RandomData";

function FilteredCompanies({ onSearchChange, onLocationChange, onIndustryChange, onReset }) {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [industry, setIndustry] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearchChange(value);
    };

    const handleLocation = (e) => {
        const value = e.target.value;
        setLocation(value);
        onLocationChange(value);
    };

    const handleIndustry = (e) => {
        const value = e.target.value;
        setIndustry(value);
        onIndustryChange(value);
    };

    const handleReset = () => {
        setSearch("");
        setLocation("");
        setIndustry("");
        onReset();
    };

    return (
        <div className="bg-white p-2 rounded-xl shadow-sm flex flex-wrap items-center gap-4 justify-between mb-4">
            <input type="text" placeholder="🔍 Search by company name..." value={search} onChange={handleSearch} className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none" />
            <select value={location} onChange={handleLocation} className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/4 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">All Locations</option>
                {randomLocation.map((locate, index) => (
                    <option key={index} value={locate}>
                        {locate}
                    </option>
                ))}
            </select>
            <select value={industry} onChange={handleIndustry} className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/4 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">All Industries</option>
                {randomIndustries.map((indust, index) => (
                    <option key={index} value={indust}>
                        {indust}
                    </option>
                ))}
            </select>
            <button onClick={handleReset} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg px-4 py-2 transition cursor-pointer">Reset</button>
        </div>
    );
}
export default FilteredCompanies;