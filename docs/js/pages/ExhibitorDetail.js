// 展商详情页面 DEMO
function ExhibitorDetail() {
    const { Table, Button, Modal, Space, message } = antd;
    const [data] = React.useState([
        { key: '1', name: '中车集团', contact: '张总', phone: '13800138000', status: '已审核' },
        { key: '2', name: '华为技术', contact: '李经理', phone: '13800138001', status: '待审核' },
    ]);
    const [modal, setModal] = React.useState({ visible: false, type: '', record: null });
    const columns = [
        { title: '展商名称', dataIndex: 'name', key: 'name' },
        { title: '联系人', dataIndex: 'contact', key: 'contact' },
        { title: '联系电话', dataIndex: 'phone', key: 'phone' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                React.createElement(Space, null,
                    React.createElement(Button, { size: 'small', onClick: () => showModal('detail', record) }, '查看'),
                    React.createElement(Button, { size: 'small', onClick: () => showModal('edit', record) }, '编辑'),
                    React.createElement(Button, { size: 'small', onClick: () => showModal('audit', record) }, '审核')
                )
            )
        }
    ];
    function showModal(type, record) {
        setModal({ visible: true, type, record });
    }
    function handleOk() {
        setModal({ ...modal, visible: false });
        message.success('操作成功（DEMO）');
    }
    return React.createElement('div', { style: { padding: 24 } },
        React.createElement('h2', null, '展商详情'),
        React.createElement(Table, { columns, dataSource: data, pagination: { pageSize: 5 } }),
        React.createElement(Modal, {
            open: modal.visible,
            title: modal.type === 'edit' ? '编辑展商' : modal.type === 'audit' ? '审核展商' : '展商详情',
            onOk: handleOk,
            onCancel: () => setModal({ ...modal, visible: false })
        },
            modal.type === 'detail'
                ? React.createElement('div', null,
                    React.createElement('p', null, '展商名称：' + (modal.record && modal.record.name)),
                    React.createElement('p', null, '联系人：' + (modal.record && modal.record.contact)),
                    React.createElement('p', null, '联系电话：' + (modal.record && modal.record.phone)),
                    React.createElement('p', null, '状态：' + (modal.record && modal.record.status)),
                )
                : React.createElement('div', null, '（DEMO表单/操作区）')
        )
    );
}
window.ExhibitorDetail = ExhibitorDetail; 