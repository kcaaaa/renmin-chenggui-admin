// 用户档案组件
const UserProfile = () => {
    const { Card, Form, Input, Button, Upload, Avatar, message, Tabs, Switch, Select, DatePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { TabPane } = Tabs;
    
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    
    // 模拟用户信息
    const mockUserInfo = {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        phone: '13800138000',
        realName: '系统管理员',
        avatar: '/images/avatar.png',
        department: '技术部',
        position: '系统管理员',
        joinDate: '2024-01-01',
        lastLogin: '2024-01-15 14:30:00',
        status: 'active',
        bio: '负责系统管理和维护工作',
        notifications: {
            email: true,
            sms: false,
            push: true
        },
        privacy: {
            showEmail: false,
            showPhone: false,
            showProfile: true
        }
    };
    
    React.useEffect(() => {
        loadUserProfile();
    }, []);
    
    const loadUserProfile = () => {
        setLoading(true);
        setTimeout(() => {
            setUserInfo(mockUserInfo);
            form.setFieldsValue(mockUserInfo);
            setLoading(false);
        }, 1000);
    };
    
    const handleSubmit = (values) => {
        setLoading(true);
        console.log('更新用户信息:', values);
        setTimeout(() => {
            message.success('个人信息更新成功');
            setLoading(false);
        }, 1000);
    };
    
    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            message.success('头像上传成功');
        } else if (info.file.status === 'error') {
            message.error('头像上传失败');
        }
    };
    
    const changePassword = () => {
        message.info('密码修改功能');
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '个人资料'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理您的个人信息和账户设置')
        ]),
        
        React.createElement(Card, {
            key: 'profile-card'
        }, React.createElement(Tabs, {
            defaultActiveKey: 'basic'
        }, [
            React.createElement(TabPane, {
                key: 'basic',
                tab: '基本信息'
            }, React.createElement(Form, {
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit,
                style: { maxWidth: 600 }
            }, [
                React.createElement('div', {
                    key: 'avatar-section',
                    style: { textAlign: 'center', marginBottom: 24 }
                }, [
                    React.createElement(Avatar, {
                        key: 'avatar',
                        size: 80,
                        src: userInfo.avatar,
                        style: { marginBottom: 16 }
                    }),
                    React.createElement('div', { key: 'upload' },
                        React.createElement(Upload, {
                            showUploadList: false,
                            onChange: handleAvatarChange
                        }, React.createElement(Button, {}, '更换头像'))
                    )
                ]),
                
                React.createElement(Form.Item, {
                    key: 'username',
                    name: 'username',
                    label: '用户名'
                }, React.createElement(Input, {
                    disabled: true
                })),
                
                React.createElement(Form.Item, {
                    key: 'realName',
                    name: 'realName',
                    label: '真实姓名',
                    rules: [{ required: true, message: '请输入真实姓名' }]
                }, React.createElement(Input, {
                    placeholder: '请输入真实姓名'
                })),
                
                React.createElement(Form.Item, {
                    key: 'email',
                    name: 'email',
                    label: '邮箱',
                    rules: [
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '邮箱格式不正确' }
                    ]
                }, React.createElement(Input, {
                    placeholder: '请输入邮箱'
                })),
                
                React.createElement(Form.Item, {
                    key: 'phone',
                    name: 'phone',
                    label: '手机号',
                    rules: [{ required: true, message: '请输入手机号' }]
                }, React.createElement(Input, {
                    placeholder: '请输入手机号'
                })),
                
                React.createElement(Form.Item, {
                    key: 'department',
                    name: 'department',
                    label: '部门'
                }, React.createElement(Select, {
                    placeholder: '请选择部门'
                }, [
                    React.createElement(Option, { key: 'tech', value: '技术部' }, '技术部'),
                    React.createElement(Option, { key: 'product', value: '产品部' }, '产品部'),
                    React.createElement(Option, { key: 'operation', value: '运营部' }, '运营部'),
                    React.createElement(Option, { key: 'hr', value: '人事部' }, '人事部')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'position',
                    name: 'position',
                    label: '职位'
                }, React.createElement(Input, {
                    placeholder: '请输入职位'
                })),
                
                React.createElement(Form.Item, {
                    key: 'bio',
                    name: 'bio',
                    label: '个人简介'
                }, React.createElement(TextArea, {
                    rows: 4,
                    placeholder: '请输入个人简介'
                })),
                
                React.createElement(Form.Item, {
                    key: 'submit'
                }, [
                    React.createElement(Button, {
                        key: 'save',
                        type: 'primary',
                        htmlType: 'submit',
                        loading: loading,
                        style: { marginRight: 8 }
                    }, '保存'),
                    React.createElement(Button, {
                        key: 'password',
                        onClick: changePassword
                    }, '修改密码')
                ])
            ])),
            
            React.createElement(TabPane, {
                key: 'notification',
                tab: '通知设置'
            }, React.createElement('div', { style: { maxWidth: 600 } }, [
                React.createElement('h3', { key: 'title' }, '通知偏好'),
                React.createElement('div', {
                    key: 'email-notification',
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                }, [
                    React.createElement('span', { key: 'label' }, '邮件通知'),
                    React.createElement(Switch, {
                        key: 'switch',
                        defaultChecked: userInfo.notifications?.email
                    })
                ]),
                React.createElement('div', {
                    key: 'sms-notification',
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                }, [
                    React.createElement('span', { key: 'label' }, '短信通知'),
                    React.createElement(Switch, {
                        key: 'switch',
                        defaultChecked: userInfo.notifications?.sms
                    })
                ]),
                React.createElement('div', {
                    key: 'push-notification',
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                }, [
                    React.createElement('span', { key: 'label' }, '推送通知'),
                    React.createElement(Switch, {
                        key: 'switch',
                        defaultChecked: userInfo.notifications?.push
                    })
                ])
            ])),
            
            React.createElement(TabPane, {
                key: 'privacy',
                tab: '隐私设置'
            }, React.createElement('div', { style: { maxWidth: 600 } }, [
                React.createElement('h3', { key: 'title' }, '隐私偏好'),
                React.createElement('div', {
                    key: 'show-email',
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                }, [
                    React.createElement('span', { key: 'label' }, '公开邮箱'),
                    React.createElement(Switch, {
                        key: 'switch',
                        defaultChecked: userInfo.privacy?.showEmail
                    })
                ]),
                React.createElement('div', {
                    key: 'show-phone',
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                }, [
                    React.createElement('span', { key: 'label' }, '公开手机号'),
                    React.createElement(Switch, {
                        key: 'switch',
                        defaultChecked: userInfo.privacy?.showPhone
                    })
                ]),
                React.createElement('div', {
                    key: 'show-profile',
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
                }, [
                    React.createElement('span', { key: 'label' }, '公开个人资料'),
                    React.createElement(Switch, {
                        key: 'switch',
                        defaultChecked: userInfo.privacy?.showProfile
                    })
                ])
            ])),
            
            React.createElement(TabPane, {
                key: 'account',
                tab: '账户信息'
            }, React.createElement('div', { style: { maxWidth: 600 } }, [
                React.createElement('h3', { key: 'title' }, '账户详情'),
                React.createElement('div', {
                    key: 'info',
                    style: { lineHeight: '2' }
                }, [
                    React.createElement('p', { key: 'id' }, React.createElement('strong', {}, '用户ID：'), userInfo.id),
                    React.createElement('p', { key: 'join' }, React.createElement('strong', {}, '加入时间：'), userInfo.joinDate),
                    React.createElement('p', { key: 'last' }, React.createElement('strong', {}, '最后登录：'), userInfo.lastLogin),
                    React.createElement('p', { key: 'status' }, React.createElement('strong', {}, '账户状态：'), 
                        React.createElement('span', { style: { color: '#52c41a' } }, '正常')
                    )
                ])
            ]))
        ]))
    ]);
};

window.UserProfile = UserProfile; 