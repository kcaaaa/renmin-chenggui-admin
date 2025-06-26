// 个人中心页面
const PersonalCenter = () => {
    const { Card, Row, Col, Avatar, Descriptions, Button, Space, Tabs, Form, Input, Select, DatePicker, Upload, Switch, Tag, Timeline, Table, Modal, message, Alert, Divider, Statistic, Progress } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [activeTab, setActiveTab] = React.useState('info');
    const [editMode, setEditMode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    const [securityInfo, setSecurityInfo] = React.useState({});
    const [operationHistory, setOperationHistory] = React.useState([]);
    const [loginHistory, setLoginHistory] = React.useState([]);
    
    const [infoForm] = Form.useForm();
    const [passwordForm] = Form.useForm();

    React.useEffect(() => {
        loadUserData();
    }, []);

    // 加载用户数据
    const loadUserData = () => {
        setLoading(true);
        
        // 模拟从AuthUtils获取用户信息
        const currentUser = window.AuthUtils?.getCurrentUser() || {
            id: 'user_001',
            username: 'admin_system',
            name: '张**',
            email: 'admin@example.com',
            phone: '138****8888',
            department: '系统管理部',
            role: '系统管理员',
            avatar: null,
            createTime: '2023-05-10 14:20:00',
            lastLogin: '2024-01-15 09:30:25',
            loginCount: 245,
            status: 'active'
        };

        setUserInfo(currentUser);
        
        // 设置安全信息
        setSecurityInfo({
            twoFactorEnabled: true,
            lastPasswordChange: '2023-12-15',
            passwordStrength: 'strong',
            securityQuestions: 2,
            trustedDevices: 3,
            recentSecurityEvents: []
        });

        // 设置操作历史
        setOperationHistory([
            {
                id: 'op_001',
                action: '批量导入用户',
                details: '成功导入25个会展用户账号',
                time: '2024-01-15 14:30:25',
                status: 'success',
                ip: '192.168.1.100'
            },
            {
                id: 'op_002',
                action: '修改用户权限',
                details: '为协会领导添加内容发布权限',
                time: '2024-01-15 11:20:45',
                status: 'success',
                ip: '192.168.1.100'
            },
            {
                id: 'op_003',
                action: '查看审核详情',
                details: '查看图文内容审核详情',
                time: '2024-01-15 10:15:20',
                status: 'success',
                ip: '192.168.1.100'
            }
        ]);

        // 设置登录历史
        setLoginHistory([
            {
                id: 'login_001',
                time: '2024-01-15 09:30:25',
                ip: '192.168.1.100',
                location: '北京市朝阳区',
                device: 'Chrome 120.0 / Windows 10',
                status: 'success'
            },
            {
                id: 'login_002',
                time: '2024-01-14 18:45:12',
                ip: '192.168.1.100',
                location: '北京市朝阳区',
                device: 'Chrome 120.0 / Windows 10',
                status: 'success'
            },
            {
                id: 'login_003',
                time: '2024-01-14 08:30:08',
                ip: '192.168.1.98',
                location: '北京市朝阳区',
                device: 'Edge 120.0 / Windows 10',
                status: 'success'
            }
        ]);
        
        // 设置表单初始值
        infoForm.setFieldsValue(currentUser);
        
        setLoading(false);
    };

    // 保存个人信息
    const handleSaveInfo = (values) => {
        setLoading(true);
        
        setTimeout(() => {
            // 更新用户信息
            const updatedUser = { ...userInfo, ...values };
            setUserInfo(updatedUser);
            
            // 更新AuthUtils中的用户信息
            if (window.AuthUtils) {
                window.AuthUtils.updateCurrentUser(updatedUser);
            }
            
            setEditMode(false);
            setLoading(false);
            message.success('个人信息保存成功！');
        }, 1000);
    };

    // 修改密码
    const handleChangePassword = (values) => {
        setLoading(true);
        
        setTimeout(() => {
            setChangePasswordVisible(false);
            passwordForm.resetFields();
            setLoading(false);
            message.success('密码修改成功！');
            
            // 更新安全信息
            setSecurityInfo(prev => ({
                ...prev,
                lastPasswordChange: new Date().toISOString().slice(0, 10)
            }));
        }, 1500);
    };

    // 渲染用户基本信息
    const renderUserInfo = () => {
        return React.createElement('div', {}, [
            // 用户头像和基本信息卡片
            React.createElement(Card, {
                key: 'profile-card',
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Row, {
                    key: 'profile-row',
                    align: 'middle',
                    gutter: [24, 24]
                }, [
                    React.createElement(Col, { span: 4 }, [
                        React.createElement('div', {
                            style: { textAlign: 'center' }
                        }, [
                            React.createElement(Avatar, {
                                key: 'avatar',
                                size: 80,
                                style: { 
                                    backgroundColor: '#1890ff',
                                    fontSize: '32px',
                                    marginBottom: '16px'
                                }
                            }, userInfo.name?.charAt(0) || 'U'),
                            React.createElement(Upload, {
                                key: 'upload',
                                showUploadList: false,
                                beforeUpload: () => false,
                                onChange: (info) => {
                                    message.success('头像上传成功');
                                }
                            }, [
                                React.createElement(Button, {
                                    size: 'small',
                                    type: 'link'
                                }, '更换头像')
                            ])
                        ])
                    ]),
                    React.createElement(Col, { span: 16 }, [
                        React.createElement(Descriptions, {
                            title: React.createElement('div', {
                                style: { 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }, [
                                React.createElement('span', { key: 'title' }, '个人信息'),
                                React.createElement(Button, {
                                    key: 'edit',
                                    type: editMode ? 'default' : 'primary',
                                    size: 'small',
                                    onClick: () => {
                                        if (editMode) {
                                            infoForm.resetFields();
                                        }
                                        setEditMode(!editMode);
                                    }
                                }, editMode ? '取消' : '编辑')
                            ]),
                            column: 2,
                            bordered: true,
                            items: [
                                { 
                                    label: '用户名', 
                                    children: userInfo.username,
                                    span: 1
                                },
                                { 
                                    label: '真实姓名', 
                                    children: userInfo.name,
                                    span: 1
                                },
                                { 
                                    label: '邮箱', 
                                    children: userInfo.email,
                                    span: 1
                                },
                                { 
                                    label: '手机号', 
                                    children: userInfo.phone,
                                    span: 1
                                },
                                { 
                                    label: '部门', 
                                    children: userInfo.department,
                                    span: 1
                                },
                                { 
                                    label: '角色', 
                                    children: React.createElement(Tag, { color: 'blue' }, userInfo.role),
                                    span: 1
                                },
                                { 
                                    label: '账户状态', 
                                    children: React.createElement(Tag, { 
                                        color: userInfo.status === 'active' ? 'green' : 'red' 
                                    }, userInfo.status === 'active' ? '正常' : '停用'),
                                    span: 1
                                },
                                { 
                                    label: '注册时间', 
                                    children: userInfo.createTime,
                                    span: 1
                                }
                            ]
                        })
                    ]),
                    React.createElement(Col, { span: 4 }, [
                        React.createElement('div', {
                            style: { textAlign: 'center' }
                        }, [
                            React.createElement(Statistic, {
                                key: 'login-count',
                                title: '累计登录',
                                value: userInfo.loginCount,
                                suffix: '次',
                                valueStyle: { color: '#1890ff' }
                            }),
                            React.createElement('div', {
                                key: 'last-login',
                                style: { 
                                    marginTop: '16px',
                                    fontSize: '12px',
                                    color: '#666'
                                }
                            }, `最后登录: ${userInfo.lastLogin}`)
                        ])
                    ])
                ])
            ]),

            // 编辑表单
            editMode && React.createElement(Card, {
                key: 'edit-form',
                title: '编辑个人信息',
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Form, {
                    form: infoForm,
                    layout: 'vertical',
                    onFinish: handleSaveInfo
                }, [
                    React.createElement(Row, { gutter: [16, 16] }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '真实姓名',
                                name: 'name',
                                rules: [{ required: true, message: '请输入真实姓名' }]
                            }, React.createElement(Input, { placeholder: '请输入真实姓名' }))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '邮箱',
                                name: 'email',
                                rules: [
                                    { required: true, message: '请输入邮箱' },
                                    { type: 'email', message: '请输入有效的邮箱地址' }
                                ]
                            }, React.createElement(Input, { placeholder: '请输入邮箱' }))
                        ])
                    ]),
                    React.createElement(Row, { gutter: [16, 16] }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '手机号',
                                name: 'phone',
                                rules: [{ required: true, message: '请输入手机号' }]
                            }, React.createElement(Input, { placeholder: '请输入手机号' }))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '部门',
                                name: 'department'
                            }, React.createElement(Input, { placeholder: '请输入部门' }))
                        ])
                    ]),
                    React.createElement(Form.Item, {
                        style: { textAlign: 'right', marginBottom: 0 }
                    }, [
                        React.createElement(Space, {}, [
                            React.createElement(Button, {
                                onClick: () => {
                                    setEditMode(false);
                                    infoForm.resetFields();
                                }
                            }, '取消'),
                            React.createElement(Button, {
                                type: 'primary',
                                htmlType: 'submit',
                                loading: loading
                            }, '保存')
                        ])
                    ])
                ])
            ])
        ]);
    };

    // 渲染安全设置
    const renderSecuritySettings = () => {
        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'security-alert',
                message: '账户安全提醒',
                description: '为了您的账户安全，建议定期更换密码并开启两步验证',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            // 密码安全
            React.createElement(Card, {
                key: 'password-card',
                title: '密码安全',
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Row, { gutter: [24, 24] }, [
                    React.createElement(Col, { span: 16 }, [
                        React.createElement(Descriptions, {
                            column: 1,
                            items: [
                                {
                                    label: '密码强度',
                                    children: React.createElement('div', {}, [
                                        React.createElement(Progress, {
                                            percent: securityInfo.passwordStrength === 'strong' ? 100 : 
                                                    securityInfo.passwordStrength === 'medium' ? 60 : 30,
                                            strokeColor: securityInfo.passwordStrength === 'strong' ? '#52c41a' : 
                                                        securityInfo.passwordStrength === 'medium' ? '#faad14' : '#ff4d4f',
                                            size: 'small',
                                            style: { width: '200px', marginRight: '12px' }
                                        }),
                                        React.createElement(Tag, {
                                            color: securityInfo.passwordStrength === 'strong' ? 'green' : 
                                                  securityInfo.passwordStrength === 'medium' ? 'orange' : 'red'
                                        }, securityInfo.passwordStrength === 'strong' ? '强' : 
                                            securityInfo.passwordStrength === 'medium' ? '中' : '弱')
                                    ])
                                },
                                {
                                    label: '上次修改时间',
                                    children: securityInfo.lastPasswordChange
                                }
                            ]
                        })
                    ]),
                    React.createElement(Col, { span: 8 }, [
                        React.createElement('div', {
                            style: { textAlign: 'right' }
                        }, [
                            React.createElement(Button, {
                                type: 'primary',
                                onClick: () => setChangePasswordVisible(true)
                            }, '修改密码')
                        ])
                    ])
                ])
            ]),

            // 两步验证
            React.createElement(Card, {
                key: 'two-factor-card',
                title: '两步验证',
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Row, { align: 'middle' }, [
                    React.createElement(Col, { span: 16 }, [
                        React.createElement('div', {}, [
                            React.createElement('div', {
                                style: { marginBottom: '8px', fontWeight: '500' }
                            }, '短信验证码'),
                            React.createElement('div', {
                                style: { color: '#666', fontSize: '14px' }
                            }, '登录时需要输入手机验证码进行二次验证')
                        ])
                    ]),
                    React.createElement(Col, { span: 8 }, [
                        React.createElement('div', {
                            style: { textAlign: 'right' }
                        }, [
                            React.createElement(Switch, {
                                checked: securityInfo.twoFactorEnabled,
                                onChange: (checked) => {
                                    setSecurityInfo(prev => ({
                                        ...prev,
                                        twoFactorEnabled: checked
                                    }));
                                    message.success(checked ? '两步验证已开启' : '两步验证已关闭');
                                }
                            }),
                            React.createElement('span', {
                                style: { marginLeft: '8px' }
                            }, securityInfo.twoFactorEnabled ? '已开启' : '已关闭')
                        ])
                    ])
                ])
            ]),

            // 安全信息统计
            React.createElement(Card, {
                key: 'security-stats',
                title: '安全信息',
            }, [
                React.createElement(Row, { gutter: [24, 24] }, [
                    React.createElement(Col, { span: 8 }, [
                        React.createElement(Statistic, {
                            title: '安全问题设置',
                            value: securityInfo.securityQuestions,
                            suffix: '个',
                            valueStyle: { color: '#52c41a' }
                        })
                    ]),
                    React.createElement(Col, { span: 8 }, [
                        React.createElement(Statistic, {
                            title: '受信任设备',
                            value: securityInfo.trustedDevices,
                            suffix: '台',
                            valueStyle: { color: '#1890ff' }
                        })
                    ]),
                    React.createElement(Col, { span: 8 }, [
                        React.createElement(Statistic, {
                            title: '安全事件',
                            value: securityInfo.recentSecurityEvents?.length || 0,
                            suffix: '次',
                            valueStyle: { color: '#faad14' }
                        })
                    ])
                ])
            ])
        ]);
    };

    // 渲染操作历史
    const renderOperationHistory = () => {
        const columns = [
            {
                title: '操作时间',
                dataIndex: 'time',
                width: 160,
                sorter: true
            },
            {
                title: '操作类型',
                dataIndex: 'action',
                width: 150
            },
            {
                title: '操作详情',
                dataIndex: 'details',
                ellipsis: true
            },
            {
                title: 'IP地址',
                dataIndex: 'ip',
                width: 140
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => React.createElement(Tag, {
                    color: status === 'success' ? 'green' : 'red'
                }, status === 'success' ? '成功' : '失败')
            }
        ];

        return React.createElement(Card, {
            title: '操作历史',
            extra: React.createElement(Button, {
                size: 'small',
                onClick: () => message.info('导出操作历史')
            }, '导出')
        }, [
            React.createElement(Table, {
                columns: columns,
                dataSource: operationHistory.map(item => ({ ...item, key: item.id })),
                loading: loading,
                pagination: {
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
        ]);
    };

    // 渲染登录历史
    const renderLoginHistory = () => {
        const columns = [
            {
                title: '登录时间',
                dataIndex: 'time',
                width: 160,
                sorter: true
            },
            {
                title: 'IP地址',
                dataIndex: 'ip',
                width: 140
            },
            {
                title: '登录位置',
                dataIndex: 'location',
                width: 140
            },
            {
                title: '设备信息',
                dataIndex: 'device',
                ellipsis: true
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => React.createElement(Tag, {
                    color: status === 'success' ? 'green' : 'red'
                }, status === 'success' ? '成功' : '失败')
            }
        ];

        return React.createElement(Card, {
            title: '登录历史',
            extra: React.createElement(Button, {
                size: 'small',
                onClick: () => message.info('导出登录历史')
            }, '导出')
        }, [
            React.createElement(Table, {
                columns: columns,
                dataSource: loginHistory.map(item => ({ ...item, key: item.id })),
                loading: loading,
                pagination: {
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
        ]);
    };

    // Tab配置
    const tabItems = [
        {
            key: 'info',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '👤 '),
                '个人信息'
            ]),
            children: renderUserInfo()
        },
        {
            key: 'security',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '🔒 '),
                '安全设置'
            ]),
            children: renderSecuritySettings()
        },
        {
            key: 'operations',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '📋 '),
                '操作历史'
            ]),
            children: renderOperationHistory()
        },
        {
            key: 'logins',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '🔐 '),
                '登录历史'
            ]),
            children: renderLoginHistory()
        }
    ];

    return React.createElement('div', { className: 'personal-center-page' }, [
        React.createElement('div', {
            key: 'header',
            style: {
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('h2', {
                key: 'title',
                style: { margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }
            }, '👤 个人中心'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'refresh',
                    onClick: () => loadUserData()
                }, '刷新数据'),
                React.createElement(Button, {
                    key: 'help',
                    type: 'default',
                    onClick: () => message.info('个人中心帮助文档')
                }, '使用帮助')
            ])
        ]),

        React.createElement(Tabs, {
            key: 'main-tabs',
            activeKey: activeTab,
            onChange: setActiveTab,
            items: tabItems
        }),

        // 修改密码模态框
        React.createElement(Modal, {
            key: 'password-modal',
            title: '修改密码',
            open: changePasswordVisible,
            onCancel: () => {
                setChangePasswordVisible(false);
                passwordForm.resetFields();
            },
            footer: null,
            width: 500
        }, [
            React.createElement(Form, {
                form: passwordForm,
                layout: 'vertical',
                onFinish: handleChangePassword
            }, [
                React.createElement(Form.Item, {
                    label: '当前密码',
                    name: 'currentPassword',
                    rules: [{ required: true, message: '请输入当前密码' }]
                }, React.createElement(Input.Password, { placeholder: '请输入当前密码' })),
                
                React.createElement(Form.Item, {
                    label: '新密码',
                    name: 'newPassword',
                    rules: [
                        { required: true, message: '请输入新密码' },
                        { min: 8, message: '密码长度至少8位' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字' }
                    ]
                }, React.createElement(Input.Password, { placeholder: '请输入新密码' })),
                
                React.createElement(Form.Item, {
                    label: '确认新密码',
                    name: 'confirmPassword',
                    dependencies: ['newPassword'],
                    rules: [
                        { required: true, message: '请确认新密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'));
                            }
                        })
                    ]
                }, React.createElement(Input.Password, { placeholder: '请再次输入新密码' })),
                
                React.createElement(Form.Item, {
                    style: { textAlign: 'right', marginBottom: 0, marginTop: '24px' }
                }, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            onClick: () => {
                                setChangePasswordVisible(false);
                                passwordForm.resetFields();
                            }
                        }, '取消'),
                        React.createElement(Button, {
                            type: 'primary',
                            htmlType: 'submit',
                            loading: loading
                        }, '确认修改')
                    ])
                ])
            ])
        ])
    ]);
};

window.PersonalCenter = PersonalCenter; 