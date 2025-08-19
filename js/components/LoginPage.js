// 登录页面组件 - 网页端通用风格
const LoginForm = ({ onLogin }) => {
    const { Form, Input, Button, Card, message, Checkbox, Tabs } = antd;
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const [loginType, setLoginType] = React.useState('password'); // 'password' 或 'sms'
    const [countdown, setCountdown] = React.useState(0);

    // 倒计时处理
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // 发送验证码
    const handleSendCode = () => {
        const phone = form.getFieldValue('phone');
        if (!phone) {
            message.error('请先输入手机号');
            return;
        }
        if (!/^1[3-9]\d{9}$/.test(phone)) {
            message.error('请输入正确的手机号');
            return;
        }
        
        setCountdown(60);
        message.success('验证码已发送到您的手机');
    };

    // 账号密码登录
    const handlePasswordLogin = async (values) => {
        try {
            setLoading(true);
            console.log('尝试账号密码登录:', values);
            
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

    // 验证码登录
    const handleSmsLogin = async (values) => {
        try {
            setLoading(true);
            console.log('尝试验证码登录:', values);
            
            // 演示验证码登录（验证码为123456）
            if (values.code === '123456') {
                const userData = {
                    username: values.phone,
                    token: 'sms-demo-token',
                    role: 'user',
                    loginType: 'sms'
                };
                message.success('登录成功！');
                onLogin(userData);
            } else {
                message.error('验证码错误，请输入123456');
            }
        } catch (error) {
            console.error('登录失败:', error);
            message.error('登录失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    // 登录方式切换
    const handleTabChange = (key) => {
        setLoginType(key);
        form.resetFields();
    };

    return React.createElement('div', {
        style: {
            minHeight: '100vh',
            background: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column'
        }
    }, [
        // 顶部导航栏
        React.createElement('div', {
            key: 'top-bar',
            style: {
                height: '60px',
                background: '#fff',
                borderBottom: '1px solid #e8e8e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }
        }, [
            // 左侧Logo
            React.createElement('div', {
                key: 'logo',
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1890ff'
                }
            }, [
                React.createElement('div', {
                    key: 'logo-icon',
                    style: {
                        width: '32px',
                        height: '32px',
                        background: '#1890ff',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginRight: '8px'
                    }
                }, 'C'),
                React.createElement('span', { key: 'logo-text' }, '人民城轨管理系统')
            ]),
            
            // 右侧操作区
            React.createElement('div', {
                key: 'top-actions',
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }
            }, [
                React.createElement('div', {
                    key: 'language',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#666',
                        cursor: 'pointer'
                    }
                }, [
                    React.createElement('span', { key: 'globe' }, '🌐'),
                    React.createElement('span', { key: 'lang-text', style: { marginLeft: '4px' } }, '简体中文')
                ]),
                React.createElement(Button, {
                    key: 'login-btn',
                    type: 'primary',
                    size: 'small',
                    style: { height: '32px' }
                }, '登录')
            ])
        ]),
        
        // 主内容区域
        React.createElement('div', {
            key: 'main-content',
            style: {
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px'
            }
        }, React.createElement('div', {
            style: {
                width: '100%',
                maxWidth: '500px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '40px'
            }
        }, [
            // 登录表单标题
            React.createElement('div', {
                key: 'form-header',
                style: {
                    textAlign: 'center',
                    marginBottom: '32px'
                }
            }, [
                React.createElement('h2', {
                    key: 'title',
                    style: {
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#262626',
                        margin: '0 0 8px 0'
                    }
                }, '用户登录'),
                React.createElement('p', {
                    key: 'subtitle',
                    style: {
                        fontSize: '14px',
                        color: '#8c8c8c',
                        margin: 0
                    }
                }, '请选择登录方式')
            ]),
            
            // 登录方式切换
            React.createElement(Tabs, {
                key: 'login-tabs',
                activeKey: loginType,
                onChange: handleTabChange,
                centered: true,
                style: { marginBottom: '24px' },
                items: [
                    {
                        key: 'password',
                        label: '账号密码登录',
                        children: React.createElement(Form, {
                            form: form,
                            onFinish: handlePasswordLogin,
                            layout: 'vertical',
                            size: 'large'
                        }, [
                            React.createElement(Form.Item, {
                                key: 'username',
                                name: 'username',
                                label: '用户名',
                                rules: [{ required: true, message: '请输入用户名' }]
                            }, React.createElement(Input, {
                                placeholder: '请输入用户名',
                                style: { height: '40px' }
                            })),
                            
                            React.createElement(Form.Item, {
                                key: 'password',
                                name: 'password',
                                label: '密码',
                                rules: [{ required: true, message: '请输入密码' }]
                            }, React.createElement(Input.Password, {
                                placeholder: '请输入密码',
                                style: { height: '40px' }
                            })),
                            
                            React.createElement(Form.Item, {
                                key: 'remember',
                                name: 'remember',
                                valuePropName: 'checked',
                                style: { marginBottom: '24px' }
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
                                    height: '44px',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }
                            }, '登录'))
                        ])
                    },
                    {
                        key: 'sms',
                        label: '验证码登录',
                        children: React.createElement(Form, {
                            form: form,
                            onFinish: handleSmsLogin,
                            layout: 'vertical',
                            size: 'large'
                        }, [
                            React.createElement(Form.Item, {
                                key: 'phone',
                                name: 'phone',
                                label: '手机号',
                                rules: [
                                    { required: true, message: '请输入手机号' },
                                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                                ]
                            }, React.createElement(Input, {
                                placeholder: '请输入手机号',
                                style: { height: '40px' }
                            })),
                            
                            React.createElement(Form.Item, {
                                key: 'code',
                                name: 'code',
                                label: '验证码',
                                rules: [{ required: true, message: '请输入验证码' }]
                            }, React.createElement(Input.Group, {
                                compact: true
                            }, [
                                React.createElement(Input, {
                                    key: 'code-input',
                                    placeholder: '请输入验证码',
                                    style: { height: '40px', flex: 1 }
                                }),
                                React.createElement(Button, {
                                    key: 'send-code',
                                    onClick: handleSendCode,
                                    disabled: countdown > 0,
                                    style: { height: '40px', width: '120px' }
                                }, countdown > 0 ? `${countdown}s` : '发送验证码')
                            ])),
                            
                            React.createElement(Form.Item, {
                                key: 'submit-sms',
                                style: { marginBottom: 0 }
                            }, React.createElement(Button, {
                                type: 'primary',
                                htmlType: 'submit',
                                loading: loading,
                                block: true,
                                style: {
                                    height: '44px',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }
                            }, '登录'))
                        ])
                    }
                ]
            }),
            
            // 演示账号信息
            React.createElement('div', {
                key: 'demo-info',
                style: {
                    marginTop: '32px',
                    padding: '16px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#666',
                    border: '1px solid #e8e8e8'
                }
            }, [
                React.createElement('div', {
                    key: 'demo-title',
                    style: { 
                        fontWeight: '600', 
                        marginBottom: '12px', 
                        color: '#1890ff',
                        fontSize: '14px'
                    }
                }, '演示账号'),
                React.createElement('div', { 
                    key: 'admin',
                    style: { marginBottom: '4px' }
                }, '管理员: admin / admin123'),
                React.createElement('div', { 
                    key: 'operator',
                    style: { marginBottom: '4px' }
                }, '运营: operator / op123'),
                React.createElement('div', { 
                    key: 'reviewer',
                    style: { marginBottom: '8px' }
                }, '审核: reviewer / review123'),
                React.createElement('div', { 
                    key: 'sms-demo',
                    style: { 
                        marginBottom: 0,
                        paddingTop: '8px',
                        borderTop: '1px solid #e8e8e8'
                    }
                }, '验证码登录: 任意手机号 + 验证码123456')
            ])
        ]))
    ]);
};

// 确保LoginForm在全局可用
window.LoginForm = LoginForm;
window.LoginPage = LoginForm; // 兼容性：同时挂载为LoginPage

console.log('✅ LoginForm/LoginPage组件已加载');
