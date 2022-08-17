<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts">
import {defineComponent, ref, computed, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form/index';
import {accountFormSchema} from './account.data';
import {useMessage} from "/@/hooks/web/useMessage";
import {updateUser} from "/@/api/api";

export default defineComponent({
  name: 'AccountModal',
  components: {BasicModal, BasicForm},
  emits: ['success', 'register'],
  setup(_, {emit}) {
    const isUpdate = ref(true);
    const rowId = ref('');

    const [registerForm, {setFieldsValue, resetFields, validate}] = useForm({
      labelWidth: 100,
      baseColProps: {span: 24},
      schemas: accountFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
    });

    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
      resetFields();
      setModalProps({confirmLoading: false});
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        setFieldsValue({
          ...data.record,
        });
      }

      // const treeData = await getDeptList();
      // updateSchema([
      //   {
      //     field: 'pwd',
      //     show: !unref(isUpdate),
      //   },
      //   {
      //     field: 'dept',
      //     componentProps: { treeData },
      //   },
      // ]);
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({confirmLoading: true});
        const {createMessage} = useMessage();
        updateUser({
          uid: values.uid,
          nickname: values.nickname,
          realname: values.realname,
          avatar: values.avatar,
          phone: values.phone,
          wechat: values.wechat,
          gender: Number(values.gender),
          roles: values.roles,
          address: values.address,
          status: Number(values.status)
        })
          .then(() => {
            closeModal();
            emit('success', {isUpdate: unref(isUpdate), values: {...values, id: rowId.value}});
          })
          .catch(() => {
            createMessage.error((!unref(isUpdate) ? '新增角色失败' : '编辑角色失败'));
          })
      } finally {
        setModalProps({confirmLoading: false});
      }
    }

    return {registerModal, registerForm, getTitle, handleSubmit};
  },
});
</script>
