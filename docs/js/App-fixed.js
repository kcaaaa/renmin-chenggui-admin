// 修复版主应用组件
const App = () => {
    const { Layout, message } = antd;
    const { Sider, Header, Content } = Layout;
    
    const [currentPage, setCurrentPage] = React.useState('Dashboard');
    const [collapsed, setCollapsed] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [renderKey, setRenderKey] = React.useState(0); // 强制重新渲染的key
    
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
        }, 5 * 60 * 1000); // 5分钟检查一次

        return () => clearInterval(authCheckInterval);
    }, []);

    // 检查认证状态
    const checkAuthStatus = () => {
        try {
            setLoading(true);
            
            if (AuthUtils.isAuthenticated() && !AuthUtils.isTokenExpired()) {
                const userData = AuthUtils.getCurrentUser();
                if (userData && userData.token) {
                    setUser(userData);
                    setIsAuthenticated(true);
                    console.log('用户认证成功:', userData.username);
                } else {
                    console.log('用户数据无效，清除认证状态');
                    AuthUtils.clearAuth();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                console.log('认证状态无效或已过期');
                AuthUtils.clearAuth();
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('认证检查失败:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // 登录处理
    const handleLogin = (userData) => {
        if (userData && userData.token) {
            AuthUtils.saveAuth(userData);
            setUser(userData);
            setIsAuthenticated(true);
            message.success('登录成功，欢迎使用人民城轨2.0管理后台！');
            setCurrentPage('Dashboard');
            setRenderKey(prev => prev + 1); // 强制重新渲染
        } else {
            message.error('登录失败，请检查用户名和密码');
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // 登出处理
    const handleLogout = () => {
        AuthUtils.clearAuth();
        setIsAuthenticated(false);
        setUser(null);
        setCurrentPage('Dashboard');
        message.info('已安全退出系统');
        setRenderKey(prev => prev + 1); // 强制重新渲染
    };

    // 页面切换处理
    const handlePageChange = (page) => {
        console.log('切换到页面:', page);
        
        // 重置强制重新渲染key
        setRenderKey(prev => prev + 1);
        
        // 延迟设置页面，确保先触发重新渲染
        setTimeout(() => {
            setCurrentPage(page);
        }, 10);
        
        // 记录页面访问
        try {
            const visitHistory = JSON.parse(localStorage.getItem('pageVisitHistory') || '[]');
            visitHistory.unshift({
                page: page,
                timestamp: new Date().toISOString(),
                user: user?.username || 'unknown'
            });
            // 只保留最近50次访问记录
            localStorage.setItem('pageVisitHistory', JSON.stringify(visitHistory.slice(0, 50)));
        } catch (error) {
            console.warn('保存页面访问历史失败:', error);
        }
    };

    // 侧边栏折叠切换
    const handleToggleCollapse = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        
        // 保存折叠状态到本地存储
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
    };

    // 通知点击处理
    const handleNotificationClick = () => {
        // 标记所有通知为已读
        setNotifications(prev => prev.map(notif => ({
            ...notif,
            read: true
        })));
        
        // 可以在这里添加更多通知相关的逻辑
        message.info('通知已全部标记为已读');
    };

    // 页面加载时恢复侧边栏状态
    React.useEffect(() => {
        try {
            const savedCollapsed = localStorage.getItem('sidebarCollapsed');
            if (savedCollapsed !== null) {
                setCollapsed(JSON.parse(savedCollapsed));
            }
        } catch (error) {
            console.warn('恢复侧边栏状态失败:', error);
        }
    }, []);

    // 渲染页面内容
    const renderContent = () => {
        const pageComponents = {
            // 首页
            Dashboard: window.Dashboard,
            
            // 内容管理
            ContentList: window.ContentList,
            ContentPublish: window.ContentPublish,
            ComplaintManagement: window.ComplaintManagement,
            TagManagement: window.TagManagement,
            
            // 审核管理
            AIReview: window.AIReview,
            WorkApprovalProcess: window.WorkApprovalProcess, // 作品审批流程
            ExhibitorApprovalProcess: window.ExhibitorApprovalProcess, // 展商审批流程
            ApprovalProcessManagement: window.ApprovalProcessManagement,
            
            // 展会管理
            ExhibitionList: window.ExhibitionList,
            RegistrationManagement: window.RegistrationManagement,
            RegistrationEntrance: window.RegistrationEntrance,
            BoothManagement: window.BoothManagement,
            ExhibitorQuery: window.ExhibitorQuery,
            MeetingActivityManagement: window.MeetingActivityManagement,
            ExhibitorBasicInfo: window.ExhibitorBasicInfo,
            ProductInfo: window.ProductInfo,
            ExhibitorActivityInfo: window.ExhibitorActivityInfo,
            BusinessMatching: window.BusinessMatching,
            
            // 运营管理
            UserAnalysis: window.UserAnalysis,
            AppBehaviorStats: window.BehaviorStats,
            FunctionUsageAnalysis: window.DataAnalysis,
            AbnormalSituationStats: window.BehaviorAnalysis,
            DataOverview: window.OperationalStats,
            BasicBehaviorStats: window.UserBehaviorStats,
            DeepBehaviorStats: window.BehaviorStats,
            SystemResourceMonitoring: window.DataManagement,
            SystemFeedbackList: window.SystemFeedbackList,
            
            // 系统管理
            UserList: window.UserList,
            OrganizationStructure: window.OrganizationStructure,
            AdminRole: window.AdminRole,
            NonAdminRole: window.NonAdminRole,
            UserOperationLogs: window.UserOperationLogs,
            LoginLogoutLogs: window.LoginLogoutLogs,
            ContentPublishLogs: window.ContentPublishLogs,
            ApprovalLogs: window.ApprovalLogs,
            AgentManagement: window.AgentManagement,
            KnowledgeBaseManagement: window.KnowledgeBaseManagement,
            MenuManagement: window.MenuManagement,
            PersonalCenter: window.PersonalCenter
        };

        const PageComponent = pageComponents[currentPage];
        
        if (!PageComponent) {
            console.warn('页面组件未找到:', currentPage);
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
                React.createElement('p', { 
                    key: 'debug',
                    style: { 
                        color: '#999',
                        fontSize: '14px'
                    }
                }, `当前页面: ${currentPage}`)
            ]);
        }

        try {
            return React.createElement(PageComponent, { key: renderKey });
        } catch (error) {
            console.error('渲染页面组件时出错:', error);
            return React.createElement('div', {
                style: { 
                    padding: '50px', 
                    textAlign: 'center',
                    background: '#fff2f0',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }, [
                React.createElement('h2', { 
                    key: 'error-title',
                    style: { 
                        color: '#ff4d4f',
                        marginBottom: '16px'
                    }
                }, '页面加载失败'),
                React.createElement('p', { 
                    key: 'error-description',
                    style: { 
                        color: '#666',
                        fontSize: '16px',
                        marginBottom: '24px'
                    }
                }, '页面组件渲染时发生错误'),
                React.createElement('p', { 
                    key: 'error-detail',
                    style: { 
                        color: '#999',
                        fontSize: '14px'
                    }
                }, error.message || '未知错误')
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
        }, React.createElement(antd.Spin, {
            size: 'large',
            tip: '系统初始化中...'
        }));
    }

    // 如果未认证，显示登录界面
    if (!isAuthenticated) {
        return React.createElement(window.LoginForm, {
            onLogin: handleLogin
        });
    }

    // 主应用界面
    return React.createElement(Layout, {
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
        }, React.createElement(window.Sidebar, {
            currentPage: currentPage,
            onPageChange: handlePageChange,
            collapsed: collapsed
        })),
        
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
            }, React.createElement(window.TopNavigation, {
                user: user,
                notifications: notifications,
                onLogout: handleLogout,
                onNotificationClick: handleNotificationClick,
                collapsed: collapsed,
                onToggleCollapse: handleToggleCollapse
            })),
            
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

// 确保App组件在全局可用
window.App = App;
