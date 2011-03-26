IAR.model.Category = Ext.regModel("Category", {
	idProperty: "id",
	fields: 	["id","category"],
	proxy: 	{
		type: "localstorage",
		id: "categorymodel"
	}
});
var categorystore = new Ext.data.Store({
	model: 	"Category",
	id:		"categorystore",
	sorters:"title",
	sorters: [{property:'category',direction:'ASC'}],
	autoLoad: true,
	getGroupString : function(record) {
		return record.get('category')[0];
	},
	listeners: {
		"load": function(store,records,success) {
			if(store.find("id",1)==-1) {
				store.add({category:"Uncategorized"});
				store.sync();
			}
		}
	}
});