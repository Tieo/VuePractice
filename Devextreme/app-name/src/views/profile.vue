<template>
  <div id="frame">
    <b-row style="width: 100%; height: 1000px;">
      <b-col style="background-color:gray; height: 100%;" cols="4">
          <DxTreeView id="simple-treeview"
            :items="testData"
            :width="400"
            @item-click="selectItem"
          />        
      </b-col>
      <b-col style="background-color:white; height: 100%;" cols="8">
          <DxForm id="form" 
          :form-data="formData"
          :read-only="readOnly"
          :show-colon-after-label="showColon"
          :label-location="labelLocation"
          :min-col-width="minColWidth"
          :col-count="colCount"
          :width="width"
          />
      </b-col>
    </b-row> 
  </div>
</template>

<script>
import DxTreeView from "devextreme-vue/tree-view";
import DxForm from 'devextreme-vue/form';
import testData from "./test.json";
import mappingData from "./user-info-mapping.json";

export default {
   components: {
    DxTreeView,
    DxForm
  },
  data() {
    return {
      mappingData,
      testData,
      formData: {},
      labelLocation: 'top',
      readOnly: false,
      showColon: false,
      minColWidth: 300,
      colCount: 2,
      width: null
    }
  },
    methods: {
    selectItem(e) {
      this.currentItemName = e.itemData.text;
      this.formData = this.mappingData[this.currentItemName];
      //console.log(this.currentItemName);
    }
  }
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
