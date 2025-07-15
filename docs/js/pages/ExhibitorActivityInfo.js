// ExhibitorActivityInfo.js - 展商活动信息管理
// 展商可以在此管理希望在展会中开展的活动，并提交审核

function ExhibitorActivityInfo() {
    const { useState, useEffect } = React;
    const { Card, Table, Button, Modal, Form, Input, DatePicker, Upload, Space, message, Popconfirm, Tag, Divider } = antd;
    const { Column } = Table;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const [imageFileList, setImageFileList] = useState([]);
    const [agendaList, setAgendaList] = useState([]);
    const [guestList, setGuestList] = useState([]);

    // 模拟活动数据
    const mockActivities = [
        {
            id: 1,
            activityName: '智能信号系统技术交流会',
            location: 'A馆会议室1',
            startTime: '2024-03-15 09:00:00',
            endTime: '2024-03-15 12:00:00',
            introduction: '深入探讨城市轨道交通智能信号系统的最新技术发展和应用案例。',
            status: 'approved',
            createTime: '2024-01-10 09:00:00'
        },
        {
            id: 2,
            activityName: '新产品发布会',
            location: 'B馆发布厅',
            startTime: '2024-03-16 14:00:00',
            endTime: '2024-03-16 17:00:00',
            introduction: '发布公司最新研发的轨道交通监控系统产品。',
            status: 'reviewing',
            createTime: '2024-01-12 14:30:00'
        }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        setTimeout(() => {
            setDataSource(mockActivities);
            setLoading(false);
        }, 500);
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setImageFileList([]);
        setAgendaList([]);
        setGuestList([]);
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue({
            ...record,
            timeRange: record.startTime && record.endTime ? 
                [moment(record.startTime), moment(record.endTime)] : null
        });
        setModalVisible(true);
    };

    const handleSubmit = (values) => {
        const now = new Date().toLocaleString('zh-CN');
        const { timeRange, ...otherValues } = values;
        const activityData = {
            ...otherValues,
            startTime: timeRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
            endTime: timeRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
            agenda: agendaList,
            guests: guestList
        };
        
        if (editingRecord) {
            setDataSource(dataSource.map(item => 
                item.id === editingRecord.id 
                    ? { ...item, ...activityData, updateTime: now }
                    : item
            ));
            message.success('修改成功！已提交审核');
        } else {
            const newRecord = {
                id: Date.now(),
                ...activityData,
                status: 'reviewing',
                createTime: now
            };
            setDataSource([...dataSource, newRecord]);
            message.success('添加成功！已提交审核');
        }
        
        setModalVisible(false);
        form.resetFields();
        setImageFileList([]);
        setAgendaList([]);
        setGuestList([]);
    };

    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id));
        message.success('删除成功');
    };

    const addAgendaItem = () => {
        setAgendaList([...agendaList, { 
            id: Date.now(), 
            time: '', 
            topic: '', 
            speaker: '' 
        }]);
    };

    const updateAgendaItem = (id, field, value) => {
        setAgendaList(agendaList.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const removeAgendaItem = (id) => {
        setAgendaList(agendaList.filter(item => item.id !== id));
    };

    const addGuestItem = () => {
        setGuestList([...guestList, { 
            id: Date.now(), 
            name: '', 
            position: '', 
            bio: '' 
        }]);
    };

    const updateGuestItem = (id, field, value) => {
        setGuestList(guestList.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const removeGuestItem = (id) => {
        setGuestList(guestList.filter(item => item.id !== id));
    };

    const getStatusTag = (status) => {
        const statusMap = {
            approved: { color: 'success', text: '已通过' },
            reviewing: { color: 'warning', text: '审核中' },
            rejected: { color: 'error', text: '已驳回' }
        };
        const config = statusMap[status] || statusMap.reviewing;
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const uploadProps = {
        listType: 'picture-card',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('只能上传 JPG/PNG 格式的图片！');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小不能超过 2MB！');
                return false;
            }
            return false;
        }
    };

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Card, {
            title: '展商活动信息',
            extra: React.createElement(Button, {
                type: 'primary',
                onClick: handleAdd
            }, '新增活动')
        },
            React.createElement('div', { style: { marginBottom: 16, padding: 16, background: '#f6f8fa', borderRadius: 8 } },
                React.createElement('h4', { style: { margin: '0 0 8px 0', color: '#1890ff' } }, '功能说明'),
                React.createElement('p', { style: { margin: 0, color: '#666' } }, 
                    '在此管理希望在展会期间开展的活动。活动信息提交后需要会展部门审核，审核通过后将在APP端展会板块中展示，用户可以预约参加。'
                )
            ),
            
            React.createElement(Table, {
                dataSource: dataSource,
                loading: loading,
                rowKey: 'id',
                pagination: { pageSize: 10 }
            },
                React.createElement(Column, {
                    title: '活动名称',
                    dataIndex: 'activityName',
                    key: 'activityName',
                    width: 200
                }),
                React.createElement(Column, {
                    title: '活动地点',
                    dataIndex: 'location',
                    key: 'location',
                    width: 150
                }),
                React.createElement(Column, {
                    title: '活动时间',
                    key: 'time',
                    width: 200,
                    render: (_, record) => 
                        `${record.startTime?.substring(0, 16)} - ${record.endTime?.substring(11, 16)}`
                }),
                React.createElement(Column, {
                    title: '审核状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (status) => getStatusTag(status)
                }),
                React.createElement(Column, {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    width: 150
                }),
                React.createElement(Column, {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    render: (_, record) => React.createElement(Space, { size: 'small' },
                        React.createElement(Button, {
                            type: 'link',
                            size: 'small',
                            onClick: () => handleEdit(record)
                        }, '编辑'),
                        React.createElement(Popconfirm, {
                            title: '确定要删除这个活动吗？',
                            onConfirm: () => handleDelete(record.id),
                            okText: '确定',
                            cancelText: '取消'
                        },
                            React.createElement(Button, {
                                type: 'link',
                                size: 'small',
                                danger: true
                            }, '删除')
                        )
                    )
                })
            )
        ),

        // 活动编辑Modal
        React.createElement(Modal, {
            title: editingRecord ? '编辑活动' : '新增活动',
            open: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
                setImageFileList([]);
                setAgendaList([]);
                setGuestList([]);
            },
            onOk: () => form.submit(),
            width: 1000,
            style: { top: 20 }
        },
            React.createElement(Form, {
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit
            },
                React.createElement(Form.Item, {
                    name: 'activityName',
                    label: '活动名称',
                    rules: [{ required: true, message: '请输入活动名称' }]
                },
                    React.createElement(Input, { placeholder: '请输入活动名称' })
                ),
                
                React.createElement('div', { style: { display: 'flex', gap: 16 } },
                    React.createElement('div', { style: { flex: 1 } },
                        React.createElement(Form.Item, {
                            name: 'location',
                            label: '活动地点',
                            rules: [{ required: true, message: '请输入活动地点' }]
                        },
                            React.createElement(Input, { placeholder: '如：A馆会议室1' })
                        )
                    ),
                    React.createElement('div', { style: { flex: 1 } },
                        React.createElement(Form.Item, {
                            name: 'timeRange',
                            label: '活动时间',
                            rules: [{ required: true, message: '请选择活动时间' }]
                        },
                            React.createElement(RangePicker, { 
                                showTime: true,
                                format: 'YYYY-MM-DD HH:mm',
                                placeholder: ['开始时间', '结束时间']
                            })
                        )
                    )
                ),

                React.createElement(Form.Item, {
                    name: 'introduction',
                    label: '活动介绍',
                    rules: [{ required: true, message: '请输入活动介绍' }]
                },
                    React.createElement(TextArea, { 
                        rows: 4,
                        placeholder: '请详细描述活动内容、目标、特色等',
                        showCount: true,
                        maxLength: 500
                    })
                ),

                React.createElement(Form.Item, {
                    label: '活动图片',
                    help: '可上传活动海报或相关图片'
                },
                    React.createElement(Upload, {
                        ...uploadProps,
                        fileList: imageFileList,
                        onChange: ({ fileList }) => setImageFileList(fileList),
                        maxCount: 5,
                        multiple: true
                    },
                        imageFileList.length >= 5 ? null : React.createElement('div', null,
                            React.createElement('div', { style: { marginTop: 8 } }, '上传图片')
                        )
                    )
                ),

                React.createElement(Divider, { children: '活动议程' }),
                
                React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement(Button, {
                        type: 'dashed',
                        onClick: addAgendaItem,
                        style: { width: '100%' }
                    }, '+ 添加议程')
                ),

                agendaList.map(agenda => 
                    React.createElement(Card, {
                        key: agenda.id,
                        size: 'small',
                        style: { marginBottom: 12 },
                        extra: React.createElement(Button, {
                            type: 'link',
                            danger: true,
                            size: 'small',
                            onClick: () => removeAgendaItem(agenda.id)
                        }, '删除')
                    },
                        React.createElement('div', { style: { display: 'flex', gap: 16 } },
                            React.createElement('div', { style: { width: 120 } },
                                React.createElement(Input, {
                                    placeholder: '时间',
                                    value: agenda.time,
                                    onChange: (e) => updateAgendaItem(agenda.id, 'time', e.target.value)
                                })
                            ),
                            React.createElement('div', { style: { flex: 1 } },
                                React.createElement(Input, {
                                    placeholder: '议程主题',
                                    value: agenda.topic,
                                    onChange: (e) => updateAgendaItem(agenda.id, 'topic', e.target.value)
                                })
                            ),
                            React.createElement('div', { style: { width: 120 } },
                                React.createElement(Input, {
                                    placeholder: '主讲人',
                                    value: agenda.speaker,
                                    onChange: (e) => updateAgendaItem(agenda.id, 'speaker', e.target.value)
                                })
                            )
                        )
                    )
                ),

                React.createElement(Divider, { children: '嘉宾简介' }),
                
                React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement(Button, {
                        type: 'dashed',
                        onClick: addGuestItem,
                        style: { width: '100%' }
                    }, '+ 添加嘉宾')
                ),

                guestList.map(guest => 
                    React.createElement(Card, {
                        key: guest.id,
                        size: 'small',
                        style: { marginBottom: 12 },
                        extra: React.createElement(Button, {
                            type: 'link',
                            danger: true,
                            size: 'small',
                            onClick: () => removeGuestItem(guest.id)
                        }, '删除')
                    },
                        React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 12 } },
                            React.createElement('div', { style: { width: 120 } },
                                React.createElement(Input, {
                                    placeholder: '嘉宾姓名',
                                    value: guest.name,
                                    onChange: (e) => updateGuestItem(guest.id, 'name', e.target.value)
                                })
                            ),
                            React.createElement('div', { style: { width: 200 } },
                                React.createElement(Input, {
                                    placeholder: '职务',
                                    value: guest.position,
                                    onChange: (e) => updateGuestItem(guest.id, 'position', e.target.value)
                                })
                            )
                        ),
                        React.createElement(TextArea, {
                            placeholder: '嘉宾简介',
                            rows: 2,
                            value: guest.bio,
                            onChange: (e) => updateGuestItem(guest.id, 'bio', e.target.value)
                        })
                    )
                )
            )
        )
    );
}

// 注册到全局
window.ExhibitorActivityInfo = ExhibitorActivityInfo; 