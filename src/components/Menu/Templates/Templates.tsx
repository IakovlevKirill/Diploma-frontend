import React from 'react';
import github from "../../../../src/assets/images/github.png"

export const Templates = () => {

    if (false) {
        return (
            <div className="flex flex-col font-[Inter] bg-[#131519] w-[84%] text-[#FFF] ">
                <span className="p-[30px]">Loading...</span>
            </div>
        )
    }

    return (
        <div className="font-[Inter] flex flex-row text-[#FFF] w-[84%]">
            <div className="p-[50px] w-[83%]">
                <span className="font-[Inter] text-[#FFF] text-[40px]">Templates</span>
                <div className="flex flex-wrap w-[100%] gap-[30px] mt-[56px]">
                    <div className="w-[calc(50%-15px)]">
                        <div className="flex flex-col gap-[10px] p-[30px] rounded-[10px] bg-[#101115] border-[1px] border-[#4C4D50]">
                            <div className="flex flex-row justify-between items-center">
                                <div className="font-[Inter] font-semibold text-[#FFF] text-[32px]">Template 1</div>
                                <div className="flex flex-col">
                                    <div className="font-[Inter] font-regular text-[#FFF] text-[13px]">12 Nodes</div>
                                    <div className="font-[Inter] font-regular text-[#FFF] text-[13px]">3 Layers</div>
                                </div>
                            </div>
                            <div className="text-[#C7C7C7] font-[Inter] font-regular text-[13px]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin mauris  nulla, bibendum eu placerat id, consectetur a est.
                                Duis posuere mauris  massa, nec sollicitudin erat lobortis id
                            </div>
                            <div className="flex flex-row gap-[10px] items-center">
                                <div className="text-[#FFF] font-[Inter] font-regular text-[13px]">Made by</div>
                                <img className="w-[20px]" src={github} alt=""/>
                            </div>
                            <div className="flex flex-row justify-end">
                                <button>edit</button>
                                <button>create</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[calc(50%-15px)]">
                        <div className="flex flex-col gap-[10px] p-[30px] rounded-[10px] bg-[#101115] border-[1px] border-[#4C4D50]">
                            <div className="flex flex-row justify-between items-center">
                                <div className="font-[Inter] font-semibold text-[#FFF] text-[32px]">Template 1</div>
                                <div className="flex flex-col">
                                    <div className="font-[Inter] font-regular text-[#FFF] text-[13px]">12 Nodes</div>
                                    <div className="font-[Inter] font-regular text-[#FFF] text-[13px]">3 Layers</div>
                                </div>
                            </div>
                            <div className="text-[#C7C7C7] font-[Inter] font-regular text-[13px]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin mauris  nulla, bibendum eu placerat id, consectetur a est.
                                Duis posuere mauris  massa, nec sollicitudin erat lobortis id
                            </div>
                            <div className="flex flex-row">
                                <div className="text-[#FFF] font-[Inter] font-regular text-[13px]">Made by</div>
                                <img className="w-[20px]" src={github} alt=""/>
                            </div>
                            <div className="flex flex-row justify-end">
                                <button>edit</button>
                                <button>create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[17%]">

            </div>
        </div>
    );
};

export default Templates;