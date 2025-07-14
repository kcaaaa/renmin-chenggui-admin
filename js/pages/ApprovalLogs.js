// 审批日志组件
const ApprovalLogs = () => {
    const { Card, Table, Button, Tag, Space, DatePicker, Input, Select } = antd;
    const { RangePicker } = DatePicker;
    const { Search } = Input;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const [filters, setFilters] = React.useState({});
    
    // 模拟审批日志数据
    const mockLogs = [
        { 
            id: 1, 
            title: '轨道交通技术文章审批', 
            type: 'content', 
            applicant: '张三', 
            approver: '李四',
            action: 'approve', 
            status: 'approved',
            reason: '内容质量高，符合发布标准',
            createTime: '2024-01-10 09:00:00',
            approveTime: '2024-01-10 10:30:00'
        },
        { 
            id: 2, 
            title: '用户权限变更申请', 
            type: 'permission', 
            applicant: '王五', 
            approver: '赵六',
            action: 'reject', 
            status: 'rejected',
            reason: '权限级别过高，需要更多审批',
            createTime: '2024-01-10 11:00:00',
            approveTime: '2024-01-10 11:45:00'
        },
        { 
            id: 3, 
            title: '产品信息发布申请', 
            type: 'product', 
            applicant: '孙七', 
            approver: null,
            action: 'pending', 
            status: 'pending',
            reason: null,
            createTime: '2024-01-10 14:00:00',
            approveTime: null
        },
        { 
            id: 4, 
            title: '活动宣传内容审批', 
            type: 'activity', 
            applicant: '周八', 
            approver: '吴九',
            action: 'approve', 
            status: 'approved',
            reason: '活动内容丰富，宣传效果好',
            createTime: '2024-01-10 15:20:00',
            approveTime: '2024-01-10 16:00:00'
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
    
    const getTypeTag = (type) => {
        const typeMap = {
            'content': { color: 'blue', text: '内容审批' },
            'permission': { color: 'purple', text: '权限审批' },
            'product': { color: 'green', text: '产品审批' },
            'activity': { color: 'orange', text: '活动审批' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getActionTag = (action) => {
        const actionMap = {
            'approve': { color: 'green', text: '通过' },
            'reject': { color: 'red', text: '拒绝' },
            'pending': { color: 'orange', text: '待审批' }
        };
        const config = actionMap[action] || { color: 'default', text: action };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'approved': { color: 'green', text: '已通过' },
            'rejected': { color: 'red', text: '已拒绝' },
            'pending': { color: 'orange', text: '待审批' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '审批标题',
            dataIndex: 'title',
            key: 'title',
            render: (title) => React.createElement('span', {
                style: { 
                    display: 'inline-block',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                },
                title: title
            }, title)
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '申请人',
            dataIndex: 'applicant',
            key: 'applicant'
        },
        {
            title: '审批人',
            dataIndex: 'approver',
            key: 'approver',
            render: (approver) => approver || '待分配'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: getActionTag
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '审批理由',
            dataIndex: 'reason',
            key: 'reason',
            render: (reason) => reason ? React.createElement('span', {
                style: { 
                    display: 'inline-block',
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                },
                title: reason
            }, reason) : '-'
        },
        {
            title: '申请时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '审批时间',
            dataIndex: 'approveTime',
            key: 'approveTime',
            render: (approveTime) => approveTime || '-'
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'link',
                    size: 'small',
                    onClick: () => showDetail(record)
                }, '详情'),
                record.status === 'pending' && React.createElement(Button, {
                    key: 'process',
                    type: 'link',
                    size: 'small',
                    onClick: () => processApproval(record)
                }, '处理')
            ])
        }
    ];
    
    const showDetail = (record) => {
        message.info(`查看详情: ${record.title}`);
    };
    
    const processApproval = (record) => {
        message.info(`处理审批: ${record.title}`);
    };
    
    const handleSearch = (value) => {
        setFilters({ ...filters, title: value });
        console.log('搜索标题:', value);
    };
    
    const handleDateChange = (dates) => {
        setFilters({ ...filters, dateRange: dates });
        console.log('日期范围:', dates);
    };
    
    const handleTypeChange = (type) => {
        setFilters({ ...filters, type });
        console.log('审批类型:', type);
    };
    
    const handleStatusChange = (status) => {
        setFilters({ ...filters, status });
        console.log('审批状态:', status);
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
            }, '审批日志'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '查看和管理审批操作记录')
        ]),
        
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 16 }
        }, React.createElement(Space, { wrap: true }, [
            React.createElement(Search, {
                key: 'search',
                placeholder: '搜索审批标题',
                allowClear: true,
                style: { width: 200 },
                onSearch: handleSearch
            }),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '审批类型',
                style: { width: 120 },
                allowClear: true,
                onChange: handleTypeChange
            }, [
                React.createElement(Option, { key: 'content', value: 'content' }, '内容审批'),
                React.createElement(Option, { key: 'permission', value: 'permission' }, '权限审批'),
                React.createElement(Option, { key: 'product', value: 'product' }, '产品审批'),
                React.createElement(Option, { key: 'activity', value: 'activity' }, '活动审批')
            ]),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '审批状态',
                style: { width: 120 },
                allowClear: true,
                onChange: handleStatusChange
            }, [
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审批'),
                React.createElement(Option, { key: 'approved', value: 'approved' }, '已通过'),
                React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝')
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

window.ApprovalLogs = ApprovalLogs; 