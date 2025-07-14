// 展商基本信息组件
const ExhibitorBasicInfo = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Upload, Image } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitors, setExhibitors] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingExhibitor, setEditingExhibitor] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟展商数据
    const mockExhibitors = [
        { 
            id: 1, 
            name: '中车集团', 
            type: 'manufacturer', 
            status: 'active',
            industry: '轨道交通装备',
            scale: 'large',
            location: '北京市',
            contact: '张总',
            phone: '13800138000',
            email: 'zhang@crrc.com',
            website: 'www.crrc.com',
            description: '中国中车集团有限公司是全球规模最大的轨道交通装备制造企业',
            logo: '/images/crrc-logo.png',
            establishDate: '1999-12-28',
            registerCapital: 28000000000,
            createTime: '2024-01-10 10:00:00'
        },
        { 
            id: 2, 
            name: '华为技术', 
            type: 'technology', 
            status: 'active',
            industry: '信息通信技术',
            scale: 'large',
            location: '深圳市',
            contact: '李经理',
            phone: '13800138001',
            email: 'li@huawei.com',
            website: 'www.huawei.com',
            description: '华为技术有限公司是全球领先的信息与通信技术解决方案供应商',
            logo: '/images/huawei-logo.png',
            establishDate: '1987-09-15',
            registerCapital: 4040000000,
            createTime: '2024-01-11 11:00:00'
        },
        { 
            id: 3, 
            name: '比亚迪股份', 
            type: 'manufacturer', 
            status: 'pending',
            industry: '新能源汽车',
            scale: 'large',
            location: '深圳市',
            contact: '王主管',
            phone: '13800138002',
            email: 'wang@byd.com',
            website: 'www.byd.com',
            description: '比亚迪股份有限公司是一家拥有IT、汽车及新能源三大产业群的高新技术民营企业',
            logo: '/images/byd-logo.png',
            establishDate: '1995-02-10',
            registerCapital: 2890000000,
            createTime: '2024-01-12 12:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadExhibitors();
    }, []);
    
    const loadExhibitors = () => {
        setLoading(true);
        setTimeout(() => {
            setExhibitors(mockExhibitors);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '正常' },
            'pending': { color: 'orange', text: '待审核' },
            'inactive': { color: 'default', text: '停用' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'manufacturer': { color: 'blue', text: '制造商' },
            'technology': { color: 'purple', text: '技术公司' },
            'service': { color: 'cyan', text: '服务商' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getScaleTag = (scale) => {
        const scaleMap = {
            'large': { color: 'red', text: '大型' },
            'medium': { color: 'orange', text: '中型' },
            'small': { color: 'green', text: '小型' }
        };
        const config = scaleMap[scale] || { color: 'default', text: scale };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '企业名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                React.createElement('img', {
                    key: 'logo',
                    src: record.logo,
                    alt: name,
                    style: { width: 32, height: 32, borderRadius: '4px' },
                    onError: (e) => { e.target.style.display = 'none'; }
                }),
                React.createElement('span', { key: 'name' }, name)
            ])
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '规模',
            dataIndex: 'scale',
            key: 'scale',
            render: getScaleTag
        },
        {
            title: '行业',
            dataIndex: 'industry',
            key: 'industry'
        },
        {
            title: '所在地',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '注册时间',
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
                    key: 'audit',
                    type: 'link',
                    size: 'small',
                    onClick: () => auditExhibitor(record)
                }, '审核')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingExhibitor(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingExhibitor(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        message.info(`查看 ${record.name} 详情`);
    };
    
    const auditExhibitor = (record) => {
        Modal.confirm({
            title: '审核展商',
            content: `确定要审核通过 ${record.name} 吗？`,
            onOk: () => {
                message.success('审核成功');
                loadExhibitors();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存展商信息:', values);
        message.success(editingExhibitor ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadExhibitors();
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '展商基本信息'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理和维护展商基本信息')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总展商数',
                        value: exhibitors.length
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '正常展商',
                        value: exhibitors.filter(e => e.status === 'active').length,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: exhibitors.filter(e => e.status === 'pending').length,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'large', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '大型企业',
                        value: exhibitors.filter(e => e.scale === 'large').length,
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
            }, '新建展商'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadExhibitors
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '正常'),
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                React.createElement(Option, { key: 'inactive', value: 'inactive' }, '停用')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: exhibitors,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingExhibitor ? '编辑展商' : '新建展商',
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
                        label: '企业名称',
                        rules: [{ required: true, message: '请输入企业名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入企业名称'
                    }))
                ),
                React.createElement(Col, { key: 'type', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '企业类型',
                        rules: [{ required: true, message: '请选择企业类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择企业类型'
                    }, [
                        React.createElement(Option, { key: 'manufacturer', value: 'manufacturer' }, '制造商'),
                        React.createElement(Option, { key: 'technology', value: 'technology' }, '技术公司'),
                        React.createElement(Option, { key: 'service', value: 'service' }, '服务商')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'industry', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'industry',
                        label: '所属行业',
                        rules: [{ required: true, message: '请输入所属行业' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入所属行业'
                    }))
                ),
                React.createElement(Col, { key: 'scale', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'scale',
                        label: '企业规模',
                        rules: [{ required: true, message: '请选择企业规模' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择企业规模'
                    }, [
                        React.createElement(Option, { key: 'large', value: 'large' }, '大型'),
                        React.createElement(Option, { key: 'medium', value: 'medium' }, '中型'),
                        React.createElement(Option, { key: 'small', value: 'small' }, '小型')
                    ]))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'contact', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'contact',
                        label: '联系人',
                        rules: [{ required: true, message: '请输入联系人' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入联系人'
                    }))
                ),
                React.createElement(Col, { key: 'phone', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'phone',
                        label: '联系电话',
                        rules: [{ required: true, message: '请输入联系电话' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入联系电话'
                    }))
                ),
                React.createElement(Col, { key: 'email', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'email',
                        label: '邮箱',
                        rules: [{ required: true, message: '请输入邮箱' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入邮箱'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '企业简介'
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请输入企业简介'
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

window.ExhibitorBasicInfo = ExhibitorBasicInfo; 