// ExhibitorDetailView.js - 展商详情查看页面 - v3版本
// 供运营团队查看和审核展商的完整信息，布局与展商信息页面一致，但为只读模式
// 展商信息包括：展示内容、展会现场、展商简介

const ExhibitorDetailView = ({ exhibitorId, onPageChange, onBack }) => {
    const { useState, useEffect } = React;
    const { Card, Tabs, Table, Button, Space, message, Modal, Tag, Image, Typography, Row, Col, Descriptions, Form, Input, Divider, Upload } = antd;
    const { TabPane } = Tabs;
    const { Title, Text } = Typography;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('display');
    const [exhibitorData, setExhibitorData] = useState(null);
    const [contentDetailVisible, setContentDetailVisible] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    const [auditModalVisible, setAuditModalVisible] = useState(false);
    const [auditType, setAuditType] = useState('');
    const [auditForm] = Form.useForm();

    // 展示内容和展会现场编辑相关状态
    const [contentModalVisible, setContentModalVisible] = useState(false);
    const [onSiteModalVisible, setOnSiteModalVisible] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [editingOnSite, setEditingOnSite] = useState(null);
    const [contentForm] = Form.useForm();

    // 模拟数据加载
    useEffect(() => {
        loadExhibitorData();
    }, [exhibitorId]);

    const loadExhibitorData = () => {
        setLoading(true);
        
        // 从props或全局变量获取展商ID
        const currentId = exhibitorId || window.currentExhibitorId || 'EXH001';
        
        // 模拟从API获取展商详细数据
        setTimeout(() => {
            const mockData = {
                id: currentId,
                companyName: '北京城轨科技有限公司',
                companyLogo: 'https://via.placeholder.com/100x60',
                contactPerson: '张经理',
                contactPhone: '13800138000',
                contactEmail: 'zhang@example-rail.com',
                website: 'https://www.example-rail.com',
                category: ['信号系统', '智能化'],
                companyType: '有限责任公司',
                registrationDate: '2024-01-15 10:30:00',
                status: 'pending', // pending, approved, rejected
                auditComments: '',
                // 展示内容
                displayContents: [
                    {
                        id: 1,
                        name: '智能信号控制系统展示',
                        createTime: '2024-01-20 09:00:00',
                        coverImage: 'https://via.placeholder.com/300x200',
                        images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
                        videos: ['demo_video.mp4'],
                        description: '基于AI技术的城轨信号控制系统演示'
                    },
                    {
                        id: 2,
                        name: '产品技术方案介绍',
                        createTime: '2024-01-22 14:30:00',
                        coverImage: 'https://via.placeholder.com/300x200',
                        images: ['https://via.placeholder.com/300x200'],
                        videos: [],
                        description: '完整的技术解决方案说明'
                    }
                ],
                // 展会现场
                onSiteContents: [
                    {
                        id: 1,
                        name: '展位布置效果图',
                        createTime: '2024-01-25 10:00:00',
                        coverImage: 'https://via.placeholder.com/300x200',
                        images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
                        videos: [],
                        description: '展位现场布置和装修效果展示'
                    }
                ],
                // 展商简介
                companyProfile: {
                    companyName: '北京城轨科技有限公司',
                    companyLogo: 'https://via.placeholder.com/100x60',
                    companyIntro: '专注于城市轨道交通智能化解决方案，致力于为城市交通发展提供先进技术支持。公司成立于2010年，拥有专业的研发团队和丰富的项目经验。',
                    companyAddress: '北京市朝阳区城轨大道123号',
                    companyWebsite: 'https://www.example-rail.com',
                    companyCategory: ['信号系统', '智能化'],
                    companyType: '有限责任公司',
                    promotionImages: ['https://via.placeholder.com/200x150', 'https://via.placeholder.com/200x150'],
                    contactInfo: {
                        contactPerson: '张经理',
                        email: 'zhang@example-rail.com',
                        phone: '13800138000'
                    }
                }
            };
            
            setExhibitorData(mockData);
            setLoading(false);
        }, 500);
    };

    // === 展示内容相关方法 ===
    const handleAddDisplayContent = () => {
        setEditingContent(null);
        contentForm.resetFields();
        setContentModalVisible(true);
    };

    const handleEditDisplayContent = (record) => {
        setEditingContent(record);
        contentForm.setFieldsValue(record);
        setContentModalVisible(true);
    };

    const handleSaveDisplayContent = () => {
        contentForm.validateFields().then(values => {
            const newContent = {
                id: editingContent ? editingContent.id : Date.now(),
                ...values,
                createTime: editingContent ? editingContent.createTime : new Date().toLocaleString('zh-CN'),
                coverImage: 'https://via.placeholder.com/300x200',
                images: ['https://via.placeholder.com/300x200'],
                videos: []
            };

            if (editingContent) {
                setExhibitorData(prev => ({
                    ...prev,
                    displayContents: prev.displayContents.map(item => 
                        item.id === editingContent.id ? newContent : item
                    )
                }));
                message.success('修改成功！');
            } else {
                setExhibitorData(prev => ({
                    ...prev,
                    displayContents: [...prev.displayContents, newContent]
                }));
                message.success('添加成功！');
            }
            
            setContentModalVisible(false);
        });
    };

    const handleDeleteDisplayContent = (id) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个展示内容吗？',
            onOk: () => {
                setExhibitorData(prev => ({
                    ...prev,
                    displayContents: prev.displayContents.filter(item => item.id !== id)
                }));
                message.success('删除成功！');
            }
        });
    };

    // === 展会现场相关方法 ===
    const handleAddOnSiteContent = () => {
        setEditingOnSite(null);
        contentForm.resetFields();
        setOnSiteModalVisible(true);
    };

    const handleEditOnSiteContent = (record) => {
        setEditingOnSite(record);
        contentForm.setFieldsValue(record);
        setOnSiteModalVisible(true);
    };

    const handleSaveOnSiteContent = () => {
        contentForm.validateFields().then(values => {
            const newContent = {
                id: editingOnSite ? editingOnSite.id : Date.now(),
                ...values,
                createTime: editingOnSite ? editingOnSite.createTime : new Date().toLocaleString('zh-CN'),
                coverImage: 'https://via.placeholder.com/300x200',
                images: ['https://via.placeholder.com/300x200'],
                videos: []
            };

            if (editingOnSite) {
                setExhibitorData(prev => ({
                    ...prev,
                    onSiteContents: prev.onSiteContents.map(item => 
                        item.id === editingOnSite.id ? newContent : item
                    )
                }));
                message.success('修改成功！');
            } else {
                setExhibitorData(prev => ({
                    ...prev,
                    onSiteContents: [...prev.onSiteContents, newContent]
                }));
                message.success('添加成功！');
            }
            
            setOnSiteModalVisible(false);
        });
    };

    const handleDeleteOnSiteContent = (id) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个现场内容吗？',
            onOk: () => {
                setExhibitorData(prev => ({
                    ...prev,
                    onSiteContents: prev.onSiteContents.filter(item => item.id !== id)
                }));
                message.success('删除成功！');
            }
        });
    };

    // 查看内容详情
    const handleViewContentDetail = (record) => {
        setCurrentContent(record);
        setContentDetailVisible(true);
    };

    // 审核展商信息
    const handleAudit = (type) => {
        setAuditType(type);
        setAuditModalVisible(true);
        auditForm.resetFields();
    };

    // 保存审核结果
    const handleSaveAudit = () => {
        auditForm.validateFields().then(values => {
            console.log('审核结果:', { ...values, exhibitorId: exhibitorData.id, auditType });
            message.success(`${auditType === 'approve' ? '审核通过' : '审核拒绝'}成功！`);
            setAuditModalVisible(false);
            // 更新展商状态
            setExhibitorData(prev => ({
                ...prev,
                status: auditType === 'approve' ? 'approved' : 'rejected',
                auditComments: values.comments
            }));
        });
    };

    // 返回展商列表
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (onPageChange) {
            onPageChange('ExhibitorDetail');
        }
    };

    // 文件上传配置
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
            return false; // 阻止自动上传
        }
    };

    // 展示内容表格列定义（支持编辑操作）
    const contentColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '封面图',
            dataIndex: 'coverImage',
            key: 'coverImage',
            render: (src) => React.createElement(Image, { src, width: 60, height: 40 })
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                React.createElement(Space, null,
                    React.createElement(Button, { 
                        size: 'small', 
                        onClick: () => handleViewContentDetail(record) 
                    }, '详情'),
                    React.createElement(Button, { 
                        size: 'small', 
                        onClick: () => activeTab === 'display' ? 
                            handleEditDisplayContent(record) : 
                            handleEditOnSiteContent(record)
                    }, '编辑'),
                    React.createElement(Button, { 
                        size: 'small', 
                        danger: true,
                        onClick: () => activeTab === 'display' ? 
                            handleDeleteDisplayContent(record.id) : 
                            handleDeleteOnSiteContent(record.id)
                    }, '删除')
                )
            )
        }
    ];

    if (loading) {
        return React.createElement('div', { style: { padding: 24, textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 16 } }, '加载中...')
        );
    }

    if (!exhibitorData) {
        return React.createElement('div', { style: { padding: 24, textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 16, color: '#999' } }, '未找到展商信息')
        );
    }

    const getStatusTag = (status) => {
        const statusMap = {
            pending: { color: 'orange', text: '待审核' },
            approved: { color: 'green', text: '已通过' },
            rejected: { color: 'red', text: '已拒绝' }
        };
        const config = statusMap[status] || { color: 'gray', text: '未知' };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    return React.createElement('div', { style: { padding: 24 } },
        // 页面头部
        React.createElement('div', { style: { marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
                React.createElement(Title, { level: 2, style: { margin: 0, display: 'inline-block', marginRight: 16 } }, 
                    '展商详情 - ', exhibitorData.companyName
                ),
                getStatusTag(exhibitorData.status)
            ),
            React.createElement(Space, null,
                exhibitorData.status === 'pending' && React.createElement(Button, {
                    type: 'primary',
                    onClick: () => handleAudit('approve')
                }, '审核通过'),
                exhibitorData.status === 'pending' && React.createElement(Button, {
                    danger: true,
                    onClick: () => handleAudit('reject')
                }, '审核拒绝'),
                React.createElement(Button, {
                    onClick: handleBack
                }, '返回列表')
            )
        ),
        
        React.createElement(Text, { type: 'secondary' }, 
            '供运营团队查看和审核展商信息。展商信息包括展示内容、展会现场、展商简介等。运营团队可以代替展商编辑展示内容和展会现场信息。'
        ),

        React.createElement(Card, { style: { marginTop: 24 } },
            React.createElement(Tabs, { 
                activeKey: activeTab, 
                onChange: setActiveTab 
            },
                // 展示内容Tab
                React.createElement(TabPane, { tab: '展示内容', key: 'display' },
                    React.createElement('div', null,
                        React.createElement('div', { style: { marginBottom: 16 } },
                            React.createElement(Text, { type: 'secondary' }, 
                                '展示参展商的展馆效果图及其他相关图片。运营团队可以代替展商进行新增、编辑、删除操作。'
                            )
                        ),
                        React.createElement('div', { style: { marginBottom: 16 } },
                            React.createElement(Button, { 
                                type: 'primary',
                                onClick: handleAddDisplayContent
                            }, '新建照片文件夹')
                        ),
                        React.createElement(Table, {
                            columns: contentColumns,
                            dataSource: exhibitorData.displayContents || [],
                            rowKey: 'id',
                            size: 'small',
                            pagination: false
                        })
                    )
                ),
                
                // 展会现场Tab
                React.createElement(TabPane, { tab: '展会现场', key: 'onsite' },
                    React.createElement('div', null,
                        React.createElement('div', { style: { marginBottom: 16 } },
                            React.createElement(Text, { type: 'secondary' }, 
                                '展会现场图片、视频等现场宣传资料。运营团队可以代替展商进行新增、编辑、删除操作。'
                            )
                        ),
                        React.createElement('div', { style: { marginBottom: 16 } },
                            React.createElement(Button, { 
                                type: 'primary',
                                onClick: handleAddOnSiteContent
                            }, '新建照片文件夹')
                        ),
                        React.createElement(Table, {
                            columns: contentColumns,
                            dataSource: exhibitorData.onSiteContents || [],
                            rowKey: 'id',
                            size: 'small',
                            pagination: false
                        })
                    )
                ),
                
                // 展商简介Tab（保持只读）
                React.createElement(TabPane, { tab: '展商简介', key: 'profile' },
                    React.createElement('div', null,
                        React.createElement('div', { style: { marginBottom: 16 } },
                            React.createElement(Text, { type: 'secondary' }, 
                                '企业基本信息表单。此处为只读查看模式，供运营团队审核展商提交的信息。'
                            )
                        ),
                        React.createElement(Row, { gutter: 24 },
                            React.createElement(Col, { span: 16 },
                                React.createElement(Descriptions, { 
                                    bordered: true, 
                                    column: 2,
                                    title: '企业基本信息'
                                },
                                    React.createElement(Descriptions.Item, { label: '企业名称' }, 
                                        exhibitorData.companyProfile?.companyName
                                    ),
                                    React.createElement(Descriptions.Item, { label: '企业网址' }, 
                                        React.createElement('a', { 
                                            href: exhibitorData.companyProfile?.companyWebsite,
                                            target: '_blank'
                                        }, exhibitorData.companyProfile?.companyWebsite)
                                    ),
                                    React.createElement(Descriptions.Item, { label: '企业地址' }, 
                                        exhibitorData.companyProfile?.companyAddress
                                    ),
                                    React.createElement(Descriptions.Item, { label: '企业属性' }, 
                                        exhibitorData.companyProfile?.companyType
                                    ),
                                    React.createElement(Descriptions.Item, { label: '企业所属分类' }, 
                                        exhibitorData.companyProfile?.companyCategory?.map((cat, index) => 
                                            React.createElement(Tag, { key: index, color: 'blue' }, cat)
                                        )
                                    ),
                                    React.createElement(Descriptions.Item, { label: '联系人姓名' }, 
                                        exhibitorData.companyProfile?.contactInfo?.contactPerson
                                    ),
                                    React.createElement(Descriptions.Item, { label: '联系邮箱' }, 
                                        exhibitorData.companyProfile?.contactInfo?.email
                                    ),
                                    React.createElement(Descriptions.Item, { label: '联系电话' }, 
                                        exhibitorData.companyProfile?.contactInfo?.phone
                                    ),
                                    React.createElement(Descriptions.Item, { 
                                        label: '企业简介',
                                        span: 2
                                    }, exhibitorData.companyProfile?.companyIntro)
                                ),
                                
                                React.createElement(Divider, null),
                                
                                React.createElement(Descriptions, { 
                                    bordered: true, 
                                    column: 2,
                                    title: '审核信息'
                                },
                                    React.createElement(Descriptions.Item, { label: '注册时间' }, 
                                        exhibitorData.registrationDate
                                    ),
                                    React.createElement(Descriptions.Item, { label: '当前状态' }, 
                                        getStatusTag(exhibitorData.status)
                                    ),
                                    React.createElement(Descriptions.Item, { 
                                        label: '审核意见',
                                        span: 2
                                    }, exhibitorData.auditComments || '暂无审核意见')
                                )
                            ),
                            
                            React.createElement(Col, { span: 8 },
                                React.createElement(Card, { title: '企业Logo', size: 'small' },
                                    React.createElement('div', { style: { textAlign: 'center' } },
                                        React.createElement(Image, {
                                            src: exhibitorData.companyProfile?.companyLogo,
                                            width: 150,
                                            style: { border: '1px solid #f0f0f0' }
                                        })
                                    )
                                ),
                                React.createElement(Card, { 
                                    title: '宣传图片', 
                                    size: 'small',
                                    style: { marginTop: 16 }
                                },
                                    React.createElement('div', null,
                                        (exhibitorData.companyProfile?.promotionImages || []).length > 0 ?
                                        (exhibitorData.companyProfile?.promotionImages || []).map((img, index) =>
                                            React.createElement(Image, {
                                                key: index,
                                                src: img,
                                                width: 80,
                                                height: 60,
                                                style: { margin: 4, border: '1px solid #f0f0f0' }
                                            })
                                        ) : React.createElement(Text, { type: 'secondary' }, '暂无宣传图片')
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),

        // 内容编辑Modal
        React.createElement(Modal, {
            title: `${editingContent || editingOnSite ? '编辑' : '新建'}${activeTab === 'display' ? '展示' : '现场'}内容`,
            visible: contentModalVisible || onSiteModalVisible,
            onOk: activeTab === 'display' ? handleSaveDisplayContent : handleSaveOnSiteContent,
            onCancel: () => {
                setContentModalVisible(false);
                setOnSiteModalVisible(false);
            },
            width: 600
        },
            React.createElement(Form, {
                form: contentForm,
                layout: 'vertical'
            },
                React.createElement(Form.Item, {
                    name: 'name',
                    label: '名称',
                    rules: [{ required: true, message: '请输入名称' }]
                },
                    React.createElement(Input, { placeholder: '请输入内容名称' })
                ),
                React.createElement(Form.Item, {
                    name: 'description',
                    label: '描述'
                },
                    React.createElement(TextArea, { 
                        rows: 3,
                        placeholder: '请输入内容描述'
                    })
                ),
                React.createElement(Form.Item, {
                    label: '封面图'
                },
                    React.createElement(Upload, uploadProps,
                        React.createElement('div', null, '+ 上传封面图')
                    )
                ),
                React.createElement(Form.Item, {
                    label: '展示内容（图片、视频）'
                },
                    React.createElement(Upload, {
                        ...uploadProps,
                        multiple: true
                    },
                        React.createElement('div', null, '+ 上传内容文件')
                    )
                )
            )
        ),

        // 审核Modal
        React.createElement(Modal, {
            title: `审核展商信息 - ${auditType === 'approve' ? '通过' : '拒绝'}`,
            visible: auditModalVisible,
            onOk: handleSaveAudit,
            onCancel: () => setAuditModalVisible(false),
            width: 600
        },
            React.createElement(Form, {
                form: auditForm,
                layout: 'vertical'
            },
                React.createElement(Form.Item, {
                    name: 'comments',
                    label: '审核意见',
                    rules: [{ required: true, message: '请输入审核意见' }]
                },
                    React.createElement(TextArea, {
                        rows: 4,
                        placeholder: auditType === 'approve' ? 
                            '请输入通过理由和相关说明...' : 
                            '请输入拒绝理由，将通过站内信或邮件通知展商进行修改...'
                    })
                )
            )
        ),

        // 内容详情Modal
        React.createElement(Modal, {
            title: `内容详情 - ${currentContent?.name || ''}`,
            visible: contentDetailVisible,
            onCancel: () => setContentDetailVisible(false),
            width: 800,
            footer: null
        },
            currentContent && React.createElement('div', null,
                React.createElement(Title, { level: 4 }, currentContent.name),
                React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement(Text, { strong: true }, '创建时间：'),
                    React.createElement(Text, null, currentContent.createTime)
                ),
                React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement(Text, { strong: true }, '描述：'),
                    React.createElement('div', null, currentContent.description)
                ),
                React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement(Text, { strong: true }, '封面图：'),
                    React.createElement('div', { style: { marginTop: 8 } },
                        React.createElement(Image, { 
                            src: currentContent.coverImage,
                            width: 200
                        })
                    )
                ),
                React.createElement('div', null,
                    React.createElement(Text, { strong: true }, '内容图片：'),
                    React.createElement('div', { style: { marginTop: 8 } },
                        (currentContent.images || []).map((img, index) =>
                            React.createElement(Image, {
                                key: index,
                                src: img,
                                width: 150,
                                style: { margin: 8 }
                            })
                        )
                    )
                )
            )
        )
    );
};

// 导出组件
window.ExhibitorDetailView = ExhibitorDetailView; 