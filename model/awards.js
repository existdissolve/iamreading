IAR.model.Award = Ext.regModel("Award",{
	idProperty: "id",
	fields: ["id","goalid","title","completetext",{name:"category_id",type:"int"},{name:"threshold",type:"int"},"type","imageurl"],
	proxy: {
		type: "localstorage",
		id:	  "awardsmodel"
	}
});

var awardstore = new Ext.data.Store({
	model: 	"Award",
	id:		"awardstore",
	autoLoad: true,
	getGroupString : function(record) {
		return record.get('title')[0];
	}
});