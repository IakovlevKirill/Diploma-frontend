import {motion} from "framer-motion";

export const Teams = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full"
        >
            <div className="font-[Inter] text-[#FFF] ">
                <div className="p-[50px]">
                    <span className="font-[Inter-semibold] text-[#FFF] text-[40px]">Teams</span>
                </div>
            </div>
        </motion.div>
    );
};