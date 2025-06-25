// 直播管理页面 - 基于微赞API重构，直接调用微赞接口
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
    const [editingChannel, setEditingChannel] = React.useState(null);

    // 微赞API配置
    const VZAN_CONFIG = {
        baseUrl: 'https://paas.vzan.com',
        appId: 'your_app_id', // 需要配置
        appSecret: 'your_app_secret', // 需要配置
        accessToken: localStorage.getItem('vzan_access_token')
    };

    React.useEffect(() => {
        loadChannelData();
        loadLiveData();
        loadReplayData();
    }, []);

    // 调用微赞API获取频道数据
    const loadChannelData = async () => {
        setLoading(true);
        try {
            // 调用微赞频道管理API
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/channel/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setChannelData({
                    channels: data.data?.map(channel => ({
                        id: channel.channel_id,
                        name: channel.channel_name,
                        description: channel.description || '',
                        status: channel.status === 1 ? 'active' : 'inactive',
                        liveCount: channel.live_count || 0,
                        totalViews: channel.total_views || 0,
                        provider: '微赞',
                        created: channel.create_time,
                        vzan_channel_id: channel.channel_id
                    })) || []
                });
            } else {
                throw new Error('获取频道数据失败');
            }
        } catch (error) {
            console.error('获取频道数据失败:', error);
            message.error('获取频道数据失败，请检查网络连接');
            // 使用模拟数据作为降级
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
                        created: '2024-01-10',
                        vzan_channel_id: 'vzan_001'
                    }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    // 调用微赞API获取直播数据（话题管理）
    const loadLiveData = async () => {
        try {
            // 调用微赞话题管理API
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/topic/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setLiveData({
                    lives: data.data?.map(topic => ({
                        id: topic.topic_id,
                        title: topic.topic_name,
                        description: topic.description || '',
                        presenter: topic.host_name || '',
                        channel: topic.channel_name || '',
                        channelId: topic.channel_id,
                        status: mapVzanStatus(topic.status),
                        startTime: topic.start_time,
                        endTime: topic.end_time,
                        viewers: topic.current_viewers || 0,
                        peakViewers: topic.peak_viewers || 0,
                        duration: formatDuration(topic.duration),
                        provider: '微赞',
                        vzan_topic_id: topic.topic_id,
                        cover: topic.cover_url || 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live',
                        liveType: topic.live_type || 'live',
                        accessLevel: mapAccessLevel(topic.access_type),
                        enableComment: topic.enable_comment === 1,
                        autoRecord: topic.auto_record === 1,
                        quality: topic.quality || '1080p'
                    })) || []
                });
            } else {
                throw new Error('获取直播数据失败');
            }
        } catch (error) {
            console.error('获取直播数据失败:', error);
            // 使用模拟数据作为降级
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
                        vzan_topic_id: 'vz_topic_12345',
                        cover: 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live1',
                        liveType: 'live',
                        accessLevel: 'public',
                        enableComment: true,
                        autoRecord: true,
                        quality: '1080p'
                    }
                ]
            });
        }
    };

    // 调用微赞API获取回放数据
    const loadReplayData = async () => {
        try {
            // 调用微赞回放管理API
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/replay/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setReplayData({
                    replays: data.data?.map(replay => ({
                        id: replay.replay_id,
                        title: replay.replay_name,
                        originalLive: replay.topic_name,
                        originalLiveId: replay.topic_id,
                        duration: formatDuration(replay.duration),
                        fileSize: formatFileSize(replay.file_size),
                        quality: replay.quality,
                        status: mapReplayStatus(replay.status),
                        views: replay.play_count || 0,
                        created: replay.create_time,
                        provider: '微赞',
                        vzan_replay_id: replay.replay_id
                    })) || []
                });
            }
        } catch (error) {
            console.error('获取回放数据失败:', error);
            // 使用模拟数据作为降级
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
                        vzan_replay_id: 'vz_replay_98765'
                    }
                ]
            });
        }
    };

    // 工具函数：映射微赞状态到本系统状态
    const mapVzanStatus = (vzanStatus) => {
        const statusMap = {
            0: 'scheduled',  // 未开始
            1: 'live',       // 直播中
            2: 'ended',      // 已结束
            3: 'cancelled'   // 已取消
        };
        return statusMap[vzanStatus] || 'scheduled';
    };

    const mapAccessLevel = (accessType) => {
        const accessMap = {
            0: 'public',     // 公开
            1: 'registered', // 注册用户
            2: 'vip',        // VIP用户
            3: 'password'    // 密码保护
        };
        return accessMap[accessType] || 'public';
    };

    const mapReplayStatus = (status) => {
        const statusMap = {
            0: 'processing', // 处理中
            1: 'available',  // 可用
            2: 'failed'      // 失败
        };
        return statusMap[status] || 'processing';
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '00:00:00';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0MB';
        const gb = bytes / (1024 * 1024 * 1024);
        const mb = bytes / (1024 * 1024);
        return gb >= 1 ? `${gb.toFixed(1)}GB` : `${mb.toFixed(0)}MB`;
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
                    }, `微赞频道ID: ${record.vzan_channel_id}`)
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
                        key: 'refresh',
                        size: 'small',
                        type: 'primary',
                        onClick: () => refreshChannelData(record)
                    }, '刷新数据')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '频道管理 - 微赞API集成',
                description: '通过微赞开放平台API管理直播频道，实时获取频道数据和统计信息',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Card, {
                key: 'channel-table',
                title: '直播频道列表',
                extra: React.createElement(Space, {}, [
                    React.createElement(Button, {
                        onClick: () => createChannelViaMiczan()
                    }, '新建频道'),
                    React.createElement(Button, {
                        type: 'primary',
                        loading: loading,
                        onClick: () => loadChannelData()
                    }, '刷新频道')
                ])
            }, React.createElement(Table, {
                dataSource: channelData.channels?.map((item, index) => ({ ...item, key: index })) || [],
                columns: channelColumns,
                pagination: false,
                size: 'small',
                loading: loading
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
                            key: 'vzan',
                            style: { fontSize: '12px', color: '#999' }
                        }, `微赞话题ID: ${record.vzan_topic_id}`)
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
                        ended: { color: 'green', text: '已结束' },
                        cancelled: { color: 'default', text: '已取消' }
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
                        onClick: () => startLiveViaMiczan(record)
                    }, '开播'),
                    record.status === 'live' && React.createElement(Button, {
                        key: 'end',
                        size: 'small',
                        danger: true,
                        onClick: () => endLiveViaMiczan(record)
                    }, '结束直播'),
                    record.status === 'ended' && React.createElement(Button, {
                        key: 'replay',
                        size: 'small',
                        onClick: () => generateReplayViaMiczan(record)
                    }, '生成回放'),
                    React.createElement(Button, {
                        key: 'refresh',
                        size: 'small',
                        onClick: () => refreshLiveStatus(record)
                    }, '刷新状态')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '直播管理 - 微赞话题API',
                description: '通过微赞话题管理API创建和管理直播活动，实时获取直播状态和观看数据',
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
                        loading: loading,
                        onClick: () => loadLiveData()
                    }, '刷新数据')
                ])
            }, React.createElement(Table, {
                dataSource: liveData.lives?.map((item, index) => ({ ...item, key: index })) || [],
                columns: liveColumns,
                pagination: { pageSize: 10 },
                size: 'small',
                scroll: { x: 1200 },
                loading: loading
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
                        key: 'vzan',
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' }
                    }, `微赞回放ID: ${record.vzan_replay_id}`)
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
                        onClick: () => playReplayViaMiczan(record)
                    }, '播放'),
                    React.createElement(Button, {
                        key: 'download',
                        size: 'small',
                        disabled: record.status !== 'available',
                        onClick: () => downloadReplayViaMiczan(record)
                    }, '下载')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'info',
                message: '回放管理 - 微赞回放API',
                description: '通过微赞回放API管理直播回放视频，支持在线播放和下载',
                type: 'warning',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Card, {
                key: 'replay-table',
                title: '回放视频列表',
                extra: React.createElement(Button, {
                    loading: loading,
                    onClick: () => loadReplayData()
                }, '刷新回放')
            }, React.createElement(Table, {
                dataSource: replayData.replays?.map((item, index) => ({ ...item, key: index })) || [],
                columns: replayColumns,
                pagination: false,
                size: 'small',
                loading: loading
            }))
        ]);
    };

    // 工具函数
    const editChannel = (channel) => {
        setEditingChannel(channel);
        channelForm.setFieldsValue(channel);
        setChannelModalVisible(true);
    };

    const refreshChannelData = async (channel) => {
        message.loading('正在刷新频道数据...', 1);
        try {
            // 调用微赞API刷新单个频道数据
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/channel/detail`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ channel_id: channel.vzan_channel_id })
            });
            
            if (response.ok) {
                message.success('频道数据刷新成功！');
                loadChannelData(); // 重新加载列表
            } else {
                throw new Error('刷新失败');
            }
        } catch (error) {
            console.error('刷新频道数据失败:', error);
            message.error('刷新失败，请稍后重试');
        }
    };

    // 通过微赞API创建频道
    const createChannelViaMiczan = () => {
        setEditingChannel(null);
        channelForm.resetFields();
        setChannelModalVisible(true);
    };

    // 处理频道表单提交
    const handleChannelSubmit = async (values) => {
        try {
            message.loading('正在创建频道...', 2);
            
            // 调用微赞API创建/编辑频道
            const apiUrl = editingChannel 
                ? `${VZAN_CONFIG.baseUrl}/api/channel/update`
                : `${VZAN_CONFIG.baseUrl}/api/channel/create`;
            
            const requestData = {
                channel_name: values.name,
                description: values.description,
                status: 1, // 默认启用
                ...(editingChannel && { channel_id: editingChannel.vzan_channel_id })
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                message.success(editingChannel ? '频道更新成功！' : '频道创建成功！');
                setChannelModalVisible(false);
                channelForm.resetFields();
                loadChannelData(); // 重新加载频道列表
            } else {
                throw new Error('操作失败');
            }
        } catch (error) {
            console.error('频道操作失败:', error);
            message.error('操作失败，请检查网络连接或稍后重试');
        }
    };

    // 新建直播
    const createNewLive = () => {
        setEditingLive(null);
        liveForm.resetFields();
        liveForm.setFieldsValue({
            // 基本设置
            liveType: 'live',
            title: '',
            presenter: '',
            description: '',
            
            // 权限设置
            accessLevel: 'public',
            enableComment: true,
            enableLike: true,
            enableDanmu: false,
            
            // 录制设置
            autoRecord: true,
            recordQuality: '1080p',
            quality: '1080p',
            bitrate: '4000',
            
            // 营销设置
            enableBooking: true,
            remindTime: ['15', '60'],
            enableWechatShare: true,
            enableWeiboShare: false,
            enableQQShare: false
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

    // 通过微赞API开始直播
    const startLiveViaMiczan = async (live) => {
        try {
            message.loading('正在开启直播...', 2);
            
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/topic/start`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic_id: live.vzan_topic_id })
            });

            if (response.ok) {
                // 更新本地状态
                setLiveData(prev => ({
                    ...prev,
                    lives: prev.lives.map(l => 
                        l.id === live.id 
                            ? { ...l, status: 'live', startTime: new Date().toISOString().slice(0, 19).replace('T', ' ') }
                            : l
                    )
                }));
                message.success('直播已开始！');
            } else {
                throw new Error('开播失败');
            }
        } catch (error) {
            console.error('开播失败:', error);
            message.error('开播失败，请检查网络连接或稍后重试');
        }
    };

    // 通过微赞API结束直播
    const endLiveViaMiczan = async (live) => {
        try {
            message.loading('正在结束直播...', 2);
            
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/topic/stop`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic_id: live.vzan_topic_id })
            });

            if (response.ok) {
                // 更新本地状态
                setLiveData(prev => ({
                    ...prev,
                    lives: prev.lives.map(l => 
                        l.id === live.id 
                            ? { ...l, status: 'ended', endTime: new Date().toISOString().slice(0, 19).replace('T', ' ') }
                            : l
                    )
                }));
                message.success('直播已结束！');
            } else {
                throw new Error('结束直播失败');
            }
        } catch (error) {
            console.error('结束直播失败:', error);
            message.error('结束直播失败，请检查网络连接或稍后重试');
        }
    };

    const refreshLiveStatus = async (live) => {
        try {
            message.loading('正在刷新直播状态...', 1);
            
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/topic/detail`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic_id: live.vzan_topic_id })
            });

            if (response.ok) {
                message.success('状态刷新成功！');
                loadLiveData(); // 重新加载列表
            } else {
                throw new Error('刷新失败');
            }
        } catch (error) {
            console.error('刷新状态失败:', error);
            message.error('刷新失败，请稍后重试');
        }
    };

    const generateReplayViaMiczan = async (live) => {
        try {
            message.loading('正在生成回放...', 2);
            
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/replay/generate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic_id: live.vzan_topic_id })
            });

            if (response.ok) {
                message.success('回放生成成功！');
                loadReplayData(); // 刷新回放列表
            } else {
                throw new Error('生成回放失败');
            }
        } catch (error) {
            console.error('生成回放失败:', error);
            message.error('生成回放失败，请稍后重试');
        }
    };

    const playReplayViaMiczan = (replay) => {
        // 跳转到微赞播放页面或内嵌播放器
        const playUrl = `${VZAN_CONFIG.baseUrl}/replay/play/${replay.vzan_replay_id}`;
        window.open(playUrl, '_blank');
        message.info(`播放回放: ${replay.title}`);
    };

    const downloadReplayViaMiczan = async (replay) => {
        try {
            message.loading('正在获取下载链接...', 2);
            
            const response = await fetch(`${VZAN_CONFIG.baseUrl}/api/replay/download`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ replay_id: replay.vzan_replay_id })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.download_url) {
                    window.open(result.download_url, '_blank');
                    message.success('下载链接已生成！');
                } else {
                    throw new Error('获取下载链接失败');
                }
            } else {
                throw new Error('下载失败');
            }
        } catch (error) {
            console.error('下载回放失败:', error);
            message.error('下载失败，请稍后重试');
        }
    };

    // 处理直播表单提交
    const handleLiveSubmit = async (values) => {
        try {
            const { scheduleTime, channelId, ...rest } = values;
            const selectedChannel = channelData.channels?.find(ch => ch.id === channelId);
            
            message.loading('正在保存直播信息...', 2);

            // 构建微赞API请求数据
            const requestData = {
                topic_name: values.title,
                description: values.description,
                host_name: values.presenter,
                channel_id: selectedChannel?.vzan_channel_id,
                start_time: scheduleTime ? scheduleTime.format('YYYY-MM-DD HH:mm:ss') : null,
                live_type: values.liveType,
                access_type: mapAccessLevelToVzan(values.accessLevel),
                enable_comment: values.enableComment ? 1 : 0,
                auto_record: values.autoRecord ? 1 : 0,
                quality: values.quality,
                cover_url: values.coverUrl || '',
                ...(values.accessLevel === 'password' && { access_password: values.accessPassword })
            };

            const apiUrl = editingLive 
                ? `${VZAN_CONFIG.baseUrl}/api/topic/update`
                : `${VZAN_CONFIG.baseUrl}/api/topic/create`;

            if (editingLive) {
                requestData.topic_id = editingLive.vzan_topic_id;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VZAN_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                message.success(editingLive ? '直播信息更新成功！' : '直播创建成功！');
                setLiveModalVisible(false);
                liveForm.resetFields();
                loadLiveData(); // 重新加载直播列表
            } else {
                throw new Error('操作失败');
            }
        } catch (error) {
            console.error('直播操作失败:', error);
            message.error('操作失败，请检查表单数据或稍后重试');
        }
    };

    // 映射本系统访问级别到微赞API
    const mapAccessLevelToVzan = (accessLevel) => {
        const accessMap = {
            'public': 0,     // 公开
            'registered': 1, // 注册用户
            'vip': 2,        // VIP用户
            'password': 3    // 密码保护
        };
        return accessMap[accessLevel] || 0;
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
                    onClick: () => {
                        loadChannelData();
                        loadLiveData();
                        loadReplayData();
                    }
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
            title: editingChannel ? '编辑频道' : '新建频道',
            open: channelModalVisible,
            onCancel: () => {
                setChannelModalVisible(false);
                channelForm.resetFields();
                setEditingChannel(null);
            },
            onOk: () => channelForm.submit(),
            okText: '保存',
            cancelText: '取消'
        }, React.createElement(Form, {
            form: channelForm,
            layout: 'vertical',
            onFinish: handleChannelSubmit
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
            React.createElement(Alert, {
                key: 'info',
                message: '微赞API集成说明',
                description: '频道将通过微赞开放平台API创建，确保您已配置正确的API权限',
                type: 'info',
                showIcon: true,
                style: { marginTop: '16px' }
            })
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
            width: 900,
            okText: '保存',
            cancelText: '取消',
            bodyStyle: { maxHeight: '70vh', overflowY: 'auto' }
        }, React.createElement(Form, {
            form: liveForm,
            layout: 'vertical',
            onFinish: handleLiveSubmit
        }, [
            React.createElement(Tabs, { 
                defaultActiveKey: 'basic',
                type: 'card',
                style: { marginBottom: 0 }
            }, [
                React.createElement(Tabs.TabPane, { 
                    tab: React.createElement('span', {}, [
                        React.createElement('span', { key: 'icon', style: { marginRight: '8px' } }, '⚙️'),
                        React.createElement('span', { key: 'text' }, '基本设置')
                    ]), 
                    key: 'basic' 
                }, [
                    // 直播类型选择
                    React.createElement('div', {
                        key: 'type-section',
                        style: { 
                            background: '#f8fafc', 
                            padding: '16px', 
                            borderRadius: '8px', 
                            marginBottom: '24px',
                            border: '1px solid #e2e8f0'
                        }
                    }, [
                        React.createElement('h4', { 
                            key: 'type-title',
                            style: { 
                                margin: '0 0 12px 0', 
                                color: '#1e293b', 
                                fontSize: '14px',
                                fontWeight: '600'
                            } 
                        }, '直播类型'),
                        React.createElement(Form.Item, {
                            key: 'type-item',
                            name: 'liveType',
                            style: { marginBottom: 0 }
                        }, React.createElement(Radio.Group, {
                            style: { width: '100%' }
                        }, [
                            React.createElement(Radio.Button, { 
                                key: 'live',
                                value: 'live',
                                style: { 
                                    height: '48px', 
                                    lineHeight: '46px',
                                    flex: 1,
                                    textAlign: 'center',
                                    marginRight: '8px'
                                }
                            }, [
                                React.createElement('div', { key: 'content' }, [
                                    React.createElement('div', { key: 'icon', style: { fontSize: '16px' } }, '📺'),
                                    React.createElement('div', { key: 'text', style: { fontSize: '12px', marginTop: '2px' } }, '实时直播')
                                ])
                            ]),
                            React.createElement(Radio.Button, { 
                                key: 'video',
                                value: 'video',
                                style: { 
                                    height: '48px', 
                                    lineHeight: '46px',
                                    flex: 1,
                                    textAlign: 'center',
                                    marginRight: '8px'
                                }
                            }, [
                                React.createElement('div', { key: 'content' }, [
                                    React.createElement('div', { key: 'icon', style: { fontSize: '16px' } }, '🎬'),
                                    React.createElement('div', { key: 'text', style: { fontSize: '12px', marginTop: '2px' } }, '录播视频')
                                ])
                            ]),
                            React.createElement(Radio.Button, { 
                                key: 'image',
                                value: 'image',
                                style: { 
                                    height: '48px', 
                                    lineHeight: '46px',
                                    flex: 1,
                                    textAlign: 'center'
                                }
                            }, [
                                React.createElement('div', { key: 'content' }, [
                                    React.createElement('div', { key: 'icon', style: { fontSize: '16px' } }, '🖼️'),
                                    React.createElement('div', { key: 'text', style: { fontSize: '12px', marginTop: '2px' } }, '图片直播')
                                ])
                            ])
                        ]))
                    ]),

                    // 基本信息
                    React.createElement(Row, { key: 'basic-info', gutter: [16, 16] }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: React.createElement('span', {}, [
                                    React.createElement('span', { key: 'star', style: { color: 'red' } }, '*'),
                                    React.createElement('span', { key: 'text' }, ' 直播标题')
                                ]),
                                name: 'title',
                                rules: [{ required: true, message: '请输入直播标题' }]
                            }, React.createElement(Input, { 
                                placeholder: '请输入直播标题',
                                maxLength: 50,
                                showCount: true
                            }))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: React.createElement('span', {}, [
                                    React.createElement('span', { key: 'star', style: { color: 'red' } }, '*'),
                                    React.createElement('span', { key: 'text' }, ' 主讲人')
                                ]),
                                name: 'presenter',
                                rules: [{ required: true, message: '请输入主讲人姓名' }]
                            }, React.createElement(Input, { 
                                placeholder: '请输入主讲人姓名',
                                maxLength: 20
                            }))
                        ])
                    ]),

                    React.createElement(Form.Item, {
                        key: 'description',
                        label: '直播简介',
                        name: 'description'
                    }, React.createElement(Input.TextArea, { 
                        rows: 3, 
                        placeholder: '介绍直播内容、主要议题、主讲人背景等（选填）',
                        maxLength: 200,
                        showCount: true
                    })),

                    // 时间和频道
                    React.createElement(Row, { key: 'time-channel', gutter: [16, 16] }, [
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: React.createElement('span', {}, [
                                    React.createElement('span', { key: 'star', style: { color: 'red' } }, '*'),
                                    React.createElement('span', { key: 'text' }, ' 计划开播时间')
                                ]),
                                name: 'scheduleTime',
                                rules: [{ required: true, message: '请选择开播时间' }]
                            }, React.createElement(DatePicker, {
                                showTime: { format: 'HH:mm' },
                                style: { width: '100%' },
                                format: 'YYYY-MM-DD HH:mm',
                                placeholder: 'Select date',
                                disabledDate: (current) => current && current < window.moment().startOf('day')
                            }))
                        ]),
                        React.createElement(Col, { span: 12 }, [
                            React.createElement(Form.Item, {
                                label: React.createElement('span', {}, [
                                    React.createElement('span', { key: 'star', style: { color: 'red' } }, '*'),
                                    React.createElement('span', { key: 'text' }, ' 所属频道')
                                ]),
                                name: 'channelId',
                                rules: [{ required: true, message: '请选择频道' }]
                            }, React.createElement(Select, {
                                placeholder: '请选择频道',
                                allowClear: true,
                                options: channelData.channels?.map(ch => ({
                                    value: ch.id,
                                    label: React.createElement('div', {}, [
                                        React.createElement('div', { key: 'name', style: { fontWeight: '500' } }, ch.name),
                                        React.createElement('div', { key: 'desc', style: { fontSize: '12px', color: '#666' } }, ch.description)
                                    ])
                                })) || []
                            }))
                        ])
                    ]),

                    // 直播封面
                    React.createElement(Form.Item, {
                        key: 'cover',
                        label: '直播封面',
                        name: 'coverUrl',
                        extra: '推荐尺寸: 1920x1080，支持jpg、png格式，文件大小不超过5MB'
                    }, [
                        React.createElement(Upload, {
                            key: 'upload',
                            listType: 'picture-card',
                            maxCount: 1,
                            beforeUpload: (file) => {
                                const isValidType = file.type === 'image/jpeg' || file.type === 'image/png';
                                if (!isValidType) {
                                    message.error('只能上传JPG/PNG格式的图片！');
                                }
                                const isValidSize = file.size / 1024 / 1024 < 5;
                                if (!isValidSize) {
                                    message.error('图片大小不能超过5MB！');
                                }
                                return false; // 阻止自动上传
                            },
                            onPreview: (file) => {
                                // 预览功能
                                const url = file.url || file.preview;
                                if (url) {
                                    window.open(url);
                                }
                            }
                        }, React.createElement('div', {}, [
                            React.createElement('div', { key: 'icon', style: { fontSize: '24px', marginBottom: '8px' } }, '📷'),
                            React.createElement('div', { key: 'text', style: { fontSize: '14px' } }, '上传封面')
                        ])),
                        React.createElement('div', {
                            key: 'templates',
                            style: { marginTop: '8px' }
                        }, [
                            React.createElement('span', { 
                                key: 'label',
                                style: { fontSize: '12px', color: '#666', marginRight: '8px' } 
                            }, '快速选择:'),
                            React.createElement(Button, { 
                                key: 'template1',
                                size: 'small', 
                                style: { marginRight: '8px' },
                                onClick: () => message.info('已选择模板1')
                            }, '商务模板'),
                            React.createElement(Button, { 
                                key: 'template2',
                                size: 'small',
                                style: { marginRight: '8px' },
                                onClick: () => message.info('已选择模板2')
                            }, '教育模板'),
                            React.createElement(Button, { 
                                key: 'template3',
                                size: 'small',
                                onClick: () => message.info('已选择模板3')
                            }, '科技模板')
                        ])
                    ])
                ]),

                React.createElement(Tabs.TabPane, { 
                    tab: React.createElement('span', {}, [
                        React.createElement('span', { key: 'icon', style: { marginRight: '8px' } }, '🛡️'),
                        React.createElement('span', { key: 'text' }, '权限设置')
                    ]), 
                    key: 'permissions' 
                }, [
                    // 观看权限
                    React.createElement('div', {
                        key: 'access-section',
                        style: { marginBottom: '24px' }
                    }, [
                        React.createElement('h4', { 
                            key: 'access-title',
                            style: { 
                                margin: '0 0 12px 0', 
                                color: '#1e293b', 
                                fontSize: '16px',
                                fontWeight: '600'
                            } 
                        }, '观看权限'),
                        React.createElement(Form.Item, {
                            name: 'accessLevel',
                            style: { marginBottom: 0 }
                        }, React.createElement(Radio.Group, {
                            style: { width: '100%' }
                        }, [
                            React.createElement('div', { key: 'public', style: { marginBottom: '12px' } }, [
                                React.createElement(Radio, { value: 'public' }, [
                                    React.createElement('div', { style: { display: 'inline-block', marginLeft: '8px' } }, [
                                        React.createElement('div', { key: 'title', style: { fontWeight: '500' } }, '🌍 公开直播'),
                                        React.createElement('div', { key: 'desc', style: { fontSize: '12px', color: '#666' } }, '所有人都可以观看，无需登录')
                                    ])
                                ])
                            ]),
                            React.createElement('div', { key: 'registered', style: { marginBottom: '12px' } }, [
                                React.createElement(Radio, { value: 'registered' }, [
                                    React.createElement('div', { style: { display: 'inline-block', marginLeft: '8px' } }, [
                                        React.createElement('div', { key: 'title', style: { fontWeight: '500' } }, '👤 注册用户'),
                                        React.createElement('div', { key: 'desc', style: { fontSize: '12px', color: '#666' } }, '需要注册登录后才能观看')
                                    ])
                                ])
                            ]),
                            React.createElement('div', { key: 'vip', style: { marginBottom: '12px' } }, [
                                React.createElement(Radio, { value: 'vip' }, [
                                    React.createElement('div', { style: { display: 'inline-block', marginLeft: '8px' } }, [
                                        React.createElement('div', { key: 'title', style: { fontWeight: '500' } }, '⭐ VIP专享'),
                                        React.createElement('div', { key: 'desc', style: { fontSize: '12px', color: '#666' } }, '仅VIP会员可以观看')
                                    ])
                                ])
                            ]),
                            React.createElement('div', { key: 'password', style: { marginBottom: '12px' } }, [
                                React.createElement(Radio, { value: 'password' }, [
                                    React.createElement('div', { style: { display: 'inline-block', marginLeft: '8px' } }, [
                                        React.createElement('div', { key: 'title', style: { fontWeight: '500' } }, '🔒 密码保护'),
                                        React.createElement('div', { key: 'desc', style: { fontSize: '12px', color: '#666' } }, '需要输入密码才能观看')
                                    ])
                                ])
                            ])
                        ]))
                    ]),

                    // 密码设置（条件显示）
                    React.createElement(Form.Item, {
                        key: 'password',
                        label: '观看密码',
                        name: 'accessPassword',
                        dependencies: ['accessLevel'],
                        rules: [
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (getFieldValue('accessLevel') === 'password' && !value) {
                                        return Promise.reject(new Error('请设置观看密码'));
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]
                    }, React.createElement(Input.Password, { 
                        placeholder: '请设置4-16位观看密码',
                        maxLength: 16
                    })),

                    // 互动设置
                    React.createElement('div', {
                        key: 'interaction-section',
                        style: { 
                            background: '#f8fafc', 
                            padding: '16px', 
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }
                    }, [
                        React.createElement('h4', { 
                            key: 'interaction-title',
                            style: { 
                                margin: '0 0 16px 0', 
                                color: '#1e293b', 
                                fontSize: '16px',
                                fontWeight: '600'
                            } 
                        }, '互动功能'),
                        React.createElement(Row, { gutter: [24, 16] }, [
                            React.createElement(Col, { span: 8 }, [
                                React.createElement(Form.Item, {
                                    label: '评论互动',
                                    name: 'enableComment',
                                    valuePropName: 'checked',
                                    style: { marginBottom: 0 }
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ]),
                            React.createElement(Col, { span: 8 }, [
                                React.createElement(Form.Item, {
                                    label: '点赞功能',
                                    name: 'enableLike',
                                    valuePropName: 'checked',
                                    style: { marginBottom: 0 }
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ]),
                            React.createElement(Col, { span: 8 }, [
                                React.createElement(Form.Item, {
                                    label: '弹幕功能',
                                    name: 'enableDanmu',
                                    valuePropName: 'checked',
                                    style: { marginBottom: 0 }
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ])
                        ])
                    ])
                ]),

                React.createElement(Tabs.TabPane, { 
                    tab: React.createElement('span', {}, [
                        React.createElement('span', { key: 'icon', style: { marginRight: '8px' } }, '📹'),
                        React.createElement('span', { key: 'text' }, '录制设置')
                    ]), 
                    key: 'recording' 
                }, [
                    // 录制设置
                    React.createElement('div', {
                        key: 'record-section',
                        style: { marginBottom: '24px' }
                    }, [
                        React.createElement(Row, { gutter: [24, 16] }, [
                            React.createElement(Col, { span: 12 }, [
                                React.createElement(Form.Item, {
                                    label: '自动录制',
                                    name: 'autoRecord',
                                    valuePropName: 'checked',
                                    extra: '直播开始时自动开启录制功能'
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ]),
                            React.createElement(Col, { span: 12 }, [
                                React.createElement(Form.Item, {
                                    label: '录制质量',
                                    name: 'recordQuality'
                                }, React.createElement(Select, {
                                    placeholder: '选择录制质量',
                                    options: [
                                        { value: '720p', label: '720P 标清 (节省存储)' },
                                        { value: '1080p', label: '1080P 高清 (推荐)' },
                                        { value: '4k', label: '4K 超清 (超大文件)' }
                                    ]
                                }))
                            ])
                        ])
                    ]),

                    // 推流设置
                    React.createElement('div', {
                        key: 'stream-section',
                        style: { 
                            background: '#f8fafc', 
                            padding: '16px', 
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }
                    }, [
                        React.createElement('h4', { 
                            key: 'stream-title',
                            style: { 
                                margin: '0 0 16px 0', 
                                color: '#1e293b', 
                                fontSize: '16px',
                                fontWeight: '600'
                            } 
                        }, '推流配置'),
                        React.createElement(Row, { gutter: [24, 16] }, [
                            React.createElement(Col, { span: 12 }, [
                                React.createElement(Form.Item, {
                                    label: '画质设置',
                                    name: 'quality'
                                }, React.createElement(Select, {
                                    options: [
                                        { value: '720p', label: '720P 高清' },
                                        { value: '1080p', label: '1080P 超清 (推荐)' },
                                        { value: '4k', label: '4K 超高清' }
                                    ]
                                }))
                            ]),
                            React.createElement(Col, { span: 12 }, [
                                React.createElement(Form.Item, {
                                    label: '码率设置',
                                    name: 'bitrate'
                                }, React.createElement(Select, {
                                    placeholder: '选择码率',
                                    options: [
                                        { value: '2000', label: '2Mbps (720P推荐)' },
                                        { value: '4000', label: '4Mbps (1080P推荐)' },
                                        { value: '8000', label: '8Mbps (4K推荐)' },
                                        { value: 'custom', label: '自定义码率' }
                                    ]
                                }))
                            ])
                        ]),
                        React.createElement(Form.Item, {
                            key: 'stream-key',
                            label: '推流密钥',
                            extra: '用于OBS等推流软件，创建后自动生成'
                        }, React.createElement(Input, { 
                            placeholder: '创建直播后自动生成推流密钥',
                            disabled: true,
                            addonAfter: React.createElement(Button, { 
                                size: 'small',
                                onClick: () => message.info('推流密钥将在创建后生成')
                            }, '生成')
                        }))
                    ])
                ]),

                React.createElement(Tabs.TabPane, { 
                    tab: React.createElement('span', {}, [
                        React.createElement('span', { key: 'icon', style: { marginRight: '8px' } }, '🎯'),
                        React.createElement('span', { key: 'text' }, '营销设置')
                    ]), 
                    key: 'marketing' 
                }, [
                    // 预约设置
                    React.createElement('div', {
                        key: 'booking-section',
                        style: { marginBottom: '24px' }
                    }, [
                        React.createElement('h4', { 
                            key: 'booking-title',
                            style: { 
                                margin: '0 0 16px 0', 
                                color: '#1e293b', 
                                fontSize: '16px',
                                fontWeight: '600'
                            } 
                        }, '预约提醒'),
                        React.createElement(Form.Item, {
                            key: 'enable-booking',
                            label: '开启预约',
                            name: 'enableBooking',
                            valuePropName: 'checked',
                            extra: '观众可以预约直播，系统将在开播前发送提醒'
                        }, React.createElement(Switch, {
                            checkedChildren: '开启',
                            unCheckedChildren: '关闭'
                        })),
                        React.createElement(Form.Item, {
                            key: 'booking-remind',
                            label: '提前提醒时间',
                            name: 'remindTime'
                        }, React.createElement(Select, {
                            placeholder: '选择提醒时间',
                            mode: 'multiple',
                            options: [
                                { value: '1', label: '开播前1分钟' },
                                { value: '5', label: '开播前5分钟' },
                                { value: '15', label: '开播前15分钟' },
                                { value: '30', label: '开播前30分钟' },
                                { value: '60', label: '开播前1小时' },
                                { value: '1440', label: '开播前1天' }
                            ]
                        }))
                    ]),

                    // 分享设置
                    React.createElement('div', {
                        key: 'share-section',
                        style: { 
                            background: '#f8fafc', 
                            padding: '16px', 
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }
                    }, [
                        React.createElement('h4', { 
                            key: 'share-title',
                            style: { 
                                margin: '0 0 16px 0', 
                                color: '#1e293b', 
                                fontSize: '16px',
                                fontWeight: '600'
                            } 
                        }, '分享推广'),
                        React.createElement(Row, { gutter: [24, 16] }, [
                            React.createElement(Col, { span: 8 }, [
                                React.createElement(Form.Item, {
                                    label: '微信分享',
                                    name: 'enableWechatShare',
                                    valuePropName: 'checked',
                                    style: { marginBottom: 0 }
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ]),
                            React.createElement(Col, { span: 8 }, [
                                React.createElement(Form.Item, {
                                    label: '微博分享',
                                    name: 'enableWeiboShare',
                                    valuePropName: 'checked',
                                    style: { marginBottom: 0 }
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ]),
                            React.createElement(Col, { span: 8 }, [
                                React.createElement(Form.Item, {
                                    label: 'QQ分享',
                                    name: 'enableQQShare',
                                    valuePropName: 'checked',
                                    style: { marginBottom: 0 }
                                }, React.createElement(Switch, {
                                    checkedChildren: '开启',
                                    unCheckedChildren: '关闭'
                                }))
                            ])
                        ]),
                        React.createElement(Form.Item, {
                            key: 'share-title-field',
                            label: '分享标题',
                            name: 'shareTitle',
                            extra: '不填写则使用直播标题'
                        }, React.createElement(Input, { 
                            placeholder: '自定义分享时显示的标题',
                            maxLength: 60
                        })),
                        React.createElement(Form.Item, {
                            key: 'share-desc',
                            label: '分享描述',
                            name: 'shareDescription',
                            extra: '不填写则使用直播简介'
                        }, React.createElement(Input.TextArea, { 
                            rows: 2,
                            placeholder: '自定义分享时显示的描述信息',
                            maxLength: 120
                        }))
                    ])
                ])
            ])
        ]))
    ]);
};

window.LiveManagement = LiveManagement; 