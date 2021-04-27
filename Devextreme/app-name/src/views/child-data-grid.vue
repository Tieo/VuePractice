<template>
  <div id="frame">
    CRUD
    <DxDataGrid
    :data-source="showData"
    :show-borders="true"
    >
    <DxEditing
        :refresh-mode="refreshMode"
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        mode="cell"
      />
      <DxColumn data-field="ID"/>
      <DxColumn data-field="CompanyName"/>
      <DxColumn data-field="Address"/>
      <DxColumn data-field="City"/>
      <DxColumn data-field="State"/>
      <DxColumn data-field="Zipcode"/>
      <DxColumn data-field="Phone"/>
      <DxColumn data-field="Fax"/>
      <DxColumn data-field="Website"/>

      <DxScrolling mode="virtual"/>
      <DxSummary>
        <DxTotalItem
          column="ID"
          summary-type="count"
        />
        <DxTotalItem
          column="Zipcode"
          summary-type="sum"
          value-format="#0.00"
        />
      </DxSummary>

    </DxDataGrid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Refresh Mode: </span>
        <DxSelectBox
          
          :items="refreshModes"
        />
      </div>
      <div id="requests">
        <div>
          <div class="caption">Network Requests</div>
          <DxButton
            id="clear"
            text="Clear"
            @click="clearRequests()"
          />
        </div>
        <ul>
          <li
            v-for="(request, index) in requests"
            :key="index"
          >{{ request }}</li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxSummary,
  DxTotalItem
}  from 'devextreme-vue/data-grid';
import { DxButton } from 'devextreme-vue/button';
import { DxSelectBox } from 'devextreme-vue/select-box';

import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';

export default {
   components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxSummary,
    DxTotalItem,
    DxButton,
    DxSelectBox
  },
    props:['showData'],
  
  data() {
    return {
      //requestInfo,
      ordersData: new CustomStore({
        key: 'OrderID',
        load: () => this.sendRequest(`${URL}/Orders`),
        insert: (values) => this.sendRequest(`${URL}/InsertOrder`, 'POST', {
          values: JSON.stringify(values)
        }),
        update: (key, values) => this.sendRequest(`${URL}/UpdateOrder`, 'PUT', {
          key: key,
          values: JSON.stringify(values)
        }),
        remove: (key) => this.sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
          key: key
        })
      }),
      requests: [],
      refreshMode: 'reshape',
      refreshModes: ['full', 'reshape', 'repaint']
    };
  },
  methods: {
    sendRequest(url, method, data) {
      method = method || 'GET';
      data = data || {};

      this.logRequest(method, url, data);

      const params = Object.keys(data).map((key) => {
        return `${encodeURIComponent(key) }=${ encodeURIComponent(data[key])}`;
      }).join('&');

      if(method === 'GET') {
        return fetch(url, {
          method: method,
          credentials: 'include'
        }).then(result => result.json().then(json => {
          if(result.ok) return json.data;
          throw json.Message;
        }));
      }

      return fetch(url, {
        method: method,
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        credentials: 'include'
      }).then(result => {
        if(result.ok) {
          return result.text().then(text => text && JSON.parse(text));
        } else {
          return result.json().then(json => {
            throw json.Message;
          });
        }
      });
    },
    logRequest(method, url, data) {
      var args = Object.keys(data || {}).map(function(key) {
        return `${key }=${ data[key]}`;
      }).join(' ');

      var time = formatDate(new Date(), 'HH:mm:ss');

      this.requests.unshift([time, method, url.slice(URL.length), args].join(' '));
    },
    clearRequests() {
      this.requests = [];
    }
  },
};
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
