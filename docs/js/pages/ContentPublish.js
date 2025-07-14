// 内容发布组件 - 简化测试版本
console.log('📄 ContentPublish.js 文件开始加载...');

const ContentPublish = () => {
    console.log('🎨 ContentPublish 组件正在渲染...');
    
    const { Card, Button, Form, Input, Select, Radio, Switch, message, Space, Divider } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [form] = Form.useForm();
    const [contentType, setContentType] = React.useState('text');
    const [loading, setLoading] = React.useState(false);
    
    // 处理表单提交
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('内容发布成功！这是一个演示版本');
            form.resetFields();
        } catch (error) {
            message.error('发布失败，请重试');
        } finally {
            setLoading(false);
        }
    };
    
    return React.createElement('div', {
        style: { padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }
    }, 
        React.createElement(Card, {
            title: React.createElement('div', {
                style: { display: 'flex', alignItems: 'center' }
            }, [
                React.createElement('span', {
                    key: 'title',
                    style: { fontSize: '18px', fontWeight: 'bold' }
                }, '📝 内容发布'),
                React.createElement(Divider, { key: 'divider', type: 'vertical' }),
                React.createElement('span', {
                    key: 'desc',
                    style: { fontSize: '14px', color: '#666' }
                }, '发布优质内容，与用户分享知识与见解')
            ]),
            style: { maxWidth: 800, margin: '0 auto' }
        }, 
            React.createElement(Form, {
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit
            }, [
                // 内容类型选择
                React.createElement(Form.Item, {
                    key: 'contentType',
                    label: React.createElement('span', {
                        style: { fontSize: '16px', fontWeight: 'bold' }
                    }, '📋 内容类型'),
                    name: 'contentType'
                },
                    React.createElement(Radio.Group, {
                        value: contentType,
                        onChange: (e) => setContentType(e.target.value)
                    }, [
                        React.createElement(Radio.Button, {
                            key: 'text',
                            value: 'text',
                            style: { width: '33.33%', textAlign: 'center' }
                        }, [
                            React.createElement('div', { key: 'icon' }, '📷 图文'),
                            React.createElement('div', {
                                key: 'desc',
                                style: { fontSize: '12px', color: '#666' }
                            }, '支持多图+文字')
                        ]),
                        React.createElement(Radio.Button, {
                            key: 'video',
                            value: 'video',
                            style: { width: '33.33%', textAlign: 'center' }
                        }, [
                            React.createElement('div', { key: 'icon' }, '🎬 视频'),
                            React.createElement('div', {
                                key: 'desc',
                                style: { fontSize: '12px', color: '#666' }
                            }, '上传视频文件')
                        ]),
                        React.createElement(Radio.Button, {
                            key: 'news',
                            value: 'news',
                            style: { width: '33.33%', textAlign: 'center' }
                        }, [
                            React.createElement('div', { key: 'icon' }, '📰 资讯'),
                            React.createElement('div', {
                                key: 'desc',
                                style: { fontSize: '12px', color: '#666' }
                            }, '协会专用')
                        ])
                    ])
                ),
                
                // 标题
                React.createElement(Form.Item, {
                    key: 'title',
                    label: React.createElement('span', {
                        style: { fontSize: '16px', fontWeight: 'bold' }
                    }, '📝 标题'),
                    name: 'title',
                    rules: [{ required: true, message: '请输入标题' }]
                },
                    React.createElement(Input, {
                        placeholder: '请输入标题',
                        showCount: true,
                        maxLength: 30
                    })
                ),
                
                // 内容详情
                React.createElement(Form.Item, {
                    key: 'content',
                    label: React.createElement('span', {
                        style: { fontSize: '16px', fontWeight: 'bold' }
                    }, '📄 内容详情'),
                    name: 'content',
                    rules: [{ required: true, message: '请输入内容详情' }]
                },
                    React.createElement(TextArea, {
                        placeholder: '请详细描述您的内容...',
                        rows: 6,
                        showCount: true,
                        maxLength: 1000
                    })
                ),
                
                // 提交按钮
                React.createElement(Form.Item, {
                    key: 'submit',
                    style: { textAlign: 'center', marginTop: 32 }
                },
                    React.createElement(Space, { size: 'large' }, [
                        React.createElement(Button, {
                            key: 'reset',
                            size: 'large',
                            onClick: () => form.resetFields()
                        }, '🔄 重置表单'),
                        React.createElement(Button, {
                            key: 'submit',
                            type: 'primary',
                            htmlType: 'submit',
                            size: 'large',
                            loading: loading,
                            style: { minWidth: 120 }
                        }, loading ? '发布中...' : '📤 立即发布')
                    ])
                )
            ])
        )
    );
};

// 将组件挂载到全局
console.log('🔧 ContentPublish 组件开始挂载...');
window.ContentPublish = ContentPublish;
console.log('✅ ContentPublish 组件已挂载到 window.ContentPublish');
console.log('🔍 验证挂载结果:', typeof window.ContentPublish);
console.log('📄 ContentPublish.js 文件加载完成！'); 