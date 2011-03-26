IAR.ui.BookList = Ext.extend(Ext.Panel,{
	fullscreen: true,
	id:	"bookslistpanel",
	layout: "card",
	initComponent:	function() {
		this.booklistnav = new Ext.Toolbar({
			dock : 	'top',
			title:	"My Books",
			items: 	[
				{
					xtype: 	"button",
					text: 	"Edit",
					hidden: Ext.StoreMgr.getByKey("booksstore").getCount()==0 ? true : false,
					id: 	"bookseditbutton",
					handler: function() {
						if(this.text=="Edit") {
							this.setText("Save");
							// lock list so items can't be selected while editing
							Ext.getCmp("bookslist").selModel.setLocked(true);
							Ext.each(Ext.get(Ext.DomQuery.select('#bookslist .slider')).elements,function(rec,i){
								var chkbox = rec.previousSibling;
								Ext.get(rec).setStyle("-webkit-transform","translate(30px,0px)");
								Ext.get(chkbox).setStyle("opacity","1");
								chkbox.style.display = 'inline';
							}); 
						}
						else if(this.text=="Save") {
							this.setText("Edit");	
							var deletelist = [];
							// unlock list now that editing is done
							Ext.getCmp("bookslist").selModel.setLocked(false);
							Ext.each(Ext.get(Ext.DomQuery.select('#bookslist .slider')).elements,function(rec,i){
								var chkbox = rec.previousSibling;
								Ext.get(chkbox).setStyle("opacity","0");
								Ext.get(rec).setStyle("-webkit-transform","translate(0px,0px)");
							}); 
							Ext.each(Ext.get(Ext.DomQuery.select('#bookslist .checkbox')).elements,function(rec,i){
								if(Ext.get(rec).dom.checked) {
									var li = Ext.getCmp("bookslist").getNode(i);
									//Ext.Anim.run(Ext.get(li),"fade",{autoClear:false});
									deletelist.push(rec.value);
								}
							});
							// if there are books to delete, fire deletebooks()
							if(deletelist.length) {
								Ext.getCmp("bookspanel").deletebooks(deletelist);	
							}
						}
					}
				},
				{xtype: 'spacer'},
				// stats button
				{
					xtype:		"button",
					iconCls: 	"chart2",
					iconMask: 	true,
					ui: 		'plain',
					id:			"booksstatsbutton",
					handler: function(){
						var win = new Ext.MessageBox();
						var books = Ext.StoreMgr.getByKey("booksstore");
						var totalbooks = books.getCount();
						var totalpages = books.sum("pageCount");
						if(totalbooks!=0&&totalpages!=0) {
							win.alert('Book Stats', "<strong>Total Books:</strong>" + totalbooks + "<br /><strong>Total Pages:</strong>" + totalpages+ "<br /><br /><strong>GREAT JOB!</strong>", Ext.emptyFn);	
						}
						else {
							win.alert('Book Stats', "Hmm...nothing yet. But no biggie--go find a book and get started!", Ext.emptyFn);	
						}
					}
				}
			]
		});
		this.searchnav = new Ext.Toolbar({
			dock : 	'top',
			ui: 	"charcoal",
			items: 	[
				{
					xtype: 	'searchfield',
					name : 	'Book',
					id:		"searchfield_1",
					autoComplete: true,
					listeners: {
						"action": function() {
							SearchBook(1)
						}	
					}
				},
				{
					xtype: 		"button",
					iconCls: 	"search",
					iconMask: 	true,
					ui: 		'plain',
					id:			"searchsearchbutton_1",
					handler: function() {
						SearchBook(1);
					}	
				},
				{
					xtype: 		"button",
					hidden: 	true,
					ui: 		'plain',
					iconCls: 	"refresh",
					iconMask: 	true,
					id:			"searchmorebutton_1",
					handler: function() {
						GetMoreSearchResults();
					}
				}
			]
		});
		this.dockedItems = [this.booklistnav,this.searchnav];
		this.items = [
			{
				xtype: 		"list",
				id:			"bookslist",
				ui:			"charcoal",
				grouped: 	true,
				store:		Ext.StoreMgr.getByKey("booksstore"),
				itemTpl: 	new Ext.XTemplate(
					"<input type='checkbox' class='checkbox' value='{bookId}' /><div class='slider'><div class='smthumb'><img src='{tbUrl}' /></div><div class='booktitle'>{title}</div></div>"
				),
				emptyText: "<p class='emptytext'>You haven't read any books yet...get busy!</p>",
				deferEmptyText: false,
				listeners: {
					"selectionchange": function(selmodel,records) {
						if(records.length) {
							Ext.getCmp("booksdetail").update(records[0].data);
							Ext.getCmp("bookspanel").setActiveItem(1,"flip");
						}
					}					
				}
			}
		];
		this.listeners = {
			"activate": function() {
				Ext.getCmp("bookslist").selModel.deselectAll();	
			}
		};
		IAR.ui.BookList.superclass.initComponent.call(this);
	}
});