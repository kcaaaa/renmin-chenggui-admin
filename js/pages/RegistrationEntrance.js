// 报名入口管理页面 - 维护APP中的报名链接，支持第三方跳转
const RegistrationEntrance = () => {
    const { Card, Table, Button, Modal, Form, Input, Select, Space, message, Tag, Row, Col, Switch, DatePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const dayjs = antd.dayjs;

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingEntrance, setEditingEntrance] = React.useState(null);
    const [form] = Form.useForm();

    // 模拟报名入口数据
    const mockData = [
        {
            key: '1',
            id: 'ENT001',
            title: '2024中国城市轨道交通博览会-展商报名',
            exhibitionId: 'EX001',
            exhibitionName: '2024中国城市轨道交通博览会',
            type: 'exhibitor',
            linkType: 'external',
            externalUrl: 'https://reg.example.com/exhibition2024',
            internalPath: '',
            description: '展商参展报名入口，包含展位选择和费用支付',
            status: 'active',
            startDate: '2024-01-01',
            endDate: '2024-04-30',
            maxRegistrations: 200,
            currentRegistrations: 89,
            requireApproval: true,
            allowMultiple: false,
            createTime: '2024-01-01 09:00:00',
            updateTime: '2024-01-15 14:30:00'
        },
        {
            key: '2',
            id: 'ENT002',
            title: '2024中国城市轨道交通博览会-观众报名',
            exhibitionId: 'EX001',
            exhibitionName: '2024中国城市轨道交通博览会',
            type: 'visitor',
            linkType: 'external',
            externalUrl: 'https://visitor.example.com/exhibition2024',
            internalPath: '',
            description: '观众参观报名入口，免费参观需要预约',
            status: 'active',
            startDate: '2024-02-01',
            endDate: '2024-05-18',
            maxRegistrations: 10000,
            currentRegistrations: 3256,
            requireApproval: false,
            allowMultiple: false,
            createTime: '2024-01-01 09:30:00',
            updateTime: '2024-01-20 10:15:00'
        },
        {
            key: '3',
            id: 'ENT003',
            title: '智慧城轨技术论坛-会议报名',
            exhibitionId: 'EX002',
            exhibitionName: '2024智慧城轨技术论坛',
            type: 'conference',
            linkType: 'internal',
            externalUrl: '',
            internalPath: '/conference/registration',
            description: '技术论坛会议报名，包含主题演讲和分论坛',
            status: 'draft',
            startDate: '2024-06-01',
            endDate: '2024-08-20',
            maxRegistrations: 500,
            currentRegistrations: 0,
            requireApproval: true,
            allowMultiple: true,
            createTime: '2024-01-10 15:00:00',
            updateTime: '2024-01-10 15:00:00'
        },
        {
            key: '4',
            id: 'ENT004',
            title: '2023城轨运营管理大会-已结束',
            exhibitionId: 'EX003',
            exhibitionName: '2023城轨运营管理大会',
            type: 'conference',
            linkType: 'external',
            externalUrl: 'https://conference2023.example.com',
            internalPath: '',
            description: '2023年度运营管理大会报名（已结束）',
            status: 'closed',
            startDate: '2023-08-01',
            endDate: '2023-11-12',
            maxRegistrations: 300,
            currentRegistrations: 234,
            requireApproval: true,
            allowMultiple: false,
            createTime: '2023-08-01 08:00:00',
            updateTime: '2023-11-12 18:00:00'
        }
    ];

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(mockData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingEntrance(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingEntrance(record);
        form.setFieldsValue({
            title: record.title,
            exhibitionId: record.exhibitionId,
            type: record.type,
            linkType: record.linkType,
            externalUrl: record.externalUrl,
            internalPath: record.internalPath,
            description: record.description,
            dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
            maxRegistrations: record.maxRegistrations,
            requireApproval: record.requireApproval,
            allowMultiple: record.allowMultiple,
            status: record.status
        });
        setModalVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除报名入口"${record.title}"吗？删除后将无法恢复。`,
            onOk() {
                message.success('删除成功');
                loadData();
            }
        });
    };

    const handleStatusChange = (record, checked) => {
        const newStatus = checked ? 'active' : 'inactive';
        message.success(`已${checked ? '启用' : '禁用'}报名入口`);
        loadData();
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('提交报名入口数据:', values);
            message.success(editingEntrance ? '编辑成功' : '新增成功');
            setModalVisible(false);
            loadData();
        } catch (error) {
            console.log('表单验证失败:', error);
        }
    };

    const getTypeTag = (type) => {
        const typeMap = {
            'exhibitor': { color: 'blue', text: '展商报名' },
            'visitor': { color: 'green', text: '观众报名' },
            'conference': { color: 'purple', text: '会议报名' },
            'activity': { color: 'orange', text: '活动报名' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getLinkTypeTag = (linkType) => {
        const typeMap = {
            'external': { color: 'blue', text: '外部链接' },
            'internal': { color: 'green', text: '内部页面' }
        };
        const config = typeMap[linkType] || { color: 'default', text: linkType };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '启用中' },
            'inactive': { color: 'default', text: '已禁用' },
            'draft': { color: 'orange', text: '草稿' },
            'closed': { color: 'red', text: '已关闭' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getProgressPercent = (current, max) => {
        return max > 0 ? Math.round((current / max) * 100) : 0;
    };

    const columns = [
        {
            title: '报名入口信息',
            key: 'info',
            width: 300,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'title',
                    style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }
                }, record.title),
                React.createElement('div', { 
                    key: 'exhibition',
                    style: { fontSize: '12px', color: '#1890ff', marginBottom: '4px' }
                }, record.exhibitionName),
                React.createElement('div', { 
                    key: 'description',
                    style: { fontSize: '12px', color: '#666' }
                }, record.description)
            ])
        },
        {
            title: '类型',
            key: 'type',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                getTypeTag(record.type),
                React.createElement('div', { 
                    key: 'link',
                    style: { marginTop: '4px' }
                }, getLinkTypeTag(record.linkType))
            ])
        },
        {
            title: '链接地址',
            key: 'link',
            width: 250,
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'url',
                    style: { fontSize: '12px', wordBreak: 'break-all' }
                }, record.linkType === 'external' ? record.externalUrl : record.internalPath),
                record.linkType === 'external' && React.createElement('a', {
                    key: 'test',
                    href: record.externalUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    style: { fontSize: '12px' }
                }, '测试链接')
            ])
        },
        {
            title: '报名时间',
            key: 'dateRange',
            width: 180,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'start' }, `开始: ${record.startDate}`),
                React.createElement('div', { key: 'end' }, `结束: ${record.endDate}`)
            ])
        },
        {
            title: '报名进度',
            key: 'progress',
            width: 150,
            render: (_, record) => {
                const percent = getProgressPercent(record.currentRegistrations, record.maxRegistrations);
                return React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'numbers',
                        style: { fontSize: '12px', marginBottom: '4px' }
                    }, `${record.currentRegistrations} / ${record.maxRegistrations}`),
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
                    }))
                ]);
            }
        },
        {
            title: '设置',
            key: 'settings',
            width: 120,
            render: (_, record) => React.createElement('div', {
                style: { fontSize: '12px' }
            }, [
                React.createElement('div', { key: 'approval' }, 
                    record.requireApproval ? '需要审核' : '自动通过'
                ),
                React.createElement('div', { key: 'multiple' }, 
                    record.allowMultiple ? '允许重复' : '禁止重复'
                )
            ])
        },
        {
            title: '状态',
            key: 'status',
            width: 100,
            render: (_, record) => React.createElement('div', {}, [
                getStatusTag(record.status),
                React.createElement('div', { 
                    key: 'switch',
                    style: { marginTop: '8px' }
                }, React.createElement(Switch, {
                    size: 'small',
                    checked: record.status === 'active',
                    disabled: record.status === 'closed',
                    onChange: (checked) => handleStatusChange(record, checked)
                }))
            ])
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
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
                        navigator.clipboard.writeText(
                            record.linkType === 'external' ? record.externalUrl : record.internalPath
                        );
                        message.success('链接已复制到剪贴板');
                    }
                }, '复制链接'),
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
        React.createElement(Card, { key: 'main' }, [
            React.createElement('div', {
                key: 'header',
                style: { marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
            }, [
                React.createElement('h3', { key: 'title' }, '报名入口管理'),
                React.createElement(Space, { key: 'actions' }, [
                    React.createElement(Select, {
                        key: 'status-filter',
                        placeholder: '状态筛选',
                        style: { width: 120 },
                        allowClear: true
                    }, [
                        React.createElement(Option, { value: 'active' }, '启用中'),
                        React.createElement(Option, { value: 'inactive' }, '已禁用'),
                        React.createElement(Option, { value: 'draft' }, '草稿'),
                        React.createElement(Option, { value: 'closed' }, '已关闭')
                    ]),
                    React.createElement(Select, {
                        key: 'type-filter',
                        placeholder: '类型筛选',
                        style: { width: 120 },
                        allowClear: true
                    }, [
                        React.createElement(Option, { value: 'exhibitor' }, '展商报名'),
                        React.createElement(Option, { value: 'visitor' }, '观众报名'),
                        React.createElement(Option, { value: 'conference' }, '会议报名'),
                        React.createElement(Option, { value: 'activity' }, '活动报名')
                    ]),
                    React.createElement(Button, {
                        key: 'add',
                        type: 'primary',
                        onClick: handleAdd
                    }, '新增入口')
                ])
            ]),

            React.createElement('div', {
                key: 'description',
                style: { 
                    padding: '12px', 
                    background: '#e6f7ff', 
                    border: '1px solid #91d5ff',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }
            }, '报名入口管理用于维护APP中的各类报名链接。支持外部第三方平台跳转和内部页面导航，可设置报名时间、人数限制等参数。'),

            React.createElement(Table, {
                key: 'table',
                columns,
                dataSource: data,
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
            title: editingEntrance ? '编辑报名入口' : '新增报名入口',
            open: modalVisible,
            onOk: handleModalOk,
            onCancel: () => setModalVisible(false),
            width: 800
        }, React.createElement(Form, {
            form,
            layout: 'vertical'
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { span: 16 }, 
                    React.createElement(Form.Item, {
                        label: '入口标题',
                        name: 'title',
                        rules: [{ required: true, message: '请输入入口标题' }]
                    }, React.createElement(Input, { placeholder: '请输入报名入口标题' }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '状态',
                        name: 'status',
                        rules: [{ required: true, message: '请选择状态' }]
                    }, React.createElement(Select, { placeholder: '请选择状态' }, [
                        React.createElement(Option, { value: 'active' }, '启用中'),
                        React.createElement(Option, { value: 'inactive' }, '已禁用'),
                        React.createElement(Option, { value: 'draft' }, '草稿')
                    ]))
                )
            ]),

            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '关联展会',
                        name: 'exhibitionId',
                        rules: [{ required: true, message: '请选择关联展会' }]
                    }, React.createElement(Select, { placeholder: '请选择展会' }, [
                        React.createElement(Option, { value: 'EX001' }, '2024中国城市轨道交通博览会'),
                        React.createElement(Option, { value: 'EX002' }, '2024智慧城轨技术论坛'),
                        React.createElement(Option, { value: 'EX003' }, '2023城轨运营管理大会')
                    ]))
                ),
                React.createElement(Col, { span: 12 }, 
                    React.createElement(Form.Item, {
                        label: '报名类型',
                        name: 'type',
                        rules: [{ required: true, message: '请选择报名类型' }]
                    }, React.createElement(Select, { placeholder: '请选择类型' }, [
                        React.createElement(Option, { value: 'exhibitor' }, '展商报名'),
                        React.createElement(Option, { value: 'visitor' }, '观众报名'),
                        React.createElement(Option, { value: 'conference' }, '会议报名'),
                        React.createElement(Option, { value: 'activity' }, '活动报名')
                    ]))
                )
            ]),

            React.createElement(Form.Item, {
                key: 'linkType',
                label: '链接类型',
                name: 'linkType',
                rules: [{ required: true, message: '请选择链接类型' }]
            }, React.createElement(Select, { 
                placeholder: '请选择链接类型',
                onChange: (value) => {
                    // 清空相关字段
                    if (value === 'external') {
                        form.setFieldsValue({ internalPath: '' });
                    } else {
                        form.setFieldsValue({ externalUrl: '' });
                    }
                }
            }, [
                React.createElement(Option, { value: 'external' }, '外部链接 - 跳转到第三方平台'),
                React.createElement(Option, { value: 'internal' }, '内部页面 - 系统内部导航')
            ])),

            React.createElement(Form.Item, {
                key: 'externalUrl',
                noStyle: true
            }, React.createElement(Form.Item, {
                shouldUpdate: (prevValues, currentValues) => 
                    prevValues.linkType !== currentValues.linkType
            }, ({ getFieldValue }) => {
                const linkType = getFieldValue('linkType');
                return linkType === 'external' ? React.createElement(Form.Item, {
                    label: '外部链接地址',
                    name: 'externalUrl',
                    rules: [
                        { required: true, message: '请输入外部链接地址' },
                        { type: 'url', message: '请输入有效的URL地址' }
                    ]
                }, React.createElement(Input, { 
                    placeholder: 'https://example.com/registration',
                    addonBefore: '🔗'
                })) : null;
            })),

            React.createElement(Form.Item, {
                key: 'internalPath',
                noStyle: true
            }, React.createElement(Form.Item, {
                shouldUpdate: (prevValues, currentValues) => 
                    prevValues.linkType !== currentValues.linkType
            }, ({ getFieldValue }) => {
                const linkType = getFieldValue('linkType');
                return linkType === 'internal' ? React.createElement(Form.Item, {
                    label: '内部页面路径',
                    name: 'internalPath',
                    rules: [{ required: true, message: '请输入内部页面路径' }]
                }, React.createElement(Input, { 
                    placeholder: '/registration/form',
                    addonBefore: '📄'
                })) : null;
            })),

            React.createElement(Form.Item, {
                key: 'dateRange',
                label: '报名时间',
                name: 'dateRange',
                rules: [{ required: true, message: '请选择报名时间' }]
            }, React.createElement(RangePicker, { 
                style: { width: '100%' },
                showTime: true
            })),

            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '最大报名数',
                        name: 'maxRegistrations',
                        rules: [{ required: true, message: '请输入最大报名数' }]
                    }, React.createElement(Input, { 
                        type: 'number',
                        placeholder: '0表示不限制',
                        min: 0
                    }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '需要审核',
                        name: 'requireApproval',
                        valuePropName: 'checked'
                    }, React.createElement(Switch, { 
                        checkedChildren: '是',
                        unCheckedChildren: '否'
                    }))
                ),
                React.createElement(Col, { span: 8 }, 
                    React.createElement(Form.Item, {
                        label: '允许重复报名',
                        name: 'allowMultiple',
                        valuePropName: 'checked'
                    }, React.createElement(Switch, { 
                        checkedChildren: '是',
                        unCheckedChildren: '否'
                    }))
                )
            ]),

            React.createElement(Form.Item, {
                key: 'description',
                label: '入口描述',
                name: 'description'
            }, React.createElement(TextArea, { 
                rows: 3,
                placeholder: '请输入报名入口的详细描述'
            }))
        ]))
    ]);
};

window.RegistrationEntrance = RegistrationEntrance; 