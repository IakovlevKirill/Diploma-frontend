// src/components/LeftSidebar.tsx
import { Panel } from "./Panel.tsx";

export const LeftSidebar = () => {
    const tools = ["Quest", "NPC", "Item", "Location"];

    return (
        <Panel position="left">
            <h2 className="text-lg font-bold mb-4">Tools</h2>
            <div className="space-y-2">
                {tools.map((tool) => (
                    <button
                        key={tool}
                        className="w-full p-2 bg-blue-100 rounded hover:bg-blue-200"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("tool", tool)}
                    >
                        {tool}
                    </button>
                ))}
            </div>
        </Panel>
    );
};