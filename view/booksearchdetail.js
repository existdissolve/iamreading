IAR.ui.BookSearchDetail = Ext.extend(Ext.Panel, {
	id: 		"booksearchdetail",
	fullscreen: true,
	scroll: 	"vertical",
	styleHtmlContent: true,
	initComponent: function() {
		this.booksearchdetaillistnav = new Ext.Toolbar({
			dock : 	'top',
			title:	"Book Details",
			items: 	[
				{
					xtype: 	"button",
					text: 	"Back",
					id:		"searchdetailsbackbutton",
					handler: function() {
						Ext.getCmp("bookspanel").setActiveItem(2,"flip");
					}
				},
				{xtype: 'spacer'},
				{
					iconCls: 	"add_black",
					iconMask: 	true,
					ui: 		'plain',
					id:			"searchaddbutton",
					handler: 	function(){
						Ext.getCmp("bookspanel").addbook();
					}
				}
			]
		});
		this.dockedItems = [this.booksearchdetaillistnav];
		this.tpl = 	'<tpl for="."><div class="bookdetail"><img class="mainimage" src="{[values.tbUrl.replace("zoom=5","zoom=1")]}" />' +
					'<h1>{title}</h1><h2>By: {authors}</h2><h3>{pageCount} pages</h3></div></tpl>';
		IAR.ui.BookSearchDetail.superclass.initComponent.call(this);
	}
});