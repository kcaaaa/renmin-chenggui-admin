// 系统设置页面
const SystemSettings = () => {
    const { Tabs, Card, Form, Input, InputNumber, Switch, Button, Space, Table, Tag } = antd;
    const [settings, setSettings] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setSettings(MockData.getSystemSettings());
            setLoading(false);
        }, 800);
    }, []);

    const alertColumns = [
        { title: '类型', dataIndex: 'type', width: 120 },
        { title: '阈值', dataIndex: 'threshold', width: 100 },
        {
            title: '状态',
            dataIndex: 'enabled',
            width: 80,
            render: (enabled) => React.createElement(Tag, {
                color: enabled ? 'green' : 'red'
            }, enabled ? '启用' : '禁用')
        },
        {
            title: '操作',
            width: 200,
            render: () => React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'edit',
                    size: 'small'
                }, '编辑'),
                React.createElement(Button, {
                    key: 'test',
                    size: 'small'
                }, '测试'),
                React.createElement(Button, {
                    key: 'delete',
                    size: 'small',
                    danger: true
                }, '删除')
            ])
        }
    ];

    const tabItems = [
        {
            key: 'ai',
            label: 'AI设置',
            children: React.createElement(Card, {
                title: 'AI审核参数配置'
            }, React.createElement(Form, {
                layout: 'vertical',
                initialValues: settings.aiSettings
            }, [
                React.createElement(Form.Item, {
                    key: 'text',
                    label: '文本审核阈值',
                    name: 'textThreshold'
                }, React.createElement(InputNumber, {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    style: { width: '100%' }
                })),
                React.createElement(Form.Item, {
                    key: 'image',
                    label: '图像审核阈值',
                    name: 'imageThreshold'
                }, React.createElement(InputNumber, {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    style: { width: '100%' }
                })),
                React.createElement(Form.Item, {
                    key: 'video',
                    label: '视频审核阈值',
                    name: 'videoThreshold'
                }, React.createElement(InputNumber, {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    style: { width: '100%' }
                })),
                React.createElement(Form.Item, {
                    key: 'auto',
                    label: '自动审核',
                    name: 'autoReview',
                    valuePropName: 'checked'
                }, React.createElement(Switch, {})),
                React.createElement(Form.Item, {
                    key: 'actions'
                }, React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'save',
                        type: 'primary'
                    }, '保存设置'),
                    React.createElement(Button, {
                        key: 'reset'
                    }, '重置')
                ]))
            ]))
        },
        {
            key: 'review',
            label: '审核流程',
            children: React.createElement(Card, {
                title: '审核流程配置'
            }, React.createElement('div', {
                style: { padding: '20px' }
            }, [
                React.createElement('div', {
                    key: 'stages',
                    style: { marginBottom: '20px' }
                }, [
                    React.createElement('h4', {
                        key: 'title'
                    }, '审核阶段'),
                    React.createElement('div', {
                        key: 'list',
                        style: { display: 'flex', gap: '16px', flexWrap: 'wrap' }
                    }, settings.reviewFlow?.stages?.map((stage, index) => 
                        React.createElement(Tag, {
                            key: index,
                            color: 'blue',
                            style: { padding: '4px 12px' }
                        }, `${index + 1}. ${stage}`)
                    ))
                ]),
                React.createElement(Button, {
                    key: 'configure',
                    type: 'primary'
                }, '配置流程')
            ]))
        },
        {
            key: 'alerts',
            label: '报警规则',
            children: React.createElement(Card, {
                title: '报警规则管理'
            }, [
                React.createElement('div', {
                    key: 'toolbar',
                    style: { marginBottom: '16px' }
                }, React.createElement(Button, {
                    type: 'primary'
                }, '新增规则')),
                React.createElement(Table, {
                    key: 'table',
                    columns: alertColumns,
                    dataSource: settings.alertRules?.map((rule, index) => ({
                        ...rule,
                        key: index
                    })) || [],
                    size: 'small'
                })
            ])
        },
        {
            key: 'logs',
            label: '日志管理',
            children: React.createElement(Card, {
                title: '系统日志配置'
            }, React.createElement('div', {
                style: { padding: '40px', textAlign: 'center', color: '#64748b' }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { fontSize: '64px', marginBottom: '16px' }
                }, '📋'),
                React.createElement('div', {
                    key: 'text'
                }, '日志管理功能开发中...')
            ]))
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
            }, '系统设置'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'export'
                }, '导出配置'),
                React.createElement(Button, {
                    key: 'import'
                }, '导入配置')
            ])
        ]),

        React.createElement(Tabs, {
            key: 'tabs',
            items: tabItems,
            size: 'large'
        })
    ]);
};

window.SystemSettings = SystemSettings; 