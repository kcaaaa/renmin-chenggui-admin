// 导航组件
const Navigation = ({ currentPage, onPageChange, collapsed, onToggleCollapse }) => {
    const { Menu } = antd;
    const { SubMenu } = Menu;
    
    // 二级菜单结构
    const menuItems = [
        {
            key: 'dashboard',
            icon: '📊',
            label: '系统首页',
            type: 'item'
        },
        {
            key: 'content',
            icon: '📄',
            label: '内容管理',
            type: 'item'
        },
        {
            key: 'exhibition-group',
            icon: '🏢',
            label: '展会管理',
            type: 'submenu',
            children: [
                { key: 'booth', icon: '🏪', label: '展位管理' },
                { key: 'live', icon: '📺', label: '直播管理' }
            ]
        },
        {
            key: 'audit-group',
            icon: '🔍',
            label: 'AI审核',
            type: 'submenu',
            children: [
                { key: 'review', icon: '🤖', label: 'AI审核' },
                { key: 'audit-flow', icon: '⚙️', label: '审核流程管理' }
            ]
        },
        {
            key: 'data-group',
            icon: '📈',
            label: '运营数据管理',
            type: 'submenu',
            children: [
                { key: 'operational', icon: '📊', label: '日活、月活等统计' },
                { key: 'stats', icon: '📋', label: '用户行为统计' },
                { key: 'content-stats', icon: '📈', label: '作品数据统计' },
                { key: 'user-profile', icon: '👤', label: '用户画像分析' },
                { key: 'traffic', icon: '🎯', label: '流量分配配置' }
            ]
        },
        {
            key: 'system-group',
            icon: '⚙️',
            label: '系统管理',
            type: 'submenu',
            children: [
                { key: 'user', icon: '👥', label: '用户管理' },
                { key: 'admin', icon: '👨‍💼', label: '权限管理' },
                { key: 'message', icon: '💬', label: '消息管理' },
                { key: 'feedback', icon: '💭', label: '用户反馈管理' },
                { key: 'version', icon: '📱', label: 'APP版本管理' },
                { key: 'logs', icon: '📋', label: '日志管理' },
                { key: 'settings', icon: '🔧', label: '系统设置' }
            ]
        }
    ];

    // 渲染菜单项
    const renderMenuItem = (item) => {
        if (item.type === 'submenu') {
            return React.createElement(SubMenu, {
                key: item.key,
                title: React.createElement('span', {}, [
                    React.createElement('span', { key: 'icon', style: { marginRight: 8 } }, item.icon),
                    React.createElement('span', { key: 'label' }, item.label)
                ])
            }, item.children.map(child => 
                React.createElement(Menu.Item, {
                    key: child.key
                }, [
                    React.createElement('span', { key: 'icon', style: { marginRight: 8 } }, child.icon),
                    React.createElement('span', { key: 'label' }, child.label)
                ])
            ));
        } else {
            return React.createElement(Menu.Item, {
                key: item.key
            }, [
                React.createElement('span', { key: 'icon', style: { marginRight: 8 } }, item.icon),
                !collapsed && React.createElement('span', { key: 'label' }, item.label)
            ]);
        }
    };

    // 获取当前展开的菜单键
    const getOpenKeys = () => {
        // 根据当前页面确定应该展开的子菜单
        const pageToGroupMap = {
            'booth': 'exhibition-group',
            'live': 'exhibition-group',
            'review': 'audit-group',
            'audit-flow': 'audit-group',
            'operational': 'data-group',
            'stats': 'data-group',
            'content-stats': 'data-group',
            'user-profile': 'data-group',
            'traffic': 'data-group',
            'user': 'system-group',
            'admin': 'system-group',
            'message': 'system-group',
            'feedback': 'system-group',
            'version': 'system-group',
            'logs': 'system-group',
            'settings': 'system-group'
        };
        
        const group = pageToGroupMap[currentPage];
        return group ? [group] : [];
    };

    return React.createElement('div', {
        className: 'main-nav',
        style: { 
            width: collapsed ? '80px' : '240px', 
            transition: 'width 0.3s',
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
            height: '100vh',
            overflow: 'auto'
        }
    }, [
        // 导航头部
        React.createElement('div', {
            key: 'nav-header',
            style: {
                padding: '16px',
                borderBottom: '1px solid #f0f0f0',
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
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#1890ff' 
                }
            }, [
                React.createElement('span', { 
                    key: 'icon', 
                    style: { marginRight: collapsed ? 0 : '8px' } 
                }, '🚇'),
                !collapsed && React.createElement('span', { key: 'text' }, '人民城轨2.0')
            ]),
            !collapsed && React.createElement('button', {
                key: 'collapse-btn',
                onClick: onToggleCollapse,
                style: { 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '4px',
                    fontSize: '14px'
                }
            }, '◀')
        ]),
        
        // 展开按钮（折叠状态下显示）
        collapsed && React.createElement('div', {
            key: 'expand-btn',
            style: { padding: '8px', textAlign: 'center' }
        }, React.createElement('button', {
            onClick: onToggleCollapse,
            style: { 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '4px',
                fontSize: '14px'
            }
        }, '▶')),
        
        // 菜单内容
        React.createElement(Menu, {
            key: 'menu',
            mode: 'inline',
            selectedKeys: [currentPage],
            openKeys: collapsed ? [] : getOpenKeys(),
            style: { border: 'none' },
            inlineCollapsed: collapsed,
            onClick: ({ key }) => {
                console.log('Navigation clicked:', key);
                onPageChange(key);
            }
        }, menuItems.map(renderMenuItem))
    ]);
};

window.Navigation = Navigation; 