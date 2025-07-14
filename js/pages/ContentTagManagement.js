// 内容标签管理组件 - 产品标签功能版本
const ContentTagManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Switch } = antd;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingTag, setEditingTag] = React.useState(null);
    const [form] = Form.useForm();
    
    // 数据结构支持树状结构和产品标签属性
    const mockTags = [
        { id: 1, name: '产品标签', category: '产品', description: '产品标签根分类', color: '#722ed1', usageCount: 0, status: 'enabled', createTime: '2024-01-10 10:00:00', parentId: null, isProductTag: true },
        { id: 2, name: '轨道车辆', category: '产品', description: '轨道车辆相关产品', color: '#1890ff', usageCount: 120, status: 'enabled', createTime: '2024-01-11 11:00:00', parentId: 1, isProductTag: true },
        { id: 3, name: '信号系统', category: '产品', description: '信号系统相关产品', color: '#52c41a', usageCount: 80, status: 'enabled', createTime: '2024-01-12 12:00:00', parentId: 1, isProductTag: true },
        { id: 4, name: '技术创新', category: '技术', description: '技术创新内容', color: '#faad14', usageCount: 980, status: 'enabled', createTime: '2024-01-14 16:20:00', parentId: null, isProductTag: false },
        { id: 5, name: '政策法规', category: '资讯', description: '政策法规解读', color: '#f5222d', usageCount: 650, status: 'enabled', createTime: '2024-01-13 09:15:00', parentId: null, isProductTag: false }
    ];
    
    React.useEffect(() => {
        loadTags();
    }, []);
    
    const loadTags = () => {
        setLoading(true);
        setTimeout(() => {
            setTags(mockTags);
            setLoading(false);
        }, 1000);
    };
    
    // 树形结构转换
    const buildTree = (list, parentId = null) =>
        list.filter(item => item.parentId === parentId).map(item => ({
            ...item,
            children: buildTree(list, item.id)
        }));
    
    // 定义 getStatusTag 函数（在 columns 之前）
    const getStatusTag = (status) => {
        return React.createElement(Tag, {
            color: status === 'enabled' ? 'green' : 'default'
        }, status === 'enabled' ? '启用' : '禁用');
    };
    
    // 表格列定义
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            render: (text, record) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement(Tag, {
                    key: 'tag',
                    color: record.color
                }, text),
                record.isProductTag && React.createElement(Tag, {
                    key: 'product-badge',
                    color: 'purple',
                    size: 'small'
                }, '产品')
            ])
        },
        {
            title: '分类',
            dataIndex: 'category'
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '颜色',
            dataIndex: 'color',
            render: (color) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement('div', {
                    key: 'color',
                    style: { 
                        width: 20, 
                        height: 20, 
                        backgroundColor: color, 
                        borderRadius: '4px',
                        border: '1px solid #d9d9d9'
                    }
                }),
                React.createElement('span', { key: 'text' }, color)
            ])
        },
        {
            title: '使用次数',
            dataIndex: 'usageCount',
            sorter: (a, b) => a.usageCount - b.usageCount
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: getStatusTag
        },
        {
            title: '创建时间',
            dataIndex: 'createTime'
        },
        {
            title: '操作',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'toggle',
                    type: 'link',
                    size: 'small',
                    onClick: () => toggleStatus(record)
                }, record.status === 'enabled' ? '禁用' : '启用'),
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
    
    const handleSubmit = (values) => {
        const parentTag = tags.find(t => t.id === values.parentId);
        const isProductTag = parentTag ? parentTag.isProductTag : (values.isProductTag || false);
        
        const tagData = {
            ...values,
            isProductTag,
            id: editingTag ? editingTag.id : Date.now(),
            createTime: editingTag ? editingTag.createTime : new Date().toISOString(),
            usageCount: editingTag ? editingTag.usageCount : 0,
            status: 'enabled'
        };
        
        console.log('保存标签数据:', tagData);
        message.success(editingTag ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadTags();
    };
    
    const handleEdit = (record) => {
        setEditingTag(record);
        form.setFieldsValue({
            ...record,
            parentId: record.parentId || undefined
        });
        setModalVisible(true);
    };
    
    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除标签"${record.name}"吗？`,
            onOk: () => {
                message.success('删除成功');
                loadTags();
            }
        });
    };
    
    const toggleStatus = (record) => {
        const newStatus = record.status === 'enabled' ? 'disabled' : 'enabled';
        message.success(`标签已${newStatus === 'enabled' ? '启用' : '禁用'}`);
        loadTags();
    };
    
    const handleAdd = () => {
        setEditingTag(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleParentChange = (parentId) => {
        const parentTag = tags.find(t => t.id === parentId);
        if (parentTag && parentTag.isProductTag) {
            form.setFieldsValue({ isProductTag: true });
        }
    };
    
    const getTopLevelTags = () => {
        return tags.filter(t => !t.parentId);
    };
    
    const currentParentId = Form.useWatch('parentId', form);
    const currentParent = tags.find(t => t.id === currentParentId);
    const isParentProductTag = currentParent && currentParent.isProductTag;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '内容标签管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '维护平台内容标签体系，支持产品标签分类和树形结构')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '标签总数',
                        value: tags.length
                    })
                )
            ),
            React.createElement(Col, { key: 'enabled', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '启用标签',
                        value: tags.filter(t => t.status === 'enabled').length,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'product', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '产品标签',
                        value: tags.filter(t => t.isProductTag).length,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { key: 'usage', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均使用次数',
                        value: Math.round(tags.reduce((sum, t) => sum + t.usageCount, 0) / tags.length || 0)
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
            }, '新建标签'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadTags
            }, '刷新')
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: buildTree(tags),
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            },
            expandable: {
                defaultExpandAllRows: true
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingTag ? '编辑标签' : '新建标签',
            visible: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            footer: null,
            width: 600
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleSubmit
        }, [
            React.createElement(Form.Item, {
                key: 'name',
                name: 'name',
                label: '标签名称',
                rules: [{ required: true, message: '请输入标签名称' }]
            }, React.createElement(Input, {
                placeholder: '请输入标签名称'
            })),
            
            React.createElement(Form.Item, {
                key: 'category',
                name: 'category',
                label: '分类',
                rules: [{ required: true, message: '请选择分类' }]
            }, React.createElement(Select, {
                placeholder: '请选择分类'
            }, [
                React.createElement(Option, { key: 'product', value: '产品' }, '产品'),
                React.createElement(Option, { key: 'tech', value: '技术' }, '技术'),
                React.createElement(Option, { key: 'news', value: '资讯' }, '资讯'),
                React.createElement(Option, { key: 'activity', value: '活动' }, '活动'),
                React.createElement(Option, { key: 'other', value: '其他' }, '其他')
            ])),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '描述'
            }, React.createElement(Input.TextArea, {
                rows: 3,
                placeholder: '请输入标签描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'color',
                name: 'color',
                label: '颜色',
                rules: [{ required: true, message: '请选择颜色' }]
            }, React.createElement(Input, {
                type: 'color',
                style: { width: '100%', height: '40px' }
            })),
            
            React.createElement(Form.Item, {
                key: 'parentId',
                name: 'parentId',
                label: '父级标签'
            }, React.createElement(Select, {
                placeholder: '请选择父级标签（可选）',
                allowClear: true,
                onChange: handleParentChange
            }, getTopLevelTags().map(tag => 
                React.createElement(Option, { key: tag.id, value: tag.id }, tag.name)
            ))),
            
            React.createElement(Form.Item, {
                key: 'isProductTag',
                name: 'isProductTag',
                label: '是否为产品标签',
                valuePropName: 'checked'
            }, React.createElement('div', {}, [
                React.createElement(Switch, {
                    key: 'switch',
                    disabled: isParentProductTag
                }),
                isParentProductTag && React.createElement('div', {
                    key: 'hint',
                    style: { marginTop: 8, color: '#8c8c8c', fontSize: '12px' }
                }, '父级为产品标签时，子标签自动继承产品属性')
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

window.ContentTagManagement = ContentTagManagement; 