// 展会列表页面 - 展示历年展会信息，支持查看展会详情和参展商列表
const ExhibitionList = () => {
    const { Card, Table, Button, Modal, Form, Input, DatePicker, Space, message, Tag, Tabs, Descriptions, Row, Col, Statistic, Avatar } = antd;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    const dayjs = antd.dayjs;

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [editingExhibition, setEditingExhibition] = React.useState(null);
    const [viewingExhibition, setViewingExhibition] = React.useState(null);
    const [exhibitorList, setExhibitorList] = React.useState([]);
    const [form] = Form.useForm();

    // 模拟展会数据
    const mockData = [
        {
            key: '1',
            id: 'EX001',
            name: '2024中国城市轨道交通博览会',
            location: '北京国际展览中心',
            startDate: '2024-05-15',
            endDate: '2024-05-18',
            status: 'active',
            registrationCount: 156,
            exhibitorCount: 89,
            visitorCount: 12500,
            venueArea: '50000㎡',
            boothCount: 200,
            createTime: '2024-01-10 10:00:00',
            description: '聚焦城市轨道交通行业发展，展示最新技术成果',
            organizer: '中国城市轨道交通协会',
            contactPerson: '张主任',
            contactPhone: '010-12345678',
            theme: '智慧城轨·绿色出行'
        },
        {
            key: '2',
            id: 'EX002',
            name: '2024智慧城轨技术论坛',
            location: '上海新国际博览中心',
            startDate: '2024-08-20',
            endDate: '2024-08-22',
            status: 'planning',
            registrationCount: 45,
            exhibitorCount: 23,
            visitorCount: 0,
            venueArea: '30000㎡',
            boothCount: 120,
            createTime: '2024-01-15 14:00:00',
            description: '探讨智慧城轨技术发展趋势',
            organizer: '上海轨道交通协会',
            contactPerson: '李经理',
            contactPhone: '021-87654321',
            theme: '技术创新·智能运营'
        },
        {
            key: '3',
            id: 'EX003',
            name: '2023城轨运营管理大会',
            location: '深圳会展中心',
            startDate: '2023-11-10',
            endDate: '2023-11-12',
            status: 'completed',
            registrationCount: 234,
            exhibitorCount: 123,
            visitorCount: 18600,
            venueArea: '40000㎡',
            boothCount: 180,
            createTime: '2023-08-10 09:00:00',
            description: '城轨运营管理经验交流',
            organizer: '深圳地铁集团',
            contactPerson: '王总监',
            contactPhone: '0755-12345678',
            theme: '运营提升·服务优化'
        }
    ];

    // 模拟参展商数据
    const mockExhibitors = [
        {
            key: '1',
            id: 'EXH001',
            companyName: '中国中车集团',
            logo: 'https://via.placeholder.com/50',
            contactPerson: '张总工',
            phone: '13800138001',
            email: 'zhang@crrc.com',
            boothNumber: 'A001',
            boothSize: '9x6㎡',
            category: '车辆制造',
            status: 'confirmed',
            productCount: 5,
            activityCount: 2,
            setupProgress: 100,
            paymentStatus: 'paid'
        },
        {
            key: '2',
            id: 'EXH002',
            companyName: '华为技术有限公司',
            logo: 'https://via.placeholder.com/50',
            contactPerson: '李经理',
            phone: '13800138002',
            email: 'li@huawei.com',
            boothNumber: 'B002',
            boothSize: '6x6㎡',
            category: '通信设备',
            status: 'confirmed',
            productCount: 3,
            activityCount: 1,
            setupProgress: 75,
            paymentStatus: 'paid'
        },
        {
            key: '3',
            id: 'EXH003',
            companyName: '比亚迪股份有限公司',
            logo: 'https://via.placeholder.com/50',
            contactPerson: '王经理',
            phone: '13800138003',
            email: 'wang@byd.com',
            boothNumber: 'C003',
            boothSize: '6x6㎡',
            category: '新能源',
            status: 'setup',
            productCount: 4,
            activityCount: 3,
            setupProgress: 60,
            paymentStatus: 'paid'
        }
    ];

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(mockData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingExhibition(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingExhibition(record);
        form.setFieldsValue({
            name: record.name,
            location: record.location,
            dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
            description: record.description,
            organizer: record.organizer,
            contactPerson: record.contactPerson,
            contactPhone: record.contactPhone,
            theme: record.theme,
            venueArea: record.venueArea,
            boothCount: record.boothCount
        });
        setModalVisible(true);
    };

    const handleViewDetail = (record) => {
        setViewingExhibition(record);
        setExhibitorList(mockExhibitors);
        setDetailModalVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除展会"${record.name}"吗？删除后将无法恢复。`,
            onOk() {
                message.success('删除成功');
                loadData();
            }
        });
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('提交展会数据:', values);
            message.success(editingExhibition ? '编辑成功' : '新增成功');
            setModalVisible(false);
            loadData();
        } catch (error) {
            console.log('表单验证失败:', error);
        }
    };

    const getStatusTag = (status) => {
        const statusMap = {
            'planning': { color: 'blue', text: '筹备中' },
            'active': { color: 'green', text: '进行中' },
            'completed': { color: 'default', text: '已结束' },
            'cancelled': { color: 'red', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getExhibitorStatusTag = (status) => {
        const statusMap = {
            'confirmed': { color: 'green', text: '已确认' },
            'setup': { color: 'blue', text: '搭建中' },
            'ready': { color: 'cyan', text: '准备就绪' },
            'cancelled': { color: 'red', text: '已取消' }
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

    const columns = [
        {
            title: '展会信息',
            key: 'info',
            width: 300,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'name',
                    style: { fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }
                }, record.name),
                React.createElement('div', { 
                    key: 'theme',
                    style: { color: '#1890ff', fontSize: '12px', marginBottom: '4px' }
                }, record.theme),
                React.createElement('div', { 
                    key: 'location',
                    style: { fontSize: '12px', color: '#666' }
                }, `📍 ${record.location}`),
                React.createElement('div', { 
                    key: 'date',
                    style: { fontSize: '12px', color: '#666' }
                }, `📅 ${record.startDate} 至 ${record.endDate}`)
            ])
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag
        },
        {
            title: '统计信息',
            key: 'stats',
            width: 200,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'reg' }, `📝 报名: ${record.registrationCount}`),
                React.createElement('div', { key: 'exh' }, `🏢 展商: ${record.exhibitorCount}`),
                React.createElement('div', { key: 'vis' }, `👥 观众: ${record.visitorCount || 0}`),
                React.createElement('div', { key: 'area' }, `📐 面积: ${record.venueArea}`)
            ])
        },
        {
            title: '主办方',
            key: 'organizer',
            width: 180,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'org',
                    style: { fontWeight: '500' }
                }, record.organizer),
                React.createElement('div', { 
                    key: 'contact',
                    style: { fontSize: '12px', color: '#666' }
                }, `联系人: ${record.contactPerson}`),
                React.createElement('div', { 
                    key: 'phone',
                    style: { fontSize: '12px', color: '#666' }
                }, record.contactPhone)
            ])
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150
        },
        {
            title: '操作',
            key: 'action',
            width: 280,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'primary',
                    size: 'small',
                    onClick: () => handleViewDetail(record)
                }, '查看详情'),
                React.createElement(Button, {
                    key: 'manage',
                    type: 'default',
                    size: 'small',
                    onClick: () => {
                        message.info('进入展会管理页面');
                        // 这里应该跳转到具体展会的管理页面
                    }
                }, '管理'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => handleDelete(record)
                }, '删除')
            ])
        }
    ];

    // 参展商列表表格列配置
    const exhibitorColumns = [
        {
            title: '公司信息',
            key: 'company',
            width: 250,
            render: (_, record) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center' }
            }, [
                React.createElement(Avatar, {
                    key: 'avatar',
                    src: record.logo,
                    size: 40,
                    style: { marginRight: '12px' }
                }),
                React.createElement('div', { key: 'info' }, [
                    React.createElement('div', { 
                        key: 'name',
                        style: { fontWeight: 'bold' }
                    }, record.companyName),
                    React.createElement('div', { 
                        key: 'contact',
                        style: { fontSize: '12px', color: '#666' }
                    }, `${record.contactPerson} | ${record.phone}`)
                ])
            ])
        },
        {
            title: '展位信息',
            key: 'booth',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'number',
                    style: { fontWeight: 'bold', color: '#1890ff' }
                }, record.boothNumber),
                React.createElement('div', { 
                    key: 'size',
                    style: { fontSize: '12px', color: '#666' }
                }, record.boothSize)
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
            render: getExhibitorStatusTag
        },
        {
            title: '产品/活动',
            key: 'content',
            width: 120,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'product' }, `产品: ${record.productCount}`),
                React.createElement('div', { key: 'activity' }, `活动: ${record.activityCount}`)
            ])
        },
        {
            title: '搭建进度',
            key: 'progress',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'percent',
                    style: { fontSize: '12px', marginBottom: '4px' }
                }, `${record.setupProgress}%`),
                React.createElement('div', {
                    key: 'bar',
                    style: {
                        width: '80px',
                        height: '6px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                    }
                }, React.createElement('div', {
                    style: {
                        width: `${record.setupProgress}%`,
                        height: '100%',
                        backgroundColor: record.setupProgress === 100 ? '#52c41a' : '#1890ff',
                        transition: 'width 0.3s'
                    }
                }))
            ])
        },
        {
            title: '付款状态',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            width: 100,
            render: getPaymentStatusTag
        }
    ];

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('h3', { key: 'title' }, '展会列表'),
                React.createElement(Button, {
                    key: 'add',
                    type: 'primary',
                    onClick: handleAdd
                }, '创建展会')
            ]),

            React.createElement('div', {
                key: 'description',
                style: { 
                    padding: '12px', 
                    background: '#f6ffed', 
                    border: '1px solid #b7eb8f',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }
            }, '展会管理是系统的核心功能，用于管理历届展会信息。点击"查看详情"可查看参展商列表，点击"管理"进入展会详细管理页面。'),

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

        // 创建/编辑展会弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: editingExhibition ? '编辑展会' : '创建展会',
            open: modalVisible,
            onOk: handleModalOk,
            onCancel: () => setModalVisible(false),
            width: 800
        }, React.createElement(Form, {
            form,
            layout: 'vertical'
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '展会名称',
                        name: 'name',
                        rules: [{ required: true, message: '请输入展会名称' }]
                    }, React.createElement(Input, { placeholder: '请输入展会名称' }))
                ),
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '展会主题',
                        name: 'theme',
                        rules: [{ required: true, message: '请输入展会主题' }]
                    }, React.createElement(Input, { placeholder: '请输入展会主题' }))
                )
            ]),
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '举办地点',
                        name: 'location',
                        rules: [{ required: true, message: '请输入举办地点' }]
                    }, React.createElement(Input, { placeholder: '请输入举办地点' }))
                ),
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '展会时间',
                        name: 'dateRange',
                        rules: [{ required: true, message: '请选择展会时间' }]
                    }, React.createElement(RangePicker, { style: { width: '100%' } }))
                )
            ]),
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '主办方',
                        name: 'organizer',
                        rules: [{ required: true, message: '请输入主办方' }]
                    }, React.createElement(Input, { placeholder: '请输入主办方' }))
                ),
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '联系人',
                        name: 'contactPerson',
                        rules: [{ required: true, message: '请输入联系人' }]
                    }, React.createElement(Input, { placeholder: '请输入联系人' }))
                )
            ]),
            React.createElement(Row, { key: 'row4', gutter: 16 }, [
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '联系电话',
                        name: 'contactPhone',
                        rules: [{ required: true, message: '请输入联系电话' }]
                    }, React.createElement(Input, { placeholder: '请输入联系电话' }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '展馆面积',
                        name: 'venueArea'
                    }, React.createElement(Input, { placeholder: '如：50000㎡' }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '展位数量',
                        name: 'boothCount'
                    }, React.createElement(Input, { type: 'number', placeholder: '展位总数' }))
                )
            ]),
            React.createElement(Form.Item, {
                key: 'desc',
                label: '展会描述',
                name: 'description'
            }, React.createElement(Input.TextArea, { 
                rows: 3, 
                placeholder: '请输入展会描述' 
            }))
        ])),

        // 展会详情弹窗
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '展会详情',
            open: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ],
            width: 1200
        }, viewingExhibition && React.createElement('div', {}, [
            // 展会基本信息
            React.createElement(Descriptions, {
                key: 'basic-info',
                title: '基本信息',
                bordered: true,
                column: 3,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Descriptions.Item, { label: '展会名称' }, viewingExhibition.name),
                React.createElement(Descriptions.Item, { label: '展会主题' }, viewingExhibition.theme),
                React.createElement(Descriptions.Item, { label: '举办地点' }, viewingExhibition.location),
                React.createElement(Descriptions.Item, { label: '开始时间' }, viewingExhibition.startDate),
                React.createElement(Descriptions.Item, { label: '结束时间' }, viewingExhibition.endDate),
                React.createElement(Descriptions.Item, { label: '状态' }, getStatusTag(viewingExhibition.status)),
                React.createElement(Descriptions.Item, { label: '主办方' }, viewingExhibition.organizer),
                React.createElement(Descriptions.Item, { label: '联系人' }, viewingExhibition.contactPerson),
                React.createElement(Descriptions.Item, { label: '联系电话' }, viewingExhibition.contactPhone),
                React.createElement(Descriptions.Item, { 
                    label: '展会描述',
                    span: 3
                }, viewingExhibition.description)
            ]),

            // 统计数据
            React.createElement(Row, {
                key: 'stats',
                gutter: 16,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Col, { span: 6 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '报名数量',
                            value: viewingExhibition.registrationCount,
                            valueStyle: { color: '#1890ff' }
                        })
                    )
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '确认展商',
                            value: viewingExhibition.exhibitorCount,
                            valueStyle: { color: '#52c41a' }
                        })
                    )
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '观众数量',
                            value: viewingExhibition.visitorCount,
                            valueStyle: { color: '#faad14' }
                        })
                    )
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '展位总数',
                            value: viewingExhibition.boothCount,
                            valueStyle: { color: '#722ed1' }
                        })
                    )
                )
            ]),

            // 参展商列表
            React.createElement('div', { key: 'exhibitors' }, [
                React.createElement('h4', { 
                    key: 'title',
                    style: { marginBottom: 16 }
                }, '参展商列表'),
                React.createElement(Table, {
                    key: 'table',
                    columns: exhibitorColumns,
                    dataSource: exhibitorList,
                    pagination: {
                        pageSize: 5,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                    },
                    size: 'small'
                })
            ])
        ]))
    ]);
};

window.ExhibitionList = ExhibitionList; 