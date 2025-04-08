// src/components/RightSidebar.tsx
import { Panel } from "./Panel.tsx";

export const RightSidebar = () => {
    return (
        <Panel position="right">
            <h2 className="text-lg font-bold mb-4">Properties</h2>
            <div className="p-2 bg-white rounded">
                Select an object to edit properties
            </div>
        </Panel>
    );
};