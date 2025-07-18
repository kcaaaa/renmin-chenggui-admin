 // 人民城轨2.0运营管理后台 - 主应用组件（修复版）
const App = () => {
    console.log('🚀 App组件开始渲染 - 版本 20250118-user-management-upgrade');
    
    // 检查Ant Design是否正确加载
    if (!window.antd) {
        console.error('❌ Ant Design未加载');
        return React.createElement('div', {
            style: { padding: '50px', textAlign: 'center' }
        }, 'Ant Design未加载，请刷新页面');
    }
    
    const { Layout, message, Spin } = antd;
    const { Sider, Header, Content } = Layout;
    
    const [currentPage, setCurrentPage] = React.useState('Dashboard');
    const [collapsed, setCollapsed] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // 系统初始化
    React.useEffect(() => {
        initializeSystem();
    }, []);
    
    // 系统初始化函数
    const initializeSystem = async () => {
        console.log('🚀 初始化人民城轨2.0系统...');
        
        try {
            setLoading(true);
            
            // 检查认证状态
            await checkAuthStatus();
            
            console.log('✅ 系统初始化完成');
            
        } catch (error) {
            console.error('❌ 系统初始化失败:', error);
            message.error('系统初始化失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // 检查认证状态
    const checkAuthStatus = () => {
        return new Promise((resolve) => {
            console.log('🔐 检查认证状态...');
            
            try {
                if (window.AuthUtils && AuthUtils.isAuthenticated() && !AuthUtils.isTokenExpired()) {
                    const userData = AuthUtils.getCurrentUser();
                    if (userData && userData.token) {
                        setUser(userData);
                        setIsAuthenticated(true);
                        console.log('✅ 用户已认证:', userData.username);
                    } else {
                        console.log('⚠️ 用户数据无效，清除认证状态');
                        if (window.AuthUtils) AuthUtils.clearAuth();
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                } else {
                    console.log('ℹ️ 用户未认证');
                    if (window.AuthUtils) AuthUtils.clearAuth();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('❌ 认证检查失败:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
            
            resolve();
        });
    };

    // 登录处理
    const handleLogin = (userData) => {
        if (userData && userData.token) {
            if (window.AuthUtils) AuthUtils.saveAuth(userData);
            setUser(userData);
            setIsAuthenticated(true);
            message.success('登录成功，欢迎使用人民城轨2.0管理后台！');
            setCurrentPage('Dashboard');
        } else {
            message.error('登录失败，请检查用户名和密码');
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // 登出处理
    const handleLogout = () => {
        if (window.AuthUtils) AuthUtils.clearAuth();
        setIsAuthenticated(false);
        setUser(null);
        setCurrentPage('Dashboard');
        message.info('已安全退出系统');
    };

    // 页面切换处理
    const handlePageChange = (page) => {
        console.log('📄 切换到页面:', page);
        setCurrentPage(page);
    };

    // 侧边栏折叠切换
    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    // 渲染页面内容
    const renderContent = () => {
        console.log('🎨 渲染页面内容:', currentPage);
        
        // 完整的页面组件映射表 - 根据文档功能架构
        const pageComponents = {
            // 系统首页
            'Dashboard': window.Dashboard,
            
            // 1. 内容管理
            'ContentPublish': window.ContentPublish,
            'ContentList': window.ContentList,
            
            // 2. 投诉管理
            'ComplaintManagement': window.ComplaintManagement,
            
            // 3. 标签管理
            'TagManagement': window.TagManagement,
            
            // 4. 审核管理
            'AIReview': window.AIReview,
            'ReviewManagement': window.ReviewManagement,
            'ApprovalProcessManagement': window.ApprovalProcessManagement,
            'AuditFlowManagement': window.AuditFlowManagement,
            
            // 5. 展会管理（核心模块）
            'ExhibitionManagement': window.ExhibitionManagement,
            'RegistrationManagement': window.RegistrationManagement,
            'BoothManagement': window.BoothManagement,
            'ExhibitorQuery': window.ExhibitorQuery,
            'MeetingActivityManagement': window.MeetingActivityManagement,
            'ExhibitorBasicInfo': window.ExhibitorBasicInfo,
            'ProductInfo': window.ProductInfo,
            'ExhibitorActivityInfo': window.ExhibitorActivityInfo,
            'BusinessMatching': window.BusinessMatching,
            
            // 6. 运营管理
            'OperationalDataStats': window.OperationalDataStats,
            'UserBehaviorStats': window.UserBehaviorStats,
            'SystemResourceMonitor': window.SystemResourceMonitor,
            'SystemFeedbackList': window.SystemFeedbackList,
            
            // 保留原有的用户分析页面
            'UserAnalysis': window.UserAnalysis,
            'OperationalStats': window.OperationalStats,
            'DataAnalysis': window.DataAnalysis,
            'BehaviorAnalysis': window.BehaviorAnalysis,
            'UserBehaviorStats': window.UserBehaviorStats,
            'BehaviorStats': window.BehaviorStats,
            'DataManagement': window.DataManagement,
            'FeedbackManagement': window.FeedbackManagement,
            
            // 7. 系统管理
            'UserManagement': window.UserManagement,
            'OrganizationManagement': window.OrganizationManagement,
            'RoleManagement': window.RoleManagement,
            // 日志管理子页面
            'UserOperationLogs': window.LogManagement, // 用户操作日志 - 复用LogManagement
            'LoginLogoutLogs': window.LoginLogoutLogs,
            'ContentPublishLogs': window.ContentPublishLogs,
            'ApprovalLogs': window.ApprovalLogs,
            // AI管理子页面
            'AgentManagement': window.AgentManagement,
            'KnowledgeBaseManagement': window.KnowledgeBaseManagement,
            'MenuManagement': window.MenuManagement,
            'UserProfile': window.UserProfile,
            // 展会管理 - 补充的展会管理页面
            'ExhibitionList': window.ExhibitionList,
            'RegistrationEntrance': window.RegistrationEntrance,
            'ExhibitorDetail': window.ExhibitorDetail
        };

        // 获取页面组件
        let PageComponent = pageComponents[currentPage];
        
        // 如果找不到组件，返回错误页面
        if (!PageComponent) {
            console.error('❌ 页面组件未找到:', currentPage);
            
            return React.createElement('div', {
                style: {
                    padding: '50px', 
                    textAlign: 'center',
                    background: '#f5f5f5',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'error-icon',
                    style: { fontSize: '48px', marginBottom: '16px' }
                }, '⚠️'),
                React.createElement('h2', { 
                    key: 'title',
                    style: { 
                        color: '#ff4d4f',
                        marginBottom: '16px'
                    }
                }, '页面未找到'),
                React.createElement('p', { 
                    key: 'description',
                    style: { 
                        color: '#666',
                        fontSize: '16px',
                        marginBottom: '24px'
                    }
                }, '请检查页面名称或联系管理员'),
                React.createElement('button', {
                    key: 'back-btn',
                    style: {
                        padding: '8px 16px',
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    },
                    onClick: () => handlePageChange('Dashboard')
                }, '返回首页')
            ]);
        }

        // 尝试渲染组件
        try {
            console.log('✅ 正在渲染组件:', currentPage);
            return React.createElement(PageComponent, { 
                key: currentPage,
                user: user,
                onPageChange: handlePageChange
            });
        } catch (error) {
            console.error('❌ 渲染页面组件时出错:', error);
            
            return React.createElement('div', {
                style: { 
                    padding: '50px', 
                    textAlign: 'center',
                    background: '#fff2f0',
                    minHeight: '400px'
                }
            }, [
                React.createElement('h2', { 
                    key: 'error-title',
                    style: { color: '#ff4d4f' }
                }, '页面加载失败'),
                React.createElement('p', { 
                    key: 'error-description'
                }, '页面组件渲染时发生错误'),
                React.createElement('button', {
                    key: 'back-btn',
                    onClick: () => handlePageChange('Dashboard'),
                    style: {
                        padding: '8px 16px',
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }
                }, '返回首页')
            ]);
        }
    };

    // 如果正在加载，显示加载界面
    if (loading) {
        return React.createElement('div', {
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f0f2f5'
            }
        }, React.createElement(Spin, {
            size: 'large',
            tip: '系统初始化中...'
        }));
    }

    // 如果未认证，显示登录界面
    if (!isAuthenticated) {
        if (!window.LoginForm) {
            console.error('❌ LoginForm组件未找到');
            return React.createElement('div', {
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: '#f0f2f5'
                }
            }, React.createElement('div', {
                style: { textAlign: 'center' }
            }, [
                React.createElement('h2', { key: 'title' }, '登录组件加载失败'),
                React.createElement('button', {
                    key: 'reload',
                    onClick: () => window.location.reload(),
                    style: {
                        padding: '8px 16px',
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }
                }, '重新加载')
            ]));
        }
        
        return React.createElement(window.LoginForm, {
            onLogin: handleLogin
        });
    }

    // 主应用界面
    const mainApp = React.createElement(Layout, {
            style: { minHeight: '100vh' }
        }, [
        // 侧边栏
            React.createElement(Sider, {
                key: 'sider',
            collapsible: true,
                collapsed: collapsed,
            onCollapse: handleToggleCollapse,
                style: {
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                bottom: 0,
                }
        }, window.Sidebar ? React.createElement(window.Sidebar, {
                currentPage: currentPage,
                onPageChange: handlePageChange,
            collapsed: collapsed
        }) : React.createElement('div', {
            style: { padding: '20px', color: 'white', textAlign: 'center' }
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
                    position: 'sticky',
                        top: 0,
                    zIndex: 100
                }
            }, window.TopNavigation ? React.createElement(window.TopNavigation, {
                    user: user,
                onLogout: handleLogout,
                collapsed: collapsed,
                onToggleCollapse: handleToggleCollapse
            }) : React.createElement('div', {
                style: { lineHeight: '64px' }
            }, '顶部导航组件加载失败')),
            
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
    
    // 如果有ErrorBoundary组件，使用它包装主应用
    if (window.ErrorBoundary) {
        console.log('✅ 使用ErrorBoundary包装应用');
        return React.createElement(window.ErrorBoundary, {}, mainApp);
    }
    
    console.log('⚠️ ErrorBoundary组件未找到，直接返回主应用');
    return mainApp;
};

// 确保App组件在全局可用
window.App = App; 

console.log('✅ 人民城轨2.0主应用组件已加载');