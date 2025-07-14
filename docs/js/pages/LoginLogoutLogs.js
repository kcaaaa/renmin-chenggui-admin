// 登录登出日志组件
const LoginLogoutLogs = () => {
    const { Card, Table, Button, Tag, Space, DatePicker, Input, Select } = antd;
    const { RangePicker } = DatePicker;
    const { Search } = Input;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const [filters, setFilters] = React.useState({});
    
    // 模拟登录登出日志数据
    const mockLogs = [
        { 
            id: 1, 
            username: 'admin', 
            action: 'login', 
            ip: '192.168.1.100', 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            location: '北京市',
            status: 'success',
            createTime: '2024-01-10 09:00:00'
        },
        { 
            id: 2, 
            username: 'user1', 
            action: 'login', 
            ip: '192.168.1.101', 
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            location: '上海市',
            status: 'failed',
            createTime: '2024-01-10 09:15:00'
        },
        { 
            id: 3, 
            username: 'admin', 
            action: 'logout', 
            ip: '192.168.1.100', 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            location: '北京市',
            status: 'success',
            createTime: '2024-01-10 17:30:00'
        },
        { 
            id: 4, 
            username: 'user2', 
            action: 'login', 
            ip: '192.168.1.102', 
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
            location: '广州市',
            status: 'success',
            createTime: '2024-01-10 10:20:00'
        }
    ];
    
    React.useEffect(() => {
        loadLogs();
    }, []);
    
    const loadLogs = () => {
        setLoading(true);
        setTimeout(() => {
            setLogs(mockLogs);
            setLoading(false);
        }, 1000);
    };
    
    const getActionTag = (action) => {
        const actionMap = {
            'login': { color: 'green', text: '登录' },
            'logout': { color: 'orange', text: '登出' }
        };
        const config = actionMap[action] || { color: 'default', text: action };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'success': { color: 'green', text: '成功' },
            'failed': { color: 'red', text: '失败' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: getActionTag
        },
        {
            title: 'IP地址',
            dataIndex: 'ip',
            key: 'ip'
        },
        {
            title: '位置',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '用户代理',
            dataIndex: 'userAgent',
            key: 'userAgent',
            render: (userAgent) => React.createElement('span', {
                title: userAgent,
                style: { 
                    display: 'inline-block',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }
            }, userAgent)
        },
        {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime'
        }
    ];
    
    const handleSearch = (value) => {
        setFilters({ ...filters, username: value });
        // 这里应该调用API进行搜索
        console.log('搜索用户:', value);
    };
    
    const handleDateChange = (dates) => {
        setFilters({ ...filters, dateRange: dates });
        // 这里应该调用API进行日期筛选
        console.log('日期范围:', dates);
    };
    
    const handleActionChange = (action) => {
        setFilters({ ...filters, action });
        // 这里应该调用API进行操作筛选
        console.log('操作类型:', action);
    };
    
    const exportLogs = () => {
        message.info('正在导出日志...');
        setTimeout(() => {
            message.success('日志导出成功');
        }, 2000);
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '登录登出日志'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '查看和管理用户登录登出记录')
        ]),
        
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 16 }
        }, React.createElement(Space, { wrap: true }, [
            React.createElement(Search, {
                key: 'search',
                placeholder: '搜索用户名',
                allowClear: true,
                style: { width: 200 },
                onSearch: handleSearch
            }),
            React.createElement(Select, {
                key: 'action-filter',
                placeholder: '操作类型',
                style: { width: 120 },
                allowClear: true,
                onChange: handleActionChange
            }, [
                React.createElement(Option, { key: 'login', value: 'login' }, '登录'),
                React.createElement(Option, { key: 'logout', value: 'logout' }, '登出')
            ]),
            React.createElement(RangePicker, {
                key: 'date-range',
                showTime: true,
                format: 'YYYY-MM-DD HH:mm:ss',
                onChange: handleDateChange
            }),
            React.createElement(Button, {
                key: 'export',
                type: 'primary',
                onClick: exportLogs
            }, '导出日志'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadLogs
            }, '刷新')
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: logs,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`,
                pageSizeOptions: ['10', '20', '50', '100']
            },
            scroll: { x: 'max-content' }
        }))
    ]);
};

window.LoginLogoutLogs = LoginLogoutLogs; 