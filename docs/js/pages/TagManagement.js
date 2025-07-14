// 标签管理页面
const TagManagement = () => {
    const { Card, Table, Button, Modal, Form, Input, Select, Switch, Tree, Tabs, Space, message, InputNumber } = antd;
    const { Option } = Select;
    const { TabPane } = Tabs;

    const [loading, setLoading] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingTag, setEditingTag] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('work');
    const [form] = Form.useForm();

    // 模拟标签数据
    const [workTags, setWorkTags] = React.useState([
        {
            key: '1',
            id: 'T001',
            name: '技术创新',
            parentId: null,
            sort: 1,
            status: true,
            createTime: '2024-01-10 10:00:00',
            creator: '管理员',
            children: [
                {
                    key: '1-1',
                    id: 'T002',
                    name: '智能控制',
                    parentId: 'T001',
                    sort: 1,
                    status: true,
                    createTime: '2024-01-10 10:30:00',
                    creator: '管理员'
                },
                {
                    key: '1-2',
                    id: 'T003',
                    name: '信号系统',
                    parentId: 'T001',
                    sort: 2,
                    status: true,
                    createTime: '2024-01-10 11:00:00',
                    creator: '管理员'
                }
            ]
        },
        {
            key: '2',
            id: 'T004',
            name: '运营管理',
            parentId: null,
            sort: 2,
            status: true,
            createTime: '2024-01-10 14:00:00',
            creator: '管理员',
            children: [
                {
                    key: '2-1',
                    id: 'T005',
                    name: '安全管理',
                    parentId: 'T004',
                    sort: 1,
                    status: true,
                    createTime: '2024-01-10 14:30:00',
                    creator: '管理员'
                }
            ]
        }
    ]);

    const [productTags, setProductTags] = React.useState([
        {
            key: '3',
            id: 'P001',
            name: '轨道设备',
            parentId: null,
            sort: 1,
            status: true,
            createTime: '2024-01-10 15:00:00',
            creator: '会展部'
        },
        {
            key: '4',
            id: 'P002',
            name: '信号设备',
            parentId: null,
            sort: 2,
            status: true,
            createTime: '2024-01-10 15:30:00',
            creator: '会展部'
        }
    ]);

    const flattenTags = (tags) => {
        const result = [];
        const traverse = (items) => {
            items.forEach(item => {
                result.push(item);
                if (item.children) {
                    traverse(item.children);
                }
            });
        };
        traverse(tags);
        return result;
    };

    const buildTreeData = (tags) => {
        return tags.map(tag => ({
            title: tag.name,
            key: tag.key,
            children: tag.children ? buildTreeData(tag.children) : undefined
        }));
    };

    const handleAdd = () => {
        setEditingTag(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingTag(record);
        form.setFieldsValue({
            name: record.name,
            parentId: record.parentId,
            sort: record.sort
        });
        setModalVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除标签"${record.name}"吗？删除后将无法恢复。`,
            onOk() {
                message.success('删除成功');
                // 这里应该调用删除API
            }
        });
    };

    const handleToggleStatus = (record) => {
        const newStatus = !record.status;
        message.success(`${newStatus ? '启用' : '禁用'}成功`);
        // 这里应该调用状态切换API
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('提交标签数据:', values);
            message.success(editingTag ? '编辑成功' : '新增成功');
            setModalVisible(false);
            // 这里应该调用保存API
        } catch (error) {
            console.log('表单验证失败:', error);
        }
    };

    const getCurrentTags = () => {
        return activeTab === 'work' ? workTags : productTags;
    };

    const getFlatTags = () => {
        return flattenTags(getCurrentTags());
    };

    const getParentOptions = () => {
        return getFlatTags().map(tag => ({
            value: tag.id,
            label: tag.name
        }));
    };

    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: 80,
            sorter: (a, b) => a.sort - b.sort
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status, record) => React.createElement(Switch, {
                checked: status,
                onChange: () => handleToggleStatus(record)
            })
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            width: 100
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
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => handleDelete(record)
                }, '删除'),
                React.createElement(Button, {
                    key: 'add-child',
                    type: 'link',
                    size: 'small',
                    onClick: () => {
                        setEditingTag(null);
                        form.resetFields();
                        form.setFieldsValue({ parentId: record.id });
                        setModalVisible(true);
                    }
                }, '添加子标签')
            ])
        }
    ];

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('h3', { key: 'title' }, '标签管理'),
                React.createElement(Button, {
                    key: 'add',
                    type: 'primary',
                    onClick: handleAdd
                }, '新增标签')
            ]),

            React.createElement(Tabs, {
                key: 'tabs',
                activeKey: activeTab,
                onChange: setActiveTab
            }, [
                React.createElement(TabPane, {
                    key: 'work',
                    tab: '作品标签'
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
                    }, '作品标签用于平台的作品发布时选择标签使用，维护权限仅限于协会组织下的运营维护组织下的人员。'),

                    React.createElement('div', {
                        key: 'content',
                        style: { display: 'flex', gap: '24px' }
                    }, [
                        // 树形结构展示
                        React.createElement('div', {
                            key: 'tree',
                            style: { width: '300px' }
                        }, [
                            React.createElement('h4', { key: 'tree-title' }, '标签结构'),
                            React.createElement(Tree, {
                                key: 'tree-component',
                                treeData: buildTreeData(workTags),
                                defaultExpandAll: true,
                                showLine: true
                            })
                        ]),

                        // 表格展示
                        React.createElement('div', {
                            key: 'table',
                            style: { flex: 1 }
                        }, 
                            React.createElement(Table, {
                                columns,
                                dataSource: getFlatTags(),
                                loading,
                                pagination: false,
                                size: 'small'
                            })
                        )
                    ])
                ]),

                React.createElement(TabPane, {
                    key: 'product',
                    tab: '产品标签'
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
                    }, '产品标签只应用于展商在"展商中心"中维护产品信息时使用，维护权限仅限于协会组织下的会展公司组织下的员工。产品标签是作品标签的子集。'),

                    React.createElement(Table, {
                        key: 'table',
                        columns,
                        dataSource: productTags,
                        loading,
                        pagination: false
                    })
                ])
            ])
        ]),

        // 新增/编辑弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: editingTag ? '编辑标签' : '新增标签',
            open: modalVisible,
            onOk: handleModalOk,
            onCancel: () => setModalVisible(false),
            width: 600
        }, 
            React.createElement(Form, {
                form,
                layout: 'vertical',
                initialValues: {
                    sort: 1
                }
            }, [
                React.createElement(Form.Item, {
                    key: 'name',
                    name: 'name',
                    label: '标签名称',
                    rules: [
                        { required: true, message: '请输入标签名称' },
                        { max: 20, message: '标签名称不能超过20个字符' }
                    ]
                }, React.createElement(Input, { placeholder: '请输入标签名称' })),

                React.createElement(Form.Item, {
                    key: 'parentId',
                    name: 'parentId',
                    label: '上级标签'
                }, React.createElement(Select, {
                    placeholder: '请选择上级标签（可选）',
                    allowClear: true
                }, getParentOptions().map(option => 
                    React.createElement(Option, {
                        key: option.value,
                        value: option.value
                    }, option.label)
                ))),

                React.createElement(Form.Item, {
                    key: 'sort',
                    name: 'sort',
                    label: '显示排序',
                    rules: [
                        { required: true, message: '请输入排序号' }
                    ]
                }, React.createElement(InputNumber, {
                    min: 1,
                    max: 999,
                    placeholder: '数字越小越靠前'
                }))
            ])
        )
    ]);
};

// 导出组件
window.TagManagement = TagManagement; 