// AI管理组件
const AIManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Switch } = antd;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [aiServices, setAiServices] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingService, setEditingService] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟AI服务数据
    const mockAiServices = [
        { 
            id: 1, 
            name: '智能客服', 
            type: 'chatbot', 
            status: 'enabled', 
            description: '基于NLP的智能客服系统',
            apiEndpoint: '/api/ai/chatbot',
            model: 'GPT-3.5',
            usage: 1250,
            accuracy: 95.8,
            createTime: '2024-01-10 10:00:00'
        },
        { 
            id: 2, 
            name: '内容审核', 
            type: 'content_review', 
            status: 'enabled', 
            description: '自动内容审核和过滤',
            apiEndpoint: '/api/ai/content-review',
            model: 'BERT',
            usage: 3420,
            accuracy: 92.3,
            createTime: '2024-01-11 11:00:00'
        },
        { 
            id: 3, 
            name: '图像识别', 
            type: 'image_recognition', 
            status: 'disabled', 
            description: '图像内容识别和分类',
            apiEndpoint: '/api/ai/image-recognition',
            model: 'ResNet-50',
            usage: 856,
            accuracy: 88.9,
            createTime: '2024-01-12 12:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadAiServices();
    }, []);
    
    const loadAiServices = () => {
        setLoading(true);
        setTimeout(() => {
            setAiServices(mockAiServices);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        return React.createElement(Tag, {
            color: status === 'enabled' ? 'green' : 'default'
        }, status === 'enabled' ? '启用' : '禁用');
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'chatbot': { color: 'blue', text: '智能客服' },
            'content_review': { color: 'orange', text: '内容审核' },
            'image_recognition': { color: 'purple', text: '图像识别' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '服务名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '模型',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: '使用量',
            dataIndex: 'usage',
            key: 'usage',
            render: (usage) => `${usage} 次`
        },
        {
            title: '准确率',
            dataIndex: 'accuracy',
            key: 'accuracy',
            render: (accuracy) => `${accuracy}%`
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
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
                    key: 'toggle',
                    type: 'link',
                    size: 'small',
                    onClick: () => toggleStatus(record)
                }, record.status === 'enabled' ? '禁用' : '启用'),
                React.createElement(Button, {
                    key: 'test',
                    type: 'link',
                    size: 'small',
                    onClick: () => testService(record)
                }, '测试')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingService(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingService(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const toggleStatus = (record) => {
        const newStatus = record.status === 'enabled' ? 'disabled' : 'enabled';
        message.success(`AI服务已${newStatus === 'enabled' ? '启用' : '禁用'}`);
        loadAiServices();
    };
    
    const testService = (record) => {
        message.info(`正在测试 ${record.name} 服务...`);
        setTimeout(() => {
            message.success(`${record.name} 服务测试通过`);
        }, 2000);
    };
    
    const handleSubmit = (values) => {
        console.log('保存AI服务:', values);
        message.success(editingService ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadAiServices();
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, 'AI服务管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理和配置平台AI服务')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总服务数',
                        value: aiServices.length
                    })
                )
            ),
            React.createElement(Col, { key: 'enabled', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '启用服务',
                        value: aiServices.filter(s => s.status === 'enabled').length,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'usage', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总使用量',
                        value: aiServices.reduce((sum, s) => sum + s.usage, 0)
                    })
                )
            ),
            React.createElement(Col, { key: 'accuracy', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均准确率',
                        value: Math.round(aiServices.reduce((sum, s) => sum + s.accuracy, 0) / aiServices.length || 0),
                        suffix: '%'
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
            }, '新建AI服务'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadAiServices
            }, '刷新')
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: aiServices,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingService ? '编辑AI服务' : '新建AI服务',
            visible: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            footer: null,
            width: 600
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleSubmit
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                name: 'name',
                label: '服务名称',
                rules: [{ required: true, message: '请输入服务名称' }]
            }, React.createElement(Input, {
                placeholder: '请输入服务名称'
            })),
            
            React.createElement(Form.Item, {
                key: 'type',
                name: 'type',
                label: '服务类型',
                rules: [{ required: true, message: '请选择服务类型' }]
            }, React.createElement(Select, {
                placeholder: '请选择服务类型'
            }, [
                React.createElement(Option, { key: 'chatbot', value: 'chatbot' }, '智能客服'),
                React.createElement(Option, { key: 'content_review', value: 'content_review' }, '内容审核'),
                React.createElement(Option, { key: 'image_recognition', value: 'image_recognition' }, '图像识别')
            ])),
            
            React.createElement(Form.Item, {
                key: 'model',
                name: 'model',
                label: '模型',
                rules: [{ required: true, message: '请输入模型名称' }]
            }, React.createElement(Input, {
                placeholder: '请输入模型名称'
            })),
            
            React.createElement(Form.Item, {
                key: 'apiEndpoint',
                name: 'apiEndpoint',
                label: 'API端点',
                rules: [{ required: true, message: '请输入API端点' }]
            }, React.createElement(Input, {
                placeholder: '请输入API端点'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '描述'
            }, React.createElement(Input.TextArea, {
                rows: 3,
                placeholder: '请输入服务描述'
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

window.AIManagement = AIManagement; 