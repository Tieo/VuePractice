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
              ref="dataGrid"
              :data-source="groupData1"
              :show-borders="true"
               @editing-start="editingStart"
                @init-new-row="initNewRow"
                @row-inserting="rowInserting"
                @row-inserted="rowInserted"
                @row-updating="rowUpdating"
                @row-updated="rowUpdated"
                @row-removing="rowRemoving"
                @row-removed="rowRemoved"
                @saving="saving"
                @saved="saved"
                @edit-canceling="editCanceling"
                @edit-canceled="editCanceled"
            >
          <DxEditing
              :refresh-mode="refreshMode"
              :allow-adding="true"
              :allow-updating="true"
              :allow-deleting="true"
              mode="row"
            />
            <DxColumn data-field="id"/>
            <DxColumn data-field="companyName"/>
            <DxColumn data-field="address"/>
            <DxColumn data-field="city"/>
            <DxColumn data-field="state"/>
            <DxColumn data-field="zipCode"/>
            <DxColumn data-field="phone"/>
            <DxColumn data-field="fax"/>
            <DxColumn data-field="webSite"/>

            <DxScrolling mode="virtual"/>
            <DxSummary>
              <DxTotalItem
                column="ID"
                summary-type="count"
              />
              <DxTotalItem
                column="ZIPCODE"
                summary-type="sum"
                value-format="#0.00"
              />
            </DxSummary>
            
          </DxDataGrid>
          <div class="options">
            <div class="caption">Options  
              <DxButton
                id="get"
                text="조회"
                @click="getH2db"
              />
               <DxButton
                id="get2"
                text="조회2"
                @click="get2H2db"
              />
              <DxButton
                id="post"
                text="생성"
                @click="postH2db"
              />
              <DxButton
                id="patch1"
                text="수정1"
                @click="patch1H2db"
              />
              <DxButton
                id="patch3"
                text="수정3"
                @click="patch3H2db"
              />
              <DxButton
                id="delete"
                text="삭제"
                @click="deleteH2db"
              />
            </div>
            <div class="option">
              <span>Refresh Mode: </span>
              <DxSelectBox
                v-model="refreshMode"
                :items="refreshModes"
              />
            </div>
            <div id="requests">
              <div>
                <div class="caption">Network Requests</div>
                <DxButton
                  id="clear"
                  text="Clear"
                  @click="clearRequests"
                />
              </div>
              <ul>
                <li
                  v-for="(request, index) in requests"
                  :key="index"
                >{{ request }}</li>
              </ul>
            </div>
           <div id="events">
              <div>
                <div class="caption">
                  Fired events
                </div>
                <DxButton
                  id="clear"
                  text="Clear"
                  @click="clearEvents"
                />
              </div>
              <ul>
                <li
                  v-for="(event, index) in events"
                  :key="index"
                >{{ event }}</li>
              </ul>
            </div>
             </div>                 
          </b-col>
        </b-card>
      </b-card-group>
    </b-row> 
  </div>
</template>

<script>
import DxTreeView from "devextreme-vue/tree-view";
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
import { formatDate } from 'devextreme/localization';

import CustomStore from 'devextreme/data/custom_store';
import groupName from "./group-name.json";
import axios from 'axios';

