// 审核管理页面
const ReviewManagement = () => {
    const { Tabs, Table, Card, Button, Space, Tag, Input, Select, Modal, Progress, Alert, Tooltip, Row, Col, Image, Video, Descriptions, Timeline, Badge, Statistic } = antd;
    const [activeTab, setActiveTab] = React.useState('image');
    const [reviewQueue, setReviewQueue] = React.useState([]);
    const [videoQueue, setVideoQueue] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [filters, setFilters] = React.useState({});
    const [modalVisible, setModalVisible] = React.useState(false);
    const [videoModalVisible, setVideoModalVisible] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(null);
    const [currentVideo, setCurrentVideo] = React.useState(null);
    const [stats, setStats] = React.useState({
        pending: 1248,
        reviewing: 356,
        approved: 8952,
        rejected: 124
    });

    React.useEffect(() => {
        if (activeTab === 'video') {
            loadVideoQueue();
        } else {
            loadReviewQueue();
        }
    }, [activeTab, filters]);

    const loadReviewQueue = () => {
        setLoading(true);
        setTimeout(() => {
            const mockQueue = MockData.getReviewQueue().map(item => ({
                ...item,
                key: item.id
            }));
            setReviewQueue(mockQueue);
            setLoading(false);
        }, 500);
    };

    const loadVideoQueue = () => {
        setLoading(true);
        setTimeout(() => {
            const mockVideoQueue = [
                {
                    id: 'V001',
                    key: 'V001',
                    title: '2024城轨技术创新展示',
                    description: '展示最新的城市轨道交通技术和创新成果',
                    author: '北京轨道交通协会',
                    authorType: 'association',
                    submitTime: '2024-01-15 14:30:25',
                    duration: '05:42',
                    fileSize: '126.5MB',
                    resolution: '1920x1080',
                    format: 'MP4',
                    status: 'pending',
                    priority: 'high',
                    aiAnalysis: {
                        overallScore: 0.92,
                        frameAnalysis: {
                            totalFrames: 8256,
                            checkedFrames: 165,
                            riskFrames: 2,
                            riskDetails: [
                                { time: '02:15', risk: 'low', type: 'text_overlay', description: '检测到文字水印' },
                                { time: '04:30', risk: 'medium', type: 'logo', description: '检测到第三方logo' }
                            ]
                        },
                        audioAnalysis: {
                            duration: '05:42',
                            transcription: '欢迎来到2024年城市轨道交通创新技术展览会...',
                            sensitiveWords: [],
                            emotionScore: 0.95,
                            qualityScore: 0.88
                        },
                        subtitleAnalysis: {
                            hasSubtitle: true,
                            language: 'zh-CN',
                            sensitiveWords: [],
                            complianceScore: 0.98
                        }
                    },
                    reviewHistory: [
                        { time: '2024-01-15 14:30:25', action: 'submit', operator: '系统', note: '视频提交审核' },
                        { time: '2024-01-15 14:30:30', action: 'ai_analysis', operator: 'AI系统', note: 'AI自动分析完成，综合评分0.92' }
                    ]
                },
                {
                    id: 'V002',
                    key: 'V002',
                    title: '智能列车控制系统演示',
                    description: '展示新一代智能列车自动控制系统的运行原理',
                    author: '用户_张工程师',
                    authorType: 'user',
                    submitTime: '2024-01-15 16:45:12',
                    duration: '03:28',
                    fileSize: '89.2MB',
                    resolution: '1920x1080',
                    format: 'MP4',
                    status: 'ai_reviewing',
                    priority: 'normal',
                    aiAnalysis: {
                        overallScore: 0.76,
                        frameAnalysis: {
                            totalFrames: 5024,
                            checkedFrames: 100,
                            riskFrames: 5,
                            riskDetails: [
                                { time: '01:20', risk: 'medium', type: 'sensitive_content', description: '检测到可能的敏感技术信息' },
                                { time: '02:45', risk: 'low', type: 'quality', description: '画面质量较低' }
                            ]
                        },
                        audioAnalysis: {
                            duration: '03:28',
                            transcription: '这套智能控制系统采用了先进的...',
                            sensitiveWords: ['技术机密'],
                            emotionScore: 0.82,
                            qualityScore: 0.75
                        },
                        subtitleAnalysis: {
                            hasSubtitle: false,
                            language: null,
                            sensitiveWords: [],
                            complianceScore: 1.0
                        }
                    },
                    reviewHistory: [
                        { time: '2024-01-15 16:45:12', action: 'submit', operator: '系统', note: '视频提交审核' },
                        { time: '2024-01-15 16:45:20', action: 'ai_analysis', operator: 'AI系统', note: 'AI分析中，发现潜在风险点' }
                    ]
                },
                {
                    id: 'V003',
                    key: 'V003',
                    title: '地铁安全运营宣传片',
                    description: '宣传地铁安全运营规范和乘客安全须知',
                    author: '上海地铁集团',
                    authorType: 'enterprise',
                    submitTime: '2024-01-14 09:15:30',
                    duration: '02:15',
                    fileSize: '45.8MB',
                    resolution: '1280x720',
                    format: 'MP4',
                    status: 'approved',
                    priority: 'high',
                    aiAnalysis: {
                        overallScore: 0.97,
                        frameAnalysis: {
                            totalFrames: 3240,
                            checkedFrames: 65,
                            riskFrames: 0,
                            riskDetails: []
                        },
                        audioAnalysis: {
                            duration: '02:15',
                            transcription: '乘客朋友们，欢迎乘坐地铁...',
                            sensitiveWords: [],
                            emotionScore: 0.95,
                            qualityScore: 0.92
                        },
                        subtitleAnalysis: {
                            hasSubtitle: true,
                            language: 'zh-CN',
                            sensitiveWords: [],
                            complianceScore: 0.99
                        }
                    },
                    reviewHistory: [
                        { time: '2024-01-14 09:15:30', action: 'submit', operator: '系统', note: '视频提交审核' },
                        { time: '2024-01-14 09:15:35', action: 'ai_analysis', operator: 'AI系统', note: 'AI分析完成，未发现违规内容' },
                        { time: '2024-01-14 10:20:15', action: 'manual_approve', operator: '审核员_李明', note: '人工审核通过，内容质量优秀' }
                    ]
                }
            ];
            setVideoQueue(mockVideoQueue);
            setLoading(false);
        }, 800);
    };

    // 状态标签渲染
    const renderStatusTag = (status) => {
        const statusConfig = {
            pending: { color: 'orange', text: '待审核' },
            ai_reviewing: { color: 'blue', text: 'AI审核中' },
            manual_review: { color: 'purple', text: '人工复审' },
            approved: { color: 'green', text: '已通过' },
            rejected: { color: 'red', text: '未通过' }
        };
        const config = statusConfig[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 视频状态标签渲染
    const renderVideoStatusTag = (status) => {
        const statusConfig = {
            pending: { color: 'orange', text: '待审核', icon: '⏳' },
            ai_reviewing: { color: 'blue', text: 'AI审核中', icon: '🤖' },
            manual_review: { color: 'purple', text: '人工复审', icon: '👨‍💼' },
            approved: { color: 'green', text: '已通过', icon: '✅' },
            rejected: { color: 'red', text: '未通过', icon: '❌' }
        };
        const config = statusConfig[status] || { color: 'default', text: status, icon: '📄' };
        return React.createElement(Tag, { 
            color: config.color,
            style: { display: 'flex', alignItems: 'center', gap: '4px' }
        }, [
            React.createElement('span', { key: 'icon' }, config.icon),
            config.text
        ]);
    };

    // 内容类型标签
    const renderTypeTag = (type) => {
        const typeConfig = {
            image: { color: 'blue', text: '图片', icon: '🖼️' },
            video: { color: 'purple', text: '视频', icon: '🎥' },
            text: { color: 'green', text: '文本', icon: '📝' }
        };
        const config = typeConfig[type] || { color: 'default', text: type, icon: '📄' };
        return React.createElement(Tag, { color: config.color }, [
            React.createElement('span', { key: 'icon' }, config.icon),
            ` ${config.text}`
        ]);
    };

    // 优先级标签
    const renderPriorityTag = (priority) => {
        const config = {
            high: { color: 'red', text: '高' },
            normal: { color: 'blue', text: '中' },
            low: { color: 'green', text: '低' }
        };
        const p = config[priority] || config.normal;
        return React.createElement(Tag, { color: p.color }, p.text);
    };

    // 作者类型标签
    const renderAuthorTypeTag = (type) => {
        const config = {
            user: { color: 'default', text: '普通用户', icon: '👤' },
            association: { color: 'blue', text: '协会', icon: '🏛️' },
            enterprise: { color: 'purple', text: '企业', icon: '🏢' }
        };
        const t = config[type] || config.user;
        return React.createElement(Tag, { color: t.color }, [
            React.createElement('span', { key: 'icon' }, t.icon),
            ` ${t.text}`
        ]);
    };

    // AI评分进度条
    const renderAIScore = (score) => {
        let status = 'success';
        let strokeColor = '#52c41a';
        if (score < 0.5) {
            status = 'exception';
            strokeColor = '#ff4d4f';
        } else if (score < 0.8) {
            status = 'normal';
            strokeColor = '#faad14';
        }
        
        return React.createElement(Tooltip, {
            title: `AI综合评分: ${(score * 100).toFixed(1)}%`
        }, React.createElement(Progress, {
            type: 'circle',
            percent: Math.round(score * 100),
            size: 50,
            status: status,
            strokeColor: strokeColor
        }));
    };

    // 批量审核
    const handleBatchReview = (action) => {
        if (selectedRows.length === 0) {
            antd.message.warning('请选择要审核的内容');
            return;
        }

        Modal.confirm({
            title: `确认${action === 'approve' ? '通过' : '拒绝'}选中的内容？`,
            content: `将对 ${selectedRows.length} 条内容执行${action === 'approve' ? '通过' : '拒绝'}操作`,
            onOk: () => {
                setLoading(true);
                setTimeout(() => {
                    setSelectedRows([]);
                    if (activeTab === 'video') {
                        loadVideoQueue();
                    } else {
                        loadReviewQueue();
                    }
                    antd.message.success(`已${action === 'approve' ? '通过' : '拒绝'} ${selectedRows.length} 条内容`);
                }, 1000);
            }
        });
    };

    // 查看详情
    const showDetail = (record) => {
        setCurrentItem(record);
        setModalVisible(true);
    };

    // 查看视频详情
    const showVideoDetail = (record) => {
        setCurrentVideo(record);
        setVideoModalVisible(true);
    };

    // 视频审核操作
    const handleVideoReview = (videoId, action, note = '') => {
        setLoading(true);
        setTimeout(() => {
            loadVideoQueue();
            antd.message.success(`视频 ${videoId} ${action === 'approve' ? '审核通过' : '审核拒绝'}`);
        }, 1000);
    };

    // 表格列配置
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
            fixed: 'left'
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: 100,
            render: renderTypeTag,
            filters: [
                { text: '图片', value: 'image' },
                { text: '视频', value: 'video' },
                { text: '文本', value: 'text' }
            ]
        },
        {
            title: '内容',
            dataIndex: 'content',
            ellipsis: { showTitle: false },
            render: (text) => React.createElement(Tooltip, { title: text }, text)
        },
        {
            title: '作者',
            dataIndex: 'author',
            width: 100
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            width: 160,
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            render: renderStatusTag,
            filters: [
                { text: '待审核', value: 'pending' },
                { text: 'AI审核中', value: 'ai_review' },
                { text: '人工复审', value: 'manual_review' },
                { text: '已通过', value: 'approved' },
                { text: '未通过', value: 'rejected' }
            ]
        },
        {
            title: 'AI评分',
            dataIndex: 'aiScore',
            width: 100,
            render: (score) => React.createElement(Progress, {
                type: 'circle',
                percent: Math.round(score * 100),
                size: 30,
                status: score > 0.8 ? 'success' : score > 0.5 ? 'normal' : 'exception'
            })
        },
        {
            title: '违规类型',
            dataIndex: 'violationType',
            width: 120,
            render: (type) => type ? React.createElement(Tag, { color: 'red' }, type) : '-'
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            width: 80,
            render: renderPriorityTag
        },
        {
            title: '操作',
            width: 200,
            fixed: 'right',
            render: (_, record) => React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'detail',
                    size: 'small',
                    onClick: () => showDetail(record)
                }, '详情'),
                React.createElement(Button, {
                    key: 'approve',
                    type: 'primary',
                    size: 'small',
                    onClick: () => handleBatchReview('approve')
                }, '通过'),
                React.createElement(Button, {
                    key: 'reject',
                    danger: true,
                    size: 'small',
                    onClick: () => handleBatchReview('reject')
                }, '拒绝')
            ])
        }
    ];

    // 视频审核表格列配置
    const videoColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
            fixed: 'left'
        },
        {
            title: '视频信息',
            dataIndex: 'title',
            width: 250,
            render: (text, record) => React.createElement('div', { style: { display: 'flex', alignItems: 'center' } }, [
                React.createElement('div', {
                    key: 'thumbnail',
                    style: {
                        width: '60px',
                        height: '40px',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        marginRight: '12px'
                    }
                }, '🎥'),
                React.createElement('div', { key: 'info' }, [
                    React.createElement('div', {
                        key: 'title',
                        style: { fontWeight: 'bold', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'meta',
                        style: { fontSize: '12px', color: '#666' }
                    }, `${record.duration} | ${record.fileSize}`)
                ])
            ])
        },
        {
            title: '作者',
            dataIndex: 'author',
            width: 150,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'name' }, text),
                React.createElement('div', { key: 'type', style: { marginTop: '4px' } }, 
                    renderAuthorTypeTag(record.authorType))
            ])
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            width: 140,
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 120,
            render: renderVideoStatusTag,
            filters: [
                { text: '待审核', value: 'pending' },
                { text: 'AI审核中', value: 'ai_reviewing' },
                { text: '人工复审', value: 'manual_review' },
                { text: '已通过', value: 'approved' },
                { text: '未通过', value: 'rejected' }
            ]
        },
        {
            title: 'AI评分',
            dataIndex: ['aiAnalysis', 'overallScore'],
            width: 80,
            render: (score) => renderAIScore(score)
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            width: 80,
            render: renderPriorityTag
        },
        {
            title: '操作',
            width: 180,
            fixed: 'right',
            render: (_, record) => React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'detail',
                    size: 'small',
                    onClick: () => showVideoDetail(record)
                }, '详情'),
                record.status === 'pending' || record.status === 'manual_review' ? [
                    React.createElement(Button, {
                        key: 'approve',
                        type: 'primary',
                        size: 'small',
                        onClick: () => handleVideoReview(record.id, 'approve')
                    }, '通过'),
                    React.createElement(Button, {
                        key: 'reject',
                        danger: true,
                        size: 'small',
                        onClick: () => handleVideoReview(record.id, 'reject')
                    }, '拒绝')
                ] : null
            ].filter(Boolean))
        }
    ];

    // 选择配置
    const rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: setSelectedRows,
        getCheckboxProps: (record) => ({
            disabled: record.status === 'approved' || record.status === 'rejected'
        })
    };

    // 视频审核内容渲染
    const renderVideoReview = () => {
        return React.createElement('div', {}, [
            // 筛选和操作栏
            React.createElement('div', {
                key: 'toolbar',
                style: {
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }, [
                React.createElement(Space, {
                    key: 'filters'
                }, [
                    React.createElement(Input.Search, {
                        placeholder: '搜索视频标题、作者...',
                        style: { width: 250 },
                        onSearch: (value) => console.log('搜索:', value)
                    }),
                    React.createElement(Select, {
                        placeholder: '状态筛选',
                        style: { width: 140 },
                        allowClear: true,
                        options: [
                            { value: 'pending', label: '待审核' },
                            { value: 'ai_reviewing', label: 'AI审核中' },
                            { value: 'manual_review', label: '人工复审' }
                        ]
                    }),
                    React.createElement(Select, {
                        placeholder: '作者类型',
                        style: { width: 120 },
                        allowClear: true,
                        options: [
                            { value: 'user', label: '普通用户' },
                            { value: 'association', label: '协会' },
                            { value: 'enterprise', label: '企业' }
                        ]
                    })
                ]),
                React.createElement(Space, {
                    key: 'actions'
                }, [
                    React.createElement(Button, {
                        type: 'primary',
                        disabled: selectedRows.length === 0,
                        onClick: () => handleBatchReview('approve')
                    }, `批量通过 (${selectedRows.length})`),
                    React.createElement(Button, {
                        danger: true,
                        disabled: selectedRows.length === 0,
                        onClick: () => handleBatchReview('reject')
                    }, `批量拒绝 (${selectedRows.length})`),
                    React.createElement(Button, {
                        onClick: loadVideoQueue
                    }, '刷新')
                ])
            ]),
            // 数据表格
            React.createElement(Table, {
                key: 'table',
                columns: videoColumns,
                dataSource: videoQueue,
                loading: loading,
                rowSelection: rowSelection,
                scroll: { x: 1400 },
                pagination: {
                    total: 1000,
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }
            })
        ]);
    };

    // Tab配置
    const tabItems = [
        {
            key: 'image',
            label: React.createElement('span', {}, ['🖼️ ', '图文审核']),
            children: React.createElement('div', {}, [
                // 筛选和操作栏
                React.createElement('div', {
                    key: 'toolbar',
                    style: {
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }, [
                    React.createElement(Space, {
                        key: 'filters'
                    }, [
                        React.createElement(Input.Search, {
                            placeholder: '搜索内容...',
                            style: { width: 200 },
                            onSearch: (value) => console.log('搜索:', value)
                        }),
                        React.createElement(Select, {
                            placeholder: '状态筛选',
                            style: { width: 120 },
                            allowClear: true,
                            options: [
                                { value: 'pending', label: '待审核' },
                                { value: 'ai_review', label: 'AI审核中' },
                                { value: 'manual_review', label: '人工复审' }
                            ]
                        })
                    ]),
                    React.createElement(Space, {
                        key: 'actions'
                    }, [
                        React.createElement(Button, {
                            type: 'primary',
                            disabled: selectedRows.length === 0,
                            onClick: () => handleBatchReview('approve')
                        }, `批量通过 (${selectedRows.length})`),
                        React.createElement(Button, {
                            danger: true,
                            disabled: selectedRows.length === 0,
                            onClick: () => handleBatchReview('reject')
                        }, `批量拒绝 (${selectedRows.length})`),
                        React.createElement(Button, {
                            onClick: loadReviewQueue
                        }, '刷新')
                    ])
                ]),
                // 数据表格
                React.createElement(Table, {
                    key: 'table',
                    columns: columns,
                    dataSource: reviewQueue,
                    loading: loading,
                    rowSelection: rowSelection,
                    scroll: { x: 1200 },
                    pagination: {
                        total: 1000,
                        pageSize: 20,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                    }
                })
            ])
        },
        {
            key: 'video',
            label: React.createElement('span', {}, ['🎥 ', '视频审核']),
            children: renderVideoReview()
        },
        {
            key: 'interaction',
            label: React.createElement('span', {}, ['💬 ', '互动审核']),
            children: React.createElement('div', { className: 'interaction-review-container' }, [
                // 操作栏
                React.createElement('div', {
                    key: 'operation-bar',
                    style: {
                        marginBottom: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        background: 'var(--surface-bg-opaque)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)'
                    }
                }, [
                    React.createElement('h3', { 
                        key: 'title',
                        style: { 
                            fontSize: '20px', 
                            fontWeight: '600', 
                            color: 'var(--text-primary)',
                            margin: 0 
                        } 
                    }, '💬 互动审核'),
                    React.createElement('div', {
                        key: 'actions',
                        style: { display: 'flex', gap: '12px' }
                    }, [
                        React.createElement('select', {
                            key: 'filter',
                            style: { 
                                padding: '8px 12px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                fontSize: '14px',
                                marginRight: '8px'
                            }
                        }, [
                            React.createElement('option', { key: 'all', value: 'all' }, '全部类型'),
                            React.createElement('option', { key: 'comment', value: 'comment' }, '评论'),
                            React.createElement('option', { key: 'message', value: 'message' }, '私信'),
                            React.createElement('option', { key: 'reply', value: 'reply' }, '回复')
                        ]),
                        React.createElement(Button, {
                            key: 'export',
                            type: 'default'
                        }, ['📊 ', '导出数据']),
                        React.createElement(Button, {
                            key: 'batch',
                            type: 'primary'
                        }, ['⚡ ', '批量处理'])
                    ])
                ]),

                // 统计卡片
                React.createElement('div', {
                    key: 'stats',
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '20px',
                        marginBottom: '24px'
                    }
                }, [
                    // 总互动数
                    React.createElement('div', {
                        key: 'total',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.2s ease'
                        }
                    }, [
                        React.createElement('div', { 
                            key: 'header',
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        }, [
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '14px', 
                                    color: 'var(--text-secondary)', 
                                    fontWeight: '500' 
                                } 
                            }, '今日互动'),
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '20px',
                                    color: 'var(--primary-color)' 
                                } 
                            }, '💬')
                        ]),
                        React.createElement('div', { 
                            key: 'value',
                            style: { 
                                fontSize: '28px', 
                                fontWeight: '700', 
                                color: 'var(--text-primary)',
                                marginBottom: '8px'
                            } 
                        }, '15,847'),
                        React.createElement('div', { 
                            key: 'change',
                            style: { 
                                fontSize: '13px', 
                                fontWeight: '600',
                                color: 'var(--success-color)'
                            } 
                        }, '+12.3% 较昨日')
                    ]),
                    
                    // 拦截数
                    React.createElement('div', {
                        key: 'blocked',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-sm)'
                        }
                    }, [
                        React.createElement('div', { 
                            key: 'header',
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        }, [
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '14px', 
                                    color: 'var(--text-secondary)', 
                                    fontWeight: '500' 
                                } 
                            }, '自动拦截'),
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '20px',
                                    color: 'var(--error-color)' 
                                } 
                            }, '🚫')
                        ]),
                        React.createElement('div', { 
                            key: 'value',
                            style: { 
                                fontSize: '28px', 
                                fontWeight: '700', 
                                color: 'var(--text-primary)',
                                marginBottom: '8px'
                            } 
                        }, '342'),
                        React.createElement('div', { 
                            key: 'change',
                            style: { 
                                fontSize: '13px', 
                                fontWeight: '600',
                                color: 'var(--error-color)'
                            } 
                        }, '+8 较昨日')
                    ]),
                    
                    // 通过率
                    React.createElement('div', {
                        key: 'pass-rate',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-sm)'
                        }
                    }, [
                        React.createElement('div', { 
                            key: 'header',
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        }, [
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '14px', 
                                    color: 'var(--text-secondary)', 
                                    fontWeight: '500' 
                                } 
                            }, '通过率'),
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '20px',
                                    color: 'var(--success-color)' 
                                } 
                            }, '✅')
                        ]),
                        React.createElement('div', { 
                            key: 'value',
                            style: { 
                                fontSize: '28px', 
                                fontWeight: '700', 
                                color: 'var(--text-primary)',
                                marginBottom: '8px'
                            } 
                        }, '97.8%'),
                        React.createElement('div', { 
                            key: 'change',
                            style: { 
                                fontSize: '13px', 
                                fontWeight: '600',
                                color: 'var(--success-color)'
                            } 
                        }, '+0.2% 较昨日')
                    ]),
                    
                    // 待审核
                    React.createElement('div', {
                        key: 'pending',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-sm)'
                        }
                    }, [
                        React.createElement('div', { 
                            key: 'header',
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }
                        }, [
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '14px', 
                                    color: 'var(--text-secondary)', 
                                    fontWeight: '500' 
                                } 
                            }, '待审核'),
                            React.createElement('span', { 
                                style: { 
                                    fontSize: '20px',
                                    color: 'var(--warning-color)' 
                                } 
                            }, '⏳')
                        ]),
                        React.createElement('div', { 
                            key: 'value',
                            style: { 
                                fontSize: '28px', 
                                fontWeight: '700', 
                                color: 'var(--text-primary)',
                                marginBottom: '8px'
                            } 
                        }, '28'),
                        React.createElement('div', { 
                            key: 'change',
                            style: { 
                                fontSize: '13px', 
                                fontWeight: '600',
                                color: 'var(--warning-color)'
                            } 
                        }, '需处理')
                    ])
                ]),

                // 互动审核列表
                React.createElement('div', {
                    key: 'table',
                    style: {
                        background: 'var(--surface-bg-opaque)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)'
                    }
                },
                    React.createElement('table', { 
                        style: { 
                            width: '100%', 
                            borderCollapse: 'collapse' 
                        } 
                    }, [
                        React.createElement('thead', { key: 'thead' },
                            React.createElement('tr', null, [
                                React.createElement('th', { 
                                    key: 'user',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '用户信息'),
                                React.createElement('th', { 
                                    key: 'type',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '类型'),
                                React.createElement('th', { 
                                    key: 'content',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '互动内容'),
                                React.createElement('th', { 
                                    key: 'risk',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '风险评级'),
                                React.createElement('th', { 
                                    key: 'status',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '状态'),
                                React.createElement('th', { 
                                    key: 'time',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '时间'),
                                React.createElement('th', { 
                                    key: 'actions',
                                    style: {
                                        padding: '16px',
                                        textAlign: 'left',
                                        background: '#f8fafc',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.5px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, '操作')
                            ])
                        ),
                        React.createElement('tbody', { key: 'tbody' }, 
                            [
                                {
                                    id: 'INT001',
                                    userId: 'U123456',
                                    username: '张工程师',
                                    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
                                    type: 'comment',
                                    content: '这个系统确实很先进，不过价格有点贵，有没有更便宜的选择？',
                                    riskLevel: 'low',
                                    status: 'approved',
                                    timestamp: '2024-01-15 14:25:30',
                                    aiScore: 0.95,
                                    userRiskScore: 'normal'
                                },
                                {
                                    id: 'INT002',
                                    userId: 'U789012',
                                    username: '李技术',
                                    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
                                    type: 'reply',
                                    content: '联系我，微信：abc123，专业技术咨询，价格优惠！',
                                    riskLevel: 'high',
                                    status: 'blocked',
                                    timestamp: '2024-01-15 14:20:15',
                                    aiScore: 0.15,
                                    userRiskScore: 'high'
                                },
                                {
                                    id: 'INT003',
                                    userId: 'U345678',
                                    username: '王专家',
                                    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
                                    type: 'message',
                                    content: '你好，我对你们的产品很感兴趣，能详细介绍一下吗？',
                                    riskLevel: 'low',
                                    status: 'approved',
                                    timestamp: '2024-01-15 14:18:42',
                                    aiScore: 0.98,
                                    userRiskScore: 'normal'
                                },
                                {
                                    id: 'INT004',
                                    userId: 'U567890',
                                    username: '赵主任',
                                    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao',
                                    type: 'comment',
                                    content: '这种技术在国外已经很成熟了，我们需要加快发展步伐。',
                                    riskLevel: 'medium',
                                    status: 'pending',
                                    timestamp: '2024-01-15 14:15:20',
                                    aiScore: 0.72,
                                    userRiskScore: 'normal'
                                },
                                {
                                    id: 'INT005',
                                    userId: 'U901234',
                                    username: '孙经理',
                                    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sun',
                                    type: 'reply',
                                    content: '废物系统，完全不如我们公司的产品！',
                                    riskLevel: 'high',
                                    status: 'deleted',
                                    timestamp: '2024-01-15 14:12:08',
                                    aiScore: 0.22,
                                    userRiskScore: 'high'
                                }
                            ].map(interaction =>
                                React.createElement('tr', { 
                                    key: interaction.id,
                                    style: {
                                        borderBottom: '1px solid var(--border-color)'
                                    }
                                }, [
                                    React.createElement('td', { 
                                        key: 'user',
                                        style: { padding: '16px', verticalAlign: 'middle' }
                                    },
                                        React.createElement('div', {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }
                                        }, [
                                            React.createElement('img', {
                                                key: 'avatar',
                                                src: interaction.userAvatar,
                                                alt: interaction.username,
                                                style: {
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '2px solid white',
                                                    boxShadow: 'var(--shadow-sm)'
                                                }
                                            }),
                                            React.createElement('div', { key: 'info' }, [
                                                React.createElement('div', {
                                                    key: 'name',
                                                    style: {
                                                        fontWeight: '500',
                                                        fontSize: '14px',
                                                        color: 'var(--text-primary)'
                                                    }
                                                }, interaction.username),
                                                React.createElement('div', {
                                                    key: 'id',
                                                    style: {
                                                        fontSize: '12px',
                                                        color: 'var(--text-secondary)'
                                                    }
                                                }, `ID: ${interaction.userId}`)
                                            ])
                                        ])
                                    ),
                                    React.createElement('td', { 
                                        key: 'type',
                                        style: { padding: '16px', verticalAlign: 'middle' }
                                    },
                                        React.createElement('span', {
                                            style: {
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: interaction.type === 'comment' ? '#e0e7ff' : 
                                                               interaction.type === 'reply' ? '#f0fdf4' : '#fef3c7',
                                                color: interaction.type === 'comment' ? '#4338ca' : 
                                                       interaction.type === 'reply' ? '#166534' : '#92400e'
                                            }
                                        }, {
                                            'comment': '💬 评论',
                                            'reply': '↩️ 回复',
                                            'message': '✉️ 私信'
                                        }[interaction.type])
                                    ),
                                    React.createElement('td', { 
                                        key: 'content',
                                        style: { 
                                            padding: '16px', 
                                            verticalAlign: 'middle',
                                            maxWidth: '300px'
                                        }
                                    },
                                        React.createElement('div', {
                                            style: {
                                                fontSize: '14px',
                                                lineHeight: '1.5',
                                                wordBreak: 'break-word',
                                                color: interaction.status === 'blocked' || interaction.status === 'deleted' ? 
                                                       'var(--error-color)' : 'var(--text-primary)'
                                            }
                                        }, interaction.content)
                                    ),
                                    React.createElement('td', { 
                                        key: 'risk',
                                        style: { padding: '16px', verticalAlign: 'middle' }
                                    },
                                        React.createElement('div', {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '4px'
                                            }
                                        }, [
                                            React.createElement('span', {
                                                key: 'level',
                                                style: {
                                                    padding: '4px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    backgroundColor: interaction.riskLevel === 'high' ? '#fee2e2' : 
                                                                   interaction.riskLevel === 'medium' ? '#fef3c7' : '#dcfce7',
                                                    color: interaction.riskLevel === 'high' ? '#991b1b' : 
                                                           interaction.riskLevel === 'medium' ? '#92400e' : '#166534'
                                                }
                                            }, {
                                                'high': '🔴 高风险',
                                                'medium': '🟡 中风险',
                                                'low': '🟢 低风险'
                                            }[interaction.riskLevel]),
                                            React.createElement('span', {
                                                key: 'score',
                                                style: {
                                                    fontSize: '11px',
                                                    color: 'var(--text-secondary)'
                                                }
                                            }, `AI: ${(interaction.aiScore * 100).toFixed(1)}%`)
                                        ])
                                    ),
                                    React.createElement('td', { 
                                        key: 'status',
                                        style: { padding: '16px', verticalAlign: 'middle' }
                                    },
                                        React.createElement('span', {
                                            style: {
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: interaction.status === 'approved' ? '#dcfce7' : 
                                                               interaction.status === 'pending' ? '#fef3c7' :
                                                               interaction.status === 'blocked' ? '#fee2e2' : '#f1f5f9',
                                                color: interaction.status === 'approved' ? '#166534' : 
                                                       interaction.status === 'pending' ? '#92400e' :
                                                       interaction.status === 'blocked' ? '#991b1b' : '#475569'
                                            }
                                        }, {
                                            'approved': '✅ 已通过',
                                            'pending': '⏳ 待审核',
                                            'blocked': '🚫 已拦截',
                                            'deleted': '🗑️ 已删除'
                                        }[interaction.status])
                                    ),
                                    React.createElement('td', { 
                                        key: 'time',
                                        style: { 
                                            padding: '16px', 
                                            verticalAlign: 'middle',
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)'
                                        }
                                    }, interaction.timestamp),
                                    React.createElement('td', { 
                                        key: 'actions',
                                        style: { padding: '16px', verticalAlign: 'middle' }
                                    },
                                        React.createElement('div', {
                                            style: {
                                                display: 'flex',
                                                gap: '8px'
                                            }
                                        }, [
                                            React.createElement('button', {
                                                key: 'detail',
                                                style: {
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '6px',
                                                    background: 'white',
                                                    color: 'var(--text-primary)',
                                                    cursor: 'pointer'
                                                }
                                            }, '详情'),
                                            interaction.status === 'pending' && [
                                                React.createElement('button', {
                                                    key: 'approve',
                                                    style: {
                                                        padding: '6px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        background: 'var(--success-color)',
                                                        color: 'white',
                                                        cursor: 'pointer'
                                                    }
                                                }, '通过'),
                                                React.createElement('button', {
                                                    key: 'reject',
                                                    style: {
                                                        padding: '6px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        background: 'var(--error-color)',
                                                        color: 'white',
                                                        cursor: 'pointer'
                                                    }
                                                }, '拒绝')
                                            ]
                                        ].flat().filter(Boolean))
                                    )
                                ])
                            )
                        )
                    ])
                )
            ])
        },
        {
            key: 'mechanism',
            label: React.createElement('span', {}, ['⚙️ ', '审核机制']),
            children: React.createElement('div', { className: 'mechanism-container' }, [
                // 页面头部
                React.createElement('div', {
                    key: 'header',
                    style: {
                        marginBottom: '24px',
                        padding: '20px',
                        background: 'var(--surface-bg-opaque)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)'
                    }
                }, [
                    React.createElement('h3', {
                        key: 'title',
                        style: {
                            fontSize: '20px',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: '8px'
                        }
                    }, '⚙️ 审核机制配置'),
                    React.createElement('p', {
                        key: 'desc',
                        style: {
                            color: 'var(--text-secondary)',
                            fontSize: '14px',
                            margin: 0
                        }
                    }, '配置和管理审核流程的自动化策略、阈值参数及第三方系统集成')
                ]),

                // Tab导航
                React.createElement('div', {
                    key: 'tabs',
                    style: {
                        display: 'flex',
                        marginBottom: '24px',
                        background: 'var(--surface-bg-opaque)',
                        borderRadius: '12px',
                        padding: '6px',
                        border: '1px solid var(--border-color)'
                    }
                }, [
                    React.createElement('button', {
                        key: 'threshold',
                        style: {
                            flex: 1,
                            padding: '12px 16px',
                            border: 'none',
                            background: 'var(--primary-color)',
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }
                    }, '🎚️ 阈值调整'),
                    React.createElement('button', {
                        key: 'tracking',
                        style: {
                            flex: 1,
                            padding: '12px 16px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }
                    }, '📊 过程追踪'),
                    React.createElement('button', {
                        key: 'integration',
                        style: {
                            flex: 1,
                            padding: '12px 16px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }
                    }, '🔗 系统集成')
                ]),

                // 阈值调整区域
                React.createElement('div', {
                    key: 'threshold-section',
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '20px',
                        marginBottom: '24px'
                    }
                }, [
                    // 图文审核阈值
                    React.createElement('div', {
                        key: 'image-threshold',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)'
                        }
                    }, [
                        React.createElement('h4', {
                            key: 'title',
                            style: {
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }
                        }, ['🖼️', '图文审核阈值']),
                        
                        React.createElement('div', {
                            key: 'settings',
                            style: { display: 'flex', flexDirection: 'column', gap: '16px' }
                        }, [
                            React.createElement('div', { key: 'sensitive' }, [
                                React.createElement('label', {
                                    style: {
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }
                                }, '敏感词检测敏感度'),
                                React.createElement('input', {
                                    type: 'range',
                                    min: '0',
                                    max: '1',
                                    step: '0.1',
                                    defaultValue: '0.8',
                                    style: {
                                        width: '100%',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#e2e8f0',
                                        outline: 'none'
                                    }
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        marginTop: '4px'
                                    }
                                }, [
                                    React.createElement('span', { key: 'low' }, '宽松'),
                                    React.createElement('span', { key: 'current' }, '当前: 0.8'),
                                    React.createElement('span', { key: 'high' }, '严格')
                                ])
                            ]),
                            
                            React.createElement('div', { key: 'image' }, [
                                React.createElement('label', {
                                    style: {
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }
                                }, '图片内容识别阈值'),
                                React.createElement('input', {
                                    type: 'range',
                                    min: '0',
                                    max: '1',
                                    step: '0.1',
                                    defaultValue: '0.7',
                                    style: {
                                        width: '100%',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#e2e8f0',
                                        outline: 'none'
                                    }
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        marginTop: '4px'
                                    }
                                }, [
                                    React.createElement('span', { key: 'low' }, '宽松'),
                                    React.createElement('span', { key: 'current' }, '当前: 0.7'),
                                    React.createElement('span', { key: 'high' }, '严格')
                                ])
                            ])
                        ])
                    ]),
                    
                    // 视频审核阈值
                    React.createElement('div', {
                        key: 'video-threshold',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)'
                        }
                    }, [
                        React.createElement('h4', {
                            key: 'title',
                            style: {
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }
                        }, ['🎥', '视频审核阈值']),
                        
                        React.createElement('div', {
                            key: 'settings',
                            style: { display: 'flex', flexDirection: 'column', gap: '16px' }
                        }, [
                            React.createElement('div', { key: 'frame' }, [
                                React.createElement('label', {
                                    style: {
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }
                                }, '画面检测阈值'),
                                React.createElement('input', {
                                    type: 'range',
                                    min: '0',
                                    max: '1',
                                    step: '0.1',
                                    defaultValue: '0.6',
                                    style: {
                                        width: '100%',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#e2e8f0',
                                        outline: 'none'
                                    }
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        marginTop: '4px'
                                    }
                                }, [
                                    React.createElement('span', { key: 'low' }, '宽松'),
                                    React.createElement('span', { key: 'current' }, '当前: 0.6'),
                                    React.createElement('span', { key: 'high' }, '严格')
                                ])
                            ]),
                            
                            React.createElement('div', { key: 'audio' }, [
                                React.createElement('label', {
                                    style: {
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }
                                }, '音频内容阈值'),
                                React.createElement('input', {
                                    type: 'range',
                                    min: '0',
                                    max: '1',
                                    step: '0.1',
                                    defaultValue: '0.75',
                                    style: {
                                        width: '100%',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#e2e8f0',
                                        outline: 'none'
                                    }
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        marginTop: '4px'
                                    }
                                }, [
                                    React.createElement('span', { key: 'low' }, '宽松'),
                                    React.createElement('span', { key: 'current' }, '当前: 0.75'),
                                    React.createElement('span', { key: 'high' }, '严格')
                                ])
                            ])
                        ])
                    ]),
                    
                    // 互动审核阈值
                    React.createElement('div', {
                        key: 'interaction-threshold',
                        style: {
                            background: 'var(--surface-bg-opaque)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid var(--border-color)'
                        }
                    }, [
                        React.createElement('h4', {
                            key: 'title',
                            style: {
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }
                        }, ['💬', '互动审核阈值']),
                        
                        React.createElement('div', {
                            key: 'settings',
                            style: { display: 'flex', flexDirection: 'column', gap: '16px' }
                        }, [
                            React.createElement('div', { key: 'realtime' }, [
                                React.createElement('label', {
                                    style: {
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }
                                }, '实时拦截阈值'),
                                React.createElement('input', {
                                    type: 'range',
                                    min: '0',
                                    max: '1',
                                    step: '0.1',
                                    defaultValue: '0.9',
                                    style: {
                                        width: '100%',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#e2e8f0',
                                        outline: 'none'
                                    }
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        marginTop: '4px'
                                    }
                                }, [
                                    React.createElement('span', { key: 'low' }, '宽松'),
                                    React.createElement('span', { key: 'current' }, '当前: 0.9'),
                                    React.createElement('span', { key: 'high' }, '严格')
                                ])
                            ]),
                            
                            React.createElement('div', { key: 'user-risk' }, [
                                React.createElement('label', {
                                    style: {
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }
                                }, '用户风险评估权重'),
                                React.createElement('input', {
                                    type: 'range',
                                    min: '0',
                                    max: '1',
                                    step: '0.1',
                                    defaultValue: '0.3',
                                    style: {
                                        width: '100%',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#e2e8f0',
                                        outline: 'none'
                                    }
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        marginTop: '4px'
                                    }
                                }, [
                                    React.createElement('span', { key: 'low' }, '弱化'),
                                    React.createElement('span', { key: 'current' }, '当前: 0.3'),
                                    React.createElement('span', { key: 'high' }, '强化')
                                ])
                            ])
                        ])
                    ])
                ]),

                // 审核策略配置
                React.createElement('div', {
                    key: 'strategy-section',
                    style: {
                        background: 'var(--surface-bg-opaque)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid var(--border-color)',
                        marginBottom: '24px'
                    }
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        style: {
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }
                    }, ['📋', '审核策略配置']),
                    
                    React.createElement('div', {
                        key: 'strategies',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '16px'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'auto-block',
                            style: {
                                padding: '16px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                background: '#fafafa'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px'
                                }
                            }, [
                                React.createElement('span', {
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)'
                                    }
                                }, '🚫 自动拦截'),
                                React.createElement('input', {
                                    type: 'checkbox',
                                    defaultChecked: true,
                                    style: {
                                        width: '16px',
                                        height: '16px'
                                    }
                                })
                            ]),
                            React.createElement('p', {
                                style: {
                                    fontSize: '13px',
                                    color: 'var(--text-secondary)',
                                    margin: 0
                                }
                            }, '高风险内容自动拦截，无需人工干预')
                        ]),
                        
                        React.createElement('div', {
                            key: 'manual-review',
                            style: {
                                padding: '16px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                background: '#fafafa'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px'
                                }
                            }, [
                                React.createElement('span', {
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)'
                                    }
                                }, '👤 人工复审'),
                                React.createElement('input', {
                                    type: 'checkbox',
                                    defaultChecked: true,
                                    style: {
                                        width: '16px',
                                        height: '16px'
                                    }
                                })
                            ]),
                            React.createElement('p', {
                                style: {
                                    fontSize: '13px',
                                    color: 'var(--text-secondary)',
                                    margin: 0
                                }
                            }, '中风险内容进入人工审核队列')
                        ]),
                        
                        React.createElement('div', {
                            key: 'third-party',
                            style: {
                                padding: '16px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                background: '#fafafa'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px'
                                }
                            }, [
                                React.createElement('span', {
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)'
                                    }
                                }, '🔗 钉钉审批'),
                                React.createElement('input', {
                                    type: 'checkbox',
                                    defaultChecked: false,
                                    style: {
                                        width: '16px',
                                        height: '16px'
                                    }
                                })
                            ]),
                            React.createElement('p', {
                                style: {
                                    fontSize: '13px',
                                    color: 'var(--text-secondary)',
                                    margin: 0
                                }
                            }, '协会/展会内容推送至钉钉审批')
                        ])
                    ])
                ]),

                // 系统集成配置
                React.createElement('div', {
                    key: 'integration-section',
                    style: {
                        background: 'var(--surface-bg-opaque)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid var(--border-color)',
                        marginBottom: '24px'
                    }
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        style: {
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }
                    }, ['🔗', '第三方系统集成']),
                    
                    React.createElement('div', {
                        key: 'integrations',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '20px'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'dingtalk',
                            style: {
                                padding: '16px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '16px'
                                }
                            }, [
                                React.createElement('div', {
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        background: '#1890ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px'
                                    }
                                }, '📱'),
                                React.createElement('div', {}, [
                                    React.createElement('div', {
                                        style: {
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)'
                                        }
                                    }, '钉钉审批集成'),
                                    React.createElement('div', {
                                        style: {
                                            fontSize: '12px',
                                            color: 'var(--text-secondary)'
                                        }
                                    }, '连接状态: 已连接')
                                ])
                            ]),
                            
                            React.createElement('div', {
                                key: 'config',
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }
                            }, [
                                React.createElement('div', {}, [
                                    React.createElement('label', {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: 'var(--text-primary)',
                                            marginBottom: '4px'
                                        }
                                    }, 'App Key'),
                                    React.createElement('input', {
                                        type: 'text',
                                        defaultValue: 'dingoa_xxxxxxxxxxxxx',
                                        style: {
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '6px',
                                            fontSize: '13px'
                                        }
                                    })
                                ]),
                                React.createElement('div', {}, [
                                    React.createElement('label', {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: 'var(--text-primary)',
                                            marginBottom: '4px'
                                        }
                                    }, '审批模板ID'),
                                    React.createElement('input', {
                                        type: 'text',
                                        defaultValue: 'approval_template_001',
                                        style: {
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '6px',
                                            fontSize: '13px'
                                        }
                                    })
                                ])
                            ])
                        ]),
                        
                        React.createElement('div', {
                            key: 'webhook',
                            style: {
                                padding: '16px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '16px'
                                }
                            }, [
                                React.createElement('div', {
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        background: '#52c41a',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px'
                                    }
                                }, '🔗'),
                                React.createElement('div', {}, [
                                    React.createElement('div', {
                                        style: {
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)'
                                        }
                                    }, 'Webhook通知'),
                                    React.createElement('div', {
                                        style: {
                                            fontSize: '12px',
                                            color: 'var(--text-secondary)'
                                        }
                                    }, '连接状态: 未配置')
                                ])
                            ]),
                            
                            React.createElement('div', {
                                key: 'config',
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }
                            }, [
                                React.createElement('div', {}, [
                                    React.createElement('label', {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: 'var(--text-primary)',
                                            marginBottom: '4px'
                                        }
                                    }, 'Webhook URL'),
                                    React.createElement('input', {
                                        type: 'url',
                                        placeholder: 'https://your-domain.com/webhook',
                                        style: {
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '6px',
                                            fontSize: '13px'
                                        }
                                    })
                                ]),
                                React.createElement('div', {}, [
                                    React.createElement('label', {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: 'var(--text-primary)',
                                            marginBottom: '4px'
                                        }
                                    }, '密钥'),
                                    React.createElement('input', {
                                        type: 'password',
                                        placeholder: '请输入Webhook密钥',
                                        style: {
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '6px',
                                            fontSize: '13px'
                                        }
                                    })
                                ])
                            ])
                        ])
                    ])
                ]),

                // 操作按钮
                React.createElement('div', {
                    key: 'actions',
                    style: {
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end'
                    }
                }, [
                    React.createElement(Button, {
                        key: 'test',
                        style: {
                            padding: '8px 16px',
                            fontSize: '14px'
                        }
                    }, '🧪 测试配置'),
                    React.createElement(Button, {
                        key: 'reset',
                        style: {
                            padding: '8px 16px',
                            fontSize: '14px'
                        }
                    }, '🔄 重置默认'),
                    React.createElement(Button, {
                        key: 'save',
                        type: 'primary',
                        style: {
                            padding: '8px 16px',
                            fontSize: '14px'
                        }
                    }, '💾 保存配置')
                ])
            ])
        }
    ];

    return React.createElement('div', {}, [
        // 页面标题
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
                style: {
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e293b'
                }
            }, '审核管理'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'settings',
                    icon: React.createElement('span', {}, '⚙️')
                }, '审核设置'),
                React.createElement(Button, {
                    key: 'export',
                    icon: React.createElement('span', {}, '📊')
                }, '导出报告')
            ])
        ]),

        // 统计卡片
        React.createElement('div', {
            key: 'stats',
            style: { marginBottom: '24px' }
        }, React.createElement(Row, { gutter: 16 }, [
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#f59e42' }
                        }, '1,248'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '待审核')
                    ])
                )
            ),
            React.createElement(Col, { key: 'processing', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }
                        }, '356'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '审核中')
                    ])
                )
            ),
            React.createElement(Col, { key: 'approved', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }
                        }, '8,952'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '已通过')
                    ])
                )
            ),
            React.createElement(Col, { key: 'rejected', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement('div', { style: { textAlign: 'center' } }, [
                        React.createElement('div', {
                            key: 'number',
                            style: { fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }
                        }, '124'),
                        React.createElement('div', {
                            key: 'label',
                            style: { color: '#64748b' }
                        }, '未通过')
                    ])
                )
            )
        ])),

        // 主要内容Tab
        React.createElement(Card, {
            key: 'content'
        }, React.createElement(Tabs, {
            activeKey: activeTab,
            onChange: setActiveTab,
            items: tabItems
        })),

        // 图文内容详情模态框
        React.createElement(Modal, {
            key: 'modal',
            title: '内容详情',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            width: 800,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setModalVisible(false)
                }, '关闭'),
                React.createElement(Button, {
                    key: 'reject',
                    danger: true
                }, '拒绝'),
                React.createElement(Button, {
                    key: 'approve',
                    type: 'primary'
                }, '通过')
            ]
        }, currentItem && React.createElement('div', {}, [
            React.createElement('p', {
                key: 'content'
            }, `内容：${currentItem.content}`),
            React.createElement('p', {
                key: 'author'
            }, `作者：${currentItem.author}`),
            React.createElement('p', {
                key: 'time'
            }, `提交时间：${currentItem.submitTime}`),
            React.createElement('p', {
                key: 'score'
            }, `AI评分：${(currentItem.aiScore * 100).toFixed(1)}%`)
        ])),

        // 视频详情模态框
        React.createElement(Modal, {
            key: 'videoModal',
            title: '视频审核详情',
            open: videoModalVisible,
            onCancel: () => setVideoModalVisible(false),
            width: 1200,
            footer: currentVideo && (currentVideo.status === 'pending' || currentVideo.status === 'manual_review') ? [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setVideoModalVisible(false)
                }, '关闭'),
                React.createElement(Button, {
                    key: 'reject',
                    danger: true,
                    onClick: () => {
                        handleVideoReview(currentVideo.id, 'reject');
                        setVideoModalVisible(false);
                    }
                }, '审核拒绝'),
                React.createElement(Button, {
                    key: 'approve',
                    type: 'primary',
                    onClick: () => {
                        handleVideoReview(currentVideo.id, 'approve');
                        setVideoModalVisible(false);
                    }
                }, '审核通过')
            ] : [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setVideoModalVisible(false)
                }, '关闭')
            ]
        }, currentVideo && React.createElement('div', {}, [
            // 基本信息
            React.createElement(Descriptions, {
                key: 'basic',
                title: '基本信息',
                bordered: true,
                column: 2,
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Descriptions.Item, {
                    key: 'title',
                    label: '视频标题'
                }, currentVideo.title),
                React.createElement(Descriptions.Item, {
                    key: 'author',
                    label: '作者'
                }, [
                    currentVideo.author,
                    React.createElement('div', { key: 'type', style: { marginTop: '4px' } },
                        renderAuthorTypeTag(currentVideo.authorType))
                ]),
                React.createElement(Descriptions.Item, {
                    key: 'duration',
                    label: '时长'
                }, currentVideo.duration),
                React.createElement(Descriptions.Item, {
                    key: 'size',
                    label: '文件大小'
                }, currentVideo.fileSize),
                React.createElement(Descriptions.Item, {
                    key: 'resolution',
                    label: '分辨率'
                }, currentVideo.resolution),
                React.createElement(Descriptions.Item, {
                    key: 'format',
                    label: '格式'
                }, currentVideo.format),
                React.createElement(Descriptions.Item, {
                    key: 'status',
                    label: '状态'
                }, renderVideoStatusTag(currentVideo.status)),
                React.createElement(Descriptions.Item, {
                    key: 'priority',
                    label: '优先级'
                }, renderPriorityTag(currentVideo.priority))
            ]),

            // AI分析结果
            React.createElement(Card, {
                key: 'ai-analysis',
                title: 'AI分析结果',
                style: { marginBottom: '24px' }
            }, React.createElement(Row, { gutter: 16 }, [
                // 综合评分
                React.createElement(Col, { key: 'overall', span: 8 },
                    React.createElement(Card, { size: 'small', title: '综合评分' },
                        React.createElement('div', { style: { textAlign: 'center' } },
                            renderAIScore(currentVideo.aiAnalysis.overallScore)
                        )
                    )
                ),
                // 画面分析
                React.createElement(Col, { key: 'frame', span: 8 },
                    React.createElement(Card, { size: 'small', title: '画面分析' }, [
                        React.createElement('p', { key: 'total' }, `总帧数: ${currentVideo.aiAnalysis.frameAnalysis.totalFrames}`),
                        React.createElement('p', { key: 'checked' }, `检测帧数: ${currentVideo.aiAnalysis.frameAnalysis.checkedFrames}`),
                        React.createElement('p', { key: 'risk' }, `风险帧数: ${currentVideo.aiAnalysis.frameAnalysis.riskFrames}`)
                    ])
                ),
                // 音频分析
                React.createElement(Col, { key: 'audio', span: 8 },
                    React.createElement(Card, { size: 'small', title: '音频分析' }, [
                        React.createElement('p', { key: 'emotion' }, `情绪得分: ${(currentVideo.aiAnalysis.audioAnalysis.emotionScore * 100).toFixed(1)}%`),
                        React.createElement('p', { key: 'quality' }, `音质得分: ${(currentVideo.aiAnalysis.audioAnalysis.qualityScore * 100).toFixed(1)}%`),
                        React.createElement('p', { key: 'sensitive' }, `敏感词: ${currentVideo.aiAnalysis.audioAnalysis.sensitiveWords.length} 个`)
                    ])
                )
            ])),

            // 风险详情
            currentVideo.aiAnalysis.frameAnalysis.riskDetails.length > 0 && React.createElement(Card, {
                key: 'risks',
                title: '风险详情',
                style: { marginBottom: '24px' }
            }, React.createElement(Table, {
                dataSource: currentVideo.aiAnalysis.frameAnalysis.riskDetails.map((item, index) => ({
                    ...item,
                    key: index
                })),
                pagination: false,
                size: 'small',
                columns: [
                    { title: '时间点', dataIndex: 'time', width: 100 },
                    { 
                        title: '风险等级', 
                        dataIndex: 'risk', 
                        width: 100,
                        render: (level) => React.createElement(Tag, {
                            color: level === 'high' ? 'red' : level === 'medium' ? 'orange' : 'blue'
                        }, level === 'high' ? '高风险' : level === 'medium' ? '中风险' : '低风险')
                    },
                    { title: '类型', dataIndex: 'type', width: 120 },
                    { title: '描述', dataIndex: 'description' }
                ]
            })),

            // 音频转录
            currentVideo.aiAnalysis.audioAnalysis.transcription && React.createElement(Card, {
                key: 'transcription',
                title: '音频转录',
                style: { marginBottom: '24px' }
            }, React.createElement('div', {
                style: {
                    maxHeight: '200px',
                    overflow: 'auto',
                    background: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '4px'
                }
            }, currentVideo.aiAnalysis.audioAnalysis.transcription)),

            // 审核历史
            React.createElement(Card, {
                key: 'history',
                title: '审核历史'
            }, React.createElement(Timeline, {},
                currentVideo.reviewHistory.map((item, index) => 
                    React.createElement(Timeline.Item, {
                        key: index,
                        color: item.action === 'submit' ? 'blue' : 
                               item.action === 'ai_analysis' ? 'green' :
                               item.action === 'manual_approve' ? 'green' : 'orange'
                    }, [
                        React.createElement('div', { key: 'time', style: { fontWeight: 'bold' } }, item.time),
                        React.createElement('div', { key: 'operator' }, `操作人: ${item.operator}`),
                        React.createElement('div', { key: 'note' }, item.note)
                    ])
                )
            ))
        ]))
    ]);
};

window.ReviewManagement = ReviewManagement; 