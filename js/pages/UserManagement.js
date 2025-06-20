// 用户管理页面 - 符合等保三级要求
const UserManagement = () => {
    const { Table, Card, Button, Space, Tag, Input, Select, Modal, Tabs, Tooltip, Avatar, Tree, Form, Switch, DatePicker, Upload, Descriptions, Alert, Row, Col, Timeline, Transfer, Cascader } = antd;
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
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentRole, setCurrentRole] = React.useState(null);
    const [currentOrg, setCurrentOrg] = React.useState(null);
    const [form] = Form.useForm();
    const [roleForm] = Form.useForm();
    const [orgForm] = Form.useForm();

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
                    permissions: ['user:manage', 'system:config', 'audit:view']
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
                    permissions: ['audit:manage', 'log:view', 'report:generate']
                },
                {
                    id: 'U003',
                    key: 'U003',
                    username: 'security_admin',
                    realName: '王**',
                    phone: '137****5555',
                    email: 'security@example.com',
                    userType: 'admin',
                    orgId: 'ORG003',
                    orgName: '安全管理部',
                    status: 'active',
                    roles: ['安全管理员'],
                    certification: 'verified',
                    securityLevel: 'high',
                    lastLogin: '2024-01-15 10:15:08',
                    loginCount: 156,
                    riskLevel: 'low',
                    registerTime: '2023-07-20 11:45:00',
                    twoFactorAuth: true,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-10-20',
                    permissions: ['security:config', 'role:manage', 'permission:assign']
                },
                {
                    id: 'U004',
                    key: 'U004',
                    username: 'exhibition_admin',
                    realName: '陈**',
                    phone: '136****4444',
                    email: 'exhibition@company.com',
                    userType: 'exhibition_company',
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
                    permissions: ['exhibition:manage', 'content:publish', 'visitor:view']
                },
                {
                    id: 'U005',
                    key: 'U005',
                    username: 'exhibitor_001',
                    realName: '刘**',
                    phone: '135****3333',
                    email: 'exhibitor@corp.com',
                    userType: 'exhibitor',
                    orgId: 'ORG005',
                    orgName: '华为技术有限公司',
                    status: 'active',
                    roles: ['参展商用户'],
                    certification: 'verified',
                    securityLevel: 'medium',
                    lastLogin: '2024-01-15 16:45:22',
                    loginCount: 42,
                    riskLevel: 'low',
                    registerTime: '2023-11-05 15:30:00',
                    twoFactorAuth: false,
                    accountLocked: false,
                    loginFailureCount: 0,
                    passwordExpiry: '2024-05-05',
                    permissions: ['booth:manage', 'product:display', 'message:send']
                },
                {
                    id: 'U006',
                    key: 'U006',
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
                    permissions: ['association:manage', 'member:approve', 'policy:publish']
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
                        },
                        {
                            id: 'ORG001-2',
                            key: 'ORG001-2',
                            name: '安全组',
                            type: 'group',
                            parentId: 'ORG001',
                            level: 2,
                            status: 'active',
                            description: '信息安全管理',
                            memberCount: 4,
                            createTime: '2023-05-15'
                        }
                    ]
                },
                {
                    id: 'ORG002',
                    key: 'ORG002',
                    name: '审计管理部',
                    type: 'admin',
                    parentId: null,
                    level: 1,
                    status: 'active',
                    description: '负责系统审计和合规管理',
                    memberCount: 3,
                    createTime: '2023-05-01'
                },
                {
                    id: 'ORG003',
                    key: 'ORG003',
                    name: '安全管理部',
                    type: 'admin',
                    parentId: null,
                    level: 1,
                    status: 'active',
                    description: '负责安全策略制定和执行',
                    memberCount: 5,
                    createTime: '2023-05-01'
                },
                {
                    id: 'ORG004',
                    key: 'ORG004',
                    name: '北京国际会展公司',
                    type: 'company',
                    parentId: null,
                    level: 1,
                    status: 'active',
                    description: '专业会展服务提供商',
                    memberCount: 125,
                    createTime: '2023-06-10',
                    children: [
                        {
                            id: 'ORG004-1',
                            key: 'ORG004-1',
                            name: '展会策划部',
                            type: 'department',
                            parentId: 'ORG004',
                            level: 2,
                            status: 'active',
                            description: '负责展会策划和组织',
                            memberCount: 25,
                            createTime: '2023-06-15'
                        },
                        {
                            id: 'ORG004-2',
                            key: 'ORG004-2',
                            name: '市场推广部',
                            type: 'department',
                            parentId: 'ORG004',
                            level: 2,
                            status: 'active',
                            description: '负责市场推广和客户服务',
                            memberCount: 30,
                            createTime: '2023-06-15'
                        }
                    ]
                },
                {
                    id: 'ORG005',
                    key: 'ORG005',
                    name: '华为技术有限公司',
                    type: 'company',
                    parentId: null,
                    level: 1,
                    status: 'active',
                    description: '参展企业，展示通信技术产品',
                    memberCount: 45,
                    createTime: '2023-11-01'
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
                            createTime: '2020-01-15',
                            children: [
                                {
                                    id: 'ORG006-1-1',
                                    key: 'ORG006-1-1',
                                    name: '信号技术组',
                                    type: 'workgroup',
                                    parentId: 'ORG006-1',
                                    level: 3,
                                    status: 'active',
                                    description: '轨道交通信号技术研究',
                                    memberCount: 15,
                                    createTime: '2020-02-01'
                                },
                                {
                                    id: 'ORG006-1-2',
                                    key: 'ORG006-1-2',
                                    name: '车辆技术组',
                                    type: 'workgroup',
                                    parentId: 'ORG006-1',
                                    level: 3,
                                    status: 'active',
                                    description: '轨道交通车辆技术研究',
                                    memberCount: 18,
                                    createTime: '2020-02-01'
                                }
                            ]
                        },
                        {
                            id: 'ORG006-2',
                            key: 'ORG006-2',
                            name: '标准化委员会',
                            type: 'committee',
                            parentId: 'ORG006',
                            level: 2,
                            status: 'active',
                            description: '行业标准制定和推广',
                            memberCount: 32,
                            createTime: '2020-01-15'
                        },
                        {
                            id: 'ORG006-3',
                            key: 'ORG006-3',
                            name: '安全委员会',
                            type: 'committee',
                            parentId: 'ORG006',
                            level: 2,
                            status: 'active',
                            description: '安全标准和安全管理',
                            memberCount: 28,
                            createTime: '2020-01-15'
                        }
                    ]
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
                    name: '安全管理员',
                    code: 'SECURITY_ADMIN',
                    type: 'admin',
                    level: 'high',
                    description: '专职安全管理员，负责安全策略配置',
                    userCount: 2,
                    permissions: ['security:*', 'role:*', 'permission:*'],
                    status: 'active',
                    createTime: '2023-05-01',
                    canDelete: false
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
                        { id: 'PERM_USER_SUSPEND', name: '禁用用户', code: 'user:suspend' },
                        { id: 'PERM_USER_RESET_PWD', name: '重置密码', code: 'user:reset_pwd' }
                    ]
                },
                {
                    id: 'PERM_ROLE',
                    name: '角色管理',
                    code: 'role',
                    type: 'module',
                    children: [
                        { id: 'PERM_ROLE_VIEW', name: '查看角色', code: 'role:view' },
                        { id: 'PERM_ROLE_CREATE', name: '创建角色', code: 'role:create' },
                        { id: 'PERM_ROLE_EDIT', name: '编辑角色', code: 'role:edit' },
                        { id: 'PERM_ROLE_DELETE', name: '删除角色', code: 'role:delete' },
                        { id: 'PERM_ROLE_ASSIGN', name: '分配角色', code: 'role:assign' }
                    ]
                },
                {
                    id: 'PERM_AUDIT',
                    name: '审计管理',
                    code: 'audit',
                    type: 'module',
                    children: [
                        { id: 'PERM_AUDIT_VIEW', name: '查看审计', code: 'audit:view' },
                        { id: 'PERM_AUDIT_MANAGE', name: '管理审计', code: 'audit:manage' },
                        { id: 'PERM_AUDIT_EXPORT', name: '导出审计', code: 'audit:export' },
                        { id: 'PERM_AUDIT_DELETE', name: '删除审计', code: 'audit:delete' }
                    ]
                },
                {
                    id: 'PERM_SYSTEM',
                    name: '系统管理',
                    code: 'system',
                    type: 'module',
                    children: [
                        { id: 'PERM_SYSTEM_CONFIG', name: '系统配置', code: 'system:config' },
                        { id: 'PERM_SYSTEM_BACKUP', name: '系统备份', code: 'system:backup' },
                        { id: 'PERM_SYSTEM_MONITOR', name: '系统监控', code: 'system:monitor' },
                        { id: 'PERM_SYSTEM_LOG', name: '系统日志', code: 'system:log' }
                    ]
                },
                {
                    id: 'PERM_CONTENT',
                    name: '内容管理',
                    code: 'content',
                    type: 'module',
                    children: [
                        { id: 'PERM_CONTENT_REVIEW', name: '内容审核', code: 'content:review' },
                        { id: 'PERM_CONTENT_PUBLISH', name: '内容发布', code: 'content:publish' },
                        { id: 'PERM_CONTENT_DELETE', name: '内容删除', code: 'content:delete' },
                        { id: 'PERM_CONTENT_MODERATE', name: '内容管理', code: 'content:moderate' }
                    ]
                },
                {
                    id: 'PERM_ORGANIZATION',
                    name: '组织管理',
                    code: 'organization',
                    type: 'module',
                    children: [
                        { id: 'PERM_ORG_VIEW', name: '查看组织', code: 'org:view' },
                        { id: 'PERM_ORG_CREATE', name: '创建组织', code: 'org:create' },
                        { id: 'PERM_ORG_EDIT', name: '编辑组织', code: 'org:edit' },
                        { id: 'PERM_ORG_DELETE', name: '删除组织', code: 'org:delete' }
                    ]
                }
            ];
            setPermissions(mockPermissions);
            setLoading(false);
        }, 400);
    };

    const loadAuditLogs = () => {
        setLoading(true);
        setTimeout(() => {
            const mockLogs = [
                {
                    id: 'LOG001',
                    key: 'LOG001',
                    time: '2024-01-15 14:30:25',
                    operator: 'admin_system',
                    operatorName: '张**',
                    action: 'USER_CREATE',
                    actionName: '创建用户',
                    target: 'exhibitor_001',
                    targetName: '刘**',
                    result: 'success',
                    ip: '192.168.1.100',
                    userAgent: 'Chrome 120.0.0.0 Windows NT',
                    details: '创建参展商用户账号，分配基础权限',
                    riskLevel: 'low'
                },
                {
                    id: 'LOG002',
                    key: 'LOG002',
                    time: '2024-01-15 14:25:18',
                    operator: 'security_admin',
                    operatorName: '王**',
                    action: 'ROLE_ASSIGN',
                    actionName: '分配角色',
                    target: 'exhibition_admin',
                    targetName: '陈**',
                    result: 'success',
                    ip: '192.168.1.105',
                    userAgent: 'Firefox 120.0.0.0 Windows NT',
                    details: '为会展管理员分配展会管理权限',
                    riskLevel: 'medium'
                },
                {
                    id: 'LOG003',
                    key: 'LOG003',
                    time: '2024-01-15 13:45:32',
                    operator: 'audit_manager',
                    operatorName: '李**',
                    action: 'PERMISSION_CHANGE',
                    actionName: '权限变更',
                    target: 'ROLE004',
                    targetName: '会展管理员',
                    result: 'success',
                    ip: '192.168.1.102',
                    userAgent: 'Chrome 120.0.0.0 macOS',
                    details: '为会展管理员角色添加用户查看权限',
                    riskLevel: 'medium'
                },
                {
                    id: 'LOG004',
                    key: 'LOG004',
                    time: '2024-01-15 13:20:15',
                    operator: 'admin_system',
                    operatorName: '张**',
                    action: 'USER_EDIT',
                    actionName: '编辑用户',
                    target: 'association_leader',
                    targetName: '赵**',
                    result: 'success',
                    ip: '192.168.1.100',
                    userAgent: 'Chrome 120.0.0.0 Windows NT',
                    details: '更新协会领导用户信息，修改联系方式',
                    riskLevel: 'low'
                },
                {
                    id: 'LOG005',
                    key: 'LOG005',
                    time: '2024-01-15 12:55:42',
                    operator: 'security_admin',
                    operatorName: '王**',
                    action: 'USER_SUSPEND',
                    actionName: '禁用用户',
                    target: 'test_user_001',
                    targetName: '测试用户',
                    result: 'success',
                    ip: '192.168.1.105',
                    userAgent: 'Firefox 120.0.0.0 Windows NT',
                    details: '禁用违规测试用户账号',
                    riskLevel: 'high'
                },
                {
                    id: 'LOG006',
                    key: 'LOG006',
                    time: '2024-01-15 11:30:28',
                    operator: 'admin_system',
                    operatorName: '张**',
                    action: 'ORGANIZATION_CREATE',
                    actionName: '创建组织',
                    target: 'ORG007',
                    targetName: '技术支持部',
                    result: 'success',
                    ip: '192.168.1.100',
                    userAgent: 'Chrome 120.0.0.0 Windows NT',
                    details: '创建新的技术支持部门组织',
                    riskLevel: 'low'
                },
                {
                    id: 'LOG007',
                    key: 'LOG007',
                    time: '2024-01-15 10:45:10',
                    operator: 'audit_manager',
                    operatorName: '李**',
                    action: 'AUDIT_EXPORT',
                    actionName: '导出审计',
                    target: 'audit_report_20240115',
                    targetName: '1月15日审计报告',
                    result: 'success',
                    ip: '192.168.1.102',
                    userAgent: 'Chrome 120.0.0.0 macOS',
                    details: '导出今日审计日志报告',
                    riskLevel: 'low'
                },
                {
                    id: 'LOG008',
                    key: 'LOG008',
                    time: '2024-01-15 09:15:33',
                    operator: 'security_admin',
                    operatorName: '王**',
                    action: 'PASSWORD_RESET',
                    actionName: '重置密码',
                    target: 'exhibitor_002',
                    targetName: '张**',
                    result: 'success',
                    ip: '192.168.1.105',
                    userAgent: 'Firefox 120.0.0.0 Windows NT',
                    details: '应用户请求重置登录密码',
                    riskLevel: 'medium'
                }
            ];
            setAuditLogs(mockLogs);
            setLoading(false);
        }, 600);
    };

    // 渲染用户类型标签
    const renderUserType = (type) => {
        const config = {
            admin: { color: 'red', text: '系统管理员', icon: '👑' },
            exhibition_company: { color: 'blue', text: '会展公司', icon: '🏢' },
            exhibitor: { color: 'green', text: '参展商', icon: '🏪' },
            association: { color: 'purple', text: '轨道协会', icon: '🏛️' },
            visitor: { color: 'orange', text: '普通用户', icon: '👤' }
        };
        const t = config[type] || config.visitor;
        return React.createElement(Tag, { color: t.color }, [
            React.createElement('span', { key: 'icon' }, t.icon),
            ` ${t.text}`
        ]);
    };

    // 渲染状态标签
    const renderStatus = (status) => {
        const config = {
            active: { color: 'green', text: '正常' },
            suspended: { color: 'red', text: '禁用' },
            pending: { color: 'orange', text: '待审核' },
            locked: { color: 'volcano', text: '锁定' }
        };
        const s = config[status] || config.active;
        return React.createElement(Tag, { color: s.color }, s.text);
    };

    // 渲染安全等级
    const renderSecurityLevel = (level) => {
        const config = {
            high: { color: 'red', text: '高级' },
            medium: { color: 'orange', text: '中级' },
            low: { color: 'green', text: '低级' }
        };
        const l = config[level] || config.low;
        return React.createElement(Tag, { color: l.color }, l.text);
    };

    // 用户表格列配置
    const userColumns = [
        {
            title: '用户ID',
            dataIndex: 'id',
            width: 100,
            fixed: 'left'
        },
        {
            title: '用户信息',
            dataIndex: 'username',
            width: 200,
            fixed: 'left',
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', {
                    key: 'name',
                    style: { display: 'flex', alignItems: 'center', marginBottom: '4px' }
                }, [
                    React.createElement(Avatar, {
                        key: 'avatar',
                        size: 'small',
                        style: { backgroundColor: '#2563eb', marginRight: '8px' }
                    }, record.realName.charAt(0)),
                    React.createElement('span', {
                        key: 'username',
                        style: { fontWeight: 'bold' }
                    }, text)
                ]),
                React.createElement('div', {
                    key: 'real',
                    style: { fontSize: '12px', color: '#6b7280' }
                }, `真实姓名: ${record.realName}`)
            ])
        },
        {
            title: '用户类型',
            dataIndex: 'userType',
            width: 130,
            render: renderUserType,
            filters: [
                { text: '系统管理员', value: 'admin' },
                { text: '会展公司', value: 'exhibition_company' },
                { text: '参展商', value: 'exhibitor' },
                { text: '轨道协会', value: 'association' },
                { text: '普通用户', value: 'visitor' }
            ]
        },
        {
            title: '所属组织',
            dataIndex: 'orgName',
            width: 150,
            ellipsis: { showTitle: false },
            render: (text) => React.createElement(Tooltip, { title: text }, text)
        },
        {
            title: '角色',
            dataIndex: 'roles',
            width: 120,
            render: (roles) => roles.map((role, index) => 
                React.createElement(Tag, {
                    key: index,
                    size: 'small',
                    color: 'blue'
                }, role)
            )
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            width: 130,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'phone' }, text),
                React.createElement('div', {
                    key: 'email',
                    style: { fontSize: '12px', color: '#6b7280' }
                }, record.email)
            ])
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            render: renderStatus,
            filters: [
                { text: '正常', value: 'active' },
                { text: '禁用', value: 'suspended' },
                { text: '待审核', value: 'pending' },
                { text: '锁定', value: 'locked' }
            ]
        },
        {
            title: '安全等级',
            dataIndex: 'securityLevel',
            width: 100,
            render: renderSecurityLevel
        },
        {
            title: '双因子认证',
            dataIndex: 'twoFactorAuth',
            width: 110,
            render: (enabled) => React.createElement(Tag, {
                color: enabled ? 'green' : 'red'
            }, enabled ? '已启用' : '未启用')
        },
        {
            title: '最后登录',
            dataIndex: 'lastLogin',
            width: 140
        },
        {
            title: '登录次数',
            dataIndex: 'loginCount',
            width: 100,
            sorter: true
        },
        {
            title: '操作',
            width: 200,
            fixed: 'right',
            render: (_, record) => React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'detail',
                    size: 'small',
                    onClick: () => showUserDetail(record)
                }, '详情'),
                React.createElement(Button, {
                    key: 'edit',
                    size: 'small',
                    type: 'primary',
                    onClick: () => editUser(record)
                }, '编辑'),
                record.status === 'active' 
                    ? React.createElement(Button, {
                        key: 'suspend',
                        size: 'small',
                        danger: true,
                        onClick: () => suspendUser(record)
                    }, '禁用')
                    : React.createElement(Button, {
                        key: 'activate',
                        size: 'small',
                        type: 'primary',
                        onClick: () => activateUser(record)
                    }, '启用'),
                React.createElement(Button, {
                    key: 'reset',
                    size: 'small',
                    onClick: () => resetPassword(record)
                }, '重置密码')
            ])
        }
    ];

    // 用户操作函数
    const showUserDetail = (user) => {
        setCurrentUser(user);
        setModalVisible(true);
    };

    const editUser = (user) => {
        setCurrentUser(user);
        form.setFieldsValue(user);
        setModalVisible(true);
    };

    const suspendUser = (user) => {
        Modal.confirm({
            title: '确认禁用用户？',
            content: `确定要禁用用户 ${user.username} 吗？`,
            onOk: () => {
                antd.message.success('用户已禁用');
                loadUsers();
            }
        });
    };

    const activateUser = (user) => {
        Modal.confirm({
            title: '确认启用用户？',
            content: `确定要启用用户 ${user.username} 吗？`,
            onOk: () => {
                antd.message.success('用户已启用');
                loadUsers();
            }
        });
    };

    const resetPassword = (user) => {
        Modal.confirm({
            title: '确认重置密码？',
            content: `确定要重置用户 ${user.username} 的密码吗？`,
            onOk: () => {
                antd.message.success('密码已重置，新密码已发送至用户邮箱');
                loadUsers();
            }
        });
    };

    // 角色管理相关函数
    const editRole = (role) => {
        setCurrentRole(role);
        roleForm.setFieldsValue(role);
        setRoleModalVisible(true);
    };

    const deleteRole = (role) => {
        Modal.confirm({
            title: '确认删除角色？',
            content: `确定要删除角色"${role.name}"吗？这将影响 ${role.userCount} 个用户。`,
            onOk: () => {
                antd.message.success('角色已删除');
                loadRoles();
            }
        });
    };

    const configPermissions = (role) => {
        setCurrentRole(role);
        setActiveTab('permissions');
        antd.message.info(`正在为角色"${role.name}"配置权限`);
    };

    // 组织管理相关函数
    const editOrganization = (org) => {
        setCurrentOrg(org);
        orgForm.setFieldsValue(org);
        setOrgModalVisible(true);
    };

    const addChildOrganization = (parentOrg) => {
        setCurrentOrg({ parentId: parentOrg.id, level: parentOrg.level + 1 });
        orgForm.resetFields();
        orgForm.setFieldsValue({ parentId: parentOrg.id, level: parentOrg.level + 1 });
        setOrgModalVisible(true);
    };

    // 权限管理相关函数
    const removePermission = (roleId, permission) => {
        Modal.confirm({
            title: '确认移除权限？',
            content: `确定要移除权限"${permission}"吗？`,
            onOk: () => {
                // 更新角色权限
                const updatedRole = { ...currentRole };
                updatedRole.permissions = updatedRole.permissions.filter(p => p !== permission);
                setCurrentRole(updatedRole);
                antd.message.success('权限已移除');
            }
        });
    };

    const saveRolePermissions = (roleId) => {
        Modal.confirm({
            title: '确认保存权限？',
            content: '确定要保存当前的权限配置吗？',
            onOk: () => {
                antd.message.success('权限配置已保存');
                loadRoles();
            }
        });
    };

    const resetRolePermissions = (roleId) => {
        Modal.confirm({
            title: '确认重置权限？',
            content: '确定要重置为默认权限配置吗？此操作不可撤销。',
            onOk: () => {
                antd.message.success('权限已重置为默认配置');
                loadRoles();
            }
        });
    };

    // 审计相关函数
    const showAuditDetail = (record) => {
        Modal.info({
            title: '操作审计详情',
            width: 600,
            content: React.createElement(Descriptions, {
                bordered: true,
                column: 1,
                items: [
                    { key: 'time', label: '操作时间', children: record.time },
                    { key: 'operator', label: '操作员', children: `${record.operatorName} (${record.operator})` },
                    { key: 'action', label: '操作类型', children: record.actionName },
                    { key: 'target', label: '目标对象', children: `${record.targetName || record.target} (${record.target})` },
                    { key: 'result', label: '操作结果', children: record.result === 'success' ? '成功' : '失败' },
                    { key: 'ip', label: 'IP地址', children: record.ip },
                    { key: 'userAgent', label: '客户端', children: record.userAgent },
                    { key: 'riskLevel', label: '风险等级', children: record.riskLevel },
                    { key: 'details', label: '详细信息', children: record.details }
                ]
            })
        });
    };

    // 权限配置相关函数
    const addModulePermissions = (moduleCode, actions = null) => {
        if (!currentRole) return;
        
        const module = permissions.find(p => p.code === moduleCode);
        if (!module || !module.children) return;
        
        const permissionsToAdd = actions 
            ? module.children.filter(perm => actions.some(action => perm.code.includes(action)))
            : module.children;
            
        const newPermissions = permissionsToAdd
            .map(perm => perm.code)
            .filter(code => !currentRole.permissions.includes(code));
            
        if (newPermissions.length === 0) {
            antd.message.warning('所选权限已存在');
            return;
        }
        
        const updatedRole = { ...currentRole };
        updatedRole.permissions = [...updatedRole.permissions, ...newPermissions];
        setCurrentRole(updatedRole);
        antd.message.success(`已添加 ${newPermissions.length} 个权限`);
    };

    const clearAllPermissions = () => {
        Modal.confirm({
            title: '确认清空权限？',
            content: '确定要清空当前角色的所有权限吗？此操作不可撤销。',
            onOk: () => {
                const updatedRole = { ...currentRole };
                updatedRole.permissions = [];
                setCurrentRole(updatedRole);
                antd.message.success('权限已清空');
            }
        });
    };

    const copyRolePermissions = (roleId) => {
        // 复制权限配置到剪贴板（模拟）
        const permissionText = currentRole.permissions.join(', ');
        antd.message.success('权限配置已复制到剪贴板');
        console.log('复制的权限:', permissionText);
    };

    // 批量操作函数
    const batchOperation = (operation) => {
        if (selectedRows.length === 0) {
            antd.message.warning('请先选择要操作的用户');
            return;
        }

        const selectedUsers = users.filter(user => selectedRows.includes(user.id));
        const userNames = selectedUsers.map(user => user.username).join(', ');

        switch (operation) {
            case 'activate':
                Modal.confirm({
                    title: '批量启用用户',
                    content: `确定要启用以下 ${selectedRows.length} 个用户吗？\n${userNames}`,
                    onOk: () => {
                        antd.message.success(`已成功启用 ${selectedRows.length} 个用户`);
                        setSelectedRows([]);
                        loadUsers();
                    }
                });
                break;
            case 'suspend':
                Modal.confirm({
                    title: '批量禁用用户',
                    content: `确定要禁用以下 ${selectedRows.length} 个用户吗？\n${userNames}`,
                    onOk: () => {
                        antd.message.success(`已成功禁用 ${selectedRows.length} 个用户`);
                        setSelectedRows([]);
                        loadUsers();
                    }
                });
                break;
            case 'delete':
                Modal.confirm({
                    title: '批量删除用户',
                    content: `⚠️ 危险操作！确定要删除以下 ${selectedRows.length} 个用户吗？此操作不可撤销！\n${userNames}`,
                    okType: 'danger',
                    onOk: () => {
                        antd.message.success(`已成功删除 ${selectedRows.length} 个用户`);
                        setSelectedRows([]);
                        loadUsers();
                    }
                });
                break;
            case 'export':
                antd.message.loading('正在导出用户数据...', 2);
                setTimeout(() => {
                    antd.message.success(`已成功导出 ${selectedRows.length} 个用户的数据`);
                    console.log('导出的用户数据:', selectedUsers);
                }, 2000);
                break;
            default:
                antd.message.error('未知操作类型');
        }
    };

    // Tab配置
    const tabItems = [
        {
            key: 'users',
            label: React.createElement('span', {}, ['👥 ', '用户管理']),
            children: React.createElement('div', {}, [
                // 筛选和操作栏
                React.createElement('div', {
                    key: 'toolbar',
                    style: {
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    React.createElement(Space, {
                        key: 'filters'
                    }, [
                        React.createElement(Input.Search, {
                            placeholder: '搜索用户名、手机号、邮箱...',
                            style: { width: 300 },
                            onSearch: (value) => console.log('搜索:', value)
                        }),
                        React.createElement(Select, {
                            placeholder: '用户类型',
                            style: { width: 130 },
                            allowClear: true,
                            options: [
                                { value: 'admin', label: '系统管理员' },
                                { value: 'exhibition_company', label: '会展公司' },
                                { value: 'exhibitor', label: '参展商' },
                                { value: 'association', label: '轨道协会' },
                                { value: 'visitor', label: '普通用户' }
                            ]
                        }),
                        React.createElement(Select, {
                            placeholder: '状态筛选',
                            style: { width: 120 },
                            allowClear: true,
                            options: [
                                { value: 'active', label: '正常' },
                                { value: 'suspended', label: '禁用' },
                                { value: 'pending', label: '待审核' },
                                { value: 'locked', label: '锁定' }
                            ]
                        })
                    ]),
                    React.createElement(Space, {
                        key: 'actions'
                    }, [
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => {
                                setCurrentUser(null);
                                form.resetFields();
                                setModalVisible(true);
                            }
                        }, '新建用户'),
                        React.createElement(Button, {
                            disabled: selectedRows.length === 0,
                            onClick: () => {
                                const { Dropdown } = antd;
                                const items = [
                                    {
                                        key: 'batchActive',
                                        label: '批量启用',
                                        onClick: () => batchOperation('activate')
                                    },
                                    {
                                        key: 'batchSuspend',
                                        label: '批量禁用',
                                        onClick: () => batchOperation('suspend')
                                    },
                                    {
                                        key: 'batchDelete',
                                        label: '批量删除',
                                        danger: true,
                                        onClick: () => batchOperation('delete')
                                    },
                                    {
                                        key: 'batchExport',
                                        label: '导出选中',
                                        onClick: () => batchOperation('export')
                                    }
                                ];
                                
                                // 临时显示菜单选项
                                Modal.confirm({
                                    title: '批量操作',
                                    content: React.createElement('div', {}, [
                                        React.createElement('p', { key: 'info' }, `已选择 ${selectedRows.length} 个用户，请选择操作：`),
                                        React.createElement('div', { key: 'buttons', style: { marginTop: '16px' } }, [
                                            React.createElement(Button, {
                                                key: 'activate',
                                                style: { marginRight: '8px', marginBottom: '8px' },
                                                onClick: () => {
                                                    Modal.destroyAll();
                                                    batchOperation('activate');
                                                }
                                            }, '批量启用'),
                                            React.createElement(Button, {
                                                key: 'suspend',
                                                style: { marginRight: '8px', marginBottom: '8px' },
                                                onClick: () => {
                                                    Modal.destroyAll();
                                                    batchOperation('suspend');
                                                }
                                            }, '批量禁用'),
                                            React.createElement(Button, {
                                                key: 'export',
                                                style: { marginRight: '8px', marginBottom: '8px' },
                                                onClick: () => {
                                                    Modal.destroyAll();
                                                    batchOperation('export');
                                                }
                                            }, '导出选中'),
                                            React.createElement(Button, {
                                                key: 'delete',
                                                danger: true,
                                                style: { marginBottom: '8px' },
                                                onClick: () => {
                                                    Modal.destroyAll();
                                                    batchOperation('delete');
                                                }
                                            }, '批量删除')
                                        ])
                                    ]),
                                    okText: '取消',
                                    cancelButtonProps: { style: { display: 'none' } }
                                });
                            }
                        }, `批量操作 (${selectedRows.length})`),
                        React.createElement(Button, {
                            onClick: loadUsers
                        }, '刷新')
                    ])
                ]),
                // 数据表格
                React.createElement(Table, {
                    key: 'table',
                    columns: userColumns,
                    dataSource: users,
                    loading: loading,
                    rowSelection: {
                        selectedRowKeys: selectedRows,
                        onChange: setSelectedRows
                    },
                    scroll: { x: 1800 },
                    pagination: {
                        total: 25648,
                        pageSize: 20,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                    }
                })
            ])
        },
        {
            key: 'organizations',
            label: React.createElement('span', {}, ['🏛️ ', '组织架构']),
            children: React.createElement('div', {}, [
                // 操作栏
                React.createElement('div', {
                    key: 'toolbar',
                    style: {
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    React.createElement(Space, {
                        key: 'filters'
                    }, [
                        React.createElement(Input.Search, {
                            placeholder: '搜索组织名称...',
                            style: { width: 250 },
                            onSearch: (value) => console.log('搜索组织:', value)
                        }),
                        React.createElement(Select, {
                            placeholder: '组织类型',
                            style: { width: 120 },
                            allowClear: true,
                            options: [
                                { value: 'admin', label: '管理部门' },
                                { value: 'association', label: '协会组织' },
                                { value: 'company', label: '企业机构' },
                                { value: 'committee', label: '委员会' }
                            ]
                        })
                    ]),
                    React.createElement(Space, {
                        key: 'actions'
                    }, [
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => {
                                setCurrentOrg(null);
                                orgForm.resetFields();
                                setOrgModalVisible(true);
                            }
                        }, '新建组织'),
                        React.createElement(Button, {
                            onClick: loadOrganizations
                        }, '刷新')
                    ])
                ]),
                
                React.createElement(Row, { key: 'content', gutter: 16 }, [
                    // 左侧组织树
                    React.createElement(Col, { key: 'tree', span: 8 },
                        React.createElement(Card, {
                            title: '组织架构树',
                            size: 'small',
                            style: { height: '600px', overflow: 'auto' }
                        }, React.createElement(Tree, {
                            treeData: organizations,
                            showLine: true,
                            showIcon: false,
                            defaultExpandAll: true,
                            fieldNames: {
                                title: 'name',
                                key: 'id',
                                children: 'children'
                            },
                            titleRender: (nodeData) => React.createElement('div', {
                                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                            }, [
                                React.createElement('span', { key: 'name' }, nodeData.name),
                                React.createElement('span', { 
                                    key: 'count',
                                    style: { fontSize: '12px', color: '#6b7280' }
                                }, `(${nodeData.memberCount || 0})`)
                            ]),
                            onSelect: (selectedKeys, info) => {
                                if (selectedKeys.length > 0) {
                                    const selectedOrg = info.node;
                                    setCurrentOrg(selectedOrg);
                                }
                            }
                        }))
                    ),
                    
                    // 右侧组织详情
                    React.createElement(Col, { key: 'detail', span: 16 },
                        React.createElement(Card, {
                            title: currentOrg ? `组织详情 - ${currentOrg.name}` : '选择组织查看详情',
                            size: 'small',
                            extra: currentOrg && React.createElement(Space, {}, [
                                React.createElement(Button, {
                                    key: 'edit',
                                    size: 'small',
                                    type: 'primary',
                                    onClick: () => editOrganization(currentOrg)
                                }, '编辑'),
                                React.createElement(Button, {
                                    key: 'addChild',
                                    size: 'small',
                                    onClick: () => addChildOrganization(currentOrg)
                                }, '添加子组织')
                            ])
                        }, currentOrg ? React.createElement(Descriptions, {
                            bordered: true,
                            column: 2,
                            items: [
                                {
                                    key: 'name',
                                    label: '组织名称',
                                    children: currentOrg.name
                                },
                                {
                                    key: 'type',
                                    label: '组织类型',
                                    children: React.createElement(Tag, {
                                        color: currentOrg.type === 'admin' ? 'red' : 
                                               currentOrg.type === 'association' ? 'purple' : 
                                               currentOrg.type === 'company' ? 'blue' : 'green'
                                    }, currentOrg.type === 'admin' ? '管理部门' :
                                       currentOrg.type === 'association' ? '协会组织' :
                                       currentOrg.type === 'company' ? '企业机构' : '委员会')
                                },
                                {
                                    key: 'level',
                                    label: '组织层级',
                                    children: `第 ${currentOrg.level} 级`
                                },
                                {
                                    key: 'status',
                                    label: '状态',
                                    children: React.createElement(Tag, {
                                        color: currentOrg.status === 'active' ? 'green' : 'red'
                                    }, currentOrg.status === 'active' ? '启用' : '禁用')
                                },
                                {
                                    key: 'memberCount',
                                    label: '成员数量',
                                    children: `${currentOrg.memberCount || 0} 人`
                                },
                                {
                                    key: 'createTime',
                                    label: '创建时间',
                                    children: currentOrg.createTime
                                },
                                {
                                    key: 'description',
                                    label: '组织描述',
                                    span: 2,
                                    children: currentOrg.description || '暂无描述'
                                }
                            ]
                        }) : React.createElement('div', {
                            style: { 
                                textAlign: 'center', 
                                padding: '60px 0', 
                                color: '#6b7280' 
                            }
                        }, [
                            React.createElement('div', {
                                key: 'icon',
                                style: { fontSize: '48px', marginBottom: '16px' }
                            }, '🏛️'),
                            React.createElement('div', { key: 'text' }, '请在左侧选择组织查看详情')
                        ]))
                    )
                ])
            ])
        },
        {
            key: 'roles',
            label: React.createElement('span', {}, ['🔐 ', '角色管理']),
            children: React.createElement('div', {}, [
                // 筛选和操作栏
                React.createElement('div', {
                    key: 'toolbar',
                    style: {
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    React.createElement(Space, {
                        key: 'filters'
                    }, [
                        React.createElement(Input.Search, {
                            placeholder: '搜索角色名称、代码...',
                            style: { width: 250 },
                            onSearch: (value) => console.log('搜索角色:', value)
                        }),
                        React.createElement(Select, {
                            placeholder: '角色类型',
                            style: { width: 120 },
                            allowClear: true,
                            options: [
                                { value: 'admin', label: '管理角色' },
                                { value: 'business', label: '业务角色' },
                                { value: 'guest', label: '访客角色' }
                            ]
                        })
                    ]),
                    React.createElement(Space, {
                        key: 'actions'
                    }, [
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => {
                                setCurrentRole(null);
                                roleForm.resetFields();
                                setRoleModalVisible(true);
                            }
                        }, '新建角色'),
                        React.createElement(Button, {
                            onClick: loadRoles
                        }, '刷新')
                    ])
                ]),
                // 角色表格
                React.createElement(Table, {
                    key: 'roleTable',
                    dataSource: roles,
                    loading: loading,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                    },
                    columns: [
                        {
                            title: '角色名称',
                            dataIndex: 'name',
                            width: 150,
                            render: (text, record) => React.createElement('div', {}, [
                                React.createElement('div', {
                                    key: 'name',
                                    style: { fontWeight: 'bold', marginBottom: '4px' }
                                }, text),
                                React.createElement('div', {
                                    key: 'code',
                                    style: { fontSize: '12px', color: '#6b7280' }
                                }, `代码: ${record.code}`)
                            ])
                        },
                        {
                            title: '角色类型',
                            dataIndex: 'type',
                            width: 100,
                            render: (type) => {
                                const config = {
                                    admin: { color: 'red', text: '管理角色' },
                                    business: { color: 'blue', text: '业务角色' },
                                    guest: { color: 'green', text: '访客角色' }
                                };
                                const t = config[type] || config.guest;
                                return React.createElement(Tag, { color: t.color }, t.text);
                            }
                        },
                        {
                            title: '权限等级',
                            dataIndex: 'level',
                            width: 100,
                            render: (level) => {
                                const config = {
                                    high: { color: 'red', text: '高级' },
                                    medium: { color: 'orange', text: '中级' },
                                    low: { color: 'green', text: '低级' }
                                };
                                const l = config[level] || config.low;
                                return React.createElement(Tag, { color: l.color }, l.text);
                            }
                        },
                        {
                            title: '用户数量',
                            dataIndex: 'userCount',
                            width: 100,
                            sorter: true
                        },
                        {
                            title: '权限数量',
                            dataIndex: 'permissions',
                            width: 100,
                            render: (permissions) => React.createElement(Tag, {
                                color: 'blue'
                            }, `${permissions.length} 项`)
                        },
                        {
                            title: '状态',
                            dataIndex: 'status',
                            width: 80,
                            render: (status) => React.createElement(Tag, {
                                color: status === 'active' ? 'green' : 'red'
                            }, status === 'active' ? '启用' : '禁用')
                        },
                        {
                            title: '创建时间',
                            dataIndex: 'createTime',
                            width: 120
                        },
                        {
                            title: '描述',
                            dataIndex: 'description',
                            ellipsis: { showTitle: false },
                            render: (text) => React.createElement(Tooltip, { title: text }, text)
                        },
                        {
                            title: '操作',
                            width: 180,
                            fixed: 'right',
                            render: (_, record) => React.createElement(Space, {}, [
                                React.createElement(Button, {
                                    key: 'edit',
                                    size: 'small',
                                    type: 'primary',
                                    onClick: () => editRole(record)
                                }, '编辑'),
                                React.createElement(Button, {
                                    key: 'permission',
                                    size: 'small',
                                    onClick: () => configPermissions(record)
                                }, '配置权限'),
                                record.canDelete && React.createElement(Button, {
                                    key: 'delete',
                                    size: 'small',
                                    danger: true,
                                    onClick: () => deleteRole(record)
                                }, '删除')
                            ].filter(Boolean))
                        }
                    ]
                })
            ])
        },
        {
            key: 'permissions',
            label: React.createElement('span', {}, ['🛡️ ', '权限配置']),
            children: React.createElement('div', {}, [
                // 操作栏
                React.createElement('div', {
                    key: 'toolbar',
                    style: {
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    React.createElement(Space, {
                        key: 'info'
                    }, [
                        React.createElement(Alert, {
                            message: '权限配置说明',
                            description: '权限按模块和操作进行细分，每个角色可分配多个权限。系统将根据用户的角色自动判断操作权限。',
                            type: 'info',
                            showIcon: true,
                            style: { width: '600px' }
                        })
                    ]),
                    React.createElement(Button, {
                        type: 'primary',
                        onClick: () => {
                            antd.message.info('权限刷新中...');
                            loadPermissions();
                        }
                    }, '刷新权限')
                ]),
                
                React.createElement(Row, { key: 'content', gutter: 16 }, [
                    // 左侧权限树
                    React.createElement(Col, { key: 'tree', span: 10 },
                        React.createElement(Card, {
                            title: '权限树结构',
                            size: 'small',
                            style: { height: '600px', overflow: 'auto' }
                        }, React.createElement(Tree, {
                            treeData: permissions,
                            showLine: true,
                            showIcon: false,
                            defaultExpandAll: true,
                            checkable: true,
                            fieldNames: {
                                title: 'name',
                                key: 'id',
                                children: 'children'
                            },
                            titleRender: (nodeData) => React.createElement('div', {
                                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                            }, [
                                React.createElement('span', { key: 'name' }, nodeData.name),
                                nodeData.code && React.createElement(Tag, {
                                    key: 'code',
                                    size: 'small',
                                    color: 'blue'
                                }, nodeData.code)
                            ]),
                            onCheck: (checkedKeys, info) => {
                                console.log('选中的权限:', checkedKeys);
                            }
                        }))
                    ),
                    
                    // 右侧权限分配
                    React.createElement(Col, { key: 'assign', span: 14 },
                        React.createElement(Card, {
                            title: '角色权限分配',
                            size: 'small'
                        }, React.createElement('div', {}, [
                            // 角色选择
                            React.createElement('div', {
                                key: 'roleSelect',
                                style: { marginBottom: '16px' }
                            }, [
                                React.createElement('div', {
                                    key: 'label',
                                    style: { marginBottom: '8px', fontWeight: 'bold' }
                                }, '选择角色：'),
                                React.createElement(Select, {
                                    style: { width: '100%' },
                                    placeholder: '请选择要配置权限的角色',
                                    options: roles.map(role => ({
                                        value: role.id,
                                        label: `${role.name} (${role.code})`
                                    })),
                                    onChange: (roleId) => {
                                        const selectedRole = roles.find(r => r.id === roleId);
                                        setCurrentRole(selectedRole);
                                    }
                                })
                            ]),
                            
                            // 当前角色权限
                            currentRole && React.createElement('div', {
                                key: 'currentPermissions'
                            }, [
                                React.createElement('div', {
                                    key: 'title',
                                    style: { 
                                        marginBottom: '12px', 
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }
                                }, `${currentRole.name} 的权限列表`),
                                
                                React.createElement('div', {
                                    key: 'info',
                                    style: { marginBottom: '16px' }
                                }, React.createElement(Alert, {
                                    message: '权限配置说明',
                                    description: `当前角色类型：${currentRole.type === 'admin' ? '管理角色' : currentRole.type === 'business' ? '业务角色' : '访客角色'}，权限等级：${currentRole.level === 'high' ? '高级' : currentRole.level === 'medium' ? '中级' : '低级'}`,
                                    type: 'info',
                                    showIcon: true,
                                    style: { fontSize: '12px' }
                                })),
                                
                                React.createElement('div', {
                                    key: 'permissionList',
                                    style: { marginBottom: '16px' }
                                }, [
                                    React.createElement('div', {
                                        key: 'currentTitle',
                                        style: { marginBottom: '8px', fontWeight: 'bold' }
                                    }, '当前权限：'),
                                    React.createElement('div', {
                                        key: 'currentPerms',
                                        style: { 
                                            border: '1px solid #e8e8e8', 
                                            borderRadius: '6px', 
                                            padding: '12px',
                                            backgroundColor: '#fafafa',
                                            minHeight: '80px'
                                        }
                                    }, currentRole.permissions.length > 0 ? currentRole.permissions.map((perm, index) => 
                                        React.createElement(Tag, {
                                            key: index,
                                            color: 'blue',
                                            closable: true,
                                            style: { marginBottom: '6px' },
                                            onClose: () => removePermission(currentRole.id, perm)
                                        }, perm)
                                    ) : React.createElement('div', { 
                                        style: { color: '#999', textAlign: 'center', lineHeight: '56px' } 
                                    }, '暂无权限')),
                                    React.createElement(Space, {
                                        key: 'actions'
                                    }, [
                                        React.createElement(Button, {
                                            type: 'primary',
                                            icon: React.createElement('span', {}, '💾'),
                                            onClick: () => saveRolePermissions(currentRole.id)
                                        }, '保存权限配置'),
                                        React.createElement(Button, {
                                            icon: React.createElement('span', {}, '🔄'),
                                            onClick: () => resetRolePermissions(currentRole.id)
                                        }, '重置为默认权限'),
                                        React.createElement(Button, {
                                            icon: React.createElement('span', {}, '📋'),
                                            onClick: () => copyRolePermissions(currentRole.id)
                                        }, '复制权限配置')
                                    ])
                                ]),
                                
                                // 快捷权限分配
                                React.createElement('div', {
                                    key: 'quickAssign',
                                    style: { marginBottom: '16px' }
                                }, [
                                    React.createElement('div', {
                                        key: 'quickTitle',
                                        style: { marginBottom: '8px', fontWeight: 'bold' }
                                    }, '快捷权限分配：'),
                                    React.createElement(Space, {
                                        key: 'quickButtons',
                                        wrap: true
                                    }, [
                                        React.createElement(Button, {
                                            key: 'userAll',
                                            size: 'small',
                                            onClick: () => addModulePermissions('user')
                                        }, '用户管理全权限'),
                                        React.createElement(Button, {
                                            key: 'auditView',
                                            size: 'small',
                                            onClick: () => addModulePermissions('audit', ['view'])
                                        }, '审计查看权限'),
                                        React.createElement(Button, {
                                            key: 'contentManage',
                                            size: 'small',
                                            onClick: () => addModulePermissions('content')
                                        }, '内容管理权限'),
                                        React.createElement(Button, {
                                            key: 'orgView',
                                            size: 'small',
                                            onClick: () => addModulePermissions('organization', ['view'])
                                        }, '组织查看权限'),
                                        React.createElement(Button, {
                                            key: 'clearAll',
                                            size: 'small',
                                            danger: true,
                                            onClick: () => clearAllPermissions()
                                        }, '清空权限')
                                    ])
                                ]),
                                
                                // 详细权限选择器
                                React.createElement('div', {
                                    key: 'detailPermissions',
                                    style: { marginBottom: '16px' }
                                }, [
                                    React.createElement('div', {
                                        key: 'detailTitle',
                                        style: { marginBottom: '8px', fontWeight: 'bold' }
                                    }, '添加具体权限：'),
                                    React.createElement(Select, {
                                        key: 'permissionSelect',
                                        style: { width: '100%', marginBottom: '8px' },
                                        placeholder: '选择要添加的权限',
                                        showSearch: true,
                                        filterOption: (input, option) =>
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                                        options: permissions.flatMap(module => 
                                            module.children?.map(perm => ({
                                                value: perm.code,
                                                label: `${module.name} - ${perm.name}`,
                                                disabled: currentRole.permissions.includes(perm.code)
                                            })) || []
                                        ),
                                        onChange: (value) => {
                                            if (value && !currentRole.permissions.includes(value)) {
                                                const updatedRole = { ...currentRole };
                                                updatedRole.permissions = [...updatedRole.permissions, value];
                                                setCurrentRole(updatedRole);
                                                antd.message.success('权限已添加');
                                            }
                                        }
                                    })
                                ]),
                                
                                React.createElement(Space, {
                                    key: 'actions'
                                }, [
                                    React.createElement(Button, {
                                        type: 'primary',
                                        icon: React.createElement('span', {}, '💾'),
                                        onClick: () => saveRolePermissions(currentRole.id)
                                    }, '保存权限配置'),
                                    React.createElement(Button, {
                                        icon: React.createElement('span', {}, '🔄'),
                                        onClick: () => resetRolePermissions(currentRole.id)
                                    }, '重置为默认权限'),
                                    React.createElement(Button, {
                                        icon: React.createElement('span', {}, '📋'),
                                        onClick: () => copyRolePermissions(currentRole.id)
                                    }, '复制权限配置')
                                ])
                            ]),
                            
                            // 没有选择角色时的提示
                            !currentRole && React.createElement('div', {
                                style: { 
                                    textAlign: 'center', 
                                    padding: '60px 0', 
                                    color: '#6b7280' 
                                }
                            }, [
                                React.createElement('div', {
                                    key: 'icon',
                                    style: { fontSize: '48px', marginBottom: '16px' }
                                }, '🛡️'),
                                React.createElement('div', { key: 'text' }, '请选择角色进行权限配置')
                            ])
                        ]))
                    )
                ])
            ])
        },
        {
            key: 'audit',
            label: React.createElement('span', {}, ['📋 ', '操作审计']),
            children: React.createElement('div', {}, [
                // 筛选和操作栏
                React.createElement('div', {
                    key: 'toolbar',
                    style: {
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    React.createElement(Space, {
                        key: 'filters'
                    }, [
                        React.createElement(Input.Search, {
                            placeholder: '搜索操作员、目标对象...',
                            style: { width: 250 },
                            onSearch: (value) => console.log('搜索审计:', value)
                        }),
                        React.createElement(Select, {
                            placeholder: '操作类型',
                            style: { width: 120 },
                            allowClear: true,
                            options: [
                                { value: 'USER_CREATE', label: '创建用户' },
                                { value: 'USER_EDIT', label: '编辑用户' },
                                { value: 'USER_DELETE', label: '删除用户' },
                                { value: 'ROLE_ASSIGN', label: '分配角色' },
                                { value: 'PERMISSION_CHANGE', label: '权限变更' }
                            ]
                        }),
                        React.createElement(Select, {
                            placeholder: '结果',
                            style: { width: 100 },
                            allowClear: true,
                            options: [
                                { value: 'success', label: '成功' },
                                { value: 'failure', label: '失败' }
                            ]
                        }),
                        React.createElement(DatePicker.RangePicker, {
                            style: { width: 240 },
                            placeholder: ['开始时间', '结束时间']
                        })
                    ]),
                    React.createElement(Space, {
                        key: 'actions'
                    }, [
                        React.createElement(Button, {
                            onClick: () => {
                                antd.message.success('审计日志导出中...');
                            }
                        }, '导出日志'),
                        React.createElement(Button, {
                            onClick: loadAuditLogs
                        }, '刷新')
                    ])
                ]),
                
                // 审计日志表格
                React.createElement(Table, {
                    key: 'auditTable',
                    dataSource: auditLogs,
                    loading: loading,
                    scroll: { x: 1400 },
                    pagination: {
                        pageSize: 20,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                    },
                    columns: [
                        {
                            title: '时间',
                            dataIndex: 'time',
                            width: 160,
                            sorter: true,
                            fixed: 'left'
                        },
                        {
                            title: '操作员',
                            dataIndex: 'operator',
                            width: 150,
                            render: (text, record) => React.createElement('div', {}, [
                                React.createElement('div', {
                                    key: 'name',
                                    style: { fontWeight: 'bold' }
                                }, record.operatorName),
                                React.createElement('div', {
                                    key: 'username',
                                    style: { fontSize: '12px', color: '#6b7280' }
                                }, text)
                            ])
                        },
                        {
                            title: '操作类型',
                            dataIndex: 'action',
                            width: 120,
                            render: (text, record) => React.createElement('div', {}, [
                                React.createElement(Tag, {
                                    key: 'action',
                                    color: text === 'USER_CREATE' ? 'green' :
                                           text === 'USER_EDIT' ? 'blue' :
                                           text === 'USER_DELETE' ? 'red' :
                                           text === 'ROLE_ASSIGN' ? 'purple' : 'orange'
                                }, record.actionName),
                                React.createElement('div', {
                                    key: 'code',
                                    style: { fontSize: '11px', color: '#8b9dc3', marginTop: '2px' }
                                }, text)
                            ])
                        },
                        {
                            title: '目标对象',
                            dataIndex: 'target',
                            width: 150,
                            render: (text, record) => React.createElement('div', {}, [
                                React.createElement('div', {
                                    key: 'name',
                                    style: { fontWeight: 'bold' }
                                }, record.targetName || text),
                                React.createElement('div', {
                                    key: 'id',
                                    style: { fontSize: '12px', color: '#6b7280' }
                                }, text)
                            ])
                        },
                        {
                            title: '结果',
                            dataIndex: 'result',
                            width: 80,
                            render: (result) => React.createElement(Tag, {
                                color: result === 'success' ? 'green' : 'red'
                            }, result === 'success' ? '成功' : '失败')
                        },
                        {
                            title: 'IP地址',
                            dataIndex: 'ip',
                            width: 120
                        },
                        {
                            title: '客户端',
                            dataIndex: 'userAgent',
                            width: 150,
                            ellipsis: { showTitle: false },
                            render: (text) => React.createElement(Tooltip, { title: text }, 
                                text.split(' ')[0] // 只显示浏览器名称
                            )
                        },
                        {
                            title: '风险等级',
                            dataIndex: 'riskLevel',
                            width: 100,
                            render: (level) => {
                                const config = {
                                    low: { color: 'green', text: '低风险' },
                                    medium: { color: 'orange', text: '中风险' },
                                    high: { color: 'red', text: '高风险' }
                                };
                                const l = config[level] || config.low;
                                return React.createElement(Tag, { color: l.color }, l.text);
                            }
                        },
                        {
                            title: '详情',
                            dataIndex: 'details',
                            ellipsis: { showTitle: false },
                            render: (text) => React.createElement(Tooltip, { title: text }, text)
                        },
                        {
                            title: '操作',
                            width: 100,
                            fixed: 'right',
                            render: (_, record) => React.createElement(Button, {
                                size: 'small',
                                onClick: () => showAuditDetail(record)
                            }, '详情')
                        }
                    ]
                })
            ])
        }
    ];

    return React.createElement('div', {}, [
        // 页面标题
        React.createElement('div', {
            key: 'header',
            style: {
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('h2', {
                key: 'title',
                style: {
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e293b'
                }
            }, '用户管理'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'export',
                    icon: React.createElement('span', {}, '📊')
                }, '导出报告'),
                React.createElement(Button, {
                    key: 'import',
                    icon: React.createElement('span', {}, '📁')
                }, '批量导入'),
                React.createElement(Button, {
                    key: 'settings',
                    type: 'primary',
                    icon: React.createElement('span', {}, '⚙️')
                }, '系统设置')
            ])
        ]),

        // 统计卡片
        React.createElement('div', {
            key: 'stats',
            style: { marginBottom: '24px' }
        }, React.createElement(Row, { gutter: 16 }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }
                        }, '25,648'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '总用户数')
                    ])
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }
                        }, '24,892'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '活跃用户')
                    ])
                )
            ),
            React.createElement(Col, { key: 'suspended', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }
                        }, '156'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '禁用用户')
                    ])
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#f59e42' }
                        }, '600'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '待审核')
                    ])
                )
            )
        ])),

        // 主要内容Tab
        React.createElement(Card, {
            key: 'content'
        }, React.createElement(Tabs, {
            activeKey: activeTab,
            onChange: setActiveTab,
            items: tabItems
        })),

        // 用户详情/编辑模态框
        React.createElement(Modal, {
            key: 'userModal',
            title: currentUser ? (currentUser.id ? '编辑用户' : '新建用户') : '用户详情',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            width: 800,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setModalVisible(false)
                }, '关闭'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary',
                    onClick: () => {
                        form.validateFields().then(values => {
                            console.log('保存用户:', values);
                            antd.message.success(currentUser?.id ? '用户更新成功' : '用户创建成功');
                            setModalVisible(false);
                            loadUsers();
                        }).catch(err => {
                            console.log('验证失败:', err);
                        });
                    }
                }, '保存')
            ]
        }, currentUser ? React.createElement(Form, {
            form: form,
            layout: 'vertical',
            initialValues: currentUser
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 },
                    React.createElement(Form.Item, {
                        label: '用户名',
                        name: 'username',
                        rules: [{ required: true, message: '请输入用户名' }]
                    }, React.createElement(Input, { placeholder: '请输入用户名' }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 },
                    React.createElement(Form.Item, {
                        label: '真实姓名',
                        name: 'realName',
                        rules: [{ required: true, message: '请输入真实姓名' }]
                    }, React.createElement(Input, { placeholder: '请输入真实姓名' }))
                )
            ]),
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 },
                    React.createElement(Form.Item, {
                        label: '手机号',
                        name: 'phone',
                        rules: [{ required: true, message: '请输入手机号' }]
                    }, React.createElement(Input, { placeholder: '请输入手机号' }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 },
                    React.createElement(Form.Item, {
                        label: '邮箱',
                        name: 'email',
                        rules: [{ required: true, type: 'email', message: '请输入正确的邮箱' }]
                    }, React.createElement(Input, { placeholder: '请输入邮箱' }))
                )
            ]),
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 },
                    React.createElement(Form.Item, {
                        label: '用户类型',
                        name: 'userType',
                        rules: [{ required: true, message: '请选择用户类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择用户类型',
                        options: [
                            { value: 'admin', label: '系统管理员' },
                            { value: 'exhibition_company', label: '会展公司' },
                            { value: 'exhibitor', label: '参展商' },
                            { value: 'association', label: '轨道协会' },
                            { value: 'visitor', label: '普通用户' }
                        ]
                    }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 },
                    React.createElement(Form.Item, {
                        label: '所属组织',
                        name: 'orgId',
                        rules: [{ required: true, message: '请选择所属组织' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择所属组织',
                        options: organizations.map(org => ({ value: org.id, label: org.name }))
                    }))
                )
            ]),
            React.createElement(Row, { key: 'row4', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 },
                    React.createElement(Form.Item, {
                        label: '安全等级',
                        name: 'securityLevel'
                    }, React.createElement(Select, {
                        placeholder: '请选择安全等级',
                        options: [
                            { value: 'high', label: '高级' },
                            { value: 'medium', label: '中级' },
                            { value: 'low', label: '低级' }
                        ]
                    }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 },
                    React.createElement(Form.Item, {
                        label: '状态',
                        name: 'status'
                    }, React.createElement(Select, {
                        placeholder: '请选择状态',
                        options: [
                            { value: 'active', label: '正常' },
                            { value: 'suspended', label: '禁用' },
                            { value: 'pending', label: '待审核' },
                            { value: 'locked', label: '锁定' }
                        ]
                    }))
                )
            ]),
            React.createElement(Form.Item, {
                key: 'roles',
                label: '分配角色',
                name: 'roles'
            }, React.createElement(Select, {
                mode: 'multiple',
                placeholder: '请选择角色',
                options: roles.map(role => ({ value: role.name, label: role.name }))
            })),
            React.createElement(Form.Item, {
                key: 'twoFactorAuth',
                label: '双因子认证',
                name: 'twoFactorAuth',
                valuePropName: 'checked'
            }, React.createElement(Switch, {}))
        ]) : React.createElement('div', { style: { textAlign: 'center', padding: '40px' } }, '加载中...')),

        // 角色编辑模态框
        React.createElement(Modal, {
            key: 'roleModal',
            title: currentRole?.id ? '编辑角色' : '新建角色',
            open: roleModalVisible,
            onCancel: () => setRoleModalVisible(false),
            width: 600,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setRoleModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary',
                    onClick: () => {
                        roleForm.validateFields().then(values => {
                            console.log('保存角色:', values);
                            antd.message.success(currentRole?.id ? '角色更新成功' : '角色创建成功');
                            setRoleModalVisible(false);
                            loadRoles();
                        }).catch(err => {
                            console.log('验证失败:', err);
                        });
                    }
                }, '保存')
            ]
        }, React.createElement(Form, {
            form: roleForm,
            layout: 'vertical'
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                label: '角色名称',
                name: 'name',
                rules: [{ required: true, message: '请输入角色名称' }]
            }, React.createElement(Input, { placeholder: '请输入角色名称' })),
            React.createElement(Form.Item, {
                key: 'code',
                label: '角色代码',
                name: 'code',
                rules: [{ required: true, message: '请输入角色代码' }]
            }, React.createElement(Input, { placeholder: '请输入角色代码，如：ADMIN_USER' })),
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 },
                    React.createElement(Form.Item, {
                        label: '角色类型',
                        name: 'type',
                        rules: [{ required: true, message: '请选择角色类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择角色类型',
                        options: [
                            { value: 'admin', label: '管理角色' },
                            { value: 'business', label: '业务角色' },
                            { value: 'guest', label: '访客角色' }
                        ]
                    }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 },
                    React.createElement(Form.Item, {
                        label: '权限等级',
                        name: 'level',
                        rules: [{ required: true, message: '请选择权限等级' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择权限等级',
                        options: [
                            { value: 'high', label: '高级' },
                            { value: 'medium', label: '中级' },
                            { value: 'low', label: '低级' }
                        ]
                    }))
                )
            ]),
            React.createElement(Form.Item, {
                key: 'description',
                label: '角色描述',
                name: 'description'
            }, React.createElement(Input.TextArea, { 
                placeholder: '请输入角色描述',
                rows: 3
            })),
            React.createElement(Form.Item, {
                key: 'permissions',
                label: '分配权限',
                name: 'permissions'
            }, React.createElement(Select, {
                mode: 'multiple',
                placeholder: '请选择权限',
                options: permissions.flatMap(module => 
                    module.children?.map(perm => ({
                        value: perm.code,
                        label: `${module.name} - ${perm.name}`
                    })) || []
                )
            })),
            React.createElement(Form.Item, {
                key: 'status',
                label: '状态',
                name: 'status',
                initialValue: 'active'
            }, React.createElement(Select, {
                options: [
                    { value: 'active', label: '启用' },
                    { value: 'inactive', label: '禁用' }
                ]
            }))
        ])),

        // 组织编辑模态框  
        React.createElement(Modal, {
            key: 'orgModal',
            title: currentOrg?.id ? '编辑组织' : '新建组织',
            open: orgModalVisible,
            onCancel: () => setOrgModalVisible(false),
            width: 600,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setOrgModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary',
                    onClick: () => {
                        orgForm.validateFields().then(values => {
                            console.log('保存组织:', values);
                            antd.message.success(currentOrg?.id ? '组织更新成功' : '组织创建成功');
                            setOrgModalVisible(false);
                            loadOrganizations();
                        }).catch(err => {
                            console.log('验证失败:', err);
                        });
                    }
                }, '保存')
            ]
        }, React.createElement(Form, {
            form: orgForm,
            layout: 'vertical'
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                label: '组织名称',
                name: 'name',
                rules: [{ required: true, message: '请输入组织名称' }]
            }, React.createElement(Input, { placeholder: '请输入组织名称' })),
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'col1', span: 12 },
                    React.createElement(Form.Item, {
                        label: '组织类型',
                        name: 'type',
                        rules: [{ required: true, message: '请选择组织类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择组织类型',
                        options: [
                            { value: 'admin', label: '管理部门' },
                            { value: 'association', label: '协会组织' },
                            { value: 'company', label: '企业机构' },
                            { value: 'committee', label: '委员会' }
                        ]
                    }))
                ),
                React.createElement(Col, { key: 'col2', span: 12 },
                    React.createElement(Form.Item, {
                        label: '上级组织',
                        name: 'parentId'
                    }, React.createElement(Select, {
                        placeholder: '请选择上级组织（可选）',
                        allowClear: true,
                        options: organizations.map(org => ({ value: org.id, label: org.name }))
                    }))
                )
            ]),
            React.createElement(Form.Item, {
                key: 'description',
                label: '组织描述',
                name: 'description'
            }, React.createElement(Input.TextArea, { 
                placeholder: '请输入组织描述',
                rows: 3
            })),
            React.createElement(Form.Item, {
                key: 'status',
                label: '状态',
                name: 'status',
                initialValue: 'active'
            }, React.createElement(Select, {
                options: [
                    { value: 'active', label: '启用' },
                    { value: 'inactive', label: '禁用' }
                ]
            }))
        ]))
    ]);
};

window.UserManagement = UserManagement; 