// 作品审批流程页面 - 人工审核操作界面
const ReviewManagement = () => {
    const { Card, Table, Button, Select, Input, Tag, Space, message, Modal, Tabs, Row, Col, Statistic } = antd;
    const { Option } = Select;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('pending');

    // 模拟统计数据
    const [stats] = React.useState({
        pendingReview: 45,
        todayProcessed: 23,
        totalProcessed: 1256,
        averageTime: 2.5
    });

    // 模拟数据
    const mockData = [
        {
            key: '1',
            id: 'WA001',
            title: '城轨建设新技术应用探讨',
            contentType: 'article',
            author: '技术部-张工',
            submitTime: '2024-01-15 14:30:00',
                    priority: 'normal',
            status: 'pending'
        }
    ];

    React.useEffect(() => {
        setData(mockData);
    }, []);

    const getContentTypeTag = (type) => {
        const typeMap = {
            'article': { color: 'blue', text: '图文' },
            'video': { color: 'purple', text: '视频' },
            'news': { color: 'cyan', text: '资讯' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const columns = [
        {
            title: '内容信息',
            dataIndex: 'title',
                    key: 'title',
            render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'title',
                    style: { fontWeight: 'bold' }
                    }, text),
                    React.createElement('div', {
                    key: 'info',
                        style: { fontSize: '12px', color: '#666' }
                }, `ID: ${record.id} | ${record.author}`)
            ])
        },
        {
            title: '类型',
            dataIndex: 'contentType',
            key: 'contentType',
            render: getContentTypeTag
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime'
        },
        {
            title: '操作',
            key: 'action',
            render: () => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'review',
                    type: 'primary',
                    size: 'small'
                }, '审核')
            ])
        }
    ];

    return React.createElement('div', { style: { padding: '24px' } }, [
        // 统计卡片
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: stats.pendingReview,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '今日处理',
                        value: stats.todayProcessed,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总处理数',
                        value: stats.totalProcessed,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均用时',
                        value: stats.averageTime,
                        suffix: '小时',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            )
        ]),

        React.createElement(Card, { key: 'main' }, [
            React.createElement('h3', { key: 'title' }, '作品审批流程'),
        React.createElement(Tabs, {
                key: 'tabs',
            activeKey: activeTab,
                onChange: setActiveTab
            }, [
                React.createElement(TabPane, {
                    key: 'pending',
                    tab: '待我审核'
                }, 
                    React.createElement(Table, {
                        columns,
                        dataSource: data,
                        loading
                    })
                )
            ])
        ])
    ]);
};

window.ReviewManagement = ReviewManagement; 