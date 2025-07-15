// 侧边栏导航组件 - 若依风格
const Sidebar = ({ currentPage, onPageChange, collapsed }) => {
    const { Menu } = antd;
    const [openKeys, setOpenKeys] = React.useState(['content']);

    const menuItems = [
        {
            key: 'Dashboard',
            icon: '🏠',
            label: '系统首页',
        },
        {
            key: 'content',
            icon: '📝',
            label: '内容管理',
            children: [
                { key: 'ContentPublish', label: '内容发布', page: 'ContentPublish' },
                { key: 'ContentList', label: '内容列表', page: 'ContentList' }
            ]
        },
        {
            key: 'ComplaintManagement',
            icon: '⚠️',
            label: '投诉管理',
            page: 'ComplaintManagement'
        },
        {
            key: 'TagManagement', 
            icon: '🏷️',
            label: '标签管理',
            page: 'TagManagement'
        },
        {
            key: 'review',
            icon: '🔍',
            label: '审核管理',
            children: [
                { key: 'AIReview', label: 'AI审核', page: 'AIReview' },
                { key: 'ReviewManagement', label: '审批流程', page: 'ReviewManagement' },
                { key: 'ApprovalProcessManagement', label: '作品审批流程', page: 'ApprovalProcessManagement' },
                { key: 'AuditFlowManagement', label: '展商审批流程', page: 'AuditFlowManagement' }
            ]
        },
        {
            key: 'exhibition',
            icon: '🏢',
            label: '展会管理',
            children: [
                {
                    key: 'exhibition-manage',
                    label: '展会管理',
                    children: [
                        { key: 'ExhibitionList', label: '展会列表', page: 'ExhibitionList' },
                        { key: 'RegistrationManagement', label: '报名管理', page: 'RegistrationManagement' },
                        { key: 'BoothManagement', label: '场馆信息', page: 'BoothManagement' },
                        { key: 'ExhibitorDetail', label: '展商详情', page: 'ExhibitorDetail' },
                        { key: 'MeetingActivityManagement', label: '会议活动', page: 'MeetingActivityManagement' },
                    ]
                },
                { key: 'RegistrationEntrance', label: '报名入口', page: 'RegistrationEntrance' },
                {
                    key: 'exhibitor-info',
                    label: '展商信息',
                    children: [
                        { key: 'ExhibitorBasicInfo', label: '展商基础信息', page: 'ExhibitorBasicInfo' },
                        { key: 'ProductInfo', label: '产品信息', page: 'ProductInfo' },
                        { key: 'ExhibitorActivityInfo', label: '展商活动信息', page: 'ExhibitorActivityInfo' },
                        { key: 'BusinessMatching', label: '商务配对', page: 'BusinessMatching' },
                    ]
                }
            ]
        },
        {
            key: 'operation',
            icon: '📊',
            label: '运营管理',
            children: [
                {
                    key: 'operational-stats',
                    label: '运营数据统计',
                    children: [
                        { key: 'UserAnalysis', label: '用户分析', page: 'UserAnalysis' },
                        { key: 'OperationalStats', label: 'APP行为统计', page: 'OperationalStats' },
                        { key: 'DataAnalysis', label: '功能使用分析', page: 'DataAnalysis' },
                        { key: 'BehaviorAnalysis', label: '异常情况统计', page: 'BehaviorAnalysis' }
                    ]
                },
                {
                    key: 'user-behavior-stats',
                    label: '用户行为统计',
                    children: [
                        { key: 'UserBehaviorStats', label: '数据概览', page: 'UserBehaviorStats' },
                        { key: 'BehaviorStats', label: '基础行为统计', page: 'BehaviorStats' },
                        { key: 'DataManagement', label: '深度行为统计', page: 'DataManagement' }
                    ]
                },
                { key: 'FeedbackManagement', label: '系统反馈列表', page: 'FeedbackManagement' }
            ]
        },
        {
            key: 'system',
            icon: '⚙️',
            label: '系统管理',
            children: [
                { key: 'UserManagement', label: '用户管理', page: 'UserManagement' },
                { key: 'OrganizationManagement', label: '组织结构', page: 'OrganizationManagement' },
                { key: 'RoleManagement', label: '角色管理', page: 'RoleManagement' },
                {
                    key: 'log-management',
                    label: '日志管理',
                    children: [
                        { key: 'LogManagement', label: '用户操作日志', page: 'LogManagement' },
                        { key: 'LoginLogoutLogs', label: '登录登出日志', page: 'LoginLogoutLogs' },
                        { key: 'ContentPublishLogs', label: '作品发布日志', page: 'ContentPublishLogs' },
                        { key: 'ApprovalLogs', label: '审批日志', page: 'ApprovalLogs' }
                    ]
                },
                { key: 'AIManagement', label: 'AI管理', page: 'AIManagement' },
                { key: 'MenuManagement', label: '菜单管理', page: 'MenuManagement' },
                { key: 'UserProfile', label: '个人中心', page: 'UserProfile' }
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

    return React.createElement('div', {
        className: 'sidebar',
        style: {
            width: collapsed ? 80 : 250,
            minHeight: '100vh',
            background: '#001529',
            transition: 'width 0.3s'
        }
    }, [
        React.createElement('div', {
            key: 'logo',
            className: 'logo',
            style: {
                height: 64,
                background: 'rgba(255, 255, 255, 0.2)',
                margin: 16,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: collapsed ? 14 : 16,
                fontWeight: 'bold'
            }
        }, collapsed ? '人民城轨' : '人民城轨2.0管理后台'),
        React.createElement(Menu, {
            key: 'menu',
            theme: 'dark',
            mode: 'inline',
            selectedKeys: [currentPage],
            openKeys: openKeys,
            onOpenChange: handleOpenChange,
            onClick: handleMenuClick,
            items: menuItems.map(renderMenuItem),
            style: {
                border: 'none'
            }
        })
    ]);
};

// 导出组件
window.Sidebar = Sidebar;
window.Navigation = Sidebar; // 兼容性：同时挂载为Navigation

console.log('✅ Sidebar/Navigation组件已加载');

