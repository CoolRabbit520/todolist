const STORAGE_KEY='todolist'
export default{
	save:function(items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items));

	},
	fetch:function(){
		return JSON.parse( window.localStorage.getItem(STORAGE_KEY)||'[]')
	}
}