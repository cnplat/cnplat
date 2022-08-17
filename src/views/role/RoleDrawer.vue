<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <!--      <template #menu="{ model, field }">-->
      <!--        <BasicTree-->
      <!--          v-model:value="model[field]"-->
      <!--          :treeData="treeData"-->
      <!--          :fieldNames="{ title: 'menuName', key: 'id' }"-->
      <!--          checkable-->
      <!--          toolbar-->
      <!--          title="菜单分配"-->
      <!--        />-->
      <!--      </template>-->
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import {computed, defineComponent, ref, unref} from 'vue';
import {BasicForm, useForm} from '/@/components/Form/index';
import {formSchema, formSchema2} from './role.data';
import {BasicDrawer, useDrawerInner} from '/@/components/Drawer';
import {BasicTree, TreeItem} from '/@/components/Tree';
import {useMessage} from "/@/hooks/web/useMessage";
import {updateRole} from "/@/api/api";

// import { getMenuList } from '/@/api/demo/system';

export default defineComponent({
  name: 'RoleDrawer',
  components: {BasicDrawer, BasicForm, BasicTree},
  emits: ['success', 'register'],
  setup(_, {emit}) {
    const isUpdate = ref(true);
    const treeData = ref<TreeItem[]>([]);

    const [registerForm, {setProps, resetFields, setFieldsValue, validate}] = useForm({
      labelWidth: 90,
      baseColProps: {span: 24},
      // schemas: formSchema,
      showActionButtonGroup: false,
    });

    const [registerDrawer, {setDrawerProps, closeDrawer}] = useDrawerInner(async (data) => {

      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {

        await setProps({
          schemas: formSchema2
        });
      } else {

        await setProps({
          schemas: formSchema
        });
      }
      await resetFields();
      setDrawerProps({confirmLoading: false});
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
      if (unref(treeData).length === 0) {
        // treeData.value = (await getMenuList()) as any as TreeItem[];
      }

      if (unref(isUpdate)) {
        await setFieldsValue({
          ...data.record,
        });
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({confirmLoading: true});
        const {createMessage} = useMessage();
        console.log("values", values)
        updateRole({
          id: Number(values.id ?? 0),
          pid: Number(values.pid ?? 0),
          name: values.name,
          full_tag: values.full_tag,
          tag: values.tag,
          is_leaf: values.is_leaf,
          is_default: values.is_default,
          remark: values.remark,
        })
          .then(() => {
            createMessage.success((!unref(isUpdate) ? '新增角色成功' : '编辑角色成功'));
            closeDrawer();
            emit('success');
          })
          .catch(() => {
            createMessage.error((!unref(isUpdate) ? '新增角色失败' : '编辑角色失败'));
          })
      } finally {
        setDrawerProps({confirmLoading: false});
      }
    }

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData,
    };
  },
});
</script>
