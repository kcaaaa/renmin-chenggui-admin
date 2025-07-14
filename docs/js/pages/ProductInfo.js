// 产品信息组件
const ProductInfo = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, InputNumber, Upload } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟产品数据
    const mockProducts = [
        { 
            id: 1, 
            name: 'CRH380A高速动车组', 
            category: '轨道车辆', 
            type: 'vehicle',
            status: 'active',
            manufacturer: '中车集团',
            model: 'CRH380A',
            price: 180000000,
            specifications: '8节编组，运营速度350km/h',
            description: '中国标准动车组，具有完全自主知识产权',
            images: ['/images/crh380a-1.jpg', '/images/crh380a-2.jpg'],
            certifications: ['ISO9001', 'CE认证'],
            warranty: '5年',
            deliveryTime: '12个月',
            contactPerson: '张工程师',
            phone: '13800138000',
            email: 'zhang@crrc.com',
            createTime: '2024-01-10 10:00:00',
            updateTime: '2024-01-10 10:00:00'
        },
        { 
            id: 2, 
            name: '城轨信号控制系统', 
            category: '信号系统', 
            type: 'system',
            status: 'active',
            manufacturer: '华为技术',
            model: 'HW-SCS-2000',
            price: 50000000,
            specifications: 'CBTC系统，支持全自动驾驶',
            description: '基于5G技术的新一代城轨信号控制系统',
            images: ['/images/signal-system-1.jpg'],
            certifications: ['SIL4', 'CENELEC'],
            warranty: '3年',
            deliveryTime: '8个月',
            contactPerson: '李经理',
            phone: '13800138001',
            email: 'li@huawei.com',
            createTime: '2024-01-11 11:00:00',
            updateTime: '2024-01-11 11:00:00'
        },
        { 
            id: 3, 
            name: '轨道检测设备', 
            category: '检测设备', 
            type: 'equipment',
            status: 'pending',
            manufacturer: '中铁检测',
            model: 'ZT-RD-300',
            price: 8000000,
            specifications: '激光检测，精度±0.1mm',
            description: '高精度轨道几何状态检测设备',
            images: ['/images/detection-equipment-1.jpg'],
            certifications: ['ISO17025'],
            warranty: '2年',
            deliveryTime: '6个月',
            contactPerson: '王主任',
            phone: '13800138002',
            email: 'wang@ztjc.com',
            createTime: '2024-01-12 12:00:00',
            updateTime: '2024-01-12 12:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadProducts();
    }, []);
    
    const loadProducts = () => {
        setLoading(true);
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'active': { color: 'green', text: '上架' },
            'pending': { color: 'orange', text: '待审核' },
            'inactive': { color: 'default', text: '下架' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'vehicle': { color: 'blue', text: '车辆' },
            'system': { color: 'purple', text: '系统' },
            'equipment': { color: 'cyan', text: '设备' },
            'component': { color: 'green', text: '部件' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
                record.images && record.images.length > 0 && React.createElement('img', {
                    key: 'image',
                    src: record.images[0],
                    alt: name,
                    style: { width: 40, height: 40, borderRadius: '4px', objectFit: 'cover' },
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
            title: '分类',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: '制造商',
            dataIndex: 'manufacturer',
            key: 'manufacturer'
        },
        {
            title: '型号',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `¥${(price / 10000).toFixed(0)}万`
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '联系人',
            dataIndex: 'contactPerson',
            key: 'contactPerson'
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime'
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
                    onClick: () => auditProduct(record)
                }, '审核')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        message.info(`查看 ${record.name} 详情`);
    };
    
    const auditProduct = (record) => {
        Modal.confirm({
            title: '审核产品',
            content: `确定要审核通过 ${record.name} 吗？`,
            onOk: () => {
                message.success('审核成功');
                loadProducts();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存产品信息:', values);
        message.success(editingProduct ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadProducts();
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '产品信息'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理和维护产品信息')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总产品数',
                        value: products.length
                    })
                )
            ),
            React.createElement(Col, { key: 'active', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '上架产品',
                        value: products.filter(p => p.status === 'active').length,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待审核',
                        value: products.filter(p => p.status === 'pending').length,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'value', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总价值',
                        value: products.reduce((sum, p) => sum + p.price, 0) / 100000000,
                        suffix: '亿',
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
            }, '新建产品'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadProducts
            }, '刷新'),
            React.createElement(Select, {
                key: 'category-filter',
                placeholder: '分类筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'vehicle', value: '轨道车辆' }, '轨道车辆'),
                React.createElement(Option, { key: 'signal', value: '信号系统' }, '信号系统'),
                React.createElement(Option, { key: 'equipment', value: '检测设备' }, '检测设备')
            ]),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'active', value: 'active' }, '上架'),
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待审核'),
                React.createElement(Option, { key: 'inactive', value: 'inactive' }, '下架')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: products,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingProduct ? '编辑产品' : '新建产品',
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
                        label: '产品名称',
                        rules: [{ required: true, message: '请输入产品名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入产品名称'
                    }))
                ),
                React.createElement(Col, { key: 'model', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'model',
                        label: '产品型号',
                        rules: [{ required: true, message: '请输入产品型号' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入产品型号'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'type', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'type',
                        label: '产品类型',
                        rules: [{ required: true, message: '请选择产品类型' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择产品类型'
                    }, [
                        React.createElement(Option, { key: 'vehicle', value: 'vehicle' }, '车辆'),
                        React.createElement(Option, { key: 'system', value: 'system' }, '系统'),
                        React.createElement(Option, { key: 'equipment', value: 'equipment' }, '设备'),
                        React.createElement(Option, { key: 'component', value: 'component' }, '部件')
                    ]))
                ),
                React.createElement(Col, { key: 'category', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'category',
                        label: '产品分类',
                        rules: [{ required: true, message: '请输入产品分类' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入产品分类'
                    }))
                ),
                React.createElement(Col, { key: 'manufacturer', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'manufacturer',
                        label: '制造商',
                        rules: [{ required: true, message: '请输入制造商' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入制造商'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'price', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'price',
                        label: '价格（元）',
                        rules: [{ required: true, message: '请输入价格' }]
                    }, React.createElement(InputNumber, {
                        style: { width: '100%' },
                        placeholder: '请输入价格'
                    }))
                ),
                React.createElement(Col, { key: 'warranty', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'warranty',
                        label: '质保期'
                    }, React.createElement(Input, {
                        placeholder: '请输入质保期'
                    }))
                ),
                React.createElement(Col, { key: 'deliveryTime', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'deliveryTime',
                        label: '交付周期'
                    }, React.createElement(Input, {
                        placeholder: '请输入交付周期'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'specifications',
                name: 'specifications',
                label: '产品规格'
            }, React.createElement(TextArea, {
                rows: 2,
                placeholder: '请输入产品规格'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '产品描述'
            }, React.createElement(TextArea, {
                rows: 3,
                placeholder: '请输入产品描述'
            })),
            
            React.createElement(Row, { key: 'row4', gutter: 16 }, [
                React.createElement(Col, { key: 'contactPerson', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'contactPerson',
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

window.ProductInfo = ProductInfo; 