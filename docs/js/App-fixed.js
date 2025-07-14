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
            setCurrentPage('Dashboard'); // 重置到首页
            
            message.info(currentUser ? `${currentUser.name}，您已安全退出` : '已退出登录');
        } catch (error) {
            console.error('退出登录失败:', error);
            message.error('退出登录失败');
        }
    };

    const handlePageChange = (page) => {
        console.log('🚀 [FIXED] 页面切换开始');
        console.log('🎯 [FIXED] 目标页面:', page);
        console.log('📍 [FIXED] 当前页面:', currentPage);
        
        // 设置新页面
        setCurrentPage(page);
        
        // 强制重新渲染
        setRenderKey(prev => prev + 1);
        
        console.log('✅ [FIXED] 页面状态已更新');
        console.log('🔄 [FIXED] 强制重新渲染 key:', renderKey + 1);
        
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

    // 监听页面变化
    React.useEffect(() => {
        console.log('📱 [FIXED] useEffect 触发 - 页面:', currentPage);
        console.log('🔧 [FIXED] renderKey:', renderKey);
    }, [currentPage, renderKey]);

    const renderContent = () => {
        console.log('🎨 [FIXED] renderContent 开始渲染');
        console.log('📄 [FIXED] 当前页面:', currentPage);
        console.log('🔑 [FIXED] renderKey:', renderKey);
        
        // 完整的组件映射表
        const pageComponents = {
            // 系统首页
            'Dashboard': window.Dashboard,
            'dashboard': window.Dashboard,
            
            // 内容管理
            'ContentPublish': window.ContentPublish,
            'content-publish': window.ContentPublish,
            'ContentManagement': window.ContentManagement,
            'content-list': window.ContentManagement,
            
            // 审核管理
            'ComplaintManagement': window.ComplaintManagement,
            'complaint': window.ComplaintManagement,
            'ContentTagManagement': window.ContentTagManagement,
            'tags': window.ContentTagManagement,
            'ReviewManagement': window.ReviewManagement,
            'ai-review': window.AIReview,
            'AIReview': window.AIReview,
            'AuditFlowManagement': window.AuditFlowManagement,
            'approval-flow': window.AuditFlowManagement,
            'work-approval': window.AuditFlowManagement,
            'ExhibitionReview': window.ExhibitionReview,
            'exhibitor-approval': window.ExhibitionReview,
            'approval-management': window.AuditFlowManagement,
            
            // 展会管理
            'ExhibitionManagement': window.ExhibitionManagement,
            'exhibition-list': window.ExhibitionManagement,
            'RegistrationManagement': window.RegistrationManagement,
            'registration-management': window.RegistrationManagement,
            'registration-entrance': window.RegistrationManagement,
            'BoothManagement': window.BoothManagement,
            'venue-info': window.BoothManagement,
            'ExhibitorQuery': window.ExhibitorQuery,
            'exhibitor-details': window.ExhibitorQuery,
            'MeetingActivityManagement': window.MeetingActivityManagement,
            'meeting-activity': window.MeetingActivityManagement,
            'ExhibitorBasicInfo': window.ExhibitorBasicInfo,
            'exhibitor-basic': window.ExhibitorBasicInfo,
            'ProductInfo': window.ProductInfo,
            'product-info': window.ProductInfo,
            'ExhibitorActivityInfo': window.ExhibitorActivityInfo,
            'exhibitor-activity': window.ExhibitorActivityInfo,
            'BusinessMatching': window.BusinessMatching,
            'business-matching': window.BusinessMatching,
            'ExhibitorInfo': window.ExhibitorInfo,
            'exhibitor-info': window.ExhibitorInfo,
            
            // 运营管理
            'UserAnalysis': window.UserAnalysis,
            'user-analysis': window.UserAnalysis,
            'BehaviorStats': window.BehaviorStats,
            'app-behavior': window.BehaviorStats,
            'basic-behavior': window.BehaviorStats,
            'DataAnalysis': window.DataAnalysis,
            'function-analysis': window.DataAnalysis,
            'OperationalStats': window.OperationalStats,
            'exception-stats': window.OperationalStats,
            'UserBehaviorStats': window.UserBehaviorStats,
            'data-overview': window.UserBehaviorStats,
            'BehaviorAnalysis': window.BehaviorAnalysis,
            'deep-behavior': window.BehaviorAnalysis,
            'DataManagement': window.DataManagement,
            'system-monitor': window.DataManagement,
            'FeedbackManagement': window.FeedbackManagement,
            'feedback-list': window.FeedbackManagement,
            
            // 系统管理
            'UserManagement': window.UserManagement,
            'user-list': window.UserManagement,
            'OrganizationManagement': window.OrganizationManagement,
            'organization': window.OrganizationManagement,
            'AdminManagement': window.AdminManagement,
            'admin-role': window.AdminManagement,
            'RoleManagement': window.RoleManagement,
            'non-admin-role': window.RoleManagement,
            'LogManagement': window.LogManagement,
            'user-operation-logs': window.LogManagement,
            'LoginLogoutLogs': window.LoginLogoutLogs,
            'login-logout-logs': window.LoginLogoutLogs,
            'ContentPublishLogs': window.ContentPublishLogs,
            'content-publish-logs': window.ContentPublishLogs,
            'ApprovalLogs': window.ApprovalLogs,
            'approval-logs': window.ApprovalLogs,
            'AIManagement': window.AIManagement,
            'agent-management': window.AIManagement,
            'knowledge-base': window.AIManagement,
            'MenuManagement': window.MenuManagement,
            'menu-management': window.MenuManagement,
            'UserProfile': window.UserProfile,
            'profile': window.UserProfile,
            
            // 其他页面
            'LiveManagement': window.LiveManagement,
            'MessageManagement': window.MessageManagement,
            'VersionManagement': window.VersionManagement,
            'SystemSettings': window.SystemSettings
        };
        
        const PageComponent = pageComponents[currentPage];
        console.log('🔍 [FIXED] 查找组件:', currentPage, '结果:', !!PageComponent);
        
        if (PageComponent) {
            console.log('✅ [FIXED] 渲染页面组件:', currentPage);
            try {
                return React.createElement(PageComponent, { key: `${currentPage}-${renderKey}` });
            } catch (error) {
                console.error('❌ [FIXED] 页面组件渲染失败:', error);
                return React.createElement('div', {
                    style: { 
                        padding: '24px', 
                        textAlign: 'center',
                        background: '#fff',
                        margin: '24px',
                        borderRadius: '8px',
                        border: '1px solid #ff4d4f'
                    }
                }, [
                    React.createElement('h2', { key: 'title', style: { color: '#ff4d4f' } }, `页面组件 ${currentPage} 渲染失败`),
                    React.createElement('p', { key: 'error' }, error.message),
                    React.createElement('button', {
                        key: 'reload',
                        onClick: () => location.reload(),
                        style: { padding: '8px 16px', marginTop: '16px' }
                    }, '重新加载')
                ]);
            }
        }
        
        // 如果没有找到对应组件，显示错误页面
        console.log('❌ [FIXED] 未找到页面组件:', currentPage);
        return React.createElement('div', {
            style: { 
                padding: '24px', 
                textAlign: 'center',
                background: '#fff',
                margin: '24px',
                borderRadius: '8px',
                border: '1px solid #faad14'
            }
        }, [
            React.createElement('h2', { key: 'title', style: { color: '#faad14' } }, `页面 "${currentPage}" 未找到`),
            React.createElement('p', { key: 'msg' }, '请检查页面组件是否正确加载'),
            React.createElement('button', {
                key: 'back',
                onClick: () => handlePageChange('Dashboard'),
                style: { padding: '8px 16px', marginTop: '16px' }
            }, '返回首页')
        ]);
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
                onToggleCollapse: handleToggleCollapse,
                user: user
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

                // 主内容区 - 使用renderKey确保重新渲染
                React.createElement(Content, {
                    key: `main-content-${currentPage}-${renderKey}`,
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

console.log('🚀 [FIXED] App 组件定义完成，准备挂载到 window');
window.App = App;
console.log('✅ [FIXED] App 组件已挂载到 window.App'); 