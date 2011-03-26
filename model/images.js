IAR.model.Images = Ext.regModel("Images",{
	idProperty: "title",
	fields: ["title","url"]			 
});
var imagestore = new Ext.data.Store({
	model: 	'Images',
	root: 	"results",
	id:		"imagestore"
});