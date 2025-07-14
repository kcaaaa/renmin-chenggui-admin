// 权限管理组件
const PermissionManagement = () => {
    const { Card, Table, Button, Tag, Space, message, Modal, Form, Input, Select, Tree, Switch } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [permissions, setPermissions] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingPermission, setEditingPermission] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟权限数据
    const mockPermissions = [
        { 
            id: 1, 
            name: '内容管理', 
            code: 'content',
            type: 'module',
            description: '内容管理模块权限',
            status: 'active',
            parentId: null,
            children: [
                { id: 11, name: '查看内容', code: 'content:read', type: 'action', parentId: 1, status: 'active' },
                { id: 12, name: '创建内容', code: 'content:create', type: 'action', parentId: 1, status: 'active' },
                { id: 13, name: '编辑内容', code: 'content:update', type: 'action', parentId: 1, status: 'active' },
                { id: 14, name: '删除内容', code: 'content:delete', type: 'action', parentId: 1, status: 'active' }
            ]
        },
        { 
            id: 2, 
            name: '用户管理', 
            code: 'user',
            type: 'module',
            description: '用户管理模块权限',
            status: 'active',
            parentId: null,
            children: [
                { id: 21, name: '查看用户', code: 'user:read', type: 'action', parentId: 2, status: 'active' },
                { id: 22, name: '创建用户', code: 'user:create', type: 'action', parentId: 2, status: 'active' },
                { id: 23, name: '编辑用户', code: 'user:update', type: 'action', parentId: 2, status: 'active' },
                { id: 24, name: '删除用户', code: 'user:delete', type: 'action', parentId: 2, status: 'active' }
            ]
        },
        { 
            id: 3, 
            name: '系统管理', 
            code: 'system',
            type: 'module',
            description: '系统管理模块权限',
            status: 'active',
            parentId: null,
            children: [
                { id: 31, name: '菜单管理', code: 'system:menu', type: 'action', parentId: 3, status: 'active' },
                { id: 32, name: '角色管理', code: 'system:role', type: 'action', parentId: 3, status: 'active' },
                { id: 33, name: '权限管理', code: 'system:permission', type: 'action', parentId: 3, status: 'active' }
            ]
        }
    ];
    
    React.useEffect(() => {
        loadPermissions();
    }, []);
    
    const loadPermissions = () => {
        setLoading(true);
        setTimeout(() => {
            setPermissions(mockPermissions);
            setLoading(false);
        }, 1000);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'module': { color: 'blue', text: '模块' },
            'action': { color: 'green', text: '操作' },
            'data': { color: 'orange', text: '数据' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '启用' },
            'inactive': { color: 'default', text: '禁用' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '权限名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => React.createElement('div', {
                style: { paddingLeft: `${record.parentId ? 20 : 0}px` }
            }, [
                record.parentId && React.createElement('span', { 
                    key: 'prefix', 
                    style: { color: '#ccc', marginRight: '8px' } 
                }, '├─'),
                React.createElement('span', { key: 'name' }, name)
            ])
        },
        {
            title: '权限代码',
            dataIndex: 'code',
            key: 'code',
            render: (code) => React.createElement('code', { style: { backgroundColor: '#f5f5f5', padding: '2px 4px' } }, code)
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            render: (desc) => desc || '-'
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
                    key: 'add-child',
                    type: 'link',
                    size: 'small',
                    onClick: () => addChild(record),
                    disabled: record.type === 'action'
                }, '添加子权限'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => deletePermission(record)
                }, '删除')
            ])
        }
    ];
    
    // 将树形数据转换为表格数据
    const flattenPermissions = (permissions) => {
        const result = [];
        const traverse = (items) => {
            items.forEach(item => {
                result.push(item);
                if (item.children && item.children.length > 0) {
                    traverse(item.children);
                }
            });
        };
        traverse(permissions);
        return result;
    };
    
    const handleAdd = () => {
        setEditingPermission(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingPermission(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const addChild = (parent) => {
        setEditingPermission(null);
        form.resetFields();
        form.setFieldsValue({
            parentId: parent.id,
            type: 'action'
        });
        setModalVisible(true);
    };
    
    const deletePermission = (record) => {
        Modal.confirm({
            title: '删除权限',
            content: `确定要删除权限 ${record.name} 吗？`,
            onOk: () => {
                message.success('删除成功');
                loadPermissions();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存权限:', values);
        message.success(editingPermission ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadPermissions();
    };
    
    const flatPermissions = flattenPermissions(permissions);
    const totalPermissions = flatPermissions.length;
    const moduleCount = flatPermissions.filter(p => p.type === 'module').length;
    const actionCount = flatPermissions.filter(p => p.type === 'action').length;
    const activeCount = flatPermissions.filter(p => p.status === 'active').length;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '权限管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理系统权限和访问控制')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总权限数',
                        value: totalPermissions
                    })
                )
            ),
            React.createElement(Col, { key: 'module', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '模块权限',
                        value: moduleCount,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'action', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '操作权限',
                        value: actionCount,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已启用',
                        value: activeCount,
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
            }, '新建权限'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadPermissions
            }, '刷新'),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'module', value: 'module' }, '模块'),
                React.createElement(Option, { key: 'action', value: 'action' }, '操作'),
                React.createElement(Option, { key: 'data', value: 'data' }, '数据')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: flatPermissions,
            rowKey: 'id',
            loading: loading,
            pagination: false,
            defaultExpandAllRows: true
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingPermission ? '编辑权限' : '新建权限',
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
                label: '权限名称',
                rules: [{ required: true, message: '请输入权限名称' }]
            }, React.createElement(Input, {
                placeholder: '请输入权限名称'
            })),
            
            React.createElement(Form.Item, {
                key: 'code',
                name: 'code',
                label: '权限代码',
                rules: [{ required: true, message: '请输入权限代码' }]
            }, React.createElement(Input, {
                placeholder: '请输入权限代码，如：content:read'
            })),
            
            React.createElement(Form.Item, {
                key: 'type',
                name: 'type',
                label: '权限类型',
                rules: [{ required: true, message: '请选择权限类型' }]
            }, React.createElement(Select, {
                placeholder: '请选择权限类型'
            }, [
                React.createElement(Option, { key: 'module', value: 'module' }, '模块'),
                React.createElement(Option, { key: 'action', value: 'action' }, '操作'),
                React.createElement(Option, { key: 'data', value: 'data' }, '数据')
            ])),
            
            React.createElement(Form.Item, {
                key: 'status',
                name: 'status',
                label: '状态',
                rules: [{ required: true, message: '请选择状态' }]
            }, React.createElement(Select, {
                placeholder: '请选择状态'
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '启用'),
                React.createElement(Option, { key: 'inactive', value: 'inactive' }, '禁用')
            ])),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '描述'
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入权限描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'parentId',
                name: 'parentId',
                label: '父权限',
                style: { display: 'none' }
            }, React.createElement(Input, {
                type: 'hidden'
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

window.PermissionManagement = PermissionManagement; 