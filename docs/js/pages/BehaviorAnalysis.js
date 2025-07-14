// 行为分析组件
const BehaviorAnalysis = () => {
    const { Card, Table, Button, Space, Statistic, Row, Col, DatePicker, Select, Progress, Tabs, Tag } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [behaviorData, setBehaviorData] = React.useState({});
    
    // 模拟行为分析数据
    const mockBehaviorData = {
        overview: {
            totalActions: 2456890,
            uniqueUsers: 125689,
            avgSessionTime: 15.6,
            bounceRate: 32.1
        },
        actionAnalysis: [
            { action: '页面浏览', count: 856234, percentage: 34.8, avgTime: 2.3 },
            { action: '内容搜索', count: 523456, percentage: 21.3, avgTime: 1.8 },
            { action: '文档下载', count: 345678, percentage: 14.1, avgTime: 0.5 },
            { action: '视频观看', count: 234567, percentage: 9.5, avgTime: 8.2 },
            { action: '评论互动', count: 189234, percentage: 7.7, avgTime: 3.1 },
            { action: '内容分享', count: 156789, percentage: 6.4, avgTime: 0.8 },
            { action: '收藏保存', count: 123456, percentage: 5.0, avgTime: 0.3 },
            { action: '在线咨询', count: 27576, percentage: 1.1, avgTime: 12.5 }
        ],
        pathAnalysis: [
            { path: '首页 → 搜索 → 详情页', count: 45623, conversion: 23.4 },
            { path: '首页 → 推荐 → 详情页', count: 38234, conversion: 19.8 },
            { path: '搜索 → 详情页 → 下载', count: 29876, conversion: 45.6 },
            { path: '首页 → 分类 → 列表页', count: 25431, conversion: 12.7 },
            { path: '详情页 → 相关推荐 → 详情页', count: 18765, conversion: 34.2 }
        ],
        timeAnalysis: [
            { hour: '00:00', users: 1234, actions: 5678 },
            { hour: '08:00', users: 12345, actions: 45678 },
            { hour: '09:00', users: 23456, actions: 89012 },
            { hour: '10:00', users: 34567, actions: 123456 },
            { hour: '14:00', users: 45678, actions: 167890 },
            { hour: '15:00', users: 38234, actions: 145678 },
            { hour: '16:00', users: 29876, actions: 123456 },
            { hour: '20:00', users: 18765, actions: 67890 },
            { hour: '21:00', users: 12345, actions: 34567 },
            { hour: '22:00', users: 8765, actions: 23456 }
        ]
    };
    
    React.useEffect(() => {
        loadBehaviorData();
    }, []);
    
    const loadBehaviorData = () => {
        setLoading(true);
        setTimeout(() => {
            setBehaviorData(mockBehaviorData);
            setLoading(false);
        }, 1000);
    };
    
    const actionColumns = [
        {
            title: '用户行为',
            dataIndex: 'action',
            key: 'action'
        },
        {
            title: '次数',
            dataIndex: 'count',
            key: 'count',
            render: (count) => count.toLocaleString(),
            sorter: (a, b) => a.count - b.count
        },
        {
            title: '占比',
            dataIndex: 'percentage',
            key: 'percentage',
            render: (percentage) => `${percentage}%`
        },
        {
            title: '平均时长',
            dataIndex: 'avgTime',
            key: 'avgTime',
            render: (time) => `${time}分钟`
        },
        {
            title: '进度条',
            key: 'progress',
            render: (_, record) => React.createElement(Progress, {
                percent: record.percentage,
                size: 'small',
                strokeColor: record.percentage > 20 ? '#52c41a' : '#1890ff'
            })
        }
    ];
    
    const pathColumns = [
        {
            title: '用户路径',
            dataIndex: 'path',
            key: 'path',
            width: 300
        },
        {
            title: '用户数',
            dataIndex: 'count',
            key: 'count',
            render: (count) => count.toLocaleString()
        },
        {
            title: '转化率',
            dataIndex: 'conversion',
            key: 'conversion',
            render: (conversion) => React.createElement(Tag, {
                color: conversion > 30 ? 'green' : conversion > 20 ? 'orange' : 'red'
            }, `${conversion}%`)
        }
    ];
    
    const timeColumns = [
        {
            title: '时间段',
            dataIndex: 'hour',
            key: 'hour'
        },
        {
            title: '活跃用户',
            dataIndex: 'users',
            key: 'users',
            render: (users) => users.toLocaleString()
        },
        {
            title: '行为次数',
            dataIndex: 'actions',
            key: 'actions',
            render: (actions) => actions.toLocaleString()
        },
        {
            title: '活跃度',
            key: 'activity',
            render: (_, record) => {
                const activity = (record.actions / record.users).toFixed(1);
                return React.createElement('span', {
                    style: { color: activity > 5 ? '#52c41a' : '#1890ff' }
                }, `${activity}次/人`);
            }
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
            }, '行为分析'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '分析用户行为模式和路径')
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
                key: 'behavior-type',
                placeholder: '行为类型',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'all', value: 'all' }, '全部行为'),
                React.createElement(Option, { key: 'view', value: 'view' }, '浏览行为'),
                React.createElement(Option, { key: 'interact', value: 'interact' }, '交互行为'),
                React.createElement(Option, { key: 'convert', value: 'convert' }, '转化行为')
            ]),
            React.createElement(Button, {
                key: 'analyze',
                type: 'primary',
                onClick: loadBehaviorData
            }, '开始分析')
        ])),
        
        React.createElement(Row, {
            key: 'overview',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总行为次数',
                        value: behaviorData.overview?.totalActions,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'users', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '活跃用户',
                        value: behaviorData.overview?.uniqueUsers,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'session', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均会话时长',
                        value: behaviorData.overview?.avgSessionTime,
                        suffix: '分钟',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { key: 'bounce', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '跳出率',
                        value: behaviorData.overview?.bounceRate,
                        suffix: '%',
                        valueStyle: { color: '#fa541c' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'analysis-tabs'
        }, React.createElement(Tabs, {
            defaultActiveKey: 'actions'
        }, [
            React.createElement(TabPane, {
                key: 'actions',
                tab: '行为统计'
            }, React.createElement(Table, {
                columns: actionColumns,
                dataSource: behaviorData.actionAnalysis,
                rowKey: 'action',
                loading: loading,
                pagination: {
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条`
                }
            })),
            
            React.createElement(TabPane, {
                key: 'paths',
                tab: '路径分析'
            }, React.createElement(Table, {
                columns: pathColumns,
                dataSource: behaviorData.pathAnalysis,
                rowKey: 'path',
                loading: loading,
                pagination: false
            })),
            
            React.createElement(TabPane, {
                key: 'time',
                tab: '时间分析'
            }, React.createElement(Table, {
                columns: timeColumns,
                dataSource: behaviorData.timeAnalysis,
                rowKey: 'hour',
                loading: loading,
                pagination: false
            }))
        ]))
    ]);
};

window.BehaviorAnalysis = BehaviorAnalysis; 