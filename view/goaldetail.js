IAR.ui.GoalDetail = Ext.extend(Ext.Panel,{
	styleHtmlContent: true,
	id: 		"goaldetail",
	fullscreen: true,
	scroll: 	"vertical",
	initComponent: function() {
		this.goaldetailnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Goal Details",
			items:	[
				{
					text: 	"Back",
					id:		"goalbackbutton",
					handler: function() {
						Ext.getCmp("goalpanel").setActiveItem(0,"flip");
					}
				}	 
			]
		});
		this.dockedItems = [this.goaldetailnav];
		this.tpl = '<div class="awarddetail"><img class="mainimage" src="{imageurl}" /><h1>{title}</h1><h2>Goal: {threshold} {type}</h2><p>{description}</p>';
		IAR.ui.GoalDetail.superclass.initComponent.call(this);
	}
});