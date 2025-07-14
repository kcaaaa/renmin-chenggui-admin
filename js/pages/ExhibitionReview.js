// 展商审批流程页面 - 展商信息、产品、活动的人工审核操作界面
const ExhibitionReview = () => {
    const { Card, Table, Button, Select, Input, Tag, Space, message, Modal, Tabs, Row, Col, Statistic, Descriptions } = antd;
    const { Option } = Select;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('exhibitor_info');
    const [reviewingItem, setReviewingItem] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    // 模拟统计数据
    const [stats] = React.useState({
        pendingExhibitor: 12,
        pendingProduct: 28,
        pendingActivity: 8,
        todayProcessed: 15
    });

    // 模拟展商信息审核数据
    const exhibitorData = [
        {
            key: '1',
            id: 'EX001',
            companyName: '北京智慧轨道科技有限公司',
            type: 'exhibitor_info',
            contactPerson: '张经理',
            phone: '13800138001',
            email: 'zhang@company.com',
            submitTime: '2024-01-15 14:30:00',
            status: 'pending',
            description: '专业从事城市轨道交通智能化系统研发，拥有多项自主知识产权...',
            website: 'www.smartrail.com',
            businessLicense: '营业执照.pdf'
        }
    ];

    // 模拟产品审核数据
    const productData = [
        {
            key: '1',
            id: 'PD001',
            productName: '智能信号控制系统',
            type: 'product',
            company: '北京智慧轨道科技有限公司',
            category: '信号设备',
            submitTime: '2024-01-15 10:20:00',
            status: 'pending',
            description: '基于AI技术的新一代智能信号控制系统，可实现自动化运行控制...',
            images: ['产品图1.jpg', '产品图2.jpg'],
            specifications: '技术规格书.pdf'
        }
    ];

    // 模拟活动审核数据
    const activityData = [
        {
            key: '1',
            id: 'AC001',
            activityName: '智慧城轨技术交流会',
            type: 'activity',
            company: '北京智慧轨道科技有限公司',
            venue: 'A展厅会议室',
            activityTime: '2024-05-16 14:00-16:00',
            submitTime: '2024-01-15 09:15:00',
            status: 'pending',
            description: '邀请行业专家分享智慧城轨最新技术发展趋势...',
            agenda: '活动议程.pdf',
            speakers: ['张教授', '李工程师']
        }
    ];
    
    React.useEffect(() => {
        loadData();
    }, [activeTab]);
    
    const loadData = () => {
        setLoading(true);
        setTimeout(() => {
            switch (activeTab) {
                case 'exhibitor_info':
                    setData(exhibitorData);
                    break;
                case 'product':
                    setData(productData);
                    break;
                case 'activity':
                    setData(activityData);
                    break;
                default:
                    setData([]);
            }
            setLoading(false);
        }, 500);
    };

    const handleReview = (record) => {
        setReviewingItem(record);
        setModalVisible(true);
    };

    const handleApprove = () => {
        message.success('审核通过');
        setModalVisible(false);
        loadData();
    };

    const handleReject = () => {
        message.success('已拒绝');
        setModalVisible(false);
        loadData();
    };

    const getTypeTag = (type) => {
        const typeMap = {
            'exhibitor_info': { color: 'blue', text: '展商信息' },
            'product': { color: 'green', text: '产品信息' },
            'activity': { color: 'orange', text: '活动信息' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'pending': { color: 'orange', text: '待审核' },
            'approved': { color: 'green', text: '已通过' },
            'rejected': { color: 'red', text: '已拒绝' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getColumns = () => {
        const baseColumns = [
            {
                title: '基本信息',
                key: 'info',
                render: (_, record) => {
                    if (record.type === 'exhibitor_info') {
                        return React.createElement('div', {}, [
                            React.createElement('div', { 
                                key: 'name',
                                style: { fontWeight: 'bold' }
                            }, record.companyName),
                            React.createElement('div', { 
                                key: 'contact',
                                style: { fontSize: '12px', color: '#666' }
                            }, `联系人: ${record.contactPerson} | ${record.phone}`)
                        ]);
                    } else if (record.type === 'product') {
                        return React.createElement('div', {}, [
                            React.createElement('div', { 
                                key: 'name',
                                style: { fontWeight: 'bold' }
                            }, record.productName),
                            React.createElement('div', { 
                                key: 'company',
                                style: { fontSize: '12px', color: '#666' }
                            }, `公司: ${record.company}`)
                        ]);
                    } else {
                        return React.createElement('div', {}, [
                            React.createElement('div', { 
                                key: 'name',
                                style: { fontWeight: 'bold' }
                            }, record.activityName),
                            React.createElement('div', { 
                                key: 'venue',
                                style: { fontSize: '12px', color: '#666' }
                            }, `地点: ${record.venue} | 时间: ${record.activityTime}`)
                        ]);
                    }
                }
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
            {
                title: '提交时间',
                dataIndex: 'submitTime',
                key: 'submitTime'
            },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '操作',
                key: 'action',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'review',
                        type: 'primary',
                        size: 'small',
                        onClick: () => handleReview(record)
                    }, '审核'),
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                        size: 'small'
                    }, '详情')
            ])
        }
    ];
    
        return baseColumns;
    };

    const renderReviewContent = () => {
        if (!reviewingItem) return null;

        if (reviewingItem.type === 'exhibitor_info') {
            return React.createElement(Descriptions, {
                title: '展商信息详情',
                bordered: true,
                column: 2
            }, [
                React.createElement(Descriptions.Item, { label: '公司名称' }, reviewingItem.companyName),
                React.createElement(Descriptions.Item, { label: '联系人' }, reviewingItem.contactPerson),
                React.createElement(Descriptions.Item, { label: '联系电话' }, reviewingItem.phone),
                React.createElement(Descriptions.Item, { label: '邮箱' }, reviewingItem.email),
                React.createElement(Descriptions.Item, { label: '公司网址' }, reviewingItem.website),
                React.createElement(Descriptions.Item, { label: '营业执照' }, reviewingItem.businessLicense),
                React.createElement(Descriptions.Item, { 
                    label: '公司介绍',
                    span: 2
                }, reviewingItem.description)
            ]);
        } else if (reviewingItem.type === 'product') {
            return React.createElement(Descriptions, {
                title: '产品信息详情',
                bordered: true,
                column: 2
            }, [
                React.createElement(Descriptions.Item, { label: '产品名称' }, reviewingItem.productName),
                React.createElement(Descriptions.Item, { label: '所属公司' }, reviewingItem.company),
                React.createElement(Descriptions.Item, { label: '产品分类' }, reviewingItem.category),
                React.createElement(Descriptions.Item, { label: '技术规格' }, reviewingItem.specifications),
                React.createElement(Descriptions.Item, { 
                    label: '产品介绍',
                    span: 2
                }, reviewingItem.description),
                React.createElement(Descriptions.Item, { 
                    label: '产品图片',
                    span: 2
                }, reviewingItem.images.join(', '))
            ]);
        } else {
            return React.createElement(Descriptions, {
                title: '活动信息详情',
                bordered: true,
                column: 2
            }, [
                React.createElement(Descriptions.Item, { label: '活动名称' }, reviewingItem.activityName),
                React.createElement(Descriptions.Item, { label: '主办公司' }, reviewingItem.company),
                React.createElement(Descriptions.Item, { label: '活动地点' }, reviewingItem.venue),
                React.createElement(Descriptions.Item, { label: '活动时间' }, reviewingItem.activityTime),
                React.createElement(Descriptions.Item, { label: '演讲嘉宾' }, reviewingItem.speakers.join(', ')),
                React.createElement(Descriptions.Item, { label: '活动议程' }, reviewingItem.agenda),
                React.createElement(Descriptions.Item, { 
                    label: '活动介绍',
                    span: 2
                }, reviewingItem.description)
            ]);
        }
    };
    
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
                        title: '待审展商',
                        value: stats.pendingExhibitor,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审产品',
                        value: stats.pendingProduct,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审活动',
                        value: stats.pendingActivity,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '今日处理',
                        value: stats.todayProcessed,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, { key: 'main' }, [
            React.createElement('h3', { key: 'title' }, '展商审批流程'),
            
            React.createElement('div', {
                key: 'description',
                style: { 
                    padding: '12px', 
                    background: '#fff7e6', 
                    border: '1px solid #ffd591',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }
            }, '展商审批流程用于审核展商信息变更、产品发布及活动报备等，确保展商信息的准确性和合规性。由会展部门人员进行审核。'),

            React.createElement(Tabs, {
                key: 'tabs',
                activeKey: activeTab,
                onChange: setActiveTab
            }, [
                React.createElement(TabPane, {
                    key: 'exhibitor_info',
                    tab: '展商信息审核'
                }, 
                    React.createElement(Table, {
                        columns: getColumns(),
                        dataSource: data,
                        loading,
                        pagination: {
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                        }
                    })
                ),
                React.createElement(TabPane, {
                    key: 'product',
                    tab: '产品信息审核'
                }, 
                    React.createElement(Table, {
                        columns: getColumns(),
                        dataSource: data,
                        loading,
                        pagination: {
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                        }
                    })
                ),
                React.createElement(TabPane, {
                    key: 'activity',
                    tab: '活动信息审核'
                }, 
                    React.createElement(Table, {
                        columns: getColumns(),
                        dataSource: data,
                        loading,
                        pagination: {
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                        }
                    })
                )
            ])
        ]),

        // 审核弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: '展商审核',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'reject',
                    danger: true,
                    onClick: handleReject
                }, '拒绝'),
                React.createElement(Button, {
                    key: 'approve',
                    type: 'primary',
                    onClick: handleApprove
                }, '通过')
            ],
            width: 800
        }, renderReviewContent())
    ]);
};

window.ExhibitionReview = ExhibitionReview; 