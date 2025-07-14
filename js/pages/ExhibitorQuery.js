// 展商查询组件
const ExhibitorQuery = () => {
    const { Card, Table, Button, Tag, Space, Input, Select, DatePicker, Row, Col, Form } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { Search } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitors, setExhibitors] = React.useState([]);
    const [searchForm] = Form.useForm();
    
    // 模拟展商数据
    const mockExhibitors = [
        {
            id: 1,
            name: '中车集团',
            boothNumber: 'A001',
            industry: '轨道交通设备',
            products: ['动车组', '地铁列车', '有轨电车'],
            contact: '张总',
            phone: '13800138000',
            email: 'zhang@crrc.com',
            website: 'www.crrc.com',
            status: 'confirmed',
            registrationDate: '2024-01-10'
        },
        {
            id: 2,
            name: '华为技术',
            boothNumber: 'B002',
            industry: '通信技术',
            products: ['5G通信', '信号系统', '智能调度'],
            contact: '李经理',
            phone: '13800138001',
            email: 'li@huawei.com',
            website: 'www.huawei.com',
            status: 'confirmed',
            registrationDate: '2024-01-11'
        },
        {
            id: 3,
            name: '比亚迪股份',
            boothNumber: 'C003',
            industry: '新能源',
            products: ['新能源列车', '储能系统', '充电设备'],
            contact: '王主管',
            phone: '13800138002',
            email: 'wang@byd.com',
            website: 'www.byd.com',
            status: 'pending',
            registrationDate: '2024-01-12'
        }
    ];
    
    React.useEffect(() => {
        loadExhibitors();
    }, []);
    
    const loadExhibitors = () => {
        setLoading(true);
        setTimeout(() => {
            setExhibitors(mockExhibitors);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'confirmed': { color: 'green', text: '已确认' },
            'pending': { color: 'orange', text: '待确认' },
            'cancelled': { color: 'red', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '展商名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'name', style: { fontWeight: 'bold' } }, name),
                React.createElement('div', { key: 'booth', style: { color: '#8c8c8c', fontSize: '12px' } }, `展位号: ${record.boothNumber}`)
            ])
        },
        {
            title: '行业',
            dataIndex: 'industry',
            key: 'industry'
        },
        {
            title: '主要产品',
            dataIndex: 'products',
            key: 'products',
            render: (products) => products.slice(0, 2).map(product => 
                React.createElement(Tag, { key: product, size: 'small' }, product)
            ).concat(products.length > 2 ? [React.createElement(Tag, { key: 'more', size: 'small' }, `+${products.length - 2}`)] : [])
        },
        {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '注册日期',
            dataIndex: 'registrationDate',
            key: 'registrationDate'
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => viewDetail(record)
                }, '查看详情'),
                React.createElement(Button, {
                    key: 'contact',
                    type: 'link',
                    size: 'small',
                    onClick: () => contactExhibitor(record)
                }, '联系展商')
            ])
        }
    ];
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.name} - 详细信息`,
            width: 600,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'booth' }, React.createElement('strong', {}, '展位号：'), record.boothNumber),
                React.createElement('p', { key: 'industry' }, React.createElement('strong', {}, '行业：'), record.industry),
                React.createElement('p', { key: 'products' }, React.createElement('strong', {}, '产品：'), record.products.join('、')),
                React.createElement('p', { key: 'contact' }, React.createElement('strong', {}, '联系人：'), record.contact),
                React.createElement('p', { key: 'phone' }, React.createElement('strong', {}, '电话：'), record.phone),
                React.createElement('p', { key: 'email' }, React.createElement('strong', {}, '邮箱：'), record.email),
                React.createElement('p', { key: 'website' }, React.createElement('strong', {}, '网站：'), record.website),
                React.createElement('p', { key: 'registration' }, React.createElement('strong', {}, '注册日期：'), record.registrationDate)
            ])
        });
    };
    
    const contactExhibitor = (record) => {
        message.info(`联系展商：${record.name}`);
    };
    
    const handleSearch = (values) => {
        console.log('搜索条件:', values);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('搜索完成');
        }, 1000);
    };
    
    const resetSearch = () => {
        searchForm.resetFields();
        loadExhibitors();
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '展商查询'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '查询和筛选展商信息')
        ]),
        
        React.createElement(Card, {
            key: 'search',
            title: '搜索条件',
            style: { marginBottom: 16 }
        }, React.createElement(Form, {
            form: searchForm,
            layout: 'vertical',
            onFinish: handleSearch
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'name', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'name',
                        label: '展商名称'
                    }, React.createElement(Input, {
                        placeholder: '请输入展商名称'
                    }))
                ),
                React.createElement(Col, { key: 'industry', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'industry',
                        label: '行业'
                    }, React.createElement(Select, {
                        placeholder: '请选择行业',
                        allowClear: true
                    }, [
                        React.createElement(Option, { key: 'rail', value: '轨道交通设备' }, '轨道交通设备'),
                        React.createElement(Option, { key: 'tech', value: '通信技术' }, '通信技术'),
                        React.createElement(Option, { key: 'energy', value: '新能源' }, '新能源'),
                        React.createElement(Option, { key: 'signal', value: '信号系统' }, '信号系统')
                    ]))
                ),
                React.createElement(Col, { key: 'booth', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'boothNumber',
                        label: '展位号'
                    }, React.createElement(Input, {
                        placeholder: '请输入展位号'
                    }))
                ),
                React.createElement(Col, { key: 'status', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'status',
                        label: '状态'
                    }, React.createElement(Select, {
                        placeholder: '请选择状态',
                        allowClear: true
                    }, [
                        React.createElement(Option, { key: 'confirmed', value: 'confirmed' }, '已确认'),
                        React.createElement(Option, { key: 'pending', value: 'pending' }, '待确认'),
                        React.createElement(Option, { key: 'cancelled', value: 'cancelled' }, '已取消')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'contact', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'contact',
                        label: '联系人'
                    }, React.createElement(Input, {
                        placeholder: '请输入联系人'
                    }))
                ),
                React.createElement(Col, { key: 'phone', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '联系电话'
                    }, React.createElement(Input, {
                        placeholder: '请输入联系电话'
                    }))
                ),
                React.createElement(Col, { key: 'dateRange', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'dateRange',
                        label: '注册日期'
                    }, React.createElement(RangePicker, {
                        style: { width: '100%' },
                        placeholder: ['开始日期', '结束日期']
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'actions',
                style: { marginBottom: 0, marginTop: 16 }
            }, React.createElement(Space, {}, [
                React.createElement(Button, {
                    key: 'search',
                    type: 'primary',
                    htmlType: 'submit',
                    loading: loading
                }, '搜索'),
                React.createElement(Button, {
                    key: 'reset',
                    onClick: resetSearch
                }, '重置'),
                React.createElement(Button, {
                    key: 'export',
                    onClick: () => message.info('导出功能')
                }, '导出结果')
            ]))
        ])),
        
        React.createElement(Card, {
            key: 'table',
            title: React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('span', { key: 'title' }, '查询结果'),
                React.createElement('span', { key: 'count', style: { color: '#8c8c8c' } }, `共找到 ${exhibitors.length} 家展商`)
            ])
        }, React.createElement(Table, {
            columns: columns,
            dataSource: exhibitors,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        }))
    ]);
};

window.ExhibitorQuery = ExhibitorQuery; 