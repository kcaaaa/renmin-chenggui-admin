// 登录页面组件 - 若依风格
const LoginForm = ({ onLogin }) => {
    const { Form, Input, Button, Card, message, Checkbox } = antd;
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            console.log('尝试登录:', values);
            
            // 使用AuthUtils进行演示登录
            const userData = window.AuthUtils.demoLogin(values.username, values.password);
            
            if (userData) {
                message.success('登录成功！');
                onLogin(userData);
            } else {
                message.error('用户名或密码错误');
            }
        } catch (error) {
            console.error('登录失败:', error);
            message.error('登录失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    return React.createElement('div', {
        style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }
    }, React.createElement('div', {
        style: {
            width: '100%',
            maxWidth: '400px'
        }
    }, [
        // 系统标题
        React.createElement('div', {
            key: 'header',
            style: { 
                textAlign: 'center', 
                marginBottom: '30px',
                color: '#fff'
            }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    color: '#fff',
                    marginBottom: '8px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }
            }, '人民城轨管理系统'),
            React.createElement('p', {
                key: 'subtitle',
                style: { 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '14px',
                    margin: 0
                }
            }, 'People Rail Transit Management System')
        ]),
        
        React.createElement(Card, {
            key: 'login-card',
            style: {
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                border: 'none'
            },
            bodyStyle: { padding: '32px' }
        }, [
            React.createElement('div', {
                key: 'login-header',
                style: {
                    textAlign: 'center',
                    marginBottom: '24px'
                }
            }, React.createElement('h3', {
                style: {
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#262626',
                    margin: 0
                }
            }, '用户登录')),
            
            React.createElement(Form, {
                key: 'form',
                form: form,
                onFinish: handleSubmit,
                layout: 'vertical',
                size: 'large'
            }, [
                React.createElement(Form.Item, {
                    key: 'username',
                    name: 'username',
                    label: '用户名',
                    rules: [{ required: true, message: '请输入用户名' }]
                }, React.createElement(Input, {
                    placeholder: '请输入用户名'
                })),
                
                React.createElement(Form.Item, {
                    key: 'password',
                    name: 'password',
                    label: '密码',
                    rules: [{ required: true, message: '请输入密码' }]
                }, React.createElement(Input.Password, {
                    placeholder: '请输入密码'
                })),
                
                React.createElement(Form.Item, {
                    key: 'remember',
                    name: 'remember',
                    valuePropName: 'checked',
                    style: { marginBottom: '16px' }
                }, React.createElement(Checkbox, null, '记住密码')),
                
                React.createElement(Form.Item, {
                    key: 'submit',
                    style: { marginBottom: 0 }
                }, React.createElement(Button, {
                    type: 'primary',
                    htmlType: 'submit',
                    loading: loading,
                    block: true,
                    style: {
                        height: '40px',
                        fontSize: '14px'
                    }
                }, '登录'))
            ]),
            
            React.createElement('div', {
                key: 'demo-info',
                style: {
                    marginTop: '24px',
                    padding: '16px',
                    background: '#f6f8fa',
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: '#666'
                }
            }, [
                React.createElement('div', {
                    key: 'demo-title',
                    style: { fontWeight: '500', marginBottom: '8px', color: '#1890ff' }
                }, '演示账号'),
                React.createElement('div', { key: 'admin' }, '管理员: admin / admin123'),
                React.createElement('div', { key: 'operator' }, '运营: operator / op123'),
                React.createElement('div', { key: 'reviewer', style: { marginBottom: 0 } }, '审核: reviewer / review123')
            ])
        ])
    ]));
};

// 确保LoginForm在全局可用
window.LoginForm = LoginForm;
window.LoginPage = LoginForm; // 兼容性：同时挂载为LoginPage

console.log('✅ LoginForm/LoginPage组件已加载');
