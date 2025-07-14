// 数据分析组件
const DataAnalysis = () => {
    const { Card, Table, Button, Space, Statistic, Row, Col, DatePicker, Select, Progress, Tabs, Alert } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [analysisData, setAnalysisData] = React.useState({});
    
    // 模拟数据分析结果
    const mockAnalysisData = {
        overview: {
            totalData: 1256890,
            todayData: 12568,
            dataGrowth: 8.5,
            processingSpeed: 95.2
        },
        contentAnalysis: [
            { type: '技术文档', count: 45623, percentage: 36.3, trend: 'up' },
            { type: '新闻资讯', count: 38234, percentage: 30.4, trend: 'up' },
            { type: '产品介绍', count: 25891, percentage: 20.6, trend: 'down' },
            { type: '政策解读', count: 15900, percentage: 12.7, trend: 'stable' }
        ],
        userBehavior: [
            { action: '浏览', count: 234567, avgTime: 8.5, conversion: 12.3 },
            { action: '搜索', count: 189234, avgTime: 3.2, conversion: 8.9 },
            { action: '下载', count: 98765, avgTime: 2.1, conversion: 45.6 },
            { action: '分享', count: 54321, avgTime: 1.8, conversion: 23.4 }
        ],
        systemPerformance: {
            cpuUsage: 65.2,
            memoryUsage: 78.9,
            diskUsage: 45.6,
            networkIO: 234.5
        }
    };
    
    React.useEffect(() => {
        loadAnalysisData();
    }, []);
    
    const loadAnalysisData = () => {
        setLoading(true);
        setTimeout(() => {
            setAnalysisData(mockAnalysisData);
            setLoading(false);
        }, 1000);
    };
    
    const getTrendIcon = (trend) => {
        const icons = {
            up: '↗️',
            down: '↘️',
            stable: '→'
        };
        return icons[trend] || '→';
    };
    
    const getTrendColor = (trend) => {
        const colors = {
            up: '#52c41a',
            down: '#f5222d',
            stable: '#faad14'
        };
        return colors[trend] || '#faad14';
    };
    
    const contentColumns = [
        {
            title: '内容类型',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
            render: (count) => count.toLocaleString()
        },
        {
            title: '占比',
            dataIndex: 'percentage',
            key: 'percentage',
            render: (percentage) => `${percentage}%`
        },
        {
            title: '趋势',
            dataIndex: 'trend',
            key: 'trend',
            render: (trend) => React.createElement('span', {
                style: { color: getTrendColor(trend) }
            }, getTrendIcon(trend))
        },
        {
            title: '进度',
            key: 'progress',
            render: (_, record) => React.createElement(Progress, {
                percent: record.percentage,
                size: 'small',
                strokeColor: getTrendColor(record.trend)
            })
        }
    ];
    
    const behaviorColumns = [
        {
            title: '用户行为',
            dataIndex: 'action',
            key: 'action'
        },
        {
            title: '次数',
            dataIndex: 'count',
            key: 'count',
            render: (count) => count.toLocaleString()
        },
        {
            title: '平均时长(分钟)',
            dataIndex: 'avgTime',
            key: 'avgTime'
        },
        {
            title: '转化率(%)',
            dataIndex: 'conversion',
            key: 'conversion',
            render: (conversion) => `${conversion}%`
        }
    ];
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '数据分析'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '系统数据分析和报告生成')
        ]),
        
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 24 }
        }, React.createElement(Space, {}, [
            React.createElement(RangePicker, {
                key: 'date-range',
                placeholder: ['开始日期', '结束日期']
            }),
            React.createElement(Select, {
                key: 'data-type',
                placeholder: '数据类型',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'all', value: 'all' }, '全部数据'),
                React.createElement(Option, { key: 'content', value: 'content' }, '内容数据'),
                React.createElement(Option, { key: 'user', value: 'user' }, '用户数据'),
                React.createElement(Option, { key: 'system', value: 'system' }, '系统数据')
            ]),
            React.createElement(Button, {
                key: 'analyze',
                type: 'primary',
                onClick: loadAnalysisData
            }, '开始分析'),
            React.createElement(Button, {
                key: 'export',
                onClick: () => message.info('导出报告功能')
            }, '导出报告')
        ])),
        
        React.createElement(Row, {
            key: 'overview',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总数据量',
                        value: analysisData.overview?.totalData,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'today', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '今日新增',
                        value: analysisData.overview?.todayData,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'growth', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '增长率',
                        value: analysisData.overview?.dataGrowth,
                        suffix: '%',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { key: 'speed', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '处理速度',
                        value: analysisData.overview?.processingSpeed,
                        suffix: '%',
                        valueStyle: { color: '#fa541c' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'analysis-tabs'
        }, React.createElement(Tabs, {
            defaultActiveKey: 'content'
        }, [
            React.createElement(TabPane, {
                key: 'content',
                tab: '内容分析'
            }, [
                React.createElement(Alert, {
                    key: 'info',
                    message: '内容数据分析',
                    description: '分析平台内容的分布、质量和用户参与度',
                    type: 'info',
                    showIcon: true,
                    style: { marginBottom: 16 }
                }),
                React.createElement(Table, {
                    key: 'table',
                    columns: contentColumns,
                    dataSource: analysisData.contentAnalysis,
                    rowKey: 'type',
                    loading: loading,
                    pagination: false
                })
            ]),
            
            React.createElement(TabPane, {
                key: 'behavior',
                tab: '行为分析'
            }, [
                React.createElement(Alert, {
                    key: 'info',
                    message: '用户行为分析',
                    description: '分析用户在平台上的行为模式和转化情况',
                    type: 'info',
                    showIcon: true,
                    style: { marginBottom: 16 }
                }),
                React.createElement(Table, {
                    key: 'table',
                    columns: behaviorColumns,
                    dataSource: analysisData.userBehavior,
                    rowKey: 'action',
                    loading: loading,
                    pagination: false
                })
            ]),
            
            React.createElement(TabPane, {
                key: 'performance',
                tab: '性能分析'
            }, [
                React.createElement(Alert, {
                    key: 'info',
                    message: '系统性能分析',
                    description: '监控系统资源使用情况和性能指标',
                    type: 'info',
                    showIcon: true,
                    style: { marginBottom: 16 }
                }),
                React.createElement(Row, {
                    key: 'performance-metrics',
                    gutter: 16
                }, [
                    React.createElement(Col, { key: 'cpu', span: 6 },
                        React.createElement(Card, {
                            title: 'CPU使用率'
                        }, React.createElement(Progress, {
                            type: 'circle',
                            percent: analysisData.systemPerformance?.cpuUsage,
                            strokeColor: analysisData.systemPerformance?.cpuUsage > 80 ? '#f5222d' : '#52c41a'
                        }))
                    ),
                    React.createElement(Col, { key: 'memory', span: 6 },
                        React.createElement(Card, {
                            title: '内存使用率'
                        }, React.createElement(Progress, {
                            type: 'circle',
                            percent: analysisData.systemPerformance?.memoryUsage,
                            strokeColor: analysisData.systemPerformance?.memoryUsage > 80 ? '#f5222d' : '#52c41a'
                        }))
                    ),
                    React.createElement(Col, { key: 'disk', span: 6 },
                        React.createElement(Card, {
                            title: '磁盘使用率'
                        }, React.createElement(Progress, {
                            type: 'circle',
                            percent: analysisData.systemPerformance?.diskUsage,
                            strokeColor: analysisData.systemPerformance?.diskUsage > 80 ? '#f5222d' : '#52c41a'
                        }))
                    ),
                    React.createElement(Col, { key: 'network', span: 6 },
                        React.createElement(Card, {
                            title: '网络IO'
                        }, React.createElement(Statistic, {
                            value: analysisData.systemPerformance?.networkIO,
                            suffix: 'MB/s',
                            valueStyle: { color: '#1890ff' }
                        }))
                    )
                ])
            ])
        ]))
    ]);
};

window.DataAnalysis = DataAnalysis; 