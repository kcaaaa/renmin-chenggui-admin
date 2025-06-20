const { useState, useEffect, useCallback } = React;
const {
    Tabs, Button, Table, Space, Tag, Modal, Form, Input, Select, DatePicker,
    Radio, Switch, Upload, Row, Col, TimePicker, InputNumber, Popconfirm,
    message, Tooltip, Avatar, Dropdown, Menu
} = antd;
const {
    UploadOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined, EyeOutlined,
    PlaySquareOutlined, CommentOutlined, PictureOutlined, HistoryOutlined, ReloadOutlined,
    SearchOutlined, PlusOutlined, VideoCameraAddOutlined
} = antd.icons;

// Helper function for status tags
const renderStatusTag = (status) => {
    const statusConfig = {
        live: { text: '直播中', color: 'red' },
        scheduled: { text: '即将开始', color: 'orange' },
        ended: { text: '已结束', color: 'default' },
        replay: { text: '可回放', color: 'green' }
    };
    const config = statusConfig[status] || { text: status, color: 'blue' };
    return <Tag color={config.color} key={status}>{config.text}</Tag>;
};


// LiveManagement Component
function LiveManagement() {
    const [activeTab, setActiveTab] = useState('live-list');
    const [loading, setLoading] = useState(false);
    const [liveData, setLiveData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingLive, setEditingLive] = useState(null);
    const [searchText, setSearchText] = useState('');

    const [form] = Form.useForm();

    const fetchData = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const data = window.MockData.liveManagementData;
            const filteredList = data.liveList.filter(item => 
                item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.presenter.toLowerCase().includes(searchText.toLowerCase())
            );
            setLiveData({ ...data, liveList: filteredList });
            setLoading(false);
        }, 500);
    }, [searchText]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const showModal = (live = null) => {
        setEditingLive(live);
        if (live) {
            form.setFieldsValue({
                ...live,
                scheduleTime: live.startTime ? moment(live.startTime) : null,
            });
        } else {
            form.resetFields();
            form.setFieldsValue({
                liveType: 'live',
                enableComment: true,
                autoRecord: true,
                moderationLevel: 'medium',
                accessLevel: 'public',
                quality: '1080p',
                fps: 30,
            });
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingLive(null);
        form.resetFields();
    };

    const handleFormSubmit = (values) => {
        const { scheduleTime, ...rest } = values;
        const processedValues = {
            ...rest,
            startTime: scheduleTime.format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log('Form values:', processedValues);
        const action = editingLive ? '更新' : '创建';
        message.loading({ content: `正在${action}直播...`, key: 'action' });

        setTimeout(() => {
            // Here you would typically call an API
            // For now, we just update local state
            if (editingLive) {
                setLiveData(prev => ({
                    ...prev,
                    liveList: prev.liveList.map(l => l.id === editingLive.id ? { ...l, ...processedValues, id: l.id, cover: l.cover, presenterAvatar: l.presenterAvatar } : l)
                }));
            } else {
                 setLiveData(prev => ({
                    ...prev,
                    liveList: [{ 
                        ...processedValues, 
                        id: `live_${Date.now()}`,
                        cover: 'https://placehold.co/120x68/e0e7ff/4f46e5?text=Live',
                        presenterAvatar: 'https://i.pravatar.cc/32',
                        status: 'scheduled',
                        viewerCount: 0,
                        peakViewers: 0
                    }, ...prev.liveList]
                }));
            }
            message.success({ content: `直播${action}成功！`, key: 'action', duration: 2 });
            handleCancel();
        }, 1500);
    };

    const handleDelete = (id) => {
        message.loading({ content: '正在删除...', key: 'delete' });
        setTimeout(() => {
            setLiveData(prev => ({
                ...prev,
                liveList: prev.liveList.filter(l => l.id !== id)
            }));
            message.success({ content: '删除成功！', key: 'delete', duration: 2 });
        }, 1000);
    };
    
    const moreActionsMenu = (record) => (
      <Menu onClick={({ key }) => message.info(`Clicked ${key} for ${record.title}`)}>
        <Menu.Item key="view-details">查看详情</Menu.Item>
        <Menu.Item key="manage-comments">管理评论</Menu.Item>
        <Menu.Item key="view-analytics">查看分析</Menu.Item>
      </Menu>
    );

    const columns = [
        {
            title: '直播信息',
            dataIndex: 'title',
            key: 'info',
            width: 350,
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img
                        src={record.cover}
                        alt={record.title}
                        style={{ width: 120, height: 68, borderRadius: 8, objectFit: 'cover', background: 'var(--bg-color-dark)' }}
                    />
                    <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{record.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }} className="line-clamp-2">{record.description}</div>
                    </div>
                </div>
            )
        },
        {
            title: '主讲人',
            dataIndex: 'presenter',
            key: 'presenter',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar src={record.presenterAvatar} />
                    <span>{text}</span>
                </div>
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: '直播中', value: 'live' },
                { text: '即将开始', value: 'scheduled' },
                { text: '已结束', value: 'ended' },
                { text: '可回放', value: 'replay' },
            ],
            onFilter: (value, record) => record.status === value,
            render: renderStatusTag
        },
        {
            title: '开播时间',
            dataIndex: 'startTime',
            key: 'startTime',
            sorter: (a, b) => moment(a.startTime).unix() - moment(b.startTime).unix(),
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm')
        },
        {
            title: '观看数据',
            dataIndex: 'viewerCount',
            key: 'viewers',
            sorter: (a, b) => a.peakViewers - b.peakViewers,
            render: (text, record) => (
                <div>
                    <div><EyeOutlined style={{ marginRight: 8 }} />{record.peakViewers.toLocaleString()}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>实时: {record.viewerCount.toLocaleString()}</div>
                </div>
            )
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="编辑">
                        <Button shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="确定删除这个直播吗?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="确定"
                        cancelText="取消"
                        placement="topRight"
                    >
                        <Tooltip title="删除">
                            <Button shape="circle" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                    <Dropdown overlay={moreActionsMenu(record)} trigger={['click']}>
                         <Button shape="circle" icon={<EllipsisOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const LiveForm = () => (
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} name="liveForm">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="基本设置" key="1">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="直播标题" name="title" rules={[{ required: true }]}><Input placeholder="请输入直播标题" /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="主讲人" name="presenter" rules={[{ required: true }]}><Input placeholder="请输入主讲人姓名" /></Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="直播简介" name="description"><Input.TextArea rows={2} placeholder="介绍直播内容、主讲人等信息" /></Form.Item>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="计划开播时间" name="scheduleTime" rules={[{ required: true }]}>
                                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                             <Form.Item label="所属展会" name="exhibitionId">
                                <Select placeholder="请选择展会">
                                    <Select.Option value="exhibition_001">中国城市轨道交通博览会</Select.Option>
                                    <Select.Option value="exhibition_002">轨道交通智能化展</Select.Option>
                                    <Select.Option value="exhibition_003">城轨技术创新大会</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                     <Form.Item label="直播封面" name="coverUrl">
                         <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>上传封面</Button>
                        </Upload>
                    </Form.Item>
                </Tabs.TabPane>
                <Tabs.TabPane tab="高级配置" key="2">
                     <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="直播类型" name="liveType">
                                <Radio.Group>
                                    <Radio value="live">📺 直播</Radio>
                                    <Radio value="video">🎬 录播</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                         <Col span={12}>
                            <Form.Item label="观看权限" name="accessLevel">
                                <Select>
                                    <Select.Option value="public">🌍 公开</Select.Option>
                                    <Select.Option value="registered">👤 注册用户</Select.Option>
                                    <Select.Option value="vip">⭐ VIP用户</Select.Option>
                                    <Select.Option value="private">🔒 私有</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}> <Form.Item label="开启评论" name="enableComment" valuePropName="checked"><Switch /></Form.Item></Col>
                        <Col span={8}> <Form.Item label="自动录制" name="autoRecord" valuePropName="checked"><Switch /></Form.Item></Col>
                        <Col span={8}> <Form.Item label="图片直播" name="enableImageLive" valuePropName="checked"><Switch /></Form.Item></Col>
                    </Row>
                     <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="画质设置" name="quality">
                                <Select>
                                    <Select.Option value="720p">720P 高清</Select.Option>
                                    <Select.Option value="1080p">1080P 超清</Select.Option>
                                    <Select.Option value="4k">4K 超高清</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="帧率(fps)" name="fps">
                                <Select>
                                    <Select.Option value={30}>30 fps</Select.Option>
                                    <Select.Option value={60}>60 fps</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </Form>
    );

    const renderLiveList = () => (
        <div className="page-fade-in ruoyi-style-container">
            <div className="ruoyi-query-form">
                 <Form layout="inline">
                    <Form.Item>
                        <Input.Search
                            placeholder="搜索直播标题、主讲人..."
                            style={{ width: 240 }}
                            allowClear
                            onSearch={value => setSearchText(value)}
                            onChange={e => e.target.value === '' && setSearchText('')}
                             enterButton
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<VideoCameraAddOutlined />} onClick={() => showModal()}>
                            新建直播
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="ruoyi-table-box">
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={liveData?.liveList}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1200 }}
                />
            </div>
        </div>
    );
    
    if (!liveData) {
        return <div className="loading-spinner" style={{height: '100%'}}>加载中...</div>;
    }

    // Main Component Return
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">直播管理</h1>
                <p className="page-description">管理和监控所有直播活动，包括创建、编辑和查看直播状态。</p>
            </div>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabBarExtraContent={{
                    right: <Button onClick={fetchData} type="text" icon={<ReloadOutlined />}>刷新</Button>
                }}
            >
                <Tabs.TabPane tab={<span><EyeOutlined /> 直播列表</span>} key="live-list">
                    {renderLiveList()}
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><CommentOutlined /> 评论管理</span>} key="comment-management">
                    <div style={{ padding: 24 }}>评论管理界面 (待开发)</div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><PictureOutlined /> 图片直播</span>} key="image-management">
                    <div style={{ padding: 24 }}>图片直播管理界面 (待开发)</div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><HistoryOutlined /> 回放管理</span>} key="replay-management">
                    <div style={{ padding: 24 }}>回放管理界面 (待开发)</div>
                </Tabs.TabPane>
            </Tabs>
            <Modal
                title={editingLive ? '编辑直播' : '新建直播'}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                width={720}
                okText="提交"
                cancelText="取消"
                destroyOnClose
            >
                <LiveForm />
            </Modal>
        </div>
    );
} 