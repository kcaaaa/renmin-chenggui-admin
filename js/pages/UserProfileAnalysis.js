// 用户画像分析页面
const UserProfileAnalysis = () => {
    const { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Switch, message, Row, Col, Statistic, Tabs, Progress, Slider, Checkbox, Tooltip } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { CheckboxGroup } = Checkbox;

    const [loading, setLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedSegment, setSelectedSegment] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [tagModalVisible, setTagModalVisible] = React.useState(false);
    const [form] = Form.useForm();

    // 用户画像概览数据
    const overviewStats = {
        totalUsers: 68540,
        activeUsers: 45200,
        corporateUsers: 52300,
        expertUsers: 8900,
        certifiedUsers: 38600,
        newUsers: 2480
    };

    // 用户标签体系
    const tagSystem = [
        {
            category: '基础属性',
            tags: [
                { name: '大型企业', count: 15600, color: 'blue' },
                { name: '中型企业', count: 28400, color: 'green' },
                { name: '小型企业', count: 18500, color: 'orange' },
                { name: '研究院所', count: 3200, color: 'purple' },
                { name: '政府机构', count: 2840, color: 'red' }
            ]
        },
        {
            category: '行业分类',
            tags: [
                { name: '地铁运营', count: 22600, color: 'blue' },
                { name: '工程建设', count: 18900, color: 'green' },
                { name: '设备制造', count: 12800, color: 'orange' },
                { name: '技术咨询', count: 8500, color: 'purple' },
                { name: '投资金融', count: 5740, color: 'cyan' }
            ]
        },
        {
            category: '行为特征',
            tags: [
                { name: '高活跃用户', count: 8960, color: 'red' },
                { name: '内容创作者', count: 5240, color: 'orange' },
                { name: '技术专家', count: 12300, color: 'blue' },
                { name: '管理层', count: 15800, color: 'purple' },
                { name: '新手用户', count: 26240, color: 'green' }
            ]
        }
    ];

    // 用户分群数据
    const userSegments = [
        {
            id: 1,
            name: '核心活跃用户',
            description: '每周活跃3天以上，发布或互动内容丰富',
            count: 8960,
            percentage: 13.1,
            characteristics: ['高频使用', '内容创作', '积极互动'],
            avgSessionTime: '25分钟',
            avgWeeklyVisits: 5.2,
            conversionRate: 18.5
        },
        {
            id: 2,
            name: '技术专业用户',
            description: '关注技术内容，具有专业背景',
            count: 12300,
            percentage: 17.9,
            characteristics: ['技术导向', '深度阅读', '专业讨论'],
            avgSessionTime: '35分钟',
            avgWeeklyVisits: 3.8,
            conversionRate: 22.3
        },
        {
            id: 3,
            name: '管理决策用户',
            description: '企业管理层，关注政策和管理内容',
            count: 15800,
            percentage: 23.1,
            characteristics: ['政策关注', '管理导向', '决策参考'],
            avgSessionTime: '18分钟',
            avgWeeklyVisits: 2.5,
            conversionRate: 15.2
        },
        {
            id: 4,
            name: '新手入门用户',
            description: '新注册用户，正在熟悉平台功能',
            count: 26240,
            percentage: 38.3,
            characteristics: ['探索阶段', '基础学习', '功能熟悉'],
            avgSessionTime: '12分钟',
            avgWeeklyVisits: 1.8,
            conversionRate: 8.7
        },
        {
            id: 5,
            name: '潜水观察用户',
            description: '主要浏览内容，较少主动互动',
            count: 5240,
            percentage: 7.6,
            characteristics: ['被动浏览', '低频互动', '内容消费'],
            avgSessionTime: '8分钟',
            avgWeeklyVisits: 1.2,
            conversionRate: 4.1
        }
    ];

    // 行为分析数据
    const behaviorData = [
        { behavior: '内容浏览', avgDaily: 15.6, trend: 'up', growth: 12.5 },
        { behavior: '视频观看', avgDaily: 8.2, trend: 'up', growth: 18.3 },
        { behavior: '点赞互动', avgDaily: 3.4, trend: 'up', growth: 22.1 },
        { behavior: '评论发布', avgDaily: 1.8, trend: 'down', growth: -5.2 },
        { behavior: '内容分享', avgDaily: 2.1, trend: 'up', growth: 15.8 },
        { behavior: '搜索查询', avgDaily: 4.7, trend: 'up', growth: 8.9 }
    ];

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('用户画像数据加载完成');
        } catch (error) {
            message.error('数据加载失败');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSegment = () => {
        setModalVisible(true);
        form.resetFields();
    };

    const handleSegmentDetail = (segment) => {
        setSelectedSegment(segment);
        message.info(`查看 ${segment.name} 详细信息`);
    };

    const handleTagManagement = () => {
        setTagModalVisible(true);
    };

    const renderOverviewStats = () => {
        return React.createElement(Row, { gutter: [16, 16] }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总用户数',
                        value: overviewStats.totalUsers,
                        precision: 0,
                        prefix: '👥',
                        suffix: '人'
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '活跃用户',
                        value: overviewStats.activeUsers,
                        precision: 0,
                        prefix: '🔥',
                        suffix: '人',
                        valueStyle: { color: '#cf1322' }
                    })
                )
            ),
            React.createElement(Col, { key: 'corporate', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '企业用户',
                        value: overviewStats.corporateUsers,
                        precision: 0,
                        prefix: '🏢',
                        suffix: '家'
                    })
                )
            ),
            React.createElement(Col, { key: 'expert', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '专家用户',
                        value: overviewStats.expertUsers,
                        precision: 0,
                        prefix: '👨‍💼',
                        suffix: '人',
                        valueStyle: { color: '#1890ff' }
                    })
                )
            )
        ]);
    };

    const renderTagSystem = () => {
        return React.createElement('div', {}, tagSystem.map((category, index) => 
            React.createElement(Card, {
                key: category.category,
                title: category.category,
                size: 'small',
                style: { marginBottom: 16 },
                extra: React.createElement(Button, {
                    size: 'small',
                    onClick: handleTagManagement
                }, '管理标签')
            }, React.createElement('div', {}, category.tags.map(tag =>
                React.createElement(Tooltip, {
                    key: tag.name,
                    title: `用户数：${tag.count.toLocaleString()}`
                }, React.createElement(Tag, {
                    color: tag.color,
                    style: { margin: '4px 8px 4px 0', cursor: 'pointer' }
                }, `${tag.name} (${tag.count.toLocaleString()})`))
            )))
        ));
    };

    const renderUserSegments = () => {
        const columns = [
            {
                title: '分群名称',
                key: 'name',
                width: 200,
                render: (_, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'name',
                        style: { fontWeight: 'bold', marginBottom: 4 }
                    }, record.name),
                    React.createElement('div', {
                        key: 'desc',
                        style: { fontSize: 12, color: '#666' }
                    }, record.description)
                ])
            },
            {
                title: '用户数量',
                dataIndex: 'count',
                width: 100,
                render: (count) => count.toLocaleString()
            },
            {
                title: '占比',
                key: 'percentage',
                width: 120,
                render: (_, record) => React.createElement(Progress, {
                    percent: record.percentage,
                    size: 'small',
                    format: (percent) => `${percent}%`
                })
            },
            {
                title: '特征标签',
                key: 'characteristics',
                width: 250,
                render: (_, record) => React.createElement('div', {},
                    record.characteristics.map(char =>
                        React.createElement(Tag, {
                            key: char,
                            size: 'small',
                            style: { margin: '2px' }
                        }, char)
                    )
                )
            },
            {
                title: '平均会话时长',
                dataIndex: 'avgSessionTime',
                width: 120
            },
            {
                title: '操作',
                key: 'actions',
                width: 150,
                render: (_, record) => React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'detail',
                        size: 'small',
                        onClick: () => handleSegmentDetail(record)
                    }, '查看详情'),
                    React.createElement(Button, {
                        key: 'export',
                        size: 'small',
                        type: 'link'
                    }, '导出用户')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement('div', {
                key: 'actions',
                style: { marginBottom: 16 }
            }, React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'create',
                    type: 'primary',
                    onClick: handleCreateSegment
                }, '创建新分群'),
                React.createElement(Button, {
                    key: 'refresh',
                    onClick: loadData
                }, '刷新数据')
            ])),
            React.createElement(Table, {
                key: 'table',
                columns: columns,
                dataSource: userSegments,
                loading: loading,
                pagination: false,
                rowKey: 'id',
                size: 'small'
            })
        ]);
    };

    const renderBehaviorAnalysis = () => {
        const columns = [
            {
                title: '行为类型',
                dataIndex: 'behavior',
                width: 150
            },
            {
                title: '日均次数',
                dataIndex: 'avgDaily',
                width: 100,
                render: (value) => `${value}次`
            },
            {
                title: '趋势',
                key: 'trend',
                width: 100,
                render: (_, record) => React.createElement(Tag, {
                    color: record.trend === 'up' ? 'green' : 'red'
                }, record.trend === 'up' ? '↗ 上升' : '↘ 下降')
            },
            {
                title: '增长率',
                key: 'growth',
                width: 120,
                render: (_, record) => React.createElement('span', {
                    style: { color: record.growth > 0 ? '#52c41a' : '#ff4d4f' }
                }, `${record.growth > 0 ? '+' : ''}${record.growth}%`)
            }
        ];

        return React.createElement(Table, {
            columns: columns,
            dataSource: behaviorData,
            loading: loading,
            pagination: false,
            rowKey: 'behavior',
            size: 'small'
        });
    };

    return React.createElement('div', { className: 'page-fade-in' }, [
        React.createElement('div', { key: 'header', className: 'page-header' }, [
            React.createElement('h1', { key: 'title', className: 'page-title' }, '用户画像分析'),
            React.createElement('p', { key: 'desc', className: 'page-description' }, 
                '基于用户行为数据的智能分析与标签管理'
            )
        ]),

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
                key: 'tags',
                tab: '标签体系'
            }, [
                React.createElement('div', {
                    key: 'tags-content'
                }, renderTagSystem())
            ]),

            React.createElement(TabPane, {
                key: 'segments',
                tab: '用户分群'
            }, [
                React.createElement(Card, {
                    key: 'segments-card',
                    title: '智能用户分群',
                    size: 'small'
                }, renderUserSegments())
            ]),

            React.createElement(TabPane, {
                key: 'behavior',
                tab: '行为分析'
            }, [
                React.createElement(Card, {
                    key: 'behavior-card',
                    title: '用户行为统计',
                    size: 'small'
                }, renderBehaviorAnalysis())
            ])
        ]),

        // 创建分群模态框
        React.createElement(Modal, {
            key: 'segment-modal',
            title: '创建用户分群',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            onOk: () => {
                form.validateFields().then(values => {
                    console.log('创建分群:', values);
                    message.success('用户分群创建成功');
                    setModalVisible(false);
                    loadData();
                });
            }
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical'
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                name: 'name',
                label: '分群名称',
                rules: [{ required: true, message: '请输入分群名称' }]
            }, React.createElement(Input, { placeholder: '请输入分群名称' })),
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '分群描述'
            }, React.createElement(Input.TextArea, { 
                placeholder: '请输入分群描述',
                rows: 3
            })),
            React.createElement(Form.Item, {
                key: 'conditions',
                name: 'conditions',
                label: '筛选条件'
            }, React.createElement('div', {}, [
                React.createElement('p', { key: 'hint' }, '选择用户标签：'),
                React.createElement(CheckboxGroup, {
                    key: 'tags',
                    options: [
                        { label: '大型企业', value: 'large_corp' },
                        { label: '高活跃用户', value: 'high_active' },
                        { label: '技术专家', value: 'tech_expert' },
                        { label: '管理层', value: 'management' }
                    ]
                })
            ]))
        ])),

        // 标签管理模态框
        React.createElement(Modal, {
            key: 'tag-modal',
            title: '标签管理',
            open: tagModalVisible,
            onCancel: () => setTagModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setTagModalVisible(false)
                }, '关闭'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary',
                    onClick: () => {
                        message.success('标签配置已保存');
                        setTagModalVisible(false);
                    }
                }, '保存')
            ],
            width: 600
        }, React.createElement('div', {}, [
            React.createElement('p', { key: 'desc' }, '在这里可以创建、编辑和删除用户标签，调整标签权重等。'),
            React.createElement(Button, {
                key: 'add',
                type: 'dashed',
                style: { width: '100%', marginBottom: 16 }
            }, '+ 添加新标签')
        ]))
    ]);
};

window.UserProfileAnalysis = UserProfileAnalysis; 