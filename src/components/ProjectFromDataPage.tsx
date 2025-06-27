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

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    textStyle: {
                        color: '#FFF',
                        fontSize: '14px',
                        fontWeight: 'bold'  ,
                        fontFamily: 'sans-serif'

                    },
                    data: [
                        'Example Cluster 1',
                        'Example Cluster 2',
                        'Example Cluster 3',
                        'Example Cluster 4',
                        'Example Cluster 5'
                    ]
                },
                series: [
                    {
                        name: 'Cluster Distribution',
                        type: 'pie',
                        radius: ['30%', '75%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 0,
                            borderColor: '#FFF',
                            borderWidth: 6
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 335, name: 'Example Cluster 1' },
                            { value: 310, name: 'Example Cluster 2' },
                            { value: 234, name: 'Example Cluster 3' },
                            { value: 135, name: 'Example Cluster 4' },
                            { value: 1548, name: 'Example Cluster 5' }
                        ],
                        animationType: 'scale',
                        animationDuration: 1000,
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
                                <label className="block text-[14px] font-[Inter-medium] text-[#fff]">
                                    Project Name
                                </label>
                                <input
                                    className="w-[calc(100%-10px)] rounded-[4px] px-[6px] py-[6px] bg-[#191c21] font-[Inter-medium] text-[#FFF] border border-[#535558] rounded text-white focus:outline-none focus:border-[#6c757d]"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
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
                                onClick={handleSubmit}
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
                        <div className=" flex text-left  flex-col gap-[10px]">
                            <div className="text-[24px] font-[Inter-medium] mb-4 text-[#FFF]">Cluster Visualization</div>
                            <div className="text-[18px] font-[Inter-medium] mb-4 text-[#D9D9D9]">Louvain Algorithm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};