// 报名管理页面 - v3版本：配置展会报名方式和报名表单
const RegistrationManagement = () => {
    const { Card, Table, Button, Modal, Form, Input, Select, Space, message, Tag, Row, Col, Tabs, Switch, Radio, Divider, Typography } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    const { TabPane } = Tabs;
    const { Title, Text } = Typography;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitions, setExhibitions] = React.useState([]);
    const [selectedExhibition, setSelectedExhibition] = React.useState(null);
    const [registrationConfig, setRegistrationConfig] = React.useState({});
    const [configModalVisible, setConfigModalVisible] = React.useState(false);
    const [previewModalVisible, setPreviewModalVisible] = React.useState(false);
    const [form] = Form.useForm();
    const [fieldForm] = Form.useForm();

    // 模拟展会数据
    React.useEffect(() => {
        loadExhibitions();
    }, []);

    const loadExhibitions = () => {
        setLoading(true);
        // 模拟展会数据
        const mockExhibitions = [
            {
                id: 'EX001',
                name: '2024中国城市轨道交通博览会',
                startDate: '2024-06-15',
                endDate: '2024-06-18',
                venue: '北京国际展览中心',
                status: 'upcoming',
                registrationMethod: 'internal', // internal 或 external
                externalUrl: '',
                formFields: [
                    { id: 1, name: 'companyName', label: '公司名称', type: 'input', required: true, enabled: true },
                    { id: 2, name: 'contactPerson', label: '联系人', type: 'input', required: true, enabled: true },
                    { id: 3, name: 'phone', label: '联系电话', type: 'input', required: true, enabled: true },
                    { id: 4, name: 'email', label: '邮箱', type: 'input', required: true, enabled: true },
                    { id: 5, name: 'businessLicense', label: '营业执照', type: 'upload', required: true, enabled: true },
                    { id: 6, name: 'companyProfile', label: '公司简介', type: 'textarea', required: false, enabled: true },
                    { id: 7, name: 'boothRequirement', label: '展位需求', type: 'select', required: true, enabled: true,
                      options: ['标准展位', '豪华展位', '特装展位'] }
                ]
            },
            {
                id: 'EX002',
                name: '2024智慧交通技术展',
                startDate: '2024-08-20',
                endDate: '2024-08-23',
                venue: '上海新国际博览中心',
                status: 'upcoming',
                registrationMethod: 'external',
                externalUrl: 'https://registration.example.com/smart-transport-2024',
                formFields: []
            }
        ];

        setTimeout(() => {
            setExhibitions(mockExhibitions);
            if (mockExhibitions.length > 0) {
                setSelectedExhibition(mockExhibitions[0]);
                setRegistrationConfig(mockExhibitions[0]);
            }
            setLoading(false);
        }, 500);
    };

    // 选择展会
    const handleExhibitionSelect = (exhibition) => {
        setSelectedExhibition(exhibition);
        setRegistrationConfig(exhibition);
    };

    // 保存报名配置
    const handleSaveConfig = () => {
        form.validateFields().then(values => {
            console.log('保存报名配置:', values);
            message.success('报名配置保存成功！配置完成后，APP端展会板块的"报名入口"将同步显示相应的报名信息。');
            
            // 更新配置
            const updatedConfig = {
                ...registrationConfig,
                ...values
            };
            setRegistrationConfig(updatedConfig);
            
            // 更新展会列表中的配置
            const updatedExhibitions = exhibitions.map(ex => 
                ex.id === selectedExhibition.id ? updatedConfig : ex
            );
            setExhibitions(updatedExhibitions);
        });
    };

    // 添加表单字段
    const handleAddField = () => {
        setConfigModalVisible(true);
        fieldForm.resetFields();
    };

    // 保存新字段
    const handleSaveField = () => {
        fieldForm.validateFields().then(values => {
            const newField = {
                id: Date.now(),
                ...values,
                enabled: true
            };
            
            const updatedFields = [...(registrationConfig.formFields || []), newField];
            const updatedConfig = {
                ...registrationConfig,
                formFields: updatedFields
            };
            
            setRegistrationConfig(updatedConfig);
            setConfigModalVisible(false);
            message.success('字段添加成功！');
        });
    };

    // 删除字段
    const handleDeleteField = (fieldId) => {
        const updatedFields = registrationConfig.formFields.filter(field => field.id !== fieldId);
        const updatedConfig = {
            ...registrationConfig,
            formFields: updatedFields
        };
        setRegistrationConfig(updatedConfig);
        message.success('字段删除成功！');
    };

    // 切换字段启用状态
    const handleToggleField = (fieldId, enabled) => {
        const updatedFields = registrationConfig.formFields.map(field =>
            field.id === fieldId ? { ...field, enabled } : field
        );
        const updatedConfig = {
            ...registrationConfig,
            formFields: updatedFields
        };
        setRegistrationConfig(updatedConfig);
    };

    // 预览报名表单
    const handlePreviewForm = () => {
        setPreviewModalVisible(true);
    };

    // 展会列表列定义
    const exhibitionColumns = [
        {
            title: '展会名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                React.createElement('a', {
                    onClick: () => handleExhibitionSelect(record),
                    style: { 
                        color: selectedExhibition?.id === record.id ? '#1890ff' : 'inherit',
                        fontWeight: selectedExhibition?.id === record.id ? 'bold' : 'normal'
                    }
                }, text)
            )
        },
        {
            title: '展会时间',
            key: 'time',
            render: (text, record) => `${record.startDate} 至 ${record.endDate}`
        },
        {
            title: '场馆',
            dataIndex: 'venue',
            key: 'venue'
        },
        {
            title: '报名方式',
            dataIndex: 'registrationMethod',
            key: 'registrationMethod',
            render: (method) => (
                React.createElement(Tag, {
                    color: method === 'internal' ? 'blue' : 'green'
                }, method === 'internal' ? '内部报名表单' : '外部链接报名')
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                React.createElement(Tag, {
                    color: status === 'upcoming' ? 'blue' : status === 'active' ? 'green' : 'gray'
                }, status === 'upcoming' ? '即将开始' : status === 'active' ? '进行中' : '已结束')
            )
        }
    ];

    // 表单字段列定义
    const fieldColumns = [
        {
            title: '字段名称',
            dataIndex: 'label',
            key: 'label'
        },
        {
            title: '字段类型',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
                const typeMap = {
                    input: '文本输入',
                    textarea: '多行文本',
                    select: '下拉选择',
                    upload: '文件上传',
                    radio: '单选',
                    checkbox: '多选'
                };
                return typeMap[type] || type;
            }
        },
        {
            title: '是否必填',
            dataIndex: 'required',
            key: 'required',
            render: (required) => (
                React.createElement(Tag, {
                    color: required ? 'red' : 'gray'
                }, required ? '必填' : '选填')
            )
        },
        {
            title: '启用状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled, record) => (
                React.createElement(Switch, {
                    checked: enabled,
                    onChange: (checked) => handleToggleField(record.id, checked)
                })
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                React.createElement(Space, null,
                    React.createElement(Button, {
                        size: 'small',
                        danger: true,
                        onClick: () => handleDeleteField(record.id)
                    }, '删除')
                )
            )
        }
    ];

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Title, { level: 2 }, '报名管理'),
        React.createElement(Text, { type: 'secondary' }, 
            '配置展会报名方式和报名表单，配置完成后在APP端展会板块可同步显示报名信息和跳转链接。'
        ),
        
        React.createElement(Row, { gutter: 24, style: { marginTop: 24 } },
            // 左侧：展会列表
            React.createElement(Col, { span: 10 },
                React.createElement(Card, { 
                    title: '展会列表',
                    size: 'small'
                },
                    React.createElement(Table, {
                        columns: exhibitionColumns,
                        dataSource: exhibitions,
                        rowKey: 'id',
                        loading: loading,
                        pagination: false,
                        size: 'small'
                    })
                )
            ),
            
            // 右侧：报名配置
            React.createElement(Col, { span: 14 },
                selectedExhibition ? React.createElement(Card, {
                    title: `${selectedExhibition.name} - 报名配置`,
                    extra: React.createElement(Space, null,
                        React.createElement(Button, {
                            onClick: handlePreviewForm
                        }, '预览报名表单'),
                        React.createElement(Button, {
                            type: 'primary',
                            onClick: handleSaveConfig
                        }, '保存配置')
                    )
                },
                    React.createElement(Form, {
                        form: form,
                        layout: 'vertical',
                        initialValues: registrationConfig
                    },
                        React.createElement(Form.Item, {
                            name: 'registrationMethod',
                            label: '报名方式'
                        },
                            React.createElement(Radio.Group, null,
                                React.createElement(Radio, { value: 'internal' }, '内部报名表单'),
                                React.createElement(Radio, { value: 'external' }, '外部链接报名')
                            )
                        ),
                        
                        // 外部链接配置
                        React.createElement(Form.Item, {
                            noStyle: true
                        },
                            React.createElement(Form.Item, {
                                name: 'externalUrl',
                                label: '外部报名链接',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入外部报名链接',
                                        validator: (_, value) => {
                                            const method = form.getFieldValue('registrationMethod');
                                            if (method === 'external' && !value) {
                                                return Promise.reject('请输入外部报名链接');
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]
                            },
                                React.createElement(Input, {
                                    placeholder: '请输入外部报名平台链接地址',
                                    disabled: form.getFieldValue('registrationMethod') !== 'external'
                                })
                            )
                        ),
                        
                        React.createElement(Divider, null),
                        
                        // 内部表单字段配置
                        React.createElement('div', null,
                            React.createElement('div', {
                                style: { 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginBottom: 16
                                }
                            },
                                React.createElement(Title, { level: 4, style: { margin: 0 } }, '报名表单字段'),
                                React.createElement(Button, {
                                    onClick: handleAddField,
                                    disabled: registrationConfig.registrationMethod !== 'internal'
                                }, '添加字段')
                            ),
                            
                            React.createElement(Table, {
                                columns: fieldColumns,
                                dataSource: registrationConfig.formFields || [],
                                rowKey: 'id',
                                pagination: false,
                                size: 'small'
                            })
                        )
                    )
                ) : React.createElement(Card, null,
                    React.createElement('div', {
                        style: { textAlign: 'center', padding: 40, color: '#999' }
                    }, '请选择一个展会进行报名配置')
                )
            )
        ),
        
        // 添加字段Modal
        React.createElement(Modal, {
            title: '添加表单字段',
            visible: configModalVisible,
            onOk: handleSaveField,
            onCancel: () => setConfigModalVisible(false),
            width: 600
        },
            React.createElement(Form, {
                form: fieldForm,
                layout: 'vertical'
            },
                React.createElement(Form.Item, {
                    name: 'label',
                    label: '字段标签',
                    rules: [{ required: true, message: '请输入字段标签' }]
                },
                    React.createElement(Input, { placeholder: '如：公司名称' })
                ),
                React.createElement(Form.Item, {
                    name: 'name',
                    label: '字段名称',
                    rules: [{ required: true, message: '请输入字段名称' }]
                },
                    React.createElement(Input, { placeholder: '如：companyName' })
                ),
                React.createElement(Form.Item, {
                    name: 'type',
                    label: '字段类型',
                    rules: [{ required: true, message: '请选择字段类型' }]
                },
                    React.createElement(Select, { placeholder: '请选择字段类型' },
                        React.createElement(Option, { value: 'input' }, '文本输入'),
                        React.createElement(Option, { value: 'textarea' }, '多行文本'),
                        React.createElement(Option, { value: 'select' }, '下拉选择'),
                        React.createElement(Option, { value: 'upload' }, '文件上传'),
                        React.createElement(Option, { value: 'radio' }, '单选'),
                        React.createElement(Option, { value: 'checkbox' }, '多选')
                    )
                ),
                React.createElement(Form.Item, {
                    name: 'required',
                    label: '是否必填',
                    valuePropName: 'checked'
                },
                    React.createElement(Switch, null)
                ),
                React.createElement(Form.Item, {
                    name: 'options',
                    label: '选项配置（适用于下拉选择、单选、多选）'
                },
                    React.createElement(TextArea, {
                        placeholder: '请输入选项，每行一个选项',
                        rows: 4
                    })
                )
            )
        ),
        
        // 预览Modal
        React.createElement(Modal, {
            title: `${selectedExhibition?.name} - 报名表单预览`,
            visible: previewModalVisible,
            onCancel: () => setPreviewModalVisible(false),
            footer: null,
            width: 800
        },
            React.createElement('div', { style: { padding: 20 } },
                React.createElement(Title, { level: 3, style: { textAlign: 'center' } }, 
                    selectedExhibition?.name
                ),
                React.createElement(Text, { style: { display: 'block', textAlign: 'center', marginBottom: 30 } }, 
                    `${selectedExhibition?.startDate} 至 ${selectedExhibition?.endDate}`
                ),
                
                registrationConfig.registrationMethod === 'external' ? 
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement(Text, null, '报名方式：外部链接报名'),
                        React.createElement('br'),
                        React.createElement('a', { 
                            href: registrationConfig.externalUrl, 
                            target: '_blank',
                            style: { fontSize: 16, marginTop: 10, display: 'inline-block' }
                        }, '点击进入报名页面 →')
                    ) :
                    React.createElement(Form, { layout: 'vertical' },
                        (registrationConfig.formFields || [])
                            .filter(field => field.enabled)
                            .map(field => 
                                React.createElement(Form.Item, {
                                    key: field.id,
                                    label: field.label + (field.required ? ' *' : ''),
                                    required: field.required
                                },
                                    field.type === 'input' ? React.createElement(Input, { placeholder: `请输入${field.label}` }) :
                                    field.type === 'textarea' ? React.createElement(TextArea, { placeholder: `请输入${field.label}`, rows: 3 }) :
                                    field.type === 'select' ? React.createElement(Select, { placeholder: `请选择${field.label}` }) :
                                    field.type === 'upload' ? React.createElement('div', null, '文件上传组件') :
                                    React.createElement(Input, { placeholder: `请输入${field.label}` })
                                )
                            ),
                        React.createElement('div', { style: { textAlign: 'center', marginTop: 20 } },
                            React.createElement(Button, { type: 'primary', size: 'large' }, '提交报名')
                        )
                    )
            )
        )
    );
};

// 导出组件
window.RegistrationManagement = RegistrationManagement; 