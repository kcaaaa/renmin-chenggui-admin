// 账户设置页面
const AccountSettings = () => {
    const { Card, Row, Col, Switch, Select, Form, Button, Space, message, Divider, Alert, Slider, Typography } = antd;
    const { Option } = Select;
    const { Title } = Typography;
    
    const [loading, setLoading] = React.useState(false);
    const [settings, setSettings] = React.useState({
        theme: 'light',
        language: 'zh-CN',
        autoSave: true,
        notifications: {
            email: true,
            browser: true,
            mobile: false,
            system: true,
            security: true
        },
        privacy: {
            profileVisibility: 'private',
            activityLog: true,
            dataSharing: false
        },
        performance: {
            animationEnabled: true,
            autoRefresh: true,
            refreshInterval: 30,
            cacheEnabled: true
        }
    });

    const [form] = Form.useForm();

    React.useEffect(() => {
        loadSettings();
    }, []);

    // 加载设置
    const loadSettings = () => {
        setLoading(true);
        
        // 从LocalStorage或AuthUtils加载用户设置
        try {
            const savedSettings = localStorage.getItem('userSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                setSettings(prev => ({ ...prev, ...parsed }));
            }
        } catch (error) {
            console.error('加载设置失败:', error);
        }
        
        setLoading(false);
    };

    // 保存设置
    const saveSettings = (newSettings) => {
        setLoading(true);
        
        setTimeout(() => {
            setSettings(newSettings);
            
            // 保存到LocalStorage
            try {
                localStorage.setItem('userSettings', JSON.stringify(newSettings));
                message.success('设置保存成功！');
            } catch (error) {
                console.error('保存设置失败:', error);
                message.error('设置保存失败');
            }
            
            setLoading(false);
        }, 500);
    };

    // 更新单个设置项
    const updateSetting = (path, value) => {
        const newSettings = { ...settings };
        const keys = path.split('.');
        let current = newSettings;
        
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        saveSettings(newSettings);
    };

    // 重置所有设置
    const resetSettings = () => {
        const defaultSettings = {
            theme: 'light',
            language: 'zh-CN',
            autoSave: true,
            notifications: {
                email: true,
                browser: true,
                mobile: false,
                system: true,
                security: true
            },
            privacy: {
                profileVisibility: 'private',
                activityLog: true,
                dataSharing: false
            },
            performance: {
                animationEnabled: true,
                autoRefresh: true,
                refreshInterval: 30,
                cacheEnabled: true
            }
        };
        
        saveSettings(defaultSettings);
        message.info('设置已重置为默认值');
    };

    return React.createElement('div', { className: 'account-settings-page' }, [
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
            }, '⚙️ 账户设置'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'reset',
                    onClick: resetSettings
                }, '重置默认'),
                React.createElement(Button, {
                    key: 'help',
                    type: 'default',
                    onClick: () => message.info('账户设置帮助文档')
                }, '使用帮助')
            ])
        ]),

        // 基本设置
        React.createElement(Card, {
            key: 'basic-settings',
            title: '🎨 界面设置',
            style: { marginBottom: '24px' }
        }, [
            React.createElement(Row, { gutter: [24, 24] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: { marginBottom: '16px' }
                    }, [
                        React.createElement('div', {
                            style: { marginBottom: '8px', fontWeight: '500' }
                        }, '主题模式'),
                        React.createElement(Select, {
                            value: settings.theme,
                            style: { width: '100%' },
                            onChange: (value) => updateSetting('theme', value)
                        }, [
                            React.createElement(Option, { value: 'light' }, '🌞 浅色主题'),
                            React.createElement(Option, { value: 'dark' }, '🌙 深色主题'),
                            React.createElement(Option, { value: 'auto' }, '🔄 跟随系统')
                        ])
                    ])
                ]),
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: { marginBottom: '16px' }
                    }, [
                        React.createElement('div', {
                            style: { marginBottom: '8px', fontWeight: '500' }
                        }, '语言设置'),
                        React.createElement(Select, {
                            value: settings.language,
                            style: { width: '100%' },
                            onChange: (value) => updateSetting('language', value)
                        }, [
                            React.createElement(Option, { value: 'zh-CN' }, '🇨🇳 简体中文'),
                            React.createElement(Option, { value: 'en-US' }, '🇺🇸 English'),
                            React.createElement(Option, { value: 'ja-JP' }, '🇯🇵 日本語')
                        ])
                    ])
                ])
            ]),
            React.createElement(Row, { gutter: [24, 24] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    }, [
                        React.createElement('span', {
                            style: { fontWeight: '500' }
                        }, '自动保存'),
                        React.createElement(Switch, {
                            checked: settings.autoSave,
                            onChange: (checked) => updateSetting('autoSave', checked)
                        })
                    ])
                ])
            ])
        ]),

        // 通知设置
        React.createElement(Card, {
            key: 'notification-settings',
            title: '🔔 通知设置',
            style: { marginBottom: '24px' }
        }, [
            React.createElement(Alert, {
                message: '通知设置说明',
                description: '您可以选择接收哪些类型的通知，以及通过哪些方式接收通知',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '16px' }
            }),
            React.createElement(Row, { gutter: [24, 16] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }
                    }, [
                        React.createElement('span', {}, '📧 邮件通知'),
                        React.createElement(Switch, {
                            checked: settings.notifications.email,
                            onChange: (checked) => updateSetting('notifications.email', checked)
                        })
                    ])
                ]),
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }
                    }, [
                        React.createElement('span', {}, '🌐 浏览器通知'),
                        React.createElement(Switch, {
                            checked: settings.notifications.browser,
                            onChange: (checked) => updateSetting('notifications.browser', checked)
                        })
                    ])
                ])
            ]),
            React.createElement(Row, { gutter: [24, 16] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }
                    }, [
                        React.createElement('span', {}, '📱 手机推送'),
                        React.createElement(Switch, {
                            checked: settings.notifications.mobile,
                            onChange: (checked) => updateSetting('notifications.mobile', checked)
                        })
                    ])
                ]),
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }
                    }, [
                        React.createElement('span', {}, '🔔 系统通知'),
                        React.createElement(Switch, {
                            checked: settings.notifications.system,
                            onChange: (checked) => updateSetting('notifications.system', checked)
                        })
                    ])
                ])
            ]),
            React.createElement(Row, { gutter: [24, 16] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }
                    }, [
                        React.createElement('span', {}, '🛡️ 安全提醒'),
                        React.createElement(Switch, {
                            checked: settings.notifications.security,
                            onChange: (checked) => updateSetting('notifications.security', checked)
                        })
                    ])
                ])
            ])
        ]),

        // 隐私设置
        React.createElement(Card, {
            key: 'privacy-settings',
            title: '🔒 隐私设置',
            style: { marginBottom: '24px' }
        }, [
            React.createElement(Row, { gutter: [24, 24] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: { marginBottom: '16px' }
                    }, [
                        React.createElement('div', {
                            style: { marginBottom: '8px', fontWeight: '500' }
                        }, '个人资料可见性'),
                        React.createElement(Select, {
                            value: settings.privacy.profileVisibility,
                            style: { width: '100%' },
                            onChange: (value) => updateSetting('privacy.profileVisibility', value)
                        }, [
                            React.createElement(Option, { value: 'public' }, '🌐 公开'),
                            React.createElement(Option, { value: 'private' }, '🔒 私密'),
                            React.createElement(Option, { value: 'friends' }, '👥 仅好友')
                        ])
                    ])
                ]),
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '8px'
                        }
                    }, [
                        React.createElement('span', {
                            style: { fontWeight: '500' }
                        }, '记录活动日志'),
                        React.createElement(Switch, {
                            checked: settings.privacy.activityLog,
                            onChange: (checked) => updateSetting('privacy.activityLog', checked)
                        })
                    ])
                ])
            ]),
            React.createElement(Row, { gutter: [24, 24] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    }, [
                        React.createElement('span', {
                            style: { fontWeight: '500' }
                        }, '数据共享'),
                        React.createElement(Switch, {
                            checked: settings.privacy.dataSharing,
                            onChange: (checked) => updateSetting('privacy.dataSharing', checked)
                        })
                    ])
                ])
            ])
        ]),

        // 性能设置
        React.createElement(Card, {
            key: 'performance-settings',
            title: '⚡ 性能设置'
        }, [
            React.createElement(Row, { gutter: [24, 24] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                        }
                    }, [
                        React.createElement('span', {
                            style: { fontWeight: '500' }
                        }, '启用动画效果'),
                        React.createElement(Switch, {
                            checked: settings.performance.animationEnabled,
                            onChange: (checked) => updateSetting('performance.animationEnabled', checked)
                        })
                    ])
                ]),
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                        }
                    }, [
                        React.createElement('span', {
                            style: { fontWeight: '500' }
                        }, '自动刷新数据'),
                        React.createElement(Switch, {
                            checked: settings.performance.autoRefresh,
                            onChange: (checked) => updateSetting('performance.autoRefresh', checked)
                        })
                    ])
                ])
            ]),
            React.createElement(Row, { gutter: [24, 24] }, [
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: { marginBottom: '16px' }
                    }, [
                        React.createElement('div', {
                            style: { marginBottom: '8px', fontWeight: '500' }
                        }, `刷新间隔: ${settings.performance.refreshInterval}秒`),
                        React.createElement(Slider, {
                            min: 10,
                            max: 300,
                            step: 10,
                            value: settings.performance.refreshInterval,
                            onChange: (value) => updateSetting('performance.refreshInterval', value),
                            marks: {
                                10: '10s',
                                60: '1m',
                                180: '3m',
                                300: '5m'
                            }
                        })
                    ])
                ]),
                React.createElement(Col, { span: 12 }, [
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '8px'
                        }
                    }, [
                        React.createElement('span', {
                            style: { fontWeight: '500' }
                        }, '启用缓存'),
                        React.createElement(Switch, {
                            checked: settings.performance.cacheEnabled,
                            onChange: (checked) => updateSetting('performance.cacheEnabled', checked)
                        })
                    ])
                ])
            ])
        ])
    ]);
};

window.AccountSettings = AccountSettings; 