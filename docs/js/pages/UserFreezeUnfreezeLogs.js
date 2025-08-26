// 用户冻结/解冻日志页面
const UserFreezeUnfreezeLogs = () => {
    console.log('UserFreezeUnfreezeLogs component is rendering...');
    
    const { Row, Col, Card, Button, Space, Tag, Table, Modal, Input, Select, message, DatePicker, Statistic, Descriptions } = antd;
    const { Search } = Input;
    const { RangePicker: DateRangePicker } = DatePicker;
    
    // 状态管理
    const [logModalVisible, setLogModalVisible] = React.useState(false);
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [targetUserFilter, setTargetUserFilter] = React.useState('');
    const [operatorFilter, setOperatorFilter] = React.useState('');
    const [operationTypeFilter, setOperationTypeFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据
    const [logData, setLogData] = React.useState([
        {
            id: 'ufu_001',
            targetUsername: '用户A',
            targetPhone: '13800138001',
            operator: '管理员张三',
            operationType: '冻结',
            operationResult: '成功',
            operationTime: '2024-01-15 08:30:00',
            remark: '用户发布违规内容，违反社区规范'
        },
        {
            id: 'ufu_002',
            targetUsername: '用户B',
            targetPhone: '13800138002',
            operator: '管理员李四',
            operationType: '解冻',
            operationResult: '成功',
            operationTime: '2024-01-15 09:15:00',
            remark: '用户已整改，符合解冻条件'
        },
        {
            id: 'ufu_003',
            targetUsername: '用户C',
            targetPhone: '13800138003',
            operator: '管理员王五',
            operationType: '冻结',
            operationResult: '成功',
            operationTime: '2024-01-15 10:00:00',
            remark: '用户恶意刷屏，影响平台秩序'
        },
        {
            id: 'ufu_004',
            targetUsername: '用户D',
            targetPhone: '13800138004',
            operator: '管理员赵六',
            operationType: '冻结',
            operationResult: '失败',
            operationTime: '2024-01-15 11:30:00',
            remark: '系统错误，操作失败'
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

    // 操作类型配置
    const OPERATION_TYPES = {
        '冻结': { color: 'red' },
        '解冻': { color: 'green' }
    };

    // 操作结果配置
    const RESULT_CONFIG = {
        '成功': { color: 'green' },
        '失败': { color: 'red' }
    };

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setTargetUserFilter('');
        setOperatorFilter('');
        setOperationTypeFilter('all');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const filteredData = filterData();
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条用户冻结/解冻日志数据`);
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
            
            // 目标用户筛选
            if (targetUserFilter && 
                !item.targetUsername?.toLowerCase().includes(targetUserFilter.toLowerCase())) {
                return false;
            }
            
            // 操作人筛选
            if (operatorFilter && 
                !item.operator?.toLowerCase().includes(operatorFilter.toLowerCase())) {
                return false;
            }
            
            // 操作类型筛选
            if (operationTypeFilter !== 'all' && item.operationType !== operationTypeFilter) {
                return false;
            }
            
            // 时间范围筛选
            if (timeRange && timeRange.length === 2) {
                const itemTime = new Date(item.operationTime);
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
        { title: '目标用户名', dataIndex: 'targetUsername', key: 'targetUsername' },
        { title: '目标手机号', dataIndex: 'targetPhone', key: 'targetPhone' },
        { title: '操作人', dataIndex: 'operator', key: 'operator' },
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
        { title: '操作时间', dataIndex: 'operationTime', key: 'operationTime' }
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
                        placeholder: "目标用户名",
                        value: targetUserFilter,
                        onChange: (e) => setTargetUserFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: "操作人",
                        value: operatorFilter,
                        onChange: (e) => setOperatorFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Select, {
                        placeholder: "操作类型",
                        value: operationTypeFilter,
                        onChange: setOperationTypeFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Select.Option, { value: 'all' }, '全部类型'),
                        ...Object.keys(OPERATION_TYPES).map(type =>
                            React.createElement(Select.Option, { key: type, value: type }, type)
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
        const freezeLogs = logData.filter(log => log.operationType === '冻结').length;
        const unfreezeLogs = logData.filter(log => log.operationType === '解冻').length;
        const successLogs = logData.filter(log => log.operationResult === '成功').length;
        const failedLogs = logData.filter(log => log.operationResult === '失败').length;
        
        return React.createElement(Row, {
            gutter: [16, 16],
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '总操作数',
                    value: totalLogs,
                    prefix: '📋'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '今日操作',
                    value: todayLogs,
                    prefix: '📅'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '冻结操作',
                    value: freezeLogs,
                    prefix: '🔒',
                    valueStyle: { color: '#cf1322' }
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '解冻操作',
                    value: unfreezeLogs,
                    prefix: '🔓',
                    valueStyle: { color: '#3f8600' }
                }))
            ])
        ]);
    };

    // 渲染日志详情弹窗
    const renderLogDetailModal = () => {
        if (!selectedLog) return null;

        return React.createElement(Modal, {
            title: '用户冻结/解冻日志详情',
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
                    span: key === 'remark' ? 2 : 1
                }, key === 'remark' && value ? 
                    React.createElement('div', {
                        style: { 
                            backgroundColor: '#f5f5f5', 
                            padding: '8px', 
                            borderRadius: '4px',
                            color: '#cf1322'
                        }
                    }, value) : 
                    String(value)
                )
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
            }, '用户冻结/解冻日志'),
            React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '记录用户账户冻结与解冻操作，为用户管理决策与安全审计提供重要依据')
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
window.UserFreezeUnfreezeLogs = UserFreezeUnfreezeLogs;
