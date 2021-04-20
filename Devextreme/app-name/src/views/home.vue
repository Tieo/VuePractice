<template>
  <div id="frame">
    <b-row style="background-color:#f68b1f;width: 100%; height: 1000px;">
      <b-card-group deck >
        <b-card style="max-width: 300px;">
          <b-col style="background-color:#ffc20e; height: 100%;" >
            <child-tree-view 
            @groupName="groupNumber"
            ></child-tree-view>
          </b-col>
        </b-card>
        <b-card>
          <b-col style="background-color:#808285; height: 100%;">
            <child-data-grid :showData="formData"></child-data-grid>
          </b-col>
        </b-card>
      </b-card-group>
    </b-row> 
  </div>
</template>

<script>
import ChildDataGrid from './child-data-grid.vue';
import ChildTreeView from './child-tree-view.vue';
import axios from 'axios';

export default {
  name: "board-list",
  components: {
    ChildTreeView,
    ChildDataGrid // Component를 등록한다.
  },
  data() {
    return {
      formData: [{"Welcome!":"Please select Team!"}]
    };
  },
    methods: {
      groupNumber: function(e) {
     axios.get('http://localhost:3000/'+e)
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
