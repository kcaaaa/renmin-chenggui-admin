console.log('AIReview.js 加载中...');

// AI审核页面 - 利用AI对所有发布的内容进行初审
const AIReview = () => {
    const { Card, Table, Button, Select, DatePicker, Input, Tag, Space, message, Modal, Descriptions, Progress, Statistic, Row, Col } = antd;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [viewingContent, setViewingContent] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [filters, setFilters] = React.useState({
        contentType: '',
        aiResult: '',
        riskLevel: '',
        dateRange: null,
        keyword: ''
    });

    // 模拟统计数据
    const [stats, setStats] = React.useState({
        totalReviewed: 2456,
        todayReviewed: 89,
        aiPassRate: 78.5,
        highRiskCount: 45,
        pendingManual: 123
    });

    // 模拟AI审核数据
    const mockData = [
        {
            key: '1',
            id: 'AI001',
            title: '城轨建设新技术应用探讨',
            contentType: 'article',
            author: '技术部-张工',
            authorType: 'association',
            submitTime: '2024-01-15 14:30:00',
            aiReviewTime: '2024-01-15 14:31:25',
            aiResult: 'pass',
            confidence: 95.2,
            riskLevel: 'low',
            riskTags: ['正常内容'],
            status: 'pending_manual',
            content: '本文分析了当前城市轨道交通建设中的新技术应用情况，包括智能信号系统、自动驾驶技术等方面的发展趋势...',
            aiAnalysis: {
                textSafety: { score: 98, result: '通过', issues: [] },
                imageSafety: { score: 96, result: '通过', issues: [] },
                contentQuality: { score: 92, result: '优秀', issues: [] },
                politicalSensitivity: { score: 100, result: '安全', issues: [] }
            }
        },
        {
            key: '2',
            id: 'AI002',
            title: '轨道交通安全管理视频',
            contentType: 'video',
            author: '普通用户-李明',
            authorType: 'user',
            submitTime: '2024-01-15 10:20:00',
            aiReviewTime: '2024-01-15 10:23:45',
            aiResult: 'warning',
            confidence: 76.8,
            riskLevel: 'medium',
            riskTags: ['水印检测', '音频质量'],
            status: 'pending_manual',
            content: '视频内容展示了地铁安全管理的相关流程...',
            aiAnalysis: {
                videoSafety: { score: 85, result: '通过', issues: ['检测到第三方水印'] },
                audioSafety: { score: 78, result: '通过', issues: ['音频质量偏低'] },
                contentQuality: { score: 82, result: '良好', issues: ['画面清晰度一般'] },
                politicalSensitivity: { score: 100, result: '安全', issues: [] }
            }
        },
        {
            key: '3',
            id: 'AI003',
            title: '违规广告内容',
            contentType: 'article',
            author: '展商用户-某公司',
            authorType: 'exhibitor',
            submitTime: '2024-01-15 09:15:00',
            aiReviewTime: '2024-01-15 09:16:12',
            aiResult: 'reject',
            confidence: 92.3,
            riskLevel: 'high',
            riskTags: ['广告推广', '敏感词汇'],
            status: 'ai_rejected',
            content: '本产品具有革命性突破，绝对领先同行业...',
            aiAnalysis: {
                textSafety: { score: 45, result: '不通过', issues: ['包含广告推广词汇', '夸大宣传'] },
                contentQuality: { score: 35, result: '差', issues: ['内容质量低', '缺乏专业性'] },
                politicalSensitivity: { score: 100, result: '安全', issues: [] }
            }
        }
    ];

    React.useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000));
            setData(mockData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    const handleView = (record) => {
        setViewingContent(record);
        setModalVisible(true);
    };

    const handleManualReview = (record) => {
        message.info(`将内容"${record.title}"转入人工审核队列`);
        // 这里应该调用API将内容转入审批流程
    };

    const handleBatchManualReview = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请选择要转入人工审核的内容');
            return;
        }
        
        Modal.confirm({
            title: '批量转入人工审核',
            content: `确定要将选中的 ${selectedRowKeys.length} 项内容转入人工审核吗？`,
            onOk() {
                message.success('已转入人工审核队列');
                setSelectedRowKeys([]);
                loadData();
            }
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getContentTypeTag = (type) => {
        const typeMap = {
            'article': { color: 'blue', text: '图文' },
            'video': { color: 'purple', text: '视频' },
            'news': { color: 'cyan', text: '资讯' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getAIResultTag = (result) => {
        const resultMap = {
            'pass': { color: 'green', text: 'AI通过' },
            'warning': { color: 'orange', text: 'AI警告' },
            'reject': { color: 'red', text: 'AI拒绝' }
        };
        const config = resultMap[result] || { color: 'default', text: result };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getRiskLevelTag = (level) => {
        const levelMap = {
            'low': { color: 'green', text: '低风险' },
            'medium': { color: 'orange', text: '中风险' },
            'high': { color: 'red', text: '高风险' }
        };
        const config = levelMap[level] || { color: 'default', text: level };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const getStatusTag = (status) => {
        const statusMap = {
            'pending_manual': { color: 'blue', text: '待人工审核' },
            'ai_rejected': { color: 'red', text: 'AI已拒绝' },
            'approved': { color: 'green', text: '已通过' },
            'rejected': { color: 'red', text: '已拒绝' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    const columns = [
        {
            title: '内容信息',
                        dataIndex: 'title',
                        key: 'title',
            width: 250,
            render: (text, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'title',
                    style: { fontWeight: 'bold', marginBottom: 4 }
                }, text),
                React.createElement('div', { 
                    key: 'info',
                    style: { fontSize: '12px', color: '#666' }
                }, `ID: ${record.id} | ${record.author}`)
            ])
                    },
                    {
                        title: '类型',
            dataIndex: 'contentType',
            key: 'contentType',
            width: 80,
            render: getContentTypeTag
        },
        {
            title: 'AI审核结果',
            key: 'aiResult',
            width: 120,
            render: (_, record) => React.createElement('div', {}, [
                getAIResultTag(record.aiResult),
                React.createElement('div', { 
                    key: 'confidence',
                    style: { fontSize: '12px', color: '#666', marginTop: 2 }
                }, `置信度: ${record.confidence}%`)
            ])
        },
        {
            title: '风险等级',
            dataIndex: 'riskLevel',
            key: 'riskLevel',
            width: 100,
            render: getRiskLevelTag
        },
        {
            title: '风险标签',
            dataIndex: 'riskTags',
            key: 'riskTags',
            width: 150,
            render: (tags) => tags.map((tag, index) => 
                React.createElement(Tag, { 
                    key: index, 
                    size: 'small',
                    color: tag === '正常内容' ? 'green' : 'orange'
                }, tag)
            )
        },
        {
            title: 'AI审核时间',
            dataIndex: 'aiReviewTime',
            key: 'aiReviewTime',
            width: 150
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
            width: 120,
            render: getStatusTag
                    },
                    {
                        title: '操作',
                        key: 'action',
            width: 200,
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                            React.createElement(Button, {
                                key: 'view',
                                type: 'link',
                    size: 'small',
                    onClick: () => handleView(record)
                }, '查看详情'),
                record.status === 'pending_manual' && React.createElement(Button, {
                    key: 'manual',
                                type: 'link',
                                size: 'small',
                    onClick: () => handleManualReview(record)
                }, '转人工审核')
            ])
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        getCheckboxProps: (record) => ({
            disabled: record.status !== 'pending_manual'
        })
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        // 统计卡片
        React.createElement(Row, { 
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总审核数',
                        value: stats.totalReviewed,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '今日审核',
                        value: stats.todayReviewed,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: 'AI通过率',
                        value: stats.aiPassRate,
                        suffix: '%',
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '高风险内容',
                        value: stats.highRiskCount,
                        valueStyle: { color: '#ff4d4f' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待人工审核',
                        value: stats.pendingManual,
                        valueStyle: { color: '#722ed1' }
                    })
                )
            ),
            React.createElement(Col, { span: 4 }, 
                React.createElement(Button, {
                    type: 'primary',
                    onClick: loadData,
                    style: { width: '100%', height: '100%' }
                }, '刷新数据')
            )
        ]),

        // 筛选条件
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: 24 }
        }, [
            React.createElement(Row, { gutter: 16, align: 'middle' }, [
                React.createElement(Col, { span: 4 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, '内容类型：'),
                        React.createElement(Select, {
                            placeholder: '请选择',
                            style: { width: '100%' },
                            value: filters.contentType,
                            onChange: (value) => handleFilterChange('contentType', value),
                            allowClear: true
                        }, [
                            React.createElement(Option, { value: 'article' }, '图文'),
                            React.createElement(Option, { value: 'video' }, '视频'),
                            React.createElement(Option, { value: 'news' }, '资讯')
                        ])
                    ])
                ),
                React.createElement(Col, { span: 4 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, 'AI结果：'),
                        React.createElement(Select, {
                            placeholder: '请选择',
                            style: { width: '100%' },
                            value: filters.aiResult,
                            onChange: (value) => handleFilterChange('aiResult', value),
                            allowClear: true
                        }, [
                            React.createElement(Option, { value: 'pass' }, 'AI通过'),
                            React.createElement(Option, { value: 'warning' }, 'AI警告'),
                            React.createElement(Option, { value: 'reject' }, 'AI拒绝')
                        ])
                    ])
                ),
                React.createElement(Col, { span: 4 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, '风险等级：'),
                        React.createElement(Select, {
                            placeholder: '请选择',
                            style: { width: '100%' },
                            value: filters.riskLevel,
                            onChange: (value) => handleFilterChange('riskLevel', value),
                            allowClear: true
                        }, [
                            React.createElement(Option, { value: 'low' }, '低风险'),
                            React.createElement(Option, { value: 'medium' }, '中风险'),
                            React.createElement(Option, { value: 'high' }, '高风险')
                        ])
                    ])
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement('div', {}, [
                        React.createElement('span', { style: { marginRight: 8 } }, '审核时间：'),
                        React.createElement(RangePicker, {
                            style: { width: '100%' },
                            value: filters.dateRange,
                            onChange: (value) => handleFilterChange('dateRange', value)
                        })
                    ])
                ),
                React.createElement(Col, { span: 6 },
                    React.createElement(Input, {
                        placeholder: '搜索标题、作者',
                        value: filters.keyword,
                        onChange: (e) => handleFilterChange('keyword', e.target.value)
                    })
                )
            ])
        ]),

        // 批量操作
        React.createElement(Card, {
            key: 'batch',
            style: { marginBottom: 24 }
        }, 
            React.createElement(Space, {}, [
                React.createElement('span', {}, `已选择 ${selectedRowKeys.length} 项`),
                React.createElement(Button, {
                    type: 'primary',
                    disabled: selectedRowKeys.length === 0,
                    onClick: handleBatchManualReview
                }, '批量转入人工审核'),
                React.createElement('span', { 
                    style: { fontSize: '12px', color: '#666', marginLeft: 16 }
                }, '说明：AI审核通过的内容将自动进入人工复审环节，AI拒绝的内容直接拒绝。')
            ])
        ),

        // 内容列表
        React.createElement(Card, { key: 'table' },
            React.createElement(Table, {
                columns,
                dataSource: data,
                loading,
                rowSelection,
                pagination: {
                    total: 2456,
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }
            })
        ),

        // 查看详情弹窗
        React.createElement(Modal, {
            key: 'modal',
            title: 'AI审核详情',
            open: modalVisible,
            onCancel: () => setModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setModalVisible(false)
                }, '关闭'),
                viewingContent && viewingContent.status === 'pending_manual' && React.createElement(Button, {
                    key: 'manual',
                    type: 'primary',
                    onClick: () => {
                        handleManualReview(viewingContent);
                        setModalVisible(false);
                    }
                }, '转入人工审核')
            ],
            width: 800
        }, viewingContent && 
            React.createElement('div', {}, [
                React.createElement(Descriptions, {
                    key: 'basic',
                    title: '基本信息',
                    bordered: true,
                    column: 2,
                    style: { marginBottom: 16 }
                }, [
                    React.createElement(Descriptions.Item, { label: '内容标题' }, viewingContent.title),
                    React.createElement(Descriptions.Item, { label: '内容类型' }, getContentTypeTag(viewingContent.contentType)),
                    React.createElement(Descriptions.Item, { label: '发布者' }, viewingContent.author),
                    React.createElement(Descriptions.Item, { label: '提交时间' }, viewingContent.submitTime),
                    React.createElement(Descriptions.Item, { label: 'AI审核时间' }, viewingContent.aiReviewTime),
                    React.createElement(Descriptions.Item, { label: 'AI结果' }, getAIResultTag(viewingContent.aiResult)),
                    React.createElement(Descriptions.Item, { label: '置信度' }, `${viewingContent.confidence}%`),
                    React.createElement(Descriptions.Item, { label: '风险等级' }, getRiskLevelTag(viewingContent.riskLevel))
                ]),

                React.createElement('div', { key: 'content', style: { marginBottom: 16 } }, [
                    React.createElement('h4', { key: 'title' }, '内容预览'),
                    React.createElement('div', { 
                        key: 'text',
                        style: { 
                            padding: '12px', 
                            background: '#f5f5f5', 
                            borderRadius: '4px',
                            maxHeight: '200px',
                            overflow: 'auto'
                        }
                    }, viewingContent.content)
                ]),

                React.createElement('div', { key: 'analysis' }, [
                    React.createElement('h4', { key: 'title' }, 'AI分析结果'),
                    React.createElement(Row, { gutter: 16 }, 
                        Object.entries(viewingContent.aiAnalysis).map(([key, analysis]) => 
                            React.createElement(Col, { key, span: 12, style: { marginBottom: 16 } },
                                React.createElement(Card, { size: 'small' }, [
                                    React.createElement('h5', { key: 'title' }, {
                                        textSafety: '文本安全检测',
                                        imageSafety: '图片安全检测',
                                        videoSafety: '视频安全检测',
                                        audioSafety: '音频安全检测',
                                        contentQuality: '内容质量评估',
                                        politicalSensitivity: '政治敏感性检测'
                                    }[key]),
                                    React.createElement('div', { key: 'score' }, [
                                        React.createElement('span', {}, '评分: '),
                                        React.createElement(Progress, {
                                            percent: analysis.score,
                                            size: 'small',
                                            status: analysis.score >= 80 ? 'success' : analysis.score >= 60 ? 'active' : 'exception',
                                            style: { width: '60%', display: 'inline-block', marginLeft: 8 }
                                        }),
                                        React.createElement('span', { style: { marginLeft: 8 } }, `${analysis.score}分`)
                                    ]),
                                    React.createElement('div', { key: 'result' }, `结果: ${analysis.result}`),
                                    analysis.issues.length > 0 && React.createElement('div', { key: 'issues' }, [
                                        React.createElement('span', {}, '问题: '),
                                        analysis.issues.map((issue, index) => 
                                            React.createElement(Tag, { key: index, color: 'orange', size: 'small' }, issue)
                                        )
                                    ])
                                ])
                            )
                        )
                    )
                ])
            ])
        )
    ]);
};

// 导出组件
window.AIReview = AIReview;
console.log('AIReview 组件已加载');
