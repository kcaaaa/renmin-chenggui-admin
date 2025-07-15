// 展会列表页面 DEMO
function ExhibitionList() {
    const { Table, Button, Modal, Form, Input, Space, message } = antd;
    const [data, setData] = React.useState([
        { key: '1', name: '2024中国城轨展', location: '北京', date: '2024-05-10~2024-05-12', status: '进行中' },
        { key: '2', name: '2023智慧轨道大会', location: '上海', date: '2023-08-20~2023-08-22', status: '已结束' },
    ]);
    const [modal, setModal] = React.useState({ visible: false, type: '', record: null });
    const [form] = Form.useForm();

    const columns = [
        { title: '展会名称', dataIndex: 'name', key: 'name' },
        { title: '举办地点', dataIndex: 'location', key: 'location' },
        { title: '举办时间', dataIndex: 'date', key: 'date' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                React.createElement(Space, null,
                    React.createElement(Button, { size: 'small', onClick: () => showModal('detail', record) }, '详情'),
                    React.createElement(Button, { size: 'small', onClick: () => showModal('edit', record) }, '编辑'),
                    React.createElement(Button, { size: 'small', danger: true, onClick: () => handleDelete(record) }, '删除')
                )
            )
        }
    ];

    function showModal(type, record) {
        setModal({ visible: true, type, record });
        if (type === 'edit') form.setFieldsValue(record);
    }
    function handleOk() {
        setModal({ ...modal, visible: false });
        message.success('操作成功（DEMO）');
    }
    function handleDelete(record) {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除展会“${record.name}”吗？`,
            onOk: () => message.success('已删除（DEMO）')
        });
    }
    function handleAdd() {
        setModal({ visible: true, type: 'add', record: null });
        form.resetFields();
    }
    return React.createElement('div', { style: { padding: 24 } },
        React.createElement('h2', null, '展会列表'),
        React.createElement(Button, { type: 'primary', style: { marginBottom: 16 }, onClick: handleAdd }, '新增展会'),
        React.createElement(Table, { columns, dataSource: data, pagination: { pageSize: 5 } }),
        React.createElement(Modal, {
            open: modal.visible,
            title: modal.type === 'add' ? '新增展会' : modal.type === 'edit' ? '编辑展会' : '展会详情',
            onOk: handleOk,
            onCancel: () => setModal({ ...modal, visible: false })
        },
            modal.type === 'detail'
                ? React.createElement('div', null,
                    React.createElement('p', null, '展会名称：' + (modal.record && modal.record.name)),
                    React.createElement('p', null, '举办地点：' + (modal.record && modal.record.location)),
                    React.createElement('p', null, '举办时间：' + (modal.record && modal.record.date)),
                    React.createElement('p', null, '状态：' + (modal.record && modal.record.status)),
                )
                : React.createElement(Form, { form, layout: 'vertical' },
                    React.createElement(Form.Item, { label: '展会名称', name: 'name', rules: [{ required: true }] }, React.createElement(Input)),
                    React.createElement(Form.Item, { label: '举办地点', name: 'location', rules: [{ required: true }] }, React.createElement(Input)),
                    React.createElement(Form.Item, { label: '举办时间', name: 'date', rules: [{ required: true }] }, React.createElement(Input)),
                    React.createElement(Form.Item, { label: '状态', name: 'status', rules: [{ required: true }] }, React.createElement(Input)),
                )
        )
    );
}
window.ExhibitionList = ExhibitionList; 