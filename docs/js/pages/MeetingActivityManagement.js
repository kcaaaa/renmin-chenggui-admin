// 会议活动管理页面 - 对APP中的会议活动进行后台维护
const MeetingActivityManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, TimePicker, Upload, Descriptions } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const dayjs = antd.dayjs;

    const [loading, setLoading] = React.useState(false);
    const [meetings, setMeetings] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [editingMeeting, setEditingMeeting] = React.useState(null);
    const [viewingMeeting, setViewingMeeting] = React.useState(null);
    const [form] = Form.useForm();

    // 模拟统计数据
    const [stats] = React.useState({
        totalActivities: 45,
        upcomingActivities: 12,
        ongoingActivities: 3,
        completedActivities: 30,
        totalRegistrations: 2856
    });

    // 模拟会议活动数据
    const mockMeetings = [
        { 
            id: 1, 
            title: '2024城轨发展高峰论坛', 
            type: 'conference', 
            status: 'upcoming',
            location: '北京国际会议中心-主会场',
            venue: '北京国际会议中心',
            room: '主会场',
            startTime: '2024-03-15 09:00',
            endTime: '2024-03-15 17:00',
            organizer: '中国城市轨道交通协会',
            organizerType: 'association',
            capacity: 500,
            registered: 356,
            speakers: ['张教授', '李院士', '王总工'],
            agenda: [
                { time: '09:00-09:30', title: '开幕致辞', speaker: '协会会长' },
                { time: '09:30-10:30', title: '城轨发展趋势报告', speaker: '张教授' },
                { time: '10:30-11:30', title: '智能化建设实践', speaker: '李院士' },
                { time: '11:30-12:00', title: '圆桌讨论', speaker: '多位专家' }
            ],
            description: '汇聚行业专家，共同探讨城轨发展新趋势',
            fee: 800,
            feeType: 'paid',
            requireRegistration: true,
            allowCancellation: true,
            tags: ['高峰论坛', '行业趋势', '专家对话'],
            materials: ['会议手册', '技术白皮书', '行业报告'],
            liveStream: true,
            liveUrl: 'https://live.example.com/conference2024',
            createTime: '2024-01-10 10:00:00',
            updateTime: '2024-01-20 15:30:00'
        },
        { 
            id: 2, 
            title: '智能信号系统技术研讨会', 
            type: 'seminar', 
            status: 'ongoing',
            location: '上海轨道交通大厦-技术中心',
            venue: '上海轨道交通大厦',
            room: '技术中心',
            startTime: '2024-02-20 14:00',
            endTime: '2024-02-20 18:00',
            organizer: '华为技术有限公司',
            organizerType: 'exhibitor',
            capacity: 200,
            registered: 180,
            speakers: ['刘工程师', '陈博士'],
            agenda: [
                { time: '14:00-14:30', title: '签到入场', speaker: '' },
                { time: '14:30-15:30', title: '5G信号系统介绍', speaker: '刘工程师' },
                { time: '15:30-16:30', title: 'CBTC技术演示', speaker: '陈博士' },
                { time: '16:30-18:00', title: '技术交流与答疑', speaker: '技术团队' }
            ],
            description: '深入探讨智能信号系统的最新技术和应用',
            fee: 0,
            feeType: 'free',
            requireRegistration: true,
            allowCancellation: true,
            tags: ['技术研讨', '5G技术', 'CBTC'],
            materials: ['技术手册', '产品介绍'],
            liveStream: false,
            liveUrl: '',
            createTime: '2024-01-15 11:00:00',
            updateTime: '2024-02-15 09:20:00'
        },
        { 
            id: 3, 
            title: '新能源列车展示会', 
            type: 'exhibition', 
            status: 'completed',
            location: '深圳会展中心-B馆',
            venue: '深圳会展中心',
            room: 'B馆',
            startTime: '2024-01-25 10:00',
            endTime: '2024-01-27 16:00',
            organizer: '比亚迪股份有限公司',
            organizerType: 'exhibitor',
            capacity: 1000,
            registered: 890,
            speakers: ['王总裁', '李主任'],
            agenda: [
                { time: '10:00-10:30', title: '开幕仪式', speaker: '王总裁' },
                { time: '10:30-12:00', title: '新能源技术展示', speaker: '技术团队' },
                { time: '14:00-15:30', title: '产品演示', speaker: '李主任' },
                { time: '15:30-16:00', title: '合作洽谈', speaker: '商务团队' }
            ],
            description: '展示最新新能源列车技术和产品',
            fee: 200,
            feeType: 'paid',
            requireRegistration: true,
            allowCancellation: false,
            tags: ['新能源', '产品展示', '技术创新'],
            materials: ['产品手册', '技术参数', '合作方案'],
            liveStream: true,
            liveUrl: 'https://live.example.com/byd2024',
            createTime: '2024-01-05 09:00:00',
            updateTime: '2024-01-25 08:00:00'
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

    const handleAdd = () => {
        setEditingMeeting(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingMeeting(record);
        form.setFieldsValue({
            title: record.title,
            type: record.type,
            venue: record.venue,
            room: record.room,
            timeRange: [dayjs(record.startTime), dayjs(record.endTime)],
            organizer: record.organizer,
            organizerType: record.organizerType,
            capacity: record.capacity,
            description: record.description,
            fee: record.fee,
            feeType: record.feeType,
            requireRegistration: record.requireRegistration,
            allowCancellation: record.allowCancellation,
            liveStream: record.liveStream,
            liveUrl: record.liveUrl,
            speakers: record.speakers.join(','),
            tags: record.tags
        });
        setModalVisible(true);
    };

    const handleViewDetail = (record) => {
        setViewingMeeting(record);
        setDetailModalVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除活动"${record.title}"吗？删除后将无法恢复。`,
            onOk() {
                message.success('删除成功');
                loadMeetings();
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('提交活动数据:', values);
            message.success(editingMeeting ? '编辑成功' : '新增成功');
            setModalVisible(false);
            loadMeetings();
        } catch (error) {
            console.log('表单验证失败:', error);
        }
    };

    const getTypeTag = (type) => {
        const typeMap = {
            'conference': { color: 'blue', text: '会议' },
            'seminar': { color: 'green', text: '研讨会' },
            'exhibition': { color: 'purple', text: '展览' },
            'workshop': { color: 'orange', text: '工作坊' },
            'forum': { color: 'cyan', text: '论坛' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getStatusTag = (status) => {
        const statusMap = {
            'upcoming': { color: 'blue', text: '即将开始' },
            'ongoing': { color: 'green', text: '进行中' },
            'completed': { color: 'default', text: '已结束' },
            'cancelled': { color: 'red', text: '已取消' },
            'draft': { color: 'orange', text: '草稿' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getOrganizerTypeTag = (type) => {
        const typeMap = {
            'association': { color: 'gold', text: '协会主办' },
            'exhibitor': { color: 'blue', text: '展商主办' },
            'partner': { color: 'green', text: '合作伙伴' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getFeeTag = (feeType, fee) => {
        if (feeType === 'free') {
            return React.createElement(Tag, { color: 'green' }, '免费');
        } else {
            return React.createElement(Tag, { color: 'orange' }, `¥${fee}`);
        }
    };

    const getProgressPercent = (registered, capacity) => {
        return capacity > 0 ? Math.round((registered / capacity) * 100) : 0;
    };

    const columns = [
        {
            title: '活动信息',
            key: 'info',
            width: 280,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'title',
                    style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }
                }, record.title),
                React.createElement('div', { 
                    key: 'type',
                    style: { marginBottom: '4px' }
                }, [
                    getTypeTag(record.type),
                    React.createElement('span', { 
                        style: { marginLeft: '8px' }
                    }, getOrganizerTypeTag(record.organizerType))
                ]),
                React.createElement('div', { 
                    key: 'organizer',
                    style: { fontSize: '12px', color: '#666' }
                }, `主办: ${record.organizer}`)
            ])
        },
        {
            title: '时间地点',
            key: 'timeLocation',
            width: 200,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'time' }, `🕒 ${record.startTime}`),
                React.createElement('div', { key: 'duration' }, `至 ${record.endTime}`),
                React.createElement('div', { 
                    key: 'location',
                    style: { marginTop: '4px' }
                }, `📍 ${record.location}`)
            ])
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag
        },
        {
            title: '报名情况',
            key: 'registration',
            width: 150,
            render: (_, record) => {
                const percent = getProgressPercent(record.registered, record.capacity);
                return React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'numbers',
                        style: { fontSize: '12px', marginBottom: '4px' }
                    }, `${record.registered} / ${record.capacity}`),
                    React.createElement('div', {
                        key: 'bar',
                        style: {
                            width: '100px',
                            height: '6px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }
                    }, React.createElement('div', {
                        style: {
                            width: `${percent}%`,
                            height: '100%',
                            backgroundColor: percent >= 90 ? '#ff4d4f' : percent >= 70 ? '#faad14' : '#52c41a',
                            transition: 'width 0.3s'
                        }
                    })),
                    React.createElement('div', { 
                        key: 'percent',
                        style: { fontSize: '10px', color: '#666', marginTop: '2px' }
                    }, `${percent}%`)
                ]);
            }
        },
        {
            title: '费用',
            key: 'fee',
            width: 80,
            render: (_, record) => getFeeTag(record.feeType, record.fee)
        },
        {
            title: '功能',
            key: 'features',
            width: 120,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '11px' }
            }, [
                record.liveStream && React.createElement(Tag, { 
                    key: 'live',
                    size: 'small',
                    color: 'red'
                }, '🔴 直播'),
                record.requireRegistration && React.createElement(Tag, { 
                    key: 'reg',
                    size: 'small',
                    color: 'blue'
                }, '📝 报名'),
                record.allowCancellation && React.createElement(Tag, { 
                    key: 'cancel',
                    size: 'small',
                    color: 'default'
                }, '❌ 可取消')
            ])
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleViewDetail(record)
                }, '详情'),
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'copy',
                    type: 'link',
                    size: 'small',
                    onClick: () => {
                        const newRecord = { ...record, title: record.title + ' (副本)' };
                        handleEdit(newRecord);
                    }
                }, '复制'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => handleDelete(record)
                }, '删除')
            ])
        }
    ];

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
                        title: '总活动数',
                        value: stats.totalActivities,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '即将开始',
                        value: stats.upcomingActivities,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '进行中',
                        value: stats.ongoingActivities,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已完成',
                        value: stats.completedActivities,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总报名数',
                        value: stats.totalRegistrations,
                        valueStyle: { color: '#ff4d4f' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Button, {
                    type: 'primary',
                    onClick: loadMeetings,
                    style: { width: '100%', height: '100%' }
                }, '刷新数据')
            )
        ]),

        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('h3', { key: 'title' }, '会议活动管理'),
                React.createElement(Space, { key: 'actions' }, [
                    React.createElement(Select, {
                        key: 'status-filter',
                        placeholder: '状态筛选',
                        style: { width: 120 },
                        allowClear: true
                    }, [
                        React.createElement(Option, { value: 'upcoming' }, '即将开始'),
                        React.createElement(Option, { value: 'ongoing' }, '进行中'),
                        React.createElement(Option, { value: 'completed' }, '已结束'),
                        React.createElement(Option, { value: 'cancelled' }, '已取消')
                    ]),
                    React.createElement(Select, {
                        key: 'type-filter',
                        placeholder: '类型筛选',
                        style: { width: 120 },
                        allowClear: true
                    }, [
                        React.createElement(Option, { value: 'conference' }, '会议'),
                        React.createElement(Option, { value: 'seminar' }, '研讨会'),
                        React.createElement(Option, { value: 'exhibition' }, '展览'),
                        React.createElement(Option, { value: 'workshop' }, '工作坊')
                    ]),
                    React.createElement(Button, {
                        key: 'add',
                        type: 'primary',
                        onClick: handleAdd
                    }, '新建活动')
                ])
            ]),

            React.createElement('div', {
                key: 'description',
                style: { 
                    padding: '12px', 
                    background: '#f6ffed', 
                    border: '1px solid #b7eb8f',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }
            }, '会议活动管理用于维护APP中展示的各类会议、研讨会、展览等活动信息。支持主办方活动和展商活动的统一管理。'),

            React.createElement(Table, {
                key: 'table',
                columns,
                dataSource: meetings,
                loading,
                pagination: {
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }
            })
        ]),

        // 新增/编辑弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: editingMeeting ? '编辑活动' : '新建活动',
            open: modalVisible,
            onOk: handleSubmit,
            onCancel: () => setModalVisible(false),
            width: 800
        }, React.createElement(Form, {
            form,
            layout: 'vertical'
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { span: 16 }, 
                    React.createElement(Form.Item, {
                        label: '活动标题',
                        name: 'title',
                        rules: [{ required: true, message: '请输入活动标题' }]
                    }, React.createElement(Input, { placeholder: '请输入活动标题' }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '活动类型',
                        name: 'type',
                        rules: [{ required: true, message: '请选择活动类型' }]
                    }, React.createElement(Select, { placeholder: '请选择类型' }, [
                        React.createElement(Option, { value: 'conference' }, '会议'),
                        React.createElement(Option, { value: 'seminar' }, '研讨会'),
                        React.createElement(Option, { value: 'exhibition' }, '展览'),
                        React.createElement(Option, { value: 'workshop' }, '工作坊'),
                        React.createElement(Option, { value: 'forum' }, '论坛')
                    ]))
                )
            ]),

            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '举办场所',
                        name: 'venue',
                        rules: [{ required: true, message: '请输入举办场所' }]
                    }, React.createElement(Input, { placeholder: '如：北京国际会议中心' }))
                ),
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '具体会议室',
                        name: 'room',
                        rules: [{ required: true, message: '请输入具体会议室' }]
                    }, React.createElement(Input, { placeholder: '如：主会场、A厅' }))
                )
            ]),

            React.createElement(Form.Item, {
                key: 'timeRange',
                label: '活动时间',
                name: 'timeRange',
                rules: [{ required: true, message: '请选择活动时间' }]
            }, React.createElement(RangePicker, { 
                style: { width: '100%' },
                showTime: { format: 'HH:mm' },
                format: 'YYYY-MM-DD HH:mm'
            })),

            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '主办方',
                        name: 'organizer',
                        rules: [{ required: true, message: '请输入主办方' }]
                    }, React.createElement(Input, { placeholder: '请输入主办方名称' }))
                ),
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '主办方类型',
                        name: 'organizerType',
                        rules: [{ required: true, message: '请选择主办方类型' }]
                    }, React.createElement(Select, { placeholder: '请选择类型' }, [
                        React.createElement(Option, { value: 'association' }, '协会主办'),
                        React.createElement(Option, { value: 'exhibitor' }, '展商主办'),
                        React.createElement(Option, { value: 'partner' }, '合作伙伴')
                    ]))
                )
            ]),

            React.createElement(Row, { key: 'row4', gutter: 16 }, [
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '容纳人数',
                        name: 'capacity',
                        rules: [{ required: true, message: '请输入容纳人数' }]
                    }, React.createElement(Input, { 
                        type: 'number',
                        placeholder: '最大容纳人数'
                    }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '费用类型',
                        name: 'feeType',
                        rules: [{ required: true, message: '请选择费用类型' }]
                    }, React.createElement(Select, { 
                        placeholder: '费用类型',
                        onChange: (value) => {
                            if (value === 'free') {
                                form.setFieldsValue({ fee: 0 });
                            }
                        }
                    }, [
                        React.createElement(Option, { value: 'free' }, '免费'),
                        React.createElement(Option, { value: 'paid' }, '收费')
                    ]))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '费用金额',
                        name: 'fee'
                    }, React.createElement(Input, { 
                        type: 'number',
                        placeholder: '费用金额（元）',
                        disabled: form.getFieldValue('feeType') === 'free'
                    }))
                )
            ]),

            React.createElement(Form.Item, {
                key: 'speakers',
                label: '演讲嘉宾',
                name: 'speakers'
            }, React.createElement(Input, { 
                placeholder: '请输入演讲嘉宾，多个嘉宾用逗号分隔'
            })),

            React.createElement(Form.Item, {
                key: 'tags',
                label: '活动标签',
                name: 'tags'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入活动标签',
                style: { width: '100%' }
            })),

            React.createElement(Row, { key: 'row5', gutter: 16 }, [
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '需要报名',
                        name: 'requireRegistration',
                        valuePropName: 'checked'
                    }, React.createElement('input', { type: 'checkbox' }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '允许取消',
                        name: 'allowCancellation',
                        valuePropName: 'checked'
                    }, React.createElement('input', { type: 'checkbox' }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '支持直播',
                        name: 'liveStream',
                        valuePropName: 'checked'
                    }, React.createElement('input', { type: 'checkbox' }))
                )
            ]),

            React.createElement(Form.Item, {
                key: 'liveUrl',
                noStyle: true
            }, React.createElement(Form.Item, {
                shouldUpdate: (prevValues, currentValues) => 
                    prevValues.liveStream !== currentValues.liveStream
            }, ({ getFieldValue }) => {
                const liveStream = getFieldValue('liveStream');
                return liveStream ? React.createElement(Form.Item, {
                    label: '直播链接',
                    name: 'liveUrl'
                }, React.createElement(Input, { 
                    placeholder: '请输入直播链接地址'
                })) : null;
            })),

            React.createElement(Form.Item, {
                key: 'description',
                label: '活动描述',
                name: 'description'
            }, React.createElement(TextArea, { 
                rows: 4,
                placeholder: '请输入活动的详细描述'
            }))
        ])),

        // 活动详情弹窗
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '活动详情',
            open: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭')
            ],
            width: 900
        }, viewingMeeting && React.createElement('div', {}, [
            // 基本信息
            React.createElement(Descriptions, {
                key: 'basic-info',
                title: '基本信息',
                bordered: true,
                column: 3,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Descriptions.Item, { label: '活动标题' }, viewingMeeting.title),
                React.createElement(Descriptions.Item, { label: '活动类型' }, getTypeTag(viewingMeeting.type)),
                React.createElement(Descriptions.Item, { label: '状态' }, getStatusTag(viewingMeeting.status)),
                React.createElement(Descriptions.Item, { label: '主办方' }, viewingMeeting.organizer),
                React.createElement(Descriptions.Item, { label: '主办方类型' }, getOrganizerTypeTag(viewingMeeting.organizerType)),
                React.createElement(Descriptions.Item, { label: '费用' }, getFeeTag(viewingMeeting.feeType, viewingMeeting.fee)),
                React.createElement(Descriptions.Item, { label: '开始时间' }, viewingMeeting.startTime),
                React.createElement(Descriptions.Item, { label: '结束时间' }, viewingMeeting.endTime),
                React.createElement(Descriptions.Item, { label: '举办地点' }, viewingMeeting.location),
                React.createElement(Descriptions.Item, { 
                    label: '活动描述',
                    span: 3
                }, viewingMeeting.description)
            ]),

            // 报名统计
            React.createElement(Row, {
                key: 'stats',
                gutter: 16,
                style: { marginBottom: 24 }
            }, [
                React.createElement(Col, { span: 8 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '报名人数',
                            value: viewingMeeting.registered,
                            valueStyle: { color: '#1890ff' }
                        })
                    )
                ),
                React.createElement(Col, { span: 8 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '容纳人数',
                            value: viewingMeeting.capacity,
                            valueStyle: { color: '#52c41a' }
                        })
                    )
                ),
                React.createElement(Col, { span: 8 },
                    React.createElement(Card, {},
                        React.createElement(Statistic, {
                            title: '报名率',
                            value: getProgressPercent(viewingMeeting.registered, viewingMeeting.capacity),
                            suffix: '%',
                            valueStyle: { color: '#faad14' }
                        })
                    )
                )
            ]),

            // 活动议程
            viewingMeeting.agenda && viewingMeeting.agenda.length > 0 && React.createElement('div', {
                key: 'agenda',
                style: { marginBottom: 24 }
            }, [
                React.createElement('h4', { 
                    key: 'title',
                    style: { marginBottom: 16 }
                }, '活动议程'),
                React.createElement(Table, {
                    key: 'table',
                    columns: [
                        { title: '时间', dataIndex: 'time', key: 'time', width: 150 },
                        { title: '议程', dataIndex: 'title', key: 'title' },
                        { title: '演讲者', dataIndex: 'speaker', key: 'speaker', width: 150 }
                    ],
                    dataSource: viewingMeeting.agenda.map((item, index) => ({ ...item, key: index })),
                    pagination: false,
                    size: 'small'
                })
            ]),

            // 其他信息
            React.createElement(Descriptions, {
                key: 'other-info',
                title: '其他信息',
                bordered: true,
                column: 2
            }, [
                React.createElement(Descriptions.Item, { label: '演讲嘉宾' }, viewingMeeting.speakers.join(', ')),
                React.createElement(Descriptions.Item, { label: '活动标签' }, 
                    viewingMeeting.tags.map(tag => 
                        React.createElement(Tag, { key: tag, color: 'blue' }, tag)
                    )
                ),
                React.createElement(Descriptions.Item, { label: '需要报名' }, 
                    viewingMeeting.requireRegistration ? '是' : '否'
                ),
                React.createElement(Descriptions.Item, { label: '允许取消' }, 
                    viewingMeeting.allowCancellation ? '是' : '否'
                ),
                React.createElement(Descriptions.Item, { label: '支持直播' }, 
                    viewingMeeting.liveStream ? '是' : '否'
                ),
                viewingMeeting.liveStream && viewingMeeting.liveUrl && React.createElement(Descriptions.Item, { label: '直播链接' }, 
                    React.createElement('a', {
                        href: viewingMeeting.liveUrl,
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }, viewingMeeting.liveUrl)
                ),
                React.createElement(Descriptions.Item, { 
                    label: '活动资料',
                    span: 2
                }, viewingMeeting.materials.join(', '))
            ])
        ]))
    ]);
};

window.MeetingActivityManagement = MeetingActivityManagement; 