console.log('VideoPublish.js 加载中...');

// 视频发布页面组件 - 演示版本
const VideoPublish = () => {
    const { Card, Form, Input, Upload, Button, Select, message, Space, Progress } = antd;
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [form] = Form.useForm();
    const [uploading, setUploading] = React.useState(false);

    const handleSubmit = (values) => {
        console.log('视频发布:', values);
        message.success('视频发布成功！');
        form.resetFields();
    };

    const handleVideoUpload = () => {
        setUploading(true);
        // 模拟上传进度
        setTimeout(() => {
            setUploading(false);
            message.success('视频上传成功！');
        }, 2000);
    };

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('h2', { 
            key: 'title', 
            style: { marginBottom: '24px' } 
        }, '视频发布'),
        
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
                }, React.createElement(Input, { placeholder: '请输入视频标题' })),
                
                React.createElement(Form.Item, {
                    key: 'video',
                    label: '视频上传',
                    name: 'video'
                }, React.createElement('div', {}, [
                    React.createElement(Upload, {
                        key: 'upload',
                        accept: 'video/*',
                        showUploadList: false,
                        beforeUpload: () => {
                            handleVideoUpload();
                            return false;
                        }
                    }, React.createElement(Button, {
                        loading: uploading
                    }, uploading ? '上传中...' : '选择视频文件')),
                    uploading ? React.createElement(Progress, {
                        key: 'progress',
                        percent: 65,
                        style: { marginTop: '16px' }
                    }) : null,
                    React.createElement('div', {
                        key: 'tip',
                        style: { marginTop: '8px', color: '#666', fontSize: '12px' }
                    }, '支持MP4格式，文件大小不超过500MB')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'cover',
                    label: '视频封面',
                    name: 'cover'
                }, React.createElement(Upload, {
                    listType: 'picture-card',
                    maxCount: 1
                }, React.createElement(Button, {}, '选择封面'))),
                
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
                    React.createElement(Option, { key: '3', value: '智慧城轨' }, '智慧城轨'),
                    React.createElement(Option, { key: '4', value: '设备展示' }, '设备展示')
                ])),
                
                React.createElement(Form.Item, {
                    key: 'content',
                    label: '内容描述',
                    name: 'content',
                    rules: [{ required: true, message: '请输入内容描述' }]
                }, React.createElement(TextArea, { 
                    rows: 4,
                    placeholder: '请输入视频内容描述'
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
window.VideoPublish = VideoPublish;
console.log('VideoPublish 组件已成功加载');
