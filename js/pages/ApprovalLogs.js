// 审批日志页面 - 基于文档7.4.4功能设计
const ApprovalLogs = () => {
    const { Card, Table, Button, Space, DatePicker, Select, Input, message, Tag, Tooltip, Descriptions, Modal, Timeline, Steps } = antd;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const { Search } = Input;
    const { Step } = Steps;
    
    const [loading, setLoading] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const [filteredLogs, setFilteredLogs] = React.useState([]);
    const [filters, setFilters] = React.useState({
        dateRange: null,
        approvalType: '',
        status: '',
        applicant: '',
        approver: '',
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
        // 模拟审批日志数据
        setTimeout(() => {
            const mockLogs = [
                {
                    id: 'approval_001',
                    requestId: 'REQ_2025_001',
                    title: '城轨技术文章发布申请',
                    approvalType: '内容发布审批',
                    applicant: '张编辑',
                    applicantId: 'user001',
                    currentApprover: '王审核',
                    currentApproverId: 'user003',
                    status: '审批中',
                    priority: '普通',
                    submitTime: '2025-01-18 09:00:00',
                    deadline: '2025-01-20 18:00:00',
                    completedTime: null,
                    department: '内容管理部',
                    category: '技术资讯',
                    description: '申请发布关于城市轨道交通最新技术发展的文章',
                    attachments: ['技术文章.docx', '相关图片.zip'],
                    currentStep: 1,
                    totalSteps: 3,
                    approvalFlow: [
                        {
                            step: 1,
                            approver: '王审核',
                            role: '内容审核员',
                            status: '待审批',
                            assignTime: '2025-01-18 09:05:00',
                            completedTime: null,
                            comment: null,
                            action: null
                        },
                        {
                            step: 2,
                            approver: '李主管',
                            role: '部门主管',
                            status: '未开始',
                            assignTime: null,
                            completedTime: null,
                            comment: null,
                            action: null
                        },
                        {
                            step: 3,
                            approver: '张管理',
                            role: '总编辑',
                            status: '未开始',
                            assignTime: null,
                            completedTime: null,
                            comment: null,
                            action: null
                        }
                    ]
                },
                {
                    id: 'approval_002',
                    requestId: 'REQ_2025_002',
                    title: '展商入驻申请',
                    approvalType: '展商审批',
                    applicant: '北京轨道公司',
                    applicantId: 'company001',
                    currentApprover: null,
                    currentApproverId: null,
                    status: '已通过',
                    priority: '高',
                    submitTime: '2025-01-15 14:30:00',
                    deadline: '2025-01-18 17:00:00',
                    completedTime: '2025-01-17 16:45:00',
                    department: '展会管理部',
                    category: '企业入驻',
                    description: '北京轨道交通设备有限公司申请入驻2025年城轨展',
                    attachments: ['营业执照.pdf', '产品介绍.pptx', '资质证明.pdf'],
                    currentStep: 3,
                    totalSteps: 3,
                    approvalFlow: [
                        {
                            step: 1,
                            approver: '赵业务',
                            role: '业务专员',
                            status: '已通过',
                            assignTime: '2025-01-15 14:35:00',
                            completedTime: '2025-01-16 10:20:00',
                            comment: '资料齐全，符合入驻要求',
                            action: '通过'
                        },
                        {
                            step: 2,
                            approver: '孙主管',
                            role: '展会主管',
                            status: '已通过',
                            assignTime: '2025-01-16 10:25:00',
                            completedTime: '2025-01-17 09:15:00',
                            comment: '企业资质良好，同意入驻',
                            action: '通过'
                        },
                        {
                            step: 3,
                            approver: '张管理',
                            role: '总经理',
                            status: '已通过',
                            assignTime: '2025-01-17 09:20:00',
                            completedTime: '2025-01-17 16:45:00',
                            comment: '最终审批通过，欢迎参展',
                            action: '通过'
                        }
                    ]
                },
                {
                    id: 'approval_003',
                    requestId: 'REQ_2025_003',
                    title: '用户权限提升申请',
                    approvalType: '权限审批',
                    applicant: '钱运营',
                    applicantId: 'user006',
                    currentApprover: null,
                    currentApproverId: null,
                    status: '已拒绝',
                    priority: '普通',
                    submitTime: '2025-01-16 11:00:00',
                    deadline: '2025-01-19 18:00:00',
                    completedTime: '2025-01-17 14:30:00',
                    department: '运营部',
                    category: '权限管理',
                    description: '申请提升为高级运营专员权限，需要访问数据分析模块',
                    attachments: ['权限申请表.docx'],
                    currentStep: 2,
                    totalSteps: 2,
                    approvalFlow: [
                        {
                            step: 1,
                            approver: '周主管',
                            role: '运营主管',
                            status: '已通过',
                            assignTime: '2025-01-16 11:05:00',
                            completedTime: '2025-01-16 15:20:00',
                            comment: '工作需要，建议通过',
                            action: '通过'
                        },
                        {
                            step: 2,
                            approver: '张管理',
                            role: '系统管理员',
                            status: '已拒绝',
                            assignTime: '2025-01-16 15:25:00',
                            completedTime: '2025-01-17 14:30:00',
                            comment: '当前权限已足够，暂不提升',
                            action: '拒绝'
                        }
                    ]
                },
                {
                    id: 'approval_004',
                    requestId: 'REQ_2025_004',
                    title: '系统维护申请',
                    approvalType: '运维审批',
                    applicant: '吴技术',
                    applicantId: 'user007',
                    currentApprover: '张管理',
                    currentApproverId: 'user001',
                    status: '审批中',
                    priority: '紧急',
                    submitTime: '2025-01-18 13:45:00',
                    deadline: '2025-01-18 20:00:00',
                    completedTime: null,
                    department: '技术部',
                    category: '系统运维',
                    description: '数据库性能下降，需要紧急维护优化',
                    attachments: ['性能报告.pdf', '维护方案.docx'],
                    currentStep: 2,
                    totalSteps: 2,
                    approvalFlow: [
                        {
                            step: 1,
                            approver: '郑技术总监',
                            role: '技术总监',
                            status: '已通过',
                            assignTime: '2025-01-18 13:50:00',
                            completedTime: '2025-01-18 14:15:00',
                            comment: '紧急情况，快速处理',
                            action: '通过'
                        },
                        {
                            step: 2,
                            approver: '张管理',
                            role: '总经理',
                            status: '审批中',
                            assignTime: '2025-01-18 14:20:00',
                            completedTime: null,
                            comment: null,
                            action: null
                        }
                    ]
                },
                {
                    id: 'approval_005',
                    requestId: 'REQ_2025_005',
                    title: '数据导出申请',
                    approvalType: '数据审批',
                    applicant: '刘分析',
                    applicantId: 'user008',
                    currentApprover: null,
                    currentApproverId: null,
                    status: '已超时',
                    priority: '普通',
                    submitTime: '2025-01-10 09:00:00',
                    deadline: '2025-01-15 18:00:00',
                    completedTime: null,
                    department: '数据部',
                    category: '数据导出',
                    description: '申请导出用户行为分析数据用于季度报告',
                    attachments: ['数据需求说明.docx'],
                    currentStep: 1,
                    totalSteps: 2,
                    approvalFlow: [
                        {
                            step: 1,
                            approver: '何主管',
                            role: '数据主管',
                            status: '超时未处理',
                            assignTime: '2025-01-10 09:05:00',
                            completedTime: null,
                            comment: null,
                            action: null
                        },
                        {
                            step: 2,
                            approver: '张管理',
                            role: '总经理',
                            status: '未开始',
                            assignTime: null,
                            completedTime: null,
                            comment: null,
                            action: null
                        }
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
                const logDate = new Date(log.submitTime);
                return logDate >= start && logDate <= end;
            });
        }

        // 审批类型过滤
        if (filters.approvalType) {
            filtered = filtered.filter(log => log.approvalType === filters.approvalType);
        }

        // 状态过滤
        if (filters.status) {
            filtered = filtered.filter(log => log.status === filters.status);
        }

        // 申请人过滤
        if (filters.applicant) {
            filtered = filtered.filter(log => log.applicant.includes(filters.applicant));
        }

        // 审批人过滤
        if (filters.approver) {
            filtered = filtered.filter(log => 
                log.currentApprover && log.currentApprover.includes(filters.approver)
            );
        }

        // 关键词搜索
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            filtered = filtered.filter(log => 
                log.title.toLowerCase().includes(keyword) ||
                log.applicant.toLowerCase().includes(keyword) ||
                log.description.toLowerCase().includes(keyword) ||
                log.requestId.toLowerCase().includes(keyword)
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
            approvalType: '',
            status: '',
            applicant: '',
            approver: '',
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
            case '已通过': return 'green';
            case '已拒绝': return 'red';
            case '审批中': return 'blue';
            case '已超时': return 'orange';
            case '已撤回': return 'default';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case '紧急': return 'red';
            case '高': return 'orange';
            case '普通': return 'default';
            case '低': return 'green';
            default: return 'default';
        }
    };

    const getStepStatus = (stepStatus) => {
        switch (stepStatus) {
            case '已通过': return 'finish';
            case '已拒绝': return 'error';
            case '审批中': case '待审批': return 'process';
            case '超时未处理': return 'error';
            case '未开始': return 'wait';
            default: return 'wait';
        }
    };

    const columns = [
        {
            title: '申请信息',
            key: 'requestInfo',
            width: 250,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'title',
                        style: { 
                            fontWeight: 500, 
                            marginBottom: '4px',
                            maxWidth: '230px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        } 
                    }, record.title),
                    React.createElement('div', { 
                        key: 'id',
                        style: { fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }
                    }, `ID: ${record.requestId}`),
                    React.createElement('div', { 
                        key: 'meta',
                        style: { display: 'flex', gap: '8px', alignItems: 'center' }
                    }, [
                        React.createElement(Tag, { 
                            key: 'type',
                            size: 'small',
                            color: 'blue'
                        }, record.approvalType),
                        React.createElement(Tag, { 
                            key: 'priority',
                            size: 'small',
                            color: getPriorityColor(record.priority)
                        }, record.priority)
                    ])
                ])
            )
        },
        {
            title: '申请人',
            dataIndex: 'applicant',
            key: 'applicant',
            width: 100
        },
        {
            title: '当前审批人',
            dataIndex: 'currentApprover',
            key: 'currentApprover',
            width: 100,
            render: (currentApprover) => currentApprover || '-'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            filters: [
                { text: '审批中', value: '审批中' },
                { text: '已通过', value: '已通过' },
                { text: '已拒绝', value: '已拒绝' },
                { text: '已超时', value: '已超时' },
                { text: '已撤回', value: '已撤回' }
            ],
            render: (status) => (
                React.createElement(Tag, { color: getStatusColor(status) }, status)
            )
        },
        {
            title: '进度',
            key: 'progress',
            width: 120,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'steps',
                        style: { fontSize: '12px', marginBottom: '4px' } 
                    }, `${record.currentStep}/${record.totalSteps} 步骤`),
                    React.createElement('div', { 
                        key: 'bar',
                        style: { 
                            width: '100px',
                            height: '4px',
                            background: '#f0f0f0',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }
                    }, React.createElement('div', {
                        style: {
                            width: `${(record.currentStep / record.totalSteps) * 100}%`,
                            height: '100%',
                            background: record.status === '已通过' ? '#52c41a' : 
                                      record.status === '已拒绝' ? '#ff4d4f' :
                                      record.status === '已超时' ? '#faad14' : '#1890ff',
                            transition: 'width 0.3s'
                        }
                    }))
                ])
            )
        },
        {
            title: '时间信息',
            key: 'timeInfo',
            width: 160,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'submit',
                        style: { fontSize: '12px' } 
                    }, `提交：${record.submitTime}`),
                    React.createElement('div', { 
                        key: 'deadline',
                        style: { 
                            fontSize: '12px', 
                            color: new Date(record.deadline) < new Date() && !record.completedTime ? '#ff4d4f' : '#8c8c8c' 
                        } 
                    }, `期限：${record.deadline}`),
                    record.completedTime && React.createElement('div', { 
                        key: 'completed',
                        style: { fontSize: '12px', color: '#52c41a' } 
                    }, `完成：${record.completedTime}`)
                ])
            )
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
            width: 100
        },
        {
            title: '说明',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            ellipsis: true,
            render: (description) => (
                React.createElement(Tooltip, { title: description }, 
                    React.createElement('span', { 
                        style: { cursor: 'pointer' } 
                    }, description)
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
                    }, '审批日志'),
                    React.createElement('p', { 
                        key: 'desc',
                        style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                    }, '记录审批流程的完整过程，包括申请、审批、结果等全环节追踪（等保三级要求）')
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
                
                React.createElement('div', { key: 'approval-type' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '审批类型：'),
                    React.createElement(Select, {
                        value: filters.approvalType,
                        onChange: (value) => handleFilterChange('approvalType', value),
                        style: { width: '120px' },
                        allowClear: true,
                        placeholder: '全部'
                    }, [
                        React.createElement(Option, { key: '内容发布审批', value: '内容发布审批' }, '内容发布审批'),
                        React.createElement(Option, { key: '展商审批', value: '展商审批' }, '展商审批'),
                        React.createElement(Option, { key: '权限审批', value: '权限审批' }, '权限审批'),
                        React.createElement(Option, { key: '运维审批', value: '运维审批' }, '运维审批'),
                        React.createElement(Option, { key: '数据审批', value: '数据审批' }, '数据审批')
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
                        React.createElement(Option, { key: '审批中', value: '审批中' }, '审批中'),
                        React.createElement(Option, { key: '已通过', value: '已通过' }, '已通过'),
                        React.createElement(Option, { key: '已拒绝', value: '已拒绝' }, '已拒绝'),
                        React.createElement(Option, { key: '已超时', value: '已超时' }, '已超时'),
                        React.createElement(Option, { key: '已撤回', value: '已撤回' }, '已撤回')
                    ])
                ]),
                
                React.createElement(Search, {
                    key: 'search',
                    placeholder: '搜索申请标题、申请人...',
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
            title: '审批详情',
            visible: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            width: 1000,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ]
        }, selectedLog && React.createElement('div', {}, [
            React.createElement(Descriptions, {
                key: 'basic-info',
                title: '申请信息',
                column: 2,
                bordered: true,
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Descriptions.Item, { 
                    key: 'requestId', 
                    label: '申请ID' 
                }, selectedLog.requestId),
                React.createElement(Descriptions.Item, { 
                    key: 'title', 
                    label: '申请标题' 
                }, selectedLog.title),
                React.createElement(Descriptions.Item, { 
                    key: 'approvalType', 
                    label: '审批类型' 
                }, React.createElement(Tag, { color: 'blue' }, selectedLog.approvalType)),
                React.createElement(Descriptions.Item, { 
                    key: 'priority', 
                    label: '优先级' 
                }, React.createElement(Tag, { color: getPriorityColor(selectedLog.priority) }, selectedLog.priority)),
                React.createElement(Descriptions.Item, { 
                    key: 'status', 
                    label: '当前状态' 
                }, React.createElement(Tag, { color: getStatusColor(selectedLog.status) }, selectedLog.status)),
                React.createElement(Descriptions.Item, { 
                    key: 'applicant', 
                    label: '申请人' 
                }, selectedLog.applicant),
                React.createElement(Descriptions.Item, { 
                    key: 'department', 
                    label: '申请部门' 
                }, selectedLog.department),
                React.createElement(Descriptions.Item, { 
                    key: 'category', 
                    label: '分类' 
                }, selectedLog.category),
                React.createElement(Descriptions.Item, { 
                    key: 'submitTime', 
                    label: '提交时间' 
                }, selectedLog.submitTime),
                React.createElement(Descriptions.Item, { 
                    key: 'deadline', 
                    label: '处理期限' 
                }, selectedLog.deadline),
                React.createElement(Descriptions.Item, { 
                    key: 'completedTime', 
                    label: '完成时间' 
                }, selectedLog.completedTime || '未完成'),
                React.createElement(Descriptions.Item, { 
                    key: 'currentApprover', 
                    label: '当前审批人' 
                }, selectedLog.currentApprover || '无'),
                React.createElement(Descriptions.Item, { 
                    key: 'description', 
                    label: '申请说明',
                    span: 2
                }, selectedLog.description),
                React.createElement(Descriptions.Item, { 
                    key: 'attachments', 
                    label: '附件',
                    span: 2
                }, selectedLog.attachments.map((file, index) => 
                    React.createElement(Tag, { 
                        key: index, 
                        style: { marginBottom: '4px', marginRight: '8px' } 
                    }, `📎 ${file}`)
                ))
            ]),
            
            React.createElement('div', { key: 'flow-title', style: { marginBottom: '16px' } }, 
                React.createElement('h3', { style: { margin: 0 } }, '审批流程')
            ),
            React.createElement(Steps, {
                key: 'approval-steps',
                current: selectedLog.currentStep - 1,
                status: selectedLog.status === '已拒绝' ? 'error' : 
                       selectedLog.status === '已超时' ? 'error' : 'process',
                direction: 'vertical',
                items: selectedLog.approvalFlow.map((step, index) => ({
                    title: `第${step.step}步：${step.approver}（${step.role}）`,
                    description: React.createElement('div', {}, [
                        React.createElement('div', { 
                            key: 'status',
                            style: { marginBottom: '8px' }
                        }, [
                            React.createElement('span', { style: { marginRight: '8px' } }, '状态：'),
                            React.createElement(Tag, { 
                                color: step.status === '已通过' ? 'green' :
                                      step.status === '已拒绝' ? 'red' :
                                      step.status === '审批中' || step.status === '待审批' ? 'blue' :
                                      step.status === '超时未处理' ? 'orange' : 'default'
                            }, step.status)
                        ]),
                        step.assignTime && React.createElement('div', { 
                            key: 'assign',
                            style: { fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }
                        }, `分配时间：${step.assignTime}`),
                        step.completedTime && React.createElement('div', { 
                            key: 'completed',
                            style: { fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }
                        }, `完成时间：${step.completedTime}`),
                        step.comment && React.createElement('div', { 
                            key: 'comment',
                            style: { 
                                marginTop: '8px',
                                padding: '8px',
                                background: '#f6f8fa',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }
                        }, [
                            React.createElement('strong', { key: 'label' }, '审批意见：'),
                            React.createElement('span', { key: 'text' }, step.comment)
                        ])
                    ]),
                    status: getStepStatus(step.status)
                }))
            })
        ]))
    ]);
};

// 确保组件被正确导出
window.ApprovalLogs = ApprovalLogs; 