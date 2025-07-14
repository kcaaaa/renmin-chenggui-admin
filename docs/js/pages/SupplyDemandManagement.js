// 供需管理组件
const SupplyDemandManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [records, setRecords] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingRecord, setEditingRecord] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟供需数据
    const mockRecords = [
        { 
            id: 1, 
            title: '高速动车组采购需求', 
            type: 'demand', 
            category: '车辆设备',
            status: 'open',
            company: '北京地铁集团',
            contact: '张总',
            phone: '13800138000',
            email: 'zhang@bjsubway.com',
            budget: 500000000,
            quantity: 10,
            unit: '列',
            description: '采购10列8节编组高速动车组，用于新线路运营',
            requirements: '运营速度350km/h，符合中国标准',
            deadline: '2024-06-30',
            publishDate: '2024-01-15',
            location: '北京市',
            priority: 'high'
        },
        { 
            id: 2, 
            title: '信号控制系统供应', 
            type: 'supply', 
            category: '信号系统',
            status: 'open',
            company: '华为技术有限公司',
            contact: '李经理',
            phone: '13800138001',
            email: 'li@huawei.com',
            budget: 80000000,
            quantity: 1,
            unit: '套',
            description: '提供完整的CBTC信号控制系统解决方案',
            requirements: '支持全自动驾驶，SIL4安全等级',
            deadline: '2024-08-31',
            publishDate: '2024-01-20',
            location: '全国',
            priority: 'medium'
        },
        { 
            id: 3, 
            title: '轨道维护设备需求', 
            type: 'demand', 
            category: '维护设备',
            status: 'matched',
            company: '上海申通地铁',
            contact: '王主任',
            phone: '13800138002',
            email: 'wang@shmetro.com',
            budget: 15000000,
            quantity: 5,
            unit: '台',
            description: '采购轨道打磨车和检测设备',
            requirements: '精度±0.1mm，自动化程度高',
            deadline: '2024-05-15',
            publishDate: '2024-01-10',
            location: '上海市',
            priority: 'low'
        }
    ];
    
    React.useEffect(() => {
        loadRecords();
    }, []);
    
    const loadRecords = () => {
        setLoading(true);
        setTimeout(() => {
            setRecords(mockRecords);
            setLoading(false);
        }, 1000);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'demand': { color: 'blue', text: '需求' },
            'supply': { color: 'green', text: '供应' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'open': { color: 'processing', text: '开放' },
            'matched': { color: 'success', text: '已匹配' },
            'closed': { color: 'default', text: '已关闭' },
            'expired': { color: 'error', text: '已过期' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getPriorityTag = (priority) => {
        const priorityMap = {
            'high': { color: 'red', text: '高' },
            'medium': { color: 'orange', text: '中' },
            'low': { color: 'green', text: '低' }
        };
        const config = priorityMap[priority] || { color: 'default', text: priority };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 200
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '公司',
            dataIndex: 'company',
            key: 'company',
            width: 150
        },
        {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: '预算',
            dataIndex: 'budget',
            key: 'budget',
            render: (budget) => `¥${(budget / 10000).toFixed(0)}万`
        },
        {
            title: '数量',
            key: 'quantity',
            render: (_, record) => `${record.quantity}${record.unit}`
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            render: getPriorityTag
        },
        {
            title: '截止日期',
            dataIndex: 'deadline',
            key: 'deadline'
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
                    key: 'match',
                    type: 'link',
                    size: 'small',
                    onClick: () => matchRecord(record)
                }, '匹配')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.title} - 详细信息`,
            width: 700,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'company' }, React.createElement('strong', {}, '公司：'), record.company),
                React.createElement('p', { key: 'contact' }, React.createElement('strong', {}, '联系人：'), `${record.contact} (${record.phone})`),
                React.createElement('p', { key: 'email' }, React.createElement('strong', {}, '邮箱：'), record.email),
                React.createElement('p', { key: 'budget' }, React.createElement('strong', {}, '预算：'), `¥${(record.budget / 10000).toFixed(0)}万`),
                React.createElement('p', { key: 'quantity' }, React.createElement('strong', {}, '数量：'), `${record.quantity}${record.unit}`),
                React.createElement('p', { key: 'location' }, React.createElement('strong', {}, '地点：'), record.location),
                React.createElement('p', { key: 'deadline' }, React.createElement('strong', {}, '截止日期：'), record.deadline),
                React.createElement('p', { key: 'description' }, React.createElement('strong', {}, '描述：'), record.description),
                React.createElement('p', { key: 'requirements' }, React.createElement('strong', {}, '要求：'), record.requirements)
            ])
        });
    };
    
    const matchRecord = (record) => {
        message.info(`为 ${record.title} 寻找匹配`);
    };
    
    const handleSubmit = (values) => {
        console.log('保存供需信息:', values);
        message.success(editingRecord ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadRecords();
    };
    
    const totalRecords = records.length;
    const demandCount = records.filter(r => r.type === 'demand').length;
    const supplyCount = records.filter(r => r.type === 'supply').length;
    const matchedCount = records.filter(r => r.status === 'matched').length;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '供需管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理轨道交通行业的供需信息和匹配')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总记录数',
                        value: totalRecords
                    })
                )
            ),
            React.createElement(Col, { key: 'demand', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '需求数',
                        value: demandCount,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'supply', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '供应数',
                        value: supplyCount,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'matched', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已匹配',
                        value: matchedCount,
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
            }, '发布信息'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadRecords
            }, '刷新'),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'demand', value: 'demand' }, '需求'),
                React.createElement(Option, { key: 'supply', value: 'supply' }, '供应')
            ]),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'open', value: 'open' }, '开放'),
                React.createElement(Option, { key: 'matched', value: 'matched' }, '已匹配'),
                React.createElement(Option, { key: 'closed', value: 'closed' }, '已关闭')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: records,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingRecord ? '编辑供需信息' : '发布供需信息',
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
                React.createElement(Col, { key: 'title', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'title',
                        label: '标题',
                        rules: [{ required: true, message: '请输入标题' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入标题'
                    }))
                ),
                React.createElement(Col, { key: 'type', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '类型',
                        rules: [{ required: true, message: '请选择类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择类型'
                    }, [
                        React.createElement(Option, { key: 'demand', value: 'demand' }, '需求'),
                        React.createElement(Option, { key: 'supply', value: 'supply' }, '供应')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'category', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'category',
                        label: '分类',
                        rules: [{ required: true, message: '请输入分类' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入分类'
                    }))
                ),
                React.createElement(Col, { key: 'priority', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'priority',
                        label: '优先级',
                        rules: [{ required: true, message: '请选择优先级' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择优先级'
                    }, [
                        React.createElement(Option, { key: 'high', value: 'high' }, '高'),
                        React.createElement(Option, { key: 'medium', value: 'medium' }, '中'),
                        React.createElement(Option, { key: 'low', value: 'low' }, '低')
                    ]))
                ),
                React.createElement(Col, { key: 'location', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'location',
                        label: '地点',
                        rules: [{ required: true, message: '请输入地点' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入地点'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'company', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'company',
                        label: '公司',
                        rules: [{ required: true, message: '请输入公司' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入公司'
                    }))
                ),
                React.createElement(Col, { key: 'contact', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'contact',
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
                )
            ]),
            
            React.createElement(Row, { key: 'row4', gutter: 16 }, [
                React.createElement(Col, { key: 'budget', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'budget',
                        label: '预算（元）',
                        rules: [{ required: true, message: '请输入预算' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入预算'
                    }))
                ),
                React.createElement(Col, { key: 'quantity', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'quantity',
                        label: '数量',
                        rules: [{ required: true, message: '请输入数量' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入数量'
                    }))
                ),
                React.createElement(Col, { key: 'unit', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'unit',
                        label: '单位',
                        rules: [{ required: true, message: '请输入单位' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入单位'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'deadline',
                name: 'deadline',
                label: '截止日期',
                rules: [{ required: true, message: '请选择截止日期' }]
            }, React.createElement(DatePicker, {
                style: { width: '100%' },
                placeholder: '请选择截止日期'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '描述',
                rules: [{ required: true, message: '请输入描述' }]
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'requirements',
                name: 'requirements',
                label: '要求'
            }, React.createElement(TextArea, {
                rows: 2,
                placeholder: '请输入要求'
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

window.SupplyDemandManagement = SupplyDemandManagement; 