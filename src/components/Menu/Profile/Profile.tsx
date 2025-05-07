import React from 'react';

export const Profile = () => {

    if (false) {
        return (
            <div className="flex flex-col font-[Inter] bg-[#131519] w-[84%] text-[#FFF] ">
                <span className="p-[30px]">Loading...</span>
            </div>
        )
    }

    return (
        <div className="font-[Inter] text-[#FFF]">
            <div className="p-[50px]">
                <span className="font-[Inter] text-[#FFF] text-[40px]">Profile</span>
            </div>
        </div>
    );
};