// 协会作品人工审核日志页面
const AssociationManualReviewLogs = () => {
    console.log('AssociationManualReviewLogs component is rendering...');
    
    const { Row, Col, Card, Button, Space, Tag, Table, Modal, Input, Select, message, DatePicker, Statistic, Descriptions } = antd;
    const { Search } = Input;
    const { RangePicker: DateRangePicker } = DatePicker;
    
    // 状态管理
    const [logModalVisible, setLogModalVisible] = React.useState(false);
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [publisherFilter, setPublisherFilter] = React.useState('');
    const [reviewerFilter, setReviewerFilter] = React.useState('');
    const [aiRatingFilter, setAiRatingFilter] = React.useState('all');
    const [operationTypeFilter, setOperationTypeFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据
    const [logData, setLogData] = React.useState([
        {
            id: 'amr_001',
            title: '城轨技术创新报告',
            publisher: '协会用户A',
            reviewer: '审核员张三',
            aiRating: '无风险',
            operationType: '通过',
            operationResult: '成功',
            submitTime: '2024-01-15 08:30:00',
            approvalTime: '2024-01-15 09:15:00',
            remark: ''
        },
        {
            id: 'amr_002',
            title: '轨道交通发展规划',
            publisher: '协会用户B',
            reviewer: '审核员李四',
            aiRating: '低危',
            operationType: '通过',
            operationResult: '成功',
            submitTime: '2024-01-15 09:15:00',
            approvalTime: '2024-01-15 10:00:00',
            remark: ''
        },
        {
            id: 'amr_003',
            title: '城轨安全标准研究',
            publisher: '协会用户C',
            reviewer: '审核员王五',
            aiRating: '中危',
            operationType: '驳回',
            operationResult: '成功',
            submitTime: '2024-01-15 10:00:00',
            approvalTime: '2024-01-15 10:45:00',
            remark: '内容存在技术争议，需要专家进一步论证'
        },
        {
            id: 'amr_004',
            title: '轨道交通行业分析',
            publisher: '协会用户D',
            reviewer: '审核员赵六',
            aiRating: '低危',
            operationType: '驳回',
            operationResult: '成功',
            submitTime: '2024-01-15 11:30:00',
            approvalTime: '2024-01-15 12:15:00',
            remark: '数据来源不明确，需要补充权威数据支撑'
        }
    ]);

    React.useEffect(() => {
        loadLogData();
    }, []);

    // 模拟加载数据
    const loadLogData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            message.success('日志数据加载成功');
        } catch (error) {
            message.error('数据加载失败');
        } finally {
            setLoading(false);
        }
    };

    // AI审核评级配置
    const AI_RATINGS = {
        '无风险': { color: 'green' },
        '低危': { color: 'orange' },
        '中危': { color: 'red' }
    };

    // 操作类型配置
    const OPERATION_TYPES = {
        '通过': { color: 'green' },
        '驳回': { color: 'red' }
    };

    // 操作结果配置
    const RESULT_CONFIG = {
        '成功': { color: 'green' },
        '失败': { color: 'red' }
    };

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setPublisherFilter('');
        setReviewerFilter('');
        setAiRatingFilter('all');
        setOperationTypeFilter('all');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const filteredData = filterData();
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条协会作品人工审核日志数据`);
        }, 2000);
    };

    // 数据筛选逻辑
    const filterData = () => {
        return logData.filter(item => {
            // 文本搜索
            if (searchText && 
                !Object.values(item).some(value => 
                    String(value).toLowerCase().includes(searchText.toLowerCase())
                )) {
                return false;
            }
            
            // 发布人筛选
            if (publisherFilter && !item.publisher.includes(publisherFilter)) {
                return false;
            }
            
            // 审核人筛选
            if (reviewerFilter && !item.reviewer.includes(reviewerFilter)) {
                return false;
            }
            
            // AI审核评级筛选
            if (aiRatingFilter !== 'all' && item.aiRating !== aiRatingFilter) {
                return false;
            }
            
            // 操作类型筛选
            if (operationTypeFilter !== 'all' && item.operationType !== operationTypeFilter) {
                return false;
            }
            
            // 时间范围筛选
            if (timeRange && timeRange.length === 2) {
                const submitTime = new Date(item.submitTime);
                const startTime = timeRange[0].startOf('day').toDate();
                const endTime = timeRange[1].endOf('day').toDate();
                if (submitTime < startTime || submitTime > endTime) {
                    return false;
                }
            }
            
            return true;
        });
    };

    // 查看日志详情
    const viewLogDetails = (record) => {
        setSelectedLog(record);
        setLogModalVisible(true);
    };

    // 表格列定义
    const columns = [
        { title: '标题', dataIndex: 'title', key: 'title', width: 200 },
        { title: '发布人', dataIndex: 'publisher', key: 'publisher' },
        { title: '审核人', dataIndex: 'reviewer', key: 'reviewer' },
        { 
            title: 'AI审核评级', 
            dataIndex: 'aiRating', 
            key: 'aiRating',
            render: (rating) => React.createElement(Tag, {
                color: AI_RATINGS[rating]?.color || 'default'
            }, rating)
        },
        { 
            title: '操作类型', 
            dataIndex: 'operationType', 
            key: 'operationType',
            render: (type) => React.createElement(Tag, {
                color: OPERATION_TYPES[type]?.color || 'default'
            }, type)
        },
        { 
            title: '操作结果', 
            dataIndex: 'operationResult', 
            key: 'operationResult',
            render: (result) => React.createElement(Tag, {
                color: RESULT_CONFIG[result]?.color || 'default'
            }, result)
        },
        { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
        { title: '审批时间', dataIndex: 'approvalTime', key: 'approvalTime' },
        { title: '备注', dataIndex: 'remark', key: 'remark', width: 200 },
        {
            title: '操作',
            key: 'action',
            width: 80,
            render: (_, record) => React.createElement(Button, {
                type: 'link',
                size: 'small',
                onClick: () => viewLogDetails(record)
            }, '查看')
        }
    ];

    // 渲染搜索工具栏
    const renderSearchToolbar = () => {
        return React.createElement(Card, {
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Row, {
                key: 'search-row',
                gutter: [16, 16],
                align: 'middle'
            }, [
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Search, {
                        placeholder: '搜索标题、发布人、审核人等',
                        value: searchText,
                        onChange: (e) => setSearchText(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: '发布人',
                        value: publisherFilter,
                        onChange: (e) => setPublisherFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: '审核人',
                        value: reviewerFilter,
                        onChange: (e) => setReviewerFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: 'AI评级',
                        value: aiRatingFilter,
                        onChange: setAiRatingFilter,
                        allowClear: true,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Select.Option, { key: 'all', value: 'all' }, '全部'),
                        React.createElement(Select.Option, { key: '无风险', value: '无风险' }, '无风险'),
                        React.createElement(Select.Option, { key: '低危', value: '低危' }, '低危'),
                        React.createElement(Select.Option, { key: '中危', value: '中危' }, '中危')
                    ])
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: '操作类型',
                        value: operationTypeFilter,
                        onChange: setOperationTypeFilter,
                        allowClear: true,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Select.Option, { key: 'all', value: 'all' }, '全部'),
                        React.createElement(Select.Option, { key: '通过', value: '通过' }, '通过'),
                        React.createElement(Select.Option, { key: '驳回', value: '驳回' }, '驳回')
                    ])
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(DateRangePicker, {
                        placeholder: ['开始时间', '结束时间'],
                        value: timeRange,
                        onChange: setTimeRange,
                        style: { width: '100%' }
                    })
                ])
            ]),
            React.createElement(Row, {
                key: 'action-row',
                style: { marginTop: '16px' }
            }, [
                React.createElement(Col, { span: 24 }, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: handleExport
                        }, '导出日志'),
                        React.createElement(Button, {
                            onClick: resetFilters
                        }, '重置筛选')
                    ])
                ])
            ])
        ]);
    };

    // 渲染统计信息
    const renderStatistics = () => {
        const filteredData = filterData();
        const totalLogs = filteredData.length;
        const approvedLogs = filteredData.filter(item => item.operationType === '通过').length;
        const rejectedLogs = filteredData.filter(item => item.operationType === '驳回').length;
        const successLogs = filteredData.filter(item => item.operationResult === '成功').length;
        const failedLogs = filteredData.filter(item => item.operationResult === '失败').length;

        return React.createElement(Row, {
            gutter: 16,
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '总日志数',
                    value: totalLogs,
                    prefix: '📊',
                    valueStyle: { color: '#1890ff' }
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '通过审核',
                    value: approvedLogs,
                    prefix: '✅',
                    valueStyle: { color: '#52c41a' }
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '驳回审核',
                    value: rejectedLogs,
                    prefix: '❌',
                    valueStyle: { color: '#ff4d4f' }
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '成功操作',
                    value: successLogs,
                    prefix: '✅',
                    valueStyle: { color: '#3f8600' }
                }))
            ])
        ]);
    };

    // 渲染日志详情弹窗
    const renderLogDetailModal = () => {
        if (!selectedLog) return null;

        return React.createElement(Modal, {
            title: '日志详情',
            open: logModalVisible,
            onCancel: () => setLogModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setLogModalVisible(false)
                }, '关闭')
            ],
            width: 800
        }, [
            React.createElement(Descriptions, {
                key: 'details',
                bordered: true,
                column: 2
            }, Object.entries(selectedLog).map(([key, value]) => 
                React.createElement(Descriptions.Item, {
                    key: key,
                    label: key,
                    span: 2
                }, String(value))
            ))
        ]);
    };

    // 渲染主要内容
    return React.createElement('div', {
        style: { padding: '24px' }
    }, [
        // 页面标题
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: '24px' }
        }, [
            React.createElement('h1', {
                style: { margin: 0, fontSize: '24px', fontWeight: 'bold' }
            }, '协会作品人工审核日志'),
            React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '针对因公发布作品人工审核的留存日志，记录审核过程和结果')
        ]),

        // 统计卡片
        renderStatistics(),

        // 搜索工具栏
        renderSearchToolbar(),

        // 日志表格
        React.createElement(Card, {
            key: 'log-table'
        }, [
            React.createElement(Table, {
                columns: columns,
                dataSource: filterData(),
                rowKey: 'id',
                loading: loading,
                pagination: {
                    total: filterData().length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                },
                size: 'middle',
                scroll: { x: 'max-content' }
            })
        ]),

        // 日志详情弹窗
        renderLogDetailModal()
    ]);
};

// 暴露到全局作用域
window.AssociationManualReviewLogs = AssociationManualReviewLogs;
