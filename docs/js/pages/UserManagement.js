console.log('🔧 UserManagement.js 加载中... - 文档7.1版本');

// 用户管理模块 - 基于文档7.1功能设计
const UserManagement = () => {
    const { 
        Card, Table, Button, Input, Space, Tag, Modal, Form, Select, 
        Tree, Row, Col, Dropdown, Menu, Checkbox, Divider, DatePicker,
        Tabs, Statistic, Badge, Tooltip, message, Popconfirm, Transfer,
        TreeSelect, Radio, Switch, Upload, Avatar, Progress
    } = antd;
    
    const { Search } = Input;
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { RangePicker } = DatePicker;

    // 状态管理
    const [users, setUsers] = React.useState([]);
    const [filteredUsers, setFilteredUsers] = React.useState([]);
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('all');
    
    // 弹窗状态
    const [userModalVisible, setUserModalVisible] = React.useState(false);
    const [batchTransferVisible, setBatchTransferVisible] = React.useState(false);
    const [permissionModalVisible, setPermissionModalVisible] = React.useState(false);
    const [resetPasswordVisible, setResetPasswordVisible] = React.useState(false);
    
    // 当前操作的用户
    const [currentUser, setCurrentUser] = React.useState(null);
    const [editingUser, setEditingUser] = React.useState(null);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [selectedOrg, setSelectedOrg] = React.useState(null);
    const [selectedUserType, setSelectedUserType] = React.useState('all');
    const [selectedStatus, setSelectedStatus] = React.useState('all');

    // 模拟组织结构数据
    const organizationTree = [
        {
            key: 'org-1',
            title: '人民城轨协会',
            value: 'org-1',
            children: [
                {
                    key: 'org-1-1',
                    title: '运营管理部',
                    value: 'org-1-1',
                    children: [
                        { key: 'org-1-1-1', title: '运营一科', value: 'org-1-1-1' },
                        { key: 'org-1-1-2', title: '运营二科', value: 'org-1-1-2' }
                    ]
                },
                {
                    key: 'org-1-2',
                    title: '技术支持部',
                    value: 'org-1-2',
                    children: [
                        { key: 'org-1-2-1', title: '技术一科', value: 'org-1-2-1' },
                        { key: 'org-1-2-2', title: '技术二科', value: 'org-1-2-2' }
                    ]
                }
            ]
        },
        {
            key: 'org-2',
            title: '展商企业',
            value: 'org-2',
            children: [
                { key: 'org-2-1', title: '科技公司A', value: 'org-2-1' },
                { key: 'org-2-2', title: '制造企业B', value: 'org-2-2' },
                { key: 'org-2-3', title: '服务商C', value: 'org-2-3' }
            ]
        },
        {
            key: 'org-3',
            title: '普通用户组',
            value: 'org-3',
            children: [
                { key: 'org-3-1', title: '个人用户', value: 'org-3-1' },
                { key: 'org-3-2', title: '观众用户', value: 'org-3-2' }
            ]
        }
    ];

    // 模拟用户数据生成
    const generateMockUsers = () => {
        const userTypes = ['协会用户', '展商用户', '普通用户'];
        const organizations = ['人民城轨协会', '运营管理部', '技术支持部', '科技公司A', '制造企业B', '服务商C', '个人用户', '观众用户'];
        const statuses = ['启用', '禁用', '待审核'];
        const roles = {
            '协会用户': ['管理员', '运营专员', '技术专员', '审核员'],
            '展商用户': ['展商管理员', '展商操作员', '展位负责人'],
            '普通用户': ['注册用户', '访客用户']
        };

        const mockUsers = [];
        for (let i = 1; i <= 50; i++) {
            const userType = userTypes[Math.floor(Math.random() * userTypes.length)];
            const org = organizations[Math.floor(Math.random() * organizations.length)];
            const roleList = roles[userType];
            const role = roleList[Math.floor(Math.random() * roleList.length)];
            
            mockUsers.push({
                id: i,
                username: `user${i.toString().padStart(3, '0')}`,
                realName: `用户${i}`,
                email: `user${i}@example.com`,
                phone: `138${(Math.floor(Math.random() * 90000000) + 10000000).toString()}`,
                userType,
                organization: org,
                orgPath: getOrgPath(org),
                role,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                loginCount: Math.floor(Math.random() * 100),
                lastLoginTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
                createTime: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
                avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
                permissions: generateRandomPermissions(userType),
                remark: i % 5 === 0 ? `备注信息${i}` : ''
            });
        }
        return mockUsers;
    };

    // 获取组织路径
    const getOrgPath = (orgName) => {
        const pathMap = {
            '人民城轨协会': ['人民城轨协会'],
            '运营管理部': ['人民城轨协会', '运营管理部'],
            '技术支持部': ['人民城轨协会', '技术支持部'],
            '科技公司A': ['展商企业', '科技公司A'],
            '制造企业B': ['展商企业', '制造企业B'],
            '服务商C': ['展商企业', '服务商C'],
            '个人用户': ['普通用户组', '个人用户'],
            '观众用户': ['普通用户组', '观众用户']
        };
        return pathMap[orgName] || [orgName];
    };

    // 生成随机权限
    const generateRandomPermissions = (userType) => {
        const allPermissions = [
            'user:read', 'user:write', 'user:delete',
            'content:read', 'content:write', 'content:publish',
            'exhibition:read', 'exhibition:write', 'exhibition:manage',
            'system:config', 'system:log', 'system:backup'
        ];
        
        const permissionsByType = {
            '协会用户': allPermissions,
            '展商用户': ['user:read', 'content:read', 'content:write', 'exhibition:read', 'exhibition:write'],
            '普通用户': ['user:read', 'content:read', 'exhibition:read']
        };
        
        const availablePermissions = permissionsByType[userType] || [];
        return availablePermissions.filter(() => Math.random() > 0.3);
    };

    // 初始化数据
    React.useEffect(() => {
        const mockUsers = generateMockUsers();
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
    }, []);

    // 筛选用户
    React.useEffect(() => {
        let filtered = users;

        // 按用户类型筛选
        if (activeTab !== 'all') {
            const typeMap = {
                'association': '协会用户',
                'exhibitor': '展商用户',
                'regular': '普通用户'
            };
            filtered = filtered.filter(user => user.userType === typeMap[activeTab]);
        }

        // 按搜索文本筛选
        if (searchText) {
            filtered = filtered.filter(user => 
                user.username.toLowerCase().includes(searchText.toLowerCase()) ||
                user.realName.includes(searchText) ||
                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                user.phone.includes(searchText)
            );
        }

        // 按组织筛选
        if (selectedOrg) {
            filtered = filtered.filter(user => user.organization === selectedOrg);
        }

        // 按状态筛选
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(user => user.status === selectedStatus);
        }

        setFilteredUsers(filtered);
    }, [users, activeTab, searchText, selectedOrg, selectedStatus]);

    // 获取统计数据
    const getStatistics = () => {
        return {
            total: users.length,
            association: users.filter(u => u.userType === '协会用户').length,
            exhibitor: users.filter(u => u.userType === '展商用户').length,
            regular: users.filter(u => u.userType === '普通用户').length,
            active: users.filter(u => u.status === '启用').length,
            disabled: users.filter(u => u.status === '禁用').length,
            pending: users.filter(u => u.status === '待审核').length
        };
    };

    const statistics = getStatistics();

    // 表格列配置
    const columns = [
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 60,
            render: (avatar, record) => React.createElement(Avatar, {
                src: avatar,
                size: 40,
                style: { backgroundColor: '#1890ff' }
            }, record.realName?.[0] || 'U')
        },
        {
            title: '用户信息',
            key: 'userInfo',
            width: 200,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'name',
                    style: { fontWeight: 'bold', marginBottom: '4px' }
                }, record.realName),
                React.createElement('div', { 
                    key: 'username',
                    style: { color: '#666', fontSize: '12px' }
                }, `@${record.username}`),
                React.createElement('div', { 
                    key: 'contact',
                    style: { color: '#999', fontSize: '12px' }
                }, record.email)
            ])
        },
        {
            title: '用户类型',
            dataIndex: 'userType',
            key: 'userType',
            width: 100,
            render: (userType) => {
                const colorMap = {
                    '协会用户': 'blue',
                    '展商用户': 'green',
                    '普通用户': 'orange'
                };
                return React.createElement(Tag, { 
                    color: colorMap[userType] 
                }, userType);
            }
        },
        {
            title: '所属组织',
            key: 'organization',
            width: 200,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'org',
                    style: { fontWeight: '500' }
                }, record.organization),
                React.createElement('div', { 
                    key: 'path',
                    style: { color: '#999', fontSize: '12px' }
                }, record.orgPath.join(' > '))
            ])
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            width: 120,
            render: (role) => React.createElement(Tag, { 
                color: 'cyan' 
            }, role)
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: (status) => {
                const statusConfig = {
                    '启用': { color: 'success', text: '启用' },
                    '禁用': { color: 'error', text: '禁用' },
                    '待审核': { color: 'warning', text: '待审核' }
                };
                const config = statusConfig[status];
                return React.createElement(Badge, { 
                    status: config.color, 
                    text: config.text 
                });
            }
        },
        {
            title: '登录统计',
            key: 'loginStats',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'count',
                    style: { fontSize: '12px' }
                }, `登录${record.loginCount}次`),
                React.createElement('div', { 
                    key: 'last',
                    style: { color: '#999', fontSize: '11px' }
                }, `最后: ${new Date(record.lastLoginTime).toLocaleDateString()}`)
            ])
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => {
                const menu = React.createElement(Menu, {
                    items: [
                        {
                            key: 'edit',
                            label: '编辑用户',
                            icon: React.createElement('span', {}, '✏️'),
                            onClick: () => handleEditUser(record)
                        },
                        {
                            key: 'permission',
                            label: '权限设置',
                            icon: React.createElement('span', {}, '🔐'),
                            onClick: () => handleSetPermissions(record)
                        },
                        {
                            key: 'reset',
                            label: '重置密码',
                            icon: React.createElement('span', {}, '🔑'),
                            onClick: () => handleResetPassword(record)
                        },
                        {
                            key: 'transfer',
                            label: '转移组织',
                            icon: React.createElement('span', {}, '📁'),
                            onClick: () => handleTransferOrg(record)
                        },
                        { type: 'divider' },
                        {
                            key: 'toggle',
                            label: record.status === '启用' ? '禁用用户' : '启用用户',
                            icon: React.createElement('span', {}, record.status === '启用' ? '❌' : '✅'),
                            onClick: () => handleToggleStatus(record)
                        },
                        {
                            key: 'delete',
                            label: '删除用户',
                            icon: React.createElement('span', {}, '🗑️'),
                            danger: true,
                            onClick: () => handleDeleteUser(record)
                        }
                    ]
                });

                return React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'edit',
                        type: 'link',
                        size: 'small',
                        onClick: () => handleEditUser(record)
                    }, '编辑'),
                    React.createElement(Dropdown, {
                        key: 'more',
                        overlay: menu,
                        trigger: ['click']
                    }, React.createElement(Button, {
                        type: 'link',
                        size: 'small'
                    }, '更多'))
                ]);
            }
        }
    ];

    // 批量操作菜单
    const batchMenu = React.createElement(Menu, {
        items: [
            {
                key: 'enable',
                label: '批量启用',
                icon: React.createElement('span', {}, '✅'),
                onClick: () => handleBatchOperation('enable')
            },
            {
                key: 'disable',
                label: '批量禁用',
                icon: React.createElement('span', {}, '❌'),
                onClick: () => handleBatchOperation('disable')
            },
            {
                key: 'transfer',
                label: '批量转移',
                icon: React.createElement('span', {}, '📁'),
                onClick: () => setBatchTransferVisible(true)
            },
            {
                key: 'reset',
                label: '批量重置密码',
                icon: React.createElement('span', {}, '🔑'),
                onClick: () => handleBatchOperation('resetPassword')
            },
            { type: 'divider' },
            {
                key: 'export',
                label: '导出选中',
                icon: React.createElement('span', {}, '📤'),
                onClick: () => handleExportUsers()
            },
            {
                key: 'delete',
                label: '批量删除',
                icon: React.createElement('span', {}, '🗑️'),
                danger: true,
                onClick: () => handleBatchOperation('delete')
            }
        ]
    });

    // 事件处理函数
    const handleAddUser = () => {
        setEditingUser(null);
        setUserModalVisible(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setUserModalVisible(true);
    };

    const handleDeleteUser = (user) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除用户 "${user.realName}" 吗？此操作不可恢复。`,
            onOk: () => {
                const newUsers = users.filter(u => u.id !== user.id);
                setUsers(newUsers);
                message.success('用户删除成功');
            }
        });
    };

    const handleToggleStatus = (user) => {
        const newStatus = user.status === '启用' ? '禁用' : '启用';
        const newUsers = users.map(u => 
            u.id === user.id ? { ...u, status: newStatus } : u
        );
        setUsers(newUsers);
        message.success(`用户已${newStatus}`);
    };

    const handleSetPermissions = (user) => {
        setCurrentUser(user);
        setPermissionModalVisible(true);
    };

    const handleResetPassword = (user) => {
        setCurrentUser(user);
        setResetPasswordVisible(true);
    };

    const handleTransferOrg = (user) => {
        setCurrentUser(user);
        setBatchTransferVisible(true);
    };

    const handleBatchOperation = (operation) => {
        if (selectedRowKeys.length === 0) {
            message.warning('请先选择要操作的用户');
            return;
        }

        const selectedUserNames = users
            .filter(u => selectedRowKeys.includes(u.id))
            .map(u => u.realName)
            .join('、');

        const operationMap = {
            'enable': { action: '启用', status: '启用' },
            'disable': { action: '禁用', status: '禁用' },
            'delete': { action: '删除', status: null },
            'resetPassword': { action: '重置密码', status: null }
        };

        const { action, status } = operationMap[operation];

        Modal.confirm({
            title: `批量${action}`,
            content: `确定要${action}以下用户吗？\n${selectedUserNames}`,
            onOk: () => {
                if (operation === 'delete') {
                    const newUsers = users.filter(u => !selectedRowKeys.includes(u.id));
                    setUsers(newUsers);
                } else if (status) {
                    const newUsers = users.map(u => 
                        selectedRowKeys.includes(u.id) ? { ...u, status } : u
                    );
                    setUsers(newUsers);
                }
                setSelectedRowKeys([]);
                message.success(`批量${action}操作完成`);
            }
        });
    };

    const handleExportUsers = () => {
        const exportData = users.filter(u => selectedRowKeys.includes(u.id));
        const csvContent = "data:text/csv;charset=utf-8," + 
            "用户名,姓名,邮箱,手机,用户类型,组织,角色,状态\n" +
            exportData.map(u => 
                `${u.username},${u.realName},${u.email},${u.phone},${u.userType},${u.organization},${u.role},${u.status}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `用户数据_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        message.success('用户数据导出成功');
    };

    // 渲染用户表单
    const renderUserForm = () => {
        const [form] = Form.useForm();
        
        const userTypeRoles = {
            '协会用户': ['管理员', '运营专员', '技术专员', '审核员'],
            '展商用户': ['展商管理员', '展商操作员', '展位负责人'],
            '普通用户': ['注册用户', '访客用户']
        };

        React.useEffect(() => {
            if (editingUser) {
                form.setFieldsValue(editingUser);
            } else {
                form.resetFields();
            }
        }, [editingUser, form]);

        const handleSubmit = (values) => {
            if (editingUser) {
                const newUsers = users.map(u => 
                    u.id === editingUser.id ? { ...u, ...values } : u
                );
                setUsers(newUsers);
                message.success('用户信息更新成功');
            } else {
                const newUser = {
                    ...values,
                    id: Math.max(...users.map(u => u.id)) + 1,
                    createTime: new Date().toISOString(),
                    loginCount: 0,
                    lastLoginTime: new Date().toISOString(),
                    permissions: generateRandomPermissions(values.userType),
                    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${Date.now()}`
                };
                setUsers([...users, newUser]);
                message.success('用户创建成功');
            }
            setUserModalVisible(false);
        };

        return React.createElement(Modal, {
            title: editingUser ? '编辑用户' : '新增用户',
            open: userModalVisible,
            onCancel: () => setUserModalVisible(false),
            footer: null,
            width: 600
        }, React.createElement(Form, {
            form,
            layout: 'vertical',
            onFinish: handleSubmit
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 }, 
                    React.createElement(Form.Item, {
                        name: 'username',
                        label: '用户名',
                        rules: [{ required: true, message: '请输入用户名' }]
                    }, React.createElement(Input, { placeholder: '请输入用户名' }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 }, 
                    React.createElement(Form.Item, {
                        name: 'realName',
                        label: '真实姓名',
                        rules: [{ required: true, message: '请输入真实姓名' }]
                    }, React.createElement(Input, { placeholder: '请输入真实姓名' }))
                )
            ]),
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 }, 
                    React.createElement(Form.Item, {
                        name: 'email',
                        label: '邮箱',
                        rules: [
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                        ]
                    }, React.createElement(Input, { placeholder: '请输入邮箱' }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 }, 
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '手机号',
                        rules: [{ required: true, message: '请输入手机号' }]
                    }, React.createElement(Input, { placeholder: '请输入手机号' }))
                )
            ]),
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 }, 
                    React.createElement(Form.Item, {
                        name: 'userType',
                        label: '用户类型',
                        rules: [{ required: true, message: '请选择用户类型' }]
                    }, React.createElement(Select, { 
                        placeholder: '请选择用户类型',
                        onChange: (value) => {
                            form.setFieldsValue({ role: undefined });
                        }
                    }, [
                        React.createElement(Option, { key: '1', value: '协会用户' }, '协会用户'),
                        React.createElement(Option, { key: '2', value: '展商用户' }, '展商用户'),
                        React.createElement(Option, { key: '3', value: '普通用户' }, '普通用户')
                    ]))
                ),
                React.createElement(Col, { key: 'col2', span: 12 }, 
                    React.createElement(Form.Item, {
                        name: 'role',
                        label: '角色',
                        rules: [{ required: true, message: '请选择角色' }]
                    }, React.createElement(Select, { 
                        placeholder: '请选择角色',
                        disabled: !Form.useWatch('userType', form)
                    }, (userTypeRoles[Form.useWatch('userType', form)] || []).map(role =>
                        React.createElement(Option, { key: role, value: role }, role)
                    )))
                )
            ]),
            React.createElement(Form.Item, {
                key: 'org',
                name: 'organization',
                label: '所属组织',
                rules: [{ required: true, message: '请选择所属组织' }]
            }, React.createElement(TreeSelect, {
                treeData: organizationTree,
                placeholder: '请选择所属组织',
                treeDefaultExpandAll: true,
                showSearch: true,
                treeNodeFilterProp: 'title'
            })),
            React.createElement(Form.Item, {
                key: 'status',
                name: 'status',
                label: '状态',
                rules: [{ required: true, message: '请选择状态' }]
            }, React.createElement(Radio.Group, {}, [
                React.createElement(Radio, { key: '1', value: '启用' }, '启用'),
                React.createElement(Radio, { key: '2', value: '禁用' }, '禁用'),
                React.createElement(Radio, { key: '3', value: '待审核' }, '待审核')
            ])),
            React.createElement(Form.Item, {
                key: 'remark',
                name: 'remark',
                label: '备注'
            }, React.createElement(Input.TextArea, {
                placeholder: '请输入备注信息',
                rows: 3
            })),
            React.createElement(Form.Item, { key: 'buttons' }, 
                React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'cancel',
                        onClick: () => setUserModalVisible(false)
                    }, '取消'),
                    React.createElement(Button, {
                        key: 'submit',
                        type: 'primary',
                        htmlType: 'submit'
                    }, editingUser ? '更新' : '创建')
                ])
            )
        ]));
    };

    // 渲染批量转移弹窗
    const renderBatchTransferModal = () => {
        const [form] = Form.useForm();
        
        const handleTransfer = (values) => {
            const targetUsers = selectedRowKeys.length > 0 ? 
                users.filter(u => selectedRowKeys.includes(u.id)) :
                currentUser ? [currentUser] : [];
                
            if (targetUsers.length === 0) {
                message.error('没有选择要转移的用户');
                return;
            }

            const newUsers = users.map(u => {
                if (targetUsers.some(tu => tu.id === u.id)) {
                    return { ...u, organization: values.targetOrg };
                }
                return u;
            });
            
            setUsers(newUsers);
            setBatchTransferVisible(false);
            setSelectedRowKeys([]);
            setCurrentUser(null);
            message.success(`成功转移 ${targetUsers.length} 个用户到新组织`);
        };

        return React.createElement(Modal, {
            title: '批量转移组织',
            open: batchTransferVisible,
            onCancel: () => {
                setBatchTransferVisible(false);
                setCurrentUser(null);
            },
            footer: null
        }, React.createElement(Form, {
            form,
            layout: 'vertical',
            onFinish: handleTransfer
        }, [
            React.createElement(Form.Item, {
                key: 'info',
                label: '转移信息'
            }, React.createElement('div', {
                style: { 
                    background: '#f6ffed', 
                    border: '1px solid #b7eb8f',
                    borderRadius: '6px',
                    padding: '12px'
                }
            }, selectedRowKeys.length > 0 ? 
                `将转移 ${selectedRowKeys.length} 个选中用户` : 
                currentUser ? `将转移用户: ${currentUser.realName}` : '无用户选择'
            )),
            React.createElement(Form.Item, {
                key: 'target',
                name: 'targetOrg',
                label: '目标组织',
                rules: [{ required: true, message: '请选择目标组织' }]
            }, React.createElement(TreeSelect, {
                treeData: organizationTree,
                placeholder: '请选择目标组织',
                treeDefaultExpandAll: true,
                showSearch: true,
                treeNodeFilterProp: 'title'
            })),
            React.createElement(Form.Item, { key: 'buttons' }, 
                React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'cancel',
                        onClick: () => {
                            setBatchTransferVisible(false);
                            setCurrentUser(null);
                        }
                    }, '取消'),
                    React.createElement(Button, {
                        key: 'submit',
                        type: 'primary',
                        htmlType: 'submit'
                    }, '确认转移')
                ])
            )
        ]));
    };

    // 渲染权限设置弹窗
    const renderPermissionModal = () => {
        if (!currentUser) return null;

        const allPermissions = [
            { key: 'user:read', label: '用户查看', group: '用户管理' },
            { key: 'user:write', label: '用户编辑', group: '用户管理' },
            { key: 'user:delete', label: '用户删除', group: '用户管理' },
            { key: 'content:read', label: '内容查看', group: '内容管理' },
            { key: 'content:write', label: '内容编辑', group: '内容管理' },
            { key: 'content:publish', label: '内容发布', group: '内容管理' },
            { key: 'exhibition:read', label: '展会查看', group: '展会管理' },
            { key: 'exhibition:write', label: '展会编辑', group: '展会管理' },
            { key: 'exhibition:manage', label: '展会管理', group: '展会管理' },
            { key: 'system:config', label: '系统配置', group: '系统管理' },
            { key: 'system:log', label: '日志查看', group: '系统管理' },
            { key: 'system:backup', label: '数据备份', group: '系统管理' }
        ];

        const groupedPermissions = allPermissions.reduce((groups, perm) => {
            if (!groups[perm.group]) {
                groups[perm.group] = [];
            }
            groups[perm.group].push(perm);
            return groups;
        }, {});

        const [selectedPermissions, setSelectedPermissions] = React.useState(currentUser.permissions || []);

        const handleSavePermissions = () => {
            const newUsers = users.map(u => 
                u.id === currentUser.id ? { ...u, permissions: selectedPermissions } : u
            );
            setUsers(newUsers);
            setPermissionModalVisible(false);
            setCurrentUser(null);
            message.success('权限设置保存成功');
        };

        return React.createElement(Modal, {
            title: `权限设置 - ${currentUser.realName}`,
            open: permissionModalVisible,
            onCancel: () => {
                setPermissionModalVisible(false);
                setCurrentUser(null);
            },
            footer: [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => {
                        setPermissionModalVisible(false);
                        setCurrentUser(null);
                    }
                }, '取消'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary',
                    onClick: handleSavePermissions
                }, '保存')
            ],
            width: 600
        }, React.createElement('div', {}, [
            React.createElement('div', {
                key: 'user-info',
                style: {
                    background: '#f6ffed',
                    border: '1px solid #b7eb8f',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '16px'
                }
            }, [
                React.createElement('div', { key: 'type' }, `用户类型: ${currentUser.userType}`),
                React.createElement('div', { key: 'role' }, `当前角色: ${currentUser.role}`)
            ]),
            ...Object.entries(groupedPermissions).map(([groupName, permissions]) => 
                React.createElement('div', { key: groupName, style: { marginBottom: '16px' } }, [
                    React.createElement('h4', { 
                        key: 'title',
                        style: { marginBottom: '8px', color: '#1890ff' }
                    }, groupName),
                    React.createElement(Checkbox.Group, {
                        key: 'checkboxes',
                        value: selectedPermissions,
                        onChange: setSelectedPermissions,
                        style: { width: '100%' }
                    }, React.createElement(Row, {}, permissions.map(perm =>
                        React.createElement(Col, { key: perm.key, span: 8 },
                            React.createElement(Checkbox, { value: perm.key }, perm.label)
                        )
                    )))
                ])
            )
        ]));
    };

    // 渲染重置密码弹窗
    const renderResetPasswordModal = () => {
        if (!currentUser) return null;

        const [form] = Form.useForm();

        const handleResetPassword = (values) => {
            // 这里应该调用API重置密码
            message.success(`用户 ${currentUser.realName} 的密码已重置`);
            setResetPasswordVisible(false);
            setCurrentUser(null);
        };

        return React.createElement(Modal, {
            title: `重置密码 - ${currentUser.realName}`,
            open: resetPasswordVisible,
            onCancel: () => {
                setResetPasswordVisible(false);
                setCurrentUser(null);
            },
            footer: null
        }, React.createElement(Form, {
            form,
            layout: 'vertical',
            onFinish: handleResetPassword
        }, [
            React.createElement(Form.Item, {
                key: 'info'
            }, React.createElement('div', {
                style: {
                    background: '#fff7e6',
                    border: '1px solid #ffd591',
                    borderRadius: '6px',
                    padding: '12px'
                }
            }, [
                React.createElement('div', { key: 'user' }, `用户: ${currentUser.realName} (@${currentUser.username})`),
                React.createElement('div', { key: 'email' }, `邮箱: ${currentUser.email}`)
            ])),
            React.createElement(Form.Item, {
                key: 'method',
                name: 'resetMethod',
                label: '重置方式',
                initialValue: 'random'
            }, React.createElement(Radio.Group, {}, [
                React.createElement(Radio, { key: '1', value: 'random' }, '生成随机密码'),
                React.createElement(Radio, { key: '2', value: 'custom' }, '设置指定密码')
            ])),
            React.createElement(Form.Item, {
                key: 'password',
                name: 'newPassword',
                label: '新密码',
                rules: [
                    { required: true, message: '请输入新密码' },
                    { min: 6, message: '密码至少6位' }
                ],
                dependencies: ['resetMethod']
            }, React.createElement(Input.Password, { 
                placeholder: '请输入新密码(至少6位)' 
            })),
            React.createElement(Form.Item, {
                key: 'notify',
                name: 'notifyUser',
                valuePropName: 'checked',
                initialValue: true
            }, React.createElement(Checkbox, {}, '通过邮件通知用户新密码')),
            React.createElement(Form.Item, { key: 'buttons' }, 
                React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'cancel',
                        onClick: () => {
                            setResetPasswordVisible(false);
                            setCurrentUser(null);
                        }
                    }, '取消'),
                    React.createElement(Button, {
                        key: 'submit',
                        type: 'primary',
                        htmlType: 'submit'
                    }, '重置密码')
                ])
            )
        ]));
    };

    // 表格行选择配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
            setSelectedUsers(rows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.status === '待审核'
        })
    };

    // 主界面渲染
    return React.createElement('div', { style: { padding: '24px' } }, [
        // 页面标题和描述
        React.createElement('div', {
            key: 'header',
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px'
            }
        }, [
            React.createElement('div', { key: 'left' }, [
                React.createElement('h2', {
                    key: 'title',
                    style: { margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }
                }, '👥 用户管理'),
                React.createElement('p', {
                    key: 'description',
                    style: { margin: 0, color: '#666', fontSize: '14px' }
                }, '管理协会用户、展商用户、普通用户的账户信息、权限配置和组织归属')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(Button, {
                    key: 'import',
                    icon: React.createElement('span', {}, '📥')
                }, '导入用户'),
                React.createElement(Button, {
                    key: 'add',
                    type: 'primary',
                    icon: React.createElement('span', {}, '➕'),
                    onClick: handleAddUser
                }, '新增用户')
            ])
        ]),

        // 统计卡片
        React.createElement(Row, { key: 'stats', gutter: 16, style: { marginBottom: '24px' } }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '总用户数',
                        value: statistics.total,
                        prefix: React.createElement('span', {}, '👥')
                    })
                )
            ),
            React.createElement(Col, { key: 'association', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '协会用户',
                        value: statistics.association,
                        valueStyle: { color: '#1890ff' },
                        prefix: React.createElement('span', {}, '🏛️')
                    })
                )
            ),
            React.createElement(Col, { key: 'exhibitor', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '展商用户',
                        value: statistics.exhibitor,
                        valueStyle: { color: '#52c41a' },
                        prefix: React.createElement('span', {}, '🏢')
                    })
                )
            ),
            React.createElement(Col, { key: 'regular', span: 6 },
                React.createElement(Card, { size: 'small' },
                    React.createElement(Statistic, {
                        title: '普通用户',
                        value: statistics.regular,
                        valueStyle: { color: '#faad14' },
                        prefix: React.createElement('span', {}, '👤')
                    })
                )
            )
        ]),

        // 筛选和搜索
        React.createElement(Card, { 
            key: 'filters',
            size: 'small',
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Row, { key: 'filter-row', gutter: 16, align: 'middle' }, [
                React.createElement(Col, { key: 'search', span: 6 },
                    React.createElement(Search, {
                        placeholder: '搜索用户名、姓名、邮箱、手机号',
                        value: searchText,
                        onChange: (e) => setSearchText(e.target.value),
                        allowClear: true
                    })
                ),
                React.createElement(Col, { key: 'org', span: 5 },
                    React.createElement(TreeSelect, {
                        placeholder: '选择组织',
                        value: selectedOrg,
                        onChange: setSelectedOrg,
                        treeData: organizationTree,
                        allowClear: true,
                        style: { width: '100%' }
                    })
                ),
                React.createElement(Col, { key: 'status', span: 4 },
                    React.createElement(Select, {
                        placeholder: '用户状态',
                        value: selectedStatus,
                        onChange: setSelectedStatus,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Option, { key: 'all', value: 'all' }, '全部状态'),
                        React.createElement(Option, { key: 'active', value: '启用' }, '启用'),
                        React.createElement(Option, { key: 'disabled', value: '禁用' }, '禁用'),
                        React.createElement(Option, { key: 'pending', value: '待审核' }, '待审核')
                    ])
                ),
                React.createElement(Col, { key: 'actions', span: 9 },
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            key: 'reset',
                            onClick: () => {
                                setSearchText('');
                                setSelectedOrg(null);
                                setSelectedStatus('all');
                            }
                        }, '重置筛选'),
                        selectedRowKeys.length > 0 && React.createElement(Dropdown, {
                            key: 'batch',
                            overlay: batchMenu,
                            trigger: ['click']
                        }, React.createElement(Button, {}, `批量操作 (${selectedRowKeys.length})`)),
                        React.createElement('span', { 
                            key: 'total',
                            style: { color: '#666' }
                        }, `共 ${filteredUsers.length} 条记录`)
                    ])
                )
            ])
        ]),

        // 用户类型标签页
        React.createElement(Tabs, {
            key: 'tabs',
            activeKey: activeTab,
            onChange: setActiveTab,
            style: { marginBottom: '16px' }
        }, [
            React.createElement(TabPane, {
                key: 'all',
                tab: React.createElement('span', {}, [
                    React.createElement('span', { key: 'icon' }, '📋'),
                    React.createElement('span', { key: 'text' }, ` 全部用户 (${statistics.total})`)
                ])
            }),
            React.createElement(TabPane, {
                key: 'association',
                tab: React.createElement('span', {}, [
                    React.createElement('span', { key: 'icon' }, '🏛️'),
                    React.createElement('span', { key: 'text' }, ` 协会用户 (${statistics.association})`)
                ])
            }),
            React.createElement(TabPane, {
                key: 'exhibitor',
                tab: React.createElement('span', {}, [
                    React.createElement('span', { key: 'icon' }, '🏢'),
                    React.createElement('span', { key: 'text' }, ` 展商用户 (${statistics.exhibitor})`)
                ])
            }),
            React.createElement(TabPane, {
                key: 'regular',
                tab: React.createElement('span', {}, [
                    React.createElement('span', { key: 'icon' }, '👤'),
                    React.createElement('span', { key: 'text' }, ` 普通用户 (${statistics.regular})`)
                ])
            })
        ]),

        // 用户表格
        React.createElement(Card, { key: 'table-card' },
            React.createElement(Table, {
                columns,
                dataSource: filteredUsers,
                rowKey: 'id',
                rowSelection,
                loading,
                pagination: {
                    total: filteredUsers.length,
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                },
                scroll: { x: 1400 }
            })
        ),

        // 弹窗组件
        renderUserForm(),
        renderBatchTransferModal(),
        renderPermissionModal(),
        renderResetPasswordModal()
    ]);
};

// 确保组件被正确导出
window.UserManagement = UserManagement; 
console.log('✅ UserManagement 组件已成功加载 - 文档7.1版本');
