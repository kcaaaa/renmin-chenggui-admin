// 内容管理页面 - v3升级版
const ContentManagement = () => {
    const { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Switch, message, Row, Col, Statistic, DatePicker, Tabs, Tooltip, Popconfirm } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    const { TextArea } = Input;

    const [loading, setLoading] = React.useState(false);
    const [contentList, setContentList] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [filters, setFilters] = React.useState({
        contentType: 'all',
        status: 'all',
        keyword: '',
        dateRange: null
    });
    const [selectedContent, setSelectedContent] = React.useState(null);
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [commentModalVisible, setCommentModalVisible] = React.useState(false);
    const [previewModalVisible, setPreviewModalVisible] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [form] = Form.useForm();

    // 模拟当前用户信息（用于权限判断）
    const currentUser = {
        id: 1001,
        name: '张三',
        role: 'user', // user: 普通用户, association: 协会用户, exhibitor: 展商用户
        permissions: ['content:view', 'content:edit', 'content:delete']
    };

    // 模拟本账号发布的内容数据（v3调整：仅显示本账号内容）
    const mockContentData = [
        {
            id: 1,
            title: '城轨建设最新进展',
            type: 'video',
            publisher: '张三',
            publisherId: 1001,
            publishTime: '2024-01-15 14:30:00',
            status: 'published',
            auditStatus: 'passed',
            board: 'content', // v3新增：明确内容归属板块
            viewCount: 12580,
            likeCount: 234,
            commentCount: 56,
            shareCount: 89,
            recommendCount: 156, // v3新增：推荐数
            duration: '3:45',
            thumbnail: '/images/video-thumb-1.jpg',
            tags: ['城轨建设', '最新进展'],
            description: '介绍最新的城轨建设进展情况...',
            rejectReason: null // v3新增：驳回原因
        },
        {
            id: 2,
            title: '轨道交通技术创新分享',
            type: 'image',
            publisher: '张三',
            publisherId: 1001,
            publishTime: '2024-01-14 16:20:00',
            status: 'published',
            auditStatus: 'passed',
            board: 'content',
            viewCount: 8960,
            likeCount: 156,
            commentCount: 32,
            shareCount: 45,
            recommendCount: 89, // v3新增：推荐数
            imageCount: 5,
            tags: ['技术创新', '分享'],
            description: '轨道交通领域的技术创新案例分享...',
            rejectReason: null
        },
        {
            id: 3,
            title: '智能调度系统研究',
            type: 'video',
            publisher: '张三',
            publisherId: 1001,
            publishTime: '2024-01-13 10:15:00',
            status: 'rejected',
            auditStatus: 'ai_rejected',
            board: 'content',
            viewCount: 0,
            likeCount: 0,
            commentCount: 0,
            shareCount: 0,
            recommendCount: 0,
            duration: '2:30',
            tags: ['智能调度', '研究'],
            description: '智能调度系统的深度研究...',
            rejectReason: '内容中包含敏感词汇，请修改后重新提交' // v3新增：驳回原因
        }
    ];

    // 模拟评论数据
    const mockCommentsData = {
        1: [
            {
                id: 101,
                contentId: 1,
                user: '李四',
                userId: 2001,
                content: '很有用的分享，学到了不少！',
                createTime: '2024-01-15 15:30:00',
                status: 'approved',
                replyContent: '感谢支持！'
            },
            {
                id: 102,
                contentId: 1,
                user: '王五',
                userId: 2002,
                content: '希望能有更多这样的技术分享',
                createTime: '2024-01-15 16:20:00',
                status: 'approved',
                replyContent: ''
            }
        ]
    };

    React.useEffect(() => {
        loadContentList();
    }, [pagination.current, pagination.pageSize, filters]);

    const loadContentList = async () => {
        setLoading(true);
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 800));
            
            let filteredData = [...mockContentData];
            
            // v3更新：仅显示当前用户发布的内容
            filteredData = filteredData.filter(item => item.publisherId === currentUser.id);
            
            // 应用过滤器
            if (filters.contentType !== 'all') {
                filteredData = filteredData.filter(item => item.type === filters.contentType);
            }
            if (filters.status !== 'all') {
                filteredData = filteredData.filter(item => item.status === filters.status);
            }
            if (filters.keyword) {
                filteredData = filteredData.filter(item => 
                    item.title.includes(filters.keyword) || 
                    item.description.includes(filters.keyword)
                );
            }
            
            setContentList(filteredData);
            setPagination(prev => ({
                ...prev,
                total: filteredData.length
            }));
        } catch (error) {
            message.error('加载内容列表失败');
        } finally {
            setLoading(false);
        }
    };

    // v3新增：加载评论数据
    const loadComments = async (contentId) => {
        try {
            const contentComments = mockCommentsData[contentId] || [];
            setComments(contentComments);
        } catch (error) {
            message.error('加载评论失败');
        }
    };

    // v3新增：回复评论
    const handleReplyComment = async (commentId, replyContent) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setComments(prev => 
                prev.map(comment => 
                    comment.id === commentId 
                        ? { ...comment, replyContent }
                        : comment
                )
            );
            message.success('回复成功');
        } catch (error) {
            message.error('回复失败');
        }
    };

    // v3新增：删除评论
    const handleDeleteComment = async (commentId) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setComments(prev => prev.filter(comment => comment.id !== commentId));
            message.success('删除成功');
        } catch (error) {
            message.error('删除失败');
        }
    };

    const handleStatusChange = async (contentId, newStatus) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setContentList(prev => 
                prev.map(item => 
                    item.id === contentId 
                        ? { ...item, status: newStatus }
                        : item
                )
            );
            message.success('状态更新成功');
        } catch (error) {
            message.error('状态更新失败');
        }
    };

    const getStatusTag = (status) => {
        const statusMap = {
            published: { color: 'green', text: '已发布' },
            pending: { color: 'orange', text: '待审核' },
            rejected: { color: 'red', text: '已拒绝' },
            draft: { color: 'gray', text: '草稿' },
            offline: { color: 'default', text: '已下架' }
        };
        const config = statusMap[status] || { color: 'gray', text: '未知' };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getAuditStatusTag = (status) => {
        const statusMap = {
            passed: { color: 'green', text: '审核通过' },
            rejected: { color: 'red', text: '审核拒绝' },
            ai_rejected: { color: 'red', text: 'AI审核拒绝' },
            ai_pending: { color: 'blue', text: 'AI审核中' },
            manual_pending: { color: 'orange', text: '人工审核中' },
            pending: { color: 'gray', text: '待审核' }
        };
        const config = statusMap[status] || { color: 'gray', text: '未知' };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // v3更新：内容归属板块显示
    const getBoardTag = (board) => {
        const boardMap = {
            association: { color: 'blue', text: '协会板块' },
            content: { color: 'green', text: '推荐板块' },
            exhibition: { color: 'purple', text: '展会板块' },
            personal: { color: 'orange', text: '个人主页' }
        };
        const config = boardMap[board] || { color: 'gray', text: '未知板块' };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const columns = [
        {
            title: '内容信息',
            key: 'content',
            width: 300,
            render: (_, record) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center' }
            }, [
                React.createElement('div', {
                    key: 'thumb',
                    style: {
                        width: 60,
                        height: 60,
                        background: '#f0f0f0',
                        borderRadius: 4,
                        marginRight: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24
                    }
                }, record.type === 'video' ? '🎬' : '🖼️'),
                React.createElement('div', { key: 'info' }, [
                    React.createElement('div', {
                        key: 'title',
                        style: { fontWeight: 'bold', marginBottom: 4 }
                    }, record.title),
                    React.createElement('div', {
                        key: 'meta',
                        style: { fontSize: 12, color: '#666' }
                    }, [
                        getBoardTag(record.board),
                        React.createElement('span', {
                            key: 'type',
                            style: { marginLeft: 8 }
                        }, record.type === 'video' ? '视频' : '图文')
                    ])
                ])
            ])
        },
        {
            title: '发布时间',
            dataIndex: 'publishTime',
            width: 150,
            sorter: true
        },
        {
            title: '状态',
            key: 'status',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                getStatusTag(record.status),
                React.createElement('br', { key: 'br' }),
                getAuditStatusTag(record.auditStatus),
                // v3新增：显示驳回原因
                record.rejectReason && React.createElement(Tooltip, {
                    key: 'reason',
                    title: record.rejectReason
                }, React.createElement(Tag, { 
                    color: 'red', 
                    style: { marginTop: 4, cursor: 'pointer' }
                }, '查看原因'))
            ])
        },
        {
            title: '数据统计',
            key: 'stats',
            width: 150,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: 12 }
            }, [
                React.createElement('div', { key: 'view' }, `观看：${record.viewCount}`),
                React.createElement('div', { key: 'like' }, `点赞：${record.likeCount}`),
                React.createElement('div', { key: 'comment' }, `评论：${record.commentCount}`),
                // v3新增：推荐数显示
                React.createElement('div', { key: 'recommend' }, `推荐：${record.recommendCount}`)
            ])
        },
        {
            title: '操作',
            key: 'actions',
            width: 250,
            render: (_, record) => React.createElement(Space, { wrap: true }, [
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => {
                        setSelectedContent(record);
                        setDetailModalVisible(true);
                    }
                }, '查看详情'),
                React.createElement(Button, {
                    key: 'preview',
                    type: 'link',
                    size: 'small',
                    onClick: () => {
                        setSelectedContent(record);
                        setPreviewModalVisible(true);
                    }
                }, '预览'),
                // v3新增：评论管理
                React.createElement(Button, {
                    key: 'comments',
                    type: 'link',
                    size: 'small',
                    onClick: () => {
                        setSelectedContent(record);
                        loadComments(record.id);
                        setCommentModalVisible(true);
                    }
                }, `评论(${record.commentCount})`),
                record.status === 'published' ? 
                    React.createElement(Button, {
                        key: 'hide',
                        type: 'link',
                        size: 'small',
                        danger: true,
                        onClick: () => handleStatusChange(record.id, 'offline')
                    }, '下架') :
                    record.status === 'draft' ?
                    React.createElement(Button, {
                        key: 'publish',
                        type: 'link',
                        size: 'small',
                        onClick: () => handleStatusChange(record.id, 'pending')
                    }, '提交审核') :
                    React.createElement(Button, {
                        key: 'edit',
                        type: 'link',
                        size: 'small'
                    }, '编辑'),
                React.createElement(Popconfirm, {
                    key: 'delete',
                    title: '确定要删除这个作品吗？',
                    onConfirm: () => {
                        message.success('删除成功');
                        loadContentList();
                    }
                }, React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    danger: true
                }, '删除'))
            ])
        }
    ];

    // v3移除：统计卡片（简化界面）
    const renderFilters = () => {
        return React.createElement(Card, {
            size: 'small',
            style: { marginBottom: 16 }
        }, React.createElement(Row, { gutter: 16, align: 'middle' }, [
            React.createElement(Col, { key: 'type', span: 4 },
                React.createElement(Select, {
                    placeholder: '内容类型',
                    value: filters.contentType,
                    onChange: (value) => setFilters(prev => ({ ...prev, contentType: value })),
                    style: { width: '100%' }
                }, [
                    React.createElement(Option, { key: 'all', value: 'all' }, '全部类型'),
                    React.createElement(Option, { key: 'video', value: 'video' }, '视频'),
                    React.createElement(Option, { key: 'image', value: 'image' }, '图文')
                ])
            ),
            React.createElement(Col, { key: 'status', span: 4 },
                React.createElement(Select, {
                    placeholder: '发布状态',
                    value: filters.status,
                    onChange: (value) => setFilters(prev => ({ ...prev, status: value })),
                    style: { width: '100%' }
                }, [
                    React.createElement(Option, { key: 'all', value: 'all' }, '全部状态'),
                    React.createElement(Option, { key: 'published', value: 'published' }, '已发布'),
                    React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                    React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝'),
                    React.createElement(Option, { key: 'draft', value: 'draft' }, '草稿'),
                    React.createElement(Option, { key: 'offline', value: 'offline' }, '已下架')
                ])
            ),
            React.createElement(Col, { key: 'date', span: 6 },
                React.createElement(RangePicker, {
                    placeholder: ['开始日期', '结束日期'],
                    value: filters.dateRange,
                    onChange: (dates) => setFilters(prev => ({ ...prev, dateRange: dates })),
                    style: { width: '100%' }
                })
            ),
            React.createElement(Col, { key: 'search', span: 6 },
                React.createElement(Search, {
                    placeholder: '搜索标题或内容',
                    value: filters.keyword,
                    onChange: (e) => setFilters(prev => ({ ...prev, keyword: e.target.value })),
                    onSearch: loadContentList,
                    enterButton: true
                })
            ),
            React.createElement(Col, { key: 'refresh', span: 4 },
                React.createElement(Button, {
                    onClick: loadContentList,
                    style: { width: '100%' }
                }, '手动刷新')
            )
        ]));
    };

    // v3新增：评论管理模态框
    const renderCommentModal = () => {
        return React.createElement(Modal, {
            title: '评论管理',
            visible: commentModalVisible,
            onCancel: () => setCommentModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setCommentModalVisible(false)
                }, '关闭')
            ],
            width: 800
        }, React.createElement('div', {}, 
            comments.length === 0 ? 
                React.createElement('div', {
                    style: { textAlign: 'center', padding: '40px 0', color: '#999' }
                }, '暂无评论') :
                comments.map(comment => 
                    React.createElement('div', {
                        key: comment.id,
                        style: { 
                            border: '1px solid #f0f0f0', 
                            padding: 16, 
                            marginBottom: 12,
                            borderRadius: 4
                        }
                    }, [
                        React.createElement('div', {
                            key: 'header',
                            style: { 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: 8
                            }
                        }, [
                            React.createElement('span', { key: 'user' }, comment.user),
                            React.createElement('span', { 
                                key: 'time',
                                style: { color: '#999', fontSize: 12 }
                            }, comment.createTime)
                        ]),
                        React.createElement('div', {
                            key: 'content',
                            style: { marginBottom: 8 }
                        }, comment.content),
                        comment.replyContent && React.createElement('div', {
                            key: 'reply',
                            style: { 
                                background: '#f8f9fa', 
                                padding: 8, 
                                borderRadius: 4,
                                marginBottom: 8
                            }
                        }, [
                            React.createElement('strong', { key: 'label' }, '我的回复：'),
                            comment.replyContent
                        ]),
                        React.createElement(Space, { key: 'actions' }, [
                            React.createElement(Button, {
                                key: 'reply',
                                size: 'small',
                                onClick: () => {
                                    const reply = prompt('请输入回复内容：');
                                    if (reply) {
                                        handleReplyComment(comment.id, reply);
                                    }
                                }
                            }, comment.replyContent ? '修改回复' : '回复'),
                            React.createElement(Popconfirm, {
                                key: 'delete',
                                title: '确定要删除这条评论吗？',
                                onConfirm: () => handleDeleteComment(comment.id)
                            }, React.createElement(Button, {
                                size: 'small',
                                danger: true
                            }, '删除'))
                        ])
                    ])
                )
        ));
    };

    // v3新增：内容预览模态框
    const renderPreviewModal = () => {
        if (!selectedContent) return null;

        return React.createElement(Modal, {
            title: '内容预览',
            visible: previewModalVisible,
            onCancel: () => setPreviewModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setPreviewModalVisible(false)
                }, '关闭')
            ],
            width: 900
        }, React.createElement('div', {
            style: { 
                background: '#f8f9fa',
                padding: 20,
                borderRadius: 8
            }
        }, [
            React.createElement('h2', { 
                key: 'title',
                style: { marginBottom: 16 }
            }, selectedContent.title),
            React.createElement('div', {
                key: 'content',
                style: {
                    background: '#fff',
                    padding: 16,
                    borderRadius: 4,
                    minHeight: 200
                }
            }, [
                selectedContent.type === 'video' ?
                    React.createElement('div', {
                        key: 'video',
                        style: {
                            width: '100%',
                            height: 300,
                            background: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: 18
                        }
                    }, `视频预览 (${selectedContent.duration})`) :
                    React.createElement('div', {
                        key: 'images',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 8
                        }
                    }, Array(selectedContent.imageCount || 1).fill(0).map((_, index) =>
                        React.createElement('div', {
                            key: index,
                            style: {
                                height: 100,
                                background: '#f0f0f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }, `图片 ${index + 1}`)
                    )),
                React.createElement('p', {
                    key: 'desc',
                    style: { marginTop: 16 }
                }, selectedContent.description)
            ])
        ]));
    };

    const renderDetailModal = () => {
        if (!selectedContent) return null;

        return React.createElement(Modal, {
            title: '内容详情',
            visible: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ],
            width: 800
        }, React.createElement('div', {}, [
            React.createElement('h3', { key: 'title' }, selectedContent.title),
            React.createElement('p', { key: 'desc' }, selectedContent.description),
            React.createElement('div', { key: 'meta', style: { marginTop: 16 } }, [
                React.createElement('p', { key: 'time' }, `发布时间：${selectedContent.publishTime}`),
                React.createElement('p', { key: 'board' }, ['发布板块：', getBoardTag(selectedContent.board)]),
                React.createElement('p', { key: 'type' }, `内容类型：${selectedContent.type === 'video' ? '视频' : '图文'}`),
                selectedContent.duration && React.createElement('p', { key: 'duration' }, `视频时长：${selectedContent.duration}`),
                selectedContent.imageCount && React.createElement('p', { key: 'images' }, `图片数量：${selectedContent.imageCount}张`),
                // v3新增：推荐数显示
                React.createElement('p', { key: 'recommend' }, `推荐数：${selectedContent.recommendCount}`),
                // v3新增：驳回原因显示
                selectedContent.rejectReason && React.createElement('p', { 
                    key: 'reason',
                    style: { color: '#ff4d4f' }
                }, `驳回原因：${selectedContent.rejectReason}`)
            ])
        ]));
    };

    return React.createElement('div', { className: 'page-fade-in' }, [
        React.createElement('div', { key: 'header', className: 'page-header' }, [
            React.createElement('h1', { key: 'title', className: 'page-title' }, '内容管理'),
            React.createElement('p', { key: 'desc', className: 'page-description' }, 
                '管理我发布的全部作品，查看浏览、点赞、评论、推荐数据，回复或删除评论'
            )
        ]),

        renderFilters(),

        React.createElement(Card, { key: 'table-card' }, [
            React.createElement('div', {
                key: 'table-header',
                style: { 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 16 
                }
            }, [
                React.createElement('h3', { key: 'title' }, '我的作品列表'),
                React.createElement(Space, { key: 'actions' }, [
                    React.createElement(Button, {
                        key: 'publish',
                        type: 'primary',
                        onClick: () => {
                            // 跳转到发布页面
                            message.info('跳转到内容发布页面');
                        }
                    }, '发布新作品'),
                    React.createElement(Button, {
                        key: 'export',
                        onClick: () => {
                            message.success('数据导出成功');
                        }
                    }, '导出数据')
                ])
            ]),

            React.createElement(Table, {
                key: 'table',
                columns: columns,
                dataSource: contentList,
                loading: loading,
                pagination: {
                    ...pagination,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`,
                    onChange: (page, pageSize) => {
                        setPagination(prev => ({ ...prev, current: page, pageSize }));
                    }
                },
                rowKey: 'id',
                scroll: { x: 1200 }
            })
        ]),

        renderDetailModal(),
        renderCommentModal(), // v3新增
        renderPreviewModal() // v3新增
    ]);
};

window.ContentManagement = ContentManagement; 