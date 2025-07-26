// 审批流程设计器 - 基于 Warm Flow 概念的可视化流程设计
console.log('🔧 正在加载 WorkflowDesigner 组件...');

const WorkflowDesigner = () => {
    console.log('🎨 WorkflowDesigner 组件开始渲染...');
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
            updateTime: '2024-01-15 14:30:00'
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
            updateTime: '2024-01-14 09:30:00'
        }
    ];

    React.useEffect(() => {
        setProcessDefinitions(mockProcessDefinitions);
    }, []);

    // 流程定义表格列配置
    const columns = [
        {
            title: '流程标识',
            dataIndex: 'key',
            key: 'key',
            width: 180
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
            render: (_, record) => {
                return React.createElement(Space, { size: "small" },
                    React.createElement(Button, {
                        type: "link",
                        size: "small",
                        onClick: () => openDesigner(record),
                        icon: React.createElement('span', null, '🎨')
                    }, '设计'),
                    React.createElement(Button, {
                        type: "link",
                        size: "small",
                        onClick: () => editDefinition(record),
                        icon: React.createElement('span', null, '✏️')
                    }, '编辑'),
                    React.createElement(Button, {
                        type: "link",
                        size: "small",
                        onClick: () => deleteDefinition(record.id),
                        danger: true,
                        icon: React.createElement('span', null, '🗑️')
                    }, '删除')
                );
            }
        }
    ];

    // 打开流程设计器
    const openDesigner = (definition) => {
        setCurrentDefinition(definition);
        setDesignerVisible(true);
        message.info(`打开流程设计器：${definition.name}`);
    };

    // 编辑流程定义
    const editDefinition = (definition) => {
        form.setFieldsValue(definition);
        setCurrentDefinition(definition);
        message.info(`编辑流程定义：${definition.name}`);
    };

    // 删除流程定义
    const deleteDefinition = (id) => {
        const updatedDefinitions = processDefinitions.filter(item => item.id !== id);
        setProcessDefinitions(updatedDefinitions);
        message.success('流程定义删除成功！');
    };

    // 创建新流程定义
    const createNewDefinition = () => {
        form.resetFields();
        setCurrentDefinition(null);
        message.info('创建新的流程定义');
    };

    return React.createElement('div', { style: { padding: '24px' } },
        // 页面标题
        React.createElement('div', { style: { marginBottom: '24px' } },
            React.createElement('h2', { style: { margin: 0, color: '#1890ff' } },
                '🎨 审批流程设计器'
            ),
            React.createElement('p', { style: { margin: '8px 0 0 0', color: '#666' } },
                '基于 Warm Flow 工作流引擎的可视化流程设计工具'
            )
        ),

        // 统计卡片
        React.createElement(Row, { gutter: 16, style: { marginBottom: '24px' } },
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '24px', fontWeight: 'bold', color: '#1890ff' } },
                            processDefinitions.length
                        ),
                        React.createElement('div', { style: { color: '#666' } }, '流程定义总数')
                    )
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '24px', fontWeight: 'bold', color: '#52c41a' } },
                            processDefinitions.filter(p => p.status === 'deployed').length
                        ),
                        React.createElement('div', { style: { color: '#666' } }, '已部署流程')
                    )
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' } },
                            processDefinitions.filter(p => p.status === 'draft').length
                        ),
                        React.createElement('div', { style: { color: '#666' } }, '草稿流程')
                    )
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '24px', fontWeight: 'bold', color: '#f5222d' } },
                            processDefinitions.filter(p => p.status === 'suspended').length
                        ),
                        React.createElement('div', { style: { color: '#666' } }, '暂停流程')
                    )
                )
            )
        ),

        // 操作按钮
        React.createElement(Card, { style: { marginBottom: '16px' } },
            React.createElement(Space, null,
                React.createElement(Button, {
                    type: "primary",
                    icon: React.createElement('span', null, '➕'),
                    onClick: createNewDefinition
                }, '新建流程定义'),
                React.createElement(Button, {
                    icon: React.createElement('span', null, '📁')
                }, '导入流程定义'),
                React.createElement(Button, {
                    icon: React.createElement('span', null, '📤')
                }, '导出流程定义'),
                React.createElement(Button, {
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
            )
        ),

        // 流程定义列表
        React.createElement(Card, { title: '流程定义列表' },
            React.createElement(Table, {
                columns: columns,
                dataSource: processDefinitions,
                rowKey: "id",
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
            title: React.createElement('div', null,
                React.createElement('span', { style: { color: '#1890ff' } }, '🎨'),
                React.createElement('span', { style: { marginLeft: '8px' } },
                    '流程设计器 - ', currentDefinition?.name
                )
            ),
            visible: designerVisible,
            onCancel: () => setDesignerVisible(false),
            width: "90%",
            style: { top: 20 },
            footer: [
                React.createElement(Button, { key: "cancel", onClick: () => setDesignerVisible(false) }, '取消'),
                React.createElement(Button, { key: "save", type: "primary" }, '保存'),
                React.createElement(Button, { key: "deploy", type: "primary", style: { background: '#52c41a', borderColor: '#52c41a' } }, '保存并部署')
            ]
        },
            React.createElement('div', { style: { height: '70vh', textAlign: 'center', padding: '50px' } },
                React.createElement('h3', null, '🎨 可视化流程设计器'),
                React.createElement('p', { style: { color: '#666', marginBottom: '20px' } }, '这里将显示流程设计画布'),
                React.createElement('div', { 
                    style: { 
                        height: '400px', 
                        background: '#f5f5f5', 
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        border: '2px dashed #d9d9d9'
                    }
                }, '流程设计画布区域 - 支持拖拽节点、连线等操作')
            )
        )
    );
};

// 导出组件
console.log('✅ WorkflowDesigner 组件准备导出到 window 对象...');
window.WorkflowDesigner = WorkflowDesigner;
console.log('✅ WorkflowDesigner 组件已成功注册到 window 对象'); 