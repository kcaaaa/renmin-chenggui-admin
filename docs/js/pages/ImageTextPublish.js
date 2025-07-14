console.log('ImageTextPublish.js 加载中...');

// 图文发布页面组件 - 演示版本
const ImageTextPublish = () => {
    const { Card, Form, Input, Upload, Button, Select, message, Space } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('图文发布:', values);
        message.success('图文发布成功！');
        form.resetFields();
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('h2', { 
            key: 'title', 
            style: { marginBottom: '24px' } 
        }, '图文发布'),
        
        React.createElement(Card, { key: 'card' }, [
            React.createElement(Form, {
                key: 'form',
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit
            }, [
                React.createElement(Form.Item, {
                    key: 'title',
                    label: '标题',
                    name: 'title',
                    rules: [{ required: true, message: '请输入标题' }]
                }, React.createElement(Input, { placeholder: '请输入图文标题' })),
                
                React.createElement(Form.Item, {
                    key: 'images',
                    label: '图片上传',
                    name: 'images'
                }, React.createElement(Upload, {
                    listType: 'picture-card',
                    multiple: true,
                    maxCount: 9
                }, React.createElement(Button, {}, '选择图片'))),
                
                React.createElement(Form.Item, {
                    key: 'tags',
                    label: '标签',
                    name: 'tags',
                    rules: [{ required: true, message: '请选择标签' }]
                }, React.createElement(Select, {
                    mode: 'multiple',
                    placeholder: '选择标签'
                }, [
                    React.createElement(Option, { key: '1', value: '城轨技术' }, '城轨技术'),
                    React.createElement(Option, { key: '2', value: '运营管理' }, '运营管理'),
                    React.createElement(Option, { key: '3', value: '智慧城轨' }, '智慧城轨')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'content',
                    label: '内容详情',
                    name: 'content',
                    rules: [{ required: true, message: '请输入内容详情' }]
                }, React.createElement(TextArea, { 
                    rows: 6,
                    placeholder: '请输入图文内容详情'
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
                        key: 'publish',
                        type: 'primary',
                        htmlType: 'submit'
                    }, '立即发布')
                ]))
            ])
        ])
    ]);
};

// 导出组件
window.ImageTextPublish = ImageTextPublish;
console.log('ImageTextPublish 组件已成功加载');
