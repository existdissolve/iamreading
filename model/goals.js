IAR.model.Goal = Ext.regModel("Goal",{
	idProperty: "id",
	fields: ["id","title","description",{name:"threshold",type:"int"},"type","completetext",{name:"category_id",type:"int"},"hasseen","imageurl"],
	proxy: {
		type: "localstorage",
		id:	  "goalsmodel"
	}
});

var goalstore = new Ext.data.Store({
	model: 	"Goal",
	id:		"goalstore",
	autoLoad: true,
	getGroupString : function(record) {
		return record.get('title')[0];
	}
});