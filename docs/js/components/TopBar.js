// 顶部导航栏组件 - 若依风格
const TopNavigation = ({ user, notifications, onLogout, onNotificationClick, collapsed, onToggleCollapse }) => {
    const { Menu, Dropdown, Badge, Avatar, Space, Button, message } = antd;
    const [notificationVisible, setNotificationVisible] = React.useState(false);

    const handleLogout = () => {
        message.info('退出登录成功');
        onLogout();
    };

    const handleNotificationClick = () => {
        setNotificationVisible(!notificationVisible);
        onNotificationClick();
    };

    const userMenuItems = [
        {
            key: 'profile',
            label: '个人中心'
        },
        {
            key: 'settings',
            label: '个人设置'
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: '退出登录',
            onClick: handleLogout
        }
    ];

    const notificationItems = notifications?.map((notif, index) => ({
        key: index,
        label: React.createElement('div', {
            style: {
                padding: '8px 0',
                borderBottom: index < notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
                maxWidth: '250px'
            }
        }, [
            React.createElement('div', {
                key: 'title',
                style: {
                    fontWeight: '500',
                    marginBottom: '4px',
                    color: notif.read ? '#666' : '#1890ff',
                    fontSize: '13px'
                }
            }, notif.title),
            React.createElement('div', {
                key: 'content',
                style: {
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: '4px',
                    lineHeight: '1.4'
                }
            }, notif.content),
            React.createElement('div', {
                key: 'time',
                style: {
                    fontSize: '11px',
                    color: '#ccc'
                }
            }, notif.time)
        ])
    })) || [];

    const unreadCount = notifications?.filter(n => !n.read).length || 0;

    return React.createElement('div', {
        style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '50px',
            padding: '0 16px',
            background: '#fff',
            borderBottom: '1px solid #f0f0f0',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }
    }, [
        React.createElement('div', {
            key: 'left',
            style: { display: 'flex', alignItems: 'center' }
        }, [
            React.createElement(Button, {
                key: 'collapse-btn',
                type: 'text',
                icon: React.createElement('span', { 
                    style: { fontSize: '16px' } 
                }, collapsed ? '' : ''),
                onClick: onToggleCollapse,
                style: { 
                    marginRight: '16px',
                    color: '#666'
                }
            }),
            React.createElement('div', {
                key: 'breadcrumb',
                style: {
                    fontSize: '14px',
                    color: '#666'
                }
            }, '人民城轨管理系统')
        ]),

        React.createElement(Space, {
            key: 'right',
            size: 'middle',
            style: { alignItems: 'center' }
        }, [
            React.createElement(Dropdown, {
                key: 'notifications',
                menu: { items: notificationItems },
                trigger: ['click'],
                open: notificationVisible,
                onOpenChange: setNotificationVisible,
                placement: 'bottomRight'
            }, React.createElement(Badge, {
                count: unreadCount,
                size: 'small',
                offset: [-2, 2]
            }, React.createElement(Button, {
                type: 'text',
                size: 'small',
                icon: React.createElement('span', { 
                    style: { fontSize: '16px' } 
                }, ''),
                onClick: handleNotificationClick,
                style: { color: '#666' }
            }))),

            React.createElement(Dropdown, {
                key: 'user',
                menu: { 
                    items: userMenuItems,
                    onClick: ({ key }) => {
                        if (key === 'logout') {
                            handleLogout();
                        }
                    }
                },
                trigger: ['click'],
                placement: 'bottomRight'
            }, React.createElement(Space, {
                style: { 
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px'
                },
                size: 'small'
            }, [
                React.createElement(Avatar, {
                    key: 'avatar',
                    size: 'small',
                    style: { backgroundColor: '#1890ff', fontSize: '12px' }
                }, user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'),
                React.createElement('span', {
                    key: 'username',
                    style: { 
                        color: '#666',
                        fontSize: '14px'
                    }
                }, user?.name || user?.username || '用户'),
                React.createElement('span', {
                    key: 'arrow',
                    style: { 
                        color: '#999',
                        fontSize: '12px'
                    }
                }, '')
            ]))
        ])
    ]);
};

// 确保TopNavigation在全局可用
window.TopNavigation = TopNavigation;
window.TopBar = TopNavigation; // 兼容性：同时挂载为TopBar

console.log('✅ TopNavigation/TopBar组件已加载');
