// 登录页面组件
const LoginPage = ({ onLogin }) => {
    const { Form, Input, Button, Card, message, Space } = antd;
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            // 模拟登录验证
            const { username, password } = values;
            
            // 多种权限类型的演示账号
            const demoAccounts = {
                // 超级管理员
                'admin': {
                    password: 'admin123',
                    userData: {
                        id: 1,
                        name: '超级管理员',
                        username: 'admin',
                        role: 'super_admin',
                        roleLabel: '超级管理员',
                        avatar: null,
                        permissions: ['*'], // 全部权限
                        department: '系统管理部',
                        loginTime: new Date().toISOString()
                    }
                },
                // 协会用户
                'association': {
                    password: 'assoc123',
                    userData: {
                        id: 2,
                        name: '协会管理员',
                        username: 'association',
                        role: 'association_admin',
                        roleLabel: '协会管理员',
                        avatar: null,
                        permissions: ['content', 'review', 'exhibition'],
                        department: '中国城市轨道交通协会',
                        loginTime: new Date().toISOString()
                    }
                },
                // 展商用户
                'exhibitor': {
                    password: 'exhib123',
                    userData: {
                        id: 3,
                        name: '展商代表',
                        username: 'exhibitor',
                        role: 'exhibitor',
                        roleLabel: '展商用户',
                        avatar: null,
                        permissions: ['exhibitor_center', 'product_info', 'business_matching'],
                        department: '中车集团',
                        loginTime: new Date().toISOString()
                    }
                },
                // 运营管理员
                'operator': {
                    password: 'oper123',
                    userData: {
                        id: 4,
                        name: '运营管理员',
                        username: 'operator',
                        role: 'operation_admin',
                        roleLabel: '运营管理员',
                        avatar: null,
                        permissions: ['operation', 'user_analysis', 'data_management'],
                        department: '运营管理部',
                        loginTime: new Date().toISOString()
                    }
                },
                // 普通用户
                'user': {
                    password: 'user123',
                    userData: {
                        id: 5,
                        name: '普通用户',
                        username: 'user',
                        role: 'normal_user',
                        roleLabel: '普通用户',
                        avatar: null,
                        permissions: ['content_publish', 'profile'],
                        department: '注册用户',
                        loginTime: new Date().toISOString()
                    }
                },
                // 审核员
                'reviewer': {
                    password: 'review123',
                    userData: {
                        id: 6,
                        name: '内容审核员',
                        username: 'reviewer',
                        role: 'reviewer',
                        roleLabel: '审核员',
                        avatar: null,
                        permissions: ['review', 'audit_flow', 'complaint'],
                        department: '内容审核部',
                        loginTime: new Date().toISOString()
                    }
                }
            };
            
            const account = demoAccounts[username];
            if (account && account.password === password) {
                // 模拟API调用延迟
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 保存登录状态到localStorage
                localStorage.setItem('userToken', `${username}_token_` + Date.now());
                localStorage.setItem('userData', JSON.stringify(account.userData));
                
                message.success(`欢迎回来，${account.userData.roleLabel}！`);
                onLogin && onLogin(account.userData);
            } else {
                message.error('用户名或密码错误！');
            }
        } catch (error) {
            console.error('登录失败:', error);
            message.error('登录失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (values) => {
        handleLogin(values);
    };

    // 键盘快捷键支持
    React.useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                form.submit();
            }
        };
        
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [form]);

    return React.createElement('div', {
        style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }
    }, [
        React.createElement('div', {
            key: 'login-container',
            style: {
                width: '100%',
                maxWidth: '400px'
            }
        }, [
            // Logo和标题
            React.createElement('div', {
                key: 'header',
                style: {
                    textAlign: 'center',
                    marginBottom: '32px'
                }
            }, [
                React.createElement('div', {
                    key: 'logo',
                    style: {
                        fontSize: '48px',
                        marginBottom: '16px'
                    }
                }, '🚇'),
                React.createElement('h1', {
                    key: 'title',
                    style: {
                        color: 'white',
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }
                }, '人民城轨2.0'),
                React.createElement('p', {
                    key: 'subtitle',
                    style: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: '8px 0 0 0',
                        fontSize: '14px'
                    }
                }, '运营管理后台')
            ]),

            // 登录表单
            React.createElement(Card, {
                key: 'form-card',
                style: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                },
                bodyStyle: {
                    padding: '32px'
                }
            }, [
                React.createElement('div', {
                    key: 'form-header',
                    style: {
                        textAlign: 'center',
                        marginBottom: '24px'
                    }
                }, [
                    React.createElement('h2', {
                        key: 'form-title',
                        style: {
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1e293b'
                        }
                    }, '系统登录'),
                    React.createElement('p', {
                        key: 'form-desc',
                        style: {
                            margin: '8px 0 0 0',
                            color: '#64748b',
                            fontSize: '14px'
                        }
                    }, '请输入您的登录凭据')
                ]),

                React.createElement(Form, {
                    key: 'login-form',
                    form: form,
                    name: 'login',
                    layout: 'vertical',
                    onFinish: handleFormSubmit,
                    autoComplete: 'off',
                    size: 'large'
                }, [
                    React.createElement(Form.Item, {
                        key: 'username',
                        name: 'username',
                        label: '用户名',
                        rules: [
                            { required: true, message: '请输入用户名！' },
                            { min: 3, message: '用户名至少3个字符！' }
                        ]
                    }, React.createElement(Input, {
                        prefix: '👤',
                        placeholder: '请输入用户名',
                        autoComplete: 'username'
                    })),

                    React.createElement(Form.Item, {
                        key: 'password',
                        name: 'password',
                        label: '密码',
                        rules: [
                            { required: true, message: '请输入密码！' },
                            { min: 6, message: '密码至少6个字符！' }
                        ]
                    }, React.createElement(Input.Password, {
                        prefix: '🔒',
                        placeholder: '请输入密码',
                        autoComplete: 'current-password'
                    })),

                    React.createElement(Form.Item, {
                        key: 'submit',
                        style: { marginBottom: '16px' }
                    }, React.createElement(Button, {
                        type: 'primary',
                        htmlType: 'submit',
                        loading: loading,
                        block: true,
                        style: {
                            height: '44px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }
                    }, loading ? '登录中...' : '登录')),

                    React.createElement('div', {
                        key: 'demo-info',
                        style: {
                            background: '#f8fafc',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'demo-title',
                            style: {
                                fontSize: '12px',
                                color: '#64748b',
                                marginBottom: '12px',
                                fontWeight: 'bold'
                            }
                        }, '演示账号信息：'),
                        React.createElement('div', {
                            key: 'demo-content',
                            style: {
                                fontSize: '11px',
                                color: '#475569',
                                lineHeight: '1.4'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'admin-info',
                                style: { marginBottom: '6px' }
                            }, [
                                React.createElement('strong', { key: 'admin-label' }, '超级管理员：'),
                                React.createElement('span', { key: 'admin-cred' }, 'admin / admin123')
                            ]),
                            React.createElement('div', {
                                key: 'association-info',
                                style: { marginBottom: '6px' }
                            }, [
                                React.createElement('strong', { key: 'association-label' }, '协会管理员：'),
                                React.createElement('span', { key: 'association-cred' }, 'association / assoc123')
                            ]),
                            React.createElement('div', {
                                key: 'exhibitor-info',
                                style: { marginBottom: '6px' }
                            }, [
                                React.createElement('strong', { key: 'exhibitor-label' }, '展商用户：'),
                                React.createElement('span', { key: 'exhibitor-cred' }, 'exhibitor / exhib123')
                            ]),
                            React.createElement('div', {
                                key: 'operator-info',
                                style: { marginBottom: '6px' }
                            }, [
                                React.createElement('strong', { key: 'operator-label' }, '运营管理员：'),
                                React.createElement('span', { key: 'operator-cred' }, 'operator / oper123')
                            ]),
                            React.createElement('div', {
                                key: 'reviewer-info',
                                style: { marginBottom: '6px' }
                            }, [
                                React.createElement('strong', { key: 'reviewer-label' }, '审核员：'),
                                React.createElement('span', { key: 'reviewer-cred' }, 'reviewer / review123')
                            ]),
                            React.createElement('div', {
                                key: 'user-info'
                            }, [
                                React.createElement('strong', { key: 'user-label' }, '普通用户：'),
                                React.createElement('span', { key: 'user-cred' }, 'user / user123')
                            ])
                        ])
                    ])
                ])
            ]),

            // 版权信息
            React.createElement('div', {
                key: 'footer',
                style: {
                    textAlign: 'center',
                    marginTop: '24px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '12px'
                }
            }, [
                React.createElement('p', {
                    key: 'copyright',
                    style: { margin: 0 }
                }, '© 2024 人民城轨2.0 运营管理后台'),
                React.createElement('p', {
                    key: 'version',
                    style: { margin: '4px 0 0 0' }
                }, 'Version 2.0.0')
            ])
        ])
    ]);
};

window.LoginPage = LoginPage; 