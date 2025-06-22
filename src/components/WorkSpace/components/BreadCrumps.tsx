import React,
{
    useEffect,
    useState
} from 'react';

import {setCanvasNodes} from "../../../app/slices/Node/CanvasNodesSlice.ts";
import {useLazyGetNodeChildrenQuery} from "../../../api/testApi.ts";
import {images} from "../../../assets/images/images.ts";

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/hooks.ts";
import {addBreadCrumb, deleteBreadCrumbChildrenById} from "../../../app/slices/Other/BreadCrumbsSlice.ts";
import {store} from "../../../store/store.ts";

export const BreadCrumbs = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const breadcrumbs = useAppSelector((state) => state.breadCrumbs.breadcrumbs);

    const [getNodeChildren] = useLazyGetNodeChildrenQuery()

    useEffect(() => {
        const path = location.pathname.split('/').slice(4);
        for (let i = 0; i < path.length; i++) {
            dispatch(addBreadCrumb({
                index: i,
                name: path[i],
                layer_id: path[i],
                layer_id_visible_part: path[i],
            }));
        }
    }, [dispatch]);

    const handleLayerClick = async (index: number, layer: string) => {

        const basePath = location.pathname.split('/').slice(0, 4).join('/');

        const layers_path = 'root/' + location.pathname.split('root/')[1];
        const layers_path_array = layers_path.split('/');

        const targetIndex = layers_path_array.indexOf(layer);

        // Если layer найден, берём всё ДО него (включая root)
        const filtered_path_array = targetIndex !== -1
            ? layers_path_array.slice(0, targetIndex + 1)
            : layers_path_array;

        const newUrl = `${basePath}/${filtered_path_array.join('/')}`;

        if (layer == layers_path_array[layers_path_array.length-1]) {
            console.log("u tapped at current level");
        } else {
            navigate(newUrl);
            try {
                const response = await getNodeChildren({ nodeId: layer }).unwrap();
                if (response.result === "success") {
                    dispatch(deleteBreadCrumbChildrenById(layer));
                    dispatch(setCanvasNodes(response.data.nodes));
                } else {
                    console.error('Error loading node children:', response);
                }
            } catch (error) {
                console.error('Failed to fetch node children:', error);
            }
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
            {breadcrumbs.map((layer, index) => (
                <div className="h-[calc(20%-5px)] w-full">
                    <button
                        onClick={() => {
                            handleLayerClick(index, layer.layer_id)
                        }}
                        key={index}
                        className="
                        p-[5px]
                        border-0
                        h-[calc(100%-10px)]
                        flex
                        flex-row
                        justify-between
                        cursor-pointer
                        rounded-[5px]
                        overflow-hidden
                        bg-[#0D0E11]
                        w-full
                    ">
                        <div
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
                            {layer.name}
                        </div>
                        <img
                            className="h-[80%]"
                            src={images.layer_icon_white}
                            alt="layer_icon_white"
                        />
                    </button>
                </div>
            ))}
        </div>
    );
};