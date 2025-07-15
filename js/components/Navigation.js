// 现代化侧边栏导航组件 - 基于UI设计参考优化
const Sidebar = ({ currentPage, onPageChange, collapsed }) => {
    const { Menu } = antd;
    const [openKeys, setOpenKeys] = React.useState(['content']);

    const menuItems = [
        {
            key: 'Dashboard',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '🏠'),
            label: '系统首页',
        },
        {
            key: 'content',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '📝'),
            label: '内容管理',
            children: [
                { 
                    key: 'ContentPublish', 
                    label: '内容发布', 
                    page: 'ContentPublish',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '✍️')
                },
                { 
                    key: 'ContentList', 
                    label: '内容列表', 
                    page: 'ContentList',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📋')
                }
            ]
        },
        {
            key: 'ComplaintManagement',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '⚠️'),
            label: '投诉管理',
            page: 'ComplaintManagement'
        },
        {
            key: 'TagManagement', 
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '🏷️'),
            label: '标签管理',
            page: 'TagManagement'
        },
        {
            key: 'review',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '🔍'),
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
                    label: '审批流程', 
                    page: 'ReviewManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🔄')
                },
                { 
                    key: 'ApprovalProcessManagement', 
                    label: '作品审批流程', 
                    page: 'ApprovalProcessManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📝')
                },
                { 
                    key: 'AuditFlowManagement', 
                    label: '展商审批流程', 
                    page: 'AuditFlowManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🏢')
                }
            ]
        },
        {
            key: 'exhibition',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '🏢'),
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
                    key: 'exhibitor-info',
                    label: '展商信息',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🏪'),
                    children: [
                        { 
                            key: 'ExhibitorBasicInfo', 
                            label: '展商基础信息', 
                            page: 'ExhibitorBasicInfo',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'ProductInfo', 
                            label: '产品信息', 
                            page: 'ProductInfo',
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
                        },
                    ]
                }
            ]
        },
        {
            key: 'operation',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '📊'),
            label: '运营管理',
            children: [
                {
                    key: 'operational-stats',
                    label: '运营数据统计',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📈'),
                    children: [
                        { 
                            key: 'UserAnalysis', 
                            label: '用户分析', 
                            page: 'UserAnalysis',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'OperationalStats', 
                            label: 'APP行为统计', 
                            page: 'OperationalStats',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'DataAnalysis', 
                            label: '功能使用分析', 
                            page: 'DataAnalysis',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'BehaviorAnalysis', 
                            label: '异常情况统计', 
                            page: 'BehaviorAnalysis',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        }
                    ]
                },
                {
                    key: 'user-behavior-stats',
                    label: '用户行为统计',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📊'),
                    children: [
                        { 
                            key: 'UserBehaviorStats', 
                            label: '数据概览', 
                            page: 'UserBehaviorStats',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'BehaviorStats', 
                            label: '基础行为统计', 
                            page: 'BehaviorStats',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'DataManagement', 
                            label: '深度行为统计', 
                            page: 'DataManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        }
                    ]
                },
                { 
                    key: 'FeedbackManagement', 
                    label: '系统反馈列表', 
                    page: 'FeedbackManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '💬')
                }
            ]
        },
        {
            key: 'system',
            icon: React.createElement('i', { 
                className: 'anticon',
                style: { fontSize: '16px' }
            }, '⚙️'),
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
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🏗️')
                },
                { 
                    key: 'RoleManagement', 
                    label: '角色管理', 
                    page: 'RoleManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '👤')
                },
                {
                    key: 'log-management',
                    label: '日志管理',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📜'),
                    children: [
                        { 
                            key: 'LogManagement', 
                            label: '用户操作日志', 
                            page: 'LogManagement',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'LoginLogoutLogs', 
                            label: '登录登出日志', 
                            page: 'LoginLogoutLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'ContentPublishLogs', 
                            label: '作品发布日志', 
                            page: 'ContentPublishLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        },
                        { 
                            key: 'ApprovalLogs', 
                            label: '审批日志', 
                            page: 'ApprovalLogs',
                            icon: React.createElement('i', { style: { fontSize: '12px', color: '#bfbfbf' } }, '•')
                        }
                    ]
                },
                { 
                    key: 'AIManagement', 
                    label: 'AI管理', 
                    page: 'AIManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '🧠')
                },
                { 
                    key: 'MenuManagement', 
                    label: '菜单管理', 
                    page: 'MenuManagement',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '📋')
                },
                { 
                    key: 'UserProfile', 
                    label: '个人中心', 
                    page: 'UserProfile',
                    icon: React.createElement('i', { style: { fontSize: '14px', color: '#8c8c8c' } }, '👤')
                }
            ]
        }
    ];

    const handleMenuClick = ({ key }) => {
        // 查找菜单项
        const menuItem = findMenuItemByKey(menuItems, key);
        
        // 只有叶子节点(没有children的菜单项)才触发页面跳转
        if (menuItem && !menuItem.children) {
            const pageKey = menuItem.page || key;
            onPageChange(pageKey);
        }
        // 如果是有children的菜单项，不做任何操作，只让Ant Design处理展开/折叠
    };

    // 递归查找菜单项
    const findMenuItemByKey = (items, targetKey) => {
        for (const item of items) {
            if (item.key === targetKey) {
                return item;
            }
            if (item.children) {
                const found = findMenuItemByKey(item.children, targetKey);
                if (found) return found;
            }
        }
        return null;
    };

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const renderMenuItem = (item) => {
        if (item.children) {
            return {
                key: item.key,
                icon: item.icon || null,
                label: item.label,
                children: item.children.map(renderMenuItem)
            };
        }
        return {
            key: item.key,
            icon: item.icon || null,
            label: item.label
        };
    };

    // 现代化侧边栏样式
    const sidebarStyle = {
        width: collapsed ? 80 : 256,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
        borderRight: '1px solid #e8e8e8',
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
        position: 'relative',
        zIndex: 10
    };

    const logoStyle = {
        height: 64,
        background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
        margin: '16px 12px 24px 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: collapsed ? 14 : 16,
        fontWeight: 600,
        letterSpacing: '0.5px',
        boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
        transition: 'all 0.3s ease'
    };

    const menuStyle = {
        border: 'none',
        background: 'transparent',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    };

    return React.createElement('div', {
        className: 'modern-sidebar',
        style: sidebarStyle
    }, [
        React.createElement('div', {
            key: 'logo',
            className: 'sidebar-logo',
            style: logoStyle
        }, collapsed ? '人民城轨' : '人民城轨2.0管理后台'),
        React.createElement(Menu, {
            key: 'menu',
            mode: 'inline',
            selectedKeys: [currentPage],
            openKeys: openKeys,
            onOpenChange: handleOpenChange,
            onClick: handleMenuClick,
            items: menuItems.map(renderMenuItem),
            style: menuStyle,
            className: 'modern-menu'
        })
    ]);
};

// 导出组件
window.Sidebar = Sidebar;
window.Navigation = Sidebar; // 兼容性：同时挂载为Navigation

console.log('✅ 现代化Sidebar/Navigation组件已加载');

