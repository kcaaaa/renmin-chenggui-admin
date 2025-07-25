// BoothManagement.js - 场馆信息 - v3版本
// 场馆信息管理：场馆信息维护 -> 区域信息维护 -> 展位信息维护

const BoothManagement = () => {
    const { useState, useEffect } = React;
    const { Card, Button, Space, Table, Modal, Form, Input, message, Typography, Row, Col, Upload, Image, Descriptions, Tag, Divider } = antd;
    const { Title, Text } = Typography;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false);
    const [currentView, setCurrentView] = useState('venue'); // venue, area, booth
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);

    // 模态框状态
    const [venueModalVisible, setVenueModalVisible] = useState(false);
    const [areaModalVisible, setAreaModalVisible] = useState(false);
    const [boothModalVisible, setBoothModalVisible] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);
    const [editingArea, setEditingArea] = useState(null);
    const [editingBooth, setEditingBooth] = useState(null);

    // 表单实例
    const [venueForm] = Form.useForm();
    const [areaForm] = Form.useForm();
    const [boothForm] = Form.useForm();

    // 模拟数据
    const [venueList, setVenueList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [boothList, setBoothList] = useState([]);

    useEffect(() => {
        loadVenueData();
    }, []);

    const loadVenueData = () => {
        setLoading(true);
        // 模拟场馆数据
        setTimeout(() => {
            const mockVenues = [
                {
                    id: 'venue_001',
                    name: '人民城轨展览中心',
                    address: '北京市朝阳区城轨大道123号',
                    planImage: 'https://via.placeholder.com/400x300',
                    areaCount: 6,
                    boothCount: 120,
                    createTime: '2024-01-10 10:00:00',
                    creator: '系统管理员'
                },
                {
                    id: 'venue_002',
                    name: '国际会展中心A馆',
                    address: '北京市朝阳区展览路88号',
                    planImage: 'https://via.placeholder.com/400x300',
                    areaCount: 4,
                    boothCount: 80,
                    createTime: '2024-01-12 14:30:00',
                    creator: '张经理'
                }
            ];
            setVenueList(mockVenues);
            setLoading(false);
        }, 500);
    };

    const loadAreaData = (venueId) => {
        setLoading(true);
        // 模拟区域数据
        setTimeout(() => {
            const mockAreas = [
                {
                    id: 'area_001',
                    venueId: venueId,
                    name: 'A区',
                    intro: '核心技术展示区域，主要展示最新的城轨技术和解决方案',
                    planImage: 'https://via.placeholder.com/400x300',
                    boothCount: 20,
                    boothStartNumber: 'A001',
                    createTime: '2024-01-15 09:00:00'
                },
                {
                    id: 'area_002',
                    venueId: venueId,
                    name: 'B区',
                    intro: '智能装备展示区域，重点展示智能化设备和系统',
                    planImage: 'https://via.placeholder.com/400x300',
                    boothCount: 25,
                    boothStartNumber: 'B001',
                    createTime: '2024-01-15 10:30:00'
                },
                {
                    id: 'area_003',
                    venueId: venueId,
                    name: 'C区',
                    intro: '创新产品展示区域，展示各类创新产品和服务',
                    planImage: 'https://via.placeholder.com/400x300',
                    boothCount: 30,
                    boothStartNumber: 'C001',
                    createTime: '2024-01-15 11:45:00'
                }
            ];
            setAreaList(mockAreas);
            setLoading(false);
        }, 500);
    };

    const loadBoothData = (areaId) => {
        setLoading(true);
        // 模拟展位数据
        setTimeout(() => {
            const mockBooths = [];
            const area = areaList.find(a => a.id === areaId);
            if (area) {
                for (let i = 1; i <= area.boothCount; i++) {
                    const boothNumber = area.boothStartNumber.replace(/\d+$/, String(i).padStart(3, '0'));
                    mockBooths.push({
                        id: `booth_${areaId}_${i}`,
                        areaId: areaId,
                        boothNumber: boothNumber,
                        size: i % 3 === 0 ? '6x3' : '3x3',
                        status: Math.random() > 0.3 ? 'occupied' : 'available',
                        company: Math.random() > 0.3 ? `参展公司${i}` : null,
                        price: (i % 3 === 0 ? 12000 : 8000),
                        createTime: '2024-01-16 14:00:00'
                    });
                }
            }
            setBoothList(mockBooths);
            setLoading(false);
        }, 500);
    };

    // 场馆管理相关方法
    const handleAddVenue = () => {
        setEditingVenue(null);
        venueForm.resetFields();
        setVenueModalVisible(true);
    };

    const handleEditVenue = (venue) => {
        setEditingVenue(venue);
        venueForm.setFieldsValue(venue);
        setVenueModalVisible(true);
    };

    const handleDeleteVenue = (venue) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除场馆"${venue.name}"吗？此操作将同时删除该场馆下的所有区域和展位信息。`,
            onOk: () => {
                setVenueList(prev => prev.filter(item => item.id !== venue.id));
                message.success('场馆删除成功！');
            }
        });
    };

    const handleSaveVenue = () => {
        venueForm.validateFields().then(values => {
            const newVenue = {
                id: editingVenue ? editingVenue.id : `venue_${Date.now()}`,
                ...values,
                areaCount: editingVenue ? editingVenue.areaCount : 0,
                boothCount: editingVenue ? editingVenue.boothCount : 0,
                createTime: editingVenue ? editingVenue.createTime : new Date().toLocaleString('zh-CN'),
                creator: editingVenue ? editingVenue.creator : '当前用户'
            };

            if (editingVenue) {
                setVenueList(prev => prev.map(item => 
                    item.id === editingVenue.id ? newVenue : item
                ));
                message.success('场馆信息更新成功！');
            } else {
                setVenueList(prev => [...prev, newVenue]);
                message.success('场馆创建成功！');
            }
            
            setVenueModalVisible(false);
        });
    };

    const handleViewVenueDetail = (venue) => {
        setSelectedVenue(venue);
        setCurrentView('area');
        loadAreaData(venue.id);
    };

    // 区域管理相关方法
    const handleAddArea = () => {
        if (!selectedVenue) {
            message.error('请先选择场馆');
            return;
        }
        setEditingArea(null);
        areaForm.resetFields();
        setAreaModalVisible(true);
    };

    const handleEditArea = (area) => {
        setEditingArea(area);
        areaForm.setFieldsValue(area);
        setAreaModalVisible(true);
    };

    const handleDeleteArea = (area) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除区域"${area.name}"吗？此操作将同时删除该区域下的所有展位信息。`,
            onOk: () => {
                setAreaList(prev => prev.filter(item => item.id !== area.id));
                // 更新场馆的区域数量
                setVenueList(prev => prev.map(venue => 
                    venue.id === selectedVenue.id ? 
                    { ...venue, areaCount: venue.areaCount - 1 } : venue
                ));
                message.success('区域删除成功！');
            }
        });
    };

    const handleSaveArea = () => {
        areaForm.validateFields().then(values => {
            const newArea = {
                id: editingArea ? editingArea.id : `area_${Date.now()}`,
                venueId: selectedVenue.id,
                ...values,
                createTime: editingArea ? editingArea.createTime : new Date().toLocaleString('zh-CN')
            };

            if (editingArea) {
                setAreaList(prev => prev.map(item => 
                    item.id === editingArea.id ? newArea : item
                ));
                message.success('区域信息更新成功！');
            } else {
                setAreaList(prev => [...prev, newArea]);
                // 更新场馆的区域数量
                setVenueList(prev => prev.map(venue => 
                    venue.id === selectedVenue.id ? 
                    { ...venue, areaCount: venue.areaCount + 1 } : venue
                ));
                message.success('区域创建成功！');
            }
            
            setAreaModalVisible(false);
        });
    };

    const handleViewAreaDetail = (area) => {
        setSelectedArea(area);
        setCurrentView('booth');
        loadBoothData(area.id);
    };

    // 展位管理相关方法
    const handleGenerateBooths = () => {
        if (!selectedArea) return;
        
        Modal.confirm({
            title: '生成展位',
            content: `确定要为区域"${selectedArea.name}"生成${selectedArea.boothCount}个展位吗？`,
            onOk: () => {
                loadBoothData(selectedArea.id);
                message.success('展位生成成功！');
            }
        });
    };

    // 文件上传配置
    const uploadProps = {
        listType: 'picture-card',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('只能上传 JPG/PNG 格式的图片！');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小不能超过 2MB！');
                return false;
            }
            return false; // 阻止自动上传
        }
    };

    // 渲染场馆列表页面
    const renderVenueList = () => {
        const venueColumns = [
            {
                title: '场馆名称',
                dataIndex: 'name',
                key: 'name',
                width: 200
            },
            {
                title: '场馆地址',
                dataIndex: 'address',
                key: 'address',
                width: 300
            },
            {
                title: '区域数量',
                dataIndex: 'areaCount',
                key: 'areaCount',
                width: 100,
                render: (count) => React.createElement(Tag, { color: 'blue' }, `${count}个区域`)
            },
            {
                title: '展位数量',
                dataIndex: 'boothCount',
                key: 'boothCount',
                width: 100,
                render: (count) => React.createElement(Tag, { color: 'green' }, `${count}个展位`)
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 150
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
                render: (text, record) => (
                    React.createElement(Space, null,
                        React.createElement(Button, { 
                            size: 'small', 
                            onClick: () => handleViewVenueDetail(record) 
                        }, '详情'),
                        React.createElement(Button, { 
                            size: 'small', 
                            onClick: () => handleEditVenue(record) 
                        }, '编辑'),
                        React.createElement(Button, { 
                            size: 'small', 
                            danger: true,
                            onClick: () => handleDeleteVenue(record) 
                        }, '删除')
                    )
                )
            }
        ];

        return React.createElement('div', null,
            React.createElement(Card, {
                title: '场馆信息管理',
                extra: React.createElement(Button, {
                    type: 'primary',
                    onClick: handleAddVenue
                }, '新建场馆')
            },
                React.createElement(Text, { 
                    type: 'secondary', 
                    style: { display: 'block', marginBottom: 16 } 
                }, '每次展会都会设立对应的场馆，需要优先维护场馆信息，包括场馆信息维护、区域信息维护、展位信息维护。'),
                
                React.createElement(Table, {
                    columns: venueColumns,
                    dataSource: venueList,
                    rowKey: 'id',
                    loading: loading,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `共 ${total} 条记录`
                    }
                })
            )
        );
    };

    // 渲染区域列表页面
    const renderAreaList = () => {
        const areaColumns = [
            {
                title: '区域名称',
                dataIndex: 'name',
                key: 'name',
                width: 120
            },
            {
                title: '区域简介',
                dataIndex: 'intro',
                key: 'intro',
                width: 300
            },
            {
                title: '展位数量',
                dataIndex: 'boothCount',
                key: 'boothCount',
                width: 100,
                render: (count) => React.createElement(Tag, { color: 'green' }, `${count}个展位`)
            },
            {
                title: '展位编号',
                dataIndex: 'boothStartNumber',
                key: 'boothStartNumber',
                width: 120,
                render: (startNumber, record) => `${startNumber} ~ ${startNumber.replace(/\d+$/, String(record.boothCount).padStart(3, '0'))}`
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 150
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                render: (text, record) => (
                    React.createElement(Space, null,
                        React.createElement(Button, { 
                            size: 'small', 
                            onClick: () => handleViewAreaDetail(record) 
                        }, '详情'),
                        React.createElement(Button, { 
                            size: 'small', 
                            onClick: () => handleEditArea(record) 
                        }, '编辑'),
                        React.createElement(Button, { 
                            size: 'small', 
                            danger: true,
                            onClick: () => handleDeleteArea(record) 
                        }, '删除')
                    )
                )
            }
        ];

        return React.createElement('div', null,
            React.createElement('div', { style: { marginBottom: 16 } },
                React.createElement(Button, { 
                    onClick: () => setCurrentView('venue') 
                }, '← 返回场馆列表')
            ),
            
            React.createElement(Card, {
                title: `${selectedVenue?.name} - 区域信息管理`,
                extra: React.createElement(Button, {
                    type: 'primary',
                    onClick: handleAddArea
                }, '新增区域')
            },
                React.createElement(Text, { 
                    type: 'secondary', 
                    style: { display: 'block', marginBottom: 16 } 
                }, '管理场馆内的各个区域，每个区域可以设置不同的展位数量和编号规则。'),
                
                React.createElement(Table, {
                    columns: areaColumns,
                    dataSource: areaList,
                    rowKey: 'id',
                    loading: loading,
                    pagination: {
                        pageSize: 10,
                        showTotal: (total) => `共 ${total} 条记录`
                    }
                })
            )
        );
    };

    // 渲染展位列表页面
    const renderBoothList = () => {
        const boothColumns = [
            {
                title: '展位编号',
                dataIndex: 'boothNumber',
                key: 'boothNumber',
                width: 120
            },
            {
                title: '展位规格',
                dataIndex: 'size',
                key: 'size',
                width: 100
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render: (status) => {
                    const statusMap = {
                        available: { color: 'green', text: '可用' },
                        occupied: { color: 'red', text: '已占用' },
                        reserved: { color: 'orange', text: '预留' }
                    };
                    const config = statusMap[status] || { color: 'gray', text: '未知' };
                    return React.createElement(Tag, { color: config.color }, config.text);
                }
            },
            {
                title: '参展公司',
                dataIndex: 'company',
                key: 'company',
                width: 200,
                render: (company) => company || React.createElement(Text, { type: 'secondary' }, '暂无')
            },
            {
                title: '价格(元)',
                dataIndex: 'price',
                key: 'price',
                width: 120,
                render: (price) => `¥${price.toLocaleString()}`
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 150
            }
        ];

        return React.createElement('div', null,
            React.createElement('div', { style: { marginBottom: 16 } },
                React.createElement(Button, { 
                    onClick: () => setCurrentView('area') 
                }, '← 返回区域列表')
            ),
            
            React.createElement(Card, {
                title: `${selectedArea?.name} - 展位信息管理`,
                extra: React.createElement(Space, null,
                    React.createElement(Button, {
                        onClick: handleGenerateBooths
                    }, '重新生成展位'),
                    React.createElement(Button, {
                        type: 'primary',
                        onClick: () => message.info('展位分配功能开发中')
                    }, '分配展位')
                )
            },
                React.createElement(Text, { 
                    type: 'secondary', 
                    style: { display: 'block', marginBottom: 16 } 
                }, `该区域共有 ${selectedArea?.boothCount} 个展位，展位编号从 ${selectedArea?.boothStartNumber} 开始。`),
                
                React.createElement(Table, {
                    columns: boothColumns,
                    dataSource: boothList,
                    rowKey: 'id',
                    loading: loading,
                    pagination: {
                        pageSize: 20,
                        showTotal: (total) => `共 ${total} 条记录`
                    }
                })
            )
        );
    };

    // 根据当前视图渲染内容
    const renderContent = () => {
        switch (currentView) {
            case 'venue':
                return renderVenueList();
            case 'area':
                return renderAreaList();
            case 'booth':
                return renderBoothList();
            default:
                return renderVenueList();
        }
    };

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Title, { level: 2 }, '场馆信息'),
        React.createElement(Text, { type: 'secondary' }, 
            '场馆信息管理包括三个层级：场馆信息维护 → 区域信息维护 → 展位信息维护。操作流程：场馆维护后进行区域维护，区域维护完成后进行展位维护。'
        ),

        React.createElement('div', { style: { marginTop: 24 } },
            renderContent()
        ),

        // 场馆编辑Modal
        React.createElement(Modal, {
            title: `${editingVenue ? '编辑' : '新建'}场馆`,
            visible: venueModalVisible,
            onOk: handleSaveVenue,
            onCancel: () => setVenueModalVisible(false),
            width: 600
        },
            React.createElement(Form, {
                form: venueForm,
                layout: 'vertical'
            },
                React.createElement(Form.Item, {
                    name: 'name',
                    label: '场馆名称',
                    rules: [{ required: true, message: '请输入场馆名称' }]
                },
                    React.createElement(Input, { placeholder: '请输入场馆名称' })
                ),
                React.createElement(Form.Item, {
                    name: 'address',
                    label: '场馆地址',
                    rules: [{ required: true, message: '请输入详细地址' }]
                },
                    React.createElement(Input, { placeholder: '请输入场馆详细地址' })
                ),
                React.createElement(Form.Item, {
                    name: 'planImage',
                    label: '场馆平面图'
                },
                    React.createElement(Upload, uploadProps,
                        React.createElement('div', null, '+ 上传平面图')
                    )
                )
            )
        ),

        // 区域编辑Modal
        React.createElement(Modal, {
            title: `${editingArea ? '编辑' : '新增'}区域`,
            visible: areaModalVisible,
            onOk: handleSaveArea,
            onCancel: () => setAreaModalVisible(false),
            width: 600
        },
            React.createElement(Form, {
                form: areaForm,
                layout: 'vertical'
            },
                React.createElement(Form.Item, {
                    name: 'name',
                    label: '区域名称',
                    rules: [{ required: true, message: '请输入区域名称' }]
                },
                    React.createElement(Input, { placeholder: '请输入区域名称，如：A区' })
                ),
                React.createElement(Form.Item, {
                    name: 'intro',
                    label: '区域简介'
                },
                    React.createElement(TextArea, { 
                        rows: 3,
                        placeholder: '请输入区域简介'
                    })
                ),
                React.createElement(Form.Item, {
                    name: 'boothCount',
                    label: '展位数量',
                    rules: [{ required: true, message: '请输入展位数量' }]
                },
                    React.createElement(Input, { 
                        type: 'number',
                        placeholder: '请输入该区域的展位数量'
                    })
                ),
                React.createElement(Form.Item, {
                    name: 'boothStartNumber',
                    label: '展位初始编号',
                    rules: [{ required: true, message: '请输入展位初始编号' }]
                },
                    React.createElement(Input, { placeholder: '请输入展位初始编号，如：A001' })
                ),
                React.createElement(Form.Item, {
                    name: 'planImage',
                    label: '区域平面图'
                },
                    React.createElement(Upload, uploadProps,
                        React.createElement('div', null, '+ 上传区域平面图')
                    )
                )
            )
        )
    );
};

// 导出组件
window.BoothManagement = BoothManagement; 