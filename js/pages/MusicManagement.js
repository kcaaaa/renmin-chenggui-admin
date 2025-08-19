// 音乐管理组件 - 系统管理模块
const MusicManagement = () => {
    console.log('🎵 音乐管理组件开始渲染');

    const { Table, Button, Modal, Form, Input, Switch, message, Space, Popconfirm, Card, Divider, Typography, Tag } = antd;
    const { Title, Text } = Typography;
    const [form] = Form.useForm();
    
    // 状态管理
    const [musicList, setMusicList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingMusic, setEditingMusic] = React.useState(null);
    const [currentPlayingId, setCurrentPlayingId] = React.useState(null);
    const [audioRef, setAudioRef] = React.useState(null);
    const [playProgress, setPlayProgress] = React.useState({});

    // 初始音乐数据 - 基于music文件夹中的实际文件
    const initialMusicData = [
        { 
            id: '001', 
            name: '寂静之声', 
            filename: 'call-of-silence.mp3', 
            description: '轻柔背景音乐，适用于图文发布', 
            size: '2.6MB', 
            enabled: true,
            createTime: '2024-01-01 10:00:00'
        },
        { 
            id: '002', 
            name: '日光', 
            filename: 'daylight.mp3', 
            description: '明亮背景音乐，适用于资讯发布', 
            size: '2.5MB', 
            enabled: true,
            createTime: '2024-01-01 10:05:00'
        },
        { 
            id: '003', 
            name: '再次坠落', 
            filename: 'Falling-again.MP3', 
            description: '抒情背景音乐', 
            size: '1.0MB', 
            enabled: true,
            createTime: '2024-01-01 10:10:00'
        },
        { 
            id: '004', 
            name: '四季轮回', 
            filename: 'Cycle-of-Seasons.MP3', 
            description: '自然主题音乐', 
            size: '3.7MB', 
            enabled: true,
            createTime: '2024-01-01 10:15:00'
        },
        { 
            id: '005', 
            name: '商务节拍', 
            filename: 'Monkeybiz.MP3', 
            description: '商务背景音乐', 
            size: '3.7MB', 
            enabled: true,
            createTime: '2024-01-01 10:20:00'
        },
        { 
            id: '006', 
            name: '峨眉山', 
            filename: 'OMEIGAHU.MP3', 
            description: '中式传统音乐', 
            size: '1.3MB', 
            enabled: true,
            createTime: '2024-01-01 10:25:00'
        },
        { 
            id: '007', 
            name: '牵手', 
            filename: 'take-me-hand.MP3', 
            description: '温馨背景音乐', 
            size: '423KB', 
            enabled: true,
            createTime: '2024-01-01 10:30:00'
        },
        { 
            id: '008', 
            name: '风之丘', 
            filename: 'WindyHill.mp3', 
            description: '清新背景音乐', 
            size: '4.6MB', 
            enabled: true,
            createTime: '2024-01-01 10:35:00'
        },
        { 
            id: '009', 
            name: '你让我微笑', 
            filename: 'you-make-me-smile.MP3', 
            description: '快乐背景音乐', 
            size: '609KB', 
            enabled: true,
            createTime: '2024-01-01 10:40:00'
        },
        { 
            id: '010', 
            name: '咔嚓', 
            filename: 'kkakking.MP3', 
            description: '活泼背景音乐', 
            size: '3.7MB', 
            enabled: true,
            createTime: '2024-01-01 10:45:00'
        }
    ];

    // 数据管理函数
    const getMusicData = () => {
        try {
            const stored = localStorage.getItem('musicData');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('获取音乐数据失败:', error);
            return [];
        }
    };

    const saveMusicData = (data) => {
        try {
            localStorage.setItem('musicData', JSON.stringify(data));
            console.log('音乐数据已保存');
        } catch (error) {
            console.error('保存音乐数据失败:', error);
            message.error('保存失败');
        }
    };

    const initMusicData = () => {
        const existingData = getMusicData();
        if (existingData.length === 0) {
            saveMusicData(initialMusicData);
            return initialMusicData;
        }
        return existingData;
    };

    // 组件初始化
    React.useEffect(() => {
        console.log('🎵 初始化音乐管理组件');
        loadMusicData();
    }, []);

    // 加载音乐数据
    const loadMusicData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // 模拟加载
            const data = initMusicData();
            setMusicList(data);
            console.log('✅ 音乐数据加载完成:', data.length, '首');
        } catch (error) {
            console.error('❌ 加载音乐数据失败:', error);
            message.error('加载失败');
        } finally {
            setLoading(false);
        }
    };

    // 音频播放管理
    const handlePlayMusic = (music) => {
        try {
            // 如果当前正在播放同一首歌，则暂停
            if (currentPlayingId === music.id && audioRef) {
                audioRef.pause();
                setCurrentPlayingId(null);
                setAudioRef(null);
                return;
            }

            // 停止当前播放的音乐
            if (audioRef) {
                audioRef.pause();
                audioRef.currentTime = 0;
            }

            // 播放新音乐
            const audio = new Audio(`music/${music.filename}`);
            audio.addEventListener('loadstart', () => {
                console.log('🎵 开始加载音乐:', music.name);
            });
            
            audio.addEventListener('canplay', () => {
                console.log('✅ 音乐可以播放:', music.name);
                audio.play().catch(error => {
                    console.error('播放失败:', error);
                    message.error('播放失败: ' + error.message);
                });
            });

            audio.addEventListener('timeupdate', () => {
                const progress = {
                    current: audio.currentTime,
                    duration: audio.duration,
                    percentage: (audio.currentTime / audio.duration) * 100
                };
                setPlayProgress(prev => ({
                    ...prev,
                    [music.id]: progress
                }));
            });

            audio.addEventListener('ended', () => {
                setCurrentPlayingId(null);
                setAudioRef(null);
                setPlayProgress(prev => ({
                    ...prev,
                    [music.id]: { current: 0, duration: 0, percentage: 0 }
                }));
            });

            audio.addEventListener('error', (e) => {
                console.error('音频加载错误:', e);
                message.error(`音频文件加载失败: ${music.filename}`);
                setCurrentPlayingId(null);
                setAudioRef(null);
            });

            setAudioRef(audio);
            setCurrentPlayingId(music.id);
            
        } catch (error) {
            console.error('播放音乐失败:', error);
            message.error('播放失败');
        }
    };

    // 停止所有音乐
    const stopAllMusic = () => {
        if (audioRef) {
            audioRef.pause();
            audioRef.currentTime = 0;
        }
        setCurrentPlayingId(null);
        setAudioRef(null);
        setPlayProgress({});
    };

    // 状态切换
    const handleToggleStatus = (id, enabled) => {
        const updatedList = musicList.map(item => 
            item.id === id ? { ...item, enabled } : item
        );
        setMusicList(updatedList);
        saveMusicData(updatedList);
        message.success(enabled ? '音乐已启用' : '音乐已禁用');
    };

    // 删除音乐
    const handleDeleteMusic = (id) => {
        // 如果正在播放这首音乐，先停止
        if (currentPlayingId === id) {
            stopAllMusic();
        }
        
        const updatedList = musicList.filter(item => item.id !== id);
        setMusicList(updatedList);
        saveMusicData(updatedList);
        message.success('删除成功');
    };

    // 添加/编辑音乐
    const handleSaveMusic = () => {
        form.validateFields()
            .then(values => {
                if (editingMusic) {
                    // 编辑模式
                    const updatedList = musicList.map(item => 
                        item.id === editingMusic.id 
                            ? { ...item, ...values }
                            : item
                    );
                    setMusicList(updatedList);
                    saveMusicData(updatedList);
                    message.success('编辑成功');
                } else {
                    // 新增模式
                    const newMusic = {
                        id: Date.now().toString(),
                        ...values,
                        createTime: new Date().toLocaleString()
                    };
                    const updatedList = [...musicList, newMusic];
                    setMusicList(updatedList);
                    saveMusicData(updatedList);
                    message.success('添加成功');
                }
                
                setModalVisible(false);
                setEditingMusic(null);
                form.resetFields();
            })
            .catch(error => {
                console.error('表单验证失败:', error);
            });
    };

    // 打开添加/编辑对话框
    const openModal = (music = null) => {
        setEditingMusic(music);
        setModalVisible(true);
        
        if (music) {
            form.setFieldsValue(music);
        } else {
            form.resetFields();
        }
    };

    // 关闭对话框
    const closeModal = () => {
        setModalVisible(false);
        setEditingMusic(null);
        form.resetFields();
    };

    // 刷新列表
    const handleRefreshList = () => {
        loadMusicData();
        message.success('列表已刷新');
    };

    // 格式化播放进度
    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // 渲染播放控制器
    const renderPlayController = (music) => {
        const isPlaying = currentPlayingId === music.id;
        const progress = playProgress[music.id] || { current: 0, duration: 0, percentage: 0 };
        
        return React.createElement('div', {
            style: { 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                minWidth: '200px'
            }
        }, [
            React.createElement(Button, {
                key: 'play-btn',
                type: isPlaying ? 'primary' : 'default',
                icon: React.createElement('span', {}, isPlaying ? '⏸️' : '▶️'),
                size: 'small',
                onClick: () => handlePlayMusic(music),
                style: { minWidth: '32px' }
            }),
            
            progress.duration > 0 && React.createElement('div', {
                key: 'progress',
                style: { 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    fontSize: '12px'
                }
            }, [
                React.createElement('div', {
                    key: 'progress-bar',
                    style: {
                        width: '80px',
                        height: '4px',
                        background: '#f0f0f0',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }
                }, React.createElement('div', {
                    style: {
                        width: `${progress.percentage}%`,
                        height: '100%',
                        background: '#1890ff',
                        transition: 'width 0.1s'
                    }
                })),
                React.createElement('span', {
                    key: 'time',
                    style: { color: '#666', minWidth: '50px' }
                }, `${formatTime(progress.current)}/${formatTime(progress.duration)}`)
            ])
        ]);
    };

    // 表格列定义
    const columns = [
        {
            title: '序号',
            key: 'index',
            width: 60,
            render: (_, __, index) => index + 1
        },
        {
            title: '音乐名称',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (text) => React.createElement(Text, { strong: true }, text)
        },
        {
            title: '文件名',
            dataIndex: 'filename',
            key: 'filename',
            ellipsis: true,
            render: (text) => React.createElement(Text, { 
                style: { fontFamily: 'monospace', fontSize: '12px' }
            }, text)
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true
        },
        {
            title: '文件大小',
            dataIndex: 'size',
            key: 'size',
            width: 100,
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 80,
            align: 'center',
            render: (enabled, record) => React.createElement(Switch, {
                checked: enabled,
                onChange: (checked) => handleToggleStatus(record.id, checked),
                checkedChildren: '启用',
                unCheckedChildren: '禁用'
            })
        },
        {
            title: '播放控制',
            key: 'player',
            width: 220,
            render: (_, record) => renderPlayController(record)
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => openModal(record)
                }, '编辑'),
                React.createElement(Popconfirm, {
                    key: 'delete',
                    title: '确定要删除这首音乐吗？',
                    onConfirm: () => handleDeleteMusic(record.id),
                    okText: '确定',
                    cancelText: '取消'
                }, React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    danger: true
                }, '删除'))
            ])
        }
    ];

    return React.createElement('div', {
        style: { padding: '0' }
    }, [
        // 页面标题和操作按钮
        React.createElement(Card, {
            key: 'header',
            size: 'small',
            style: { marginBottom: '16px' }
        }, [
            React.createElement('div', {
                key: 'title-row',
                style: { 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }
            }, [
                React.createElement('div', {
                    key: 'title-section'
                }, [
                    React.createElement(Title, { 
                        key: 'title',
                        level: 4, 
                        style: { margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }
                    }, [
                        React.createElement('span', { key: 'icon' }, '🎵'),
                        '音乐管理'
                    ]),
                    React.createElement(Text, {
                        key: 'subtitle',
                        type: 'secondary',
                        style: { fontSize: '14px' }
                    }, '管理系统背景音乐，为内容发布提供音乐选择')
                ]),
                
                React.createElement(Space, {
                    key: 'actions'
                }, [
                    React.createElement(Button, {
                        key: 'refresh',
                        icon: React.createElement('span', {}, '🔄'),
                        onClick: handleRefreshList
                    }, '刷新列表'),
                    React.createElement(Button, {
                        key: 'add',
                        type: 'primary',
                        icon: React.createElement('span', {}, '➕'),
                        onClick: () => openModal()
                    }, '添加音乐')
                ])
            ])
        ]),

        // 统计信息
        React.createElement(Card, {
            key: 'stats',
            size: 'small',
            style: { marginBottom: '16px' }
        }, React.createElement('div', {
            style: { 
                display: 'flex', 
                gap: '24px',
                alignItems: 'center'
            }
        }, [
            React.createElement('div', {
                key: 'total',
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement(Tag, { color: 'blue' }, '总计'),
                React.createElement(Text, { strong: true }, `${musicList.length} 首`)
            ]),
            React.createElement('div', {
                key: 'enabled',
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement(Tag, { color: 'green' }, '已启用'),
                React.createElement(Text, { strong: true }, `${musicList.filter(m => m.enabled).length} 首`)
            ]),
            React.createElement('div', {
                key: 'disabled',
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement(Tag, { color: 'red' }, '已禁用'),
                React.createElement(Text, { strong: true }, `${musicList.filter(m => !m.enabled).length} 首`)
            ]),
            currentPlayingId && React.createElement('div', {
                key: 'playing',
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement(Tag, { color: 'orange' }, '正在播放'),
                React.createElement(Text, { 
                    strong: true,
                    style: { color: '#fa8c16' }
                }, musicList.find(m => m.id === currentPlayingId)?.name || ''),
                React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    onClick: stopAllMusic,
                    style: { padding: '0 4px' }
                }, '停止')
            ])
        ])),

        // 音乐列表表格
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: musicList,
            rowKey: 'id',
            loading: loading,
            pagination: {
                total: musicList.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            },
            scroll: { x: 1000 }
        })),

        // 添加/编辑对话框
        React.createElement(Modal, {
            key: 'modal',
            title: editingMusic ? '编辑音乐' : '添加音乐',
            open: modalVisible,
            onOk: handleSaveMusic,
            onCancel: closeModal,
            okText: '保存',
            cancelText: '取消',
            width: 600
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            initialValues: { enabled: true }
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                name: 'name',
                label: '音乐名称',
                rules: [
                    { required: true, message: '请输入音乐名称' },
                    { max: 50, message: '音乐名称不能超过50个字符' }
                ]
            }, React.createElement(Input, {
                placeholder: '请输入音乐显示名称'
            })),

            React.createElement(Form.Item, {
                key: 'filename',
                name: 'filename',
                label: '文件名',
                rules: [
                    { required: true, message: '请输入文件名' },
                    { pattern: /\.(mp3|MP3|wav|WAV|ogg|OGG|aac|AAC)$/, message: '请输入有效的音频文件名' }
                ]
            }, React.createElement(Input, {
                placeholder: '请输入音频文件名（如：music.mp3）'
            })),

            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '音乐描述',
                rules: [
                    { max: 200, message: '描述不能超过200个字符' }
                ]
            }, React.createElement(Input.TextArea, {
                placeholder: '请输入音乐描述信息',
                rows: 3
            })),

            React.createElement(Form.Item, {
                key: 'size',
                name: 'size',
                label: '文件大小',
                rules: [
                    { required: true, message: '请输入文件大小' }
                ]
            }, React.createElement(Input, {
                placeholder: '请输入文件大小（如：2.5MB）'
            })),

            React.createElement(Form.Item, {
                key: 'enabled',
                name: 'enabled',
                valuePropName: 'checked',
                label: '启用状态'
            }, React.createElement(Switch, {
                checkedChildren: '启用',
                unCheckedChildren: '禁用'
            }))
        ]))
    ]);
};

// 确保组件在全局可用
window.MusicManagement = MusicManagement;

console.log('✅ 音乐管理组件已加载');
