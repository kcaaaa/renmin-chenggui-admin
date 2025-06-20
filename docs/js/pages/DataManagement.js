// 数据管理页面
const DataManagement = () => {
    const { Tabs, Card, Button, Space, Tag, Progress, Alert, Table, Modal, Form, Input, Select, Switch, DatePicker, Statistic, Row, Col, Timeline, Badge, Tooltip } = antd;
    const [activeTab, setActiveTab] = React.useState('reports');
    const [loading, setLoading] = React.useState(false);
    const [backupModalVisible, setBackupModalVisible] = React.useState(false);
    const [restoreModalVisible, setRestoreModalVisible] = React.useState(false);
    const [configModalVisible, setConfigModalVisible] = React.useState(false);

    // 备份配置状态
    const [backupConfig, setBackupConfig] = React.useState({
        autoBackup: true,
        frequency: 'daily',
        retentionDays: 30,
        encryption: true,
        remoteBackup: true,
        backupPath: '/data/backups/'
    });

    // 备份任务状态
    const [backupTasks, setBackupTasks] = React.useState([
        {
            id: 'backup_001',
            type: 'full',
            status: 'completed',
            startTime: '2024-01-15 02:00:00',
            endTime: '2024-01-15 02:45:00',
            size: '2.8GB',
            location: 'remote://backup-server/full_20240115.tar.gz',
            duration: '45分钟'
        },
        {
            id: 'backup_002',
            type: 'incremental',
            status: 'completed',
            startTime: '2024-01-15 14:00:00',
            endTime: '2024-01-15 14:15:00',
            size: '156MB',
            location: 'remote://backup-server/inc_20240115_14.tar.gz',
            duration: '15分钟'
        },
        {
            id: 'backup_003',
            type: 'incremental',
            status: 'running',
            startTime: '2024-01-15 20:00:00',
            endTime: null,
            size: null,
            location: null,
            duration: null,
            progress: 68
        }
    ]);

    // 灾备监控数据
    const [disasterRecoveryStats, setDisasterRecoveryStats] = React.useState({
        rto: '45分钟',
        rpo: '5分钟',
        lastDrillTime: '2024-01-10 09:00:00',
        drillSuccess: true,
        replicationStatus: 'healthy',
        dataIntegrity: 99.98
    });

    // 渲染数据报告标签页
    const renderReportsTab = () => {
        return React.createElement('div', { className: 'data-reports-container' }, [
            // 实时数据仪表盘
            React.createElement(Card, {
                key: 'dashboard',
                title: '📊 实时数据仪表盘',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Row, { key: 'stats', gutter: [16, 16] }, [
                    React.createElement(Col, { key: 'users', span: 6 },
                        React.createElement(Statistic,
                            {
                                title: '在线用户',
                                value: 8524,
                                prefix: '👥',
                                valueStyle: { color: '#3f8600' }
                            }
                        )
                    ),
                    React.createElement(Col, { key: 'content', span: 6 },
                        React.createElement(Statistic,
                            {
                                title: '今日新增内容',
                                value: 328,
                                prefix: '📝',
                                valueStyle: { color: '#1890ff' }
                            }
                        )
                    ),
                    React.createElement(Col, { key: 'interactions', span: 6 },
                        React.createElement(Statistic,
                            {
                                title: '总互动量',
                                value: 15647,
                                prefix: '❤️',
                                valueStyle: { color: '#eb2f96' }
                            }
                        )
                    ),
                    React.createElement(Col, { key: 'storage', span: 6 },
                        React.createElement(Statistic,
                            {
                                title: '存储使用',
                                value: 78.5,
                                suffix: '%',
                                prefix: '💾',
                                valueStyle: { color: '#722ed1' }
                            }
                        )
                    )
                ])
            ]),

            // 趋势分析
            React.createElement(Card, {
                key: 'trends',
                title: '📈 数据趋势分析',
                extra: React.createElement(Button, {
                    onClick: () => antd.message.info('功能开发中')
                }, '导出报告')
            }, [
                React.createElement('div', {
                    key: 'trend-charts',
                    style: {
                        height: '300px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px'
                    }
                }, '📊 趋势图表展示区域 (集成第三方图表库)')
            ])
        ]);
    };

    // 渲染数据存储与备份标签页
    const renderBackupTab = () => {
        return React.createElement('div', { className: 'backup-management-container' }, [
            // 备份概览卡片
            React.createElement(Row, { key: 'overview', gutter: [16, 16], style: { marginBottom: '20px' } }, [
                React.createElement(Col, { key: 'status', span: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '备份状态',
                            value: '正常',
                            valueStyle: { color: '#52c41a', fontSize: '18px' },
                            prefix: '✅'
                        })
                    ])
                ),
                React.createElement(Col, { key: 'last', span: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '最近备份',
                            value: '2小时前',
                            valueStyle: { fontSize: '18px' },
                            prefix: '⏰'
                        })
                    ])
                ),
                React.createElement(Col, { key: 'size', span: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '备份大小',
                            value: '2.8',
                            suffix: 'GB',
                            valueStyle: { fontSize: '18px' },
                            prefix: '💾'
                        })
                    ])
                ),
                React.createElement(Col, { key: 'retention', span: 6 },
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            title: '保留期限',
                            value: 30,
                            suffix: '天',
                            valueStyle: { fontSize: '18px' },
                            prefix: '📅'
                        })
                    ])
                )
            ]),

            // 操作按钮
            React.createElement(Card, {
                key: 'actions',
                title: '🔧 备份操作',
                style: { marginBottom: '20px' }
            }, [
                React.createElement(Space, { key: 'buttons', size: 'middle' }, [
                    React.createElement(Button, {
                        key: 'manual',
                        type: 'primary',
                        icon: React.createElement('span', {}, '🔄'),
                        onClick: () => handleManualBackup()
                    }, '立即备份'),
                    React.createElement(Button, {
                        key: 'config',
                        icon: React.createElement('span', {}, '⚙️'),
                        onClick: () => setConfigModalVisible(true)
                    }, '备份设置'),
                    React.createElement(Button, {
                        key: 'restore',
                        icon: React.createElement('span', {}, '📥'),
                        onClick: () => setRestoreModalVisible(true)
                    }, '数据恢复'),
                    React.createElement(Button, {
                        key: 'verify',
                        icon: React.createElement('span', {}, '🔍'),
                        onClick: () => handleVerifyBackup()
                    }, '验证备份')
                ])
            ]),

            // 备份任务列表
            React.createElement(Card, {
                key: 'tasks',
                title: '📋 备份任务历史'
            }, [
                React.createElement(Table, {
                    key: 'table',
                    dataSource: backupTasks.map(task => ({ ...task, key: task.id })),
                    columns: [
                        {
                            title: '任务ID',
                            dataIndex: 'id',
                            width: 120
                        },
                        {
                            title: '备份类型',
                            dataIndex: 'type',
                            width: 100,
                            render: (type) => {
                                const config = {
                                    full: { color: 'blue', text: '全量备份' },
                                    incremental: { color: 'green', text: '增量备份' },
                                    differential: { color: 'orange', text: '差异备份' }
                                };
                                const c = config[type] || config.full;
                                return React.createElement(Tag, { color: c.color }, c.text);
                            }
                        },
                        {
                            title: '状态',
                            dataIndex: 'status',
                            width: 120,
                            render: (status, record) => {
                                if (status === 'running') {
                                    return React.createElement('div', {}, [
                                        React.createElement(Progress, {
                                            key: 'progress',
                                            percent: record.progress,
                                            size: 'small',
                                            status: 'active'
                                        }),
                                        React.createElement('span', {
                                            key: 'text',
                                            style: { marginLeft: '8px' }
                                        }, '执行中')
                                    ]);
                                }
                                const config = {
                                    completed: { color: 'success', text: '已完成' },
                                    failed: { color: 'error', text: '失败' },
                                    cancelled: { color: 'warning', text: '已取消' }
                                };
                                const c = config[status] || config.completed;
                                return React.createElement(Tag, { color: c.color }, c.text);
                            }
                        },
                        {
                            title: '开始时间',
                            dataIndex: 'startTime',
                            width: 160
                        },
                        {
                            title: '结束时间',
                            dataIndex: 'endTime',
                            width: 160,
                            render: (time) => time || '-'
                        },
                        {
                            title: '备份大小',
                            dataIndex: 'size',
                            width: 100,
                            render: (size) => size || '-'
                        },
                        {
                            title: '耗时',
                            dataIndex: 'duration',
                            width: 100,
                            render: (duration) => duration || '-'
                        },
                        {
                            title: '操作',
                            width: 150,
                            render: (_, record) => React.createElement(Space, {}, [
                                React.createElement(Button, {
                                    key: 'download',
                                    size: 'small',
                                    disabled: record.status !== 'completed'
                                }, '下载'),
                                React.createElement(Button, {
                                    key: 'restore',
                                    size: 'small',
                                    disabled: record.status !== 'completed',
                                    onClick: () => handleRestoreFromBackup(record)
                                }, '恢复')
                            ])
                        }
                    ],
                    pagination: { pageSize: 10 }
                })
            ])
        ]);
    };

    // 渲染灾备管理标签页
    const renderDisasterRecoveryTab = () => {
        return React.createElement('div', { className: 'disaster-recovery-container' }, [
            // 灾备状态监控
            React.createElement(Alert, {
                key: 'status',
                message: '灾备系统运行正常',
                description: '数据复制状态良好，RTO/RPO指标均在预期范围内',
                type: 'success',
                showIcon: true,
                style: { marginBottom: '20px' }
            }),

            // 关键指标
            React.createElement(Row, { key: 'metrics', gutter: [16, 16], style: { marginBottom: '20px' } }, [
                React.createElement(Col, { key: 'rto', span: 6 },
                    React.createElement(Card, { size: 'small', title: '🎯 RTO目标' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            value: disasterRecoveryStats.rto,
                            valueStyle: { color: '#52c41a' },
                            suffix: React.createElement(Tag, { color: 'green' }, '达标')
                        })
                    ])
                ),
                React.createElement(Col, { key: 'rpo', span: 6 },
                    React.createElement(Card, { size: 'small', title: '📍 RPO目标' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            value: disasterRecoveryStats.rpo,
                            valueStyle: { color: '#52c41a' },
                            suffix: React.createElement(Tag, { color: 'green' }, '达标')
                        })
                    ])
                ),
                React.createElement(Col, { key: 'integrity', span: 6 },
                    React.createElement(Card, { size: 'small', title: '🔒 数据完整性' }, [
                        React.createElement(Statistic, {
                            key: 'stat',
                            value: disasterRecoveryStats.dataIntegrity,
                            suffix: '%',
                            precision: 2,
                            valueStyle: { color: '#1890ff' }
                        })
                    ])
                ),
                React.createElement(Col, { key: 'replication', span: 6 },
                    React.createElement(Card, { size: 'small', title: '🔄 复制状态' }, [
                        React.createElement('div', {
                            key: 'status',
                            style: { textAlign: 'center', padding: '20px 0' }
                        }, [
                            React.createElement(Badge, {
                                key: 'badge',
                                status: 'processing',
                                text: '实时同步中'
                            })
                        ])
                    ])
                )
            ]),

            // 灾备演练历史
            React.createElement(Card, {
                key: 'drills',
                title: '🎭 灾备演练记录',
                extra: React.createElement(Button, {
                    type: 'primary',
                    onClick: () => handleStartDrill()
                }, '开始演练')
            }, [
                React.createElement(Timeline, { key: 'timeline' }, [
                    React.createElement(Timeline.Item, {
                        key: 'drill1',
                        color: 'green',
                        dot: React.createElement('span', { style: { fontSize: '16px' } }, '✅')
                    }, [
                        React.createElement('div', { key: 'title', style: { fontWeight: 'bold' } }, '2024-01-10 定期灾备演练'),
                        React.createElement('div', { key: 'desc' }, '模拟主数据库故障，切换到备用系统'),
                        React.createElement('div', { key: 'result', style: { color: '#52c41a' } }, '✅ 演练成功 - RTO: 42分钟, RPO: 3分钟')
                    ]),
                    React.createElement(Timeline.Item, {
                        key: 'drill2',
                        color: 'green',
                        dot: React.createElement('span', { style: { fontSize: '16px' } }, '✅')
                    }, [
                        React.createElement('div', { key: 'title', style: { fontWeight: 'bold' } }, '2023-12-15 年度灾备演练'),
                        React.createElement('div', { key: 'desc' }, '全系统灾备切换演练'),
                        React.createElement('div', { key: 'result', style: { color: '#52c41a' } }, '✅ 演练成功 - RTO: 38分钟, RPO: 2分钟')
                    ]),
                    React.createElement(Timeline.Item, {
                        key: 'drill3',
                        color: 'blue'
                    }, [
                        React.createElement('div', { key: 'title', style: { fontWeight: 'bold' } }, '下次演练计划'),
                        React.createElement('div', { key: 'desc' }, '2024-02-10 - 网络中断场景演练')
                    ])
                ])
            ])
        ]);
    };

    // 处理手动备份
    const handleManualBackup = () => {
        Modal.confirm({
            title: '确认执行手动备份？',
            content: '此操作将创建一个全量备份，可能需要较长时间，确认继续？',
            onOk: () => {
                antd.message.loading('正在执行备份...', 0);
                setTimeout(() => {
                    antd.message.destroy();
                    antd.message.success('备份任务已启动，请在任务列表中查看进度');
                    // 更新任务列表
                    const newTask = {
                        id: `backup_${Date.now()}`,
                        type: 'full',
                        status: 'running',
                        startTime: new Date().toLocaleString(),
                        endTime: null,
                        size: null,
                        location: null,
                        duration: null,
                        progress: 15
                    };
                    setBackupTasks(prev => [newTask, ...prev]);
                }, 2000);
            }
        });
    };

    // 处理备份验证
    const handleVerifyBackup = () => {
        antd.message.loading('正在验证最新备份的完整性...', 0);
        setTimeout(() => {
            antd.message.destroy();
            antd.message.success('备份验证通过，数据完整性100%');
        }, 3000);
    };

    // 处理灾备演练
    const handleStartDrill = () => {
        Modal.confirm({
            title: '⚠️ 确认开始灾备演练？',
            content: '此操作将模拟灾难场景，可能影响系统性能，建议在低峰期进行。',
            okText: '开始演练',
            cancelText: '取消',
            onOk: () => {
                antd.message.loading('灾备演练进行中...', 0);
                setTimeout(() => {
                    antd.message.destroy();
                    antd.message.success('灾备演练完成！系统切换成功，RTO: 43分钟');
                }, 5000);
            }
        });
    };

    // 处理从备份恢复
    const handleRestoreFromBackup = (backup) => {
        Modal.confirm({
            title: '⚠️ 确认从此备份恢复数据？',
            content: `此操作将恢复到 ${backup.startTime} 的数据状态，当前数据将被覆盖且无法撤销！`,
            okText: '确认恢复',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                antd.message.loading('正在恢复数据...', 0);
                setTimeout(() => {
                    antd.message.destroy();
                    antd.message.success('数据恢复完成！');
                }, 8000);
            }
        });
    };

    // 备份配置模态框
    const renderConfigModal = () => {
        return React.createElement(Modal, {
            title: '⚙️ 备份配置',
            open: configModalVisible,
            onCancel: () => setConfigModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setConfigModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'save',
                    type: 'primary',
                    onClick: () => {
                        antd.message.success('配置已保存');
                        setConfigModalVisible(false);
                    }
                }, '保存配置')
            ]
        }, [
            React.createElement(Form, {
                key: 'form',
                layout: 'vertical',
                initialValues: backupConfig
            }, [
                React.createElement(Form.Item, {
                    key: 'auto',
                    label: '自动备份',
                    name: 'autoBackup'
                }, React.createElement(Switch, {
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭'
                })),
                React.createElement(Form.Item, {
                    key: 'freq',
                    label: '备份频率',
                    name: 'frequency'
                }, React.createElement(Select, {}, [
                    React.createElement(Select.Option, { key: 'hourly', value: 'hourly' }, '每小时'),
                    React.createElement(Select.Option, { key: 'daily', value: 'daily' }, '每天'),
                    React.createElement(Select.Option, { key: 'weekly', value: 'weekly' }, '每周')
                ])),
                React.createElement(Form.Item, {
                    key: 'retention',
                    label: '保留天数',
                    name: 'retentionDays'
                }, React.createElement(Input, { type: 'number' })),
                React.createElement(Form.Item, {
                    key: 'encryption',
                    label: '启用加密',
                    name: 'encryption'
                }, React.createElement(Switch, {
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭'
                })),
                React.createElement(Form.Item, {
                    key: 'remote',
                    label: '异地备份',
                    name: 'remoteBackup'
                }, React.createElement(Switch, {
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭'
                }))
            ])
        ]);
    };

    return React.createElement('div', { className: 'page-container' }, [
        React.createElement('div', { key: 'header', className: 'page-header' }, [
            React.createElement('h2', { key: 'title' }, '📊 数据管理'),
            React.createElement('p', { key: 'desc' }, '数据报告分析、备份恢复、灾备管理')
        ]),

        React.createElement(Tabs, {
            key: 'tabs',
            activeKey: activeTab,
            onChange: setActiveTab,
            items: [
                {
                    key: 'reports',
                    label: '📈 数据报告',
                    children: renderReportsTab()
                },
                {
                    key: 'backup',
                    label: '💾 数据备份',
                    children: renderBackupTab()
                },
                {
                    key: 'disaster-recovery',
                    label: '🛡️ 灾备管理',
                    children: renderDisasterRecoveryTab()
                }
            ]
        }),

        // 模态框
        renderConfigModal()
    ]);
};

// 导出组件
window.DataManagement = DataManagement; 