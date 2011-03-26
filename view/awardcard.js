IAR.ui.AwardCard = Ext.extend(Ext.Panel,{
	iconCls: 	"favorites",
	title:		"My Awards",
	id:			"awardpanel",
	layout:		{type:"card"},
	fullscreen: true,
	scroll: "vertical",
	initComponent: function() {
		this.items =	[
			new IAR.ui.AwardList(),
			new IAR.ui.AwardDetail()		
		];
		IAR.ui.AwardCard.superclass.initComponent.call(this);
	}					  
});