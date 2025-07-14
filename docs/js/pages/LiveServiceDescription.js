// 直播服务描述组件
const LiveServiceDescription = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Switch } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [services, setServices] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingService, setEditingService] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟直播服务数据
    const mockServices = [
        { 
            id: 1, 
            name: '高清视频直播', 
            type: 'video', 
            status: 'active',
            description: '提供1080P高清视频直播服务，支持多平台同步推流',
            features: ['高清画质', '低延迟', '多平台支持', '弹幕互动'],
            pricing: '基础版免费，高级版199元/月',
            bandwidth: '2-5Mbps',
            maxViewers: 10000,
            supportPlatforms: ['抖音', '快手', '视频号', 'B站'],
            createTime: '2024-01-10 10:00:00'
        },
        { 
            id: 2, 
            name: '音频直播服务', 
            type: 'audio', 
            status: 'active',
            description: '专业音频直播服务，适合音乐、教育、访谈等场景',
            features: ['高音质', '降噪处理', '多人连麦', '录制回放'],
            pricing: '99元/月',
            bandwidth: '128-320Kbps',
            maxViewers: 5000,
            supportPlatforms: ['喜马拉雅', '荔枝FM', '蜻蜓FM'],
            createTime: '2024-01-11 11:00:00'
        },
        { 
            id: 3, 
            name: '互动直播服务', 
            type: 'interactive', 
            status: 'pending',
            description: '支持实时互动的直播服务，包含礼物、打赏、抽奖等功能',
            features: ['实时互动', '礼物打赏', '抽奖活动', '用户管理'],
            pricing: '299元/月',
            bandwidth: '3-8Mbps',
            maxViewers: 20000,
            supportPlatforms: ['抖音', '快手', '小红书'],
            createTime: '2024-01-12 12:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadServices();
    }, []);
    
    const loadServices = () => {
        setLoading(true);
        setTimeout(() => {
            setServices(mockServices);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '已启用' },
            'pending': { color: 'orange', text: '待审核' },
            'inactive': { color: 'default', text: '已停用' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'video': { color: 'blue', text: '视频直播' },
            'audio': { color: 'purple', text: '音频直播' },
            'interactive': { color: 'cyan', text: '互动直播' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '服务名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '最大观看人数',
            dataIndex: 'maxViewers',
            key: 'maxViewers',
            render: (viewers) => `${viewers.toLocaleString()}人`
        },
        {
            title: '带宽要求',
            dataIndex: 'bandwidth',
            key: 'bandwidth'
        },
        {
            title: '支持平台',
            dataIndex: 'supportPlatforms',
            key: 'supportPlatforms',
            render: (platforms) => platforms.slice(0, 2).map(platform => 
                React.createElement(Tag, { key: platform, size: 'small' }, platform)
            ).concat(platforms.length > 2 ? [React.createElement(Tag, { key: 'more', size: 'small' }, `+${platforms.length - 2}`)] : [])
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
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
                }, record.status === 'active' ? '停用' : '启用')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingService(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingService(record);
        form.setFieldsValue({
            ...record,
            supportPlatforms: record.supportPlatforms
        });
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.name} - 详细信息`,
            width: 600,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'desc' }, React.createElement('strong', {}, '服务描述：'), record.description),
                React.createElement('p', { key: 'features' }, React.createElement('strong', {}, '主要功能：'), record.features.join('、')),
                React.createElement('p', { key: 'pricing' }, React.createElement('strong', {}, '价格：'), record.pricing),
                React.createElement('p', { key: 'bandwidth' }, React.createElement('strong', {}, '带宽要求：'), record.bandwidth),
                React.createElement('p', { key: 'viewers' }, React.createElement('strong', {}, '最大观看人数：'), `${record.maxViewers.toLocaleString()}人`),
                React.createElement('p', { key: 'platforms' }, React.createElement('strong', {}, '支持平台：'), record.supportPlatforms.join('、'))
            ])
        });
    };
    
    const toggleStatus = (record) => {
        const newStatus = record.status === 'active' ? 'inactive' : 'active';
        const action = newStatus === 'active' ? '启用' : '停用';
        
        Modal.confirm({
            title: `${action}服务`,
            content: `确定要${action} ${record.name} 吗？`,
            onOk: () => {
                message.success(`${action}成功`);
                loadServices();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存直播服务:', values);
        message.success(editingService ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadServices();
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '直播服务描述'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理直播服务的详细描述和配置信息')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总服务数',
                        value: services.length
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已启用',
                        value: services.filter(s => s.status === 'active').length,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'viewers', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总观看容量',
                        value: services.reduce((sum, s) => sum + s.maxViewers, 0),
                        suffix: '人',
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'platforms', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '支持平台',
                        value: [...new Set(services.flatMap(s => s.supportPlatforms))].length,
                        suffix: '个',
                        valueStyle: { color: '#722ed1' }
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
            }, '新建服务'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadServices
            }, '刷新'),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'video', value: 'video' }, '视频直播'),
                React.createElement(Option, { key: 'audio', value: 'audio' }, '音频直播'),
                React.createElement(Option, { key: 'interactive', value: 'interactive' }, '互动直播')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: services,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingService ? '编辑直播服务' : '新建直播服务',
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
                React.createElement(Col, { key: 'name', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'name',
                        label: '服务名称',
                        rules: [{ required: true, message: '请输入服务名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入服务名称'
                    }))
                ),
                React.createElement(Col, { key: 'type', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '服务类型',
                        rules: [{ required: true, message: '请选择服务类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择服务类型'
                    }, [
                        React.createElement(Option, { key: 'video', value: 'video' }, '视频直播'),
                        React.createElement(Option, { key: 'audio', value: 'audio' }, '音频直播'),
                        React.createElement(Option, { key: 'interactive', value: 'interactive' }, '互动直播')
                    ]))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '服务描述',
                rules: [{ required: true, message: '请输入服务描述' }]
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入服务描述'
            })),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'maxViewers', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'maxViewers',
                        label: '最大观看人数',
                        rules: [{ required: true, message: '请输入最大观看人数' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入最大观看人数'
                    }))
                ),
                React.createElement(Col, { key: 'bandwidth', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'bandwidth',
                        label: '带宽要求',
                        rules: [{ required: true, message: '请输入带宽要求' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入带宽要求'
                    }))
                ),
                React.createElement(Col, { key: 'pricing', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'pricing',
                        label: '价格',
                        rules: [{ required: true, message: '请输入价格' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入价格'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'supportPlatforms',
                name: 'supportPlatforms',
                label: '支持平台',
                rules: [{ required: true, message: '请选择支持平台' }]
            }, React.createElement(Select, {
                mode: 'multiple',
                placeholder: '请选择支持平台'
            }, [
                React.createElement(Option, { key: 'douyin', value: '抖音' }, '抖音'),
                React.createElement(Option, { key: 'kuaishou', value: '快手' }, '快手'),
                React.createElement(Option, { key: 'wechat', value: '视频号' }, '视频号'),
                React.createElement(Option, { key: 'bilibili', value: 'B站' }, 'B站'),
                React.createElement(Option, { key: 'xiaohongshu', value: '小红书' }, '小红书'),
                React.createElement(Option, { key: 'ximalaya', value: '喜马拉雅' }, '喜马拉雅'),
                React.createElement(Option, { key: 'lizhi', value: '荔枝FM' }, '荔枝FM'),
                React.createElement(Option, { key: 'qingting', value: '蜻蜓FM' }, '蜻蜓FM')
            ])),
            
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

window.LiveServiceDescription = LiveServiceDescription; 