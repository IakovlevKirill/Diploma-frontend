import React, { useEffect, useState, useRef } from 'react';
import { setCanvasNodes } from "../../../app/slices/Node/CanvasNodesSlice.ts";
import { useLazyGetNodeChildrenQuery } from "../../../api/testApi.ts";
import { images } from "../../../assets/images/images.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks.ts";
import { addBreadCrumb, deleteBreadCrumbChildrenById } from "../../../app/slices/Other/BreadCrumbsSlice.ts";
import { setActiveLayer } from "../../../app/slices/Other/CurrentActiveLayerSlice.ts";
import root_icon_white from "../../../assets/images/root_icon_white.png";

export const BreadCrumbs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    const active_layer = useAppSelector((state) => state.activeLayer.active_layer);
    const breadcrumbs = useAppSelector((state) => state.breadCrumbs.breadcrumbs);

    const [getNodeChildren] = useLazyGetNodeChildrenQuery()

    // Состояние для отслеживания видимых слоёв
    const [visibleLayers, setVisibleLayers] = useState<typeof breadcrumbs>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Эффект для обновления видимых слоёв при изменении breadcrumbs
    useEffect(() => {
        const activeIdx = breadcrumbs.findIndex(layer => layer.layer_id === active_layer);
        setActiveIndex(activeIdx >= 0 ? activeIdx : 0);
        updateVisibleLayers(activeIdx >= 0 ? activeIdx : 0);
    }, [breadcrumbs, active_layer]);

    // Обновление видимых слоёв (максимум 5)
    const updateVisibleLayers = (centerIndex: number) => {
        const start = Math.max(0, centerIndex - 2);
        const end = Math.min(breadcrumbs.length, start + 5);
        setVisibleLayers(breadcrumbs.slice(start, end));
    };

    // Обработчик прокрутки колеса мыши
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            // Прокрутка вверх
            if (activeIndex > 0) {
                const newIndex = activeIndex - 1;
                setActiveIndex(newIndex);
                updateVisibleLayers(newIndex);
            }
        } else {
            // Прокрутка вниз
            if (activeIndex < breadcrumbs.length - 1) {
                const newIndex = activeIndex + 1;
                setActiveIndex(newIndex);
                updateVisibleLayers(newIndex);
            }
        }
    };

    // Инициализация активного слоя
    useEffect(() => {
        const path_parts = location.pathname.split("/");
        dispatch(setActiveLayer(path_parts[path_parts.length - 1]));
    }, []);

    // Загрузка хлебных крошек
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

    const truncateLayerName = (text: string) => {
        return text.length > 6 ? `${text.substring(0, 6)}` : text;
    };

    const handleLayerClick = async (index: number, layer: string) => {
        const basePath = location.pathname.split('/').slice(0, 4).join('/');
        const layers_path = 'root/' + location.pathname.split('root/')[1];
        const layers_path_array = layers_path.split('/');
        const targetIndex = layers_path_array.indexOf(layer);

        const filtered_path_array = targetIndex !== -1
            ? layers_path_array.slice(0, targetIndex + 1)
            : layers_path_array;

        const newUrl = `${basePath}/${filtered_path_array.join('/')}`;

        if (layer !== layers_path_array[layers_path_array.length-1]) {
            dispatch(setActiveLayer(layer));
            navigate(newUrl);
            try {
                const response = await getNodeChildren({ nodeId: layer }).unwrap();
                if (response.result === "success") {
                    dispatch(deleteBreadCrumbChildrenById(layer));
                    dispatch(setCanvasNodes(response.data.nodes));
                }
            } catch (error) {
                console.error('Failed to fetch node children:', error);
            }
        }
    };

    // Рассчитываем стили для каждого слоя в зависимости от позиции
    const getLayerStyle = (index: number, layerIndex: number) => {
        const distanceFromActive = Math.abs(layerIndex - activeIndex);
        const isActive = layerIndex === activeIndex;

        return {
            width: isActive ? '100%' : `${100 - (distanceFromActive * 10)}%`,
            opacity: isActive ? 1 : 1 - (distanceFromActive * 0.3),
            height: isActive ? '40px' : `${30 - (distanceFromActive * 5)}px`,
            zIndex: 5 - distanceFromActive,
            transform: isActive ? 'scale(1)' : `scale(${1 - (distanceFromActive * 0.05)})`,
            transition: 'all 0.5s ease',
        };
    };

    return (
        <div
            ref={containerRef}
            className="
                h-[150px]
                w-full
                flex
                flex-col
                justify-center
                items-center
                gap-[5px]
                overflow-hidden
                relative
            "
            onWheel={handleWheel}
        >
            {visibleLayers.map((layer, index) => {
                const layerIndex = breadcrumbs.findIndex(l => l.layer_id === layer.layer_id);
                return (
                    <div
                        key={layer.layer_id}
                        className="
                            w-full
                            flex
                            justify-end
                            items-center
                            transition-all
                            duration-300
                        "
                        style={{
                            height: getLayerStyle(index, layerIndex).height,
                        }}
                    >
                        <button
                            onClick={() => handleLayerClick(layerIndex, layer.layer_id)}
                            className={`
                                p-[10px]
                                border-0
                                flex
                                flex-row
                                justify-between
                                items-center
                                cursor-pointer
                                rounded-[5px]
                                overflow-hidden
                                bg-[#0D0E11]
                                ${active_layer === layer.layer_id ? 'border border-white' : ''}
                            `}
                            style={getLayerStyle(index, layerIndex)}
                        >
                            {(active_layer == layer.layer_id)
                                ?
                                (<div className="w-[10px] h-[10px] rounded-[100px] bg-[#c87800] ml-[10px]"></div>)
                                :
                                (<div className="w-[10px] h-[10px] rounded-[100px] bg-[#0D0E11] ml-[10px]"></div>)
                            }
                            <div className="
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
                            ">
                                {
                                    (layer.layer_id == "root")
                                    ?
                                    (<div>
                                        root
                                    </div>)
                                    :
                                    (<div>
                                        layer - {truncateLayerName(layer.name)}
                                    </div>)
                                }
                            </div>
                            {
                                (layer.layer_id == "root")
                                    ?
                                    (<img
                                        className="h-[100%]"
                                        src={images.root_icon_white}
                                        alt="layer_icon_white"
                                    />)
                                    :
                                    (<img
                                        className="h-[100%]"
                                        src={images.layer_icon_white}
                                        alt="layer_icon_white"
                                    />)
                            }

                        </button>
                    </div>
                );
            })}
        </div>
    );
};