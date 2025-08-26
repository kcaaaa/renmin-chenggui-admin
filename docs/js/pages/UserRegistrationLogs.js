// 用户注册日志页面
const UserRegistrationLogs = () => {
    console.log('UserRegistrationLogs component is rendering...');
    
    const { Row, Col, Card, Button, Space, Tag, Table, Modal, Input, Select, message, DatePicker, Statistic, Descriptions } = antd;
    const { Search } = Input;
    const { RangePicker: DateRangePicker } = DatePicker;
    
    // 状态管理
    const [logModalVisible, setLogModalVisible] = React.useState(false);
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [usernameFilter, setUsernameFilter] = React.useState('');
    const [phoneFilter, setPhoneFilter] = React.useState('');
    const [resultFilter, setResultFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据
    const [logData, setLogData] = React.useState([
        {
            id: 'ur_001',
            username: '用户A',
            phone: '13800138001',
            userId: 'U001',
            ipv4: '192.168.1.100',
            ipv6: '2001:db8::1',
            registrationTime: '2024-01-15 08:30:00',
            operationResult: '成功'
        },
        {
            id: 'ur_002',
            username: '用户B',
            phone: '13800138002',
            userId: 'U002',
            ipv4: '192.168.1.101',
            ipv6: '2001:db8::2',
            registrationTime: '2024-01-15 09:15:00',
            operationResult: '成功'
        },
        {
            id: 'ur_003',
            username: '用户C',
            phone: '13800138003',
            userId: 'U003',
            ipv4: '192.168.1.102',
            ipv6: '2001:db8::3',
            registrationTime: '2024-01-15 10:00:00',
            operationResult: '失败'
        },
        {
            id: 'ur_004',
            username: '用户D',
            phone: '13800138004',
            userId: 'U004',
            ipv4: '192.168.1.103',
            ipv6: '2001:db8::4',
            registrationTime: '2024-01-15 11:30:00',
            operationResult: '成功'
        },
        {
            id: 'ur_005',
            username: '用户E',
            phone: '13800138005',
            userId: 'U005',
            ipv4: '192.168.1.104',
            ipv6: '2001:db8::5',
            registrationTime: '2024-01-15 12:00:00',
            operationResult: '失败'
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

    // 操作结果配置
    const RESULT_CONFIG = {
        '成功': { color: 'green' },
        '失败': { color: 'red' }
    };

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setUsernameFilter('');
        setPhoneFilter('');
        setResultFilter('all');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const filteredData = filterData();
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条用户注册日志数据`);
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
            
            // 用户名筛选
            if (usernameFilter && 
                !item.username?.toLowerCase().includes(usernameFilter.toLowerCase())) {
                return false;
            }
            
            // 手机号筛选
            if (phoneFilter && 
                !item.phone?.includes(phoneFilter)) {
                return false;
            }
            
            // 操作结果筛选
            if (resultFilter !== 'all' && item.operationResult !== resultFilter) {
                return false;
            }
            
            // 时间范围筛选
            if (timeRange && timeRange.length === 2) {
                const itemTime = new Date(item.registrationTime);
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
        { title: '用户ID', dataIndex: 'userId', key: 'userId' },
        { title: 'IPv4', dataIndex: 'ipv4', key: 'ipv4' },
        { title: 'IPv6', dataIndex: 'ipv6', key: 'ipv6' },
        { title: '注册时间', dataIndex: 'registrationTime', key: 'registrationTime' },
        { 
            title: '操作结果', 
            dataIndex: 'operationResult', 
            key: 'operationResult',
            render: (result) => React.createElement(Tag, {
                color: RESULT_CONFIG[result]?.color || 'default'
            }, result)
        }
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
                        value: usernameFilter,
                        onChange: (e) => setUsernameFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: "手机号",
                        value: phoneFilter,
                        onChange: (e) => setPhoneFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Select, {
                        placeholder: "操作结果",
                        value: resultFilter,
                        onChange: setResultFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Select.Option, { value: 'all' }, '全部结果'),
                        ...Object.keys(RESULT_CONFIG).map(result =>
                            React.createElement(Select.Option, { key: result, value: result }, result)
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
        const failedLogs = logData.filter(log => log.operationResult === '失败').length;
        const uniqueIPs = new Set(logData.map(log => log.ipv4)).size;
        
        return React.createElement(Row, {
            gutter: [16, 16],
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '总注册数',
                    value: totalLogs,
                    prefix: '📋'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '今日注册',
                    value: todayLogs,
                    prefix: '📅'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '注册成功',
                    value: successLogs,
                    prefix: '✅',
                    valueStyle: { color: '#3f8600' }
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '注册失败',
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
            title: '用户注册日志详情',
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
                    span: 1
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
            }, '用户注册日志'),
            React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '记录用户注册过程，为用户增长分析与安全监控提供数据支持')
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
window.UserRegistrationLogs = UserRegistrationLogs;
