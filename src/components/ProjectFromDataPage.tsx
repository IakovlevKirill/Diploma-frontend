import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { LayoutBar } from "./LayoutBar.tsx";

export const ProjectFromDataPage = () => {
    const [projectName, setProjectName] = useState('New Project');
    const [file, setFile] = useState<File | null>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);

    // Инициализация ECharts
    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            setChartInstance(chart);

            // Базовый пример Survey chart
            const option = {
                title: {
                    text: 'Cluster Visualization',
                    subtext: 'Data Survey Chart',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5']
                },
                series: [
                    {
                        name: 'Cluster Distribution',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#191c21',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 335, name: 'Cluster 1' },
                            { value: 310, name: 'Cluster 2' },
                            { value: 234, name: 'Cluster 3' },
                            { value: 135, name: 'Cluster 4' },
                            { value: 1548, name: 'Cluster 5' }
                        ],
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx: number) {
                            return Math.random() * 200;
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

    const handleSubmit = () => {
        if (!file) return;

        // TODO: Добавьте здесь обработку файла и METIS кластеризацию
        // После получения данных обновите график:
        // updateChart(clusterData);
    };

    const updateChart = (clusterData: any) => {
        if (chartInstance) {
            const newOption = {
                series: [{
                    data: clusterData.map((cluster: any, index: number) => ({
                        value: cluster.size,
                        name: `Cluster ${index + 1}`
                    }))
                }]
            };
            chartInstance.setOption(newOption);
        }
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
                                <label className="block text-[14px] font-[Inter-medium] text-[#a0a4a8]">
                                    Project Name
                                </label>
                                <input
                                    className="w-[calc(100%-10px)] rounded-[4px] px-[6px] py-[6px] bg-[#191c21] font-[Inter-medium] text-[#FFF] border border-[#535558] rounded text-white focus:outline-none focus:border-[#6c757d]"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[14px] text-[#a0a4a8] mb-2">
                                    Upload Data File
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
                                                CSV, JSON or TXT
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                className="w-full py-2 bg-[#3a57e8] text-white rounded hover:bg-[#2d46c5] transition-colors disabled:opacity-50"
                                onClick={handleSubmit}
                                disabled={!file}
                            >
                                Create Project
                            </button>
                        </div>
                    </div>
                </div>

                {/* Правая панель - визуализация */}
                <div className="w-[calc(100%-300px)] h-full relative">
                    <div
                        ref={chartRef}
                        className="w-full h-full"
                        style={{ minHeight: '500px' }}
                    />

                    {/* Placeholder для будущей анимации */}
                    {!file && (
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-[#a0a4a8]">
                            <div className="text-[24px] mb-4">Cluster Visualization</div>
                            <div className="text-[14px] max-w-md text-center">
                                Upload your data file to see beautiful cluster visualization
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};