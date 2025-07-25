// RegistrationEntrance.js - 报名入口 - v3版本
// 功能同APP中展会板块的报名，用于Web端进行报名使用
// 用户点击Web端展会板块中的"报名入口"按钮，系统将展示一个报名活动列表

const RegistrationEntrance = () => {
    const { useState, useEffect } = React;
    const { Card, Table, Button, Modal, Form, Input, Select, Space, message, Tag, Row, Col, Typography, Divider, Image } = antd;
    const { Title, Text, Paragraph } = Typography;
    const { Option } = Select;

    const [loading, setLoading] = useState(false);
    const [exhibitionList, setExhibitionList] = useState([]);
    const [registrationActivities, setRegistrationActivities] = useState([]);
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);

    // 模拟数据加载
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        
        // 模拟展会数据
        const mockExhibitions = [
            {
                id: 'EX001',
                name: '2024中国城市轨道交通博览会',
                startDate: '2024-06-15',
                endDate: '2024-06-18',
                venue: '北京国际展览中心',
                status: 'upcoming',
                coverImage: 'https://via.placeholder.com/400x200',
                description: '聚焦城市轨道交通最新技术发展，汇聚行业顶尖企业和专家学者，共同探讨轨道交通未来发展方向。'
            },
            {
                id: 'EX002',
                name: '2024智慧交通技术展',
                startDate: '2024-08-20',
                endDate: '2024-08-23',
                venue: '上海新国际博览中心',
                status: 'upcoming',
                coverImage: 'https://via.placeholder.com/400x200',
                description: '展示智慧交通领域最新技术成果，推动交通数字化转型升级。'
            }
        ];

        // 模拟报名活动数据
        const mockActivities = [
            {
                id: 'ACT001',
                exhibitionId: 'EX001',
                name: '观众参观报名',
                type: 'visitor',
                description: '面向专业观众的展会参观报名，免费参观展览',
                externalUrl: 'https://registration.example.com/visitor-2024',
                status: 'active',
                requirements: ['实名认证', '行业背景验证'],
                benefits: ['免费参观', '获取展商资料', '参与现场活动'],
                deadline: '2024-06-10',
                registeredCount: 1250,
                maxCount: 5000
            },
            {
                id: 'ACT002',
                exhibitionId: 'EX001',
                name: '展商参展申请',
                type: 'exhibitor',
                description: '企业参展商报名申请，展示企业产品和技术',
                externalUrl: 'https://registration.example.com/exhibitor-2024',
                status: 'active',
                requirements: ['企业资质证明', '产品技术资料', '展位费用'],
                benefits: ['品牌展示', '商务洽谈', '技术交流'],
                deadline: '2024-05-15',
                registeredCount: 150,
                maxCount: 300
            },
            {
                id: 'ACT003',
                exhibitionId: 'EX001',
                name: '高峰论坛参会',
                type: 'conference',
                description: '城轨发展高峰论坛参会报名，聆听行业专家分享',
                externalUrl: 'https://registration.example.com/forum-2024',
                status: 'active',
                requirements: ['实名认证', '参会费用'],
                benefits: ['专家演讲', '行业报告', '证书颁发'],
                deadline: '2024-06-05',
                registeredCount: 300,
                maxCount: 500
            },
            {
                id: 'ACT004',
                exhibitionId: 'EX002',
                name: '技术展示报名',
                type: 'exhibitor',
                description: '智慧交通技术展示报名',
                externalUrl: 'https://registration.example.com/tech-2024',
                status: 'active',
                requirements: ['技术方案', '演示设备'],
                benefits: ['技术展示', '用户反馈', '合作机会'],
                deadline: '2024-08-10',
                registeredCount: 80,
                maxCount: 200
            }
        ];

        setTimeout(() => {
            setExhibitionList(mockExhibitions);
            setRegistrationActivities(mockActivities);
            if (mockExhibitions.length > 0) {
                setSelectedExhibition(mockExhibitions[0]);
            }
            setLoading(false);
        }, 500);
    };

    // 获取当前展会的报名活动
    const getCurrentActivities = () => {
        if (!selectedExhibition) return [];
        return registrationActivities.filter(activity => 
            activity.exhibitionId === selectedExhibition.id
        );
    };

    // 前往报名
    const handleRegister = (activity) => {
        Modal.confirm({
            title: `前往 ${activity.name}`,
            content: React.createElement('div', null,
                React.createElement('p', null, `即将跳转到外部报名平台：`),
                React.createElement('a', { 
                    href: activity.externalUrl, 
                    target: '_blank',
                    style: { wordBreak: 'break-all' }
                }, activity.externalUrl),
                React.createElement('p', { style: { marginTop: 16, color: '#666' } }, 
                    '请在新页面中完成报名流程，完成后返回本系统。'
                )
            ),
            onOk: () => {
                window.open(activity.externalUrl, '_blank');
                message.success('已为您打开报名页面，请在新窗口中完成报名！');
            },
            okText: '前往报名',
            cancelText: '取消'
        });
    };

    // 查看详情
    const handleViewDetail = (activity) => {
        setCurrentActivity(activity);
        setPreviewModalVisible(true);
    };

    // 获取活动类型标签
    const getActivityTypeTag = (type) => {
        const typeMap = {
            visitor: { color: 'blue', text: '观众报名' },
            exhibitor: { color: 'green', text: '展商申请' },
            conference: { color: 'purple', text: '会议报名' },
            workshop: { color: 'orange', text: '培训报名' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 获取状态标签
    const getStatusTag = (status) => {
        const statusMap = {
            active: { color: 'green', text: '报名中' },
            pending: { color: 'orange', text: '即将开放' },
            closed: { color: 'red', text: '已截止' },
            full: { color: 'gray', text: '已满员' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Title, { level: 2 }, '展会报名入口'),
        React.createElement(Text, { type: 'secondary' }, 
            '欢迎参加展会活动！请选择对应的展会和报名类型，系统将引导您前往外部报名平台完成报名流程。'
        ),

        // 展会选择
        React.createElement(Card, { 
            title: '选择展会',
            style: { marginTop: 24 }
        },
            React.createElement(Row, { gutter: 16 },
                exhibitionList.map(exhibition => 
                    React.createElement(Col, { 
                        key: exhibition.id, 
                        span: 12,
                        style: { marginBottom: 16 }
                    },
                        React.createElement(Card, {
                            hoverable: true,
                            className: selectedExhibition?.id === exhibition.id ? 'selected-exhibition' : '',
                            style: { 
                                border: selectedExhibition?.id === exhibition.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
                                cursor: 'pointer'
                            },
                            onClick: () => setSelectedExhibition(exhibition),
                            cover: React.createElement(Image, {
                                alt: exhibition.name,
                                src: exhibition.coverImage,
                                height: 150,
                                style: { objectFit: 'cover' }
                            })
                        },
                            React.createElement(Card.Meta, {
                                title: exhibition.name,
                                description: React.createElement('div', null,
                                    React.createElement('div', { style: { marginBottom: 8 } },
                                        React.createElement(Tag, { color: 'blue' }, exhibition.venue)
                                    ),
                                    React.createElement('div', { style: { marginBottom: 8 } },
                                        `${exhibition.startDate} 至 ${exhibition.endDate}`
                                    ),
                                    React.createElement('div', { style: { fontSize: 12, color: '#666' } },
                                        exhibition.description
                                    )
                                )
                            })
                        )
                    )
                )
            )
        ),

        // 报名活动列表
        selectedExhibition && React.createElement(Card, {
            title: `${selectedExhibition.name} - 报名活动`,
            style: { marginTop: 24 }
        },
            React.createElement(Row, { gutter: 16 },
                getCurrentActivities().map(activity =>
                    React.createElement(Col, {
                        key: activity.id,
                        span: 8,
                        style: { marginBottom: 16 }
                    },
                        React.createElement(Card, {
                            size: 'small',
                            title: React.createElement('div', null,
                                React.createElement('span', { style: { marginRight: 8 } }, activity.name),
                                getActivityTypeTag(activity.type)
                            ),
                            extra: getStatusTag(activity.status),
                            actions: [
                                React.createElement(Button, {
                                    type: 'link',
                                    onClick: () => handleViewDetail(activity)
                                }, '查看详情'),
                                React.createElement(Button, {
                                    type: 'primary',
                                    disabled: activity.status !== 'active',
                                    onClick: () => handleRegister(activity)
                                }, activity.status === 'active' ? '立即报名' : '暂未开放')
                            ]
                        },
                            React.createElement('div', null,
                                React.createElement(Paragraph, {
                                    ellipsis: { rows: 2 },
                                    style: { marginBottom: 16 }
                                }, activity.description),
                                
                                React.createElement('div', { style: { marginBottom: 12 } },
                                    React.createElement(Text, { strong: true }, '报名截止：'),
                                    React.createElement(Text, { 
                                        type: new Date(activity.deadline) < new Date() ? 'danger' : 'default'
                                    }, activity.deadline)
                                ),
                                
                                React.createElement('div', { style: { marginBottom: 12 } },
                                    React.createElement(Text, { strong: true }, '报名进度：'),
                                    React.createElement(Text, null, 
                                        `${activity.registeredCount}/${activity.maxCount} 人`
                                    )
                                ),
                                
                                React.createElement('div', null,
                                    React.createElement(Text, { strong: true }, '主要福利：'),
                                    React.createElement('div', { style: { marginTop: 4 } },
                                        activity.benefits.slice(0, 2).map((benefit, index) =>
                                            React.createElement(Tag, { 
                                                key: index, 
                                                color: 'green',
                                                style: { marginBottom: 4 }
                                            }, benefit)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            
            getCurrentActivities().length === 0 && React.createElement('div', {
                style: { 
                    textAlign: 'center', 
                    padding: 40, 
                    color: '#999' 
                }
            }, '该展会暂无可报名的活动')
        ),

        // 活动详情Modal
        React.createElement(Modal, {
            title: `活动详情 - ${currentActivity?.name || ''}`,
            visible: previewModalVisible,
            onCancel: () => setPreviewModalVisible(false),
            width: 800,
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setPreviewModalVisible(false)
                }, '关闭'),
                React.createElement(Button, {
                    key: 'register',
                    type: 'primary',
                    disabled: currentActivity?.status !== 'active',
                    onClick: () => {
                        setPreviewModalVisible(false);
                        handleRegister(currentActivity);
                    }
                }, currentActivity?.status === 'active' ? '立即报名' : '暂未开放')
            ]
        },
            currentActivity && React.createElement('div', null,
                React.createElement('div', { style: { marginBottom: 24 } },
                    React.createElement(Title, { level: 4 }, currentActivity.name),
                    React.createElement('div', { style: { marginBottom: 16 } },
                        getActivityTypeTag(currentActivity.type),
                        React.createElement('span', { style: { margin: '0 8px' } }),
                        getStatusTag(currentActivity.status)
                    ),
                    React.createElement(Paragraph, null, currentActivity.description)
                ),

                React.createElement(Divider, null),

                React.createElement(Row, { gutter: 24 },
                    React.createElement(Col, { span: 12 },
                        React.createElement(Title, { level: 5 }, '报名要求'),
                        React.createElement('ul', null,
                            currentActivity.requirements.map((req, index) =>
                                React.createElement('li', { key: index }, req)
                            )
                        )
                    ),
                    React.createElement(Col, { span: 12 },
                        React.createElement(Title, { level: 5 }, '参与福利'),
                        React.createElement('ul', null,
                            currentActivity.benefits.map((benefit, index) =>
                                React.createElement('li', { key: index }, benefit)
                            )
                        )
                    )
                ),

                React.createElement(Divider, null),

                React.createElement(Row, { gutter: 24 },
                    React.createElement(Col, { span: 8 },
                        React.createElement(Text, { strong: true }, '报名截止时间'),
                        React.createElement('div', null, currentActivity.deadline)
                    ),
                    React.createElement(Col, { span: 8 },
                        React.createElement(Text, { strong: true }, '已报名人数'),
                        React.createElement('div', null, `${currentActivity.registeredCount} 人`)
                    ),
                    React.createElement(Col, { span: 8 },
                        React.createElement(Text, { strong: true }, '名额限制'),
                        React.createElement('div', null, `${currentActivity.maxCount} 人`)
                    )
                ),

                React.createElement(Divider, null),

                React.createElement('div', { 
                    style: { 
                        background: '#f5f5f5', 
                        padding: 16, 
                        borderRadius: 4 
                    } 
                },
                    React.createElement(Title, { level: 5 }, '报名流程'),
                    React.createElement('ol', null,
                        React.createElement('li', null, '点击"立即报名"按钮'),
                        React.createElement('li', null, '跳转至外部报名平台'),
                        React.createElement('li', null, '填写完整的报名信息'),
                        React.createElement('li', null, '提交报名申请'),
                        React.createElement('li', null, '等待审核结果通知')
                    ),
                    React.createElement('div', { style: { marginTop: 12, color: '#666' } },
                        React.createElement(Text, { type: 'secondary' }, 
                            '注意：请确保填写的信息真实有效，虚假信息将导致报名失败。'
                        )
                    )
                )
            )
        ),

        // 样式
        React.createElement('style', null, `
            .selected-exhibition .ant-card-body {
                background-color: #f6ffed;
            }
        `)
    );
};

// 导出组件
window.RegistrationEntrance = RegistrationEntrance; 