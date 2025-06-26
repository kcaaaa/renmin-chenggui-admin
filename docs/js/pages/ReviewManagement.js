// 审核管理页面 - 基于新功能规范重构
const ReviewManagement = () => {
    const { Tabs, Table, Card, Button, Space, Tag, Input, Select, Modal, Progress, Alert, Tooltip, Row, Col, Descriptions, Badge, Statistic, Form, message, DatePicker, RangePicker } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker: DateRangePicker } = DatePicker;
    
    const [activeTab, setActiveTab] = React.useState('image');
    const [imageQueue, setImageQueue] = React.useState([]);
    const [videoQueue, setVideoQueue] = React.useState([]);
    const [interactionQueue, setInteractionQueue] = React.useState([]);
    const [specialQueue, setSpecialQueue] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(null);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [typeFilter, setTypeFilter] = React.useState('all');
    const [authorTypeFilter, setAuthorTypeFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);
    const [priorityFilter, setPriorityFilter] = React.useState('all');
    
    const [stats, setStats] = React.useState({
        image: { pending: 145, approved: 892, rejected: 23 },
        video: { pending: 56, approved: 234, rejected: 12 },
        interaction: { pending: 389, approved: 1567, rejected: 45 },
        special: { pending: 8, approved: 67, rejected: 3 }
    });

    React.useEffect(() => {
        loadCurrentQueue();
    }, [activeTab, searchText, statusFilter, typeFilter, authorTypeFilter, timeRange, priorityFilter]);

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('all');
        setTypeFilter('all');
        setAuthorTypeFilter('all');
        setTimeRange(null);
        setPriorityFilter('all');
    };

    // 导出数据
    const handleExport = () => {
        const currentData = getCurrentData();
        const filteredData = filterData(currentData);
        
        message.loading('正在导出数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条${getTabDisplayName(activeTab)}数据`);
        }, 2000);
    };

    // 获取当前Tab的数据
    const getCurrentData = () => {
        switch(activeTab) {
            case 'image': return imageQueue;
            case 'video': return videoQueue;
            case 'interaction': return interactionQueue;
            case 'special': return specialQueue;
            default: return [];
        }
    };

    // 获取Tab显示名称
    const getTabDisplayName = (tab) => {
        const names = {
            image: '图文内容',
            video: '视频内容', 
            interaction: '互动内容',
            special: '特殊审核'
        };
        return names[tab] || '内容';
    };

    // 数据筛选逻辑
    const filterData = (data) => {
        return data.filter(item => {
            // 文本搜索
            if (searchText && !item.title?.toLowerCase().includes(searchText.toLowerCase()) && 
                !item.content?.toLowerCase().includes(searchText.toLowerCase()) &&
                !item.author?.toLowerCase().includes(searchText.toLowerCase())) {
                return false;
            }
            
            // 状态筛选
            if (statusFilter !== 'all' && item.status !== statusFilter) {
                return false;
            }
            
            // 类型筛选
            if (typeFilter !== 'all' && item.type !== typeFilter) {
                return false;
            }
            
            // 作者类型筛选
            if (authorTypeFilter !== 'all' && item.authorType !== authorTypeFilter) {
                return false;
            }
            
            // 优先级筛选
            if (priorityFilter !== 'all' && item.priority !== priorityFilter) {
                return false;
            }
            
            // 时间范围筛选
            if (timeRange && timeRange.length === 2) {
                const itemTime = new Date(item.submitTime);
                const startTime = timeRange[0].startOf('day');
                const endTime = timeRange[1].endOf('day');
                if (itemTime < startTime || itemTime > endTime) {
                    return false;
                }
            }
            
            return true;
        });
    };

    // 渲染搜索和筛选工具栏
    const renderSearchToolbar = () => {
        return React.createElement(Card, {
            style: { marginBottom: '16px' },
            bodyStyle: { padding: '16px' }
        }, [
            React.createElement(Row, {
                key: 'search-row',
                gutter: [16, 16],
                align: 'middle'
            }, [
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Search, {
                        placeholder: `搜索${getTabDisplayName(activeTab)}名称、内容或作者`,
                        value: searchText,
                        onChange: (e) => setSearchText(e.target.value),
                        onSearch: (value) => setSearchText(value),
                        allowClear: true,
                        enterButton: true
                    })
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: "状态筛选",
                        value: statusFilter,
                        onChange: setStatusFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Option, { value: 'all' }, '全部状态'),
                        React.createElement(Option, { value: 'pending' }, '待审核'),
                        React.createElement(Option, { value: 'ai_reviewing' }, 'AI审核中'),
                        React.createElement(Option, { value: 'manual_review' }, '人工复审'),
                        React.createElement(Option, { value: 'approved' }, '已通过'),
                        React.createElement(Option, { value: 'rejected' }, '未通过'),
                        React.createElement(Option, { value: 'pending_dingding' }, '等待钉钉审批'),
                        React.createElement(Option, { value: 'joint_review' }, '联合审核中')
                    ])
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: "作者类型",
                        value: authorTypeFilter,
                        onChange: setAuthorTypeFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Option, { value: 'all' }, '全部作者'),
                        React.createElement(Option, { value: 'user' }, '普通用户'),
                        React.createElement(Option, { value: 'association' }, '协会'),
                        React.createElement(Option, { value: 'exhibition' }, '会展')
                    ])
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: "优先级",
                        value: priorityFilter,
                        onChange: setPriorityFilter,
                        style: { width: '100%' }
                    }, [
                        React.createElement(Option, { value: 'all' }, '全部优先级'),
                        React.createElement(Option, { value: 'high' }, '高优先级'),
                        React.createElement(Option, { value: 'normal' }, '普通优先级'),
                        React.createElement(Option, { value: 'low' }, '低优先级')
                    ])
                ]),
                React.createElement(Col, { span: 5 }, [
                    React.createElement('div', {
                        style: { 
                            height: '32px', 
                            lineHeight: '32px', 
                            color: '#999',
                            textAlign: 'center',
                            background: '#f5f5f5',
                            borderRadius: '6px'
                        }
                    }, '时间筛选（暂未开放）')
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            onClick: resetFilters
                        }, '重置'),
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => loadCurrentQueue()
                        }, '搜索')
                    ])
                ])
            ])
        ]);
    };

    // 渲染批量操作工具栏
    const renderBatchToolbar = () => {
        const currentData = getCurrentData();
        const filteredData = filterData(currentData);
        
        return React.createElement(Card, {
            style: { marginBottom: '16px' },
            bodyStyle: { padding: '12px 16px' }
        }, [
            React.createElement(Row, {
                key: 'batch-row',
                justify: 'space-between',
                align: 'middle'
            }, [
                React.createElement(Col, {}, [
                    React.createElement(Space, {}, [
                        React.createElement('span', {
                            style: { color: '#666' }
                        }, `共 ${filteredData.length} 条记录`),
                        selectedRows.length > 0 && React.createElement('span', {
                            style: { color: '#1890ff' }
                        }, `已选择 ${selectedRows.length} 条`)
                    ])
                ]),
                React.createElement(Col, {}, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            type: 'primary',
                            disabled: selectedRows.length === 0,
                            onClick: () => handleBatchReview('approve')
                        }, `批量通过 (${selectedRows.length})`),
                        React.createElement(Button, {
                            danger: true,
                            disabled: selectedRows.length === 0,
                            onClick: () => handleBatchReview('reject')
                        }, `批量拒绝 (${selectedRows.length})`),
                        React.createElement(Button, {
                            onClick: handleExport
                        }, '导出数据'),
                        React.createElement(Button, {
                            onClick: () => loadCurrentQueue()
                        }, '刷新')
                    ])
                ])
            ])
        ]);
    };

    const loadCurrentQueue = () => {
        switch(activeTab) {
            case 'image':
                loadImageQueue();
                break;
            case 'video':
            loadVideoQueue();
                break;
            case 'interaction':
                loadInteractionQueue();
                break;
            case 'special':
                loadSpecialQueue();
                break;
            default:
                loadImageQueue();
        }
    };

    const loadImageQueue = () => {
        setLoading(true);
        setTimeout(() => {
            const mockQueue = [
                {
                    id: 'IMG001',
                    key: 'IMG001',
                    type: 'image',
                    title: '智能列车展示图片',
                    content: '展示最新智能列车技术的高清图片集',
                    author: '北京轨道交通协会',
                    authorType: 'association',
                    submitTime: '2024-01-15 14:30:25',
                    status: 'pending',
                    priority: 'high',
                    aiResult: {
                        score: 0.92,
                        riskLevel: 'low',
                        detectedIssues: [],
                        suggestion: 'recommend_approve'
                    },
                    imageCount: 5,
                    totalSize: '8.5MB'
                },
                {
                    id: 'IMG002',
                    key: 'IMG002',
                    type: 'image',
                    title: '地铁安全宣传海报',
                    content: '地铁安全乘车须知宣传海报',
                    author: '用户_张设计师',
                    authorType: 'user',
                    submitTime: '2024-01-15 16:45:12',
                    status: 'ai_reviewing',
                    priority: 'normal',
                    aiResult: {
                        score: 0.76,
                        riskLevel: 'medium',
                        detectedIssues: ['文字水印', '二维码'],
                        suggestion: 'require_manual_review'
                    },
                    imageCount: 3,
                    totalSize: '12.3MB'
                },
                {
                    id: 'IMG003',
                    key: 'IMG003',
                    type: 'image',
                    title: '展会现场照片',
                    content: '2024城轨展会现场活动照片',
                    author: '会展公司_小李',
                    authorType: 'exhibition',
                    submitTime: '2024-01-14 09:15:30',
                    status: 'approved',
                    priority: 'normal',
                    aiResult: {
                        score: 0.95,
                        riskLevel: 'low',
                        detectedIssues: [],
                        suggestion: 'auto_approve'
                    },
                    imageCount: 12,
                    totalSize: '25.8MB'
                }
            ];
            setImageQueue(mockQueue);
            setLoading(false);
        }, 500);
    };

    const loadVideoQueue = () => {
        setLoading(true);
        setTimeout(() => {
            const mockQueue = [
                {
                    id: 'VID001',
                    key: 'VID001',
                    type: 'video',
                    title: '城轨技术创新展示',
                    content: '展示最新的城市轨道交通技术和创新成果',
                    author: '中国城轨协会',
                    authorType: 'association',
                    submitTime: '2024-01-15 14:30:25',
                    status: 'pending',
                    priority: 'high',
                            duration: '05:42',
                    fileSize: '126.5MB',
                    resolution: '1920x1080',
                    aiResult: {
                        score: 0.89,
                        riskLevel: 'low',
                        detectedIssues: [],
                        frameAnalysis: { totalFrames: 8256, riskFrames: 2 },
                        audioAnalysis: { hasSensitiveWords: false, qualityScore: 0.88 },
                        suggestion: 'recommend_approve'
                    }
                },
                {
                    id: 'VID002',
                    key: 'VID002',
                    type: 'video',
                    title: '智能控制系统演示',
                    content: '展示新一代智能列车自动控制系统',
                    author: '用户_张工程师',
                    authorType: 'user',
                    submitTime: '2024-01-15 16:45:12',
                    status: 'manual_review',
                    priority: 'normal',
                    duration: '03:28',
                    fileSize: '89.2MB',
                    resolution: '1920x1080',
                    aiResult: {
                        score: 0.65,
                        riskLevel: 'medium',
                        detectedIssues: ['可能涉及技术机密'],
                        frameAnalysis: { totalFrames: 5024, riskFrames: 8 },
                        audioAnalysis: { hasSensitiveWords: true, qualityScore: 0.75 },
                        suggestion: 'require_manual_review'
                    }
                }
            ];
            setVideoQueue(mockQueue);
            setLoading(false);
        }, 800);
    };

    const loadInteractionQueue = () => {
        setLoading(true);
        setTimeout(() => {
            const mockQueue = [
                {
                    id: 'INT001',
                    key: 'INT001',
                    type: 'comment',
                    content: '这个技术真的很棒，希望能够早日投入使用！',
                    author: '用户_科技爱好者',
                    authorType: 'user',
                    targetContent: '智能列车控制系统介绍',
                    submitTime: '2024-01-15 18:30:25',
                    status: 'pending',
                    aiResult: {
                        score: 0.95,
                        riskLevel: 'low',
                        detectedIssues: [],
                        suggestion: 'auto_approve'
                    }
                },
                {
                    id: 'INT002',
                    key: 'INT002',
                    type: 'private_message',
                    content: '您好，我对贵公司的产品很感兴趣，能否提供详细资料？联系方式：138****8888',
                    author: '用户_采购经理',
                    authorType: 'user',
                    targetContent: '发送给：会展公司_展台负责人',
                    submitTime: '2024-01-15 17:15:40',
                    status: 'manual_review',
                    aiResult: {
                        score: 0.72,
                        riskLevel: 'medium',
                        detectedIssues: ['包含联系方式'],
                        suggestion: 'require_manual_review'
                    }
                },
                {
                    id: 'INT003',
                    key: 'INT003',
                    type: 'share_content',
                    content: '分享一个超棒的城轨技术视频！快来看看吧 #城市轨道交通 #技术创新',
                    author: '用户_技术分享',
                    authorType: 'user',
                    targetContent: '城轨技术创新展示视频',
                    submitTime: '2024-01-15 16:22:15',
                    status: 'approved',
                    aiResult: {
                        score: 0.88,
                        riskLevel: 'low',
                        detectedIssues: [],
                        suggestion: 'auto_approve'
                    }
                }
            ];
            setInteractionQueue(mockQueue);
            setLoading(false);
        }, 600);
    };

    const loadSpecialQueue = () => {
        setLoading(true);
        setTimeout(() => {
            const mockQueue = [
                {
                    id: 'SPE001',
                    key: 'SPE001',
                    type: 'association_content',
                    title: '2024年城轨行业发展报告',
                    content: '详细分析2024年城市轨道交通行业发展现状与趋势',
                    author: '中国城市轨道交通协会',
                    authorType: 'association',
                    submitTime: '2024-01-15 10:30:25',
                    status: 'pending_dingding',
                    priority: 'high',
                    workflow: 'dingding_approval',
                    aiResult: {
                        score: 0.94,
                        riskLevel: 'low',
                        detectedIssues: [],
                        suggestion: 'require_special_approval'
                    },
                    approvalStatus: 'waiting_dingding'
                },
                {
                    id: 'SPE002',
                    key: 'SPE002',
                    type: 'exhibition_content',
                    title: '参展企业产品展示视频',
                    content: '华为公司5G城轨通信解决方案展示',
                    author: '华为技术有限公司',
                    authorType: 'exhibition',
                    submitTime: '2024-01-15 14:45:12',
                    status: 'joint_review',
                    priority: 'normal',
                    workflow: 'exhibition_joint_review',
                    aiResult: {
                        score: 0.87,
                        riskLevel: 'low',
                        detectedIssues: [],
                        suggestion: 'require_joint_approval'
                    },
                    approvalStatus: 'platform_approved_waiting_organizer'
                }
            ];
            setSpecialQueue(mockQueue);
            setLoading(false);
        }, 700);
    };

    // 状态标签渲染
    const renderStatusTag = (status) => {
        const statusConfig = {
            pending: { color: 'orange', text: '待审核' },
            ai_reviewing: { color: 'blue', text: 'AI审核中' },
            manual_review: { color: 'purple', text: '人工复审' },
            approved: { color: 'green', text: '已通过' },
            rejected: { color: 'red', text: '未通过' },
            pending_dingding: { color: 'cyan', text: '等待钉钉审批' },
            joint_review: { color: 'gold', text: '联合审核中' }
        };
        const config = statusConfig[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    // 类型标签渲染
    const renderTypeTag = (type) => {
        const typeConfig = {
            image: { color: 'blue', text: '图文', icon: '🖼️' },
            video: { color: 'purple', text: '视频', icon: '🎥' },
            comment: { color: 'green', text: '评论', icon: '💬' },
            private_message: { color: 'orange', text: '私信', icon: '✉️' },
            share_content: { color: 'cyan', text: '分享', icon: '🔄' },
            association_content: { color: 'red', text: '协会内容', icon: '🏛️' },
            exhibition_content: { color: 'purple', text: '会展内容', icon: '🏢' }
        };
        const config = typeConfig[type] || { color: 'default', text: type, icon: '📄' };
        return React.createElement(Tag, { color: config.color }, [
            React.createElement('span', { key: 'icon' }, config.icon),
            ` ${config.text}`
        ]);
    };

    // 作者类型标签
    const renderAuthorTypeTag = (type) => {
        const config = {
            user: { color: 'default', text: '普通用户' },
            association: { color: 'blue', text: '协会' },
            exhibition: { color: 'purple', text: '会展' }
        };
        const t = config[type] || config.user;
        return React.createElement(Tag, { color: t.color, size: 'small' }, t.text);
    };

    // AI评分渲染 - 优化版
    const renderAIScore = (score, record) => {
        if (record.status === 'ai_reviewing') {
            return React.createElement(Tag, { color: "blue" }, "AI审核中");
        }
        if (score === undefined || score === null) {
            return React.createElement(Tag, {}, "无评分");
        }

        let status = 'success';
        if (score < 0.5) status = 'exception';
        else if (score < 0.8) status = 'normal';
        
        const percent = Math.round(score * 100);

        return React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }
        }, 
            React.createElement(Progress, {
                type: 'circle',
                percent: percent,
                width: 35, // 缩小尺寸
                format: () => `${percent}`, // 直接在圈内显示百分比
                status: status,
            })
        );
    };

    // 批量操作
    const handleBatchReview = (action) => {
        if (selectedRows.length === 0) {
            message.warning('请选择要操作的内容');
            return;
        }

        Modal.confirm({
            title: `确认${action === 'approve' ? '通过' : '拒绝'}选中的内容？`,
            content: `将对 ${selectedRows.length} 条内容执行${action === 'approve' ? '通过' : '拒绝'}操作`,
            onOk: () => {
                setLoading(true);
                setTimeout(() => {
                    setSelectedRows([]);
                    loadCurrentQueue();
                    message.success(`已${action === 'approve' ? '通过' : '拒绝'} ${selectedRows.length} 条内容`);
                }, 1000);
            }
        });
    };

    // 单个审核操作
    const handleSingleReview = (record, action, reason = '') => {
        setLoading(true);
        setTimeout(() => {
            loadCurrentQueue();
            message.success(`内容 ${record.id} ${action === 'approve' ? '审核通过' : '审核拒绝'}`);
        }, 800);
        setModalVisible(false);
    };

    // 查看详情
    const showDetail = (record) => {
        setCurrentItem(record);
        setModalVisible(true);
    };

    // 通用表格列配置
    const getCommonColumns = (specificColumns = []) => [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            fixed: 'left'
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: 100,
            render: renderTypeTag
        },
        ...specificColumns,
        {
            title: '作者',
            dataIndex: 'author',
            width: 150,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'name' }, text),
                React.createElement('div', { key: 'type', style: { marginTop: '4px' } }, 
                    renderAuthorTypeTag(record.authorType))
            ])
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            width: 150,
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 120,
            render: renderStatusTag
        },
        {
            title: 'AI评分',
            dataIndex: ['aiResult', 'score'],
            width: 90, // 调整列宽
            render: renderAIScore
        },
        {
            title: '操作',
            width: 200, // 增加列宽以防止折叠
            fixed: 'right',
            render: (_, record) => {
                const actions = [
                    React.createElement(Button, {
                        key: 'detail',
                        type: 'link', // 优化为链接按钮，更紧凑
                        size: 'small',
                        onClick: () => showDetail(record)
                    }, '详情'),
                ];

                // 根据状态条件渲染审核按钮
                if (record.status === 'pending' || record.status === 'manual_review') {
                    actions.push(
                        React.createElement(Button, {
                            key: 'approve',
                            type: 'primary',
                            size: 'small',
                            onClick: () => handleSingleReview(record, 'approve')
                        }, '通过')
                    );
                    actions.push(
                        React.createElement(Button, {
                            key: 'reject',
                            type: 'link', // 优化为链接按钮，更紧凑
                            danger: true,
                            size: 'small',
                            onClick: () => handleSingleReview(record, 'reject')
                        }, '拒绝')
                    );
                }
                
                return React.createElement(Space, { size: 'small' }, actions);
            }
        }
    ];

    // 图文审核列配置
    const imageColumns = getCommonColumns([
        {
            title: '内容标题',
            dataIndex: 'title',
            ellipsis: true,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', {
                    key: 'title',
                    style: { fontWeight: 'bold', marginBottom: '4px' }
                }, text),
                React.createElement('div', {
                    key: 'meta',
                    style: { fontSize: '12px', color: '#666' }
                }, `${record.imageCount} 张图片 | ${record.totalSize}`)
            ])
        }
    ]);

    // 视频审核列配置
    const videoColumns = getCommonColumns([
        {
            title: '视频信息',
            dataIndex: 'title',
            width: 250,
            render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'title',
                        style: { fontWeight: 'bold', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'meta',
                        style: { fontSize: '12px', color: '#666' }
                }, `${record.duration} | ${record.fileSize} | ${record.resolution}`)
            ])
        }
    ]);

    // 互动审核列配置
    const interactionColumns = getCommonColumns([
        {
            title: '互动内容',
            dataIndex: 'content',
            ellipsis: true,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', {
                    key: 'content',
                    style: { marginBottom: '4px' }
                }, text),
                record.targetContent && React.createElement('div', {
                    key: 'target',
                    style: { fontSize: '12px', color: '#666' }
                }, `关联：${record.targetContent}`)
            ])
        }
    ]);

    // 特殊流程列配置
    const specialColumns = getCommonColumns([
        {
            title: '内容标题',
            dataIndex: 'title',
            ellipsis: true
        },
        {
            title: '审批流程',
            dataIndex: 'workflow',
            width: 120,
            render: (workflow) => {
                const workflowMap = {
                    'dingding_approval': { color: 'blue', text: '钉钉审批' },
                    'exhibition_joint_review': { color: 'purple', text: '联合审核' }
                };
                const config = workflowMap[workflow] || { color: 'default', text: workflow };
                return React.createElement(Tag, { color: config.color }, config.text);
            }
        },
        {
            title: '审批状态',
            dataIndex: 'approvalStatus',
            width: 150,
            render: (status) => {
                const statusMap = {
                    'waiting_dingding': { color: 'orange', text: '等待钉钉审批' },
                    'platform_approved_waiting_organizer': { color: 'blue', text: '平台通过，等待主办方' },
                    'organizer_approved_waiting_platform': { color: 'cyan', text: '主办方通过，等待平台' },
                    'both_approved': { color: 'green', text: '双方通过' }
                };
                const config = statusMap[status] || { color: 'default', text: status };
                return React.createElement(Tag, { color: config.color, size: 'small' }, config.text);
            }
        }
    ]);

    // Tab配置
    const tabItems = [
        {
            key: 'image',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '🖼️ '),
                '图文审核',
                React.createElement(Badge, {
                    key: 'badge',
                    count: stats.image.pending,
                    size: 'small',
                    style: { marginLeft: 8 }
                })
            ]),
            children: React.createElement('div', {}, [
                renderSearchToolbar(),
                renderBatchToolbar(),
                React.createElement(Table, {
                    columns: imageColumns,
                    dataSource: filterData(imageQueue),
                    loading: loading,
                    rowSelection: {
                        selectedRowKeys: selectedRows,
                        onChange: setSelectedRows
                    },
                    scroll: { x: 1200 },
                    pagination: {
                        total: filterData(imageQueue).length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
                    }
                })
            ])
        },
        {
            key: 'video',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '🎥 '),
                '视频审核',
                React.createElement(Badge, {
                    key: 'badge',
                    count: stats.video.pending,
                    size: 'small',
                    style: { marginLeft: 8 }
                })
            ]),
            children: React.createElement('div', {}, [
                renderSearchToolbar(),
                renderBatchToolbar(),
                React.createElement(Table, {
                    columns: videoColumns,
                    dataSource: filterData(videoQueue),
                    loading: loading,
                    rowSelection: {
                        selectedRowKeys: selectedRows,
                        onChange: setSelectedRows
                    },
                    scroll: { x: 1200 },
                    pagination: {
                        total: filterData(videoQueue).length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
                    }
                })
            ])
        },
        {
            key: 'interaction',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '💬 '),
                '互动审核',
                React.createElement(Badge, {
                    key: 'badge',
                    count: stats.interaction.pending,
                    size: 'small',
                    style: { marginLeft: 8 }
                })
            ]),
            children: React.createElement('div', {}, [
                renderSearchToolbar(),
                renderBatchToolbar(),
                React.createElement(Table, {
                    columns: interactionColumns,
                    dataSource: filterData(interactionQueue),
                    loading: loading,
                    rowSelection: {
                        selectedRowKeys: selectedRows,
                        onChange: setSelectedRows
                    },
                    scroll: { x: 1200 },
                    pagination: {
                        total: filterData(interactionQueue).length,
                        pageSize: 15,
                        showSizeChanger: true,
                        showTotal: (total, range) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
                    }
                })
            ])
        },
        {
            key: 'special',
            label: React.createElement('span', {}, [
                React.createElement('span', { key: 'icon' }, '⚡ '),
                '特殊流程',
                React.createElement(Badge, {
                    key: 'badge',
                    count: stats.special.pending,
                    size: 'small',
                    style: { marginLeft: 8 }
                })
            ]),
            children: React.createElement('div', {}, [
                React.createElement(Alert, {
                    message: '特殊审批流程',
                    description: '协会内容需钉钉审批，会展内容需联合审核',
                    type: 'info',
                    showIcon: true,
                    style: { marginBottom: '16px' }
                }),
                renderSearchToolbar(),
                renderBatchToolbar(),
                React.createElement(Table, {
                    columns: specialColumns,
                    dataSource: filterData(specialQueue),
                    loading: loading,
                    scroll: { x: 1200 },
                    pagination: {
                        total: filterData(specialQueue).length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
                    }
                })
            ])
        }
    ];

    return React.createElement('div', { className: 'review-management-page' }, [
        // 统计卡片
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'image-stat', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement(Statistic, {
                        title: '图文审核',
                        value: stats.image.pending,
                        suffix: '/ 待审核',
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'video-stat', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement(Statistic, {
                        title: '视频审核',
                        value: stats.video.pending,
                        suffix: '/ 待审核',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { key: 'interaction-stat', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement(Statistic, {
                        title: '互动审核',
                        value: stats.interaction.pending,
                        suffix: '/ 待审核',
                        valueStyle: { color: '#13c2c2' }
                    })
                )
            ),
            React.createElement(Col, { key: 'special-stat', span: 6 },
                React.createElement(Card, { size: 'small' }, 
                    React.createElement(Statistic, {
                        title: '特殊流程',
                        value: stats.special.pending,
                        suffix: '/ 待审核',
                        valueStyle: { color: '#f5222d' }
                    })
                )
            )
        ]),

        // 主要内容Tab
        React.createElement(Tabs, {
            key: 'main-tabs',
            activeKey: activeTab,
            onChange: (key) => {
                setActiveTab(key);
                setSelectedRows([]); // 切换Tab时清空选择
            },
            items: tabItems
        }),

        // 详情模态框
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '内容审核详情',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            width: 800,
            footer: currentItem && (currentItem.status === 'pending' || currentItem.status === 'manual_review') ? [
                React.createElement(Button, {
                    key: 'reject',
                    danger: true,
                    onClick: () => {
                        Modal.confirm({
                            title: '确认拒绝',
                            content: '确定要拒绝这条内容吗？',
                            onOk: () => handleSingleReview(currentItem, 'reject')
                        });
                    }
                }, '拒绝'),
                React.createElement(Button, {
                    key: 'approve',
                    type: 'primary',
                    onClick: () => handleSingleReview(currentItem, 'approve')
                }, '通过')
            ] : [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setModalVisible(false)
                }, '关闭')
            ]
        }, currentItem ? React.createElement('div', {}, [
            React.createElement(Descriptions, {
                key: 'basic-info',
                title: '基本信息',
                bordered: true,
                column: 2,
                items: [
                    { label: 'ID', children: currentItem.id },
                    { label: '类型', children: renderTypeTag(currentItem.type) },
                    { label: '标题', children: currentItem.title || currentItem.content },
                    { label: '作者', children: `${currentItem.author} (${renderAuthorTypeTag(currentItem.authorType)})` },
                    { label: '提交时间', children: currentItem.submitTime },
                    { label: '状态', children: renderStatusTag(currentItem.status) }
                ]
            }),
            
            React.createElement('div', {
                key: 'ai-analysis',
                style: { marginTop: 24 }
            }, [
                React.createElement('h4', { key: 'ai-title' }, 'AI分析结果'),
                React.createElement(Row, { key: 'ai-content', gutter: 16 }, [
                    React.createElement(Col, { key: 'score', span: 8 },
                        React.createElement(Card, { size: 'small', title: 'AI评分' },
                        React.createElement('div', { style: { textAlign: 'center' } },
                                renderAIScore(currentItem.aiResult?.score || 0, currentItem)
                            )
                        )
                    ),
                    React.createElement(Col, { key: 'risk', span: 8 },
                        React.createElement(Card, { size: 'small', title: '风险等级' },
                            React.createElement(Tag, {
                                color: currentItem.aiResult?.riskLevel === 'low' ? 'green' : 
                                       currentItem.aiResult?.riskLevel === 'medium' ? 'orange' : 'red'
                            }, currentItem.aiResult?.riskLevel || 'unknown')
                        )
                    ),
                    React.createElement(Col, { key: 'suggestion', span: 8 },
                        React.createElement(Card, { size: 'small', title: 'AI建议' },
                            React.createElement(Tag, {
                                color: currentItem.aiResult?.suggestion === 'auto_approve' ? 'green' : 
                                       currentItem.aiResult?.suggestion === 'recommend_approve' ? 'blue' : 'orange'
                            }, {
                                'auto_approve': '自动通过',
                                'recommend_approve': '建议通过',
                                'require_manual_review': '需人工审核'
                            }[currentItem.aiResult?.suggestion] || currentItem.aiResult?.suggestion)
                        )
                    )
                ])
            ]),

            currentItem.aiResult?.detectedIssues?.length > 0 && React.createElement('div', {
                key: 'detected-issues',
                style: { marginTop: 16 }
            }, [
                React.createElement('h5', { key: 'issues-title' }, '检测到的问题'),
                React.createElement('div', { key: 'issues-list' },
                    currentItem.aiResult.detectedIssues.map((issue, index) =>
                        React.createElement(Tag, {
                            key: index,
                            color: 'red',
                            style: { marginBottom: 8 }
                        }, issue)
                    )
                )
            ])
        ]) : null)
    ]);
};

window.ReviewManagement = ReviewManagement; 
