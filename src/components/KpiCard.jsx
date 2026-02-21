import React from 'react';

const colorStyles = {
    blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        indicator: 'bg-blue-500'
    },
    yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        indicator: 'bg-yellow-500'
    },
    green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        indicator: 'bg-green-500'
    },
    purple: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        indicator: 'bg-indigo-500'
    }
};

const KpiCard = ({ title, value, icon, color = 'blue', isPercentage }) => {
    const styles = colorStyles[color] || colorStyles.blue;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg flex items-center justify-center ${styles.bg} ${styles.text}`}>
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
                <p className="text-2xl font-bold text-slate-800">
                    {value}{isPercentage ? '%' : ''}
                </p>
            </div>
            <div className={`w-1.5 h-12 rounded-full ${styles.indicator}`}></div>
        </div>
    );
};

export default KpiCard;
