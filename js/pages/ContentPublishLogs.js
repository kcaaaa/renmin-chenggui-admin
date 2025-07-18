// 作品发布日志页面 - 基于文档7.4.3功能设计
const ContentPublishLogs = () => {
    const { Card, Table, Button, Space, DatePicker, Select, Input, message, Tag, Tooltip, Descriptions, Modal, Timeline } = antd;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const { Search } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const [filteredLogs, setFilteredLogs] = React.useState([]);
    const [filters, setFilters] = React.useState({
        dateRange: null,
        contentType: '',
        action: '',
        status: '',
        publisher: '',
        keyword: ''
    });
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [selectedLog, setSelectedLog] = React.useState(null);

    React.useEffect(() => {
        loadLogs();
    }, []);

    React.useEffect(() => {
        applyFilters();
    }, [logs, filters]);

    const loadLogs = () => {
        setLoading(true);
        // 模拟作品发布日志数据
        setTimeout(() => {
            const mockLogs = [
                {
                    id: 'content_log001',
                    contentId: 'article_001',
                    contentTitle: '2025年城市轨道交通发展报告',
                    contentType: '文章',
                    action: '发布',
                    status: '成功',
                    publisher: '张编辑',
                    publisherId: 'user001',
                    reviewerId: 'user003',
                    reviewer: '王审核',
                    category: '技术报告',
                    tags: ['城轨', '发展报告', '2025'],
                    contentSize: '2.3MB',
                    wordCount: 8500,
                    publishTime: '2025-01-18 14:30:00',
                    reviewTime: '2025-01-18 14:00:00',
                    ipAddress: '192.168.1.100',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    remark: '审核通过后正常发布',
                    lifecycle: [
                        { action: '创建草稿', time: '2025-01-18 09:00:00', operator: '张编辑' },
                        { action: '提交审核', time: '2025-01-18 12:00:00', operator: '张编辑' },
                        { action: '审核通过', time: '2025-01-18 14:00:00', operator: '王审核' },
                        { action: '正式发布', time: '2025-01-18 14:30:00', operator: '张编辑' }
                    ]
                },
                {
                    id: 'content_log002',
                    contentId: 'video_002',
                    contentTitle: '智能列车控制系统演示',
                    contentType: '视频',
                    action: '上传',
                    status: '处理中',
                    publisher: '李技术',
                    publisherId: 'user002',
                    reviewerId: null,
                    reviewer: null,
                    category: '技术演示',
                    tags: ['智能控制', '列车系统'],
                    contentSize: '156MB',
                    wordCount: null,
                    publishTime: '2025-01-18 13:45:00',
                    reviewTime: null,
                    ipAddress: '192.168.1.101',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                    remark: '视频正在转码处理',
                    lifecycle: [
                        { action: '上传文件', time: '2025-01-18 13:45:00', operator: '李技术' },
                        { action: '开始转码', time: '2025-01-18 13:50:00', operator: '系统' }
                    ]
                },
                {
                    id: 'content_log003',
                    contentId: 'image_003',
                    contentTitle: '地铁站台安全标识设计方案',
                    contentType: '图片',
                    action: '删除',
                    status: '成功',
                    publisher: '赵设计',
                    publisherId: 'user004',
                    reviewerId: 'user001',
                    reviewer: '张管理',
                    category: '设计方案',
                    tags: ['安全标识', '地铁站台'],
                    contentSize: '8.9MB',
                    wordCount: null,
                    publishTime: '2025-01-17 16:20:00',
                    reviewTime: '2025-01-18 10:30:00',
                    ipAddress: '192.168.1.103',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
                    remark: '版权争议，管理员删除',
                    lifecycle: [
                        { action: '上传图片', time: '2025-01-17 16:20:00', operator: '赵设计' },
                        { action: '自动发布', time: '2025-01-17 16:21:00', operator: '系统' },
                        { action: '举报投诉', time: '2025-01-18 09:00:00', operator: '用户举报' },
                        { action: '管理员删除', time: '2025-01-18 10:30:00', operator: '张管理' }
                    ]
                },
                {
                    id: 'content_log004',
                    contentId: 'doc_004',
                    contentTitle: '轨道交通票务系统优化方案',
                    contentType: '文档',
                    action: '修改',
                    status: '成功',
                    publisher: '孙产品',
                    publisherId: 'user005',
                    reviewerId: 'user003',
                    reviewer: '王审核',
                    category: '产品方案',
                    tags: ['票务系统', '优化方案'],
                    contentSize: '5.2MB',
                    wordCount: 12000,
                    publishTime: '2025-01-18 11:15:00',
                    reviewTime: '2025-01-18 10:45:00',
                    ipAddress: '192.168.1.104',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    remark: '根据审核意见修改后重新发布',
                    lifecycle: [
                        { action: '创建文档', time: '2025-01-17 14:00:00', operator: '孙产品' },
                        { action: '提交审核', time: '2025-01-17 18:00:00', operator: '孙产品' },
                        { action: '审核意见', time: '2025-01-18 09:00:00', operator: '王审核' },
                        { action: '修改文档', time: '2025-01-18 10:30:00', operator: '孙产品' },
                        { action: '重新发布', time: '2025-01-18 11:15:00', operator: '孙产品' }
                    ]
                },
                {
                    id: 'content_log005',
                    contentId: 'news_005',
                    contentTitle: '2025年春运轨道交通保障措施',
                    contentType: '新闻',
                    action: '审核',
                    status: '拒绝',
                    publisher: '钱记者',
                    publisherId: 'user006',
                    reviewerId: 'user003',
                    reviewer: '王审核',
                    category: '新闻资讯',
                    tags: ['春运', '保障措施'],
                    contentSize: '1.8MB',
                    wordCount: 3200,
                    publishTime: null,
                    reviewTime: '2025-01-18 12:20:00',
                    ipAddress: '192.168.1.105',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    remark: '内容涉敏，需要修改后重新提交',
                    lifecycle: [
                        { action: '创建新闻', time: '2025-01-18 10:00:00', operator: '钱记者' },
                        { action: '提交审核', time: '2025-01-18 11:00:00', operator: '钱记者' },
                        { action: '审核拒绝', time: '2025-01-18 12:20:00', operator: '王审核' }
                    ]
                }
            ];
            setLogs(mockLogs);
            setLoading(false);
        }, 800);
    };

    const applyFilters = () => {
        let filtered = [...logs];

        // 日期范围过滤
        if (filters.dateRange && filters.dateRange.length === 2) {
            const [start, end] = filters.dateRange;
            filtered = filtered.filter(log => {
                const logDate = new Date(log.publishTime || log.reviewTime);
                return logDate >= start && logDate <= end;
            });
        }

        // 内容类型过滤
        if (filters.contentType) {
            filtered = filtered.filter(log => log.contentType === filters.contentType);
        }

        // 操作类型过滤
        if (filters.action) {
            filtered = filtered.filter(log => log.action === filters.action);
        }

        // 状态过滤
        if (filters.status) {
            filtered = filtered.filter(log => log.status === filters.status);
        }

        // 发布者过滤
        if (filters.publisher) {
            filtered = filtered.filter(log => log.publisher.includes(filters.publisher));
        }

        // 关键词搜索
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            filtered = filtered.filter(log => 
                log.contentTitle.toLowerCase().includes(keyword) ||
                log.publisher.toLowerCase().includes(keyword) ||
                log.category.toLowerCase().includes(keyword) ||
                (log.remark && log.remark.toLowerCase().includes(keyword))
            );
        }

        setFilteredLogs(filtered);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            dateRange: null,
            contentType: '',
            action: '',
            status: '',
            publisher: '',
            keyword: ''
        });
    };

    const handleViewDetail = (record) => {
        setSelectedLog(record);
        setDetailModalVisible(true);
    };

    const handleExport = () => {
        message.success('日志导出功能开发中...');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case '成功': return 'green';
            case '失败': return 'red';
            case '拒绝': return 'red';
            case '处理中': return 'orange';
            case '待审核': return 'blue';
            default: return 'default';
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case '发布': return 'green';
            case '上传': return 'blue';
            case '修改': return 'orange';
            case '删除': return 'red';
            case '审核': return 'purple';
            default: return 'default';
        }
    };

    const getContentTypeIcon = (type) => {
        switch (type) {
            case '文章': return '📄';
            case '视频': return '🎥';
            case '图片': return '🖼️';
            case '文档': return '📋';
            case '新闻': return '📰';
            default: return '📁';
        }
    };

    const columns = [
        {
            title: '内容信息',
            key: 'contentInfo',
            width: 250,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'title',
                        style: { 
                            fontWeight: 500, 
                            marginBottom: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        } 
                    }, [
                        React.createElement('span', { key: 'icon' }, getContentTypeIcon(record.contentType)),
                        React.createElement('span', { 
                            key: 'text',
                            style: { 
                                maxWidth: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }
                        }, record.contentTitle)
                    ]),
                    React.createElement('div', { 
                        key: 'meta',
                        style: { display: 'flex', gap: '8px', alignItems: 'center' }
                    }, [
                        React.createElement(Tag, { 
                            key: 'type',
                            size: 'small',
                            color: 'blue'
                        }, record.contentType),
                        React.createElement('span', { 
                            key: 'category',
                            style: { fontSize: '12px', color: '#8c8c8c' } 
                        }, record.category)
                    ])
                ])
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 80,
            filters: [
                { text: '发布', value: '发布' },
                { text: '上传', value: '上传' },
                { text: '修改', value: '修改' },
                { text: '删除', value: '删除' },
                { text: '审核', value: '审核' }
            ],
            render: (action) => (
                React.createElement(Tag, { color: getActionColor(action) }, action)
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            filters: [
                { text: '成功', value: '成功' },
                { text: '失败', value: '失败' },
                { text: '拒绝', value: '拒绝' },
                { text: '处理中', value: '处理中' },
                { text: '待审核', value: '待审核' }
            ],
            render: (status) => (
                React.createElement(Tag, { color: getStatusColor(status) }, status)
            )
        },
        {
            title: '发布者',
            dataIndex: 'publisher',
            key: 'publisher',
            width: 100
        },
        {
            title: '审核者',
            dataIndex: 'reviewer',
            key: 'reviewer',
            width: 100,
            render: (reviewer) => reviewer || '-'
        },
        {
            title: '时间信息',
            key: 'timeInfo',
            width: 160,
            render: (_, record) => (
                React.createElement('div', {}, [
                    record.publishTime && React.createElement('div', { 
                        key: 'publish',
                        style: { fontSize: '12px' } 
                    }, `发布：${record.publishTime}`),
                    record.reviewTime && React.createElement('div', { 
                        key: 'review',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, `审核：${record.reviewTime}`)
                ])
            )
        },
        {
            title: '内容规模',
            key: 'contentStats',
            width: 100,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'size',
                        style: { fontSize: '12px' } 
                    }, record.contentSize),
                    record.wordCount && React.createElement('div', { 
                        key: 'words',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, `${record.wordCount}字`)
                ])
            )
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            width: 150,
            render: (tags) => (
                React.createElement('div', {}, tags.slice(0, 2).map((tag, index) => 
                    React.createElement(Tag, { 
                        key: index,
                        size: 'small'
                    }, tag)
                ).concat(
                    tags.length > 2 ? [
                        React.createElement(Tooltip, {
                            key: 'more',
                            title: tags.slice(2).join(', ')
                        }, React.createElement(Tag, { size: 'small' }, `+${tags.length - 2}`))
                    ] : []
                ))
            )
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: 150,
            ellipsis: true,
            render: (remark) => (
                React.createElement(Tooltip, { title: remark }, 
                    React.createElement('span', { 
                        style: { cursor: 'pointer' } 
                    }, remark)
                )
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            render: (_, record) => (
                React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    onClick: () => handleViewDetail(record)
                }, '详情')
            )
        }
    ];

    // 顶部工具栏
    const renderToolbar = () => {
        return React.createElement('div', { 
            style: { 
                background: '#fff', 
                padding: '16px 24px', 
                marginBottom: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }
        }, [
            React.createElement('div', { 
                key: 'header',
                style: { 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }
            }, [
                React.createElement('div', { key: 'left' }, [
                    React.createElement('h2', { 
                        key: 'title',
                        style: { margin: 0, fontSize: '20px', fontWeight: 600 } 
                    }, '作品发布日志'),
                    React.createElement('p', { 
                        key: 'desc',
                        style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                    }, '追踪内容全生命周期记录，包括创建、审核、发布、修改、删除等操作（等保三级要求）')
                ]),
                React.createElement(Space, { key: 'right' }, [
                    React.createElement(Button, {
                        key: 'export',
                        icon: React.createElement('span', {}, '📊'),
                        onClick: handleExport
                    }, '导出日志'),
                    React.createElement(Button, {
                        key: 'refresh',
                        icon: React.createElement('span', {}, '🔄'),
                        onClick: loadLogs,
                        loading: loading
                    }, '刷新')
                ])
            ]),
            
            // 过滤器
            React.createElement('div', { 
                key: 'filters',
                style: { 
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }
            }, [
                React.createElement('div', { key: 'date-range' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '时间范围：'),
                    React.createElement(RangePicker, {
                        value: filters.dateRange,
                        onChange: (dates) => handleFilterChange('dateRange', dates),
                        style: { width: '200px' }
                    })
                ]),
                
                React.createElement('div', { key: 'content-type' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '内容类型：'),
                    React.createElement(Select, {
                        value: filters.contentType,
                        onChange: (value) => handleFilterChange('contentType', value),
                        style: { width: '100px' },
                        allowClear: true,
                        placeholder: '全部'
                    }, [
                        React.createElement(Option, { key: '文章', value: '文章' }, '文章'),
                        React.createElement(Option, { key: '视频', value: '视频' }, '视频'),
                        React.createElement(Option, { key: '图片', value: '图片' }, '图片'),
                        React.createElement(Option, { key: '文档', value: '文档' }, '文档'),
                        React.createElement(Option, { key: '新闻', value: '新闻' }, '新闻')
                    ])
                ]),
                
                React.createElement('div', { key: 'action-type' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '操作类型：'),
                    React.createElement(Select, {
                        value: filters.action,
                        onChange: (value) => handleFilterChange('action', value),
                        style: { width: '100px' },
                        allowClear: true,
                        placeholder: '全部'
                    }, [
                        React.createElement(Option, { key: '发布', value: '发布' }, '发布'),
                        React.createElement(Option, { key: '上传', value: '上传' }, '上传'),
                        React.createElement(Option, { key: '修改', value: '修改' }, '修改'),
                        React.createElement(Option, { key: '删除', value: '删除' }, '删除'),
                        React.createElement(Option, { key: '审核', value: '审核' }, '审核')
                    ])
                ]),
                
                React.createElement('div', { key: 'status' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '状态：'),
                    React.createElement(Select, {
                        value: filters.status,
                        onChange: (value) => handleFilterChange('status', value),
                        style: { width: '100px' },
                        allowClear: true,
                        placeholder: '全部'
                    }, [
                        React.createElement(Option, { key: '成功', value: '成功' }, '成功'),
                        React.createElement(Option, { key: '失败', value: '失败' }, '失败'),
                        React.createElement(Option, { key: '拒绝', value: '拒绝' }, '拒绝'),
                        React.createElement(Option, { key: '处理中', value: '处理中' }, '处理中'),
                        React.createElement(Option, { key: '待审核', value: '待审核' }, '待审核')
                    ])
                ]),
                
                React.createElement(Search, {
                    key: 'search',
                    placeholder: '搜索内容标题、发布者...',
                    style: { width: '200px' },
                    value: filters.keyword,
                    onChange: (e) => handleFilterChange('keyword', e.target.value),
                    allowClear: true
                }),
                
                React.createElement(Button, {
                    key: 'reset',
                    onClick: handleResetFilters
                }, '重置')
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        
        React.createElement(Card, { key: 'table-card' },
            React.createElement(Table, {
                columns: columns,
                dataSource: filteredLogs,
                rowKey: 'id',
                loading: loading,
                scroll: { x: 1400 },
                pagination: {
                    total: filteredLogs.length,
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
        ),

        // 详情弹窗
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '作品发布详情',
            visible: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            width: 900,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ]
        }, selectedLog && React.createElement('div', {}, [
            React.createElement(Descriptions, {
                key: 'basic-info',
                title: '基本信息',
                column: 2,
                bordered: true,
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Descriptions.Item, { 
                    key: 'contentTitle', 
                    label: '内容标题',
                    span: 2
                }, selectedLog.contentTitle),
                React.createElement(Descriptions.Item, { 
                    key: 'contentType', 
                    label: '内容类型' 
                }, React.createElement(Tag, { color: 'blue' }, selectedLog.contentType)),
                React.createElement(Descriptions.Item, { 
                    key: 'category', 
                    label: '分类' 
                }, selectedLog.category),
                React.createElement(Descriptions.Item, { 
                    key: 'action', 
                    label: '操作类型' 
                }, React.createElement(Tag, { color: getActionColor(selectedLog.action) }, selectedLog.action)),
                React.createElement(Descriptions.Item, { 
                    key: 'status', 
                    label: '状态' 
                }, React.createElement(Tag, { color: getStatusColor(selectedLog.status) }, selectedLog.status)),
                React.createElement(Descriptions.Item, { 
                    key: 'publisher', 
                    label: '发布者' 
                }, selectedLog.publisher),
                React.createElement(Descriptions.Item, { 
                    key: 'reviewer', 
                    label: '审核者' 
                }, selectedLog.reviewer || '-'),
                React.createElement(Descriptions.Item, { 
                    key: 'contentSize', 
                    label: '文件大小' 
                }, selectedLog.contentSize),
                React.createElement(Descriptions.Item, { 
                    key: 'wordCount', 
                    label: '字数' 
                }, selectedLog.wordCount ? `${selectedLog.wordCount}字` : '-'),
                React.createElement(Descriptions.Item, { 
                    key: 'publishTime', 
                    label: '发布时间' 
                }, selectedLog.publishTime || '-'),
                React.createElement(Descriptions.Item, { 
                    key: 'reviewTime', 
                    label: '审核时间' 
                }, selectedLog.reviewTime || '-'),
                React.createElement(Descriptions.Item, { 
                    key: 'ipAddress', 
                    label: 'IP地址' 
                }, selectedLog.ipAddress),
                React.createElement(Descriptions.Item, { 
                    key: 'tags', 
                    label: '标签',
                    span: 2
                }, selectedLog.tags.map((tag, index) => 
                    React.createElement(Tag, { key: index, style: { marginBottom: '4px' } }, tag)
                )),
                React.createElement(Descriptions.Item, { 
                    key: 'remark', 
                    label: '备注',
                    span: 2
                }, selectedLog.remark)
            ]),
            
            React.createElement('div', { key: 'lifecycle-title', style: { marginBottom: '16px' } }, 
                React.createElement('h3', { style: { margin: 0 } }, '生命周期记录')
            ),
            React.createElement(Timeline, {
                key: 'lifecycle',
                items: selectedLog.lifecycle.map((item, index) => ({
                    children: React.createElement('div', {}, [
                        React.createElement('div', { 
                            key: 'action',
                            style: { fontWeight: 500, marginBottom: '4px' } 
                        }, item.action),
                        React.createElement('div', { 
                            key: 'meta',
                            style: { fontSize: '12px', color: '#8c8c8c' } 
                        }, `${item.time} | ${item.operator}`)
                    ])
                }))
            })
        ]))
    ]);
};

// 确保组件被正确导出
window.ContentPublishLogs = ContentPublishLogs; 