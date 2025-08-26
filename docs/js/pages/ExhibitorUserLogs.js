// 展商用户操作日志页面
const ExhibitorUserLogs = () => {
    console.log('ExhibitorUserLogs component is rendering...');
    
    const { Row, Col, Card, Button, Space, Tag, Table, Modal, Input, Select, message, DatePicker, Statistic, Descriptions } = antd;
    const { Search } = Input;
    const { RangePicker: DateRangePicker } = DatePicker;
    
    // 状态管理
    const [logModalVisible, setLogModalVisible] = React.useState(false);
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [userFilter, setUserFilter] = React.useState('');
    const [ipFilter, setIpFilter] = React.useState('');
    const [operationTypeFilter, setOperationTypeFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据
    const [logData, setLogData] = React.useState([
        {
            id: 'eu_001',
            username: '展商A',
            phone: '13700137001',
            ipv4: '192.168.3.100',
            ipv6: '2001:db8::200',
            operationType: '登录',
            operationResult: '成功',
            operationTime: '2024-01-15 08:00:25'
        },
        {
            id: 'eu_002',
            username: '展商B',
            phone: '13700137002',
            ipv4: '192.168.3.101',
            ipv6: '2001:db8::201',
            operationType: '发布',
            operationResult: '成功',
            operationTime: '2024-01-15 09:00:30'
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
        '登录': { color: 'blue' },
        '评论': { color: 'green' },
        '发布': { color: 'orange' },
        '下架': { color: 'red' },
        '私信': { color: 'purple' },
        '注销': { color: 'volcano' }
    };

    // 操作结果配置
    const RESULT_CONFIG = {
        '成功': { color: 'green' },
        '失败': { color: 'red' }
    };

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setUserFilter('');
        setIpFilter('');
        setOperationTypeFilter('all');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const filteredData = filterData();
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条展商用户操作日志数据`);
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
            
            // 用户筛选
            if (userFilter && 
                !item.username?.toLowerCase().includes(userFilter.toLowerCase())) {
                return false;
            }
            
            // IP地址筛选
            if (ipFilter && 
                !item.ipv4?.includes(ipFilter) &&
                !item.ipv6?.includes(ipFilter)) {
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
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '手机号', dataIndex: 'phone', key: 'phone' },
        { title: 'IPv4', dataIndex: 'ipv4', key: 'ipv4' },
        { title: 'IPv6', dataIndex: 'ipv6', key: 'ipv6' },
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
                        placeholder: "用户名",
                        value: userFilter,
                        onChange: (e) => setUserFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: "IP地址",
                        value: ipFilter,
                        onChange: (e) => setIpFilter(e.target.value),
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
            }, '展商用户操作日志'),
            React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '记录展商用户在平台上的所有关键操作，包括登录、发布、下架、评论、维护等')
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
window.ExhibitorUserLogs = ExhibitorUserLogs;
