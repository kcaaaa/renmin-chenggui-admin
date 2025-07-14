// 现代化导航组件
const Navigation = ({ currentPage, onPageChange, collapsed, onToggleCollapse, user }) => {
    const { Menu, Tooltip } = antd;
    const { SubMenu } = Menu;
    
    const [openKeys, setOpenKeys] = React.useState(['dashboard']);
    const [hoveredItem, setHoveredItem] = React.useState(null);
    
    // 检查用户权限
    const hasPermission = (permission) => {
        if (!user || !user.permissions) return false;
        if (user.permissions.includes('*')) return true; // 超级管理员
        return user.permissions.includes(permission);
    };
    
    // 根据角色过滤菜单项
    const filterMenuByRole = (items) => {
        return items.filter(item => {
            // 根据用户角色显示菜单
            switch (user?.role) {
                case 'super_admin':
                    return true; // 超级管理员看到所有菜单
                    
                case 'association_admin':
                    // 协会管理员：内容管理、审核管理、展会管理、系统管理(部分)
                    return ['dashboard', 'content', 'review', 'exhibition', 'system'].includes(item.key);
                    
                case 'exhibitor':
                    // 展商用户：系统首页、内容管理(发布权限)、展会管理(展商信息)、个人中心
                    return ['dashboard', 'content', 'exhibition', 'system'].includes(item.key);
                    
                case 'operation_admin':
                    // 运营管理员：系统首页、运营管理、系统管理
                    return ['dashboard', 'operation', 'system'].includes(item.key);
                    
                case 'reviewer':
                    // 审核员：系统首页、审核管理
                    return ['dashboard', 'review'].includes(item.key);
                    
                case 'normal_user':
                    // 普通用户：系统首页、内容管理(发布权限)、个人中心
                    return ['dashboard', 'content', 'system'].includes(item.key);
                    
                default:
                    return ['dashboard'].includes(item.key); // 默认只显示首页
            }
        }).map(item => {
            if (item.children) {
                return {
                    ...item,
                    children: filterChildrenByRole(item.children, item.key)
                };
            }
            return item;
        });
    };
    
    // 过滤子菜单
    const filterChildrenByRole = (children, parentKey) => {
        return children.filter(child => {
            switch (user?.role) {
                case 'super_admin':
                    return true;
                    
                case 'association_admin':
                    // 协会管理员根据父菜单过滤
                    if (parentKey === 'content') {
                        return true; // 内容管理全部功能
                    }
                    if (parentKey === 'review') {
                        return true; // 审核管理全部功能
                    }
                    if (parentKey === 'exhibition') {
                        return true; // 展会管理全部功能
                    }
                    if (parentKey === 'system') {
                        return ['user-management', 'role-management', 'profile'].includes(child.key);
                    }
                    return true;
                    
                case 'exhibitor':
                    // 展商用户权限限制
                    if (parentKey === 'content') {
                        return ['content-publish'].includes(child.key); // 只能发布内容
                    }
                    if (parentKey === 'exhibition') {
                        return ['exhibitor-info'].includes(child.key); // 只能管理展商信息
                    }
                    if (parentKey === 'system') {
                        return ['profile'].includes(child.key); // 只能访问个人中心
                    }
                    return false;
                    
                case 'operation_admin':
                    // 运营管理员权限
                    if (parentKey === 'operation') {
                        return true; // 运营管理全部功能
                    }
                    if (parentKey === 'system') {
                        return true; // 系统管理全部功能
                    }
                    return false;
                    
                case 'reviewer':
                    // 审核员权限
                    if (parentKey === 'review') {
                        return true; // 审核管理全部功能
                    }
                    return false;
                    
                case 'normal_user':
                    // 普通用户权限
                    if (parentKey === 'content') {
                        return ['content-publish'].includes(child.key); // 只能发布内容
                    }
                    if (parentKey === 'system') {
                        return ['profile'].includes(child.key); // 只能访问个人中心
                    }
                    return false;
                    
                default:
                    return true;
            }
        }).map(child => {
            if (child.children) {
                return {
                    ...child,
                    children: child.children.filter(subChild => {
                        switch (user?.role) {
                            case 'super_admin':
                                return true;
                                
                            case 'association_admin':
                                return true; // 协会管理员看到所有三级菜单
                                
                            case 'exhibitor':
                                // 展商用户三级菜单权限
                                if (child.key === 'exhibitor-info') {
                                    return true; // 展商信息下的所有功能
                                }
                                return false;
                                
                            case 'operation_admin':
                                return true; // 运营管理员看到所有三级菜单
                                
                            case 'reviewer':
                                return true; // 审核员看到审核相关的所有三级菜单
                                
                            case 'normal_user':
                                return false; // 普通用户不需要三级菜单
                                
                            default:
                                return true;
                        }
                    })
                };
            }
            return child;
        });
    };
    
    const menuItems = [
        {
            key: 'dashboard',
            icon: '🏠',
            label: '系统首页',
            title: '实时查看核心运营指标和待办事项',
            page: 'Dashboard',
            color: '#1890ff'
        },
        {
            key: 'content',
            icon: '📝',
            label: '内容管理',
            title: '平台所有内容的集中展示与管理中心',
            color: '#52c41a',
            children: [
                {
                    key: 'content-management',
                    label: '内容管理',
                    icon: '📄',
                    children: [
                        { key: 'content-list', label: '内容列表', page: 'ContentManagement', icon: '📋' },
                        { key: 'content-publish', label: '内容发布', page: 'ContentPublish', icon: '✏️' }
                    ]
                },
                { key: 'complaint', label: '投诉管理', page: 'ComplaintManagement', icon: '⚠️' },
                { key: 'tags', label: '标签管理', page: 'ContentTagManagement', icon: '🏷️' }
            ]
        },
        {
            key: 'review',
            icon: '🔍',
            label: '审核管理',
            title: '审核流程与管理',
            color: '#fa8c16',
            children: [
                { key: 'ai-review', label: 'AI审核', page: 'AIReview', icon: '🤖' },
                {
                    key: 'approval-flow',
                    label: '审批流程',
                    icon: '🔄',
                    children: [
                        { key: 'work-approval', label: '作品审批流程', page: 'AuditFlowManagement', icon: '📋' },
                        { key: 'exhibitor-approval', label: '展商审批流程', page: 'ExhibitionReview', icon: '🏢' }
                    ]
                },
                { key: 'approval-management', label: '审批流程管理', page: 'AuditFlowManagement', icon: '⚙️' }
            ]
        },
        {
            key: 'exhibition',
            icon: '🏢',
            label: '展会管理',
            title: '展会管理是本次人民城轨2.0系统的建设核心',
            color: '#722ed1',
            children: [
                {
                    key: 'exhibition-management',
                    label: '展会管理',
                    icon: '🎪',
                    children: [
                        { key: 'exhibition-list', label: '展会列表', page: 'ExhibitionManagement', icon: '📅' },
                        { key: 'registration-management', label: '报名管理', page: 'RegistrationManagement', icon: '📝' },
                        { key: 'venue-info', label: '场馆信息', page: 'BoothManagement', icon: '🏛️' },
                        { key: 'exhibitor-details', label: '展商详情', page: 'ExhibitorQuery', icon: '🔍' },
                        { key: 'meeting-activity', label: '会议活动', page: 'MeetingActivityManagement', icon: '🎯' }
                    ]
                },
                { key: 'registration-entrance', label: '报名入口', page: 'RegistrationManagement', icon: '🚪' },
                {
                    key: 'exhibitor-info',
                    label: '展商信息',
                    icon: '🏪',
                    children: [
                        { key: 'exhibitor-basic', label: '展商基础信息', page: 'ExhibitorBasicInfo', icon: 'ℹ️' },
                        { key: 'product-info', label: '产品信息', page: 'ProductInfo', icon: '📦' },
                        { key: 'exhibitor-activity', label: '展商活动信息', page: 'ExhibitorActivityInfo', icon: '🎭' },
                        { key: 'business-matching', label: '商务配对', page: 'BusinessMatching', icon: '🤝' }
                    ]
                }
            ]
        },
        {
            key: 'operation',
            icon: '📊',
            label: '运营管理',
            title: '提供多维度的平台运营数据分析报表',
            color: '#eb2f96',
            children: [
                {
                    key: 'operational-stats',
                    label: '运营数据统计',
                    icon: '📈',
                    children: [
                        { key: 'user-analysis', label: '用户分析', page: 'UserAnalysis', icon: '👥' },
                        { key: 'app-behavior', label: '用户使用APP行为统计', page: 'BehaviorStats', icon: '📱' },
                        { key: 'function-analysis', label: '功能使用分析', page: 'DataAnalysis', icon: '⚡' },
                        { key: 'exception-stats', label: '异常情况统计', page: 'OperationalStats', icon: '🚨' }
                    ]
                },
                {
                    key: 'user-behavior',
                    label: '用户行为统计',
                    icon: '👤',
                    children: [
                        { key: 'data-overview', label: '数据概览', page: 'UserBehaviorStats', icon: '📊' },
                        { key: 'basic-behavior', label: '基础行为统计', page: 'BehaviorStats', icon: '📋' },
                        { key: 'deep-behavior', label: '深度行为统计', page: 'BehaviorAnalysis', icon: '🔬' }
                    ]
                },
                { key: 'system-monitor', label: '系统资源监控', page: 'DataManagement', icon: '🖥️' },
                { key: 'feedback-list', label: '系统反馈列表', page: 'FeedbackManagement', icon: '💬' }
            ]
        },
        {
            key: 'system',
            icon: '⚙️',
            label: '系统管理',
            title: '用于人民城轨系统整体管理使用',
            color: '#13c2c2',
            children: [
                {
                    key: 'user-management',
                    label: '用户管理',
                    icon: '👥',
                    children: [
                        { key: 'user-list', label: '用户列表', page: 'UserManagement', icon: '📋' },
                        { key: 'organization', label: '组织结构', page: 'OrganizationManagement', icon: '🏗️' }
                    ]
                },
                {
                    key: 'role-management',
                    label: '角色管理',
                    icon: '🎭',
                    children: [
                        { key: 'admin-role', label: '管理员', page: 'AdminManagement', icon: '👑' },
                        { key: 'non-admin-role', label: '非管理员', page: 'RoleManagement', icon: '👤' }
                    ]
                },
                {
                    key: 'log-management',
                    label: '日志管理',
                    icon: '📝',
                    children: [
                        { key: 'user-operation-logs', label: '用户操作日志', page: 'LogManagement', icon: '👆' },
                        { key: 'login-logout-logs', label: '登录登出日志', page: 'LoginLogoutLogs', icon: '🚪' },
                        { key: 'content-publish-logs', label: '作品发布日志', page: 'ContentPublishLogs', icon: '📤' },
                        { key: 'approval-logs', label: '审批日志', page: 'ApprovalLogs', icon: '✅' }
                    ]
                },
                {
                    key: 'ai-management',
                    label: 'AI管理',
                    icon: '🤖',
                    children: [
                        { key: 'agent-management', label: '智能体管理', page: 'AIManagement', icon: '🧠' },
                        { key: 'knowledge-base', label: '知识库管理', page: 'AIManagement', icon: '📚' }
                    ]
                },
                { key: 'menu-management', label: '菜单管理', page: 'MenuManagement', icon: '🗂️' },
                { key: 'profile', label: '个人中心', page: 'UserProfile', icon: '👤' }
            ]
        }
    ];

    // 根据用户角色过滤菜单
    const filteredMenuItems = user ? filterMenuByRole(menuItems) : menuItems;

    // 创建样式
    const navStyles = {
        container: {
            height: '100vh',
            background: 'linear-gradient(180deg, #001529 0%, #002140 100%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden'
        },
        header: {
            padding: collapsed ? '16px 8px' : '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            fontSize: collapsed ? '24px' : '18px',
            fontWeight: '600',
            color: '#fff',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
        },
        logoIcon: {
            marginRight: collapsed ? 0 : '12px',
            fontSize: collapsed ? '28px' : '24px',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            transition: 'all 0.3s ease'
        },
        toggleBtn: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
        },
        menuContainer: {
            flex: 1,
            overflow: 'auto',
            padding: '16px 0',
            background: 'transparent'
        },
        userInfo: {
            padding: collapsed ? '12px 8px' : '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            color: '#fff'
        },
        userAvatar: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #1890ff, #722ed1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            marginRight: collapsed ? 0 : '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }
    };

    const renderMenuItem = (item, level = 1) => {
        const isActive = currentPage === (item.page || item.key);
        
        if (item.children) {
            return React.createElement(SubMenu, {
                key: item.key,
                title: React.createElement('div', {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: level === 1 ? '4px 0' : '2px 0',
                        color: '#fff',
                        fontSize: level === 1 ? '15px' : level === 2 ? '13px' : '12px',
                        fontWeight: level === 1 ? '600' : level === 2 ? '500' : '400'
                    }
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: `level-${level}-icon`,
                        style: {
                            fontSize: level === 1 ? '18px' : level === 2 ? '14px' : '12px',
                            marginRight: collapsed ? 0 : (level === 1 ? '12px' : level === 2 ? '8px' : '6px'),
                            minWidth: level === 1 ? '20px' : level === 2 ? '16px' : '14px',
                            textAlign: 'center',
                            filter: level === 1 ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none',
                            opacity: level === 1 ? 1 : level === 2 ? 0.9 : 0.8
                        }
                    }, item.icon),
                    !collapsed && React.createElement('span', {
                        key: 'label',
                        style: { flex: 1 }
                    }, item.label)
                ])
            }, item.children.map(child => {
                if (child.children) {
                    return React.createElement(SubMenu, {
                        key: child.key,
                        title: React.createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.85)',
                                fontWeight: '500'
                            }
                        }, [
                            React.createElement('span', {
                                key: 'icon',
                                className: 'level-2-icon',
                                style: {
                                    fontSize: '14px',
                                    marginRight: '8px',
                                    minWidth: '16px',
                                    textAlign: 'center',
                                    opacity: 0.9
                                }
                            }, child.icon || '📋'),
                            React.createElement('span', { key: 'label' }, child.label)
                        ])
                    }, child.children.map(subChild => {
                        const subIsActive = currentPage === (subChild.page || subChild.key);
                        return React.createElement(Menu.Item, {
                            key: subChild.page || subChild.key,
                            title: subChild.title,
                            className: subIsActive ? 'level-3-active' : 'level-3-item'
                        }, React.createElement('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '12px',
                                color: subIsActive ? '#fff' : 'rgba(255, 255, 255, 0.75)',
                                fontWeight: subIsActive ? '500' : '400'
                            }
                        }, [
                            React.createElement('span', {
                                key: 'icon',
                                className: 'level-3-icon',
                                style: {
                                    fontSize: '12px',
                                    marginRight: '6px',
                                    minWidth: '14px',
                                    textAlign: 'center',
                                    opacity: 0.8
                                }
                            }, subChild.icon || '◦'),
                            React.createElement('span', { key: 'label' }, subChild.label)
                        ]));
                    }));
                } else {
                    const childIsActive = currentPage === (child.page || child.key);
                    return React.createElement(Menu.Item, {
                        key: child.page || child.key,
                        title: child.title,
                        className: childIsActive ? 'level-2-active' : 'level-2-item'
                    }, React.createElement('div', {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '13px',
                            color: childIsActive ? '#fff' : 'rgba(255, 255, 255, 0.85)',
                            fontWeight: childIsActive ? '600' : '500'
                        }
                    }, [
                        React.createElement('span', {
                            key: 'icon',
                            className: 'level-2-icon',
                            style: {
                                fontSize: '14px',
                                marginRight: '8px',
                                minWidth: '16px',
                                textAlign: 'center',
                                opacity: 0.9
                            }
                        }, child.icon || '•'),
                        React.createElement('span', { key: 'label' }, child.label)
                    ]));
                }
            }));
        } else {
            const menuItemContent = React.createElement('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.85)',
                    transition: 'all 0.2s ease'
                }
            }, [
                React.createElement('span', {
                    key: 'icon',
                    className: 'level-1-icon',
                    style: {
                        fontSize: '18px',
                        marginRight: collapsed ? 0 : '12px',
                        minWidth: '20px',
                        textAlign: 'center',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                    }
                }, item.icon),
                !collapsed && React.createElement('span', {
                    key: 'label',
                    style: { flex: 1 }
                }, item.label),
                !collapsed && isActive && React.createElement('div', {
                    key: 'indicator',
                    style: {
                        width: '4px',
                        height: '20px',
                        background: 'linear-gradient(180deg, #1890ff, #40a9ff)',
                        borderRadius: '2px',
                        marginLeft: '8px',
                        boxShadow: '0 0 8px rgba(24, 144, 255, 0.5)'
                    }
                })
            ]);

            if (collapsed) {
                return React.createElement(Tooltip, {
                    key: item.key,
                    title: item.label,
                    placement: 'right'
                }, React.createElement(Menu.Item, {
                    key: item.page || item.key,
                    title: item.title,
                    className: isActive ? 'level-1-active' : 'level-1-item'
                }, menuItemContent));
            } else {
                return React.createElement(Menu.Item, {
                    key: item.page || item.key,
                    title: item.title,
                    className: isActive ? 'level-1-active' : 'level-1-item'
                }, menuItemContent);
            }
        }
    };

    return React.createElement('div', {
        style: navStyles.container
    }, [
        // 导航头部
        React.createElement('div', {
            key: 'header',
            style: navStyles.header
        }, [
            React.createElement('div', {
                key: 'logo',
                style: navStyles.logo
            }, [
                React.createElement('span', {
                    key: 'icon',
                    style: navStyles.logoIcon
                }, '🚇'),
                !collapsed && React.createElement('span', {
                    key: 'text'
                }, '人民城轨2.0')
            ]),
            React.createElement('button', {
                key: 'toggle',
                onClick: onToggleCollapse,
                style: {
                    ...navStyles.toggleBtn,
                    ':hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.05)'
                    }
                },
                title: collapsed ? '展开菜单' : '收起菜单',
                onMouseEnter: (e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1.05)';
                },
                onMouseLeave: (e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1)';
                }
            }, collapsed ? '▶' : '◀')
        ]),
        
        // 菜单项
        React.createElement('div', {
            key: 'menu-container',
            style: navStyles.menuContainer
        }, React.createElement(Menu, {
            mode: 'inline',
            selectedKeys: [currentPage],
            openKeys: openKeys,
            onOpenChange: setOpenKeys,
            style: { 
                border: 'none',
                background: 'transparent',
                color: '#fff'
            },
            theme: 'dark',
            inlineCollapsed: collapsed,
            onClick: ({ key }) => {
                console.log('Navigation clicked:', key);
                
                // 查找对应的page属性
                const findPageByKey = (items, targetKey) => {
                    for (const item of items) {
                        if (item.key === targetKey) {
                            return item.page || targetKey;
                        }
                        if (item.children) {
                            const result = findPageByKey(item.children, targetKey);
                            if (result) return result;
                        }
                    }
                    return targetKey;
                };
                
                const pageToNavigate = findPageByKey(filteredMenuItems, key);
                console.log('Navigate to page:', pageToNavigate);
                onPageChange(pageToNavigate);
            }
        }, filteredMenuItems.map(renderMenuItem))),

        // 用户信息
        user && React.createElement('div', {
            key: 'user-info',
            style: navStyles.userInfo
        }, [
            React.createElement('div', {
                key: 'avatar',
                style: navStyles.userAvatar
            }, user.name ? user.name.charAt(0).toUpperCase() : '?'),
            !collapsed && React.createElement('div', {
                key: 'info',
                style: { flex: 1 }
            }, [
                React.createElement('div', {
                    key: 'name',
                    style: { 
                        fontSize: '14px', 
                        fontWeight: '500',
                        marginBottom: '2px'
                    }
                }, user.name || '未知用户'),
                React.createElement('div', {
                    key: 'role',
                    style: { 
                        fontSize: '12px', 
                        color: 'rgba(255, 255, 255, 0.65)'
                    }
                }, user.department || user.role || '普通用户')
            ])
        ])
    ]);
};

window.Navigation = Navigation; 