// 用户管理页面 - 基于新功能规范重构
const UserManagement = () => {
    const { Table, Card, Button, Space, Modal, Form, Input, Select, Switch, Tag, Tabs, Tree, Transfer, message, Descriptions, Alert, DatePicker, Upload } = antd;
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [activeTab, setActiveTab] = React.useState('association');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [permissionModalVisible, setPermissionModalVisible] = React.useState(false);
    const [orgModalVisible, setOrgModalVisible] = React.useState(false);
    const [batchTransferModalVisible, setBatchTransferModalVisible] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [form] = Form.useForm();
    const [permissionForm] = Form.useForm();
    const [orgForm] = Form.useForm();
    
    // 模拟用户数据
    const userData = {
        association: [
            {
                id: 'A001',
                name: '张主任',
                phone: '13800138001',
                idCard: '110101199001011234',
                organization: '协会办公室',
                orgId: 'ORG001',
                status: 'active',
                createMethod: 'admin_create',
                createTime: '2024-01-01 09:00:00',
                lastLogin: '2024-01-14 08:30:00',
                permissions: {
                    menu: ['content', 'review', 'exhibition'],
                    column: ['content_all', 'review_all'],
                    content: ['publish', 'edit', 'delete'],
                    site: ['main_site']
                }
            },
            {
                id: 'A002',
                name: '李秘书',
                phone: '13800138002',
                idCard: '110101199002021234',
                organization: '协会秘书处',
                orgId: 'ORG002',
                status: 'active',
                createMethod: 'batch_import',
                createTime: '2024-01-05 14:30:00',
                lastLogin: '2024-01-13 16:45:00'
            }
        ],
        exhibitor: [
            {
                id: 'E001',
                name: '王经理',
                phone: '13800138003',
                idCard: '110101199003031234',
                creditCode: '91110000123456789X',
                organization: '智慧城轨科技有限公司',
                orgId: 'EXH001',
                status: 'active',
                createMethod: 'registration',
                createTime: '2024-01-10 10:00:00',
                lastLogin: '2024-01-14 09:15:00',
                exhibitorInfo: {
                    isTemporary: true,
                    exhibitionId: 'EX2024001',
                    exhibitionName: '2024年城轨展',
                    validFrom: '2024-01-01',
                    validTo: '2024-03-31',
                    memberType: 'member' // member, non_member
                }
            }
        ],
        regular: [
            {
                id: 'R001',
                name: '刘工程师',
                phone: '13800138004',
                idCard: '110101199004041234',
                organization: '普通用户',
                orgId: 'REG001',
                status: 'active',
                createMethod: 'app_register',
                createTime: '2024-01-12 15:20:00',
                lastLogin: '2024-01-14 07:45:00'
            }
        ]
    };
    
    // 组织结构数据
    const organizationData = [
        {
            title: '协会组织',
            key: 'association',
            children: [
                {
                    title: '协会部门',
                    key: 'association_dept',
                    children: [
                        { title: '行政部', key: 'admin_dept' },
                        { title: '宣传部', key: 'publicity_dept' },
                        { title: '技术部', key: 'tech_dept' }
                    ]
                },
                {
                    title: '分支机构',
                    key: 'branches',
                    children: [
                        { title: '北京分会', key: 'beijing_branch' },
                        { title: '上海分会', key: 'shanghai_branch' }
                    ]
                },
                {
                    title: '下属公司',
                    key: 'subsidiaries',
                    children: [
                        { title: '城轨会展公司', key: 'exhibition_company' },
                        { title: '技术服务公司', key: 'tech_service_company' }
                    ]
                }
            ]
        },
        {
            title: '展商组织',
            key: 'exhibitor',
            children: [
                {
                    title: '会员展商',
                    key: 'member_exhibitors',
                    children: [
                        { title: '智慧城轨科技有限公司', key: 'smart_rail_tech' },
                        { title: '轨道交通设备公司', key: 'rail_equipment_co' }
                    ]
                },
                {
                    title: '非会员展商',
                    key: 'non_member_exhibitors',
                    children: [
                        { title: '某科技公司', key: 'some_tech_company' }
                    ]
                }
            ]
        },
        {
            title: '普通用户',
            key: 'regular_users'
        }
    ];
    
    // 权限配置选项
    const permissionOptions = {
        menu: [
            { label: '内容管理', value: 'content' },
            { label: '审核管理', value: 'review' },
            { label: '展会管理', value: 'exhibition' },
            { label: '运营管理', value: 'operation' },
            { label: '系统管理', value: 'system' }
        ],
        column: [
            { label: '全部内容', value: 'content_all' },
            { label: '个人内容', value: 'content_personal' },
            { label: '全部审核', value: 'review_all' },
            { label: '部门审核', value: 'review_dept' }
        ],
        content: [
            { label: '发布权限', value: 'publish' },
            { label: '编辑权限', value: 'edit' },
            { label: '删除权限', value: 'delete' },
            { label: '审核权限', value: 'review' }
        ],
        site: [
            { label: '主站点', value: 'main_site' },
            { label: '展会站点', value: 'exhibition_site' },
            { label: '移动端', value: 'mobile_site' }
        ]
    };
    
    // 获取当前标签页数据
    const getCurrentData = () => userData[activeTab] || [];
    
    // 获取状态标签
    const getStatusTag = (status) => {
        const statusMap = {
            active: { color: 'green', text: '启用' },
            inactive: { color: 'red', text: '禁用' },
            pending: { color: 'orange', text: '待激活' }
        };
        const config = statusMap[status];
        return <Tag color={config.color}>{config.text}</Tag>;
    };
    
    // 获取创建方式标签
    const getCreateMethodTag = (method) => {
        const methodMap = {
            admin_create: { color: 'blue', text: '后台创建' },
            batch_import: { color: 'purple', text: '批量导入' },
            registration: { color: 'green', text: '报名获取' },
            app_register: { color: 'orange', text: 'APP注册' }
        };
        const config = methodMap[method];
        return <Tag color={config.color}>{config.text}</Tag>;
    };
    
    // 表格列配置
    const getColumns = () => {
        const baseColumns = [
            {
                title: '用户信息',
                key: 'userInfo',
                render: (_, record) => (
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{record.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            ID: {record.id} | {record.phone}
                        </div>
                        {record.exhibitorInfo?.isTemporary && (
                            <Tag size="small" color="orange">临时身份</Tag>
                        )}
                    </div>
                )
            },
            {
                title: '所属组织',
                dataIndex: 'organization',
                key: 'organization'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => getStatusTag(status)
            },
            {
                title: '创建方式',
                dataIndex: 'createMethod',
                key: 'createMethod',
                render: (method) => getCreateMethodTag(method)
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '最后登录',
                dataIndex: 'lastLogin',
                key: 'lastLogin'
            }
        ];
        
        // 展商用户特殊列
        if (activeTab === 'exhibitor') {
            baseColumns.splice(2, 0, {
                title: '展商信息',
                key: 'exhibitorInfo',
                render: (_, record) => (
                    <div>
                        {record.exhibitorInfo && (
                            <div>
                                <div style={{ fontSize: '12px' }}>
                                    展会：{record.exhibitorInfo.exhibitionName}
                                </div>
                                <div style={{ fontSize: '12px' }}>
                                    有效期：{record.exhibitorInfo.validFrom} ~ {record.exhibitorInfo.validTo}
                                </div>
                                <Tag size="small" color={record.exhibitorInfo.memberType === 'member' ? 'blue' : 'default'}>
                                    {record.exhibitorInfo.memberType === 'member' ? '会员' : '非会员'}
                                </Tag>
                            </div>
                        )}
                    </div>
                )
            });
        }
        
        // 操作列
        baseColumns.push({
            title: '操作',
            key: 'action',
            width: 300,
            render: (_, record) => (
                <Space wrap>
                    <Button size="small" type="link" onClick={() => handleEdit(record)}>
                        编辑
                    </Button>
                    <Button size="small" type="link" onClick={() => handlePermissionConfig(record)}>
                        权限配置
                    </Button>
                    <Button size="small" type="link" onClick={() => handleResetPassword(record)}>
                        重置密码
                    </Button>
                    {record.exhibitorInfo?.isTemporary && (
                        <Button size="small" type="link" onClick={() => handleExhibitorManage(record)}>
                            身份管理
                        </Button>
                    )}
                    <Button size="small" type="link" danger onClick={() => handleDelete(record)}>
                        删除
                    </Button>
                </Space>
            )
        });
        
        return baseColumns;
    };
    
    // 处理编辑
    const handleEdit = (record) => {
        setEditingUser(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };
    
    // 处理权限配置
    const handlePermissionConfig = (record) => {
        setEditingUser(record);
        permissionForm.setFieldsValue(record.permissions || {});
        setPermissionModalVisible(true);
    };
    
    // 处理重置密码
    const handleResetPassword = (record) => {
        Modal.confirm({
            title: '重置密码确认',
            content: `确认重置用户"${record.name}"的密码吗？新密码将通过短信发送给用户。`,
            onOk: () => {
                message.success('密码重置成功，已发送短信通知用户');
            }
        });
    };
    
    // 处理展商身份管理
    const handleExhibitorManage = (record) => {
        Modal.info({
            title: '展商身份管理',
            width: 600,
            content: (
                <div>
                    <Descriptions column={1} size="small">
                        <Descriptions.Item label="展会名称">
                            {record.exhibitorInfo.exhibitionName}
                        </Descriptions.Item>
                        <Descriptions.Item label="身份有效期">
                            {record.exhibitorInfo.validFrom} ~ {record.exhibitorInfo.validTo}
                        </Descriptions.Item>
                        <Descriptions.Item label="会员类型">
                            {record.exhibitorInfo.memberType === 'member' ? '协会会员' : '非会员'}
                        </Descriptions.Item>
                    </Descriptions>
                    <Alert
                        message="临时身份说明"
                        description="展商身份为临时性质，展会结束后将自动转为普通用户身份。如需延期或变更，请联系管理员。"
                        type="info"
                        style={{ marginTop: 16 }}
                    />
                </div>
            )
        });
    };
    
    // 处理删除
    const handleDelete = (record) => {
        Modal.confirm({
            title: '删除用户确认',
            content: `确认删除用户"${record.name}"吗？此操作不可恢复。`,
            onOk: () => {
                message.success('用户删除成功');
            }
        });
    };
    
    // 批量转移组织
    const handleBatchTransfer = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请先选择要转移的用户');
            return;
        }
        setBatchTransferModalVisible(true);
    };
    
    // 表格行选择
    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys
    };
    
    // 用户编辑模态框
    const UserModal = () => (
        <Modal
            title={editingUser ? '编辑用户' : '新增用户'}
            visible={modalVisible}
            onCancel={() => {
                setModalVisible(false);
                setEditingUser(null);
                form.resetFields();
            }}
            onOk={() => {
                form.validateFields().then(values => {
                    console.log('保存用户:', values);
                    message.success('保存成功');
                    setModalVisible(false);
                    setEditingUser(null);
                    form.resetFields();
                });
            }}
            width={600}
        >
            <Form form={form} layout="vertical">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Form.Item 
                        label="姓名" 
                        name="name" 
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    
                    <Form.Item 
                        label="手机号" 
                        name="phone"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
                        ]}
                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>
                </div>
                
                <Form.Item label="身份证号" name="idCard">
                    <Input placeholder="请输入身份证号（预留字段）" />
                </Form.Item>
                
                {activeTab === 'exhibitor' && (
                    <Form.Item label="统一社会信用代码" name="creditCode">
                        <Input placeholder="请输入统一社会信用代码" />
                    </Form.Item>
                )}
                
                <Form.Item 
                    label="所属组织" 
                    name="orgId"
                    rules={[{ required: true, message: '请选择所属组织' }]}
                >
                    <Select placeholder="请选择所属组织">
                        <Option value="ORG001">协会办公室</Option>
                        <Option value="ORG002">协会秘书处</Option>
                        <Option value="EXH001">智慧城轨科技有限公司</Option>
                    </Select>
                </Form.Item>
                
                <Form.Item label="用户状态" name="status">
                    <Select defaultValue="active">
                        <Option value="active">启用</Option>
                        <Option value="inactive">禁用</Option>
                    </Select>
                </Form.Item>
                
                {activeTab === 'exhibitor' && (
                    <div>
                        <h4>展商身份信息</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item label="展会" name={['exhibitorInfo', 'exhibitionId']}>
                                <Select placeholder="请选择展会">
                                    <Option value="EX2024001">2024年城轨展</Option>
                                    <Option value="EX2024002">2024年技术论坛</Option>
                                </Select>
                            </Form.Item>
                            
                            <Form.Item label="会员类型" name={['exhibitorInfo', 'memberType']}>
                                <Select placeholder="请选择会员类型">
                                    <Option value="member">协会会员</Option>
                                    <Option value="non_member">非会员</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item label="有效开始日期" name={['exhibitorInfo', 'validFrom']}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            
                            <Form.Item label="有效结束日期" name={['exhibitorInfo', 'validTo']}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </div>
                )}
            </Form>
        </Modal>
    );
    
    // 权限配置模态框
    const PermissionModal = () => (
        <Modal
            title={`权限配置 - ${editingUser?.name}`}
            visible={permissionModalVisible}
            onCancel={() => {
                setPermissionModalVisible(false);
                setEditingUser(null);
                permissionForm.resetFields();
            }}
            onOk={() => {
                permissionForm.validateFields().then(values => {
                    console.log('保存权限:', values);
                    message.success('权限配置保存成功');
                    setPermissionModalVisible(false);
                    setEditingUser(null);
                    permissionForm.resetFields();
                });
            }}
            width={800}
        >
            <Form form={permissionForm} layout="vertical">
                <Alert
                    message="权限配置说明"
                    description="根据用户角色和职责，合理配置各项权限。权限变更将在用户下次登录时生效。"
                    type="info"
                    style={{ marginBottom: 24 }}
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <Form.Item label="菜单权限" name="menu">
                        <Select mode="multiple" placeholder="请选择菜单权限">
                            {permissionOptions.menu.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item label="栏目权限" name="column">
                        <Select mode="multiple" placeholder="请选择栏目权限">
                            {permissionOptions.column.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <Form.Item label="作品权限" name="content">
                        <Select mode="multiple" placeholder="请选择作品权限">
                            {permissionOptions.content.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item label="站点权限" name="site">
                        <Select mode="multiple" placeholder="请选择站点权限">
                            {permissionOptions.site.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
    
    // 组织管理模态框
    const OrganizationModal = () => (
        <Modal
            title="组织结构管理"
            visible={orgModalVisible}
            onCancel={() => setOrgModalVisible(false)}
            footer={null}
            width={800}
        >
            <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                    <h4>组织结构树</h4>
                    <Tree
                        treeData={organizationData}
                        defaultExpandAll
                        onSelect={(keys, info) => {
                            console.log('选中组织:', keys, info);
                        }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h4>组织信息</h4>
                    <Form form={orgForm} layout="vertical">
                        <Form.Item label="组织名称" name="name">
                            <Input placeholder="请输入组织名称" />
                        </Form.Item>
                        <Form.Item label="排序" name="sort">
                            <Input type="number" placeholder="请输入排序号" />
                        </Form.Item>
                        <Form.Item label="状态" name="status">
                            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary">保存</Button>
                                <Button>新增下级</Button>
                                <Button danger>删除</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
    
    return (
        <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Card 
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>👥 用户管理</span>
                        <Divider type="vertical" />
                        <span style={{ fontSize: '14px', color: '#666' }}>
                            管理系统中的协会用户、展商用户和普通用户
                        </span>
                    </div>
                }
                extra={
                    <Space>
                        <Button onClick={() => setOrgModalVisible(true)}>
                            🏢 组织管理
                        </Button>
                        <Upload>
                            <Button>📥 批量导入</Button>
                        </Upload>
                        <Button type="primary" onClick={() => setModalVisible(true)}>
                            ➕ 新增用户
                        </Button>
                    </Space>
                }
                style={{ marginBottom: 24 }}
            >
                {/* 统计信息 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                    <div style={{ textAlign: 'center', padding: 16, background: '#f0f8ff', borderRadius: 8 }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                            {userData.association.length}
                        </div>
                        <div style={{ color: '#666' }}>协会用户</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: 16, background: '#f6ffed', borderRadius: 8 }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                            {userData.exhibitor.length}
                        </div>
                        <div style={{ color: '#666' }}>展商用户</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: 16, background: '#fff2e8', borderRadius: 8 }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                            {userData.regular.length}
                        </div>
                        <div style={{ color: '#666' }}>普通用户</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: 16, background: '#f9f0ff', borderRadius: 8 }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
                            {userData.exhibitor.filter(u => u.exhibitorInfo?.isTemporary).length}
                        </div>
                        <div style={{ color: '#666' }}>临时身份</div>
                    </div>
                </div>
            </Card>
            
            <Card>
                {/* 批量操作 */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                        <Button 
                            onClick={handleBatchTransfer}
                            disabled={selectedRowKeys.length === 0}
                        >
                            📤 批量转移组织 ({selectedRowKeys.length})
                        </Button>
                        <Button 
                            danger
                            disabled={selectedRowKeys.length === 0}
                        >
                            🗑️ 批量删除 ({selectedRowKeys.length})
                        </Button>
                    </Space>
                    <Button onClick={() => window.location.reload()}>
                        🔄 刷新数据
                    </Button>
                </div>
                
                <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
                    <TabPane tab="🏛️ 协会用户" key="association">
                        <Alert
                            message="协会用户说明"
                            description="协会用户由管理员在后台创建或通过批量导入，拥有协会相关功能的访问权限。"
                            type="info"
                            style={{ marginBottom: 16 }}
                        />
                        <Table
                            rowSelection={rowSelection}
                            columns={getColumns()}
                            dataSource={userData.association}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    
                    <TabPane tab="🏢 展商用户" key="exhibitor">
                        <Alert
                            message="展商用户说明"
                            description="展商用户通过报名系统获取，具有临时性质。展会结束后将自动转为普通用户身份。"
                            type="warning"
                            style={{ marginBottom: 16 }}
                        />
                        <Table
                            rowSelection={rowSelection}
                            columns={getColumns()}
                            dataSource={userData.exhibitor}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    
                    <TabPane tab="👤 普通用户" key="regular">
                        <Alert
                            message="普通用户说明"
                            description="普通用户通过APP前端注册，拥有基础的内容发布和浏览权限。"
                            type="info"
                            style={{ marginBottom: 16 }}
                        />
                        <Table
                            rowSelection={rowSelection}
                            columns={getColumns()}
                            dataSource={userData.regular}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                </Tabs>
            </Card>
            
            {/* 各种模态框 */}
            <UserModal />
            <PermissionModal />
            <OrganizationModal />
            
            {/* 批量转移模态框 */}
            <Modal
                title="批量转移组织"
                visible={batchTransferModalVisible}
                onCancel={() => setBatchTransferModalVisible(false)}
                onOk={() => {
                    message.success('批量转移完成');
                    setBatchTransferModalVisible(false);
                    setSelectedRowKeys([]);
                }}
            >
                <p>将选中的 {selectedRowKeys.length} 个用户转移到：</p>
                <Select placeholder="请选择目标组织" style={{ width: '100%', marginBottom: 16 }}>
                    <Option value="ORG001">协会办公室</Option>
                    <Option value="ORG002">协会秘书处</Option>
                    <Option value="EXH001">智慧城轨科技有限公司</Option>
                </Select>
                <TextArea placeholder="请输入转移原因..." rows={4} />
            </Modal>
        </div>
    );
};

// 将组件挂载到全局
window.UserManagement = UserManagement; 