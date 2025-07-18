// 用户行为统计页面 - 基于文档6.2功能设计
const UserBehaviorStats = () => {
    const { Card, Tabs, Row, Col, Statistic, Button, Space, Select, DatePicker, Table, Tag, Alert, Progress, Badge, message } = antd;
    const { TabPane } = Tabs;
    const { RangePicker } = DatePicker;
    
    const [activeTab, setActiveTab] = React.useState('data-overview');
    const [loading, setLoading] = React.useState(false);
    const [dateRange, setDateRange] = React.useState(null);

    // 模拟数据
    const [behaviorData, setBehaviorData] = React.useState({
        // 数据概览
        dataOverview: {
            dailyActiveUsers: 45623,
            weeklyActiveUsers: 78932,
            monthlyActiveUsers: 89234,
            totalUsers: 156789,
            newUsers: 1234,
            cancelledUsers: 56,
            growthTrends: {
                dailyGrowth: '+5.2%',
                weeklyGrowth: '+8.7%',
                monthlyGrowth: '+12.3%'
            }
        },
        // 基础行为统计
        basicBehavior: {
            pageViews: [
                { page: '首页', visits: 234567, users: 45623, avgTime: 45.6, path: '/home' },
                { page: '作品列表', visits: 189234, users: 38912, avgTime: 78.9, path: '/content/list' },
                { page: '作品详情', visits: 145678, users: 29135, avgTime: 123.4, path: '/content/detail' },
                { page: '展会列表', visits: 123456, users: 24691, avgTime: 89.7, path: '/exhibition/list' },
                { page: '用户中心', visits: 98765, users: 19753, avgTime: 67.3, path: '/user/center' }
            ],
            interactions: [
                { action: '点赞', count: 156789, users: 34567, avgPerUser: 4.5 },
                { action: '评论', count: 89234, users: 23456, avgPerUser: 3.8 },
                { action: '分享', count: 45678, users: 15678, avgPerUser: 2.9 },
                { action: '关注', count: 23456, users: 8901, avgPerUser: 2.6 },
                { action: '收藏', count: 34567, users: 12345, avgPerUser: 2.8 }
            ],
            publishBehavior: [
                { type: '视频发布', count: 8945, users: 2345, avgPerUser: 3.8, frequency: '每周2.1次' },
                { type: '图文发布', count: 12456, users: 3456, avgPerUser: 3.6, frequency: '每周2.5次' },
                { type: '资讯发布', count: 4567, users: 1234, avgPerUser: 3.7, frequency: '每周1.8次' },
                { type: '活动发布', count: 2345, users: 678, avgPerUser: 3.5, frequency: '每月1.2次' }
            ]
        },
        // 深度行为统计
        deepBehavior: {
            videoPlayback: {
                totalPlays: 456789,
                totalDuration: 123456, // 分钟
                avgPlayDuration: 4.5, // 分钟
                completionRate: 67.2, // %
                skipRate: 23.8, // %
                replayRate: 8.9, // %
                playbackQuality: [
                    { quality: '1080P', percentage: 45.6 },
                    { quality: '720P', percentage: 32.4 },
                    { quality: '480P', percentage: 15.8 },
                    { quality: '360P', percentage: 6.2 }
                ]
            },
            searchBehavior: {
                totalSearches: 89234,
                uniqueSearchUsers: 23456,
                avgSearchesPerUser: 3.8,
                successRate: 78.9, // 有结果的搜索占比
                noResultRate: 21.1, // 无结果搜索占比
                topKeywords: [
                    { keyword: '城市轨道交通', count: 12456, percentage: 13.9 },
                    { keyword: '地铁建设', count: 9876, percentage: 11.1 },
                    { keyword: '智能交通', count: 8765, percentage: 9.8 },
                    { keyword: '展会信息', count: 7654, percentage: 8.6 },
                    { keyword: '技术创新', count: 6543, percentage: 7.3 }
                ],
                noResultKeywords: [
                    { keyword: '最新政策', count: 543 },
                    { keyword: '投资机会', count: 432 },
                    { keyword: '合作伙伴', count: 321 },
                    { keyword: '招聘信息', count: 234 }
                ]
            }
        }
    });

    React.useEffect(() => {
        loadBehaviorData();
    }, []);

    const loadBehaviorData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // 数据概览Tab内容
    const renderDataOverview = () => {
        const { dataOverview } = behaviorData;
        
        return React.createElement('div', {}, [
            // 核心用户数据卡片
            React.createElement(Row, { key: 'overview-stats', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '日活跃用户 (DAU)',
                            value: dataOverview.dailyActiveUsers,
                            suffix: '人',
                            valueStyle: { color: '#1890ff', fontSize: '24px' }
                        }),
                        React.createElement('div', { 
                            key: 'growth',
                            style: { marginTop: '8px', fontSize: '12px', color: '#52c41a' } 
                        }, `环比增长 ${dataOverview.growthTrends.dailyGrowth}`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '周活跃用户 (WAU)',
                            value: dataOverview.weeklyActiveUsers,
                            suffix: '人',
                            valueStyle: { color: '#52c41a', fontSize: '24px' }
                        }),
                        React.createElement('div', { 
                            key: 'growth',
                            style: { marginTop: '8px', fontSize: '12px', color: '#52c41a' } 
                        }, `环比增长 ${dataOverview.growthTrends.weeklyGrowth}`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '月活跃用户 (MAU)',
                            value: dataOverview.monthlyActiveUsers,
                            suffix: '人',
                            valueStyle: { color: '#fa8c16', fontSize: '24px' }
                        }),
                        React.createElement('div', { 
                            key: 'growth',
                            style: { marginTop: '8px', fontSize: '12px', color: '#52c41a' } 
                        }, `环比增长 ${dataOverview.growthTrends.monthlyGrowth}`)
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                    React.createElement(Card, { size: 'small' },
                        React.createElement(Statistic, {
                            title: '总用户数',
                            value: dataOverview.totalUsers,
                            suffix: '人',
                            valueStyle: { color: '#722ed1', fontSize: '24px' }
                        })
                    )
                )
            ]),

            // 新增与注销用户
            React.createElement(Row, { key: 'user-changes', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                React.createElement(Col, { xs: 24, sm: 12 },
                    React.createElement(Card, { title: '新增用户数', size: 'small' },
                        React.createElement(Statistic, {
                            value: dataOverview.newUsers,
                            suffix: '人',
                            valueStyle: { color: '#52c41a', fontSize: '32px' }
                        })
                    )
                ),
                React.createElement(Col, { xs: 24, sm: 12 },
                    React.createElement(Card, { title: '注销用户数', size: 'small' },
                        React.createElement(Statistic, {
                            value: dataOverview.cancelledUsers,
                            suffix: '人',
                            valueStyle: { color: '#f5222d', fontSize: '32px' }
                        })
                    )
                )
            ]),

            // 用户活跃趋势图
            React.createElement(Card, { 
                key: 'activity-chart',
                title: '用户活跃度趋势'
            }, 
                React.createElement('div', { style: { height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement('span', { style: { color: '#8c8c8c' } }, '用户活跃度趋势图 (图表组件)')
                )
            )
        ]);
    };

    // 基础行为统计Tab内容
    const renderBasicBehaviorStats = () => {
        const { basicBehavior } = behaviorData;
        
        const pageViewColumns = [
            { title: '页面名称', dataIndex: 'page', key: 'page' },
            { title: '访问次数', dataIndex: 'visits', key: 'visits', render: (value) => value.toLocaleString() },
            { title: '访问用户数', dataIndex: 'users', key: 'users', render: (value) => value.toLocaleString() },
            { title: '平均停留时间', dataIndex: 'avgTime', key: 'avgTime', render: (value) => `${value}秒` },
            { title: '访问路径', dataIndex: 'path', key: 'path', render: (value) => React.createElement(Tag, { color: 'blue' }, value) }
        ];

        const interactionColumns = [
            { title: '交互行为', dataIndex: 'action', key: 'action' },
            { title: '总次数', dataIndex: 'count', key: 'count', render: (value) => value.toLocaleString() },
            { title: '参与用户数', dataIndex: 'users', key: 'users', render: (value) => value.toLocaleString() },
            { title: '人均次数', dataIndex: 'avgPerUser', key: 'avgPerUser', render: (value) => `${value}次` }
        ];

        const publishColumns = [
            { title: '发布类型', dataIndex: 'type', key: 'type' },
            { title: '发布总数', dataIndex: 'count', key: 'count', render: (value) => value.toLocaleString() },
            { title: '发布用户数', dataIndex: 'users', key: 'users', render: (value) => value.toLocaleString() },
            { title: '人均发布数', dataIndex: 'avgPerUser', key: 'avgPerUser', render: (value) => `${value}条` },
            { title: '发布频率', dataIndex: 'frequency', key: 'frequency' }
        ];
        
        return React.createElement('div', {}, [
            // 页面浏览记录
            React.createElement(Card, { 
                key: 'page-views',
                title: '页面浏览记录',
                style: { marginBottom: '24px' }
            }, 
                React.createElement(Table, {
                    columns: pageViewColumns,
                    dataSource: basicBehavior.pageViews,
                    rowKey: 'page',
                    pagination: false,
                    size: 'small'
                })
            ),

            // 交互行为记录
            React.createElement(Card, { 
                key: 'interactions',
                title: '交互行为记录',
                style: { marginBottom: '24px' }
            }, 
                React.createElement(Table, {
                    columns: interactionColumns,
                    dataSource: basicBehavior.interactions,
                    rowKey: 'action',
                    pagination: false,
                    size: 'small'
                })
            ),

            // 发布行为记录
            React.createElement(Card, { 
                key: 'publish-behavior',
                title: '发布行为记录'
            }, 
                React.createElement(Table, {
                    columns: publishColumns,
                    dataSource: basicBehavior.publishBehavior,
                    rowKey: 'type',
                    pagination: false,
                    size: 'small'
                })
            )
        ]);
    };

    // 深度行为统计Tab内容
    const renderDeepBehaviorStats = () => {
        const { deepBehavior } = behaviorData;
        
        const keywordColumns = [
            { title: '搜索关键词', dataIndex: 'keyword', key: 'keyword' },
            { title: '搜索次数', dataIndex: 'count', key: 'count', render: (value) => value.toLocaleString() },
            { title: '占比', dataIndex: 'percentage', key: 'percentage', render: (value) => `${value}%` }
        ];

        const noResultColumns = [
            { title: '无结果关键词', dataIndex: 'keyword', key: 'keyword' },
            { title: '搜索次数', dataIndex: 'count', key: 'count', render: (value) => value.toLocaleString() }
        ];
        
        return React.createElement('div', {}, [
            // 视频播放数据
            React.createElement(Card, { 
                key: 'video-playback',
                title: '视频播放数据分析',
                style: { marginBottom: '24px' }
            }, [
                // 播放统计
                React.createElement(Row, { key: 'video-stats', gutter: [16, 16], style: { marginBottom: '16px' } }, [
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '总播放次数'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#1890ff' } }, deepBehavior.videoPlayback.totalPlays.toLocaleString())
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '平均播放时长'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#52c41a' } }, `${deepBehavior.videoPlayback.avgPlayDuration}分钟`)
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '播放完成率'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' } }, `${deepBehavior.videoPlayback.completionRate}%`)
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '跳出率'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#f5222d' } }, `${deepBehavior.videoPlayback.skipRate}%`)
                        ])
                    )
                ]),

                // 播放质量分布
                React.createElement('div', { key: 'quality-stats' }, [
                    React.createElement('h4', { key: 'title', style: { marginBottom: '16px' } }, '播放质量分布'),
                    React.createElement(Row, { key: 'quality-row', gutter: [16, 16] }, 
                        deepBehavior.videoPlayback.playbackQuality.map((item, index) => 
                            React.createElement(Col, { key: index, xs: 24, sm: 12, md: 6 },
                                React.createElement('div', { style: { textAlign: 'center', padding: '12px' } }, [
                                    React.createElement('div', { key: 'quality', style: { fontSize: '16px', fontWeight: 'bold' } }, item.quality),
                                    React.createElement('div', { key: 'percentage', style: { fontSize: '14px', color: '#8c8c8c' } }, `${item.percentage}%`),
                                    React.createElement(Progress, { 
                                        key: 'progress',
                                        percent: item.percentage, 
                                        size: 'small', 
                                        showInfo: false,
                                        style: { marginTop: '8px' }
                                    })
                                ])
                            )
                        )
                    )
                ])
            ]),

            // 搜索行为数据
            React.createElement(Card, { 
                key: 'search-behavior',
                title: '搜索行为数据分析'
            }, [
                // 搜索概况
                React.createElement(Row, { key: 'search-overview', gutter: [16, 16], style: { marginBottom: '24px' } }, [
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '总搜索次数'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#1890ff' } }, deepBehavior.searchBehavior.totalSearches.toLocaleString())
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '搜索用户数'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#52c41a' } }, deepBehavior.searchBehavior.uniqueSearchUsers.toLocaleString())
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '搜索结果成功率'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' } }, `${deepBehavior.searchBehavior.successRate}%`)
                        ])
                    ),
                    React.createElement(Col, { xs: 24, sm: 12, md: 6 },
                        React.createElement('div', { style: { textAlign: 'center', padding: '16px' } }, [
                            React.createElement('div', { key: 'title', style: { color: '#8c8c8c', marginBottom: '8px' } }, '无结果搜索率'),
                            React.createElement('div', { key: 'value', style: { fontSize: '24px', fontWeight: 'bold', color: '#f5222d' } }, `${deepBehavior.searchBehavior.noResultRate}%`)
                        ])
                    )
                ]),

                // 热门搜索关键词
                React.createElement(Row, { key: 'search-keywords', gutter: [16, 16] }, [
                    React.createElement(Col, { xs: 24, md: 12 },
                        React.createElement('div', {}, [
                            React.createElement('h4', { key: 'title', style: { marginBottom: '16px' } }, '热门搜索关键词'),
                            React.createElement(Table, {
                                key: 'table',
                                columns: keywordColumns,
                                dataSource: deepBehavior.searchBehavior.topKeywords,
                                rowKey: 'keyword',
                                pagination: false,
                                size: 'small'
                            })
                        ])
                    ),
                    React.createElement(Col, { xs: 24, md: 12 },
                        React.createElement('div', {}, [
                            React.createElement('h4', { key: 'title', style: { marginBottom: '16px' } }, '无结果搜索关键词'),
                            React.createElement(Table, {
                                key: 'table',
                                columns: noResultColumns,
                                dataSource: deepBehavior.searchBehavior.noResultKeywords,
                                rowKey: 'keyword',
                                pagination: false,
                                size: 'small'
                            })
                        ])
                    )
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
                }, '用户行为统计'),
                React.createElement('p', { 
                    key: 'desc',
                    style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                }, '深度分析用户使用行为，发现用户路径中的关键节点和潜在问题')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(RangePicker, {
                    key: 'date-picker',
                    value: dateRange,
                    onChange: setDateRange,
                    style: { marginRight: '8px' }
                }),
                React.createElement(Button, {
                    key: 'refresh-btn',
                    type: 'primary',
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: loadBehaviorData
                }, '刷新数据')
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        React.createElement(Card, { key: 'main-content' },
            React.createElement(Tabs, {
                activeKey: activeTab,
                onChange: setActiveTab,
                type: 'card'
            }, [
                React.createElement(TabPane, {
                    key: 'data-overview',
                    tab: '数据概览'
                }, renderDataOverview()),
                
                React.createElement(TabPane, {
                    key: 'basic-behavior-stats', 
                    tab: '基础行为统计'
                }, renderBasicBehaviorStats()),
                
                React.createElement(TabPane, {
                    key: 'deep-behavior-stats',
                    tab: '深度行为统计'
                }, renderDeepBehaviorStats())
            ])
        )
    ]);
};

// 确保组件被正确导出
window.UserBehaviorStats = UserBehaviorStats; 