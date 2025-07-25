// 系统资源监控页面 - 基于文档6.3功能设计
const SystemResourceMonitor = () => {
    const { Card, Row, Col, Progress, Button, Space, Alert, Tag, Statistic, Badge, message } = antd;
    
    const [loading, setLoading] = React.useState(false);
    const [resourceData, setResourceData] = React.useState({
        realTimeMetrics: {
            cpu: { usage: 68.5, threshold: 80, status: 'normal' },
            memory: { usage: 72.3, threshold: 85, status: 'normal' },
            storage: { usage: 45.8, threshold: 90, status: 'normal' },
            bandwidth: { usage: 34.2, threshold: 75, status: 'normal' }
        },
        historicalData: {
            lastHour: {
                cpu: [65, 68, 72, 69, 71, 68],
                memory: [70, 72, 75, 73, 74, 72],
                storage: [45, 45, 46, 45, 46, 46],
                bandwidth: [30, 35, 38, 32, 34, 34]
            },
            last24Hours: {
                avgCpu: 69.2,
                avgMemory: 73.1,
                avgStorage: 45.5,
                avgBandwidth: 33.8,
                peakCpu: 85.3,
                peakMemory: 89.2,
                peakStorage: 47.1,
                peakBandwidth: 67.4
            }
        },
        alertSettings: {
            cpu: { enabled: true, threshold: 80 },
            memory: { enabled: true, threshold: 85 },
            storage: { enabled: true, threshold: 90 },
            bandwidth: { enabled: true, threshold: 75 }
        }
    });

    React.useEffect(() => {
        loadResourceData();
        // 每30秒刷新一次数据
        const interval = setInterval(loadResourceData, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadResourceData = () => {
        setLoading(true);
        setTimeout(() => {
            // 模拟实时数据更新
            setResourceData(prev => ({
                ...prev,
                realTimeMetrics: {
                    cpu: { usage: Math.random() * 20 + 60, threshold: 80, status: 'normal' },
                    memory: { usage: Math.random() * 15 + 70, threshold: 85, status: 'normal' },
                    storage: { usage: Math.random() * 5 + 43, threshold: 90, status: 'normal' },
                    bandwidth: { usage: Math.random() * 20 + 25, threshold: 75, status: 'normal' }
                }
            }));
            setLoading(false);
        }, 800);
    };

    // 获取状态颜色
    const getStatusColor = (usage, threshold) => {
        if (usage > threshold) return 'error';
        if (usage > threshold * 0.8) return 'warning';
        return 'success';
    };

    // 获取状态文字
    const getStatusText = (usage, threshold) => {
        if (usage > threshold) return '告警';
        if (usage > threshold * 0.8) return '警告';
        return '正常';
    };

    // 渲染实时监控卡片
    const renderRealTimeCard = (title, icon, data, unit = '%') => {
        const status = getStatusColor(data.usage, data.threshold);
        const statusText = getStatusText(data.usage, data.threshold);
        
        return React.createElement(Card, { 
            title: React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
                React.createElement('span', { key: 'icon', style: { fontSize: '18px' } }, icon),
                React.createElement('span', { key: 'title' }, title)
            ]),
            size: 'small',
            extra: React.createElement(Badge, { 
                status: status === 'error' ? 'error' : status === 'warning' ? 'warning' : 'success',
                text: statusText
            })
        }, [
            React.createElement('div', { 
                key: 'content',
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } 
            }, [
                React.createElement(Progress, {
                    key: 'progress',
                    type: 'circle',
                    percent: Math.round(data.usage * 10) / 10,
                    size: 120,
                    status: status === 'error' ? 'exception' : 'normal',
                    strokeColor: status === 'error' ? '#f5222d' : status === 'warning' ? '#fa8c16' : '#52c41a',
                    format: (percent) => `${percent}${unit}`
                }),
                React.createElement('div', { 
                    key: 'details',
                    style: { marginLeft: '16px', flex: 1 } 
                }, [
                    React.createElement('div', { 
                        key: 'current',
                        style: { fontSize: '14px', marginBottom: '8px' } 
                    }, `当前使用: ${Math.round(data.usage * 10) / 10}${unit}`),
                    React.createElement('div', { 
                        key: 'threshold',
                        style: { fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' } 
                    }, `告警阈值: ${data.threshold}${unit}`),
                    React.createElement('div', { 
                        key: 'remaining',
                        style: { fontSize: '12px', color: '#52c41a' } 
                    }, `剩余容量: ${Math.round((100 - data.usage) * 10) / 10}${unit}`)
                ])
            ])
        ]);
    };

    // 顶部工具栏
    const renderToolbar = () => {
        return React.createElement('div', { 
            style: { 
                background: '#fff', 
                padding: '16px 24px', 
                marginBottom: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('div', { key: 'left' }, [
                React.createElement('h2', { 
                    key: 'title',
                    style: { margin: 0, fontSize: '20px', fontWeight: 600 } 
                }, '系统资源监控'),
                React.createElement('p', { 
                    key: 'desc',
                    style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                }, '实时监控服务器资源使用情况，确保平台稳定性和可用性')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(Button, {
                    key: 'refresh-btn',
                    type: 'primary',
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: loadResourceData,
                    loading: loading
                }, '刷新数据'),
                React.createElement(Button, {
                    key: 'settings-btn',
                    icon: React.createElement('span', {}, '⚙️'),
                    onClick: () => message.info('告警设置功能开发中')
                }, '告警设置')
            ])
        ]);
    };

    // 系统状态概览
    const renderSystemOverview = () => {
        const { realTimeMetrics } = resourceData;
        const allNormal = Object.values(realTimeMetrics).every(metric => 
            getStatusColor(metric.usage, metric.threshold) === 'success'
        );
        
        return React.createElement(Alert, {
            message: '系统整体状态',
            description: allNormal ? 
                '所有系统资源运行正常，未发现异常情况' : 
                '部分系统资源使用率较高，请关注资源使用情况',
            type: allNormal ? 'success' : 'warning',
            showIcon: true,
            style: { marginBottom: '24px' }
        });
    };

    // 24小时统计数据
    const render24HourStats = () => {
        const { last24Hours } = resourceData.historicalData;
        
        return React.createElement(Card, { 
            title: '24小时统计数据',
            style: { marginTop: '24px' }
        }, [
            React.createElement(Row, { key: 'avg-stats', gutter: [16, 16], style: { marginBottom: '16px' } }, [
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, 'CPU平均使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#1890ff' } }, `${last24Hours.avgCpu}%`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '内存平均使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#52c41a' } }, `${last24Hours.avgMemory}%`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '存储平均使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' } }, `${last24Hours.avgStorage}%`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '带宽平均使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#722ed1' } }, `${last24Hours.avgBandwidth}%`)
                    ])
                )
            ]),
            
            React.createElement('hr', { key: 'divider', style: { margin: '16px 0', border: 'none', borderTop: '1px solid #f0f0f0' } }),
            
            React.createElement(Row, { key: 'peak-stats', gutter: [16, 16] }, [
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, 'CPU峰值使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#f5222d' } }, `${last24Hours.peakCpu}%`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '内存峰值使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#f5222d' } }, `${last24Hours.peakMemory}%`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '存储峰值使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#f5222d' } }, `${last24Hours.peakStorage}%`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                        React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '带宽峰值使用率'),
                        React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#f5222d' } }, `${last24Hours.peakBandwidth}%`)
                    ])
                )
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        renderSystemOverview(),
        
        // 实时资源监控
        React.createElement(Row, { key: 'real-time-metrics', gutter: [16, 16] }, [
            React.createElement(Col, { xs: 24, lg: 12, xl: 6 },
                renderRealTimeCard('CPU使用率', '🖥️', resourceData.realTimeMetrics.cpu)
            ),
            React.createElement(Col, { xs: 24, lg: 12, xl: 6 },
                renderRealTimeCard('内存使用率', '💾', resourceData.realTimeMetrics.memory)
            ),
            React.createElement(Col, { xs: 24, lg: 12, xl: 6 },
                renderRealTimeCard('存储空间', '💿', resourceData.realTimeMetrics.storage)
            ),
            React.createElement(Col, { xs: 24, lg: 12, xl: 6 },
                renderRealTimeCard('网络带宽', '🌐', resourceData.realTimeMetrics.bandwidth)
            )
        ]),

        render24HourStats(),

        // 资源使用趋势图
        React.createElement(Card, { 
            key: 'trend-chart',
            title: '资源使用趋势图',
            style: { marginTop: '24px' }
        }, 
            React.createElement('div', { style: { height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('span', { style: { color: '#8c8c8c' } }, '资源使用趋势图 (图表组件)')
            )
        )
    ]);
};

// 确保组件被正确导出
window.SystemResourceMonitor = SystemResourceMonitor; 