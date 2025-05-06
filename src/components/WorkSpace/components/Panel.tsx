
type PanelProps = {
    position: "left" | "right";
    children: React.ReactNode;
};

export const Panel = ({ position, children }: PanelProps) => {
    return (
        <div
            className={`bg-white w-[10%] ${
                position === "left" ? "order-first border-r-[1px] border-[#E6E6E6]" : "order-last border-[#E6E6E6] border-l-[1px]"
            }`}
        >
            {children}
        </div>
    );
};