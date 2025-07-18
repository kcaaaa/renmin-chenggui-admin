// 运营数据统计页面 - 基于文档6.1功能设计
const OperationalDataStats = () => {
    const { Card, Tabs, Row, Col, Statistic, Progress, Button, Space, Select, DatePicker, Table, Tag, Alert, Modal, Form, Tooltip, Badge, message } = antd;
    const { TabPane } = Tabs;
    const { RangePicker } = DatePicker;
    
    const [activeTab, setActiveTab] = React.useState('user-analysis');
    const [loading, setLoading] = React.useState(false);
    const [dateRange, setDateRange] = React.useState(null);
    const [exportModalVisible, setExportModalVisible] = React.useState(false);
    const [form] = Form.useForm();

    // 模拟数据
    const [dashboardData, setDashboardData] = React.useState({
        // 用户分析数据
        userAnalysis: {
            totalUsers: 156789,
            newUsers: 1234,
            cancelledUsers: 56,
            dailyActiveUsers: 45623,
            weeklyActiveUsers: 78932,
            monthlyActiveUsers: 89234,
            userGrowthTrend: [
                { date: '01-09', newUsers: 120, cancelledUsers: 5, activeUsers: 42300 },
                { date: '01-10', newUsers: 145, cancelledUsers: 8, activeUsers: 43800 },
                { date: '01-11', newUsers: 167, cancelledUsers: 6, activeUsers: 45200 },
                { date: '01-12', newUsers: 134, cancelledUsers: 12, activeUsers: 44600 },
                { date: '01-13', newUsers: 189, cancelledUsers: 7, activeUsers: 46100 },
                { date: '01-14', newUsers: 201, cancelledUsers: 9, activeUsers: 47200 },
                { date: '01-15', newUsers: 178, cancelledUsers: 8, activeUsers: 45623 }
            ],
            retentionRate: {
                day1: 75.6,
                day3: 65.2,
                day7: 58.9,
                day14: 52.3,
                day30: 45.7
            }
        },
        // APP行为统计数据
        appBehavior: {
            totalLaunches: 234567,
            avgLaunchesPerUser: 15.2,
            totalUsageTime: 8567, // 小时
            avgUsageTimePerUser: 8.5, // 分钟
            totalPageViews: 1456789,
            avgPageViewsPerUser: 93.2,
            behaviorTrend: [
                { date: '01-09', launches: 22400, usageTime: 780, pageViews: 134200 },
                { date: '01-10', launches: 23100, usageTime: 820, pageViews: 142300 },
                { date: '01-11', launches: 24500, usageTime: 890, pageViews: 156400 },
                { date: '01-12', launches: 23800, usageTime: 845, pageViews: 148900 },
                { date: '01-13', launches: 25200, usageTime: 910, pageViews: 162300 },
                { date: '01-14', launches: 26300, usageTime: 950, pageViews: 171500 },
                { date: '01-15', launches: 24800, usageTime: 875, pageViews: 158700 }
            ]
        },
        // 功能使用分析数据
        functionUsage: {
            coreFeatures: [
                { feature: '作品发布', usageCount: 45678, userCount: 12345, usageRate: 78.9, avgStayTime: 4.5 },
                { feature: '评论互动', usageCount: 89234, userCount: 23456, usageRate: 89.2, avgStayTime: 2.3 },
                { feature: '点赞分享', usageCount: 156789, userCount: 34567, usageRate: 95.6, avgStayTime: 0.8 },
                { feature: '关注用户', usageCount: 23456, userCount: 8901, usageRate: 56.7, avgStayTime: 1.2 },
                { feature: '展会查询', usageCount: 34567, userCount: 15678, usageRate: 67.8, avgStayTime: 3.8 }
            ],
            pageStayTime: [
                { page: '首页', avgStayTime: 45.6, bounceRate: 32.1 },
                { page: '作品列表', avgStayTime: 78.9, bounceRate: 28.5 },
                { page: '作品详情', avgStayTime: 123.4, bounceRate: 15.2 },
                { page: '展会列表', avgStayTime: 89.7, bounceRate: 35.8 },
                { page: '用户中心', avgStayTime: 67.3, bounceRate: 42.1 }
            ]
        },
        // 异常情况统计数据
        exceptionStats: {
            crashData: {
                totalCrashes: 234,
                affectedUsers: 156,
                crashRate: 0.15,
                trend: [
                    { date: '01-09', crashes: 28, users: 18 },
                    { date: '01-10', crashes: 32, users: 21 },
                    { date: '01-11', crashes: 25, users: 16 },
                    { date: '01-12', crashes: 41, users: 25 },
                    { date: '01-13', crashes: 29, users: 19 },
                    { date: '01-14', crashes: 35, users: 22 },
                    { date: '01-15', crashes: 44, users: 28 }
                ]
            },
            performanceMonitor: {
                homePageLoad: { avgTime: 1.25, threshold: 2.0, status: 'good' },
                videoLoad: { avgTime: 2.8, threshold: 3.0, status: 'good' },
                imageTextLoad: { avgTime: 0.85, threshold: 1.5, status: 'excellent' },
                apiResponse: { avgTime: 245, threshold: 500, status: 'good' }
            }
        }
    });

    React.useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // 核心指标看板
    const renderCoreMetrics = () => {
        const { userAnalysis, appBehavior } = dashboardData;
        
        return React.createElement(Row, { gutter: [16, 16], style: { marginBottom: '24px' } }, [
            React.createElement(Col, { key: 'total-users', xs: 24, sm: 12, md: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总用户数',
                        value: userAnalysis.totalUsers,
                        suffix: '人',
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'dau', xs: 24, sm: 12, md: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: 'DAU (日活跃用户)',
                        value: userAnalysis.dailyActiveUsers,
                        suffix: '人',
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'mau', xs: 24, sm: 12, md: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: 'MAU (月活跃用户)',
                        value: userAnalysis.monthlyActiveUsers,
                        suffix: '人',
                        valueStyle: { color: '#fa8c16' }
                    })
                )
            ),
            React.createElement(Col, { key: 'new-users', xs: 24, sm: 12, md: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '新增用户数',
                        value: userAnalysis.newUsers,
                        suffix: '人',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            )
        ]);
    };

    // 用户分析Tab内容
    const renderUserAnalysis = () => {
        const { userAnalysis } = dashboardData;
        
        return React.createElement('div', {}, [
            // 用户统计卡片
            React.createElement(Row, { key: 'user-stats', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '总用户数', size: 'small' },
                        React.createElement(Statistic, {
                            value: userAnalysis.totalUsers,
                            suffix: '人',
                            valueStyle: { color: '#1890ff', fontSize: '24px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '新增用户', size: 'small' },
                        React.createElement(Statistic, {
                            value: userAnalysis.newUsers,
                            suffix: '人',
                            valueStyle: { color: '#52c41a', fontSize: '24px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '注销用户', size: 'small' },
                        React.createElement(Statistic, {
                            value: userAnalysis.cancelledUsers,
                            suffix: '人',
                            valueStyle: { color: '#f5222d', fontSize: '24px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '日活跃用户', size: 'small' },
                        React.createElement(Statistic, {
                            value: userAnalysis.dailyActiveUsers,
                            suffix: '人',
                            valueStyle: { color: '#fa8c16', fontSize: '24px' }
                        })
                    )
                )
            ]),

            // 用户活跃度趋势图
            React.createElement(Card, { 
                key: 'activity-trend',
                title: '用户活跃度趋势图',
                style: { marginBottom: '24px' }
            }, 
                React.createElement('div', { style: { height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement('span', { style: { color: '#8c8c8c' } }, '用户活跃度趋势图 (图表组件)')
                )
            ),

            // 用户留存率分析
            React.createElement(Card, { 
                key: 'retention-analysis',
                title: '用户留存率分析'
            }, [
                React.createElement(Row, { key: 'retention-stats', gutter: [16, 16] }, [
                    React.createElement(Col, { span: 4 },
                        React.createElement('div', { style: { textAlign: 'center' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', fontSize: '12px' } }, '次日留存'),
                            React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#1890ff' } }, `${userAnalysis.retentionRate.day1}%`)
                        ])
                    ),
                    React.createElement(Col, { span: 4 },
                        React.createElement('div', { style: { textAlign: 'center' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', fontSize: '12px' } }, '3日留存'),
                            React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#52c41a' } }, `${userAnalysis.retentionRate.day3}%`)
                        ])
                    ),
                    React.createElement(Col, { span: 4 },
                        React.createElement('div', { style: { textAlign: 'center' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', fontSize: '12px' } }, '7日留存'),
                            React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#fa8c16' } }, `${userAnalysis.retentionRate.day7}%`)
                        ])
                    ),
                    React.createElement(Col, { span: 4 },
                        React.createElement('div', { style: { textAlign: 'center' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', fontSize: '12px' } }, '14日留存'),
                            React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#722ed1' } }, `${userAnalysis.retentionRate.day14}%`)
                        ])
                    ),
                    React.createElement(Col, { span: 4 },
                        React.createElement('div', { style: { textAlign: 'center' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', fontSize: '12px' } }, '30日留存'),
                            React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#f5222d' } }, `${userAnalysis.retentionRate.day30}%`)
                        ])
                    )
                ])
            ])
        ]);
    };

    // APP行为统计Tab内容
    const renderAppBehaviorStats = () => {
        const { appBehavior } = dashboardData;
        
        return React.createElement('div', {}, [
            // APP使用统计
            React.createElement(Row, { key: 'app-stats', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '总启动次数', size: 'small' },
                        React.createElement(Statistic, {
                            value: appBehavior.totalLaunches,
                            suffix: '次',
                            valueStyle: { color: '#1890ff', fontSize: '20px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '人均启动次数', size: 'small' },
                        React.createElement(Statistic, {
                            value: appBehavior.avgLaunchesPerUser,
                            suffix: '次',
                            precision: 1,
                            valueStyle: { color: '#52c41a', fontSize: '20px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '总使用时长', size: 'small' },
                        React.createElement(Statistic, {
                            value: appBehavior.totalUsageTime,
                            suffix: '小时',
                            valueStyle: { color: '#fa8c16', fontSize: '20px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { title: '人均使用时长', size: 'small' },
                        React.createElement(Statistic, {
                            value: appBehavior.avgUsageTimePerUser,
                            suffix: '分钟',
                            precision: 1,
                            valueStyle: { color: '#722ed1', fontSize: '20px' }
                        })
                    )
                )
            ]),

            // 页面访问统计
            React.createElement(Row, { key: 'page-stats', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                React.createElement(Col, { xs: 24, sm: 12 },
                    React.createElement(Card, { title: '总访问页面数', size: 'small' },
                        React.createElement(Statistic, {
                            value: appBehavior.totalPageViews,
                            suffix: '次',
                            valueStyle: { color: '#13c2c2', fontSize: '20px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12 },
                    React.createElement(Card, { title: '人均访问页面数', size: 'small' },
                        React.createElement(Statistic, {
                            value: appBehavior.avgPageViewsPerUser,
                            suffix: '次',
                            precision: 1,
                            valueStyle: { color: '#eb2f96', fontSize: '20px' }
                        })
                    )
                )
            ]),

            // 行为趋势图
            React.createElement(Card, { 
                key: 'behavior-trend',
                title: 'APP使用行为趋势'
            }, 
                React.createElement('div', { style: { height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement('span', { style: { color: '#8c8c8c' } }, 'APP使用行为趋势图 (图表组件)')
                )
            )
        ]);
    };

    // 功能使用分析Tab内容
    const renderFunctionUsageAnalysis = () => {
        const { functionUsage } = dashboardData;
        
        const coreFeatureColumns = [
            { title: '功能名称', dataIndex: 'feature', key: 'feature' },
            { title: '使用次数', dataIndex: 'usageCount', key: 'usageCount', render: (value) => value.toLocaleString() },
            { title: '使用用户数', dataIndex: 'userCount', key: 'userCount', render: (value) => value.toLocaleString() },
            { 
                title: '使用率', 
                dataIndex: 'usageRate', 
                key: 'usageRate', 
                render: (value) => (
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center' } }, [
                        React.createElement(Progress, { 
                            key: 'progress',
                            percent: value, 
                            size: 'small', 
                            style: { width: '60px', marginRight: '8px' } 
                        }),
                        React.createElement('span', { key: 'text' }, `${value}%`)
                    ])
                )
            },
            { title: '平均停留时长', dataIndex: 'avgStayTime', key: 'avgStayTime', render: (value) => `${value}分钟` }
        ];

        const pageStayColumns = [
            { title: '页面名称', dataIndex: 'page', key: 'page' },
            { title: '平均停留时长', dataIndex: 'avgStayTime', key: 'avgStayTime', render: (value) => `${value}秒` },
            { 
                title: '跳出率', 
                dataIndex: 'bounceRate', 
                key: 'bounceRate', 
                render: (value) => (
                    React.createElement(Tag, { 
                        color: value > 40 ? 'red' : value > 30 ? 'orange' : 'green' 
                    }, `${value}%`)
                )
            }
        ];
        
        return React.createElement('div', {}, [
            React.createElement(Card, { 
                key: 'core-features',
                title: '核心功能使用率统计',
                style: { marginBottom: '24px' }
            }, 
                React.createElement(Table, {
                    columns: coreFeatureColumns,
                    dataSource: functionUsage.coreFeatures,
                    rowKey: 'feature',
                    pagination: false,
                    size: 'small'
                })
            ),

            React.createElement(Card, { 
                key: 'page-stay',
                title: '页面停留时长统计'
            }, 
                React.createElement(Table, {
                    columns: pageStayColumns,
                    dataSource: functionUsage.pageStayTime,
                    rowKey: 'page',
                    pagination: false,
                    size: 'small'
                })
            )
        ]);
    };

    // 异常情况统计Tab内容
    const renderExceptionStats = () => {
        const { exceptionStats } = dashboardData;
        
        return React.createElement('div', {}, [
            // 页面崩溃统计
            React.createElement(Row, { key: 'crash-stats', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                React.createElement(Col, { xs: 24, sm: 8 },
                    React.createElement(Card, { title: '总崩溃次数', size: 'small' },
                        React.createElement(Statistic, {
                            value: exceptionStats.crashData.totalCrashes,
                            suffix: '次',
                            valueStyle: { color: '#f5222d', fontSize: '20px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 8 },
                    React.createElement(Card, { title: '受影响用户数', size: 'small' },
                        React.createElement(Statistic, {
                            value: exceptionStats.crashData.affectedUsers,
                            suffix: '人',
                            valueStyle: { color: '#fa8c16', fontSize: '20px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 8 },
                    React.createElement(Card, { title: '崩溃率', size: 'small' },
                        React.createElement(Statistic, {
                            value: exceptionStats.crashData.crashRate,
                            suffix: '%',
                            precision: 2,
                            valueStyle: { color: '#722ed1', fontSize: '20px' }
                        })
                    )
                )
            ]),

            // 性能监控
            React.createElement(Card, { 
                key: 'performance-monitor',
                title: '性能监控指标',
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Row, { key: 'performance-metrics', gutter: [16, 16] }, [
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '首页加载时间'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold' } }, `${exceptionStats.performanceMonitor.homePageLoad.avgTime}s`),
                            React.createElement(Tag, { 
                                key: 'status',
                                color: exceptionStats.performanceMonitor.homePageLoad.status === 'excellent' ? 'green' : 'blue',
                                style: { marginTop: '8px' }
                            }, exceptionStats.performanceMonitor.homePageLoad.status === 'excellent' ? '优秀' : '良好')
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '视频加载时间'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold' } }, `${exceptionStats.performanceMonitor.videoLoad.avgTime}s`),
                            React.createElement(Tag, { 
                                key: 'status',
                                color: 'blue',
                                style: { marginTop: '8px' }
                            }, '良好')
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '图文加载时间'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold' } }, `${exceptionStats.performanceMonitor.imageTextLoad.avgTime}s`),
                            React.createElement(Tag, { 
                                key: 'status',
                                color: 'green',
                                style: { marginTop: '8px' }
                            }, '优秀')
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, 'API响应时间'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold' } }, `${exceptionStats.performanceMonitor.apiResponse.avgTime}ms`),
                            React.createElement(Tag, { 
                                key: 'status',
                                color: 'blue',
                                style: { marginTop: '8px' }
                            }, '良好')
                        ])
                    )
                ])
            ]),

            // 崩溃趋势图
            React.createElement(Card, { 
                key: 'crash-trend',
                title: '页面崩溃趋势图'
            }, 
                React.createElement('div', { style: { height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement('span', { style: { color: '#8c8c8c' } }, '页面崩溃趋势图 (图表组件)')
                )
            )
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
                }, '运营数据统计'),
                React.createElement('p', { 
                    key: 'desc',
                    style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                }, '提供多维度的平台运营数据分析报表，支持自定义报表和导出')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(RangePicker, {
                    key: 'date-picker',
                    value: dateRange,
                    onChange: setDateRange,
                    style: { marginRight: '8px' }
                }),
                React.createElement(Button, {
                    key: 'export-btn',
                    type: 'primary',
                    icon: React.createElement('span', {}, '📊'),
                    onClick: () => setExportModalVisible(true)
                }, '导出数据')
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        renderCoreMetrics(),
        React.createElement(Card, { key: 'main-content' },
            React.createElement(Tabs, {
                activeKey: activeTab,
                onChange: setActiveTab,
                type: 'card'
            }, [
                React.createElement(TabPane, {
                    key: 'user-analysis',
                    tab: '用户分析'
                }, renderUserAnalysis()),
                
                React.createElement(TabPane, {
                    key: 'app-behavior-stats', 
                    tab: '用户使用APP行为统计'
                }, renderAppBehaviorStats()),
                
                React.createElement(TabPane, {
                    key: 'function-usage-analysis',
                    tab: '功能使用分析'
                }, renderFunctionUsageAnalysis()),
                
                React.createElement(TabPane, {
                    key: 'exception-stats',
                    tab: '异常情况统计'
                }, renderExceptionStats())
            ])
        )
    ]);
};

// 确保组件被正确导出
window.OperationalDataStats = OperationalDataStats; 