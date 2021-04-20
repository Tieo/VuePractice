<template>
  <div id="frame">
    <DxTreeView id="simple-treeview"
      :items="groupName"
      :width="200"
      @item-click="selectItem"
    />        
  </div>
</template>

<script>
import DxTreeView from "devextreme-vue/tree-view";
import groupName from "./group-name.json";

export default {
   components: {
    DxTreeView,
  },
  data() {
    return {
      groupName
    }
  },
    methods: {
    selectItem(e) {
      this.currentItemName = e.itemData.id;
      this.$emit("groupName", this.currentItemName);
    }
  },
}

</script>

<style lang="scss">
.logos-container {
  margin: 20px 0 40px 0;
  text-align: center;
  svg {
    display: inline-block;
  }
}

.devextreme-logo {
  width: 200px;
  height: 34px;
  margin-bottom: 17px;
}

.vue-logo {
  width: 180px;
  height: 62px;
}

.plus {
  margin: 20px 10px;
  width: 22px;
  height: 22px;
}

.screen-x-small .logos-container {
  svg {
    width: 100%;
    display: block;
    &.plus {
      margin: 0;
    }
  }
}
.widget-container {
  padding: 20px;
  max-width: 550px;
  min-width: 300px;
}
#form {
  margin-top: 25px;
}

</style>
