// 内容审核 - 人工审核操作界面
console.log('🔧 正在加载 ReviewManagement 组件...');

const ReviewManagement = () => {
    console.log('👁️ ReviewManagement 组件开始渲染...');
    const { Card, Table, Button, Select, Input, Tag, Space, message, Modal, Tabs, Row, Col, Statistic, Form, Radio, Drawer, Badge, Avatar, Timeline, Rate, Alert } = antd;
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('pending');
    const [reviewModalVisible, setReviewModalVisible] = React.useState(false);
    const [currentReviewItem, setCurrentReviewItem] = React.useState(null);
    const [form] = Form.useForm();

    // 模拟统计数据
    const [stats] = React.useState({
        pendingReview: 28,       // 待我审核
        inProgress: 12,          // 审核中
        todayProcessed: 35,      // 今日已处理
        avgProcessTime: 8.5      // 平均处理时长(分钟)
    });

    // 模拟待审核数据 - 来自审批流程分配的内容
    const mockReviewData = [
        {
            id: 'RC001',
            title: '城市轨道交通新技术应用案例分享',
            contentType: 'article',
            content: '随着城市化进程的加快，城市轨道交通作为绿色、高效的公共交通方式，在缓解城市交通拥堵、减少环境污染等方面发挥着重要作用...',
            author: '技术部-张工程师',
            authorType: 'normal_user',
            publishBoard: 'content',
            submitTime: '2024-01-18 14:30:00',
            assignTime: '2024-01-18 14:32:00',
            priority: 'high',
            status: 'pending',
            assignedFlow: '标准内容审核流程',
            flowStep: '人工审核',
            aiResult: {
                status: 'warning',
                score: 78,
                risks: ['敏感词检测'],
                confidence: 85
            },
            attachments: [
                { name: '技术方案图.jpg', type: 'image', size: '2.1MB' },
                { name: '应用案例视频.mp4', type: 'video', size: '15.6MB' }
            ]
        },
        {
            id: 'RC002',
            title: '地铁安全运营管理制度更新',
            contentType: 'news',
            content: '为进一步提升地铁运营安全水平，完善安全管理体系，现对《地铁安全运营管理制度》进行更新...',
            author: '运营部-李主管',
            authorType: 'association_member',
            publishBoard: 'association',
            submitTime: '2024-01-18 13:45:00',
            assignTime: '2024-01-18 13:47:00',
            priority: 'urgent',
            status: 'pending',
            assignedFlow: '协会内容审核流程',
            flowStep: '初级审核',
            aiResult: {
                status: 'pass',
                score: 92,
                risks: [],
                confidence: 95
            },
            attachments: [
                { name: '管理制度文件.pdf', type: 'document', size: '1.8MB' }
            ]
        },
        {
            id: 'RC003',
            title: '轨道交通展会参展企业介绍视频',
            contentType: 'video',
            content: '我公司是专业从事轨道交通信号系统研发的高新技术企业，在轨道交通CBTC系统领域具有丰富经验...',
            author: '某科技公司-王经理',
            authorType: 'exhibitor',
            publishBoard: 'exhibition',
            submitTime: '2024-01-18 12:20:00',
            assignTime: '2024-01-18 12:25:00',
            priority: 'normal',
            status: 'in_progress',
            assignedFlow: '展商信息审核流程',
            flowStep: '专业审核',
            aiResult: {
                status: 'warning',
                score: 76,
                risks: ['广告推广内容'],
                confidence: 88
            },
            attachments: [
                { name: '企业宣传视频.mp4', type: 'video', size: '25.3MB' },
                { name: '产品介绍.pdf', type: 'document', size: '3.2MB' }
            ]
        }
    ];

    React.useEffect(() => {
        setReviewData(mockReviewData);
    }, []);

    // 根据内容类型获取标签
    const getContentTypeTag = (type) => {
        const typeMap = {
            'article': { color: 'blue', text: '图文' },
            'video': { color: 'purple', text: '视频' },
            'news': { color: 'cyan', text: '资讯' },
            'comment': { color: 'orange', text: '评论' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 根据优先级获取标签
    const getPriorityTag = (priority) => {
        const priorityMap = {
            'urgent': { color: 'red', text: '紧急' },
            'high': { color: 'orange', text: '高' },
            'normal': { color: 'green', text: '普通' },
            'low': { color: 'blue', text: '低' }
        };
        const config = priorityMap[priority] || { color: 'default', text: priority };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 根据AI审核结果获取标签
    const getAIResultTag = (aiResult) => {
        const statusMap = {
            'pass': { color: 'green', text: 'AI通过' },
            'warning': { color: 'orange', text: 'AI警告' },
            'reject': { color: 'red', text: 'AI拒绝' }
        };
        const config = statusMap[aiResult.status] || { color: 'default', text: aiResult.status };
        return React.createElement(Tag, { color: config.color }, `${config.text} (${aiResult.score}分)`);
    };

    // 表格列配置
    const columns = [
        {
            title: '内容信息',
            dataIndex: 'title',
            key: 'title',
            width: 300,
            render: (text, record) => React.createElement('div', {},
                React.createElement('div', { style: { fontWeight: 'bold', marginBottom: '4px' } }, text),
                React.createElement('div', { style: { fontSize: '12px', color: '#666' } },
                    React.createElement('span', null, `ID: ${record.id} | `),
                    React.createElement('span', null, `${record.author}`)
                ),
                React.createElement('div', { style: { marginTop: '4px' } },
                    getContentTypeTag(record.contentType),
                    React.createElement('span', { style: { marginLeft: '8px' } }),
                    getPriorityTag(record.priority)
                )
            )
        },
        {
            title: '分配信息',
            key: 'assignment',
            width: 200,
            render: (_, record) => React.createElement('div', {},
                React.createElement('div', { style: { fontSize: '12px', color: '#666' } },
                    '流程：', record.assignedFlow
                ),
                React.createElement('div', { style: { fontSize: '12px', color: '#1890ff', marginTop: '2px' } },
                    '当前节点：', record.flowStep
                ),
                React.createElement('div', { style: { fontSize: '12px', color: '#666', marginTop: '2px' } },
                    '分配时间：', record.assignTime
                )
            )
        },
        {
            title: 'AI审核结果',
            key: 'aiResult',
            width: 150,
            render: (_, record) => React.createElement('div', {},
                getAIResultTag(record.aiResult),
                record.aiResult.risks.length > 0 && React.createElement('div', { style: { marginTop: '4px' } },
                    record.aiResult.risks.map((risk, index) => 
                        React.createElement(Tag, { key: index, size: 'small', color: 'red' }, risk)
                    )
                )
            )
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
            width: 120
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            render: (_, record) => React.createElement(Space, { size: 'small' },
                React.createElement(Button, {
                    type: 'primary',
                    size: 'small',
                    onClick: () => handleReview(record)
                }, '开始审核'),
                React.createElement(Button, {
                    size: 'small',
                    onClick: () => handleViewDetail(record)
                }, '查看详情')
            )
        }
    ];

    // 筛选待审核数据
    const getFilteredData = () => {
        if (activeTab === 'pending') {
            return reviewData.filter(item => item.status === 'pending');
        } else if (activeTab === 'in_progress') {
            return reviewData.filter(item => item.status === 'in_progress');
        }
        return reviewData;
    };

    // 开始审核
    const handleReview = (record) => {
        setCurrentReviewItem(record);
        setReviewModalVisible(true);
        form.resetFields();
    };

    // 查看详情
    const handleViewDetail = (record) => {
        Modal.info({
            title: '内容详情',
            width: 800,
            content: React.createElement('div', {},
                React.createElement('h4', null, record.title),
                React.createElement('p', { style: { color: '#666', marginBottom: '16px' } },
                    `作者：${record.author} | 发布板块：${record.publishBoard}`
                ),
                React.createElement('div', { style: { marginBottom: '16px' } },
                    React.createElement('strong', null, '内容：'),
                    React.createElement('p', { style: { marginTop: '8px', padding: '12px', background: '#f5f5f5', borderRadius: '6px' } },
                        record.content
                    )
                ),
                record.attachments.length > 0 && React.createElement('div', null,
                    React.createElement('strong', null, '附件：'),
                    React.createElement('ul', { style: { marginTop: '8px' } },
                        record.attachments.map((file, index) => 
                            React.createElement('li', { key: index },
                                `${file.name} (${file.size})`
                            )
                        )
                    )
                )
            )
        });
    };

    // 提交审核结果
    const handleSubmitReview = async () => {
        try {
            const values = await form.validateFields();
            
            // 更新数据状态
            const updatedData = reviewData.map(item => 
                item.id === currentReviewItem.id 
                    ? { ...item, status: values.decision === 'pass' ? 'approved' : 'rejected' }
                    : item
            );
            setReviewData(updatedData);
            
            setReviewModalVisible(false);
            message.success(`审核${values.decision === 'pass' ? '通过' : '拒绝'}操作已提交`);
        } catch (error) {
            console.error('提交审核失败:', error);
        }
    };

    return React.createElement('div', { style: { padding: '24px' } },
        // 页面标题
        React.createElement('div', { style: { marginBottom: '24px' } },
            React.createElement('h2', { style: { margin: 0, color: '#1890ff' } },
                '👁️ 内容审核'
            ),
            React.createElement('p', { style: { margin: '8px 0 0 0', color: '#666' } },
                '对经过审批流程分配的内容进行人工审核处理'
            )
        ),

        // 统计卡片
        React.createElement(Row, { gutter: 16, style: { marginBottom: '24px' } },
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '待我审核',
                        value: stats.pendingReview,
                        valueStyle: { color: '#faad14' },
                        suffix: '条'
                    })
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '审核中',
                        value: stats.inProgress,
                        valueStyle: { color: '#1890ff' },
                        suffix: '条'
                    })
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '今日已处理',
                        value: stats.todayProcessed,
                        valueStyle: { color: '#52c41a' },
                        suffix: '条'
                    })
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '平均处理时长',
                        value: stats.avgProcessTime,
                        valueStyle: { color: '#722ed1' },
                        suffix: '分钟'
                    })
                )
            )
        ),

        // 主要内容区域
        React.createElement(Card, null,
            React.createElement(Tabs, { 
                activeKey: activeTab, 
                onChange: setActiveTab,
                style: { minHeight: '500px' }
            },
                React.createElement(TabPane, { 
                    tab: React.createElement(Badge, { count: stats.pendingReview }, '待我审核'),
                    key: 'pending'
                },
                    React.createElement(Table, {
                        columns: columns,
                        dataSource: getFilteredData(),
                        rowKey: 'id',
                        loading: loading,
                        pagination: {
                            total: getFilteredData().length,
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total) => `共 ${total} 条记录`
                        }
                    })
                ),
                React.createElement(TabPane, { 
                    tab: React.createElement(Badge, { count: stats.inProgress }, '审核中'),
                    key: 'in_progress'
                },
                    React.createElement(Table, {
                        columns: columns,
                        dataSource: getFilteredData(),
                        rowKey: 'id',
                        loading: loading,
                        pagination: {
                            total: getFilteredData().length,
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total) => `共 ${total} 条记录`
                        }
                    })
                )
            )
        ),

        // 审核操作模态框
        React.createElement(Modal, {
            title: React.createElement('div', null,
                React.createElement('span', { style: { color: '#1890ff' } }, '📝'),
                React.createElement('span', { style: { marginLeft: '8px' } }, '内容审核')
            ),
            visible: reviewModalVisible,
            onCancel: () => setReviewModalVisible(false),
            onOk: handleSubmitReview,
            width: 900,
            okText: '提交审核',
            cancelText: '取消'
        },
            currentReviewItem && React.createElement('div', null,
                // 内容基本信息
                React.createElement('div', { style: { marginBottom: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '6px' } },
                    React.createElement('h4', { style: { margin: '0 0 12px 0' } }, currentReviewItem.title),
                    React.createElement('div', { style: { fontSize: '14px', color: '#666', marginBottom: '8px' } },
                        `作者：${currentReviewItem.author} | 类型：${currentReviewItem.contentType} | 发布板块：${currentReviewItem.publishBoard}`
                    ),
                    React.createElement('div', { style: { fontSize: '14px', color: '#666' } },
                        `分配流程：${currentReviewItem.assignedFlow} | 当前节点：${currentReviewItem.flowStep}`
                    )
                ),

                // AI审核结果
                React.createElement('div', { style: { marginBottom: '20px' } },
                    React.createElement('h4', null, 'AI审核结果'),
                    React.createElement('div', { style: { padding: '12px', background: '#f9f9f9', borderRadius: '6px' } },
                        React.createElement('div', { style: { marginBottom: '8px' } },
                            getAIResultTag(currentReviewItem.aiResult),
                            React.createElement('span', { style: { marginLeft: '12px', color: '#666' } },
                                `置信度：${currentReviewItem.aiResult.confidence}%`
                            )
                        ),
                        currentReviewItem.aiResult.risks.length > 0 && React.createElement('div', null,
                            React.createElement('span', { style: { color: '#666' } }, '风险项：'),
                            currentReviewItem.aiResult.risks.map((risk, index) => 
                                React.createElement(Tag, { key: index, color: 'red', style: { marginLeft: '8px' } }, risk)
                            )
                        )
                    )
                ),

                // 内容详情
                React.createElement('div', { style: { marginBottom: '20px' } },
                    React.createElement('h4', null, '内容详情'),
                    React.createElement('div', { 
                        style: { 
                            padding: '12px', 
                            background: '#fff',
                            border: '1px solid #d9d9d9', 
                            borderRadius: '6px',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }
                    }, currentReviewItem.content),
                    currentReviewItem.attachments.length > 0 && React.createElement('div', { style: { marginTop: '12px' } },
                        React.createElement('strong', null, '附件：'),
                        React.createElement('ul', { style: { margin: '8px 0 0 20px' } },
                            currentReviewItem.attachments.map((file, index) => 
                                React.createElement('li', { key: index }, `${file.name} (${file.size})`)
                            )
                        )
                    )
                ),

                // 审核表单
                React.createElement(Form, { form: form, layout: 'vertical' },
                    React.createElement(Form.Item, {
                        label: '审核决定',
                        name: 'decision',
                        rules: [{ required: true, message: '请选择审核结果' }]
                    },
                        React.createElement(Radio.Group, null,
                            React.createElement(Radio.Button, { value: 'pass', style: { color: '#52c41a' } }, '✅ 审核通过'),
                            React.createElement(Radio.Button, { value: 'reject', style: { color: '#ff4d4f' } }, '❌ 审核拒绝')
                        )
                    ),
                    React.createElement(Form.Item, {
                        label: '审核意见',
                        name: 'comment',
                        rules: [{ required: true, message: '请填写审核意见' }]
                    },
                        React.createElement(TextArea, {
                            rows: 4,
                            placeholder: '请详细说明审核理由...'
                        })
                    )
                )
            )
        )
    );
};

// 导出组件
console.log('✅ ReviewManagement 组件准备导出到 window 对象...');
window.ReviewManagement = ReviewManagement;
console.log('✅ ReviewManagement 组件已成功注册到 window 对象'); 