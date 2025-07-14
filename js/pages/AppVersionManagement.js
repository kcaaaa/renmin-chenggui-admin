// 应用版本管理组件
const AppVersionManagement = () => {
    const { Card, Table, Button, Tag, Space, Statistic, Row, Col, message, Modal, Form, Input, Select, Upload, DatePicker } = antd;
    const { Option } = Select;
    const { TextArea } = Input;
    
    const [loading, setLoading] = React.useState(false);
    const [versions, setVersions] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingVersion, setEditingVersion] = React.useState(null);
    const [form] = Form.useForm();
    
    // 模拟版本数据
    const mockVersions = [
        {
            id: 1,
            versionNumber: 'v2.1.0',
            versionName: '城轨管理系统2.1',
            status: 'released',
            platform: 'all',
            releaseDate: '2024-01-15',
            downloadCount: 12580,
            size: '45.6MB',
            minOsVersion: 'Android 8.0 / iOS 12.0',
            features: ['新增AI智能分析', '优化用户界面', '修复已知问题'],
            bugFixes: ['修复登录异常', '优化数据加载速度', '解决崩溃问题'],
            description: '本次更新新增AI智能分析功能，优化了用户体验',
            forceUpdate: false,
            updateRate: 78.5,
            createTime: '2024-01-10 10:00:00'
        },
        {
            id: 2,
            versionNumber: 'v2.0.5',
            versionName: '城轨管理系统2.0.5',
            status: 'deprecated',
            platform: 'android',
            releaseDate: '2024-01-01',
            downloadCount: 25600,
            size: '42.3MB',
            minOsVersion: 'Android 7.0',
            features: ['性能优化', '界面美化'],
            bugFixes: ['修复数据同步问题', '解决内存泄漏'],
            description: '性能优化版本，提升系统稳定性',
            forceUpdate: false,
            updateRate: 95.2,
            createTime: '2023-12-25 09:00:00'
        },
        {
            id: 3,
            versionNumber: 'v2.2.0-beta',
            versionName: '城轨管理系统2.2测试版',
            status: 'testing',
            platform: 'ios',
            releaseDate: '2024-02-01',
            downloadCount: 856,
            size: '48.9MB',
            minOsVersion: 'iOS 13.0',
            features: ['新增实时监控', '支持多语言', '增强安全性'],
            bugFixes: [],
            description: '测试版本，包含最新功能特性',
            forceUpdate: false,
            updateRate: 12.3,
            createTime: '2024-01-20 14:00:00'
        }
    ];
    
    React.useEffect(() => {
        loadVersions();
    }, []);
    
    const loadVersions = () => {
        setLoading(true);
        setTimeout(() => {
            setVersions(mockVersions);
            setLoading(false);
        }, 1000);
    };
    
    const getStatusTag = (status) => {
        const statusMap = {
            'released': { color: 'green', text: '已发布' },
            'testing': { color: 'blue', text: '测试中' },
            'deprecated': { color: 'default', text: '已废弃' },
            'draft': { color: 'orange', text: '草稿' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const getPlatformTag = (platform) => {
        const platformMap = {
            'android': { color: 'green', text: 'Android' },
            'ios': { color: 'blue', text: 'iOS' },
            'all': { color: 'purple', text: '全平台' }
        };
        const config = platformMap[platform] || { color: 'default', text: platform };
        return React.createElement(Tag, { color: config.color }, config.text);
    };
    
    const columns = [
        {
            title: '版本号',
            dataIndex: 'versionNumber',
            key: 'versionNumber',
            render: (version, record) => React.createElement('div', {}, [
                React.createElement('div', { key: 'version', style: { fontWeight: 'bold' } }, version),
                React.createElement('div', { key: 'name', style: { color: '#8c8c8c', fontSize: '12px' } }, record.versionName)
            ])
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: getStatusTag
        },
        {
            title: '平台',
            dataIndex: 'platform',
            key: 'platform',
            render: getPlatformTag
        },
        {
            title: '发布日期',
            dataIndex: 'releaseDate',
            key: 'releaseDate'
        },
        {
            title: '下载量',
            dataIndex: 'downloadCount',
            key: 'downloadCount',
            render: (count) => count.toLocaleString()
        },
        {
            title: '大小',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: '更新率',
            dataIndex: 'updateRate',
            key: 'updateRate',
            render: (rate) => React.createElement('div', {}, [
                React.createElement('div', { key: 'rate' }, `${rate}%`),
                React.createElement('div', { 
                    key: 'bar', 
                    style: { 
                        width: '60px', 
                        height: '4px', 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }
                }, React.createElement('div', {
                    style: {
                        width: `${rate}%`,
                        height: '100%',
                        backgroundColor: rate > 80 ? '#52c41a' : rate > 50 ? '#faad14' : '#f5222d'
                    }
                }))
            ])
        },
        {
            title: '强制更新',
            dataIndex: 'forceUpdate',
            key: 'forceUpdate',
            render: (force) => React.createElement(Tag, { 
                color: force ? 'red' : 'default' 
            }, force ? '是' : '否')
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => React.createElement(Space, { size: 'small' }, [
                React.createElement(Button, {
                    key: 'edit',
                    type: 'link',
                    size: 'small',
                    onClick: () => handleEdit(record)
                }, '编辑'),
                React.createElement(Button, {
                    key: 'view',
                    type: 'link',
                    size: 'small',
                    onClick: () => viewDetail(record)
                }, '查看'),
                React.createElement(Button, {
                    key: 'publish',
                    type: 'link',
                    size: 'small',
                    onClick: () => publishVersion(record),
                    disabled: record.status === 'released'
                }, '发布')
            ])
        }
    ];
    
    const handleAdd = () => {
        setEditingVersion(null);
        form.resetFields();
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setEditingVersion(record);
        form.setFieldsValue({
            ...record,
            features: record.features,
            bugFixes: record.bugFixes
        });
        setModalVisible(true);
    };
    
    const viewDetail = (record) => {
        Modal.info({
            title: `${record.versionNumber} - 详细信息`,
            width: 700,
            content: React.createElement('div', {}, [
                React.createElement('p', { key: 'name' }, React.createElement('strong', {}, '版本名称：'), record.versionName),
                React.createElement('p', { key: 'platform' }, React.createElement('strong', {}, '支持平台：'), record.platform),
                React.createElement('p', { key: 'size' }, React.createElement('strong', {}, '安装包大小：'), record.size),
                React.createElement('p', { key: 'minOs' }, React.createElement('strong', {}, '最低系统要求：'), record.minOsVersion),
                React.createElement('p', { key: 'download' }, React.createElement('strong', {}, '下载量：'), record.downloadCount.toLocaleString()),
                React.createElement('p', { key: 'update' }, React.createElement('strong', {}, '更新率：'), `${record.updateRate}%`),
                React.createElement('p', { key: 'description' }, React.createElement('strong', {}, '版本描述：'), record.description),
                React.createElement('p', { key: 'features' }, React.createElement('strong', {}, '新功能：'), record.features.join('、')),
                record.bugFixes.length > 0 && React.createElement('p', { key: 'bugFixes' }, React.createElement('strong', {}, '问题修复：'), record.bugFixes.join('、'))
            ])
        });
    };
    
    const publishVersion = (record) => {
        Modal.confirm({
            title: '发布版本',
            content: `确定要发布版本 ${record.versionNumber} 吗？`,
            onOk: () => {
                message.success('版本发布成功');
                loadVersions();
            }
        });
    };
    
    const handleSubmit = (values) => {
        console.log('保存版本:', values);
        message.success(editingVersion ? '编辑成功' : '新建成功');
        setModalVisible(false);
        form.resetFields();
        loadVersions();
    };
    
    const totalVersions = versions.length;
    const releasedVersions = versions.filter(v => v.status === 'released').length;
    const totalDownloads = versions.reduce((sum, v) => sum + v.downloadCount, 0);
    const avgUpdateRate = versions.length > 0 ? (versions.reduce((sum, v) => sum + v.updateRate, 0) / versions.length).toFixed(1) : 0;
    
    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: 24 }
        }, [
            React.createElement('h1', {
                key: 'title',
                style: { fontSize: '24px', fontWeight: '600', margin: 0 }
            }, '应用版本管理'),
            React.createElement('p', {
                key: 'desc',
                style: { color: '#8c8c8c', marginTop: 8 }
            }, '管理应用版本发布、更新和兼容性')
        ]),
        
        React.createElement(Row, {
            key: 'stats',
            gutter: 16,
            style: { marginBottom: 24 }
        }, [
            React.createElement(Col, { key: 'total', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总版本数',
                        value: totalVersions
                    })
                )
            ),
            React.createElement(Col, { key: 'released', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '已发布版本',
                        value: releasedVersions,
                        valueStyle: { color: '#52c41a' }
                    })
                )
            ),
            React.createElement(Col, { key: 'downloads', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '总下载量',
                        value: totalDownloads,
                        valueStyle: { color: '#1890ff' }
                    })
                )
            ),
            React.createElement(Col, { key: 'updateRate', span: 6 },
                React.createElement(Card, {},
                    React.createElement(Statistic, {
                        title: '平均更新率',
                        value: avgUpdateRate,
                        suffix: '%',
                        valueStyle: { color: '#722ed1' }
                    })
                )
            )
        ]),
        
        React.createElement(Card, {
            key: 'actions',
            style: { marginBottom: 16 }
        }, React.createElement(Space, {}, [
            React.createElement(Button, {
                key: 'add',
                type: 'primary',
                onClick: handleAdd
            }, '新建版本'),
            React.createElement(Button, {
                key: 'refresh',
                onClick: loadVersions
            }, '刷新'),
            React.createElement(Select, {
                key: 'status-filter',
                placeholder: '状态筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'released', value: 'released' }, '已发布'),
                React.createElement(Option, { key: 'testing', value: 'testing' }, '测试中'),
                React.createElement(Option, { key: 'deprecated', value: 'deprecated' }, '已废弃'),
                React.createElement(Option, { key: 'draft', value: 'draft' }, '草稿')
            ]),
            React.createElement(Select, {
                key: 'platform-filter',
                placeholder: '平台筛选',
                style: { width: 120 },
                allowClear: true
            }, [
                React.createElement(Option, { key: 'android', value: 'android' }, 'Android'),
                React.createElement(Option, { key: 'ios', value: 'ios' }, 'iOS'),
                React.createElement(Option, { key: 'all', value: 'all' }, '全平台')
            ])
        ])),
        
        React.createElement(Card, {
            key: 'table'
        }, React.createElement(Table, {
            columns: columns,
            dataSource: versions,
            rowKey: 'id',
            loading: loading,
            pagination: {
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`
            }
        })),
        
        React.createElement(Modal, {
            key: 'modal',
            title: editingVersion ? '编辑版本' : '新建版本',
            visible: modalVisible,
            onCancel: () => {
                setModalVisible(false);
                form.resetFields();
            },
            footer: null,
            width: 800
        }, React.createElement(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleSubmit
        }, [
            React.createElement(Row, { key: 'row1', gutter: 16 }, [
                React.createElement(Col, { key: 'versionNumber', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'versionNumber',
                        label: '版本号',
                        rules: [{ required: true, message: '请输入版本号' }]
                    }, React.createElement(Input, {
                        placeholder: '如：v2.1.0'
                    }))
                ),
                React.createElement(Col, { key: 'versionName', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'versionName',
                        label: '版本名称',
                        rules: [{ required: true, message: '请输入版本名称' }]
                    }, React.createElement(Input, {
                        placeholder: '请输入版本名称'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row2', gutter: 16 }, [
                React.createElement(Col, { key: 'platform', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'platform',
                        label: '支持平台',
                        rules: [{ required: true, message: '请选择支持平台' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择支持平台'
                    }, [
                        React.createElement(Option, { key: 'android', value: 'android' }, 'Android'),
                        React.createElement(Option, { key: 'ios', value: 'ios' }, 'iOS'),
                        React.createElement(Option, { key: 'all', value: 'all' }, '全平台')
                    ]))
                ),
                React.createElement(Col, { key: 'status', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'status',
                        label: '版本状态',
                        rules: [{ required: true, message: '请选择版本状态' }]
                    }, React.createElement(Select, {
                        placeholder: '请选择版本状态'
                    }, [
                        React.createElement(Option, { key: 'draft', value: 'draft' }, '草稿'),
                        React.createElement(Option, { key: 'testing', value: 'testing' }, '测试中'),
                        React.createElement(Option, { key: 'released', value: 'released' }, '已发布')
                    ]))
                ),
                React.createElement(Col, { key: 'size', span: 8 },
                    React.createElement(Form.Item, {
                        name: 'size',
                        label: '安装包大小',
                        rules: [{ required: true, message: '请输入安装包大小' }]
                    }, React.createElement(Input, {
                        placeholder: '如：45.6MB'
                    }))
                )
            ]),
            
            React.createElement(Row, { key: 'row3', gutter: 16 }, [
                React.createElement(Col, { key: 'releaseDate', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'releaseDate',
                        label: '发布日期',
                        rules: [{ required: true, message: '请选择发布日期' }]
                    }, React.createElement(DatePicker, {
                        style: { width: '100%' },
                        placeholder: '请选择发布日期'
                    }))
                ),
                React.createElement(Col, { key: 'minOsVersion', span: 12 },
                    React.createElement(Form.Item, {
                        name: 'minOsVersion',
                        label: '最低系统要求',
                        rules: [{ required: true, message: '请输入最低系统要求' }]
                    }, React.createElement(Input, {
                        placeholder: '如：Android 8.0 / iOS 12.0'
                    }))
                )
            ]),
            
            React.createElement(Form.Item, {
                key: 'features',
                name: 'features',
                label: '新功能特性'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入新功能特性，按回车添加'
            })),
            
            React.createElement(Form.Item, {
                key: 'bugFixes',
                name: 'bugFixes',
                label: '问题修复'
            }, React.createElement(Select, {
                mode: 'tags',
                placeholder: '请输入问题修复内容，按回车添加'
            })),
            
            React.createElement(Form.Item, {
                key: 'description',
                name: 'description',
                label: '版本描述',
                rules: [{ required: true, message: '请输入版本描述' }]
            }, React.createElement(TextArea, {
                rows: 4,
                placeholder: '请输入版本描述'
            })),
            
            React.createElement(Form.Item, {
                key: 'submit',
                style: { marginBottom: 0, marginTop: 24 }
            }, React.createElement(Space, {
                style: { width: '100%', justifyContent: 'flex-end' }
            }, [
                React.createElement(Button, {
                    key: 'cancel',
                    onClick: () => setModalVisible(false)
                }, '取消'),
                React.createElement(Button, {
                    key: 'confirm',
                    type: 'primary',
                    htmlType: 'submit'
                }, '确定')
            ]))
        ]))
    ]);
};

window.AppVersionManagement = AppVersionManagement; 