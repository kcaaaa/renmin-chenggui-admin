// 协会作品AI审核日志页面
const AssociationAIReviewLogs = () => {
    console.log('AssociationAIReviewLogs component is rendering...');
    
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
    const [reviewRatingFilter, setReviewRatingFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据
    const [logData, setLogData] = React.useState([
        {
            id: 'aar_001',
            workId: 'work_001',
            workName: '城轨技术发展趋势分析',
            publisher: '协会官方',
            reviewRating: '无风险',
            operationStatus: '通过',
            operationResult: '成功',
            submitTime: '2024-01-15 09:00:00',
            approvalTime: '2024-01-15 09:05:00'
        },
        {
            id: 'aar_002',
            workId: 'work_002',
            workName: '轨道交通安全标准',
            publisher: '协会技术部',
            reviewRating: '低危',
            operationStatus: '人工审核',
            operationResult: '成功',
            submitTime: '2024-01-15 10:00:00',
            approvalTime: '2024-01-15 10:10:00'
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

    // 审核评级配置
    const REVIEW_RATINGS = {
        '无风险': { color: 'green' },
        '低危': { color: 'orange' },
        '中危': { color: 'red' },
        '高危': { color: 'volcano' }
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
        setReviewRatingFilter('all');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const filteredData = filterData();
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条协会作品AI审核日志数据`);
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
            if (publisherFilter && 
                !item.publisher?.toLowerCase().includes(publisherFilter.toLowerCase())) {
                return false;
            }
            
            // 审核评级筛选
            if (reviewRatingFilter !== 'all' && item.reviewRating !== reviewRatingFilter) {
                return false;
            }
            
            // 时间范围筛选
            if (timeRange && timeRange.length === 2) {
                const itemTime = new Date(item.submitTime);
                const startTime = timeRange[0].startOf('day');
                const endTime = timeRange[1].endOf('day');
                if (itemTime < startTime || itemTime > endTime) {
                    return false;
                }
            }
            
            return true;
        });
    };

    // 查看日志详情
    const viewLogDetails = (log) => {
        setSelectedLog(log);
        setLogModalVisible(true);
    };

    // 表格列定义
    const columns = [
        {
            title: '操作',
            key: 'action',
            width: 80,
            render: (_, record) => React.createElement(Button, {
                type: 'link',
                size: 'small',
                onClick: () => viewLogDetails(record)
            }, '查看')
        },
        { title: '作品ID', dataIndex: 'workId', key: 'workId' },
        { title: '作品名称', dataIndex: 'workName', key: 'workName' },
        { title: '发布人', dataIndex: 'publisher', key: 'publisher' },
        { 
            title: '审核评级', 
            dataIndex: 'reviewRating', 
            key: 'reviewRating',
            render: (rating) => React.createElement(Tag, {
                color: REVIEW_RATINGS[rating]?.color || 'default'
            }, rating)
        },
        { title: '操作状态', dataIndex: 'operationStatus', key: 'operationStatus' },
        { 
            title: '操作结果', 
            dataIndex: 'operationResult', 
            key: 'operationResult',
            render: (result) => React.createElement(Tag, {
                color: RESULT_CONFIG[result]?.color || 'default'
            }, result)
        },
        { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
        { title: '审批时间', dataIndex: 'approvalTime', key: 'approvalTime' }
    ];

    // 渲染搜索工具栏
    const renderSearchToolbar = () => {
        return React.createElement(Card, {
            style: { marginBottom: '16px' },
            bodyStyle: { padding: '16px' }
        }, [
            React.createElement(Row, {
                key: 'search-row',
                gutter: [16, 16],
                align: 'middle'
            }, [
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Search, {
                        placeholder: '搜索任意字段内容',
                        value: searchText,
                        onChange: (e) => setSearchText(e.target.value),
                        onSearch: (value) => setSearchText(value),
                        allowClear: true,
                        enterButton: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: "发布人",
                        value: publisherFilter,
                        onChange: (e) => setPublisherFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Select, {
                        placeholder: "审核评级",
                        value: reviewRatingFilter,
                        onChange: setReviewRatingFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Select.Option, { value: 'all' }, '全部评级'),
                        ...Object.keys(REVIEW_RATINGS).map(rating =>
                            React.createElement(Select.Option, { key: rating, value: rating }, rating)
                        )
                    ])
                ]),
                React.createElement(Col, { span: 6 }, [
                    React.createElement(DateRangePicker, {
                        placeholder: ['开始时间', '结束时间'],
                        value: timeRange,
                        onChange: setTimeRange,
                        style: { width: '100%' },
                        format: 'YYYY-MM-DD HH:mm',
                        showTime: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            onClick: resetFilters
                        }, '重置'),
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => loadLogData()
                        }, '搜索'),
                        React.createElement(Button, {
                            onClick: handleExport
                        }, '导出')
                    ])
                ])
            ])
        ]);
    };

    // 渲染统计卡片
    const renderStatistics = () => {
        const totalLogs = logData.length;
        const todayLogs = Math.floor(totalLogs * 0.2);
        const successLogs = logData.filter(log => log.operationResult === '成功').length;
        const failedLogs = totalLogs - successLogs;
        
        return React.createElement(Row, {
            gutter: [16, 16],
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '总日志数',
                    value: totalLogs,
                    prefix: '📋'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '今日日志',
                    value: todayLogs,
                    prefix: '📅'
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
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '失败操作',
                    value: failedLogs,
                    prefix: '❌',
                    valueStyle: { color: '#cf1322' }
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
            }, '协会作品AI审核日志'),
            React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '记录协会作品的AI审核过程，为内容安全审计与AI审核效果分析提供关键依据')
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
window.AssociationAIReviewLogs = AssociationAIReviewLogs;
