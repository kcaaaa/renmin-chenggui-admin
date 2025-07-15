// BusinessMatching.js - 商务配对
// 展商可发布供需信息，助力商业合作达成

function BusinessMatching() {
    const { useState, useEffect } = React;
    const { Card, Table, Button, Modal, Form, Input, Select, Space, message, Popconfirm, Tag, Divider } = antd;
    const { Column } = Table;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    // 模拟供需信息数据
    const mockData = [
        {
            id: 1,
            companyName: '北京城轨科技有限公司',
            companyIntro: '专业从事城市轨道交通智能化解决方案的研发与实施。',
            publishTime: '2024-01-15 10:30:00',
            publisher: '张经理',
            publisherPhone: '13800138000',
            publisherEmail: 'zhang@example.com',
            targetCompany: '上海地铁运营有限公司',
            negotiationContent: '我们希望与贵公司在智能信号系统领域建立合作关系，可以提供完整的技术解决方案和维护服务。',
            type: 'supply', // supply 供应, demand 需求
            status: 'published' // published 已发布, reviewing 审核中
        },
        {
            id: 2,
            companyName: '北京城轨科技有限公司',
            companyIntro: '专业从事城市轨道交通智能化解决方案的研发与实施。',
            publishTime: '2024-01-12 14:20:00',
            publisher: '李总监',
            publisherPhone: '13900139000',
            publisherEmail: 'li@example.com',
            targetCompany: '',
            negotiationContent: '我们正在寻找轨道交通综合监控平台的合作伙伴，希望能够集成视频监控、环境监测等多项功能。',
            type: 'demand',
            status: 'published'
        }
    ];

    // 模拟系统中的公司列表
    const mockCompanies = [
        '上海地铁运营有限公司',
        '北京地铁运营有限公司',
        '广州地铁集团有限公司',
        '深圳市地铁集团有限公司',
        '成都地铁运营有限公司'
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        setTimeout(() => {
            setDataSource(mockData);
            setLoading(false);
        }, 500);
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        // 设置默认值
        form.setFieldsValue({
            companyName: '北京城轨科技有限公司',
            companyIntro: '专业从事城市轨道交通智能化解决方案的研发与实施。',
            publisher: '张经理',
            publisherPhone: '13800138000',
            publisherEmail: 'zhang@example.com'
        });
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleSubmit = (values) => {
        const now = new Date().toLocaleString('zh-CN');
        
        if (editingRecord) {
            setDataSource(dataSource.map(item => 
                item.id === editingRecord.id 
                    ? { ...item, ...values, updateTime: now }
                    : item
            ));
            message.success('修改成功！已提交审核');
        } else {
            const newRecord = {
                id: Date.now(),
                ...values,
                publishTime: now,
                status: 'reviewing'
            };
            setDataSource([...dataSource, newRecord]);
            message.success('发布成功！已提交审核');
        }
        
        setModalVisible(false);
        form.resetFields();
    };

    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id));
        message.success('删除成功');
    };

    const getTypeTag = (type) => {
        return React.createElement(Tag, { 
            color: type === 'supply' ? 'green' : 'blue' 
        }, type === 'supply' ? '供应信息' : '需求信息');
    };

    const getStatusTag = (status) => {
        const statusMap = {
            published: { color: 'success', text: '已发布' },
            reviewing: { color: 'warning', text: '审核中' },
            rejected: { color: 'error', text: '已驳回' }
        };
        const config = statusMap[status] || statusMap.reviewing;
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Card, {
            title: '商务配对',
            extra: React.createElement(Button, {
                type: 'primary',
                onClick: handleAdd
            }, '发布供需信息')
        },
            React.createElement('div', { style: { marginBottom: 16, padding: 16, background: '#f6f8fa', borderRadius: 8 } },
                React.createElement('h4', { style: { margin: '0 0 8px 0', color: '#1890ff' } }, '功能说明'),
                React.createElement('p', { style: { margin: 0, color: '#666' } }, 
                    '您可以在此发布供应或需求信息，寻找合作伙伴。发布的信息将在APP端商务配对板块展示，帮助您与其他展商建立业务联系。信息发布后需要审核，审核通过后正式展示。'
                )
            ),
            
            React.createElement(Table, {
                dataSource: dataSource,
                loading: loading,
                rowKey: 'id',
                pagination: { pageSize: 10 },
                expandable: {
                    expandedRowRender: (record) => React.createElement('div', { style: { padding: 16 } },
                        React.createElement('h4', { style: { marginBottom: 8 } }, '洽谈内容'),
                        React.createElement('p', { style: { margin: 0, lineHeight: '1.6' } }, record.negotiationContent)
                    ),
                    rowExpandable: (record) => !!record.negotiationContent
                }
            },
                React.createElement(Column, {
                    title: '信息类型',
                    dataIndex: 'type',
                    key: 'type',
                    width: 120,
                    render: (type) => getTypeTag(type)
                }),
                React.createElement(Column, {
                    title: '发布人',
                    dataIndex: 'publisher',
                    key: 'publisher',
                    width: 100
                }),
                React.createElement(Column, {
                    title: '联系方式',
                    key: 'contact',
                    width: 200,
                    render: (_, record) => React.createElement('div', null,
                        React.createElement('div', null, `手机：${record.publisherPhone}`),
                        React.createElement('div', null, `邮箱：${record.publisherEmail}`)
                    )
                }),
                React.createElement(Column, {
                    title: '想约见公司',
                    dataIndex: 'targetCompany',
                    key: 'targetCompany',
                    width: 200,
                    render: (company) => company || React.createElement('span', { style: { color: '#999' } }, '未指定')
                }),
                React.createElement(Column, {
                    title: '发布状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (status) => getStatusTag(status)
                }),
                React.createElement(Column, {
                    title: '发布时间',
                    dataIndex: 'publishTime',
                    key: 'publishTime',
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
                            title: '确定要删除这条供需信息吗？',
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

        // 发布/编辑Modal
        React.createElement(Modal, {
            title: editingRecord ? '编辑供需信息' : '发布供需信息',
            open: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            onOk: () => form.submit(),
            width: 800
        },
            React.createElement(Form, {
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit
            },
                React.createElement(Form.Item, {
                    name: 'type',
                    label: '信息类型',
                    rules: [{ required: true, message: '请选择信息类型' }]
                },
                    React.createElement(Select, { placeholder: '请选择信息类型' },
                        React.createElement(Select.Option, { value: 'supply' }, '供应信息'),
                        React.createElement(Select.Option, { value: 'demand' }, '需求信息')
                    )
                ),

                React.createElement(Divider, { children: '公司信息' }),

                React.createElement(Form.Item, {
                    name: 'companyName',
                    label: '发布公司名称',
                    rules: [{ required: true, message: '请输入公司名称' }]
                },
                    React.createElement(Input, { 
                        placeholder: '请输入公司名称',
                        disabled: true,
                        style: { background: '#f5f5f5' }
                    })
                ),

                React.createElement(Form.Item, {
                    name: 'companyIntro',
                    label: '公司介绍',
                    rules: [{ required: true, message: '请输入公司介绍' }]
                },
                    React.createElement(TextArea, { 
                        rows: 3,
                        placeholder: '请简要介绍贵公司的业务范围和优势',
                        showCount: true,
                        maxLength: 200
                    })
                ),

                React.createElement(Divider, { children: '联系信息' }),

                React.createElement('div', { style: { display: 'flex', gap: 16 } },
                    React.createElement('div', { style: { flex: 1 } },
                        React.createElement(Form.Item, {
                            name: 'publisher',
                            label: '发布人',
                            rules: [{ required: true, message: '请输入发布人姓名' }]
                        },
                            React.createElement(Input, { placeholder: '请输入发布人姓名' })
                        )
                    ),
                    React.createElement('div', { style: { flex: 1 } },
                        React.createElement(Form.Item, {
                            name: 'publisherPhone',
                            label: '联系电话',
                            rules: [{ required: true, message: '请输入联系电话' }]
                        },
                            React.createElement(Input, { 
                                placeholder: '请输入联系电话',
                                disabled: true,
                                style: { background: '#f5f5f5' }
                            })
                        )
                    )
                ),

                React.createElement(Form.Item, {
                    name: 'publisherEmail',
                    label: '联系邮箱',
                    rules: [
                        { required: true, message: '请输入联系邮箱' },
                        { type: 'email', message: '请输入有效的邮箱地址' }
                    ]
                },
                    React.createElement(Input, { placeholder: '请输入联系邮箱' })
                ),

                React.createElement(Form.Item, {
                    name: 'targetCompany',
                    label: '想约见公司',
                    help: '非必选，如果您希望与特定公司洽谈，可以选择该公司'
                },
                    React.createElement(Select, { 
                        placeholder: '请选择想约见的公司（可留空）',
                        allowClear: true,
                        showSearch: true,
                        filterOption: (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    },
                        mockCompanies.map(company => 
                            React.createElement(Select.Option, { 
                                key: company, 
                                value: company 
                            }, company)
                        )
                    )
                ),

                React.createElement(Divider, { children: '洽谈内容' }),

                React.createElement(Form.Item, {
                    name: 'negotiationContent',
                    label: '洽谈内容',
                    rules: [{ required: true, message: '请输入洽谈内容' }]
                },
                    React.createElement(TextArea, { 
                        rows: 5,
                        placeholder: '请详细描述您的需求或供应内容，包括具体的产品/服务、合作方式、技术要求等',
                        showCount: true,
                        maxLength: 500
                    })
                )
            )
        )
    );
}

// 注册到全局
window.BusinessMatching = BusinessMatching; 