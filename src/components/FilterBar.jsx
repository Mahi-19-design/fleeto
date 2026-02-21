import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex flex-col w-full md:w-1/3">
                <label className="text-sm font-semibold text-slate-500 mb-2">Vehicle Type</label>
                <select
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="p-3 border border-slate-200 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                    <option value="All">All Types</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Bike">Bike</option>
                </select>
            </div>

            <div className="flex flex-col w-full md:w-1/3">
                <label className="text-sm font-semibold text-slate-500 mb-2">Status</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="p-3 border border-slate-200 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                    <option value="All">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="In Shop">In Shop</option>
                    <option value="Retired">Retired</option>
                </select>
            </div>

            <div className="flex flex-col w-full md:w-1/3">
                <label className="text-sm font-semibold text-slate-500 mb-2">Region</label>
                <select
                    name="region"
                    value={filters.region}
                    onChange={handleChange}
                    className="p-3 border border-slate-200 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                    <option value="All">All Regions</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
