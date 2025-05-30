import React from 'react';
import github from "../../../../src/assets/images/github.png"
import edit_icon from '../../../../src/assets/images/Edit_Pencil_01.png'
import {motion} from "framer-motion";
import {useDocumentTitle} from "../../../app/hooks.ts";

export const Templates = () => {

    useDocumentTitle(`Templates - WebNode`);

    const TemplateComponent = () => {
        return(
            <div className="w-[calc(50%-15px)]">
                <div className="flex flex-col gap-[10px] p-[30px] rounded-[10px] bg-[#101115] border-[1px] border-[#4C4D50]">
                    <div className="flex flex-row justify-between items-center">
                        <div className="font-[Inter-semibold] text-[#FFF] text-[32px]">Template 1</div>
                        <div className="flex flex-col">
                            <div className="font-[Inter-normal] text-[#FFF] text-[13px]">12 Nodes</div>
                            <div className="font-[Inter-normal] text-[#FFF] text-[13px]">3 Layers</div>
                        </div>
                    </div>
                    <div className="text-[#C7C7C7] font-[Inter-normal] text-[13px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin mauris  nulla, bibendum eu placerat id, consectetur a est.
                        Duis posuere mauris  massa, nec sollicitudin erat lobortis id
                    </div>
                    <div className="flex flex-row gap-[10px] items-center">
                        <div className="text-[#FFF] font-[Inter-normal] text-[13px]">Made by</div>
                        <img className="w-[20px]" src={github} alt=""/>
                    </div>
                    <div className="flex flex-row justify-end gap-[10px]">
                        <button className="
                                flex flex-row items-center gap-[8px]
                                bg-gradient-to-b from-[#646D79] to-[#495059] text-[#FFF]
                                 font-[Inter-medium]
                                 text-[16px] px-[36.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#858B93] cursor-pointer">
                            <img src={edit_icon} alt=""/>
                            <div>Edit</div>
                        </button>
                        <button className="
                                bg-gradient-to-b from-[#4CAF72] to-[#3E945F] text-[#FFF]
                                 font-[Inter-medium]
                                 text-[16px] px-[41.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#78C294] cursor-pointer">Create
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-[calc(100%-100px)] p-[50px]"
        >
            <div className="flex flex-row text-[#FFF]">
                <div className="">
                    <span className="font-[Inter-semibold] text-[#FFF] text-[40px]">Templates</span>
                    <div className="flex flex-wrap w-[100%] gap-[30px] mt-[56px]">
                        <TemplateComponent></TemplateComponent>
                        <TemplateComponent></TemplateComponent>
                        <TemplateComponent></TemplateComponent>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Templates;