// 直播管理页面 - 基于新功能规范重构
const LiveManagement = () => {
    const { Row, Col, Card, Button, Space, Alert, Tag, Table, Modal, Form, Input, Select, message, Tabs, Statistic, Badge, Switch } = antd;
    const [activeTab, setActiveTab] = React.useState('channels');
    const [channelData, setChannelData] = React.useState({});
    const [liveData, setLiveData] = React.useState({});
    const [replayData, setReplayData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [form] = Form.useForm();

    React.useEffect(() => {
        loadLiveData();
    }, []);

    const loadLiveData = () => {
        setLoading(true);
        setTimeout(() => {
            // 频道管理数据
            setChannelData({
                channels: [
                    {
                        id: 'channel_001',
                        name: '展会直播频道',
                        description: '展会活动专用直播频道',
                        status: 'active',
                        liveCount: 15,
                        totalViews: 125634,
                        provider: '微赞',
                        created: '2024-01-10'
                    },
                    {
                        id: 'channel_002',
                        name: '技术分享频道',
                        description: '技术讲座和分享直播',
                        status: 'active',
                        liveCount: 8,
                        totalViews: 89245,
                        provider: '微赞',
                        created: '2024-01-15'
                    },
                    {
                        id: 'channel_003',
                        name: '协会活动频道',
                        description: '协会官方活动直播',
                        status: 'inactive',
                        liveCount: 3,
                        totalViews: 34567,
                        provider: '微赞',
                        created: '2024-02-01'
                    }
                ]
            });

            // 直播活动数据
            setLiveData({
                lives: [
                    {
                        id: 'live_001',
                        title: '城轨新技术发布会',
                        channel: '展会直播频道',
                        status: 'live',
                        startTime: '2024-01-15 14:00:00',
                        viewers: 2456,
                        peakViewers: 3421,
                        duration: '02:15:30',
                        provider: '微赞',
                        weizan_id: 'wz_live_12345'
                    },
                    {
                        id: 'live_002',
                        title: '智能调度系统介绍',
                        channel: '技术分享频道',
                        status: 'scheduled',
                        startTime: '2024-01-16 09:30:00',
                        viewers: 0,
                        peakViewers: 0,
                        duration: '00:00:00',
                        provider: '微赞',
                        weizan_id: 'wz_live_12346'
                    },
                    {
                        id: 'live_003',
                        title: '安全运营管理讲座',
                        channel: '协会活动频道',
                        status: 'ended',
                        startTime: '2024-01-14 10:00:00',
                        viewers: 0,
                        peakViewers: 1876,
                        duration: '01:45:20',
                        provider: '微赞',
                        weizan_id: 'wz_live_12347'
                    }
                ]
            });

            // 直播回放数据
            setReplayData({
                replays: [
                    {
                        id: 'replay_001',
                        title: '城轨技术峰会完整回放',
                        originalLive: '城轨新技术发布会',
                        duration: '02:15:30',
                        fileSize: '1.2GB',
                        quality: '1080P',
                        status: 'available',
                        views: 15634,
                        created: '2024-01-15 16:30:00',
                        provider: '微赞',
                        weizan_replay_id: 'wz_replay_98765'
                    },
                    {
                        id: 'replay_002',
                        title: '智能化运维系统分享',
                        originalLive: '技术分享会议',
                        duration: '01:30:45',
                        fileSize: '850MB',
                        quality: '720P',
                        status: 'processing',
                        views: 0,
                        created: '2024-01-14 11:45:00',
                        provider: '微赞',
                        weizan_replay_id: 'wz_replay_98766'
                    },
                    {
                        id: 'replay_003',
                        title: '协会年度总结大会',
                        originalLive: '协会年度会议',
                        duration: '03:20:15',
                        fileSize: '2.1GB',
                        quality: '1080P',
                        status: 'available',
                        views: 8923,
                        created: '2024-01-13 18:20:00',
                        provider: '微赞',
                        weizan_replay_id: 'wz_replay_98767'
                    }
                ]
            });

            setLoading(false);
        }, 800);
    };

    // 渲染频道管理
    const renderChannelManagement = () => {
        const channelColumns = [
            {
                title: '频道信息',
                dataIndex: 'name',
                width: 250,
                render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'name',
                        style: { fontWeight: 'bold', color: '#1890ff', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'desc',
                        style: { fontSize: '12px', color: '#666' }
                    }, record.description),
                    React.createElement('div', {
                        key: 'provider',
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' }
                    }, `服务商: ${record.provider}`)
                ])
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => React.createElement(Tag, {
                    color: status === 'active' ? 'green' : 'default'
                }, status === 'active' ? '启用' : '禁用')
            },
            {
                title: '直播数量',
                dataIndex: 'liveCount',
                width: 100,
                render: (count) => React.createElement('span', {
                    style: { fontWeight: 'bold', color: '#1890ff' }
                }, count)
            },
            {
                title: '总观看量',
                dataIndex: 'totalViews',
                width: 120,
                render: (views) => views.toLocaleString()
            },
            {
                title: '创建时间',
                dataIndex: 'created',
                width: 120
            },
            {
                title: '操作',
                width: 150,
                render: (_, record) => React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'edit',
                        size: 'small',
                        onClick: () => editChannel(record)
                    }, '编辑'),
                    React.createElement(Button, {
                        key: 'sync',
                        size: 'small',
                        type: 'primary',
                        onClick: () => syncWithWeizan(record)
                    }, '同步微赞')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '频道管理',
                description: '管理在APP中展示的直播频道列表，与微赞平台保持同步',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Card, {
                key: 'channel-table',
                title: '直播频道列表',
                extra: React.createElement(Space, {}, [
                    React.createElement(Button, {
                        onClick: () => setModalVisible(true)
                    }, '新增频道'),
                    React.createElement(Button, {
                        type: 'primary',
                        onClick: () => message.info('正在同步微赞数据...')
                    }, '批量同步')
                ])
            }, React.createElement(Table, {
                dataSource: channelData.channels?.map((item, index) => ({ ...item, key: index })) || [],
                columns: channelColumns,
                pagination: false,
                size: 'small'
            }))
        ]);
    };

    // 渲染直播管理
    const renderLiveManagement = () => {
        const liveColumns = [
            {
                title: '直播信息',
                dataIndex: 'title',
                width: 200,
                render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'title',
                        style: { fontWeight: 'bold', color: '#1890ff', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'channel',
                        style: { fontSize: '12px', color: '#666' }
                    }, `频道: ${record.channel}`),
                    React.createElement('div', {
                        key: 'weizan',
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' }
                    }, `微赞ID: ${record.weizan_id}`)
                ])
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => {
                    const statusConfig = {
                        live: { color: 'red', text: '直播中' },
                        scheduled: { color: 'orange', text: '即将开始' },
                        ended: { color: 'green', text: '已结束' }
                    };
                    const config = statusConfig[status] || { color: 'default', text: status };
                    return React.createElement(Tag, { color: config.color }, config.text);
                }
            },
            {
                title: '开播时间',
                dataIndex: 'startTime',
                width: 150
            },
            {
                title: '观看数据',
                dataIndex: 'viewers',
                width: 120,
                render: (viewers, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'current',
                        style: { fontSize: '14px', fontWeight: 'bold' }
                    }, `实时: ${viewers.toLocaleString()}`),
                    React.createElement('div', {
                        key: 'peak',
                        style: { fontSize: '12px', color: '#666' }
                    }, `峰值: ${record.peakViewers.toLocaleString()}`)
                ])
            },
            {
                title: '时长',
                dataIndex: 'duration',
                width: 100
            },
            {
                title: '操作',
                width: 180,
                render: (_, record) => React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'view',
                        size: 'small',
                        onClick: () => viewLiveDetail(record)
                    }, '查看'),
                    React.createElement(Button, {
                        key: 'sync',
                        size: 'small',
                        type: 'primary',
                        onClick: () => syncLiveStatus(record)
                    }, '同步状态'),
                    record.status === 'ended' && React.createElement(Button, {
                        key: 'replay',
                        size: 'small',
                        onClick: () => generateReplay(record)
                    }, '生成回放')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '直播活动管理',
                description: '管理特定频道下的直播活动，同步微赞平台的直播状态',
                type: 'success',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Card, {
                key: 'live-table',
                title: '直播活动列表',
                extra: React.createElement(Button, {
                    type: 'primary',
                    onClick: () => message.info('正在同步微赞直播数据...')
                }, '同步微赞数据')
            }, React.createElement(Table, {
                dataSource: liveData.lives?.map((item, index) => ({ ...item, key: index })) || [],
                columns: liveColumns,
                pagination: false,
                size: 'small'
            }))
        ]);
    };

    // 渲染回放管理
    const renderReplayManagement = () => {
        const replayColumns = [
            {
                title: '回放信息',
                dataIndex: 'title',
                width: 200,
                render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'title',
                        style: { fontWeight: 'bold', color: '#1890ff', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'original',
                        style: { fontSize: '12px', color: '#666' }
                    }, `原直播: ${record.originalLive}`),
                    React.createElement('div', {
                        key: 'weizan',
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' }
                    }, `微赞回放ID: ${record.weizan_replay_id}`)
                ])
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => {
                    const statusConfig = {
                        available: { color: 'green', text: '可播放' },
                        processing: { color: 'orange', text: '处理中' },
                        failed: { color: 'red', text: '处理失败' }
                    };
                    const config = statusConfig[status] || { color: 'default', text: status };
                    return React.createElement(Tag, { color: config.color }, config.text);
                }
            },
            {
                title: '时长',
                dataIndex: 'duration',
                width: 100
            },
            {
                title: '文件大小',
                dataIndex: 'fileSize',
                width: 100
            },
            {
                title: '画质',
                dataIndex: 'quality',
                width: 80
            },
            {
                title: '观看次数',
                dataIndex: 'views',
                width: 100,
                render: (views) => views.toLocaleString()
            },
            {
                title: '生成时间',
                dataIndex: 'created',
                width: 150
            },
            {
                title: '操作',
                width: 150,
                render: (_, record) => React.createElement(Space, {}, [
                    React.createElement(Button, {
                        key: 'play',
                        size: 'small',
                        type: 'primary',
                        disabled: record.status !== 'available',
                        onClick: () => playReplay(record)
                    }, '播放'),
                    React.createElement(Button, {
                        key: 'download',
                        size: 'small',
                        disabled: record.status !== 'available',
                        onClick: () => downloadReplay(record)
                    }, '下载')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '直播回放管理',
                description: '管理由微赞生成的直播回放视频，支持播放和下载',
                type: 'warning',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Card, {
                key: 'replay-table',
                title: '回放视频列表',
                extra: React.createElement(Button, {
                    onClick: () => message.info('正在同步微赞回放数据...')
                }, '同步回放')
            }, React.createElement(Table, {
                dataSource: replayData.replays?.map((item, index) => ({ ...item, key: index })) || [],
                columns: replayColumns,
                pagination: false,
                size: 'small'
            }))
        ]);
    };

    // 工具函数
    const editChannel = (channel) => {
        message.info(`编辑频道: ${channel.name}`);
    };

    const syncWithWeizan = (channel) => {
        message.loading('正在与微赞同步...', 2);
        setTimeout(() => {
            message.success('同步成功！');
        }, 2000);
    };

    const viewLiveDetail = (live) => {
        message.info(`查看直播详情: ${live.title}`);
    };

    const syncLiveStatus = (live) => {
        message.loading('正在同步直播状态...', 1.5);
        setTimeout(() => {
            message.success('状态同步成功！');
        }, 1500);
    };

    const generateReplay = (live) => {
        message.loading('正在生成回放...', 2);
        setTimeout(() => {
            message.success('回放生成成功！');
        }, 2000);
    };

    const playReplay = (replay) => {
        message.info(`播放回放: ${replay.title}`);
        // 这里可以跳转到微赞的播放页面
    };

    const downloadReplay = (replay) => {
        message.info(`下载回放: ${replay.title}`);
    };

    const tabItems = [
        {
            key: 'channels',
            label: '📺 频道管理',
            children: renderChannelManagement()
        },
        {
            key: 'lives',
            label: '🔴 直播管理',
            children: renderLiveManagement()
        },
        {
            key: 'replays',
            label: '📹 回放管理',
            children: renderReplayManagement()
        }
    ];

    return React.createElement('div', { className: 'live-management-page' }, [
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
            }, '直播管理'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'refresh',
                    onClick: loadLiveData
                }, '刷新数据'),
                React.createElement(Button, {
                    key: 'weizan',
                    type: 'primary',
                    onClick: () => window.open('https://www.vzan.com', '_blank')
                }, '访问微赞后台')
            ])
        ]),

        React.createElement(Tabs, {
            key: 'main-tabs',
            items: tabItems,
            defaultActiveKey: 'channels'
        }),

        // 新增频道模态框（简化版）
        React.createElement(Modal, {
            key: 'channel-modal',
            title: '新增直播频道',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            onOk: () => {
                message.success('频道创建成功！');
                setModalVisible(false);
            }
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical'
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                name: 'name',
                label: '频道名称',
                rules: [{ required: true, message: '请输入频道名称' }]
            }, React.createElement(Input, { placeholder: '请输入频道名称' })),
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '频道描述'
            }, React.createElement(Input.TextArea, { placeholder: '请输入频道描述' })),
            React.createElement(Form.Item, {
                key: 'provider',
                name: 'provider',
                label: '服务提供商',
                initialValue: '微赞'
            }, React.createElement(Select, {
                disabled: true,
                options: [{ value: '微赞', label: '微赞' }]
            }))
        ]))
    ]);
};

window.LiveManagement = LiveManagement; 