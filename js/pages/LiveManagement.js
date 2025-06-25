// 直播管理页面 - 基于新功能规范重构，保留完整的直播管理功能
const LiveManagement = () => {
    const { Row, Col, Card, Button, Space, Alert, Tag, Table, Modal, Form, Input, Select, message, Tabs, DatePicker, Upload, Radio, Switch, TimePicker } = antd;
    const [activeTab, setActiveTab] = React.useState('channels');
    const [channelData, setChannelData] = React.useState({});
    const [liveData, setLiveData] = React.useState({});
    const [replayData, setReplayData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [channelModalVisible, setChannelModalVisible] = React.useState(false);
    const [liveModalVisible, setLiveModalVisible] = React.useState(false);
    const [editingLive, setEditingLive] = React.useState(null);
    const [viewDetailModalVisible, setViewDetailModalVisible] = React.useState(false);
    const [selectedLive, setSelectedLive] = React.useState(null);
    const [channelForm] = Form.useForm();
    const [liveForm] = Form.useForm();

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
                        description: '介绍最新的城市轨道交通技术发展趋势',
                        presenter: '张工程师',
                        channel: '展会直播频道',
                        channelId: 'channel_001',
                        status: 'live',
                        startTime: '2024-01-15 14:00:00',
                        endTime: null,
                        viewers: 2456,
                        peakViewers: 3421,
                        duration: '02:15:30',
                        provider: '微赞',
                        weizan_id: 'wz_live_12345',
                        cover: 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live1',
                        liveType: 'live',
                        accessLevel: 'public',
                        enableComment: true,
                        autoRecord: true,
                        quality: '1080p'
                    },
                    {
                        id: 'live_002',
                        title: '智能调度系统介绍',
                        description: '深入解析智能调度系统的核心技术',
                        presenter: '李专家',
                        channel: '技术分享频道',
                        channelId: 'channel_002',
                        status: 'scheduled',
                        startTime: '2024-01-16 09:30:00',
                        endTime: null,
                        viewers: 0,
                        peakViewers: 0,
                        duration: '00:00:00',
                        provider: '微赞',
                        weizan_id: 'wz_live_12346',
                        cover: 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live2',
                liveType: 'live',
                        accessLevel: 'registered',
                enableComment: true,
                autoRecord: true,
                        quality: '1080p'
                    },
                    {
                        id: 'live_003',
                        title: '安全运营管理讲座',
                        description: '城市轨道交通安全运营管理的实践经验分享',
                        presenter: '王主任',
                        channel: '协会活动频道',
                        channelId: 'channel_003',
                        status: 'ended',
                        startTime: '2024-01-14 10:00:00',
                        endTime: '2024-01-14 11:45:20',
                        viewers: 0,
                        peakViewers: 1876,
                        duration: '01:45:20',
                        provider: '微赞',
                        weizan_id: 'wz_live_12347',
                        cover: 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live3',
                        liveType: 'live',
                accessLevel: 'public',
                        enableComment: true,
                        autoRecord: true,
                        quality: '720p'
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
                        originalLiveId: 'live_001',
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
                        originalLiveId: 'live_002',
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
                        originalLiveId: 'live_003',
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
                        onClick: () => setChannelModalVisible(true)
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
                width: 350,
                render: (text, record) => React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: 16 }
                }, [
                    React.createElement('img', {
                        key: 'cover',
                        src: record.cover,
                        alt: record.title,
                        style: { width: 120, height: 68, borderRadius: 8, objectFit: 'cover' }
                    }),
                    React.createElement('div', { key: 'info' }, [
                        React.createElement('div', {
                            key: 'title',
                            style: { fontWeight: 'bold', color: '#1890ff', marginBottom: '4px' }
                        }, text),
                        React.createElement('div', {
                            key: 'desc',
                            style: { fontSize: '12px', color: '#666', marginBottom: '4px' }
                        }, record.description),
                        React.createElement('div', {
                            key: 'presenter',
                            style: { fontSize: '12px', color: '#999' }
                        }, `主讲人: ${record.presenter}`),
                        React.createElement('div', {
                            key: 'weizan',
                            style: { fontSize: '12px', color: '#999' }
                        }, `微赞ID: ${record.weizan_id}`)
                    ])
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
                width: 250,
                render: (_, record) => React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'view',
                        size: 'small',
                        onClick: () => viewLiveDetail(record)
                    }, '查看'),
                    React.createElement(Button, {
                        key: 'edit',
                        size: 'small',
                        onClick: () => editLive(record)
                    }, '编辑'),
                    record.status === 'scheduled' && React.createElement(Button, {
                        key: 'start',
                        size: 'small',
                        type: 'primary',
                        onClick: () => startLive(record)
                    }, '开播'),
                    record.status === 'live' && React.createElement(Button, {
                        key: 'end',
                        size: 'small',
                        danger: true,
                        onClick: () => endLive(record)
                    }, '结束直播'),
                    record.status === 'ended' && React.createElement(Button, {
                        key: 'replay',
                        size: 'small',
                        onClick: () => generateReplay(record)
                    }, '生成回放'),
                    React.createElement(Button, {
                        key: 'sync',
                        size: 'small',
                        onClick: () => syncLiveStatus(record)
                    }, '同步状态')
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
                extra: React.createElement(Space, {}, [
                    React.createElement(Button, {
                        type: 'primary',
                        onClick: () => createNewLive()
                    }, '新建直播'),
                    React.createElement(Button, {
                        onClick: () => message.info('正在同步微赞直播数据...')
                    }, '同步微赞数据')
                ])
            }, React.createElement(Table, {
                dataSource: liveData.lives?.map((item, index) => ({ ...item, key: index })) || [],
                columns: liveColumns,
                pagination: { pageSize: 10 },
                size: 'small',
                scroll: { x: 1200 }
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

    // 新建直播
    const createNewLive = () => {
        setEditingLive(null);
        liveForm.resetFields();
        liveForm.setFieldsValue({
            liveType: 'live',
            enableComment: true,
            autoRecord: true,
            accessLevel: 'public',
            quality: '1080p'
        });
        setLiveModalVisible(true);
    };

    // 编辑直播
    const editLive = (live) => {
        setEditingLive(live);
        liveForm.setFieldsValue({
            ...live,
            scheduleTime: live.startTime ? window.moment(live.startTime) : null
        });
        setLiveModalVisible(true);
    };

    // 查看直播详情
    const viewLiveDetail = (live) => {
        setSelectedLive(live);
        setViewDetailModalVisible(true);
    };

    // 开始直播
    const startLive = (live) => {
        message.loading('正在开启直播...', 2);
        setTimeout(() => {
            // 更新直播状态
            setLiveData(prev => ({
                ...prev,
                lives: prev.lives.map(l => 
                    l.id === live.id 
                        ? { ...l, status: 'live', startTime: new Date().toISOString().slice(0, 19).replace('T', ' ') }
                        : l
                )
            }));
            message.success('直播已开始！');
        }, 2000);
    };

    // 结束直播
    const endLive = (live) => {
        message.loading('正在结束直播...', 2);
        setTimeout(() => {
            // 更新直播状态
            setLiveData(prev => ({
                ...prev,
                lives: prev.lives.map(l => 
                    l.id === live.id 
                        ? { ...l, status: 'ended', endTime: new Date().toISOString().slice(0, 19).replace('T', ' ') }
                        : l
                )
            }));
            message.success('直播已结束！');
        }, 2000);
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
    };

    const downloadReplay = (replay) => {
        message.info(`下载回放: ${replay.title}`);
    };

    // 处理直播表单提交
    const handleLiveSubmit = (values) => {
        const { scheduleTime, channelId, ...rest } = values;
        const selectedChannel = channelData.channels?.find(ch => ch.id === channelId);
        const processedValues = {
            ...rest,
            channelId,
            channel: selectedChannel?.name || '未知频道',
            startTime: scheduleTime ? scheduleTime.format('YYYY-MM-DD HH:mm:ss') : null,
        };

        message.loading('正在保存直播信息...', 2);
        setTimeout(() => {
            if (editingLive) {
                // 更新直播
                setLiveData(prev => ({
                    ...prev,
                    lives: prev.lives.map(l => 
                        l.id === editingLive.id 
                            ? { 
                                ...l, 
                                ...processedValues, 
                                weizan_id: l.weizan_id,
                                cover: l.cover || 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live'
                            }
                            : l
                    )
                }));
                message.success('直播信息更新成功！');
            } else {
                // 新建直播
                const newLive = {
                    ...processedValues,
                    id: `live_${Date.now()}`,
                    status: 'scheduled',
                    viewers: 0,
                    peakViewers: 0,
                    duration: '00:00:00',
                    provider: '微赞',
                    weizan_id: `wz_live_${Date.now()}`,
                    cover: 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live',
                    endTime: null
                };
                 setLiveData(prev => ({
                    ...prev,
                    lives: [newLive, ...prev.lives]
                }));
                message.success('直播创建成功！');
            }
            setLiveModalVisible(false);
            liveForm.resetFields();
        }, 2000);
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

        // 新增频道模态框
        React.createElement(Modal, {
            key: 'channel-modal',
            title: '新增直播频道',
            open: channelModalVisible,
            onCancel: () => setChannelModalVisible(false),
            onOk: () => {
                message.success('频道创建成功！');
                setChannelModalVisible(false);
            }
        }, React.createElement(Form, {
            form: channelForm,
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
        ])),

        // 新建/编辑直播模态框
        React.createElement(Modal, {
            key: 'live-modal',
            title: editingLive ? '编辑直播' : '新建直播',
            open: liveModalVisible,
            onCancel: () => {
                setLiveModalVisible(false);
                liveForm.resetFields();
            },
            onOk: () => liveForm.submit(),
            width: 800,
            okText: '保存',
            cancelText: '取消'
        }, React.createElement(Form, {
            form: liveForm,
            layout: 'vertical',
            onFinish: handleLiveSubmit
        }, [
            React.createElement(Tabs, { defaultActiveKey: '1' }, [
                React.createElement(Tabs.TabPane, { tab: '基本设置', key: '1' }, [
                    React.createElement(Row, { gutter: 24 }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '直播标题',
                                name: 'title',
                                rules: [{ required: true, message: '请输入直播标题' }]
                            }, React.createElement(Input, { placeholder: '请输入直播标题' }))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '主讲人',
                                name: 'presenter',
                                rules: [{ required: true, message: '请输入主讲人姓名' }]
                            }, React.createElement(Input, { placeholder: '请输入主讲人姓名' }))
                        ])
                    ]),
                    React.createElement(Form.Item, {
                        label: '直播简介',
                        name: 'description'
                    }, React.createElement(Input.TextArea, { rows: 2, placeholder: '介绍直播内容、主讲人等信息' })),
                    React.createElement(Row, { gutter: 24 }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '计划开播时间',
                                name: 'scheduleTime',
                                rules: [{ required: true, message: '请选择开播时间' }]
                            }, React.createElement(DatePicker, {
                                showTime: true,
                                style: { width: '100%' },
                                format: 'YYYY-MM-DD HH:mm'
                            }))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '所属频道',
                                name: 'channelId',
                                rules: [{ required: true, message: '请选择频道' }]
                            }, React.createElement(Select, {
                                placeholder: '请选择频道',
                                options: channelData.channels?.map(ch => ({
                                    value: ch.id,
                                    label: ch.name
                                })) || []
                            }))
                        ])
                    ]),
                    React.createElement(Form.Item, {
                        label: '直播封面',
                        name: 'coverUrl'
                    }, React.createElement(Upload, {
                        listType: 'picture',
                        maxCount: 1,
                        beforeUpload: () => false
                    }, React.createElement(Button, {}, '上传封面')))
                ]),
                React.createElement(Tabs.TabPane, { tab: '高级配置', key: '2' }, [
                    React.createElement(Row, { gutter: 24 }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '直播类型',
                                name: 'liveType'
                            }, React.createElement(Radio.Group, {}, [
                                React.createElement(Radio, { value: 'live' }, '📺 直播'),
                                React.createElement(Radio, { value: 'video' }, '🎬 录播')
                            ]))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: '观看权限',
                                name: 'accessLevel'
                            }, React.createElement(Select, {
                                options: [
                                    { value: 'public', label: '🌍 公开' },
                                    { value: 'registered', label: '👤 注册用户' },
                                    { value: 'vip', label: '⭐ VIP用户' },
                                    { value: 'private', label: '🔒 私有' }
                                ]
                            }))
                        ])
                    ]),
                    React.createElement(Row, { gutter: 24 }, [
                        React.createElement(Col, { span: 8 }, [
                            React.createElement(Form.Item, {
                                label: '开启评论',
                                name: 'enableComment',
                                valuePropName: 'checked'
                            }, React.createElement(Switch))
                        ]),
                        React.createElement(Col, { span: 8 }, [
                            React.createElement(Form.Item, {
                                label: '自动录制',
                                name: 'autoRecord',
                                valuePropName: 'checked'
                            }, React.createElement(Switch))
                        ]),
                        React.createElement(Col, { span: 8 }, [
                            React.createElement(Form.Item, {
                                label: '画质设置',
                                name: 'quality'
                            }, React.createElement(Select, {
                                options: [
                                    { value: '720p', label: '720P 高清' },
                                    { value: '1080p', label: '1080P 超清' },
                                    { value: '4k', label: '4K 超高清' }
                                ]
                            }))
                        ])
                    ])
                ])
            ])
        ])),

        // 查看直播详情模态框
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '直播详情',
            open: viewDetailModalVisible,
            onCancel: () => setViewDetailModalVisible(false),
            footer: null,
            width: 600
        }, selectedLive && React.createElement('div', {}, [
            React.createElement('img', {
                key: 'cover',
                src: selectedLive.cover,
                alt: selectedLive.title,
                style: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }
            }),
            React.createElement('h3', { key: 'title' }, selectedLive.title),
            React.createElement('p', { key: 'desc' }, selectedLive.description),
            React.createElement('div', { key: 'info' }, [
                React.createElement('p', { key: 'presenter' }, `主讲人: ${selectedLive.presenter}`),
                React.createElement('p', { key: 'channel' }, `频道: ${selectedLive.channel}`),
                React.createElement('p', { key: 'time' }, `开播时间: ${selectedLive.startTime}`),
                React.createElement('p', { key: 'viewers' }, `观看数据: 实时${selectedLive.viewers} / 峰值${selectedLive.peakViewers}`)
            ])
        ]))
    ]);
};

window.LiveManagement = LiveManagement; 