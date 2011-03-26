IAR.model.Book = Ext.regModel("Book", {
	idProperty: "id",
	fields: 	["id","bookId","authors","title",{name:"pageCount",type:"int"},"publishedYear",{name:"category_id",type:"int"},"tbUrl"],
	proxy: 	{
		type: "localstorage",
		id: "booksmodel"
	}
});
var booksstore = new Ext.data.Store({
	model: 	"Book",
	id:		"booksstore",
	sorters: [{property:'title',direction:'ASC'}],
	autoLoad: true,
	getGroupString : function(record) {
		return record.get('title')[0];
	},
    associations: [
        {type: 'belongsTo', model: 'Category'}
    ]
});