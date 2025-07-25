// 内容发布组件 - v3升级版
console.log(' ContentPublish.js 文件开始加载...');

const ContentPublish = () => {
    console.log(' ContentPublish 组件正在渲染...');
    
    const { Card, Button, Form, Input, Select, Radio, message, Space, Divider, Row, Col, Alert, Upload } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    
    // 发布设置状态
    const [publishMode, setPublishMode] = React.useState('private'); // 'official' | 'private'
    const [contentType, setContentType] = React.useState('image'); // 'image' | 'video' | 'news'
    const [publishBoard, setPublishBoard] = React.useState(''); // v3新增：发布板块选择
    const [useRichEditor, setUseRichEditor] = React.useState(false);
    
    // 获取当前用户信息
    const user = window.AuthUtils?.getCurrentUser();
    const isAssociationUser = user?.role === 'admin' || user?.role === 'operator'; // 协会用户
    
    // v3更新：内容类型选项
    const getContentTypeOptions = () => {
        const baseOptions = [
            { value: 'image', label: '图文', description: '发布包含文字和图片的图文内容' },
            { value: 'video', label: '视频', description: '发布视频内容，支持封面设置' }
        ];
        
        // v3新增：协会用户因公发布时显示资讯类型
        if (isAssociationUser && publishMode === 'official') {
            baseOptions.push({
                value: 'news', 
                label: '资讯', 
                description: '发布官方资讯、公告和通知（仅协会因公发布）'
            });
        }
        
        return baseOptions;
    };
    
    // v3新增：发布板块选项（仅协会因公发布时显示）
    const getPublishBoardOptions = () => {
        if (!isAssociationUser || publishMode !== 'official') {
            return [];
        }
        
        return [
            { value: 'news', label: '资讯', description: '发布到协会资讯板块，展示官方资讯内容' },
            { value: 'special', label: '专题', description: '发布到协会专题板块，展示专题活动内容' }
        ];
    };
    
    // v3新增：背景音乐选项
    const backgroundMusicOptions = [
        { value: 'none', label: '无背景音乐' },
        { value: 'gentle', label: '轻柔音乐' },
        { value: 'upbeat', label: '活泼音乐' },
        { value: 'professional', label: '商务音乐' },
        { value: 'traditional', label: '传统音乐' }
    ];
    
    // 发布模式变更处理
    const handlePublishModeChange = (mode) => {
        setPublishMode(mode);
        
        // 如果切换到因公发布，自动启用富文本编辑器，并设置默认板块
        if (mode === 'official') {
            setUseRichEditor(true);
            setPublishBoard('news'); // 默认选择资讯板块
        } else {
            setUseRichEditor(false);
            setPublishBoard(''); // 清空板块选择
            // 如果当前是资讯类型，切换到图文
            if (contentType === 'news') {
                setContentType('image');
            }
        }
        
        // 清空相关表单字段
        form.setFieldsValue({
            publishBoard: mode === 'official' ? 'news' : undefined,
            backgroundMusic: undefined
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
            coverImage: undefined
        });
    };
    
    // v3新增：发布板块变更处理
    const handlePublishBoardChange = (board) => {
        setPublishBoard(board);
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
                publishBoard, // v3新增
                useRichEditor,
                publishTime: new Date().toISOString(),
                author: user?.name || user?.username
            };
            
            console.log('提交数据:', submitData);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const publishTypeText = publishMode === 'official' ? '因公发布' : '因私发布';
            const contentTypeText = getContentTypeOptions().find(opt => opt.value === contentType)?.label || '';
            const boardText = publishBoard ? ` - ${getPublishBoardOptions().find(opt => opt.value === publishBoard)?.label}板块` : '';
            
            message.success(`${publishTypeText} - ${contentTypeText}${boardText} 发布成功！`);
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
            }, '富文本编辑器工具栏 (粗体 | 斜体 | 插入链接 | 插入图片 | 插入视频 | 插入表格)'),
            React.createElement(TextArea, {
                key: 'editor',
                placeholder: contentType === 'news' ? 
                    '请输入资讯内容，支持多级标题、图文混排...(富文本模式)' :
                    '请输入内容...(富文本模式)',
                rows: 10,
                style: { border: 'none', resize: 'none', backgroundColor: 'transparent' }
            })
        ]);
    };
    
    // v3更新：渲染内容输入区域
    const renderContentInput = () => {
        if (contentType === 'video') {
            return [
                React.createElement(Form.Item, {
                    key: 'videoUpload',
                    name: 'videoUpload',
                    label: '视频上传',
                    rules: [{ required: true, message: '请上传视频文件' }]
                }, React.createElement('div', {
                    style: {
                        border: '1px dashed #d9d9d9',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#fafafa',
                        color: '#666'
                    }
                }, [
                    React.createElement('div', { key: 'icon', style: { fontSize: '24px', marginBottom: '8px' } }, '🎬'),
                    React.createElement('div', { key: 'text' }, '点击上传视频文件（最大300MB）'),
                    React.createElement('div', { 
                        key: 'hint', 
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' } 
                    }, '支持MP4、AVI、MOV格式')
                ])),
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
                }, [
                    React.createElement('div', { key: 'icon', style: { fontSize: '18px', marginBottom: '8px' } }, '🖼️'),
                    React.createElement('div', { key: 'text' }, '上传封面图片或系统自动截取视频首帧'),
                    React.createElement('div', { 
                        key: 'hint', 
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' } 
                    }, '推荐尺寸：16:9，支持JPG、PNG格式')
                ])),
                React.createElement(Form.Item, {
                    key: 'description',
                    name: 'description',
                    label: '内容详情',
                    rules: [{ required: true, message: '请输入内容详情' }]
                }, React.createElement(TextArea, {
                    rows: 4,
                    placeholder: '请输入作品的具体内容描述...',
                    showCount: true,
                    maxLength: 500
                }))
            ];
        }
        
        // 图文内容 - v3更新
        if (contentType === 'image') {
            return [
                React.createElement(Form.Item, {
                    key: 'imageUpload',
                    name: 'imageUpload',
                    label: '图片上传',
                    rules: [{ required: true, message: '请上传图片' }]
                }, React.createElement('div', {
                    style: {
                        border: '1px dashed #d9d9d9',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#fafafa',
                        color: '#666'
                    }
                }, [
                    React.createElement('div', { key: 'icon', style: { fontSize: '24px', marginBottom: '8px' } }, '🖼️'),
                    React.createElement('div', { key: 'text' }, '点击上传图片（最多9张）'),
                    React.createElement('div', { 
                        key: 'hint', 
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' } 
                    }, '第一张图片作为封面，支持拖拽排序。支持JPG、PNG格式')
                ])),
                React.createElement(Form.Item, {
                    key: 'content',
                    name: 'content',
                    label: '内容详情',
                    rules: [{ required: true, message: '请输入内容详情' }]
                }, useRichEditor ? 
                    renderRichEditor() : 
                    React.createElement(TextArea, {
                        rows: 8,
                        placeholder: '请输入图文内容详情...',
                        showCount: true,
                        maxLength: 2000
                    })
                )
            ];
        }
        
        // 资讯内容 - v3新增
        if (contentType === 'news') {
            return [
                React.createElement(Form.Item, {
                    key: 'coverImage',
                    name: 'coverImage',
                    label: '封面图片',
                    rules: [{ required: true, message: '请上传封面图片' }]
                }, React.createElement('div', {
                    style: {
                        border: '1px dashed #d9d9d9',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#fafafa',
                        color: '#666'
                    }
                }, [
                    React.createElement('div', { key: 'icon', style: { fontSize: '18px', marginBottom: '8px' } }, '🖼️'),
                    React.createElement('div', { key: 'text' }, '上传资讯封面图片（仅可选择一张）'),
                    React.createElement('div', { 
                        key: 'hint', 
                        style: { fontSize: '12px', color: '#999', marginTop: '4px' } 
                    }, '推荐尺寸：16:9，支持JPG、PNG格式')
                ])),
                React.createElement(Form.Item, {
                    key: 'content',
                    name: 'content',
                    label: '内容详情',
                    rules: [{ required: true, message: '请输入资讯内容' }]
                }, renderRichEditor())
            ];
        }
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
                    '因公发布：以协会官方身份发布内容，可选择发布到资讯、专题板块，支持资讯类型和富文本编辑，需AI+人工双重审核' :
                    '因私发布：以个人身份发布内容，发布到个人主页和推荐板块，仅需AI审核',
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
                    contentType: 'image',
                    publishBoard: 'news',
                    backgroundMusic: 'none',
                    visibility: 'public'
                }
            }, [
                // v3新增：发布板块选择（仅协会因公发布时显示）
                isAssociationUser && publishMode === 'official' && React.createElement(Form.Item, {
                    key: 'publishBoard',
                    name: 'publishBoard',
                    label: '发布板块',
                    rules: [{ required: true, message: '请选择发布板块' }]
                }, React.createElement(Radio.Group, {
                    value: publishBoard,
                    onChange: (e) => handlePublishBoardChange(e.target.value)
                }, getPublishBoardOptions().map(option => 
                    React.createElement(Radio, {
                        key: option.value,
                        value: option.value,
                        style: { display: 'block', marginBottom: '8px' }
                    }, [
                        React.createElement('span', { key: 'label', style: { fontWeight: '500' } }, option.label),
                        React.createElement('div', { 
                            key: 'desc', 
                            style: { fontSize: '12px', color: '#666', marginTop: '4px' } 
                        }, option.description)
                    ])
                ))),
                
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
                
                // 标题
                React.createElement(Form.Item, {
                    key: 'title',
                    name: 'title',
                    label: '标题',
                    rules: [
                        { required: true, message: '请输入标题' },
                        { max: contentType === 'news' ? 50 : 30, message: `标题不能超过${contentType === 'news' ? 50 : 30}个字符` }
                    ]
                }, React.createElement(Input, {
                    placeholder: contentType === 'news' ? '请输入资讯标题（50字以内）...' : '请输入内容标题（30字以内）...',
                    showCount: true,
                    maxLength: contentType === 'news' ? 50 : 30
                })),
                
                // 内容输入区域
                renderContentInput(),
                
                // 标签选择
                React.createElement(Form.Item, {
                    key: 'tags',
                    name: 'tags',
                    label: '标签',
                    rules: [{ required: true, message: '请选择标签' }]
                }, React.createElement(Select, {
                    mode: 'multiple',
                    placeholder: '请选择标签（最多5个）',
                    maxTagCount: 5,
                    options: [
                        { value: '城轨建设', label: '城轨建设' },
                        { value: '技术创新', label: '技术创新' },
                        { value: '运营管理', label: '运营管理' },
                        { value: '展会活动', label: '展会活动' },
                        { value: '行业动态', label: '行业动态' },
                        { value: '政策解读', label: '政策解读' },
                        { value: '安全管理', label: '安全管理' },
                        { value: '智能化', label: '智能化' }
                    ]
                })),
                
                // v3新增：背景音乐选择
                React.createElement(Form.Item, {
                    key: 'backgroundMusic',
                    name: 'backgroundMusic',
                    label: '背景音乐'
                }, React.createElement(Select, {
                    placeholder: '请选择背景音乐（可选）',
                    allowClear: true
                }, backgroundMusicOptions.map(option =>
                    React.createElement(Option, {
                        key: option.value,
                        value: option.value
                    }, option.label)
                ))),
                
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
                        key: 'preview-btn'
                    }, '预览'),
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
