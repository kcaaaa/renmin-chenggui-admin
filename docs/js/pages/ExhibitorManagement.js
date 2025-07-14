// 展商管理组件
const ExhibitorManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Upload } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitors, setExhibitors] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingExhibitor, setEditingExhibitor] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟展商数据
    const mockExhibitors = [
        { 
            id: 1, 
            name: '中车集团', 
            companyType: 'manufacturer', 
            status: 'approved',
            boothNumber: 'A001',
            boothSize: '9x6',
            contactPerson: '张总',
            phone: '13800138000',
            email: 'zhang@crrc.com',
            products: ['动车组', '地铁列车', '有轨电车'],
            description: '中国中车集团有限公司是全球规模最大的轨道交通装备制造企业',
            registrationDate: '2024-01-10',
            paymentStatus: 'paid',
            amount: 50000
        },
        { 
            id: 2, 
            name: '华为技术', 
            companyType: 'technology', 
            status: 'approved',
            boothNumber: 'B002',
            boothSize: '6x6',
            contactPerson: '李经理',
            phone: '13800138001',
            email: 'li@huawei.com',
            products: ['5G通信', '信号系统', '智能调度'],
            description: '华为技术有限公司是全球领先的信息与通信技术解决方案供应商',
            registrationDate: '2024-01-11',
            paymentStatus: 'paid',
            amount: 30000
        },
        { 
            id: 3, 
            name: '比亚迪股份', 
            companyType: 'manufacturer', 
            status: 'pending',
            boothNumber: 'C003',
            boothSize: '12x6',
            contactPerson: '王主管',
            phone: '13800138002',
            email: 'wang@byd.com',
            products: ['新能源列车', '储能系统', '充电设备'],
            description: '比亚迪股份有限公司是一家拥有IT、汽车及新能源三大产业群的高新技术民营企业',
            registrationDate: '2024-01-12',
            paymentStatus: 'pending',
            amount: 60000
        }
    ];
    
    React.useEffect(() => {
        loadExhibitors();
    }, []);
    
    const loadExhibitors = () => {
        setLoading(true);
        setTimeout(() => {
            setExhibitors(mockExhibitors);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'approved': { color: 'green', text: '已通过' },
            'pending': { color: 'orange', text: '待审核' },
            'rejected': { color: 'red', text: '已拒绝' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'manufacturer': { color: 'blue', text: '制造商' },
            'technology': { color: 'purple', text: '技术公司' },
            'service': { color: 'cyan', text: '服务商' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getPaymentTag = (status) => {
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
            title: '展商名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '类型',
            dataIndex: 'companyType',
            key: 'companyType',
            render: getTypeTag
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '展位号',
            dataIndex: 'boothNumber',
            key: 'boothNumber'
        },
        {
            title: '展位规格',
            dataIndex: 'boothSize',
            key: 'boothSize',
            render: (size) => `${size}m`
        },
        {
            title: '联系人',
            dataIndex: 'contactPerson',
            key: 'contactPerson'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '付款状态',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: getPaymentTag
        },
        {
            title: '费用',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `¥${amount.toLocaleString()}`
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => viewDetail(record)
                }, '查看'),
                React.createElement(Button, {
                    key: 'approve',
                    type: 'link',
                    size: 'small',
                    onClick: () => approveExhibitor(record)
                }, '审核')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingExhibitor(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingExhibitor(record);
        form.setFieldsValue({
            ...record,
            products: record.products
        });
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.name} - 详细信息`,
            width: 600,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'contact' }, React.createElement('strong', {}, '联系人：'), record.contactPerson),
                React.createElement('p', { key: 'phone' }, React.createElement('strong', {}, '电话：'), record.phone),
                React.createElement('p', { key: 'email' }, React.createElement('strong', {}, '邮箱：'), record.email),
                React.createElement('p', { key: 'booth' }, React.createElement('strong', {}, '展位：'), `${record.boothNumber} (${record.boothSize}m)`),
                React.createElement('p', { key: 'products' }, React.createElement('strong', {}, '产品：'), record.products.join('、')),
                React.createElement('p', { key: 'description' }, React.createElement('strong', {}, '描述：'), record.description),
                React.createElement('p', { key: 'registration' }, React.createElement('strong', {}, '注册日期：'), record.registrationDate),
                React.createElement('p', { key: 'amount' }, React.createElement('strong', {}, '费用：'), `¥${record.amount.toLocaleString()}`)
            ])
        });
    };
    
    const approveExhibitor = (record) => {
        Modal.confirm({
            title: '审核展商',
            content: `确定要审核通过 ${record.name} 吗？`,
            onOk: () => {
                message.success('审核成功');
                loadExhibitors();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存展商信息:', values);
        message.success(editingExhibitor ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadExhibitors();
    };
    
    const totalExhibitors = exhibitors.length;
    const approvedExhibitors = exhibitors.filter(e => e.status === 'approved').length;
    const totalRevenue = exhibitors.reduce((sum, e) => sum + e.amount, 0);
    const paidRevenue = exhibitors.filter(e => e.paymentStatus === 'paid').reduce((sum, e) => sum + e.amount, 0);
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '展商管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理展商信息、展位分配和费用收缴')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总展商数',
                        value: totalExhibitors
                    })
                )
            ),
            React.createElement(Col, { key: 'approved', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已通过',
                        value: approvedExhibitors,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'revenue', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总收入',
                        value: totalRevenue,
                        prefix: '¥',
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'paid', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已收款',
                        value: paidRevenue,
                        prefix: '¥',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'actions',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(Button, {
                key: 'add',
                type: 'primary',
                onClick: handleAdd
            }, '新增展商'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadExhibitors
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'approved', value: 'approved' }, '已通过'),
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝')
            ]),
            React.createElement(Select, {
                key: 'payment-filter',
                placeholder: '付款状态',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'paid', value: 'paid' }, '已付款'),
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待付款'),
                React.createElement(Option, { key: 'overdue', value: 'overdue' }, '逾期')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: exhibitors,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingExhibitor ? '编辑展商' : '新增展商',
            visible: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            footer: null,
            width: 800
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleSubmit
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'name', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'name',
                        label: '展商名称',
                        rules: [{ required: true, message: '请输入展商名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入展商名称'
                    }))
                ),
                React.createElement(Col, { key: 'companyType', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'companyType',
                        label: '公司类型',
                        rules: [{ required: true, message: '请选择公司类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择公司类型'
                    }, [
                        React.createElement(Option, { key: 'manufacturer', value: 'manufacturer' }, '制造商'),
                        React.createElement(Option, { key: 'technology', value: 'technology' }, '技术公司'),
                        React.createElement(Option, { key: 'service', value: 'service' }, '服务商')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'boothNumber', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'boothNumber',
                        label: '展位号',
                        rules: [{ required: true, message: '请输入展位号' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入展位号'
                    }))
                ),
                React.createElement(Col, { key: 'boothSize', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'boothSize',
                        label: '展位规格',
                        rules: [{ required: true, message: '请输入展位规格' }]
                    }, React.createElement(Input, {
                        placeholder: '如: 9x6'
                    }))
                ),
                React.createElement(Col, { key: 'amount', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'amount',
                        label: '费用（元）',
                        rules: [{ required: true, message: '请输入费用' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入费用'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'contactPerson', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'contactPerson',
                        label: '联系人',
                        rules: [{ required: true, message: '请输入联系人' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入联系人'
                    }))
                ),
                React.createElement(Col, { key: 'phone', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '联系电话',
                        rules: [{ required: true, message: '请输入联系电话' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入联系电话'
                    }))
                ),
                React.createElement(Col, { key: 'email', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'email',
                        label: '邮箱',
                        rules: [{ required: true, message: '请输入邮箱' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入邮箱'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'products',
                name: 'products',
                label: '产品/服务'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入产品/服务，按回车添加'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '公司描述'
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请输入公司描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'submit',
                style: { marginBottom: 0, marginTop: 24 }
            }, React.createElement(Space, {
                style: { width: '100%', justifyContent: 'flex-end' }
            }, [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'confirm',
                    type: 'primary',
                    htmlType: 'submit'
                }, '确定')
            ]))
        ]))
    ]);
};

window.ExhibitorManagement = ExhibitorManagement; 