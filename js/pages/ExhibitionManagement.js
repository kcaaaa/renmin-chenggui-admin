console.log('ExhibitionManagement.js 加载中...');

// 展会管理页面组件
const ExhibitionManagement = () => {
    const { Card, Table, Button, Input, DatePicker, Form, Modal, message, Space, Tag } = antd;
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    const [exhibitions, setExhibitions] = React.useState([]);
    const [filteredExhibitions, setFilteredExhibitions] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingExhibition, setEditingExhibition] = React.useState(null);
    const [form] = Form.useForm();

    // 模拟数据
    const mockData = [
        {
            id: 1,
            name: '2024中国城市轨道交通展览会',
            location: '北京国家会议中心',
            startDate: '2024-05-15',
            endDate: '2024-05-17',
            status: 'active',
            exhibitors: 156,
            visitors: 12500,
            description: '聚焦城市轨道交通行业发展趋势，展示最新技术成果'
        },
        {
            id: 2,
            name: '2024智慧城轨技术论坛',
            location: '上海世博展览馆',
            startDate: '2024-08-20',
            endDate: '2024-08-22',
            status: 'planning',
            exhibitors: 89,
            visitors: 8600,
            description: '探讨智慧城轨发展方向，交流前沿技术应用'
        }
    ];

    // 初始化数据
    React.useEffect(() => {
        setExhibitions(mockData);
        setFilteredExhibitions(mockData);
    }, []);

    return React.createElement('div', { className: 'exhibition-management' }, [
        React.createElement('h2', { key: 'title' }, '展会管理'),
        React.createElement('p', { key: 'desc' }, '管理历届展会信息，包括展会基本信息、参展商、观众等数据'),
        React.createElement(Card, { key: 'content' }, [
            React.createElement('div', { key: 'message' }, '展会管理功能开发中...')
        ])
    ]);
};

// 导出组件
window.ExhibitionManagement = ExhibitionManagement;
console.log('ExhibitionManagement 组件已加载');
