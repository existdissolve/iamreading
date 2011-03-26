IAR.ui.AwardList = Ext.extend(Ext.Panel,{
	fullscreen: true,				  
	initComponent: function() {
		this.awardnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"My Awards"
		});
		this.dockedItems = [this.awardnav];
		this.items = [
			{
				xtype:	"list",
				id:		"awardlist",
				store: 	awardstore,
				fullscreen: true,
				scroll: "vertical",
				itemTpl: "<div class='smthumb'><img src='{imageurl}' /></div>{title}",
				emptyText: "<p class='emptytext'>You haven't completed any goals yet. Keep reading to earn amazing prizes!</p>",
				deferEmptyText: false,
				listeners: {
					"selectionchange": function(selmodel,records){
						if(records.length) {
							Ext.getCmp("awarddetail").update(records[0].data);
							Ext.getCmp("awardpanel").setActiveItem(1,"flip");
						}
					}
				}	
			}
		];
		this.listeners = {
			"activate": function() {
				Ext.getCmp("awardlist").selModel.deselectAll();	
			}
		};
		IAR.ui.AwardList.superclass.initComponent.call(this);
	}
});