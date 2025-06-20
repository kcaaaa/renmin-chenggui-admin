// 首页页面
const Dashboard = () => {
    const { Row, Col, Card, Statistic, Button, Space, Alert, Progress, Tooltip } = antd;
    const [stats, setStats] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [alerts, setAlerts] = React.useState([]);

    React.useEffect(() => {
        // 模拟数据加载
        const loadData = () => {
            setLoading(true);
            setTimeout(() => {
                setStats(MockData.getDashboardStats());
                setAlerts([
                    {
                        type: 'warning',
                        message: '审核队列积压',
                        description: '当前待审核内容超过1000条，建议及时处理',
                        time: '5分钟前'
                    },
                    {
                        type: 'error',
                        message: 'AI服务异常',
                        description: '图像识别服务响应异常，已切换至备用服务',
                        time: '10分钟前'
                    }
                ]);
                setLoading(false);
            }, 1000);
        };

        loadData();
        // 定时刷新数据
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);

    // 统计卡片配置
    const statCards = [
        {
            key: 'pendingReview',
            title: '待审核内容',
            value: stats.pendingReview?.value || 0,
            change: stats.pendingReview?.change || '0%',
            trend: stats.pendingReview?.trend || 'stable',
            icon: '🔍',
            color: '#f59e42'
        },
        {
            key: 'activeUsers',
            title: '活跃用户',
            value: stats.activeUsers?.value || 0,
            change: stats.activeUsers?.change || '0%',
            trend: stats.activeUsers?.trend || 'stable',
            icon: '👥',
            color: '#22c55e'
        },
        {
            key: 'violationRate',
            title: '违规率',
            value: `${stats.violationRate?.value || 0}%`,
            change: stats.violationRate?.change || '0%',
            trend: stats.violationRate?.trend || 'stable',
            icon: '⚠️',
            color: '#ef4444'
        },
        {
            key: 'alarmCount',
            title: '报警数量',
            value: stats.alarmCount?.value || 0,
            change: stats.alarmCount?.change || '0',
            trend: stats.alarmCount?.trend || 'stable',
            icon: '🚨',
            color: '#ef4444'
        },
        {
            key: 'contentPublished',
            title: '内容发布',
            value: stats.contentPublished?.value || 0,
            change: stats.contentPublished?.change || '0%',
            trend: stats.contentPublished?.trend || 'stable',
            icon: '📝',
            color: '#2563eb'
        },
        {
            key: 'exhibitionData',
            title: '展会数据',
            value: stats.exhibitionData?.value || 0,
            change: stats.exhibitionData?.change || '0',
            trend: stats.exhibitionData?.trend || 'stable',
            icon: '🏢',
            color: '#8b5cf6'
        },
        {
            key: 'liveCount',
            title: '今日直播',
            value: stats.liveCount?.value || 0,
            change: stats.liveCount?.change || '0%',
            trend: stats.liveCount?.trend || 'stable',
            icon: '🎥',
            color: '#f59e42'
        },
        {
            key: 'liveUsers',
            title: '今日观看人数',
            value: stats.liveUsers?.value || 0,
            change: stats.liveUsers?.change || '0',
            trend: stats.liveUsers?.trend || 'stable',
            icon: '👥',
            color: '#22c55e'
        },
        {
            key: 'activeLiveCount',
            title: '进行中直播',
            value: stats.activeLiveCount?.value || 0,
            change: stats.activeLiveCount?.change || '0',
            trend: stats.activeLiveCount?.trend || 'stable',
            icon: '🎥',
            color: '#f59e42'
        },
        {
            key: 'activeLiveUsers',
            title: '进行中观看人数',
            value: stats.activeLiveUsers?.value || 0,
            change: stats.activeLiveUsers?.change || '0',
            trend: stats.activeLiveUsers?.trend || 'stable',
            icon: '👥',
            color: '#22c55e'
        }
    ];

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            default: return '➡️';
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return '#22c55e';
            case 'down': return '#ef4444';
            default: return '#64748b';
        }
    };

    const renderStatCard = (card) => {
        return React.createElement(Col, {
            key: card.key,
            xs: 24,
            sm: 12,
            md: 8,
            lg: 8,
            xl: 4
        }, React.createElement(Card, {
            className: 'dashboard-card',
            hoverable: true,
            loading: loading,
            style: { height: '140px' },
            bodyStyle: { padding: '20px' }
        }, [
            React.createElement('div', {
                key: 'content',
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }
            }, [
                React.createElement('div', {
                    key: 'info',
                    style: { flex: 1 }
                }, [
                    React.createElement('div', {
                        key: 'title',
                        style: {
                            fontSize: '14px',
                            color: '#64748b',
                            marginBottom: '8px'
                        }
                    }, card.title),
                    React.createElement(Statistic, {
                        key: 'value',
                        value: card.value,
                        valueStyle: {
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: card.color
                        }
                    }),
                    React.createElement('div', {
                        key: 'change',
                        style: {
                            marginTop: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            color: getTrendColor(card.trend)
                        }
                    }, [
                        React.createElement('span', {
                            key: 'icon',
                            style: { marginRight: '4px' }
                        }, getTrendIcon(card.trend)),
                        React.createElement('span', {
                            key: 'text'
                        }, card.change)
                    ])
                ]),
                React.createElement('div', {
                    key: 'icon',
                    style: {
                        fontSize: '32px',
                        opacity: 0.6
                    }
                }, card.icon)
            ])
        ]));
    };

    return React.createElement('div', {
        style: { padding: '0' }
    }, [
        // 页面标题和快捷操作
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
                style: {
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e293b'
                }
            }, '首页'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Tooltip, {
                    key: 'refresh',
                    title: '刷新数据'
                }, React.createElement(Button, {
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: () => window.location.reload()
                }, '刷新')),
                React.createElement(Tooltip, {
                    key: 'export',
                    title: '导出报表'
                }, React.createElement(Button, {
                    type: 'primary',
                    icon: React.createElement('span', {}, '📊')
                }, '导出报表')),
                React.createElement(Tooltip, {
                    key: 'settings',
                    title: '首页设置'
                }, React.createElement(Button, {
                    icon: React.createElement('span', {}, '⚙️')
                }, '设置'))
            ])
        ]),

        // 报警通知区域
        alerts.length > 0 && React.createElement('div', {
            key: 'alerts',
            style: { marginBottom: '24px' }
        }, alerts.map((alert, index) => 
            React.createElement(Alert, {
                key: `alert-${index}`,
                type: alert.type,
                message: alert.message,
                description: alert.description,
                showIcon: true,
                closable: true,
                style: { marginBottom: '8px' },
                action: React.createElement(Button, {
                    size: 'small',
                    type: 'text'
                }, '处理')
            })
        )),

        // 统计卡片
        React.createElement(Row, {
            key: 'stats',
            gutter: [16, 16],
            style: { marginBottom: '24px' }
        }, statCards.map(renderStatCard)),

        // 图表和详细信息区域
        React.createElement(Row, {
            key: 'charts',
            gutter: [16, 16]
        }, [
            // 趋势图表
            React.createElement(Col, {
                key: 'trend',
                xs: 24,
                lg: 16
            }, React.createElement(Card, {
                title: '用户活跃趋势',
                className: 'dashboard-card',
                extra: React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'week',
                        size: 'small',
                        type: 'primary'
                    }, '7天'),
                    React.createElement(Button, {
                        key: 'month',
                        size: 'small'
                    }, '30天')
                ])
            }, React.createElement('div', {
                style: {
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f8fafc',
                    borderRadius: '4px'
                }
            }, React.createElement('div', {
                style: { textAlign: 'center', color: '#64748b' }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { fontSize: '48px', marginBottom: '16px' }
                }, '📈'),
                React.createElement('div', {
                    key: 'text'
                }, '趋势图表区域')
            ])))),

            // 快捷操作面板
            React.createElement(Col, {
                key: 'actions',
                xs: 24,
                lg: 8
            }, React.createElement(Card, {
                title: '快捷操作',
                className: 'dashboard-card'
            }, React.createElement(Space, {
                direction: 'vertical',
                style: { width: '100%' },
                size: 'middle'
            }, [
                React.createElement(Button, {
                    key: 'batch-review',
                    type: 'primary',
                    block: true,
                    size: 'large',
                    icon: React.createElement('span', {}, '🔍')
                }, '批量审核'),
                React.createElement(Button, {
                    key: 'user-export',
                    block: true,
                    size: 'large',
                    icon: React.createElement('span', {}, '👥')
                }, '用户数据导出'),
                React.createElement(Button, {
                    key: 'backup',
                    block: true,
                    size: 'large',
                    icon: React.createElement('span', {}, '💾')
                }, '数据备份'),
                React.createElement('div', {
                    key: 'system-status',
                    style: {
                        padding: '16px',
                        background: '#f8fafc',
                        borderRadius: '6px',
                        marginTop: '16px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'title',
                        style: {
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: '#1e293b'
                        }
                    }, '系统状态'),
                    React.createElement('div', {
                        key: 'cpu',
                        style: { marginBottom: '8px' }
                    }, [
                        React.createElement('span', {
                            key: 'label',
                            style: { fontSize: '12px', color: '#64748b' }
                        }, 'CPU使用率'),
                        React.createElement(Progress, {
                            key: 'progress',
                            percent: 65,
                            size: 'small',
                            status: 'active'
                        })
                    ]),
                    React.createElement('div', {
                        key: 'memory',
                        style: { marginBottom: '8px' }
                    }, [
                        React.createElement('span', {
                            key: 'label',
                            style: { fontSize: '12px', color: '#64748b' }
                        }, '内存使用率'),
                        React.createElement(Progress, {
                            key: 'progress',
                            percent: 78,
                            size: 'small',
                            status: 'active'
                        })
                    ])
                ])
            ])))
        ])
    ]);
};

window.Dashboard = Dashboard; 