// 主应用组件
const App = () => {
    const { Layout, Spin, Modal, Card } = antd;
    const { Header, Content, Sider } = Layout;
    
    // 页面状态管理
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [collapsed, setCollapsed] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [systemError, setSystemError] = React.useState(false);
    
    // 系统初始化
    React.useEffect(() => {
        initializeSystem();
    }, []);
    
    // 系统初始化函数
    const initializeSystem = async () => {
        console.log('Initializing system...');
        setIsLoading(true);
        
        try {
            // 模拟系统初始化过程
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 检查是否已登录
            const isLoggedIn = checkLoginStatus();
            if (!isLoggedIn) {
                setCurrentPage('login');
            }
            
            console.log('System initialized successfully');
        } catch (error) {
            console.error('System initialization failed:', error);
            setSystemError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 检查登录状态
    const checkLoginStatus = () => {
        // 这里应该检查实际的登录状态
        // 目前返回true以直接进入系统
        return true;
    };
    
    // 处理登录成功
    const handleLoginSuccess = () => {
        console.log('Login successful');
        setCurrentPage('dashboard');
    };
    
    // 页面切换处理
    const handlePageChange = (page) => {
        console.log('Page changing to:', page);
        setCurrentPage(page);
    };
    
    // 切换侧边栏
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    
    // 渲染页面内容
    const renderContent = () => {
        console.log('renderContent called with currentPage:', currentPage);
        
        // 检查组件是否存在
        const componentStatus = {
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
            LogManagement: !!window.LogManagement,
            SystemSettings: !!window.SystemSettings,
            PersonalCenter: !!window.PersonalCenter,
            AccountSettings: !!window.AccountSettings,
            Login: !!window.Login
        };
        
        console.log('Component status:', componentStatus);
        
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
                if (!window.MessageManagement) {
                    console.error('MessageManagement component not found');
                    return React.createElement('div', {
                        style: {
                            padding: '20px',
                            textAlign: 'center',
                            color: '#999'
                        }
                    }, [
                        React.createElement('h3', { key: 'title' }, '消息管理'),
                        React.createElement('p', { key: 'message' }, '该功能正在开发中...')
                    ]);
                }
                console.log('Rendering MessageManagement');
                return React.createElement(window.MessageManagement);
                
            case 'booth':
            case 'BoothManagement':
                if (!window.BoothManagement) {
                    console.error('BoothManagement component not found');
                    return React.createElement('div', {
                        style: {
                            padding: '20px',
                            textAlign: 'center',
                            color: '#999'
                        }
                    }, [
                        React.createElement('h3', { key: 'title' }, '展位管理'),
                        React.createElement('p', { key: 'message' }, '该功能正在开发中...')
                    ]);
                }
                console.log('Rendering BoothManagement');
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
                
            case 'logs':
            case 'LogManagement':
                console.log('Rendering LogManagement');
                return React.createElement(window.LogManagement);
                
            case 'settings':
            case 'SystemSettings':
                console.log('Rendering SystemSettings');
                return React.createElement(window.SystemSettings);
                
            case 'personal-center':
            case 'PersonalCenter':
                console.log('Rendering PersonalCenter');
                return React.createElement(window.PersonalCenter);
                
            case 'account-settings':
            case 'AccountSettings':
                console.log('Rendering AccountSettings');
                return React.createElement(window.AccountSettings);
                
            case 'login':
                console.log('Rendering Login');
                return React.createElement(window.Login, {
                    onLoginSuccess: handleLoginSuccess
                });
                
            default:
                console.log('Rendering default Dashboard');
                return React.createElement(window.Dashboard);
        }
    };
    
    // 如果系统错误
    if (systemError) {
        return React.createElement('div', {
            style: {
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }
        }, [
            React.createElement('h2', { key: 'title', style: { color: '#ff4d4f' } }, '系统初始化失败'),
            React.createElement('p', { key: 'message' }, '请刷新页面重试'),
            React.createElement('button', {
                key: 'refresh',
                onClick: () => window.location.reload(),
                style: {
                    padding: '8px 16px',
                    background: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            }, '刷新页面')
        ]);
    }
    
    // 如果正在加载
    if (isLoading) {
        return React.createElement('div', {
            style: {
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }
        }, [
            React.createElement(Spin, {
                key: 'spinner',
                size: 'large'
            }),
            React.createElement('p', {
                key: 'text',
                style: { marginTop: '20px', color: '#666' }
            }, '正在初始化系统...')
        ]);
    }
    
    // 如果是登录页面
    if (currentPage === 'login') {
        return React.createElement('div', {
            style: {
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }
        }, renderContent());
    }
    
    // 主布局
    return React.createElement(Layout, {
        style: { minHeight: '100vh' }
    }, [
        // 侧边栏
        React.createElement(Sider, {
            key: 'sider',
            collapsible: true,
            collapsed: collapsed,
            onCollapse: toggleSidebar,
            trigger: null,
            width: 240,
            collapsedWidth: 80,
            style: {
                background: '#fff',
                boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                position: 'fixed',
                height: '100vh',
                left: 0,
                top: 0,
                zIndex: 1000
            }
        }, React.createElement(window.Navigation, {
            currentPage: currentPage,
            onPageChange: handlePageChange,
            collapsed: collapsed,
            onToggleCollapse: toggleSidebar
        })),
        
        // 主内容区
        React.createElement(Layout, {
            key: 'main',
            style: {
                marginLeft: collapsed ? 80 : 240,
                transition: 'margin-left 0.3s'
            }
        }, [
            // 头部
            React.createElement(Header, {
                key: 'header',
                style: {
                    background: '#fff',
                    padding: '0 24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }
            }, [
                React.createElement('div', {
                    key: 'header-left'
                }, [
                    React.createElement('h1', {
                        key: 'title',
                        style: {
                            margin: 0,
                            fontSize: '18px',
                            color: '#1e293b'
                        }
                    }, '人民城轨2.0 运营管理后台')
                ]),
                React.createElement('div', {
                    key: 'header-right',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }
                }, [
                    React.createElement('span', {
                        key: 'user',
                        style: { color: '#64748b' }
                    }, '管理员'),
                    React.createElement('button', {
                        key: 'logout',
                        onClick: () => setCurrentPage('login'),
                        style: {
                            padding: '4px 12px',
                            background: 'none',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: '#64748b'
                        }
                    }, '退出')
                ])
            ]),
            
            // 内容区
            React.createElement(Content, {
                key: 'content',
                style: {
                    margin: '24px',
                    padding: '24px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    minHeight: 'calc(100vh - 64px - 48px)'
                }
            }, renderContent())
        ])
    ]);
};

// 初始化应用
const initApp = () => {
    console.log('Initializing App...');
    
    // 检查必要的依赖
    if (typeof React === 'undefined') {
        console.error('React is not loaded');
        return;
    }
    
    if (typeof antd === 'undefined') {
        console.error('Ant Design is not loaded');
        return;
    }
    
    // 渲染应用
    const container = document.getElementById('app');
    if (container) {
        console.log('Rendering App to container');
        ReactDOM.render(React.createElement(App), container);
    } else {
        console.error('App container not found');
    }
};

// 等待DOM加载完成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
} 