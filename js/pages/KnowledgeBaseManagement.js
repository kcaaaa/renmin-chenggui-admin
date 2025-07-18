// 知识库管理页面 - 基于文档7.5.2功能设计
const KnowledgeBaseManagement = () => {
    const { Card, Table, Button, Space, Modal, Form, Input, Switch, message, Tag, Upload, Progress, List, Typography, Divider, Popconfirm } = antd;
    const { TextArea } = Input;
    const { Text } = Typography;
    
    const [loading, setLoading] = React.useState(false);
    const [knowledgeBases, setKnowledgeBases] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [uploadModalVisible, setUploadModalVisible] = React.useState(false);
    const [editingKB, setEditingKB] = React.useState(null);
    const [currentKB, setCurrentKB] = React.useState(null);
    const [form] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [fileList, setFileList] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);

    React.useEffect(() => {
        loadKnowledgeBases();
    }, []);

    const loadKnowledgeBases = () => {
        setLoading(true);
        // 模拟加载知识库数据
        setTimeout(() => {
            setKnowledgeBases([
                {
                    id: 'kb001',
                    name: '城轨技术知识库',
                    description: '包含地铁、轻轨等技术资料，涵盖设计、建设、运营等各个方面',
                    enabled: true,
                    createTime: '2025-01-08 10:00:00',
                    creator: '技术专家',
                    fileCount: 156,
                    totalSize: '2.3GB',
                    lastUpdate: '2025-01-15 14:30:00',
                    documents: [
                        { name: '地铁建设技术规范.pdf', size: '45.2MB', uploadTime: '2025-01-15 14:30:00', status: '已解析' },
                        { name: '轻轨运营指南.docx', size: '12.8MB', uploadTime: '2025-01-14 09:15:00', status: '已解析' },
                        { name: '城轨安全管理制度.pdf', size: '8.9MB', uploadTime: '2025-01-13 16:20:00', status: '已解析' }
                    ]
                },
                {
                    id: 'kb002',
                    name: '展会服务知识库',
                    description: '展会相关服务和流程指导，帮助参展商和观众了解展会信息',
                    enabled: true,
                    createTime: '2025-01-05 15:30:00',
                    creator: '展会专员',
                    fileCount: 89,
                    totalSize: '1.8GB',
                    lastUpdate: '2025-01-12 11:45:00',
                    documents: [
                        { name: '参展指南2025.pdf', size: '23.4MB', uploadTime: '2025-01-12 11:45:00', status: '已解析' },
                        { name: '展位设计规范.docx', size: '15.6MB', uploadTime: '2025-01-10 08:30:00', status: '已解析' }
                    ]
                },
                {
                    id: 'kb003',
                    name: '政策法规知识库',
                    description: '行业政策和法规文件，包括国家标准、行业规范等',
                    enabled: true,
                    createTime: '2025-01-03 09:20:00',
                    creator: '法务专员',
                    fileCount: 234,
                    totalSize: '3.1GB',
                    lastUpdate: '2025-01-11 13:15:00',
                    documents: [
                        { name: '城市轨道交通建设管理办法.pdf', size: '18.7MB', uploadTime: '2025-01-11 13:15:00', status: '已解析' },
                        { name: '国家铁路技术标准.pdf', size: '67.3MB', uploadTime: '2025-01-09 10:22:00', status: '已解析' }
                    ]
                },
                {
                    id: 'kb004',
                    name: '常见问题知识库',
                    description: '用户常见问题及解答，提供快速的问题解决方案',
                    enabled: false,
                    createTime: '2025-01-01 12:00:00',
                    creator: '客服主管',
                    fileCount: 67,
                    totalSize: '456MB',
                    lastUpdate: '2025-01-08 17:30:00',
                    documents: [
                        { name: 'FAQ常见问题集.txt', size: '2.3MB', uploadTime: '2025-01-08 17:30:00', status: '已解析' },
                        { name: '用户操作手册.docx', size: '8.9MB', uploadTime: '2025-01-06 14:20:00', status: '已解析' }
                    ]
                }
            ]);
            setLoading(false);
        }, 800);
    };

    const handleCreate = () => {
        setEditingKB(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingKB(record);
        form.setFieldsValue({
            name: record.name,
            description: record.description,
            enabled: record.enabled
        });
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        setKnowledgeBases(knowledgeBases.filter(kb => kb.id !== id));
        message.success('知识库删除成功');
    };

    const handleToggleStatus = (id, enabled) => {
        setKnowledgeBases(knowledgeBases.map(kb => 
            kb.id === id ? { ...kb, enabled } : kb
        ));
        message.success(`知识库已${enabled ? '启用' : '禁用'}`);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingKB) {
                // 编辑知识库
                setKnowledgeBases(knowledgeBases.map(kb => 
                    kb.id === editingKB.id 
                        ? { ...kb, ...values, lastUpdate: new Date().toLocaleString() }
                        : kb
                ));
                message.success('知识库更新成功');
            } else {
                // 创建新知识库
                const newKB = {
                    id: `kb${Date.now()}`,
                    ...values,
                    createTime: new Date().toLocaleString(),
                    creator: '当前用户',
                    fileCount: 0,
                    totalSize: '0MB',
                    lastUpdate: new Date().toLocaleString(),
                    documents: []
                };
                setKnowledgeBases([...knowledgeBases, newKB]);
                message.success('知识库创建成功');
            }
            setModalVisible(false);
        });
    };

    const handleUploadMaterials = (record) => {
        setCurrentKB(record);
        setFileList([]);
        uploadForm.resetFields();
        setUploadModalVisible(true);
    };

    const handleFileUpload = () => {
        if (fileList.length === 0) {
            message.warning('请选择要上传的文件');
            return;
        }

        setUploading(true);
        // 模拟文件上传
        setTimeout(() => {
            const newDocuments = fileList.map(file => ({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + 'MB',
                uploadTime: new Date().toLocaleString(),
                status: '已解析'
            }));

            // 更新知识库文档列表
            setKnowledgeBases(knowledgeBases.map(kb => 
                kb.id === currentKB.id 
                    ? { 
                        ...kb, 
                        documents: [...kb.documents, ...newDocuments],
                        fileCount: kb.fileCount + fileList.length,
                        lastUpdate: new Date().toLocaleString()
                    }
                    : kb
            ));

            setUploading(false);
            setUploadModalVisible(false);
            setFileList([]);
            message.success(`成功上传 ${fileList.length} 个文件`);
        }, 2000);
    };

    const uploadProps = {
        name: 'file',
        multiple: true,
        fileList: fileList,
        beforeUpload: (file) => {
            // 检查文件类型
            const isValidType = file.type === 'application/pdf' || 
                               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                               file.type === 'text/plain' ||
                               file.name.endsWith('.pdf') ||
                               file.name.endsWith('.docx') ||
                               file.name.endsWith('.txt');
            
            if (!isValidType) {
                message.error('只支持上传 PDF、DOCX、TXT 格式的文件');
                return false;
            }

            // 检查文件大小 (100MB限制)
            if (file.size > 100 * 1024 * 1024) {
                message.error('文件大小不能超过 100MB');
                return false;
            }

            setFileList([...fileList, file]);
            return false; // 阻止自动上传
        },
        onRemove: (file) => {
            setFileList(fileList.filter(f => f.uid !== file.uid));
        }
    };

    const columns = [
        {
            title: '知识库信息',
            key: 'info',
            width: 250,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'name',
                        style: { fontWeight: 500, fontSize: '16px', marginBottom: '4px' } 
                    }, record.name),
                    React.createElement('div', { 
                        key: 'desc',
                        style: { fontSize: '12px', color: '#8c8c8c', lineHeight: 1.4 } 
                    }, record.description)
                ])
            )
        },
        {
            title: '文档统计',
            key: 'stats',
            width: 120,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'count',
                        style: { fontSize: '14px' } 
                    }, `${record.fileCount} 个文件`),
                    React.createElement('div', { 
                        key: 'size',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, record.totalSize)
                ])
            )
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 100,
            render: (enabled, record) => (
                React.createElement(Switch, {
                    checked: enabled,
                    onChange: (checked) => handleToggleStatus(record.id, checked),
                    checkedChildren: '启用',
                    unCheckedChildren: '禁用'
                })
            )
        },
        {
            title: '创建信息',
            key: 'createInfo',
            width: 150,
            render: (_, record) => (
                React.createElement('div', {}, [
                    React.createElement('div', { 
                        key: 'creator',
                        style: { fontSize: '12px' } 
                    }, `创建人：${record.creator}`),
                    React.createElement('div', { 
                        key: 'time',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, record.createTime),
                    React.createElement('div', { 
                        key: 'update',
                        style: { fontSize: '12px', color: '#8c8c8c' } 
                    }, `更新：${record.lastUpdate}`)
                ])
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => (
                React.createElement(Space, { size: 'small', wrap: true }, [
                    React.createElement(Button, {
                        key: 'upload',
                        type: 'primary',
                        size: 'small',
                        onClick: () => handleUploadMaterials(record)
                    }, '上传资料'),
                    React.createElement(Button, {
                        key: 'edit',
                        type: 'link',
                        size: 'small',
                        onClick: () => handleEdit(record)
                    }, '编辑'),
                    React.createElement(Popconfirm, {
                        key: 'delete',
                        title: '确定要删除这个知识库吗？删除后无法恢复。',
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
                ])
            )
        }
    ];

    // 展开行渲染
    const expandedRowRender = (record) => {
        if (!record.documents || record.documents.length === 0) {
            return React.createElement('div', { 
                style: { padding: '16px', textAlign: 'center', color: '#8c8c8c' } 
            }, '暂无上传的文档');
        }

        return React.createElement(List, {
            size: 'small',
            header: React.createElement('strong', {}, '已上传的文档'),
            dataSource: record.documents,
            renderItem: (doc) => React.createElement(List.Item, {}, [
                React.createElement(List.Item.Meta, {
                    key: 'meta',
                    title: doc.name,
                    description: `大小：${doc.size} | 上传时间：${doc.uploadTime}`
                }),
                React.createElement(Tag, { 
                    key: 'status',
                    color: doc.status === '已解析' ? 'green' : 'orange' 
                }, doc.status)
            ])
        });
    };

    // 顶部工具栏
    const renderToolbar = () => {
        return React.createElement('div', { 
            style: { 
                background: '#fff', 
                padding: '16px 24px', 
                marginBottom: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('div', { key: 'left' }, [
                React.createElement('h2', { 
                    key: 'title',
                    style: { margin: 0, fontSize: '20px', fontWeight: 600 } 
                }, '知识库管理'),
                React.createElement('p', { 
                    key: 'desc',
                    style: { margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' } 
                }, '管理AI知识库，上传相关资料文档，为智能体提供专业知识来源')
            ]),
            React.createElement(Space, { key: 'right' }, [
                React.createElement(Button, {
                    key: 'refresh',
                    icon: React.createElement('span', {}, '🔄'),
                    onClick: loadKnowledgeBases,
                    loading: loading
                }, '刷新'),
                React.createElement(Button, {
                    key: 'create',
                    type: 'primary',
                    icon: React.createElement('span', {}, '➕'),
                    onClick: handleCreate
                }, '创建知识库')
            ])
        ]);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        renderToolbar(),
        
        React.createElement(Card, { key: 'table-card' },
            React.createElement(Table, {
                columns: columns,
                dataSource: knowledgeBases,
                rowKey: 'id',
                loading: loading,
                expandable: {
                    expandedRowRender: expandedRowRender,
                    rowExpandable: (record) => record.documents && record.documents.length > 0,
                },
                pagination: {
                    total: knowledgeBases.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
        ),

        // 创建/编辑知识库弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: editingKB ? '编辑知识库' : '创建知识库',
            visible: modalVisible,
            onOk: handleSubmit,
            onCancel: () => setModalVisible(false),
            width: 600,
            destroyOnClose: true
        }, [
            React.createElement(Form, {
                key: 'form',
                form: form,
                layout: 'vertical',
                initialValues: { enabled: true }
            }, [
                React.createElement(Form.Item, {
                    key: 'name',
                    name: 'name',
                    label: '知识库名称',
                    rules: [{ required: true, message: '请输入知识库名称' }]
                }, React.createElement(Input, { placeholder: '请输入知识库名称' })),

                React.createElement(Form.Item, {
                    key: 'description',
                    name: 'description',
                    label: '知识库简介',
                    rules: [{ required: true, message: '请输入知识库简介' }]
                }, React.createElement(TextArea, { 
                    rows: 3, 
                    placeholder: '请输入知识库的功能简介和包含内容' 
                })),

                React.createElement(Form.Item, {
                    key: 'enabled',
                    name: 'enabled',
                    label: '启用状态',
                    valuePropName: 'checked'
                }, React.createElement(Switch, { 
                    checkedChildren: '启用',
                    unCheckedChildren: '禁用'
                }))
            ])
        ]),

        // 上传资料弹窗
        React.createElement(Modal, {
            key: 'upload-modal',
            title: `上传资料 - ${currentKB?.name}`,
            visible: uploadModalVisible,
            onOk: handleFileUpload,
            onCancel: () => setUploadModalVisible(false),
            width: 700,
            destroyOnClose: true,
            confirmLoading: uploading,
            okText: uploading ? '上传中...' : '开始上传'
        }, [
            React.createElement('div', { key: 'upload-content' }, [
                React.createElement('div', { 
                    key: 'tips',
                    style: { 
                        background: '#f6ffed', 
                        border: '1px solid #b7eb8f',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '16px'
                    }
                }, [
                    React.createElement('h4', { 
                        key: 'title',
                        style: { margin: '0 0 8px 0', color: '#52c41a' } 
                    }, '📋 上传说明'),
                    React.createElement('ul', { 
                        key: 'list',
                        style: { margin: 0, paddingLeft: '20px', color: '#389e0d' } 
                    }, [
                        React.createElement('li', { key: '1' }, '支持上传 PDF、DOCX、TXT 格式的文件'),
                        React.createElement('li', { key: '2' }, '单个文件大小不超过 100MB'),
                        React.createElement('li', { key: '3' }, '系统会自动解析文档内容并建立索引'),
                        React.createElement('li', { key: '4' }, '上传后的文档将用于AI问答的知识来源')
                    ])
                ]),

                React.createElement(Upload.Dragger, { 
                    key: 'upload',
                    ...uploadProps,
                    style: { marginBottom: '16px' }
                }, [
                    React.createElement('p', { 
                        key: 'icon',
                        style: { fontSize: '48px', margin: '0' } 
                    }, '📁'),
                    React.createElement('p', { 
                        key: 'text',
                        style: { fontSize: '16px', margin: '16px 0 8px 0' } 
                    }, '点击或拖拽文件到此区域上传'),
                    React.createElement('p', { 
                        key: 'hint',
                        style: { color: '#8c8c8c' } 
                    }, '支持批量上传，单个文件不超过100MB')
                ]),

                uploading && React.createElement(Progress, {
                    key: 'progress',
                    percent: 60,
                    status: 'active',
                    format: () => '正在解析文档内容...'
                })
            ])
        ])
    ]);
};

// 确保组件被正确导出
window.KnowledgeBaseManagement = KnowledgeBaseManagement; 