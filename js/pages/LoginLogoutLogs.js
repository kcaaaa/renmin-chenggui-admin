// 登录登出日志页面 - 基于文档7.4.2功能设计
const LoginLogoutLogs = () => {
    const { Card, Table, Button, Space, DatePicker, Select, Input, message, Tag, Tooltip, Descriptions, Modal } = antd;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const { Search } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const [filteredLogs, setFilteredLogs] = React.useState([]);
    const [filters, setFilters] = React.useState({
        dateRange: null,
        userType: '',
        action: '',
        status: '',
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
        // 模拟登录登出日志数据
        setTimeout(() => {
            const mockLogs = [
                {
                    id: 'log001',
                    userId: 'user001',
                    username: '张管理',
                    userType: '管理员',
                    action: '登录',
                    status: '成功',
                    ipAddress: '192.168.1.100',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    location: '北京市朝阳区',
                    device: 'PC',
                    browser: 'Chrome 118.0',
                    sessionId: 'sess_001',
                    loginTime: '2025-01-18 09:30:15',
                    logoutTime: null,
                    duration: null,
                    remark: '正常登录'
                },
                {
                    id: 'log002',
                    userId: 'user002',
                    username: '李编辑',
                    userType: '内容管理员',
                    action: '登出',
                    status: '成功',
                    ipAddress: '192.168.1.101',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                    location: '上海市浦东新区',
                    device: 'Mac',
                    browser: 'Chrome 118.0',
                    sessionId: 'sess_002',
                    loginTime: '2025-01-18 08:45:30',
                    logoutTime: '2025-01-18 12:30:45',
                    duration: '3小时45分钟',
                    remark: '主动登出'
                },
                {
                    id: 'log003',
                    userId: 'user003',
                    username: '王审核',
                    userType: '审核专员',
                    action: '登录',
                    status: '失败',
                    ipAddress: '192.168.1.102',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    location: '广州市天河区',
                    device: 'PC',
                    browser: 'Edge 118.0',
                    sessionId: null,
                    loginTime: '2025-01-18 10:15:20',
                    logoutTime: null,
                    duration: null,
                    remark: '密码错误'
                },
                {
                    id: 'log004',
                    userId: 'user004',
                    username: '赵运营',
                    userType: '运营专员',
                    action: '登录',
                    status: '成功',
                    ipAddress: '192.168.1.103',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
                    location: '深圳市南山区',
                    device: 'Mobile',
                    browser: 'Safari 16.0',
                    sessionId: 'sess_004',
                    loginTime: '2025-01-18 11:20:10',
                    logoutTime: null,
                    duration: null,
                    remark: '移动端登录'
                },
                {
                    id: 'log005',
                    userId: 'user005',
                    username: '孙客服',
                    userType: '客服人员',
                    action: '登出',
                    status: '异常',
                    ipAddress: '192.168.1.104',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    location: '成都市武侯区',
                    device: 'PC',
                    browser: 'Firefox 118.0',
                    sessionId: 'sess_005',
                    loginTime: '2025-01-18 09:00:00',
                    logoutTime: '2025-01-18 11:30:00',
                    duration: '2小时30分钟',
                    remark: '会话超时自动登出'
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
                const logDate = new Date(log.loginTime);
                return logDate >= start && logDate <= end;
            });
        }

        // 用户类型过滤
        if (filters.userType) {
            filtered = filtered.filter(log => log.userType === filters.userType);
        }

        // 操作类型过滤
        if (filters.action) {
            filtered = filtered.filter(log => log.action === filters.action);
        }

        // 状态过滤
        if (filters.status) {
            filtered = filtered.filter(log => log.status === filters.status);
        }

        // 关键词搜索
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            filtered = filtered.filter(log => 
                log.username.toLowerCase().includes(keyword) ||
                log.ipAddress.includes(keyword) ||
                log.location.toLowerCase().includes(keyword) ||
                (log.remark && log.remark.toLowerCase().includes(keyword))
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
            userType: '',
            action: '',
            status: '',
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
            case '成功': return 'green';
            case '失败': return 'red';
            case '异常': return 'orange';
            default: return 'default';
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case '登录': return 'blue';
            case '登出': return 'default';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: '时间',
            dataIndex: 'loginTime',
            key: 'loginTime',
            width: 150,
            sorter: (a, b) => new Date(a.loginTime) - new Date(b.loginTime),
            render: (time) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'date',
                        style: { fontSize: '14px' } 
                    }, time.split(' ')[0]),
                    React.createElement('div', { 
                        key: 'time',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, time.split(' ')[1])
                ])
            )
        },
        {
            title: '用户信息',
            key: 'userInfo',
            width: 150,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'username',
                        style: { fontWeight: 500, marginBottom: '4px' } 
                    }, record.username),
                    React.createElement(Tag, { 
                        key: 'userType',
                        size: 'small',
                        color: 'blue'
                    }, record.userType)
                ])
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 80,
            filters: [
                { text: '登录', value: '登录' },
                { text: '登出', value: '登出' }
            ],
            render: (action) => (
                React.createElement(Tag, { color: getActionColor(action) }, action)
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            filters: [
                { text: '成功', value: '成功' },
                { text: '失败', value: '失败' },
                { text: '异常', value: '异常' }
            ],
            render: (status) => (
                React.createElement(Tag, { color: getStatusColor(status) }, status)
            )
        },
        {
            title: 'IP地址',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
            width: 120
        },
        {
            title: '地理位置',
            dataIndex: 'location',
            key: 'location',
            width: 120
        },
        {
            title: '设备信息',
            key: 'deviceInfo',
            width: 100,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'device',
                        style: { fontSize: '12px' } 
                    }, record.device),
                    React.createElement('div', { 
                        key: 'browser',
                        style: { fontSize: '11px', color: '#8c8c8c' } 
                    }, record.browser)
                ])
            )
        },
        {
            title: '会话时长',
            dataIndex: 'duration',
            key: 'duration',
            width: 100,
            render: (duration) => duration || '-'
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: 120,
            ellipsis: true,
            render: (remark) => (
                React.createElement(Tooltip, { title: remark }, 
                    React.createElement('span', { 
                        style: { cursor: 'pointer' } 
                    }, remark)
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
                    }, '登录登出日志'),
                    React.createElement('p', { 
                        key: 'desc',
                        style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                    }, '记录所有用户的登录登出行为，确保系统访问安全性（等保三级要求）')
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
                
                React.createElement('div', { key: 'user-type' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '用户类型：'),
                    React.createElement(Select, {
                        value: filters.userType,
                        onChange: (value) => handleFilterChange('userType', value),
                        style: { width: '120px' },
                        allowClear: true,
                        placeholder: '全部'
                    }, [
                        React.createElement(Option, { key: '管理员', value: '管理员' }, '管理员'),
                        React.createElement(Option, { key: '内容管理员', value: '内容管理员' }, '内容管理员'),
                        React.createElement(Option, { key: '审核专员', value: '审核专员' }, '审核专员'),
                        React.createElement(Option, { key: '运营专员', value: '运营专员' }, '运营专员'),
                        React.createElement(Option, { key: '客服人员', value: '客服人员' }, '客服人员')
                    ])
                ]),
                
                React.createElement('div', { key: 'action-type' }, [
                    React.createElement('span', { 
                        style: { marginRight: '8px', fontSize: '14px' } 
                    }, '操作类型：'),
                    React.createElement(Select, {
                        value: filters.action,
                        onChange: (value) => handleFilterChange('action', value),
                        style: { width: '100px' },
                        allowClear: true,
                        placeholder: '全部'
                    }, [
                        React.createElement(Option, { key: '登录', value: '登录' }, '登录'),
                        React.createElement(Option, { key: '登出', value: '登出' }, '登出')
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
                        React.createElement(Option, { key: '成功', value: '成功' }, '成功'),
                        React.createElement(Option, { key: '失败', value: '失败' }, '失败'),
                        React.createElement(Option, { key: '异常', value: '异常' }, '异常')
                    ])
                ]),
                
                React.createElement(Search, {
                    key: 'search',
                    placeholder: '搜索用户名、IP、地址...',
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
                scroll: { x: 1200 },
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
            title: '登录登出详情',
            visible: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            width: 800,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ]
        }, selectedLog && React.createElement(Descriptions, {
            column: 2,
            bordered: true
        }, [
            React.createElement(Descriptions.Item, { 
                key: 'username', 
                label: '用户名' 
            }, selectedLog.username),
            React.createElement(Descriptions.Item, { 
                key: 'userType', 
                label: '用户类型' 
            }, selectedLog.userType),
            React.createElement(Descriptions.Item, { 
                key: 'action', 
                label: '操作类型' 
            }, React.createElement(Tag, { color: getActionColor(selectedLog.action) }, selectedLog.action)),
            React.createElement(Descriptions.Item, { 
                key: 'status', 
                label: '状态' 
            }, React.createElement(Tag, { color: getStatusColor(selectedLog.status) }, selectedLog.status)),
            React.createElement(Descriptions.Item, { 
                key: 'loginTime', 
                label: '登录时间' 
            }, selectedLog.loginTime),
            React.createElement(Descriptions.Item, { 
                key: 'logoutTime', 
                label: '登出时间' 
            }, selectedLog.logoutTime || '-'),
            React.createElement(Descriptions.Item, { 
                key: 'duration', 
                label: '会话时长' 
            }, selectedLog.duration || '-'),
            React.createElement(Descriptions.Item, { 
                key: 'sessionId', 
                label: '会话ID' 
            }, selectedLog.sessionId || '-'),
            React.createElement(Descriptions.Item, { 
                key: 'ipAddress', 
                label: 'IP地址' 
            }, selectedLog.ipAddress),
            React.createElement(Descriptions.Item, { 
                key: 'location', 
                label: '地理位置' 
            }, selectedLog.location),
            React.createElement(Descriptions.Item, { 
                key: 'device', 
                label: '设备类型' 
            }, selectedLog.device),
            React.createElement(Descriptions.Item, { 
                key: 'browser', 
                label: '浏览器' 
            }, selectedLog.browser),
            React.createElement(Descriptions.Item, { 
                key: 'userAgent', 
                label: 'User Agent',
                span: 2
            }, selectedLog.userAgent),
            React.createElement(Descriptions.Item, { 
                key: 'remark', 
                label: '备注',
                span: 2
            }, selectedLog.remark)
        ]))
    ]);
};

// 确保组件被正确导出
window.LoginLogoutLogs = LoginLogoutLogs; 