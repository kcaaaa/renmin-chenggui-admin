console.log('UserManagement.js 加载中...');

// 简单的用户管理页面组件 - 演示版本
const UserManagement = () => {
    const { Card, Table, Button, Input, Space, Tag } = antd;
    
    // 简单的模拟数据
    const users = [
        { id: 1, name: '张三', phone: '13800138001', role: '协会用户', status: '启用' },
        { id: 2, name: '李四', phone: '13800138002', role: '展商用户', status: '启用' },
        { id: 3, name: '王五', phone: '13800138003', role: '普通用户', status: '禁用' }
    ];

    // 表格列配置
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: '状态',
                dataIndex: 'status',
                key: 'status',
            render: (status) => {
                const color = status === '启用' ? 'green' : 'red';
                return React.createElement(Tag, { color: color }, status);
            }
        },
        {
            title: '操作',
            key: 'action',
            render: () => React.createElement(Space, {}, [
                React.createElement(Button, { key: 'edit', type: 'link', size: 'small' }, '编辑'),
                React.createElement(Button, { key: 'delete', type: 'link', size: 'small', danger: true }, '删除')
            ])
        }
    ];

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('h2', { 
            key: 'title', 
            style: { marginBottom: '24px' } 
        }, '用户管理'),
        
        React.createElement(Card, { key: 'card' }, [
            React.createElement(Space, { 
                key: 'toolbar', 
                style: { marginBottom: '16px' } 
            }, [
                React.createElement(Input.Search, {
                    key: 'search',
                    placeholder: '搜索用户',
                    style: { width: 200 }
                }),
                React.createElement(Button, { 
                    key: 'add', 
                    type: 'primary' 
                }, '新增用户')
            ]),
            
            React.createElement(Table, {
                key: 'table',
                columns: columns,
                dataSource: users,
                rowKey: 'id',
                pagination: { pageSize: 10 }
            })
        ])
    ]);
};

// 导出组件
window.UserManagement = UserManagement; 
console.log('UserManagement 组件已成功加载');
