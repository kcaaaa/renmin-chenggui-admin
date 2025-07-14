// 注册管理组件
const RegistrationManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, Switch } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    const [registrations, setRegistrations] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingRegistration, setEditingRegistration] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟注册数据
    const mockRegistrations = [
        {
            id: 1,
            username: 'zhangsan001',
            email: 'zhangsan@example.com',
            phone: '13800138001',
            realName: '张三',
            company: '北京地铁集团',
            position: '工程师',
            registrationTime: '2024-01-15 10:30:00',
            status: 'pending',
            source: 'web',
            verificationCode: '123456',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome/120.0.0.0',
            referrer: 'https://www.google.com',
            registrationType: 'normal'
        },
        {
            id: 2,
            username: 'lisi002',
            email: 'lisi@company.com',
            phone: '13800138002',
            realName: '李四',
            company: '上海申通地铁',
            position: '项目经理',
            registrationTime: '2024-01-14 14:20:00',
            status: 'approved',
            source: 'mobile',
            verificationCode: '654321',
            ipAddress: '192.168.1.101',
            userAgent: 'Mobile Safari/604.1',
            referrer: 'direct',
            registrationType: 'invitation'
        },
        {
            id: 3,
            username: 'wangwu003',
            email: 'wangwu@test.com',
            phone: '13800138003',
            realName: '王五',
            company: '深圳地铁',
            position: '技术总监',
            registrationTime: '2024-01-13 09:15:00',
            status: 'rejected',
            source: 'api',
            verificationCode: '789012',
            ipAddress: '192.168.1.102',
            userAgent: 'PostmanRuntime/7.28.4',
            referrer: 'api',
            registrationType: 'bulk',
            rejectReason: '信息不完整'
        }
    ];
    
    React.useEffect(() => {
        loadRegistrations();
    }, []);
    
    const loadRegistrations = () => {
        setLoading(true);
        setTimeout(() => {
            setRegistrations(mockRegistrations);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'pending': { color: 'orange', text: '待审核' },
            'approved': { color: 'green', text: '已通过' },
            'rejected': { color: 'red', text: '已拒绝' },
            'disabled': { color: 'default', text: '已禁用' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getSourceTag = (source) => {
        const sourceMap = {
            'web': { color: 'blue', text: '网页' },
            'mobile': { color: 'green', text: '移动端' },
            'api': { color: 'purple', text: 'API' }
        };
        const config = sourceMap[source] || { color: 'default', text: source };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'normal': { color: 'default', text: '普通注册' },
            'invitation': { color: 'blue', text: '邀请注册' },
            'bulk': { color: 'orange', text: '批量注册' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '用户信息',
            key: 'userInfo',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'username', style: { fontWeight: 'bold' } }, record.username),
                React.createElement('div', { key: 'realName', style: { color: '#8c8c8c' } }, record.realName),
                React.createElement('div', { key: 'email', style: { color: '#8c8c8c', fontSize: '12px' } }, record.email)
            ])
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '公司/职位',
            key: 'company',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'company' }, record.company),
                React.createElement('div', { key: 'position', style: { color: '#8c8c8c', fontSize: '12px' } }, record.position)
            ])
        },
        {
            title: '注册时间',
            dataIndex: 'registrationTime',
            key: 'registrationTime'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            render: getSourceTag
        },
        {
            title: '类型',
            dataIndex: 'registrationType',
            key: 'registrationType',
            render: getTypeTag
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
                    key: 'approve',
                    type: 'link',
                    size: 'small',
                    onClick: () => approveRegistration(record)
                }, '通过'),
                record.status === 'pending' && React.createElement(Button, {
                    key: 'reject',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => rejectRegistration(record)
                }, '拒绝'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingRegistration(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingRegistration(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.realName} - 注册详情`,
            width: 700,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'username' }, React.createElement('strong', {}, '用户名：'), record.username),
                React.createElement('p', { key: 'email' }, React.createElement('strong', {}, '邮箱：'), record.email),
                React.createElement('p', { key: 'phone' }, React.createElement('strong', {}, '手机：'), record.phone),
                React.createElement('p', { key: 'company' }, React.createElement('strong', {}, '公司：'), record.company),
                React.createElement('p', { key: 'position' }, React.createElement('strong', {}, '职位：'), record.position),
                React.createElement('p', { key: 'time' }, React.createElement('strong', {}, '注册时间：'), record.registrationTime),
                React.createElement('p', { key: 'ip' }, React.createElement('strong', {}, 'IP地址：'), record.ipAddress),
                React.createElement('p', { key: 'userAgent' }, React.createElement('strong', {}, '用户代理：'), record.userAgent),
                React.createElement('p', { key: 'referrer' }, React.createElement('strong', {}, '来源页面：'), record.referrer),
                record.rejectReason && React.createElement('p', { key: 'reject' }, React.createElement('strong', {}, '拒绝原因：'), record.rejectReason)
            ])
        });
    };
    
    const approveRegistration = (record) => {
        Modal.confirm({
            title: '审核通过',
            content: `确定要通过 ${record.realName} 的注册申请吗？`,
            onOk: () => {
                message.success('审核通过');
                loadRegistrations();
            }
        });
    };
    
    const rejectRegistration = (record) => {
        Modal.confirm({
            title: '拒绝注册',
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'text' }, `确定要拒绝 ${record.realName} 的注册申请吗？`),
                React.createElement(Input.TextArea, {
                    key: 'reason',
                    placeholder: '请输入拒绝原因',
                    rows: 3
                })
            ]),
            onOk: () => {
                message.success('已拒绝注册');
                loadRegistrations();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存注册信息:', values);
        message.success(editingRegistration ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadRegistrations();
    };
    
    const totalRegistrations = registrations.length;
    const pendingRegistrations = registrations.filter(r => r.status === 'pending').length;
    const approvedRegistrations = registrations.filter(r => r.status === 'approved').length;
    const rejectedRegistrations = registrations.filter(r => r.status === 'rejected').length;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '注册管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理用户注册申请和审核流程')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总注册数',
                        value: totalRegistrations
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: pendingRegistrations,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'approved', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已通过',
                        value: approvedRegistrations,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'rejected', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已拒绝',
                        value: rejectedRegistrations,
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
                key: 'add',
                type: 'primary',
                onClick: handleAdd
            }, '手动添加'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadRegistrations
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                React.createElement(Option, { key: 'approved', value: 'approved' }, '已通过'),
                React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝'),
                React.createElement(Option, { key: 'disabled', value: 'disabled' }, '已禁用')
            ]),
            React.createElement(Select, {
                key: 'source-filter',
                placeholder: '来源筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'web', value: 'web' }, '网页'),
                React.createElement(Option, { key: 'mobile', value: 'mobile' }, '移动端'),
                React.createElement(Option, { key: 'api', value: 'api' }, 'API')
            ]),
            React.createElement(RangePicker, {
                key: 'date-range',
                placeholder: ['开始日期', '结束日期']
            })
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: registrations,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingRegistration ? '编辑注册信息' : '手动添加注册',
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
                React.createElement(Col, { key: 'username', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'username',
                        label: '用户名',
                        rules: [{ required: true, message: '请输入用户名' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入用户名'
                    }))
                ),
                React.createElement(Col, { key: 'realName', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'realName',
                        label: '真实姓名',
                        rules: [{ required: true, message: '请输入真实姓名' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入真实姓名'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'email', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'email',
                        label: '邮箱',
                        rules: [
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '邮箱格式不正确' }
                        ]
                    }, React.createElement(Input, {
                        placeholder: '请输入邮箱'
                    }))
                ),
                React.createElement(Col, { key: 'phone', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '手机号',
                        rules: [{ required: true, message: '请输入手机号' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入手机号'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'company', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'company',
                        label: '公司',
                        rules: [{ required: true, message: '请输入公司' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入公司'
                    }))
                ),
                React.createElement(Col, { key: 'position', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'position',
                        label: '职位'
                    }, React.createElement(Input, {
                        placeholder: '请输入职位'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row4', gutter: 16 }, [
                React.createElement(Col, { key: 'source', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'source',
                        label: '注册来源',
                        rules: [{ required: true, message: '请选择注册来源' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择注册来源'
                    }, [
                        React.createElement(Option, { key: 'web', value: 'web' }, '网页'),
                        React.createElement(Option, { key: 'mobile', value: 'mobile' }, '移动端'),
                        React.createElement(Option, { key: 'api', value: 'api' }, 'API')
                    ]))
                ),
                React.createElement(Col, { key: 'registrationType', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'registrationType',
                        label: '注册类型',
                        rules: [{ required: true, message: '请选择注册类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择注册类型'
                    }, [
                        React.createElement(Option, { key: 'normal', value: 'normal' }, '普通注册'),
                        React.createElement(Option, { key: 'invitation', value: 'invitation' }, '邀请注册'),
                        React.createElement(Option, { key: 'bulk', value: 'bulk' }, '批量注册')
                    ]))
                ),
                React.createElement(Col, { key: 'status', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'status',
                        label: '状态',
                        rules: [{ required: true, message: '请选择状态' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择状态'
                    }, [
                        React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                        React.createElement(Option, { key: 'approved', value: 'approved' }, '已通过'),
                        React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝')
                    ]))
                )
            ]),
            
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

window.RegistrationManagement = RegistrationManagement; 