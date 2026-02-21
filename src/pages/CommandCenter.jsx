import React, { useState, useEffect, useMemo } from 'react';
import KpiCard from '../components/KpiCard';
import FilterBar from '../components/FilterBar';
import FleetTable from '../components/FleetTable';
import { Truck, Wrench, Activity, Package } from 'lucide-react';

// Mock Data
const MOCK_VEHICLES = [
    { id: 1, name: 'Alpha Hauler', licensePlate: 'ABC-1234', type: 'Truck', region: 'North', status: 'On Trip', maxCapacity: '20,000 lbs', odometer: 15420 },
    { id: 2, name: 'Beta Van', licensePlate: 'XYZ-9876', type: 'Van', region: 'South', status: 'Available', maxCapacity: '5,000 lbs', odometer: 4200 },
    { id: 3, name: 'Gamma Courier', licensePlate: 'LMN-4567', type: 'Bike', region: 'East', status: 'On Trip', maxCapacity: '50 lbs', odometer: 1200 },
    { id: 4, name: 'Delta Heavy', licensePlate: 'QWE-1122', type: 'Truck', region: 'West', status: 'In Shop', maxCapacity: '25,000 lbs', odometer: 85000 },
    { id: 5, name: 'Echo Express', licensePlate: 'RTY-3344', type: 'Van', region: 'North', status: 'Retired', maxCapacity: '4,500 lbs', odometer: 150000 },
    { id: 6, name: 'Zeta Rider', licensePlate: 'UIO-5566', type: 'Bike', region: 'South', status: 'Available', maxCapacity: '40 lbs', odometer: 800 },
    { id: 7, name: 'Omega Transport', licensePlate: 'PAS-7788', type: 'Truck', region: 'East', status: 'On Trip', maxCapacity: '22,000 lbs', odometer: 32000 },
    { id: 8, name: 'Sigma Mover', licensePlate: 'DFG-9900', type: 'Van', region: 'West', status: 'In Shop', maxCapacity: '6,000 lbs', odometer: 56000 },
    { id: 9, name: 'Theta Sprinter', licensePlate: 'HJK-1235', type: 'Van', region: 'North', status: 'On Trip', maxCapacity: '3,000 lbs', odometer: 15000 },
    { id: 10, name: 'Iota Hauler', licensePlate: 'BVC-4321', type: 'Truck', region: 'South', status: 'Available', maxCapacity: '18,000 lbs', odometer: 25000 },
];

const MOCK_TRIPS = [
    { id: 101, vehicleId: 1, status: 'Completed' },
    { id: 102, vehicleId: 3, status: 'In Progress' },
    { id: 103, vehicleId: 2, status: 'Draft' },
    { id: 104, vehicleId: 7, status: 'Draft' },
    { id: 105, vehicleId: 9, status: 'In Progress' },
    { id: 106, vehicleId: null, status: 'Draft' },
];

const CommandCenter = () => {
    const [filters, setFilters] = useState({
        type: 'All',
        status: 'All',
        region: 'All',
    });

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Filter logic
    const filteredVehicles = useMemo(() => {
        return MOCK_VEHICLES.filter(v => {
            const matchType = filters.type === 'All' || v.type === filters.type;
            const matchStatus = filters.status === 'All' || v.status === filters.status;
            const matchRegion = filters.region === 'All' || v.region === filters.region;
            return matchType && matchStatus && matchRegion;
        });
    }, [filters]);

    // Derived KPIs based on filtered vehicles and all trips
    const kpis = useMemo(() => {
        const activeFleet = filteredVehicles.filter(v => v.status === 'On Trip').length;
        const maintenanceAlerts = filteredVehicles.filter(v => v.status === 'In Shop').length;

        const nonRetiredVehicles = filteredVehicles.filter(v => v.status !== 'Retired');
        let utilizationRate = 0;
        if (nonRetiredVehicles.length > 0) {
            utilizationRate = (activeFleet / nonRetiredVehicles.length) * 100;
        }

        // Pending cargo might not necessarily be tied to filtered vehicles in a standard dashboard
        // unless the trips have vehicleIds matching the filtered ones. 
        // Wait, the prompt says: "Pending Cargo: Count trips where status === 'Draft'". It doesn't 
        // require linking it specifically to the filtered vehicles, so we just calculate from MOCK_TRIPS.
        const pendingCargo = MOCK_TRIPS.filter(t => t.status === 'Draft').length;

        return {
            activeFleet,
            maintenanceAlerts,
            utilizationRate: utilizationRate.toFixed(1),
            pendingCargo
        };
    }, [filteredVehicles]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Command Center</h1>
                        <p className="text-slate-500 mt-1">Real-time fleet oversight and logistics management</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm font-medium text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Last Updated: {currentTime}
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KpiCard
                        title="Active Fleet"
                        value={kpis.activeFleet}
                        icon={<Truck size={24} />}
                        color="blue"
                    />
                    <KpiCard
                        title="Maintenance Alerts"
                        value={kpis.maintenanceAlerts}
                        icon={<Wrench size={24} />}
                        color="yellow"
                    />
                    <KpiCard
                        title="Utilization Rate"
                        value={kpis.utilizationRate}
                        icon={<Activity size={24} />}
                        color="green"
                        isPercentage={true}
                    />
                    <KpiCard
                        title="Pending Cargo"
                        value={kpis.pendingCargo}
                        icon={<Package size={24} />}
                        color="purple"
                    />
                </div>

                {/* Filters */}
                <FilterBar filters={filters} setFilters={setFilters} />

                {/* Table */}
                <FleetTable vehicles={filteredVehicles} />

            </div>
        </div>
    );
};

export default CommandCenter;
