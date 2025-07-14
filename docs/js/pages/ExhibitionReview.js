// 展览审核组件
const ExhibitionReview = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [applications, setApplications] = React.useState([]);
    const [reviewModalVisible, setReviewModalVisible] = React.useState(false);
    const [currentApplication, setCurrentApplication] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟展览申请数据
    const mockApplications = [
        {
            id: 1,
            title: '2024智能轨道交通展',
            applicant: '中国城轨协会',
            type: 'technology',
            status: 'pending',
            submitDate: '2024-01-15',
            startDate: '2024-06-01',
            endDate: '2024-06-03',
            venue: '北京国际会议中心',
            expectedExhibitors: 200,
            expectedVisitors: 10000,
            description: '展示最新的智能轨道交通技术和产品'
        },
        {
            id: 2,
            title: '新能源轨道交通博览会',
            applicant: '绿色交通联盟',
            type: 'energy',
            status: 'approved',
            submitDate: '2024-01-10',
            startDate: '2024-05-15',
            endDate: '2024-05-17',
            venue: '上海世博中心',
            expectedExhibitors: 150,
            expectedVisitors: 8000,
            description: '聚焦新能源在轨道交通中的应用',
            reviewDate: '2024-01-20',
            reviewer: '审核员A'
        },
        {
            id: 3,
            title: '城市轨道安全论坛',
            applicant: '安全技术研究院',
            type: 'safety',
            status: 'rejected',
            submitDate: '2024-01-08',
            startDate: '2024-04-20',
            endDate: '2024-04-21',
            venue: '深圳会展中心',
            expectedExhibitors: 80,
            expectedVisitors: 3000,
            description: '讨论轨道交通安全技术发展',
            reviewDate: '2024-01-18',
            reviewer: '审核员B',
            rejectReason: '申请材料不完整'
        }
    ];
    
    React.useEffect(() => {
        loadApplications();
    }, []);
    
    const loadApplications = () => {
        setLoading(true);
        setTimeout(() => {
            setApplications(mockApplications);
            setLoading(false);
        }, 1000);
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
    
    const getTypeTag = (type) => {
        const typeMap = {
            'technology': { color: 'blue', text: '技术展' },
            'energy': { color: 'green', text: '新能源展' },
            'safety': { color: 'orange', text: '安全论坛' },
            'equipment': { color: 'purple', text: '设备展' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '展览名称',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: '申请方',
            dataIndex: 'applicant',
            key: 'applicant'
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '申请日期',
            dataIndex: 'submitDate',
            key: 'submitDate'
        },
        {
            title: '展期',
            key: 'period',
            render: (_, record) => `${record.startDate} ~ ${record.endDate}`
        },
        {
            title: '预计展商',
            dataIndex: 'expectedExhibitors',
            key: 'expectedExhibitors'
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => viewDetail(record)
                }, '查看'),
                record.status === 'pending' && React.createElement(Button, {
                    key: 'review',
                    type: 'link',
                    size: 'small',
                    onClick: () => reviewApplication(record)
                }, '审核')
            ])
        }
    ];
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.title} - 详细信息`,
            width: 700,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'applicant' }, React.createElement('strong', {}, '申请方：'), record.applicant),
                React.createElement('p', { key: 'venue' }, React.createElement('strong', {}, '展览地点：'), record.venue),
                React.createElement('p', { key: 'period' }, React.createElement('strong', {}, '展览时间：'), `${record.startDate} ~ ${record.endDate}`),
                React.createElement('p', { key: 'exhibitors' }, React.createElement('strong', {}, '预计展商：'), `${record.expectedExhibitors}家`),
                React.createElement('p', { key: 'visitors' }, React.createElement('strong', {}, '预计观众：'), `${record.expectedVisitors}人`),
                React.createElement('p', { key: 'description' }, React.createElement('strong', {}, '展览描述：'), record.description),
                record.reviewDate && React.createElement('p', { key: 'review' }, React.createElement('strong', {}, '审核时间：'), record.reviewDate),
                record.reviewer && React.createElement('p', { key: 'reviewer' }, React.createElement('strong', {}, '审核员：'), record.reviewer),
                record.rejectReason && React.createElement('p', { key: 'reason' }, React.createElement('strong', {}, '拒绝原因：'), record.rejectReason)
            ])
        });
    };
    
    const reviewApplication = (record) => {
        setCurrentApplication(record);
        form.resetFields();
        setReviewModalVisible(true);
    };
    
    const handleReview = (values) => {
        console.log('审核结果:', { ...values, applicationId: currentApplication.id });
        message.success('审核完成');
        setReviewModalVisible(false);
        form.resetFields();
        loadApplications();
    };
    
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(a => a.status === 'pending').length;
    const approvedApplications = applications.filter(a => a.status === 'approved').length;
    const rejectedApplications = applications.filter(a => a.status === 'rejected').length;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '展览审核'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '审核展览申请和管理审核流程')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总申请数',
                        value: totalApplications
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: pendingApplications,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'approved', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已通过',
                        value: approvedApplications,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'rejected', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已拒绝',
                        value: rejectedApplications,
                        valueStyle: { color: '#f5222d' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'actions',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadApplications
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                React.createElement(Option, { key: 'approved', value: 'approved' }, '已通过'),
                React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝')
            ]),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'technology', value: 'technology' }, '技术展'),
                React.createElement(Option, { key: 'energy', value: 'energy' }, '新能源展'),
                React.createElement(Option, { key: 'safety', value: 'safety' }, '安全论坛'),
                React.createElement(Option, { key: 'equipment', value: 'equipment' }, '设备展')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: applications,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'review-modal',
            title: `审核申请 - ${currentApplication?.title}`,
            visible: reviewModalVisible,
            onCancel: () => setReviewModalVisible(false),
            footer: null,
            width: 600
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleReview
        }, [
            React.createElement(Form.Item, {
                key: 'result',
                name: 'result',
                label: '审核结果',
                rules: [{ required: true, message: '请选择审核结果' }]
            }, React.createElement(Select, {
                placeholder: '请选择审核结果'
            }, [
                React.createElement(Option, { key: 'approved', value: 'approved' }, '通过'),
                React.createElement(Option, { key: 'rejected', value: 'rejected' }, '拒绝')
            ])),
            
            React.createElement(Form.Item, {
                key: 'comment',
                name: 'comment',
                label: '审核意见',
                rules: [{ required: true, message: '请输入审核意见' }]
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请输入审核意见'
            })),
            
            React.createElement(Form.Item, {
                key: 'submit',
                style: { marginBottom: 0, marginTop: 24 }
            }, React.createElement(Space, {
                style: { width: '100%', justifyContent: 'flex-end' }
            }, [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setReviewModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'confirm',
                    type: 'primary',
                    htmlType: 'submit'
                }, '提交审核')
            ]))
        ]))
    ]);
};

window.ExhibitionReview = ExhibitionReview; 