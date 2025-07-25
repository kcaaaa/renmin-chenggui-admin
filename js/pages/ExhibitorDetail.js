// ExhibitorDetail.js - 展商详情页面 - v3版本
// 用于展会运营团队查看和审核展商的完整信息
// 展商信息包括：展示内容、展会现场、展商简介

const ExhibitorDetail = ({ onPageChange }) => {
    const { useState, useEffect } = React;
    const { Card, Table, Button, Space, message, Modal, Form, Input, Tag, Image, Typography } = antd;
    const { TextArea } = Input;
    const { Title, Text } = Typography;

    const [loading, setLoading] = useState(false);
    const [exhibitorList, setExhibitorList] = useState([]);
    const [auditModalVisible, setAuditModalVisible] = useState(false);
    const [auditType, setAuditType] = useState('');
    const [currentExhibitor, setCurrentExhibitor] = useState(null);
    const [auditForm] = Form.useForm();

    // 模拟展商列表数据
    useEffect(() => {
        loadExhibitorList();
    }, []);

    const loadExhibitorList = () => {
        setLoading(true);
        // 模拟展商数据
        const mockData = [
            {
                id: 'EXH001',
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
                auditComments: ''
            },
            {
                id: 'EXH002',
                companyName: '上海轨道交通设备有限公司',
                companyLogo: 'https://via.placeholder.com/100x60',
                contactPerson: '李总监',
                contactPhone: '13800138002',
                contactEmail: 'li@shrt.com',
                website: 'https://shrt.com',
                category: ['车辆设备'],
                companyType: '股份有限公司',
                registrationDate: '2024-01-16 10:20:00',
                status: 'approved',
                auditComments: '资质完善，信息准确'
            },
            {
                id: 'EXH003',
                companyName: '广州城轨技术有限公司',
                companyLogo: 'https://via.placeholder.com/100x60',
                contactPerson: '王工程师',
                contactPhone: '13800138003',
                contactEmail: 'wang@gzct.com',
                website: 'https://gzct.com',
                category: ['通信系统', '供电系统'],
                companyType: '有限责任公司',
                registrationDate: '2024-01-17 14:15:00',
                status: 'rejected',
                auditComments: '企业资质文件不完整，请补充相关证明材料'
            }
        ];

        setTimeout(() => {
            setExhibitorList(mockData);
            setLoading(false);
        }, 500);
    };

    // 跳转到展商详情查看页面
    const handleViewDetail = (exhibitor) => {
        if (onPageChange) {
            // 设置当前查看的展商ID，传递给详情页面
            window.currentExhibitorId = exhibitor.id;
            onPageChange('ExhibitorDetailView');
        }
    };

    // 审核展商信息
    const handleAudit = (exhibitor, type) => {
        setCurrentExhibitor(exhibitor);
        setAuditType(type);
        setAuditModalVisible(true);
        auditForm.resetFields();
    };

    // 保存审核结果
    const handleSaveAudit = () => {
        auditForm.validateFields().then(values => {
            console.log('审核结果:', { ...values, exhibitorId: currentExhibitor.id, auditType });
            message.success(`${auditType === 'approve' ? '审核通过' : '审核拒绝'}成功！`);
            setAuditModalVisible(false);
            
            // 更新展商状态
            setExhibitorList(prev => prev.map(item => 
                item.id === currentExhibitor.id ? {
                    ...item,
                    status: auditType === 'approve' ? 'approved' : 'rejected',
                    auditComments: values.comments
                } : item
            ));
        });
    };

    // 展商列表列定义
    const exhibitorColumns = [
        {
            title: '公司信息',
            key: 'company',
            width: 250,
            render: (text, record) => (
                React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
                    React.createElement(Image, {
                        src: record.companyLogo,
                        width: 60,
                        height: 40,
                        style: { marginRight: 12, borderRadius: 4 }
                    }),
                    React.createElement('div', null,
                        React.createElement('div', { style: { fontWeight: 'bold', marginBottom: 4 } }, record.companyName),
                        React.createElement('div', { style: { fontSize: 12, color: '#666' } }, 
                            `${record.contactPerson} | ${record.contactPhone}`
                        )
                    )
                )
            )
        },
        {
            title: '企业分类',
            dataIndex: 'category',
            key: 'category',
            width: 150,
            render: (categories) => (
                React.createElement('div', null,
                    categories.map((cat, index) => 
                        React.createElement(Tag, { key: index, color: 'blue', style: { marginBottom: 4 } }, cat)
                    )
                )
            )
        },
        {
            title: '企业性质',
            dataIndex: 'companyType',
            key: 'companyType',
            width: 120
        },
        {
            title: '注册时间',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            width: 150,
            render: (text) => React.createElement('span', { style: { fontSize: 12 } }, text)
        },
        {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => {
                const statusMap = {
                    pending: { color: 'orange', text: '待审核' },
                    approved: { color: 'green', text: '已通过' },
                    rejected: { color: 'red', text: '已拒绝' }
                };
                const config = statusMap[status] || { color: 'gray', text: '未知' };
                return React.createElement(Tag, { color: config.color }, config.text);
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => (
                React.createElement(Space, { size: 'small' },
                    React.createElement(Button, { 
                        size: 'small', 
                        onClick: () => handleViewDetail(record) 
                    }, '详情'),
                    record.status === 'pending' && React.createElement(Button, {
                        type: 'primary',
                        size: 'small',
                        onClick: () => handleAudit(record, 'approve')
                    }, '通过'),
                    record.status === 'pending' && React.createElement(Button, {
                        danger: true,
                        size: 'small',
                        onClick: () => handleAudit(record, 'reject')
                    }, '拒绝')
                )
            )
        }
    ];

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Title, { level: 2 }, '展商详情管理'),
        React.createElement(Text, { type: 'secondary' }, 
            '用于展会运营团队查看和审核展商信息。点击"详情"按钮可查看展商的完整信息，包括展示内容、展会现场、展商简介等。'
        ),

        React.createElement(Card, { style: { marginTop: 24 } },
            React.createElement(Table, {
                columns: exhibitorColumns,
                dataSource: exhibitorList,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }
            })
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
        )
    );
};

// 导出组件
window.ExhibitorDetail = ExhibitorDetail; 