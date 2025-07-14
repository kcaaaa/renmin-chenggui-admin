// 报名管理页面 - 管理报名参展的展商，确认报名并分配展位
const RegistrationManagement = () => {
    const { Card, Table, Button, Modal, Form, Input, Select, Space, message, Tag, Row, Col, Statistic, Descriptions, Steps, DatePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { Step } = Steps;
    
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [boothModalVisible, setBoothModalVisible] = React.useState(false);
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [currentRegistration, setCurrentRegistration] = React.useState(null);
    const [viewingRegistration, setViewingRegistration] = React.useState(null);
    const [form] = Form.useForm();
    const [boothForm] = Form.useForm();

    // 模拟统计数据
    const [stats] = React.useState({
        totalRegistrations: 156,
        pendingReview: 23,
        confirmed: 89,
        rejected: 12,
        pendingPayment: 32
    });

    // 模拟报名数据
    const mockData = [
        {
            key: '1',
            id: 'REG001',
            companyName: '北京智慧轨道科技有限公司',
            contactPerson: '张经理',
            phone: '13800138001',
            email: 'zhang@company.com',
            registrationDate: '2024-01-15 14:30:00',
            status: 'pending_review',
            exhibitionId: 'EX001',
            exhibitionName: '2024中国城市轨道交通博览会',
            category: '智能设备',
            boothRequirement: '标准展位',
            boothSize: '3x3',
            expectedProducts: 5,
            expectedVisitors: 200,
            businessLicense: '营业执照.pdf',
            companyProfile: '专业从事城市轨道交通智能化系统研发...',
            website: 'www.smartrail.com',
            previousExperience: '参加过2023年展会',
            specialRequirements: '需要电源接入',
            paymentStatus: 'pending',
            amount: 15000
        },
        {
            key: '2',
            id: 'REG002',
            companyName: '上海轨道交通设备有限公司',
            contactPerson: '李总',
            phone: '13800138002',
            email: 'li@shrt.com',
            registrationDate: '2024-01-16 10:20:00',
            status: 'confirmed',
            exhibitionId: 'EX001',
            exhibitionName: '2024中国城市轨道交通博览会',
            category: '车辆设备',
            boothRequirement: '豪华展位',
            boothSize: '6x6',
            expectedProducts: 8,
            expectedVisitors: 500,
            businessLicense: '营业执照.pdf',
            companyProfile: '轨道交通车辆设备制造商...',
            website: 'www.shrt.com',
            previousExperience: '多次参展经验',
            specialRequirements: '需要网络接入和展示屏',
            paymentStatus: 'paid',
            amount: 35000,
            boothNumber: 'A001',
            assignedDate: '2024-01-18 09:00:00'
        },
        {
            key: '3',
            id: 'REG003',
            companyName: '深圳新能源轨道科技',
            contactPerson: '王经理',
            phone: '13800138003',
            email: 'wang@szne.com',
            registrationDate: '2024-01-17 16:45:00',
            status: 'rejected',
            exhibitionId: 'EX001',
            exhibitionName: '2024中国城市轨道交通博览会',
            category: '新能源',
            boothRequirement: '标准展位',
            boothSize: '3x3',
            expectedProducts: 3,
            expectedVisitors: 150,
            businessLicense: '营业执照.pdf',
            companyProfile: '新能源轨道交通解决方案...',
            website: 'www.szne.com',
            previousExperience: '首次参展',
            specialRequirements: '无',
            paymentStatus: 'pending',
            amount: 12000,
            rejectReason: '资质不符合要求'
        }
    ];

    // 可用展位数据
    const [availableBooths] = React.useState([
        { value: 'A001', label: 'A001 - 标准展位 (3x3)' },
        { value: 'A002', label: 'A002 - 标准展位 (3x3)' },
        { value: 'B001', label: 'B001 - 豪华展位 (6x6)' },
        { value: 'B002', label: 'B002 - 豪华展位 (6x6)' },
        { value: 'C001', label: 'C001 - 特装展位 (9x9)' },
        { value: 'C002', label: 'C002 - 特装展位 (9x9)' }
    ]);
    
    React.useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(mockData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    const handleReview = (record, action) => {
        if (action === 'approve') {
            setCurrentRegistration(record);
            boothForm.resetFields();
            setBoothModalVisible(true);
        } else if (action === 'reject') {
            Modal.confirm({
                title: '确认拒绝',
                content: '确定要拒绝这个报名申请吗？',
                onOk() {
                    message.success('已拒绝报名申请');
                    loadData();
                }
            });
        }
    };

    const handleAssignBooth = async () => {
        try {
            const values = await boothForm.validateFields();
            console.log('分配展位:', values);
            message.success('展位分配成功，报名已确认');
            setBoothModalVisible(false);
            loadData();
        } catch (error) {
            console.log('表单验证失败:', error);
        }
    };

    const handleViewDetail = (record) => {
        setViewingRegistration(record);
        setDetailModalVisible(true);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'pending_review': { color: 'orange', text: '待审核' },
            'confirmed': { color: 'green', text: '已确认' },
            'rejected': { color: 'red', text: '已拒绝' },
            'pending_payment': { color: 'blue', text: '待付款' },
            'cancelled': { color: 'default', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getPaymentStatusTag = (status) => {
        const statusMap = {
            'paid': { color: 'green', text: '已付款' },
            'pending': { color: 'orange', text: '待付款' },
            'overdue': { color: 'red', text: '逾期' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getRegistrationStep = (status) => {
        const stepMap = {
            'pending_review': 0,
            'confirmed': 2,
            'rejected': 0,
            'pending_payment': 1
        };
        return stepMap[status] || 0;
    };
    
    const columns = [
        {
            title: '报名信息',
            key: 'info',
            width: 280,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'company',
                    style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }
                }, record.companyName),
                React.createElement('div', { 
                    key: 'exhibition',
                    style: { fontSize: '12px', color: '#1890ff', marginBottom: '4px' }
                }, record.exhibitionName),
                React.createElement('div', { 
                    key: 'contact',
                    style: { fontSize: '12px', color: '#666' }
                }, `${record.contactPerson} | ${record.phone}`),
                React.createElement('div', { 
                    key: 'date',
                    style: { fontSize: '12px', color: '#666' }
                }, `报名时间: ${record.registrationDate}`)
            ])
        },
        {
            title: '展位需求',
            key: 'booth',
            width: 150,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'type',
                    style: { fontWeight: '500' }
                }, record.boothRequirement),
                React.createElement('div', { 
                    key: 'size',
                    style: { fontSize: '12px', color: '#666' }
                }, `规格: ${record.boothSize}`),
                record.boothNumber && React.createElement('div', { 
                    key: 'number',
                    style: { fontSize: '12px', color: '#1890ff', fontWeight: 'bold' }
                }, `展位: ${record.boothNumber}`)
            ])
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            width: 100,
            render: (text) => React.createElement(Tag, { color: 'blue' }, text)
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag
        },
        {
            title: '付款信息',
            key: 'payment',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'amount',
                    style: { fontWeight: 'bold' }
                }, `¥${record.amount.toLocaleString()}`),
                React.createElement('div', { 
                    key: 'status',
                    style: { marginTop: '4px' }
                }, getPaymentStatusTag(record.paymentStatus))
            ])
        },
        {
            title: '预期规模',
            key: 'scale',
            width: 120,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'products' }, `产品: ${record.expectedProducts}`),
                React.createElement('div', { key: 'visitors' }, `观众: ${record.expectedVisitors}`)
            ])
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleViewDetail(record)
                }, '详情'),
                record.status === 'pending_review' && React.createElement(Button, {
                    key: 'approve',
                    type: 'primary',
                    size: 'small',
                    onClick: () => handleReview(record, 'approve')
                }, '通过'),
                record.status === 'pending_review' && React.createElement(Button, {
                    key: 'reject',
                    danger: true,
                    size: 'small',
                    onClick: () => handleReview(record, 'reject')
                }, '拒绝'),
                record.status === 'confirmed' && React.createElement(Button, {
                    key: 'manage',
                    type: 'default',
                    size: 'small',
                    onClick: () => message.info('进入展商管理页面')
                }, '管理')
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
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总报名数',
                        value: stats.totalRegistrations,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: stats.pendingReview,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已确认',
                        value: stats.confirmed,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已拒绝',
                        value: stats.rejected,
                        valueStyle: { color: '#ff4d4f' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待付款',
                        value: stats.pendingPayment,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Button, {
                    type: 'primary',
                    onClick: loadData,
                    style: { width: '100%', height: '100%' }
                }, '刷新数据')
            )
        ]),

        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('h3', { key: 'title' }, '报名管理'),
                React.createElement(Space, { key: 'actions' }, [
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                        React.createElement(Option, { value: 'pending_review' }, '待审核'),
                        React.createElement(Option, { value: 'confirmed' }, '已确认'),
                        React.createElement(Option, { value: 'rejected' }, '已拒绝'),
                        React.createElement(Option, { value: 'pending_payment' }, '待付款')
            ]),
            React.createElement(Select, {
                        key: 'exhibition-filter',
                        placeholder: '展会筛选',
                        style: { width: 200 },
                allowClear: true
            }, [
                        React.createElement(Option, { value: 'EX001' }, '2024中国城市轨道交通博览会'),
                        React.createElement(Option, { value: 'EX002' }, '2024智慧城轨技术论坛')
                    ])
                ])
            ]),

            React.createElement('div', {
                key: 'description',
                style: { 
                    padding: '12px', 
                    background: '#fff7e6', 
                    border: '1px solid #ffd591',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }
            }, '报名管理用于审核和处理展商报名申请。审核通过后需要分配展位，展商确认并完成付款后即可进入展商详情列表。'),

            React.createElement(Table, {
                key: 'table',
                columns,
                dataSource: data,
                loading,
            pagination: {
                    pageSize: 10,
                showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
            }
            })
        ]),
        
        // 分配展位弹窗
        React.createElement(Modal, {
            key: 'booth-modal',
            title: '分配展位',
            open: boothModalVisible,
            onOk: handleAssignBooth,
            onCancel: () => setBoothModalVisible(false),
            width: 600
        }, currentRegistration && React.createElement('div', {}, [
            React.createElement(Descriptions, {
                key: 'company-info',
                title: '申请公司信息',
                bordered: true,
                column: 2,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Descriptions.Item, { label: '公司名称' }, currentRegistration.companyName),
                React.createElement(Descriptions.Item, { label: '联系人' }, currentRegistration.contactPerson),
                React.createElement(Descriptions.Item, { label: '展位需求' }, currentRegistration.boothRequirement),
                React.createElement(Descriptions.Item, { label: '规格要求' }, currentRegistration.boothSize)
            ]),

            React.createElement(Form, {
                key: 'booth-form',
                form: boothForm,
                layout: 'vertical'
            }, [
                React.createElement(Form.Item, {
                    label: '分配展位',
                    name: 'boothNumber',
                    rules: [{ required: true, message: '请选择展位' }]
                }, React.createElement(Select, {
                    placeholder: '请选择可用展位',
                    style: { width: '100%' }
                }, availableBooths.map(booth => 
                    React.createElement(Option, { 
                        key: booth.value, 
                        value: booth.value 
                    }, booth.label)
                ))),

                    React.createElement(Form.Item, {
                    label: '展位费用',
                    name: 'boothFee'
                    }, React.createElement(Input, {
                    type: 'number',
                    placeholder: '请输入展位费用',
                    addonAfter: '元'
                })),

                    React.createElement(Form.Item, {
                    label: '备注说明',
                    name: 'remarks'
                }, React.createElement(TextArea, {
                    rows: 3,
                    placeholder: '请输入备注说明'
                }))
            ])
        ])),

        // 报名详情弹窗
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '报名详情',
            open: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ],
            width: 800
        }, viewingRegistration && React.createElement('div', {}, [
            // 审核流程
            React.createElement('div', {
                key: 'process',
                style: { marginBottom: 24 }
            }, [
                React.createElement('h4', { 
                    key: 'title',
                    style: { marginBottom: 16 }
                }, '审核流程'),
                React.createElement(Steps, {
                    key: 'steps',
                    current: getRegistrationStep(viewingRegistration.status),
                    status: viewingRegistration.status === 'rejected' ? 'error' : 'process'
                }, [
                    React.createElement(Step, { title: '提交报名', description: '展商提交报名申请' }),
                    React.createElement(Step, { title: '审核通过', description: '运营人员审核并分配展位' }),
                    React.createElement(Step, { title: '确认参展', description: '展商确认并完成付款' })
                ])
            ]),

            // 基本信息
            React.createElement(Descriptions, {
                key: 'basic-info',
                title: '基本信息',
                bordered: true,
                column: 2,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Descriptions.Item, { label: '公司名称' }, viewingRegistration.companyName),
                React.createElement(Descriptions.Item, { label: '联系人' }, viewingRegistration.contactPerson),
                React.createElement(Descriptions.Item, { label: '联系电话' }, viewingRegistration.phone),
                React.createElement(Descriptions.Item, { label: '邮箱' }, viewingRegistration.email),
                React.createElement(Descriptions.Item, { label: '公司网址' }, viewingRegistration.website),
                React.createElement(Descriptions.Item, { label: '行业分类' }, viewingRegistration.category),
                React.createElement(Descriptions.Item, { label: '报名展会' }, viewingRegistration.exhibitionName),
                React.createElement(Descriptions.Item, { label: '报名时间' }, viewingRegistration.registrationDate),
                React.createElement(Descriptions.Item, { 
                    label: '公司简介',
                    span: 2
                }, viewingRegistration.companyProfile)
            ]),

            // 展位信息
            React.createElement(Descriptions, {
                key: 'booth-info',
                title: '展位信息',
                bordered: true,
                column: 2,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Descriptions.Item, { label: '展位类型' }, viewingRegistration.boothRequirement),
                React.createElement(Descriptions.Item, { label: '展位规格' }, viewingRegistration.boothSize),
                React.createElement(Descriptions.Item, { label: '预期产品数' }, viewingRegistration.expectedProducts),
                React.createElement(Descriptions.Item, { label: '预期观众数' }, viewingRegistration.expectedVisitors),
                viewingRegistration.boothNumber && React.createElement(Descriptions.Item, { label: '分配展位' }, viewingRegistration.boothNumber),
                viewingRegistration.assignedDate && React.createElement(Descriptions.Item, { label: '分配时间' }, viewingRegistration.assignedDate),
                React.createElement(Descriptions.Item, { 
                    label: '特殊要求',
                    span: 2
                }, viewingRegistration.specialRequirements || '无')
            ]),

            // 付款信息
            React.createElement(Descriptions, {
                key: 'payment-info',
                title: '付款信息',
                bordered: true,
                column: 2
            }, [
                React.createElement(Descriptions.Item, { label: '费用金额' }, `¥${viewingRegistration.amount.toLocaleString()}`),
                React.createElement(Descriptions.Item, { label: '付款状态' }, getPaymentStatusTag(viewingRegistration.paymentStatus)),
                React.createElement(Descriptions.Item, { label: '参展经验' }, viewingRegistration.previousExperience),
                React.createElement(Descriptions.Item, { label: '营业执照' }, viewingRegistration.businessLicense),
                viewingRegistration.rejectReason && React.createElement(Descriptions.Item, { 
                    label: '拒绝原因',
                    span: 2
                }, viewingRegistration.rejectReason)
            ])
        ]))
    ]);
};

window.RegistrationManagement = RegistrationManagement; 