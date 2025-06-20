// 顶部操作栏组件
const TopBar = ({ user, notifications, onSearch, onNotificationClick, onLogout }) => {
    const { Input, Badge, Dropdown, Avatar, Space, Button, Tooltip, Modal } = antd;
    const [searchValue, setSearchValue] = React.useState('');
    
    // 用户菜单
    const userMenuItems = [
        {
            key: 'profile',
            label: '个人中心',
            icon: '👤'
        },
        {
            key: 'settings',
            label: '账户设置',
            icon: '⚙️'
        },
        {
            key: 'activity-log',
            label: '活动日志',
            icon: '📋'
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: '退出登录',
            icon: '🚪',
            danger: true
        }
    ];

    // 处理用户菜单点击
    const handleUserMenuClick = ({ key }) => {
        switch (key) {
            case 'logout':
                showLogoutConfirm();
                break;
            case 'profile':
                console.log('跳转到个人中心');
                // 这里可以添加跳转到个人中心的逻辑
                break;
            case 'settings':
                console.log('跳转到账户设置');
                // 这里可以添加跳转到账户设置的逻辑
                break;
            case 'activity-log':
                showActivityLog();
                break;
            default:
                console.log('菜单点击:', key);
        }
    };

    // 显示退出登录确认对话框
    const showLogoutConfirm = () => {
        Modal.confirm({
            title: '确认退出',
            content: '您确定要退出登录吗？退出后需要重新登录才能访问系统。',
            icon: '🚪',
            okText: '确定退出',
            cancelText: '取消',
            okType: 'danger',
            onOk() {
                console.log('用户确认退出登录');
                onLogout && onLogout();
            },
            onCancel() {
                console.log('用户取消退出');
            }
        });
    };

    // 显示活动日志
    const showActivityLog = () => {
        const activities = AuthUtils.getUserActivities(10);
        
        Modal.info({
            title: '最近活动记录',
            width: 600,
            content: React.createElement('div', {
                style: { maxHeight: '400px', overflowY: 'auto' }
            }, activities.length > 0 ? activities.map((activity, index) => 
                React.createElement('div', {
                    key: index,
                    style: { 
                        padding: '8px 0', 
                        borderBottom: index < activities.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }
                }, [
                    React.createElement('div', {
                        key: 'action',
                        style: { fontWeight: 'bold', marginBottom: '4px' }
                    }, getActivityDescription(activity.action)),
                    React.createElement('div', {
                        key: 'time',
                        style: { fontSize: '12px', color: '#666' }
                    }, new Date(activity.timestamp).toLocaleString('zh-CN'))
                ])
            ) : React.createElement('div', {
                style: { textAlign: 'center', color: '#999', padding: '20px' }
            }, '暂无活动记录')),
            onOk() {}
        });
    };

    // 获取活动描述
    const getActivityDescription = (action) => {
        const descriptions = {
            'login': '登录系统',
            'login_success': '登录成功',
            'logout': '退出登录',
            'page_visit': '访问页面',
            'search': '执行搜索',
            'create': '创建内容',
            'update': '更新内容',
            'delete': '删除内容'
        };
        return descriptions[action] || action;
    };

    const userMenu = {
        items: userMenuItems,
        onClick: handleUserMenuClick
    };

    // 通知菜单
    const notificationItems = notifications?.slice(0, 5).map((notif, index) => ({
        key: `notif-${index}`,
        label: React.createElement('div', {
            style: { 
                maxWidth: '300px',
                padding: '8px 0'
            }
        }, [
            React.createElement('div', {
                key: 'title',
                style: {
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: notif.type === 'error' ? '#ff4d4f' : '#1e293b'
                }
            }, notif.title),
            React.createElement('div', {
                key: 'content',
                style: {
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '4px'
                }
            }, notif.content),
            React.createElement('div', {
                key: 'time',
                style: {
                    fontSize: '11px',
                    color: '#94a3b8'
                }
            }, notif.time)
        ])
    })) || [];

    if (notificationItems.length > 0) {
        notificationItems.push({
            type: 'divider'
        });
        notificationItems.push({
            key: 'view-all',
            label: React.createElement('div', {
                style: { textAlign: 'center', color: '#2563eb' }
            }, '查看全部通知')
        });
    }

    const notificationMenu = {
        items: notificationItems.length > 0 ? notificationItems : [{
            key: 'empty',
            label: React.createElement('div', {
                style: { textAlign: 'center', color: '#94a3b8', padding: '20px 0' }
            }, '暂无通知')
        }],
        onClick: ({ key }) => {
            if (key === 'view-all') {
                onNotificationClick && onNotificationClick();
            }
        }
    };

    const handleSearch = (value) => {
        if (value.trim()) {
            onSearch && onSearch(value);
        }
    };

    const unreadCount = notifications?.filter(n => !n.read).length || 0;

    // 获取用户显示名称
    const getUserDisplayName = () => {
        if (!user) return '未知用户';
        return user.name || user.username || '管理员';
    };

    // 获取用户头像
    const getUserAvatar = () => {
        if (user?.avatar) {
            return user.avatar;
        }
        const name = getUserDisplayName();
        return name.charAt(0).toUpperCase();
    };

    return React.createElement('div', {
        className: 'top-bar'
    }, [
        // 左侧区域
        React.createElement('div', {
            key: 'left',
            className: 'top-bar-left'
        }, [
            React.createElement('h1', {
                key: 'title',
                style: {
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1e293b'
                }
            }, '运营管理后台'),
            
            // 显示当前登录用户信息
            React.createElement('div', {
                key: 'user-info',
                style: {
                    marginLeft: '24px',
                    fontSize: '14px',
                    color: '#64748b'
                }
            }, `欢迎，${getUserDisplayName()}`)
        ]),

        // 右侧区域
        React.createElement('div', {
            key: 'right',
            className: 'top-bar-right'
        }, [
            // 全局搜索
            React.createElement(Input.Search, {
                key: 'search',
                placeholder: '搜索内容、用户、日志...',
                style: { width: '300px' },
                value: searchValue,
                onChange: (e) => setSearchValue(e.target.value),
                onSearch: handleSearch,
                allowClear: true
            }),

            // 快捷操作
            React.createElement(Space, {
                key: 'actions',
                size: 'middle'
            }, [
                React.createElement(Tooltip, {
                    key: 'batch-review',
                    title: '批量审核 (Alt+B)'
                }, React.createElement(Button, {
                    type: 'primary',
                    size: 'small',
                    onClick: () => console.log('批量审核')
                }, '批量审核')),

                React.createElement(Tooltip, {
                    key: 'export',
                    title: '导出报表 (Alt+E)'
                }, React.createElement(Button, {
                    size: 'small',
                    onClick: () => console.log('导出报表')
                }, '导出')),

                React.createElement(Tooltip, {
                    key: 'help',
                    title: '帮助文档'
                }, React.createElement(Button, {
                    type: 'text',
                    size: 'small',
                    onClick: () => console.log('帮助文档')
                }, '❓'))
            ]),

            // 通知
            React.createElement(Dropdown, {
                key: 'notifications',
                menu: notificationMenu,
                trigger: ['click'],
                placement: 'bottomRight'
            }, React.createElement(Badge, {
                count: unreadCount,
                size: 'small'
            }, React.createElement(Button, {
                type: 'text',
                size: 'large',
                style: { fontSize: '18px' }
            }, '🔔'))),

            // 用户信息
            React.createElement(Dropdown, {
                key: 'user',
                menu: userMenu,
                trigger: ['click'],
                placement: 'bottomRight'
            }, React.createElement(Space, {
                style: { cursor: 'pointer' }
            }, [
                React.createElement(Avatar, {
                    key: 'avatar',
                    size: 'small',
                    style: { 
                        backgroundColor: '#2563eb',
                        color: 'white'
                    }
                }, getUserAvatar()),
                React.createElement('span', {
                    key: 'name',
                    style: { color: '#1e293b' }
                }, getUserDisplayName())
            ]))
        ])
    ]);
};

window.TopBar = TopBar; 