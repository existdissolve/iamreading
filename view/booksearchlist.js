IAR.ui.BookSearchList = Ext.extend(Ext.Panel,{
	fullscreen: true,
	layout: "card",
	initComponent: function(){
		this.booksearchlistnav = new Ext.Toolbar({
			dock : 	'top',
			title:	"Search Results",
			items: 	[
				// back button for search panel
				{
					xtype: 	"button",
					text: 	"Back",
					id:		"searchbackbutton",
					handler: function() {
						Ext.getCmp("bookspanel").setActiveItem(0,"slide");
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
					id:		"searchfield_2",
					autoComplete: true,
					listeners: {
						"action": function() {
							SearchBook(2);
						}		
					}
				},
				{
					xtype: 		"button",
					iconCls: 	"search",
					iconMask: 	true,
					ui: 		'plain',
					id:			"searchsearchbutton_2",
					handler: function() {
						SearchBook(2);
					}	
				},
				{
					xtype: 		"button",
					hidden: 	true,
					ui: 		'plain',
					iconCls: 	"refresh",
					iconMask: 	true,
					id:			"searchmorebutton_2",
					handler: function() {
						GetMoreSearchResults();
					}
				}
			]
		});
		this.dockedItems = [this.booksearchlistnav,this.searchnav];
		this.items = [
			{
				xtype:	"list",
				id:		"booksearchlist",
				store: 	booksearchstore,
				itemTpl: "<div class='smthumb'><img src='{tbUrl}' /></div>{title}",			
				emptyText: "<p class='emptytext'>No search results...try searching for something :)</p>",
				deferEmptyText: false,
				listeners: {
					"selectionchange": function(selmodel,records) {
						if(records.length) {
							Ext.getCmp("booksearchdetail").update(records[0].data);
							Ext.getCmp("bookspanel").setActiveItem(3,"flip");
						}
					}	
				}
			}
		];	
		this.listeners = {
			"activate": function() {
				Ext.getCmp("booksearchlist").selModel.deselectAll();
			}
		}
		IAR.ui.BookSearchList.superclass.initComponent.call(this);
	}
});