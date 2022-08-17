// import { isAccountExist } from '/@/api/demo/system';
import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {h, VNode} from "vue";
import {Avatar, Popover, Switch, Tag} from "ant-design-vue";
import {useMessage} from "/@/hooks/web/useMessage";
import {getRoleList, updateUser} from "/@/api/api";

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'uid',
    width: 260,
  },
  {
    title: '权限角色',
    dataIndex: 'roles',
    customRender: ({record}) => {
      let tmp1: VNode[] = []
      for (let i = 0; i < record.roles.length; i++) {
        tmp1.push(h('span', {style: { marginBo: '5px' }},  h(Tag, {color: 'gold'}, () => record.roles[i])))
      }
      return h(Popover, {
        title: "权限",
        overlayStyle: {
          width: "200px",
        },
        content: tmp1,
      }, () => h(Tag, {color: 'gold'}, () => '用户权限'));
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    customRender: ({record}) => {
      return h(Avatar, {src: record.avatar, size: 'large'});
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
    width: 120,
  },
  {
    title: '手机',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '微信',
    dataIndex: 'wechat',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 120,
    customRender: ({record}) => {
      switch (record.gender) {
        case 1:
          return h(Tag, {color: 'cyan'}, () => '男');
        case 2:
          return h(Tag, {color: 'pink'}, () => '女');
      }
      return h(Tag, {}, () => '保密');
    },
  },
  {
    title: '联系地址',
    dataIndex: 'address',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({record}) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '正常',
        unCheckedChildren: '禁用',
        disabled: (record.roles.indexOf('dev') !== -1),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const {createMessage} = useMessage();
          updateUser({
            uid: record.uid,
            nickname: record.nickname,
            realname: record.realname,
            avatar: record.avatar,
            phone: record.phone,
            wechat: record.wechat,
            gender: Number(record.gender),
            address: record.address,
            status: Number(newStatus)
          })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`修改成功`);
            })
            .catch(() => {
              createMessage.error('编辑失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'nickname',
    label: '昵称',
    labelWidth: 100,
    component: 'Input',
    colProps: {span: 4},
  },
  {
    field: 'realname',
    label: '真实姓名',
    component: 'Input',
    labelWidth: 100,
    colProps: {span: 4},
  },
  {
    field: 'wechat',
    label: '微信',
    labelWidth: 100,
    component: 'Input',
    colProps: {span: 4},
  },
  {
    field: 'phone',
    label: '手机',
    labelWidth: 100,
    component: 'Input',
    colProps: {span: 4},
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    defaultValue: 0,
    required: false,
    show: false,
  },
  {
    field: 'uid',
    label: 'uid',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'Input',
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    helpMessage: ['用户显示名称'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'realname',
    label: '真实姓名',
    component: 'Input',
    // required: true,
  },
  {
    label: '角色',
    field: 'roles',
    component: 'ApiSelect',
    defaultValue: ['default'],
    componentProps: {
      mode: "multiple",
      api: getRoleList,
      params: {
        page: 1,
        pageSize: 9999,
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'full_tag',
    },
    required: true,
  },
  // {
  //   field: 'dept',
  //   label: '所属部门',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'deptName',
  //       key: 'id',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   required: true,
  // },
  {
    field: 'phone',
    label: '手机',
    component: 'Input',
    // required: true,
  },
  {
    label: '微信',
    field: 'wechat',
    component: 'Input',
    // required: true,
  },
  {
    label: '性别',
    field: 'gender',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '保密',
          value: 0,
        },
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
    },
    // required: true,
  },
  {
    field: 'address',
    label: '联系地址',
    component: 'InputTextArea',
    // required: true,
  },
  {
    label: '状态',
    field: 'status',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '禁用',
          value: 0,
        },
        {
          label: '正常',
          value: 1,
        },
      ],
    },
    // required: true,
  },
];
