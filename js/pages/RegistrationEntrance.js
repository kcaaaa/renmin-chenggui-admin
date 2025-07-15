// RegistrationEntrance.js - 报名入口配置管理
// 用于配置APP端报名入口的外部链接和报名活动

function RegistrationEntrance() {
    const { useState, useEffect } = React;
    const { Card, Table, Button, Modal, Form, Input, Select, Space, message, Popconfirm, Tag } = antd;
    const { Column } = Table;

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    // 模拟数据
    const mockData = [
        {
            id: 1,
            name: '2024中国城市轨道交通展观众报名',
            type: 'visitor',
            linkType: 'external',
            externalUrl: 'https://reg.example.com/visitor-2024',
            status: 'active',
            description: '面向专业观众的展会参观报名',
            createTime: '2024-01-10 09:00:00',
            updateTime: '2024-01-15 14:30:00'
        },
        {
            id: 2,
            name: '2024展商参展报名',
            type: 'exhibitor',
            linkType: 'external',
            externalUrl: 'https://exhibitor.example.com/apply-2024',
            status: 'active',
            description: '企业参展商报名申请',
            createTime: '2024-01-08 10:00:00',
            updateTime: '2024-01-12 16:45:00'
        },
        {
            id: 3,
            name: '高峰论坛参会报名',
            type: 'conference',
            linkType: 'external',
            externalUrl: 'https://forum.example.com/summit-2024',
            status: 'active',
            description: '城轨发展高峰论坛参会报名',
            createTime: '2024-01-05 15:00:00',
            updateTime: '2024-01-10 11:20:00'
        }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        // 模拟API调用
        setTimeout(() => {
            setDataSource(mockData);
            setLoading(false);
        }, 500);
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id));
        message.success('删除成功');
    };

    const handleSubmit = (values) => {
        const now = new Date().toLocaleString('zh-CN');
        
        if (editingRecord) {
            // 编辑
            setDataSource(dataSource.map(item => 
                item.id === editingRecord.id 
                    ? { ...item, ...values, updateTime: now }
                    : item
            ));
            message.success('修改成功');
        } else {
            // 新增
            const newRecord = {
                id: Date.now(),
                ...values,
                createTime: now,
                updateTime: now
            };
            setDataSource([...dataSource, newRecord]);
            message.success('添加成功');
        }
        
        setModalVisible(false);
        form.resetFields();
    };

    const handleStatusChange = (record) => {
        const newStatus = record.status === 'active' ? 'inactive' : 'active';
        setDataSource(dataSource.map(item => 
            item.id === record.id 
                ? { ...item, status: newStatus, updateTime: new Date().toLocaleString('zh-CN') }
                : item
        ));
        message.success(`已${newStatus === 'active' ? '启用' : '停用'}`);
    };

    const getTypeTag = (type) => {
        const typeMap = {
            visitor: { color: 'blue', text: '观众报名' },
            exhibitor: { color: 'green', text: '展商报名' },
            conference: { color: 'purple', text: '会议报名' },
            other: { color: 'default', text: '其他' }
        };
        const config = typeMap[type] || typeMap.other;
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getStatusTag = (status) => {
        return React.createElement(Tag, { 
            color: status === 'active' ? 'success' : 'default' 
        }, status === 'active' ? '启用' : '停用');
    };

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Card, {
            title: '报名入口配置',
            extra: React.createElement(Button, {
                type: 'primary',
                onClick: handleAdd
            }, '新增报名入口')
        },
            React.createElement('div', { style: { marginBottom: 16, padding: 16, background: '#f6f8fa', borderRadius: 8 } },
                React.createElement('h4', { style: { margin: '0 0 8px 0', color: '#1890ff' } }, '功能说明'),
                React.createElement('p', { style: { margin: 0, color: '#666' } }, 
                    '此功能用于配置APP端展会板块的报名入口。配置完成后，用户在APP端点击"报名入口"将跳转到对应的外部报名平台。支持观众报名、展商报名、会议报名等多种类型。'
                )
            ),
            
            React.createElement(Table, {
                dataSource: dataSource,
                loading: loading,
                rowKey: 'id',
                pagination: {
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            },
                React.createElement(Column, {
                    title: '报名名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 200
                }),
                React.createElement(Column, {
                    title: '报名类型',
                    dataIndex: 'type',
                    key: 'type',
                    width: 120,
                    render: (type) => getTypeTag(type)
                }),
                React.createElement(Column, {
                    title: '外部链接',
                    dataIndex: 'externalUrl',
                    key: 'externalUrl',
                    width: 300,
                    render: (url) => React.createElement('a', {
                        href: url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        style: { color: '#1890ff' }
                    }, url)
                }),
                React.createElement(Column, {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 100,
                    render: (status) => getStatusTag(status)
                }),
                React.createElement(Column, {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                    ellipsis: true
                }),
                React.createElement(Column, {
                    title: '更新时间',
                    dataIndex: 'updateTime',
                    key: 'updateTime',
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
                        React.createElement(Button, {
                            type: 'link',
                            size: 'small',
                            onClick: () => handleStatusChange(record)
                        }, record.status === 'active' ? '停用' : '启用'),
                        React.createElement(Popconfirm, {
                            title: '确定要删除这个报名入口吗？',
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

        React.createElement(Modal, {
            title: editingRecord ? '编辑报名入口' : '新增报名入口',
            open: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            onOk: () => form.submit(),
            width: 600
        },
            React.createElement(Form, {
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit
            },
                React.createElement(Form.Item, {
                    name: 'name',
                    label: '报名名称',
                    rules: [{ required: true, message: '请输入报名名称' }]
                },
                    React.createElement(Input, { placeholder: '请输入报名名称' })
                ),
                React.createElement(Form.Item, {
                    name: 'type',
                    label: '报名类型',
                    rules: [{ required: true, message: '请选择报名类型' }]
                },
                    React.createElement(Select, { placeholder: '请选择报名类型' },
                        React.createElement(Select.Option, { value: 'visitor' }, '观众报名'),
                        React.createElement(Select.Option, { value: 'exhibitor' }, '展商报名'),
                        React.createElement(Select.Option, { value: 'conference' }, '会议报名'),
                        React.createElement(Select.Option, { value: 'other' }, '其他')
                    )
                ),
                React.createElement(Form.Item, {
                    name: 'externalUrl',
                    label: '外部报名链接',
                    rules: [
                        { required: true, message: '请输入外部报名链接' },
                        { type: 'url', message: '请输入有效的URL地址' }
                    ]
                },
                    React.createElement(Input, { 
                        placeholder: '请输入外部报名平台链接，如：https://reg.example.com/apply' 
                    })
                ),
                React.createElement(Form.Item, {
                    name: 'description',
                    label: '描述说明'
                },
                    React.createElement(Input.TextArea, { 
                        placeholder: '请输入报名入口的描述说明',
                        rows: 3
                    })
                ),
                React.createElement(Form.Item, {
                    name: 'status',
                    label: '状态',
                    initialValue: 'active'
                },
                    React.createElement(Select, null,
                        React.createElement(Select.Option, { value: 'active' }, '启用'),
                        React.createElement(Select.Option, { value: 'inactive' }, '停用')
                    )
                )
            )
        )
    );
}

// 注册到全局
window.RegistrationEntrance = RegistrationEntrance; 