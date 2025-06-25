// 导航组件
const Navigation = ({ currentPage, onPageChange, collapsed, onToggleCollapse }) => {
    const { Menu } = antd;
    
    const menuItems = [
        {
            key: 'dashboard',
            icon: '📊',
            label: '首页',
            title: '实时查看核心运营指标',
            page: 'Dashboard'
        },
        {
            key: 'review',
            icon: '🔍',
            label: '审核管理',
            title: '内容审核与管理',
            page: 'ReviewManagement'
        },
        {
            key: 'live',
            icon: '📺',
            label: '直播管理',
            title: '直播内容管理',
            page: 'LiveManagement'
        },
        {
            key: 'user',
            icon: '👥',
            label: '用户管理',
            title: '用户信息查询与管理',
            page: 'UserManagement'
        },
        {
            key: 'message',
            icon: '💬',
            label: '消息管理',
            title: 'APP系统消息推送管理',
            page: 'MessageManagement'
        },
        {
            key: 'stats',
            icon: '📋',
            label: '行为统计',
            title: '用户行为数据统计',
            page: 'BehaviorStats'
        },
        {
            key: 'operational',
            icon: '📈',
            label: '运营数据统计',
            title: '核心运营指标与分模块统计',
            page: 'OperationalStats'
        },
        {
            key: 'data',
            icon: '💾',
            label: '系统与资源管理',
            title: '系统资源监控与管理',
            page: 'DataManagement'
        },
        {
            key: 'traffic',
            icon: '🎯',
            label: '流量分配配置',
            title: '推荐算法与流量分配',
            page: 'TrafficAllocation'
        },
        {
            key: 'settings',
            icon: '⚙️',
            label: '系统设置',
            title: '系统配置与管理',
            page: 'SystemSettings'
        }
    ];

    const renderMenuItem = (item) => {
        return React.createElement(Menu.Item, {
            key: item.key,
            title: item.title
        }, [
            React.createElement('span', {
                key: 'icon',
                className: 'nav-icon'
            }, item.icon),
            !collapsed && React.createElement('span', {
                key: 'label'
            }, item.label)
        ]);
    };

    return React.createElement('div', {
        className: `main-nav ${collapsed ? 'collapsed' : ''}`,
        style: {
            width: collapsed ? '80px' : '240px',
            transition: 'width 0.3s'
        }
    }, [
        // 导航头部
        React.createElement('div', {
            key: 'header',
            style: {
                padding: '16px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between'
            }
        }, [
            React.createElement('div', {
                key: 'logo',
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: collapsed ? '20px' : '16px',
                    fontWeight: 'bold',
                    color: '#2563eb'
                }
            }, [
                React.createElement('span', {
                    key: 'icon',
                    style: { marginRight: collapsed ? 0 : '8px' }
                }, '🚇'),
                !collapsed && React.createElement('span', {
                    key: 'text'
                }, '人民城轨2.0')
            ]),
            !collapsed && React.createElement('button', {
                key: 'toggle',
                onClick: onToggleCollapse,
                style: {
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px'
                },
                title: '收起菜单'
            }, '◀')
        ]),
        
        // 收起按钮（折叠状态）
        collapsed && React.createElement('div', {
            key: 'expand-btn',
            style: {
                padding: '8px',
                textAlign: 'center',
                borderBottom: '1px solid #e5e7eb'
            }
        }, React.createElement('button', {
            onClick: onToggleCollapse,
            style: {
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px'
            },
            title: '展开菜单'
        }, '▶')),
        
        // 菜单项
        React.createElement(Menu, {
            key: 'menu',
            mode: 'inline',
            selectedKeys: [currentPage],
            style: { 
                border: 'none',
                flex: 1
            },
            inlineCollapsed: collapsed,
            onClick: ({ key }) => {
                console.log('Navigation clicked:', key);
                onPageChange(key);
            }
        }, menuItems.map(renderMenuItem))
    ]);
};

window.Navigation = Navigation; 