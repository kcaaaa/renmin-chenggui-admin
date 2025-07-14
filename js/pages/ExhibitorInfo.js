console.log('ExhibitorInfo.js 加载中...');

// 展商信息管理页面组件
const ExhibitorInfo = () => {
    const { Card, Table, Button, Input, Select, Form, Modal, message, Space, Tag, Avatar } = antd;
    const { Search } = Input;
    const { Option } = Select;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitors, setExhibitors] = React.useState([]);
    const [filteredExhibitors, setFilteredExhibitors] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [viewingExhibitor, setViewingExhibitor] = React.useState(null);
    
    // 模拟数据
    const mockData = [
        {
            id: 1,
            companyName: '中国中车集团',
            logo: 'https://via.placeholder.com/50',
            contact: '张经理',
            phone: '13800138001',
            email: 'zhang@crrc.com',
            booth: 'A001',
            category: '车辆制造',
            status: 'confirmed',
            products: 5,
            activities: 2,
            description: '全球领先的轨道交通装备制造商'
        },
        {
            id: 2,
            companyName: '华为技术有限公司',
            logo: 'https://via.placeholder.com/50',
            contact: '李经理',
            phone: '13800138002',
            email: 'li@huawei.com',
            booth: 'B002',
            category: '通信设备',
            status: 'pending',
            products: 3,
            activities: 1,
            description: '城轨智能化解决方案提供商'
        },
        {
            id: 3,
            companyName: '比亚迪股份有限公司',
            logo: 'https://via.placeholder.com/50',
            contact: '王经理',
            phone: '13800138003',
            email: 'wang@byd.com',
            booth: 'C003',
            category: '新能源',
            status: 'confirmed',
            products: 4,
            activities: 3,
            description: '新能源轨道交通解决方案'
        }
    ];

    // 初始化数据
    React.useEffect(() => {
        setExhibitors(mockData);
        setFilteredExhibitors(mockData);
    }, []);

    // 获取状态标签
    const getStatusTag = (status) => {
        const statusMap = {
            'confirmed': { color: 'green', text: '已确认' },
            'pending': { color: 'orange', text: '待审核' },
            'rejected': { color: 'red', text: '已拒绝' }
        };
        const config = statusMap[status] || { color: 'default', text: '未知' };
        return React.createElement(Tag, { color: config.color }, config.text);
    };

    return React.createElement('div', { className: 'exhibitor-info' }, [
        React.createElement('div', { 
            key: 'header',
            style: { marginBottom: '24px' }
        }, [
            React.createElement('h2', { 
                key: 'title',
                style: { margin: 0, fontSize: '24px', fontWeight: 'bold' }
            }, '展商信息管理'),
            React.createElement('p', { 
                key: 'desc',
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '管理展商基本信息、产品信息、活动信息等')
        ]),
        
        React.createElement(Card, {
            key: 'table',
            title: '展商列表（共 ' + filteredExhibitors.length + ' 家）'
        }, [
            React.createElement(Table, {
                key: 'table-content',
                columns: [
                    {
                        title: '公司名称',
                        dataIndex: 'companyName',
                        key: 'companyName',
                        width: '25%'
                    },
                    {
                        title: '联系人',
                        dataIndex: 'contact',
                        key: 'contact',
                        width: '15%'
                    },
                    {
                        title: '展位',
                        dataIndex: 'booth',
                        key: 'booth',
                        width: '10%'
                    },
                    {
                        title: '类别',
                        dataIndex: 'category',
                        key: 'category',
                        width: '12%',
                        render: (category) => React.createElement(Tag, { color: 'blue' }, category)
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        width: '12%',
                        render: (status) => getStatusTag(status)
                    },
                    {
                        title: '产品数',
                        dataIndex: 'products',
                        key: 'products',
                        width: '10%'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: '16%',
                        render: (_, record) => React.createElement(Space, { size: 'middle' }, [
                            React.createElement(Button, {
                                key: 'view',
                                type: 'link',
                                size: 'small'
                            }, '查看'),
                            React.createElement(Button, {
                                key: 'edit',
                                type: 'link',
                                size: 'small'
                            }, '编辑'),
                            React.createElement(Button, {
                                key: 'delete',
                                type: 'link',
                                size: 'small',
                                danger: true
                            }, '删除')
                        ])
                    }
                ],
                dataSource: filteredExhibitors,
                rowKey: 'id',
                loading: loading,
                pagination: {
                    total: filteredExhibitors.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 'M' + range[0] + '-' + range[1] + ' 条，共 ' + total + ' 条'
                }
            })
        ])
    ]);
};

// 导出组件
window.ExhibitorInfo = ExhibitorInfo;
console.log('ExhibitorInfo 组件已加载');
