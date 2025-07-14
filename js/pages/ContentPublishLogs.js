// 内容发布日志组件
const ContentPublishLogs = () => {
    const { Card, Table, Button, Tag, Space, DatePicker, Input, Select } = antd;
    const { RangePicker } = DatePicker;
    const { Search } = Input;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const [filters, setFilters] = React.useState({});
    
    // 模拟内容发布日志数据
    const mockLogs = [
        { 
            id: 1, 
            title: '轨道交通新技术发布', 
            type: 'article', 
            author: '张三', 
            action: 'publish', 
            status: 'success',
            category: '技术资讯',
            createTime: '2024-01-10 09:00:00'
        },
        { 
            id: 2, 
            title: '城轨运营管理指南', 
            type: 'document', 
            author: '李四', 
            action: 'update', 
            status: 'success',
            category: '管理文档',
            createTime: '2024-01-10 10:30:00'
        },
        { 
            id: 3, 
            title: '安全培训视频', 
            type: 'video', 
            author: '王五', 
            action: 'publish', 
            status: 'failed',
            category: '培训资料',
            createTime: '2024-01-10 11:15:00'
        },
        { 
            id: 4, 
            title: '产品宣传图片', 
            type: 'image', 
            author: '赵六', 
            action: 'delete', 
            status: 'success',
            category: '营销素材',
            createTime: '2024-01-10 14:20:00'
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
            'article': { color: 'blue', text: '文章' },
            'document': { color: 'green', text: '文档' },
            'video': { color: 'purple', text: '视频' },
            'image': { color: 'orange', text: '图片' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getActionTag = (action) => {
        const actionMap = {
            'publish': { color: 'green', text: '发布' },
            'update': { color: 'blue', text: '更新' },
            'delete': { color: 'red', text: '删除' },
            'draft': { color: 'orange', text: '草稿' }
        };
        const config = actionMap[action] || { color: 'default', text: action };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'success': { color: 'green', text: '成功' },
            'failed': { color: 'red', text: '失败' },
            'pending': { color: 'orange', text: '处理中' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '内容标题',
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
            title: '分类',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author'
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
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime'
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
                React.createElement(Button, {
                    key: 'rollback',
                    type: 'link',
                    size: 'small',
                    onClick: () => rollbackAction(record)
                }, '回滚')
            ])
        }
    ];
    
    const showDetail = (record) => {
        message.info(`查看详情: ${record.title}`);
    };
    
    const rollbackAction = (record) => {
        Modal.confirm({
            title: '确认回滚',
            content: `确定要回滚操作"${record.action}"吗？`,
            onOk: () => {
                message.success('回滚成功');
                loadLogs();
            }
        });
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
        console.log('内容类型:', type);
    };
    
    const handleActionChange = (action) => {
        setFilters({ ...filters, action });
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
            }, '内容发布日志'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '查看和管理内容发布操作记录')
        ]),
        
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 16 }
        }, React.createElement(Space, { wrap: true }, [
            React.createElement(Search, {
                key: 'search',
                placeholder: '搜索内容标题',
                allowClear: true,
                style: { width: 200 },
                onSearch: handleSearch
            }),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '内容类型',
                style: { width: 120 },
                allowClear: true,
                onChange: handleTypeChange
            }, [
                React.createElement(Option, { key: 'article', value: 'article' }, '文章'),
                React.createElement(Option, { key: 'document', value: 'document' }, '文档'),
                React.createElement(Option, { key: 'video', value: 'video' }, '视频'),
                React.createElement(Option, { key: 'image', value: 'image' }, '图片')
            ]),
            React.createElement(Select, {
                key: 'action-filter',
                placeholder: '操作类型',
                style: { width: 120 },
                allowClear: true,
                onChange: handleActionChange
            }, [
                React.createElement(Option, { key: 'publish', value: 'publish' }, '发布'),
                React.createElement(Option, { key: 'update', value: 'update' }, '更新'),
                React.createElement(Option, { key: 'delete', value: 'delete' }, '删除')
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

window.ContentPublishLogs = ContentPublishLogs; 