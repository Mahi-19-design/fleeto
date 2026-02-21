import React from 'react';

const statusStyles = {
    'Available': 'bg-green-100 text-green-700 border-green-200',
    'On Trip': 'bg-blue-100 text-blue-700 border-blue-200',
    'In Shop': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Retired': 'bg-slate-100 text-slate-700 border-slate-200'
};

const FleetTable = ({ vehicles }) => {
    if (!vehicles || vehicles.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <h3 className="text-lg font-medium text-slate-600">No vehicles found</h3>
                <p className="text-slate-500 mt-2">Adjust your filters to see more results.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-sm md:text-base">
                            <th className="py-4 px-6 font-semibold text-slate-600">Vehicle Name</th>
                            <th className="py-4 px-6 font-semibold text-slate-600">License Plate</th>
                            <th className="py-4 px-6 font-semibold text-slate-600">Type</th>
                            <th className="py-4 px-6 font-semibold text-slate-600">Region</th>
                            <th className="py-4 px-6 font-semibold text-slate-600">Status</th>
                            <th className="py-4 px-6 font-semibold text-slate-600">Max Capacity</th>
                            <th className="py-4 px-6 font-semibold text-slate-600">Odometer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle, index) => (
                            <tr
                                key={vehicle.id}
                                className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${index === vehicles.length - 1 ? 'border-b-0' : ''
                                    }`}
                            >
                                <td className="py-4 px-6 text-slate-800 font-medium">
                                    {vehicle.name}
                                </td>
                                <td className="py-4 px-6 text-slate-600 font-mono text-sm">
                                    {vehicle.licensePlate}
                                </td>
                                <td className="py-4 px-6 text-slate-600">
                                    {vehicle.type}
                                </td>
                                <td className="py-4 px-6 text-slate-600">
                                    {vehicle.region}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[vehicle.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                        {vehicle.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-slate-600">
                                    {vehicle.maxCapacity}
                                </td>
                                <td className="py-4 px-6 text-slate-600">
                                    {vehicle.odometer} mi
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FleetTable;
