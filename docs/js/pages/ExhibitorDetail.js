// ExhibitorDetail.js - 展商详情页面
// 用于展会运营团队查看和审核展商的完整信息

function ExhibitorDetail() {
    const { useState, useEffect } = React;
    const { Card, Tabs, Descriptions, Table, Button, Space, message, Modal, Form, Input, Tag, Image, Divider } = antd;
    const { TabPane } = Tabs;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false);
    const [exhibitorData, setExhibitorData] = useState({});
    const [auditModalVisible, setAuditModalVisible] = useState(false);
    const [auditType, setAuditType] = useState('');
    const [auditForm] = Form.useForm();

    // 模拟展商详细信息
    const mockExhibitorData = {
        basicInfo: {
            companyName: '北京城轨科技有限公司',
            companyLogo: 'https://via.placeholder.com/100x60',
            companyIntro: '专注于城市轨道交通智能化解决方案，致力于为城市交通发展提供先进技术支持。公司成立于2010年，拥有专业的研发团队和丰富的项目经验。',
            companyWebsite: 'https://www.example-rail.com',
            contactPerson: '张经理',
            contactPhone: '13800138000',
            contactEmail: 'zhang@example-rail.com',
            businessLicense: '91110000XXXXXXXX',
            registrationDate: '2024-01-15 10:30:00',
            status: 'pending', // pending, approved, rejected
            auditComments: ''
        },
        products: [
            {
                id: 1,
                name: '智能信号控制系统',
                category: ['信号系统', '智能化'],
                description: '基于AI技术的城轨信号控制系统，提供更安全、高效的列车运行控制解决方案。',
                images: ['https://via.placeholder.com/200x150', 'https://via.placeholder.com/200x150'],
                status: 'approved',
                submitTime: '2024-01-10 09:00:00'
            },
            {
                id: 2,
                name: '轨道交通综合监控平台',
                category: ['监控系统', '运营管理'],
                description: '集成视频监控、环境监测、设备状态监控的综合平台系统。',
                images: ['https://via.placeholder.com/200x150'],
                status: 'pending',
                submitTime: '2024-01-12 14:30:00'
            }
        ],
        activities: [
            {
                id: 1,
                activityName: '智能信号系统技术交流会',
                location: 'A馆会议室1',
                startTime: '2024-03-15 09:00:00',
                endTime: '2024-03-15 12:00:00',
                introduction: '深入探讨城市轨道交通智能信号系统的最新技术发展和应用案例。',
                images: ['https://via.placeholder.com/200x150'],
                agenda: [
                    { time: '09:00-09:30', topic: '开场致辞', speaker: '张经理' },
                    { time: '09:30-10:30', topic: '智能信号技术介绍', speaker: '技术总监' },
                    { time: '10:30-12:00', topic: '案例分享与讨论', speaker: '全体嘉宾' }
                ],
                guests: [
                    { name: '张经理', position: '总经理', bio: '在轨道交通行业有20年从业经验' },
                    { name: '李博士', position: '技术总监', bio: '信号系统专家，博士学位' }
                ],
                status: 'pending',
                submitTime: '2024-01-10 09:00:00'
            }
        ],
        businessMatching: [
            {
                id: 1,
                type: 'supply',
                publishTime: '2024-01-15 10:30:00',
                publisher: '张经理',
                publisherPhone: '13800138000',
                publisherEmail: 'zhang@example.com',
                targetCompany: '上海地铁运营有限公司',
                negotiationContent: '我们希望与贵公司在智能信号系统领域建立合作关系，可以提供完整的技术解决方案和维护服务。',
                status: 'published'
            }
        ]
    };

    useEffect(() => {
        loadExhibitorData();
    }, []);

    const loadExhibitorData = () => {
        setLoading(true);
        setTimeout(() => {
            setExhibitorData(mockExhibitorData);
            setLoading(false);
        }, 500);
    };

    const handleAudit = (type, item = null) => {
        setAuditType(type);
        setAuditModalVisible(true);
        auditForm.resetFields();
    };

    const submitAudit = (values) => {
        const { action, comments } = values;
        message.success(`${action === 'approve' ? '审核通过' : '审核拒绝'}操作成功`);
        setAuditModalVisible(false);
        loadExhibitorData(); // 重新加载数据
    };

    const getStatusTag = (status) => {
        const statusMap = {
            pending: { color: 'warning', text: '待审核' },
            approved: { color: 'success', text: '已通过' },
            rejected: { color: 'error', text: '已拒绝' },
            published: { color: 'success', text: '已发布' }
        };
        const config = statusMap[status] || statusMap.pending;
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const productColumns = [
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            render: (categories) => categories?.map(cat => 
                React.createElement(Tag, { key: cat, color: 'blue' }, cat)
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusTag(status)
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => React.createElement(Space, null,
                React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    onClick: () => handleAudit('product', record)
                }, '审核')
            )
        }
    ];

    const activityColumns = [
        {
            title: '活动名称',
            dataIndex: 'activityName',
            key: 'activityName'
        },
        {
            title: '活动地点',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: '活动时间',
            key: 'time',
            render: (_, record) => 
                `${record.startTime?.substring(0, 16)} - ${record.endTime?.substring(11, 16)}`
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusTag(status)
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => React.createElement(Space, null,
                React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    onClick: () => handleAudit('activity', record)
                }, '审核')
            )
        }
    ];

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Card, {
            title: '展商详情',
            extra: React.createElement(Space, null,
                React.createElement(Button, {
                    type: 'primary',
                    onClick: () => handleAudit('basic')
                }, '审核基础信息'),
                React.createElement(Button, {
                    onClick: () => window.history.back()
                }, '返回')
            )
        },
            React.createElement(Tabs, {
                defaultActiveKey: 'basic',
                items: [
                    {
                        key: 'basic',
                        label: '基础信息',
                        children: React.createElement('div', null,
                            React.createElement(Descriptions, {
                                bordered: true,
                                column: 2,
                                title: '公司基本信息'
                            },
                                React.createElement(Descriptions.Item, { label: '公司名称', span: 2 }, 
                                    exhibitorData.basicInfo?.companyName
                                ),
                                React.createElement(Descriptions.Item, { label: '公司Logo' }, 
                                    React.createElement(Image, {
                                        width: 100,
                                        src: exhibitorData.basicInfo?.companyLogo,
                                        fallback: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN'
                                    })
                                ),
                                React.createElement(Descriptions.Item, { label: '审核状态' }, 
                                    getStatusTag(exhibitorData.basicInfo?.status)
                                ),
                                React.createElement(Descriptions.Item, { label: '公司网址', span: 2 }, 
                                    React.createElement('a', { 
                                        href: exhibitorData.basicInfo?.companyWebsite,
                                        target: '_blank',
                                        rel: 'noopener noreferrer'
                                    }, exhibitorData.basicInfo?.companyWebsite)
                                ),
                                React.createElement(Descriptions.Item, { label: '联系人' }, 
                                    exhibitorData.basicInfo?.contactPerson
                                ),
                                React.createElement(Descriptions.Item, { label: '联系电话' }, 
                                    exhibitorData.basicInfo?.contactPhone
                                ),
                                React.createElement(Descriptions.Item, { label: '联系邮箱', span: 2 }, 
                                    exhibitorData.basicInfo?.contactEmail
                                ),
                                React.createElement(Descriptions.Item, { label: '注册时间', span: 2 }, 
                                    exhibitorData.basicInfo?.registrationDate
                                ),
                                React.createElement(Descriptions.Item, { label: '公司简介', span: 2 }, 
                                    exhibitorData.basicInfo?.companyIntro
                                )
                            )
                        )
                    },
                    {
                        key: 'products',
                        label: `产品信息 (${exhibitorData.products?.length || 0})`,
                        children: React.createElement(Table, {
                            columns: productColumns,
                            dataSource: exhibitorData.products || [],
                            rowKey: 'id',
                            pagination: false
                        })
                    },
                    {
                        key: 'activities',
                        label: `活动信息 (${exhibitorData.activities?.length || 0})`,
                        children: React.createElement(Table, {
                            columns: activityColumns,
                            dataSource: exhibitorData.activities || [],
                            rowKey: 'id',
                            pagination: false
                        })
                    },
                    {
                        key: 'business',
                        label: `商务配对 (${exhibitorData.businessMatching?.length || 0})`,
                        children: React.createElement('div', null,
                            (exhibitorData.businessMatching || []).map(item =>
                                React.createElement(Card, {
                                    key: item.id,
                                    size: 'small',
                                    style: { marginBottom: 16 },
                                    title: React.createElement(Space, null,
                                        React.createElement(Tag, { 
                                            color: item.type === 'supply' ? 'green' : 'blue' 
                                        }, item.type === 'supply' ? '供应信息' : '需求信息'),
                                        getStatusTag(item.status)
                                    )
                                },
                                    React.createElement(Descriptions, {
                                        column: 2,
                                        size: 'small'
                                    },
                                        React.createElement(Descriptions.Item, { label: '发布人' }, item.publisher),
                                        React.createElement(Descriptions.Item, { label: '发布时间' }, item.publishTime),
                                        React.createElement(Descriptions.Item, { label: '联系电话' }, item.publisherPhone),
                                        React.createElement(Descriptions.Item, { label: '联系邮箱' }, item.publisherEmail),
                                        React.createElement(Descriptions.Item, { label: '目标公司', span: 2 }, 
                                            item.targetCompany || '未指定'
                                        ),
                                        React.createElement(Descriptions.Item, { label: '洽谈内容', span: 2 }, 
                                            item.negotiationContent
                                        )
                                    )
                                )
                            )
                        )
                    }
                ]
            })
        ),

        // 审核Modal
        React.createElement(Modal, {
            title: '审核操作',
            open: auditModalVisible,
            onCancel: () => setAuditModalVisible(false),
            onOk: () => auditForm.submit(),
            width: 600
        },
            React.createElement(Form, {
                form: auditForm,
                layout: 'vertical',
                onFinish: submitAudit
            },
                React.createElement(Form.Item, {
                    name: 'action',
                    label: '审核结果',
                    rules: [{ required: true, message: '请选择审核结果' }]
                },
                    React.createElement('div', null,
                        React.createElement(Button, {
                            type: 'primary',
                            style: { marginRight: 8 },
                            onClick: () => auditForm.setFieldsValue({ action: 'approve' })
                        }, '审核通过'),
                        React.createElement(Button, {
                            danger: true,
                            onClick: () => auditForm.setFieldsValue({ action: 'reject' })
                        }, '审核拒绝')
                    )
                ),
                React.createElement(Form.Item, {
                    name: 'comments',
                    label: '审核意见',
                    rules: [{ required: true, message: '请填写审核意见' }]
                },
                    React.createElement(TextArea, {
                        rows: 4,
                        placeholder: '请填写审核意见和建议...'
                    })
                )
            )
        )
    );
}

// 注册到全局
window.ExhibitorDetail = ExhibitorDetail; 