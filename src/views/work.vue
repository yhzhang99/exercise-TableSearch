<template>
  <div class="work-page">
    <a-page-header title="列表"></a-page-header>

    <a-card :bordered="false" style="margin-bottom: 20px">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="2">
          <a-input
            style="width: 120px"
            v-model="inputNum"
            placeholder="input"
          />
        </a-col>

        <a-col :span="2">
          <a-select
            style="width: 120px"
            @change="selectHandleChange"
            placeholder="select"
          >
            <a-select-option v-for="i in 10" :key="i" :value="i">
              {{ i }}
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="4">
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="multipleSelect"
            @change="multipleSelectHandleChange"
          >
            <a-select-option v-for="i in 10" :key="i">
              {{ i }}
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="6">
          <a-range-picker @change="datePickerOnChange" />
        </a-col>

        <a-col :span="4">
          <a-radio-group v-model="value" @change="radioOnChange">
            <a-radio style="float: left" v-for="i in 10" :key="i" :value="i">
              {{ i }}
            </a-radio>
          </a-radio-group>
        </a-col>

        <a-col :span="4">
          <a-checkbox-group @change="checkboxOnChange">
            <a-checkbox
              style="float: left; padding-left: 8px; margin: 0"
              v-for="i in 10"
              :key="i"
              :value="i"
            >
              {{ i }}
            </a-checkbox>
          </a-checkbox-group>
        </a-col>

        <a-col :span="2">
          <a-button type="primary" @click="screenData"> 搜索 </a-button>
          <a-button type="primary" @click="addData" style="margin: 10px">
            添加
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false">
      <a-table :columns="columns" :data-source="filterData" bordered>
        <template
          v-for="col in [
            'input',
            'select',
            'multipleSelect',
            'datePicker',
            'radio',
            'checkbox',
          ]"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="
                (e) => tableHandleChange(e.target.value, record.key, col)
              "
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)" style="padding: 8px">Save</a>
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="() => cancel(record.key)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
                >Edit</a
              >
            </span>
            <a-popconfirm
              v-if="data.length"
              title="Sure to delete?"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;" style="padding: 8px">Delete</a>
            </a-popconfirm>
            <a href="javascript:;" @click="() => checkData(record.key)"
              >check</a
            >
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<style lang="scss" scoped>
.work-page {
  padding: 0 20px;
  background: #eee;
  height: 100vh;
}
</style>

