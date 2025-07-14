// 顶部操作栏组件
const TopBar = ({ user, notifications, onNotificationClick, onLogout }) => {
    const { Badge, Dropdown, Avatar, Space, Button, Tooltip, Modal } = antd;
    
    // 用户菜单
    const userMenuItems = [
        { key: 'profile', label: '个人中心' },
        { key: 'settings', label: '账户设置' },
        { type: 'divider' },
        { key: 'logout', label: '退出登录', danger: true }
    ];

    const handleUserMenuClick = ({ key }) => {
        if (key === 'logout') {
            Modal.confirm({
                title: '确认退出',
                content: '您确定要退出登录吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => onLogout && onLogout(),
            });
        }
    };

    const userMenu = { items: userMenuItems, onClick: handleUserMenuClick };

    // 通知菜单
    const notificationItems = notifications?.length > 0
        ? [
            ...notifications.slice(0, 5).map((notif, i) => ({
                key: `notif-${i}`,
                label: React.createElement('div', {},
                    React.createElement('div', { style: { fontWeight: 'bold' } }, notif.title),
                    React.createElement('div', { style: { fontSize: '12px' } }, notif.content)
                ),
            })),
            { type: 'divider' },
            { key: 'view-all', label: React.createElement('div', { style: { textAlign: 'center' } }, '查看全部') },
        ]
        : [{ key: 'empty', label: React.createElement('div', { style: { textAlign: 'center', padding: '12px' } }, '暂无通知') }];

    const notificationMenu = { items: notificationItems, onClick: onNotificationClick };
    
    const unreadCount = notifications?.filter(n => !n.read).length || 0;

    const displayName = user?.name || user?.username || '管理员';
    const roleLabel = user?.roleLabel || '管理员';
    const department = user?.department || '系统管理部';

    return React.createElement('div', { className: 'top-bar' },
        // Left Side
        React.createElement('div', { className: 'top-bar-left' },
            React.createElement('h1', { className: 'page-title-in-bar' }, '运营管理后台'),
        ),
        // Right Side
        React.createElement('div', { className: 'top-bar-right' },
            React.createElement(Space, { size: "middle" },
                React.createElement(Tooltip, { title: "帮助文档" },
                    React.createElement(Button, { 
                        shape: 'circle',
                        onClick: () => window.open('https://github.com/kcaaaa/renmin-chenggui-admin/wiki', '_blank')
                    }, '❓')
                ),
                React.createElement(Tooltip, { title: "通知" },
                    React.createElement(Dropdown, { menu: notificationMenu, trigger: ['click'] },
                        React.createElement(Badge, { count: unreadCount, size: 'small' },
                            React.createElement(Button, { shape: 'circle' }, '🔔')
                        )
                    )
                ),
                React.createElement(Dropdown, { menu: userMenu, trigger: ['click'] },
                    React.createElement(Space, { style: { cursor: 'pointer' } },
                        React.createElement(Avatar, {
                            style: { backgroundColor: '#1890ff' },
                            size: 'default'
                        }, displayName.charAt(0)),
                        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } }, [
                            React.createElement('span', { 
                                key: 'name',
                                style: { fontWeight: '500', fontSize: '14px' } 
                            }, displayName),
                            React.createElement('span', { 
                                key: 'role',
                                style: { 
                                    fontSize: '12px', 
                                    color: '#8c8c8c',
                                    lineHeight: '1.2'
                                } 
                            }, roleLabel)
                        ])
                    )
                )
            )
        )
    );
};

window.TopBar = TopBar; 