// 审批流程设计器 - 基于 Warm Flow 概念的可视化流程设计
const WorkflowDesigner = () => {
    const { Card, Button, Input, Select, Space, Tag, Modal, Form, Switch, message, Row, Col, Drawer, Tree, Tabs, Divider, Tooltip, Popconfirm, Table } = antd;
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { TreeNode } = Tree;

    const [loading, setLoading] = React.useState(false);
    const [processDefinitions, setProcessDefinitions] = React.useState([]);
    const [currentDefinition, setCurrentDefinition] = React.useState(null);
    const [designerVisible, setDesignerVisible] = React.useState(false);
    const [propertyDrawerVisible, setPropertyDrawerVisible] = React.useState(false);
    const [selectedNode, setSelectedNode] = React.useState(null);
    const [form] = Form.useForm();
    const [nodeForm] = Form.useForm();

    // 模拟流程定义数据
    const mockProcessDefinitions = [
        {
            id: 'pd_001',
            key: 'content_audit_standard',
            name: '标准内容审核流程',
            version: '1.0',
            description: '适用于普通用户发布的图文、视频内容审核',
            status: 'deployed',
            category: 'content',
            createTime: '2024-01-15 10:00:00',
            updateTime: '2024-01-15 14:30:00',
            nodes: [
                { id: 'start', name: '开始', type: 'start', x: 100, y: 100 },
                { id: 'ai_review', name: 'AI审核', type: 'ai_task', x: 250, y: 100 },
                { id: 'condition_1', name: '审核结果判断', type: 'condition', x: 400, y: 100 },
                { id: 'manual_review', name: '人工审核', type: 'user_task', x: 400, y: 250 },
                { id: 'end_pass', name: '通过', type: 'end', x: 550, y: 100 },
                { id: 'end_reject', name: '拒绝', type: 'end', x: 550, y: 250 }
            ],
            connections: [
                { from: 'start', to: 'ai_review' },
                { from: 'ai_review', to: 'condition_1' },
                { from: 'condition_1', to: 'end_pass', condition: 'AI通过' },
                { from: 'condition_1', to: 'manual_review', condition: 'AI不通过' },
                { from: 'manual_review', to: 'end_pass', condition: '人工通过' },
                { from: 'manual_review', to: 'end_reject', condition: '人工拒绝' }
            ]
        },
        {
            id: 'pd_002',
            key: 'exhibition_audit',
            name: '展商信息审核流程',
            version: '1.0',
            description: '展商企业信息和产品信息的审核流程',
            status: 'draft',
            category: 'exhibition',
            createTime: '2024-01-12 16:00:00',
            updateTime: '2024-01-14 09:30:00',
            nodes: [
                { id: 'start', name: '开始', type: 'start', x: 100, y: 150 },
                { id: 'ai_check', name: 'AI预检', type: 'ai_task', x: 250, y: 150 },
                { id: 'primary_review', name: '初级审核', type: 'user_task', x: 400, y: 150 },
                { id: 'senior_review', name: '高级审核', type: 'user_task', x: 550, y: 150 },
                { id: 'end', name: '结束', type: 'end', x: 700, y: 150 }
            ],
            connections: [
                { from: 'start', to: 'ai_check' },
                { from: 'ai_check', to: 'primary_review' },
                { from: 'primary_review', to: 'senior_review' },
                { from: 'senior_review', to: 'end' }
            ]
        }
    ];

    // 节点类型配置
    const nodeTypes = {
        start: { name: '开始节点', color: '#52c41a', icon: '▶️' },
        end: { name: '结束节点', color: '#f5222d', icon: '⏹️' },
        user_task: { name: '人工任务', color: '#1890ff', icon: '👤' },
        ai_task: { name: 'AI任务', color: '#722ed1', icon: '🤖' },
        condition: { name: '条件判断', color: '#fa8c16', icon: '🔀' },
        parallel: { name: '并行网关', color: '#13c2c2', icon: '🔗' },
        inclusive: { name: '包容网关', color: '#eb2f96', icon: '🎯' }
    };

    React.useEffect(() => {
        setProcessDefinitions(mockProcessDefinitions);
    }, []);

    // 流程定义表格列配置
    const columns = [
        {
            title: '流程标识',
            dataIndex: 'key',
            key: 'key',
            width: 180,
            render: (text) => React.createElement('code', { style: { color: '#1890ff' } }, text)
        },
        {
            title: '流程名称',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: '版本',
            dataIndex: 'version',
            key: 'version',
            width: 80,
            align: 'center'
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            width: 100,
            render: (category) => {
                const categoryMap = {
                    content: { color: 'blue', text: '内容审核' },
                    exhibition: { color: 'green', text: '展商审核' },
                    special: { color: 'orange', text: '特殊审核' }
                };
                const config = categoryMap[category] || { color: 'default', text: category };
                return React.createElement(Tag, { color: config.color }, config.text);
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => {
                const statusMap = {
                    draft: { color: 'orange', text: '草稿' },
                    deployed: { color: 'green', text: '已部署' },
                    suspended: { color: 'red', text: '已暂停' }
                };
                const config = statusMap[status] || { color: 'default', text: status };
                return React.createElement(Tag, { color: config.color }, config.text);
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: 150
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'design',
                    type: 'link',
                    size: 'small',
                    onClick: () => openDesigner(record),
                    icon: React.createElement('span', null, '🎨')
                }, '设计'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => editDefinition(record),
                    icon: React.createElement('span', null, '✏️')
                }, '编辑'),
                record.status === 'draft' && React.createElement(Button, {
                    key: 'deploy',
                    type: 'link',
                    size: 'small',
                    onClick: () => deployDefinition(record),
                    icon: React.createElement('span', null, '🚀')
                }, '部署'),
                record.status === 'deployed' && React.createElement(Button, {
                    key: 'suspend',
                    type: 'link',
                    size: 'small',
                    onClick: () => suspendDefinition(record),
                    icon: React.createElement('span', null, '⏸️')
                }, '暂停'),
                React.createElement(Popconfirm, {
                    key: 'delete',
                    title: '确定要删除这个流程定义吗？',
                    onConfirm: () => deleteDefinition(record.id),
                    okText: '确定',
                    cancelText: '取消'
                }, React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    danger: true,
                    icon: React.createElement('span', null, '🗑️')
                }, '删除'))
            ])
        }
    ];

    // 功能函数
    const openDesigner = (definition) => {
        setCurrentDefinition(definition);
        setDesignerVisible(true);
        message.info(`打开流程设计器：${definition.name}`);
    };

    const editDefinition = (definition) => {
        form.setFieldsValue(definition);
        setCurrentDefinition(definition);
        message.info(`编辑流程定义：${definition.name}`);
    };

    const deployDefinition = (definition) => {
        const updatedDefinitions = processDefinitions.map(item =>
            item.id === definition.id ? { ...item, status: 'deployed' } : item
        );
        setProcessDefinitions(updatedDefinitions);
        message.success(`流程定义 "${definition.name}" 部署成功！`);
    };

    const suspendDefinition = (definition) => {
        const updatedDefinitions = processDefinitions.map(item =>
            item.id === definition.id ? { ...item, status: 'suspended' } : item
        );
        setProcessDefinitions(updatedDefinitions);
        message.warning(`流程定义 "${definition.name}" 已暂停！`);
    };

    const deleteDefinition = (id) => {
        const updatedDefinitions = processDefinitions.filter(item => item.id !== id);
        setProcessDefinitions(updatedDefinitions);
        message.success('流程定义删除成功！');
    };

    const createNewDefinition = () => {
        form.resetFields();
        setCurrentDefinition(null);
        message.info('创建新的流程定义');
    };

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        setPropertyDrawerVisible(true);
        nodeForm.setFieldsValue(node);
    };

    // 渲染流程设计器画布
    const renderDesignerCanvas = () => {
        if (!currentDefinition) return null;

        return React.createElement('div', {
            style: {
                width: '100%',
                height: '600px',
                background: '#f5f5f5',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                position: 'relative',
                overflow: 'hidden'
            }
        }, [
            // 网格背景
            React.createElement('div', {
                key: 'grid',
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
                        linear-gradient(#ccc 1px, transparent 1px),
                        linear-gradient(90deg, #ccc 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    opacity: 0.3
                }
            }),
            // 节点渲染
            ...currentDefinition.nodes.map(node =>
                React.createElement('div', {
                    key: node.id,
                    onClick: () => handleNodeClick(node),
                    style: {
                        position: 'absolute',
                        left: node.x,
                        top: node.y,
                        width: '120px',
                        height: '60px',
                        background: nodeTypes[node.type]?.color || '#d9d9d9',
                        color: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s',
                        border: selectedNode?.id === node.id ? '3px solid #1890ff' : '1px solid rgba(255,255,255,0.8)'
                    }
                }, [
                    React.createElement('div', {
                        key: 'icon',
                        style: { fontSize: '16px', marginBottom: '4px' }
                    }, nodeTypes[node.type]?.icon),
                    React.createElement('div', { key: 'name' }, node.name)
                ])
            ),
            // 工具栏
            React.createElement('div', {
                key: 'toolbar',
                style: {
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'white',
                    borderRadius: '6px',
                    padding: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }
            }, React.createElement(Space, null, [
                React.createElement(Tooltip, { key: 'start', title: '添加开始节点' },
                    React.createElement(Button, { size: 'small', icon: React.createElement('span', null, '▶️') })
                ),
                React.createElement(Tooltip, { key: 'user', title: '添加用户任务' },
                    React.createElement(Button, { size: 'small', icon: React.createElement('span', null, '👤') })
                ),
                React.createElement(Tooltip, { key: 'ai', title: '添加AI任务' },
                    React.createElement(Button, { size: 'small', icon: React.createElement('span', null, '🤖') })
                ),
                React.createElement(Tooltip, { key: 'condition', title: '添加条件判断' },
                    React.createElement(Button, { size: 'small', icon: React.createElement('span', null, '🔀') })
                ),
                React.createElement(Tooltip, { key: 'end', title: '添加结束节点' },
                    React.createElement(Button, { size: 'small', icon: React.createElement('span', null, '⏹️') })
                )
            ]))
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        // 页面标题
        React.createElement('div', { key: 'title', style: { marginBottom: '24px' } }, [
            React.createElement('h2', {
                key: 'h2',
                style: { margin: 0, color: '#1890ff' }
            }, '🎨 审批流程设计器'),
            React.createElement('p', {
                key: 'desc',
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '基于 Warm Flow 工作流引擎的可视化流程设计工具')
        ]),

        // 统计卡片
        React.createElement(Row, { key: 'stats', gutter: 16, style: { marginBottom: '24px' } }, [
            React.createElement(Col, { key: '1', span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'num',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }
                        }, processDefinitions.length),
                        React.createElement('div', { key: 'label', style: { color: '#666' } }, '流程定义总数')
                    ])
                )
            ),
            React.createElement(Col, { key: '2', span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'num',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }
                        }, processDefinitions.filter(p => p.status === 'deployed').length),
                        React.createElement('div', { key: 'label', style: { color: '#666' } }, '已部署流程')
                    ])
                )
            ),
            React.createElement(Col, { key: '3', span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'num',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }
                        }, processDefinitions.filter(p => p.status === 'draft').length),
                        React.createElement('div', { key: 'label', style: { color: '#666' } }, '草稿流程')
                    ])
                )
            ),
            React.createElement(Col, { key: '4', span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'num',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#f5222d' }
                        }, processDefinitions.filter(p => p.status === 'suspended').length),
                        React.createElement('div', { key: 'label', style: { color: '#666' } }, '暂停流程')
                    ])
                )
            )
        ]),

        // 操作按钮
        React.createElement(Card, { key: 'actions', style: { marginBottom: '16px' } },
            React.createElement(Space, null, [
                React.createElement(Button, {
                    key: 'new',
                    type: 'primary',
                    icon: React.createElement('span', null, '➕'),
                    onClick: createNewDefinition
                }, '新建流程定义'),
                React.createElement(Button, {
                    key: 'import',
                    icon: React.createElement('span', null, '📁')
                }, '导入流程定义'),
                React.createElement(Button, {
                    key: 'export',
                    icon: React.createElement('span', null, '📤')
                }, '导出流程定义'),
                React.createElement(Button, {
                    key: 'refresh',
                    icon: React.createElement('span', null, '🔄'),
                    onClick: () => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            message.success('刷新成功！');
                        }, 1000);
                    },
                    loading: loading
                }, '刷新')
            ])
        ),

        // 流程定义列表
        React.createElement(Card, { key: 'table', title: '流程定义列表' },
            React.createElement(Table, {
                columns: columns,
                dataSource: processDefinitions,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    total: processDefinitions.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
        ),

        // 流程设计器模态框
        React.createElement(Modal, {
            key: 'designer-modal',
            title: React.createElement('div', null, [
                React.createElement('span', { key: 'icon', style: { color: '#1890ff' } }, '🎨'),
                React.createElement('span', {
                    key: 'text',
                    style: { marginLeft: '8px' }
                }, `流程设计器 - ${currentDefinition?.name || ''}`)
            ]),
            visible: designerVisible,
            onCancel: () => setDesignerVisible(false),
            width: '90%',
            style: { top: 20 },
            footer: [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setDesignerVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary'
                }, '保存'),
                React.createElement(Button, {
                    key: 'deploy',
                    type: 'primary',
                    style: { background: '#52c41a', borderColor: '#52c41a' }
                }, '保存并部署')
            ]
        }, React.createElement('div', { style: { height: '70vh' } },
            React.createElement(Tabs, { defaultActiveKey: 'designer' }, [
                React.createElement(TabPane, {
                    key: 'designer',
                    tab: '🎨 可视化设计'
                }, renderDesignerCanvas()),
                React.createElement(TabPane, {
                    key: 'xml',
                    tab: '📄 XML源码'
                }, React.createElement(Input.TextArea, {
                    style: { height: '500px', fontFamily: 'Monaco, monospace' },
                    value: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <process id="${currentDefinition?.key}" name="${currentDefinition?.name}">
    <!-- 这里将显示根据可视化设计生成的 BPMN XML -->
    <startEvent id="start" name="开始" />
    <serviceTask id="ai_review" name="AI审核" />
    <userTask id="manual_review" name="人工审核" />
    <endEvent id="end" name="结束" />
    
    <sequenceFlow sourceRef="start" targetRef="ai_review" />
    <sequenceFlow sourceRef="ai_review" targetRef="manual_review" />
    <sequenceFlow sourceRef="manual_review" targetRef="end" />
  </process>
</definitions>`,
                    readOnly: true
                })),
                React.createElement(TabPane, {
                    key: 'properties',
                    tab: '⚙️ 流程属性'
                }, React.createElement(Form, { form: form, layout: 'vertical' }, [
                    React.createElement(Form.Item, {
                        key: 'key',
                        label: '流程标识',
                        name: 'key'
                    }, React.createElement(Input, { placeholder: '请输入流程标识' })),
                    React.createElement(Form.Item, {
                        key: 'name',
                        label: '流程名称',
                        name: 'name'
                    }, React.createElement(Input, { placeholder: '请输入流程名称' })),
                    React.createElement(Form.Item, {
                        key: 'description',
                        label: '流程描述',
                        name: 'description'
                    }, React.createElement(Input.TextArea, { rows: 3, placeholder: '请输入流程描述' })),
                    React.createElement(Form.Item, {
                        key: 'category',
                        label: '流程分类',
                        name: 'category'
                    }, React.createElement(Select, { placeholder: '请选择流程分类' }, [
                        React.createElement(Option, { key: 'content', value: 'content' }, '内容审核'),
                        React.createElement(Option, { key: 'exhibition', value: 'exhibition' }, '展商审核'),
                        React.createElement(Option, { key: 'special', value: 'special' }, '特殊审核')
                    ]))
                ]))
            ])
        ))
    ]);
};

// 导出组件
window.WorkflowDesigner = WorkflowDesigner; 