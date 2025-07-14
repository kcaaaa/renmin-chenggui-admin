// 模拟数据
const mockData = {
    users: [
        {
            id: 1,
            username: 'admin',
            name: '系统管理员',
            email: 'admin@example.com',
            role: 'admin',
            status: 'active',
            createTime: '2024-01-01 00:00:00'
        },
        {
            id: 2,
            username: 'operator',
            name: '运营人员',
            email: 'operator@example.com',
            role: 'operator',
            status: 'active',
            createTime: '2024-01-02 00:00:00'
        }
    ],
    
    exhibitions: [
        {
            id: 1,
            name: '2024城市轨道交通技术展',
            startDate: '2024-06-01',
            endDate: '2024-06-03',
            location: '上海国际博览中心',
            status: 'ongoing',
            exhibitors: 156
        }
    ],
    
    content: [
        {
            id: 1,
            title: '城轨技术创新论坛',
            type: 'news',
            status: 'published',
            author: '编辑部',
            publishTime: '2024-05-15 10:00:00'
        }
    ]
};

// 确保mockData在全局可用
window.mockData = mockData;

console.log('模拟数据已加载');
