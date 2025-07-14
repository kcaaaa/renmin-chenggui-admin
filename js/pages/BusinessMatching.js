// 商务配对组件
const BusinessMatching = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, Descriptions } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [matches, setMatches] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingMatch, setEditingMatch] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟商务配对数据
    const mockMatches = [
        {
            id: 1,
            type: 'supply',
            title: '智能信号系统供应',
            company: '中车信号有限公司',
            contact: '张经理',
            phone: '13800138001',
            email: 'zhang@crsc.com',
            description: '提供城市轨道交通智能信号系统解决方案，包括ATP、ATO、ATS等核心产品',
            targetCompany: '北京地铁运营有限公司',
            status: 'active',
            publishTime: '2024-01-15 10:30',
            viewCount: 125,
            contactCount: 8,
            category: '信号系统',
            budget: '500-1000万'
        },
        {
            id: 2,
            type: 'demand',
            title: '寻求车辆维护服务',
            company: '上海地铁维护有限公司',
            contact: '李主管',
            phone: '13800138002',
            email: 'li@shmetro.com',
            description: '需要专业的地铁车辆维护保养服务，包括日常检修、大修等',
            targetCompany: '',
            status: 'active',
            publishTime: '2024-01-16 14:20',
            viewCount: 89,
            contactCount: 5,
            category: '车辆维护',
            budget: '200-500万'
        },
        {
            id: 3,
            type: 'supply',
            title: '站台屏蔽门系统',
            company: '康尼机电股份有限公司',
            contact: '王工程师',
            phone: '13800138003',
            email: 'wang@kangni.com',
            description: '专业生产站台屏蔽门系统，具有完整的产品线和丰富的项目经验',
            targetCompany: '广州地铁集团',
            status: 'matched',
            publishTime: '2024-01-17 09:15',
            viewCount: 156,
            contactCount: 12,
            category: '屏蔽门',
            budget: '1000-2000万'
        },
        {
            id: 4,
            type: 'demand',
            title: '轨道交通安全监控',
            company: '深圳地铁运营集团',
            contact: '陈总监',
            phone: '13800138004',
            email: 'chen@szmc.net',
            description: '需要建设完善的轨道交通安全监控系统，包括视频监控、入侵检测等',
            targetCompany: '海康威视数字技术股份有限公司',
            status: 'negotiating',
            publishTime: '2024-01-18 16:45',
            viewCount: 203,
            contactCount: 15,
            category: '安全监控',
            budget: '300-800万'
        }
    ];
    
    React.useEffect(() => {
        loadMatches();
    }, []);
    
    const loadMatches = () => {
        setLoading(true);
        setTimeout(() => {
            setMatches(mockMatches);
            setLoading(false);
        }, 1000);
    };
    
    const getTypeTag = (type) => {
        return type === 'supply' 
            ? React.createElement(Tag, { color: 'blue' }, '供应')
            : React.createElement(Tag, { color: 'green' }, '需求');
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'processing', text: '进行中' },
            'matched': { color: 'success', text: '已匹配' },
            'negotiating': { color: 'warning', text: '洽谈中' },
            'completed': { color: 'default', text: '已完成' },
            'cancelled': { color: 'error', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '供需信息',
            key: 'info',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'title',
                    style: { fontWeight: 'bold', marginBottom: '4px' } 
                }, record.title),
                React.createElement('div', { 
                    key: 'type',
                    style: { marginBottom: '4px' } 
                }, getTypeTag(record.type)),
                React.createElement('div', { 
                    key: 'category',
                    style: { color: '#8c8c8c', fontSize: '12px' } 
                }, `分类：${record.category}`)
            ])
        },
        {
            title: '发布企业',
            key: 'company',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'company' }, record.company),
                React.createElement('div', { 
                    key: 'contact',
                    style: { color: '#8c8c8c', fontSize: '12px' } 
                }, record.contact)
            ])
        },
        {
            title: '预算范围',
            dataIndex: 'budget',
            key: 'budget'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '数据统计',
            key: 'stats',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'view' }, `浏览：${record.viewCount}`),
                React.createElement('div', { 
                    key: 'contact',
                    style: { color: '#1890ff' } 
                }, `联系：${record.contactCount}`)
            ])
        },
        {
            title: '发布时间',
            dataIndex: 'publishTime',
            key: 'publishTime'
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
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'contact',
                    type: 'link',
                    size: 'small',
                    onClick: () => contactPublisher(record)
                }, '联系')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingMatch(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingMatch(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.title} - 详细信息`,
            width: 800,
            content: React.createElement(Descriptions, {
                column: 1,
                bordered: true
            }, [
                React.createElement(Descriptions.Item, {
                    key: 'type',
                    label: '供需类型'
                }, getTypeTag(record.type)),
                React.createElement(Descriptions.Item, {
                    key: 'company',
                    label: '发布企业'
                }, record.company),
                React.createElement(Descriptions.Item, {
                    key: 'contact',
                    label: '联系人'
                }, record.contact),
                React.createElement(Descriptions.Item, {
                    key: 'phone',
                    label: '联系电话'
                }, record.phone),
                React.createElement(Descriptions.Item, {
                    key: 'email',
                    label: '邮箱'
                }, record.email),
                React.createElement(Descriptions.Item, {
                    key: 'category',
                    label: '分类'
                }, record.category),
                React.createElement(Descriptions.Item, {
                    key: 'budget',
                    label: '预算范围'
                }, record.budget),
                React.createElement(Descriptions.Item, {
                    key: 'target',
                    label: '目标企业'
                }, record.targetCompany || '不限'),
                React.createElement(Descriptions.Item, {
                    key: 'description',
                    label: '详细描述'
                }, record.description),
                React.createElement(Descriptions.Item, {
                    key: 'status',
                    label: '状态'
                }, getStatusTag(record.status)),
                React.createElement(Descriptions.Item, {
                    key: 'publishTime',
                    label: '发布时间'
                }, record.publishTime)
            ])
        });
    };
    
    const contactPublisher = (record) => {
        Modal.info({
            title: '联系发布方',
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'info' }, '您可以通过以下方式联系发布方：'),
                React.createElement('p', { key: 'contact' }, React.createElement('strong', {}, '联系人：'), record.contact),
                React.createElement('p', { key: 'phone' }, React.createElement('strong', {}, '电话：'), record.phone),
                React.createElement('p', { key: 'email' }, React.createElement('strong', {}, '邮箱：'), record.email)
            ])
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存商务配对:', values);
        message.success(editingMatch ? '编辑成功' : '发布成功');
        setModalVisible(false);
        form.resetFields();
        loadMatches();
    };
    
    const totalMatches = matches.length;
    const supplyCount = matches.filter(m => m.type === 'supply').length;
    const demandCount = matches.filter(m => m.type === 'demand').length;
    const activeCount = matches.filter(m => m.status === 'active').length;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '商务配对'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '展商供需信息发布与匹配平台')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总信息数',
                        value: totalMatches
                    })
                )
            ),
            React.createElement(Col, { key: 'supply', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '供应信息',
                        value: supplyCount,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'demand', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '需求信息',
                        value: demandCount,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '进行中',
                        value: activeCount,
                        valueStyle: { color: '#faad14' }
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
            }, '发布供需信息'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadMatches
            }, '刷新'),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'supply', value: 'supply' }, '供应'),
                React.createElement(Option, { key: 'demand', value: 'demand' }, '需求')
            ]),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '进行中'),
                React.createElement(Option, { key: 'matched', value: 'matched' }, '已匹配'),
                React.createElement(Option, { key: 'negotiating', value: 'negotiating' }, '洽谈中'),
                React.createElement(Option, { key: 'completed', value: 'completed' }, '已完成')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: matches,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingMatch ? '编辑供需信息' : '发布供需信息',
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
                React.createElement(Col, { key: 'type', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '供需类型',
                        rules: [{ required: true, message: '请选择供需类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择供需类型'
                    }, [
                        React.createElement(Option, { key: 'supply', value: 'supply' }, '供应'),
                        React.createElement(Option, { key: 'demand', value: 'demand' }, '需求')
                    ]))
                ),
                React.createElement(Col, { key: 'category', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'category',
                        label: '分类',
                        rules: [{ required: true, message: '请选择分类' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择分类'
                    }, [
                        React.createElement(Option, { key: 'signal', value: '信号系统' }, '信号系统'),
                        React.createElement(Option, { key: 'vehicle', value: '车辆维护' }, '车辆维护'),
                        React.createElement(Option, { key: 'door', value: '屏蔽门' }, '屏蔽门'),
                        React.createElement(Option, { key: 'security', value: '安全监控' }, '安全监控')
                    ]))
                ),
                React.createElement(Col, { key: 'budget', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'budget',
                        label: '预算范围',
                        rules: [{ required: true, message: '请输入预算范围' }]
                    }, React.createElement(Input, {
                        placeholder: '如：100-500万'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'title',
                name: 'title',
                label: '标题',
                rules: [{ required: true, message: '请输入标题' }]
            }, React.createElement(Input, {
                placeholder: '请输入供需信息标题'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '详细描述',
                rules: [{ required: true, message: '请输入详细描述' }]
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请详细描述供需内容'
            })),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
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
                key: 'targetCompany',
                name: 'targetCompany',
                label: '目标企业（可选）'
            }, React.createElement(Input, {
                placeholder: '如有特定目标企业，请填写'
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

window.BusinessMatching = BusinessMatching; 