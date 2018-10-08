<template>
<div class="container">
  <div class="header">
    <p>
      <span>Weekly Timesheet</span>
      <span class="period-select">
        <select v-model="selected">
          <option disabled value="">请选择</option>
          <option>上半月</option>
          <option>下半月</option>
        </select>
      </span>
      <span class="period-select">
        <select v-model="selectedMonth">
          <option disabled value="">请选择</option>
          <option v-for="(month,index) in monthScheme" :key="index" 
          :value="month">{{(month + 1) + '月'}}</option>
        </select>
      </span>
    </p>
    <p style="margin-top: 20px;">Project</p>
  </div>
  <div class="main">
    <div>
      <p class="project-row" v-for="(timesheet,index) in timesheets" :key="index">
        <span class="project-name">{{timesheet.ProjectName}}</span>
        <span v-for="(unit,unitIndex) in timesheet.units" :key="unitIndex">
          <input type="number" v-model="timesheets[index].units[unitIndex].unit" />
        </span>
        <span>{{totalTime(timesheet.units)}}</span>
      </p>
    </div>
  </div>
  <div class="footer">
    <p class="button" style="background-color:#67D9D4;color: white;" @click="save()">Save</p>
    <p class="button" style="background-color:#EFEFEF;color: #AFAFAF;margin-left: 15px;">Submit</p>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import httpClient from '../../../store/common/httpClient'
const qs = require('qs');
export default {
  name: 'TaskList',
  components: {
  },
  data () {
    return {
      selectedMonth: 0,
      monthScheme: [],
      selected: '上半月',
      timesheets : [{
        project: 0,
        ProjectName: 'Inhouse Onboarding',
        units: []
      },{
        project: 1,
        ProjectName: 'Company',
        units: []
      },{
        project: 2,
        ProjectName: 'Pet Project',
        units: []
      },{
        project: 3,
        ProjectName: 'Bucket List Tool',
        units: []
      }]
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    initTimesheets () {
      let start = 1
      let end = 15
      if (this.selected == '下半月') {
        start = 16
        end = 31
      }
      for (let i = 0; i < this.timesheets.length; i++) {
        let result = []
        for (let i = start; i <= end; i++) {
          result.push({
            date: i,
            unit: 0
          })
        }
        this.timesheets[i].units = result
      }
    },
    totalTime (units) {
      let result = 0
      for (let i = 0; i < units.length; i++) {
        result += (!units[i].unit || isNaN(units[i].unit)) ? 0 : parseInt(units[i].unit)
      }
      return result
    },
    save () {
      console.log(this.selectedMonth)
      let date = new Date()
      let month = this.selectedMonth + 1
      for (let i = 0; i < this.timesheets.length; i++) {
        this.timesheets[i].userId = '1'
        this.timesheets[i].cycle = date.getFullYear() + 
        (month >= 10 ? month : ('0' + month)) + (this.selected == '下半月' ? '02' : '01')
        for (let j = 0; j < this.timesheets[i].units.length; j++) {
          this.timesheets[i].units[j].date =  date.getFullYear() + 
          (month >= 10 ? month : ('0' + month)) + 
          (this.timesheets[i].units[j].date >= 10 ? this.timesheets[i].units[j].date :('0' + this.timesheets[i].units[j].date) )
        }
      }
      httpClient.post('/timesheet/save', this.timesheets).then(response => {
        console.log(response)
      })
    }
  },
  watch: {
    selected (val, oldVal) {
      this.initTimesheets()
    }
  },
  beforeMount () {
    this.initTimesheets()
    for (let i = 0; i < 12; i++) {
      this.monthScheme.push(i)
    }
    this.selectedMonth = new Date().getMonth()
  }
}
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
