// 错误边界组件
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary捕获到错误:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
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
                    key: 'title',
                    style: { color: '#ff4d4f', marginBottom: '16px' }
                }, '出现了一些错误'),
                React.createElement('p', {
                    key: 'message',
                    style: { color: '#666', marginBottom: '24px' }
                }, '页面渲染时发生错误，请刷新页面重试'),
                React.createElement('button', {
                    key: 'reload',
                    onClick: () => window.location.reload(),
                    style: {
                        padding: '8px 16px',
                        background: '#1890ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }
                }, '刷新页面'),
                this.state.error && React.createElement('details', {
                    key: 'details',
                    style: { marginTop: '20px', textAlign: 'left' }
                }, [
                    React.createElement('summary', { key: 'summary' }, '错误详情'),
                    React.createElement('pre', {
                        key: 'error',
                        style: { fontSize: '12px', color: '#666' }
                    }, this.state.error.toString()),
                    this.state.errorInfo && React.createElement('pre', {
                        key: 'errorInfo',
                        style: { fontSize: '12px', color: '#666' }
                    }, this.state.errorInfo.componentStack)
                ])
            ]);
        }

        return this.props.children;
    }
}

// 确保ErrorBoundary在全局可用
window.ErrorBoundary = ErrorBoundary;

console.log('ErrorBoundary组件已加载');
