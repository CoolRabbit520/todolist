<template>
<div id="app">
<h2>Todolist-vue</h2>
<input id="addinput" v-model="newItem" @keyup.enter="addNewItem"  placeholder="do what?" />

<ul>
  <li v-for="(item, index) in items">
    <h3 @mouseenter="itemEnter(item)" @mouseleave="itemLeave(item)"  >
      <input type="checkbox" @click="itemClick(item)" :checked="item.checked">
      <p class='item-label' :class="{'line-through':item.checked}">{{index+1}}.{{item.label}}</p>
      <p class='item-status'  v-if="item.checked">finished</p>
      <p class='item-delete' v-if="item.showDelete" @click="deleteItem(index)">Delete</p>
    </h3>
  </li>

</ul>
</div>

</template>

<script>
import Store from './store'
//console.log(Store)
export default {
  data(){
    return {
        items:Store.fetch(),
        newItem:''//打通input的标签
    }
  },

  methods:{
    addNewItem(){
      this.items.push({
        label:this.newItem,
        checked:false,
        showDelete:false
      })
      this.newItem=''
    },
    itemEnter(item){
      item.showDelete=!item.showDelete      
    },
    itemLeave(item){
      item.showDelete=!item.showDelete
    },
    itemClick(item){
      item.checked=!item.checked
    },
    deleteItem(index){
      this.items.splice(index,1)
    },

  watch:{
    items:{
      handler:function(val){
        Store.save(val)
      },
      deep:true
    }
  }
  }
 
}
</script>

<style>
body{
  font-style: sans-serif;
}
ul{list-style: none;}
li{height:30px;}
#app{
  width: 800px;
  margin: 30px auto;
}
#addinput{
  width: 650px;
  height: 35px;
  padding: 0 5px;
}
.item-delete{
  display: inline;
  color: gray;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}
.item-status{
  display: inline;
  color: white;
  background-color:red;
  font-size: 12px;
  padding: 0 5px;
}
.item-label{
  display: inline;

}
.line-through{text-decoration: line-through;}
</style>
