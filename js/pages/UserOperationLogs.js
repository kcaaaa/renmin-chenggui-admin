console.log('UserOperationLogs.js 加载中...');

// 用户操作日志页面组件 - 演示版本
const UserOperationLogs = () => {
    const { Card, Table, Input, Select, DatePicker, Button, Space, Tag } = antd;
    const { Search } = Input;
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    
    const [loading, setLoading] = React.useState(false);
    
    // 模拟日志数据
    const logs = [
        {
            id: 1,
            logId: 'OP20240115001',
            userAccount: 'admin001',
            userName: '张管理员',
            operation: '修改用户权限',
            module: '用户管理',
            operationTime: '2024-01-15 14:30:25',
            result: '成功',
            details: '为用户[李四]添加了展商管理权限'
        },
        {
            id: 2,
            logId: 'OP20240115002',
            userAccount: 'admin002',
            userName: '王管理员',
            operation: '删除内容',
            module: '内容管理',
            operationTime: '2024-01-15 13:15:10',
            result: '成功',
            details: '删除了违规内容[ID:12345]'
        },
        {
            id: 3,
            logId: 'OP20240115003',
            userAccount: 'admin001',
            userName: '张管理员',
            operation: '修改系统配置',
            module: '系统设置',
            operationTime: '2024-01-15 11:45:33',
            result: '失败',
            details: '尝试修改审核流程配置，权限不足'
        },
        {
            id: 4,
            logId: 'OP20240115004',
            userAccount: 'operator001',
            userName: '李运营',
            operation: '批量导入用户',
            module: '用户管理',
            operationTime: '2024-01-15 10:20:15',
            result: '成功',
            details: '批量导入了50个协会用户'
        }
    ];

    // 获取操作结果标签
    const getResultTag = (result) => {
        const color = result === '成功' ? 'green' : 'red';
        return React.createElement(Tag, { color: color }, result);
    };

    // 表格列配置
    const columns = [
        {
            title: '日志ID',
            dataIndex: 'logId',
            key: 'logId',
            width: '12%'
        },
        {
            title: '操作用户',
            key: 'user',
            width: '15%',
            render: (_, record) => React.createElement('div', {}, [
                React.createElement('div', { 
                    key: 'name',
                    style: { fontWeight: 'bold' }
                }, record.userName),
                React.createElement('div', { 
                    key: 'account',
                    style: { fontSize: '12px', color: '#666' }
                }, record.userAccount)
            ])
        },
        {
            title: '操作行为',
            dataIndex: 'operation',
            key: 'operation',
            width: '15%'
        },
        {
            title: '操作模块',
            dataIndex: 'module',
            key: 'module',
            width: '12%',
            render: (module) => React.createElement(Tag, { color: 'blue' }, module)
        },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
            key: 'operationTime',
            width: '18%'
        },
        {
            title: '操作结果',
            dataIndex: 'result',
            key: 'result',
            width: '10%',
            render: (result) => getResultTag(result)
        },
        {
            title: '操作详情',
            dataIndex: 'details',
            key: 'details',
            width: '18%',
            ellipsis: true
        }
    ];

    return React.createElement('div', { style: { padding: '24px' } }, [
        React.createElement('div', {
            key: 'header',
            style: { marginBottom: '24px' }
        }, [
            React.createElement('h2', { 
                key: 'title',
                style: { margin: 0 }
            }, '用户操作日志'),
            React.createElement('p', {
                key: 'desc',
                style: { margin: '8px 0 0 0', color: '#666' }
            }, '记录管理员在后台的所有关键操作，确保系统操作的可追溯性')
        ]),
        
        React.createElement(Card, {
            key: 'filters',
            style: { marginBottom: '16px' }
        }, [
            React.createElement(Space, { 
                key: 'filter-space',
                size: 'middle',
                wrap: true
            }, [
                React.createElement(Search, {
                    key: 'search',
                    placeholder: '搜索操作用户或行为',
                    style: { width: 250 },
                    allowClear: true
                }),
                React.createElement(Select, {
                    key: 'module-filter',
                    placeholder: '操作模块',
                    style: { width: 120 },
                    allowClear: true
                }, [
                    React.createElement(Option, { key: '1', value: '用户管理' }, '用户管理'),
                    React.createElement(Option, { key: '2', value: '内容管理' }, '内容管理'),
                    React.createElement(Option, { key: '3', value: '系统设置' }, '系统设置'),
                    React.createElement(Option, { key: '4', value: '审核管理' }, '审核管理')
                ]),
                React.createElement(Select, {
                    key: 'result-filter',
                    placeholder: '操作结果',
                    style: { width: 100 },
                    allowClear: true
                }, [
                    React.createElement(Option, { key: 'success', value: '成功' }, '成功'),
                    React.createElement(Option, { key: 'fail', value: '失败' }, '失败')
                ]),
                React.createElement(RangePicker, {
                    key: 'date-range',
                    placeholder: ['开始时间', '结束时间']
                }),
                React.createElement(Button, {
                    key: 'export',
                    type: 'default'
                }, '导出日志')
            ])
        ]),
        
        React.createElement(Card, {
            key: 'table',
            title: '操作日志记录（共 ' + logs.length + ' 条）'
        }, [
            React.createElement(Table, {
                key: 'table-content',
                columns: columns,
                dataSource: logs,
                rowKey: 'id',
                loading: loading,
                scroll: { x: 1200 },
                pagination: {
                    total: logs.length,
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => '第 ' + range[0] + '-' + range[1] + ' 条，共 ' + total + ' 条'
                }
            })
        ])
    ]);
};

// 导出组件
window.UserOperationLogs = UserOperationLogs;
console.log('UserOperationLogs 组件已成功加载');
