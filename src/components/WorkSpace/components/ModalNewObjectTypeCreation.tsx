import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setInvisible} from "../../../app/slices/Other/ModalNewObjectTypeCreationVisibilitySlice.tsx";

export const ModalNewObjectTypeCreation = () => {

    const dispatch = useAppDispatch();

    const isModalVisible = useAppSelector((state) => state.isNewObjectTypeModalVisible.isVisible);

    return (
        <AnimatePresence>
            {(isModalVisible == true) && (
                <div className="absolute z-[10] w-full h-full flex items-center justify-center">
                    {/* Само модальное окно (всплывает снизу) */}
                    <motion.div
                        initial={{ y: "200%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "200%" }}
                        transition={{ type: "spring", damping: 15 }}
                        className="
                        bg-[#FFF]
                        fixed
                        inset-0
                        z-10
                        p-[15px]
                        flex
                        items-center
                        justify-center
                        rounded-[8px]
                        shadow-[0px_4px_20px_14px_rgba(0,_0,_0,_0.1)]
                        "
                    >
                        <div className="flex flex-col gap-[30px]">
                            <div className="w-full flex justify-start"><div className="font-[Inter-semibold] text-[16px]">
                                Create your own object type
                            </div></div>
                            <div className="flex flex-row gap-[15px] justify-center items-center">
                                <div className="flex flex-col gap-[15px] justify-center">
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="font-[Inter-medium] text-[12px]" htmlFor="">Type</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="font-[Inter-medium] text-[12px]" htmlFor="">Description</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="font-[Inter-medium] text-[12px]" htmlFor="">Main color</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <label className="font-[Inter-medium] text-[12px]" htmlFor="">Icon</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="flex flex-row justify-between my-[10px]">
                                        <button
                                            className="w-[45%] font-[Inter-medium] text-[12px]"
                                            onClick={() => dispatch(setInvisible())}
                                        >
                                            create
                                        </button>
                                        <button
                                            className="w-[45%] font-[Inter-medium] text-[12px]"
                                            onClick={() => dispatch(setInvisible())}
                                        >
                                            cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};