// 展位管理页面 - 展会展位信息管理
const BoothManagement = () => {
    console.log('BoothManagement component is rendering...');
    
    const { Row, Col, Card, Button, Space, Alert, Tag, Table, Modal, Form, Input, Select, message, Tabs, Upload, Tree, Image, Divider, Statistic, Progress, InputNumber, Radio, Switch, DatePicker } = antd;
    const { Search } = Input;
    const { TextArea } = Input;
    const { Option } = Select;
    const { RangePicker: DateRangePicker } = DatePicker;
    
    // 状态管理
    const [activeTab, setActiveTab] = React.useState('venue');
    const [venueModalVisible, setVenueModalVisible] = React.useState(false);
    const [floorModalVisible, setFloorModalVisible] = React.useState(false);
    const [areaModalVisible, setAreaModalVisible] = React.useState(false);
    const [companyModalVisible, setCompanyModalVisible] = React.useState(false);
    const [boothMapModalVisible, setBoothMapModalVisible] = React.useState(false);
    const [editingVenue, setEditingVenue] = React.useState(null);
    const [editingFloor, setEditingFloor] = React.useState(null);
    const [editingArea, setEditingArea] = React.useState(null);
    const [editingCompany, setEditingCompany] = React.useState(null);
    const [selectedFloor, setSelectedFloor] = React.useState(null);
    const [selectedArea, setSelectedArea] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    
    const [venueForm] = Form.useForm();
    const [floorForm] = Form.useForm();
    const [areaForm] = Form.useForm();
    const [companyForm] = Form.useForm();
    
    // 模拟数据
    const [boothData, setBoothData] = React.useState({
        // 场馆数据
        venues: [
            {
                id: 'venue_001',
                name: '人民城轨展览中心',
                address: '北京市朝阳区城轨大道123号',
                description: '专业城市轨道交通展览中心',
                totalFloors: 4,
                totalAreas: 12,
                totalBooths: 150,
                status: 'active',
                created: '2024-01-10 10:00:00'
            }
        ],
        
        // 楼层数据
        floors: [
            { id: 'floor_f1', venueId: 'venue_001', name: 'F1', level: 1, description: '一层展区', areaCount: 3, boothCount: 45, mapUrl: '/images/floor_f1_map.jpg' },
            { id: 'floor_f2', venueId: 'venue_001', name: 'F2', level: 2, description: '二层展区', areaCount: 3, boothCount: 45, mapUrl: '/images/floor_f2_map.jpg' },
            { id: 'floor_f3', venueId: 'venue_001', name: 'F3', level: 3, description: '三层展区', areaCount: 3, boothCount: 30, mapUrl: '/images/floor_f3_map.jpg' },
            { id: 'floor_f4', venueId: 'venue_001', name: 'F4', level: 4, description: '四层展区', areaCount: 3, boothCount: 30, mapUrl: '/images/floor_f4_map.jpg' }
        ],
        
        // 分区数据
        areas: [
            { id: 'area_a', floorId: 'floor_f1', name: 'A区', description: '核心技术展示区', boothCount: 15, color: '#1890ff' },
            { id: 'area_b', floorId: 'floor_f1', name: 'B区', description: '创新产品展示区', boothCount: 15, color: '#52c41a' },
            { id: 'area_c', floorId: 'floor_f1', name: 'C区', description: '解决方案展示区', boothCount: 15, color: '#faad14' },
            { id: 'area_d', floorId: 'floor_f2', name: 'D区', description: '智能装备展示区', boothCount: 15, color: '#f759ab' },
            { id: 'area_e', floorId: 'floor_f2', name: 'E区', description: '数字化展示区', boothCount: 15, color: '#722ed1' },
            { id: 'area_f', floorId: 'floor_f2', name: 'F区', description: '绿色技术展示区', boothCount: 15, color: '#13c2c2' }
        ],
        
        // 参展公司数据
        companies: [
            {
                id: 'company_001',
                name: '中车集团',
                logo: '/images/logos/crrc.png',
                description: '中国中车股份有限公司',
                floorId: 'floor_f1',
                areaId: 'area_a',
                boothNumber: 'A区-01',
                boothSize: '3x3',
                appAccount: 'crrc_official',
                contactPerson: '张经理',
                contactPhone: '13800138001',
                contactEmail: 'zhang@crrc.com',
                website: 'https://www.crrcgc.cc',
                category: '车辆制造',
                status: 'confirmed',
                created: '2024-01-12 14:30:00'
            },
            {
                id: 'company_002',
                name: '比亚迪轨道交通',
                logo: '/images/logos/byd.png',
                description: '比亚迪轨道交通有限公司',
                floorId: 'floor_f1',
                areaId: 'area_a',
                boothNumber: 'A区-02',
                boothSize: '3x3',
                appAccount: 'byd_rail',
                contactPerson: '李总监',
                contactPhone: '13800138002',
                contactEmail: 'li@byd.com',
                website: 'https://rail.byd.com',
                category: '智能交通',
                status: 'confirmed',
                created: '2024-01-13 09:15:00'
            },
            {
                id: 'company_003',
                name: '华为技术',
                logo: '/images/logos/huawei.png',
                description: '华为技术有限公司',
                floorId: 'floor_f1',
                areaId: 'area_a',
                boothNumber: 'A区-03',
                boothSize: '6x3',
                appAccount: 'huawei_rail',
                contactPerson: '王工程师',
                contactPhone: '13800138003',
                contactEmail: 'wang@huawei.com',
                website: 'https://www.huawei.com',
                category: '通信技术',
                status: 'pending',
                created: '2024-01-14 16:45:00'
            }
        ],
        
        // 统计数据
        statistics: {
            totalVenues: 1,
            totalFloors: 4,
            totalAreas: 12,
            totalBooths: 150,
            occupiedBooths: 89,
            totalCompanies: 67,
            confirmedCompanies: 45,
            pendingCompanies: 22
        }
    });

    // 搜索和筛选状态
    const [searchText, setSearchText] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [typeFilter, setTypeFilter] = React.useState('all');
    const [venueFilter, setVenueFilter] = React.useState('all');
    const [floorFilter, setFloorFilter] = React.useState('all');
    const [timeRange, setTimeRange] = React.useState(null);

    React.useEffect(() => {
        loadBoothData();
    }, []);

    // 模拟加载数据
    const loadBoothData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            message.success('展位数据加载成功');
        } catch (error) {
            message.error('数据加载失败');
        } finally {
            setLoading(false);
        }
    };

    // 重置筛选条件
    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('all');
        setTypeFilter('all');
        setVenueFilter('all');
        setFloorFilter('all');
        setTimeRange(null);
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
            case 'venue': return boothData.venues;
            case 'floor': return boothData.floors;
            case 'company': return boothData.companies;
            default: return [];
        }
    };

    // 获取Tab显示名称
    const getTabDisplayName = (tab) => {
        const names = {
            venue: '场馆',
            floor: '楼层分区',
            company: '参展公司'
        };
        return names[tab] || '数据';
    };

    // 数据筛选逻辑
    const filterData = (data) => {
        if (!data || data.length === 0) return [];
        
        return data.filter(item => {
            // 根据不同Tab应用不同的筛选逻辑
            if (activeTab === 'venue') {
                return filterVenues(item);
            } else if (activeTab === 'floor') {
                return filterFloors(item);
            } else if (activeTab === 'company') {
                return filterCompanies(item);
            }
            return true;
        });
    };

    // 场馆筛选逻辑
    const filterVenues = (venue) => {
        // 文本搜索
        if (searchText && 
            !venue.name?.toLowerCase().includes(searchText.toLowerCase()) && 
            !venue.description?.toLowerCase().includes(searchText.toLowerCase()) &&
            !venue.address?.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }
        
        // 状态筛选
        if (statusFilter !== 'all' && venue.status !== statusFilter) {
            return false;
        }
        
        return true;
    };

    // 楼层筛选逻辑
    const filterFloors = (floor) => {
        // 文本搜索
        if (searchText && 
            !floor.name?.toLowerCase().includes(searchText.toLowerCase()) && 
            !floor.description?.toLowerCase().includes(searchText.toLowerCase()) &&
            !floor.venueName?.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }
        
        // 状态筛选
        if (statusFilter !== 'all' && floor.status !== statusFilter) {
            return false;
        }
        
        // 场馆筛选
        if (venueFilter !== 'all' && floor.venueId !== venueFilter) {
            return false;
        }
        
        return true;
    };

    // 公司筛选逻辑
    const filterCompanies = (company) => {
        // 文本搜索
        if (searchText && 
            !company.name?.toLowerCase().includes(searchText.toLowerCase()) && 
            !company.description?.toLowerCase().includes(searchText.toLowerCase()) &&
            !company.contactPerson?.toLowerCase().includes(searchText.toLowerCase()) &&
            !company.boothLocation?.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }
        
        // 状态筛选
        if (statusFilter !== 'all' && company.status !== statusFilter) {
            return false;
        }
        
        // 类型筛选
        if (typeFilter !== 'all' && company.category !== typeFilter) {
            return false;
        }
        
        // 楼层筛选
        if (floorFilter !== 'all' && company.floorId !== floorFilter) {
            return false;
        }
        
        return true;
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
                        placeholder: getSearchPlaceholder(),
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
                    }, getStatusFilterOptions())
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: getTypeFilterPlaceholder(),
                        value: typeFilter,
                        onChange: setTypeFilter,
                        style: { width: '100%' }
                    }, getTypeFilterOptions())
                ]),
                React.createElement(Col, { span: 3 }, [
                    React.createElement(Select, {
                        placeholder: "楼层筛选",
                        value: floorFilter,
                        onChange: setFloorFilter,
                        style: { width: '100%' }
                    }, getFloorFilterOptions())
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
                React.createElement(Col, { span: 2 }, []),
                React.createElement(Col, { span: 4 }, [
                    React.createElement(Space, {}, [
                        React.createElement(Button, {
                            onClick: resetFilters
                        }, '重置'),
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: () => loadBoothData()
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
                    React.createElement(Space, {}, getBatchOperationButtons())
                ])
            ])
        ]);
    };

    // 获取搜索框占位符
    const getSearchPlaceholder = () => {
        const placeholders = {
            venue: '搜索场馆名称、地址或描述',
            floor: '搜索楼层名称或描述',
            company: '搜索公司名称、联系人或展位位置'
        };
        return placeholders[activeTab] || '搜索...';
    };

    // 获取类型筛选占位符
    const getTypeFilterPlaceholder = () => {
        const placeholders = {
            venue: '场馆类型',
            floor: '楼层类型',
            company: '公司类型'
        };
        return placeholders[activeTab] || '类型筛选';
    };

    // 获取状态筛选选项
    const getStatusFilterOptions = () => {
        const optionsMap = {
            venue: [
                React.createElement(Option, { value: 'all' }, '全部状态'),
                React.createElement(Option, { value: 'active' }, '使用中'),
                React.createElement(Option, { value: 'inactive' }, '待开放')
            ],
            floor: [
                React.createElement(Option, { value: 'all' }, '全部状态'),
                React.createElement(Option, { value: 'active' }, '启用'),
                React.createElement(Option, { value: 'inactive' }, '停用')
            ],
            company: [
                React.createElement(Option, { value: 'all' }, '全部状态'),
                React.createElement(Option, { value: 'confirmed' }, '已确认'),
                React.createElement(Option, { value: 'pending' }, '待确认'),
                React.createElement(Option, { value: 'cancelled' }, '已取消')
            ]
        };
        return optionsMap[activeTab] || [React.createElement(Option, { value: 'all' }, '全部状态')];
    };

    // 获取类型筛选选项
    const getTypeFilterOptions = () => {
        const optionsMap = {
            venue: [
                React.createElement(Option, { value: 'all' }, '全部类型'),
                React.createElement(Option, { value: 'exhibition' }, '展览中心'),
                React.createElement(Option, { value: 'conference' }, '会议中心'),
                React.createElement(Option, { value: 'mixed' }, '综合场馆')
            ],
            floor: [
                React.createElement(Option, { value: 'all' }, '全部类型'),
                React.createElement(Option, { value: 'exhibition' }, '展览楼层'),
                React.createElement(Option, { value: 'meeting' }, '会议楼层'),
                React.createElement(Option, { value: 'service' }, '服务楼层')
            ],
            company: [
                React.createElement(Option, { value: 'all' }, '全部类型'),
                React.createElement(Option, { value: '制造商' }, '制造商'),
                React.createElement(Option, { value: '服务商' }, '服务商'),
                React.createElement(Option, { value: '技术商' }, '技术商'),
                React.createElement(Option, { value: '咨询商' }, '咨询商')
            ]
        };
        return optionsMap[activeTab] || [React.createElement(Option, { value: 'all' }, '全部类型')];
    };

    // 获取楼层筛选选项
    const getFloorFilterOptions = () => {
        const options = [React.createElement(Option, { value: 'all' }, '全部楼层')];
        boothData.floors.forEach(floor => {
            options.push(React.createElement(Option, { value: floor.id }, floor.name));
        });
        return options;
    };

    // 获取批量操作按钮
    const getBatchOperationButtons = () => {
        const buttons = [
            React.createElement(Button, {
                onClick: handleExport
            }, '导出数据'),
            React.createElement(Button, {
                onClick: () => loadBoothData()
            }, '刷新')
        ];

        if (activeTab === 'company' && selectedRows.length > 0) {
            buttons.unshift(
                React.createElement(Button, {
                    type: 'primary',
                    disabled: selectedRows.length === 0,
                    onClick: () => handleBatchCompanyOperation('confirm')
                }, `批量确认 (${selectedRows.length})`),
                React.createElement(Button, {
                    danger: true,
                    disabled: selectedRows.length === 0,
                    onClick: () => handleBatchCompanyOperation('cancel')
                }, `批量取消 (${selectedRows.length})`)
            );
        }

        return buttons;
    };

    // 批量公司操作
    const handleBatchCompanyOperation = (action) => {
        if (selectedRows.length === 0) {
            message.warning('请选择要操作的参展公司');
            return;
        }

        const actionText = action === 'confirm' ? '确认' : '取消';
        Modal.confirm({
            title: `确认${actionText}选中的参展公司？`,
            content: `将对 ${selectedRows.length} 个参展公司执行${actionText}操作`,
            onOk: () => {
                setLoading(true);
                setTimeout(() => {
                    setSelectedRows([]);
                    loadBoothData();
                    message.success(`已${actionText} ${selectedRows.length} 个参展公司`);
                }, 1000);
            }
        });
    };

    // 渲染场馆管理
    const renderVenueManagement = () => {
        const venueColumns = [
            {
                title: '场馆信息',
                dataIndex: 'name',
                width: 300,
                render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'name',
                        style: { fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'address',
                        style: { color: '#666', fontSize: '12px', marginBottom: '4px' }
                    }, record.address),
                    React.createElement('div', {
                        key: 'description',
                        style: { color: '#999', fontSize: '12px' }
                    }, record.description)
                ])
            },
            {
                title: '展位统计',
                dataIndex: 'totalBooths',
                width: 200,
                render: (_, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'floors',
                        style: { marginBottom: '4px' }
                    }, `楼层数: ${record.totalFloors}`),
                    React.createElement('div', {
                        key: 'areas',
                        style: { marginBottom: '4px' }
                    }, `分区数: ${record.totalAreas}`),
                    React.createElement('div', {
                        key: 'booths',
                        style: { fontWeight: 'bold', color: '#1890ff' }
                    }, `展位数: ${record.totalBooths}`)
                ])
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => React.createElement(Tag, {
                    color: status === 'active' ? 'green' : 'orange'
                }, status === 'active' ? '使用中' : '待开放')
            },
            {
                title: '创建时间',
                dataIndex: 'created',
                width: 150
            },
            {
                title: '操作',
                width: 200,
                render: (_, record) => React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'edit',
                        size: 'small',
                        onClick: () => editVenue(record)
                    }, '编辑'),
                    React.createElement(Button, {
                        key: 'floors',
                        size: 'small',
                        type: 'primary',
                        onClick: () => manageFloors(record)
                    }, '楼层管理'),
                    React.createElement(Button, {
                        key: 'delete',
                        size: 'small',
                        danger: true,
                        onClick: () => deleteVenue(record)
                    }, '删除')
                ])
            }
        ];

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'venue-info',
                message: '场馆信息管理',
                description: '管理展会场馆基本信息，包括场馆名称、地址、描述等',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Card, {
                key: 'venue-table',
                title: '场馆列表',
                extra: React.createElement(Button, {
                    type: 'primary',
                    onClick: () => createNewVenue()
                }, '新建场馆')
            }, React.createElement(Table, {
                dataSource: boothData.venues?.map((item, index) => ({ ...item, key: index })) || [],
                columns: venueColumns,
                pagination: false,
                size: 'small',
                loading: loading
            }))
        ]);
    };

    // 渲染楼层分区管理
    const renderFloorAreaManagement = () => {
        // 构建楼层树形数据
        const treeData = boothData.floors.map(floor => ({
            title: React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }
            }, [
                React.createElement('span', { key: 'name' }, `${floor.name} - ${floor.description}`),
                React.createElement('span', { 
                    key: 'count', 
                    style: { color: '#666', fontSize: '12px' } 
                }, `${floor.areaCount}个分区 ${floor.boothCount}个展位`)
            ]),
            key: floor.id,
            children: boothData.areas
                .filter(area => area.floorId === floor.id)
                .map(area => ({
                    title: React.createElement('div', {
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }
                    }, [
                        React.createElement('span', { key: 'name' }, `${area.name} - ${area.description}`),
                        React.createElement('span', { 
                            key: 'count', 
                            style: { color: '#666', fontSize: '12px' } 
                        }, `${area.boothCount}个展位`)
                    ]),
                    key: area.id,
                    isLeaf: true
                }))
        }));

        return React.createElement('div', {}, [
            React.createElement(Alert, {
                key: 'floor-info',
                message: '楼层分区管理',
                description: '管理展会楼层和分区信息，设置展位分布和区域划分',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),

            React.createElement(Row, { key: 'floor-content', gutter: [24, 24] }, [
                React.createElement(Col, { span: 10 }, [
                    React.createElement(Card, {
                        title: '楼层分区结构',
                        extra: React.createElement(Space, { size: 'small' }, [
                            React.createElement(Button, {
                                size: 'small',
                                onClick: () => createNewFloor()
                            }, '新建楼层'),
                            React.createElement(Button, {
                                size: 'small',
                                onClick: () => createNewArea()
                            }, '新建分区')
                        ])
                    }, React.createElement(Tree, {
                        treeData: treeData,
                        defaultExpandAll: true,
                        onSelect: (selectedKeys, info) => {
                            const { node } = info;
                            if (node.isLeaf) {
                                // 选择了分区
                                const area = boothData.areas.find(a => a.id === node.key);
                                setSelectedArea(area);
                            } else {
                                // 选择了楼层
                                const floor = boothData.floors.find(f => f.id === node.key);
                                setSelectedFloor(floor);
                            }
                        }
                    }))
                ]),
                
                React.createElement(Col, { span: 14 }, [
                    selectedFloor && React.createElement(Card, {
                        key: 'floor-details',
                        title: `${selectedFloor.name} 楼层详情`,
                        extra: React.createElement(Space, { size: 'small' }, [
                            React.createElement(Button, {
                                size: 'small',
                                onClick: () => editFloor(selectedFloor)
                            }, '编辑楼层'),
                            React.createElement(Button, {
                                size: 'small',
                                onClick: () => uploadBoothMap(selectedFloor)
                            }, '上传展位图')
                        ]),
                        style: { marginBottom: '16px' }
                    }, [
                        React.createElement('p', { key: 'desc' }, selectedFloor.description),
                        React.createElement('p', { key: 'stats' }, `分区数量: ${selectedFloor.areaCount} | 展位数量: ${selectedFloor.boothCount}`),
                        selectedFloor.mapUrl && React.createElement(Image, {
                            key: 'map',
                            src: selectedFloor.mapUrl,
                            alt: `${selectedFloor.name}展位图`,
                            style: { maxWidth: '100%', maxHeight: '300px' }
                        })
                    ]),
                    
                    selectedArea && React.createElement(Card, {
                        key: 'area-details',
                        title: `${selectedArea.name} 分区详情`,
                        extra: React.createElement(Button, {
                            size: 'small',
                            onClick: () => editArea(selectedArea)
                        }, '编辑分区')
                    }, [
                        React.createElement('p', { key: 'desc' }, selectedArea.description),
                        React.createElement('p', { key: 'stats' }, `展位数量: ${selectedArea.boothCount}`),
                        React.createElement('div', {
                            key: 'color',
                            style: {
                                width: '100px',
                                height: '30px',
                                backgroundColor: selectedArea.color,
                                borderRadius: '4px',
                                border: '1px solid #d9d9d9'
                            }
                        })
                    ])
                ])
            ])
        ]);
    };

    // 渲染参展公司管理
    const renderCompanyManagement = () => {
        const companyColumns = [
            {
                title: '公司信息',
                dataIndex: 'name',
                width: 250,
                render: (text, record) => React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: 12 }
                }, [
                    React.createElement('div', {
                        key: 'logo',
                        style: {
                            width: '40px',
                            height: '40px',
                            background: '#f0f2f5',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: '#666'
                        }
                    }, 'LOGO'),
                    React.createElement('div', { key: 'info' }, [
                        React.createElement('div', {
                            key: 'name',
                            style: { fontWeight: 'bold', marginBottom: '4px' }
                        }, text),
                        React.createElement('div', {
                            key: 'desc',
                            style: { fontSize: '12px', color: '#666' }
                        }, record.description),
                        React.createElement('div', {
                            key: 'category',
                            style: { fontSize: '12px', marginTop: '4px' }
                        }, React.createElement(Tag, { size: 'small' }, record.category))
                    ])
                ])
            },
            {
                title: '展位信息',
                dataIndex: 'boothNumber',
                width: 150,
                render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'booth',
                        style: { fontWeight: 'bold', marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'size',
                        style: { fontSize: '12px', color: '#666' }
                    }, `规格: ${record.boothSize}`)
                ])
            },
            {
                title: '联系信息',
                dataIndex: 'contactPerson',
                width: 180,
                render: (text, record) => React.createElement('div', {}, [
                    React.createElement('div', {
                        key: 'person',
                        style: { marginBottom: '4px' }
                    }, text),
                    React.createElement('div', {
                        key: 'phone',
                        style: { fontSize: '12px', color: '#666' }
                    }, record.contactPhone),
                    React.createElement('div', {
                        key: 'email',
                        style: { fontSize: '12px', color: '#666' }
                    }, record.contactEmail)
                ])
            },
            {
                title: 'APP账号',
                dataIndex: 'appAccount',
                width: 120,
                render: (text) => React.createElement(Tag, { color: 'blue' }, text)
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => React.createElement(Tag, {
                    color: status === 'confirmed' ? 'green' : status === 'pending' ? 'orange' : 'red'
                }, status === 'confirmed' ? '已确认' : status === 'pending' ? '待确认' : '已取消')
            },
            {
                title: '操作',
                width: 200,
                render: (_, record) => React.createElement(Space, { size: 'small' }, [
                    React.createElement(Button, {
                        key: 'edit',
                        size: 'small',
                        onClick: () => editCompany(record)
                    }, '编辑'),
                    React.createElement(Button, {
                        key: 'view',
                        size: 'small',
                        onClick: () => viewCompanyDetails(record)
                    }, '详情'),
                    React.createElement(Button, {
                        key: 'delete',
                        size: 'small',
                        danger: true,
                        onClick: () => deleteCompany(record)
                    }, '删除')
                ])
            }
        ];

        return React.createElement('div', {}, [
            // 统计卡片
            React.createElement(Row, {
                key: 'company-statistics',
                gutter: [16, 16],
                style: { marginBottom: '24px' }
            }, [
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            title: '参展公司总数',
                            value: boothData.statistics.totalCompanies,
                            prefix: '🏢',
                            valueStyle: { color: '#1890ff' }
                        })
                    ])
                ]),
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            title: '已确认公司',
                            value: boothData.statistics.confirmedCompanies,
                            prefix: '✅',
                            valueStyle: { color: '#52c41a' }
                        })
                    ])
                ]),
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            title: '待确认公司',
                            value: boothData.statistics.pendingCompanies,
                            prefix: '⏳',
                            valueStyle: { color: '#faad14' }
                        })
                    ])
                ]),
                React.createElement(Col, { span: 6 }, [
                    React.createElement(Card, { size: 'small' }, [
                        React.createElement(Statistic, {
                            title: '展位占用率',
                            value: ((boothData.statistics.occupiedBooths / boothData.statistics.totalBooths) * 100).toFixed(1),
                            suffix: '%',
                            prefix: '📊',
                            valueStyle: { color: '#722ed1' }
                        })
                    ])
                ])
            ]),

            React.createElement(Card, {
                key: 'company-table',
                title: '参展公司列表',
                extra: React.createElement(Space, {}, [
                    React.createElement(Button, {
                        type: 'primary',
                        onClick: () => createNewCompany()
                    }, '新增公司'),
                    React.createElement(Button, {
                        onClick: () => batchImportCompanies()
                    }, '批量导入'),
                    React.createElement(Button, {
                        onClick: () => loadBoothData()
                    }, '刷新数据')
                ])
            }, React.createElement(Table, {
                dataSource: boothData.companies?.map((item, index) => ({ ...item, key: index })) || [],
                columns: companyColumns,
                pagination: { pageSize: 10 },
                size: 'small',
                scroll: { x: 1200 },
                loading: loading
            }))
        ]);
    };

    // 功能函数
    const createNewVenue = () => {
        setEditingVenue(null);
        venueForm.resetFields();
        setVenueModalVisible(true);
    };

    const editVenue = (venue) => {
        setEditingVenue(venue);
        venueForm.setFieldsValue(venue);
        setVenueModalVisible(true);
    };

    const deleteVenue = (venue) => {
        Modal.confirm({
            title: '确认删除场馆',
            content: `确定要删除场馆 "${venue.name}" 吗？`,
            onOk() {
                message.success('场馆删除成功');
                loadBoothData();
            }
        });
    };

    const manageFloors = (venue) => {
        message.info(`进入 ${venue.name} 的楼层管理`);
        // 这里可以跳转到楼层管理页面或打开模态框
    };

    const createNewFloor = () => {
        setEditingFloor(null);
        floorForm.resetFields();
        setFloorModalVisible(true);
    };

    const editFloor = (floor) => {
        setEditingFloor(floor);
        floorForm.setFieldsValue(floor);
        setFloorModalVisible(true);
    };

    const createNewArea = () => {
        setEditingArea(null);
        areaForm.resetFields();
        setAreaModalVisible(true);
    };

    const editArea = (area) => {
        setEditingArea(area);
        areaForm.setFieldsValue(area);
        setAreaModalVisible(true);
    };

    const createNewCompany = () => {
        setEditingCompany(null);
        companyForm.resetFields();
        setCompanyModalVisible(true);
    };

    const editCompany = (company) => {
        setEditingCompany(company);
        companyForm.setFieldsValue(company);
        setCompanyModalVisible(true);
    };

    const viewCompanyDetails = (company) => {
        Modal.info({
            title: '参展公司详情',
            width: 600,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'name' }, `公司名称: ${company.name}`),
                React.createElement('p', { key: 'desc' }, `公司简介: ${company.description}`),
                React.createElement('p', { key: 'booth' }, `展位号: ${company.boothNumber}`),
                React.createElement('p', { key: 'contact' }, `联系人: ${company.contactPerson}`),
                React.createElement('p', { key: 'phone' }, `联系电话: ${company.contactPhone}`),
                React.createElement('p', { key: 'email' }, `邮箱: ${company.contactEmail}`)
            ])
        });
    };

    const deleteCompany = (company) => {
        Modal.confirm({
            title: '确认删除参展公司',
            content: `确定要删除参展公司 "${company.name}" 吗？`,
            onOk() {
                message.success('参展公司删除成功');
                loadBoothData();
            }
        });
    };

    const batchImportCompanies = () => {
        message.info('批量导入参展公司功能');
        // 这里可以打开批量导入模态框
    };

    const uploadBoothMap = (floor) => {
        setSelectedFloor(floor);
        setBoothMapModalVisible(true);
    };

    // Tab配置
    const tabItems = [
        {
            key: 'venue',
            label: '🏢 场馆管理',
            children: renderVenueManagement()
        },
        {
            key: 'floor',
            label: '🏗️ 楼层分区',
            children: renderFloorAreaManagement()
        },
        {
            key: 'company',
            label: '🏭 参展公司',
            children: renderCompanyManagement()
        }
    ];

    console.log('Creating BoothManagement JSX...');

    return React.createElement('div', { className: 'booth-management-page' }, [
        React.createElement('div', {
            key: 'header',
            style: {
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            React.createElement('h2', {
                key: 'title',
                style: { margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }
            }, '🏢 展位管理'),
            React.createElement(Space, {
                key: 'actions'
            }, [
                React.createElement(Button, {
                    key: 'refresh',
                    onClick: () => loadBoothData()
                }, '刷新数据'),
                React.createElement(Button, {
                    key: 'help',
                    type: 'default',
                    onClick: () => message.info('展位管理帮助文档')
                }, '使用帮助')
            ])
        ]),

        // 搜索和筛选工具栏
        renderSearchToolbar(),
        
        // 批量操作工具栏
        renderBatchToolbar(),

        React.createElement(Tabs, {
            key: 'main-tabs',
            items: tabItems,
            defaultActiveKey: 'venue',
            onChange: setActiveTab
        }),

        // 这里会添加各种Modal组件
        // 场馆Modal、楼层Modal、分区Modal、公司Modal等
    ]);
};

console.log('BoothManagement component defined');
window.BoothManagement = BoothManagement;
console.log('BoothManagement attached to window object'); 
