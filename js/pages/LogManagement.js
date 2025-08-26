// 日志管理页面 - 等保三级合规日志管理
const LogManagement = () => {
    console.log('LogManagement component is rendering...');
    
    const { Row, Col, Card, Button, Space, Alert, Tag, Table, Modal, Form, Input, Select, message, Tabs, DatePicker, Radio, Switch, TreeSelect, Divider, Statistic, Progress, Tooltip, Descriptions, Badge } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker: DateRangePicker } = DatePicker;
    const { TextArea } = Input;
    
    const [activeTab, setActiveTab] = React.useState('normal_user');
    
    // 状态管理
    const [logModalVisible, setLogModalVisible] = React.useState(false);
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    
    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [logTypeFilter, setLogTypeFilter] = React.useState('all');
    const [userFilter, setUserFilter] = React.useState('');
    const [ipFilter, setIpFilter] = React.useState('');
    const [timeRange, setTimeRange] = React.useState(null);
    
    // 模拟数据 - 根据最新需求文档的11种日志类型
    const [logData, setLogData] = React.useState({
        // 1. 普通用户操作日志
        normal_user: [
            {
                id: 'nu_001',
                username: '张三',
                phone: '13800138001',
                ipv4: '192.168.1.100',
                ipv6: '2001:db8::1',
                operationType: '登录',
                operationResult: '成功',
                operationTime: '2024-01-15 09:30:25'
            },
            {
                id: 'nu_002',
                username: '李四',
                phone: '13800138002',
                ipv4: '192.168.1.101',
                ipv6: '2001:db8::2',
                operationType: '发布',
                operationResult: '成功',
                operationTime: '2024-01-15 10:15:30'
            },
            {
                id: 'nu_003',
                username: '王五',
                phone: '13800138003',
                ipv4: '192.168.1.102',
                ipv6: '2001:db8::3',
                operationType: '评论',
                operationResult: '成功',
                operationTime: '2024-01-15 11:20:15'
            }
        ],
        
        // 2. 协会用户操作日志
        association_user: [
            {
                id: 'au_001',
                username: '协会管理员',
                phone: '13900139001',
                ipv4: '192.168.2.100',
                ipv6: '2001:db8::100',
                operationType: '登录',
                operationResult: '成功',
                operationTime: '2024-01-15 08:30:25'
            },
            {
                id: 'au_002',
                username: '协会编辑',
                phone: '13900139002',
                ipv4: '192.168.2.101',
                ipv6: '2001:db8::101',
                operationType: '发布',
                operationResult: '成功',
                operationTime: '2024-01-15 09:15:30'
            }
        ],
        
        // 3. 展商用户操作日志
        exhibitor_user: [
            {
                id: 'eu_001',
                username: '华为展商',
                phone: '13700137001',
                ipv4: '192.168.3.100',
                ipv6: '2001:db8::200',
                operationType: '登录',
                operationResult: '成功',
                operationTime: '2024-01-15 08:00:25'
            },
            {
                id: 'eu_002',
                username: '中兴展商',
                phone: '13700137002',
                ipv4: '192.168.3.101',
                ipv6: '2001:db8::201',
                operationType: '维护',
                operationResult: '成功',
                operationTime: '2024-01-15 09:45:30'
            }
        ],
        
        // 4. 协会作品AI审核日志
        association_ai_review: [
            {
                id: 'aar_001',
                workId: 'work_001',
                workName: '城轨技术发展趋势分析',
                publisher: '协会官方',
                reviewRating: '无风险',
                operationStatus: '通过',
                operationResult: '成功',
                submitTime: '2024-01-15 09:00:00',
                approvalTime: '2024-01-15 09:05:00'
            },
            {
                id: 'aar_002',
                workId: 'work_002',
                workName: '轨道交通安全标准',
                publisher: '协会技术部',
                reviewRating: '低危',
                operationStatus: '人工审核',
                operationResult: '成功',
                submitTime: '2024-01-15 10:00:00',
                approvalTime: '2024-01-15 10:10:00'
            }
        ],
        
        // 5. 协会作品人工审核日志
        association_manual_review: [
            {
                id: 'amr_001',
                title: '城轨技术发展趋势分析',
                publisher: '协会官方',
                reviewer: '审核员A',
                aiReviewRating: '无风险',
                operationType: '通过',
                operationResult: '成功',
                submitTime: '2024-01-15 09:00:00',
                approvalTime: '2024-01-15 09:05:00',
                remark: ''
            },
            {
                id: 'amr_002',
                title: '轨道交通安全标准',
                publisher: '协会技术部',
                reviewer: '审核员B',
                aiReviewRating: '低危',
                operationType: '通过',
                operationResult: '成功',
                submitTime: '2024-01-15 10:00:00',
                approvalTime: '2024-01-15 10:10:00',
                remark: ''
            }
        ],
        
        // 6. 普通作品AI审核日志
        normal_ai_review: [
            {
                id: 'nar_001',
                workId: 'work_003',
                workName: '我的城轨见闻',
                publisher: '张三',
                reviewRating: '无风险',
                operationStatus: '通过',
                operationResult: '成功',
                submitTime: '2024-01-15 11:00:00',
                approvalTime: '2024-01-15 11:02:00'
            },
            {
                id: 'nar_002',
                workId: 'work_004',
                workName: '城轨摄影作品',
                publisher: '李四',
                reviewRating: '低危',
                operationStatus: '人工审核',
                operationResult: '成功',
                submitTime: '2024-01-15 12:00:00',
                approvalTime: '2024-01-15 12:05:00'
            }
        ],
        
        // 7. 普通作品人工审核日志
        normal_manual_review: [
            {
                id: 'nmr_001',
                title: '我的城轨见闻',
                publisher: '张三',
                reviewer: '审核员C',
                aiReviewRating: '无风险',
                operationStatus: '通过',
                operationResult: '成功',
                submitTime: '2024-01-15 11:00:00',
                approvalTime: '2024-01-15 11:02:00',
                remark: ''
            },
            {
                id: 'nmr_002',
                title: '城轨摄影作品',
                publisher: '李四',
                reviewer: '审核员D',
                aiReviewRating: '低危',
                operationStatus: '通过',
                operationResult: '成功',
                submitTime: '2024-01-15 12:00:00',
                approvalTime: '2024-01-15 12:05:00',
                remark: ''
            }
        ],
        
        // 8. 用户冻结/解冻日志
        user_freeze_unfreeze: [
            {
                id: 'ufu_001',
                targetUsername: '违规用户',
                targetPhone: '13600136001',
                operator: '管理员A',
                operationType: '冻结',
                operationResult: '成功',
                operationTime: '2024-01-15 13:00:00',
                remark: '发布违规内容，冻结7天'
            },
            {
                id: 'ufu_002',
                targetUsername: '违规用户',
                targetPhone: '13600136001',
                operator: '管理员B',
                operationType: '解冻',
                operationResult: '成功',
                operationTime: '2024-01-15 20:00:00',
                remark: '冻结期已满，自动解冻'
            }
        ],
        
        // 9. 用户注册日志
        user_registration: [
            {
                id: 'ur_001',
                username: '新用户A',
                phone: '13500135001',
                id: 'user_001',
                ipv4: '192.168.4.100',
                ipv6: '2001:db8::300',
                registrationTime: '2024-01-15 14:00:00',
                operationResult: '成功'
            },
            {
                id: 'ur_002',
                username: '新用户B',
                phone: '13500135002',
                id: 'user_002',
                ipv4: '192.168.4.101',
                ipv6: '2001:db8::301',
                registrationTime: '2024-01-15 15:00:00',
                operationResult: '成功'
            }
        ],
        
        // 10. 展会维护日志
        exhibition_maintenance: [
            {
                id: 'em_001',
                username: '维护员A',
                phone: '13400134001',
                ipv4: '192.168.5.100',
                ipv6: '2001:db8::400',
                maintenanceCompany: '华为技术有限公司',
                operationType: '编辑',
                operationColumn: '展商简介',
                operationResult: '成功',
                operationTime: '2024-01-15 16:00:00'
            },
            {
                id: 'em_002',
                username: '维护员B',
                phone: '13400134002',
                ipv4: '192.168.5.101',
                ipv6: '2001:db8::401',
                maintenanceCompany: '中兴通讯股份有限公司',
                operationType: '新增',
                operationColumn: '核心展品展示',
                operationResult: '成功',
                operationTime: '2024-01-15 17:00:00'
            }
        ],
        
        // 11. 系统操作日志
        system_operation: [
            {
                id: 'so_001',
                operatorAccount: 'admin_001',
                operatorName: '系统管理员',
                operationBehavior: '修改系统配置',
                operationModule: '系统设置',
                operationTime: '2024-01-15 18:00:00',
                operationResult: '成功',
                ipAddress: '192.168.1.1',
                operationDetails: '修改AI审核阈值从0.8调整为0.7'
            },
            {
                id: 'so_002',
                operatorAccount: 'op_001',
                operatorName: '运营专员',
                operationBehavior: '批量用户管理',
                operationModule: '用户管理',
                operationTime: '2024-01-15 19:00:00',
                operationResult: '成功',
                ipAddress: '192.168.1.2',
                operationDetails: '批量重置50个用户的密码'
            }
        ]
    });

    React.useEffect(() => {
        loadLogData();
    }, []);

    // 模拟加载数据
    const loadLogData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            message.success('日志数据加载成功');
        } catch (error) {
            message.error('数据加载失败');
        } finally {
            setLoading(false);
        }
    };

    // 日志类型配置
    const LOG_TYPES = {
        normal_user: { label: '普通用户操作日志', color: 'blue', icon: '👤' },
        association_user: { label: '协会用户操作日志', color: 'green', icon: '🏢' },
        exhibitor_user: { label: '展商用户操作日志', color: 'orange', icon: '🏪' },
        association_ai_review: { label: '协会作品AI审核日志', color: 'purple', icon: '🤖' },
        association_manual_review: { label: '协会作品人工审核日志', color: 'cyan', icon: '👨‍💼' },
        normal_ai_review: { label: '普通作品AI审核日志', color: 'magenta', icon: '🤖' },
        normal_manual_review: { label: '普通作品人工审核日志', color: 'geekblue', icon: '👩‍💼' },
        user_freeze_unfreeze: { label: '用户冻结/解冻日志', color: 'red', icon: '🔒' },
        user_registration: { label: '用户注册日志', color: 'lime', icon: '📝' },
        exhibition_maintenance: { label: '展会维护日志', color: 'gold', icon: '🏗️' },
        system_operation: { label: '系统操作日志', color: 'volcano', icon: '⚙️' }
    };

    // 操作类型配置
    const OPERATION_TYPES = {
        '登录': { color: 'blue' },
        '评论': { color: 'green' },
        '发布': { color: 'orange' },
        '下架': { color: 'red' },
        '私信': { color: 'purple' },
        '注销': { color: 'volcano' },
        '维护': { color: 'cyan' },
        '编辑': { color: 'geekblue' },
        '删除': { color: 'red' },
        '新增': { color: 'green' },
        '通过': { color: 'green' },
        '驳回': { color: 'red' },
        '冻结': { color: 'red' },
        '解冻': { color: 'green' }
    };

    // 操作结果配置
    const RESULT_CONFIG = {
        '成功': { color: 'green' },
        '失败': { color: 'red' }
    };

    // 审核评级配置
    const REVIEW_RATINGS = {
        '无风险': { color: 'green' },
        '低危': { color: 'orange' },
        '中危': { color: 'red' },
        '高危': { color: 'volcano' }
    };

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setLogTypeFilter('all');
        setUserFilter('');
        setIpFilter('');
        setTimeRange(null);
    };

    // 导出日志
    const handleExport = () => {
        const currentData = getCurrentData();
        const filteredData = filterData(currentData);
        
        message.loading('正在导出日志数据...', 2);
        setTimeout(() => {
            message.success(`已导出 ${filteredData.length} 条${getTabDisplayName(activeTab)}数据`);
        }, 2000);
    };

    // 获取当前Tab的数据
    const getCurrentData = () => {
        return logData[activeTab] || [];
    };

    // 获取Tab显示名称
    const getTabDisplayName = (tab) => {
        return LOG_TYPES[tab]?.label || '日志';
    };

    // 数据筛选逻辑
    const filterData = (data) => {
        if (!data || data.length === 0) return [];
        
        return data.filter(item => {
            // 文本搜索
            if (searchText && 
                !Object.values(item).some(value => 
                    String(value).toLowerCase().includes(searchText.toLowerCase())
                )) {
                return false;
            }
            
            // 日志类型筛选
            if (logTypeFilter !== 'all' && activeTab !== logTypeFilter) {
                return false;
            }
            
            // 用户筛选
            if (userFilter && 
                !item.username?.toLowerCase().includes(userFilter.toLowerCase()) &&
                !item.publisher?.toLowerCase().includes(userFilter.toLowerCase()) &&
                !item.operator?.toLowerCase().includes(userFilter.toLowerCase())) {
                return false;
            }
            
            // IP地址筛选
            if (ipFilter && 
                !item.ipv4?.includes(ipFilter) &&
                !item.ipv6?.includes(ipFilter)) {
                return false;
            }
            
            // 时间范围筛选
            if (timeRange && timeRange.length === 2) {
                const itemTime = new Date(item.operationTime || item.submitTime || item.registrationTime);
                const startTime = timeRange[0].startOf('day');
                const endTime = timeRange[1].endOf('day');
                if (itemTime < startTime || itemTime > endTime) {
                    return false;
                }
            }
            
            return true;
        });
    };

    // 查看日志详情
    const viewLogDetails = (log) => {
        setSelectedLog(log);
        setLogModalVisible(true);
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
                        placeholder: '搜索任意字段内容',
                        value: searchText,
                        onChange: (e) => setSearchText(e.target.value),
                        onSearch: (value) => setSearchText(value),
                        allowClear: true,
                        enterButton: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: "用户名/发布人/操作人",
                        value: userFilter,
                        onChange: (e) => setUserFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Input, {
                        placeholder: "IP地址",
                        value: ipFilter,
                        onChange: (e) => setIpFilter(e.target.value),
                        allowClear: true
                    })
                ]),
                React.createElement(Col, { span: 6 }, [
                    React.createElement(DateRangePicker, {
                        placeholder: ['开始时间', '结束时间'],
                        value: timeRange,
                        onChange: setTimeRange,
                        style: { width: '100%' },
                        format: 'YYYY-MM-DD HH:mm',
                        showTime: true
                    })
                ]),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            onClick: resetFilters
                        }, '重置'),
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => loadLogData()
                        }, '搜索'),
                        React.createElement(Button, {
                            onClick: handleExport
                        }, '导出')
                    ])
                ])
            ])
        ]);
    };

    // 渲染统计卡片
    const renderStatistics = () => {
        const totalLogs = Object.values(logData).reduce((sum, logs) => sum + logs.length, 0);
        const todayLogs = Math.floor(totalLogs * 0.1); // 模拟今日日志数量
        
        return React.createElement(Row, {
            gutter: [16, 16],
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '总日志数',
                    value: totalLogs,
                    prefix: '📋'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '今日日志',
                    value: todayLogs,
                    prefix: '📅'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '日志类型',
                    value: Object.keys(LOG_TYPES).length,
                    prefix: '🏷️'
                }))
            ]),
            React.createElement(Col, { span: 6 }, [
                React.createElement(Card, {
                    size: 'small'
                }, React.createElement(Statistic, {
                    title: '等保三级',
                    value: '合规',
                    prefix: '✅',
                    valueStyle: { color: '#3f8600' }
                }))
            ])
        ]);
    };

    // 获取列定义
    const getColumns = () => {
        const baseColumns = [
            {
                title: '操作',
                key: 'action',
                width: 80,
                render: (_, record) => React.createElement(Button, {
                    type: 'link',
                    size: 'small',
                    onClick: () => viewLogDetails(record)
                }, '查看')
            }
        ];

        switch(activeTab) {
            case 'normal_user':
            case 'association_user':
            case 'exhibitor_user':
                return [
                    ...baseColumns,
                    { title: '用户名', dataIndex: 'username', key: 'username' },
                    { title: '手机号', dataIndex: 'phone', key: 'phone' },
                    { title: 'IPv4', dataIndex: 'ipv4', key: 'ipv4' },
                    { title: 'IPv6', dataIndex: 'ipv6', key: 'ipv6' },
                    { 
                        title: '操作类型', 
                        dataIndex: 'operationType', 
                        key: 'operationType',
                        render: (type) => React.createElement(Tag, {
                            color: OPERATION_TYPES[type]?.color || 'default'
                        }, type)
                    },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    },
                    { title: '操作时间', dataIndex: 'operationTime', key: 'operationTime' }
                ];
            
            case 'association_ai_review':
            case 'normal_ai_review':
                return [
                    ...baseColumns,
                    { title: '作品ID', dataIndex: 'workId', key: 'workId' },
                    { title: '作品名称', dataIndex: 'workName', key: 'workName' },
                    { title: '发布人', dataIndex: 'publisher', key: 'publisher' },
                    { 
                        title: '审核评级', 
                        dataIndex: 'reviewRating', 
                        key: 'reviewRating',
                        render: (rating) => React.createElement(Tag, {
                            color: REVIEW_RATINGS[rating]?.color || 'default'
                        }, rating)
                    },
                    { title: '操作状态', dataIndex: 'operationStatus', key: 'operationStatus' },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    },
                    { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
                    { title: '审批时间', dataIndex: 'approvalTime', key: 'approvalTime' }
                ];
            
            case 'association_manual_review':
            case 'normal_manual_review':
                return [
                    ...baseColumns,
                    { title: '标题', dataIndex: 'title', key: 'title' },
                    { title: '发布人', dataIndex: 'publisher', key: 'publisher' },
                    { title: '审核人', dataIndex: 'reviewer', key: 'reviewer' },
                    { 
                        title: 'AI审核评级', 
                        dataIndex: 'aiReviewRating', 
                        key: 'aiReviewRating',
                        render: (rating) => React.createElement(Tag, {
                            color: REVIEW_RATINGS[rating]?.color || 'default'
                        }, rating)
                    },
                    { 
                        title: '操作类型', 
                        dataIndex: 'operationType', 
                        key: 'operationType',
                        render: (type) => React.createElement(Tag, {
                            color: OPERATION_TYPES[type]?.color || 'default'
                        }, type)
                    },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    },
                    { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
                    { title: '审批时间', dataIndex: 'approvalTime', key: 'approvalTime' },
                    { title: '备注', dataIndex: 'remark', key: 'remark' }
                ];
            
            case 'user_freeze_unfreeze':
                return [
                    ...baseColumns,
                    { title: '目标用户名', dataIndex: 'targetUsername', key: 'targetUsername' },
                    { title: '目标手机号', dataIndex: 'targetPhone', key: 'targetPhone' },
                    { title: '操作人', dataIndex: 'operator', key: 'operator' },
                    { 
                        title: '操作类型', 
                        dataIndex: 'operationType', 
                        key: 'operationType',
                        render: (type) => React.createElement(Tag, {
                            color: OPERATION_TYPES[type]?.color || 'default'
                        }, type)
                    },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    },
                    { title: '操作时间', dataIndex: 'operationTime', key: 'operationTime' },
                    { title: '备注', dataIndex: 'remark', key: 'remark' }
                ];
            
            case 'user_registration':
                return [
                    ...baseColumns,
                    { title: '用户名', dataIndex: 'username', key: 'username' },
                    { title: '手机号', dataIndex: 'phone', key: 'phone' },
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'IPv4', dataIndex: 'ipv4', key: 'ipv4' },
                    { title: 'IPv6', dataIndex: 'ipv6', key: 'ipv6' },
                    { title: '注册时间', dataIndex: 'registrationTime', key: 'registrationTime' },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    }
                ];
            
            case 'exhibition_maintenance':
                return [
                    ...baseColumns,
                    { title: '用户名', dataIndex: 'username', key: 'username' },
                    { title: '手机号', dataIndex: 'phone', key: 'phone' },
                    { title: 'IPv4', dataIndex: 'ipv4', key: 'ipv4' },
                    { title: 'IPv6', dataIndex: 'ipv6', key: 'ipv6' },
                    { title: '维护公司名称', dataIndex: 'maintenanceCompany', key: 'maintenanceCompany' },
                    { 
                        title: '操作类型', 
                        dataIndex: 'operationType', 
                        key: 'operationType',
                        render: (type) => React.createElement(Tag, {
                            color: OPERATION_TYPES[type]?.color || 'default'
                        }, type)
                    },
                    { title: '操作栏目', dataIndex: 'operationColumn', key: 'operationColumn' },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    },
                    { title: '操作时间', dataIndex: 'operationTime', key: 'operationTime' }
                ];
            
            case 'system_operation':
                return [
                    ...baseColumns,
                    { title: '日志ID', dataIndex: 'id', key: 'id' },
                    { title: '操作用户账号', dataIndex: 'operatorAccount', key: 'operatorAccount' },
                    { title: '操作用户名', dataIndex: 'operatorName', key: 'operatorName' },
                    { title: '操作行为', dataIndex: 'operationBehavior', key: 'operationBehavior' },
                    { title: '操作模块', dataIndex: 'operationModule', key: 'operationModule' },
                    { title: '发生时间', dataIndex: 'operationTime', key: 'operationTime' },
                    { 
                        title: '操作结果', 
                        dataIndex: 'operationResult', 
                        key: 'operationResult',
                        render: (result) => React.createElement(Tag, {
                            color: RESULT_CONFIG[result]?.color || 'default'
                        }, result)
                    },
                    { title: 'IP地址', dataIndex: 'ipAddress', key: 'ipAddress' },
                    { title: '操作详情', dataIndex: 'operationDetails', key: 'operationDetails' }
                ];
            
            default:
                return baseColumns;
        }
    };

    // 渲染日志详情弹窗
    const renderLogDetailModal = () => {
        if (!selectedLog) return null;

        return React.createElement(Modal, {
            title: '日志详情',
            open: logModalVisible,
            onCancel: () => setLogModalVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                onClick: () => setLogModalVisible(false)
                }, '关闭')
            ],
            width: 800
        }, [
            React.createElement(Descriptions, {
                key: 'details',
                bordered: true,
                column: 2
            }, Object.entries(selectedLog).map(([key, value]) => 
                React.createElement(Descriptions.Item, {
                    key: key,
                    label: key,
                span: 2
                }, String(value))
            ))
        ]);
    };

    // 渲染主要内容
    return React.createElement('div', {
        style: { padding: '24px' }
    }, [
        // 页面标题
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: '24px' }
        }, [
            React.createElement('h1', {
                style: { margin: 0, fontSize: '24px', fontWeight: 'bold' }
            }, '日志管理'),
                React.createElement('p', {
                style: { margin: '8px 0 0 0', color: '#666' }
                }, '等保三级合规日志管理，提供完整的审计追踪能力')
        ]),

        // 统计卡片
        renderStatistics(),

        // 搜索工具栏
        renderSearchToolbar(),

        // 日志类型标签页
        React.createElement(Card, {
            key: 'log-tabs'
        }, [
        React.createElement(Tabs, {
            activeKey: activeTab,
            onChange: setActiveTab,
                type: 'card',
                items: Object.entries(LOG_TYPES).map(([key, config]) => ({
                    key: key,
                    label: React.createElement('span', {}, [
                        React.createElement('span', { style: { marginRight: '8px' } }, config.icon),
                        config.label
                    ]),
                    children: React.createElement(Table, {
                        columns: getColumns(),
                        dataSource: filterData(getCurrentData()),
                        rowKey: 'id',
                        loading: loading,
                        pagination: {
                            total: filterData(getCurrentData()).length,
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                        },
                        size: 'middle',
                        scroll: { x: 'max-content' }
                    })
                }))
            })
        ]),

        // 日志详情弹窗
        renderLogDetailModal()
    ]);
};

export default LogManagement; 