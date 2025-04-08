
type PanelProps = {
    position: "left" | "right";
    children: React.ReactNode;
};

export const Panel = ({ position, children }: PanelProps) => {
    return (
        <div
            className={`w-64 bg-white border-r border-gray-200 p-4 ${
                position === "left" ? "order-first" : "order-last"
            }`}
        >
            {children}
        </div>
    );
};