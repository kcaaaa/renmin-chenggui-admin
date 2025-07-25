console.log('ExhibitionManagement.js 加载中...');

// 展会管理页面 - v3升级版
const ExhibitionManagement = () => {
    const { Card, Table, Button, Input, Select, Space, Tag, Modal, Form, DatePicker, message, Row, Col, Statistic, Tabs, Tooltip, Popconfirm, Descriptions, Upload, Image } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitionList, setExhibitionList] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    
    // v3新增：查询功能状态
    const [searchParams, setSearchParams] = React.useState({
        keyword: '',
        status: 'all',
        dateRange: null
    });

    // v3新增：展会详情Modal状态
    const [detailModalVisible, setDetailModalVisible] = React.useState(false);
    const [currentExhibition, setCurrentExhibition] = React.useState(null);
    const [detailActiveTab, setDetailActiveTab] = React.useState('basic');

    // v3新增：场馆管理Modal状态
    const [venueModalVisible, setVenueModalVisible] = React.useState(false);
    const [venueList, setVenueList] = React.useState([]);
    const [areaList, setAreaList] = React.useState([]);
    const [boothList, setBoothList] = React.useState([]);
    const [venueActiveTab, setVenueActiveTab] = React.useState('venue');

    // v3新增：展商管理Modal状态
    const [exhibitorModalVisible, setExhibitorModalVisible] = React.useState(false);
    const [exhibitorList, setExhibitorList] = React.useState([]);
    const [exhibitorActiveTab, setExhibitorActiveTab] = React.useState('content');

    // 表单实例
    const [form] = Form.useForm();
    const [venueForm] = Form.useForm();
    const [exhibitorForm] = Form.useForm();

    // v3新增：统计数据
    const [statistics, setStatistics] = React.useState({
        totalExhibitions: 0,
        activeExhibitions: 0,
        upcomingExhibitions: 0,
        totalExhibitors: 0
    });

    // 模拟展会数据
    React.useEffect(() => {
        loadExhibitionList();
        loadStatistics();
    }, [pagination.current, pagination.pageSize, searchParams]);

    const loadExhibitionList = () => {
        setLoading(true);
        
        // 模拟展会数据 - v3增强版
    const mockData = [
        {
            id: 1,
            name: '2024中国城市轨道交通展览会',
                address: '北京国际展览中心',
                startDate: '2024-06-15',
                endDate: '2024-06-18',
                venue: '北京国际展览中心',
            status: 'active',
                createTime: '2024-01-15 10:30:00',
                creator: '管理员',
                exhibitorCount: 150,
                venueCount: 3,
                areaCount: 12,
                boothCount: 300
            },
            {
                id: 2,
                name: '2024智慧交通技术展',
                address: '上海新国际博览中心',
                startDate: '2024-08-20',
                endDate: '2024-08-23',
                venue: '上海新国际博览中心',
                status: 'upcoming',
                createTime: '2024-02-20 14:15:00',
                creator: '运营专员',
                exhibitorCount: 120,
                venueCount: 2,
                areaCount: 8,
                boothCount: 200
            },
            {
                id: 3,
                name: '2023轨道交通设备展',
                address: '广州保利世贸博览馆',
                startDate: '2023-11-10',
                endDate: '2023-11-13',
                venue: '广州保利世贸博览馆',
                status: 'finished',
                createTime: '2023-08-10 09:20:00',
                creator: '展会专员',
                exhibitorCount: 180,
                venueCount: 4,
                areaCount: 16,
                boothCount: 400
            }
        ];

        setTimeout(() => {
            setExhibitionList(mockData);
            setPagination(prev => ({ ...prev, total: mockData.length }));
            setLoading(false);
        }, 1000);
    };

    const loadStatistics = () => {
        // 模拟统计数据
        setTimeout(() => {
            setStatistics({
                totalExhibitions: 15,
                activeExhibitions: 3,
                upcomingExhibitions: 5,
                totalExhibitors: 1250
            });
        }, 500);
    };

    // v3新增：查询功能
    const handleSearch = (value) => {
        setSearchParams(prev => ({ ...prev, keyword: value }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleStatusChange = (value) => {
        setSearchParams(prev => ({ ...prev, status: value }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleDateRangeChange = (dates) => {
        setSearchParams(prev => ({ ...prev, dateRange: dates }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    // v3新增：展会详情功能
    const handleViewDetail = (record) => {
        setCurrentExhibition(record);
        setDetailModalVisible(true);
        setDetailActiveTab('basic');
        
        // 加载展会详细信息
        loadExhibitionDetail(record.id);
    };

    const loadExhibitionDetail = (exhibitionId) => {
        // 模拟加载详细信息
        console.log('加载展会详情:', exhibitionId);
    };

    // v3新增：场馆管理功能
    const handleManageVenue = (record) => {
        setCurrentExhibition(record);
        setVenueModalVisible(true);
        setVenueActiveTab('venue');
        loadVenueData(record.id);
    };

    const loadVenueData = (exhibitionId) => {
        // 模拟场馆数据
        const mockVenues = [
            {
                id: 1,
                name: '1号馆',
                address: '北京国际展览中心1号馆',
                areaCount: 4,
                boothCount: 120,
                createTime: '2024-01-15 10:30:00',
                creator: '管理员',
                floorPlan: '/images/venue1.jpg'
            },
            {
                id: 2,
                name: '2号馆',
                address: '北京国际展览中心2号馆',
                areaCount: 4,
                boothCount: 100,
                createTime: '2024-01-15 10:35:00',
                creator: '管理员',
                floorPlan: '/images/venue2.jpg'
            }
        ];
        setVenueList(mockVenues);

        // 模拟区域数据
        const mockAreas = [
            {
                id: 1,
                venueId: 1,
                name: 'A区',
                description: '智能交通设备展示区',
                boothCount: 30,
                initialBoothNumber: 'A001',
                floorPlan: '/images/area_a.jpg'
            },
            {
                id: 2,
                venueId: 1,
                name: 'B区',
                description: '轨道交通车辆展示区',
                boothCount: 30,
                initialBoothNumber: 'B001',
                floorPlan: '/images/area_b.jpg'
            }
        ];
        setAreaList(mockAreas);

        // 模拟展位数据
        const mockBooths = [
            { id: 1, areaId: 1, number: 'A001', status: 'occupied', exhibitor: '中车集团' },
            { id: 2, areaId: 1, number: 'A002', status: 'available', exhibitor: null },
            { id: 3, areaId: 1, number: 'A003', status: 'reserved', exhibitor: '华为技术' }
        ];
        setBoothList(mockBooths);
    };

    // v3新增：展商管理功能
    const handleManageExhibitor = (record) => {
        setCurrentExhibition(record);
        setExhibitorModalVisible(true);
        setExhibitorActiveTab('content');
        loadExhibitorData(record.id);
    };

    const loadExhibitorData = (exhibitionId) => {
        // 模拟展商数据
        const mockExhibitors = [
            {
                id: 1,
                name: '中车集团',
                company: '中国中车股份有限公司',
                category: '车辆制造',
                attribute: '国有企业',
                booth: 'A001',
                status: 'approved',
                displayContent: ['产品展示', '技术演示', '企业宣传'],
                onSiteContent: ['宣传册', '产品手册', '技术资料']
            },
            {
                id: 2,
                name: '华为技术',
                company: '华为技术有限公司',
                category: '通信设备',
                attribute: '民营企业',
                booth: 'A003',
                status: 'pending',
                displayContent: ['5G解决方案', '智能终端'],
                onSiteContent: ['产品手册', '解决方案介绍']
            }
        ];
        setExhibitorList(mockExhibitors);
    };

    // 新建展会
    const handleCreateExhibition = () => {
        form.resetFields();
        // 显示新建表单Modal
        Modal.confirm({
            title: '新建展会',
            width: 600,
            content: (
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: 16 }}
                >
                    <Form.Item
                        name="name"
                        label="展会名称"
                        rules={[{ required: true, message: '请输入展会名称' }]}
                    >
                        <Input placeholder="请输入展会名称" maxLength={50} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="展会地址"
                        rules={[{ required: true, message: '请输入展会地址' }]}
                    >
                        <Input placeholder="请输入展会地址" />
                    </Form.Item>
                    <Form.Item
                        name="dateRange"
                        label="展会时间"
                        rules={[{ required: true, message: '请选择展会时间' }]}
                    >
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="venue"
                        label="场馆"
                        rules={[{ required: true, message: '请输入场馆名称' }]}
                    >
                        <Input placeholder="请输入场馆名称" />
                    </Form.Item>
                </Form>
            ),
            onOk: () => {
                return form.validateFields().then(values => {
                    console.log('新建展会:', values);
                    message.success('展会创建成功！');
                    loadExhibitionList();
                });
            }
        });
    };

    // 编辑展会
    const handleEditExhibition = (record) => {
        handleViewDetail(record);
    };

    // 删除展会
    const handleDeleteExhibition = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除展会"${record.name}"吗？`,
            onOk: () => {
                console.log('删除展会:', record.id);
                message.success('删除成功！');
                loadExhibitionList();
            }
        });
    };

    // 表格列定义 - v3增强版
    const columns = [
        {
            title: '展会名称',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ellipsis: true,
            render: (text, record) => (
                <Tooltip title={text}>
                    <Button type="link" onClick={() => handleViewDetail(record)}>
                        {text}
                    </Button>
                </Tooltip>
            )
        },
        {
            title: '展会地址',
            dataIndex: 'address',
            key: 'address',
            width: 180,
            ellipsis: true
        },
        {
            title: '展会时间',
            key: 'time',
            width: 200,
            render: (text, record) => (
                <div>
                    <div>{record.startDate}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>至 {record.endDate}</div>
                </div>
            )
        },
        {
            title: '场馆',
            dataIndex: 'venue',
            key: 'venue',
            width: 150,
            ellipsis: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: (status) => {
                const statusMap = {
                    active: { color: 'green', text: '进行中' },
                    upcoming: { color: 'blue', text: '即将开始' },
                    finished: { color: 'gray', text: '已结束' },
                    cancelled: { color: 'red', text: '已取消' }
                };
                const config = statusMap[status] || { color: 'gray', text: '未知' };
                return <Tag color={config.color}>{config.text}</Tag>;
            }
        },
        {
            title: '展商数量',
            dataIndex: 'exhibitorCount',
            key: 'exhibitorCount',
            width: 100,
            render: (count, record) => (
                <Button type="link" onClick={() => handleManageExhibitor(record)}>
                    {count}
                </Button>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150,
            render: (time) => (
                <div style={{ fontSize: 12 }}>
                    {time}
                </div>
            )
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                <Space size="small" wrap>
                    <Button size="small" onClick={() => handleViewDetail(record)}>
                        详情
                    </Button>
                    <Button size="small" onClick={() => handleManageVenue(record)}>
                        场馆
                    </Button>
                    <Button size="small" onClick={() => handleManageExhibitor(record)}>
                        展商
                    </Button>
                    <Popconfirm
                        title="确定删除此展会？"
                        onConfirm={() => handleDeleteExhibition(record)}
                    >
                        <Button size="small" danger>删除</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // v3新增：场馆管理表格列
    const venueColumns = [
        {
            title: '场馆名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '区域数量',
            dataIndex: 'areaCount',
            key: 'areaCount'
        },
        {
            title: '展位数量',
            dataIndex: 'boothCount',
            key: 'boothCount'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button size="small">编辑</Button>
                    <Button size="small">查看区域</Button>
                    <Button size="small" danger>删除</Button>
                </Space>
            )
        }
    ];

    // v3新增：区域管理表格列
    const areaColumns = [
        {
            title: '区域名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '区域简介',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '展位数量',
            dataIndex: 'boothCount',
            key: 'boothCount'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button size="small">编辑</Button>
                    <Button size="small">查看展位</Button>
                    <Button size="small" danger>删除</Button>
                </Space>
            )
        }
    ];

    // v3新增：展商管理表格列
    const exhibitorColumns = [
        {
            title: '展商名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '公司全称',
            dataIndex: 'company',
            key: 'company'
        },
        {
            title: '所属分类',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: '企业属性',
            dataIndex: 'attribute',
            key: 'attribute'
        },
        {
            title: '展位号',
            dataIndex: 'booth',
            key: 'booth'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusMap = {
                    approved: { color: 'green', text: '已审核' },
                    pending: { color: 'orange', text: '待审核' },
                    rejected: { color: 'red', text: '已拒绝' }
                };
                const config = statusMap[status] || { color: 'gray', text: '未知' };
                return <Tag color={config.color}>{config.text}</Tag>;
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button size="small">详情</Button>
                    <Button size="small">审核</Button>
                    <Button size="small">分配展位</Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 24 }}>
            {/* v3新增：统计卡片 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总展会数"
                            value={statistics.totalExhibitions}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="进行中展会"
                            value={statistics.activeExhibitions}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="即将开始"
                            value={statistics.upcomingExhibitions}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总展商数"
                            value={statistics.totalExhibitors}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="展会管理" style={{ marginBottom: 16 }}>
                {/* v3新增：查询功能区 */}
                <div style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Search
                                placeholder="请输入展会名称或地址"
                                allowClear
                                onSearch={handleSearch}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={4}>
                            <Select
                                placeholder="展会状态"
                                style={{ width: '100%' }}
                                value={searchParams.status}
                                onChange={handleStatusChange}
                            >
                                <Option value="all">全部状态</Option>
                                <Option value="active">进行中</Option>
                                <Option value="upcoming">即将开始</Option>
                                <Option value="finished">已结束</Option>
                                <Option value="cancelled">已取消</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <RangePicker
                                placeholder={['开始时间', '结束时间']}
                                style={{ width: '100%' }}
                                onChange={handleDateRangeChange}
                            />
                        </Col>
                        <Col span={8}>
                            <Space>
                                <Button type="primary" onClick={handleCreateExhibition}>
                                    新建展会
                                </Button>
                                <Button onClick={loadExhibitionList}>
                                    刷新
                                </Button>
                                <Button>
                                    导出
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </div>

                {/* 展会列表表格 - v3增强版 */}
                <Table
                    columns={columns}
                    dataSource={exhibitionList}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
                        onChange: (page, size) => {
                            setPagination(prev => ({ ...prev, current: page, pageSize: size }));
                        }
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* v3新增：展会详情Modal */}
            <Modal
                title={`展会详情 - ${currentExhibition?.name || ''}`}
                visible={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                width={1000}
                footer={[
                    <Button key="close" onClick={() => setDetailModalVisible(false)}>
                        关闭
                    </Button>,
                    <Button key="save" type="primary">
                        保存修改
                    </Button>
                ]}
            >
                <Tabs activeKey={detailActiveTab} onChange={setDetailActiveTab}>
                    <TabPane tab="基本信息" key="basic">
                        <Descriptions column={2} bordered>
                            <Descriptions.Item label="展会名称">
                                {currentExhibition?.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="展会地址">
                                {currentExhibition?.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="开始时间">
                                {currentExhibition?.startDate}
                            </Descriptions.Item>
                            <Descriptions.Item label="结束时间">
                                {currentExhibition?.endDate}
                            </Descriptions.Item>
                            <Descriptions.Item label="场馆">
                                {currentExhibition?.venue}
                            </Descriptions.Item>
                            <Descriptions.Item label="状态">
                                {currentExhibition?.status}
                            </Descriptions.Item>
                            <Descriptions.Item label="展商数量">
                                {currentExhibition?.exhibitorCount}
                            </Descriptions.Item>
                            <Descriptions.Item label="展位数量">
                                {currentExhibition?.boothCount}
                            </Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="展商与展位" key="exhibitor">
                        <div>展商与展位关系维护功能</div>
                    </TabPane>
                    <TabPane tab="审核管理" key="audit">
                        <div>展商信息审核功能</div>
                    </TabPane>
                </Tabs>
            </Modal>

            {/* v3新增：场馆管理Modal */}
            <Modal
                title={`场馆管理 - ${currentExhibition?.name || ''}`}
                visible={venueModalVisible}
                onCancel={() => setVenueModalVisible(false)}
                width={1200}
                footer={[
                    <Button key="close" onClick={() => setVenueModalVisible(false)}>
                        关闭
                    </Button>
                ]}
            >
                <Tabs activeKey={venueActiveTab} onChange={setVenueActiveTab}>
                    <TabPane tab="场馆信息" key="venue">
                        <div style={{ marginBottom: 16 }}>
                            <Button type="primary">新建场馆</Button>
                        </div>
                        <Table
                            columns={venueColumns}
                            dataSource={venueList}
                            rowKey="id"
                            size="small"
                        />
                    </TabPane>
                    <TabPane tab="区域信息" key="area">
                        <div style={{ marginBottom: 16 }}>
                            <Button type="primary">新建区域</Button>
                        </div>
                        <Table
                            columns={areaColumns}
                            dataSource={areaList}
                            rowKey="id"
                            size="small"
                        />
                    </TabPane>
                    <TabPane tab="展位信息" key="booth">
                        <div style={{ marginBottom: 16 }}>
                            <Button type="primary">新建展位</Button>
                        </div>
                        <div>展位管理功能</div>
                    </TabPane>
                </Tabs>
            </Modal>

            {/* v3新增：展商管理Modal */}
            <Modal
                title={`展商管理 - ${currentExhibition?.name || ''}`}
                visible={exhibitorModalVisible}
                onCancel={() => setExhibitorModalVisible(false)}
                width={1200}
                footer={[
                    <Button key="close" onClick={() => setExhibitorModalVisible(false)}>
                        关闭
                    </Button>
                ]}
            >
                <Tabs activeKey={exhibitorActiveTab} onChange={setExhibitorActiveTab}>
                    <TabPane tab="展示内容" key="content">
                        <div style={{ marginBottom: 16 }}>
                            <Button type="primary">添加展示内容</Button>
                        </div>
                        <Table
                            columns={exhibitorColumns}
                            dataSource={exhibitorList}
                            rowKey="id"
                            size="small"
                        />
                    </TabPane>
                    <TabPane tab="展会现场" key="onsite">
                        <div>展会现场宣传资料管理</div>
                    </TabPane>
                    <TabPane tab="展商简介" key="profile">
                        <div>展商详细信息管理</div>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
    );
};

// 导出组件
window.ExhibitionManagement = ExhibitionManagement;
