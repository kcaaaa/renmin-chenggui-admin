// 直播管理页面组件
function LiveManagement() {
    const [activeTab, setActiveTab] = React.useState('live-list');
    const [loading, setLoading] = React.useState(false);
    const [selectedLive, setSelectedLive] = React.useState(null);
    const [liveData, setLiveData] = React.useState(null);
    const [createLiveVisible, setCreateLiveVisible] = React.useState(false);
    const [createLiveForm] = antd.Form.useForm();

    // 获取直播管理数据
    React.useEffect(() => {
        setLoading(true);
        // 模拟API调用
        setTimeout(() => {
            setLiveData(window.MockData.liveManagementData);
            setLoading(false);
        }, 500);
    }, []);

    // 如果数据还没加载完成，显示加载状态
    if (!liveData) {
        return React.createElement('div', { className: 'loading-spinner' });
    }

    // 新建直播表单
    const renderCreateLiveForm = () => {
        const { Form, Input, Select, DatePicker, Radio, Switch, Upload, Button, Row, Col, TimePicker, InputNumber } = antd;
        
        return React.createElement(Form, {
            form: createLiveForm,
            layout: 'vertical',
            onFinish: handleCreateLive,
            style: { maxHeight: '70vh', overflow: 'auto', padding: '0 4px' }
        }, [
            // 基本信息
            React.createElement('div', {
                key: 'basic-section',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('h4', {
                    key: 'title',
                    style: { 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '16px',
                        borderBottom: '2px solid var(--primary-color)',
                        paddingBottom: '8px'
                    }
                }, '📺 直播基本信息'),
                
                React.createElement(Row, { key: 'row1', gutter: 16 }, [
                    React.createElement(Col, { key: 'title', span: 12 },
                        React.createElement(Form.Item, {
                            label: '直播标题',
                            name: 'title',
                            rules: [{ required: true, message: '请输入直播标题' }]
                        }, React.createElement(Input, {
                            placeholder: '请输入直播标题，如：2024城轨创新技术论坛'
                        }))
                    ),
                    React.createElement(Col, { key: 'type', span: 12 },
                        React.createElement(Form.Item, {
                            label: '直播类型',
                            name: 'liveType',
                            initialValue: 'live'
                        }, React.createElement(Radio.Group, {}, [
                            React.createElement(Radio, { key: 'live', value: 'live' }, '📺 直播'),
                            React.createElement(Radio, { key: 'video', value: 'video' }, '🎬 录播'),
                            React.createElement(Radio, { key: 'screen', value: 'screen' }, '💻 屏幕分享')
                        ]))
                    )
                ]),
                
                React.createElement(Form.Item, {
                    key: 'description',
                    label: '直播简介',
                    name: 'description',
                    rules: [{ required: true, message: '请输入直播简介' }]
                }, React.createElement(Input.TextArea, {
                    rows: 3,
                    placeholder: '请输入直播简介，介绍直播内容、主讲人等信息'
                })),
                
                React.createElement(Row, { key: 'row2', gutter: 16 }, [
                    React.createElement(Col, { key: 'exhibition', span: 12 },
                        React.createElement(Form.Item, {
                            label: '所属展会',
                            name: 'exhibitionId',
                            rules: [{ required: true, message: '请选择所属展会' }]
                        }, React.createElement(Select, {
                            placeholder: '请选择展会'
                        }, [
                            React.createElement(Select.Option, { key: 'ex1', value: 'exhibition_001' }, '中国城市轨道交通博览会'),
                            React.createElement(Select.Option, { key: 'ex2', value: 'exhibition_002' }, '轨道交通智能化展'),
                            React.createElement(Select.Option, { key: 'ex3', value: 'exhibition_003' }, '城轨技术创新大会')
                        ]))
                    ),
                    React.createElement(Col, { key: 'presenter', span: 12 },
                        React.createElement(Form.Item, {
                            label: '主讲人',
                            name: 'presenter',
                            rules: [{ required: true, message: '请输入主讲人' }]
                        }, React.createElement(Input, {
                            placeholder: '请输入主讲人姓名'
                        }))
                    )
                ])
            ]),
            
            // 时间设置
            React.createElement('div', {
                key: 'time-section',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('h4', {
                    key: 'title',
                    style: { 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '16px',
                        borderBottom: '2px solid var(--primary-color)',
                        paddingBottom: '8px'
                    }
                }, '⏰ 开播时间'),
                
                React.createElement(Row, { key: 'time-row', gutter: 16 }, [
                    React.createElement(Col, { key: 'start-date', span: 8 },
                        React.createElement(Form.Item, {
                            label: '开播日期',
                            name: 'startDate',
                            rules: [{ required: true, message: '请选择开播日期' }]
                        }, React.createElement(DatePicker, {
                            style: { width: '100%' },
                            placeholder: '选择日期'
                        }))
                    ),
                    React.createElement(Col, { key: 'start-time', span: 8 },
                        React.createElement(Form.Item, {
                            label: '开播时间',
                            name: 'startTime',
                            rules: [{ required: true, message: '请选择开播时间' }]
                        }, React.createElement(TimePicker, {
                            style: { width: '100%' },
                            format: 'HH:mm',
                            placeholder: '选择时间'
                        }))
                    ),
                    React.createElement(Col, { key: 'duration', span: 8 },
                        React.createElement(Form.Item, {
                            label: '预计时长(分钟)',
                            name: 'duration',
                            rules: [{ required: true, message: '请输入预计时长' }]
                        }, React.createElement(InputNumber, {
                            style: { width: '100%' },
                            min: 15,
                            max: 480,
                            placeholder: '如：120'
                        }))
                    )
                ])
            ]),
            
            // 显示设置
            React.createElement('div', {
                key: 'display-section',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('h4', {
                    key: 'title',
                    style: { 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '16px',
                        borderBottom: '2px solid var(--primary-color)',
                        paddingBottom: '8px'
                    }
                }, '🎨 显示设置'),
                
                React.createElement(Row, { key: 'display-row', gutter: 16 }, [
                    React.createElement(Col, { key: 'cover', span: 12 },
                        React.createElement(Form.Item, {
                            label: '直播封面',
                            name: 'cover'
                        }, React.createElement(Upload, {
                            listType: 'picture-card',
                            maxCount: 1,
                            beforeUpload: () => false
                        }, React.createElement('div', {}, [
                            React.createElement('div', { key: 'icon', style: { fontSize: '24px' } }, '📷'),
                            React.createElement('div', { key: 'text', style: { marginTop: '8px' } }, '上传封面')
                        ])))
                    ),
                    React.createElement(Col, { key: 'settings', span: 12 }, [
                        React.createElement(Form.Item, {
                            key: 'comment',
                            label: '评论设置',
                            name: 'enableComment',
                            valuePropName: 'checked',
                            initialValue: true
                        }, React.createElement(Switch, {
                            checkedChildren: '开启',
                            unCheckedChildren: '关闭'
                        })),
                        React.createElement(Form.Item, {
                            key: 'image',
                            label: '图片直播',
                            name: 'enableImageLive',
                            valuePropName: 'checked',
                            initialValue: false
                        }, React.createElement(Switch, {
                            checkedChildren: '开启',
                            unCheckedChildren: '关闭'
                        })),
                        React.createElement(Form.Item, {
                            key: 'record',
                            label: '自动录制',
                            name: 'autoRecord',
                            valuePropName: 'checked',
                            initialValue: true
                        }, React.createElement(Switch, {
                            checkedChildren: '开启',
                            unCheckedChildren: '关闭'
                        }))
                    ])
                ])
            ]),
            
            // 审核设置
            React.createElement('div', {
                key: 'moderation-section',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('h4', {
                    key: 'title',
                    style: { 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '16px',
                        borderBottom: '2px solid var(--primary-color)',
                        paddingBottom: '8px'
                    }
                }, '🛡️ 审核设置'),
                
                React.createElement(Row, { key: 'mod-row', gutter: 16 }, [
                    React.createElement(Col, { key: 'level', span: 12 },
                        React.createElement(Form.Item, {
                            label: '审核级别',
                            name: 'moderationLevel',
                            initialValue: 'medium'
                        }, React.createElement(Select, {
                            placeholder: '选择审核级别'
                        }, [
                            React.createElement(Select.Option, { key: 'strict', value: 'strict' }, '🔴 严格 - 所有内容人工审核'),
                            React.createElement(Select.Option, { key: 'medium', value: 'medium' }, '🟡 中等 - AI+人工审核'),
                            React.createElement(Select.Option, { key: 'loose', value: 'loose' }, '🟢 宽松 - AI自动审核')
                        ]))
                    ),
                    React.createElement(Col, { key: 'access', span: 12 },
                        React.createElement(Form.Item, {
                            label: '观看权限',
                            name: 'accessLevel',
                            initialValue: 'public'
                        }, React.createElement(Select, {
                            placeholder: '选择观看权限'
                        }, [
                            React.createElement(Select.Option, { key: 'public', value: 'public' }, '🌍 公开 - 所有人可观看'),
                            React.createElement(Select.Option, { key: 'registered', value: 'registered' }, '👤 注册用户'),
                            React.createElement(Select.Option, { key: 'vip', value: 'vip' }, '⭐ VIP用户'),
                            React.createElement(Select.Option, { key: 'private', value: 'private' }, '🔒 私有 - 仅邀请用户')
                        ]))
                    )
                ])
            ]),
            
            // 技术配置
            React.createElement('div', {
                key: 'tech-section',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('h4', {
                    key: 'title',
                    style: { 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '16px',
                        borderBottom: '2px solid var(--primary-color)',
                        paddingBottom: '8px'
                    }
                }, '⚙️ 技术配置'),
                
                React.createElement(Row, { key: 'tech-row', gutter: 16 }, [
                    React.createElement(Col, { key: 'quality', span: 8 },
                        React.createElement(Form.Item, {
                            label: '画质设置',
                            name: 'quality',
                            initialValue: '1080p'
                        }, React.createElement(Select, {}, [
                            React.createElement(Select.Option, { key: '720p', value: '720p' }, '720P 高清'),
                            React.createElement(Select.Option, { key: '1080p', value: '1080p' }, '1080P 超清'),
                            React.createElement(Select.Option, { key: '4k', value: '4k' }, '4K 超高清')
                        ]))
                    ),
                    React.createElement(Col, { key: 'bitrate', span: 8 },
                        React.createElement(Form.Item, {
                            label: '码率(kbps)',
                            name: 'bitrate',
                            initialValue: 2000
                        }, React.createElement(InputNumber, {
                            style: { width: '100%' },
                            min: 500,
                            max: 8000,
                            step: 100
                        }))
                    ),
                    React.createElement(Col, { key: 'fps', span: 8 },
                        React.createElement(Form.Item, {
                            label: '帧率(fps)',
                            name: 'fps',
                            initialValue: 30
                        }, React.createElement(Select, {}, [
                            React.createElement(Select.Option, { key: '15', value: 15 }, '15 fps'),
                            React.createElement(Select.Option, { key: '30', value: 30 }, '30 fps'),
                            React.createElement(Select.Option, { key: '60', value: 60 }, '60 fps')
                        ]))
                    )
                ])
            ])
        ]);
    };

    // 处理创建直播
    const handleCreateLive = (values) => {
        console.log('创建直播:', values);
        antd.message.loading('正在创建直播...', 2);
        setTimeout(() => {
            antd.message.success('直播创建成功！');
            setCreateLiveVisible(false);
            createLiveForm.resetFields();
            // 这里可以刷新直播列表
        }, 2000);
    };

    // 状态标签渲染
    const renderStatusTag = (status) => {
        const statusConfig = {
            'live': { text: '直播中', className: 'live' },
            'scheduled': { text: '即将开始', className: 'scheduled' },
            'ended': { text: '已结束', className: 'ended' },
            'replay': { text: '可回放', className: 'replay' }
        };
        const config = statusConfig[status] || { text: status, className: 'ended' };
        return React.createElement('span', {
            className: `live-status-tag ${config.className}`
        }, config.text);
    };

    // 审核状态标签渲染
    const renderModerationStatusTag = (status) => {
        const statusConfig = {
            'approved': { text: '已通过', className: 'approved' },
            'pending': { text: '待审核', className: 'pending' },
            'rejected': { text: '已拒绝', className: 'rejected' },
            'auto_blocked': { text: '自动拦截', className: 'auto_blocked' }
        };
        const config = statusConfig[status] || { text: status, className: 'pending' };
        return React.createElement('span', {
            className: `moderation-status-tag ${config.className}`
        }, config.text);
    };

    // 渲染统计卡片
    const renderStatCard = (title, value, change, changeType, icon) => {
        return React.createElement('div', { className: 'live-stat-card' }, [
            React.createElement('div', { className: 'live-stat-header', key: 'header' }, [
                 React.createElement('span', null, title),
                 React.createElement('span', { className: 'live-stat-icon' }, icon)
            ]),
            React.createElement('div', { className: 'live-stat-value', key: 'value' }, value),
            React.createElement('div', { className: `live-stat-change ${changeType}`, key: 'change' }, change)
        ]);
    };

    // 直播列表视图
    const renderLiveList = () => {
        const { Button, Input } = antd;
        return React.createElement('div', null, [
            // 操作栏
            React.createElement('div', {
                key: 'operation-bar',
                className: 'live-operation-bar'
            }, [
                React.createElement(Input.Search, { 
                    placeholder: "搜索直播...", 
                    style: { width: 300 } 
                }),
                React.createElement('div', {
                    key: 'actions',
                    className: 'live-operation-actions'
                }, [
                    React.createElement(Button, {
                        key: 'batch',
                    }, ['批量操作']),
                    React.createElement(Button, {
                        key: 'create',
                        type: 'primary',
                        icon: React.createElement('span', null, '📹'),
                        onClick: () => setCreateLiveVisible(true)
                    }, '新建直播'),
                ])
            ]),

            // 统计卡片
            React.createElement('div', {
                key: 'stats',
                className: 'live-stat-grid'
            }, [
                renderStatCard('今日直播', liveData.liveStats.today.totalLives, '+2 较昨日', 'positive', '📅'),
                renderStatCard('进行中', liveData.liveStats.today.activeLives, '实时数据', '', '📡'),
                renderStatCard('当前观看', liveData.liveStats.today.totalViewers.toLocaleString(), '+15% 较昨日', 'positive', '👀'),
                renderStatCard('峰值观看', liveData.liveStats.today.peakViewers.toLocaleString(), '+8% 较昨日', 'positive', '🚀'),
            ]),

            // 直播列表
            React.createElement('div', {
                key: 'table',
                className: 'live-table-container'
            },
                React.createElement('table', { className: 'live-data-table' }, [
                    React.createElement('thead', { key: 'thead' },
                        React.createElement('tr', null, [
                            React.createElement('th', { key: 'info' }, '直播信息'),
                            React.createElement('th', { key: 'status' }, '状态'),
                            React.createElement('th', { key: 'exhibition' }, '展会'),
                            React.createElement('th', { key: 'presenter' }, '主讲人'),
                            React.createElement('th', { key: 'time' }, '时间'),
                            React.createElement('th', { key: 'viewers' }, '观看数据'),
                            React.createElement('th', { key: 'actions' }, '操作')
                        ])
                    ),
                    React.createElement('tbody', { key: 'tbody' },
                        liveData.liveList.map(live =>
                            React.createElement('tr', { key: live.id }, [
                                React.createElement('td', { key: 'info' },
                                    React.createElement('div', {
                                        className: 'live-info-display'
                                    }, [
                                        React.createElement('img', {
                                            key: 'cover',
                                            src: live.cover,
                                            alt: live.title,
                                            className: 'live-cover-image'
                                        }),
                                        React.createElement('div', {
                                            key: 'content',
                                            className: 'live-title-desc'
                                        }, [
                                            React.createElement('div', {
                                                key: 'title',
                                                className: 'live-title'
                                            }, live.title),
                                            React.createElement('div', {
                                                key: 'desc',
                                                className: 'live-description'
                                            }, live.description)
                                        ])
                                    ])
                                ),
                                React.createElement('td', { key: 'status' }, renderStatusTag(live.status)),
                                React.createElement('td', { key: 'exhibition' }, live.exhibitionName),
                                React.createElement('td', { key: 'presenter' },
                                    React.createElement('div', {
                                        className: 'presenter-info'
                                    }, [
                                        React.createElement('img', {
                                            key: 'avatar',
                                            src: live.presenterAvatar,
                                            alt: live.presenter,
                                            className: 'presenter-avatar'
                                        }),
                                        React.createElement('span', {
                                            key: 'name',
                                            className: 'presenter-name'
                                        }, live.presenter)
                                    ])
                                ),
                                React.createElement('td', { key: 'time' },
                                    React.createElement('div', {
                                        className: 'time-display'
                                    }, [
                                        React.createElement('div', {
                                            key: 'start',
                                            className: 'time-start'
                                        }, live.startTime),
                                        React.createElement('div', {
                                            key: 'end',
                                            className: 'time-end'
                                        }, `至 ${live.endTime}`)
                                    ])
                                ),
                                React.createElement('td', { key: 'viewers' },
                                    React.createElement('div', {
                                        className: 'viewer-stats'
                                    }, [
                                        React.createElement('div', {
                                            key: 'current',
                                            className: 'viewer-current'
                                        }, `观看: ${live.viewerCount.toLocaleString()}`),
                                        React.createElement('div', {
                                            key: 'peak',
                                            className: 'viewer-peak'
                                        }, `峰值: ${live.peakViewers.toLocaleString()}`)
                                    ])
                                ),
                                React.createElement('td', { key: 'actions' },
                                    React.createElement('div', {
                                        className: 'action-buttons'
                                    }, [
                                        React.createElement('button', {
                                            key: 'detail',
                                            className: 'action-button',
                                            onClick: () => setSelectedLive(live)
                                        }, '详情'),
                                        React.createElement('button', {
                                            key: 'manage',
                                            className: 'action-button'
                                        }, live.status === 'live' ? '管理' : '编辑'),
                                        live.status === 'ended' && React.createElement('button', {
                                            key: 'replay',
                                            className: 'action-button'
                                        }, '回放')
                                    ])
                                )
                            ])
                        )
                    )
                ])
            )
        ]);
    };

    // 评论管理视图
    const renderCommentManagement = () => {
        return React.createElement('div', { className: 'live-management-container' }, [
            // 操作栏
            React.createElement('div', {
                key: 'operation-bar',
                className: 'live-operation-bar'
            }, [
                React.createElement('h3', { 
                    key: 'title',
                    className: 'live-operation-title' 
                }, '评论管理'),
                React.createElement('div', {
                    key: 'actions',
                    className: 'live-operation-actions'
                }, [
                    React.createElement('select', {
                        key: 'filter',
                        style: { 
                            marginRight: '12px', 
                            padding: '8px 12px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }
                    }, [
                        React.createElement('option', { key: 'all', value: 'all' }, '全部直播'),
                        React.createElement('option', { key: 'live1', value: 'live_001' }, '2024城轨创新技术论坛'),
                        React.createElement('option', { key: 'live2', value: 'live_002' }, '智能信号系统展示')
                    ]),
                    React.createElement('button', {
                        key: 'batch',
                        className: 'live-button primary'
                    }, ['⚡ ', '批量审核'])
                ])
            ]),

            // 评论统计卡片
            React.createElement('div', {
                key: 'stats',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px',
                    marginBottom: '20px'
                }
            }, [
                React.createElement('div', {
                    key: 'total',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.liveStats.today.totalComments),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '今日评论'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+156 较昨日')
                ]),
                React.createElement('div', {
                    key: 'blocked',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.liveStats.today.blockedComments),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '拦截评论'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change negative' 
                    }, '+8 较昨日')
                ]),
                React.createElement('div', {
                    key: 'approval',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, '94.8%'),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '通过率'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+2.1% 较昨日')
                ])
            ]),

            // 评论列表
            React.createElement('div', {
                key: 'table',
                className: 'live-table-container'
            },
                React.createElement('table', { className: 'live-data-table' }, [
                    React.createElement('thead', { key: 'thead' },
                        React.createElement('tr', null, [
                            React.createElement('th', { key: 'user' }, '用户信息'),
                            React.createElement('th', { key: 'content' }, '评论内容'),
                            React.createElement('th', { key: 'time' }, '时间'),
                            React.createElement('th', { key: 'status' }, '状态'),
                            React.createElement('th', { key: 'score' }, 'AI得分'),
                            React.createElement('th', { key: 'interaction' }, '互动'),
                            React.createElement('th', { key: 'actions' }, '操作')
                        ])
                    ),
                    React.createElement('tbody', { key: 'tbody' },
                        liveData.liveComments.map(comment =>
                            React.createElement('tr', { key: comment.id }, [
                                React.createElement('td', { key: 'user' },
                                    React.createElement('div', {
                                        className: 'presenter-info'
                                    }, [
                                        React.createElement('img', {
                                            key: 'avatar',
                                            src: comment.userAvatar,
                                            alt: comment.username,
                                            className: 'presenter-avatar'
                                        }),
                                        React.createElement('div', { key: 'info' }, [
                                            React.createElement('div', {
                                                key: 'name',
                                                className: 'presenter-name'
                                            }, comment.username),
                                            React.createElement('div', {
                                                key: 'device',
                                                style: {
                                                    fontSize: '11px',
                                                    color: 'var(--text-secondary)'
                                                }
                                            }, comment.deviceInfo)
                                        ])
                                    ])
                                ),
                                React.createElement('td', { key: 'content' },
                                    React.createElement('div', {
                                        style: {
                                            maxWidth: '250px',
                                            wordBreak: 'break-word',
                                            color: comment.status === 'auto_blocked' ? 'var(--error-color)' : 'inherit',
                                            lineHeight: '1.4'
                                        }
                                    }, comment.content)
                                ),
                                React.createElement('td', { key: 'time' },
                                    React.createElement('div', {
                                        style: {
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)'
                                        }
                                    }, comment.timestamp)
                                ),
                                React.createElement('td', { key: 'status' }, renderModerationStatusTag(comment.status)),
                                React.createElement('td', { key: 'score' },
                                    React.createElement('span', {
                                        className: `ai-score ${comment.moderationScore >= 0.8 ? 'high' : 
                                                   comment.moderationScore >= 0.5 ? 'medium' : 'low'}`
                                    }, (comment.moderationScore * 100).toFixed(1) + '%')
                                ),
                                React.createElement('td', { key: 'interaction' },
                                    React.createElement('div', {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)'
                                        }
                                    }, ['👍 ', comment.likeCount])
                                ),
                                React.createElement('td', { key: 'actions' },
                                    React.createElement('div', {
                                        className: 'action-buttons'
                                    }, [
                                        comment.status === 'pending' && React.createElement('button', {
                                            key: 'approve',
                                            className: 'action-button success'
                                        }, '通过'),
                                        comment.status === 'pending' && React.createElement('button', {
                                            key: 'reject',
                                            className: 'action-button danger'
                                        }, '拒绝'),
                                        React.createElement('button', {
                                            key: 'detail',
                                            className: 'action-button'
                                        }, '详情')
                                    ])
                                )
                            ])
                        )
                    )
                ])
            )
        ]);
    };

    // 图片直播管理视图
    const renderImageManagement = () => {
        return React.createElement('div', { className: 'live-management-container' }, [
            // 操作栏
            React.createElement('div', {
                key: 'operation-bar',
                className: 'live-operation-bar'
            }, [
                React.createElement('h3', { 
                    key: 'title',
                    className: 'live-operation-title' 
                }, '图片直播管理'),
                React.createElement('div', {
                    key: 'actions',
                    className: 'live-operation-actions'
                }, [
                    React.createElement('button', {
                        key: 'upload',
                        className: 'live-button primary'
                    }, ['📷 ', '上传图片']),
                    React.createElement('button', {
                        key: 'batch',
                        className: 'live-button secondary'
                    }, ['⚙️ ', '批量管理'])
                ])
            ]),

            // 图片统计卡片
            React.createElement('div', {
                key: 'stats',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px',
                    marginBottom: '20px'
                }
            }, [
                React.createElement('div', {
                    key: 'total',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.liveStats.today.totalImages),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '今日图片'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+3 较昨日')
                ]),
                React.createElement('div', {
                    key: 'approved',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.liveStats.today.approvedImages),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '已通过'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+2 较昨日')
                ]),
                React.createElement('div', {
                    key: 'approval-rate',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, '89.2%'),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '通过率'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+1.5% 较昨日')
                ])
            ]),

            // 图片网格
            React.createElement('div', {
                key: 'images',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }
            },
                liveData.liveImages.map(image =>
                    React.createElement('div', {
                        key: image.id,
                        className: 'live-image-card'
                    }, [
                        React.createElement('img', {
                            key: 'preview',
                            src: image.url,
                            alt: image.title,
                            className: 'live-image-preview'
                        }),
                        React.createElement('div', {
                            key: 'content',
                            className: 'live-image-content'
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                className: 'live-image-header'
                            }, [
                                React.createElement('h4', {
                                    key: 'title',
                                    className: 'live-image-title'
                                }, image.title),
                                renderModerationStatusTag(image.status)
                            ]),
                            React.createElement('p', {
                                key: 'desc',
                                className: 'live-image-desc'
                            }, image.description),
                            React.createElement('div', {
                                key: 'meta',
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px'
                                }
                            }, [
                                React.createElement('span', { key: 'uploader' }, `上传者: ${image.uploaderName}`),
                                React.createElement('span', { key: 'time' }, image.uploadTime)
                            ]),
                            React.createElement('div', {
                                key: 'stats',
                                className: 'live-image-stats'
                            }, [
                                React.createElement('span', { key: 'views' }, `👁️ ${image.viewCount}`),
                                React.createElement('span', { key: 'likes' }, `👍 ${image.likeCount}`),
                                React.createElement('span', { key: 'size' }, image.fileSize)
                            ]),
                            React.createElement('div', {
                                key: 'score',
                                style: {
                                    marginBottom: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }
                            }, [
                                React.createElement('span', {
                                    key: 'label',
                                    style: { fontSize: '12px', color: 'var(--text-secondary)' }
                                }, 'AI得分:'),
                                React.createElement('span', {
                                    key: 'score',
                                    className: `ai-score ${image.moderationScore >= 0.8 ? 'high' : 
                                               image.moderationScore >= 0.5 ? 'medium' : 'low'}`
                                }, (image.moderationScore * 100).toFixed(1) + '%')
                            ]),
                            React.createElement('div', {
                                key: 'actions',
                                className: 'action-buttons'
                            }, [
                                React.createElement('button', {
                                    key: 'preview',
                                    className: 'action-button'
                                }, '预览'),
                                React.createElement('button', {
                                    key: 'edit',
                                    className: 'action-button'
                                }, '编辑'),
                                React.createElement('button', {
                                    key: 'delete',
                                    className: 'action-button danger'
                                }, '删除')
                            ])
                        ])
                    ])
                )
            )
        ]);
    };

    // 回放管理视图
    const renderReplayManagement = () => {
        return React.createElement('div', { className: 'live-management-container' }, [
            // 操作栏
            React.createElement('div', {
                key: 'operation-bar',
                className: 'live-operation-bar'
            }, [
                React.createElement('h3', { 
                    key: 'title',
                    className: 'live-operation-title' 
                }, '回放管理'),
                React.createElement('div', {
                    key: 'actions',
                    className: 'live-operation-actions'
                }, [
                    React.createElement('button', {
                        key: 'batch-download',
                        className: 'live-button primary'
                    }, ['⬇️ ', '批量下载']),
                    React.createElement('button', {
                        key: 'generate',
                        className: 'live-button secondary'
                    }, ['🎬 ', '生成回放'])
                ])
            ]),

            // 回放统计卡片
            React.createElement('div', {
                key: 'stats',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px',
                    marginBottom: '20px'
                }
            }, [
                React.createElement('div', {
                    key: 'total',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.replayList?.length || 0),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '回放总数'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+1 较昨日')
                ]),
                React.createElement('div', {
                    key: 'available',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.replayList?.filter(r => r.status === 'available').length || 0),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '可用回放'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change' 
                    }, '实时数据')
                ]),
                React.createElement('div', {
                    key: 'total-views',
                    className: 'live-stat-card'
                }, [
                    React.createElement('div', { 
                        key: 'value',
                        className: 'live-stat-value' 
                    }, liveData.replayList?.reduce((sum, r) => sum + r.viewCount, 0) || 0),
                    React.createElement('div', { 
                        key: 'label',
                        className: 'live-stat-label' 
                    }, '总观看次数'),
                    React.createElement('div', { 
                        key: 'change',
                        className: 'live-stat-change positive' 
                    }, '+45 较昨日')
                ])
            ]),

            // 回放列表
            React.createElement('div', {
                key: 'table',
                className: 'live-table-container'
            },
                React.createElement('table', { className: 'live-data-table' }, [
                    React.createElement('thead', { key: 'thead' },
                        React.createElement('tr', null, [
                            React.createElement('th', { key: 'info' }, '回放信息'),
                            React.createElement('th', { key: 'duration' }, '时长'),
                            React.createElement('th', { key: 'file' }, '文件信息'),
                            React.createElement('th', { key: 'stats' }, '观看数据'),
                            React.createElement('th', { key: 'status' }, '状态'),
                            React.createElement('th', { key: 'actions' }, '操作')
                        ])
                    ),
                    React.createElement('tbody', { key: 'tbody' },
                        liveData.replayList.map(replay =>
                            React.createElement('tr', { key: replay.id }, [
                                React.createElement('td', { key: 'info' },
                                    React.createElement('div', {
                                        className: 'live-info-display'
                                    }, [
                                        React.createElement('img', {
                                            key: 'thumbnail',
                                            src: replay.thumbnailUrl,
                                            alt: replay.title,
                                            className: 'live-cover-image',
                                            style: { width: '100px', height: '60px' }
                                        }),
                                        React.createElement('div', {
                                            key: 'content',
                                            className: 'live-title-desc'
                                        }, [
                                            React.createElement('div', {
                                                key: 'title',
                                                className: 'live-title'
                                            }, replay.title),
                                            React.createElement('div', {
                                                key: 'date',
                                                className: 'live-description'
                                            }, `创建时间: ${replay.createdAt}`)
                                        ])
                                    ])
                                ),
                                React.createElement('td', { key: 'duration' },
                                    React.createElement('div', {
                                        style: {
                                            fontWeight: '600',
                                            color: 'var(--text-primary)'
                                        }
                                    }, replay.duration)
                                ),
                                React.createElement('td', { key: 'file' },
                                    React.createElement('div', {
                                        className: 'viewer-stats'
                                    }, [
                                        React.createElement('div', {
                                            key: 'size',
                                            className: 'viewer-current'
                                        }, `${replay.fileSize} / ${replay.resolution}`),
                                        React.createElement('div', {
                                            key: 'encoding',
                                            className: 'viewer-peak'
                                        }, replay.encoding)
                                    ])
                                ),
                                React.createElement('td', { key: 'stats' },
                                    React.createElement('div', {
                                        className: 'viewer-stats'
                                    }, [
                                        React.createElement('div', {
                                            key: 'views',
                                            className: 'viewer-current'
                                        }, `👁️ ${replay.viewCount} 观看`),
                                        React.createElement('div', {
                                            key: 'downloads',
                                            className: 'viewer-peak'
                                        }, `⬇️ ${replay.downloadCount} 下载`)
                                    ])
                                ),
                                React.createElement('td', { key: 'status' },
                                    React.createElement('span', {
                                        className: `live-status-tag ${replay.status === 'available' ? 'replay' : 'scheduled'}`
                                    }, replay.status === 'available' ? '可用' : '处理中')
                                ),
                                React.createElement('td', { key: 'actions' },
                                    React.createElement('div', {
                                        className: 'action-buttons'
                                    }, [
                                        React.createElement('button', {
                                            key: 'play',
                                            className: 'action-button'
                                        }, '播放'),
                                        React.createElement('button', {
                                            key: 'edit',
                                            className: 'action-button'
                                        }, '编辑'),
                                        React.createElement('button', {
                                            key: 'download',
                                            className: 'action-button'
                                        }, '下载')
                                    ])
                                )
                            ])
                        )
                    )
                ])
            )
        ]);
    };

    return React.createElement('div', { className: 'page-container' }, [
        React.createElement('div', { 
            key: 'header',
            className: 'page-header' 
        }, [
            React.createElement('h2', { 
                key: 'title',
                className: 'page-title'
            }, '直播管理'),
            React.createElement('p', { 
                key: 'desc',
                className: 'page-description'
            }, '管理展会直播、评论互动、图片直播和回放内容')
        ]),

        // Tab导航
        React.createElement('div', { 
            key: 'tabs',
            className: 'live-tab-container' 
        }, [
            React.createElement('div', { 
                key: 'header',
                className: 'live-tab-header' 
            }, [
                React.createElement('button', {
                    key: 'live-list',
                    className: `live-tab-button ${activeTab === 'live-list' ? 'active' : ''}`,
                    onClick: () => setActiveTab('live-list')
                }, '📺 直播列表'),
                React.createElement('button', {
                    key: 'comments',
                    className: `live-tab-button ${activeTab === 'comments' ? 'active' : ''}`,
                    onClick: () => setActiveTab('comments')
                }, '💬 评论管理'),
                React.createElement('button', {
                    key: 'images',
                    className: `live-tab-button ${activeTab === 'images' ? 'active' : ''}`,
                    onClick: () => setActiveTab('images')
                }, '🖼️ 图片直播'),
                React.createElement('button', {
                    key: 'replay',
                    className: `live-tab-button ${activeTab === 'replay' ? 'active' : ''}`,
                    onClick: () => setActiveTab('replay')
                }, '🎬 回放管理')
            ]),

            React.createElement('div', { 
                key: 'content',
                className: 'live-tab-content' 
            }, [
                loading && React.createElement('div', { 
                    key: 'loading',
                    className: 'live-loading' 
                }, '加载中...'),
                !loading && activeTab === 'live-list' && renderLiveList(),
                !loading && activeTab === 'comments' && renderCommentManagement(),
                !loading && activeTab === 'images' && renderImageManagement(),
                !loading && activeTab === 'replay' && renderReplayManagement()
            ])
        ]),

        // 新建直播模态框
        React.createElement(antd.Modal, {
            key: 'create-modal',
            title: '新建直播',
            visible: createLiveVisible,
            onCancel: () => setCreateLiveVisible(false),
            footer: [
                React.createElement(antd.Button, {
                    key: 'back',
                    onClick: () => setCreateLiveVisible(false)
                }, '取消'),
                React.createElement(antd.Button, {
                    key: 'submit',
                    type: 'primary',
                    loading: loading,
                    onClick: () => createLiveForm.submit()
                }, '创建直播')
            ],
            width: 800
        }, renderCreateLiveForm()),

        // 直播详情弹窗
        selectedLive && React.createElement('div', {
            key: 'modal',
            className: 'live-modal-overlay',
            onClick: (e) => {
                if (e.target === e.currentTarget) {
                    setSelectedLive(null);
                }
            }
        },
            React.createElement('div', {
                className: 'live-modal-content',
                style: { maxWidth: '800px', maxHeight: '80vh', overflow: 'auto' }
            }, [
                React.createElement('div', {
                    key: 'header',
                    className: 'live-modal-header'
                }, [
                    React.createElement('h3', { 
                        key: 'title',
                        className: 'live-modal-title' 
                    }, `直播详情 - ${selectedLive.title}`),
                    React.createElement('button', {
                        key: 'close',
                        className: 'live-modal-close',
                        onClick: () => setSelectedLive(null)
                    }, '✕')
                ]),

                React.createElement('div', {
                    key: 'body',
                    className: 'live-modal-body'
                }, [
                    React.createElement('div', {
                        key: 'content',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '20px'
                        }
                    }, [
                        React.createElement('div', { key: 'basic' }, [
                            React.createElement('h4', { key: 'title' }, '基本信息'),
                            React.createElement('p', { key: 'id' }, `直播ID: ${selectedLive.id}`),
                            React.createElement('p', { key: 'exhibition' }, `展会: ${selectedLive.exhibitionName}`),
                            React.createElement('p', { key: 'presenter' }, `主讲人: ${selectedLive.presenter}`),
                            React.createElement('p', { key: 'status' }, ['状态: ', renderStatusTag(selectedLive.status)]),
                            React.createElement('p', { key: 'desc' }, `描述: ${selectedLive.description}`)
                        ]),
                        React.createElement('div', { key: 'stats' }, [
                            React.createElement('h4', { key: 'title' }, '观看数据'),
                            React.createElement('p', { key: 'current' }, `当前观看: ${selectedLive.viewerCount.toLocaleString()}`),
                            React.createElement('p', { key: 'peak' }, `峰值观看: ${selectedLive.peakViewers.toLocaleString()}`),
                            React.createElement('p', { key: 'likes' }, `点赞数: ${selectedLive.likeCount.toLocaleString()}`),
                            React.createElement('p', { key: 'comments' }, `评论数: ${selectedLive.commentCount.toLocaleString()}`)
                        ])
                    ]),

                    React.createElement('div', {
                        key: 'tech',
                        style: { marginTop: '20px' }
                    }, [
                        React.createElement('h4', { key: 'title' }, '技术信息'),
                        React.createElement('p', { key: 'push' }, `推流地址: ${selectedLive.pushUrl}`),
                        React.createElement('p', { key: 'pull' }, `拉流地址: ${selectedLive.pullUrl}`),
                        selectedLive.replayUrl && React.createElement('p', { key: 'replay' }, `回放地址: ${selectedLive.replayUrl}`)
                    ])
                ]),

                React.createElement('div', {
                    key: 'footer',
                    className: 'live-modal-footer'
                }, [
                    React.createElement('button', {
                        key: 'close',
                        className: 'live-button secondary',
                        onClick: () => setSelectedLive(null)
                    }, '关闭'),
                    React.createElement('button', {
                        key: 'edit',
                        className: 'live-button primary'
                    }, '编辑直播')
                ])
            ])
        )
    ]);
}

window.LiveManagement = LiveManagement; 