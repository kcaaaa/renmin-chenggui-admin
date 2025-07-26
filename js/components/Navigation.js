// 现代化侧边栏导航组件 - 基于UI设计参考优化
const Sidebar = ({ currentPage, onPageChange, collapsed }) => {
    const { Menu, Typography } = antd;
    const { Title } = Typography;
    const [openKeys, setOpenKeys] = React.useState(['content', 'exhibition', 'operation', 'system']);

    const menuItems = [
        {
            key: 'Dashboard',
            icon: React.createElement('i', { className: 'anticon' }, '🏠'),
            label: '系统首页',
        },
        {
            key: 'content',
            icon: React.createElement('i', { className: 'anticon' }, '📝'),
            label: '内容管理',
            children: [
                {
                    key: 'ContentManagement',
                    label: '内容管理',
                    page: 'ContentManagement'
                },
                { key: 'ContentPublish', label: '内容发布', page: 'ContentPublish' },
                { key: 'ContentList', label: '我的作品', page: 'ContentList' },
            ],
        },
        {
            key: 'ComplaintManagement',
            icon: React.createElement('i', { className: 'anticon' }, '⚠️'),
            label: '投诉管理',
            page: 'ComplaintManagement'
        },
        {
            key: 'TagManagement', 
            icon: React.createElement('i', { className: 'anticon' }, '🏷️'),
            label: '标签管理',
            page: 'TagManagement'
        },
        {
            key: 'review',
            icon: React.createElement('i', { className: 'anticon' }, '🔍'),
            label: '审核管理',
            children: [
                { 
                    key: 'AIReview', 
                    label: 'AI审核', 
                    page: 'AIReview',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🤖')
                },
                { 
                    key: 'ReviewManagement', 
                    label: '内容审核', 
                    page: 'ReviewManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '👁️')
                },
                { 
                    key: 'WorkflowDesigner', 
                    label: '审批流程设计器', 
                    page: 'WorkflowDesigner',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🎨')
                }
            ]
        },
        {
            key: 'exhibition',
            icon: React.createElement('i', { className: 'anticon' }, '🏢'),
            label: '展会管理',
            children: [
                {
                    key: 'exhibition-manage',
                    label: '展会管理',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📅'),
                    children: [
                        { 
                            key: 'ExhibitionList', 
                            label: '展会列表', 
                            page: 'ExhibitionList',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'RegistrationManagement', 
                            label: '报名管理', 
                            page: 'RegistrationManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'BoothManagement', 
                            label: '场馆信息', 
                            page: 'BoothManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'ExhibitorDetail', 
                            label: '展商详情', 
                            page: 'ExhibitorDetail',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'MeetingActivityManagement', 
                            label: '会议活动', 
                            page: 'MeetingActivityManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                    ]
                },
                { 
                    key: 'RegistrationEntrance', 
                    label: '报名入口', 
                    page: 'RegistrationEntrance',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🚪')
                },
                {
                    key: 'exhibitor-center',
                    label: '展商中心',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🏪'),
                    children: [
                        { 
                            key: 'ExhibitorBasicInfo', 
                            label: '展商信息', 
                            page: 'ExhibitorBasicInfo',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'ExhibitorActivityInfo', 
                            label: '展商活动信息', 
                            page: 'ExhibitorActivityInfo',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'BusinessMatching', 
                            label: '商务配对', 
                            page: 'BusinessMatching',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        }
                    ]
                }
            ]
        },
        {
            key: 'operation',
            icon: React.createElement('i', { className: 'anticon' }, '📊'),
            label: '运营管理',
            children: [
                { 
                    key: 'OperationalDataStats', 
                    label: '运营数据统计', 
                    page: 'OperationalDataStats',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📈')
                },
                { 
                    key: 'UserBehaviorStats', 
                    label: '用户行为统计', 
                    page: 'UserBehaviorStats',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📊')
                },
                { 
                    key: 'SystemResourceMonitor', 
                    label: '系统资源监控', 
                    page: 'SystemResourceMonitor',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🖥️')
                },
                { 
                    key: 'SystemFeedbackList', 
                    label: '系统反馈列表', 
                    page: 'SystemFeedbackList',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '💬')
                }
            ]
        },
        {
            key: 'system',
            icon: React.createElement('i', { className: 'anticon' }, '⚙️'),
            label: '系统管理',
            children: [
                { 
                    key: 'UserManagement', 
                    label: '用户管理', 
                    page: 'UserManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '👥')
                },
                { 
                    key: 'OrganizationManagement', 
                    label: '组织结构', 
                    page: 'OrganizationManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🏛️')
                },
                { 
                    key: 'RoleManagement', 
                    label: '角色管理', 
                    page: 'RoleManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🛡️')
                },
                {
                    key: 'log-management',
                    label: '日志管理',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📋'),
                    children: [
                        { 
                            key: 'UserOperationLogs', 
                            label: '用户操作日志', 
                            page: 'UserOperationLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '🔧')
                        },
                        { 
                            key: 'LoginLogoutLogs', 
                            label: '登录登出日志', 
                            page: 'LoginLogoutLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '🚪')
                        },
                        { 
                            key: 'ContentPublishLogs', 
                            label: '作品发布日志', 
                            page: 'ContentPublishLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '📝')
                        },
                        { 
                            key: 'ApprovalLogs', 
                            label: '审批日志', 
                            page: 'ApprovalLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '✅')
                        },
                    ]
                },
                {
                    key: 'ai-management',
                    label: 'AI管理',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🤖'),
                    children: [
                        { 
                            key: 'AgentManagement', 
                            label: '智能体管理', 
                            page: 'AgentManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '🎭')
                        },
                        { 
                            key: 'KnowledgeBaseManagement', 
                            label: '知识库管理', 
                            page: 'KnowledgeBaseManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '📚')
                        }
                    ]
                },
                { 
                    key: 'MenuManagement', 
                    label: '菜单管理', 
                    page: 'MenuManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🗂️')
                },
                { 
                    key: 'UserProfile', 
                    label: '个人中心', 
                    page: 'UserProfile',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '👤')
                },
            ],
        }
    ];


    const handleMenuClick = ({ key }) => {
        const findItem = (items) => {
            for (const item of items) {
                if (item.key === key) return item;
                if (item.children) {
                    const found = findItem(item.children);
                    if (found) return found;
                }
            }
            return null;
        };
        const menuItem = findItem(menuItems);
        if (menuItem && !menuItem.children) {
            onPageChange(menuItem.page || key);
        }
    };

    const renderMenuItem = (item) => {
        const result = {
            key: item.key,
            icon: item.icon || null,
            label: item.label,
        };
        if (item.children) {
            result.children = item.children.map(renderMenuItem);
        }
        return result;
    };

    const sidebarContainerStyle = {
        width: collapsed ? 80 : 256,
        minHeight: '100vh',
        transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1)',
        display: 'flex',
        flexDirection: 'column',
    };

    return React.createElement('div', {
        className: 'modern-sidebar',
        style: sidebarContainerStyle
    }, [
        // 新增的头部
        !collapsed && React.createElement('div', {
            key: 'header',
            className: 'sidebar-header'
        }, [
            React.createElement('div', { key: 'icon', className: 'header-icon-container'}, '🚇'),
            React.createElement('div', { key: 'title', className: 'header-title-container' }, [
                React.createElement(Title, { level: 5 }, '人民城轨2.0'),
                React.createElement('div', { className: 'header-subtitle' }, '运营管理后台')
            ])
        ]),
        
        // 菜单
        React.createElement(Menu, {
            key: 'menu',
            mode: 'inline',
            theme: 'dark', // 明确主题
            selectedKeys: [currentPage],
            openKeys: openKeys,
            onOpenChange: setOpenKeys,
            onClick: handleMenuClick,
            items: menuItems.map(renderMenuItem),
            className: 'modern-menu',
        })
    ]);
};

window.Sidebar = Sidebar;
window.Navigation = Sidebar;

console.log('✅ 深色主题Sidebar/Navigation组件已加载');

