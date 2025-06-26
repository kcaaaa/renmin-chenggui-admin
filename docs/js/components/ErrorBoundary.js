// 错误边界组件
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 可以将错误日志上报给服务器
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // 记录错误到localStorage用于调试
        try {
            const errorLog = {
                timestamp: new Date().toISOString(),
                error: error.toString(),
                errorInfo: errorInfo.componentStack,
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
            existingLogs.unshift(errorLog);
            
            // 只保留最近10条错误日志
            if (existingLogs.length > 10) {
                existingLogs.splice(10);
            }
            
            localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
        } catch (e) {
            console.error('Failed to save error log:', e);
        }
    }

    handleReload = () => {
        window.location.reload();
    }

    handleGoHome = () => {
        window.location.href = '/';
    }

    render() {
        if (this.state.hasError) {
            // 可以自定义降级后的 UI 并渲染
            return React.createElement('div', {
                className: 'error-boundary',
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    padding: '40px',
                    textAlign: 'center',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e8e8e8',
                    margin: '20px'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '64px', 
                        marginBottom: '24px',
                        color: '#ff4d4f'
                    }
                }, '⚠️'),
                
                React.createElement('h2', {
                    key: 'title',
                    style: {
                        color: '#ff4d4f',
                        margin: '0 0 16px 0',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }
                }, '应用出现错误'),
                
                React.createElement('p', {
                    key: 'description',
                    style: {
                        color: '#6b7280',
                        margin: '0 0 24px 0',
                        maxWidth: '500px',
                        lineHeight: '1.6',
                        fontSize: '16px'
                    }
                }, '很抱歉，应用遇到了意外错误。请尝试刷新页面或返回首页。'),
                
                React.createElement('div', {
                    key: 'actions',
                    style: {
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '24px'
                    }
                }, [
                    React.createElement('button', {
                        key: 'reload',
                        onClick: this.handleReload,
                        style: {
                            padding: '10px 20px',
                            background: '#1890ff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }
                    }, '刷新页面'),
                    
                    React.createElement('button', {
                        key: 'home',
                        onClick: this.handleGoHome,
                        style: {
                            padding: '10px 20px',
                            background: '#f5f5f5',
                            color: '#333',
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }
                    }, '返回首页')
                ]),
                
                // 开发环境下显示错误详情
                process.env.NODE_ENV === 'development' && this.state.error && React.createElement('details', {
                    key: 'error-details',
                    style: {
                        width: '100%',
                        maxWidth: '600px',
                        textAlign: 'left',
                        background: '#f8f8f8',
                        padding: '16px',
                        borderRadius: '6px',
                        border: '1px solid #e8e8e8'
                    }
                }, [
                    React.createElement('summary', {
                        key: 'summary',
                        style: {
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: '#666'
                        }
                    }, '错误详情 (开发模式)'),
                    
                    React.createElement('div', {
                        key: 'error-info',
                        style: {
                            fontSize: '12px',
                            color: '#666',
                            fontFamily: 'monospace',
                            whiteSpace: 'pre-wrap',
                            overflow: 'auto',
                            maxHeight: '200px'
                        }
                    }, `错误信息: ${this.state.error.toString()}\n\n组件堆栈: ${this.state.errorInfo.componentStack}`)
                ])
            ]);
        }

        return this.props.children;
    }
}

// 功能组件版本的错误边界（需要 React 16.8+）
const FunctionalErrorBoundary = ({ children, fallback }) => {
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const errorHandler = (error) => {
            console.error('Uncaught error:', error);
            setHasError(true);
            setError(error);
        };

        window.addEventListener('error', errorHandler);
        window.addEventListener('unhandledrejection', errorHandler);

        return () => {
            window.removeEventListener('error', errorHandler);
            window.removeEventListener('unhandledrejection', errorHandler);
        };
    }, []);

    if (hasError) {
        return fallback || React.createElement('div', {
            style: {
                padding: '20px',
                textAlign: 'center',
                color: '#ff4d4f'
            }
        }, [
            React.createElement('h3', {
                key: 'title'
            }, '出现错误'),
            React.createElement('p', {
                key: 'message'
            }, error?.message || '未知错误'),
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
            }, '刷新页面')
        ]);
    }

    return children;
};

// 导出组件
window.ErrorBoundary = ErrorBoundary;
window.FunctionalErrorBoundary = FunctionalErrorBoundary; 