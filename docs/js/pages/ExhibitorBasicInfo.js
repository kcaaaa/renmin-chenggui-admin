// ExhibitorBasicInfo.js - 展商信息 - v3版本
// 展商可在此编辑和管理其公司的基本资料和宣传材料，用于在APP端和Web端展示
// 展商信息总共分为三个模块：展示内容、展会现场、展商简介

const ExhibitorBasicInfo = () => {
    const { useState, useEffect } = React;
    const { Card, Form, Input, Button, Upload, message, Space, Divider, Tabs, Table, Modal, Tag, Image, Select, Typography, Row, Col } = antd;
    const { TextArea } = Input;
    const { TabPane } = Tabs;
    const { Title, Text } = Typography;
    const { Option } = Select;

    const [form] = Form.useForm();
    const [contentForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('display');
    
    // 展示内容状态
    const [displayContents, setDisplayContents] = useState([]);
    const [contentModalVisible, setContentModalVisible] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [contentDetailVisible, setContentDetailVisible] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    
    // 展会现场状态
    const [onSiteContents, setOnSiteContents] = useState([]);
    const [onSiteModalVisible, setOnSiteModalVisible] = useState(false);
    const [editingOnSite, setEditingOnSite] = useState(null);
    
    // 展商简介状态
    const [profileForm] = Form.useForm();
    const [profileSubmitted, setProfileSubmitted] = useState(false);
    const [logoFileList, setLogoFileList] = useState([]);
    const [promotionFileList, setPromotionFileList] = useState([]);

    // 模拟数据加载
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // 模拟展示内容数据
        const mockDisplayContents = [
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
        ];
        
        // 模拟展会现场数据
        const mockOnSiteContents = [
            {
                id: 1,
                name: '展位布置效果图',
                createTime: '2024-01-25 10:00:00',
                coverImage: 'https://via.placeholder.com/300x200',
                images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
                videos: [],
                description: '展位现场布置和装修效果展示'
            }
        ];

        // 模拟展商简介数据
        const mockProfileData = {
            companyName: '北京城轨科技有限公司',
            companyAddress: '北京市朝阳区城轨大道123号',
            companyWebsite: 'https://www.example-rail.com',
            companyCategory: ['信号系统', '智能化'],
            companyType: '有限责任公司',
            companyIntro: '专注于城市轨道交通智能化解决方案，致力于为城市交通发展提供先进技术支持。公司成立于2010年，拥有专业的研发团队和丰富的项目经验。',
            contactPerson: '张经理',
            contactEmail: 'zhang@example-rail.com',
            contactPhone: '13800138000'
        };

        setDisplayContents(mockDisplayContents);
        setOnSiteContents(mockOnSiteContents);
        profileForm.setFieldsValue(mockProfileData);
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
                setDisplayContents(prev => prev.map(item => 
                    item.id === editingContent.id ? newContent : item
                ));
                message.success('修改成功！');
            } else {
                setDisplayContents(prev => [...prev, newContent]);
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
                setDisplayContents(prev => prev.filter(item => item.id !== id));
                message.success('删除成功！');
            }
        });
    };

    const handleViewContentDetail = (record) => {
        setCurrentContent(record);
        setContentDetailVisible(true);
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
                setOnSiteContents(prev => prev.map(item => 
                    item.id === editingOnSite.id ? newContent : item
                ));
                message.success('修改成功！');
            } else {
                setOnSiteContents(prev => [...prev, newContent]);
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
                setOnSiteContents(prev => prev.filter(item => item.id !== id));
                message.success('删除成功！');
            }
        });
    };

    // === 展商简介相关方法 ===
    const handleSubmitProfile = () => {
        profileForm.validateFields().then(values => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setProfileSubmitted(true);
                message.success('提交审核成功！审核结果将通过站内信通知您。审核通过后，基础信息将不可再进行更改。');
            }, 1000);
        });
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

    // 表格列定义
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

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Title, { level: 2 }, '展商信息'),
        React.createElement(Text, { type: 'secondary' }, 
            '展商可在此编辑和管理其公司的基本资料和宣传材料，用于在APP端和Web端展示。注意：用户填报的信息均需要会展公司进行审核。'
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
                                '展示参展商的展馆效果图及其他相关图片。此处不需要审核，可持续修改。'
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
                            dataSource: displayContents,
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
                                '上传展会现场图片、视频等现场宣传资料。此处不需要审核，可持续修改。'
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
                            dataSource: onSiteContents,
                            rowKey: 'id',
                            size: 'small',
                            pagination: false
                        })
                    )
                ),
                
                // 展商简介Tab
                React.createElement(TabPane, { tab: '展商简介', key: 'profile' },
                    React.createElement('div', null,
                        React.createElement('div', { style: { marginBottom: 16 } },
                            React.createElement(Text, { type: 'secondary' }, 
                                '提供企业基本信息表单。此处需要审核，审核通过后基础信息将不可再进行更改。'
                            )
                        ),
                        React.createElement(Form, {
                            form: profileForm,
                            layout: 'vertical',
                            onFinish: handleSubmitProfile
                        },
                            React.createElement(Row, { gutter: 24 },
                                React.createElement(Col, { span: 16 },
                                    React.createElement(Form.Item, {
                                        name: 'companyName',
                                        label: '企业名称',
                                        rules: [
                                            { required: true, message: '请输入企业名称' },
                                            { max: 50, message: '企业名称不能超过50个字符' }
                                        ]
                                    },
                                        React.createElement(Input, { 
                                            placeholder: '请输入企业名称',
                                            disabled: profileSubmitted
                                        })
                                    ),
                                    
                                    React.createElement(Form.Item, {
                                        name: 'companyIntro',
                                        label: '企业简介',
                                        rules: [{ required: true, message: '请输入企业简介' }]
                                    },
                                        React.createElement(TextArea, { 
                                            rows: 4,
                                            placeholder: '请详细介绍公司情况',
                                            disabled: profileSubmitted
                                        })
                                    ),
                                    
                                    React.createElement(Form.Item, {
                                        name: 'companyAddress',
                                        label: '企业地址',
                                        rules: [{ required: true, message: '请输入企业地址' }]
                                    },
                                        React.createElement(Input, { 
                                            placeholder: '请输入企业详细地址',
                                            disabled: profileSubmitted
                                        })
                                    ),
                                    
                                    React.createElement(Form.Item, {
                                        name: 'companyWebsite',
                                        label: '企业网址',
                                        rules: [
                                            { required: true, message: '请输入企业网址' },
                                            { type: 'url', message: '请输入有效的网址' }
                                        ]
                                    },
                                        React.createElement(Input, { 
                                            placeholder: 'https://www.example.com',
                                            disabled: profileSubmitted
                                        })
                                    )
                                ),
                                
                                React.createElement(Col, { span: 8 },
                                    React.createElement(Form.Item, {
                                        label: '企业Logo',
                                        required: true
                                    },
                                        React.createElement(Upload, {
                                            ...uploadProps,
                                            fileList: logoFileList,
                                            onChange: ({ fileList }) => setLogoFileList(fileList),
                                            disabled: profileSubmitted
                                        },
                                            logoFileList.length < 1 && React.createElement('div', null,
                                                React.createElement('div', { style: { marginTop: 8 } }, 'Logo')
                                            )
                                        )
                                    )
                                )
                            ),
                            
                            React.createElement(Row, { gutter: 24 },
                                React.createElement(Col, { span: 12 },
                                    React.createElement(Form.Item, {
                                        name: 'companyCategory',
                                        label: '企业所属分类',
                                        rules: [{ required: true, message: '请选择企业所属分类' }]
                                    },
                                        React.createElement(Select, { 
                                            mode: 'multiple',
                                            placeholder: '请选择企业所属分类',
                                            disabled: profileSubmitted
                                        },
                                            React.createElement(Option, { value: '信号系统' }, '信号系统'),
                                            React.createElement(Option, { value: '智能化' }, '智能化'),
                                            React.createElement(Option, { value: '车辆设备' }, '车辆设备'),
                                            React.createElement(Option, { value: '通信系统' }, '通信系统'),
                                            React.createElement(Option, { value: '供电系统' }, '供电系统')
                                        )
                                    )
                                ),
                                React.createElement(Col, { span: 12 },
                                    React.createElement(Form.Item, {
                                        name: 'companyType',
                                        label: '企业属性',
                                        rules: [{ required: true, message: '请选择企业属性' }]
                                    },
                                        React.createElement(Select, { 
                                            placeholder: '请选择企业属性',
                                            disabled: profileSubmitted
                                        },
                                            React.createElement(Option, { value: '国有企业' }, '国有企业'),
                                            React.createElement(Option, { value: '集体企业' }, '集体企业'),
                                            React.createElement(Option, { value: '私营企业' }, '私营企业'),
                                            React.createElement(Option, { value: '个体工商户' }, '个体工商户'),
                                            React.createElement(Option, { value: '合伙企业' }, '合伙企业'),
                                            React.createElement(Option, { value: '有限责任公司' }, '有限责任公司'),
                                            React.createElement(Option, { value: '股份有限公司' }, '股份有限公司'),
                                            React.createElement(Option, { value: '外商投资企业' }, '外商投资企业')
                                        )
                                    )
                                )
                            ),
                            
                            React.createElement(Form.Item, {
                                label: '宣传图片（最多5张）'
                            },
                                React.createElement(Upload, {
                                    ...uploadProps,
                                    fileList: promotionFileList,
                                    onChange: ({ fileList }) => {
                                        if (fileList.length <= 5) {
                                            setPromotionFileList(fileList);
                                        } else {
                                            message.warning('最多只能上传5张宣传图片');
                                        }
                                    },
                                    disabled: profileSubmitted
                                },
                                    promotionFileList.length < 5 && React.createElement('div', null,
                                        React.createElement('div', { style: { marginTop: 8 } }, '+')
                                    )
                                )
                            ),
                            
                            React.createElement(Divider, null),
                            
                            React.createElement(Title, { level: 4 }, '联系信息'),
                            React.createElement(Row, { gutter: 24 },
                                React.createElement(Col, { span: 8 },
                                    React.createElement(Form.Item, {
                                        name: 'contactPerson',
                                        label: '联系人姓名',
                                        rules: [{ required: true, message: '请输入联系人姓名' }]
                                    },
                                        React.createElement(Input, { 
                                            placeholder: '请输入联系人姓名',
                                            disabled: profileSubmitted
                                        })
                                    )
                                ),
                                React.createElement(Col, { span: 8 },
                                    React.createElement(Form.Item, {
                                        name: 'contactEmail',
                                        label: '联系邮箱',
                                        rules: [
                                            { required: true, message: '请输入联系邮箱' },
                                            { type: 'email', message: '请输入有效的邮箱地址' }
                                        ]
                                    },
                                        React.createElement(Input, { 
                                            placeholder: '请输入联系邮箱',
                                            disabled: profileSubmitted
                                        })
                                    )
                                ),
                                React.createElement(Col, { span: 8 },
                                    React.createElement(Form.Item, {
                                        name: 'contactPhone',
                                        label: '联系电话',
                                        extra: '手机号通常从登录账号中自动获取，不可修改'
                                    },
                                        React.createElement(Input, { 
                                            placeholder: '13800138000',
                                            disabled: true
                                        })
                                    )
                                )
                            ),
                            
                            React.createElement(Form.Item, null,
                                React.createElement(Button, {
                                    type: 'primary',
                                    htmlType: 'submit',
                                    loading: loading,
                                    disabled: profileSubmitted
                                }, profileSubmitted ? '已提交审核' : '提交审核')
                            ),
                            
                            profileSubmitted && React.createElement('div', {
                                style: { 
                                    padding: 16, 
                                    background: '#f6ffed', 
                                    border: '1px solid #b7eb8f',
                                    borderRadius: 4,
                                    marginTop: 16
                                }
                            },
                                React.createElement(Text, { type: 'success' }, 
                                    '✅ 已提交审核，审核通过后基础信息将不可再进行更改。展示内容和展会现场模块可持续修改。'
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
window.ExhibitorBasicInfo = ExhibitorBasicInfo; 