<script>
import { dataSource } from './constants';
const columns = [
  {
    title: 'input',
    dataIndex: 'input',
    width: '14%',
    scopedSlots: { customRender: 'input' },
    sorter: (a, b) => a.input - b.input,
  },
  {
    title: 'select',
    dataIndex: 'select',
    width: '14%',
    scopedSlots: { customRender: 'select' },
    sorter: (a, b) => a.select - b.select,
  },
  {
    title: 'multipleSelect',
    dataIndex: 'multipleSelect',
    width: '14%',
    scopedSlots: { customRender: 'multipleSelect' },
    sorter: (a, b) => a.multipleSelect - b.multipleSelect,
  },
  {
    title: 'datePicker',
    dataIndex: 'datePicker',
    width: '14%',
    scopedSlots: { customRender: 'datePicker' },
    sorter: (a, b) => new Date(a.datePicker) - new Date(b.datePicker),
  },
  {
    title: 'radio',
    dataIndex: 'radio',
    width: '14%',
    scopedSlots: { customRender: 'radio' },
    sorter: (a, b) => a.radio - b.radio,
  },
  {
    title: 'checkbox',
    dataIndex: 'checkbox',
    scopedSlots: { customRender: 'checkbox' },
    sorter: (a, b) => a.checkbox - b.checkbox,
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = dataSource;
var filterData = dataSource;

import {
  Card,
  PageHeader,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  Table,
  Popconfirm,
  Col,
  Row,
  message,
} from 'ant-design-vue';
import Vue from 'vue';

Vue.use(Card)
  .use(Input)
  .use(Select)
  .use(PageHeader)
  .use(DatePicker)
  .use(Radio)
  .use(Checkbox)
  .use(Button)
  .use(Table)
  .use(Popconfirm)
  .use(Col)
  .use(Row)
  .use(message);

Vue.prototype.$message = message;

export default {
  name: 'Work',
  data() {
    this.cacheData = filterData.map((item) => ({ ...item }));
    return {
      data,
      filterData,
      dataSource,
      columns,
      editingKey: '',
      value: '',
      inputNum: '',
      selectNum: '',
      multipleSelectNum: [],
      datePickerDate: [],
      radioNum: '',
      checkedNum: [],
    };
  },
  methods: {
    screenData() {
      this.filterData = this.data;
      if (this.inputNum) {
        this.filterData = this.data.filter(
          (item) => item.input === parseInt(this.inputNum)
        );
      }
      if (this.selectNum) {
        this.filterData = this.filterData.filter(
          (item) => item.select === this.selectNum
        );
      }
      if (this.multipleSelectNum[0]) {
        this.filterData = this.filterData.filter((item) =>
          this.multipleSelectNum.find(
            (element) => element === item.multipleSelect
          )
        );
      }
      if (this.datePickerDate[0]) {
        this.filterData = this.filterData.filter((item) =>
          this.isDuringDate(
            item.datePicker,
            this.datePickerDate[0],
            this.datePickerDate[1]
          )
        );
      }
      if (this.radioNum) {
        this.filterData = this.filterData.filter(
          (item) => item.radio === this.radioNum
        );
      }
      if (this.checkedNum[0]) {
        this.filterData = this.filterData.filter((item) =>
          this.checkedNum.find((element) => element === item.checkbox)
        );
      }

      return filterData;
    },
    addData() {
      this.filterData.unshift({
        key:
          Math.max.apply(
            Math,
            this.filterData.map((item) => {
              return item.key;
            })
          ) + 1,
        input: Math.floor(Math.random() * 11),
        select: Math.floor(Math.random() * 11),
        multipleSelect: Math.floor(Math.random() * 11),
        datePicker: `2021-8-${Math.floor(Math.random() * (11 - 1) + 1)}`,
        radio: Math.floor(Math.random() * 11),
        checkbox: Math.floor(Math.random() * 11),
      });
      // this.cacheData = this.filterData.map((item) => ({ ...item }));
    },
    isDuringDate(targetDateStr, beginDateStr, endDateStr) {
      var targetDate = new Date(targetDateStr),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);
      if (targetDate >= beginDate && targetDate <= endDate) {
        return true;
      }
      return false;
    },
    selectHandleChange(value) {
      this.selectNum = value; // num
    },
    multipleSelectHandleChange(value) {
      this.multipleSelectNum = value;
    },
    datePickerOnChange(date, dateString) {
      this.datePickerDate = dateString;
    },
    radioOnChange(e) {
      this.radioNum = e.target.value; // num
    },
    checkboxOnChange(checkedValues) {
      this.checkedNum = checkedValues; // 数组
    },
    tableHandleChange(value, key, column) {
      const newData = [...this.filterData];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.filterData = newData;
      }
    },
    edit(key) {
      const newData = [...this.filterData];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.filterData = newData;
      }
    },
    save(key) {
      const newData = [...this.filterData];
      // this.cacheData = this.filterData.map((item) => ({ ...item }));
      // const newCacheData = [...this.cacheData];
      const newCacheData = [...this.filterData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.filterData = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.filterData];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.filterData = newData;
      }
    },
    onDelete(key) {
      const data = [...this.filterData];
      this.filterData = data.filter((item) => item.key !== key);
      this.$message.success('删除成功');
    },
    checkData(key) {
      console.log(this.filterData.filter((item) => key === item.key)[0]);
      let data = this.filterData.filter((item) => key === item.key)[0];
      let input = JSON.stringify(data.input);
      let select = JSON.stringify(data.select);
      // let multipleSelect = JSON.stringify(data.multipleSelect);
      // let datePicker = JSON.stringify(data.datePicker);
      // let radio = JSON.stringify(data.radio);
      // let checkbox = JSON.stringify(data.checkbox);
      this.$message.success('input: ' + input + ' select: ' + select, 10);
    },
  },
};
</script>
