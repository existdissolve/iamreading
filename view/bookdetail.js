IAR.ui.BookDetail = Ext.extend(Ext.Panel,{
	id: "booksdetail",
	fullscreen: true,
	scroll: "vertical",
	styleHtmlContent: true,
	initComponent: function() {
		this.bookdetaillistnav = new Ext.Toolbar({
			dock : 	'top',
			title:	"Book Details",
			items: 	[
				{
					xtype: 	"button",
					text: 	"Back",
					id:		"bookdetailsbackbutton",
					handler: function() {
						Ext.getCmp("bookspanel").setActiveItem(0,"flip");
					}
				},	
				{xtype: 'spacer'},
				{
					xtype: 		"button",
					id: 		"facebookbutton",
					iconCls: 	"user_add",
					iconMask: 	true,
					ui: 		'plain',
					hidden: 	isfbloggedin ? false : true,
					handler: function() {
						var title = Ext.getCmp("booksdetail").data.title;
						Ext.getCmp("bookspanel").socialpost(title)
					}
				}
			]
		});
		this.dockedItems = [this.bookdetaillistnav];
		this.tpl = 	new Ext.XTemplate(
			'<tpl for=".">',
				'<h1>{title}</h1>',
				'<div class="bookdetail">',
					'<img class="mainimage" src="{[values.tbUrl.replace("zoom=5","zoom=1")]}" />',
					'<h2>By: {authors}</h2>',
					'<h3>{pageCount} pages</h3>',
					'<h3><strong>Category:</strong> ',
						'<a href="javascript:void(0);" onclick="Ext.getCmp(\'bookspanel\').changecategory({id},{category_id});">{[this.getcategory(values.category_id)]}</a>',
					'</h3>',
				'</div>',
			'</tpl>',
			{
				getcategory: function(catid){						   
					var categories = Ext.StoreMgr.getByKey("categorystore");
					var categorymatch = categories.find("id",catid);
					if(categorymatch!=-1) {
						return categories.getAt(categorymatch).data.category;
					}
					else {
						return "Uncategorized";	
					}
				}
			}
		);
		IAR.ui.BookDetail.superclass.initComponent.call(this);
	}
});
			
			