IAR.ui.CategoryForm = Ext.extend(Ext.Panel,{
	fullscreen: true,
	scroll: 	"vertical",
	layout: 	"card",
	id:			"categoryformpanel",
	initComponent: function() {
		this.categoryformnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Add/Edit",
			items: 	[
				{
					text: 	"Back",
					id:		"categoryformbackbutton",
					handler: function() {
						Ext.getCmp("categorypanel").setActiveItem(0,"flip");
					}
				}, 
				{xtype: 'spacer'},
				{
					xtype: 	'button',
					text:	'Save',
					ui: 	"confirm",
					id:		"categorysavebutton",
					listeners: {
						tap: function() {
							var form = Ext.getCmp("categoryform");
							var f = form.items.items[0].items;
							if(f.items[0].getValue()=="") {
								var win = new Ext.MessageBox();
								win.alert("Hey!","Please enter a category name!");
								return false;
							}
							if(f.items[2].getValue()!="") {
								Ext.getCmp("categorypanel").savecategory(f);
							}
							else {
								Ext.getCmp("categorypanel").addcategory(f);
							}
						}
					}
				}		
			]
		});
		this.dockedItems = [this.categoryformnav];
		this.items = [
			{
				xtype: "form",
				id: "categoryform",
				fullscreen: true,
				scroll: "vertical",
				items: [
					{
						xtype: "fieldset",
						items: [
							{
								xtype: 'textfield',
								name : 'category',
								label: 'Name'
							},
							{
								xtype: "hiddenfield",
								name:  "oldtitle"
							},
							{
								xtype:	"hiddenfield",
								name:	"id"
							}
						]
					}
				],
				submitOnAction: false
			}
		];
		IAR.ui.CategoryForm.superclass.initComponent.call(this);
	}
});