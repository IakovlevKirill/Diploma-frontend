import React from 'react';

interface ClusterSummary {
    clusterId: string;
    nodeCount: number;
}

interface AnalyticsData {
    totalNodes: number;
    totalClusters: number;
    clustersSummary: ClusterSummary[];
    executionTimeMs: number;
}

interface ClusterAnalyticsPanelProps {
    analytics: AnalyticsData;
}

export const ClusterAnalyticsPanel: React.FC<ClusterAnalyticsPanelProps> = ({ analytics }) => {
    const { totalNodes, totalClusters, clustersSummary, executionTimeMs } = analytics;

    return (
        <div className="flex gap-[10px] mt-[50px] flex-col bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-2xl font-bold mb-4">Аналитика кластеризации</div>

            <div className="mb-4">
                <p><div className="font-semibold">Всего элементов:</div> {totalNodes}</p>
                <p><div className="font-semibold">Обнаружено кластеров:</div> {totalClusters}</p>
                <p><div className="font-semibold">Время выполнения:</div> {(executionTimeMs / 1000).toFixed(2)} сек.</p>
            </div>

            <div className="text-xl font-semibold mb-2">Распределение по кластерам</div>
            <ul className="space-y-5 flex gap-[20px] flex-col pr-2">
                {clustersSummary.map((cluster, index) => (
                    <li
                        key={cluster.clusterId}
                        className="bg-gray-700 px-4 py-2 rounded flex justify-between items-center"
                    >
                        <span>Кластер {index + 1}</span>
                        <span className="font-mono bg-gray-900 px-2 py-1 rounded text-sm">
              {cluster.nodeCount} узлов
            </span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-300">
                <p>Алгоритм Лувена успешно оптимизировал структуру графа и выявил логические группы.</p>
            </div>
        </div>
    );
};