// 组织管理 - 基于新UI设计
const OrganizationManagement = () => {
    const { Tree, Button, Typography, Space, Tooltip } = antd;
    const { Title, Text } = Typography;

    // 自定义图标
    const iconMap = {
        association: React.createElement('i', { className: 'icon-folder-fill', style: { color: '#69c0ff' } }),
        branch: React.createElement('i', { className: 'icon-branches', style: { color: '#95de64' } }),
        company: React.createElement('i', { className: 'icon-building', style: { color: '#ff9c6e' } }),
        member: React.createElement('i', { className: 'icon-user-group-fill', style: { color: '#b37feb' } }),
        nonMember: React.createElement('i', { className: 'icon-user-group', style: { color: '#ff85c0' } }),
        general: React.createElement('i', { className: 'icon-team', style: { color: '#ffd666' } }),
    };

    // 组织结构树数据
    const treeData = [
        {
            title: '协会组织',
            key: 'association',
            icon: React.createElement('i', { className: 'icon-users-group', style: { color: '#d3adf7' } }),
            children: [
                { title: '协会部门', key: 'association-dept', icon: iconMap.association },
                { title: '分支机构', key: 'association-branch', icon: iconMap.branch },
                { title: '下属公司', key: 'association-company', icon: iconMap.company },
            ],
        },
        {
            title: '展商组织',
            key: 'exhibitor',
            icon: React.createElement('i', { className: 'icon-store', style: { color: '#8fd3f4' } }),
            children: [
                { title: '会员展商', key: 'exhibitor-member', icon: iconMap.member },
                { title: '非会员展商', key: 'exhibitor-non-member', icon: iconMap.nonMember },
            ],
        },
        {
            title: '普通用户',
            key: 'general-user',
            icon: React.createElement('i', { className: 'icon-user-circle', style: { color: '#ffadd2' } }),
            children: [
                { title: '普通用户组', key: 'general-user-group', icon: iconMap.general },
            ],
        },
    ];

    // 自定义渲染树节点
    const titleRenderer = (nodeData) => {
        const isRootNode = !nodeData.key.includes('-');
        
        return (
            React.createElement(Space, { 
                className: `tree-node-title-wrapper ${isRootNode ? 'root-node' : 'child-node'}`,
                align: 'center' 
            }, [
                React.createElement(Text, { className: 'tree-node-title' }, nodeData.title),
                isRootNode && React.createElement(Tooltip, { title: `添加新的${nodeData.title}` },
                    React.createElement(Button, {
                        type: 'text',
                        shape: 'circle',
                        icon: React.createElement('i', { className: 'icon-plus' }),
                        className: 'add-button',
                        onClick: (e) => {
                            e.stopPropagation();
                            console.log('添加', nodeData.title);
                        }
                    })
                )
            ])
        );
    };

    return (
        React.createElement('div', { className: 'org-management-container' },
            // 页面头部
            React.createElement('div', { className: 'org-header' }, 
                React.createElement(Space, { align: 'center', size: 'large' }, [
                    React.createElement('div', { className: 'header-icon-wrapper' },
                        React.createElement('i', { className: 'icon-user-management' })
                    ),
                    React.createElement(Title, { level: 2, className: 'header-title' }, '用户管理')
                ])
            ),

            // 组织结构内容区
            React.createElement('div', { className: 'org-content-card' }, 
                React.createElement(Title, { level: 4, className: 'content-title' }, '组织结构'),
                React.createElement(Tree, {
                    className: 'org-tree',
                    showLine: false,
                    showIcon: true,
                    defaultExpandAll: true,
                    treeData: treeData,
                    titleRender: titleRenderer,
                    blockNode: true
                })
            )
        )
    );
};

// 挂载到window
window.OrganizationManagement = OrganizationManagement; 