// 行为统计页面 - AI训练主要数据来源
const BehaviorStats = () => {
    const { Row, Col, Card, Statistic, Button, Space, Select, DatePicker, Tabs, Table, Progress, Tag, Alert, Modal, Form, Timeline, Tooltip, Badge } = antd;
    const [activeTab, setActiveTab] = React.useState('overview');
    const [basicData, setBasicData] = React.useState({});
    const [deepData, setDeepData] = React.useState({});
    const [realtimeData, setRealtimeData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [dateRange, setDateRange] = React.useState(null);
    const [exportModalVisible, setExportModalVisible] = React.useState(false);
    const [form] = Form.useForm();

    React.useEffect(() => {
        loadBehaviorData();
        // 每30秒更新实时数据
        const interval = setInterval(loadRealtimeData, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadBehaviorData = () => {
        setLoading(true);
        setTimeout(() => {
            // 基础行为数据
            setBasicData({
                overview: {
                    totalUsers: 125648,
                    activeUsers: 89234,
                    newUsers: 2456,
                    retentionRate: 0.762,
                    dailyActiveUsers: 45623,
                    weeklyActiveUsers: 78932,
                    monthlyActiveUsers: 89234
                },
                pageViews: {
                    totalPV: 1256489,
                    totalUV: 89234,
                    avgSessionTime: '8.5分钟',
                    bounceRate: 0.234,
                    pages: [
                        { page: '推荐页', pv: 456789, uv: 34567, avgTime: '12.3分钟', bounceRate: 0.15 },
                        { page: '热门页', pv: 298765, uv: 28934, avgTime: '9.8分钟', bounceRate: 0.22 },
                        { page: '关注页', pv: 234567, uv: 23456, avgTime: '7.6分钟', bounceRate: 0.18 },
                        { page: '展会页', pv: 156789, uv: 18765, avgTime: '15.2分钟', bounceRate: 0.12 },
                        { page: '协会页', pv: 109876, uv: 12345, avgTime: '6.4分钟', bounceRate: 0.28 }
                    ]
                },
                interactions: {
                    totalLikes: 234567,
                    totalComments: 89456,
                    totalShares: 45623,
                    totalFollows: 23456,
                    totalCollects: 34567,
                    avgInteractionsPerUser: 4.2,
                    hourlyDistribution: [
                        { hour: '00:00', interactions: 1234 },
                        { hour: '08:00', interactions: 8934 },
                        { hour: '12:00', interactions: 12456 },
                        { hour: '18:00', interactions: 15623 },
                        { hour: '20:00', interactions: 18765 },
                        { hour: '22:00', interactions: 9876 }
                    ]
                },
                userPaths: [
                    { path: '推荐->详情->点赞', count: 15623, rate: 0.234 },
                    { path: '搜索->结果->关注', count: 12456, rate: 0.187 },
                    { path: '热门->分享->评论', count: 9876, rate: 0.148 },
                    { path: '展会->收藏->转发', count: 7654, rate: 0.115 }
                ]
            });

            // 深度行为数据  
            setDeepData({
                videoAnalysis: {
                    totalViews: 789456,
                    totalPlayTime: '2,345,678分钟',
                    avgPlayTime: '3.2分钟',
                    completionRate: 0.567,
                    videos: [
                        { 
                            id: 'V001', 
                            title: '城轨信号系统技术分享',
                            views: 23456,
                            playTime: '89,234分钟',
                            avgPlayTime: '3.8分钟',
                            completionRate: 0.72,
                            dropOffPoints: [
                                { time: '0:30', rate: 0.15 },
                                { time: '2:15', rate: 0.28 },
                                { time: '4:30', rate: 0.45 }
                            ],
                            heatmap: [
                                { time: '0:00-0:30', intensity: 0.95 },
                                { time: '0:30-1:00', intensity: 0.85 },
                                { time: '1:00-1:30', intensity: 0.78 },
                                { time: '1:30-2:00', intensity: 0.82 },
                                { time: '2:00-2:30', intensity: 0.72 }
                            ]
                        }
                    ]
                },
                searchAnalysis: {
                    totalSearches: 156789,
                    avgSearchesPerUser: 1.8,
                    searchSuccessRate: 0.784,
                    noResultRate: 0.156,
                    topKeywords: [
                        { keyword: '信号系统', count: 15623, clickRate: 0.78 },
                        { keyword: '车辆制造', count: 12456, clickRate: 0.82 },
                        { keyword: '运营维护', count: 9876, clickRate: 0.75 },
                        { keyword: '展会信息', count: 8765, clickRate: 0.88 },
                        { keyword: '技术标准', count: 7654, clickRate: 0.79 }
                    ],
                    noResultKeywords: [
                        { keyword: '新能源列车', count: 234 },
                        { keyword: '智能调度', count: 189 },
                        { keyword: '安全监控', count: 156 }
                    ],
                    searchTrends: [
                        { date: '2024-01-01', searches: 4567 },
                        { date: '2024-01-08', searches: 5234 },
                        { date: '2024-01-15', searches: 6789 }
                    ]
                },
                contentEngagement: {
                    contentTypes: [
                        { type: '技术分享', views: 234567, likes: 23456, shares: 3456, engagement: 0.124 },
                        { type: '行业新闻', views: 189234, likes: 18923, shares: 2345, engagement: 0.112 },
                        { type: '政策解读', views: 156789, likes: 12345, shares: 1876, engagement: 0.091 },
                        { type: '展会视频', views: 134567, likes: 15623, shares: 2234, engagement: 0.133 },
                        { type: '设备介绍', views: 123456, likes: 9876, shares: 1456, engagement: 0.093 }
                    ],
                    engagementFunnel: [
                        { stage: '观看', count: 234567, rate: 1.0 },
                        { stage: '停留30s+', count: 189234, rate: 0.807 },
                        { stage: '点赞', count: 23456, rate: 0.100 },
                        { stage: '评论', count: 8765, rate: 0.037 },
                        { stage: '分享', count: 3456, rate: 0.015 }
                    ]
                }
            });

            setLoading(false);
        }, 800);
    };

    const loadRealtimeData = () => {
        // 模拟实时数据更新
        setRealtimeData({
            onlineUsers: Math.floor(Math.random() * 1000) + 5000,
            recentActions: [
                { time: new Date().toLocaleTimeString(), action: '用户点赞了视频', user: 'user_***23' },
                { time: new Date().toLocaleTimeString(), action: '新用户注册', user: 'user_***45' }
            ],
            activePages: {
                '推荐页': Math.floor(Math.random() * 1000) + 2000,
                '热门页': Math.floor(Math.random() * 800) + 1500,
                '关注页': Math.floor(Math.random() * 600) + 1000
            }
        });
    };

    // 渲染概览数据
    const renderOverview = () => {
        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '实时行为数据监控',
                description: '当前数据每30秒自动更新，为AI模型训练提供最新的用户行为特征',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '16px' }
            }),
            React.createElement(Row, { key: 'stats', gutter: [16, 16] }, [
                React.createElement(Col, { key: 'dau', xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { className: 'dashboard-card' },
                        React.createElement(Statistic, {
                            title: '日活跃用户(DAU)',
                            value: basicData.overview?.dailyActiveUsers,
                            valueStyle: { color: '#2563eb' },
                            suffix: '人'
                        })
                    )
                ),
                React.createElement(Col, { key: 'wau', xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { className: 'dashboard-card' },
                        React.createElement(Statistic, {
                            title: '周活跃用户(WAU)',
                            value: basicData.overview?.weeklyActiveUsers,
                            valueStyle: { color: '#22c55e' },
                            suffix: '人'
                        })
                    )
                ),
                React.createElement(Col, { key: 'mau', xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { className: 'dashboard-card' },
                        React.createElement(Statistic, {
                            title: '月活跃用户(MAU)',
                            value: basicData.overview?.monthlyActiveUsers,
                            valueStyle: { color: '#8b5cf6' },
                            suffix: '人'
                        })
                    )
                ),
                React.createElement(Col, { key: 'online', xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { className: 'dashboard-card' },
                        React.createElement(Statistic, {
                            title: '实时在线',
                            value: realtimeData.onlineUsers,
                            valueStyle: { color: '#f59e42' },
                            suffix: '人'
                        })
                    )
                )
            ]),
            React.createElement(Row, { key: 'metrics', gutter: [16, 16], style: { marginTop: '16px' } }, [
                React.createElement(Col, { key: 'pv', span: 6 },
                    React.createElement(Card, { size: 'small' },
                        React.createElement(Statistic, {
                            title: '页面浏览量(PV)',
                            value: basicData.pageViews?.totalPV,
                            precision: 0
                        })
                    )
                ),
                React.createElement(Col, { key: 'uv', span: 6 },
                    React.createElement(Card, { size: 'small' },
                        React.createElement(Statistic, {
                            title: '独立访客(UV)',
                            value: basicData.pageViews?.totalUV,
                            precision: 0
                        })
                    )
                ),
                React.createElement(Col, { key: 'session', span: 6 },
                    React.createElement(Card, { size: 'small' },
                        React.createElement(Statistic, {
                            title: '平均会话时长',
                            value: basicData.pageViews?.avgSessionTime || '8.5分钟'
                        })
                    )
                ),
                React.createElement(Col, { key: 'bounce', span: 6 },
                    React.createElement(Card, { size: 'small' },
                        React.createElement(Statistic, {
                            title: '跳出率',
                            value: ((basicData.pageViews?.bounceRate || 0) * 100).toFixed(1),
                            suffix: '%'
                        })
                    )
                )
            ])
        ]);
    };

    // 渲染基础行为数据
    const renderBasicBehavior = () => {
        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '基础行为数据采集',
                description: 'APP端用户页面访问、互动记录等基础操作数据，数据采集准确率99.5%，延迟<1秒',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '16px' }
            }),
            React.createElement(Row, { key: 'basic-data', gutter: [16, 16] }, [
                // 页面访问分析
                React.createElement(Col, { key: 'pages', span: 12 },
                    React.createElement(Card, {
                        title: '页面访问分析',
                        extra: React.createElement(Button, {
                            size: 'small',
                            onClick: () => exportData('page_views')
                        }, '导出数据')
                    }, React.createElement(Table, {
                        dataSource: basicData.pageViews?.pages || [],
                        pagination: false,
                        size: 'small',
                        columns: [
                            { title: '页面', dataIndex: 'page', width: 80 },
                            { title: 'PV', dataIndex: 'pv', width: 60, render: (val) => `${(val/1000).toFixed(1)}k` },
                            { title: 'UV', dataIndex: 'uv', width: 60, render: (val) => `${(val/1000).toFixed(1)}k` },
                            { title: '平均时长', dataIndex: 'avgTime', width: 80 },
                            { title: '跳出率', dataIndex: 'bounceRate', width: 60, render: (val) => `${(val*100).toFixed(1)}%` }
                        ]
                    }))
                ),
                // 互动行为统计
                React.createElement(Col, { key: 'interactions', span: 12 },
                    React.createElement(Card, {
                        title: '用户互动统计',
                        extra: React.createElement(Button, {
                            size: 'small',
                            onClick: () => exportData('interactions')
                        }, '导出数据')
                    }, React.createElement('div', { style: { padding: '16px 0' } }, [
                        React.createElement('div', {
                            key: 'likes',
                            style: { marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }
                        }, [
                            React.createElement('span', { key: 'label' }, '点赞数'),
                            React.createElement('span', { key: 'value', style: { fontWeight: 'bold' } }, basicData.interactions?.totalLikes?.toLocaleString())
                        ]),
                        React.createElement('div', {
                            key: 'comments',
                            style: { marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }
                        }, [
                            React.createElement('span', { key: 'label' }, '评论数'),
                            React.createElement('span', { key: 'value', style: { fontWeight: 'bold' } }, basicData.interactions?.totalComments?.toLocaleString())
                        ]),
                        React.createElement('div', {
                            key: 'shares',
                            style: { marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }
                        }, [
                            React.createElement('span', { key: 'label' }, '分享数'),
                            React.createElement('span', { key: 'value', style: { fontWeight: 'bold' } }, basicData.interactions?.totalShares?.toLocaleString())
                        ]),
                        React.createElement('div', {
                            key: 'follows',
                            style: { marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }
                        }, [
                            React.createElement('span', { key: 'label' }, '关注数'),
                            React.createElement('span', { key: 'value', style: { fontWeight: 'bold' } }, basicData.interactions?.totalFollows?.toLocaleString())
                        ]),
                        React.createElement('div', {
                            key: 'avg',
                            style: { marginTop: '16px', padding: '8px', background: '#f8fafc', borderRadius: '4px' }
                        }, [
                            React.createElement('span', { key: 'label', style: { fontSize: '12px', color: '#64748b' } }, '人均互动次数'),
                            React.createElement('div', { key: 'value', style: { fontSize: '20px', fontWeight: 'bold', color: '#2563eb' } }, 
                                basicData.interactions?.avgInteractionsPerUser?.toFixed(1)
                            )
                        ])
                    ]))
                )
            ]),
            // 用户路径分析
            React.createElement(Row, { key: 'paths', gutter: [16, 16], style: { marginTop: '16px' } }, [
                React.createElement(Col, { span: 24 },
                    React.createElement(Card, {
                        title: '用户行为路径分析',
                        extra: React.createElement(Button, {
                            size: 'small',
                            onClick: () => exportData('user_paths')
                        }, '导出路径')
                    }, React.createElement(Table, {
                        dataSource: basicData.userPaths || [],
                        pagination: false,
                        size: 'small',
                        columns: [
                            { title: '行为路径', dataIndex: 'path', width: 200 },
                            { title: '用户数', dataIndex: 'count', width: 100, render: (val) => val?.toLocaleString() },
                            { title: '转化率', dataIndex: 'rate', width: 100, render: (val) => `${(val*100).toFixed(1)}%` },
                            { 
                                title: '转化程度', 
                                dataIndex: 'rate', 
                                width: 150,
                                render: (val) => React.createElement(Progress, {
                                    percent: val * 100,
                                    size: 'small',
                                    showInfo: false,
                                    strokeColor: val > 0.2 ? '#22c55e' : val > 0.15 ? '#f59e42' : '#ef4444'
                                })
                            }
                        ]
                    }))
                )
            ])
        ]);
    };

    // 添加深度行为分析功能
    const renderDeepBehaviorTab = () => {
        return React.createElement('div', { className: 'deep-behavior-container' }, [
            // 视频播放分析
            React.createElement(Card, {
                key: 'video-analysis',
                title: '🎥 视频播放行为分析',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Row, { key: 'video-stats', gutter: [16, 16] }, [
                    React.createElement(Col, { key: 'watch-time', span: 6 },
                        React.createElement(Statistic, {
                            title: '平均观看时长',
                            value: '3:42',
                            valueStyle: { color: '#1890ff' },
                            prefix: '⏰'
                        })
                    ),
                    React.createElement(Col, { key: 'completion', span: 6 },
                        React.createElement(Statistic, {
                            title: '完播率',
                            value: 68.5,
                            suffix: '%',
                            valueStyle: { color: '#52c41a' },
                            prefix: '📊'
                        })
                    ),
                    React.createElement(Col, { key: 'skip-rate', span: 6 },
                        React.createElement(Statistic, {
                            title: '跳过率',
                            value: 23.2,
                            suffix: '%',
                            valueStyle: { color: '#faad14' },
                            prefix: '⏩'
                        })
                    ),
                    React.createElement(Col, { key: 'replay', span: 6 },
                        React.createElement(Statistic, {
                            title: '重播率',
                            value: 15.8,
                            suffix: '%',
                            valueStyle: { color: '#722ed1' },
                            prefix: '🔄'
                        })
                    )
                ]),
                React.createElement('div', {
                    key: 'video-heatmap',
                    style: {
                        marginTop: '20px',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px',
                        color: 'white',
                        textAlign: 'center'
                    }
                }, [
                    React.createElement('h4', { key: 'title' }, '📈 视频热力图'),
                    React.createElement('p', { key: 'desc' }, '显示用户在视频不同时间点的观看密度和行为模式')
                ])
            ]),

            // 搜索行为分析
            React.createElement(Card, {
                key: 'search-analysis',
                title: '🔍 搜索行为分析',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Row, { key: 'search-stats', gutter: [16, 16] }, [
                    React.createElement(Col, { key: 'total-searches', span: 6 },
                        React.createElement(Statistic, {
                            title: '今日搜索次数',
                            value: 5247,
                            valueStyle: { color: '#1890ff' },
                            prefix: '🔍'
                        })
                    ),
                    React.createElement(Col, { key: 'unique-users', span: 6 },
                        React.createElement(Statistic, {
                            title: '搜索用户数',
                            value: 1834,
                            valueStyle: { color: '#52c41a' },
                            prefix: '👥'
                        })
                    ),
                    React.createElement(Col, { key: 'click-rate', span: 6 },
                        React.createElement(Statistic, {
                            title: '结果点击率',
                            value: 76.3,
                            suffix: '%',
                            valueStyle: { color: '#722ed1' },
                            prefix: '👆'
                        })
                    ),
                    React.createElement(Col, { key: 'no-results', span: 6 },
                        React.createElement(Statistic, {
                            title: '无结果搜索',
                            value: 8.7,
                            suffix: '%',
                            valueStyle: { color: '#ff4d4f' },
                            prefix: '❌'
                        })
                    )
                ]),
                
                // 热搜关键词
                React.createElement('div', {
                    key: 'hot-keywords',
                    style: { marginTop: '20px' }
                }, [
                    React.createElement('h4', { key: 'title', style: { marginBottom: '16px' } }, '🔥 热搜关键词'),
                    React.createElement('div', {
                        key: 'keywords',
                        style: { display: 'flex', flexWrap: 'wrap', gap: '8px' }
                    }, [
                        React.createElement(Tag, { key: 'k1', color: 'red' }, '城轨技术 (1247)'),
                        React.createElement(Tag, { key: 'k2', color: 'orange' }, '智能控制 (892)'),
                        React.createElement(Tag, { key: 'k3', color: 'gold' }, '安全管理 (654)'),
                        React.createElement(Tag, { key: 'k4', color: 'lime' }, '展会信息 (547)'),
                        React.createElement(Tag, { key: 'k5', color: 'green' }, '轨道建设 (423)'),
                        React.createElement(Tag, { key: 'k6', color: 'cyan' }, '行业政策 (387)'),
                        React.createElement(Tag, { key: 'k7', color: 'blue' }, '创新产品 (298)'),
                        React.createElement(Tag, { key: 'k8', color: 'geekblue' }, '技术标准 (256)')
                    ])
                ]),

                // 无结果搜索词
                React.createElement('div', {
                    key: 'no-result-keywords',
                    style: { marginTop: '20px' }
                }, [
                    React.createElement('h4', { key: 'title', style: { marginBottom: '16px' } }, '🚫 无结果搜索词'),
                    React.createElement(Table, {
                        key: 'table',
                        size: 'small',
                        pagination: false,
                        dataSource: [
                            { key: 1, keyword: '高铁货运', count: 23, suggestion: '建议添加高铁相关内容' },
                            { key: 2, keyword: '磁悬浮列车', count: 18, suggestion: '可扩展磁悬浮技术内容' },
                            { key: 3, keyword: '智能检测设备', count: 15, suggestion: '需要补充设备检测内容' },
                            { key: 4, keyword: '轨道维护机器人', count: 12, suggestion: '可增加机器人应用案例' }
                        ],
                        columns: [
                            { title: '关键词', dataIndex: 'keyword' },
                            { title: '搜索次数', dataIndex: 'count' },
                            { title: '优化建议', dataIndex: 'suggestion' }
                        ]
                    })
                ])
            ]),

            // 用户活跃时段分析
            React.createElement(Card, {
                key: 'active-time',
                title: '⏰ 用户活跃时段分析'
            }, [
                React.createElement('div', {
                    key: 'time-chart',
                    style: {
                        height: '200px',
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px'
                    }
                }, '📊 24小时活跃度分布图 (9-11点和19-21点为高峰期)')
            ])
        ]);
    };

    // 模块访问频率分析
    const renderModuleAccessTab = () => {
        const moduleData = [
            { module: '推荐', visits: 15247, avgTime: '5:23', users: 8934, growth: '+12.5%' },
            { module: '关注', visits: 8765, avgTime: '3:45', users: 5421, growth: '+8.3%' },
            { module: '热门', visits: 6543, avgTime: '4:12', users: 4567, growth: '+15.7%' },
            { module: '协会', visits: 4321, avgTime: '6:34', users: 2345, growth: '+5.2%' },
            { module: '展会', visits: 3456, avgTime: '7:45', users: 1876, growth: '+22.1%' },
            { module: 'AI助手', visits: 2789, avgTime: '2:56', users: 1654, growth: '+18.9%' }
        ];

        return React.createElement('div', { className: 'module-access-container' }, [
            React.createElement(Card, {
                key: 'module-stats',
                title: '📱 模块访问统计'
            }, [
                React.createElement(Table, {
                    key: 'table',
                    dataSource: moduleData.map((item, index) => ({ ...item, key: index })),
                    columns: [
                        {
                            title: '模块名称',
                            dataIndex: 'module',
                            render: (text) => React.createElement('div', {
                                style: { fontWeight: 'bold', color: '#1890ff' }
                            }, text)
                        },
                        {
                            title: '访问次数',
                            dataIndex: 'visits',
                            render: (value) => value.toLocaleString()
                        },
                        {
                            title: '平均停留时长',
                            dataIndex: 'avgTime'
                        },
                        {
                            title: '访问用户数',
                            dataIndex: 'users',
                            render: (value) => value.toLocaleString()
                        },
                        {
                            title: '环比增长',
                            dataIndex: 'growth',
                            render: (growth) => {
                                const isPositive = growth.startsWith('+');
                                return React.createElement(Tag, {
                                    color: isPositive ? 'green' : 'red'
                                }, growth);
                            }
                        }
                    ]
                })
            ])
        ]);
    };

    // 导出数据函数
    const exportData = (dataType) => {
        setExportModalVisible(true);
        form.setFieldsValue({ dataType: dataType });
    };

    const handleExport = () => {
        form.validateFields().then(values => {
            console.log('导出数据配置:', values);
            antd.message.loading('正在生成导出文件...', 3);
            setTimeout(() => {
                antd.message.success('行为数据导出成功！用于AI训练的数据已准备就绪');
                setExportModalVisible(false);
            }, 3000);
        });
    };

    // Tab配置
    const tabItems = [
        {
            key: 'overview',
            label: React.createElement('span', {}, ['📊 ', '数据概览']),
            children: renderOverview()
        },
        {
            key: 'basic',
            label: React.createElement('span', {}, ['📱 ', '基础行为']),
            children: renderBasicBehavior()
        },
        {
            key: 'deep',
            label: React.createElement('span', {}, ['🔍 ', '深度分析']),
            children: renderDeepBehaviorTab()
        },
        {
            key: 'module',
            label: React.createElement('span', {}, ['📱 ', '模块访问']),
            children: renderModuleAccessTab()
        },
        {
            key: 'realtime',
            label: React.createElement('span', {}, ['⚡ ', '实时监控']),
            children: React.createElement('div', {
                style: { textAlign: 'center', padding: '60px', color: '#64748b' }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { fontSize: '64px', marginBottom: '16px' }
                }, '⚡'),
                React.createElement('div', { key: 'text' }, '实时数据监控面板开发中...')
            ])
        }
    ];

    return React.createElement('div', {}, [
        // 页面标题
        React.createElement('div', {
            key: 'header',
            style: {
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('h2', {
                key: 'title',
                style: { margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }
            }, '用户行为统计'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(DatePicker.RangePicker, {
                    key: 'date',
                    value: dateRange,
                    onChange: setDateRange
                }),
                React.createElement(Button, {
                    key: 'refresh',
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: loadBehaviorData,
                    loading: loading
                }, '刷新数据'),
                React.createElement(Button, {
                    key: 'export',
                    type: 'primary',
                    icon: React.createElement('span', {}, '📤'),
                    onClick: () => setExportModalVisible(true)
                }, '导出分析报告'),
                React.createElement(Button, {
                    key: 'ai-training',
                    style: { background: '#8b5cf6', borderColor: '#8b5cf6', color: 'white' },
                    icon: React.createElement('span', {}, '🤖')
                }, 'AI训练数据')
            ])
        ]),

        // 主要内容Tab
        React.createElement(Tabs, {
            key: 'tabs',
            activeKey: activeTab,
            onChange: setActiveTab,
            items: tabItems,
            size: 'large'
        }),

        // 导出模态框
        React.createElement(Modal, {
            key: 'exportModal',
            title: '导出行为数据 - AI训练专用',
            open: exportModalVisible,
            onCancel: () => setExportModalVisible(false),
            onOk: handleExport,
            width: 600
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical'
        }, [
            React.createElement(Form.Item, {
                key: 'dataType',
                label: '数据类型',
                name: 'dataType',
                rules: [{ required: true, message: '请选择数据类型' }]
            }, React.createElement(Select, {
                placeholder: '请选择要导出的数据类型',
                options: [
                    { value: 'basic_all', label: '基础行为数据(全量)' },
                    { value: 'deep_all', label: '深度行为数据(全量)' },
                    { value: 'page_views', label: '页面访问数据' },
                    { value: 'interactions', label: '用户互动数据' },
                    { value: 'video_analysis', label: '视频播放分析' },
                    { value: 'search_analysis', label: '搜索行为分析' },
                    { value: 'ai_training', label: 'AI训练特征数据' }
                ]
            })),
            React.createElement(Form.Item, {
                key: 'format',
                label: '导出格式',
                name: 'format',
                initialValue: 'json'
            }, React.createElement(Select, {
                options: [
                    { value: 'json', label: 'JSON格式(AI训练推荐)' },
                    { value: 'csv', label: 'CSV格式' },
                    { value: 'parquet', label: 'Parquet格式(大数据)' }
                ]
            })),
            React.createElement(Form.Item, {
                key: 'features',
                label: '特征字段',
                name: 'features'
            }, React.createElement(Select, {
                mode: 'multiple',
                placeholder: '选择要导出的特征字段',
                options: [
                    { value: 'user_id', label: '用户ID' },
                    { value: 'session_data', label: '会话数据' },
                    { value: 'interaction_sequence', label: '交互序列' },
                    { value: 'content_preference', label: '内容偏好' },
                    { value: 'time_features', label: '时间特征' },
                    { value: 'behavioral_tags', label: '行为标签' }
                ]
            })),
            React.createElement(Alert, {
                key: 'warning',
                message: 'AI训练数据说明',
                description: '导出的行为数据将用于推荐算法模型训练，包含用户交互序列、内容偏好等特征，已进行脱敏处理。',
                type: 'info',
                showIcon: true
            })
        ]))
    ]);
};

window.BehaviorStats = BehaviorStats; 