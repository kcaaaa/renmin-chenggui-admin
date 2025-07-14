// 展商中心组件
const ExhibitorCenter = () => {
    const { Card, Button, Tag, Space, Row, Col, Tabs, List, Avatar, Progress, message } = antd;
    const { TabPane } = Tabs;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitorInfo, setExhibitorInfo] = React.useState({});
    
    // 模拟展商信息
    const mockExhibitorInfo = {
        name: '中车集团',
        boothNumber: 'A001',
        industry: '轨道交通设备',
        status: 'confirmed',
        setupProgress: 75,
        services: [
            { id: 1, name: '展位搭建', status: 'completed', progress: 100 },
            { id: 2, name: '电力接入', status: 'in-progress', progress: 60 },
            { id: 3, name: '网络配置', status: 'pending', progress: 0 },
            { id: 4, name: '安全检查', status: 'pending', progress: 0 }
        ],
        notifications: [
            { id: 1, title: '展位搭建完成', content: '您的展位已完成搭建，请及时验收', time: '2024-01-15 10:00', type: 'success' },
            { id: 2, title: '电力接入进行中', content: '电力接入工作正在进行，预计今日完成', time: '2024-01-15 09:00', type: 'info' },
            { id: 3, title: '参展须知', content: '请仔细阅读参展须知和安全规定', time: '2024-01-14 16:00', type: 'warning' }
        ],
        documents: [
            { id: 1, name: '参展合同', type: 'contract', status: 'signed', downloadUrl: '#' },
            { id: 2, name: '展位平面图', type: 'layout', status: 'available', downloadUrl: '#' },
            { id: 3, name: '参展手册', type: 'manual', status: 'available', downloadUrl: '#' },
            { id: 4, name: '安全须知', type: 'safety', status: 'available', downloadUrl: '#' }
        ],
        contacts: [
            { id: 1, name: '展务联系人', person: '张经理', phone: '13800138001', email: 'zhang@expo.com' },
            { id: 2, name: '技术支持', person: '李工程师', phone: '13800138002', email: 'li@expo.com' },
            { id: 3, name: '紧急联系', person: '王主管', phone: '13800138003', email: 'wang@expo.com' }
        ]
    };
    
    React.useEffect(() => {
        loadExhibitorInfo();
    }, []);
    
    const loadExhibitorInfo = () => {
        setLoading(true);
        setTimeout(() => {
            setExhibitorInfo(mockExhibitorInfo);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'confirmed': { color: 'green', text: '已确认' },
            'pending': { color: 'orange', text: '待确认' },
            'cancelled': { color: 'red', text: '已取消' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getServiceStatusTag = (status) => {
        const statusMap = {
            'completed': { color: 'green', text: '已完成' },
            'in-progress': { color: 'blue', text: '进行中' },
            'pending': { color: 'default', text: '待开始' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getNotificationType = (type) => {
        const typeMap = {
            'success': { color: 'green', icon: '✓' },
            'info': { color: 'blue', icon: 'ℹ' },
            'warning': { color: 'orange', icon: '⚠' },
            'error': { color: 'red', icon: '✗' }
        };
        return typeMap[type] || { color: 'default', icon: '•' };
    };
    
    const downloadDocument = (doc) => {
        message.success(`下载 ${doc.name}`);
    };
    
    const requestService = (service) => {
        message.info(`申请服务：${service}`);
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '展商中心'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '展商信息管理和服务中心')
        ]),
        
        React.createElement(Row, {
            key: 'overview',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'info', span: 18 },
                React.createElement(Card, {
                    title: '展商信息'
                }, [
                    React.createElement('div', {
                        key: 'basic',
                        style: { marginBottom: 16 }
                    }, [
                        React.createElement('h3', { key: 'name', style: { margin: '0 0 8px 0' } }, exhibitorInfo.name),
                        React.createElement('p', { key: 'booth', style: { margin: '0 0 8px 0' } }, `展位号：${exhibitorInfo.boothNumber}`),
                        React.createElement('p', { key: 'industry', style: { margin: '0 0 8px 0' } }, `行业：${exhibitorInfo.industry}`),
                        React.createElement('p', { key: 'status', style: { margin: 0 } }, '状态：', getStatusTag(exhibitorInfo.status))
                    ]),
                    React.createElement('div', {
                        key: 'progress'
                    }, [
                        React.createElement('h4', { key: 'title' }, '展位搭建进度'),
                        React.createElement(Progress, {
                            key: 'bar',
                            percent: exhibitorInfo.setupProgress,
                            status: exhibitorInfo.setupProgress === 100 ? 'success' : 'active'
                        })
                    ])
                ])
            ),
            React.createElement(Col, { key: 'actions', span: 6 },
                React.createElement(Card, {
                    title: '快捷操作'
                }, React.createElement(Space, {
                    direction: 'vertical',
                    style: { width: '100%' }
                }, [
                    React.createElement(Button, {
                        key: 'update',
                        type: 'primary',
                        block: true,
                        onClick: () => message.info('更新展商信息')
                    }, '更新信息'),
                    React.createElement(Button, {
                        key: 'contact',
                        block: true,
                        onClick: () => message.info('联系展务')
                    }, '联系展务'),
                    React.createElement(Button, {
                        key: 'feedback',
                        block: true,
                        onClick: () => message.info('意见反馈')
                    }, '意见反馈')
                ]))
            )
        ]),
        
        React.createElement(Card, {
            key: 'tabs'
        }, React.createElement(Tabs, {
            defaultActiveKey: 'services'
        }, [
            React.createElement(TabPane, {
                key: 'services',
                tab: '服务进度'
            }, React.createElement(List, {
                dataSource: exhibitorInfo.services || [],
                renderItem: (item) => React.createElement(List.Item, {
                    actions: [
                        React.createElement(Button, {
                            key: 'request',
                            type: 'link',
                            size: 'small',
                            onClick: () => requestService(item.name),
                            disabled: item.status === 'completed'
                        }, item.status === 'completed' ? '已完成' : '申请服务')
                    ]
                }, React.createElement(List.Item.Meta, {
                    title: React.createElement('div', {
                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                    }, [
                        React.createElement('span', { key: 'name' }, item.name),
                        getServiceStatusTag(item.status)
                    ]),
                    description: React.createElement(Progress, {
                        percent: item.progress,
                        size: 'small'
                    })
                }))
            })),
            
            React.createElement(TabPane, {
                key: 'notifications',
                tab: '通知消息'
            }, React.createElement(List, {
                dataSource: exhibitorInfo.notifications || [],
                renderItem: (item) => {
                    const typeConfig = getNotificationType(item.type);
                    return React.createElement(List.Item, {}, React.createElement(List.Item.Meta, {
                        avatar: React.createElement(Avatar, {
                            style: { backgroundColor: typeConfig.color }
                        }, typeConfig.icon),
                        title: item.title,
                        description: React.createElement('div', {}, [
                            React.createElement('p', { key: 'content', style: { margin: '0 0 4px 0' } }, item.content),
                            React.createElement('span', { key: 'time', style: { color: '#8c8c8c', fontSize: '12px' } }, item.time)
                        ])
                    }));
                }
            })),
            
            React.createElement(TabPane, {
                key: 'documents',
                tab: '相关文档'
            }, React.createElement(List, {
                dataSource: exhibitorInfo.documents || [],
                renderItem: (item) => React.createElement(List.Item, {
                    actions: [
                        React.createElement(Button, {
                            key: 'download',
                            type: 'link',
                            size: 'small',
                            onClick: () => downloadDocument(item)
                        }, '下载')
                    ]
                }, React.createElement(List.Item.Meta, {
                    title: item.name,
                    description: React.createElement(Tag, {
                        color: item.status === 'signed' ? 'green' : 'blue'
                    }, item.status === 'signed' ? '已签署' : '可下载')
                }))
            })),
            
            React.createElement(TabPane, {
                key: 'contacts',
                tab: '联系方式'
            }, React.createElement(List, {
                dataSource: exhibitorInfo.contacts || [],
                renderItem: (item) => React.createElement(List.Item, {
                    actions: [
                        React.createElement(Button, {
                            key: 'call',
                            type: 'link',
                            size: 'small',
                            onClick: () => message.info(`拨打电话：${item.phone}`)
                        }, '拨打电话'),
                        React.createElement(Button, {
                            key: 'email',
                            type: 'link',
                            size: 'small',
                            onClick: () => message.info(`发送邮件：${item.email}`)
                        }, '发送邮件')
                    ]
                }, React.createElement(List.Item.Meta, {
                    title: item.name,
                    description: React.createElement('div', {}, [
                        React.createElement('p', { key: 'person', style: { margin: '0 0 4px 0' } }, `联系人：${item.person}`),
                        React.createElement('p', { key: 'phone', style: { margin: '0 0 4px 0' } }, `电话：${item.phone}`),
                        React.createElement('p', { key: 'email', style: { margin: 0 } }, `邮箱：${item.email}`)
                    ])
                }))
            }))
        ]))
    ]);
};

window.ExhibitorCenter = ExhibitorCenter; 