IAR.ui.BookCard = Ext.extend(Ext.Panel,{
	iconCls: 	"bookmarks",
	title:		"My Books",
	id:			"bookspanel",
	layout:		{type:"card"},
	fullscreen: true,
	cardSwitchAnimation: "slide",
	initComponent:	function() {	
		this.items = [
			new IAR.ui.BookList(),
			new IAR.ui.BookDetail(),
			new IAR.ui.BookSearchList(),
			new IAR.ui.BookSearchDetail()
		];
		IAR.ui.BookCard.superclass.initComponent.call(this);
	},
	addbook: 	function() {
		var data 	= Ext.getCmp("booksearchdetail").data;
		var books = Ext.StoreMgr.getByKey("booksstore");
		var bl = Ext.getCmp("bookslist");
		if(books.find("bookId",data.bookId)==-1) {
			var newbook = books.add({
				bookId: 		data.bookId,
				title:			data.title,
				authors:		data.authors,
				publishedYear:	data.publishedYear,
				pageCount:		data.pageCount,
				tbUrl:			data.tbUrl,
				category_id:	1
			});
			books.sync();
			books.load(function(){
				bl.refresh();
				Ext.getCmp("goalpanel").checkgoals();
			});
			Ext.getCmp("booksdetail").update(newbook[0].data);
			Ext.getCmp("bookseditbutton").show();
			Ext.getCmp("bookspanel").setActiveItem(1,"flip");
			Ext.getCmp("bookspanel").changecategory(newbook[0].data.id,newbook[0].data.category_id,"Book added!");
		}
		else {
			var win = new Ext.MessageBox();	
			win.alert('Um...',"You've already added this book...why not choose a different one? :)", Ext.emptyFn);
		}
	},
	deletebooks: function(list) {
		var books = Ext.StoreMgr.getByKey("booksstore");
		if(list.length) {
			for(var i=0;i<list.length;i++) {
				var record = books.findRecord("bookId",list[i]);
				books.remove(record);
			}
			books.sync();
			if(books.getCount()==0) {
				Ext.getCmp("bookseditbutton").hide();	
			}
			Ext.getCmp("goalpanel").checkgoals()
		}
	},
	confirmbook: function(record) {
		var db = this;
		var win = new Ext.MessageBox();
		FB.getLoginStatus(function(response) {
			if(response.session && ls.fbpost=="true") {
				win.confirm("Book Added", record.title + " was added successfully!<br /><br />You wanna post to Facebook?", function(btn) {
					if(btn=='yes') {
						db.socialpost(record.title);
					}
				});
			} 
			else {
				win.alert('Book Added',record.title + " was added successfully!", Ext.emptyFn);
			}
		});			
	},
	socialpost: function(title) {
		var win = new Ext.MessageBox();
		var msg = "I just finished reading "+title+"...it was pretty much awesome :)";
		win.prompt(
		   'Post to Facebook',
		   'Tell your friends about your book!',
		   function(btn,txt) {
				if(btn=="ok") {
					FB.api('/me/feed', 'post', {message:txt}, function(response) {
						if (!response || response.error) {
							var wina = new Ext.MessageBox();
							wina.alert("Oh-nos!","Hmm...something didn't quite work right with that. Please try again later",Ext.emptyFn);
						} 
						else {
							var wina = new Ext.MessageBox();
							wina.alert("Success","There. Now all your friends know :)",Ext.emptyFn);
						}
					});	
				}
		   },
		   null,
		   true,
		   msg,
		   {maxlength:300}		  
		);	
	},
	changecategory: function(bookid,category,title) {	
		var pdata = [];
		var cstore = Ext.StoreMgr.getByKey("categorystore");
		for(var i=0;i<cstore.getCount();i++) {
			var data = cstore.getAt(i).data;
			var dataitem = {text:data.category,value:data.id};
			pdata.push(dataitem);
		}
		var picker = new Ext.Picker({
			slots: [
				{
					id:		"book_category",
					name : 	'book_category',
					title: 	'Category',
					data:	pdata
				}
			],
			listeners: {
				"hide": function() {
					var category = this.getValue()["book_category"];		
					Ext.getCmp("bookspanel").savecategory(bookid,category);	
					this.destroy();
				}
			}
		});
		picker.show();
	},
	savecategory: function(bookid,category) {
		var books = Ext.StoreMgr.getByKey("booksstore");
		var book = books.getAt(books.find("id",bookid));
		book.set("category_id",category);
		books.sync();
		book = books.getAt(books.find("id",bookid));
		Ext.getCmp("booksdetail").update(book.data);
		Ext.getCmp("goalpanel").checkgoals();
	}
});