// 消息管理页面 - APP系统消息推送管理 - 调试版本
const MessageManagement = () => {
    console.log('MessageManagement component is rendering...');
    
    // 检查是否有必要的依赖
    if (!window.antd) {
        console.error('Ant Design is not loaded');
        return React.createElement('div', {}, 'Ant Design未加载');
    }
    
    const { Card, Button, Alert, message } = antd;
    
    // 简单的测试函数
    const handleTest = () => {
        message.success('消息管理组件正常工作！');
    };
    
    console.log('Creating MessageManagement JSX...');
    
    try {
        return React.createElement('div', {
            style: {
                padding: '24px',
                background: '#f0f2f5',
                minHeight: '100vh'
            }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '24px',
                    color: '#1e293b'
                }
            }, '💬 消息管理'),
            
            React.createElement(Alert, {
                key: 'alert',
                message: '消息管理模块',
                description: '用于管理APP系统消息推送，包括系统通知、审核结果、活动消息等',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),
            
            React.createElement(Card, {
                key: 'card',
                title: '功能测试',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('p', {
                    key: 'text',
                    style: { marginBottom: '16px' }
                }, '如果您能看到这个页面，说明消息管理组件已经成功加载。'),
                
                React.createElement(Button, {
                    key: 'button',
                    type: 'primary',
                    onClick: handleTest
                }, '测试功能')
            ]),
            
            React.createElement(Card, {
                key: 'stats',
                title: '模块状态'
            }, [
                React.createElement('ul', {
                    key: 'list',
                    style: { margin: 0, paddingLeft: '20px' }
                }, [
                    React.createElement('li', { key: 'item1' }, '✅ 组件加载成功'),
                    React.createElement('li', { key: 'item2' }, '✅ React正常工作'),
                    React.createElement('li', { key: 'item3' }, '✅ Ant Design可用'),
                    React.createElement('li', { key: 'item4' }, '🔄 完整功能开发中...')
                ])
            ])
        ]);
    } catch (error) {
        console.error('Error rendering MessageManagement:', error);
        return React.createElement('div', {
            style: {
                padding: '24px',
                background: '#fff',
                border: '1px solid #ff4d4f',
                borderRadius: '8px',
                margin: '24px'
            }
        }, [
            React.createElement('h2', { key: 'error-title' }, '⚠️ 组件渲染错误'),
            React.createElement('p', { key: 'error-message' }, `错误信息: ${error.message}`)
        ]);
    }
};

console.log('MessageManagement component defined');
window.MessageManagement = MessageManagement;
console.log('MessageManagement attached to window object'); 