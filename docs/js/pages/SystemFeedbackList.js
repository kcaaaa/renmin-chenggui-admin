// 系统反馈列表页面
const SystemFeedbackList = () => {
    const { Card, Table, Button, Modal, Form, Input, Select, Tag, Space, message, DatePicker } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [viewingFeedback, setViewingFeedback] = React.useState(null);
    const [filters, setFilters] = React.useState({
        type: '',
        status: '',
        dateRange: null,
        keyword: ''
    });

    // 模拟反馈数据
    const mockData = [
        {
            key: '1',
            id: 'FB001',
            userId: 'U001',
            userName: '张三',
            type: 'bug',
            title: '视频播放卡顿问题',
            content: '在观看视频时经常出现卡顿现象，特别是网络较差的情况下。建议优化视频加载机制。',
            status: 'pending',
            submitTime: '2024-01-15 14:30:00',
            handleTime: null,
            handler: null,
            reply: null,
            priority: 'high'
        },
        {
            key: '2',
            id: 'FB002',
            userId: 'U002',
            userName: '李四',
            type: 'feature',
            title: '希望增加夜间模式',
            content: '建议APP增加夜间模式功能，在光线较暗的环境下使用更舒适。',
            status: 'processing',
            submitTime: '2024-01-15 10:20:00',
            handleTime: '2024-01-15 15:00:00',
            handler: '产品经理',
            reply: '感谢您的建议，夜间模式功能已列入开发计划。',
            priority: 'medium'
        },
        {
            key: '3',
            id: 'FB003',
            userId: 'U003',
            userName: '王五',
            type: 'complaint',
            title: '内容审核过慢',
            content: '发布的内容审核时间过长，希望能够加快审核速度。',
            status: 'resolved',
            submitTime: '2024-01-14 16:45:00',
            handleTime: '2024-01-15 09:30:00',
            handler: '运营专员',
            reply: '我们已优化审核流程，审核时间将大幅缩短。',
            priority: 'medium'
        }
    ];

    React.useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(mockData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    const handleView = (record) => {
        setViewingFeedback(record);
        setModalVisible(true);
    };

    const handleProcess = (record) => {
        Modal.confirm({
            title: '处理反馈',
            content: (
                React.createElement('div', {}, [
                    React.createElement('p', { key: 'question' }, '确定要将此反馈标记为"处理中"吗？'),
                    React.createElement(Input.TextArea, {
                        key: 'reply',
                        placeholder: '请输入处理说明',
                        rows: 3
                    })
                ])
            ),
            onOk() {
                message.success('处理成功');
                loadData();
            }
        });
    };

    const handleResolve = (record) => {
        Modal.confirm({
            title: '解决反馈',
            content: (
                React.createElement('div', {}, [
                    React.createElement('p', { key: 'question' }, '确定要将此反馈标记为"已解决"吗？'),
                    React.createElement(Input.TextArea, {
                        key: 'reply',
                        placeholder: '请输入解决方案说明',
                        rows: 3
                    })
                ])
            ),
            onOk() {
                message.success('已标记为解决');
                loadData();
            }
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getTypeTag = (type) => {
        const typeMap = {
            'bug': { color: 'red', text: 'Bug反馈' },
            'feature': { color: 'blue', text: '功能建议' },
            'complaint': { color: 'orange', text: '内容举报' },
            'other': { color: 'default', text: '其他' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getStatusTag = (status) => {
        const statusMap = {
            'pending': { color: 'orange', text: '待处理' },
            'processing': { color: 'blue', text: '处理中' },
            'resolved': { color: 'green', text: '已解决' },
            'closed': { color: 'default', text: '已关闭' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getPriorityTag = (priority) => {
        const priorityMap = {
            'high': { color: 'red', text: '高' },
            'medium': { color: 'orange', text: '中' },
            'low': { color: 'default', text: '低' }
        };
        const config = priorityMap[priority] || { color: 'default', text: priority };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const columns = [
        {
            title: '反馈ID',
            dataIndex: 'id',
            key: 'id',
            width: 80
        },
        {
            title: '用户信息',
            key: 'user',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'name' }, record.userName),
                React.createElement('div', { 
                    key: 'id',
                    style: { fontSize: '12px', color: '#666' }
                }, record.userId)
            ])
        },
        {
            title: '反馈类型',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render: getTypeTag
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            ellipsis: true
        },
        {
            title: '内容摘要',
            dataIndex: 'content',
            key: 'content',
            width: 250,
            ellipsis: true,
            render: (text) => text.length > 50 ? text.substring(0, 50) + '...' : text
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 80,
            render: getPriorityTag
        },
        {
            title: '处理状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
            width: 150
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleView(record)
                }, '查看详情'),
                record.status === 'pending' && React.createElement(Button, {
                    key: 'process',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleProcess(record)
                }, '处理'),
                record.status === 'processing' && React.createElement(Button, {
                    key: 'resolve',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleResolve(record)
                }, '解决')
            ])
        }
    ];

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16 }
            }, 
                React.createElement('h3', {}, '系统反馈列表')
            ),

            React.createElement('div', {
                key: 'description',
                style: { 
                    padding: '12px', 
                    background: '#f6ffed', 
                    border: '1px solid #b7eb8f',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }
            }, '系统反馈列表用于集中处理用户在APP中提交的各类反馈信息，包括Bug反馈、功能建议、内容举报等，方便运营人员集中处理用户问题和建议。'),

            // 筛选条件
            React.createElement(Card, {
                key: 'filters',
                style: { marginBottom: 16 },
                size: 'small'
            }, 
                React.createElement(Space, { wrap: true }, [
                    React.createElement('span', { key: 'type-label' }, '反馈类型：'),
                    React.createElement(Select, {
                        key: 'type',
                        placeholder: '请选择',
                        style: { width: 120 },
                        value: filters.type,
                        onChange: (value) => handleFilterChange('type', value),
                        allowClear: true
                    }, [
                        React.createElement(Option, { value: 'bug' }, 'Bug反馈'),
                        React.createElement(Option, { value: 'feature' }, '功能建议'),
                        React.createElement(Option, { value: 'complaint' }, '内容举报'),
                        React.createElement(Option, { value: 'other' }, '其他')
                    ]),
                    React.createElement('span', { key: 'status-label' }, '处理状态：'),
                    React.createElement(Select, {
                        key: 'status',
                        placeholder: '请选择',
                        style: { width: 120 },
                        value: filters.status,
                        onChange: (value) => handleFilterChange('status', value),
                        allowClear: true
                    }, [
                        React.createElement(Option, { value: 'pending' }, '待处理'),
                        React.createElement(Option, { value: 'processing' }, '处理中'),
                        React.createElement(Option, { value: 'resolved' }, '已解决'),
                        React.createElement(Option, { value: 'closed' }, '已关闭')
                    ]),
                    React.createElement('span', { key: 'date-label' }, '提交时间：'),
                    React.createElement(RangePicker, {
                        key: 'dateRange',
                        style: { width: 240 },
                        value: filters.dateRange,
                        onChange: (value) => handleFilterChange('dateRange', value)
                    }),
                    React.createElement(Input, {
                        key: 'keyword',
                        placeholder: '搜索标题、内容',
                        style: { width: 200 },
                        value: filters.keyword,
                        onChange: (e) => handleFilterChange('keyword', e.target.value)
                    }),
                    React.createElement(Button, {
                        key: 'reset',
                        onClick: () => setFilters({
                            type: '',
                            status: '',
                            dateRange: null,
                            keyword: ''
                        })
                    }, '重置')
                ])
            ),

            React.createElement(Table, {
                key: 'table',
                columns,
                dataSource: data,
                loading,
                pagination: {
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }
            })
        ]),

        // 查看详情弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: '反馈详情',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setModalVisible(false)
                }, '关闭')
            ],
            width: 600
        }, viewingFeedback && 
            React.createElement('div', {}, [
                React.createElement('div', { key: 'basic', style: { marginBottom: 16 } }, [
                    React.createElement('h4', { key: 'title' }, '基本信息'),
                    React.createElement('p', { key: 'id' }, `反馈ID：${viewingFeedback.id}`),
                    React.createElement('p', { key: 'user' }, `用户：${viewingFeedback.userName} (${viewingFeedback.userId})`),
                    React.createElement('p', { key: 'type' }, ['反馈类型：', getTypeTag(viewingFeedback.type)]),
                    React.createElement('p', { key: 'priority' }, ['优先级：', getPriorityTag(viewingFeedback.priority)]),
                    React.createElement('p', { key: 'status' }, ['状态：', getStatusTag(viewingFeedback.status)]),
                    React.createElement('p', { key: 'time' }, `提交时间：${viewingFeedback.submitTime}`)
                ]),
                React.createElement('div', { key: 'content', style: { marginBottom: 16 } }, [
                    React.createElement('h4', { key: 'title' }, '反馈内容'),
                    React.createElement('h5', { key: 'subject' }, viewingFeedback.title),
                    React.createElement('p', { 
                        key: 'detail',
                        style: { 
                            padding: '12px', 
                            background: '#f5f5f5', 
                            borderRadius: '4px',
                            whiteSpace: 'pre-wrap'
                        }
                    }, viewingFeedback.content)
                ]),
                viewingFeedback.reply && React.createElement('div', { key: 'reply' }, [
                    React.createElement('h4', { key: 'title' }, '处理回复'),
                    React.createElement('p', { key: 'handler' }, `处理人：${viewingFeedback.handler}`),
                    React.createElement('p', { key: 'time' }, `处理时间：${viewingFeedback.handleTime}`),
                    React.createElement('p', { 
                        key: 'content',
                        style: { 
                            padding: '12px', 
                            background: '#e6f7ff', 
                            borderRadius: '4px',
                            whiteSpace: 'pre-wrap'
                        }
                    }, viewingFeedback.reply)
                ])
            ])
        )
    ]);
};

// 导出组件
window.SystemFeedbackList = SystemFeedbackList; 