IAR.model.BookSearch = Ext.regModel("BookSearch", {
	idProperty: "id",
	fields: 	["id","bookId","authors","title",{name:"pageCount",type:"int"},"publishedYear","tbUrl","category"]
});
var booksearchstore = new Ext.data.Store({
	model: 	"BookSearch",
	id:		"booksearchstore",
	getGroupString : function(record) {
		return record.get('title')[0];
	}
});