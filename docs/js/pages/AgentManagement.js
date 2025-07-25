// 智能体管理页面 - 基于文档7.5.1功能设计
const AgentManagement = () => {
    const { Card, Table, Button, Space, Modal, Form, Input, Select, Switch, message, Tag, Tooltip, Popconfirm } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [agents, setAgents] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingAgent, setEditingAgent] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟知识库数据
    const [knowledgeBases] = React.useState([
        { id: 'kb001', name: '城轨技术知识库', description: '包含地铁、轻轨等技术资料' },
        { id: 'kb002', name: '展会服务知识库', description: '展会相关服务和流程指导' },
        { id: 'kb003', name: '政策法规知识库', description: '行业政策和法规文件' },
        { id: 'kb004', name: '常见问题知识库', description: '用户常见问题及解答' }
    ]);
    
    // 可选AI模型
    const aiModels = [
        { value: 'gpt-4', label: 'GPT-4 (推荐)', description: '最强大的通用AI模型' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: '快速响应的AI模型' },
        { value: 'claude-3', label: 'Claude-3', description: '适合专业对话的AI模型' },
        { value: 'baidu-ernie', label: '百度文心一言', description: '中文优化的AI模型' }
    ];

    React.useEffect(() => {
        loadAgents();
    }, []);

    const loadAgents = () => {
        setLoading(true);
        // 模拟加载智能体数据
        setTimeout(() => {
            setAgents([
                {
                    id: 'agent001',
                    name: '城轨技术助手',
                    description: '专门回答城市轨道交通技术问题的AI助手',
                    model: 'gpt-4',
                    prompt: '你是一个专业的城市轨道交通技术专家，擅长回答地铁、轻轨等相关技术问题...',
                    knowledgeBases: ['kb001', 'kb003'],
                    enabled: true,
                    sort: 1,
                    createTime: '2025-01-10 09:00:00',
                    creator: '系统管理员'
                },
                {
                    id: 'agent002',
                    name: '展会服务助手',
                    description: '为参展商和观众提供展会相关服务咨询',
                    model: 'gpt-3.5-turbo',
                    prompt: '你是一个专业的展会服务助手，能够帮助用户了解展会流程、参展指南等...',
                    knowledgeBases: ['kb002', 'kb004'],
                    enabled: true,
                    sort: 2,
                    createTime: '2025-01-08 14:30:00',
                    creator: '内容管理员'
                },
                {
                    id: 'agent003',
                    name: '政策咨询助手',
                    description: '提供行业政策和法规相关咨询服务',
                    model: 'claude-3',
                    prompt: '你是一个专业的政策咨询顾问，熟悉城轨行业的各项政策法规...',
                    knowledgeBases: ['kb003'],
                    enabled: false,
                    sort: 3,
                    createTime: '2025-01-05 16:45:00',
                    creator: '业务专员'
                }
            ]);
            setLoading(false);
        }, 800);
    };

    const handleCreate = () => {
        setEditingAgent(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingAgent(record);
        form.setFieldsValue({
            name: record.name,
            description: record.description,
            model: record.model,
            prompt: record.prompt,
            knowledgeBases: record.knowledgeBases,
            enabled: record.enabled,
            sort: record.sort
        });
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        setAgents(agents.filter(agent => agent.id !== id));
        message.success('智能体删除成功');
    };

    const handleToggleStatus = (id, enabled) => {
        setAgents(agents.map(agent => 
            agent.id === id ? { ...agent, enabled } : agent
        ));
        message.success(`智能体已${enabled ? '启用' : '禁用'}`);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingAgent) {
                // 编辑智能体
                setAgents(agents.map(agent => 
                    agent.id === editingAgent.id 
                        ? { ...agent, ...values, updateTime: new Date().toLocaleString() }
                        : agent
                ));
                message.success('智能体更新成功');
            } else {
                // 创建新智能体
                const newAgent = {
                    id: `agent${Date.now()}`,
                    ...values,
                    createTime: new Date().toLocaleString(),
                    creator: '当前用户'
                };
                setAgents([...agents, newAgent]);
                message.success('智能体创建成功');
            }
            setModalVisible(false);
        });
    };

    const getKnowledgeBaseNames = (kbIds) => {
        return kbIds.map(id => {
            const kb = knowledgeBases.find(kb => kb.id === id);
            return kb ? kb.name : id;
        }).join(', ');
    };

    const getModelLabel = (modelValue) => {
        const model = aiModels.find(m => m.value === modelValue);
        return model ? model.label : modelValue;
    };

    const columns = [
        {
            title: '智能体名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (text, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'name',
                        style: { fontWeight: 500, marginBottom: '4px' } 
                    }, text),
                    React.createElement('div', { 
                        key: 'desc',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, record.description)
                ])
            )
        },
        {
            title: 'AI模型',
            dataIndex: 'model',
            key: 'model',
            width: 120,
            render: (model) => (
                React.createElement(Tag, { color: 'blue' }, getModelLabel(model))
            )
        },
        {
            title: '关联知识库',
            dataIndex: 'knowledgeBases',
            key: 'knowledgeBases',
            width: 200,
            render: (kbIds) => (
                React.createElement(Tooltip, {
                    title: getKnowledgeBaseNames(kbIds)
                }, 
                    React.createElement('div', { 
                        style: { 
                            maxWidth: '180px', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        } 
                    }, getKnowledgeBaseNames(kbIds))
                )
            )
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 80,
            render: (enabled, record) => (
                React.createElement(Switch, {
                    checked: enabled,
                    onChange: (checked) => handleToggleStatus(record.id, checked),
                    checkedChildren: '启用',
                    unCheckedChildren: '禁用'
                })
            )
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: 80,
            sorter: (a, b) => a.sort - b.sort
        },
        {
            title: '创建信息',
            key: 'createInfo',
            width: 150,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'creator',
                        style: { fontSize: '12px' } 
                    }, `创建人：${record.creator}`),
                    React.createElement('div', { 
                        key: 'time',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, record.createTime)
                ])
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record) => (
                React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'edit',
                        type: 'link',
                        size: 'small',
                        onClick: () => handleEdit(record)
                    }, '编辑'),
                    React.createElement(Popconfirm, {
                        key: 'delete',
                        title: '确定要删除这个智能体吗？',
                        onConfirm: () => handleDelete(record.id),
                        okText: '确定',
                        cancelText: '取消'
                    }, 
                        React.createElement(Button, {
                            type: 'link',
                            size: 'small',
                            danger: true
                        }, '删除')
                    )
                ])
            )
        }
    ];

    // 顶部工具栏
    const renderToolbar = () => {
        return React.createElement('div', { 
            style: { 
                background: '#fff', 
                padding: '16px 24px', 
                marginBottom: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('div', { key: 'left' }, [
                React.createElement('h2', { 
                    key: 'title',
                    style: { margin: 0, fontSize: '20px', fontWeight: 600 } 
                }, '智能体管理'),
                React.createElement('p', { 
                    key: 'desc',
                    style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                }, '管理AI智能体，配置模型、提示词和知识库，为用户提供个性化AI服务')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(Button, {
                    key: 'refresh',
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: loadAgents,
                    loading: loading
                }, '刷新'),
                React.createElement(Button, {
                    key: 'create',
                    type: 'primary',
                    icon: React.createElement('span', {}, '➕'),
                    onClick: handleCreate
                }, '创建智能体')
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        
        React.createElement(Card, { key: 'table-card' },
            React.createElement(Table, {
                columns: columns,
                dataSource: agents,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    total: agents.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
        ),

        // 创建/编辑智能体弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: editingAgent ? '编辑智能体' : '创建智能体',
            visible: modalVisible,
            onOk: handleSubmit,
            onCancel: () => setModalVisible(false),
            width: 800,
            destroyOnClose: true
        }, [
            React.createElement(Form, {
                key: 'form',
                form: form,
                layout: 'vertical',
                initialValues: { enabled: true, sort: 1 }
            }, [
                React.createElement(Form.Item, {
                    key: 'name',
                    name: 'name',
                    label: '智能体名称',
                    rules: [{ required: true, message: '请输入智能体名称' }]
                }, React.createElement(Input, { placeholder: '请输入智能体名称' })),

                React.createElement(Form.Item, {
                    key: 'description',
                    name: 'description',
                    label: '简介',
                    rules: [{ required: true, message: '请输入智能体简介' }]
                }, React.createElement(TextArea, { 
                    rows: 2, 
                    placeholder: '请输入智能体的功能简介' 
                })),

                React.createElement(Form.Item, {
                    key: 'model',
                    name: 'model',
                    label: '选择AI模型',
                    rules: [{ required: true, message: '请选择AI模型' }]
                }, React.createElement(Select, { 
                    placeholder: '请选择AI模型' 
                }, aiModels.map(model => 
                    React.createElement(Option, { 
                        key: model.value, 
                        value: model.value 
                    }, [
                        React.createElement('div', { key: 'label' }, model.label),
                        React.createElement('div', { 
                            key: 'desc',
                            style: { fontSize: '12px', color: '#8c8c8c' } 
                        }, model.description)
                    ])
                ))),

                React.createElement(Form.Item, {
                    key: 'prompt',
                    name: 'prompt',
                    label: '提示词',
                    rules: [{ required: true, message: '请输入提示词' }]
                }, React.createElement(TextArea, { 
                    rows: 4, 
                    placeholder: '请输入定义AI行为的提示词，例如：你是一个专业的城市轨道交通技术专家...' 
                })),

                React.createElement(Form.Item, {
                    key: 'knowledgeBases',
                    name: 'knowledgeBases',
                    label: '关联知识库',
                    rules: [{ required: true, message: '请选择至少一个知识库' }]
                }, React.createElement(Select, { 
                    mode: 'multiple',
                    placeholder: '请选择要关联的知识库' 
                }, knowledgeBases.map(kb => 
                    React.createElement(Option, { 
                        key: kb.id, 
                        value: kb.id 
                    }, `${kb.name} - ${kb.description}`)
                ))),

                React.createElement('div', { 
                    key: 'row',
                    style: { display: 'flex', gap: '16px' } 
                }, [
                    React.createElement('div', { key: 'enabled', style: { flex: 1 } },
                        React.createElement(Form.Item, {
                            name: 'enabled',
                            label: '启用状态',
                            valuePropName: 'checked'
                        }, React.createElement(Switch, { 
                            checkedChildren: '启用',
                            unCheckedChildren: '禁用'
                        }))
                    ),
                    React.createElement('div', { key: 'sort', style: { flex: 1 } },
                        React.createElement(Form.Item, {
                            name: 'sort',
                            label: '排序（数字越小越靠前）',
                            rules: [{ required: true, message: '请输入排序数字' }]
                        }, React.createElement(Input, { 
                            type: 'number',
                            min: 1,
                            placeholder: '请输入排序数字' 
                        }))
                    )
                ])
            ])
        ])
    ]);
};

// 确保组件被正确导出
window.AgentManagement = AgentManagement; 