export default {
   components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxSummary,
    DxTotalItem,
    DxButton,
    DxSelectBox,
    DxTreeView
  },
  data() {
    return {
      sendingData: {
        headers: { 'Content-Type': 'application/json' },
        "id": "",
        "companyName":"",
        "address": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "phone": "",
        "fax": "",
        "webSite": ""
      },
      // received: [{
      //   "ID": "",
      //   "COMPANYNAME":"",
      //   "ADDRESS": "",
      //   "CITY": "",
      //   "STATE": "",
      //   "ZIPCODE": "",
      //   "PHONE": "",
      //   "FAX": "",
      //   "WEBSITE": ""
      // }],
      events:[],
      groupData1: [],
      groupName,
      URL: 'http://localhost:8081/members/new',
      formData: [{"Welcome!":"Please select Team!"}],
      groupData: new CustomStore({ // 처음에 초기값을 정해준다.
        //key: 'ID',
        load: () => {
          console.log('get')
          return axios.get(this.URL)
          },
        insert: (values) => { 
          console.log(values)
          this.logRequest('post', this.URL+'/'+values.id, values);
          return axios.post(this.URL,
              {
                //"ID": values.id,
                "COMPANYNAME":values.CompanyName,
                "ADDRESS": values.Address,
                "CITY": values.City,
                "STATE": values.State,
                "ZIPCODE": values.Zipcode,
                "PHONE": values.Phone,
                "FAX": values.Fax,
                "WEBSITE": values.Website,
              }).then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
        },
         
        update: (key, values) => {
          console.log(values)
          this.logRequest('patch', this.URL+'/'+key, values);
          return axios.patch(this.URL+'/'+key,
              { 
                //"ID": values.id,
                "CompanyName":values.CompanyName,
                "Address": values.Address,
                "City": values.City,
                "State": values.State,
                "Zipcode": values.Zipcode,
                "Phone": values.Phone,
                "Fax": values.Fax,
                "Website": values.Website,
              }).then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
        },       
        remove: (key) => {
          this.logRequest('delete', this.URL+'/'+key);
          return axios.delete(this.URL+'/'+key, 
        {
          // key: key
        })
        }
      }),
      requests: [],
      refreshMode: 'reshape',
      refreshModes: ['full', 'reshape', 'repaint']
    };
  },
  computed: {
    dataGrid: function() {
      return this.$refs["dataGrid"].instance;
    }
  },
  methods: {
    logEvent(eventName) {
      this.events.unshift(eventName);
    },
    clearEvents() {
      this.events = [];
    },
    editingStart(e) {
      console.log('editingStart', e);
    },
    rowUpdating(e) {
      console.log('RowUpdating', e);
    },
    rowUpdated(e) {
      console.log('RowUpdated', e);
      this.makeData(e.data);
      //this.patch1H2db(this.sendingData);
      this.patch1H2db(e.data);
      //this.patch2H2db(e.data); // RowMapper
  
    },
    rowRemoving(e) {
      console.log('RowRemoving', e);
    },
    rowRemoved(e) {
      console.log('RowRemoved', e);
      this.makeData(e.data);
      console.log(this.sendingData.id);
      // this.deleteH2db(this.sendingData.id);
      this.deleteH2db(e.data.id);
      //this.delete2H2db(e.data.id); // RowMapper
      
    },
    editCanceling(e) {
      console.log('EditCanceling', e);
    },
    editCanceled(e) {
      console.log('EditCanceled', e);
    },
    saving(e){
      console.log('saving',e);
    },
    saved(e){
      console.log('saved', e);
    },
    initNewRow(){
      console.log('initNewRow');
    },
    rowInserting(e){
      console.log('rowInserting', e.data);
      console.log('post!');
      this.sendingData=e.data;
      //this.makeData(e.data);
      this.postH2db(this.sendingData);
      //this.post2H2db(this.sendingData); // RowMapper
      console.log('post! finished');//, this.makeData(e));
    },
    rowInserted(e){
      console.log('rowInserted', e);
      //this.postH2db(this.sendingData);
    },

////////////////////////////////////////////////////////////////////////////

    getH2db(){
      axios.get('http://localhost:8081/members/get')
      .then(
        response => {
          console.log('getH2db!!!!!');
          this.groupData1 = response.data;
          console.log(this.groupData1);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },
    async postH2db(data){
      console.log(data);
      await axios.post('http://localhost:8081/members/post', data)
      // axios.post('http://localhost:8081/members/post', data)
      .then(
        response => {
          console.log('postH2db!!!!!', data);
          this.getH2db();
          console.log('response.config.data', response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },
    async patch1H2db(data){
      await axios.patch('http://localhost:8081/members/patch1', data)
      .then(
        response => {
          console.log('patch1H2db!!!!!');
          this.getH2db();
          console.log(response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },
    patch3H2db(){
      axios.patch('http://localhost:8081/members/patch2')
      .then(
        response => {
          console.log('patch2H2db!!!!!');
          this.getH2db();
          console.log(response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },
    deleteH2db(idData){
      axios.delete('http://localhost:8081/members/delete', {params:{id:idData}})
      .then(
        response => {
          console.log('deleteH2db!!!!!');
          this.getH2db();
          console.log(response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },

///////////////////////////////////////////////////////////////////////////////
    async get2H2db(){
      await axios.get('http://localhost:8081/members/getrowmapping')
      .then(
        response => {
          console.log('get2H2db!!!!!', response.data);
          //this.groupData1 = this.receivedData(response.data);
          this.groupData1=response.data;
          console.log(this.groupData1);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
      });
    },
    async post2H2db(data){
      console.log(data);
      await axios.post('http://localhost:8081/members/postrowmapping', data)
      // axios.post('http://localhost:8081/members/post', data)
      .then(
        response => {
          console.log('postH2db!!!!!', data);
          this.getH2db();
          console.log('response.config.data', response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },
    async patch2H2db(data){
      await axios.patch('http://localhost:8081/members/patchrowmapping', data)
      .then(
        response => {
          console.log('patch1H2db!!!!!');
          this.getH2db();
          console.log(response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },
    delete2H2db(idData){
      axios.delete('http://localhost:8081/members/deleterowmapping', {params:{id:idData}})
      .then(
        response => {
          console.log('deleteH2db!!!!!');
          this.getH2db();
          console.log(response.config.data);
        })
        .catch(function (error) {    // 응답(실패)
          console.log(error);
        })
        .then(function () { // 응답(항상 실행)
      });
    },

///////////////////////////////////////////////////////////////////////////////

    makeData(rawData){
      console.log(rawData, 'rawData');
      this.sendingData.id=rawData.ID;
      this.sendingData.companyName=rawData.COMPANYNAME;
      this.sendingData.city=rawData.CITY;
      this.sendingData.state=rawData.STATE;
      this.sendingData.address=rawData.ADDRESS;
      this.sendingData.zipCode=rawData.ZIPCODE;
      this.sendingData.fax=rawData.FAX;
      this.sendingData.phone=rawData.PHONE;
      this.sendingData.webSite=rawData.WEBSITE;
    },
    // receivedData(rawData){
    //   console.log(rawData[0], 'rawData');
    //   this.received[0].ID=rawData[0].id;
    //   this.received[0].COMPANYNAME=rawData[0].companyName;
    //   this.received[0].ADDRESS=rawData[0].address;
    //   this.received[0].CITY=rawData[0].city;
    //   this.received[0].STATE=rawData[0].state;
    //   this.received[0].ZIPCODE=rawData[0].zipCode;
    //   this.received[0].FAX=rawData[0].fax;
    //   this.received[0].PHONE=rawData[0].phone;
    //   this.received[0].WEBSITE=rawData[0].webSite;
    //   // this.received = rawData;
    //   // console.log(rawData);
    //   return this.received;
    // },

    selectItem(e) {
      this.currentItemName = e.itemData.id;
      this.currentItemName = 'members/new';
      this.URL = 'http://localhost:8081/'+this.currentItemName;
      //여기서 다시 groupData를 선언하면 여기서 만들어진 결과로 위에 올려주게 됨. 
      this.dataGrid.refresh();
    },

    logRequest(method, url, data) {
      var args = Object.keys(data || {}).map(function(key) {
        
        return `${key }=${ data[key]}`;
      }).join(' ');
      
      var time = formatDate(new Date(), 'HH:mm:ss');

      this.requests.unshift([time, method, url, args].join(' '));
    },

    clearRequests() {
      console.log('clear');
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




