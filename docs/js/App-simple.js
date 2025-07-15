// 人民城轨2.0运营管理后台 - 简化调试版
const App = () => {
    const { Layout, message, Spin } = antd;
    const { Sider, Header, Content } = Layout;
    
    const [currentPage, setCurrentPage] = React.useState('Dashboard');
    const [collapsed, setCollapsed] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    // 简化的初始化
    React.useEffect(() => {
        console.log('🚀 简化版App初始化...');
        setTimeout(() => {
            setLoading(false);
            // 默认未登录状态，显示登录界面
        }, 1000);
    }, []);

    // 简化的登录处理
    const handleLogin = (userData) => {
        console.log('登录数据:', userData);
        setUser(userData);
        setIsAuthenticated(true);
        message.success('登录成功！');
    };

    // 简化的页面切换
    const handlePageChange = (page) => {
        console.log('切换到页面:', page);
        setCurrentPage(page);
    };

    // 简化的内容渲染
    const renderContent = () => {
        if (window.Dashboard && currentPage === 'Dashboard') {
            return React.createElement(window.Dashboard);
        }
        
        return React.createElement('div', {
            style: { 
                padding: '50px', 
                textAlign: 'center',
                fontSize: '18px'
            }
        }, [
            React.createElement('h2', { key: 'title' }, '页面内容'),
            React.createElement('p', { key: 'info' }, `当前页面: ${currentPage}`),
            React.createElement('p', { key: 'user' }, `用户: ${user?.username || '未登录'}`)
        ]);
    };

    // 加载状态
    if (loading) {
        return React.createElement('div', {
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }
        }, [
            React.createElement(Spin, { key: 'spin', size: 'large' }),
            React.createElement('div', { 
                key: 'text',
                style: { marginTop: '16px', fontSize: '16px' }
            }, '系统初始化中...')
        ]);
    }

    // 未登录状态
    if (!isAuthenticated) {
        if (!window.LoginForm) {
            return React.createElement('div', {
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column'
                }
            }, [
                React.createElement('h2', { key: 'title' }, '登录组件未找到'),
                React.createElement('button', {
                    key: 'demo-login',
                    onClick: () => handleLogin({ username: 'admin', token: 'demo-token' }),
                    style: {
                        padding: '12px 24px',
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }
                }, '演示登录')
            ]);
        }
        
        return React.createElement(window.LoginForm, {
            onLogin: handleLogin
        });
    }

    // 主应用界面 - 简化版
    return React.createElement(Layout, {
        style: { minHeight: '100vh' }
    }, [
        // 侧边栏
        React.createElement(Sider, {
            key: 'sider',
            collapsible: true,
            collapsed: collapsed,
            onCollapse: setCollapsed,
            style: {
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0
            }
        }, window.Sidebar ? React.createElement(window.Sidebar, {
            currentPage: currentPage,
            onPageChange: handlePageChange,
            collapsed: collapsed
        }) : React.createElement('div', {
            style: { 
                padding: '20px', 
                color: 'white', 
                textAlign: 'center',
                fontSize: '14px'
            }
        }, '导航组件加载失败')),
        
        // 主内容区域
        React.createElement(Layout, {
            key: 'main-layout',
            style: { 
                marginLeft: collapsed ? 80 : 200,
                transition: 'margin-left 0.2s'
            }
        }, [
            // 头部
            React.createElement(Header, {
                key: 'header',
                style: {
                    background: '#fff',
                    padding: '0 24px',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }
            }, [
                React.createElement('h1', {
                    key: 'title',
                    style: { margin: 0, fontSize: '18px' }
                }, '人民城轨2.0运营管理后台'),
                React.createElement('div', {
                    key: 'user-info',
                    style: { fontSize: '14px' }
                }, `欢迎，${user?.username || '用户'}`)
            ]),
            
            // 内容区域
            React.createElement(Content, {
                key: 'content',
                style: {
                    margin: '16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: 'calc(100vh - 120px)',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }
            }, renderContent())
        ])
    ]);
};

// 确保组件在全局可用
window.App = App;

console.log('✅ 简化版App组件已加载'); 