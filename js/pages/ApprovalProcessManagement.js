// 审批流程管理页面
const ApprovalProcessManagement = () => {
    const { Card, Table, Button, Modal, Form, Input, Select, Steps, Tabs, Space, message, Tag } = antd;
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { Step } = Steps;

    const [loading, setLoading] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingProcess, setEditingProcess] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('association');
    const [form] = Form.useForm();

    // 模拟协会审批流程数据
    const [associationProcesses, setAssociationProcesses] = React.useState([
        {
            key: '1',
            id: 'AP001',
            name: '协会资讯发布流程',
            type: 'association',
            contentTypes: ['news'],
            status: 'active',
            createTime: '2024-01-10 10:00:00',
            updateTime: '2024-01-15 14:30:00',
            steps: [
                { name: '内容审核员', role: 'content_reviewer', order: 1 },
                { name: '部门负责人', role: 'dept_manager', order: 2 },
                { name: '协会秘书长', role: 'association_secretary', order: 3 }
            ]
        },
        {
            key: '2',
            id: 'AP002',
            name: '协会图文发布流程',
            type: 'association',
            contentTypes: ['article'],
            status: 'active',
            createTime: '2024-01-10 11:00:00',
            updateTime: '2024-01-15 15:00:00',
            steps: [
                { name: '内容审核员', role: 'content_reviewer', order: 1 },
                { name: '部门负责人', role: 'dept_manager', order: 2 }
            ]
        }
    ]);

    // 模拟展商审批流程数据
    const [exhibitorProcesses, setExhibitorProcesses] = React.useState([
        {
            key: '3',
            id: 'EP001',
            name: '展商信息变更流程',
            type: 'exhibitor',
            contentTypes: ['exhibitor_info'],
            status: 'active',
            createTime: '2024-01-10 12:00:00',
            updateTime: '2024-01-15 16:00:00',
            steps: [
                { name: '客户经理', role: 'account_manager', order: 1 },
                { name: '部门负责人', role: 'dept_manager', order: 2 },
                { name: '项目负责人', role: 'project_manager', order: 3 },
                { name: '组委会秘书长', role: 'committee_secretary', order: 4 },
                { name: '协会秘书长', role: 'association_secretary', order: 5, type: 'cc' }
            ]
        },
        {
            key: '4',
            id: 'EP002',
            name: '展商产品发布流程',
            type: 'exhibitor',
            contentTypes: ['product'],
            status: 'active',
            createTime: '2024-01-10 13:00:00',
            updateTime: '2024-01-15 17:00:00',
            steps: [
                { name: '会展部审核员', role: 'exhibition_reviewer', order: 1 },
                { name: '会展部负责人', role: 'exhibition_manager', order: 2 }
            ]
        }
    ]);

    const handleAdd = () => {
        setEditingProcess(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingProcess(record);
        form.setFieldsValue({
            name: record.name,
            contentTypes: record.contentTypes,
            steps: record.steps
        });
        setModalVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除流程"${record.name}"吗？删除后将无法恢复。`,
            onOk() {
                message.success('删除成功');
                // 这里应该调用删除API
            }
        });
    };

    const handleToggleStatus = (record) => {
        const newStatus = record.status === 'active' ? 'inactive' : 'active';
        message.success(`${newStatus === 'active' ? '启用' : '禁用'}成功`);
        // 这里应该调用状态切换API
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('提交流程数据:', values);
            message.success(editingProcess ? '编辑成功' : '新增成功');
            setModalVisible(false);
            // 这里应该调用保存API
        } catch (error) {
            console.log('表单验证失败:', error);
        }
    };

    const getCurrentProcesses = () => {
        return activeTab === 'association' ? associationProcesses : exhibitorProcesses;
    };

    const getStatusTag = (status) => {
        return status === 'active' 
            ? React.createElement(Tag, { color: 'green' }, '启用')
            : React.createElement(Tag, { color: 'red' }, '禁用');
    };

    const getContentTypeText = (types) => {
        const typeMap = {
            'news': '资讯',
            'article': '图文', 
            'video': '视频',
            'exhibitor_info': '展商信息',
            'product': '产品信息',
            'activity': '活动信息'
        };
        return types.map(type => typeMap[type] || type).join('、');
    };

    const renderSteps = (steps) => {
        return React.createElement('div', { style: { maxWidth: '400px' } },
            React.createElement(Steps, {
                direction: 'vertical',
                size: 'small',
                current: -1
            }, steps.map((step, index) => 
                React.createElement(Step, {
                    key: index,
                    title: step.name,
                    description: step.type === 'cc' ? '(抄送)' : `第${step.order}步`
                })
            ))
        );
    };

    const columns = [
        {
            title: '流程名称',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: '适用内容类型',
            dataIndex: 'contentTypes',
            key: 'contentTypes',
            width: 150,
            render: getContentTypeText
        },
        {
            title: '审批步骤',
            dataIndex: 'steps',
            key: 'steps',
            width: 300,
            render: renderSteps
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: getStatusTag
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
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'toggle',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleToggleStatus(record)
                }, record.status === 'active' ? '禁用' : '启用'),
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

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('h3', { key: 'title' }, '审批流程管理'),
                React.createElement(Button, {
                    key: 'add',
                    type: 'primary',
                    onClick: handleAdd
                }, '新增流程')
            ]),

            React.createElement(Tabs, {
                key: 'tabs',
                activeKey: activeTab,
                onChange: setActiveTab
            }, [
                React.createElement(TabPane, {
                    key: 'association',
                    tab: '协会审批流程'
                }, [
                    React.createElement('div', {
                        key: 'description',
                        style: { 
                            padding: '12px', 
                            background: '#f6ffed', 
                            border: '1px solid #b7eb8f',
                            borderRadius: '4px',
                            marginBottom: '16px'
                        }
                    }, '协会审批流程用于协会用户因公发布的内容审核，支持自动划分审批节点和审批人。审批通过后，内容将发布到协会板块。'),

                    React.createElement(Table, {
                        key: 'table',
                        columns,
                        dataSource: associationProcesses,
                        loading,
                        pagination: false
                    })
                ]),

                React.createElement(TabPane, {
                    key: 'exhibitor',
                    tab: '展商审批流程'
                }, [
                    React.createElement('div', {
                        key: 'description',
                        style: { 
                            padding: '12px', 
                            background: '#fff7e6', 
                            border: '1px solid #ffd591',
                            borderRadius: '4px',
                            marginBottom: '16px'
                        }
                    }, '展商审批流程用于展商信息调整、展商产品发布及调整、展商活动报备等，根据展商组织结构划分不同审批流程。'),

                    React.createElement(Table, {
                        key: 'table',
                        columns,
                        dataSource: exhibitorProcesses,
                        loading,
                        pagination: false
                    })
                ])
            ])
        ]),

        // 新增/编辑弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: editingProcess ? '编辑审批流程' : '新增审批流程',
            open: modalVisible,
            onOk: handleModalOk,
            onCancel: () => setModalVisible(false),
            width: 800
        }, 
            React.createElement(Form, {
                form,
                layout: 'vertical'
            }, [
                React.createElement(Form.Item, {
                    key: 'name',
                    name: 'name',
                    label: '流程名称',
                    rules: [
                        { required: true, message: '请输入流程名称' },
                        { max: 50, message: '流程名称不能超过50个字符' }
                    ]
                }, React.createElement(Input, { placeholder: '请输入流程名称' })),

                React.createElement(Form.Item, {
                    key: 'contentTypes',
                    name: 'contentTypes',
                    label: '适用内容类型',
                    rules: [
                        { required: true, message: '请选择适用内容类型' }
                    ]
                }, React.createElement(Select, {
                    mode: 'multiple',
                    placeholder: '请选择适用内容类型'
                }, [
                    activeTab === 'association' ? [
                        React.createElement(Option, { key: 'news', value: 'news' }, '资讯'),
                        React.createElement(Option, { key: 'article', value: 'article' }, '图文'),
                        React.createElement(Option, { key: 'video', value: 'video' }, '视频')
                    ] : [
                        React.createElement(Option, { key: 'exhibitor_info', value: 'exhibitor_info' }, '展商信息'),
                        React.createElement(Option, { key: 'product', value: 'product' }, '产品信息'),
                        React.createElement(Option, { key: 'activity', value: 'activity' }, '活动信息')
                    ]
                ])),

                React.createElement(Form.Item, {
                    key: 'steps',
                    label: '审批步骤配置'
                }, 
                    React.createElement('div', {
                        style: { 
                            padding: '16px', 
                            border: '1px solid #d9d9d9', 
                            borderRadius: '4px',
                            background: '#fafafa'
                        }
                    }, '审批步骤配置功能开发中，将支持拖拽排序、角色选择等功能。')
                )
            ])
        )
    ]);
};

// 导出组件
window.ApprovalProcessManagement = ApprovalProcessManagement; 