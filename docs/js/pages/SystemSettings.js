// 系统设置页面
const SystemSettings = () => {
    const { Tabs, Card, Button, Space, Tag, Switch, Input, Select, Form, InputNumber, Alert, Table, Modal, Progress, Row, Col, Statistic, Badge, Timeline, Tooltip } = antd;
    const [activeTab, setActiveTab] = React.useState('basic');
    const [loading, setLoading] = React.useState(false);
    const [alertModalVisible, setAlertModalVisible] = React.useState(false);
    const [monitoringConfig, setMonitoringConfig] = React.useState({
        enableAutoBackup: true,
        backupFrequency: 'daily',
        enableErrorAlert: true,
        enablePerformanceMonitor: true,
        alertThreshold: 80,
        enableSecurityAlert: true
    });

    // 系统状态监控
    const [systemStatus, setSystemStatus] = React.useState({
        cpuUsage: 45.2,
        memoryUsage: 68.7,
        diskUsage: 34.8,
        networkLatency: 23,
        activeUsers: 8524,
        errorRate: 0.02,
        avgResponseTime: 156
    });

    // 告警记录
    const [alertHistory, setAlertHistory] = React.useState([
        {
            id: 'alert_001',
            type: 'performance',
            level: 'warning',
            title: '服务器CPU使用率过高',
            description: '主服务器CPU使用率达到85%，建议检查负载情况',
            time: '2024-01-15 14:30:25',
            status: 'resolved'
        },
        {
            id: 'alert_002',
            type: 'security',
            level: 'critical',
            title: '检测到异常登录尝试',
            description: '来自未知IP的频繁登录失败尝试，已自动封禁',
            time: '2024-01-15 12:15:30',
            status: 'resolved'
        },
        {
            id: 'alert_003',
            type: 'backup',
            level: 'info',
            title: '自动备份完成',
            description: '今日02:00自动备份任务执行成功，备份大小2.8GB',
            time: '2024-01-15 02:15:00',
            status: 'resolved'
        }
    ]);

    // 渲染基础设置标签页
    const renderBasicSettings = () => {
        return React.createElement('div', { className: 'basic-settings-container' }, [
            // 系统基础配置
            React.createElement(Card, {
                key: 'basic-config',
                title: '🔧 系统基础配置',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Form, {
                    key: 'form',
                    layout: 'vertical',
                    initialValues: {
                        systemName: '人民城轨运营管理后台',
                        version: 'v2.0.1',
                        environment: 'production',
                        maxFileSize: 100,
                        sessionTimeout: 30,
                        enableRegistration: true,
                        enableGuestAccess: false
                    }
                }, [
                    React.createElement(Row, { key: 'row1', gutter: [16, 16] }, [
                        React.createElement(Col, { key: 'name', span: 12 },
                            React.createElement(Form.Item, {
                                label: '系统名称',
                                name: 'systemName'
                            }, React.createElement(Input, {
                                placeholder: '请输入系统名称'
                            }))
                        ),
                        React.createElement(Col, { key: 'version', span: 12 },
                            React.createElement(Form.Item, {
                                label: '系统版本',
                                name: 'version'
                            }, React.createElement(Input, {
                                disabled: true
                            }))
                        )
                    ]),
                    React.createElement(Row, { key: 'row2', gutter: [16, 16] }, [
                        React.createElement(Col, { key: 'env', span: 12 },
                            React.createElement(Form.Item, {
                                label: '运行环境',
                                name: 'environment'
                            }, React.createElement(Select, {}, [
                                React.createElement(Select.Option, { key: 'dev', value: 'development' }, '开发环境'),
                                React.createElement(Select.Option, { key: 'test', value: 'testing' }, '测试环境'),
                                React.createElement(Select.Option, { key: 'prod', value: 'production' }, '生产环境')
                            ]))
                        ),
                        React.createElement(Col, { key: 'filesize', span: 12 },
                            React.createElement(Form.Item, {
                                label: '最大文件大小(MB)',
                                name: 'maxFileSize'
                            }, React.createElement(InputNumber, {
                                min: 1,
                                max: 1024,
                                style: { width: '100%' }
                            }))
                        )
                    ]),
                    React.createElement(Row, { key: 'row3', gutter: [16, 16] }, [
                        React.createElement(Col, { key: 'timeout', span: 12 },
                            React.createElement(Form.Item, {
                                label: '会话超时(分钟)',
                                name: 'sessionTimeout'
                            }, React.createElement(InputNumber, {
                                min: 5,
                                max: 480,
                                style: { width: '100%' }
                            }))
                        ),
                        React.createElement(Col, { key: 'features', span: 12 }, [
                            React.createElement(Form.Item, {
                                key: 'reg',
                                label: '允许用户注册',
                                name: 'enableRegistration',
                                valuePropName: 'checked'
                            }, React.createElement(Switch, {})),
                            React.createElement(Form.Item, {
                                key: 'guest',
                                label: '允许游客访问',
                                name: 'enableGuestAccess',
                                valuePropName: 'checked',
                                style: { marginTop: '16px' }
                            }, React.createElement(Switch, {}))
                        ])
                    ])
                ])
            ]),

            // 安全设置
            React.createElement(Card, {
                key: 'security-config',
                title: '🔒 安全设置',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Form, {
                    key: 'security-form',
                    layout: 'vertical',
                    initialValues: {
                        enableTwoFactor: true,
                        passwordExpiry: 90,
                        maxLoginAttempts: 5,
                        enableIPWhitelist: false,
                        enableAuditLog: true
                    }
                }, [
                    React.createElement(Row, { key: 'sec-row1', gutter: [16, 16] }, [
                        React.createElement(Col, { key: 'auth', span: 12 }, [
                            React.createElement(Form.Item, {
                                key: '2fa',
                                label: '启用双因素认证',
                                name: 'enableTwoFactor',
                                valuePropName: 'checked'
                            }, React.createElement(Switch, {
                                checkedChildren: '开启',
                                unCheckedChildren: '关闭'
                            })),
                            React.createElement(Form.Item, {
                                key: 'whitelist',
                                label: '启用IP白名单',
                                name: 'enableIPWhitelist',
                                valuePropName: 'checked',
                                style: { marginTop: '16px' }
                            }, React.createElement(Switch, {
                                checkedChildren: '开启',
                                unCheckedChildren: '关闭'
                            }))
                        ]),
                        React.createElement(Col, { key: 'password', span: 12 }, [
                            React.createElement(Form.Item, {
                                key: 'expiry',
                                label: '密码有效期(天)',
                                name: 'passwordExpiry'
                            }, React.createElement(InputNumber, {
                                min: 30,
                                max: 365,
                                style: { width: '100%' }
                            })),
                            React.createElement(Form.Item, {
                                key: 'attempts',
                                label: '最大登录尝试次数',
                                name: 'maxLoginAttempts'
                            }, React.createElement(InputNumber, {
                                min: 3,
                                max: 10,
                                style: { width: '100%' }
                            }))
                        ])
                    ]),
                    React.createElement(Form.Item, {
                        key: 'audit',
                        label: '启用审计日志',
                        name: 'enableAuditLog',
                        valuePropName: 'checked'
                    }, React.createElement(Switch, {
                        checkedChildren: '开启',
                        unCheckedChildren: '关闭'
                    }))
                ])
            ]),

            // 保存按钮
            React.createElement('div', {
                key: 'save-actions',
                style: { textAlign: 'center' }
            }, [
                React.createElement(Space, { key: 'buttons' }, [
                    React.createElement(Button, {
                        key: 'reset',
                        onClick: () => antd.message.info('配置已重置')
                    }, '重置'),
                    React.createElement(Button, {
                        key: 'save',
                        type: 'primary',
                        onClick: () => handleSaveConfig()
                    }, '保存配置')
                ])
            ])
        ]);
    };

    // 渲染监控报警标签页
    const renderMonitoringSettings = () => {
        return React.createElement('div', { className: 'monitoring-container' }, [
            // 系统状态实时监控
            React.createElement(Card, {
                key: 'system-status',
                title: '📊 系统状态监控',
                extra: React.createElement(Badge, {
                    status: 'processing',
                    text: '实时监控'
                }),
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Row, { key: 'status-stats', gutter: [16, 16] }, [
                    React.createElement(Col, { key: 'cpu', span: 6 },
                        React.createElement('div', { className: 'status-card' }, [
                            React.createElement('div', { key: 'title', className: 'status-title' }, 'CPU使用率'),
                            React.createElement(Progress, {
                                key: 'progress',
                                type: 'circle',
                                percent: systemStatus.cpuUsage,
                                size: 80,
                                status: systemStatus.cpuUsage > 80 ? 'exception' : systemStatus.cpuUsage > 60 ? 'normal' : 'success'
                            }),
                            React.createElement('div', { key: 'value', className: 'status-value' }, `${systemStatus.cpuUsage}%`)
                        ])
                    ),
                    React.createElement(Col, { key: 'memory', span: 6 },
                        React.createElement('div', { className: 'status-card' }, [
                            React.createElement('div', { key: 'title', className: 'status-title' }, '内存使用率'),
                            React.createElement(Progress, {
                                key: 'progress',
                                type: 'circle',
                                percent: systemStatus.memoryUsage,
                                size: 80,
                                status: systemStatus.memoryUsage > 80 ? 'exception' : systemStatus.memoryUsage > 60 ? 'normal' : 'success'
                            }),
                            React.createElement('div', { key: 'value', className: 'status-value' }, `${systemStatus.memoryUsage}%`)
                        ])
                    ),
                    React.createElement(Col, { key: 'disk', span: 6 },
                        React.createElement('div', { className: 'status-card' }, [
                            React.createElement('div', { key: 'title', className: 'status-title' }, '磁盘使用率'),
                            React.createElement(Progress, {
                                key: 'progress',
                                type: 'circle',
                                percent: systemStatus.diskUsage,
                                size: 80,
                                status: systemStatus.diskUsage > 80 ? 'exception' : systemStatus.diskUsage > 60 ? 'normal' : 'success'
                            }),
                            React.createElement('div', { key: 'value', className: 'status-value' }, `${systemStatus.diskUsage}%`)
                        ])
                    ),
                    React.createElement(Col, { key: 'network', span: 6 },
                        React.createElement('div', { className: 'status-card' }, [
                            React.createElement('div', { key: 'title', className: 'status-title' }, '网络延迟'),
                            React.createElement('div', {
                                key: 'latency',
                                style: {
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: systemStatus.networkLatency > 100 ? '#ff4d4f' : systemStatus.networkLatency > 50 ? '#faad14' : '#52c41a',
                                    textAlign: 'center',
                                    marginTop: '16px'
                                }
                            }, `${systemStatus.networkLatency}ms`),
                            React.createElement('div', { key: 'status', className: 'status-value' }, 
                                systemStatus.networkLatency > 100 ? '网络异常' : '网络正常')
                        ])
                    )
                ])
            ]),

            // 监控配置
            React.createElement(Card, {
                key: 'monitoring-config',
                title: '⚙️ 监控配置',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Form, {
                    key: 'monitoring-form',
                    layout: 'vertical',
                    initialValues: monitoringConfig
                }, [
                    React.createElement(Row, { key: 'monitor-row1', gutter: [16, 16] }, [
                        React.createElement(Col, { key: 'backup', span: 12 }, [
                            React.createElement(Form.Item, {
                                key: 'auto-backup',
                                label: '自动备份监控',
                                name: 'enableAutoBackup',
                                valuePropName: 'checked'
                            }, React.createElement(Switch, {
                                checkedChildren: '开启',
                                unCheckedChildren: '关闭'
                            })),
                            React.createElement(Form.Item, {
                                key: 'backup-freq',
                                label: '备份监控频率',
                                name: 'backupFrequency'
                            }, React.createElement(Select, {}, [
                                React.createElement(Select.Option, { key: 'hourly', value: 'hourly' }, '每小时'),
                                React.createElement(Select.Option, { key: 'daily', value: 'daily' }, '每天'),
                                React.createElement(Select.Option, { key: 'weekly', value: 'weekly' }, '每周')
                            ]))
                        ]),
                        React.createElement(Col, { key: 'alerts', span: 12 }, [
                            React.createElement(Form.Item, {
                                key: 'error-alert',
                                label: '错误报警',
                                name: 'enableErrorAlert',
                                valuePropName: 'checked'
                            }, React.createElement(Switch, {
                                checkedChildren: '开启',
                                unCheckedChildren: '关闭'
                            })),
                            React.createElement(Form.Item, {
                                key: 'performance',
                                label: '性能监控',
                                name: 'enablePerformanceMonitor',
                                valuePropName: 'checked'
                            }, React.createElement(Switch, {
                                checkedChildren: '开启',
                                unCheckedChildren: '关闭'
                            }))
                        ])
                    ]),
                    React.createElement(Row, { key: 'monitor-row2', gutter: [16, 16] }, [
                        React.createElement(Col, { key: 'threshold', span: 12 },
                            React.createElement(Form.Item, {
                                label: '告警阈值(%)',
                                name: 'alertThreshold'
                            }, React.createElement(InputNumber, {
                                min: 50,
                                max: 95,
                                style: { width: '100%' }
                            }))
                        ),
                        React.createElement(Col, { key: 'security', span: 12 },
                            React.createElement(Form.Item, {
                                label: '安全告警',
                                name: 'enableSecurityAlert',
                                valuePropName: 'checked'
                            }, React.createElement(Switch, {
                                checkedChildren: '开启',
                                unCheckedChildren: '关闭'
                            }))
                        )
                    ])
                ])
            ]),

            // 告警历史
            React.createElement(Card, {
                key: 'alert-history',
                title: '🚨 告警历史',
                extra: React.createElement(Button, {
                    onClick: () => setAlertModalVisible(true)
                }, '查看详情')
            }, [
                React.createElement(Timeline, { key: 'timeline' },
                    alertHistory.slice(0, 5).map(alert => 
                        React.createElement(Timeline.Item, {
                            key: alert.id,
                            color: alert.level === 'critical' ? 'red' : alert.level === 'warning' ? 'orange' : 'blue',
                            dot: React.createElement('span', {
                                style: { fontSize: '16px' }
                            }, alert.level === 'critical' ? '🚨' : alert.level === 'warning' ? '⚠️' : 'ℹ️')
                        }, [
                            React.createElement('div', {
                                key: 'title',
                                style: { fontWeight: 'bold', marginBottom: '4px' }
                            }, alert.title),
                            React.createElement('div', {
                                key: 'desc',
                                style: { color: '#666', marginBottom: '4px' }
                            }, alert.description),
                            React.createElement('div', {
                                key: 'time',
                                style: { fontSize: '12px', color: '#999' }
                            }, alert.time)
                        ])
                    )
                )
            ])
        ]);
    };

    // 渲染审核阈值设置标签页
    const renderAuditThresholds = () => {
        return React.createElement('div', { className: 'audit-thresholds-container' }, [
            React.createElement(Card, {
                key: 'image-thresholds',
                title: '🖼️ 图文审核阈值',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Form, {
                    key: 'image-form',
                    layout: 'vertical',
                    initialValues: {
                        imageSensitivity: 0.7,
                        textSensitivity: 0.8,
                        autoReject: 0.9,
                        autoApprove: 0.3
                    }
                }, [
                    React.createElement('div', {
                        key: 'sensitivity-controls',
                        style: { padding: '20px 0' }
                    }, [
                        React.createElement('div', { key: 'label', style: { marginBottom: '16px', fontWeight: 'bold' } }, '敏感度阈值调整'),
                        React.createElement(Row, { key: 'sliders', gutter: [24, 24] }, [
                            React.createElement(Col, { key: 'img', span: 12 }, [
                                React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '图片敏感度'),
                                React.createElement('div', {
                                    key: 'slider',
                                    style: {
                                        background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                        height: '8px',
                                        borderRadius: '4px',
                                        position: 'relative',
                                        cursor: 'pointer'
                                    }
                                }, [
                                    React.createElement('div', {
                                        key: 'thumb',
                                        style: {
                                            position: 'absolute',
                                            top: '-4px',
                                            left: '70%',
                                            width: '16px',
                                            height: '16px',
                                            background: '#fff',
                                            border: '2px solid #1890ff',
                                            borderRadius: '50%',
                                            cursor: 'pointer'
                                        }
                                    })
                                ]),
                                React.createElement('div', {
                                    key: 'value',
                                    style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' }
                                }, '0.7 (中等)')
                            ]),
                            React.createElement(Col, { key: 'text', span: 12 }, [
                                React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '文本敏感度'),
                                React.createElement('div', {
                                    key: 'slider',
                                    style: {
                                        background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                        height: '8px',
                                        borderRadius: '4px',
                                        position: 'relative',
                                        cursor: 'pointer'
                                    }
                                }, [
                                    React.createElement('div', {
                                        key: 'thumb',
                                        style: {
                                            position: 'absolute',
                                            top: '-4px',
                                            left: '80%',
                                            width: '16px',
                                            height: '16px',
                                            background: '#fff',
                                            border: '2px solid #1890ff',
                                            borderRadius: '50%',
                                            cursor: 'pointer'
                                        }
                                    })
                                ]),
                                React.createElement('div', {
                                    key: 'value',
                                    style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' }
                                }, '0.8 (较严格)')
                            ])
                        ])
                    ])
                ])
            ]),

            React.createElement(Card, {
                key: 'video-thresholds',
                title: '🎥 视频审核阈值',
                style: { marginBottom: '20px' }
            }, [
                React.createElement('div', {
                    key: 'video-controls',
                    style: { padding: '20px 0' }
                }, [
                    React.createElement('div', { key: 'label', style: { marginBottom: '16px', fontWeight: 'bold' } }, '视频审核敏感度'),
                    React.createElement(Row, { key: 'video-sliders', gutter: [24, 24] }, [
                        React.createElement(Col, { key: 'frame', span: 8 }, [
                            React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '画面检测'),
                            React.createElement('div', {
                                key: 'slider',
                                style: {
                                    background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                    height: '8px',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }
                            }, [
                                React.createElement('div', {
                                    key: 'thumb',
                                    style: {
                                        position: 'absolute',
                                        top: '-4px',
                                        left: '65%',
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        border: '2px solid #1890ff',
                                        borderRadius: '50%'
                                    }
                                })
                            ]),
                            React.createElement('div', { key: 'value', style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' } }, '0.65')
                        ]),
                        React.createElement(Col, { key: 'audio', span: 8 }, [
                            React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '音频检测'),
                            React.createElement('div', {
                                key: 'slider',
                                style: {
                                    background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                    height: '8px',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }
                            }, [
                                React.createElement('div', {
                                    key: 'thumb',
                                    style: {
                                        position: 'absolute',
                                        top: '-4px',
                                        left: '75%',
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        border: '2px solid #1890ff',
                                        borderRadius: '50%'
                                    }
                                })
                            ]),
                            React.createElement('div', { key: 'value', style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' } }, '0.75')
                        ]),
                        React.createElement(Col, { key: 'subtitle', span: 8 }, [
                            React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '字幕检测'),
                            React.createElement('div', {
                                key: 'slider',
                                style: {
                                    background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                    height: '8px',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }
                            }, [
                                React.createElement('div', {
                                    key: 'thumb',
                                    style: {
                                        position: 'absolute',
                                        top: '-4px',
                                        left: '80%',
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        border: '2px solid #1890ff',
                                        borderRadius: '50%'
                                    }
                                })
                            ]),
                            React.createElement('div', { key: 'value', style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' } }, '0.80')
                        ])
                    ])
                ])
            ]),

            React.createElement(Card, {
                key: 'interaction-thresholds',
                title: '💬 互动审核阈值'
            }, [
                React.createElement('div', {
                    key: 'interaction-controls',
                    style: { padding: '20px 0' }
                }, [
                    React.createElement('div', { key: 'label', style: { marginBottom: '16px', fontWeight: 'bold' } }, '互动内容审核敏感度'),
                    React.createElement(Row, { key: 'interaction-sliders', gutter: [24, 24] }, [
                        React.createElement(Col, { key: 'comment', span: 12 }, [
                            React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '评论检测'),
                            React.createElement('div', {
                                key: 'slider',
                                style: {
                                    background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                    height: '8px',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }
                            }, [
                                React.createElement('div', {
                                    key: 'thumb',
                                    style: {
                                        position: 'absolute',
                                        top: '-4px',
                                        left: '85%',
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        border: '2px solid #1890ff',
                                        borderRadius: '50%'
                                    }
                                })
                            ]),
                            React.createElement('div', { key: 'value', style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' } }, '0.85 (严格)')
                        ]),
                        React.createElement(Col, { key: 'private', span: 12 }, [
                            React.createElement('div', { key: 'title', style: { marginBottom: '8px' } }, '私信检测'),
                            React.createElement('div', {
                                key: 'slider',
                                style: {
                                    background: 'linear-gradient(90deg, #52c41a 0%, #faad14 50%, #ff4d4f 100%)',
                                    height: '8px',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }
                            }, [
                                React.createElement('div', {
                                    key: 'thumb',
                                    style: {
                                        position: 'absolute',
                                        top: '-4px',
                                        left: '78%',
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        border: '2px solid #1890ff',
                                        borderRadius: '50%'
                                    }
                                })
                            ]),
                            React.createElement('div', { key: 'value', style: { textAlign: 'center', marginTop: '8px', color: '#1890ff' } }, '0.78 (中高)')
                        ])
                    ])
                ])
            ])
        ]);
    };

    // 处理保存配置
    const handleSaveConfig = () => {
        antd.message.loading('正在保存配置...', 1);
        setTimeout(() => {
            antd.message.success('配置保存成功！');
        }, 1000);
    };

    // 告警详情模态框
    const renderAlertModal = () => {
        return React.createElement(Modal, {
            title: '🚨 告警详情',
            open: alertModalVisible,
            onCancel: () => setAlertModalVisible(false),
            footer: null,
            width: 800
        }, [
            React.createElement(Table, {
                key: 'alert-table',
                dataSource: alertHistory.map(alert => ({ ...alert, key: alert.id })),
                columns: [
                    {
                        title: '告警类型',
                        dataIndex: 'type',
                        render: (type) => {
                            const config = {
                                performance: { color: 'orange', text: '性能' },
                                security: { color: 'red', text: '安全' },
                                backup: { color: 'blue', text: '备份' },
                                system: { color: 'purple', text: '系统' }
                            };
                            const c = config[type] || config.system;
                            return React.createElement(Tag, { color: c.color }, c.text);
                        }
                    },
                    {
                        title: '级别',
                        dataIndex: 'level',
                        render: (level) => {
                            const config = {
                                critical: { color: 'red', text: '严重' },
                                warning: { color: 'orange', text: '警告' },
                                info: { color: 'blue', text: '信息' }
                            };
                            const c = config[level] || config.info;
                            return React.createElement(Tag, { color: c.color }, c.text);
                        }
                    },
                    {
                        title: '标题',
                        dataIndex: 'title'
                    },
                    {
                        title: '时间',
                        dataIndex: 'time'
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        render: (status) => {
                            const config = {
                                resolved: { color: 'green', text: '已解决' },
                                pending: { color: 'orange', text: '处理中' },
                                ignored: { color: 'gray', text: '已忽略' }
                            };
                            const c = config[status] || config.pending;
                            return React.createElement(Tag, { color: c.color }, c.text);
                        }
                    }
                ],
                pagination: { pageSize: 10 }
            })
        ]);
    };

    return React.createElement('div', { className: 'page-container' }, [
        React.createElement('div', { key: 'header', className: 'page-header' }, [
            React.createElement('h2', { key: 'title' }, '⚙️ 系统设置'),
            React.createElement('p', { key: 'desc' }, '系统配置、监控报警、审核阈值管理')
        ]),

        React.createElement(Tabs, {
            key: 'tabs',
            activeKey: activeTab,
            onChange: setActiveTab,
            items: [
                {
                    key: 'basic',
                    label: '🔧 基础设置',
                    children: renderBasicSettings()
                },
                {
                    key: 'monitoring',
                    label: '📊 监控报警',
                    children: renderMonitoringSettings()
                },
                {
                    key: 'thresholds',
                    label: '🎯 审核阈值',
                    children: renderAuditThresholds()
                }
            ]
        }),

        // 模态框
        renderAlertModal()
    ]);
};

// 导出组件
window.SystemSettings = SystemSettings; 