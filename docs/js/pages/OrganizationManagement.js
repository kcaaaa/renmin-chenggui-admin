// 组织管理组件
const OrganizationManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Tree, Transfer } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [organizations, setOrganizations] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [memberModalVisible, setMemberModalVisible] = React.useState(false);
    const [editingOrganization, setEditingOrganization] = React.useState(null);
    const [currentOrg, setCurrentOrg] = React.useState(null);
    const [form] = Form.useForm();
    const [targetKeys, setTargetKeys] = React.useState([]);
    
    // 模拟组织数据
    const mockOrganizations = [
        {
            id: 1,
            name: '总公司',
            code: 'HQ',
            type: 'company',
            level: 1,
            parentId: null,
            status: 'active',
            manager: '张总',
            memberCount: 156,
            description: '人民城轨集团总公司',
            address: '北京市朝阳区建国路88号',
            phone: '010-12345678',
            email: 'hq@example.com',
            createTime: '2024-01-01 10:00:00',
            children: [
                {
                    id: 11,
                    name: '技术部',
                    code: 'TECH',
                    type: 'department',
                    level: 2,
                    parentId: 1,
                    status: 'active',
                    manager: '李部长',
                    memberCount: 45,
                    description: '负责技术研发和系统维护'
                },
                {
                    id: 12,
                    name: '运营部',
                    code: 'OPS',
                    type: 'department',
                    level: 2,
                    parentId: 1,
                    status: 'active',
                    manager: '王部长',
                    memberCount: 38,
                    description: '负责日常运营管理'
                }
            ]
        },
        {
            id: 2,
            name: '北京分公司',
            code: 'BJ',
            type: 'branch',
            level: 1,
            parentId: null,
            status: 'active',
            manager: '赵总',
            memberCount: 89,
            description: '北京地区分公司',
            address: '北京市海淀区中关村大街1号',
            phone: '010-87654321',
            email: 'beijing@example.com',
            createTime: '2024-01-02 11:00:00',
            children: [
                {
                    id: 21,
                    name: '工程部',
                    code: 'ENG',
                    type: 'department',
                    level: 2,
                    parentId: 2,
                    status: 'active',
                    manager: '刘部长',
                    memberCount: 32,
                    description: '负责工程建设和项目管理'
                }
            ]
        },
        {
            id: 3,
            name: '上海分公司',
            code: 'SH',
            type: 'branch',
            level: 1,
            parentId: null,
            status: 'inactive',
            manager: '陈总',
            memberCount: 67,
            description: '上海地区分公司',
            address: '上海市浦东新区世纪大道100号',
            phone: '021-12345678',
            email: 'shanghai@example.com',
            createTime: '2024-01-03 12:00:00',
            children: []
        }
    ];
    
    // 模拟用户数据
    const mockUsers = [
        { key: 'user1', title: '张三 - 工程师' },
        { key: 'user2', title: '李四 - 项目经理' },
        { key: 'user3', title: '王五 - 技术总监' },
        { key: 'user4', title: '赵六 - 产品经理' },
        { key: 'user5', title: '钱七 - 设计师' },
        { key: 'user6', title: '孙八 - 测试工程师' }
    ];
    
    React.useEffect(() => {
        loadOrganizations();
    }, []);
    
    const loadOrganizations = () => {
        setLoading(true);
        setTimeout(() => {
            setOrganizations(mockOrganizations);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '启用' },
            'inactive': { color: 'default', text: '停用' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'company': { color: 'blue', text: '公司' },
            'branch': { color: 'green', text: '分公司' },
            'department': { color: 'orange', text: '部门' },
            'team': { color: 'purple', text: '团队' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '组织名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => React.createElement('div', {
                style: { paddingLeft: `${(record.level - 1) * 20}px` }
            }, [
                record.level > 1 && React.createElement('span', { 
                    key: 'prefix', 
                    style: { color: '#ccc', marginRight: '8px' } 
                }, '├─'),
                React.createElement('span', { key: 'name', style: { fontWeight: 'bold' } }, name),
                React.createElement('span', { key: 'code', style: { color: '#8c8c8c', marginLeft: '8px' } }, `(${record.code})`)
            ])
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '负责人',
            dataIndex: 'manager',
            key: 'manager'
        },
        {
            title: '人员数量',
            dataIndex: 'memberCount',
            key: 'memberCount',
            render: (count) => React.createElement('span', { style: { color: '#1890ff' } }, count)
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
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
                    key: 'members',
                    type: 'link',
                    size: 'small',
                    onClick: () => manageMembers(record)
                }, '成员管理'),
                React.createElement(Button, {
                    key: 'add-child',
                    type: 'link',
                    size: 'small',
                    onClick: () => addChild(record)
                }, '添加子组织'),
                React.createElement(Button, {
                    key: 'delete',
                    type: 'link',
                    size: 'small',
                    danger: true,
                    onClick: () => deleteOrganization(record)
                }, '删除')
            ])
        }
    ];
    
    // 将树形数据转换为表格数据
    const flattenOrganizations = (organizations) => {
        const result = [];
        const traverse = (items) => {
            items.forEach(item => {
                result.push(item);
                if (item.children && item.children.length > 0) {
                    traverse(item.children);
                }
            });
        };
        traverse(organizations);
        return result;
    };
    
    const handleAdd = () => {
        setEditingOrganization(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingOrganization(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const addChild = (parent) => {
        setEditingOrganization(null);
        form.resetFields();
        form.setFieldsValue({
            parentId: parent.id,
            level: parent.level + 1,
            type: parent.type === 'company' ? 'department' : 'team'
        });
        setModalVisible(true);
    };
    
    const manageMembers = (record) => {
        setCurrentOrg(record);
        setTargetKeys([]);
        setMemberModalVisible(true);
    };
    
    const deleteOrganization = (record) => {
        Modal.confirm({
            title: '删除组织',
            content: `确定要删除组织 ${record.name} 吗？`,
            onOk: () => {
                message.success('删除成功');
                loadOrganizations();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存组织:', values);
        message.success(editingOrganization ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadOrganizations();
    };
    
    const handleMemberChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };
    
    const saveMembers = () => {
        console.log('保存成员:', { orgId: currentOrg.id, members: targetKeys });
        message.success('成员保存成功');
        setMemberModalVisible(false);
        loadOrganizations();
    };
    
    const flatOrganizations = flattenOrganizations(organizations);
    const totalOrganizations = flatOrganizations.length;
    const activeOrganizations = flatOrganizations.filter(o => o.status === 'active').length;
    const totalMembers = flatOrganizations.reduce((sum, o) => sum + o.memberCount, 0);
    const avgMembers = totalOrganizations > 0 ? (totalMembers / totalOrganizations).toFixed(1) : 0;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '组织管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理组织架构和人员分配')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总组织数',
                        value: totalOrganizations
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '启用组织',
                        value: activeOrganizations,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'members', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总人员数',
                        value: totalMembers,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'avg', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均人员数',
                        value: avgMembers,
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
            }, '新建组织'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadOrganizations
            }, '刷新'),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '类型筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'company', value: 'company' }, '公司'),
                React.createElement(Option, { key: 'branch', value: 'branch' }, '分公司'),
                React.createElement(Option, { key: 'department', value: 'department' }, '部门'),
                React.createElement(Option, { key: 'team', value: 'team' }, '团队')
            ]),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '启用'),
                React.createElement(Option, { key: 'inactive', value: 'inactive' }, '停用')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: flatOrganizations,
            rowKey: 'id',
            loading: loading,
            pagination: false,
            defaultExpandAllRows: true
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingOrganization ? '编辑组织' : '新建组织',
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
                        label: '组织名称',
                        rules: [{ required: true, message: '请输入组织名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入组织名称'
                    }))
                ),
                React.createElement(Col, { key: 'code', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'code',
                        label: '组织代码',
                        rules: [{ required: true, message: '请输入组织代码' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入组织代码'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'type', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '组织类型',
                        rules: [{ required: true, message: '请选择组织类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择组织类型'
                    }, [
                        React.createElement(Option, { key: 'company', value: 'company' }, '公司'),
                        React.createElement(Option, { key: 'branch', value: 'branch' }, '分公司'),
                        React.createElement(Option, { key: 'department', value: 'department' }, '部门'),
                        React.createElement(Option, { key: 'team', value: 'team' }, '团队')
                    ]))
                ),
                React.createElement(Col, { key: 'manager', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'manager',
                        label: '负责人',
                        rules: [{ required: true, message: '请输入负责人' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入负责人'
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
                        React.createElement(Option, { key: 'active', value: 'active' }, '启用'),
                        React.createElement(Option, { key: 'inactive', value: 'inactive' }, '停用')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'phone', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '联系电话'
                    }, React.createElement(Input, {
                        placeholder: '请输入联系电话'
                    }))
                ),
                React.createElement(Col, { key: 'email', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'email',
                        label: '邮箱地址'
                    }, React.createElement(Input, {
                        placeholder: '请输入邮箱地址'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'address',
                name: 'address',
                label: '地址'
            }, React.createElement(Input, {
                placeholder: '请输入地址'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '描述'
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入组织描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'parentId',
                name: 'parentId',
                label: '父组织',
                style: { display: 'none' }
            }, React.createElement(Input, {
                type: 'hidden'
            })),
            
            React.createElement(Form.Item, {
                key: 'level',
                name: 'level',
                label: '层级',
                style: { display: 'none' }
            }, React.createElement(Input, {
                type: 'hidden'
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
        ])),
        
        React.createElement(Modal, {
            key: 'member-modal',
            title: `${currentOrg?.name} - 成员管理`,
            visible: memberModalVisible,
            onCancel: () => setMemberModalVisible(false),
            onOk: saveMembers,
            width: 800
        }, React.createElement(Transfer, {
            dataSource: mockUsers,
            targetKeys: targetKeys,
            onChange: handleMemberChange,
            render: item => item.title,
            titles: ['可选用户', '已选用户'],
            showSearch: true,
            listStyle: { width: 300, height: 400 }
        }))
    ]);
};

window.OrganizationManagement = OrganizationManagement; 