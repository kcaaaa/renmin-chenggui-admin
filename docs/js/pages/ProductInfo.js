// ProductInfo.js - 产品信息管理
// 展商可在此管理其希望在线上展会中展示的产品，并查看和回复用户评论

function ProductInfo() {
    const { useState, useEffect } = React;
    const { Card, Table, Button, Modal, Form, Input, Upload, Select, Space, message, Popconfirm, Tag, Divider } = antd;
    const { Column } = Table;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [form] = Form.useForm();
    const [imageFileList, setImageFileList] = useState([]);

    // 模拟产品数据
    const mockProducts = [
        {
            id: 1,
            name: '智能信号控制系统',
            category: ['信号系统', '智能化'],
            description: '基于AI技术的城轨信号控制系统，提供更安全、高效的列车运行控制解决方案。',
            status: 'published',
            createTime: '2024-01-10 09:00:00',
            commentCount: 5
        },
        {
            id: 2,
            name: '轨道交通综合监控平台',
            category: ['监控系统', '运营管理'],
            description: '集成视频监控、环境监测、设备状态监控的综合平台系统。',
            status: 'reviewing',
            createTime: '2024-01-12 14:30:00',
            commentCount: 2
        }
    ];

    // 模拟评论数据
    const mockComments = [
        {
            id: 1,
            productId: 1,
            content: '这个信号系统看起来很先进，能否提供更详细的技术参数？',
            userName: '李工程师',
            createTime: '2024-01-15 10:30:00',
            status: 'show'
        },
        {
            id: 2,
            productId: 1,
            content: '我们公司正在寻找类似的解决方案，希望能进一步了解合作方式。',
            userName: '王总',
            createTime: '2024-01-14 16:20:00',
            status: 'show'
        }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        setTimeout(() => {
            setDataSource(mockProducts);
            setLoading(false);
        }, 500);
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setImageFileList([]);
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
                status: 'reviewing',
                createTime: now,
                commentCount: 0
            };
            setDataSource([...dataSource, newRecord]);
            message.success('添加成功！已提交审核');
        }
        
        setModalVisible(false);
        form.resetFields();
        setImageFileList([]);
    };

    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id));
        message.success('删除成功');
    };

    const handleViewComments = (record) => {
        setSelectedProduct(record);
        setCommentModalVisible(true);
    };

    const getStatusTag = (status) => {
        const statusMap = {
            published: { color: 'success', text: '已发布' },
            reviewing: { color: 'warning', text: '审核中' },
            rejected: { color: 'error', text: '已驳回' },
            offline: { color: 'default', text: '已下架' }
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
            title: '产品信息管理',
            extra: React.createElement(Button, {
                type: 'primary',
                onClick: handleAdd
            }, '新增产品')
        },
            React.createElement('div', { style: { marginBottom: 16, padding: 16, background: '#f6f8fa', borderRadius: 8 } },
                React.createElement('h4', { style: { margin: '0 0 8px 0', color: '#1890ff' } }, '功能说明'),
                React.createElement('p', { style: { margin: 0, color: '#666' } }, 
                    '在此管理希望在展会中展示的产品。产品信息提交后需要会展部门审核，审核通过后将在APP端展会板块中展示。您可以查看和回复用户对产品的评论。'
                )
            ),
            
            React.createElement(Table, {
                dataSource: dataSource,
                loading: loading,
                rowKey: 'id',
                pagination: { pageSize: 10 }
            },
                React.createElement(Column, {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 200
                }),
                React.createElement(Column, {
                    title: '所属分类',
                    dataIndex: 'category',
                    key: 'category',
                    width: 200,
                    render: (categories) => categories?.map(cat => 
                        React.createElement(Tag, { key: cat, color: 'blue' }, cat)
                    )
                }),
                React.createElement(Column, {
                    title: '发布状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (status) => getStatusTag(status)
                }),
                React.createElement(Column, {
                    title: '评论数',
                    dataIndex: 'commentCount',
                    key: 'commentCount',
                    width: 100,
                    render: (count, record) => React.createElement(Button, {
                        type: 'link',
                        onClick: () => handleViewComments(record),
                        disabled: count === 0
                    }, count || 0)
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
                            title: '确定要删除这个产品吗？',
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

        // 产品编辑Modal
        React.createElement(Modal, {
            title: editingRecord ? '编辑产品' : '新增产品',
            open: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
                setImageFileList([]);
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
                    name: 'name',
                    label: '产品名称',
                    rules: [{ required: true, message: '请输入产品名称' }]
                },
                    React.createElement(Input, { placeholder: '请输入产品名称' })
                ),
                React.createElement(Form.Item, {
                    name: 'category',
                    label: '产品分类',
                    rules: [{ required: true, message: '请选择产品分类' }]
                },
                    React.createElement(Select, { 
                        mode: 'tags',
                        placeholder: '请选择或输入产品分类'
                    },
                        React.createElement(Select.Option, { value: '信号系统' }, '信号系统'),
                        React.createElement(Select.Option, { value: '监控系统' }, '监控系统'),
                        React.createElement(Select.Option, { value: '智能化' }, '智能化'),
                        React.createElement(Select.Option, { value: '运营管理' }, '运营管理')
                    )
                ),
                React.createElement(Form.Item, {
                    name: 'description',
                    label: '产品简介',
                    rules: [{ required: true, message: '请输入产品简介' }]
                },
                    React.createElement(TextArea, { 
                        rows: 4,
                        placeholder: '请详细描述产品的功能特点、技术优势等',
                        showCount: true,
                        maxLength: 500
                    })
                ),
                React.createElement(Form.Item, {
                    label: '产品图片',
                    help: '最多可上传3张图片，支持拖拽排序'
                },
                    React.createElement(Upload, {
                        ...uploadProps,
                        fileList: imageFileList,
                        onChange: ({ fileList }) => setImageFileList(fileList),
                        maxCount: 3,
                        multiple: true
                    },
                        imageFileList.length >= 3 ? null : React.createElement('div', null,
                            React.createElement('div', { style: { marginTop: 8 } }, '上传图片')
                        )
                    )
                )
            )
        ),

        // 评论管理Modal
        React.createElement(Modal, {
            title: `产品评论管理 - ${selectedProduct?.name}`,
            open: commentModalVisible,
            onCancel: () => setCommentModalVisible(false),
            footer: null,
            width: 800
        },
            selectedProduct ? React.createElement('div', null,
                React.createElement('p', { style: { marginBottom: 16, color: '#666' } }, 
                    '以下是用户对该产品的评论，您可以选择展示、隐藏或删除评论，也可以进行回复。'
                ),
                mockComments.filter(comment => comment.productId === selectedProduct.id).map(comment =>
                    React.createElement(Card, {
                        key: comment.id,
                        size: 'small',
                        style: { marginBottom: 12 },
                        actions: [
                            React.createElement(Button, { type: 'link', size: 'small' }, '回复'),
                            React.createElement(Button, { type: 'link', size: 'small' }, 
                                comment.status === 'show' ? '隐藏' : '展示'
                            ),
                            React.createElement(Button, { type: 'link', size: 'small', danger: true }, '删除')
                        ]
                    },
                        React.createElement('div', null,
                            React.createElement('p', { style: { margin: 0 } }, comment.content),
                            React.createElement('div', { style: { marginTop: 8, fontSize: '12px', color: '#999' } },
                                `${comment.userName} · ${comment.createTime}`
                            )
                        )
                    )
                )
            ) : null
        )
    );
}

// 注册到全局
window.ProductInfo = ProductInfo; 