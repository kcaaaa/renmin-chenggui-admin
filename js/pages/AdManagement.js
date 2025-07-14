// 广告管理组件
const AdManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, Upload, Image } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    const [ads, setAds] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingAd, setEditingAd] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟广告数据
    const mockAds = [
        { 
            id: 1, 
            title: '城轨设备推广', 
            type: 'banner', 
            status: 'active',
            position: 'homepage_top',
            advertiser: '中车集团',
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            budget: 100000,
            spent: 45000,
            clicks: 15600,
            impressions: 180000,
            ctr: 8.67,
            image: '/images/ad-banner-1.jpg',
            link: 'https://www.crrc.com/products',
            description: '城轨设备解决方案，助力城市交通发展',
            createTime: '2024-01-01 10:00:00'
        },
        { 
            id: 2, 
            title: '智能信号系统', 
            type: 'popup', 
            status: 'active',
            position: 'content_middle',
            advertiser: '华为技术',
            startDate: '2024-01-15',
            endDate: '2024-04-15',
            budget: 80000,
            spent: 32000,
            clicks: 8900,
            impressions: 95000,
            ctr: 9.37,
            image: '/images/ad-popup-1.jpg',
            link: 'https://www.huawei.com/rail',
            description: '5G智能信号控制系统，提升运营效率',
            createTime: '2024-01-15 14:00:00'
        },
        { 
            id: 3, 
            title: '新能源列车', 
            type: 'video', 
            status: 'paused',
            position: 'sidebar_right',
            advertiser: '比亚迪',
            startDate: '2024-02-01',
            endDate: '2024-05-01',
            budget: 120000,
            spent: 28000,
            clicks: 5200,
            impressions: 68000,
            ctr: 7.65,
            image: '/images/ad-video-1.jpg',
            link: 'https://www.byd.com/rail',
            description: '环保新能源列车，绿色出行新选择',
            createTime: '2024-02-01 09:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadAds();
    }, []);
    
    const loadAds = () => {
        setLoading(true);
        setTimeout(() => {
            setAds(mockAds);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '投放中' },
            'paused': { color: 'orange', text: '已暂停' },
            'expired': { color: 'default', text: '已过期' },
            'pending': { color: 'blue', text: '待审核' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'banner': { color: 'blue', text: '横幅广告' },
            'popup': { color: 'purple', text: '弹窗广告' },
            'video': { color: 'red', text: '视频广告' },
            'text': { color: 'green', text: '文字广告' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getPositionText = (position) => {
        const positionMap = {
            'homepage_top': '首页顶部',
            'content_middle': '内容中部',
            'sidebar_right': '右侧边栏',
            'footer': '页脚'
        };
        return positionMap[position] || position;
    };
    
    const columns = [
        {
            title: '广告标题',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement('img', {
                    key: 'image',
                    src: record.image,
                    alt: title,
                    style: { width: 40, height: 40, borderRadius: '4px', objectFit: 'cover' },
                    onError: (e) => { e.target.style.display = 'none'; }
                }),
                React.createElement('span', { key: 'title' }, title)
            ])
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '位置',
            dataIndex: 'position',
            key: 'position',
            render: getPositionText
        },
        {
            title: '广告主',
            dataIndex: 'advertiser',
            key: 'advertiser'
        },
        {
            title: '预算/花费',
            key: 'budget',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'budget' }, `预算: ¥${record.budget.toLocaleString()}`),
                React.createElement('div', { key: 'spent', style: { color: '#1890ff' } }, `花费: ¥${record.spent.toLocaleString()}`)
            ])
        },
        {
            title: '点击率',
            key: 'performance',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'ctr' }, `CTR: ${record.ctr}%`),
                React.createElement('div', { key: 'clicks', style: { color: '#52c41a' } }, `点击: ${record.clicks.toLocaleString()}`)
            ])
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '投放期间',
            key: 'period',
            render: (_, record) => `${record.startDate} ~ ${record.endDate}`
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => viewDetail(record)
                }, '查看'),
                React.createElement(Button, {
                    key: 'toggle',
                    type: 'link',
                    size: 'small',
                    onClick: () => toggleStatus(record)
                }, record.status === 'active' ? '暂停' : '启用')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingAd(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingAd(record);
        form.setFieldsValue({
            ...record,
            period: [record.startDate, record.endDate]
        });
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.title} - 详细信息`,
            width: 600,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'advertiser' }, React.createElement('strong', {}, '广告主：'), record.advertiser),
                React.createElement('p', { key: 'description' }, React.createElement('strong', {}, '描述：'), record.description),
                React.createElement('p', { key: 'link' }, React.createElement('strong', {}, '链接：'), record.link),
                React.createElement('p', { key: 'budget' }, React.createElement('strong', {}, '预算：'), `¥${record.budget.toLocaleString()}`),
                React.createElement('p', { key: 'spent' }, React.createElement('strong', {}, '已花费：'), `¥${record.spent.toLocaleString()}`),
                React.createElement('p', { key: 'impressions' }, React.createElement('strong', {}, '展示次数：'), record.impressions.toLocaleString()),
                React.createElement('p', { key: 'clicks' }, React.createElement('strong', {}, '点击次数：'), record.clicks.toLocaleString()),
                React.createElement('p', { key: 'ctr' }, React.createElement('strong', {}, '点击率：'), `${record.ctr}%`)
            ])
        });
    };
    
    const toggleStatus = (record) => {
        const newStatus = record.status === 'active' ? 'paused' : 'active';
        const action = newStatus === 'active' ? '启用' : '暂停';
        
        Modal.confirm({
            title: `${action}广告`,
            content: `确定要${action} ${record.title} 吗？`,
            onOk: () => {
                message.success(`${action}成功`);
                loadAds();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存广告:', values);
        message.success(editingAd ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadAds();
    };
    
    const totalBudget = ads.reduce((sum, ad) => sum + ad.budget, 0);
    const totalSpent = ads.reduce((sum, ad) => sum + ad.spent, 0);
    const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
    const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
    const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '广告管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理广告投放、监控广告效果')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总广告数',
                        value: ads.length
                    })
                )
            ),
            React.createElement(Col, { key: 'budget', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总预算',
                        value: totalBudget,
                        prefix: '¥',
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'spent', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总花费',
                        value: totalSpent,
                        prefix: '¥',
                        valueStyle: { color: '#f5222d' }
                    })
                )
            ),
            React.createElement(Col, { key: 'ctr', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均点击率',
                        value: avgCtr,
                        suffix: '%',
                        valueStyle: { color: '#52c41a' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'actions',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(Button, {
                key: 'add',
                type: 'primary',
                onClick: handleAdd
            }, '新建广告'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadAds
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '投放中'),
                React.createElement(Option, { key: 'paused', value: 'paused' }, '已暂停'),
                React.createElement(Option, { key: 'expired', value: 'expired' }, '已过期'),
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核')
            ]),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'banner', value: 'banner' }, '横幅广告'),
                React.createElement(Option, { key: 'popup', value: 'popup' }, '弹窗广告'),
                React.createElement(Option, { key: 'video', value: 'video' }, '视频广告'),
                React.createElement(Option, { key: 'text', value: 'text' }, '文字广告')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: ads,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingAd ? '编辑广告' : '新建广告',
            visible: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            footer: null,
            width: 800
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleSubmit
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'title', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'title',
                        label: '广告标题',
                        rules: [{ required: true, message: '请输入广告标题' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入广告标题'
                    }))
                ),
                React.createElement(Col, { key: 'advertiser', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'advertiser',
                        label: '广告主',
                        rules: [{ required: true, message: '请输入广告主' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入广告主'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'type', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '广告类型',
                        rules: [{ required: true, message: '请选择广告类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择广告类型'
                    }, [
                        React.createElement(Option, { key: 'banner', value: 'banner' }, '横幅广告'),
                        React.createElement(Option, { key: 'popup', value: 'popup' }, '弹窗广告'),
                        React.createElement(Option, { key: 'video', value: 'video' }, '视频广告'),
                        React.createElement(Option, { key: 'text', value: 'text' }, '文字广告')
                    ]))
                ),
                React.createElement(Col, { key: 'position', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'position',
                        label: '广告位置',
                        rules: [{ required: true, message: '请选择广告位置' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择广告位置'
                    }, [
                        React.createElement(Option, { key: 'homepage_top', value: 'homepage_top' }, '首页顶部'),
                        React.createElement(Option, { key: 'content_middle', value: 'content_middle' }, '内容中部'),
                        React.createElement(Option, { key: 'sidebar_right', value: 'sidebar_right' }, '右侧边栏'),
                        React.createElement(Option, { key: 'footer', value: 'footer' }, '页脚')
                    ]))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '广告描述',
                rules: [{ required: true, message: '请输入广告描述' }]
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入广告描述'
            })),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'link', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'link',
                        label: '链接地址',
                        rules: [{ required: true, message: '请输入链接地址' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入链接地址'
                    }))
                ),
                React.createElement(Col, { key: 'budget', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'budget',
                        label: '预算（元）',
                        rules: [{ required: true, message: '请输入预算' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入预算'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'period',
                name: 'period',
                label: '投放期间',
                rules: [{ required: true, message: '请选择投放期间' }]
            }, React.createElement(RangePicker, {
                style: { width: '100%' },
                placeholder: ['开始日期', '结束日期']
            })),
            
            React.createElement(Form.Item, {
                key: 'submit',
                style: { marginBottom: 0, marginTop: 24 }
            }, React.createElement(Space, {
                style: { width: '100%', justifyContent: 'flex-end' }
            }, [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'confirm',
                    type: 'primary',
                    htmlType: 'submit'
                }, '确定')
            ]))
        ]))
    ]);
};

window.AdManagement = AdManagement; 