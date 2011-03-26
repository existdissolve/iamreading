IAR.ui.GoalSearchList = Ext.extend(Ext.Panel,{
	id: 	"imagepanel",
	fullscreen:true,
	layout: "card",
	initComponent: function() {
		this.items = [
			{
				xtype: 	"list",
				id:		"imageview",
				store: 	imagestore,
				itemTpl: "<tpl for='.'><div class='smathumb'><img src='{tbUrl}' /></div></tpl>",
				itemSelector: "div.smathumb",
				emptyText: "<p class='emptytext'>No search results...try searching for something :)</p>",
				deferEmptyText: false,
				listeners: {
					"itemtap": function(dv,index,item,e){
						var data = dv.store.getAt(index).data;
						var sf = Ext.getCmp("imagesearchvalue");
						sf.setValue(data.tbUrl);
						Ext.getCmp("goalpanel").setActiveItem(2,"flip");
					}
				}	
			}
		];
		this.dockedItems = [
			{
				xtype: 	"toolbar",
				dock:	"top",
				title:	"Find Image",
				items:	[
					{
						text: 	"Cancel",
						id:		"imagecancelbutton",
						handler: function() {
							Ext.getCmp("goalpanel").setActiveItem(2,"flip");
						}
					}	 
				]
			},
			{
				xtype: 	"toolbar",
				dock : 	'top',
				ui: 	"charcoal",
				items: 	[
					{
						xtype: 	"searchfield",
						name:	'imagesearch',
						id:		'imagesearch',
						autoComplete: true,
						listeners: {
							"action": SearchImage	
						}			
					},
					{
						xtype:		"button",
						iconCls: 	"search",
						iconMask: 	true,
						ui: 		'plain',
						id:			"imagesearchbutton",
						handler: function() {
							SearchImage();
						}
					},
					{
						hidden: 	true,
						iconCls: 	"refresh",
						iconMask: 	true,
						ui: 		'plain',
						id:			"imagemorebutton",
						handler: function() {
							GetMoreImageResults();
						}
					}
				]	
			}
		];
		IAR.ui.GoalSearchList.superclass.initComponent.call(this);
	}
});