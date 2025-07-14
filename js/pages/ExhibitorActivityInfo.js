// 展商活动信息组件
const ExhibitorActivityInfo = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, Upload, TimePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    const [activities, setActivities] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingActivity, setEditingActivity] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟展商活动数据
    const mockActivities = [
        {
            id: 1,
            title: '新品发布会',
            type: 'product_launch',
            status: 'approved',
            startTime: '2024-06-01 10:00',
            endTime: '2024-06-01 12:00',
            venue: '会议室A',
            capacity: 100,
            registrations: 85,
            description: '发布最新的智能轨道交通产品',
            speakers: ['张总工程师', '李产品经理'],
            agenda: [
                { time: '10:00-10:30', content: '开场致辞' },
                { time: '10:30-11:30', content: '产品演示' },
                { time: '11:30-12:00', content: '问答环节' }
            ],
            materials: ['产品手册', '技术白皮书'],
            contact: '王经理',
            phone: '13800138001',
            submitTime: '2024-01-15 14:30'
        },
        {
            id: 2,
            title: '技术交流会',
            type: 'technical_seminar',
            status: 'pending',
            startTime: '2024-06-02 14:00',
            endTime: '2024-06-02 16:00',
            venue: '技术展示区',
            capacity: 50,
            registrations: 0,
            description: '分享轨道交通技术发展趋势',
            speakers: ['赵技术总监'],
            agenda: [
                { time: '14:00-14:15', content: '开场介绍' },
                { time: '14:15-15:30', content: '技术分享' },
                { time: '15:30-16:00', content: '互动讨论' }
            ],
            materials: ['技术资料'],
            contact: '刘主管',
            phone: '13800138002',
            submitTime: '2024-01-16 09:15'
        },
        {
            id: 3,
            title: '商务洽谈会',
            type: 'business_meeting',
            status: 'rejected',
            startTime: '2024-06-03 09:00',
            endTime: '2024-06-03 11:00',
            venue: '商务洽谈室',
            capacity: 30,
            registrations: 0,
            description: '与合作伙伴进行商务洽谈',
            speakers: ['陈总经理'],
            agenda: [
                { time: '09:00-09:30', content: '项目介绍' },
                { time: '09:30-10:30', content: '合作洽谈' },
                { time: '10:30-11:00', content: '签约仪式' }
            ],
            materials: ['合作协议'],
            contact: '孙助理',
            phone: '13800138003',
            submitTime: '2024-01-17 16:45',
            rejectReason: '时间冲突，请重新安排'
        }
    ];
    
    React.useEffect(() => {
        loadActivities();
    }, []);
    
    const loadActivities = () => {
        setLoading(true);
        setTimeout(() => {
            setActivities(mockActivities);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'approved': { color: 'green', text: '已通过' },
            'pending': { color: 'orange', text: '待审核' },
            'rejected': { color: 'red', text: '已拒绝' },
            'cancelled': { color: 'default', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'product_launch': { color: 'blue', text: '产品发布' },
            'technical_seminar': { color: 'green', text: '技术交流' },
            'business_meeting': { color: 'purple', text: '商务洽谈' },
            'workshop': { color: 'orange', text: '工作坊' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '活动信息',
            key: 'activityInfo',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'title', style: { fontWeight: 'bold' } }, record.title),
                React.createElement('div', { key: 'type', style: { marginTop: '4px' } }, getTypeTag(record.type)),
                React.createElement('div', { key: 'venue', style: { color: '#8c8c8c', fontSize: '12px', marginTop: '4px' } }, `地点：${record.venue}`)
            ])
        },
        {
            title: '时间',
            key: 'time',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'start' }, record.startTime),
                React.createElement('div', { key: 'end', style: { color: '#8c8c8c', fontSize: '12px' } }, `至 ${record.endTime}`)
            ])
        },
        {
            title: '参与情况',
            key: 'participation',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'capacity' }, `容量：${record.capacity}人`),
                React.createElement('div', { key: 'registrations', style: { color: '#1890ff' } }, `报名：${record.registrations}人`)
            ])
        },
        {
            title: '联系人',
            key: 'contact',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'name' }, record.contact),
                React.createElement('div', { key: 'phone', style: { color: '#8c8c8c', fontSize: '12px' } }, record.phone)
            ])
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
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
                }, '查看'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                record.status === 'pending' && React.createElement(Button, {
                    key: 'cancel',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => cancelActivity(record)
                }, '取消')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingActivity(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingActivity(record);
        form.setFieldsValue({
            ...record,
            timeRange: [moment(record.startTime), moment(record.endTime)],
            speakers: record.speakers,
            materials: record.materials
        });
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.title} - 详细信息`,
            width: 800,
            content: React.createElement('div', {}, [
                React.createElement('div', { key: 'basic', style: { marginBottom: '16px' } }, [
                    React.createElement('h4', { key: 'basic-title' }, '基本信息'),
                    React.createElement('p', { key: 'type' }, React.createElement('strong', {}, '活动类型：'), getTypeTag(record.type)),
                    React.createElement('p', { key: 'time' }, React.createElement('strong', {}, '活动时间：'), `${record.startTime} - ${record.endTime}`),
                    React.createElement('p', { key: 'venue' }, React.createElement('strong', {}, '活动地点：'), record.venue),
                    React.createElement('p', { key: 'capacity' }, React.createElement('strong', {}, '容纳人数：'), `${record.capacity}人`),
                    React.createElement('p', { key: 'registrations' }, React.createElement('strong', {}, '报名人数：'), `${record.registrations}人`)
                ]),
                React.createElement('div', { key: 'description', style: { marginBottom: '16px' } }, [
                    React.createElement('h4', { key: 'desc-title' }, '活动描述'),
                    React.createElement('p', { key: 'desc-content' }, record.description)
                ]),
                React.createElement('div', { key: 'speakers', style: { marginBottom: '16px' } }, [
                    React.createElement('h4', { key: 'speakers-title' }, '演讲嘉宾'),
                    React.createElement('p', { key: 'speakers-content' }, record.speakers.join('、'))
                ]),
                React.createElement('div', { key: 'agenda', style: { marginBottom: '16px' } }, [
                    React.createElement('h4', { key: 'agenda-title' }, '活动议程'),
                    ...record.agenda.map((item, index) => 
                        React.createElement('p', { key: `agenda-${index}` }, `${item.time}: ${item.content}`)
                    )
                ]),
                React.createElement('div', { key: 'materials', style: { marginBottom: '16px' } }, [
                    React.createElement('h4', { key: 'materials-title' }, '相关资料'),
                    React.createElement('p', { key: 'materials-content' }, record.materials.join('、'))
                ]),
                React.createElement('div', { key: 'contact' }, [
                    React.createElement('h4', { key: 'contact-title' }, '联系信息'),
                    React.createElement('p', { key: 'contact-person' }, React.createElement('strong', {}, '联系人：'), record.contact),
                    React.createElement('p', { key: 'contact-phone' }, React.createElement('strong', {}, '联系电话：'), record.phone)
                ]),
                record.rejectReason && React.createElement('div', { key: 'reject' }, [
                    React.createElement('h4', { key: 'reject-title' }, '拒绝原因'),
                    React.createElement('p', { key: 'reject-content', style: { color: '#f5222d' } }, record.rejectReason)
                ])
            ])
        });
    };
    
    const cancelActivity = (record) => {
        Modal.confirm({
            title: '取消活动',
            content: `确定要取消活动 ${record.title} 吗？`,
            onOk: () => {
                message.success('活动已取消');
                loadActivities();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存活动:', values);
        message.success(editingActivity ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadActivities();
    };
    
    const totalActivities = activities.length;
    const approvedActivities = activities.filter(a => a.status === 'approved').length;
    const pendingActivities = activities.filter(a => a.status === 'pending').length;
    const totalRegistrations = activities.reduce((sum, a) => sum + a.registrations, 0);
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '展商活动信息'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理展会期间的活动安排和信息')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总活动数',
                        value: totalActivities
                    })
                )
            ),
            React.createElement(Col, { key: 'approved', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已通过',
                        value: approvedActivities,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: pendingActivities,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'registrations', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总报名数',
                        value: totalRegistrations,
                        valueStyle: { color: '#1890ff' }
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
            }, '新建活动'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadActivities
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'approved', value: 'approved' }, '已通过'),
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                React.createElement(Option, { key: 'rejected', value: 'rejected' }, '已拒绝'),
                React.createElement(Option, { key: 'cancelled', value: 'cancelled' }, '已取消')
            ]),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'product_launch', value: 'product_launch' }, '产品发布'),
                React.createElement(Option, { key: 'technical_seminar', value: 'technical_seminar' }, '技术交流'),
                React.createElement(Option, { key: 'business_meeting', value: 'business_meeting' }, '商务洽谈'),
                React.createElement(Option, { key: 'workshop', value: 'workshop' }, '工作坊')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: activities,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingActivity ? '编辑活动' : '新建活动',
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
                        label: '活动标题',
                        rules: [{ required: true, message: '请输入活动标题' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入活动标题'
                    }))
                ),
                React.createElement(Col, { key: 'type', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '活动类型',
                        rules: [{ required: true, message: '请选择活动类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择活动类型'
                    }, [
                        React.createElement(Option, { key: 'product_launch', value: 'product_launch' }, '产品发布'),
                        React.createElement(Option, { key: 'technical_seminar', value: 'technical_seminar' }, '技术交流'),
                        React.createElement(Option, { key: 'business_meeting', value: 'business_meeting' }, '商务洽谈'),
                        React.createElement(Option, { key: 'workshop', value: 'workshop' }, '工作坊')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'timeRange', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'timeRange',
                        label: '活动时间',
                        rules: [{ required: true, message: '请选择活动时间' }]
                    }, React.createElement(RangePicker, {
                        showTime: true,
                        format: 'YYYY-MM-DD HH:mm',
                        placeholder: ['开始时间', '结束时间'],
                        style: { width: '100%' }
                    }))
                ),
                React.createElement(Col, { key: 'venue', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'venue',
                        label: '活动地点',
                        rules: [{ required: true, message: '请输入活动地点' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入活动地点'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'capacity', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'capacity',
                        label: '容纳人数',
                        rules: [{ required: true, message: '请输入容纳人数' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入容纳人数'
                    }))
                ),
                React.createElement(Col, { key: 'contact', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'contact',
                        label: '联系人',
                        rules: [{ required: true, message: '请输入联系人' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入联系人'
                    }))
                ),
                React.createElement(Col, { key: 'phone', span: 6 },
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '联系电话',
                        rules: [{ required: true, message: '请输入联系电话' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入联系电话'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '活动描述',
                rules: [{ required: true, message: '请输入活动描述' }]
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请输入活动描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'speakers',
                name: 'speakers',
                label: '演讲嘉宾'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入演讲嘉宾，按回车添加'
            })),
            
            React.createElement(Form.Item, {
                key: 'materials',
                name: 'materials',
                label: '相关资料'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入相关资料，按回车添加'
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

window.ExhibitorActivityInfo = ExhibitorActivityInfo; 