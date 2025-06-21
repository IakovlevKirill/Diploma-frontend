import React, {useState} from 'react';
import {setCanvasNodes} from "../../../app/slices/Node/CanvasNodesSlice.ts";
import {images} from "../../../assets/images/images.ts";
import {useNavigate} from "react-router-dom";
import {useLazyGetNodeChildrenQuery} from "../../../api/testApi.ts";
import {useDispatch} from "react-redux";

export const BreadCrumbs = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [getNodeChildren] = useLazyGetNodeChildrenQuery()

    const [path, setPath] = useState<string[]>(location.pathname.split('/').slice(4));

    const truncateLayer = (text: string) => {
        return text.length > 10 ? `${text.substring(0, 10)}...` : text;
    };

    const handleLayerClick = async (index: number, layer: string) => {

        const basePath = location.pathname.split('/').slice(0, 4).join('/');
        const newPathParts = path.slice(0, index + 1);
        const newUrl = `${basePath}/${newPathParts.join('/')}`;

        navigate(newUrl);

        try {
            const response = await getNodeChildren({ nodeId: layer }).unwrap();
            if (response.result === "success") {
                setPath(newPathParts);
                dispatch(setCanvasNodes(response.data.nodes));
            } else {
                console.error('Error loading node children:', response);
            }
        } catch (error) {
            console.error('Failed to fetch node children:', error);
        }
    };

    return (
        <div className="
            h-[200px]
            w-full
            flex
            flex-col
            justify-center
            gap-[5px]
            overflow-hidden
            ">
            {path.map((layer, index) => (
                <div className="h-[calc(20%-5px)]">
                    <div
                        key={`${layer}-${index}`}
                        className="
                        p-[5px]
                        h-[calc(100%-10px)]
                        flex
                        flex-row
                        justify-between
                        cursor-pointer
                        rounded-[5px]
                        overflow-hidden
                        bg-[#0D0E11]
                    ">
                        <button
                            onClick={() => handleLayerClick(index, layer)}
                            className="
                            text-[#FFF]
                            bg-[#0D0E11]
                            text-center
                            text-[14px]
                            border-0
                            cursor-pointer
                            font-[Inter-medium]
                            flex
                            items-center
                            justify-center
                            "
                        >
                            {truncateLayer(layer)}
                        </button>
                        <button
                            onClick={() => {}}
                            className="
                            h-full
                            flex
                            items-center
                            justify-center
                            cursor-default
                            border-0
                            bg-[#0D0E11]

                            "
                        >
                            <img
                                className="h-[80%]"
                                src={images.layer_icon_white}
                                alt="layer_icon_white"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};