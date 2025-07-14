// 会议活动管理组件
const MeetingActivityManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, TimePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    const [meetings, setMeetings] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingMeeting, setEditingMeeting] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟会议活动数据
    const mockMeetings = [
        { 
            id: 1, 
            title: '2024城轨发展高峰论坛', 
            type: 'conference', 
            status: 'upcoming',
            location: '北京国际会议中心',
            startTime: '2024-03-15 09:00',
            endTime: '2024-03-15 17:00',
            organizer: '中国城市轨道交通协会',
            capacity: 500,
            registered: 356,
            speakers: ['张教授', '李院士', '王总工'],
            agenda: '城轨技术发展趋势、智能化建设、绿色交通',
            description: '汇聚行业专家，共同探讨城轨发展新趋势',
            fee: 800,
            createTime: '2024-01-10 10:00:00'
        },
        { 
            id: 2, 
            title: '智能信号系统技术研讨会', 
            type: 'seminar', 
            status: 'ongoing',
            location: '上海轨道交通大厦',
            startTime: '2024-02-20 14:00',
            endTime: '2024-02-20 18:00',
            organizer: '华为技术有限公司',
            capacity: 200,
            registered: 180,
            speakers: ['刘工程师', '陈博士'],
            agenda: '5G信号系统、CBTC技术、智能调度',
            description: '深入探讨智能信号系统的最新技术和应用',
            fee: 0,
            createTime: '2024-01-15 11:00:00'
        },
        { 
            id: 3, 
            title: '新能源列车展示会', 
            type: 'exhibition', 
            status: 'completed',
            location: '深圳会展中心',
            startTime: '2024-01-25 10:00',
            endTime: '2024-01-27 16:00',
            organizer: '比亚迪股份有限公司',
            capacity: 1000,
            registered: 890,
            speakers: ['王总裁', '李主任'],
            agenda: '新能源技术、环保理念、未来发展',
            description: '展示最新新能源列车技术和产品',
            fee: 200,
            createTime: '2024-01-05 09:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadMeetings();
    }, []);
    
    const loadMeetings = () => {
        setLoading(true);
        setTimeout(() => {
            setMeetings(mockMeetings);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'upcoming': { color: 'blue', text: '即将开始' },
            'ongoing': { color: 'green', text: '进行中' },
            'completed': { color: 'default', text: '已结束' },
            'cancelled': { color: 'red', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'conference': { color: 'purple', text: '会议' },
            'seminar': { color: 'blue', text: '研讨会' },
            'exhibition': { color: 'green', text: '展览' },
            'workshop': { color: 'orange', text: '工作坊' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '活动名称',
            dataIndex: 'title',
            key: 'title',
            width: 200
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
            title: '地点',
            dataIndex: 'location',
            key: 'location',
            width: 150
        },
        {
            title: '时间',
            key: 'time',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'start' }, record.startTime),
                React.createElement('div', { key: 'end', style: { color: '#8c8c8c' } }, record.endTime)
            ])
        },
        {
            title: '主办方',
            dataIndex: 'organizer',
            key: 'organizer',
            width: 150
        },
        {
            title: '报名情况',
            key: 'registration',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'count' }, `${record.registered}/${record.capacity}`),
                React.createElement('div', { 
                    key: 'rate', 
                    style: { 
                        color: record.registered / record.capacity > 0.8 ? '#f5222d' : '#52c41a' 
                    } 
                }, `${((record.registered / record.capacity) * 100).toFixed(1)}%`)
            ])
        },
        {
            title: '费用',
            dataIndex: 'fee',
            key: 'fee',
            render: (fee) => fee === 0 ? React.createElement(Tag, { color: 'green' }, '免费') : `¥${fee}`
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
                    key: 'manage',
                    type: 'link',
                    size: 'small',
                    onClick: () => manageRegistration(record)
                }, '报名管理')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingMeeting(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingMeeting(record);
        form.setFieldsValue({
            ...record,
            timeRange: [record.startTime, record.endTime],
            speakers: record.speakers
        });
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.title} - 详细信息`,
            width: 700,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'organizer' }, React.createElement('strong', {}, '主办方：'), record.organizer),
                React.createElement('p', { key: 'location' }, React.createElement('strong', {}, '地点：'), record.location),
                React.createElement('p', { key: 'time' }, React.createElement('strong', {}, '时间：'), `${record.startTime} - ${record.endTime}`),
                React.createElement('p', { key: 'capacity' }, React.createElement('strong', {}, '容量：'), `${record.capacity}人`),
                React.createElement('p', { key: 'registered' }, React.createElement('strong', {}, '已报名：'), `${record.registered}人`),
                React.createElement('p', { key: 'fee' }, React.createElement('strong', {}, '费用：'), record.fee === 0 ? '免费' : `¥${record.fee}`),
                React.createElement('p', { key: 'speakers' }, React.createElement('strong', {}, '演讲嘉宾：'), record.speakers.join('、')),
                React.createElement('p', { key: 'agenda' }, React.createElement('strong', {}, '议程：'), record.agenda),
                React.createElement('p', { key: 'description' }, React.createElement('strong', {}, '描述：'), record.description)
            ])
        });
    };
    
    const manageRegistration = (record) => {
        message.info(`管理 ${record.title} 的报名信息`);
    };
    
    const handleSubmit = (values) => {
        console.log('保存会议活动:', values);
        message.success(editingMeeting ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadMeetings();
    };
    
    const totalMeetings = meetings.length;
    const upcomingMeetings = meetings.filter(m => m.status === 'upcoming').length;
    const totalRegistered = meetings.reduce((sum, m) => sum + m.registered, 0);
    const totalCapacity = meetings.reduce((sum, m) => sum + m.capacity, 0);
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '会议活动管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理会议、研讨会、展览等各类活动')
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
                        value: totalMeetings
                    })
                )
            ),
            React.createElement(Col, { key: 'upcoming', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '即将开始',
                        value: upcomingMeetings,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'registered', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总报名人数',
                        value: totalRegistered,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'occupancy', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均报名率',
                        value: totalCapacity > 0 ? ((totalRegistered / totalCapacity) * 100).toFixed(1) : 0,
                        suffix: '%',
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
            }, '新建活动'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadMeetings
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'upcoming', value: 'upcoming' }, '即将开始'),
                React.createElement(Option, { key: 'ongoing', value: 'ongoing' }, '进行中'),
                React.createElement(Option, { key: 'completed', value: 'completed' }, '已结束'),
                React.createElement(Option, { key: 'cancelled', value: 'cancelled' }, '已取消')
            ]),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'conference', value: 'conference' }, '会议'),
                React.createElement(Option, { key: 'seminar', value: 'seminar' }, '研讨会'),
                React.createElement(Option, { key: 'exhibition', value: 'exhibition' }, '展览'),
                React.createElement(Option, { key: 'workshop', value: 'workshop' }, '工作坊')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: meetings,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingMeeting ? '编辑活动' : '新建活动',
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
                        label: '活动名称',
                        rules: [{ required: true, message: '请输入活动名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入活动名称'
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
                        React.createElement(Option, { key: 'conference', value: 'conference' }, '会议'),
                        React.createElement(Option, { key: 'seminar', value: 'seminar' }, '研讨会'),
                        React.createElement(Option, { key: 'exhibition', value: 'exhibition' }, '展览'),
                        React.createElement(Option, { key: 'workshop', value: 'workshop' }, '工作坊')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'organizer', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'organizer',
                        label: '主办方',
                        rules: [{ required: true, message: '请输入主办方' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入主办方'
                    }))
                ),
                React.createElement(Col, { key: 'location', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'location',
                        label: '活动地点',
                        rules: [{ required: true, message: '请输入活动地点' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入活动地点'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'capacity', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'capacity',
                        label: '容量（人）',
                        rules: [{ required: true, message: '请输入容量' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入容量'
                    }))
                ),
                React.createElement(Col, { key: 'fee', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'fee',
                        label: '费用（元）',
                        rules: [{ required: true, message: '请输入费用' }]
                    }, React.createElement(Input, {
                        type: 'number',
                        placeholder: '请输入费用，0表示免费'
                    }))
                ),
                React.createElement(Col, { key: 'status', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'status',
                        label: '状态',
                        rules: [{ required: true, message: '请选择状态' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择状态'
                    }, [
                        React.createElement(Option, { key: 'upcoming', value: 'upcoming' }, '即将开始'),
                        React.createElement(Option, { key: 'ongoing', value: 'ongoing' }, '进行中'),
                        React.createElement(Option, { key: 'completed', value: 'completed' }, '已结束'),
                        React.createElement(Option, { key: 'cancelled', value: 'cancelled' }, '已取消')
                    ]))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'timeRange',
                name: 'timeRange',
                label: '活动时间',
                rules: [{ required: true, message: '请选择活动时间' }]
            }, React.createElement(RangePicker, {
                showTime: true,
                format: 'YYYY-MM-DD HH:mm',
                placeholder: ['开始时间', '结束时间'],
                style: { width: '100%' }
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
                key: 'agenda',
                name: 'agenda',
                label: '议程'
            }, React.createElement(TextArea, {
                rows: 2,
                placeholder: '请输入议程'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '活动描述'
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入活动描述'
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

window.MeetingActivityManagement = MeetingActivityManagement; 