// 用户管理页面 - 基于新功能规范重构
const UserManagement = () => {
    const { Table, Card, Button, Space, Tag, Input, Select, Modal, Tabs, Tooltip, Avatar, Tree, Form, Switch, DatePicker, Upload, Descriptions, Alert, Row, Col, Timeline, Transfer, Cascader, message } = antd;
    const [activeTab, setActiveTab] = React.useState('users');
    const [users, setUsers] = React.useState([]);
    const [organizations, setOrganizations] = React.useState([]);
    const [roles, setRoles] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [auditLogs, setAuditLogs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [roleModalVisible, setRoleModalVisible] = React.useState(false);
    const [orgModalVisible, setOrgModalVisible] = React.useState(false);
    const [importModalVisible, setImportModalVisible] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentRole, setCurrentRole] = React.useState(null);
    const [currentOrg, setCurrentOrg] = React.useState(null);
    const [form] = Form.useForm();
    const [roleForm] = Form.useForm();
    const [orgForm] = Form.useForm();
    const [importForm] = Form.useForm();

    React.useEffect(() => {
        if (activeTab === 'users') {
            loadUsers();
        } else if (activeTab === 'organizations') {
            loadOrganizations();
        } else if (activeTab === 'roles') {
            loadRoles();
        } else if (activeTab === 'permissions') {
            loadPermissions();
        } else if (activeTab === 'audit') {
            loadAuditLogs();
        } else if (activeTab === 'import') {
            // 导入功能页面不需要额外加载
        }
    }, [activeTab]);

    const loadUsers = () => {
        setLoading(true);
        setTimeout(() => {
            const mockUsers = [
                {
                    id: 'U001',
                    key: 'U001',
                    username: 'admin_system',
                    realName: '张**',
                    phone: '138****8888',
                    email: 'admin@example.com',
                    userType: 'admin',
                    orgId: 'ORG001',
                    orgName: '系统管理部',
                    status: 'active',
                    roles: ['系统管理员'],
                    certification: 'verified',
                    securityLevel: 'high',
                    lastLogin: '2024-01-15 09:30:25',
                    loginCount: 245,
                    riskLevel: 'low',
                    registerTime: '2023-05-10 14:20:00',
                    twoFactorAuth: true,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-08-10',
                    permissions: ['user:manage', 'system:config', 'audit:view'],
                    importSource: 'manual', // 导入来源
                    importTime: '2023-05-10 14:20:00'
                },
                {
                    id: 'U002',
                    key: 'U002',
                    username: 'audit_manager',
                    realName: '李**',
                    phone: '139****6666',
                    email: 'audit@example.com',
                    userType: 'admin',
                    orgId: 'ORG002',
                    orgName: '审计管理部',
                    status: 'active',
                    roles: ['审计管理员'],
                    certification: 'verified',
                    securityLevel: 'high',
                    lastLogin: '2024-01-15 08:45:12',
                    loginCount: 189,
                    riskLevel: 'low',
                    registerTime: '2023-06-15 16:30:00',
                    twoFactorAuth: true,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-09-15',
                    permissions: ['audit:manage', 'log:view', 'report:generate'],
                    importSource: 'manual',
                    importTime: '2023-06-15 16:30:00'
                },
                {
                    id: 'U003',
                    key: 'U003',
                    username: 'exhibition_admin',
                    realName: '陈**',
                    phone: '136****4444',
                    email: 'exhibition@company.com',
                    userType: 'exhibition',
                    orgId: 'ORG004',
                    orgName: '北京国际会展公司',
                    status: 'active',
                    roles: ['会展管理员'],
                    certification: 'verified',
                    securityLevel: 'medium',
                    lastLogin: '2024-01-15 14:20:35',
                    loginCount: 78,
                    riskLevel: 'low',
                    registerTime: '2023-09-10 09:15:00',
                    twoFactorAuth: true,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-06-10',
                    permissions: ['exhibition:manage', 'content:publish', 'visitor:view'],
                    importSource: 'batch_excel',
                    importTime: '2023-09-10 09:15:00'
                },
                {
                    id: 'U004',
                    key: 'U004',
                    username: 'association_leader',
                    realName: '赵**',
                    phone: '134****2222',
                    email: 'leader@rail-association.org',
                    userType: 'association',
                    orgId: 'ORG006',
                    orgName: '中国城市轨道交通协会',
                    status: 'active',
                    roles: ['协会领导'],
                    certification: 'verified',
                    securityLevel: 'high',
                    lastLogin: '2024-01-15 11:30:18',
                    loginCount: 95,
                    riskLevel: 'low',
                    registerTime: '2023-08-01 10:00:00',
                    twoFactorAuth: true,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-08-01',
                    permissions: ['association:manage', 'member:approve', 'policy:publish'],
                    importSource: 'batch_excel',
                    importTime: '2023-08-01 10:00:00'
                },
                {
                    id: 'U005',
                    key: 'U005',
                    username: 'regular_user_001',
                    realName: '刘**',
                    phone: '135****3333',
                    email: 'user@example.com',
                    userType: 'user',
                    orgId: null,
                    orgName: '个人用户',
                    status: 'active',
                    roles: ['普通用户'],
                    certification: 'unverified',
                    securityLevel: 'low',
                    lastLogin: '2024-01-15 16:45:22',
                    loginCount: 42,
                    riskLevel: 'low',
                    registerTime: '2023-11-05 15:30:00',
                    twoFactorAuth: false,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-05-05',
                    permissions: ['content:view', 'content:comment'],
                    importSource: 'app_register',
                    importTime: '2023-11-05 15:30:00'
                }
            ];
            setUsers(mockUsers);
            setLoading(false);
        }, 800);
    };

    const loadOrganizations = () => {
        setLoading(true);
        setTimeout(() => {
            const mockOrgs = [
                {
                    id: 'ORG001',
                    key: 'ORG001',
                    name: '系统管理部',
                    type: 'admin',
                    parentId: null,
                    level: 1,
                    status: 'active',
                    description: '负责系统运维、用户管理等工作',
                    memberCount: 8,
                    createTime: '2023-05-01',
                    children: [
                        {
                            id: 'ORG001-1',
                            key: 'ORG001-1',
                            name: '运维组',
                            type: 'group',
                            parentId: 'ORG001',
                            level: 2,
                            status: 'active',
                            description: '系统运维和技术支持',
                            memberCount: 4,
                            createTime: '2023-05-15'
                        }
                    ]
                },
                {
                    id: 'ORG006',
                    key: 'ORG006',
                    name: '中国城市轨道交通协会',
                    type: 'association',
                    parentId: null,
                    level: 1,
                    status: 'active',
                    description: '城市轨道交通行业权威组织',
                    memberCount: 1250,
                    createTime: '2020-01-01',
                    children: [
                        {
                            id: 'ORG006-1',
                            key: 'ORG006-1',
                            name: '技术委员会',
                            type: 'committee',
                            parentId: 'ORG006',
                            level: 2,
                            status: 'active',
                            description: '技术标准制定和技术指导',
                            memberCount: 45,
                            createTime: '2020-01-15'
                                }
                            ]
                        },
                        {
                    id: 'ORG004',
                    key: 'ORG004',
                    name: '北京国际会展公司',
                    type: 'exhibition',
                    parentId: null,
                    level: 1,
                            status: 'active',
                    description: '专业会展服务提供商',
                    memberCount: 125,
                    createTime: '2023-06-10'
                }
            ];
            setOrganizations(mockOrgs);
            setLoading(false);
        }, 600);
    };

    const loadRoles = () => {
        setLoading(true);
        setTimeout(() => {
            const mockRoles = [
                {
                    id: 'ROLE001',
                    key: 'ROLE001',
                    name: '系统管理员',
                    code: 'SYSTEM_ADMIN',
                    type: 'admin',
                    level: 'high',
                    description: '系统最高管理权限，负责系统配置和用户管理',
                    userCount: 3,
                    permissions: ['user:*', 'system:*', 'audit:view', 'security:config'],
                    status: 'active',
                    createTime: '2023-05-01',
                    canDelete: false
                },
                {
                    id: 'ROLE002',
                    key: 'ROLE002',
                    name: '审计管理员',
                    code: 'AUDIT_ADMIN',
                    type: 'admin',
                    level: 'high',
                    description: '专职审计员，负责安全审计和日志管理',
                    userCount: 2,
                    permissions: ['audit:*', 'log:*', 'report:*'],
                    status: 'active',
                    createTime: '2023-05-01',
                    canDelete: false
                },
                {
                    id: 'ROLE003',
                    key: 'ROLE003',
                    name: '协会管理员',
                    code: 'ASSOCIATION_ADMIN',
                    type: 'business',
                    level: 'medium',
                    description: '协会用户管理权限',
                    userCount: 15,
                    permissions: ['association:manage', 'member:approve', 'policy:publish'],
                    status: 'active',
                    createTime: '2023-06-15',
                    canDelete: true
                },
                {
                    id: 'ROLE004',
                    key: 'ROLE004',
                    name: '会展管理员',
                    code: 'EXHIBITION_ADMIN',
                    type: 'business',
                    level: 'medium',
                    description: '会展公司管理员，负责展会内容管理',
                    userCount: 15,
                    permissions: ['exhibition:manage', 'content:publish', 'visitor:view'],
                    status: 'active',
                    createTime: '2023-06-15',
                    canDelete: true
                },
                {
                    id: 'ROLE005',
                    key: 'ROLE005',
                    name: '普通用户',
                    code: 'REGULAR_USER',
                    type: 'user',
                    level: 'low',
                    description: '普通用户权限',
                    userCount: 5000,
                    permissions: ['content:view', 'content:comment', 'content:like'],
                    status: 'active',
                    createTime: '2023-05-01',
                    canDelete: false
                }
            ];
            setRoles(mockRoles);
            setLoading(false);
        }, 500);
    };

    const loadPermissions = () => {
        setLoading(true);
        setTimeout(() => {
            const mockPermissions = [
                {
                    id: 'PERM_USER',
                    name: '用户管理',
                    code: 'user',
                    type: 'module',
                    children: [
                        { id: 'PERM_USER_VIEW', name: '查看用户', code: 'user:view' },
                        { id: 'PERM_USER_CREATE', name: '创建用户', code: 'user:create' },
                        { id: 'PERM_USER_EDIT', name: '编辑用户', code: 'user:edit' },
                        { id: 'PERM_USER_DELETE', name: '删除用户', code: 'user:delete' },
                        { id: 'PERM_USER_IMPORT', name: '批量导入用户', code: 'user:import' }
                    ]
                },
                {
                    id: 'PERM_AUDIT',
                    name: '审核管理',
                    code: 'audit',
                    type: 'module',
                    children: [
                        { id: 'PERM_AUDIT_IMAGE', name: '图文审核', code: 'audit:image' },
                        { id: 'PERM_AUDIT_VIDEO', name: '视频审核', code: 'audit:video' },
                        { id: 'PERM_AUDIT_INTERACTION', name: '互动审核', code: 'audit:interaction' }
                    ]
                },
                {
                    id: 'PERM_STATS',
                    name: '用户行为统计',
                    code: 'stats',
                    type: 'module',
                    children: [
                        { id: 'PERM_STATS_VIEW', name: '查看统计', code: 'stats:view' },
                        { id: 'PERM_STATS_EXPORT', name: '导出统计', code: 'stats:export' }
                    ]
                },
                {
                    id: 'PERM_LIVE',
                    name: '直播管理',
                    code: 'live',
                    type: 'module',
                    children: [
                        { id: 'PERM_LIVE_MANAGE', name: '直播管理', code: 'live:manage' },
                        { id: 'PERM_LIVE_REPLAY', name: '回放管理', code: 'live:replay' }
                    ]
                },
                {
                    id: 'PERM_ALGORITHM',
                    name: '流量分配配置',
                    code: 'algorithm',
                    type: 'module',
                    children: [
                        { id: 'PERM_ALGORITHM_CONFIG', name: '配置推荐算法', code: 'algorithm:config' }
                    ]
                }
            ];
            setPermissions(mockPermissions);
            setLoading(false);
        }, 500);
    };

    const loadAuditLogs = () => {
        setLoading(true);
        setTimeout(() => {
            const mockLogs = [
                {
                    id: 'LOG001',
                    key: 'LOG001',
                    operator: 'admin_system',
                    operatorName: '张**',
                    action: '批量导入用户',
                    targetType: 'user',
                    targetId: 'BATCH_001',
                    targetName: '展会用户批量导入',
                    result: 'success',
                    ip: '192.168.1.100',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    details: '成功导入25个会展用户账号',
                    timestamp: '2024-01-15 14:30:25',
                    duration: '3.2s',
                    riskLevel: 'medium'
                },
                {
                    id: 'LOG002',
                    key: 'LOG002',
                    operator: 'audit_manager',
                    operatorName: '李**',
                    action: '查看用户详情',
                    targetType: 'user',
                    targetId: 'U003',
                    targetName: 'exhibition_admin',
                    result: 'success',
                    ip: '192.168.1.105',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    details: '查看用户详细信息',
                    timestamp: '2024-01-15 13:45:18',
                    duration: '0.8s',
                    riskLevel: 'low'
                },
                {
                    id: 'LOG003',
                    key: 'LOG003',
                    operator: 'admin_system',
                    operatorName: '张**',
                    action: '修改用户权限',
                    targetType: 'user',
                    targetId: 'U004',
                    targetName: 'association_leader',
                    result: 'success',
                    ip: '192.168.1.100',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    details: '为协会领导添加内容发布权限',
                    timestamp: '2024-01-15 11:20:45',
                    duration: '1.5s',
                    riskLevel: 'medium'
                }
            ];
            setAuditLogs(mockLogs);
            setLoading(false);
        }, 600);
    };

    // 用户身份类型渲染
    const renderUserType = (type) => {
        const typeMap = {
            'admin': { color: 'red', text: '系统管理员' },
            'user': { color: 'blue', text: '普通用户' },
            'association': { color: 'green', text: '协会用户' },
            'exhibition': { color: 'orange', text: '会展用户' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 导入来源渲染
    const renderImportSource = (source) => {
        const sourceMap = {
            'manual': { color: 'blue', text: '手动创建' },
            'batch_excel': { color: 'green', text: 'Excel导入' },
            'batch_csv': { color: 'cyan', text: 'CSV导入' },
            'app_register': { color: 'default', text: 'APP注册' },
            'api_sync': { color: 'orange', text: 'API同步' }
        };
        const config = sourceMap[source] || { color: 'default', text: source };
        return React.createElement(Tag, { color: config.color, size: 'small' }, config.text);
    };

    // 状态渲染
    const renderStatus = (status) => {
        const statusMap = {
            'active': { color: 'success', text: '正常' },
            'suspended': { color: 'warning', text: '停用' },
            'locked': { color: 'error', text: '锁定' },
            'deleted': { color: 'default', text: '已删除' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 用户批量导入处理
    const handleBatchImport = (values) => {
        setLoading(true);
        
        // 模拟批量导入处理
        setTimeout(() => {
            message.success(`成功导入 ${values.importType === 'excel' ? 'Excel' : 'CSV'} 文件中的用户数据`);
            setImportModalVisible(false);
            importForm.resetFields();
            loadUsers(); // 重新加载用户列表
            setLoading(false);
        }, 2000);
    };

    // 下载导入模板
    const downloadTemplate = (type) => {
        const headers = ['用户名', '真实姓名', '手机号', '邮箱', '用户类型', '所属组织', '角色'];
        const csvContent = headers.join(',') + '\n' +
            'example_user,示例用户,13800138000,user@example.com,user,个人用户,普通用户\n' +
            'association_user,协会用户,13800138001,association@example.com,association,中国城市轨道交通协会,协会管理员\n' +
            'exhibition_user,会展用户,13800138002,exhibition@example.com,exhibition,北京国际会展公司,会展管理员';
        
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `用户导入模板.${type}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 用户表格列定义
    const userColumns = [
        {
            title: '用户信息',
            key: 'userInfo',
            width: 200,
            render: (record) => React.createElement('div', { className: 'user-info' }, [
                React.createElement('div', {
                    key: 'name',
                    style: { fontWeight: 'bold', marginBottom: '4px' }
                }, record.realName),
                React.createElement('div', {
                        key: 'username',
                    style: { fontSize: '12px', color: '#666' }
                }, `@${record.username}`)
            ])
        },
        {
            title: '联系方式',
            key: 'contact',
            width: 160,
            render: (record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'phone' }, record.phone),
                React.createElement('div', {
                    key: 'email',
                    style: { fontSize: '12px', color: '#666' }
                }, record.email)
            ])
        },
        {
            title: '用户类型',
            dataIndex: 'userType',
            width: 120,
            render: renderUserType
        },
        {
            title: '所属组织',
            dataIndex: 'orgName',
            width: 150,
            ellipsis: true
        },
        {
            title: '导入来源',
            dataIndex: 'importSource',
            width: 100,
            render: renderImportSource
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            render: renderStatus
        },
        {
            title: '最后登录',
            dataIndex: 'lastLogin',
            width: 140,
            render: (text) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, text || '从未登录')
        },
        {
            title: '操作',
            key: 'actions',
            width: 200,
            render: (record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'link',
                    size: 'small',
                    onClick: () => showUserDetail(record)
                }, '详情'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => editUser(record)
                }, '编辑'),
                record.status === 'active' ? 
                    React.createElement(Button, {
                        key: 'suspend',
                        type: 'link',
                        size: 'small',
                        danger: true,
                        onClick: () => suspendUser(record)
                    }, '停用') :
                    React.createElement(Button, {
                        key: 'activate',
                        type: 'link',
                        size: 'small',
                        onClick: () => activateUser(record)
                    }, '启用')
            ])
        }
    ];

    // 组织架构表格列定义
    const orgColumns = [
        {
            title: '组织名称',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: '组织类型',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type) => {
                const typeMap = {
                    'admin': { color: 'red', text: '管理部门' },
                    'association': { color: 'green', text: '协会组织' },
                    'exhibition': { color: 'orange', text: '会展公司' },
                    'committee': { color: 'blue', text: '委员会' },
                    'group': { color: 'cyan', text: '工作组' }
                };
                const config = typeMap[type] || { color: 'default', text: type };
                return React.createElement(Tag, { color: config.color }, config.text);
            }
        },
        {
            title: '成员数量',
            dataIndex: 'memberCount',
            key: 'memberCount',
            width: 100,
            render: (count) => `${count} 人`
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: renderStatus
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 120
        },
        {
            title: '操作',
            key: 'actions',
            width: 150,
            render: (record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => editOrganization(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'add',
                    type: 'link',
                    size: 'small',
                    onClick: () => addChildOrganization(record)
                }, '添加子组织')
            ])
        }
    ];

    // 操作函数（简化版本）
    const showUserDetail = (user) => {
        Modal.info({
            title: '用户详情',
            width: 600,
            content: React.createElement(Descriptions, {
                column: 2,
                items: [
                    { label: '用户名', children: user.username },
                    { label: '真实姓名', children: user.realName },
                    { label: '手机号', children: user.phone },
                    { label: '邮箱', children: user.email },
                    { label: '用户类型', children: renderUserType(user.userType) },
                    { label: '所属组织', children: user.orgName },
                    { label: '导入来源', children: renderImportSource(user.importSource) },
                    { label: '注册时间', children: user.registerTime },
                    { label: '最后登录', children: user.lastLogin },
                    { label: '登录次数', children: `${user.loginCount} 次` }
                ]
            })
        });
    };

    const editUser = (user) => {
        setCurrentUser(user);
        form.setFieldsValue(user);
        setModalVisible(true);
    };

    const suspendUser = (user) => {
        Modal.confirm({
            title: '确认停用用户',
            content: `确定要停用用户 "${user.realName}" 吗？`,
            onOk() {
                message.success('用户已停用');
                loadUsers();
            }
        });
    };

    const activateUser = (user) => {
        Modal.confirm({
            title: '确认启用用户',
            content: `确定要启用用户 "${user.realName}" 吗？`,
            onOk() {
                message.success('用户已启用');
                loadUsers();
            }
        });
    };

    const editOrganization = (org) => {
        setCurrentOrg(org);
        orgForm.setFieldsValue(org);
        setOrgModalVisible(true);
    };

    const addChildOrganization = (parentOrg) => {
        setCurrentOrg({ parentId: parentOrg.id, parentName: parentOrg.name });
        orgForm.resetFields();
        setOrgModalVisible(true);
    };

    // Tab页面内容
    const tabItems = [
        {
            key: 'users',
            label: '用户管理',
            children: React.createElement('div', {}, [
                React.createElement(Card, {
                    key: 'user-card',
                    title: '用户列表',
                    extra: React.createElement(Space, {}, [
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => setImportModalVisible(true)
                        }, '批量导入'),
                        React.createElement(Button, {
                            onClick: () => {
                                setCurrentUser(null);
                                form.resetFields();
                                setModalVisible(true);
                            }
                        }, '新增用户')
                    ])
                }, [
                React.createElement(Table, {
                        key: 'user-table',
                    columns: userColumns,
                    dataSource: users,
                    loading: loading,
                        scroll: { x: 1200 },
                    pagination: {
                            total: users.length,
                            pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                            showTotal: (total) => `共 ${total} 条记录`
                    }
                })
                ])
            ])
        },
        {
            key: 'import',
            label: '批量导入',
            children: React.createElement('div', {}, [
                React.createElement(Card, {
                    key: 'import-card',
                    title: '用户身份批量导入'
                }, [
                    React.createElement(Alert, {
                        key: 'import-notice',
                        message: '批量导入说明',
                        description: '支持通过Excel或CSV文件批量导入用户身份信息。系统将根据用户类型自动分配相应的权限。',
                        type: 'info',
                        showIcon: true,
                        style: { marginBottom: 24 }
                    }),
                    React.createElement(Row, {
                        key: 'import-actions',
                        gutter: [16, 16]
                    }, [
                        React.createElement(Col, { key: 'template-col', span: 12 }, [
                            React.createElement(Card, {
                                key: 'template-card',
                                size: 'small',
                                title: '下载导入模板'
                            }, [
                                React.createElement('p', {
                                    key: 'template-desc'
                                }, '请先下载标准模板，按照格式填写用户信息'),
                    React.createElement(Space, {
                                    key: 'template-buttons'
                    }, [
                        React.createElement(Button, {
                                        key: 'excel-template',
                                        onClick: () => downloadTemplate('xlsx')
                                    }, '下载Excel模板'),
                        React.createElement(Button, {
                                        key: 'csv-template',
                                        onClick: () => downloadTemplate('csv')
                                    }, '下载CSV模板')
                                ])
                    ])
                ]),
                        React.createElement(Col, { key: 'upload-col', span: 12 }, [
                        React.createElement(Card, {
                                key: 'upload-card',
                            size: 'small',
                                title: '上传导入文件'
                            }, [
                                React.createElement('p', {
                                    key: 'upload-desc'
                                }, '支持.xlsx、.xls、.csv格式文件'),
                                React.createElement(Upload.Dragger, {
                                    key: 'upload-dragger',
                                    name: 'file',
                                    multiple: false,
                                    accept: '.xlsx,.xls,.csv',
                                    beforeUpload: () => false,
                                    onChange: (info) => {
                                        if (info.fileList.length > 0) {
                                            message.success('文件上传成功，点击"开始导入"处理');
                                        }
                                    }
                                }, [
                                    React.createElement('p', {
                                        key: 'upload-icon',
                                        className: 'ant-upload-drag-icon'
                                    }, '📁'),
                                    React.createElement('p', {
                                        key: 'upload-text',
                                        className: 'ant-upload-text'
                                    }, '点击或拖拽文件到此区域上传'),
                                    React.createElement('p', {
                                        key: 'upload-hint',
                                        className: 'ant-upload-hint'
                                    }, '单次最多导入1000个用户')
                                ]),
                            React.createElement('div', {
                                    key: 'upload-actions',
                                    style: { marginTop: 16, textAlign: 'center' }
                    }, [
                        React.createElement(Button, {
                                        key: 'import-btn',
                            type: 'primary',
                                        loading: loading,
                            onClick: () => {
                                            handleBatchImport({ importType: 'excel' });
                                        }
                                    }, '开始导入')
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        },
        {
            key: 'organizations',
            label: '组织架构',
            children: React.createElement('div', {}, [
                React.createElement(Card, {
                    key: 'org-card',
                    title: '组织架构管理',
                    extra: React.createElement(Button, {
                        onClick: () => {
                            setCurrentOrg(null);
                            orgForm.resetFields();
                            setOrgModalVisible(true);
                        }
                    }, '新增组织')
                }, [
                    React.createElement(Table, {
                        key: 'org-table',
                        columns: orgColumns,
                        dataSource: organizations,
                        loading: loading,
                        pagination: false,
                        expandable: {
                            childrenColumnName: 'children'
                        }
                    })
                ])
            ])
        },
        {
            key: 'audit',
            label: '操作审计',
            children: React.createElement('div', {}, [
                React.createElement(Card, {
                    key: 'audit-card',
                    title: '操作日志'
                }, [
                React.createElement(Table, {
                        key: 'audit-table',
                        columns: [
                            { title: '操作人', dataIndex: 'operatorName', width: 100 },
                            { title: '操作类型', dataIndex: 'action', width: 120 },
                            { title: '操作对象', dataIndex: 'targetName', width: 150 },
                            { title: '操作结果', dataIndex: 'result', width: 80,
                              render: (result) => React.createElement(Tag, {
                                  color: result === 'success' ? 'success' : 'error'
                              }, result === 'success' ? '成功' : '失败')
                            },
                            { title: '操作详情', dataIndex: 'details', ellipsis: true },
                            { title: '操作时间', dataIndex: 'timestamp', width: 150 }
                        ],
                    dataSource: auditLogs,
                    loading: loading,
                    pagination: {
                            total: auditLogs.length,
                        pageSize: 20,
                        showSizeChanger: true,
                            showTotal: (total) => `共 ${total} 条记录`
                        }
                    })
                ])
            ])
        }
    ];

    return React.createElement('div', { className: 'user-management-page' }, [
        React.createElement(Tabs, {
            key: 'main-tabs',
            activeKey: activeTab,
            onChange: setActiveTab,
            items: tabItems,
            style: { padding: '0 24px' }
        }),

        // 用户编辑/新增模态框
        React.createElement(Modal, {
            key: 'user-modal',
            title: currentUser ? '编辑用户' : '新增用户',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            footer: null,
            width: 600
        }, [
            React.createElement(Form, {
                key: 'user-form',
                form: form,
                layout: 'vertical',
                onFinish: (values) => {
                    message.success(currentUser ? '用户信息已更新' : '用户创建成功');
                            setModalVisible(false);
                            loadUsers();
                }
            }, [
                    React.createElement(Form.Item, {
                    key: 'username',
                        name: 'username',
                    label: '用户名',
                        rules: [{ required: true, message: '请输入用户名' }]
                }, React.createElement(Input, { placeholder: '请输入用户名' })),
                
                    React.createElement(Form.Item, {
                    key: 'realName',
                        name: 'realName',
                    label: '真实姓名',
                        rules: [{ required: true, message: '请输入真实姓名' }]
                }, React.createElement(Input, { placeholder: '请输入真实姓名' })),
                
                    React.createElement(Form.Item, {
                    key: 'userType',
                        name: 'userType',
                    label: '用户类型',
                        rules: [{ required: true, message: '请选择用户类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择用户类型',
                        options: [
                        { value: 'user', label: '普通用户' },
                        { value: 'association', label: '协会用户' },
                        { value: 'exhibition', label: '会展用户' },
                        { value: 'admin', label: '管理员' }
                    ]
                })),
                
                React.createElement(Form.Item, {
                    key: 'submit',
                    style: { textAlign: 'right', marginTop: 24 }
                }, [
                React.createElement(Button, {
                        key: 'cancel',
                        onClick: () => setModalVisible(false),
                        style: { marginRight: 8 }
                }, '取消'),
                React.createElement(Button, {
                        key: 'submit',
                    type: 'primary',
                        htmlType: 'submit'
                    }, currentUser ? '更新' : '创建')
                ])
            ])
        ]),

        // 组织编辑/新增模态框
        React.createElement(Modal, {
            key: 'org-modal',
            title: currentOrg?.id ? '编辑组织' : '新增组织',
            open: orgModalVisible,
            onCancel: () => setOrgModalVisible(false),
            footer: null,
            width: 500
        }, [
            React.createElement(Form, {
                key: 'org-form',
                form: orgForm,
                layout: 'vertical',
                onFinish: (values) => {
                    message.success(currentOrg?.id ? '组织信息已更新' : '组织创建成功');
                            setOrgModalVisible(false);
                            loadOrganizations();
                    }
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                name: 'name',
                    label: '组织名称',
                rules: [{ required: true, message: '请输入组织名称' }]
            }, React.createElement(Input, { placeholder: '请输入组织名称' })),
                
                    React.createElement(Form.Item, {
                    key: 'type',
                        name: 'type',
                    label: '组织类型',
                        rules: [{ required: true, message: '请选择组织类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择组织类型',
                        options: [
                            { value: 'admin', label: '管理部门' },
                            { value: 'association', label: '协会组织' },
                        { value: 'exhibition', label: '会展公司' },
                        { value: 'committee', label: '委员会' },
                        { value: 'group', label: '工作组' }
                    ]
                })),
                
            React.createElement(Form.Item, {
                    key: 'submit',
                    style: { textAlign: 'right', marginTop: 24 }
                }, [
                    React.createElement(Button, {
                        key: 'cancel',
                        onClick: () => setOrgModalVisible(false),
                        style: { marginRight: 8 }
                    }, '取消'),
                    React.createElement(Button, {
                        key: 'submit',
                        type: 'primary',
                        htmlType: 'submit'
                    }, currentOrg?.id ? '更新' : '创建')
                ])
            ])
        ])
    ]);
};

window.UserManagement = UserManagement; 