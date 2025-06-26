// 主应用组件
const App = () => {
    const { Layout, message } = antd;
    const { Sider, Header, Content } = Layout;
    
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [collapsed, setCollapsed] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [notifications, setNotifications] = React.useState([
        {
            type: 'warning',
            title: '系统升级',
            content: '系统将于今晚24:00进行维护升级',
            time: '10分钟前',
            read: false
        },
        {
            type: 'info',
            title: '新版本发布',
            content: 'v2.1.0版本已发布，新增批量操作功能',
            time: '1小时前',
            read: true
        }
    ]);

    // 初始化认证状态
    React.useEffect(() => {
        checkAuthStatus();
        
        // 设置定时检查认证状态
        const authCheckInterval = setInterval(() => {
            if (!AuthUtils.refreshAuth()) {
                handleLogout();
            }
        }, 5 * 60 * 1000); // 每5分钟检查一次

        return () => clearInterval(authCheckInterval);
    }, []);

    // 检查认证状态
    const checkAuthStatus = () => {
        try {
            setLoading(true);
            
            if (AuthUtils.isAuthenticated() && !AuthUtils.isTokenExpired()) {
                const userData = AuthUtils.getCurrentUser();
                if (userData) {
                    setUser(userData);
                    setIsAuthenticated(true);
                    console.log('用户已登录:', userData.name);
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
                AuthUtils.logout(); // 清除过期的认证信息
            }
        } catch (error) {
            console.error('认证状态检查失败:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // 处理登录
    const handleLogin = (userData) => {
        try {
            setUser(userData);
            setIsAuthenticated(true);
            message.success(`欢迎回来，${userData.name}！`);
            
            // 记录登录成功
            AuthUtils.logActivity('login_success', {
                username: userData.username,
                loginTime: new Date().toISOString()
            });
        } catch (error) {
            console.error('登录处理失败:', error);
            message.error('登录处理失败，请重试');
        }
    };

    // 处理退出登录
    const handleLogout = () => {
        try {
            const currentUser = AuthUtils.getCurrentUser();
            AuthUtils.logout();
            setUser(null);
            setIsAuthenticated(false);
            setCurrentPage('dashboard'); // 重置到首页
            
            message.info(currentUser ? `${currentUser.name}，您已安全退出` : '已退出登录');
        } catch (error) {
            console.error('退出登录失败:', error);
            message.error('退出登录失败');
        }
    };

    const handlePageChange = (page) => {
        console.log('页面切换到:', page);
        console.log('Setting currentPage to:', page);
        setCurrentPage(page);
        
        // 强制重新渲染
        setTimeout(() => {
            console.log('After setState, currentPage is:', page);
        }, 100);
        
        // 记录页面访问
        if (isAuthenticated) {
            AuthUtils.logActivity('page_visit', {
                page: page,
                timestamp: new Date().toISOString()
            });
        }
    };

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
        
        // 保存用户偏好
        if (isAuthenticated) {
            AuthUtils.setUserPreference('sidebarCollapsed', !collapsed);
        }
    };

    const handleNotificationClick = () => {
        console.log('查看全部通知');
        handlePageChange('notifications');
    };

    // 加载用户偏好设置
    React.useEffect(() => {
        if (isAuthenticated) {
            const savedCollapsed = AuthUtils.getUserPreference('sidebarCollapsed', false);
            setCollapsed(savedCollapsed);
        }
    }, [isAuthenticated]);

    const renderContent = () => {
        console.log('renderContent called with currentPage:', currentPage);
        console.log('Available window components:', {
            Dashboard: !!window.Dashboard,
            ReviewManagement: !!window.ReviewManagement,
            LiveManagement: !!window.LiveManagement,
            UserManagement: !!window.UserManagement,
            MessageManagement: !!window.MessageManagement,
            BoothManagement: !!window.BoothManagement,
            UserProfile: !!window.UserProfile,
            BehaviorStats: !!window.BehaviorStats,
            OperationalStats: !!window.OperationalStats,
            DataManagement: !!window.DataManagement,
            TrafficAllocation: !!window.TrafficAllocation,
            SystemSettings: !!window.SystemSettings
        });
        
        switch(currentPage) {
            case 'dashboard':
            case 'Dashboard':
                console.log('Rendering Dashboard');
                return React.createElement(window.Dashboard);
            case 'review':
            case 'review-image':
            case 'review-video':
            case 'review-interaction':
            case 'review-mechanism':
            case 'ReviewManagement':
                console.log('Rendering ReviewManagement');
                return React.createElement(window.ReviewManagement);
            case 'live':
            case 'LiveManagement':
                console.log('Rendering LiveManagement');
                return React.createElement(window.LiveManagement);
            case 'user':
            case 'UserManagement':
                console.log('Rendering UserManagement');
                return React.createElement(window.UserManagement);
            case 'message':
            case 'MessageManagement':
                console.log('Rendering MessageManagement');
                if (!window.MessageManagement) {
                    console.error('MessageManagement component not found!');
                    return React.createElement('div', {
                        style: {
                            padding: '24px',
                            background: '#fff',
                            border: '2px solid #ff4d4f',
                            borderRadius: '8px',
                            margin: '24px',
                            textAlign: 'center'
                        }
                    }, [
                        React.createElement('h2', { key: 'title' }, '⚠️ 组件加载失败'),
                        React.createElement('p', { key: 'message' }, 'MessageManagement 组件未找到')
                    ]);
                }
                return React.createElement(window.MessageManagement);
            case 'booth':
            case 'BoothManagement':
                console.log('Rendering BoothManagement');
                if (!window.BoothManagement) {
                    console.error('BoothManagement component not found!');
                    return React.createElement('div', {
                        style: {
                            padding: '24px',
                            background: '#fff',
                            border: '2px solid #ff4d4f',
                            borderRadius: '8px',
                            margin: '24px',
                            textAlign: 'center'
                        }
                    }, [
                        React.createElement('h2', { key: 'title' }, '⚠️ 组件加载失败'),
                        React.createElement('p', { key: 'message' }, 'BoothManagement 组件未找到')
                    ]);
                }
                return React.createElement(window.BoothManagement);
            case 'profile':
            case 'UserProfile':
                console.log('Rendering UserProfile');
                return React.createElement(window.UserProfile);
            case 'stats':
            case 'BehaviorStats':
                console.log('Rendering BehaviorStats');
                return React.createElement(window.BehaviorStats);
            case 'operational':
            case 'OperationalStats':
                console.log('Rendering OperationalStats');
                return React.createElement(window.OperationalStats);
            case 'data':
            case 'DataManagement':
                console.log('Rendering DataManagement');
                return React.createElement(window.DataManagement);
            case 'traffic':
            case 'TrafficAllocation':
                console.log('Rendering TrafficAllocation');
                return React.createElement(window.TrafficAllocation);
            case 'settings':
            case 'SystemSettings':
                console.log('Rendering SystemSettings');
                return React.createElement(window.SystemSettings);
            default:
                console.log('Rendering default Dashboard for:', currentPage);
                return React.createElement(window.Dashboard);
        }
    };

    // 加载中状态
    if (loading) {
        return React.createElement('div', {
            className: 'loading-spinner'
        }, [
            React.createElement('div', {
                key: 'loading-content',
                style: { textAlign: 'center' }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { fontSize: '48px', marginBottom: '16px' }
                }, '🚇'),
                React.createElement('div', {
                    key: 'title',
                    style: { fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }
                }, '人民城轨2.0运营管理后台'),
                React.createElement('div', {
                    key: 'message',
                    style: { marginTop: '16px', color: '#64748b' }
                }, '正在验证登录状态...')
            ])
        ]);
    }

    // 未登录状态，显示登录页面
    if (!isAuthenticated) {
        return React.createElement(window.LoginPage, {
            onLogin: handleLogin
        });
    }

    // 已登录状态，显示主应用界面
    return React.createElement(ErrorBoundary, {}, 
        React.createElement(Layout, {
            className: 'app-container',
            style: { minHeight: '100vh' }
        }, [
            // 左侧导航
            React.createElement(Sider, {
                key: 'sider',
                width: collapsed ? 80 : 240,
                collapsed: collapsed,
                collapsible: false,
                style: {
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                }
            }, React.createElement(Navigation, {
                currentPage: currentPage,
                onPageChange: handlePageChange,
                collapsed: collapsed,
                onToggleCollapse: handleToggleCollapse
            })),

            // 右侧主体
            React.createElement(Layout, {
                key: 'main',
                style: { 
                    marginLeft: collapsed ? 80 : 240,
                    transition: 'margin-left 0.3s'
                }
            }, [
                // 顶部操作栏
                React.createElement(Header, {
                    key: 'header',
                    style: { 
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        left: collapsed ? 80 : 240,
                        zIndex: 1000,
                        padding: 0,
                        height: 64,
                        transition: 'left 0.3s'
                    }
                }, React.createElement(TopBar, {
                    user: user,
                    notifications: notifications,
                    onNotificationClick: handleNotificationClick,
                    onLogout: handleLogout
                })),

                // 主内容区
                React.createElement(Content, {
                    key: 'content',
                    style: {
                        marginTop: 64,
                        padding: '24px',
                        background: '#f5f7fa',
                        minHeight: 'calc(100vh - 64px)'
                    }
                }, renderContent())
            ])
        ])
    );
};

window.App = App; 