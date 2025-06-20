// 顶部操作栏组件
const TopBar = ({ user, notifications, onSearch, onNotificationClick }) => {
    const { Input, Badge, Dropdown, Avatar, Space, Button, Tooltip } = antd;
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
            type: 'divider'
        },
        {
            key: 'logout',
            label: '退出登录',
            icon: '🚪',
            danger: true
        }
    ];

    const userMenu = {
        items: userMenuItems,
        onClick: ({ key }) => {
            switch (key) {
                case 'logout':
                    if (confirm('确定要退出登录吗？')) {
                        // 这里处理退出登录逻辑
                        console.log('退出登录');
                    }
                    break;
                default:
                    console.log('菜单点击:', key);
            }
        }
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
            }, '运营管理后台')
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
                }, user?.name?.charAt(0) || '管'),
                React.createElement('span', {
                    key: 'name',
                    style: { color: '#1e293b' }
                }, user?.name || '管理员')
            ]))
        ])
    ]);
};

window.TopBar = TopBar; 