// 内容列表页面
const ContentList = () => {
    const { Card, Table, Button, Select, DatePicker, Input, Tag, Space, Statistic, Row, Col, Modal, message } = antd;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const { Search } = Input;

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [filters, setFilters] = React.useState({
        contentType: [],
        status: '',
        dateRange: null,
        keyword: ''
    });

    // 模拟统计数据
    const [stats, setStats] = React.useState({
        totalContent: 1256,
        todayPublished: 23,
        pendingReview: 45,
        published: 1098,
        offline: 113
    });

    // 模拟内容数据
    const mockData = [
        {
            key: '1',
            id: 'C001',
            title: '城轨建设新技术应用探讨',
            type: 'article',
            author: '技术部',
            authorType: 'association',
            publishTime: '2024-01-15 14:30:00',
            status: 'published',
            viewCount: 1234,
            likeCount: 89,
            commentCount: 45,
            tags: ['技术创新', '城轨建设']
        },
        {
            key: '2',
            id: 'C002',
            title: '轨道交通安全管理视频',
            type: 'video',
            author: '安全部',
            authorType: 'association',
            publishTime: '2024-01-15 10:20:00',
            status: 'reviewing',
            viewCount: 567,
            likeCount: 34,
            commentCount: 12,
            tags: ['安全管理', '运营维护']
        },
        {
            key: '3',
            id: 'C003',
            title: '2024年城轨发展报告',
            type: 'news',
            author: '研究院',
            authorType: 'association',
            publishTime: '2024-01-14 16:45:00',
            status: 'published',
            viewCount: 2345,
            likeCount: 156,
            commentCount: 78,
            tags: ['行业报告', '发展趋势']
        }
    ];

    React.useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(mockData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        message.info('正在刷新数据...');
        loadData();
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleBatchOperation = (operation) => {
        if (selectedRowKeys.length === 0) {
            message.warning('请选择要操作的内容');
            return;
        }
        
        Modal.confirm({
            title: `确认${operation}`,
            content: `确定要${operation}选中的 ${selectedRowKeys.length} 项内容吗？`,
            onOk() {
                message.success(`${operation}成功`);
                setSelectedRowKeys([]);
                loadData();
            }
        });
    };

    const getStatusTag = (status) => {
        const statusMap = {
            'published': { color: 'green', text: '已发布' },
            'reviewing': { color: 'orange', text: '审核中' },
            'offline': { color: 'red', text: '已下架' },
            'rejected': { color: 'red', text: '审核未通过' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getTypeTag = (type) => {
        const typeMap = {
            'article': { color: 'blue', text: '图文' },
            'video': { color: 'purple', text: '视频' },
            'news': { color: 'cyan', text: '资讯' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const columns = [
        {
            title: '内容信息',
            dataIndex: 'title',
            key: 'title',
            width: 300,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'title',
                    style: { fontWeight: 'bold', marginBottom: 4 }
                }, text),
                React.createElement('div', { 
                    key: 'info',
                    style: { fontSize: '12px', color: '#666' }
                }, `ID: ${record.id}`)
            ])
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 80,
            render: getTypeTag
        },
        {
            title: '发布者',
            dataIndex: 'author',
            key: 'author',
            width: 120
        },
        {
            title: '发布时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
            width: 150
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag
        },
        {
            title: '数据统计',
            key: 'stats',
            width: 150,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'view' }, `浏览: ${record.viewCount}`),
                React.createElement('div', { key: 'like' }, `点赞: ${record.likeCount}`),
                React.createElement('div', { key: 'comment' }, `评论: ${record.commentCount}`)
            ])
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small'
                }, '查看详情'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small'
                }, '编辑'),
                record.status === 'published' 
                    ? React.createElement(Button, {
                        key: 'offline',
                        type: 'link',
                        size: 'small',
                        danger: true
                    }, '下架')
                    : React.createElement(Button, {
                        key: 'publish',
                        type: 'link',
                        size: 'small'
                    }, '发布'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true
                }, '删除')
            ])
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        // 统计卡片
        React.createElement(Row, { 
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总内容数',
                        value: stats.totalContent,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '今日发布',
                        value: stats.todayPublished,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: stats.pendingReview,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已发布',
                        value: stats.published,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已下架',
                        value: stats.offline,
                        valueStyle: { color: '#ff4d4f' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Button, {
                    type: 'primary',
                    onClick: handleRefresh,
                    style: { width: '100%', height: '100%' }
                }, '手动刷新')
            )
        ]),

        // 筛选条件
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 24 }
        }, [
            React.createElement(Row, { gutter: 16, align: 'middle' }, [
                React.createElement(Col, { span: 4 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, '内容类型：'),
                        React.createElement(Select, {
                            mode: 'multiple',
                            placeholder: '请选择',
                            style: { width: '100%' },
                            value: filters.contentType,
                            onChange: (value) => handleFilterChange('contentType', value)
                        }, [
                            React.createElement(Option, { key: 'article', value: 'article' }, '图文'),
                            React.createElement(Option, { key: 'video', value: 'video' }, '视频'),
                            React.createElement(Option, { key: 'news', value: 'news' }, '资讯')
                        ])
                    ])
                ),
                React.createElement(Col, { span: 4 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, '发布状态：'),
                        React.createElement(Select, {
                            placeholder: '请选择',
                            style: { width: '100%' },
                            value: filters.status,
                            onChange: (value) => handleFilterChange('status', value),
                            allowClear: true
                        }, [
                            React.createElement(Option, { value: 'published' }, '已发布'),
                            React.createElement(Option, { value: 'reviewing' }, '审核中'),
                            React.createElement(Option, { value: 'offline' }, '已下架'),
                            React.createElement(Option, { value: 'rejected' }, '审核未通过')
                        ])
                    ])
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, '发布时间：'),
                        React.createElement(RangePicker, {
                            style: { width: '100%' },
                            value: filters.dateRange,
                            onChange: (value) => handleFilterChange('dateRange', value)
                        })
                    ])
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(Search, {
                        placeholder: '搜索标题、作者',
                        value: filters.keyword,
                        onChange: (e) => handleFilterChange('keyword', e.target.value),
                        onSearch: () => loadData()
                    })
                ),
                React.createElement(Col, { span: 4 },
                    React.createElement(Button, {
                        onClick: () => setFilters({
                            contentType: [],
                            status: '',
                            dateRange: null,
                            keyword: ''
                        })
                    }, '重置筛选')
                )
            ])
        ]),

        // 批量操作
        React.createElement(Card, {
            key: 'batch',
            style: { marginBottom: 24 }
        }, 
            React.createElement(Space, {}, [
                React.createElement('span', {}, `已选择 ${selectedRowKeys.length} 项`),
                React.createElement(Button, {
                    type: 'primary',
                    disabled: selectedRowKeys.length === 0,
                    onClick: () => handleBatchOperation('批量发布')
                }, '批量发布'),
                React.createElement(Button, {
                    disabled: selectedRowKeys.length === 0,
                    onClick: () => handleBatchOperation('批量下架')
                }, '批量下架'),
                React.createElement(Button, {
                    danger: true,
                    disabled: selectedRowKeys.length === 0,
                    onClick: () => handleBatchOperation('批量删除')
                }, '批量删除')
            ])
        ),

        // 内容列表
        React.createElement(Card, { key: 'table' },
            React.createElement(Table, {
                columns,
                dataSource: data,
                loading,
                rowSelection,
                pagination: {
                    total: 1256,
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }
            })
        )
    ]);
};

// 导出组件
window.ContentList = ContentList; 