// 用户行为统计组件
const UserBehaviorStats = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, DatePicker, Select, Progress } = antd;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [stats, setStats] = React.useState([]);
    const [overview, setOverview] = React.useState({});
    
    // 模拟用户行为统计数据
    const mockStats = [
        { 
            id: 1, 
            behavior: 'page_view', 
            count: 15420, 
            percentage: 35.2, 
            trend: 'up',
            description: '页面浏览',
            avgTime: '2.5分钟'
        },
        { 
            id: 2, 
            behavior: 'content_read', 
            count: 8960, 
            percentage: 20.5, 
            trend: 'up',
            description: '内容阅读',
            avgTime: '4.2分钟'
        },
        { 
            id: 3, 
            behavior: 'search', 
            count: 6730, 
            percentage: 15.4, 
            trend: 'down',
            description: '搜索行为',
            avgTime: '1.8分钟'
        },
        { 
            id: 4, 
            behavior: 'download', 
            count: 3250, 
            percentage: 7.4, 
            trend: 'up',
            description: '下载行为',
            avgTime: '0.5分钟'
        },
        { 
            id: 5, 
            behavior: 'share', 
            count: 2180, 
            percentage: 5.0, 
            trend: 'stable',
            description: '分享行为',
            avgTime: '0.3分钟'
        }
    ];
    
    const mockOverview = {
        totalUsers: 12580,
        activeUsers: 8960,
        newUsers: 1250,
        avgSessionTime: '8.5分钟',
        bounceRate: 32.5,
        conversionRate: 12.8
    };
    
    React.useEffect(() => {
        loadStats();
    }, []);
    
    const loadStats = () => {
        setLoading(true);
        setTimeout(() => {
            setStats(mockStats);
            setOverview(mockOverview);
            setLoading(false);
        }, 1000);
    };
    
    const getTrendIcon = (trend) => {
        const trendMap = {
            'up': { icon: '↑', color: '#52c41a' },
            'down': { icon: '↓', color: '#f5222d' },
            'stable': { icon: '→', color: '#faad14' }
        };
        const config = trendMap[trend] || { icon: '→', color: '#d9d9d9' };
        return React.createElement('span', {
            style: { color: config.color, fontWeight: 'bold' }
        }, config.icon);
    };
    
    const columns = [
        {
            title: '行为类型',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '次数',
            dataIndex: 'count',
            key: 'count',
            render: (count) => count.toLocaleString()
        },
        {
            title: '占比',
            dataIndex: 'percentage',
            key: 'percentage',
            render: (percentage) => React.createElement(Progress, {
                percent: percentage,
                size: 'small',
                format: (percent) => `${percent}%`
            })
        },
        {
            title: '趋势',
            dataIndex: 'trend',
            key: 'trend',
            render: getTrendIcon
        },
        {
            title: '平均时长',
            dataIndex: 'avgTime',
            key: 'avgTime'
        }
    ];
    
    const handleDateChange = (dates) => {
        console.log('日期范围:', dates);
        loadStats();
    };
    
    const handleExport = () => {
        message.info('正在导出统计数据...');
        setTimeout(() => {
            message.success('导出成功');
        }, 2000);
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '用户行为统计'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '分析用户行为模式和趋势')
        ]),
        
        React.createElement(Row, {
            key: 'overview',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 4 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总用户数',
                        value: overview.totalUsers,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 4 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '活跃用户',
                        value: overview.activeUsers,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'new', span: 4 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '新用户',
                        value: overview.newUsers,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { key: 'session', span: 4 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均会话时长',
                        value: overview.avgSessionTime
                    })
                )
            ),
            React.createElement(Col, { key: 'bounce', span: 4 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '跳出率',
                        value: overview.bounceRate,
                        suffix: '%',
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'conversion', span: 4 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '转化率',
                        value: overview.conversionRate,
                        suffix: '%',
                        valueStyle: { color: '#13c2c2' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(RangePicker, {
                key: 'date-range',
                onChange: handleDateChange,
                format: 'YYYY-MM-DD'
            }),
            React.createElement(Select, {
                key: 'behavior-filter',
                placeholder: '行为类型',
                style: { width: 150 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'page_view', value: 'page_view' }, '页面浏览'),
                React.createElement(Option, { key: 'content_read', value: 'content_read' }, '内容阅读'),
                React.createElement(Option, { key: 'search', value: 'search' }, '搜索行为'),
                React.createElement(Option, { key: 'download', value: 'download' }, '下载行为'),
                React.createElement(Option, { key: 'share', value: 'share' }, '分享行为')
            ]),
            React.createElement(Button, {
                key: 'export',
                type: 'primary',
                onClick: handleExport
            }, '导出数据'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadStats
            }, '刷新')
        ])),
        
        React.createElement(Card, {
            key: 'table',
            title: '行为统计详情'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: stats,
            rowKey: 'id',
            loading: loading,
            pagination: false
        }))
    ]);
};

window.UserBehaviorStats = UserBehaviorStats; 