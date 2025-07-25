// 投诉管理组件 - 内容作品投诉管理
const ComplaintManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker, Image, Tooltip, Popconfirm } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [complaints, setComplaints] = React.useState([]);
    const [processModalVisible, setProcessModalVisible] = React.useState(false);
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [selectedComplaint, setSelectedComplaint] = React.useState(null);
    const [filters, setFilters] = React.useState({});
    const [form] = Form.useForm();
    
    // 投诉标签配置 - 基于APP端截图
    const complaintTypes = {
        'dislike': { label: '我不喜欢', color: 'default' },
        'infringement': { label: '侵犯权益', color: 'orange' },
        'pornography': { label: '色情低俗', color: 'red' },
        'illegal': { label: '违法犯罪', color: 'red' },
        'political': { label: '政治敏感', color: 'red' },
        'spam': { label: '违规营销', color: 'orange' },
        'misinformation': { label: '不实信息', color: 'orange' },
        'cyberbullying': { label: '网络暴力', color: 'red' },
        'safety': { label: '危害人身安全', color: 'red' },
        'minors': { label: '未成年相关', color: 'red' },
        'ai_content': { label: 'AI生成内容问题', color: 'blue' },
        'inappropriate_expression': { label: '反馈不规范表达问题', color: 'orange' }
    };
    
    // 处理状态配置
    const processStatus = {
        'pending': { label: '待处理', color: 'orange' },
        'processing': { label: '处理中', color: 'blue' },
        'ignored': { label: '已忽略', color: 'default' },
        'takedown': { label: '已下架', color: 'red' },
        'banned': { label: '已封禁', color: 'red' }
    };
    
    // 模拟投诉数据 - 基于内容作品投诉场景
    const mockComplaints = [
        {
            id: 1,
            contentId: 'video_001',
            contentTitle: '城轨建设最新进展分享',
            contentType: 'video',
            contentThumbnail: 'https://img.freepik.com/free-photo/modern-subway-station_1127-3211.jpg',
            publisherId: 'user_123',
            publisherName: '城建专家张工',
            publisherAvatar: 'https://img.freepik.com/free-photo/portrait-architect-wearing-hard-hat_23-2148181679.jpg',
            complaintTypes: ['misinformation', 'spam'],
            complainantId: 'user_456',
            complainantName: '用户李四',
            complaintTime: '2024-01-15 14:30:00',
            complaintDescription: '视频内容存在虚假信息，涉及项目进度造假，并且有明显的广告推广痕迹。',
            complaintImages: [
                'https://img.freepik.com/free-photo/construction-site-safety-first-sign_53876-63707.jpg',
                'https://img.freepik.com/free-photo/construction-site-warning-signs_53876-63711.jpg'
            ],
            publisherComplaintCount: 3,
            status: 'pending',
            handler: null,
            handleTime: null,
            handleReason: null
        },
        {
            id: 2,
            contentId: 'image_002',
            contentTitle: '地铁施工现场实拍',
            contentType: 'image',
            contentThumbnail: 'https://img.freepik.com/free-photo/construction-workers-sunset_53876-63759.jpg',
            publisherId: 'user_789',
            publisherName: '现场工程师王工',
            publisherAvatar: 'https://img.freepik.com/free-photo/construction-engineer-safety-helmet_53876-63760.jpg',
            complaintTypes: ['safety', 'illegal'],
            complainantId: 'user_101',
            complainantName: '用户赵六',
            complaintTime: '2024-01-14 16:45:00',
            complaintDescription: '施工现场存在安全隐患，违反相关规定，可能危害人身安全。',
            complaintImages: [
                'https://img.freepik.com/free-photo/construction-site-danger-sign_53876-63713.jpg'
            ],
            publisherComplaintCount: 1,
            status: 'processing',
            handler: '管理员小明',
            handleTime: null,
            handleReason: null
        },
        {
            id: 3,
            contentId: 'video_003',
            contentTitle: '城轨夜景航拍',
            contentType: 'video',
            contentThumbnail: 'https://img.freepik.com/free-photo/night-city-aerial-view_1127-3203.jpg',
            publisherId: 'user_567',
            publisherName: '摄影师小李',
            publisherAvatar: 'https://img.freepik.com/free-photo/photographer-taking-photo_53876-63752.jpg',
            complaintTypes: ['dislike'],
            complainantId: 'user_202',
            complainantName: '用户孙七',
            complaintTime: '2024-01-13 20:15:00',
            complaintDescription: '个人不喜欢此类内容。',
            complaintImages: [],
            publisherComplaintCount: 0,
            status: 'ignored',
            handler: '管理员小红',
            handleTime: '2024-01-14 09:30:00',
            handleReason: '属于个人喜好问题，内容本身无违规'
        }
    ];
    
    React.useEffect(() => {
        loadComplaints();
    }, []);
    
    const loadComplaints = () => {
        setLoading(true);
        setTimeout(() => {
            setComplaints(mockComplaints);
            setLoading(false);
        }, 1000);
    };
    
    // 渲染投诉类型标签
    const renderComplaintTypes = (types) => {
        return types.map(type => {
            const config = complaintTypes[type];
            return React.createElement(Tag, {
                key: type,
                color: config.color,
                size: 'small'
            }, config.label);
        });
    };
    
    // 渲染状态标签
    const renderStatus = (status) => {
        const config = processStatus[status];
        return React.createElement(Tag, {
            color: config.color
        }, config.label);
    };
    
    // 渲染内容缩略图
    const renderContentThumbnail = (record) => {
        return React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '8px' }
        }, [
            React.createElement(Image, {
                key: 'thumbnail',
                src: record.contentThumbnail,
                width: 60,
                height: 40,
                style: { borderRadius: '4px', objectFit: 'cover' }
            }),
            React.createElement('div', { key: 'info' }, [
                React.createElement('div', {
                    key: 'title',
                    style: { fontWeight: '500', marginBottom: '2px' }
                }, [
                    React.createElement(Button, {
                        type: 'link',
                        size: 'small',
                        style: { padding: 0, height: 'auto' },
                        onClick: () => viewContentDetail(record)
                    }, record.contentTitle)
                ]),
                React.createElement('div', {
                    key: 'type',
                    style: { fontSize: '12px', color: '#8c8c8c' }
                }, record.contentType === 'video' ? '视频' : '图文')
            ])
        ]);
    };
    
    // 渲染发布者信息
    const renderPublisher = (record) => {
        return React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '8px' }
        }, [
            React.createElement(Image, {
                key: 'avatar',
                src: record.publisherAvatar,
                width: 32,
                height: 32,
                style: { borderRadius: '50%' },
                preview: false
            }),
            React.createElement('div', { key: 'info' }, [
                React.createElement('div', {
                    key: 'name',
                    style: { fontWeight: '500' }
                }, record.publisherName),
                React.createElement('div', {
                    key: 'stats',
                    style: { fontSize: '12px', color: '#8c8c8c' }
                }, `被投诉 ${record.publisherComplaintCount} 次`)
            ])
        ]);
    };
    
    // 表格列配置
    const columns = [
        {
            title: '投诉内容',
            key: 'content',
            width: 200,
            render: (_, record) => renderContentThumbnail(record)
        },
        {
            title: '发布者',
            key: 'publisher',
            width: 150,
            render: (_, record) => renderPublisher(record)
        },
        {
            title: '投诉类型',
            dataIndex: 'complaintTypes',
            key: 'complaintTypes',
            width: 200,
            render: renderComplaintTypes
        },
        {
            title: '投诉人',
            dataIndex: 'complainantName',
            key: 'complainantName',
            width: 100
        },
        {
            title: '投诉时间',
            dataIndex: 'complaintTime',
            key: 'complaintTime',
            width: 150
        },
        {
            title: '处理状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: renderStatus
        },
        {
            title: '处理人',
            dataIndex: 'handler',
            key: 'handler',
            width: 100,
            render: (handler) => handler || '-'
        },
        {
            title: '操作',
            key: 'actions',
            width: 150,
            fixed: 'right',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'link',
                    size: 'small',
                    onClick: () => showDetail(record)
                }, '详情'),
                record.status === 'pending' ? React.createElement(Button, {
                    key: 'process',
                    type: 'link',
                    size: 'small',
                    onClick: () => showProcessModal(record)
                }, '处理') : null
            ])
        }
    ];
    
    // 查看内容详情
    const viewContentDetail = (record) => {
        message.info(`查看内容详情: ${record.contentTitle}`);
    };
    
    // 显示投诉详情
    const showDetail = (record) => {
        setSelectedComplaint(record);
        setDetailModalVisible(true);
    };
    
    // 显示处理模态框
    const showProcessModal = (record) => {
        setSelectedComplaint(record);
        setProcessModalVisible(true);
    };
    
    // 处理投诉
    const handleProcess = (values) => {
        const { action, reason } = values;
        console.log('处理投诉:', {
            complaintId: selectedComplaint.id,
            action,
            reason
        });
        
        message.success(`投诉处理成功: ${action === 'ignore' ? '已忽略' : action === 'takedown' ? '已下架' : '已封禁'}`);
        setProcessModalVisible(false);
        form.resetFields();
        loadComplaints();
    };
    
    // 统计数据
    const getStats = () => {
        return {
            total: complaints.length,
            pending: complaints.filter(c => c.status === 'pending').length,
            processing: complaints.filter(c => c.status === 'processing').length,
            processed: complaints.filter(c => ['ignored', 'takedown', 'banned'].includes(c.status)).length
        };
    };
    
    const stats = getStats();
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        // 页面头部
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '投诉管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '处理用户对作品内容的投诉举报')
        ]),
        
        // 统计卡片
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总投诉数',
                        value: stats.total,
                        prefix: React.createElement('i', {}, '📋')
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待处理',
                        value: stats.pending,
                        valueStyle: { color: '#faad14' },
                        prefix: React.createElement('i', {}, '⏳')
                    })
                )
            ),
            React.createElement(Col, { key: 'processing', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '处理中',
                        value: stats.processing,
                        valueStyle: { color: '#1890ff' },
                        prefix: React.createElement('i', {}, '🔄')
                    })
                )
            ),
            React.createElement(Col, { key: 'processed', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已处理',
                        value: stats.processed,
                        valueStyle: { color: '#52c41a' },
                        prefix: React.createElement('i', {}, '✅')
                    })
                )
            )
        ]),
        
        // 筛选和操作区域
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 16 }
        }, React.createElement(Space, { wrap: true }, [
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadComplaints
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '处理状态',
                style: { width: 120 },
                allowClear: true,
                onChange: (value) => setFilters({ ...filters, status: value })
            }, Object.entries(processStatus).map(([key, config]) =>
                React.createElement(Option, { key, value: key }, config.label)
            )),
            React.createElement(Select, {
                key: 'type-filter',
                placeholder: '投诉类型',
                style: { width: 150 },
                allowClear: true,
                onChange: (value) => setFilters({ ...filters, type: value })
            }, Object.entries(complaintTypes).map(([key, config]) =>
                React.createElement(Option, { key, value: key }, config.label)
            )),
            React.createElement(RangePicker, {
                key: 'date-filter',
                placeholder: ['开始时间', '结束时间'],
                onChange: (dates) => setFilters({ ...filters, dateRange: dates })
            })
        ])),
        
        // 投诉列表
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: complaints,
            rowKey: 'id',
            loading: loading,
            scroll: { x: 1200 },
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
            }
        })),
        
        // 投诉详情模态框
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '投诉详情',
            visible: detailModalVisible,
            onCancel: () => setDetailModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailModalVisible(false)
                }, '关闭'),
                selectedComplaint && selectedComplaint.status === 'pending' ? React.createElement(Button, {
                    key: 'process',
                    type: 'primary',
                    onClick: () => {
                        setDetailModalVisible(false);
                        showProcessModal(selectedComplaint);
                    }
                }, '处理投诉') : null
            ],
            width: 800
        }, selectedComplaint ? React.createElement('div', {}, [
            React.createElement(Row, { key: 'content-info', gutter: 16, style: { marginBottom: 16 } }, [
                React.createElement(Col, { span: 8 }, [
                    React.createElement('h4', {}, '被投诉内容'),
                    React.createElement(Image, {
                        src: selectedComplaint.contentThumbnail,
                        width: '100%',
                        style: { borderRadius: '4px' }
                    })
                ]),
                React.createElement(Col, { span: 16 }, [
                    React.createElement('h4', {}, '内容信息'),
                    React.createElement('p', {}, React.createElement('strong', {}, '标题：'), selectedComplaint.contentTitle),
                    React.createElement('p', {}, React.createElement('strong', {}, '类型：'), selectedComplaint.contentType === 'video' ? '视频' : '图文'),
                    React.createElement('p', {}, React.createElement('strong', {}, '发布者：'), selectedComplaint.publisherName),
                    React.createElement('p', {}, React.createElement('strong', {}, '发布者被投诉次数：'), selectedComplaint.publisherComplaintCount, ' 次')
                ])
            ]),
            React.createElement('div', { key: 'complaint-info', style: { marginBottom: 16 } }, [
                React.createElement('h4', {}, '投诉信息'),
                React.createElement('p', {}, React.createElement('strong', {}, '投诉人：'), selectedComplaint.complainantName),
                React.createElement('p', {}, React.createElement('strong', {}, '投诉时间：'), selectedComplaint.complaintTime),
                React.createElement('p', {}, React.createElement('strong', {}, '投诉类型：'), renderComplaintTypes(selectedComplaint.complaintTypes)),
                React.createElement('p', {}, React.createElement('strong', {}, '投诉描述：'), selectedComplaint.complaintDescription)
            ]),
            selectedComplaint.complaintImages && selectedComplaint.complaintImages.length > 0 ? React.createElement('div', { key: 'complaint-images' }, [
                React.createElement('h4', {}, '举报截图'),
                React.createElement(Space, {}, selectedComplaint.complaintImages.map((img, index) =>
                    React.createElement(Image, {
                        key: index,
                        src: img,
                        width: 150,
                        height: 100,
                        style: { borderRadius: '4px', objectFit: 'cover' }
                    })
                ))
            ]) : null,
            selectedComplaint.status !== 'pending' ? React.createElement('div', { key: 'handle-info', style: { marginTop: 16 } }, [
                React.createElement('h4', {}, '处理信息'),
                React.createElement('p', {}, React.createElement('strong', {}, '处理状态：'), renderStatus(selectedComplaint.status)),
                React.createElement('p', {}, React.createElement('strong', {}, '处理人：'), selectedComplaint.handler || '-'),
                React.createElement('p', {}, React.createElement('strong', {}, '处理时间：'), selectedComplaint.handleTime || '-'),
                React.createElement('p', {}, React.createElement('strong', {}, '处理理由：'), selectedComplaint.handleReason || '-')
            ]) : null
        ]) : null),
        
        // 处理投诉模态框
        React.createElement(Modal, {
            key: 'process-modal',
            title: '处理投诉',
            visible: processModalVisible,
            onCancel: () => {
                setProcessModalVisible(false);
                form.resetFields();
            },
            onOk: () => form.submit(),
            width: 600
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleProcess
        }, [
            React.createElement(Form.Item, {
                key: 'action',
                name: 'action',
                label: '处理方式',
                rules: [{ required: true, message: '请选择处理方式' }]
            }, React.createElement(Select, { placeholder: '请选择处理方式' }, [
                React.createElement(Option, { key: 'ignore', value: 'ignore' }, '忽略 - 不进行处理'),
                React.createElement(Option, { key: 'takedown', value: 'takedown' }, '下架 - 将作品从平台移除'),
                React.createElement(Option, { key: 'ban', value: 'ban' }, '封禁 - 封禁发布者账号')
            ])),
            React.createElement(Form.Item, {
                key: 'reason',
                name: 'reason',
                label: '处理理由',
                rules: [{ required: true, message: '请填写处理理由' }]
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请详细说明处理理由...',
                maxLength: 500,
                showCount: true
            }))
        ]))
    ]);
};

window.ComplaintManagement = ComplaintManagement; 