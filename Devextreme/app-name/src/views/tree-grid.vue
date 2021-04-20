<template>
  <div id="frame">
    <b-row style="background-color:#f68b1f;width: 100%; height: 1000px;">
      <b-card-group deck >
        <b-card style="max-width: 300px;">
          <b-col style="background-color:#ffc20e; height: 100%;" >
            <DxTreeView id="simple-treeview"
              :items="groupName"
              :width="200"
              @item-click="selectItem"
            />        
          </b-col>
        </b-card>
        <b-card>
          <b-col style="background-color:#808285; height: 100%;">
            <DxDataGrid
              :data-source="formData"
              :show-borders="true"
            />                
          </b-col>
        </b-card>
      </b-card-group>
    </b-row> 
  </div>
</template>

<script>
import DxTreeView from "devextreme-vue/tree-view";
import DxDataGrid from 'devextreme-vue/data-grid';
import groupName from "./group-name.json";
import axios from 'axios';

export default {
   components: {
    DxTreeView,
    DxDataGrid
  },
  data() {
    return {
      groupName,
      formData: [{"Welcome!":"Please select Team!"}]
    }
  },
    methods: {
    selectItem(e) {
      console.log(e);
      this.currentItemName = e.itemData.id;
      axios.get('http://localhost:3000/'+this.currentItemName)
      .then(response => {this.formData = response.data})
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
