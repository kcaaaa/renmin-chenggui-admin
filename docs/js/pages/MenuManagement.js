// 菜单管理组件
const MenuManagement = () => {
    const { Card, Table, Button, Tag, Space, message, Modal, Form, Input, Select, Switch, Tree, InputNumber } = antd;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [menus, setMenus] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingMenu, setEditingMenu] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟菜单数据
    const mockMenus = [
        { 
            id: 1, 
            name: '内容管理', 
            path: '/content', 
            icon: 'FileTextOutlined',
            parentId: null,
            level: 1,
            sort: 1,
            status: 'active',
            permissions: ['content:read', 'content:write'],
            children: [
                { id: 11, name: '内容发布', path: '/content/publish', parentId: 1, level: 2, sort: 1, status: 'active' },
                { id: 12, name: '内容审核', path: '/content/review', parentId: 1, level: 2, sort: 2, status: 'active' },
                { id: 13, name: '标签管理', path: '/content/tags', parentId: 1, level: 2, sort: 3, status: 'active' }
            ]
        },
        { 
            id: 2, 
            name: '用户管理', 
            path: '/user', 
            icon: 'UserOutlined',
            parentId: null,
            level: 1,
            sort: 2,
            status: 'active',
            permissions: ['user:read', 'user:write'],
            children: [
                { id: 21, name: '用户列表', path: '/user/list', parentId: 2, level: 2, sort: 1, status: 'active' },
                { id: 22, name: '角色管理', path: '/user/roles', parentId: 2, level: 2, sort: 2, status: 'active' }
            ]
        },
        { 
            id: 3, 
            name: '系统设置', 
            path: '/system', 
            icon: 'SettingOutlined',
            parentId: null,
            level: 1,
            sort: 3,
            status: 'active',
            permissions: ['system:read', 'system:write'],
            children: [
                { id: 31, name: '菜单管理', path: '/system/menu', parentId: 3, level: 2, sort: 1, status: 'active' },
                { id: 32, name: '权限管理', path: '/system/permission', parentId: 3, level: 2, sort: 2, status: 'active' }
            ]
        }
    ];
    
    React.useEffect(() => {
        loadMenus();
    }, []);
    
    const loadMenus = () => {
        setLoading(true);
        setTimeout(() => {
            setMenus(mockMenus);
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
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => React.createElement('div', {
                style: { paddingLeft: `${(record.level - 1) * 20}px` }
            }, [
                record.level > 1 && React.createElement('span', { 
                    key: 'prefix', 
                    style: { color: '#ccc', marginRight: '8px' } 
                }, '├─'),
                React.createElement('span', { key: 'name' }, name)
            ])
        },
        {
            title: '路径',
            dataIndex: 'path',
            key: 'path'
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon) => icon || '-'
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '权限',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions) => permissions ? permissions.map(perm => 
                React.createElement(Tag, { key: perm, size: 'small' }, perm)
            ) : '-'
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
                    onClick: () => addChild(record)
                }, '添加子菜单'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => deleteMenu(record)
                }, '删除')
            ])
        }
    ];
    
    // 将树形数据转换为表格数据
    const flattenMenus = (menus) => {
        const result = [];
        const traverse = (items) => {
            items.forEach(item => {
                result.push(item);
                if (item.children && item.children.length > 0) {
                    traverse(item.children);
                }
            });
        };
        traverse(menus);
        return result;
    };
    
    const handleAdd = () => {
        setEditingMenu(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingMenu(record);
        form.setFieldsValue({
            ...record,
            permissions: record.permissions || []
        });
        setModalVisible(true);
    };
    
    const addChild = (parent) => {
        setEditingMenu(null);
        form.resetFields();
        form.setFieldsValue({
            parentId: parent.id,
            level: parent.level + 1
        });
        setModalVisible(true);
    };
    
    const deleteMenu = (record) => {
        Modal.confirm({
            title: '删除菜单',
            content: `确定要删除菜单 ${record.name} 吗？`,
            onOk: () => {
                message.success('删除成功');
                loadMenus();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存菜单:', values);
        message.success(editingMenu ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadMenus();
    };
    
    const flatMenus = flattenMenus(menus);
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '菜单管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理系统菜单结构和权限配置')
        ]),
        
        React.createElement(Card, {
            key: 'actions',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(Button, {
                key: 'add',
                type: 'primary',
                onClick: handleAdd
            }, '新建菜单'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadMenus
            }, '刷新'),
            React.createElement(Button, {
                key: 'expand',
                onClick: () => message.info('展开/收起功能')
            }, '展开/收起')
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: flatMenus,
            rowKey: 'id',
            loading: loading,
            pagination: false,
            defaultExpandAllRows: true
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingMenu ? '编辑菜单' : '新建菜单',
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
                label: '菜单名称',
                rules: [{ required: true, message: '请输入菜单名称' }]
            }, React.createElement(Input, {
                placeholder: '请输入菜单名称'
            })),
            
            React.createElement(Form.Item, {
                key: 'path',
                name: 'path',
                label: '菜单路径',
                rules: [{ required: true, message: '请输入菜单路径' }]
            }, React.createElement(Input, {
                placeholder: '请输入菜单路径，如：/content/list'
            })),
            
            React.createElement(Form.Item, {
                key: 'icon',
                name: 'icon',
                label: '菜单图标'
            }, React.createElement(Input, {
                placeholder: '请输入图标名称，如：FileTextOutlined'
            })),
            
            React.createElement(Form.Item, {
                key: 'sort',
                name: 'sort',
                label: '排序',
                rules: [{ required: true, message: '请输入排序值' }]
            }, React.createElement(InputNumber, {
                style: { width: '100%' },
                placeholder: '请输入排序值'
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
                key: 'permissions',
                name: 'permissions',
                label: '权限标识'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入权限标识，如：content:read'
            })),
            
            React.createElement(Form.Item, {
                key: 'parentId',
                name: 'parentId',
                label: '父菜单',
                style: { display: 'none' }
            }, React.createElement(Input, {
                type: 'hidden'
            })),
            
            React.createElement(Form.Item, {
                key: 'level',
                name: 'level',
                label: '层级',
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

window.MenuManagement = MenuManagement; 