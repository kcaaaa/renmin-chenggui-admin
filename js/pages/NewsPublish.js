console.log('NewsPublish.js 加载中...');

// 资讯发布页面组件 - 演示版本
const NewsPublish = () => {
    const { Card, Form, Input, Upload, Button, Select, message, Space, Switch } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [form] = Form.useForm();
    const [isUrgent, setIsUrgent] = React.useState(false);

    const handleSubmit = (values) => {
        console.log('资讯发布:', values);
        message.success('资讯发布成功！内容将发布到协会板块');
        form.resetFields();
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: '24px' }
        }, [
            React.createElement('h2', { 
                key: 'title',
                style: { margin: 0 }
            }, '资讯发布'),
            React.createElement('p', {
                key: 'desc',
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '协会官方资讯发布，内容将自动归类到协会板块')
        ]),
        
        React.createElement(Card, { key: 'card' }, [
            React.createElement(Form, {
                key: 'form',
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit
            }, [
                React.createElement(Form.Item, {
                    key: 'title',
                    label: '资讯标题',
                    name: 'title',
                    rules: [{ required: true, message: '请输入资讯标题' }]
                }, React.createElement(Input, { 
                    placeholder: '请输入资讯标题（限50字以内）',
                    maxLength: 50,
                    showCount: true
                })),
                
                React.createElement(Form.Item, {
                    key: 'images',
                    label: '资讯图片',
                    name: 'images'
                }, React.createElement('div', {}, [
                    React.createElement(Upload, {
                        key: 'upload',
                        listType: 'picture-card',
                        multiple: true,
                        maxCount: 9
                    }, React.createElement(Button, {}, '选择图片')),
                    React.createElement('div', {
                        key: 'tip',
                        style: { marginTop: '8px', color: '#666', fontSize: '12px' }
                    }, '第一张图片将作为封面，可拖拽调整顺序')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'tags',
                    label: '资讯分类',
                    name: 'tags',
                    rules: [{ required: true, message: '请选择资讯分类' }]
                }, React.createElement(Select, {
                    mode: 'multiple',
                    placeholder: '选择资讯分类',
                    maxTagCount: 5
                }, [
                    React.createElement(Option, { key: '1', value: '政策解读' }, '政策解读'),
                    React.createElement(Option, { key: '2', value: '行业动态' }, '行业动态'),
                    React.createElement(Option, { key: '3', value: '技术创新' }, '技术创新'),
                    React.createElement(Option, { key: '4', value: '展会通知' }, '展会通知'),
                    React.createElement(Option, { key: '5', value: '重要公告' }, '重要公告')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'urgent',
                    label: '紧急资讯',
                    name: 'urgent'
                }, React.createElement('div', {}, [
                    React.createElement(Switch, {
                        key: 'switch',
                        checked: isUrgent,
                        onChange: setIsUrgent
                    }),
                    React.createElement('span', {
                        key: 'label',
                        style: { marginLeft: '8px', color: '#666' }
                    }, '标记为紧急资讯将优先展示')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'content',
                    label: '资讯内容',
                    name: 'content',
                    rules: [{ required: true, message: '请输入资讯内容' }]
                }, React.createElement(TextArea, { 
                    rows: 10,
                    placeholder: '请输入资讯详细内容，支持富文本编辑',
                    showCount: true
                })),
                
                React.createElement(Form.Item, {
                    key: 'source',
                    label: '信息来源',
                    name: 'source'
                }, React.createElement(Input, { 
                    placeholder: '请输入信息来源（可选）'
                })),
                
                React.createElement(Form.Item, {
                    key: 'submit',
                    style: { textAlign: 'center', marginTop: '32px' }
                }, React.createElement(Space, {}, [
                    React.createElement(Button, { key: 'cancel' }, '取消'),
                    React.createElement(Button, { 
                        key: 'save',
                        type: 'default'
                    }, '保存草稿'),
                    React.createElement(Button, { 
                        key: 'preview',
                        type: 'default'
                    }, '预览'),
                    React.createElement(Button, { 
                        key: 'publish',
                        type: 'primary',
                        htmlType: 'submit'
                    }, '发布资讯')
                ]))
            ])
        ])
    ]);
};

// 导出组件
window.NewsPublish = NewsPublish;
console.log('NewsPublish 组件已成功加载');
