// 作品数据统计页面
const ContentStats = () => {
    const { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Switch, message, Row, Col, Statistic, DatePicker, Tabs, Progress } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;

    const [loading, setLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [timeRange, setTimeRange] = React.useState('7days');

    // 模拟统计数据
    const overviewStats = {
        totalViews: 1250000,
        totalLikes: 89000,
        totalComments: 24500,
        totalShares: 12300,
        totalRecommends: 45600,
        totalContent: 5680,
        avgViewsPerContent: 220,
        avgLikesPerContent: 16,
        avgCommentsPerContent: 4,
        avgSharesPerContent: 2
    };

    const topContentData = [
        {
            id: 1,
            title: '城市轨道交通建设最新进展',
            type: 'video',
            author: '张工程师',
            publishTime: '2024-01-15',
            views: 25000,
            likes: 1200,
            comments: 180,
            shares: 95,
            recommends: 850,
            completionRate: 85.5,
            avgWatchTime: '3分45秒'
        },
        {
            id: 2,
            title: '轨道交通技术创新分享',
            type: 'image',
            author: '李专家',
            publishTime: '2024-01-14',
            views: 18600,
            likes: 890,
            comments: 65,
            shares: 42,
            recommends: 520,
            completionRate: 92.3,
            avgWatchTime: '-'
        },
        {
            id: 3,
            title: '地铁安全运营管理要点',
            type: 'video',
            author: '王主管',
            publishTime: '2024-01-13',
            views: 15200,
            likes: 650,
            comments: 120,
            shares: 38,
            recommends: 420,
            completionRate: 78.2,
            avgWatchTime: '5分12秒'
        }
    ];

    const trendData = [
        { date: '01-10', views: 8500, likes: 650, comments: 120, shares: 45 },
        { date: '01-11', views: 9200, likes: 720, comments: 135, shares: 52 },
        { date: '01-12', views: 10800, likes: 840, comments: 160, shares: 68 },
        { date: '01-13', views: 12500, likes: 950, comments: 180, shares: 75 },
        { date: '01-14', views: 11800, likes: 890, comments: 165, shares: 70 },
        { date: '01-15', views: 13200, likes: 1020, comments: 195, shares: 82 },
        { date: '01-16', views: 14500, likes: 1150, comments: 210, shares: 90 }
    ];

    const categoryStats = [
        { category: '技术分享', count: 1250, views: 280000, likes: 18500, percentage: 22.5 },
        { category: '政策解读', count: 980, views: 210000, likes: 14200, percentage: 17.3 },
        { category: '工程案例', count: 850, views: 195000, likes: 12800, percentage: 15.6 },
        { category: '安全管理', count: 750, views: 165000, likes: 11200, percentage: 13.2 },
        { category: '运营维护', count: 680, views: 145000, likes: 9800, percentage: 11.6 },
        { category: '其他', count: 2170, views: 255000, likes: 22500, percentage: 19.8 }
    ];

    React.useEffect(() => {
        loadData();
    }, [timeRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log('数据加载完成');
        } catch (error) {
            message.error('数据加载失败');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        message.success('数据导出已开始，请稍候下载');
    };

    const renderOverviewStats = () => {
        return React.createElement(Row, { gutter: [16, 16] }, [
            React.createElement(Col, { key: 'views', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总浏览量',
                        value: overviewStats.totalViews,
                        precision: 0,
                        prefix: '👁️',
                        suffix: '次'
                    })
                )
            ),
            React.createElement(Col, { key: 'likes', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总点赞数',
                        value: overviewStats.totalLikes,
                        precision: 0,
                        prefix: '👍',
                        suffix: '次'
                    })
                )
            ),
            React.createElement(Col, { key: 'comments', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总评论数',
                        value: overviewStats.totalComments,
                        precision: 0,
                        prefix: '💬',
                        suffix: '条'
                    })
                )
            ),
            React.createElement(Col, { key: 'shares', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总分享数',
                        value: overviewStats.totalShares,
                        precision: 0,
                        prefix: '📤',
                        suffix: '次'
                    })
                )
            ),
            React.createElement(Col, { key: 'recommends', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '推荐总数',
                        value: overviewStats.totalRecommends,
                        precision: 0,
                        prefix: '⭐',
                        suffix: '次'
                    })
                )
            ),
            React.createElement(Col, { key: 'content', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '作品总数',
                        value: overviewStats.totalContent,
                        precision: 0,
                        prefix: '📄',
                        suffix: '个'
                    })
                )
            ),
            React.createElement(Col, { key: 'avg-views', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '平均浏览量',
                        value: overviewStats.avgViewsPerContent,
                        precision: 0,
                        prefix: '📊',
                        suffix: '次/作品'
                    })
                )
            ),
            React.createElement(Col, { key: 'avg-likes', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '平均点赞数',
                        value: overviewStats.avgLikesPerContent,
                        precision: 0,
                        prefix: '💡',
                        suffix: '次/作品'
                    })
                )
            )
        ]);
    };

    const renderTopContent = () => {
        const columns = [
            {
                title: '作品信息',
                key: 'content',
                width: 300,
                render: (_, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'title',
                        style: { fontWeight: 'bold', marginBottom: 4 }
                    }, record.title),
                    React.createElement('div', {
                        key: 'meta',
                        style: { fontSize: 12, color: '#666' }
                    }, [
                        React.createElement(Tag, {
                            key: 'type',
                            color: record.type === 'video' ? 'blue' : 'green'
                        }, record.type === 'video' ? '视频' : '图文'),
                        React.createElement('span', {
                            key: 'author',
                            style: { marginLeft: 8 }
                        }, `作者：${record.author}`)
                    ])
                ])
            },
            {
                title: '浏览量',
                dataIndex: 'views',
                width: 100,
                sorter: (a, b) => a.views - b.views,
                render: (views) => views.toLocaleString()
            },
            {
                title: '点赞数',
                dataIndex: 'likes',
                width: 100,
                sorter: (a, b) => a.likes - b.likes,
                render: (likes) => likes.toLocaleString()
            },
            {
                title: '评论数',
                dataIndex: 'comments',
                width: 100,
                sorter: (a, b) => a.comments - b.comments
            },
            {
                title: '分享数',
                dataIndex: 'shares',
                width: 100,
                sorter: (a, b) => a.shares - b.shares
            },
            {
                title: '推荐数',
                dataIndex: 'recommends',
                width: 100,
                sorter: (a, b) => a.recommends - b.recommends
            },
            {
                title: '完播率',
                key: 'completion',
                width: 120,
                render: (_, record) => record.type === 'video' ? 
                    React.createElement(Progress, {
                        percent: record.completionRate,
                        size: 'small',
                        format: (percent) => `${percent}%`
                    }) : '-'
            }
        ];

        return React.createElement(Table, {
            columns: columns,
            dataSource: topContentData,
            loading: loading,
            pagination: false,
            rowKey: 'id',
            size: 'small'
        });
    };

    const renderCategoryStats = () => {
        const columns = [
            {
                title: '内容分类',
                dataIndex: 'category',
                width: 150
            },
            {
                title: '作品数量',
                dataIndex: 'count',
                width: 100,
                render: (count) => count.toLocaleString()
            },
            {
                title: '总浏览量',
                dataIndex: 'views',
                width: 120,
                render: (views) => views.toLocaleString()
            },
            {
                title: '总点赞数',
                dataIndex: 'likes',
                width: 120,
                render: (likes) => likes.toLocaleString()
            },
            {
                title: '占比',
                key: 'percentage',
                width: 150,
                render: (_, record) => React.createElement(Progress, {
                    percent: record.percentage,
                    size: 'small',
                    format: (percent) => `${percent}%`
                })
            }
        ];

        return React.createElement(Table, {
            columns: columns,
            dataSource: categoryStats,
            loading: loading,
            pagination: false,
            rowKey: 'category',
            size: 'small'
        });
    };

    return React.createElement('div', { className: 'page-fade-in' }, [
        React.createElement('div', { key: 'header', className: 'page-header' }, [
            React.createElement('h1', { key: 'title', className: 'page-title' }, '作品数据统计'),
            React.createElement('p', { key: 'desc', className: 'page-description' }, 
                '作品浏览、点赞、评论、推荐等核心数据统计分析'
            )
        ]),

        React.createElement(Card, {
            key: 'controls',
            size: 'small',
            style: { marginBottom: 16 }
        }, React.createElement(Row, { gutter: 16, align: 'middle' }, [
            React.createElement(Col, { key: 'time', span: 8 },
                React.createElement('div', {}, [
                    React.createElement('span', {
                        key: 'label',
                        style: { marginRight: 8 }
                    }, '统计周期：'),
                    React.createElement(Select, {
                        key: 'select',
                        value: timeRange,
                        onChange: setTimeRange,
                        style: { width: 120 }
                    }, [
                        React.createElement(Option, { key: '7days', value: '7days' }, '近7天'),
                        React.createElement(Option, { key: '30days', value: '30days' }, '近30天'),
                        React.createElement(Option, { key: '90days', value: '90days' }, '近3个月')
                    ])
                ])
            ),
            React.createElement(Col, { key: 'actions', span: 16 },
                React.createElement('div', { style: { textAlign: 'right' } },
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            key: 'refresh',
                            onClick: loadData
                        }, '刷新数据'),
                        React.createElement(Button, {
                            key: 'export',
                            type: 'primary',
                            onClick: handleExport
                        }, '导出报表')
                    ])
                )
            )
        ])),

        React.createElement(Tabs, {
            key: 'tabs',
            activeKey: activeTab,
            onChange: setActiveTab
        }, [
            React.createElement(TabPane, {
                key: 'overview',
                tab: '数据概览'
            }, [
                React.createElement('div', {
                    key: 'overview-content',
                    style: { marginBottom: 24 }
                }, renderOverviewStats())
            ]),

            React.createElement(TabPane, {
                key: 'top-content',
                tab: '热门作品'
            }, [
                React.createElement(Card, {
                    key: 'top-content-card',
                    title: '热门作品排行榜',
                    size: 'small'
                }, renderTopContent())
            ]),

            React.createElement(TabPane, {
                key: 'category',
                tab: '分类统计'
            }, [
                React.createElement(Card, {
                    key: 'category-card',
                    title: '内容分类数据统计',
                    size: 'small'
                }, renderCategoryStats())
            ])
        ])
    ]);
};

window.ContentStats = ContentStats; 