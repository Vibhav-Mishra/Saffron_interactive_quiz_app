import React from 'react';

function ProgressBar({ current, total }){
    const progress = (current / total) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-6">
            <div className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
            >
            </div>
           
        </div>
    );
}

export default ProgressBar;