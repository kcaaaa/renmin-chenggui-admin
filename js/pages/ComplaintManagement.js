// 投诉管理组件
const ComplaintManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, DatePicker } = antd;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    const [complaints, setComplaints] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [detailVisible, setDetailVisible] = React.useState(false);
    const [selectedComplaint, setSelectedComplaint] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟投诉数据
    const mockComplaints = [
        { 
            id: 1, 
            title: '服务态度问题', 
            type: 'service', 
            status: 'pending', 
            priority: 'high',
            complainant: '张三',
            phone: '13800138000',
            content: '客服人员态度恶劣，处理问题不及时',
            createTime: '2024-01-10 10:00:00',
            updateTime: '2024-01-10 10:00:00',
            handler: null
        },
        { 
            id: 2, 
            title: '产品质量问题', 
            type: 'product', 
            status: 'processing', 
            priority: 'medium',
            complainant: '李四',
            phone: '13800138001',
            content: '购买的产品存在质量缺陷',
            createTime: '2024-01-11 11:00:00',
            updateTime: '2024-01-11 15:30:00',
            handler: '王五'
        },
        { 
            id: 3, 
            title: '退款问题', 
            type: 'refund', 
            status: 'resolved', 
            priority: 'low',
            complainant: '赵六',
            phone: '13800138002',
            content: '申请退款超过7天未处理',
            createTime: '2024-01-12 12:00:00',
            updateTime: '2024-01-12 18:00:00',
            handler: '孙七'
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
    
    const getStatusTag = (status) => {
        const statusMap = {
            'pending': { color: 'orange', text: '待处理' },
            'processing': { color: 'blue', text: '处理中' },
            'resolved': { color: 'green', text: '已解决' },
            'closed': { color: 'default', text: '已关闭' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getPriorityTag = (priority) => {
        const priorityMap = {
            'high': { color: 'red', text: '高' },
            'medium': { color: 'orange', text: '中' },
            'low': { color: 'green', text: '低' }
        };
        const config = priorityMap[priority] || { color: 'default', text: priority };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getTypeTag = (type) => {
        const typeMap = {
            'service': { color: 'blue', text: '服务问题' },
            'product': { color: 'purple', text: '产品问题' },
            'refund': { color: 'cyan', text: '退款问题' },
            'other': { color: 'default', text: '其他' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '投诉标题',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: getTypeTag
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            render: getPriorityTag
        },
        {
            title: '投诉人',
            dataIndex: 'complainant',
            key: 'complainant'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '处理人',
            dataIndex: 'handler',
            key: 'handler',
            render: (handler) => handler || '未分配'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'detail',
                    type: 'link',
                    size: 'small',
                    onClick: () => showDetail(record)
                }, '详情'),
                React.createElement(Button, {
                    key: 'assign',
                    type: 'link',
                    size: 'small',
                    onClick: () => assignHandler(record)
                }, '分配'),
                React.createElement(Button, {
                    key: 'process',
                    type: 'link',
                    size: 'small',
                    onClick: () => processComplaint(record)
                }, '处理')
            ])
        }
    ];
    
    const showDetail = (record) => {
        setSelectedComplaint(record);
        setDetailVisible(true);
    };
    
    const assignHandler = (record) => {
        Modal.confirm({
            title: '分配处理人',
            content: '确定要分配处理人吗？',
            onOk: () => {
                message.success('分配成功');
                loadComplaints();
            }
        });
    };
    
    const processComplaint = (record) => {
        message.info(`正在处理投诉: ${record.title}`);
        setTimeout(() => {
            message.success('处理成功');
            loadComplaints();
        }, 2000);
    };
    
    const handleSubmit = (values) => {
        console.log('处理投诉:', values);
        message.success('处理成功');
        setModalVisible(false);
        form.resetFields();
        loadComplaints();
    };
    
    return React.createElement('div', { style: { padding: '24px' } }, [
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
            }, '处理和跟踪用户投诉')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总投诉数',
                        value: complaints.length
                    })
                )
            ),
            React.createElement(Col, { key: 'pending', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '待处理',
                        value: complaints.filter(c => c.status === 'pending').length,
                        valueStyle: { color: '#faad14' }
                    })
                )
            ),
            React.createElement(Col, { key: 'processing', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '处理中',
                        value: complaints.filter(c => c.status === 'processing').length,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'resolved', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已解决',
                        value: complaints.filter(c => c.status === 'resolved').length,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'actions',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadComplaints
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'pending', value: 'pending' }, '待处理'),
                React.createElement(Option, { key: 'processing', value: 'processing' }, '处理中'),
                React.createElement(Option, { key: 'resolved', value: 'resolved' }, '已解决')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: complaints,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'detail-modal',
            title: '投诉详情',
            visible: detailVisible,
            onCancel: () => setDetailVisible(false),
            footer: [
                React.createElement(Button, {
                    key: 'close',
                    onClick: () => setDetailVisible(false)
                }, '关闭')
            ],
            width: 600
        }, selectedComplaint ? React.createElement('div', {}, [
            React.createElement('p', { key: 'title' }, React.createElement('strong', {}, '投诉标题: '), selectedComplaint.title),
            React.createElement('p', { key: 'type' }, React.createElement('strong', {}, '类型: '), selectedComplaint.type),
            React.createElement('p', { key: 'complainant' }, React.createElement('strong', {}, '投诉人: '), selectedComplaint.complainant),
            React.createElement('p', { key: 'phone' }, React.createElement('strong', {}, '联系电话: '), selectedComplaint.phone),
            React.createElement('p', { key: 'content' }, React.createElement('strong', {}, '投诉内容: '), selectedComplaint.content),
            React.createElement('p', { key: 'createTime' }, React.createElement('strong', {}, '创建时间: '), selectedComplaint.createTime)
        ]) : null)
    ]);
};

window.ComplaintManagement = ComplaintManagement; 