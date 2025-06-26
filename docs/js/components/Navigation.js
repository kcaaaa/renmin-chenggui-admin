// 瀵艰埅缁勪欢
const Navigation = ({ currentPage, onPageChange, collapsed, onToggleCollapse }) => {
    const { Menu } = antd;
    
    const menuItems = [
        {
            key: 'dashboard',
            icon: '馃搳',
            label: '棣栭〉',
            title: '瀹炴椂鏌ョ湅鏍稿績杩愯惀鎸囨爣',
            page: 'Dashboard'
        },
        {
            key: 'review',
            icon: '馃攳',
            label: '瀹℃牳绠＄悊',
            title: '鍐呭瀹℃牳涓庣鐞?,
            page: 'ReviewManagement'
        },
        {
            key: 'live',
            icon: '馃摵',
            label: '鐩存挱绠＄悊',
            title: '鐩存挱鍐呭绠＄悊',
            page: 'LiveManagement'
        },
        {
            key: 'user',
            icon: '馃懃',
            label: '鐢ㄦ埛绠＄悊',
            title: '鐢ㄦ埛淇℃伅鏌ヨ涓庣鐞?,
            page: 'UserManagement'
        },
        {
            key: 'message',
            icon: '馃挰',
            label: '娑堟伅绠＄悊',
            title: 'APP绯荤粺娑堟伅鎺ㄩ€佺鐞?,
            page: 'MessageManagement'
        },
        {
            key: 'booth',
            icon: '馃彚',
            label: '灞曚綅绠＄悊',
            title: '灞曚細灞曚綅淇℃伅绠＄悊',
            page: 'BoothManagement'
        },
        {
            key: 'stats',
            icon: '馃搵',
            label: '琛屼负缁熻',
            title: '鐢ㄦ埛琛屼负鏁版嵁缁熻',
            page: 'BehaviorStats'
        },
        {
            key: 'operational',
            icon: '馃搱',
            label: '杩愯惀鏁版嵁缁熻',
            title: '鏍稿績杩愯惀鎸囨爣涓庡垎妯″潡缁熻',
            page: 'OperationalStats'
        },
        {
            key: 'data',
            icon: '馃捑',
            label: '绯荤粺涓庤祫婧愮鐞?,
            title: '绯荤粺璧勬簮鐩戞帶涓庣鐞?,
            page: 'DataManagement'
        },
        {
            key: 'traffic',
            icon: '馃幆',
            label: '娴侀噺鍒嗛厤閰嶇疆',
            title: '鎺ㄨ崘绠楁硶涓庢祦閲忓垎閰?,
            page: 'TrafficAllocation'
        },
        {
            key: 'settings',
            icon: '鈿欙笍',
            label: '绯荤粺璁剧疆',
            title: '绯荤粺閰嶇疆涓庣鐞?,
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
        // 瀵艰埅澶撮儴
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
                }, '馃殗'),
                !collapsed && React.createElement('span', {
                    key: 'text'
                }, '浜烘皯鍩庤建2.0')
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
                title: '鏀惰捣鑿滃崟'
            }, '鈼€')
        ]),
        
        // 鏀惰捣鎸夐挳锛堟姌鍙犵姸鎬侊級
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
            title: '灞曞紑鑿滃崟'
        }, '鈻?)),
        
        // 鑿滃崟椤?
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
