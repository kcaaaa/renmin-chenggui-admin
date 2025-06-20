// 数据管理页面
const DataManagement = () => {
    const { Row, Col, Card, Progress, Button, Space, Alert, Tag, Table } = antd;
    const [dataStats, setDataStats] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setDataStats(MockData.getDataManagement());
            setLoading(false);
        }, 800);
    }, []);

    const backupHistory = [
        { id: 1, time: '2024-01-15 02:00:00', size: '245.8 GB', status: 'success' },
        { id: 2, time: '2024-01-14 02:00:00', size: '243.2 GB', status: 'success' },
        { id: 3, time: '2024-01-13 02:00:00', size: '241.5 GB', status: 'failed' }
    ];

    const renderBackupStatus = (status) => {
        const config = {
            success: { color: 'green', text: '成功' },
            failed: { color: 'red', text: '失败' },
            running: { color: 'blue', text: '进行中' }
        };
        const s = config[status] || config.success;
        return React.createElement(Tag, { color: s.color }, s.text);
    };

    const columns = [
        { title: '时间', dataIndex: 'time', width: 180 },
        { title: '大小', dataIndex: 'size', width: 120 },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            render: renderBackupStatus
        },
        {
            title: '操作',
            width: 200,
            render: (_, record) => React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'download',
                    size: 'small',
                    disabled: record.status !== 'success'
                }, '下载'),
                React.createElement(Button, {
                    key: 'restore',
                    size: 'small',
                    type: 'primary',
                    disabled: record.status !== 'success'
                }, '恢复'),
                React.createElement(Button, {
                    key: 'delete',
                    size: 'small',
                    danger: true
                }, '删除')
            ])
        }
    ];

    return React.createElement('div', {}, [
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
            }, '数据管理'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'backup',
                    type: 'primary'
                }, '立即备份'),
                React.createElement(Button, {
                    key: 'settings'
                }, '备份设置')
            ])
        ]),

        // 存储概览
        React.createElement(Row, {
            key: 'storage',
            gutter: [16, 16],
            style: { marginBottom: '24px' }
        }, [
            React.createElement(Col, {
                key: 'overview',
                xs: 24,
                lg: 16
            }, React.createElement(Card, {
                title: '存储概览',
                className: 'dashboard-card'
            }, React.createElement('div', {
                style: { padding: '20px' }
            }, [
                React.createElement('div', {
                    key: 'usage',
                    style: { marginBottom: '20px' }
                }, [
                    React.createElement('div', {
                        key: 'label',
                        style: { 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }
                    }, [
                        React.createElement('span', { key: 'text' }, '存储使用情况'),
                        React.createElement('span', { key: 'percent' }, `${(dataStats.storage?.usage * 100 || 0).toFixed(1)}%`)
                    ]),
                    React.createElement(Progress, {
                        key: 'progress',
                        percent: (dataStats.storage?.usage * 100) || 0,
                        status: dataStats.storage?.usage > 0.8 ? 'exception' : 'active'
                    })
                ]),
                React.createElement('div', {
                    key: 'details',
                    style: { 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '16px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'total',
                        style: { textAlign: 'center' }
                    }, [
                        React.createElement('div', {
                            key: 'value',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }
                        }, `${dataStats.storage?.total || 0} GB`),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '总容量')
                    ]),
                    React.createElement('div', {
                        key: 'used',
                        style: { textAlign: 'center' }
                    }, [
                        React.createElement('div', {
                            key: 'value',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#f59e42' }
                        }, `${dataStats.storage?.used || 0} GB`),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '已使用')
                    ]),
                    React.createElement('div', {
                        key: 'available',
                        style: { textAlign: 'center' }
                    }, [
                        React.createElement('div', {
                            key: 'value',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }
                        }, `${dataStats.storage?.available || 0} GB`),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '可用')
                    ])
                ])
            ]))),
            React.createElement(Col, {
                key: 'monitoring',
                xs: 24,
                lg: 8
            }, React.createElement(Card, {
                title: '系统监控',
                className: 'dashboard-card'
            }, React.createElement('div', {
                style: { padding: '20px' }
            }, [
                React.createElement('div', {
                    key: 'api',
                    style: { marginBottom: '16px' }
                }, [
                    React.createElement('div', {
                        key: 'label',
                        style: { fontSize: '14px', color: '#64748b', marginBottom: '4px' }
                    }, 'API调用量'),
                    React.createElement('div', {
                        key: 'value',
                        style: { fontSize: '18px', fontWeight: 'bold' }
                    }, (dataStats.monitoring?.apiCalls || 0).toLocaleString())
                ]),
                React.createElement('div', {
                    key: 'error',
                    style: { marginBottom: '16px' }
                }, [
                    React.createElement('div', {
                        key: 'label',
                        style: { fontSize: '14px', color: '#64748b', marginBottom: '4px' }
                    }, '错误率'),
                    React.createElement('div', {
                        key: 'value',
                        style: { 
                            fontSize: '18px', 
                            fontWeight: 'bold',
                            color: (dataStats.monitoring?.errorRate || 0) > 0.05 ? '#ef4444' : '#22c55e'
                        }
                    }, `${((dataStats.monitoring?.errorRate || 0) * 100).toFixed(2)}%`)
                ]),
                React.createElement('div', {
                    key: 'response',
                    style: { marginBottom: '16px' }
                }, [
                    React.createElement('div', {
                        key: 'label',
                        style: { fontSize: '14px', color: '#64748b', marginBottom: '4px' }
                    }, '平均响应时间'),
                    React.createElement('div', {
                        key: 'value',
                        style: { fontSize: '18px', fontWeight: 'bold' }
                    }, `${dataStats.monitoring?.avgResponseTime || 0}ms`)
                ])
            ])))
        ]),

        // 备份状态和历史
        React.createElement(Row, {
            key: 'backup',
            gutter: [16, 16]
        }, [
            React.createElement(Col, {
                key: 'status',
                xs: 24,
                lg: 8
            }, React.createElement(Card, {
                title: '备份状态',
                className: 'dashboard-card'
            }, React.createElement('div', {
                style: { padding: '20px' }
            }, [
                React.createElement(Alert, {
                    key: 'alert',
                    type: dataStats.backup?.status === 'success' ? 'success' : 'warning',
                    message: '最近备份状态',
                    description: dataStats.backup?.status === 'success' ? '备份正常' : '备份异常',
                    showIcon: true,
                    style: { marginBottom: '16px' }
                }),
                React.createElement('div', {
                    key: 'info',
                    style: { fontSize: '14px', color: '#64748b' }
                }, [
                    React.createElement('p', {
                        key: 'time'
                    }, `最后备份：${dataStats.backup?.lastBackup || '-'}`),
                    React.createElement('p', {
                        key: 'size'
                    }, `备份大小：${dataStats.backup?.size || 0} GB`),
                    React.createElement('p', {
                        key: 'retention'
                    }, `保留天数：${dataStats.backup?.retention || 0} 天`)
                ])
            ]))),
            React.createElement(Col, {
                key: 'history',
                xs: 24,
                lg: 16
            }, React.createElement(Card, {
                title: '备份历史',
                className: 'dashboard-card'
            }, React.createElement(Table, {
                columns: columns,
                dataSource: backupHistory.map(item => ({ ...item, key: item.id })),
                size: 'small',
                pagination: false
            })))
        ])
    ]);
};

window.DataManagement = DataManagement; 