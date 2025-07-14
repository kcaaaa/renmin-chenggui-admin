// 内容发布组件 - 若依风格
console.log(' ContentPublish.js 文件开始加载...');

const ContentPublish = () => {
    console.log(' ContentPublish 组件正在渲染...');
    
    const { Card, Button, Form, Input, Select, Radio, message, Space, Divider, Row, Col, Alert } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    
    // 发布设置状态
    const [publishMode, setPublishMode] = React.useState('private'); // 'official' | 'private'
    const [contentType, setContentType] = React.useState('text'); // 'text' | 'video' | 'news'
    const [useRichEditor, setUseRichEditor] = React.useState(false);
    
    // 获取当前用户信息
    const user = window.AuthUtils?.getCurrentUser();
    const isAssociationUser = user?.role === 'admin' || user?.role === 'operator'; // 协会用户
    
    // 内容类型选项（移除图片内容）
    const getContentTypeOptions = () => {
        const baseOptions = [
            { value: 'text', label: '图文内容', description: '发布包含文字和图片的混合内容' },
            { value: 'video', label: '视频内容', description: '发布视频内容，支持封面设置' }
        ];
        
        // 协会用户因公发布时显示资讯类型
        if (isAssociationUser && publishMode === 'official') {
            baseOptions.push({
                value: 'news', 
                label: '资讯公告', 
                description: '发布官方资讯、公告和通知（仅协会）'
            });
        }
        
        return baseOptions;
    };
    
    // 资讯类型选项（仅因公发布时显示）
    const newsTypeOptions = [
        { value: 'announcement', label: '重要公告' },
        { value: 'industry', label: '行业资讯' },
        { value: 'technology', label: '技术动态' },
        { value: 'policy', label: '政策解读' },
        { value: 'event', label: '活动通知' }
    ];
    
    // 发布模式变更处理
    const handlePublishModeChange = (mode) => {
        setPublishMode(mode);
        
        // 如果切换到因公发布，自动启用富文本编辑器
        if (mode === 'official') {
            setUseRichEditor(true);
        } else {
            setUseRichEditor(false);
            // 如果当前是资讯类型，切换到文本
            if (contentType === 'news') {
                setContentType('text');
            }
        }
        
        // 清空相关表单字段
        form.setFieldsValue({
            newsType: undefined
        });
    };
    
    // 内容类型变更处理
    const handleContentTypeChange = (type) => {
        setContentType(type);
        
        // 资讯类型需要富文本编辑器
        if (type === 'news') {
            setUseRichEditor(true);
        } else if (publishMode === 'private') {
            setUseRichEditor(false);
        }
        
        // 清空相关表单字段
        form.setFieldsValue({
            content: '',
            videoUrl: '',
            newsType: type === 'news' ? 'announcement' : undefined
        });
    };
    
    // 处理表单提交
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // 构建提交数据
            const submitData = {
                ...values,
                publishMode,
                contentType,
                useRichEditor,
                publishTime: new Date().toISOString(),
                author: user?.name || user?.username
            };
            
            console.log('提交数据:', submitData);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const publishTypeText = publishMode === 'official' ? '因公发布' : '因私发布';
            const contentTypeText = getContentTypeOptions().find(opt => opt.value === contentType)?.label || '';
            
            message.success(`${publishTypeText} - ${contentTypeText} 发布成功！`);
            form.resetFields();
        } catch (error) {
            message.error('发布失败，请重试');
        } finally {
            setLoading(false);
        }
    };
    
    // 渲染富文本编辑器占位符
    const renderRichEditor = () => {
        return React.createElement('div', {
            style: {
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                minHeight: '200px',
                padding: '12px',
                backgroundColor: '#fafafa'
            }
        }, [
            React.createElement('div', {
                key: 'toolbar',
                style: {
                    borderBottom: '1px solid #e8e8e8',
                    paddingBottom: '8px',
                    marginBottom: '12px',
                    color: '#666',
                    fontSize: '12px'
                }
            }, '富文本编辑器工具栏 (粗体 | 斜体 | 插入链接 | 插入图片)'),
            React.createElement(TextArea, {
                key: 'editor',
                placeholder: '请输入内容...(富文本模式)',
                rows: 8,
                style: { border: 'none', resize: 'none', backgroundColor: 'transparent' }
            })
        ]);
    };
    
    // 渲染内容输入区域
    const renderContentInput = () => {
        if (contentType === 'video') {
            return [
                React.createElement(Form.Item, {
                    key: 'videoUrl',
                    name: 'videoUrl',
                    label: '视频链接',
                    rules: [{ required: true, message: '请输入视频链接' }]
                }, React.createElement(Input, {
                    placeholder: '请输入视频文件链接或上传视频'
                })),
                React.createElement(Form.Item, {
                    key: 'coverImage',
                    name: 'coverImage',
                    label: '视频封面'
                }, React.createElement('div', {
                    style: {
                        border: '1px dashed #d9d9d9',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#fafafa',
                        color: '#666'
                    }
                }, '点击上传封面图片')),
                React.createElement(Form.Item, {
                    key: 'description',
                    name: 'description',
                    label: '视频描述',
                    rules: [{ required: true, message: '请输入视频描述' }]
                }, React.createElement(TextArea, {
                    rows: 4,
                    placeholder: '请输入视频描述...'
                }))
            ];
        }
        
        // 文本内容或资讯内容
        const contentLabel = contentType === 'news' ? '资讯内容' : '内容详情';
        const contentPlaceholder = contentType === 'news' ? 
            '请输入资讯内容，支持富文本格式...' : 
            '请输入内容详情...';
            
        return React.createElement(Form.Item, {
            name: 'content',
            label: contentLabel,
            rules: [{ required: true, message: `请输入${contentLabel}` }]
        }, useRichEditor ? 
            renderRichEditor() : 
            React.createElement(TextArea, {
                rows: 8,
                placeholder: contentPlaceholder
            })
        );
    };
    
    return React.createElement('div', {
        style: { padding: '20px' }
    }, [
        // 页面标题
        React.createElement('div', {
            key: 'header',
            style: {
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid #e8e8e8'
            }
        }, [
            React.createElement('h3', {
                key: 'title',
                style: {
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#262626'
                }
            }, '内容发布'),
            React.createElement('div', {
                key: 'breadcrumb',
                style: {
                    fontSize: '12px',
                    color: '#8c8c8c',
                    marginTop: '4px'
                }
            }, '内容管理 / 内容发布')
        ]),
        
        React.createElement(Card, {
            key: 'main-card',
            bordered: false,
            style: { 
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                borderRadius: '4px'
            }
        }, [
            // 协会用户发布模式选择
            isAssociationUser && React.createElement('div', {
                key: 'publishMode',
                style: { marginBottom: '24px' }
            }, [
                React.createElement('div', {
                    key: 'label',
                    style: {
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#262626'
                    }
                }, '发布模式'),
                React.createElement(Radio.Group, {
                    key: 'radio-group',
                    value: publishMode,
                    onChange: (e) => handlePublishModeChange(e.target.value)
                }, [
                    React.createElement(Radio, {
                        key: 'official',
                        value: 'official'
                    }, '因公发布'),
                    React.createElement(Radio, {
                        key: 'private',
                        value: 'private'
                    }, '因私发布')
                ])
            ]),
            
            // 发布模式说明
            isAssociationUser && React.createElement(Alert, {
                key: 'modeInfo',
                message: publishMode === 'official' ? 
                    '因公发布：以协会官方身份发布内容，支持资讯类型和富文本编辑' :
                    '因私发布：以个人身份发布内容，与普通用户权限相同',
                type: 'info',
                showIcon: true,
                style: { marginBottom: '24px' }
            }),
            
            React.createElement(Form, {
                key: 'publishForm',
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit,
                initialValues: {
                    contentType: 'text',
                    newsType: 'announcement',
                    visibility: 'public'
                }
            }, [
                // 内容类型选择
                React.createElement(Form.Item, {
                    key: 'contentType',
                    label: '内容类型'
                }, React.createElement(Radio.Group, {
                    value: contentType,
                    onChange: (e) => handleContentTypeChange(e.target.value)
                }, getContentTypeOptions().map(option => 
                    React.createElement(Radio.Button, {
                        key: option.value,
                        value: option.value
                    }, option.label)
                ))),
                
                // 资讯类型选择（仅因公发布的资讯内容显示）
                contentType === 'news' && publishMode === 'official' && React.createElement(Form.Item, {
                    key: 'newsType',
                    name: 'newsType',
                    label: '资讯类型',
                    rules: [{ required: true, message: '请选择资讯类型' }]
                }, React.createElement(Select, {
                    placeholder: '请选择资讯类型'
                }, newsTypeOptions.map(option =>
                    React.createElement(Option, {
                        key: option.value,
                        value: option.value
                    }, option.label)
                ))),
                
                // 标题
                React.createElement(Form.Item, {
                    key: 'title',
                    name: 'title',
                    label: '标题',
                    rules: [{ required: true, message: '请输入标题' }]
                }, React.createElement(Input, {
                    placeholder: '请输入内容标题...'
                })),
                
                // 内容输入区域
                renderContentInput(),
                
                // 标签
                React.createElement(Form.Item, {
                    key: 'tags',
                    name: 'tags',
                    label: '标签'
                }, React.createElement(Select, {
                    mode: 'tags',
                    placeholder: '请输入或选择标签',
                    options: [
                        { value: '城轨', label: '城轨' },
                        { value: '技术', label: '技术' },
                        { value: '展会', label: '展会' },
                        { value: '行业', label: '行业' },
                        { value: '创新', label: '创新' }
                    ]
                })),
                
                // 可见性设置
                React.createElement(Form.Item, {
                    key: 'visibility',
                    name: 'visibility',
                    label: '可见性'
                }, React.createElement(Radio.Group, null, [
                    React.createElement(Radio, { key: 'public', value: 'public' }, '公开'),
                    React.createElement(Radio, { key: 'members', value: 'members' }, '仅会员'),
                    React.createElement(Radio, { key: 'private', value: 'private' }, '私密')
                ])),
                
                // 提交按钮
                React.createElement(Form.Item, {
                    key: 'submit',
                    style: { marginTop: '24px' }
                }, React.createElement(Space, null, [
                    React.createElement(Button, {
                        key: 'submit-btn',
                        type: 'primary',
                        htmlType: 'submit',
                        loading: loading
                    }, '立即发布'),
                    React.createElement(Button, {
                        key: 'draft-btn'
                    }, '保存草稿'),
                    React.createElement(Button, {
                        key: 'reset-btn',
                        onClick: () => form.resetFields()
                    }, '重置')
                ]))
            ])
        ])
    ]);
};

// 确保ContentPublish在全局可用
window.ContentPublish = ContentPublish;

console.log(' ContentPublish组件已加载完成');
