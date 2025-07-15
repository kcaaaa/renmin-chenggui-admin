// ExhibitorBasicInfo.js - 展商基础信息管理
// 展商可在此编辑和管理其公司的基本资料和宣传材料

function ExhibitorBasicInfo() {
    const { useState, useEffect } = React;
    const { Card, Form, Input, Button, Upload, message, Space, Divider } = antd;
    const { TextArea } = Input;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [logoFileList, setLogoFileList] = useState([]);
    const [imageFileList, setImageFileList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false); // 模拟审核状态

    // 模拟初始数据
    const mockData = {
        companyName: '北京城轨科技有限公司',
        companyLogo: '',
        companyIntro: '专注于城市轨道交通智能化解决方案，致力于为城市交通发展提供先进技术支持。公司成立于2010年，拥有专业的研发团队和丰富的项目经验。',
        companyWebsite: 'https://www.example-rail.com',
        contactPerson: '张经理',
        contactEmail: 'zhang@example-rail.com',
        contactPhone: '13800138000' // 从登录账号获取，不可修改
    };

    useEffect(() => {
        // 模拟加载数据
        form.setFieldsValue(mockData);
    }, [form]);

    const handleSubmit = (values) => {
        setLoading(true);
        // 模拟提交审核
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
            message.success('提交成功！您的信息已进入审核流程，审核结果将通过站内信通知您。');
        }, 1000);
    };

    const uploadProps = {
        listType: 'picture-card',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('只能上传 JPG/PNG 格式的图片！');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小不能超过 2MB！');
                return false;
            }
            return false; // 阻止自动上传
        }
    };

    return React.createElement('div', { style: { padding: 24 } },
        React.createElement(Card, {
            title: '展商基础信息',
            extra: React.createElement(Space, null,
                isSubmitted ? React.createElement('span', { style: { color: '#fa8c16' } }, '审核中') : null,
                React.createElement(Button, {
                    type: 'primary',
                    onClick: () => form.submit(),
                    loading: loading,
                    disabled: isSubmitted
                }, isSubmitted ? '已提交审核' : '提交审核')
            )
        },
            React.createElement('div', { style: { marginBottom: 16, padding: 16, background: '#f6f8fa', borderRadius: 8 } },
                React.createElement('h4', { style: { margin: '0 0 8px 0', color: '#1890ff' } }, '填写说明'),
                React.createElement('p', { style: { margin: 0, color: '#666' } }, 
                    '请完整填写贵公司的基本信息，所有信息将在APP端和Web端向参观者展示。提交后需要会展部门审核，审核通过后信息将正式展示。'
                )
            ),

            React.createElement(Form, {
                form: form,
                layout: 'vertical',
                onFinish: handleSubmit,
                disabled: isSubmitted
            },
                React.createElement(Form.Item, {
                    name: 'companyName',
                    label: '公司名称',
                    rules: [
                        { required: true, message: '请输入公司名称' },
                        { max: 50, message: '公司名称不能超过50个字符' }
                    ]
                },
                    React.createElement(Input, { placeholder: '请输入公司全称' })
                ),

                React.createElement(Form.Item, {
                    label: '公司Logo',
                    help: '支持 JPG、PNG 格式，文件大小不超过 2MB'
                },
                    React.createElement(Upload, {
                        ...uploadProps,
                        fileList: logoFileList,
                        onChange: ({ fileList }) => setLogoFileList(fileList.slice(-1)), // 只保留最后一个
                        maxCount: 1
                    },
                        logoFileList.length >= 1 ? null : React.createElement('div', null,
                            React.createElement('div', { style: { marginTop: 8 } }, '上传Logo')
                        )
                    )
                ),

                React.createElement(Form.Item, {
                    name: 'companyIntro',
                    label: '公司简介',
                    rules: [
                        { required: true, message: '请输入公司简介' },
                        { max: 1000, message: '公司简介不能超过1000个字符' }
                    ]
                },
                    React.createElement(TextArea, { 
                        rows: 6,
                        placeholder: '请详细介绍贵公司的业务范围、技术优势、发展历程等信息',
                        showCount: true,
                        maxLength: 1000
                    })
                ),

                React.createElement(Form.Item, {
                    name: 'companyWebsite',
                    label: '公司网址',
                    rules: [
                        { type: 'url', message: '请输入有效的网址' }
                    ]
                },
                    React.createElement(Input, { 
                        placeholder: '请输入公司官方网站地址，如：https://www.example.com',
                        addonBefore: 'http(s)://'
                    })
                ),

                React.createElement(Form.Item, {
                    label: '宣传图片',
                    help: '最多可上传5张图片，用于展示公司实力或案例，可拖拽调整顺序'
                },
                    React.createElement(Upload, {
                        ...uploadProps,
                        fileList: imageFileList,
                        onChange: ({ fileList }) => setImageFileList(fileList),
                        maxCount: 5,
                        multiple: true
                    },
                        imageFileList.length >= 5 ? null : React.createElement('div', null,
                            React.createElement('div', { style: { marginTop: 8 } }, '上传图片')
                        )
                    )
                ),

                React.createElement(Divider, { children: '联系信息' }),

                React.createElement(Form.Item, {
                    name: 'contactPerson',
                    label: '联系人',
                    rules: [
                        { required: true, message: '请输入联系人姓名' },
                        { max: 20, message: '联系人姓名不能超过20个字符' }
                    ]
                },
                    React.createElement(Input, { placeholder: '请输入联系人姓名' })
                ),

                React.createElement(Form.Item, {
                    name: 'contactEmail',
                    label: '联系邮箱',
                    rules: [
                        { required: true, message: '请输入联系邮箱' },
                        { type: 'email', message: '请输入有效的邮箱地址' }
                    ]
                },
                    React.createElement(Input, { placeholder: '请输入联系邮箱' })
                ),

                React.createElement(Form.Item, {
                    name: 'contactPhone',
                    label: '联系电话',
                    help: '此信息从您的登录账号自动获取，如需修改请联系运营人员'
                },
                    React.createElement(Input, { 
                        placeholder: '联系电话',
                        disabled: true,
                        style: { background: '#f5f5f5' }
                    })
                )
            )
        )
    );
}

// 注册到全局
window.ExhibitorBasicInfo = ExhibitorBasicInfo; 