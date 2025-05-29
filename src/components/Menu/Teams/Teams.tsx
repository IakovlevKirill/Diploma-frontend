import {motion} from "framer-motion";
import {useDocumentTitle} from "../../../app/hooks.ts";

export const Teams = () => {

    useDocumentTitle(`Teams - WebNode`);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full overflow-y-scroll h-full select-none"
        >
            <div className="font-[Inter] text-[#FFF] h-full">
                <div className="flex flex-col p-[50px] h-[calc(100%-100px)] gap-[30px]">
                    <div className="font-[Inter-semibold] text-[#FFF] text-[40px]">Teams</div>
                    <div className="w-full h-full flex items-center justify-center font-[Inter-medium]">
                        The teams section is currently not functioning
                    </div>
                </div>
            </div>
        </motion.div>
    );
};