import {images} from "../../../assets/images/images"
import {motion} from "framer-motion";
import {useDocumentTitle} from "../../../app/hooks.ts";

export const Inbox = () => {

    useDocumentTitle(`Inbox - WebNode`);

    const NewMessage = () => {
        return(
            <div className="w-[calc(100%-30px)] items-center justify-between flex flex-row rounded-[10px] border-[#4C4D50] border-[1px] p-[15px]">
                <div className="w-[50%] flex flex-row items-center justify-between">
                    <div className="flex items-center flex-row gap-[10px]">
                        <img src={images.random_sender} alt=""/>
                        <div className="flex flex-col">
                            <div className="text-[#FFF] text-[16px] font-[Inter-semibold]">User2</div>
                            <div className="text-[#A8A8A8] text-[12px] font-[Inter-normal]">Developer</div>
                        </div>
                    </div>
                    <div className="text-[#C7C7C7] text-[24px] font-[Inter-normal]">
                        User 2 wants to apply for your team
                    </div>
                </div>
                <div className="w-[50%] flex flex-row gap-[10px] justify-end">
                    <button className="
                                flex flex-row items-center gap-[8px]
                                bg-gradient-to-b from-[#646D79] to-[#495059] text-[#FFF] font-[Inter-medium]
                                  text-[16px] px-[36.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#858B93] cursor-pointer">Decline
                    </button>
                    <button className="
                                bg-gradient-to-b from-[#4CAF72] to-[#3E945F] text-[#FFF] font-[Inter-medium]
                                  text-[16px] px-[41.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#78C294] cursor-pointer">Accept
                    </button>
                </div>

            </div>
        )
    }

    const ArchiveMessage = () => {
        return(
            <div className="w-[calc(100%-30px)] items-center justify-between flex flex-row rounded-[10px] border-[#4C4D50] border-[1px] p-[15px]">
                <div className="w-[50%] flex flex-row items-center justify-between">
                    <div className="flex items-center flex-row gap-[10px]">
                        <img src={images.avatar_example} alt=""/>
                        <div className="flex flex-col">
                            <div className="text-[#FFF] text-[16px] font-[Inter-semibold]">User2</div>
                            <div className="text-[#A8A8A8] text-[12px] font-[Inter-normal]">Developer</div>
                        </div>
                    </div>
                    <div className="text-[#C7C7C7] text-[24px] font-[Inter-normal]">
                        User 2 wants to apply for your team
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
            className="w-full overflow-y-scroll project_page_scrollbar h-full select-none"
        >
            <div className="font-[Inter] text-[#FFF] h-full">
                <div className="flex flex-col p-[50px] h-[calc(100%-100px)] gap-[30px]">
                    <div className="font-[Inter-semibold] text-[#FFF] text-[40px]">Inbox</div>
                    <div className="w-full h-full flex items-center justify-center font-[Inter-medium]">
                        The mail section is currently not functioning
                    </div>
                    {/*
                    <div className="flex flex-row justify-between">
                        <div className="font-[Inter-semibold] text-[#FFF] text-[40px]">Inbox</div>
                        <div className="flex flex-row gap-[5px] items-end justify-end">
                            <div className="h-full font-[Inter-semibold] text-[#A1A1A1]  text-[24px]">тут доделать</div>
                            <div className="h-full font-[Inter-semibold] text-[#FFF] text-[32px]">7</div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[13px]">
                        <input type="checkbox"/>
                        <label htmlFor="">Show only unread (7/165)</label>
                    </div>
                    <div className="font-[Inter-semibold] text-[#FFF] text-[40px] ">New</div>
                    <div className="flex flex-col gap-[13px]">
                        <NewMessage></NewMessage>
                        <NewMessage></NewMessage>
                        <NewMessage></NewMessage>
                    </div>
                    <div className="font-[Inter-semibold] text-[#FFF] text-[40px] ">Archive</div>
                    <div className="flex flex-col gap-[30px]">
                        <ArchiveMessage></ArchiveMessage>
                    </div>
                    */}
                </div>
            </div>
        </motion.div>
    );
};
