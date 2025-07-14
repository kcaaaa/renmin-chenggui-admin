// 用户分析组件
const UserAnalysis = () => {
    const { Card, Table, Button, Space, Statistic, Row, Col, DatePicker, Select, Progress, Tabs } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [userStats, setUserStats] = React.useState({});
    const [activeUsers, setActiveUsers] = React.useState([]);
    const [userBehavior, setUserBehavior] = React.useState([]);
    
    // 模拟用户统计数据
    const mockUserStats = {
        totalUsers: 12580,
        activeUsers: 8960,
        newUsers: 1250,
        retentionRate: 78.5,
        avgSessionTime: 25.6,
        pageViews: 156780,
        bounceRate: 32.1,
        conversionRate: 4.8
    };
    
    // 模拟活跃用户数据
    const mockActiveUsers = [
        { id: 1, username: 'user001', loginCount: 45, lastLogin: '2024-01-15 14:30:00', sessionTime: 120, pageViews: 85 },
        { id: 2, username: 'user002', loginCount: 38, lastLogin: '2024-01-15 13:45:00', sessionTime: 95, pageViews: 62 },
        { id: 3, username: 'user003', loginCount: 52, lastLogin: '2024-01-15 15:20:00', sessionTime: 180, pageViews: 120 },
        { id: 4, username: 'user004', loginCount: 28, lastLogin: '2024-01-15 12:15:00', sessionTime: 65, pageViews: 45 },
        { id: 5, username: 'user005', loginCount: 41, lastLogin: '2024-01-15 16:00:00', sessionTime: 140, pageViews: 98 }
    ];
    
    // 模拟用户行为数据
    const mockUserBehavior = [
        { action: '登录', count: 8960, percentage: 100 },
        { action: '浏览内容', count: 7850, percentage: 87.6 },
        { action: '搜索', count: 5420, percentage: 60.5 },
        { action: '发布内容', count: 2180, percentage: 24.3 },
        { action: '评论互动', count: 1890, percentage: 21.1 },
        { action: '分享', count: 1250, percentage: 13.9 }
    ];
    
    React.useEffect(() => {
        loadUserAnalysis();
    }, []);
    
    const loadUserAnalysis = () => {
        setLoading(true);
        setTimeout(() => {
            setUserStats(mockUserStats);
            setActiveUsers(mockActiveUsers);
            setUserBehavior(mockUserBehavior);
            setLoading(false);
        }, 1000);
    };
    
    const activeUserColumns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '登录次数',
            dataIndex: 'loginCount',
            key: 'loginCount',
            sorter: (a, b) => a.loginCount - b.loginCount
        },
        {
            title: '最后登录',
            dataIndex: 'lastLogin',
            key: 'lastLogin'
        },
        {
            title: '会话时长(分钟)',
            dataIndex: 'sessionTime',
            key: 'sessionTime',
            sorter: (a, b) => a.sessionTime - b.sessionTime
        },
        {
            title: '页面浏览量',
            dataIndex: 'pageViews',
            key: 'pageViews',
            sorter: (a, b) => a.pageViews - b.pageViews
        }
    ];
    
    const behaviorColumns = [
        {
            title: '行为类型',
            dataIndex: 'action',
            key: 'action'
        },
        {
            title: '用户数量',
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
            title: '进度',
            key: 'progress',
            render: (_, record) => React.createElement(Progress, {
                percent: record.percentage,
                size: 'small',
                status: record.percentage > 50 ? 'active' : 'normal'
            })
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
            }, '用户分析'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '分析用户行为和使用统计')
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
                key: 'user-type',
                placeholder: '用户类型',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'all', value: 'all' }, '全部用户'),
                React.createElement(Option, { key: 'new', value: 'new' }, '新用户'),
                React.createElement(Option, { key: 'active', value: 'active' }, '活跃用户'),
                React.createElement(Option, { key: 'inactive', value: 'inactive' }, '不活跃用户')
            ]),
            React.createElement(Button, {
                key: 'refresh',
                type: 'primary',
                onClick: loadUserAnalysis
            }, '刷新数据')
        ])),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总用户数',
                        value: userStats.totalUsers,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '活跃用户',
                        value: userStats.activeUsers,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'new', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '新增用户',
                        value: userStats.newUsers,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { key: 'retention', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '留存率',
                        value: userStats.retentionRate,
                        suffix: '%',
                        valueStyle: { color: '#fa541c' }
                    })
                )
            )
        ]),
        
        React.createElement(Row, {
            key: 'metrics',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'session', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均会话时长',
                        value: userStats.avgSessionTime,
                        suffix: '分钟',
                        valueStyle: { color: '#13c2c2' }
                    })
                )
            ),
            React.createElement(Col, { key: 'pv', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '页面浏览量',
                        value: userStats.pageViews,
                        valueStyle: { color: '#eb2f96' }
                    })
                )
            ),
            React.createElement(Col, { key: 'bounce', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '跳出率',
                        value: userStats.bounceRate,
                        suffix: '%',
                        valueStyle: { color: '#f5222d' }
                    })
                )
            ),
            React.createElement(Col, { key: 'conversion', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '转化率',
                        value: userStats.conversionRate,
                        suffix: '%',
                        valueStyle: { color: '#52c41a' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'tabs'
        }, React.createElement(Tabs, {
            defaultActiveKey: 'active-users'
        }, [
            React.createElement(TabPane, {
                key: 'active-users',
                tab: '活跃用户'
            }, React.createElement(Table, {
                columns: activeUserColumns,
                dataSource: activeUsers,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条`
                }
            })),
            
            React.createElement(TabPane, {
                key: 'user-behavior',
                tab: '用户行为'
            }, React.createElement(Table, {
                columns: behaviorColumns,
                dataSource: userBehavior,
                rowKey: 'action',
                loading: loading,
                pagination: false
            }))
        ]))
    ]);
};

window.UserAnalysis = UserAnalysis; 