// 系统反馈列表页面 - 基于文档6.4功能设计
const SystemFeedbackList = () => {
    const { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, Switch, message, Row, Col, Rate, TextArea, Drawer } = antd;
    const { Search } = Input;
    const { Option } = Select;

    const [loading, setLoading] = React.useState(false);
    const [feedbackList, setFeedbackList] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [filters, setFilters] = React.useState({
        status: 'all',
        type: 'all',
        keyword: ''
    });
    const [replyModalVisible, setReplyModalVisible] = React.useState(false);
    const [detailDrawerVisible, setDetailDrawerVisible] = React.useState(false);
    const [currentFeedback, setCurrentFeedback] = React.useState(null);
    const [templates, setTemplates] = React.useState([]);
    const [form] = Form.useForm();

    // 模拟数据
    const mockFeedbackData = [
        {
            id: 1,
            title: '视频播放卡顿问题',
            content: '在观看视频时经常出现卡顿现象，特别是高峰期，希望能够优化视频播放体验。',
            type: 'bug',
            priority: 'high',
            status: 'pending',
            userId: 1001,
            userName: '张三',
            userPhone: '13800138000',
            userEmail: 'zhangsan@example.com',
            rating: 2,
            createTime: '2024-01-15 14:30:00',
            updateTime: '2024-01-15 14:30:00',
            images: ['feedback1.jpg', 'feedback2.jpg'],
            deviceInfo: 'iPhone 13 Pro, iOS 16.5',
            appVersion: '2.1.0',
            reply: null,
            replyTime: null,
            replyBy: null
        },
        {
            id: 2,
            title: '建议增加夜间模式',
            content: '希望APP能够增加夜间模式功能，晚上使用时眼睛会比较累，深色主题会更舒适。',
            type: 'suggestion',
            priority: 'medium',
            status: 'in_progress',
            userId: 1002,
            userName: '李四',
            userPhone: '13800138001',
            userEmail: 'lisi@example.com',
            rating: 4,
            createTime: '2024-01-14 16:20:00',
            updateTime: '2024-01-15 10:30:00',
            images: [],
            deviceInfo: 'Samsung Galaxy S21, Android 12',
            appVersion: '2.0.8',
            reply: '您的建议很棒！我们已经将夜间模式功能纳入下个版本的开发计划中。',
            replyTime: '2024-01-15 10:30:00',
            replyBy: '产品团队'
        },
        {
            id: 3,
            title: '登录验证码收不到',
            content: '多次尝试登录，但是手机验证码一直收不到，请帮忙解决一下。',
            type: 'bug',
            priority: 'high',
            status: 'resolved',
            userId: 1003,
            userName: '王五',
            userPhone: '13800138002',
            userEmail: 'wangwu@example.com',
            rating: 1,
            createTime: '2024-01-13 10:15:00',
            updateTime: '2024-01-13 15:20:00',
            images: ['sms_issue.jpg'],
            deviceInfo: 'Xiaomi 12, MIUI 13',
            appVersion: '2.0.8',
            reply: '问题已修复，请您重新尝试获取验证码。如仍有问题请联系客服。',
            replyTime: '2024-01-13 15:20:00',
            replyBy: '技术支持'
        },
        {
            id: 4,
            title: '页面加载缓慢',
            content: '展会列表页面加载很慢，有时候需要等待10多秒才能显示内容。',
            type: 'bug',
            priority: 'medium',
            status: 'pending',
            userId: 1004,
            userName: '赵六',
            userPhone: '13800138003',
            userEmail: 'zhaoliu@example.com',
            rating: 2,
            createTime: '2024-01-16 09:45:00',
            updateTime: '2024-01-16 09:45:00',
            images: [],
            deviceInfo: 'iPhone 14, iOS 17.0',
            appVersion: '2.1.0',
            reply: null,
            replyTime: null,
            replyBy: null
        },
        {
            id: 5,
            title: '希望增加搜索过滤功能',
            content: '在搜索展会信息时，希望能够按照时间、地点、行业等条件进行过滤，提高搜索效率。',
            type: 'suggestion',
            priority: 'low',
            status: 'in_progress',
            userId: 1005,
            userName: '钱七',
            userPhone: '13800138004',
            userEmail: 'qianqi@example.com',
            rating: 5,
            createTime: '2024-01-15 11:20:00',
            updateTime: '2024-01-16 14:30:00',
            images: [],
            deviceInfo: 'OnePlus 9, Android 13',
            appVersion: '2.1.0',
            reply: '感谢您的建议！搜索过滤功能已在开发中，预计下月发布。',
            replyTime: '2024-01-16 14:30:00',
            replyBy: '产品团队'
        }
    ];

    const mockTemplates = [
        {
            id: 1,
            name: '问题确认模板',
            content: '感谢您的反馈！我们已收到您的问题报告，技术团队正在分析处理，预计在3个工作日内给您回复。'
        },
        {
            id: 2,
            name: '建议采纳模板',
            content: '感谢您的宝贵建议！我们会认真考虑您的建议，并在后续版本中评估实现的可能性。'
        },
        {
            id: 3,
            name: '问题解决模板',
            content: '您反馈的问题已经修复，请更新到最新版本并重新尝试。如果问题仍然存在，请联系客服。'
        }
    ];

    React.useEffect(() => {
        loadFeedbackList();
        setTemplates(mockTemplates);
    }, [pagination.current, pagination.pageSize, filters]);

    const loadFeedbackList = () => {
        setLoading(true);
        setTimeout(() => {
            // 模拟API调用
            let filteredData = [...mockFeedbackData];
            
            // 应用过滤条件
            if (filters.status !== 'all') {
                filteredData = filteredData.filter(item => item.status === filters.status);
            }
            if (filters.type !== 'all') {
                filteredData = filteredData.filter(item => item.type === filters.type);
            }
            if (filters.keyword) {
                filteredData = filteredData.filter(item => 
                    item.title.includes(filters.keyword) || 
                    item.content.includes(filters.keyword) ||
                    item.userName.includes(filters.keyword)
                );
            }

            setFeedbackList(filteredData);
            setPagination(prev => ({
                ...prev,
                total: filteredData.length
            }));
            setLoading(false);
        }, 1000);
    };

    // 获取反馈类型标签
    const getTypeTag = (type) => {
        const typeMap = {
            'bug': { color: 'red', text: 'Bug反馈' },
            'suggestion': { color: 'blue', text: '功能建议' },
            'complaint': { color: 'orange', text: '内容举报' },
            'other': { color: 'default', text: '其他' }
        };
        const config = typeMap[type] || typeMap['other'];
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 获取处理状态标签
    const getStatusTag = (status) => {
        const statusMap = {
            'pending': { color: 'orange', text: '待处理' },
            'in_progress': { color: 'blue', text: '处理中' },
            'resolved': { color: 'green', text: '已解决' },
            'closed': { color: 'default', text: '已关闭' }
        };
        const config = statusMap[status] || statusMap['pending'];
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 获取优先级标签
    const getPriorityTag = (priority) => {
        const priorityMap = {
            'high': { color: 'red', text: '高优先级' },
            'medium': { color: 'orange', text: '中优先级' },
            'low': { color: 'green', text: '低优先级' }
        };
        const config = priorityMap[priority] || priorityMap['medium'];
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 处理反馈
    const handleReply = (record) => {
        setCurrentFeedback(record);
        setReplyModalVisible(true);
        form.resetFields();
    };

    // 查看详情
    const handleViewDetail = (record) => {
        setCurrentFeedback(record);
        setDetailDrawerVisible(true);
    };

    // 提交回复
    const handleSubmitReply = () => {
        form.validateFields().then(values => {
            setLoading(true);
            setTimeout(() => {
                message.success('回复已发送');
                setReplyModalVisible(false);
                loadFeedbackList();
                setLoading(false);
            }, 1000);
        });
    };

    // 应用模板
    const handleApplyTemplate = (templateContent) => {
        form.setFieldsValue({ reply: templateContent });
    };

    // 表格列定义
    const columns = [
        {
            title: '反馈ID',
            dataIndex: 'id',
            key: 'id',
            width: 80
        },
        {
            title: '反馈标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            width: 200
        },
        {
            title: '反馈用户',
            key: 'user',
            width: 120,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { key: 'name' }, record.userName),
                    React.createElement('div', { 
                        key: 'id',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, `ID: ${record.userId}`)
                ])
            )
        },
        {
            title: '反馈类型',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render: (type) => getTypeTag(type)
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority) => getPriorityTag(priority)
        },
        {
            title: '处理状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => getStatusTag(status)
        },
        {
            title: '用户评分',
            dataIndex: 'rating',
            key: 'rating',
            width: 120,
            render: (rating) => React.createElement(Rate, { 
                disabled: true, 
                value: rating, 
                style: { fontSize: '14px' } 
            })
        },
        {
            title: '反馈时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'detail',
                        type: 'link',
                        size: 'small',
                        onClick: () => handleViewDetail(record)
                    }, '查看详情'),
                    React.createElement(Button, {
                        key: 'reply',
                        type: 'link',
                        size: 'small',
                        disabled: record.status === 'resolved',
                        onClick: () => handleReply(record)
                    }, '处理')
                ])
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('div', { key: 'left' }, [
                React.createElement('h2', { 
                    key: 'title',
                    style: { margin: 0, fontSize: '20px', fontWeight: 600 } 
                }, '系统反馈列表'),
                React.createElement('p', { 
                    key: 'desc',
                    style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                }, '集中展示APP用户反馈信息，方便运营人员处理用户问题和建议')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(Button, {
                    key: 'refresh-btn',
                    type: 'primary',
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: loadFeedbackList
                }, '刷新数据')
            ])
        ]);
    };

    // 过滤器
    const renderFilters = () => {
        return React.createElement(Card, { 
            size: 'small',
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Row, { key: 'filters', gutter: [16, 16], align: 'middle' }, [
                React.createElement(Col, { xs: 24, sm: 8, md: 6 },
                    React.createElement(Search, {
                        placeholder: '搜索标题、内容或用户名',
                        value: filters.keyword,
                        onChange: (e) => setFilters(prev => ({ ...prev, keyword: e.target.value })),
                        onSearch: loadFeedbackList,
                        style: { width: '100%' }
                    })
                ),
                React.createElement(Col, { xs: 24, sm: 8, md: 4 },
                    React.createElement(Select, {
                        placeholder: '反馈类型',
                        value: filters.type,
                        onChange: (value) => setFilters(prev => ({ ...prev, type: value })),
                        style: { width: '100%' }
                    }, [
                        React.createElement(Option, { key: 'all', value: 'all' }, '全部类型'),
                        React.createElement(Option, { key: 'bug', value: 'bug' }, 'Bug反馈'),
                        React.createElement(Option, { key: 'suggestion', value: 'suggestion' }, '功能建议'),
                        React.createElement(Option, { key: 'complaint', value: 'complaint' }, '内容举报'),
                        React.createElement(Option, { key: 'other', value: 'other' }, '其他')
                    ])
                ),
                React.createElement(Col, { xs: 24, sm: 8, md: 4 },
                    React.createElement(Select, {
                        placeholder: '处理状态',
                        value: filters.status,
                        onChange: (value) => setFilters(prev => ({ ...prev, status: value })),
                        style: { width: '100%' }
                    }, [
                        React.createElement(Option, { key: 'all', value: 'all' }, '全部状态'),
                        React.createElement(Option, { key: 'pending', value: 'pending' }, '待处理'),
                        React.createElement(Option, { key: 'in_progress', value: 'in_progress' }, '处理中'),
                        React.createElement(Option, { key: 'resolved', value: 'resolved' }, '已解决'),
                        React.createElement(Option, { key: 'closed', value: 'closed' }, '已关闭')
                    ])
                )
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        renderFilters(),
        
        React.createElement(Card, { key: 'table-card' },
            React.createElement(Table, {
                columns: columns,
                dataSource: feedbackList,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    ...pagination,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `共 ${total} 条记录，显示第 ${range[0]}-${range[1]} 条`,
                    onChange: (page, pageSize) => {
                        setPagination(prev => ({ ...prev, current: page, pageSize }));
                    }
                },
                scroll: { x: 1200 }
            })
        ),

        // 回复模态框
        React.createElement(Modal, {
            key: 'reply-modal',
            title: '处理反馈',
            open: replyModalVisible,
            onOk: handleSubmitReply,
            onCancel: () => setReplyModalVisible(false),
            confirmLoading: loading,
            width: 800
        }, [
            currentFeedback && React.createElement('div', { key: 'feedback-info', style: { marginBottom: '16px' } }, [
                React.createElement('h4', { key: 'title' }, currentFeedback.title),
                React.createElement('p', { key: 'content', style: { color: '#8c8c8c' } }, currentFeedback.content)
            ]),

            React.createElement(Form, {
                key: 'reply-form',
                form: form,
                layout: 'vertical'
            }, [
                React.createElement(Form.Item, {
                    key: 'templates',
                    label: '快速回复模板'
                }, 
                    React.createElement(Space, { wrap: true },
                        templates.map(template => 
                            React.createElement(Button, {
                                key: template.id,
                                size: 'small',
                                onClick: () => handleApplyTemplate(template.content)
                            }, template.name)
                        )
                    )
                ),

                React.createElement(Form.Item, {
                    key: 'reply',
                    name: 'reply',
                    label: '回复内容',
                    rules: [{ required: true, message: '请输入回复内容' }]
                }, 
                    React.createElement(TextArea, {
                        rows: 6,
                        placeholder: '请输入回复内容...'
                    })
                ),

                React.createElement(Form.Item, {
                    key: 'status',
                    name: 'status',
                    label: '更新状态'
                }, 
                    React.createElement(Select, {
                        placeholder: '选择处理状态'
                    }, [
                        React.createElement(Option, { key: 'in_progress', value: 'in_progress' }, '处理中'),
                        React.createElement(Option, { key: 'resolved', value: 'resolved' }, '已解决'),
                        React.createElement(Option, { key: 'closed', value: 'closed' }, '已关闭')
                    ])
                )
            ])
        ]),

        // 详情抽屉
        React.createElement(Drawer, {
            key: 'detail-drawer',
            title: '反馈详情',
            placement: 'right',
            width: 600,
            open: detailDrawerVisible,
            onClose: () => setDetailDrawerVisible(false)
        }, 
            currentFeedback && React.createElement('div', {}, [
                React.createElement('h3', { key: 'title' }, currentFeedback.title),
                React.createElement('p', { key: 'content', style: { marginBottom: '16px' } }, currentFeedback.content),
                
                React.createElement('div', { key: 'meta', style: { marginBottom: '16px' } }, [
                    React.createElement('p', { key: 'user' }, `反馈用户：${currentFeedback.userName} (${currentFeedback.userId})`),
                    React.createElement('p', { key: 'contact' }, `联系方式：${currentFeedback.userPhone} / ${currentFeedback.userEmail}`),
                    React.createElement('p', { key: 'device' }, `设备信息：${currentFeedback.deviceInfo}`),
                    React.createElement('p', { key: 'version' }, `应用版本：${currentFeedback.appVersion}`),
                    React.createElement('p', { key: 'time' }, `反馈时间：${currentFeedback.createTime}`)
                ]),

                currentFeedback.reply && React.createElement('div', { key: 'reply', style: { marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '6px' } }, [
                    React.createElement('h4', { key: 'title' }, '官方回复：'),
                    React.createElement('p', { key: 'content' }, currentFeedback.reply),
                    React.createElement('p', { key: 'meta', style: { fontSize: '12px', color: '#8c8c8c' } }, 
                        `${currentFeedback.replyBy} 回复于 ${currentFeedback.replyTime}`
                    )
                ])
            ])
        )
    ]);
};

// 确保组件被正确导出
window.SystemFeedbackList = SystemFeedbackList; 