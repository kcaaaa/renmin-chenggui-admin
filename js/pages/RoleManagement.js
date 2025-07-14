// 角色管理组件
const RoleManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Tree, Transfer } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [roles, setRoles] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [permissionModalVisible, setPermissionModalVisible] = React.useState(false);
    const [editingRole, setEditingRole] = React.useState(null);
    const [currentRole, setCurrentRole] = React.useState(null);
    const [form] = Form.useForm();
    const [targetKeys, setTargetKeys] = React.useState([]);
    
    // 模拟角色数据
    const mockRoles = [
        { 
            id: 1, 
            name: '超级管理员', 
            code: 'super_admin',
            description: '拥有系统所有权限',
            status: 'active',
            userCount: 2,
            permissions: ['content:read', 'content:write', 'user:read', 'user:write', 'system:read', 'system:write'],
            createTime: '2024-01-01 10:00:00'
        },
        { 
            id: 2, 
            name: '内容管理员', 
            code: 'content_admin',
            description: '负责内容管理相关工作',
            status: 'active',
            userCount: 5,
            permissions: ['content:read', 'content:write', 'content:publish'],
            createTime: '2024-01-02 11:00:00'
        },
        { 
            id: 3, 
            name: '普通用户', 
            code: 'user',
            description: '普通用户角色',
            status: 'active',
            userCount: 100,
            permissions: ['content:read'],
            createTime: '2024-01-03 12:00:00'
        }
    ];
    
    // 模拟权限数据
    const mockPermissions = [
        { key: 'content:read', title: '查看内容' },
        { key: 'content:write', title: '编辑内容' },
        { key: 'content:publish', title: '发布内容' },
        { key: 'content:delete', title: '删除内容' },
        { key: 'user:read', title: '查看用户' },
        { key: 'user:write', title: '编辑用户' },
        { key: 'user:delete', title: '删除用户' },
        { key: 'system:read', title: '查看系统' },
        { key: 'system:write', title: '编辑系统' },
        { key: 'system:config', title: '系统配置' }
    ];
    
    React.useEffect(() => {
        loadRoles();
    }, []);
    
    const loadRoles = () => {
        setLoading(true);
        setTimeout(() => {
            setRoles(mockRoles);
            setLoading(false);
        }, 1000);
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
            title: '角色名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '角色代码',
            dataIndex: 'code',
            key: 'code',
            render: (code) => React.createElement('code', { style: { backgroundColor: '#f5f5f5', padding: '2px 4px' } }, code)
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '用户数量',
            dataIndex: 'userCount',
            key: 'userCount',
            render: (count) => React.createElement('span', { style: { color: '#1890ff' } }, count)
        },
        {
            title: '权限数量',
            key: 'permissionCount',
            render: (_, record) => React.createElement('span', { style: { color: '#52c41a' } }, record.permissions.length)
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
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
                    key: 'permission',
                    type: 'link',
                    size: 'small',
                    onClick: () => managePermissions(record)
                }, '权限管理'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => deleteRole(record),
                    disabled: record.code === 'super_admin'
                }, '删除')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingRole(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingRole(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const managePermissions = (record) => {
        setCurrentRole(record);
        setTargetKeys(record.permissions || []);
        setPermissionModalVisible(true);
    };
    
    const deleteRole = (record) => {
        Modal.confirm({
            title: '删除角色',
            content: `确定要删除角色 ${record.name} 吗？`,
            onOk: () => {
                message.success('删除成功');
                loadRoles();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存角色:', values);
        message.success(editingRole ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadRoles();
    };
    
    const handlePermissionChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };
    
    const savePermissions = () => {
        console.log('保存权限:', { roleId: currentRole.id, permissions: targetKeys });
        message.success('权限保存成功');
        setPermissionModalVisible(false);
        loadRoles();
    };
    
    const totalRoles = roles.length;
    const activeRoles = roles.filter(r => r.status === 'active').length;
    const totalUsers = roles.reduce((sum, r) => sum + r.userCount, 0);
    const avgPermissions = roles.length > 0 ? (roles.reduce((sum, r) => sum + r.permissions.length, 0) / roles.length).toFixed(1) : 0;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '角色管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理用户角色和权限分配')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总角色数',
                        value: totalRoles
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '启用角色',
                        value: activeRoles,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'users', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总用户数',
                        value: totalUsers,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'permissions', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均权限数',
                        value: avgPermissions,
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
            }, '新建角色'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadRoles
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '启用'),
                React.createElement(Option, { key: 'inactive', value: 'inactive' }, '禁用')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: roles,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingRole ? '编辑角色' : '新建角色',
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
                label: '角色名称',
                rules: [{ required: true, message: '请输入角色名称' }]
            }, React.createElement(Input, {
                placeholder: '请输入角色名称'
            })),
            
            React.createElement(Form.Item, {
                key: 'code',
                name: 'code',
                label: '角色代码',
                rules: [{ required: true, message: '请输入角色代码' }]
            }, React.createElement(Input, {
                placeholder: '请输入角色代码，如：content_admin'
            })),
            
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
                placeholder: '请输入角色描述'
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
        ])),
        
        React.createElement(Modal, {
            key: 'permission-modal',
            title: `${currentRole?.name} - 权限管理`,
            visible: permissionModalVisible,
            onCancel: () => setPermissionModalVisible(false),
            onOk: savePermissions,
            width: 800
        }, React.createElement(Transfer, {
            dataSource: mockPermissions,
            targetKeys: targetKeys,
            onChange: handlePermissionChange,
            render: item => item.title,
            titles: ['可选权限', '已选权限'],
            showSearch: true,
            listStyle: { width: 300, height: 400 }
        }))
    ]);
};

window.RoleManagement = RoleManagement; 