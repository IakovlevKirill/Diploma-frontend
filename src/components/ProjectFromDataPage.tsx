import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { LayoutBar } from "./LayoutBar.tsx";
import {useCreateProjectWithClusteringMutation} from "../api/testApi.ts";
import {BarLoader} from "react-spinners";
import {ClusterAnalyticsPanel} from "./ClusterAnalyticsPanel.tsx";

export const ProjectFromDataPage = () => {

    const [createProject, { isLoading }] = useCreateProjectWithClusteringMutation();

    const [analytics, setAnalytics] = useState<any>(null);

    const [projectTitle, setProjectTitle] = useState('New Project');
    const [file, setFile] = useState<File | null>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);

    const handleFileUpload = () => {
        const userId = localStorage.getItem("userId");

        if (file && userId) {
            createProject({ userId, file, projectTitle }).unwrap()
                .then((result) => {
                    console.log('Проект создан:', result.data);

                    // Получаем аналитику о кластерах
                    const clusterData = result.data.analytics.clustersSummary;

                    // Обновляем диаграмму
                    updateChart(clusterData);

                    // Сохраняем аналитику в состоянии
                    setAnalytics(result.data.analytics);
                })
                .catch((error) => {
                    console.error('Ошибка при создании проекта:', error);
                });

        }
    };

// Инициализация ECharts
    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            setChartInstance(chart);

            const option = {
                color: ['#66B2FF', '#5CD6D6', '#99FF99', '#FFD700', '#FFA07A'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br/>{b}: {c} nodes ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 'center',
                    textStyle: {
                        color: '#FFF',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif'
                    },
                    data: ['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5']
                },
                series: [
                    {
                        name: 'Clusters',
                        type: 'pie',
                        radius: '80%',
                        itemStyle: {
                            borderRadius: 0,
                            borderColor: '#FFF',
                            borderWidth: 6
                        },
                        data: [
                            { value: 42, name: 'Cluster 1' },
                            { value: 23, name: 'Cluster 2' },
                            { value: 31, name: 'Cluster 3' },
                            { value: 19, name: 'Cluster 4' },
                            { value: 35, name: 'Cluster 5' }
                        ],
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{b}: {c} nodes'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '16',
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        }
                    }
                ]
            };

            chart.setOption(option);

            // Адаптация при ресайзе
            const handleResize = () => chart.resize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.dispose();
            };
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            // Здесь можно добавить обработку файла и обновление графика
        }
    };

    const updateChart = (clusterData: Array<{ clusterId: string; nodeCount: number }>) => {
        if (!chartInstance || !clusterData?.length) return;

        const seriesData = clusterData.map((cluster, index) => ({
            value: cluster.nodeCount,
            name: `Cluster ${index + 1}`,
        }));

        const newOption = {
            legend: {
                data: seriesData.map(item => item.name),
            },
            series: [{
                data: seriesData,
                name: 'Cluster Distribution'
            }]
        };

        chartInstance.setOption(newOption);
    };

    return (
        <div className="h-[100vh] overflow-hidden relative flex flex-col bg-[#191c21]">
            <LayoutBar />
            <div className="w-full h-[95vh] flex items-center justify-start relative">
                {/* Левая панель - форма создания проекта */}
                <div className="border-[#535558] border-r-[1px] w-[300px] h-full bg-[#23272e] flex flex-col">
                    <div className="p-[30px] w-[calc(100%-60px)]">
                        <div className="w-full flex flex-col gap-[30px]">

                            <div className="text-[16px] font-[Inter-medium] text-[#FFF]">
                                Create New Project From Data
                            </div>

                            <div className="flex flex-col gap-[5px]">
                                <label className="block text-[14px] font-[Inter-medium] text-[#fff]">
                                    Project Name
                                </label>
                                <input
                                    className="w-[calc(100%-10px)] rounded-[4px] px-[6px] py-[6px] bg-[#191c21] font-[Inter-medium] text-[#FFF] border border-[#535558] rounded text-white focus:outline-none focus:border-[#6c757d]"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-[5px] font-[Inter-medium]">
                                <label className="block text-[14px] font-[Inter-medium] text-[#fff]">
                                    Upload data file
                                </label>
                                <div className="border-2 border-dashed border-[#535558] rounded p-6 text-center cursor-pointer hover:border-[#6c757d] transition-colors">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".csv,.json,.txt"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-[12px] text-[#a0a4a8]">
                                                {file ? file.name : 'Drag & drop or click to upload'}
                                            </p>
                                            <p className="text-[10px] text-[#535558] mt-1">
                                                JSON
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handleFileUpload}
                                className="flex items-center justify-center rounded-[2px] border-[0] font-[Inter-bold] py-[8px] hover:opacity-80">
                                Start clusterization
                            </button>

                        </div>
                    </div>
                </div>

                {/* Правая панель - визуализация */}
                <div className="w-[calc(100%-300px)] h-[95vh] relative">
                    <div className="flex w-[calc(100%-100px)] h-[calc(100%-100px)] p-[50px]">
                        <div
                            ref={chartRef}
                            className="w-full h-full flex items-center"
                            style={{ minHeight: '500px' }}
                        />

                        {/* Placeholder для будущей анимации */}
                        <div className="w-[300px] flex flex-col font-[Inter-medium] text-[#FFF]">
                            <div className=" flex text-left  flex-col gap-[10px]">
                                <div className="text-[24px] font-[Inter-medium] mb-4 text-[#FFF]">Cluster Visualization</div>
                                <div className="text-[18px] font-[Inter-medium] mb-4 text-[#D9D9D9]">Louvain Algorithm</div>
                            </div>

                            <div className="flex justify-center items-center bg-gray-900">
                                {/* Отображаем только если есть данные */}
                                {analytics && <ClusterAnalyticsPanel analytics={analytics} />}
                            </div>
                        </div>

                    </div>
                </div>

                {(isLoading) && (
                    <div className="flex items-center flex-col gap-[40px] justify-center font-[Inter-medium] bg-[rgba(40,40,40,0.75)] backdrop-blur-md absolute w-full h-[95vh] z-3">
                        <div className="text-[40px] text-[#FFF]">Clusterization in process</div>
                        <BarLoader
                            speedMultiplier={0.4}
                            width={300}
                            height={8}
                            color="#FFF"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};