<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs" title="角色管理" width="30%">
    <BasicTree
      :treeData="treeData"
      :checkable="true"
      defaultExpandAll
      @check="handleCheck"
    />
  </BasicDrawer>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { BasicTree,TreeItem } from '/@/components/Tree/index';

export const treeData: TreeItem[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: 'carbon:face-activated',
    children: [
      { title: 'leaf', key: '0-0-0' },
      {
        title: 'leaf',
        key: '0-0-1',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '1-1',
    icon: 'carbon:face-activated',
    children: [
      // { title: 'leaf', key: '1-1-0' },
      // { title: 'leaf', key: '1-1-1' },
    ],
  },
  {
    title: 'parent 3',
    key: '2-2',
    icon: 'carbon:face-activated',
    children: [
      { title: 'leaf', key: '2-2-0' },
      { title: 'leaf', key: '2-2-1' },
    ],
  },
];

export default defineComponent({
  components: { BasicDrawer,BasicTree },
  setup() {


    let uid = ref<string>('');

    const [registerDrawer, { closeDrawer }] = useDrawerInner(async (data) => {
      uid = data.uid
    });

    function handleCheck(checkedKeys, e) {
      console.log("uid",uid)
      console.log('onChecked', checkedKeys, e);
    }

    return {
      registerDrawer,
      closeDrawer,
      handleCheck,
      treeData,
    };
  },

});
</script>
