// 展会维护日志页面
const ExhibitionMaintenanceLogs = () => {
    console.log('ExhibitionMaintenanceLogs component is rendering...');
    
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
    const [companyFilter, setCompanyFilter] = React.useState('');
    const [operationTypeFilter, setOperationTypeFilter] = React.useState('all');
    const [operationColumnFilter, setOperationColumnFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据
    const [logData, setLogData] = React.useState([
        {
            id: 'em_001',
            username: '维护员A',
            phone: '13800138001',
            ipv4: '192.168.1.100',
            ipv6: '2001:db8::1',
            companyName: '城轨建设公司A',
            operationType: '编辑',
            operationColumn: '展商简介',
            operationResult: '成功',
            operationTime: '2024-01-15 08:30:00'
        },
        {
            id: 'em_002',
            username: '维护员B',
            phone: '13800138002',
            ipv4: '192.168.1.101',
            ipv6: '2001:db8::2',
            companyName: '轨道交通公司B',
            operationType: '新增',
            operationColumn: '展位效果',
            operationResult: '成功',
            operationTime: '2024-01-15 09:15:00'
        },
        {
            id: 'em_003',
            username: '维护员C',
            phone: '13800138003',
            ipv4: '192.168.1.102',
            ipv6: '2001:db8::3',
            companyName: '地铁运营公司C',
            operationType: '删除',
            operationColumn: '核心展品展示',
            operationResult: '成功',
            operationTime: '2024-01-15 10:00:00'
        },
        {
            id: 'em_004',
            username: '维护员D',
            phone: '13800138004',
            ipv4: '192.168.1.103',
            ipv6: '2001:db8::4',
            companyName: '城轨设备公司D',
            operationType: '编辑',
            operationColumn: '展位视频',
            operationResult: '失败',
            operationTime: '2024-01-15 11:30:00'
        },
        {
            id: 'em_005',
            username: '维护员E',
            phone: '13800138005',
            ipv4: '192.168.1.104',
            ipv6: '2001:db8::5',
            companyName: '轨道交通公司E',
            operationType: '新增',
            operationColumn: '公司介绍',
            operationResult: '成功',
            operationTime: '2024-01-15 12:00:00'
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
        '编辑': { color: 'blue' },
        '删除': { color: 'red' },
        '新增': { color: 'green' }
    };

    // 操作栏目配置
    const OPERATION_COLUMNS = {
        '展商简介': { color: 'default' },
        '展位效果': { color: 'default' },
        '核心展品展示': { color: 'default' },
        '展位视频': { color: 'default' },
        '公司介绍': { color: 'default' },
        '产品宣传': { color: 'default' },
        '案例宣传': { color: 'default' }
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
        setCompanyFilter('');
        setOperationTypeFilter('all');
        setOperationColumnFilter('all');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const filteredData = filterData();
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条展会维护日志数据`);
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
            
            // 公司名称筛选
            if (companyFilter && 
                !item.companyName?.toLowerCase().includes(companyFilter.toLowerCase())) {
                return false;
            }
            
            // 操作类型筛选
            if (operationTypeFilter !== 'all' && item.operationType !== operationTypeFilter) {
                return false;
            }
            
            // 操作栏目筛选
            if (operationColumnFilter !== 'all' && item.operationColumn !== operationColumnFilter) {
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
        { title: '维护公司名称', dataIndex: 'companyName', key: 'companyName', width: 150 },
        { 
            title: '操作类型', 
            dataIndex: 'operationType', 
            key: 'operationType',
            render: (type) => React.createElement(Tag, {
                color: OPERATION_TYPES[type]?.color || 'default'
            }, type)
        },
        { 
            title: '操作栏目', 
            dataIndex: 'operationColumn', 
            key: 'operationColumn',
            render: (column) => React.createElement(Tag, {
                color: OPERATION_COLUMNS[column]?.color || 'default'
            }, column)
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
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Input, {
                        placeholder: "用户名",
                        value: usernameFilter,
                        onChange: (e) => setUsernameFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Input, {
                        placeholder: "公司名称",
                        value: companyFilter,
                        onChange: (e) => setCompanyFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 3 }, [
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
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: "操作栏目",
                        value: operationColumnFilter,
                        onChange: setOperationColumnFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Select.Option, { value: 'all' }, '全部栏目'),
                        ...Object.keys(OPERATION_COLUMNS).map(column =>
                            React.createElement(Select.Option, { key: column, value: column }, column)
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
        const editLogs = logData.filter(log => log.operationType === '编辑').length;
        const addLogs = logData.filter(log => log.operationType === '新增').length;
        const deleteLogs = logData.filter(log => log.operationType === '删除').length;
        const successLogs = logData.filter(log => log.operationResult === '成功').length;
        
        return React.createElement(Row, {
            gutter: [16, 16],
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '总维护数',
                    value: totalLogs,
                    prefix: '📋'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '今日维护',
                    value: todayLogs,
                    prefix: '📅'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '编辑操作',
                    value: editLogs,
                    prefix: '✏️',
                    valueStyle: { color: '#1890ff' }
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '新增操作',
                    value: addLogs,
                    prefix: '➕',
                    valueStyle: { color: '#3f8600' }
                }))
            ])
        ]);
    };

    // 渲染日志详情弹窗
    const renderLogDetailModal = () => {
        if (!selectedLog) return null;

        return React.createElement(Modal, {
            title: '展会维护日志详情',
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
            }, '展会维护日志'),
            React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '记录展会信息的维护操作，为展会内容管理与数据完整性提供审计支持')
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
window.ExhibitionMaintenanceLogs = ExhibitionMaintenanceLogs;
