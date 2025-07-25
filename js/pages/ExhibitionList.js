console.log('ExhibitionList.js 加载中...');

// 展会列表页面 - v3版本
const ExhibitionList = () => {
    const { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, DatePicker, message, Row, Col, Statistic, Tabs, Tooltip, Popconfirm, Descriptions } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitionList, setExhibitionList] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    
    // v3新增：查询功能状态
    const [searchParams, setSearchParams] = React.useState({
        keyword: '',
        status: 'all',
        dateRange: null
    });

    // v3新增：展会详情Modal状态
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [currentExhibition, setCurrentExhibition] = React.useState(null);
    const [detailActiveTab, setDetailActiveTab] = React.useState('basic');

    // 表单实例
    const [form] = Form.useForm();

    // v3新增：统计数据
    const [statistics, setStatistics] = React.useState({
        totalExhibitions: 0,
        activeExhibitions: 0,
        upcomingExhibitions: 0,
        totalExhibitors: 0
    });

    // 模拟展会数据
    React.useEffect(() => {
        loadExhibitionList();
        loadStatistics();
    }, [pagination.current, pagination.pageSize, searchParams]);

    const loadExhibitionList = () => {
        setLoading(true);
        
        // 模拟展会数据 - v3版本
        const mockData = [
            {
                id: 1,
                name: '2024中国城市轨道交通展览会',
                address: '北京国际展览中心',
                startDate: '2024-06-15',
                endDate: '2024-06-18',
                venue: '北京国际展览中心',
                status: 'active',
                createTime: '2024-01-15 10:30:00',
                creator: '管理员',
                exhibitorCount: 150,
                venueCount: 3,
                areaCount: 12,
                boothCount: 300
            },
            {
                id: 2,
                name: '2024智慧交通技术展',
                address: '上海新国际博览中心',
                startDate: '2024-08-20',
                endDate: '2024-08-23',
                venue: '上海新国际博览中心',
                status: 'upcoming',
                createTime: '2024-02-20 14:15:00',
                creator: '运营专员',
                exhibitorCount: 120,
                venueCount: 2,
                areaCount: 8,
                boothCount: 200
            },
            {
                id: 3,
                name: '2023轨道交通设备展',
                address: '广州保利世贸博览馆',
                startDate: '2023-11-10',
                endDate: '2023-11-13',
                venue: '广州保利世贸博览馆',
                status: 'finished',
                createTime: '2023-08-10 09:20:00',
                creator: '展会专员',
                exhibitorCount: 180,
                venueCount: 4,
                areaCount: 16,
                boothCount: 400
            }
        ];

        // 根据搜索条件过滤数据
        const filteredData = mockData.filter(item => {
            const matchKeyword = !searchParams.keyword || 
                item.name.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
                item.address.toLowerCase().includes(searchParams.keyword.toLowerCase());
            
            const matchStatus = searchParams.status === 'all' || item.status === searchParams.status;
            
            let matchDate = true;
            if (searchParams.dateRange && searchParams.dateRange.length === 2) {
                const startDate = searchParams.dateRange[0].format('YYYY-MM-DD');
                const endDate = searchParams.dateRange[1].format('YYYY-MM-DD');
                matchDate = item.startDate >= startDate && item.endDate <= endDate;
            }
            
            return matchKeyword && matchStatus && matchDate;
        });

        setTimeout(() => {
            setExhibitionList(filteredData);
            setPagination(prev => ({ ...prev, total: filteredData.length }));
            setLoading(false);
        }, 1000);
    };

    const loadStatistics = () => {
        // 模拟统计数据
        setTimeout(() => {
            setStatistics({
                totalExhibitions: 15,
                activeExhibitions: 3,
                upcomingExhibitions: 5,
                totalExhibitors: 1250
            });
        }, 500);
    };

    // v3新增：查询功能
    const handleSearch = (value) => {
        setSearchParams(prev => ({ ...prev, keyword: value }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleStatusChange = (value) => {
        setSearchParams(prev => ({ ...prev, status: value }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleDateRangeChange = (dates) => {
        setSearchParams(prev => ({ ...prev, dateRange: dates }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    // v3新增：新建展会功能
    const handleCreateExhibition = () => {
        Modal.confirm({
            title: '新建展会',
            width: 600,
            content: React.createElement('div', { style: { marginTop: 20 } },
                React.createElement(Form, {
                    form: form,
                    layout: 'vertical'
                },
                    React.createElement(Form.Item, {
                        name: 'name',
                        label: '展会名称',
                        rules: [{ required: true, message: '请输入展会名称' }]
                    },
                        React.createElement(Input, { placeholder: '请输入展会名称' })
                    ),
                    React.createElement(Form.Item, {
                        name: 'address',
                        label: '展会地址',
                        rules: [{ required: true, message: '请输入展会地址' }]
                    },
                        React.createElement(Input, { placeholder: '请输入展会地址' })
                    ),
                    React.createElement(Form.Item, {
                        name: 'time',
                        label: '办展时间',
                        rules: [{ required: true, message: '请选择办展时间' }]
                    },
                        React.createElement(RangePicker, { style: { width: '100%' } })
                    ),
                    React.createElement(Form.Item, {
                        name: 'venue',
                        label: '展会场馆',
                        rules: [{ required: true, message: '请输入场馆名称' }]
                    },
                        React.createElement(Input, { placeholder: '请输入场馆名称' })
                    )
                )
            ),
            onOk: () => {
                return form.validateFields().then(values => {
                    console.log('新建展会:', values);
                    message.success('展会创建成功！创建完成后，请点击编辑按钮进入详情页面维护展商与展位关系。');
                    loadExhibitionList();
                });
            }
        });
    };

    // v3新增：展会详情功能（展商与展位关系维护）
    const handleViewDetail = (record) => {
        setCurrentExhibition(record);
        setDetailModalVisible(true);
        setDetailActiveTab('basic');
        
        // 加载展会详细信息
        loadExhibitionDetail(record.id);
    };

    const loadExhibitionDetail = (exhibitionId) => {
        // 模拟加载详细信息
        console.log('加载展会详情:', exhibitionId);
    };

    // 编辑展会
    const handleEditExhibition = (record) => {
        handleViewDetail(record);
    };

    // 删除展会
    const handleDeleteExhibition = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除展会"${record.name}"吗？`,
            onOk: () => {
                console.log('删除展会:', record.id);
                message.success('删除成功！');
                loadExhibitionList();
            }
        });
    };

    // 表格列定义 - v3版本
    const columns = [
        {
            title: '展会名称',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ellipsis: true,
            render: (text, record) => (
                React.createElement(Tooltip, { title: text },
                    React.createElement(Button, { 
                        type: 'link', 
                        onClick: () => handleViewDetail(record) 
                    }, text)
                )
            )
        },
        {
            title: '展会地址',
            dataIndex: 'address',
            key: 'address',
            width: 180,
            ellipsis: true
        },
        {
            title: '办展时间',
            key: 'time',
            width: 200,
            render: (text, record) => (
                React.createElement('div', null,
                    React.createElement('div', null, record.startDate),
                    React.createElement('div', { style: { color: '#666', fontSize: 12 } }, `至 ${record.endDate}`)
                )
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => {
                const statusMap = {
                    active: { color: 'green', text: '进行中' },
                    upcoming: { color: 'blue', text: '即将开始' },
                    finished: { color: 'gray', text: '已结束' },
                    cancelled: { color: 'red', text: '已取消' }
                };
                const config = statusMap[status] || { color: 'gray', text: '未知' };
                return React.createElement(Tag, { color: config.color }, config.text);
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150,
            render: (time) => (
                React.createElement('div', { style: { fontSize: 12 } }, time)
            )
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                React.createElement(Space, { size: 'small', wrap: true },
                    React.createElement(Button, { 
                        size: 'small', 
                        onClick: () => handleEditExhibition(record) 
                    }, '编辑'),
                    React.createElement(Popconfirm, {
                        title: '确定删除此展会？',
                        onConfirm: () => handleDeleteExhibition(record)
                    },
                        React.createElement(Button, { size: 'small', danger: true }, '删除')
                    )
                )
            )
        }
    ];

    return React.createElement('div', { style: { padding: 24 } },
        // v3新增：统计卡片
        React.createElement(Row, { gutter: 16, style: { marginBottom: 24 } },
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '总展会数',
                        value: statistics.totalExhibitions,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '进行中展会',
                        value: statistics.activeExhibitions,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '即将开始',
                        value: statistics.upcomingExhibitions,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 6 },
                React.createElement(Card, null,
                    React.createElement(Statistic, {
                        title: '总展商数',
                        value: statistics.totalExhibitors,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            )
        ),

        React.createElement(Card, { title: '展会管理', style: { marginBottom: 24 } },
            // v3新增：查询功能
            React.createElement(Row, { gutter: 16, style: { marginBottom: 16 } },
                React.createElement(Col, { span: 8 },
                    React.createElement(Search, {
                        placeholder: '搜索展会名称、地址',
                        allowClear: true,
                        onSearch: handleSearch
                    })
                ),
                React.createElement(Col, { span: 4 },
                    React.createElement(Select, {
                        value: searchParams.status,
                        onChange: handleStatusChange,
                        style: { width: '100%' }
                    },
                        React.createElement(Option, { value: 'all' }, '全部状态'),
                        React.createElement(Option, { value: 'active' }, '进行中'),
                        React.createElement(Option, { value: 'upcoming' }, '即将开始'),
                        React.createElement(Option, { value: 'finished' }, '已结束'),
                        React.createElement(Option, { value: 'cancelled' }, '已取消')
                    )
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(RangePicker, {
                        placeholder: ['开始时间', '结束时间'],
                        onChange: handleDateRangeChange,
                        style: { width: '100%' }
                    })
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(Space, null,
                        React.createElement(Button, { 
                            type: 'primary', 
                            onClick: handleCreateExhibition 
                        }, '创建展会')
                    )
                )
            ),

            // 展会列表表格
            React.createElement(Table, {
                columns: columns,
                dataSource: exhibitionList,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    ...pagination,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`,
                    onChange: (page, pageSize) => {
                        setPagination(prev => ({ 
                            ...prev, 
                            current: page, 
                            pageSize: pageSize 
                        }));
                    }
                },
                scroll: { x: 1200 }
            })
        ),

        // v3新增：展会详情Modal（展商与展位关系维护）
        React.createElement(Modal, {
            title: `展会详情 - ${currentExhibition?.name || ''}`,
            visible: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            width: 1000,
            footer: [
                React.createElement(Button, { 
                    key: 'close', 
                    onClick: () => setDetailModalVisible(false) 
                }, '关闭'),
                React.createElement(Button, { 
                    key: 'save', 
                    type: 'primary' 
                }, '保存修改')
            ]
        },
            React.createElement(Tabs, { 
                activeKey: detailActiveTab, 
                onChange: setDetailActiveTab 
            },
                React.createElement(TabPane, { tab: '基本信息', key: 'basic' },
                    React.createElement(Descriptions, { column: 2, bordered: true },
                        React.createElement(Descriptions.Item, { label: '展会名称' }, currentExhibition?.name),
                        React.createElement(Descriptions.Item, { label: '展会地址' }, currentExhibition?.address),
                        React.createElement(Descriptions.Item, { label: '开始时间' }, currentExhibition?.startDate),
                        React.createElement(Descriptions.Item, { label: '结束时间' }, currentExhibition?.endDate),
                        React.createElement(Descriptions.Item, { label: '场馆' }, currentExhibition?.venue),
                        React.createElement(Descriptions.Item, { label: '状态' },
                            React.createElement(Tag, {
                                color: currentExhibition?.status === 'active' ? 'green' :
                                       currentExhibition?.status === 'upcoming' ? 'blue' :
                                       currentExhibition?.status === 'finished' ? 'gray' : 'red'
                            },
                                currentExhibition?.status === 'active' ? '进行中' :
                                currentExhibition?.status === 'upcoming' ? '即将开始' :
                                currentExhibition?.status === 'finished' ? '已结束' : '已取消'
                            )
                        ),
                        React.createElement(Descriptions.Item, { label: '展商数量' }, currentExhibition?.exhibitorCount),
                        React.createElement(Descriptions.Item, { label: '展位数量' }, currentExhibition?.boothCount)
                    )
                ),
                React.createElement(TabPane, { tab: '展商与展位关系', key: 'exhibitor' },
                    React.createElement('div', { style: { marginBottom: 16 } },
                        React.createElement(Button, { type: 'primary' }, '分配展位'),
                        React.createElement('span', { 
                            style: { marginLeft: 16, color: '#666' } 
                        }, '注意：参与报名的展商将在此处自动出现，等待运营人员进行分配展位')
                    ),
                    React.createElement('div', { 
                        style: { padding: 20, background: '#f5f5f5', textAlign: 'center' } 
                    },
                        '展商与展位关系维护功能',
                        React.createElement('div', { 
                            style: { marginTop: 10, fontSize: 14, color: '#666' } 
                        }, '此处将展示已报名的展商列表，运营人员可为展商分配具体展位')
                    )
                ),
                React.createElement(TabPane, { tab: '审核管理', key: 'audit' },
                    React.createElement('div', { 
                        style: { padding: 20, background: '#f5f5f5', textAlign: 'center' } 
                    },
                        '展商信息审核功能',
                        React.createElement('div', { 
                            style: { marginTop: 10, fontSize: 14, color: '#666' } 
                        }, '此处可对展商提交的信息进行审核管理')
                    )
                )
            )
        )
    );
};

// 导出组件
window.ExhibitionList = ExhibitionList; 