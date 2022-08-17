import {BasicColumn, FormSchema} from '/@/components/Table';
import {h} from 'vue';
import {Switch} from 'ant-design-vue';
import {getRoleList, updateRole} from '/@/api/api';
import {useMessage} from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '角色ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '上级ID',
    dataIndex: 'pid',
    width: 80,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '完整Tag',
    dataIndex: 'full_tag',
    width: 180,
  },
  {
    title: '角色Tag',
    dataIndex: 'tag',
    width: 180,
  },
  {
    title: '叶子权限',
    dataIndex: 'is_leaf',
    width: 120,
    customRender: ({record}) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.is_leaf === 1,
        checkedChildren: '是',

        unCheckedChildren: '否',
        disabled: (record.tag === 'dev' || record.tag === 'default' || record.is_leaf === 0),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const {createMessage} = useMessage();
          updateRole({
            id: Number(record.id ?? 0),
            pid: Number(record.pid ?? 0),
            name: record.name,
            full_tag: record.full_tag,
            tag: record.tag,
            is_leaf: newStatus,
            is_default: record.is_default,
            remark: record.remark,
          })
            .then(() => {
              record.is_leaf = newStatus;
              createMessage.success(`修改成功`);
            })
            .catch(() => {
              createMessage.error('修改失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '默认权限',
    dataIndex: 'is_default',
    width: 120,
    customRender: ({record}) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.is_default === 1,
        checkedChildren: '是',
        disabled: (record.tag === 'dev' || record.tag === 'default'),
        unCheckedChildren: '否',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const {createMessage} = useMessage();
          updateRole({
            id: Number(record.id ?? 0),
            pid: Number(record.pid ?? 0),
            name: record.name,
            full_tag: record.full_tag,
            tag: record.tag,
            is_leaf: record.is_leaf,
            is_default: newStatus,
            remark: record.remark,
          })
            .then(() => {
              record.is_default = newStatus;
              createMessage.success(`修改成功`);
            })
            .catch(() => {
              createMessage.error('修改失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '层级',
    dataIndex: 'level',
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {label: '禁用', value: '0'},
        {label: '正常', value: '1'},
      ],
    },
    colProps: {span: 8},
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '角色ID',
    required: false,
    component: 'Input',
    defaultValue: 0,
    show: false,
  },
  {
    label: '上级角色',
    field: 'pid',
    component: 'ApiSelect',
    defaultValue: 0,
    componentProps: {
      api: getRoleList,
      params: {
        cond: {
          "is_select": 1,
          "is_leaf": 0
        },
        page: 1,
        pageSize: 9999,
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
    // required: true,
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'tag',
    label: '角色Tag',
    required: true,
    component: 'Input',
  },
  {
    field: 'is_leaf',
    label: '叶子权限',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {label: '否', value: 0},
        {label: '是', value: 1},
      ],
    },
  },
  {
    field: 'is_default',
    label: '默认权限',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {label: '否', value: 0},
        {label: '是', value: 1},
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const formSchema2: FormSchema[] = [
  {
    field: 'id',
    label: '角色ID',
    required: false,
    component: 'Input',
    defaultValue: 0,
    show: false,
  },
  {
    label: '上级角色',
    field: 'pid',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      disabled: true,
      params: {
        cond: {
          "is_select": 1,
          "is_leaf": 0
        },
        page: 1,
        pageSize: 9999,
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
    // required: true,
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'tag',
    label: '角色Tag',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
    }
  },
  {
    field: 'is_leaf',
    label: '叶子权限',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      disabled: true,
      options: [
        {label: '否', value: 0},
        {label: '是', value: 1},
      ],
    },
  },
  {
    field: 'is_default',
    label: '默认权限',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {label: '否', value: 0},
        {label: '是', value: 1},
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
